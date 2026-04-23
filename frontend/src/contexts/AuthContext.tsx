"use client";

import { authApi } from "@/lib/api";
import { User } from "@/types";
import { jwtDecode } from "jwt-decode";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "kangtent_token";

function decodeToken(token: string): User | null {
  try {
    const payload = jwtDecode<{ sub: string; email: string; role: string }>(token);
    return { userId: payload.sub, email: payload.email, role: payload.role as User["role"] };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      const decoded = decodeToken(stored);
      if (decoded) {
        document.cookie = `${TOKEN_KEY}=${stored}; path=/; SameSite=Lax`;
        setToken(stored);
        setUser(decoded);
        // Hydrate firstName/lastName from /users/me
        authApi.me().then((me) => {
          setUser((u) => u ? { ...u, firstName: me.firstName, lastName: me.lastName } : u);
        }).catch(() => {});
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const persist = useCallback((accessToken: string) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    document.cookie = `${TOKEN_KEY}=${accessToken}; path=/; SameSite=Lax`;
    setToken(accessToken);
    const decoded = decodeToken(accessToken);
    setUser(decoded);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authApi.login({ email, password });
    persist(res.accessToken);
    authApi.me().then((me) => {
      setUser((u) => u ? { ...u, firstName: me.firstName, lastName: me.lastName } : u);
    }).catch(() => {});
  }, [persist]);

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string }) => {
    const res = await authApi.register(data);
    persist(res.accessToken);
    setUser((u) => u ? { ...u, firstName: data.firstName, lastName: data.lastName } : u);
  }, [persist]);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    document.cookie = `${TOKEN_KEY}=; path=/; max-age=0`;
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
