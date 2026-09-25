"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore } from "react";

import { canAccessRoute } from "@/lib/permissions";
import { getSafeReturnUrl } from "@/lib/safe-return-url";
import {
  getAuthStoreServerSnapshot,
  getAuthStoreSnapshot,
  initializeAuthStore,
  login as loginToStore,
  logout as logoutFromStore,
  subscribeAuthStore,
  switchAccount as switchStoreAccount,
} from "@/stores/auth.store";
import type { LoginCredentials } from "@/types/auth";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUser, status, hydrated } = useSyncExternalStore(
    subscribeAuthStore,
    getAuthStoreSnapshot,
    getAuthStoreServerSnapshot,
  );

  useEffect(() => {
    initializeAuthStore();
  }, []);

  const signIn = useCallback(
    async (credentials: LoginCredentials, returnTo?: string) => {
      const result = await loginToStore(credentials);
      if (result.success) router.replace(getSafeReturnUrl(returnTo));
      return result;
    },
    [router],
  );

  const switchAccount = useCallback(
    async (accountId: string) => {
      const result = await switchStoreAccount(accountId);
      if (result.success && !canAccessRoute(result.data, pathname)) {
        router.replace("/dashboard");
      }
      return result;
    },
    [pathname, router],
  );

  const signOut = useCallback(async () => {
    const result = await logoutFromStore();
    if (result.success) router.replace("/login");
    return result;
  }, [router]);

  return {
    account: currentUser,
    currentUser,
    status,
    hydrated,
    signIn,
    switchAccount,
    signOut,
  };
}
