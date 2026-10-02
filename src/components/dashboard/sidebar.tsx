"use client";

import { ChevronsLeft, ChevronsRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { appConfig } from "@/config/app.config";
import type { NavigationItem } from "@/config/navigation";
import { useAuth } from "@/hooks/use-auth";
import { getVisibleNavigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

import { AppLogo } from "./app-logo";
import { OrganizationSwitcher } from "./organization-switcher";

function NavGroup({
  title,
  items,
  pathname,
  onNavigate,
  collapsed = false,
}: {
  title: string;
  items: NavigationItem[];
  pathname: string;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  if (!items.length) return null;

  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="text-muted-foreground px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase">
          {title}
        </p>
      )}
      {items.map((item) => {
        const link = (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-label={collapsed ? item.label : undefined}
            aria-current={pathname === item.href ? "page" : undefined}
            className={cn(
              "flex min-w-0 items-center gap-3 rounded-md py-2 text-sm font-medium transition-colors",
              collapsed ? "justify-center px-2" : "px-3",
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {!collapsed && (
              <span className="min-w-0 truncate">{item.label}</span>
            )}
          </Link>
        );

        return collapsed ? (
          <Tooltip key={item.href}>
            <TooltipTrigger asChild>{link}</TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
          </Tooltip>
        ) : (
          link
        );
      })}
    </div>
  );
}

function SidebarContent({
  onNavigate,
  collapsed = false,
}: {
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  const pathname = usePathname();
  const { account } = useAuth();
  const visibleNavigation = getVisibleNavigation(account);
  const visibleItems = visibleNavigation.filter((item) => !item.children);
  const visibleChildren = (href: string) =>
    visibleNavigation.find((item) => item.href === href)?.children ?? [];
  return (
    <TooltipProvider>
      <div className="flex h-full min-h-0 min-w-0 flex-col gap-5 overflow-hidden p-4 pb-16">
        <AppLogo collapsed={collapsed} />
        {!collapsed && <OrganizationSwitcher />}
        <nav
          aria-label="Primary"
          className="-mx-1 min-h-0 min-w-0 flex-1 space-y-6 overflow-x-hidden overflow-y-auto overscroll-contain px-1"
        >
          <NavGroup
            title="Workspace"
            items={visibleItems}
            pathname={pathname}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
          <NavGroup
            title="Operations"
            items={visibleChildren("/billing")}
            pathname={pathname}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
          <NavGroup
            title="Settings"
            items={visibleChildren("/settings")}
            pathname={pathname}
            onNavigate={onNavigate}
            collapsed={collapsed}
          />
        </nav>
        {!collapsed && (
          <p className="text-muted-foreground min-w-0 truncate px-2 text-xs">
            {appConfig.name} v{appConfig.version}
          </p>
        )}
      </div>
    </TooltipProvider>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("novasaas-sidebar-collapsed");
    if (saved === "true") {
      // The browser-only persisted preference is applied after hydration.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollapsed(true);
    }
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";
      if (
        !isEditable &&
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "b"
      ) {
        event.preventDefault();
        setCollapsed((value) => {
          const next = !value;
          window.localStorage.setItem(
            "novasaas-sidebar-collapsed",
            String(next),
          );
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <>
      <aside
        className={cn(
          "bg-sidebar relative hidden h-dvh shrink-0 border-r transition-[width] duration-200 lg:flex lg:flex-col",
          collapsed ? "w-20" : "w-64",
        )}
      >
        <SidebarContent collapsed={collapsed} />
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          onClick={() => {
            setCollapsed((value) => {
              const next = !value;
              window.localStorage.setItem(
                "novasaas-sidebar-collapsed",
                String(next),
              );
              return next;
            });
          }}
        >
          {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
        </Button>
      </aside>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-3 left-3 z-50 lg:hidden"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            className="bg-foreground/20 absolute inset-0"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          />
          <aside className="bg-sidebar relative z-10 h-dvh max-h-dvh w-[min(18rem,calc(100vw-2rem))] border-r">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
