"use client";

import Link from "next/link";
import { useState } from "react";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const [submitted, setSubmitted] = useState(false);
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
        {submitted ? (
          <div className="space-y-4">
            <p className="text-sm">
              Your demo workspace is ready. Continue with a preconfigured
              identity to explore it.
            </p>
            <Link
              className="bg-primary text-primary-foreground inline-flex h-10 w-full items-center justify-center rounded-md px-6 text-sm font-medium"
              href="/auth/login"
            >
              Choose a demo account
            </Link>
          </div>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="workspace">Workspace name</Label>
              <Input id="workspace" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email">Work email</Label>
              <Input id="signup-email" type="email" required />
            </div>
            <Button className="w-full" type="submit">
              Create demo workspace
            </Button>
          </form>
        )}
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
