import type { ReactNode } from "react";

import { AppLogo } from "@/components/dashboard/app-logo";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-muted/30 min-h-screen" aria-label="Authentication">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.9fr)]">
        <section className="flex flex-col px-5 py-8 sm:px-10 lg:px-14">
          <AppLogo href="/" />
          <div className="flex flex-1 items-center justify-center py-12">
            <div className="w-full max-w-md">{children}</div>
          </div>
          <p className="text-muted-foreground text-center text-xs lg:text-left">
            NovaSaaS demo · Frontend experience only
          </p>
        </section>
        <aside className="border-border bg-card relative hidden flex-col justify-between border-l p-12 lg:flex">
          <div className="max-w-lg space-y-5">
            <p className="text-primary text-xs font-semibold tracking-[0.18em] uppercase">
              NovaSaaS · Workspace access
            </p>
            <h1 className="text-foreground text-4xl leading-tight font-semibold tracking-tight">
              A clear foundation for secure-by-design products.
            </h1>
            <p className="text-muted-foreground max-w-md text-base leading-7">
              Explore role-aware interface patterns with explicitly simulated
              demo accounts. No real accounts or services are connected.
            </p>
          </div>
          <div
            aria-hidden="true"
            className="border-border bg-background relative mx-auto flex aspect-[1.15] w-full max-w-lg items-center justify-center overflow-hidden rounded-xl border shadow-sm"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:32px_32px] opacity-30" />
            <div className="bg-card relative w-3/4 space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-md font-semibold">
                  N
                </span>
                <div className="space-y-2">
                  <div className="bg-muted h-2.5 w-32 rounded" />
                  <div className="bg-muted h-2 w-20 rounded" />
                </div>
              </div>
              <div className="bg-muted h-20 rounded-md" />
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-muted h-12 rounded-md" />
                <div className="bg-muted h-12 rounded-md" />
                <div className="bg-muted h-12 rounded-md" />
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-xs">
            Demo only — authorization must be enforced by a real backend.
          </p>
        </aside>
      </div>
    </main>
  );
}
