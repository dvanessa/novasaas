import { describe, expect, it } from "vitest";

import { DEMO_ACCOUNTS } from "@/config/auth.config";

import {
  login,
  logout,
  register,
  requestPasswordReset,
  resetPassword,
  switchDemoAccount,
  verifyEmail,
} from "./auth.service";

describe("demo authentication service", () => {
  it("authenticates configured accounts and rejects credentials generically", async () => {
    const account = DEMO_ACCOUNTS[0];
    const valid = await login({
      email: account.email,
      password: account.password,
    });
    const invalid = await login({
      email: account.email,
      password: "incorrect",
    });
    const unknown = await login({
      email: "unknown@demo.com",
      password: "incorrect",
    });

    expect(valid).toMatchObject({
      success: true,
      data: { id: account.id, email: account.email },
    });
    expect(invalid).toEqual(unknown);
    if (valid.success) {
      expect(valid.data).not.toHaveProperty("password");
    }
  });

  it("provides identical non-enumerating password recovery results", async () => {
    const known = await requestPasswordReset(DEMO_ACCOUNTS[0].email);
    const unknown = await requestPasswordReset("unknown@demo.com");

    expect(known).toEqual(unknown);
    expect(known).toMatchObject({ success: true });
  });

  it("simulates registration, password reset, verification, switching, and logout", async () => {
    expect(
      await register({ workspace: " Nova Studio ", email: " team@demo.com " }),
    ).toMatchObject({
      success: true,
      data: { workspace: "Nova Studio", email: "team@demo.com" },
    });
    expect(
      await resetPassword({
        password: "new-password",
        confirmPassword: "new-password",
      }),
    ).toMatchObject({ success: true });
    expect(await verifyEmail()).toEqual({
      success: true,
      data: { verified: true },
    });
    expect(await switchDemoAccount(DEMO_ACCOUNTS[1].id)).toMatchObject({
      success: true,
      data: { id: DEMO_ACCOUNTS[1].id },
    });
    expect(await logout()).toEqual({ success: true, data: null });
  });
});
