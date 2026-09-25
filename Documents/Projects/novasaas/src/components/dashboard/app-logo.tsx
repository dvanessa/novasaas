import Link from "next/link";

export function AppLogo({ href = "/dashboard" }: { href?: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2.5 font-semibold tracking-tight"
    >
      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold shadow-sm">
        N
      </span>
      <span>NovaSaaS</span>
    </Link>
  );
}
