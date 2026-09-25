export const PERMISSIONS = {
  DASHBOARD_READ: "dashboard.read",
  ANALYTICS_READ: "analytics.read",
  ORGANIZATIONS_READ: "organizations.read",
  USERS_READ: "users.read",
  ROLES_READ: "roles.read",
  BILLING_READ: "billing.read",
  AUDIT_READ: "audit.read",
  SETTINGS_READ: "settings.read",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
