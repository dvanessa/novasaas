import { describe, expect, it } from "vitest";

import { DEMO_ACCOUNTS } from "@/config/auth.config";

import { authenticateDemoAccount, findDemoAccount } from "./demo-auth.service";

describe("demo auth service", () => {
  it("authenticates each centralized demo account with its fixture password", () => {
    for (const account of DEMO_ACCOUNTS) {
      expect(authenticateDemoAccount(account.email, account.password)).toEqual(
        account,
      );
    }
  });

  it("rejects unknown emails and incorrect passwords", () => {
    expect(findDemoAccount("unknown@demo.com")).toBeNull();
    expect(
      authenticateDemoAccount(DEMO_ACCOUNTS[0].email, "incorrect"),
    ).toBeNull();
  });
});
