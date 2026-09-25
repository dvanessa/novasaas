"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "@/hooks/use-auth";

export function GuestGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { account, hydrated } = useAuth();
  useEffect(() => {
    if (hydrated && account) router.replace("/dashboard");
  }, [account, hydrated, router]);
  if (!hydrated || account) return null;
  return children;
}
