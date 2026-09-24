"use client";

import { Bell, CheckCircle2, Info, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function NotificationsPreview() {
  const [unread, setUnread] = useState(5);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="size-4" />
          {unread > 0 && (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex min-h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] font-semibold">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          <button
            type="button"
            className="text-primary text-xs font-normal hover:underline"
            onClick={() => setUnread(0)}
          >
            Mark all as read
          </button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="bg-accent/40 flex gap-3 p-3 text-sm">
          <CheckCircle2 className="text-success mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Weekly report is ready</p>
            <p className="text-muted-foreground text-xs">
              Your latest workspace summary is available.
            </p>
          </div>
        </div>
        <div className="flex gap-3 border-t p-3 text-sm">
          <ShieldAlert className="text-warning mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Security alert</p>
            <p className="text-muted-foreground text-xs">
              A new sign-in was detected.
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link
          href="/notifications"
          className="text-primary block px-3 py-2 text-center text-sm font-medium hover:underline"
        >
          View all notifications
        </Link>
        <div className="flex gap-3 border-t p-3 text-sm">
          <Info className="text-info mt-0.5 size-4 shrink-0" />
          <div>
            <p className="font-medium">Welcome to NovaSaaS</p>
            <p className="text-muted-foreground text-xs">
              Complete your workspace setup to get started.
            </p>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
