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

import {
  registerSchema,
  type RegisterValues,
} from "../schemas/register.schema";

export function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { workspace: "", email: "" },
  });

  if (submitted) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Demo workspace created</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            Your demo workspace is ready. Continue with a preconfigured identity
            to explore it.
          </p>
          <Link href="/auth/login" className="w-full">
            <Button className="w-full">Choose a demo account</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create a demo workspace</CardTitle>
        <p className="text-muted-foreground text-sm">
          Sign up is intentionally simulated for this frontend demo.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        <form
          onSubmit={form.handleSubmit(() => setSubmitted(true))}
          className="space-y-4"
          noValidate
        >
          <div className="space-y-2">
            <Label htmlFor="workspace">Workspace name</Label>
            <Input
              id="workspace"
              aria-invalid={Boolean(form.formState.errors.workspace)}
              {...form.register("workspace")}
            />
            <FormMessage>
              {form.formState.errors.workspace?.message}
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
          <Button className="w-full" type="submit">
            Create demo workspace
          </Button>
        </form>
        <p className="text-muted-foreground text-center text-xs">
          Already exploring?{" "}
          <Link className="text-primary underline" href="/auth/login">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
