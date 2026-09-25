"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/features/auth/services/auth.service";

import {
  registerSchema,
  type RegisterValues,
} from "../schemas/register.schema";

export function RegisterForm() {
  const router = useRouter();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptedTerms: false,
    },
  });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a demo workspace</CardTitle>
        <p className="text-muted-foreground text-sm">
          Create a temporary demo profile. No permanent account will be created.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        <form
          onSubmit={form.handleSubmit(async (values) => {
            const result = await register({
              fullName: values.fullName,
              email: values.email,
              password: values.password,
              acceptedTerms: true,
            });
            if (result.success) {
              router.push(
                `/verify-email?email=${encodeURIComponent(result.data.email)}`,
              );
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
            <Label htmlFor="full-name">Full name</Label>
            <Input
              id="full-name"
              autoComplete="name"
              aria-invalid={Boolean(form.formState.errors.fullName)}
              aria-describedby={
                form.formState.errors.fullName ? "full-name-error" : undefined
              }
              {...form.register("fullName")}
            />
            <FormMessage id="full-name-error">
              {form.formState.errors.fullName?.message}
            </FormMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="registration-password">Password</Label>
            <Input
              id="registration-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(form.formState.errors.password)}
              aria-describedby={
                form.formState.errors.password
                  ? "registration-password-error"
                  : undefined
              }
              {...form.register("password")}
            />
            <FormMessage id="registration-password-error">
              {form.formState.errors.password?.message}
            </FormMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-registration-password">
              Confirm password
            </Label>
            <Input
              id="confirm-registration-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(form.formState.errors.confirmPassword)}
              aria-describedby={
                form.formState.errors.confirmPassword
                  ? "confirm-registration-password-error"
                  : undefined
              }
              {...form.register("confirmPassword")}
            />
            <FormMessage id="confirm-registration-password-error">
              {form.formState.errors.confirmPassword?.message}
            </FormMessage>
          </div>
          <div className="space-y-1">
            <label className="text-foreground flex min-h-11 items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="border-input accent-primary size-4 rounded"
                aria-invalid={Boolean(form.formState.errors.acceptedTerms)}
                aria-describedby={
                  form.formState.errors.acceptedTerms
                    ? "terms-error"
                    : undefined
                }
                {...form.register("acceptedTerms")}
              />
              I understand this is a temporary frontend demo
            </label>
            <FormMessage id="terms-error">
              {form.formState.errors.acceptedTerms?.message}
            </FormMessage>
          </div>
          <div className="space-y-2">
            <Label htmlFor="signup-email">Work email</Label>
            <Input
              id="signup-email"
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
            loadingText="Creating demo workspace…"
          >
            Create demo workspace
          </Button>
        </form>
        <p className="text-muted-foreground text-center text-xs">
          Already have a demo account?{" "}
          <Link className="text-primary underline" href="/login">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
