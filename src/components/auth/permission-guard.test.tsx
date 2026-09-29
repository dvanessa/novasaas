import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
  usePathname: () => "/dashboard",
}));

import {
  AUTH_SESSION_VERSION,
  AUTH_STORAGE_KEY,
  DEMO_ACCOUNTS,
} from "@/config/auth.config";
import { hydrateAuthStore } from "@/stores/auth.store";

import { PermissionGuard } from "./permission-guard";

describe("PermissionGuard", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders its children only when the current demo user has permission", () => {
    const account = DEMO_ACCOUNTS[1];
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        version: AUTH_SESSION_VERSION,
        accountId: account.id,
        createdAt: new Date().toISOString(),
      }),
    );
    hydrateAuthStore();

    render(
      <PermissionGuard permission="users.invite">
        <button>Invite user</button>
      </PermissionGuard>,
    );
    expect(screen.getByRole("button", { name: "Invite user" })).toBeVisible();

    render(
      <PermissionGuard permission="users.delete" fallback={<p>Unavailable</p>}>
        <button>Delete user</button>
      </PermissionGuard>,
    );
    expect(screen.queryByRole("button", { name: "Delete user" })).toBeNull();
    expect(screen.getByText("Unavailable")).toBeVisible();
  });
});
