import { appConfig } from "@/config/app.config";

export default function Home() {
  return (
    <main className="flex min-h-full items-center justify-center px-6 py-16 sm:px-10">
      <section className="border-border bg-card w-full max-w-2xl rounded-3xl border p-8 text-center shadow-xl shadow-indigo-950/5 sm:p-12">
        <div className="border-primary/20 bg-primary/10 text-primary mb-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold">
          <span
            className="size-1.5 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          Foundation ready
        </div>
        <p className="text-primary mb-4 text-sm font-semibold tracking-[0.22em] uppercase">
          {appConfig.name}
        </p>
        <h1 className="text-foreground text-4xl font-semibold tracking-tight sm:text-5xl">
          Premium SaaS Admin Dashboard
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-lg text-base leading-7 sm:text-lg">
          The foundation is in place. The NovaSaaS design system will be
          implemented next.
        </p>
      </section>
    </main>
  );
}
