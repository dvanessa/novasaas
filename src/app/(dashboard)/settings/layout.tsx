import Link from "next/link";
import type { ReactNode } from "react";

import { PageContainer } from "@/components/dashboard/page-container";
import { settingsNavigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return (
    <PageContainer
      title="Settings"
      description="Manage your workspace preferences and account settings."
    >
      <div className="grid gap-8 lg:grid-cols-[180px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {settingsNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "hover:bg-accent rounded-md px-3 py-2 text-sm font-medium whitespace-nowrap",
                "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </PageContainer>
  );
}
