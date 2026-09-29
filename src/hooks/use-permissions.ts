"use client";

import { useAuth } from "@/hooks/use-auth";
import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "@/lib/permissions";
import type { Permission } from "@/types/permissions";

export function usePermissions() {
  const { account } = useAuth();
  return {
    can: (permission: Permission) => hasPermission(account, permission),
    canAny: (permissions: readonly Permission[]) =>
      hasAnyPermission(account, permissions),
    canAll: (permissions: readonly Permission[]) =>
      hasAllPermissions(account, permissions),
    role: account?.role ?? null,
    permissions: account?.permissions ?? [],
  };
}
