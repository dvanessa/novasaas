import {
  DEMO_ACCOUNTS,
  type DemoAccount,
  getDemoAccount,
} from "@/config/auth.config";

export function findDemoAccount(email: string): DemoAccount | null {
  return (
    DEMO_ACCOUNTS.find(
      (account) => account.email.toLowerCase() === email.trim().toLowerCase(),
    ) ?? null
  );
}

export function findDemoAccountById(id: string): DemoAccount | null {
  return getDemoAccount(id) ?? null;
}
