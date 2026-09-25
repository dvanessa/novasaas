"use client";

import {
  AUTH_SESSION_VERSION,
  AUTH_STORAGE_KEY,
  getDemoAccount,
} from "@/config/auth.config";
import {
  login as authenticate,
  logout as endSession,
  switchDemoAccount as selectDemoAccount,
} from "@/features/auth/services/auth.service";
import { createDemoSession, resolveSession } from "@/lib/auth-service";
import {
  AUTH_STATUSES,
  type AuthenticationSession,
  type AuthenticationStatus,
  type AuthResult,
  type DemoUser,
  type LoginCredentials,
} from "@/types/auth";

export type AuthStoreState = {
  currentUser: DemoUser | null;
  status: AuthenticationStatus;
  hydrated: boolean;
};

const initialState: AuthStoreState = {
  currentUser: null,
  status: AUTH_STATUSES.LOADING,
  hydrated: false,
};

let state = initialState;
const listeners = new Set<() => void>();
let initialized = false;

function publish(nextState: AuthStoreState) {
  state = nextState;
  listeners.forEach((listener) => listener());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readPersistedSession(): AuthenticationSession | null {
  const serialized = window.localStorage.getItem(AUTH_STORAGE_KEY);
  if (!serialized) return null;

  try {
    const parsed: unknown = JSON.parse(serialized);
    if (
      !isRecord(parsed) ||
      parsed.version !== AUTH_SESSION_VERSION ||
      typeof parsed.accountId !== "string" ||
      typeof parsed.createdAt !== "string" ||
      Number.isNaN(Date.parse(parsed.createdAt)) ||
      !getDemoAccount(parsed.accountId)
    ) {
      window.localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return {
      version: AUTH_SESSION_VERSION,
      accountId: parsed.accountId,
      createdAt: parsed.createdAt,
    };
  } catch {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

function setUnauthenticated(hydrated = true) {
  publish({
    currentUser: null,
    status: AUTH_STATUSES.UNAUTHENTICATED,
    hydrated,
  });
}

export function subscribeAuthStore(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getAuthStoreSnapshot() {
  return state;
}

export function getAuthStoreServerSnapshot() {
  return initialState;
}

export function hydrateAuthStore() {
  if (typeof window === "undefined") return;
  try {
    const session = readPersistedSession();
    const currentUser = resolveSession(session);
    publish({
      currentUser,
      status: currentUser
        ? AUTH_STATUSES.AUTHENTICATED
        : AUTH_STATUSES.UNAUTHENTICATED,
      hydrated: true,
    });
  } catch (error) {
    console.error("Unable to read the NovaSaaS demo session.", error);
    setUnauthenticated();
  }
}

export function initializeAuthStore() {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;
  hydrateAuthStore();
  window.addEventListener("storage", (event) => {
    if (event.key === AUTH_STORAGE_KEY || event.key === null) {
      hydrateAuthStore();
    }
  });
}

function storageError(): AuthResult<never> {
  return {
    success: false,
    error: {
      code: "STORAGE_UNAVAILABLE",
      message:
        "The demo session could not be saved in this browser. Check your browser storage settings and try again.",
    },
  };
}

function persistUser(user: DemoUser): AuthResult<DemoUser> {
  try {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(createDemoSession(user)),
    );
  } catch {
    return storageError();
  }

  publish({
    currentUser: user,
    status: AUTH_STATUSES.AUTHENTICATED,
    hydrated: true,
  });
  return { success: true, data: user };
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResult<DemoUser>> {
  const result = await authenticate(credentials);
  return result.success ? persistUser(result.data) : result;
}

export async function switchAccount(
  accountId: string,
): Promise<AuthResult<DemoUser>> {
  const result = await selectDemoAccount(accountId);
  return result.success ? persistUser(result.data) : result;
}

export async function logout(): Promise<AuthResult<null>> {
  const result = await endSession();
  try {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch {
    return storageError();
  }
  setUnauthenticated();
  return result;
}
