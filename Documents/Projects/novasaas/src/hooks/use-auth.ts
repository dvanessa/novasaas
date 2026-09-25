"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useSyncExternalStore } from "react";

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
    async (credentials: LoginCredentials) => {
      const result = await loginToStore(credentials);
      if (result.success) router.push("/dashboard");
      return result;
    },
    [router],
  );

  const switchAccount = useCallback(
    async (accountId: string) => {
      const result = await switchStoreAccount(accountId);
      if (result.success) router.push("/dashboard");
      return result;
    },
    [router],
  );

  const signOut = useCallback(async () => {
    const result = await logoutFromStore();
    if (result.success) {
      router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
    }
    return result;
  }, [pathname, router]);

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
