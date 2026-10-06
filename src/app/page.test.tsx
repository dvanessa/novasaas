import { render, screen } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/theme/theme-toggle", () => ({
  ThemeToggle: () => <button type="button">Theme</button>,
}));

describe("public landing page", () => {
  it("includes the NovaSaaS Pro waitlist copy and Kit form", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: "Get early access to NovaSaaS Pro",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Join the waitlist to receive launch updates, early access, and an exclusive introductory discount.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "NovaSaaS Pro waitlist signup form" }),
    ).toContainElement(screen.getByTestId("kit-waitlist-form"));
  });
});
