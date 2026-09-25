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
import { requestPasswordReset } from "@/features/auth/services/auth.service";

import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../schemas/forgot-password.schema";

export function ForgotPasswordForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Password help</CardTitle>
        <p className="text-muted-foreground text-sm">
          Password recovery is simulated and does not send an email.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        {submitted ? (
          <p className="text-sm" role="status">
            Demo recovery instructions were prepared. Continue to the reset
            password demonstration.
          </p>
        ) : (
          <form
            onSubmit={form.handleSubmit(async (values) => {
              const result = await requestPasswordReset(values.email);
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
              <Label htmlFor="recovery-email">Email address</Label>
              <Input
                id="recovery-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(form.formState.errors.email)}
                {...form.register("email")}
              />
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </div>
            <Button
              className="w-full"
              type="submit"
              loading={form.formState.isSubmitting}
              loadingText="Preparing demo recovery…"
            >
              Prepare demo recovery
            </Button>
          </form>
        )}
        <Link
          className="text-primary block text-center text-sm underline"
          href="/auth/login"
        >
          Back to demo sign in
        </Link>
      </CardContent>
    </Card>
  );
}
