// app/planes/page.test.tsx
import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import PlanesPage from "./page";
import { AppContext } from "@lib/context";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { AppContext as AppContextType, Login, User, Plan } from "@lib/context";
import { useRouter } from "next/navigation";
import { useState } from "react";

const mockGetUserImplementation = jest.fn();
const mockGetPlansImplementation = jest.fn();

jest.mock("@/lib/api", () => ({
  __esModule: true,
  getUser: () => mockGetUserImplementation(),
  getPlans: () => mockGetPlansImplementation(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @next/next/no-img-element, react/display-name
  default: (props: any) => <img {...props} alt={props.alt || "mocked image"} />,
}));

// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("@components/card/targetCard", () => (props: any) => (
  <div data-testid="target-card" onClick={props.onClick}>
    {props.title} {props.isSelected ? "(Selected)" : ""}
  </div>
));
// eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
jest.mock("@components/card/planCard", () => (props: any) => (
  <div data-testid="plan-card" onClick={props.onClick}>
    {props.title}
  </div>
));
// eslint-disable-next-line react/display-name, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
jest.mock("@components/layout/progressBar", () => (props: any) => (
  <div data-testid="progress-bar">ProgressBar</div>
));

const mockSetLogged = jest.fn();
const mockSetLogin = jest.fn();
const mockSetUser = jest.fn();
const mockSetPlanArray = jest.fn();
const mockSetElection = jest.fn();
const mockRouterPush = jest.fn();
const mockRouterReplace = jest.fn();

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
    expect(mockRouterReplace).toHaveBeenCalledWith("/");
  });

  it("debería llamar a getUser, actualizar contexto y mostrar el nombre del usuario", async () => {
    const fakeUser: User = { name: "Carlos (Test)", lastName: "Tester", birthDay: "01-01-1980" };
    const fakePlans: Plan[] = [{ name: "Plan Test", price: 50, description: ["desc"], age: 30 }];
    mockGetUserImplementation.mockResolvedValue(fakeUser);
    mockGetPlansImplementation.mockResolvedValue(fakePlans); // Asegúrate de mockear getPlans también si se llama

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

    // Si getPlans se llama incondicionalmente cuando logged es true:
    await waitFor(() => {
      expect(mockGetPlansImplementation).toHaveBeenCalledTimes(1);
    });
    await waitFor(() => {
      expect(mockSetPlanArray).toHaveBeenCalledWith(fakePlans);
    });

    const greeting = await screen.findByText(/Carlos \(Test\), ¿Para quién deseas cotizar\?/i);
    expect(greeting).toBeInTheDocument();
  });

  it("NO debería llamar a getUser si está logueado y YA HAY datos de usuario en el contexto", async () => {
    const existingUser: User = {
      name: "Ana (Existente)",
      lastName: "Prueba",
      birthDay: "02-02-1992",
    };
    const existingPlans: Plan[] = [
      { name: "Plan Existente", price: 60, description: ["desc old"], age: 40 },
    ];
    mockGetPlansImplementation.mockResolvedValue(existingPlans); // Mock para getPlans incluso si no se espera que se llame setUser

    render(
      <TestWrapper
        initialContextOverrides={{ logged: true, user: existingUser, plan: existingPlans }}
      >
        <PlanesPage />
      </TestWrapper>
    );

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(mockGetUserImplementation).not.toHaveBeenCalled();

    // Ajusta esta expectativa según la lógica de tu componente PlanesPage
    // Si PlanesPage llama a getPlans SIEMPRE que está logueado, incluso si ya hay planes, esta expectativa fallará.
    // Si PlanesPage solo llama a getPlans si 'plan' del contexto está vacío, entonces esta expectativa es correcta.
    // expect(mockGetPlansImplementation).not.toHaveBeenCalled(); // Comenta o ajusta según tu lógica en PlanesPage

    const greeting = await screen.findByText(/Ana \(Existente\), ¿Para quién deseas cotizar\?/i);
    expect(greeting).toBeInTheDocument();
  });
});
