import type { ReactNode } from "react";

import { AuthGate } from "@/components/auth/auth-gate";
import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <AuthGate>
      <div className="bg-background flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardHeader />
          {children}
        </div>
      </div>
    </AuthGate>
  );
}
