import {
  ArrowRight,
  Check,
  Command,
  KeyRound,
  LayoutDashboard,
  MoonStar,
  PanelLeft,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { appConfig } from "@/config/app.config";

const features = [
  {
    title: "Responsive dashboard",
    description:
      "A polished shell with adaptive navigation for desktop and mobile.",
    icon: LayoutDashboard,
  },
  {
    title: "Demo authentication",
    description:
      "Accessible login, registration, recovery, and verification flows.",
    icon: KeyRound,
  },
  {
    title: "Roles and permissions",
    description:
      "Typed demo roles, permission-aware navigation, and route guards.",
    icon: ShieldCheck,
  },
  {
    title: "Light and dark themes",
    description:
      "System-aware themes built on reusable semantic design tokens.",
    icon: MoonStar,
  },
  {
    title: "Collapsible sidebar",
    description: "Persistent desktop preferences and a focused mobile drawer.",
    icon: PanelLeft,
  },
  {
    title: "Command navigation",
    description:
      "Permission-filtered keyboard navigation with Cmd or Ctrl + K.",
    icon: Command,
  },
];

export default function Home() {
  return (
    <main className="bg-background min-h-screen overflow-hidden">
      <header className="border-border/80 bg-background/85 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2.5 font-semibold tracking-tight"
          >
            <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold shadow-sm">
              N
            </span>
            NovaSaaS
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" className={buttonVariants({ size: "sm" })}>
              Live demo
            </Link>
          </div>
        </div>
      </header>

      <section className="relative border-b">
        <div className="bg-primary/10 absolute top-[-12rem] left-1/2 size-[34rem] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-32">
          <div className="max-w-2xl">
            <Badge variant="outline" className="bg-background/70 mb-6">
              Free and open source
            </Badge>
            <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Build your SaaS dashboard without starting from zero.
            </h1>
            <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
              A production-quality frontend foundation built with Next.js,
              TypeScript, Tailwind CSS, and accessible UI primitives.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/login" className={buttonVariants({ size: "lg" })}>
                Explore the dashboard
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <Link
                href="/design-system"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                View design system
              </Link>
            </div>
            <ul className="text-muted-foreground mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              {[
                "Next.js App Router",
                "Strict TypeScript",
                "Responsive",
                "Tested",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check aria-hidden="true" className="text-success size-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <Card className="bg-card/85 relative min-w-0 shadow-2xl shadow-indigo-500/10 backdrop-blur">
            <CardContent className="p-4 sm:p-6">
              <div className="border-border bg-background overflow-hidden rounded-lg border">
                <div className="border-border flex items-center gap-2 border-b px-4 py-3">
                  <span className="size-2.5 rounded-full bg-red-400" />
                  <span className="size-2.5 rounded-full bg-amber-400" />
                  <span className="size-2.5 rounded-full bg-emerald-400" />
                  <span className="text-muted-foreground ml-2 text-xs">
                    NovaSaaS / Dashboard
                  </span>
                </div>
                <div className="grid grid-cols-[4rem_1fr] sm:grid-cols-[7rem_1fr]">
                  <div className="bg-sidebar border-border min-h-72 border-r p-3">
                    <div className="bg-primary mb-5 size-7 rounded-md" />
                    <div className="space-y-3">
                      {[90, 68, 76, 56, 72].map((width, index) => (
                        <div
                          key={index}
                          className="bg-muted h-2 rounded-full"
                          style={{ width: `${width}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="min-w-0 p-4">
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <div className="bg-foreground/80 h-3 w-24 rounded-full" />
                        <div className="bg-muted mt-2 h-2 w-32 rounded-full" />
                      </div>
                      <div className="bg-primary size-7 rounded-full" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {["$48.2k", "2,420", "1,429", "2.4%"].map((value) => (
                        <div
                          key={value}
                          className="border-border rounded-lg border p-3"
                        >
                          <div className="text-muted-foreground text-[10px]">
                            Metric
                          </div>
                          <div className="mt-1 text-sm font-semibold">
                            {value}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="border-border mt-3 flex h-24 items-end gap-1.5 rounded-lg border p-3">
                      {[32, 45, 38, 62, 54, 76, 68, 88].map((height, index) => (
                        <span
                          key={index}
                          className="bg-primary/80 flex-1 rounded-t-sm"
                          style={{ height: `${height}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-primary text-sm font-semibold tracking-wider uppercase">
            Included in Free
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            A solid foundation for your next product
          </h2>
          <p className="text-muted-foreground mt-4">
            Use the complete shell and demo flows, then connect your own backend
            and business logic.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="transition-transform hover:-translate-y-0.5"
              >
                <CardContent className="p-6">
                  <span className="bg-accent text-primary flex size-10 items-center justify-center rounded-lg">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground mt-2 text-sm leading-6">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <footer className="border-t">
        <div className="text-muted-foreground mx-auto flex max-w-7xl flex-col gap-2 px-4 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2026 Vanessa Duarte. NovaSaaS Free v{appConfig.version}.</p>
          <p>Frontend demo · No real customer data</p>
        </div>
      </footer>
    </main>
  );
}
