import { beforeEach, describe, expect, it } from "vitest";

import {
  AUTH_SESSION_VERSION,
  AUTH_STORAGE_KEY,
  DEMO_ACCOUNTS,
} from "@/config/auth.config";

import {
  getAuthStoreSnapshot,
  hydrateAuthStore,
  login,
  logout,
  switchAccount,
} from "./auth.store";

describe("authentication store", () => {
  beforeEach(() => {
    localStorage.clear();
    hydrateAuthStore();
  });

  it("hydrates a versioned account ID session without passwords", async () => {
    const account = DEMO_ACCOUNTS[0];
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        version: AUTH_SESSION_VERSION,
        accountId: account.id,
        createdAt: new Date().toISOString(),
      }),
    );

    hydrateAuthStore();

    expect(getAuthStoreSnapshot()).toMatchObject({
      currentUser: { id: account.id, email: account.email },
      status: "authenticated",
      hydrated: true,
    });
    expect(getAuthStoreSnapshot().currentUser).not.toHaveProperty("password");
  });

  it("removes malformed, stale-version, and unknown-account sessions", () => {
    const staleSession = {
      version: AUTH_SESSION_VERSION - 1,
      accountId: DEMO_ACCOUNTS[0].id,
      createdAt: new Date().toISOString(),
    };
    for (const value of [
      "{bad json",
      JSON.stringify(staleSession),
      JSON.stringify({
        version: AUTH_SESSION_VERSION,
        accountId: "missing-account",
        createdAt: new Date().toISOString(),
      }),
    ]) {
      localStorage.setItem(AUTH_STORAGE_KEY, value);
      hydrateAuthStore();
      expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
      expect(getAuthStoreSnapshot()).toMatchObject({
        currentUser: null,
        status: "unauthenticated",
        hydrated: true,
      });
    }
  });

  it("logs in, switches accounts, and logs out while persisting only a session key", async () => {
    const account = DEMO_ACCOUNTS[0];
    const result = await login({
      email: account.email,
      password: account.password,
    });

    expect(result.success).toBe(true);
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).not.toContain("password");
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).not.toContain(account.email);

    const switched = await switchAccount(DEMO_ACCOUNTS[1].id);
    expect(switched).toMatchObject({
      success: true,
      data: { id: DEMO_ACCOUNTS[1].id },
    });

    await logout();
    expect(localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
    expect(getAuthStoreSnapshot()).toMatchObject({
      currentUser: null,
      status: "unauthenticated",
      hydrated: true,
    });
  });
});
