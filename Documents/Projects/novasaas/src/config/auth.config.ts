export type DemoRole = "owner" | "admin" | "member";

export type Permission =
  | "dashboard.read"
  | "analytics.read"
  | "organizations.read"
  | "users.read"
  | "roles.read"
  | "billing.read"
  | "audit.read"
  | "settings.read";

export type DemoAccount = {
  id: string;
  name: string;
  email: string;
  role: DemoRole;
  permissions: Permission[];
  initials: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-owner",
    name: "Vanessa Duarte",
    email: "vanessa@example.com",
    role: "owner",
    permissions: [
      "dashboard.read",
      "analytics.read",
      "organizations.read",
      "users.read",
      "roles.read",
      "billing.read",
      "audit.read",
      "settings.read",
    ],
    initials: "VD",
  },
  {
    id: "demo-admin",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "admin",
    permissions: [
      "dashboard.read",
      "analytics.read",
      "organizations.read",
      "users.read",
      "billing.read",
      "settings.read",
    ],
    initials: "AM",
  },
  {
    id: "demo-member",
    name: "Jamie Lee",
    email: "jamie@example.com",
    role: "member",
    permissions: ["dashboard.read", "analytics.read", "settings.read"],
    initials: "JL",
  },
];

export const AUTH_STORAGE_KEY = "novasaas-demo-session";
export const DEMO_AUTH_NOTICE =
  "Demo mode: this is a frontend-only session. No real credentials or tokens are used.";

export function canAccess(
  account: DemoAccount | null,
  permission?: Permission,
) {
  return !permission || Boolean(account?.permissions.includes(permission));
}

export function getDemoAccount(id: string) {
  return DEMO_ACCOUNTS.find((account) => account.id === id);
}
