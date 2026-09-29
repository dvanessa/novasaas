"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_SHARED_PASSWORD } from "@/config/auth.config";
import { PERMISSION_SUMMARIES } from "@/config/permissions.config";
import { listDemoAccounts } from "@/features/auth/services/auth.service";
import { useAuth } from "@/hooks/use-auth";
import type { DemoUser } from "@/types/auth";
import { ROLE_LABELS } from "@/types/auth";

import { loginSchema, type LoginValues } from "../schemas/login.schema";

export function LoginForm({ returnTo }: { returnTo?: string }) {
  const { signIn, switchAccount } = useAuth();
  const [accounts, setAccounts] = useState<DemoUser[]>([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [switchingId, setSwitchingId] = useState<string | null>(null);
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    shouldFocusError: true,
  });

  useEffect(() => {
    let active = true;
    void listDemoAccounts().then((demoAccounts) => {
      if (active) {
        setAccounts(demoAccounts);
        setLoadingAccounts(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  async function submit(values: LoginValues) {
    const result = await signIn(values, returnTo);
    if (!result.success) {
      form.setError("root.serverError", {
        message: result.error.message,
      });
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign in to NovaSaaS</CardTitle>
        <p className="text-muted-foreground text-sm">
          Choose a demo identity to explore role-based access.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        <p className="text-muted-foreground text-xs">
          All demo accounts use the public demo-only password{" "}
          <code className="bg-muted text-foreground rounded px-1.5 py-0.5">
            {DEMO_SHARED_PASSWORD}
          </code>
          .
        </p>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-4"
          noValidate
        >
          <FormMessage>
            {form.formState.errors.root?.serverError?.message}
          </FormMessage>
          <div className="space-y-2">
            <Label htmlFor="email">Demo email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(form.formState.errors.email)}
              aria-describedby={
                form.formState.errors.email ? "login-email-error" : undefined
              }
              {...form.register("email")}
            />
            <FormMessage id="login-email-error">
              {form.formState.errors.email?.message}
            </FormMessage>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Demo password</Label>
              <Link
                className="text-primary text-xs underline"
                href="/forgot-password"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                aria-invalid={Boolean(form.formState.errors.password)}
                aria-describedby={
                  form.formState.errors.password
                    ? "login-password-error"
                    : undefined
                }
                className="pr-11"
                {...form.register("password")}
              />
              <button
                type="button"
                className="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute inset-y-0 right-0 flex min-w-11 items-center justify-center rounded-r-md focus-visible:ring-2 focus-visible:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
                onClick={() => setShowPassword((visible) => !visible)}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            <FormMessage id="login-password-error">
              {form.formState.errors.password?.message}
            </FormMessage>
          </div>
          <Button
            className="w-full"
            type="submit"
            loading={form.formState.isSubmitting}
            loadingText="Signing in…"
          >
            Continue as demo user
          </Button>
        </form>
        <div className="space-y-2">
          <p className="text-muted-foreground text-xs font-medium uppercase">
            Quick account switch
          </p>
          {loadingAccounts ? (
            <p className="text-muted-foreground text-sm" role="status">
              Loading demo accounts…
            </p>
          ) : null}
          {accounts.map((account) => (
            <Button
              key={account.id}
              type="button"
              variant="outline"
              className="h-auto w-full justify-between py-2"
              disabled={form.formState.isSubmitting || switchingId !== null}
              onClick={async () => {
                setSwitchingId(account.id);
                try {
                  const result = await switchAccount(account.id);
                  if (!result.success) {
                    form.setError("root.serverError", {
                      message: result.error.message,
                    });
                  }
                } finally {
                  setSwitchingId(null);
                }
              }}
            >
              <span className="text-left">
                <span className="block text-sm">{account.name}</span>
                <span className="text-muted-foreground block text-xs">
                  {ROLE_LABELS[account.role]} · {account.email}
                </span>
                <span className="text-muted-foreground block text-xs">
                  {account.permissions
                    .slice(0, 3)
                    .map(
                      (permission) =>
                        PERMISSION_SUMMARIES[permission] ?? permission,
                    )
                    .join(", ")}
                  {account.permissions.length > 3 ? ", and more" : ""}
                </span>
              </span>
              <span className="text-primary text-xs font-medium">
                {switchingId === account.id ? "Switching…" : "Use this account"}
              </span>
            </Button>
          ))}
        </div>
        <p className="text-muted-foreground text-center text-xs">
          Need an account?{" "}
          <Link className="text-primary underline" href="/register">
            View demo sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
