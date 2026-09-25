import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  FileText,
  LayoutDashboard,
  Receipt,
  ScrollText,
  Settings,
  Shield,
  Sparkles,
  UserCircle,
  Users,
} from "lucide-react";

import type { Permission } from "@/types/permissions";

export type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavigationItem[];
  keywords?: string[];
  badge?: string;
  disabled?: boolean;
  permission?: Permission;
  description?: string;
};

export const navigation: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    keywords: ["home", "overview"],
    description: "Your workspace at a glance",
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    keywords: ["insights", "reports"],
    description: "Explore performance insights",
  },
  {
    label: "Organizations",
    href: "/organizations",
    icon: Building2,
    keywords: ["workspaces"],
    description: "Manage organizations",
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    keywords: ["members", "team"],
    description: "Manage users",
  },
  {
    label: "Roles & Permissions",
    href: "/roles",
    icon: Shield,
    keywords: ["access", "roles"],
    permission: "roles.read",
    description: "Manage access controls",
  },
  {
    label: "Revenue",
    href: "/subscriptions",
    icon: Receipt,
    keywords: ["subscriptions", "plans"],
    description: "Review subscription activity",
  },
  {
    label: "Operations",
    href: "/billing",
    icon: CreditCard,
    children: [
      {
        label: "Billing",
        href: "/billing",
        icon: CreditCard,
        description: "Manage billing settings",
      },
      {
        label: "Invoices",
        href: "/billing/invoices",
        icon: FileText,
        keywords: ["receipts"],
        description: "Review invoices",
      },
      {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        description: "Review notifications",
      },
      {
        label: "Audit log",
        href: "/audit-log",
        icon: ScrollText,
        keywords: ["activity", "events"],
        permission: "audit.read",
        description: "Review workspace events",
      },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    children: [
      { label: "Appearance", href: "/settings/appearance", icon: Sparkles },
      { label: "Billing", href: "/settings/billing", icon: CreditCard },
      {
        label: "Organization",
        href: "/settings/organization",
        icon: Building2,
      },
      { label: "Profile", href: "/settings/profile", icon: UserCircle },
      { label: "Security", href: "/settings/security", icon: Shield },
    ],
  },
];

export const allNavigation = navigation
  .flatMap((item) => [item, ...(item.children ?? [])])
  .filter(
    (item, index, items) =>
      items.findIndex((candidate) => candidate.href === item.href) === index,
  );
export const mainNavigation = navigation.slice(0, 6);
export const workspaceNavigation = navigation[6]?.children ?? [];
export const settingsNavigation =
  navigation.find((item) => item.href === "/settings")?.children ?? [];
export const utilityNavigation: NavigationItem[] = [];
export function getNavItem(pathname: string) {
  return allNavigation.find((item) => item.href === pathname);
}
