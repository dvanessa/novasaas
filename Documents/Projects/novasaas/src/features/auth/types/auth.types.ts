import type { DemoAccount, DemoRole } from "@/config/auth.config";

export type AuthState = {
  account: DemoAccount | null;
  hydrated: boolean;
};

export type DemoCredentials = {
  email: string;
  password?: string;
};

export type { DemoAccount, DemoRole };
