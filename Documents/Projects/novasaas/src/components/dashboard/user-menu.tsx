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

export function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="rounded-full focus-visible:outline-none"
        aria-label="Open user menu"
      >
        <Avatar>
          <AvatarFallback>VD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52">
        <DropdownMenuLabel>
          <p className="font-medium">Vanessa Duarte</p>
          <p className="text-muted-foreground text-xs font-normal">
            vanessa@example.com
          </p>
          <p className="text-muted-foreground text-xs font-normal">
            Super Admin
          </p>
        </DropdownMenuLabel>
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
        <DropdownMenuItem>
          <LogOut className="mr-2 size-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
