import { createContext, useCallback, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AuthSession, Role, ViewMode } from "../types";
import { PASSWORDS } from "../types";

interface AuthContextValue {
  session: AuthSession | null;
  login: (
    role: Role,
    password: string,
    projectFilter: string,
    viewMode: ViewMode,
    username?: string,
  ) => { success: boolean; error?: string };
  logout: () => void;
  setProjectFilter: (project: string) => void;
  setViewMode: (mode: ViewMode) => void;
}

const SESSION_KEY = "propflow_session";

function loadSession(): AuthSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

function saveSession(session: AuthSession): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AuthSession | null>(loadSession);

  const login = useCallback(
    (
      role: Role,
      password: string,
      projectFilter: string,
      viewMode: ViewMode,
      username?: string,
    ): { success: boolean; error?: string } => {
      if (password !== PASSWORDS[role]) {
        return {
          success: false,
          error: "Incorrect password. Please try again.",
        };
      }
      const resolvedUsername =
        username?.trim() ||
        (role === "admin"
          ? "Admin"
          : role === "sales"
            ? "Sales Person"
            : "Telecaller");
      const newSession: AuthSession = {
        role,
        username: resolvedUsername,
        projectFilter,
        viewMode,
      };
      saveSession(newSession);
      setSession(newSession);
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setSession(null);
  }, []);

  const setProjectFilter = useCallback((project: string) => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, projectFilter: project };
      saveSession(updated);
      return updated;
    });
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setSession((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, viewMode: mode };
      saveSession(updated);
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, login, logout, setProjectFilter, setViewMode }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
