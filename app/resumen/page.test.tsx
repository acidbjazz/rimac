// app/resumen/page.test.tsx
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { render, screen, waitFor } from "@testing-library/react"; // waitFor might be unused if tests are simple
import "@testing-library/jest-dom";
import SummaryPage from "./page"; // Tu componente Summary
import { AppContext } from "@lib/context";
import type { AppContext as AppContextType, Login, User, Plan } from "@lib/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock de Next.js useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock de next/image
jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element, react/display-name
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

// Mock para componentes UI simples
// eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
jest.mock("@components/layout/progressBar", () => (props: any) => (
  <div data-testid="progress-bar">ProgressBar</div>
));
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("@components/card/card", () => (props: any) => (
  <div data-testid="summary-card" className={props.className}>
    {props.children}
  </div>
));

// Mock para el icono SVG Family
// eslint-disable-next-line react/display-name
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

    expect(screen.getByText(/Sonia Prueba/i)).toBeInTheDocument();
    expect(screen.getByText(/DNI: 12345678/i)).toBeInTheDocument();
    expect(screen.getByText(/Celular: 987654321/i)).toBeInTheDocument();
    expect(screen.getByText(/Plan Premium/i)).toBeInTheDocument();
    expect(screen.getByText(/\$150 al mes/i)).toBeInTheDocument();
  });

  it("debería mostrar un mensaje alternativo si faltan datos (ej. no hay plan elegido)", () => {
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

    expect(screen.getByText(/Pedro SinPlan/i)).toBeInTheDocument();
    expect(screen.getByText(/C.E.: ABC123XYZ/i)).toBeInTheDocument();
    expect(screen.queryByText(/Plan elegido/i)).toBeInTheDocument();
  });
});
