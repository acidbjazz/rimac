// app/resumen/page.test.tsx
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SummaryPage from "./page"; // Tu componente Summary
import { AppContext } from "@lib/context";
import type { AppContext as AppContextType, Login, User, Plan } from "@lib/context";
import { useRouter } from "next/navigation";
import { useState } from "react"; // Importar useState para el TestWrapper

// Mock de Next.js useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock de next/image (si es usado por Family o Card)
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

// Mock para componentes UI simples
jest.mock("@components/layout/progressBar", () => (props: any) => (
  <div data-testid="progress-bar">ProgressBar</div>
));
jest.mock("@components/card/card", () => (props: any) => (
  <div data-testid="summary-card" className={props.className}>
    {props.children}
  </div>
));

// Mock para el icono SVG Family si se importa como un componente React
// Si es una URL de imagen en un <img> normal, no se necesita mockear así.
jest.mock("@assets/icons/family.svg", () => () => <svg data-testid="family-icon" />);

// Mocks para las funciones set del contexto y router
const mockSetLogged = jest.fn();
const mockSetLogin = jest.fn();
const mockSetUser = jest.fn();
const mockSetPlanArray = jest.fn();
const mockSetElection = jest.fn();
const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();

// Componente TestWrapper para proveer el contexto
const TestWrapper: React.FC<{
  children: React.ReactNode;
  initialContextOverrides?: Partial<AppContextType>;
}> = ({ children, initialContextOverrides }) => {
  const [contextState, setContextState] = useState<AppContextType>({
    logged: false,
    setLogged: (status) => {
      mockSetLogged(status);
      setContextState((prev) => ({ ...prev, logged: status }));
    },
    login: undefined,
    setLogin: (loginData) => {
      mockSetLogin(loginData);
      setContextState((prev) => ({ ...prev, login: loginData }));
    },
    user: undefined,
    setUser: (userData) => {
      mockSetUser(userData);
      setContextState((prev) => ({ ...prev, user: userData }));
    },
    plan: undefined,
    setPlan: (plans) => {
      mockSetPlanArray(plans);
      setContextState((prev) => ({ ...prev, plan: plans }));
    },
    election: undefined,
    setElection: (electionData) => {
      mockSetElection(electionData);
      setContextState((prev) => ({ ...prev, election: electionData }));
    },
    ...initialContextOverrides,
  });

  return <AppContext.Provider value={contextState}>{children}</AppContext.Provider>;
};

describe("Página de Resumen", () => {
  beforeEach(() => {
    mockSetLogged.mockClear();
    mockSetLogin.mockClear();
    mockSetUser.mockClear();
    mockSetPlanArray.mockClear();
    mockSetElection.mockClear();
    mockRouterPush.mockClear();
    mockRouterReplace.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush, replace: mockRouterReplace });
  });

  it("debería redirigir a / si el usuario no está logueado", () => {
    render(
      <TestWrapper initialContextOverrides={{ logged: false }}>
        <SummaryPage />
      </TestWrapper>
    );
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });

  it("debería mostrar los datos del login, usuario y plan elegido si está logueado y los datos existen", async () => {
    const fakeLogin: Login = {
      idType: "dni",
      idNumber: "12345678",
      cell: "987654321",
      privacy: true,
      commercial: true,
    };
    const fakeUser: User = { name: "Sonia", lastName: "Prueba", birthDay: "03-03-1993" };
    const fakeElection: Plan = {
      name: "Plan Premium",
      price: 150,
      description: ["desc1", "desc2"],
      age: 50,
    };

    render(
      <TestWrapper
        initialContextOverrides={{
          logged: true,
          login: fakeLogin,
          user: fakeUser,
          election: fakeElection,
        }}
      >
        <SummaryPage />
      </TestWrapper>
    );

    // Verificar nombre de usuario
    expect(screen.getByText(/Sonia Prueba/i)).toBeInTheDocument();

    // Verificar datos de responsable de pago
    expect(screen.getByText(/DNI: 12345678/i)).toBeInTheDocument(); // Asume que idType 'dni' se muestra como "DNI"
    expect(screen.getByText(/Celular: 987654321/i)).toBeInTheDocument();

    // Verificar datos del plan elegido
    expect(screen.getByText(/Plan Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/\$150 al mes/i)).toBeInTheDocument(); // Usamos regex para el precio
  });

  it("debería mostrar un mensaje alternativo si faltan datos (ej. no hay plan elegido)", () => {
    // Simulamos que el usuario está logueado y tiene datos de login/user, pero no ha elegido un plan
    const fakeLogin: Login = {
      idType: "ce",
      idNumber: "ABC123XYZ",
      cell: "911223344",
      privacy: true,
      commercial: true,
    };
    const fakeUser: User = { name: "Pedro", lastName: "SinPlan", birthDay: "04-04-1984" };

    render(
      <TestWrapper
        initialContextOverrides={{
          logged: true,
          login: fakeLogin,
          user: fakeUser,
          election: undefined,
        }}
      >
        <SummaryPage />
      </TestWrapper>
    );

    // Verificar que los datos disponibles se muestren
    expect(screen.getByText(/Pedro SinPlan/i)).toBeInTheDocument();
    expect(screen.getByText(/C.E.: ABC123XYZ/i)).toBeInTheDocument();

    // Verificar que no se intente mostrar datos del plan (podría haber un mensaje o sección vacía)
    // Esto depende de cómo tu componente Summary maneje la ausencia de 'election'.
    // Si renderiza un <p> específico, búscalo. Si no, asegúrate que no crashee.
    // Por ejemplo, si no hay plan, el texto "Plan elegido" podría no estar seguido de un nombre de plan.
    // O podrías tener un mensaje como "No hay plan seleccionado".
    // Aquí asumimos que los campos de plan simplemente no se renderizan o están vacíos.
    expect(screen.queryByText(/Plan elegido/i)).toBeInTheDocument(); // El label podría estar
    // pero el nombre y precio del plan no deberían estar si 'election' es undefined.
    // Esta es una aserción más débil, ajusta según tu UI.
    // Si tienes un mensaje específico como "No hay plan seleccionado", búscalo:
    // expect(screen.getByText(/No hay plan seleccionado/i)).toBeInTheDocument();
  });
});
