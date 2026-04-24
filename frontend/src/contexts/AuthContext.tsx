"use client";

import {
  authApi,
  clearAuth,
  mapMeResponseToUser,
  membershipsApi,
  persistAuth,
} from "@/lib/api";
import type { Membership, User } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  memberships: Membership[];
  currentOrganizationId: string | null;
  setCurrentOrganizationId: (id: string | null) => void;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "kangtent_token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [memberships, setMemberships] = useState<Membership[]>([]);
  const [currentOrganizationId, setCurrentOrganizationId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(true);

  const hydrate = useCallback(async () => {
    try {
      const me = await authApi.me();
      const roleId = me.role?.id;
      const isHostOrAdmin = roleId === 1 || roleId === 2;

      let mems: Membership[] = [];
      if (isHostOrAdmin) {
        try {
          mems = await membershipsApi.myMemberships();
        } catch {
          mems = [];
        }
      }
      setMemberships(mems);
      const mapped = mapMeResponseToUser(me, mems);
      setUser(mapped);
      setCurrentOrganizationId((cur) => cur ?? mems[0]?.organizationId ?? null);
    } catch {
      clearAuth();
      setToken(null);
      setUser(null);
      setMemberships([]);
      setCurrentOrganizationId(null);
    }
  }, []);

  useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY) : null;
    if (!stored) {
      setLoading(false);
      return;
    }
    setToken(stored);
    document.cookie = `${TOKEN_KEY}=${stored}; path=/; SameSite=Lax`;
    hydrate().finally(() => setLoading(false));
  }, [hydrate]);

  const login = useCallback(
    async (email: string, password: string) => {
      const res = await authApi.login({ email, password });
      persistAuth(res);
      setToken(res.token);
      await hydrate();
    },
    [hydrate],
  );

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    }) => {
      const res = await authApi.register(data);
      persistAuth(res);
      setToken(res.token);
      await hydrate();
    },
    [hydrate],
  );

  const logout = useCallback(() => {
    authApi.logout().catch(() => {});
    clearAuth();
    setToken(null);
    setUser(null);
    setMemberships([]);
    setCurrentOrganizationId(null);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      loading,
      memberships,
      currentOrganizationId,
      setCurrentOrganizationId,
      login,
      register,
      logout,
    }),
    [
      user,
      token,
      loading,
      memberships,
      currentOrganizationId,
      login,
      register,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
