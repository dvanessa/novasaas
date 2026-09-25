"use client";

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { type DemoAccount } from "@/config/auth.config";
import {
  clearDemoSession,
  readDemoAccount,
  saveDemoSession,
} from "@/lib/auth-store";

export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [account, setAccount] = useState<DemoAccount | null>(null);
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
      setAccount(nextAccount);
      router.push("/dashboard");
    },
    [router],
  );

  const signOut = useCallback(() => {
    clearDemoSession();
    setAccount(null);
    router.push(`/auth/login?next=${encodeURIComponent(pathname)}`);
  }, [pathname, router]);

  return { account, hydrated, signIn, signOut };
}
