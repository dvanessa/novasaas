import {
  APPLICATION_ROLES,
  type ApplicationRole,
  type DemoAccount,
  type DemoUser,
} from "@/types/auth";
import { type Permission, PERMISSIONS } from "@/types/permissions";

export type DemoRole = ApplicationRole;
export type { DemoAccount, Permission };

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-super-admin",
    name: "Vanessa Duarte",
    email: "admin@demo.com",
    password: "password",
    role: APPLICATION_ROLES.SUPER_ADMIN,
    organization: "Nova Studio",
    permissions: [
      PERMISSIONS.DASHBOARD_READ,
      PERMISSIONS.ANALYTICS_READ,
      PERMISSIONS.ORGANIZATIONS_READ,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.ROLES_READ,
      PERMISSIONS.BILLING_READ,
      PERMISSIONS.AUDIT_READ,
      PERMISSIONS.SETTINGS_READ,
    ],
    initials: "VD",
  },
  {
    id: "demo-manager",
    name: "Alex Morgan",
    email: "manager@demo.com",
    password: "password",
    role: APPLICATION_ROLES.MANAGER,
    organization: "Nova Studio",
    permissions: [
      PERMISSIONS.DASHBOARD_READ,
      PERMISSIONS.ANALYTICS_READ,
      PERMISSIONS.ORGANIZATIONS_READ,
      PERMISSIONS.USERS_READ,
      PERMISSIONS.BILLING_READ,
      PERMISSIONS.SETTINGS_READ,
    ],
    initials: "AM",
  },
  {
    id: "demo-member",
    name: "Jordan Lee",
    email: "member@demo.com",
    password: "password",
    role: APPLICATION_ROLES.MEMBER,
    organization: "Nova Studio",
    permissions: [
      PERMISSIONS.DASHBOARD_READ,
      PERMISSIONS.ANALYTICS_READ,
      PERMISSIONS.SETTINGS_READ,
    ],
    initials: "JL",
  },
];

export const AUTH_STORAGE_KEY = "novasaas-demo-session";
export const AUTH_SESSION_VERSION = 1;
export const DEMO_AUTH_NOTICE =
  "Demo mode: this is a frontend-only session. No real credentials or tokens are used.";

export function canAccess(account: DemoUser | null, permission?: Permission) {
  return !permission || Boolean(account?.permissions.includes(permission));
}

export function getDemoAccount(id: string) {
  return DEMO_ACCOUNTS.find((account) => account.id === id);
}
