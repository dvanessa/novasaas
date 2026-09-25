import {
  DEMO_ACCOUNTS,
  type DemoAccount,
  getDemoAccount,
} from "@/config/auth.config";
import type { AuthenticationSession, DemoUser } from "@/types/auth";

export type DemoSession = AuthenticationSession;

export function createDemoSession(account: DemoAccount): DemoSession {
  return { accountId: account.id, createdAt: new Date().toISOString() };
}

export function resolveSession(session: DemoSession | null): DemoUser | null {
  const account = session ? getDemoAccount(session.accountId) : undefined;
  return account ? toDemoUser(account) : null;
}

export function toDemoUser(account: DemoAccount): DemoUser {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    organization: account.organization,
    permissions: account.permissions,
    initials: account.initials,
  };
}

export function getDefaultDemoAccount() {
  return DEMO_ACCOUNTS[0];
}
