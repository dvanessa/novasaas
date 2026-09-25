import Link from "next/link";

import { ThemeToggle } from "@/components/theme/theme-toggle";

export default function Home() {
  return (
    <main className="bg-background flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl space-y-5 text-center">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
        <p className="text-primary text-sm font-semibold tracking-[0.24em] uppercase">
          NovaSaaS
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Your workspace, in one place.
        </h1>
        <p className="text-muted-foreground">
          A frontend dashboard foundation for modern SaaS teams.
        </p>
        <Link
          href="/auth/login"
          className="bg-primary text-primary-foreground inline-flex rounded-md px-5 py-2.5 text-sm font-medium"
        >
          Explore the demo
        </Link>
      </div>
    </main>
  );
}
