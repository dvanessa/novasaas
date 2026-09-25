"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ResetPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }
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
          <p className="text-sm">
            Demo password reset complete. You can sign in with a demo account.
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" minLength={8} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input
                id="confirm-password"
                type="password"
                minLength={8}
                required
              />
            </div>
            <Button className="w-full" type="submit">
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
