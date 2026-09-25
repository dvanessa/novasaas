"use client";

import type { Permission } from "@/config/auth.config";
import { usePermissions } from "@/hooks/use-permissions";

export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const { can } = usePermissions();
  return can(permission) ? children : fallback;
}
