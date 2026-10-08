import {
  ArrowRight,
  Check,
  Code2,
  Command,
  KeyRound,
  LayoutDashboard,
  MoonStar,
  PanelLeft,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { KitWaitlistForm } from "@/components/marketing/kit-waitlist-form";
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

const freeFeatures = [
  "Responsive dashboard shell",
  "Demo authentication flows",
  "Typed roles and permissions",
  "Light, dark, and system themes",
  "Reusable UI component library",
  "MIT-licensed source code",
];

const proFeatures = [
  "Advanced analytics and filters",
  "Production-ready data tables",
  "User and organization workflows",
  "Configurable roles and permissions",
  "Billing and invoice screens",
  "Additional layouts and API adapters",
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
            <a
              href="https://github.com/dvanessa/novasaas"
              target="_blank"
              rel="noreferrer"
              aria-label="View NovaSaaS on GitHub"
              className={buttonVariants({ size: "icon", variant: "ghost" })}
            >
              <Code2 aria-hidden="true" className="size-4" />
            </a>
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
              <a
                href="https://github.com/dvanessa/novasaas"
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: "lg" })}
              >
                <Code2 aria-hidden="true" className="size-4" />
                Get the source
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <Link
                href="/login"
                className={buttonVariants({ size: "lg", variant: "outline" })}
              >
                Explore the dashboard
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

          <Card className="bg-card/85 relative min-w-0 overflow-hidden p-2 shadow-2xl shadow-indigo-500/10 backdrop-blur sm:p-3">
            <Image
              src="/images/novasaas-dashboard.jpg"
              alt="NovaSaaS Free dashboard showing SaaS metrics, revenue, subscriptions, and recent activity"
              width={1363}
              height={936}
              priority
              className="border-border h-auto w-full rounded-lg border"
            />
          </Card>
        </div>
      </section>

      <section className="bg-muted/45 border-y">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase">
              Free today, Pro next
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Start free and grow with NovaSaaS
            </h2>
            <p className="text-muted-foreground mt-4">
              The Free edition is ready to use now. NovaSaaS Pro will focus on
              complete workflows that save even more development time.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 lg:grid-cols-2">
            <Card>
              <CardContent className="p-6 sm:p-8">
                <Badge variant="secondary">Available now</Badge>
                <h3 className="mt-5 text-2xl font-semibold">NovaSaaS Free</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  A polished open-source foundation for prototypes, portfolios,
                  and real SaaS frontends.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {freeFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="text-success mt-0.5 size-4 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://github.com/dvanessa/novasaas"
                  target="_blank"
                  rel="noreferrer"
                  className={buttonVariants({ className: "mt-8 w-full" })}
                >
                  <Code2 aria-hidden="true" className="size-4" />
                  View on GitHub
                </a>
              </CardContent>
            </Card>

            <Card className="border-primary/35 relative overflow-hidden">
              <div className="bg-primary/8 absolute inset-x-0 top-0 h-24" />
              <CardContent className="relative p-6 sm:p-8">
                <Badge>In development</Badge>
                <h3 className="mt-5 flex items-center gap-2 text-2xl font-semibold">
                  NovaSaaS Pro
                  <Sparkles
                    aria-hidden="true"
                    className="text-primary size-5"
                  />
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  Complete feature modules for developers, founders, and
                  agencies who want to ship faster.
                </p>
                <ul className="mt-6 space-y-3 text-sm">
                  {proFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        aria-hidden="true"
                        className="text-primary mt-0.5 size-4 shrink-0"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground bg-accent mt-8 rounded-md px-4 py-3 text-center text-sm font-medium">
                  Early-access registration is open now.
                </p>
                <Link
                  href="#pro-waitlist"
                  className={buttonVariants({
                    className: "mt-3 w-full",
                    variant: "outline",
                  })}
                >
                  Join the NovaSaaS Pro waitlist
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="pro-waitlist"
        aria-labelledby="pro-waitlist-heading"
        className="border-border bg-muted/45 border-b"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-center lg:gap-12 lg:px-8">
          <div className="min-w-0">
            <p className="text-primary text-sm font-semibold tracking-wider uppercase">
              NovaSaaS Pro
            </p>
            <h2
              id="pro-waitlist-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
            >
              Get early access to NovaSaaS Pro
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl leading-7">
              Join the waitlist to receive launch updates, early access, and an
              exclusive introductory discount.
            </p>
          </div>
          <div className="border-border bg-card min-w-0 rounded-xl border p-4 shadow-sm sm:p-6">
            <KitWaitlistForm />
          </div>
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
