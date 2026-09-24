"use client";

import { ChevronsLeft, ChevronsRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  mainNavigation,
  settingsNavigation,
  utilityNavigation,
  workspaceNavigation,
} from "@/config/navigation";
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
  items: typeof mainNavigation;
  pathname: string;
  onNavigate?: () => void;
  collapsed?: boolean;
}) {
  return (
    <div className="space-y-1">
      {!collapsed && (
        <p className="text-muted-foreground px-3 pb-1 text-[11px] font-semibold tracking-wider uppercase">
          {title}
        </p>
      )}
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
            pathname === item.href
              ? "bg-accent text-accent-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground",
          )}
        >
          <item.icon className="size-4 shrink-0" />
          {!collapsed && item.label}
        </Link>
      ))}
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
  return (
    <div className="flex h-full flex-col gap-5 p-4">
      <AppLogo />
      {!collapsed && <OrganizationSwitcher />}
      <nav className="flex-1 space-y-6 overflow-y-auto">
        <NavGroup
          title="Workspace"
          items={mainNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
        <NavGroup
          title="Operations"
          items={workspaceNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
        <NavGroup
          title="Settings"
          items={settingsNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
        <NavGroup
          title="Support"
          items={utilityNavigation}
          pathname={pathname}
          onNavigate={onNavigate}
          collapsed={collapsed}
        />
      </nav>
      {!collapsed && (
        <p className="text-muted-foreground px-2 text-xs">NovaSaaS v0.1.0</p>
      )}
    </div>
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
          "bg-sidebar hidden shrink-0 border-r transition-[width] duration-200 lg:block",
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
          <aside className="bg-sidebar relative z-10 h-full w-72 border-r">
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  );
}
