"use client";

import { canAccess, type Permission } from "@/config/auth.config";
import { useAuth } from "@/hooks/use-auth";

export function usePermissions() {
  const { account } = useAuth();
  return {
    can: (permission?: Permission) => canAccess(account, permission),
    role: account?.role ?? null,
    permissions: account?.permissions ?? [],
  };
}
