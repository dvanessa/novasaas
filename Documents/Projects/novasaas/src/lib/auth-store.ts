"use client";

import { AUTH_STORAGE_KEY, type DemoAccount } from "@/config/auth.config";
import {
  createDemoSession,
  type DemoSession,
  resolveSession,
} from "@/lib/auth-service";

export function readDemoSession(): DemoSession | null {
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DemoSession) : null;
  } catch {
    return null;
  }
}

export function readDemoAccount(): DemoAccount | null {
  return resolveSession(readDemoSession());
}

export function saveDemoSession(account: DemoAccount) {
  window.localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(createDemoSession(account)),
  );
  window.dispatchEvent(new Event("novasaas-auth-change"));
}

export function clearDemoSession() {
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.dispatchEvent(new Event("novasaas-auth-change"));
}
