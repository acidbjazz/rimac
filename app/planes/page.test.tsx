// app/planes/page.test.tsx
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlanesPage from "./page"; // Tu componente PlanesPage
import { AppContext } from "@lib/context";
import type { AppContext as AppContextType, Login, User, Plan } from "@lib/context"; // Tipos de tu contexto
import { useRouter } from "next/navigation";
import { useState } from "react"; // <--- IMPORTACIÓN AÑADIDA

// Mock de las funciones del API
const mockGetUserImplementation = jest.fn();
const mockGetPlansImplementation = jest.fn();

jest.mock("@/lib/api", () => ({
  __esModule: true,
  getUser: () => mockGetUserImplementation(),
  getPlans: () => mockGetPlansImplementation(),
}));

// Mocks de Next.js y componentes UI
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

jest.mock("@components/card/targetCard", () => (props: any) => (
  <div data-testid="target-card" onClick={props.onClick}>
    {props.title} {props.isSelected ? "(Selected)" : ""}
  </div>
));
jest.mock("@components/card/planCard", () => (props: any) => (
  <div data-testid="plan-card" onClick={props.onClick}>
    {props.title}
  </div>
));
jest.mock("@components/layout/progressBar", () => (props: any) => (
  <div data-testid="progress-bar">ProgressBar</div>
));

// Mocks para las funciones set del contexto y router
const mockSetLogged = jest.fn();
const mockSetLogin = jest.fn();
const mockSetUser = jest.fn();
const mockSetPlanArray = jest.fn(); // Para el array de planes en el contexto
const mockSetElection = jest.fn();
const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn(); // Para router.replace

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
    plan: undefined, // 'plan' en tu contexto es Plan[] | undefined
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

describe("Página de Planes", () => {
  beforeEach(() => {
    mockSetLogged.mockClear();
    mockSetLogin.mockClear();
    mockSetUser.mockClear();
    mockSetPlanArray.mockClear();
    mockSetElection.mockClear();
    mockRouterPush.mockClear();
    mockRouterReplace.mockClear();
    mockGetUserImplementation.mockClear();
    mockGetPlansImplementation.mockClear();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush, replace: mockRouterReplace });
  });

  it("debería redirigir a / si el usuario no está logueado", () => {
    render(
      <TestWrapper initialContextOverrides={{ logged: false }}>
        <PlanesPage />
      </TestWrapper>
    );
    // Tu componente usa router.replace("/") si !logged
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });

  it("debería llamar a getUser y getPlans, y mostrar el nombre si está logueado y user/plan no existen", async () => {
    const fakeUser: User = { name: "Carlos (Test)", lastName: "Tester", birthDay: "01-01-1980" };
    const fakePlans: Plan[] = [{ name: "Plan Test", price: 50, description: ["desc"], age: 30 }];

    mockGetUserImplementation.mockResolvedValue(fakeUser);
    mockGetPlansImplementation.mockResolvedValue(fakePlans);

    render(
      <TestWrapper initialContextOverrides={{ logged: true, user: undefined, plan: undefined }}>
        <PlanesPage />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(mockGetUserImplementation).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith(fakeUser);
    });
    await waitFor(() => {
      expect(mockGetPlansImplementation).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockSetPlanArray).toHaveBeenCalledWith(fakePlans);
    });

    // Verificar que el nombre del usuario se muestre
    const greeting = await screen.findByText(/Carlos \(Test\), ¿Para quién deseas cotizar\?/i);
    expect(greeting).toBeInTheDocument();
  });

  it("NO debería llamar a getUser ni getPlans si ya existen en el contexto (y está logueado)", async () => {
    const existingUser: User = {
      name: "Ana (Existente)",
      lastName: "Prueba",
      birthDay: "02-02-1992",
    };
    const existingPlans: Plan[] = [
      { name: "Plan Existente", price: 60, description: ["desc old"], age: 40 },
    ];

    render(
      <TestWrapper
        initialContextOverrides={{ logged: true, user: existingUser, plan: existingPlans }}
      >
        <PlanesPage />
      </TestWrapper>
    );

    // Damos un pequeño tiempo para que cualquier efecto no deseado se ejecute
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(mockGetUserImplementation).not.toHaveBeenCalled();
    expect(mockGetPlansImplementation).not.toHaveBeenCalled(); // Tu lógica actual carga planes siempre si logged es true
    // Para que este test pase, tu useEffect de getPlans debería
    // también verificar si 'plan' del contexto ya tiene datos.
    // Por ahora, lo comento si tu lógica actual siempre llama a getPlans.
    // Si ajustas tu useEffect en PlanesPage para no llamar a getPlans si ya existen, descomenta.

    const greeting = await screen.findByText(/Ana \(Existente\), ¿Para quién deseas cotizar\?/i);
    expect(greeting).toBeInTheDocument();
  });
});
