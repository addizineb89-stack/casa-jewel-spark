import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "client" | "jeweler";
  shopName?: string;
  plan: "free" | "aura" | "pro_partner";
  token: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: Omit<User, "id" | "token" | "plan"> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("aura_user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch { sessionStorage.removeItem("aura_user"); }
    }
  }, []);

  const persist = (u: User) => {
    sessionStorage.setItem("aura_user", JSON.stringify(u));
    setUser(u);
  };

  const login = useCallback(async (email: string, _password: string) => {
    // Mock login — replace with real API
    const mockUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split("@")[0],
      phone: "+212600000000",
      role: "client",
      plan: "free",
      token: crypto.randomUUID(),
    };
    persist(mockUser);
  }, []);

  const signup = useCallback(async (data: Omit<User, "id" | "token" | "plan"> & { password: string }) => {
    const { password: _, ...rest } = data;
    const newUser: User = {
      ...rest,
      id: crypto.randomUUID(),
      plan: "free",
      token: crypto.randomUUID(),
    };
    persist(newUser);
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem("aura_user");
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
