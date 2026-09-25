"use client";

import Link from "next/link";
import { useState } from "react";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { verifyEmail } from "@/features/auth/services/auth.service";

export function VerifyEmailDemo() {
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  async function verify() {
    setVerifying(true);
    const result = await verifyEmail();
    setVerifying(false);
    if (result.success) setVerified(result.data.verified);
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <p className="text-muted-foreground text-sm">
          Email verification is simulated for this frontend demo.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        {verified ? (
          <p className="text-sm" role="status">
            Demo email verified. No email was sent.
          </p>
        ) : (
          <Button
            type="button"
            className="w-full"
            loading={verifying}
            loadingText="Verifying demo email…"
            onClick={() => void verify()}
          >
            Verify demo email
          </Button>
        )}
        <Link href="/auth/login" className="w-full">
          <Button variant="outline" className="w-full">
            Continue to demo sign in
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
