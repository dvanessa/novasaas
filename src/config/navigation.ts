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
import { PERMISSIONS } from "@/types/permissions";

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
    permission: PERMISSIONS.DASHBOARD_VIEW,
    keywords: ["home", "overview"],
    description: "Your workspace at a glance",
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    permission: PERMISSIONS.ANALYTICS_VIEW,
    keywords: ["insights", "reports"],
    description: "Explore performance insights",
  },
  {
    label: "Organizations",
    href: "/organizations",
    icon: Building2,
    permission: PERMISSIONS.ORGANIZATIONS_VIEW,
    keywords: ["workspaces"],
    description: "Manage organizations",
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
    permission: PERMISSIONS.USERS_VIEW,
    keywords: ["members", "team"],
    description: "Manage users",
  },
  {
    label: "Roles & Permissions",
    href: "/roles",
    icon: Shield,
    keywords: ["access", "roles"],
    permission: PERMISSIONS.ROLES_VIEW,
    description: "Manage access controls",
  },
  {
    label: "Revenue",
    href: "/subscriptions",
    icon: Receipt,
    permission: PERMISSIONS.SUBSCRIPTIONS_VIEW,
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
        permission: PERMISSIONS.BILLING_VIEW,
        description: "Manage billing settings",
      },
      {
        label: "Invoices",
        href: "/billing/invoices",
        icon: FileText,
        permission: PERMISSIONS.INVOICES_VIEW,
        keywords: ["receipts"],
        description: "Review invoices",
      },
      {
        label: "Notifications",
        href: "/notifications",
        icon: Bell,
        permission: PERMISSIONS.NOTIFICATIONS_VIEW,
        description: "Review notifications",
      },
      {
        label: "Audit log",
        href: "/audit-log",
        icon: ScrollText,
        keywords: ["activity", "events"],
        permission: PERMISSIONS.AUDIT_LOG_VIEW,
        description: "Review workspace events",
      },
    ],
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
    children: [
      {
        label: "Appearance",
        href: "/settings/appearance",
        icon: Sparkles,
        permission: PERMISSIONS.SETTINGS_APPEARANCE_VIEW,
      },
      {
        label: "Billing",
        href: "/settings/billing",
        icon: CreditCard,
        permission: PERMISSIONS.SETTINGS_BILLING_VIEW,
      },
      {
        label: "Organization",
        href: "/settings/organization",
        icon: Building2,
        permission: PERMISSIONS.SETTINGS_ORGANIZATION_VIEW,
      },
      {
        label: "Profile",
        href: "/settings/profile",
        icon: UserCircle,
        permission: PERMISSIONS.SETTINGS_PROFILE_VIEW,
      },
      {
        label: "Security",
        href: "/settings/security",
        icon: Shield,
        permission: PERMISSIONS.SETTINGS_SECURITY_VIEW,
      },
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
  const normalized = pathname.replace(/\/+$/, "") || "/";
  return allNavigation
    .filter(
      (item) =>
        normalized === item.href || normalized.startsWith(`${item.href}/`),
    )
    .sort((left, right) => right.href.length - left.href.length)[0];
}
