"use client";

import * as React from "react";
import {
  type AuthSession,
  type CurrentUser,
  type LoginInput,
  loginRequest,
  logoutRequest,
  meRequest,
  refreshRequest,
} from "@/lib/auth-client";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

type AuthContextValue = {
  user: CurrentUser | null;
  status: AuthStatus;
  error: string | null;
  login: (input: LoginInput) => Promise<AuthSession>;
  logout: () => Promise<void>;
  refresh: () => Promise<AuthSession | null>;
  reload: () => Promise<CurrentUser | null>;
  clearError: () => void;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

async function restoreCurrentUser() {
  try {
    return await meRequest();
  } catch {
    try {
      const session = await refreshRequest();
      return session.user;
    } catch {
      return null;
    }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<CurrentUser | null>(null);
  const [status, setStatus] = React.useState<AuthStatus>("loading");
  const [error, setError] = React.useState<string | null>(null);

  const reload = React.useCallback(async () => {
    const currentUser = await restoreCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setStatus("authenticated");
      setError(null);
      return currentUser;
    }

    setUser(null);
    setStatus("unauthenticated");
    return null;
  }, []);

  React.useEffect(() => {
    let active = true;

    async function restore() {
      const currentUser = await restoreCurrentUser();
      if (!active) return;

      if (currentUser) {
        setUser(currentUser);
        setStatus("authenticated");
        setError(null);
        return;
      }

      setUser(null);
      setStatus("unauthenticated");
    }

    void restore();

    return () => {
      active = false;
    };
  }, []);

  const login = React.useCallback(async (input: LoginInput) => {
    setError(null);
    const session = await loginRequest(input);
    setUser(session.user);
    setStatus("authenticated");
    return session;
  }, []);

  const refresh = React.useCallback(async () => {
    try {
      const session = await refreshRequest();
      setUser(session.user);
      setStatus("authenticated");
      setError(null);
      return session;
    } catch {
      setUser(null);
      setStatus("unauthenticated");
      return null;
    }
  }, []);

  const logout = React.useCallback(async () => {
    setError(null);
    try {
      await logoutRequest();
    } finally {
      setUser(null);
      setStatus("unauthenticated");
    }
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      error,
      login,
      logout,
      refresh,
      reload,
      clearError: () => setError(null),
    }),
    [error, login, logout, refresh, reload, status, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
