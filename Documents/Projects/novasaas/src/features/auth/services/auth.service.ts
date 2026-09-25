import {
  DEMO_ACCOUNTS,
  type DemoAccount,
  getDemoAccount,
} from "@/config/auth.config";
import { toDemoUser } from "@/lib/auth-service";
import type {
  AuthResult,
  DemoUser,
  LoginCredentials,
  PasswordResetData,
  RegistrationData,
} from "@/types/auth";

const SIMULATED_NETWORK_DELAY_MS = 300;
const INVALID_CREDENTIALS_ERROR = {
  code: "INVALID_CREDENTIALS",
  message: "The email or password is incorrect.",
} as const;

function simulateNetworkDelay() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, SIMULATED_NETWORK_DELAY_MS);
  });
}

function getAccountByEmail(email: string): DemoAccount | undefined {
  return DEMO_ACCOUNTS.find(
    (account) => account.email.toLowerCase() === email.trim().toLowerCase(),
  );
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResult<DemoUser>> {
  await simulateNetworkDelay();
  const account = getAccountByEmail(credentials.email);
  if (!account || account.password !== credentials.password) {
    return { success: false, error: INVALID_CREDENTIALS_ERROR };
  }
  return { success: true, data: toDemoUser(account) };
}

export async function logout(): Promise<AuthResult<null>> {
  await simulateNetworkDelay();
  return { success: true, data: null };
}

export async function register(
  data: RegistrationData,
): Promise<AuthResult<{ fullName: string; email: string }>> {
  await simulateNetworkDelay();
  return {
    success: true,
    data: { fullName: data.fullName.trim(), email: data.email.trim() },
  };
}

export async function requestPasswordReset(
  email: string,
): Promise<AuthResult<{ message: string }>> {
  // Intentionally do not inspect the address so the response cannot enumerate accounts.
  void email;
  await simulateNetworkDelay();
  return {
    success: true,
    data: {
      message:
        "If an account exists for that email, reset instructions have been prepared.",
    },
  };
}

export async function resetPassword(
  data: PasswordResetData,
): Promise<AuthResult<{ message: string }>> {
  await simulateNetworkDelay();
  if (data.password !== data.confirmPassword) {
    return {
      success: false,
      error: {
        code: "UNKNOWN",
        message: "The passwords do not match.",
      },
    };
  }
  return {
    success: true,
    data: { message: "The demo password reset was completed." },
  };
}

export async function verifyEmail(): Promise<AuthResult<{ verified: true }>> {
  await simulateNetworkDelay();
  return { success: true, data: { verified: true } };
}

export async function resendVerificationEmail(
  email: string,
): Promise<AuthResult<{ message: string }>> {
  void email;
  await simulateNetworkDelay();
  return {
    success: true,
    data: {
      message: "Demo confirmation instructions are ready. No email was sent.",
    },
  };
}

export async function listDemoAccounts(): Promise<DemoUser[]> {
  await simulateNetworkDelay();
  return DEMO_ACCOUNTS.map(toDemoUser);
}

export async function switchDemoAccount(
  accountId: string,
): Promise<AuthResult<DemoUser>> {
  await simulateNetworkDelay();
  const account = getDemoAccount(accountId);
  if (!account) {
    return {
      success: false,
      error: {
        code: "UNKNOWN",
        message: "That demo account is not available.",
      },
    };
  }
  return { success: true, data: toDemoUser(account) };
}
