// app/page.test.tsx
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page"; // Importa tu componente Home
import { AppContext } from "@lib/context"; // Importa tu Context
import type { AppContext as AppContextType, Login, User, Plan } from "@lib/context"; // Importa los tipos
import { useRouter } from "next/navigation";

// Mock de Next.js useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock de next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

// Mocks para las funciones del contexto y router
const mockSetLogged = jest.fn();
const mockSetLogin = jest.fn();
const mockSetUser = jest.fn();
const mockSetPlanArray = jest.fn();
const mockSetElection = jest.fn();
const mockRouterPush = jest.fn();

// Componente wrapper para proveer el contexto mockeado
const MockProviders: React.FC<{
  children: React.ReactNode;
  contextValue?: Partial<AppContextType>;
}> = ({ children, contextValue }) => {
  const defaultContextValue: AppContextType = {
    logged: false,
    setLogged: mockSetLogged,
    login: undefined,
    setLogin: mockSetLogin,
    user: undefined,
    setUser: mockSetUser,
    plan: undefined,
    setPlan: mockSetPlanArray,
    election: undefined,
    setElection: mockSetElection,
    ...(contextValue || {}),
  };
  return <AppContext.Provider value={defaultContextValue}>{children}</AppContext.Provider>;
};

describe("Formulario Home", () => {
  beforeEach(() => {
    mockSetLogged.mockClear();
    mockSetLogin.mockClear();
    mockSetUser.mockClear();
    mockSetPlanArray.mockClear();
    mockSetElection.mockClear();
    mockRouterPush.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("debería mostrar un mensaje de error si el número de documento está vacío al intentar enviar", async () => {
    const { container } = render(
      // Obtenemos container para selectores más específicos si es necesario
      <MockProviders>
        <Home />
      </MockProviders>
    );

    const submitButton = screen.getByRole("button", { name: /cotiza aquí/i });
    fireEvent.click(submitButton);

    // El input para idNumber tiene name="idNumber" y está dentro de un div con la label "Nro. de Documento"
    // El mensaje de error <p className={styles.error}>{idNumberError}</p> está asociado a ese div.
    // Buscamos el texto de error directamente.
    const errorMessage = await screen.findByText(/El número de documento es requerido./i);
    expect(errorMessage).toBeInTheDocument();

    expect(mockSetLogin).not.toHaveBeenCalled();
    expect(mockRouterPush).not.toHaveBeenCalled();
  });

  it("debería llamar a setLogin, setLogged y navegar a /planes con datos válidos", async () => {
    // Obtenemos 'container' de render para poder usar querySelector si es necesario
    const { container } = render(
      <MockProviders>
        <Home />
      </MockProviders>
    );

    // En tu UI, el input para el número de documento tiene id="idNumber" y name="idNumber".
    // La label "Nro. de Documento" es para el select idType.
    // Usamos querySelector para encontrar el input por su atributo 'name' o 'id'.
    const idNumberInput = container.querySelector('input[name="idNumber"]') as HTMLInputElement;
    expect(idNumberInput).toBeInTheDocument(); // Verificar que se encontró el input
    fireEvent.change(idNumberInput, { target: { value: "12345678" } });

    const cellInput = screen.getByLabelText(/celular/i);
    fireEvent.change(cellInput, { target: { value: "987654321" } });

    const privacyCheckbox = screen.getByLabelText(/acepto la política de privacidad/i);
    fireEvent.click(privacyCheckbox);

    const commercialCheckbox = screen.getByLabelText(
      /acepto la política comunicaciones comerciales/i
    );
    fireEvent.click(commercialCheckbox);

    const submitButton = screen.getByRole("button", { name: /cotiza aquí/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockSetLogin).toHaveBeenCalledTimes(1);
      const expectedLoginData: Login = {
        idType: "dni",
        idNumber: "12345678",
        cell: "987654321",
        privacy: true,
        commercial: true,
      };
      expect(mockSetLogin).toHaveBeenCalledWith(expectedLoginData);
    });

    await waitFor(() => {
      expect(mockSetLogged).toHaveBeenCalledWith(true);
    });

    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith("/planes");
    });
  });
});
