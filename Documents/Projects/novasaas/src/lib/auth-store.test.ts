import { describe, expect, it } from "vitest";

import { DEMO_ACCOUNTS } from "@/config/auth.config";

import {
  clearDemoSession,
  readDemoAccount,
  readDemoSession,
  saveDemoSession,
} from "./auth-store";

describe("demo auth store", () => {
  it("persists and resolves a demo account without storing credentials", () => {
    saveDemoSession(DEMO_ACCOUNTS[1]);

    expect(readDemoSession()).toMatchObject({ accountId: DEMO_ACCOUNTS[1].id });
    expect(readDemoAccount()).toEqual(DEMO_ACCOUNTS[1]);
    expect(localStorage.getItem("novasaas-demo-session")).not.toContain(
      "password",
    );
    expect(localStorage.getItem("novasaas-demo-session")).not.toContain(
      DEMO_ACCOUNTS[1].email,
    );
  });

  it("clears the persisted session", () => {
    saveDemoSession(DEMO_ACCOUNTS[0]);
    clearDemoSession();

    expect(readDemoSession()).toBeNull();
    expect(readDemoAccount()).toBeNull();
  });

  it("ignores malformed persisted data", () => {
    localStorage.setItem("novasaas-demo-session", "{invalid");

    expect(readDemoSession()).toBeNull();
    expect(readDemoAccount()).toBeNull();
  });
});
