"use client";

"use client";

import type { ReactNode } from "react";

import { useAuth } from "@/hooks/use-auth";
import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "@/lib/permissions";
import type { Permission } from "@/types/permissions";

export function PermissionGuard({
  permission,
  anyPermissions,
  allPermissions,
  children,
  fallback = null,
  disabledWhenUnauthorized = false,
}: {
  permission?: Permission;
  anyPermissions?: readonly Permission[];
  allPermissions?: readonly Permission[];
  children: ReactNode;
  fallback?: ReactNode;
  disabledWhenUnauthorized?: boolean;
}) {
  const { account, hydrated } = useAuth();
  const allowed = !hydrated
    ? false
    : permission
      ? hasPermission(account, permission)
      : anyPermissions
        ? hasAnyPermission(account, anyPermissions)
        : allPermissions
          ? hasAllPermissions(account, allPermissions)
          : false;
  if (allowed) return children;
  if (disabledWhenUnauthorized) {
    return (
      <fieldset
        disabled
        aria-disabled="true"
        className="m-0 min-w-0 border-0 p-0 opacity-50"
      >
        {children}
      </fieldset>
    );
  }
  return fallback;
}
