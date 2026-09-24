import type { ReactNode } from "react";

import { DashboardHeader } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader />
        {children}
      </div>
    </div>
  );
}
