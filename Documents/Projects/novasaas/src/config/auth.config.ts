export type DemoRole = "super-admin" | "manager" | "member";

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
  password: string;
  role: DemoRole;
  roleLabel: string;
  organization: string;
  permissions: Permission[];
  initials: string;
};

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-super-admin",
    name: "Vanessa Duarte",
    email: "admin@demo.com",
    password: "password",
    role: "super-admin",
    roleLabel: "Super Admin",
    organization: "Nova Studio",
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
    id: "demo-manager",
    name: "Alex Morgan",
    email: "manager@demo.com",
    password: "password",
    role: "manager",
    roleLabel: "Manager",
    organization: "Nova Studio",
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
    name: "Jordan Lee",
    email: "member@demo.com",
    password: "password",
    role: "member",
    roleLabel: "Member",
    organization: "Nova Studio",
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
