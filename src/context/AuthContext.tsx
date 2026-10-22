"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, AccountType, RegisterData } from "@/types/auth";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthHydrated: boolean;
  login: (email: string, password?: string, accountType?: AccountType) => { success: boolean; message?: string };
  loginAsDemo: (accountType?: AccountType) => void;
  register: (data: RegisterData) => { success: boolean; message?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER = "nexora_auth_user_v1";

// Default demo user profiles
const DEMO_USERS: Record<AccountType, User> = {
  corporate: {
    id: "usr-corp-01",
    name: "Alexander Sterling",
    email: "procurement@acme-enterprises.com",
    company: "Acme Enterprise Solutions Inc.",
    accountType: "corporate",
    role: "admin",
    memberSince: "January 2024",
  },
  individual: {
    id: "usr-ind-02",
    name: "Clara Dubois",
    email: "clara.dubois@studioworkspace.design",
    company: "Dubois Design Studio",
    accountType: "individual",
    role: "client",
    memberSince: "March 2024",
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthHydrated, setIsAuthHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_USER);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.warn("Failed to parse auth user from localStorage:", e);
    } finally {
      setIsAuthHydrated(true);
    }
  }, []);

  const saveUser = (newUser: User | null) => {
    setUser(newUser);
    try {
      if (newUser) {
        localStorage.setItem(LOCAL_STORAGE_USER, JSON.stringify(newUser));
      } else {
        localStorage.removeItem(LOCAL_STORAGE_USER);
      }
    } catch (e) {
      console.error("Failed to sync auth user to localStorage:", e);
    }
  };

  const login = (email: string, _password?: string, accountType: AccountType = "corporate") => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes("@")) {
      return { success: false, message: "Please provide a valid email address." };
    }

    const companyGuess =
      accountType === "corporate"
        ? cleanEmail.split("@")[1]?.split(".")[0]?.toUpperCase() + " Corporation"
        : "Professional Studio";

    const nameGuess =
      cleanEmail.split("@")[0].replace(/[^a-zA-Z]/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase()) || "Commercial Partner";

    const authenticatedUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: nameGuess,
      email: cleanEmail,
      company: companyGuess,
      accountType,
      role: accountType === "corporate" ? "admin" : "client",
      memberSince: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };

    saveUser(authenticatedUser);
    return { success: true };
  };

  const loginAsDemo = (accountType: AccountType = "corporate") => {
    const demoUser = DEMO_USERS[accountType];
    saveUser(demoUser);
  };

  const register = (data: RegisterData) => {
    if (!data.name.trim() || !data.email.trim()) {
      return { success: false, message: "Name and email are required." };
    }

    const newUser: User = {
      id: `usr-${Date.now().toString(36)}`,
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      company: data.company?.trim() || (data.accountType === "corporate" ? "Registered Commercial Client" : "Studio Member"),
      accountType: data.accountType,
      role: "client",
      memberSince: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
    };

    saveUser(newUser);
    return { success: true };
  };

  const logout = () => {
    saveUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAuthHydrated,
        login,
        loginAsDemo,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
