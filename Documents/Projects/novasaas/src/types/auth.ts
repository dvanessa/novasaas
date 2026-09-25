import type { Permission } from "./permissions";

export const APPLICATION_ROLES = {
  SUPER_ADMIN: "super_admin",
  MANAGER: "manager",
  MEMBER: "member",
} as const;

export type ApplicationRole =
  (typeof APPLICATION_ROLES)[keyof typeof APPLICATION_ROLES];

export const ROLE_LABELS: Record<ApplicationRole, string> = {
  [APPLICATION_ROLES.SUPER_ADMIN]: "Super Admin",
  [APPLICATION_ROLES.MANAGER]: "Manager",
  [APPLICATION_ROLES.MEMBER]: "Member",
};

export const AUTH_STATUSES = {
  LOADING: "loading",
  AUTHENTICATED: "authenticated",
  UNAUTHENTICATED: "unauthenticated",
} as const;

export type AuthenticationStatus =
  (typeof AUTH_STATUSES)[keyof typeof AUTH_STATUSES];

export type DemoUser = {
  id: string;
  name: string;
  email: string;
  role: ApplicationRole;
  organization: string;
  permissions: Permission[];
  initials: string;
};

/** Fixture-only account shape. Passwords are never included in sessions. */
export type DemoAccount = DemoUser & {
  password: string;
};

export type AuthenticationSession = {
  version: 1;
  accountId: DemoUser["id"];
  createdAt: string;
};

export type LoginCredentials = {
  email: DemoAccount["email"];
  password: string;
};

export type ProtectedRouteConfiguration = {
  pathname: string;
  permission?: Permission;
};

export type RegistrationData = {
  workspace: string;
  email: string;
};

export type PasswordResetData = {
  password: string;
  confirmPassword: string;
};

export type AuthServiceError = {
  code: "INVALID_CREDENTIALS" | "STORAGE_UNAVAILABLE" | "UNKNOWN";
  message: string;
};

export type AuthResult<T> =
  { success: true; data: T } | { success: false; error: AuthServiceError };
