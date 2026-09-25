import { describe, expect, it } from "vitest";

import { DEMO_ACCOUNTS } from "@/config/auth.config";
import { ROLE_PERMISSIONS } from "@/config/permissions.config";
import { getRoutePermission } from "@/config/route-permissions.config";
import { getVisibleNavigationItems } from "@/lib/navigation";
import {
  canAccessRoute,
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "@/lib/permissions";
import { APPLICATION_ROLES } from "@/types/auth";
import { PERMISSIONS } from "@/types/permissions";

const [superAdmin, manager, member] = DEMO_ACCOUNTS;

describe("permission policy", () => {
  it("returns predictable results for missing users and permission combinations", () => {
    expect(hasPermission(null, PERMISSIONS.USERS_VIEW)).toBe(false);
    expect(hasAnyPermission(null, [PERMISSIONS.DASHBOARD_VIEW])).toBe(false);
    expect(hasAllPermissions(null, [PERMISSIONS.DASHBOARD_VIEW])).toBe(false);
    expect(
      hasAnyPermission(manager, [
        PERMISSIONS.USERS_INVITE,
        PERMISSIONS.USERS_DELETE,
      ]),
    ).toBe(true);
    expect(
      hasAllPermissions(manager, [
        PERMISSIONS.USERS_INVITE,
        PERMISSIONS.USERS_DELETE,
      ]),
    ).toBe(false);
  });

  it("grants Super Admin every defined permission from the role map", () => {
    expect(superAdmin.permissions).toEqual(
      ROLE_PERMISSIONS[APPLICATION_ROLES.SUPER_ADMIN],
    );
    expect(superAdmin.permissions).toHaveLength(
      Object.keys(PERMISSIONS).length,
    );
  });

  it("enforces Manager and Member role permissions from their centralized maps", () => {
    expect(manager.permissions).toEqual(
      ROLE_PERMISSIONS[APPLICATION_ROLES.MANAGER],
    );
    expect(member.permissions).toEqual(
      ROLE_PERMISSIONS[APPLICATION_ROLES.MEMBER],
    );

    expect(hasPermission(manager, PERMISSIONS.USERS_INVITE)).toBe(true);
    expect(hasPermission(manager, PERMISSIONS.USERS_DELETE)).toBe(false);
    expect(hasPermission(manager, PERMISSIONS.SUBSCRIPTIONS_VIEW)).toBe(true);
    expect(hasPermission(manager, PERMISSIONS.BILLING_VIEW)).toBe(false);
    expect(hasPermission(manager, PERMISSIONS.SETTINGS_ORGANIZATION_EDIT)).toBe(
      true,
    );
    expect(hasPermission(manager, PERMISSIONS.SETTINGS_SECURITY_MANAGE)).toBe(
      false,
    );

    expect(hasPermission(member, PERMISSIONS.DASHBOARD_VIEW)).toBe(true);
    expect(hasPermission(member, PERMISSIONS.NOTIFICATIONS_VIEW)).toBe(true);
    expect(hasPermission(member, PERMISSIONS.SETTINGS_PROFILE_EDIT)).toBe(true);
    expect(hasPermission(member, PERMISSIONS.ANALYTICS_VIEW)).toBe(false);
    expect(hasPermission(member, PERMISSIONS.USERS_VIEW)).toBe(false);
    expect(hasPermission(member, PERMISSIONS.SETTINGS_SECURITY_VIEW)).toBe(
      false,
    );
  });

  it("filters visible navigation consistently for each account", () => {
    const labels = (user: typeof superAdmin) =>
      getVisibleNavigationItems(user).map((item) => item.label);

    expect(labels(superAdmin)).toContain("Roles & Permissions");
    expect(labels(manager)).not.toContain("Roles & Permissions");
    expect(labels(manager)).not.toContain("Billing");
    expect(labels(manager)).not.toContain("Invoices");
    expect(labels(manager)).not.toContain("Security");
    expect(labels(member)).toEqual([
      "Dashboard",
      "Notifications",
      "Appearance",
      "Profile",
    ]);
  });

  it("checks direct route access and chooses the most specific nested route", () => {
    expect(canAccessRoute(manager, "/users")).toBe(true);
    expect(canAccessRoute(manager, "/roles")).toBe(false);
    expect(canAccessRoute(member, "/notifications")).toBe(true);
    expect(canAccessRoute(member, "/organizations")).toBe(false);
    expect(getRoutePermission("/billing/invoices/2026/1")).toBe(
      PERMISSIONS.INVOICES_VIEW,
    );
    expect(getRoutePermission("/billing/settings")).toBe(
      PERMISSIONS.BILLING_VIEW,
    );
    expect(canAccessRoute(null, "/dashboard")).toBe(false);
  });
});

describe("safe return destinations", () => {
  it.each([
    ["/users?filter=active#list", "/users?filter=active#list"],
    ["https://attacker.example", "/dashboard"],
    ["//attacker.example/path", "/dashboard"],
    ["/\\\\attacker.example", "/dashboard"],
    ["javascript:alert(1)", "/dashboard"],
    ["", "/dashboard"],
  ])("sanitizes %s", async (candidate, expected) => {
    const { getSafeReturnUrl } = await import("./safe-return-url");
    expect(getSafeReturnUrl(candidate)).toBe(expected);
  });
});
