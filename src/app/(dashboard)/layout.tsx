import type { ReactNode } from "react";

import { AuthGate } from "@/components/auth/auth-gate";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <div className="bg-background flex h-dvh w-full overflow-hidden">
        <a
          href="#main-content"
          className="bg-background text-foreground focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus:ring-2"
        >
          Skip to content
        </a>
        <Sidebar />
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <DashboardHeader />
          <div
            id="main-content"
            tabIndex={-1}
            className="min-h-0 min-w-0 flex-1 overflow-y-auto overscroll-y-contain"
          >
            {children}
          </div>
        </div>
      </div>
    </AuthGate>
  );
}
