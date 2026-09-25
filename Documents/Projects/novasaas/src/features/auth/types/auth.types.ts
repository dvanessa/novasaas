import type {
  ApplicationRole,
  AuthenticationSession,
  AuthenticationStatus,
  AuthResult,
  AuthServiceError,
  DemoAccount,
  DemoUser,
  LoginCredentials,
  PasswordResetData,
  ProtectedRouteConfiguration,
  RegistrationData,
} from "@/types/auth";
import type { Permission } from "@/types/permissions";

export type AuthState = {
  currentUser: DemoUser | null;
  hydrated: boolean;
  status: AuthenticationStatus;
};

export type DemoCredentials = LoginCredentials;

export type {
  ApplicationRole,
  AuthenticationSession,
  AuthenticationStatus,
  AuthResult,
  AuthServiceError,
  DemoAccount,
  DemoUser,
  LoginCredentials,
  PasswordResetData,
  Permission,
  ProtectedRouteConfiguration,
  RegistrationData,
};
