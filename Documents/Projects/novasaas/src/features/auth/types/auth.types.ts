import type {
  ApplicationRole,
  AuthenticationSession,
  AuthenticationStatus,
  DemoAccount,
  DemoUser,
  LoginCredentials,
  ProtectedRouteConfiguration,
} from "@/types/auth";
import type { Permission } from "@/types/permissions";

export type AuthState = {
  account: DemoUser | null;
  hydrated: boolean;
  status: AuthenticationStatus;
};

export type DemoCredentials = LoginCredentials;

export type {
  ApplicationRole,
  AuthenticationSession,
  AuthenticationStatus,
  DemoAccount,
  DemoUser,
  LoginCredentials,
  Permission,
  ProtectedRouteConfiguration,
};
