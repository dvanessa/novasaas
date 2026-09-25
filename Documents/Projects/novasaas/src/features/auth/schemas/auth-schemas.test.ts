import { describe, expect, it } from "vitest";

import { DEMO_ACCOUNTS } from "@/config/auth.config";

import { forgotPasswordSchema } from "./forgot-password.schema";
import { loginSchema } from "./login.schema";
import { registerSchema } from "./register.schema";
import { resetPasswordSchema } from "./reset-password.schema";

describe("auth schemas", () => {
  it("accepts valid login and registration values", () => {
    expect(
      loginSchema.safeParse({
        email: DEMO_ACCOUNTS[0].email,
        password: DEMO_ACCOUNTS[0].password,
      }).success,
    ).toBe(true);
    expect(
      registerSchema.safeParse({
        workspace: "Nova Workspace",
        email: "team@example.com",
      }).success,
    ).toBe(true);
  });

  it("rejects malformed emails and short workspace names", () => {
    expect(loginSchema.safeParse({ email: "not-an-email" }).success).toBe(
      false,
    );
    expect(
      registerSchema.safeParse({ workspace: "N", email: "team@example.com" })
        .success,
    ).toBe(false);
    expect(forgotPasswordSchema.safeParse({ email: "" }).success).toBe(false);
  });

  it("requires matching passwords with a minimum length", () => {
    expect(
      resetPasswordSchema.safeParse({
        password: "password",
        confirmPassword: "password",
      }).success,
    ).toBe(true);
    expect(
      resetPasswordSchema.safeParse({
        password: "short",
        confirmPassword: "short",
      }).success,
    ).toBe(false);
    expect(
      resetPasswordSchema.safeParse({
        password: "password",
        confirmPassword: "different",
      }).success,
    ).toBe(false);
  });
});
