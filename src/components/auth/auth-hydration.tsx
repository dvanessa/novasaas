"use client";

import { useAuth } from "@/hooks/use-auth";

export function AuthHydration({ children }: { children: React.ReactNode }) {
  const { hydrated } = useAuth();
  return hydrated ? children : null;
}
