"use client";

import { Monitor, MoonStar, SunMedium } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const THEME_OPTIONS = [
  { value: "light", label: "Light", icon: SunMedium },
  { value: "dark", label: "Dark", icon: MoonStar },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const activeTheme = resolvedTheme ?? theme ?? "system";
  const currentTheme =
    THEME_OPTIONS.find((option) => option.value === activeTheme) ??
    THEME_OPTIONS[2];
  const CurrentIcon = currentTheme.icon;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-border/80 bg-background/80 text-foreground gap-2 shadow-sm backdrop-blur-sm"
          aria-label="Select color theme"
        >
          <CurrentIcon className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onSelect={() => setTheme(value)}
            className="flex cursor-pointer items-center justify-between"
            aria-label={`Set theme to ${label}`}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" aria-hidden="true" />
              {label}
            </span>
            {activeTheme === value && <span className="text-xs">✓</span>}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
