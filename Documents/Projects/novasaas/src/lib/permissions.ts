import { getRoutePermission } from "@/config/route-permissions.config";
import type { DemoUser } from "@/types/auth";
import type { Permission } from "@/types/permissions";

export function hasPermission(
  user: DemoUser | null,
  permission: Permission,
): boolean {
  return Boolean(user?.permissions.includes(permission));
}

export function hasAnyPermission(
  user: DemoUser | null,
  permissions: readonly Permission[],
): boolean {
  return permissions.some((permission) => hasPermission(user, permission));
}

export function hasAllPermissions(
  user: DemoUser | null,
  permissions: readonly Permission[],
): boolean {
  return permissions.every((permission) => hasPermission(user, permission));
}

export function canAccessRoute(
  user: DemoUser | null,
  pathname: string,
): boolean {
  const permission = getRoutePermission(pathname);
  return permission ? hasPermission(user, permission) : false;
}
