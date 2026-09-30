import Link from "next/link";

export function AppLogo({
  href = "/dashboard",
  collapsed = false,
}: {
  href?: string;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      aria-label="NovaSaaS dashboard"
      title={collapsed ? "NovaSaaS dashboard" : undefined}
      className="flex min-w-0 items-center gap-2.5 font-semibold tracking-tight"
    >
      <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-lg text-sm font-bold shadow-sm">
        N
      </span>
      {collapsed ? (
        <span className="sr-only">NovaSaaS</span>
      ) : (
        <span className="truncate">NovaSaaS</span>
      )}
    </Link>
  );
}
