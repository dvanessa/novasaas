"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { type DemoAccount } from "@/config/auth.config";
import { toDemoUser } from "@/lib/auth-service";
import {
  clearDemoSession,
  readDemoAccount,
  saveDemoSession,
} from "@/lib/auth-store";
import {
  AUTH_STATUSES,
  type AuthenticationStatus,
  type DemoUser,
} from "@/types/auth";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [account, setAccount] = useState<DemoUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  const refresh = useCallback(() => {
    setAccount(readDemoAccount());
    setHydrated(true);
  }, []);

  useEffect(() => {
    // localStorage is only available in the browser, so hydrate after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refresh();
    const onChange = () => refresh();
    window.addEventListener("storage", onChange);
    window.addEventListener("novasaas-auth-change", onChange);
    return () => {
      window.removeEventListener("storage", onChange);
      window.removeEventListener("novasaas-auth-change", onChange);
    };
  }, [refresh]);

  const signIn = useCallback(
    (nextAccount: DemoAccount) => {
      saveDemoSession(nextAccount);
      setAccount(toDemoUser(nextAccount));
      router.push("/dashboard");
    },
    [router],
  );

  const signOut = useCallback(() => {
    clearDemoSession();
    setAccount(null);
    router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
  }, [pathname, router]);

  const status: AuthenticationStatus = !hydrated
    ? AUTH_STATUSES.LOADING
    : account
      ? AUTH_STATUSES.AUTHENTICATED
      : AUTH_STATUSES.UNAUTHENTICATED;

  return { account, hydrated, status, signIn, signOut };
}
