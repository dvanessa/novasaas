"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_ACCOUNTS } from "@/config/auth.config";
import { authenticateDemoAccount } from "@/features/auth/services/demo-auth.service";
import { useAuth } from "@/hooks/use-auth";

import { loginSchema, type LoginValues } from "../schemas/login.schema";

export function LoginForm() {
  const { signIn } = useAuth();
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: DEMO_ACCOUNTS[0].email, password: "" },
  });

  function submit(values: LoginValues) {
    const account = authenticateDemoAccount(values.email, values.password);
    if (!account) {
      form.setError("email", {
        message: "Use a configured demo account and its fixture password.",
      });
      return;
    }
    signIn(account);
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
        <form
          onSubmit={form.handleSubmit(submit)}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="email">Demo email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(form.formState.errors.email)}
              {...form.register("email")}
            />
            <FormMessage>{form.formState.errors.email?.message}</FormMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Demo password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(form.formState.errors.password)}
              {...form.register("password")}
            />
            <FormMessage>{form.formState.errors.password?.message}</FormMessage>
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
          {DEMO_ACCOUNTS.map((account) => (
            <Button
              key={account.id}
              type="button"
              variant="outline"
              className="h-auto w-full justify-between py-2"
              onClick={() => signIn(account)}
            >
              <span className="text-left">
                <span className="block text-sm">{account.name}</span>
                <span className="text-muted-foreground block text-xs">
                  {account.roleLabel} · {account.email}
                </span>
              </span>
              <span className="text-muted-foreground text-xs">Use</span>
            </Button>
          ))}
        </div>
        <p className="text-muted-foreground text-center text-xs">
          Need an account?{" "}
          <Link className="text-primary underline" href="/auth/signup">
            View demo sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
