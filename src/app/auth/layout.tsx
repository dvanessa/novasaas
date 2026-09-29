import type { ReactNode } from "react";

import { AppLogo } from "@/components/dashboard/app-logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-muted/30 flex min-h-screen flex-col items-center justify-center px-4 py-10">
      <div className="mb-8">
        <AppLogo />
      </div>
      {children}
    </main>
  );
}
