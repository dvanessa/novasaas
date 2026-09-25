"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DEMO_ACCOUNTS } from "@/config/auth.config";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState(DEMO_ACCOUNTS[0].email);
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const account = DEMO_ACCOUNTS.find(
      (candidate) =>
        candidate.email.toLowerCase() === email.trim().toLowerCase(),
    );
    if (!account) {
      setError("Use one of the demo accounts below to continue.");
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
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Demo email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-invalid={Boolean(error)}
            />
            {error && <p className="text-destructive text-xs">{error}</p>}
          </div>
          <Button className="w-full" type="submit">
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
                  {account.role} · {account.email}
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
