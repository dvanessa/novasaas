"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/features/auth/services/auth.service";

import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../schemas/reset-password.schema";

export function ResetPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <p className="text-muted-foreground text-sm">
          This frontend-only demonstration does not change a real password.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        {submitted ? (
          <p className="text-sm" role="status">
            Demo password reset complete. You can sign in with a demo account.
          </p>
        ) : (
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const result = await resetPassword(values);
              if (result.success) {
                setSubmitted(true);
              } else {
                form.setError("root.serverError", {
                  message: result.error.message,
                });
              }
            })}
            className="space-y-4"
            noValidate
          >
            <FormMessage>
              {form.formState.errors.root?.serverError?.message}
            </FormMessage>
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input
                id="new-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(form.formState.errors.password)}
                {...form.register("password")}
              />
              <FormMessage>
                {form.formState.errors.password?.message}
              </FormMessage>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(form.formState.errors.confirmPassword)}
                {...form.register("confirmPassword")}
              />
              <FormMessage>
                {form.formState.errors.confirmPassword?.message}
              </FormMessage>
            </div>
            <Button
              className="w-full"
              type="submit"
              loading={form.formState.isSubmitting}
              loadingText="Resetting demo password…"
            >
              Reset demo password
            </Button>
          </form>
        )}
        <Link
          href="/auth/login"
          className="text-primary block text-center text-sm underline"
        >
          Return to sign in
        </Link>
      </CardContent>
    </Card>
  );
}
