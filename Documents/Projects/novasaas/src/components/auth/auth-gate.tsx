"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { canAccess, type Permission } from "@/config/auth.config";
import { getNavItem } from "@/config/navigation";
import { useAuth } from "@/hooks/use-auth";

export function AuthGate({
  children,
  permission,
}: {
  children: React.ReactNode;
  permission?: Permission;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { account, hydrated } = useAuth();
  const requiredPermission =
    permission ?? (getNavItem(pathname)?.permission as Permission | undefined);

  useEffect(() => {
    if (hydrated && !account) {
      router.replace(`/auth/login?next=${encodeURIComponent(pathname)}`);
    } else if (hydrated && account && !canAccess(account, requiredPermission)) {
      router.replace(`/forbidden?from=${encodeURIComponent(pathname)}`);
    }
  }, [account, hydrated, pathname, requiredPermission, router]);

  if (!hydrated || !account || !canAccess(account, requiredPermission)) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        <p className="text-muted-foreground text-sm">Checking demo session…</p>
      </div>
    );
  }
  return children;
}
