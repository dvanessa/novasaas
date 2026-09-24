"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { allNavigation } from "@/config/navigation";

export function Breadcrumbs() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = parts.map((part, index) => {
    const href = `/${parts.slice(0, index + 1).join("/")}`;
    const item = allNavigation.find((entry) => entry.href === href);
    return { href, label: item?.label ?? part.replaceAll("-", " ") };
  });
  return (
    <nav
      aria-label="Breadcrumb"
      className="text-muted-foreground flex items-center gap-1.5 text-sm"
    >
      <Link href="/dashboard" className="hover:text-foreground">
        <Home className="size-3.5" />
      </Link>
      {crumbs
        .filter((crumb) => crumb.href !== "/dashboard")
        .map((crumb, index, visibleCrumbs) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5" />
            {index === visibleCrumbs.length - 1 ? (
              <span aria-current="page" className="text-foreground capitalize">
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className="hover:text-foreground capitalize"
              >
                {crumb.label}
              </Link>
            )}
          </span>
        ))}
    </nav>
  );
}
