import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const signIn = vi.fn();
const switchAccount = vi.fn();

vi.mock("@/hooks/use-auth", () => ({
  useAuth: () => ({ signIn, switchAccount }),
}));

vi.mock("@/features/auth/services/auth.service", () => ({
  listDemoAccounts: vi.fn().mockResolvedValue([]),
}));

import { LoginForm } from "./login-form";

describe("LoginForm", () => {
  beforeEach(() => {
    signIn.mockReset();
    switchAccount.mockReset();
  });

  it("announces required field validation and focuses the first invalid field", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(
      screen.getByRole("button", { name: "Continue as demo user" }),
    );

    expect(await screen.findByText("Enter your email address.")).toBeVisible();
    expect(screen.getByLabelText("Demo email")).toHaveFocus();
    expect(screen.getByLabelText("Demo email")).toHaveAttribute(
      "aria-describedby",
      "login-email-error",
    );
  });

  it("allows the password to be shown and hidden by an explicit control", async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    const password = screen.getByLabelText("Demo password");

    expect(password).toHaveAttribute("type", "password");
    await user.click(screen.getByRole("button", { name: "Show password" }));
    expect(password).toHaveAttribute("type", "text");
    await user.click(screen.getByRole("button", { name: "Hide password" }));
    expect(password).toHaveAttribute("type", "password");
  });

  it("shows one generic credential error after a failed login", async () => {
    const user = userEvent.setup();
    const message = "The email or password is incorrect.";
    signIn.mockResolvedValue({
      success: false,
      error: { code: "INVALID_CREDENTIALS", message },
    });
    render(<LoginForm />);

    await user.type(screen.getByLabelText("Demo email"), "unknown@example.com");
    await user.type(screen.getByLabelText("Demo password"), "incorrect");
    await user.click(
      screen.getByRole("button", { name: "Continue as demo user" }),
    );

    expect(await screen.findByText(message)).toBeVisible();
    expect(screen.getAllByText(message)).toHaveLength(1);
  });
});
