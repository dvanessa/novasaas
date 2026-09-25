import { ROLE_PERMISSIONS } from "@/config/permissions.config";
import {
  APPLICATION_ROLES,
  type ApplicationRole,
  type DemoAccount,
} from "@/types/auth";
import type { Permission } from "@/types/permissions";

export type DemoRole = ApplicationRole;
export type { DemoAccount, Permission };

export const DEMO_SHARED_PASSWORD = "password";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-super-admin",
    name: "Vanessa Duarte",
    email: "admin@demo.com",
    password: DEMO_SHARED_PASSWORD,
    role: APPLICATION_ROLES.SUPER_ADMIN,
    organization: "Nova Studio",
    permissions: [...ROLE_PERMISSIONS[APPLICATION_ROLES.SUPER_ADMIN]],
    initials: "VD",
  },
  {
    id: "demo-manager",
    name: "Alex Morgan",
    email: "manager@demo.com",
    password: DEMO_SHARED_PASSWORD,
    role: APPLICATION_ROLES.MANAGER,
    organization: "Nova Studio",
    permissions: [...ROLE_PERMISSIONS[APPLICATION_ROLES.MANAGER]],
    initials: "AM",
  },
  {
    id: "demo-member",
    name: "Jordan Lee",
    email: "member@demo.com",
    password: DEMO_SHARED_PASSWORD,
    role: APPLICATION_ROLES.MEMBER,
    organization: "Nova Studio",
    permissions: [...ROLE_PERMISSIONS[APPLICATION_ROLES.MEMBER]],
    initials: "JL",
  },
];

export const AUTH_STORAGE_KEY = "novasaas-demo-session";
export const AUTH_SESSION_VERSION = 1;
export const DEMO_AUTH_NOTICE =
  "Frontend demo only: these public demo credentials are simulated in your browser. This is not production security; a real backend must validate identity and permissions.";

export function getDemoAccount(id: string) {
  return DEMO_ACCOUNTS.find((account) => account.id === id);
}
