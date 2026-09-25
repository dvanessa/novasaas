"use client";

import { CreditCard, LogOut, Palette, Settings, User } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEMO_ACCOUNTS } from "@/config/auth.config";
import { useAuth } from "@/hooks/use-auth";
import { ROLE_LABELS } from "@/types/auth";

export function UserMenu() {
  const { account, signIn, signOut } = useAuth();
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
        {DEMO_ACCOUNTS.filter((candidate) => candidate.id !== account?.id).map(
          (candidate) => (
            <DropdownMenuItem
              key={candidate.id}
              onClick={() => signIn(candidate)}
            >
              Switch to {candidate.name}
            </DropdownMenuItem>
          ),
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings/profile">
            <User className="mr-2 size-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/organization">
            <Settings className="mr-2 size-4" />
            Organization settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/billing">
            <CreditCard className="mr-2 size-4" />
            Billing
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/settings/appearance">
            <Palette className="mr-2 size-4" />
            Appearance
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
