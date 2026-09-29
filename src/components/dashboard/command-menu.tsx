"use client";

import { Command, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { getVisibleNavigationItems } from "@/lib/navigation";

export function CommandMenu() {
  const { account } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const visibleNavigation = getVisibleNavigationItems(account);
  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return visibleNavigation;
    return visibleNavigation.filter((item) =>
      [item.label, item.description, ...(item.keywords ?? [])]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(normalizedQuery)),
    );
  }, [query, visibleNavigation]);
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isEditable =
        target?.isContentEditable ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";
      if (isEditable) return;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
        setQuery("");
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="border-input bg-background text-muted-foreground hover:bg-accent flex h-9 w-full items-center gap-2 rounded-md border px-3 text-sm md:max-w-xs"
        aria-label="Open command menu"
      >
        <Search className="size-4" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="bg-muted hidden rounded px-1.5 py-0.5 text-[10px] sm:inline-flex">
          <Command className="mr-0.5 size-3" />K
        </kbd>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-lg">
          <DialogTitle className="sr-only">Command menu</DialogTitle>
          <div className="flex items-center border-b px-3">
            <Search className="text-muted-foreground size-4" />
            <Input
              autoFocus
              className="border-0 shadow-none focus-visible:ring-0"
              placeholder="Search pages..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="max-h-80 overflow-auto p-2">
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="hover:bg-accent flex items-center gap-3 rounded-md px-3 py-2 text-sm"
                >
                  <item.icon className="text-muted-foreground size-4" />
                  {item.label}
                </Link>
              ))
            ) : (
              <p className="text-muted-foreground px-3 py-6 text-center text-sm">
                No pages found.
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
