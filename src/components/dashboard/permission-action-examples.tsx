"use client";

import { useState } from "react";

import { PermissionGuard } from "@/components/auth/permission-guard";
import { Button } from "@/components/ui/button";
import type { Permission } from "@/types/permissions";
import { PERMISSIONS } from "@/types/permissions";

const ACTIONS_BY_ROUTE: Record<
  string,
  { permission: Permission; label: string }[]
> = {
  "/users": [
    { permission: PERMISSIONS.USERS_INVITE, label: "Invite user" },
    { permission: PERMISSIONS.USERS_DELETE, label: "Delete user" },
  ],
  "/organizations": [
    {
      permission: PERMISSIONS.ORGANIZATIONS_MANAGE,
      label: "Manage organization",
    },
  ],
  "/subscriptions": [
    {
      permission: PERMISSIONS.SUBSCRIPTIONS_MANAGE,
      label: "Manage subscription",
    },
  ],
  "/settings/profile": [
    { permission: PERMISSIONS.SETTINGS_PROFILE_EDIT, label: "Edit profile" },
  ],
  "/settings/organization": [
    {
      permission: PERMISSIONS.SETTINGS_ORGANIZATION_EDIT,
      label: "Edit organization settings",
    },
  ],
  "/settings/security": [
    {
      permission: PERMISSIONS.SETTINGS_SECURITY_MANAGE,
      label: "Manage security settings",
    },
  ],
  "/settings/billing": [
    {
      permission: PERMISSIONS.SETTINGS_BILLING_MANAGE,
      label: "Manage billing settings",
    },
  ],
  "/settings/appearance": [
    {
      permission: PERMISSIONS.SETTINGS_APPEARANCE_EDIT,
      label: "Edit appearance settings",
    },
  ],
};

export function PermissionActionExamples({ href }: { href: string }) {
  const actions = ACTIONS_BY_ROUTE[href];
  const [message, setMessage] = useState("");
  if (!actions) return null;

  return (
    <section className="border-border bg-card space-y-3 rounded-lg border p-4">
      <div>
        <h2 className="text-sm font-semibold">Permission examples</h2>
        <p className="text-muted-foreground text-xs">
          These controls are demonstrations only; no data is changed.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {actions.map(({ permission, label }) => (
          <PermissionGuard
            key={permission}
            permission={permission}
            fallback={
              <span className="text-muted-foreground border-border inline-flex min-h-9 items-center rounded-md border px-3 text-xs">
                {label} unavailable for this demo role
              </span>
            }
          >
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setMessage(
                  `${label} is available for this demo role. No data was changed.`,
                )
              }
            >
              {label}
            </Button>
          </PermissionGuard>
        ))}
      </div>
      {message ? (
        <p className="text-muted-foreground text-sm" role="status">
          {message}
        </p>
      ) : null}
    </section>
  );
}
