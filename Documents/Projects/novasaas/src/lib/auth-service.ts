import {
  DEMO_ACCOUNTS,
  type DemoAccount,
  getDemoAccount,
} from "@/config/auth.config";

export type DemoSession = {
  accountId: string;
  createdAt: string;
};

export function createDemoSession(account: DemoAccount): DemoSession {
  return { accountId: account.id, createdAt: new Date().toISOString() };
}

export function resolveSession(session: DemoSession | null) {
  return session ? (getDemoAccount(session.accountId) ?? null) : null;
}

export function getDefaultDemoAccount() {
  return DEMO_ACCOUNTS[0];
}
