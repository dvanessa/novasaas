"use client";

import { Building2, Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function OrganizationSwitcher() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between px-2">
          <span className="flex items-center gap-2">
            <span className="bg-accent text-primary flex size-7 items-center justify-center rounded-md text-xs font-bold">
              AI
            </span>
            <span className="truncate text-left text-sm">
              <span className="block">Acme Inc.</span>
              <span className="text-muted-foreground block text-xs font-normal">
                Pro plan
              </span>
            </span>
          </span>
          <ChevronsUpDown className="text-muted-foreground size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuItem>
          <Check className="text-primary mr-2 size-4" />
          <span className="bg-accent text-primary mr-2 flex size-6 items-center justify-center rounded text-[10px] font-bold">
            AI
          </span>
          <span>
            Acme Inc. <span className="text-muted-foreground text-xs">Pro</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Building2 className="text-muted-foreground mr-2 size-4" />
          <span className="bg-muted mr-2 flex size-6 items-center justify-center rounded text-[10px] font-bold">
            HL
          </span>
          <span>
            Horizon Labs{" "}
            <span className="text-muted-foreground text-xs">Business</span>
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Building2 className="text-muted-foreground mr-2 size-4" />
          <span className="bg-muted mr-2 flex size-6 items-center justify-center rounded text-[10px] font-bold">
            NS
          </span>
          <span>
            Nova Studio{" "}
            <span className="text-muted-foreground text-xs">Enterprise</span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
