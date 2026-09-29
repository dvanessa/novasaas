"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";
import { canAccessRoute, hasPermission } from "@/lib/permissions";
import type { Permission } from "@/types/permissions";

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
  const allowed = permission
    ? hasPermission(account, permission)
    : canAccessRoute(account, pathname);

  useEffect(() => {
    if (hydrated && !account) {
      router.replace(`/login?returnTo=${encodeURIComponent(pathname)}`);
    } else if (hydrated && account && !allowed) {
      router.replace(`/forbidden?from=${encodeURIComponent(pathname)}`);
    }
  }, [account, allowed, hydrated, pathname, router]);

  if (!hydrated || !account || !allowed) {
    return (
      <div className="bg-background flex min-h-screen items-center justify-center">
        <div
          className="w-full max-w-sm space-y-4 px-6"
          role="status"
          aria-live="polite"
        >
          <p className="text-muted-foreground text-center text-sm">
            Checking your demo session and page access…
          </p>
          <div className="bg-muted h-2 animate-pulse rounded-full motion-reduce:animate-none" />
          <div className="bg-muted mx-auto h-2 w-2/3 animate-pulse rounded-full motion-reduce:animate-none" />
        </div>
      </div>
    );
  }
  return children;
}
