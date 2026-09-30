import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
  useRouter: () => ({ replace: vi.fn(), push: vi.fn() }),
}));

import {
  AUTH_SESSION_VERSION,
  AUTH_STORAGE_KEY,
  DEMO_ACCOUNTS,
} from "@/config/auth.config";
import { hydrateAuthStore } from "@/stores/auth.store";

import { Sidebar } from "./sidebar";

describe("Sidebar", () => {
  beforeEach(() => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        version: AUTH_SESSION_VERSION,
        accountId: DEMO_ACCOUNTS[0].id,
        createdAt: new Date().toISOString(),
      }),
    );
    hydrateAuthStore();
  });

  it("keeps the sidebar scroll region constrained and exposes the current page", () => {
    render(<Sidebar />);

    const sidebar = screen.getByRole("complementary");
    const navigation = screen.getByRole("navigation", { name: "Primary" });

    expect(sidebar).toHaveClass("h-dvh", "relative", "w-64");
    expect(navigation).toHaveClass(
      "min-h-0",
      "flex-1",
      "overflow-y-auto",
      "overflow-x-hidden",
    );
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("switches to a compact sidebar and keeps navigation available by tooltip", async () => {
    const user = userEvent.setup();
    render(<Sidebar />);

    fireEvent.click(screen.getByRole("button", { name: "Collapse sidebar" }));

    const sidebar = screen.getByRole("complementary");
    const dashboardLink = screen.getByRole("link", { name: "Dashboard" });

    expect(sidebar).toHaveClass("w-20");
    expect(dashboardLink).toBeVisible();
    expect(dashboardLink).toHaveAttribute("aria-current", "page");

    await user.hover(dashboardLink);
    expect(await screen.findByRole("tooltip")).toHaveTextContent("Dashboard");

    fireEvent.click(screen.getByRole("button", { name: "Expand sidebar" }));
    expect(sidebar).toHaveClass("w-64");
  });
});
