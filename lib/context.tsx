"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Login, User, Plan } from "./definitions";

interface AppContext {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  login?: Login;
  setLogin: (login: Login) => void;
  user?: User;
  setUser: (user?: User) => void;
  plan?: Plan[];
  setPlan: (plan?: Plan[]) => void;
  election?: Plan;
  setElection: (election?: Plan) => void;
}

const fakeLogin: Login = {
  idType: "dni",
  idNumber: "12345678",
  cell: "987654320",
  privacy: true,
  commercial: true,
};

export const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [login, setLogin] = useState<Login>(fakeLogin);
  const [user, setUser] = useState<User>();
  const [plan, setPlan] = useState<Plan[]>();
  const [election, setElection] = useState<Plan>();
  const contextValue: AppContext = {
    logged,
    setLogged,
    login,
    setLogin,
    user,
    setUser,
    plan,
    setPlan,
    election,
    setElection,
  };
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("AppContext must be used within AppProvider");
  }
  return context;
};
