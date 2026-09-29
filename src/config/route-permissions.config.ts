import type { ProtectedRouteConfiguration } from "@/types/auth";
import { type Permission, PERMISSIONS } from "@/types/permissions";

export const ROUTE_PERMISSIONS: readonly ProtectedRouteConfiguration[] = [
  { pathname: "/dashboard", permission: PERMISSIONS.DASHBOARD_VIEW },
  { pathname: "/analytics", permission: PERMISSIONS.ANALYTICS_VIEW },
  { pathname: "/organizations", permission: PERMISSIONS.ORGANIZATIONS_VIEW },
  { pathname: "/users", permission: PERMISSIONS.USERS_VIEW },
  { pathname: "/roles", permission: PERMISSIONS.ROLES_VIEW },
  { pathname: "/subscriptions", permission: PERMISSIONS.SUBSCRIPTIONS_VIEW },
  { pathname: "/billing", permission: PERMISSIONS.BILLING_VIEW },
  { pathname: "/billing/invoices", permission: PERMISSIONS.INVOICES_VIEW },
  { pathname: "/notifications", permission: PERMISSIONS.NOTIFICATIONS_VIEW },
  { pathname: "/audit-log", permission: PERMISSIONS.AUDIT_LOG_VIEW },
  {
    pathname: "/settings/profile",
    permission: PERMISSIONS.SETTINGS_PROFILE_VIEW,
  },
  {
    pathname: "/settings/organization",
    permission: PERMISSIONS.SETTINGS_ORGANIZATION_VIEW,
  },
  {
    pathname: "/settings/security",
    permission: PERMISSIONS.SETTINGS_SECURITY_VIEW,
  },
  {
    pathname: "/settings/billing",
    permission: PERMISSIONS.SETTINGS_BILLING_VIEW,
  },
  {
    pathname: "/settings/appearance",
    permission: PERMISSIONS.SETTINGS_APPEARANCE_VIEW,
  },
  { pathname: "/settings", permission: PERMISSIONS.SETTINGS_PROFILE_VIEW },
];

export function getRoutePermission(pathname: string): Permission | undefined {
  const normalizedPath =
    pathname.split(/[?#]/, 1)[0].replace(/\/+$/, "") || "/";
  const match = ROUTE_PERMISSIONS.filter(
    ({ pathname: routePath }) =>
      normalizedPath === routePath ||
      normalizedPath.startsWith(`${routePath}/`),
  ).sort((left, right) => right.pathname.length - left.pathname.length)[0];
  return match?.permission;
}
