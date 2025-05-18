"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { Login, User, Plan } from "./definitions";

interface AppContext {
  logged: boolean;
  setLogged: (logged: boolean) => void;
  login?: Login;
  setLogin: (login?: Login) => void;
  user?: User;
  setUser: (user?: User) => void;
  plan?: Plan;
  setPlan: (plan?: Plan) => void;
}

export const AppContext = createContext<AppContext | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [login, setLogin] = useState<Login>();
  const [user, setUser] = useState<User>();
  const [plan, setPlan] = useState<Plan>();
  const contextValue: AppContext = {
    logged,
    setLogged,
    login,
    setLogin,
    user,
    setUser,
    plan,
    setPlan,
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
