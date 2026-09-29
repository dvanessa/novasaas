"use client";

import { CreditCard, LogOut, Palette, Settings, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { listDemoAccounts } from "@/features/auth/services/auth.service";
import { useAuth } from "@/hooks/use-auth";
import { hasPermission } from "@/lib/permissions";
import { type DemoUser, ROLE_LABELS } from "@/types/auth";
import { PERMISSIONS } from "@/types/permissions";

export function UserMenu() {
  const { account, switchAccount, signOut } = useAuth();
  const [demoUsers, setDemoUsers] = useState<DemoUser[]>([]);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    let active = true;
    void listDemoAccounts().then((users) => {
      if (active) setDemoUsers(users);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full focus-visible:outline-none"
        aria-label="Open user menu"
      >
        <Avatar>
          <AvatarFallback>{account?.initials ?? "?"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>
          <p className="font-medium">{account?.name ?? "Demo user"}</p>
          <p className="text-muted-foreground text-xs font-normal">
            {account?.email ?? "Not signed in"}
          </p>
          <p className="text-muted-foreground text-xs font-normal">
            {account ? ROLE_LABELS[account.role] : "Guest"}
          </p>
          <p className="text-muted-foreground text-xs font-normal">
            {account?.organization ?? "No organization"}
          </p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Switch demo account</DropdownMenuLabel>
        {demoUsers.map((candidate) =>
          candidate.id === account?.id ? (
            <DropdownMenuItem key={candidate.id} disabled>
              Current: {candidate.name} · {ROLE_LABELS[candidate.role]}
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              key={candidate.id}
              onClick={async () => {
                const result = await switchAccount(candidate.id);
                if (!result.success) {
                  setActionMessage(result.error.message);
                } else {
                  setActionMessage(
                    `Switched demo account to ${candidate.name}.`,
                  );
                }
              }}
            >
              Use {candidate.name} · {ROLE_LABELS[candidate.role]}
            </DropdownMenuItem>
          ),
        )}
        {actionMessage ? (
          <p className="text-muted-foreground px-2 py-1 text-xs" role="status">
            {actionMessage}
          </p>
        ) : null}
        <DropdownMenuSeparator />
        {hasPermission(account, PERMISSIONS.SETTINGS_PROFILE_VIEW) ? (
          <DropdownMenuItem asChild>
            <Link href="/settings/profile">
              <User className="mr-2 size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
        ) : null}
        {hasPermission(account, PERMISSIONS.SETTINGS_ORGANIZATION_VIEW) ? (
          <DropdownMenuItem asChild>
            <Link href="/settings/organization">
              <Settings className="mr-2 size-4" />
              Organization settings
            </Link>
          </DropdownMenuItem>
        ) : null}
        {hasPermission(account, PERMISSIONS.SETTINGS_BILLING_VIEW) ? (
          <DropdownMenuItem asChild>
            <Link href="/settings/billing">
              <CreditCard className="mr-2 size-4" />
              Billing settings
            </Link>
          </DropdownMenuItem>
        ) : null}
        {hasPermission(account, PERMISSIONS.SETTINGS_APPEARANCE_VIEW) ? (
          <DropdownMenuItem asChild>
            <Link href="/settings/appearance">
              <Palette className="mr-2 size-4" />
              Appearance
            </Link>
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={async () => {
            const result = await signOut();
            if (!result.success) setActionMessage(result.error.message);
          }}
        >
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
