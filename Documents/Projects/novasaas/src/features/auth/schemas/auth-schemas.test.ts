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
        fullName: "Nova User",
        email: "team@example.com",
        password: "secure123",
        confirmPassword: "secure123",
        acceptedTerms: true,
      }).success,
    ).toBe(true);
  });

  it("rejects malformed emails and short workspace names", () => {
    expect(loginSchema.safeParse({ email: "not-an-email" }).success).toBe(
      false,
    );
    expect(
      registerSchema.safeParse({
        fullName: "N",
        email: "team@example.com",
        password: "short",
        confirmPassword: "short",
        acceptedTerms: false,
      }).success,
    ).toBe(false);
    expect(forgotPasswordSchema.safeParse({ email: "" }).success).toBe(false);
  });

  it("requires accepted demo terms and secure-enough matching registration passwords", () => {
    const validRegistration = {
      fullName: "Nova User",
      email: "team@example.com",
      password: "secure123",
      confirmPassword: "secure123",
      acceptedTerms: true,
    };
    expect(registerSchema.safeParse(validRegistration).success).toBe(true);
    expect(
      registerSchema.safeParse({
        ...validRegistration,
        acceptedTerms: false,
      }).success,
    ).toBe(false);
    expect(
      registerSchema.safeParse({
        ...validRegistration,
        confirmPassword: "different123",
      }).success,
    ).toBe(false);
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
