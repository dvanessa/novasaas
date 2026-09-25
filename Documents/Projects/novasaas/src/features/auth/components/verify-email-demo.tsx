"use client";

import { MailCheck, RotateCw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { resendVerificationEmail } from "@/features/auth/services/auth.service";

export function VerifyEmailDemo({ email }: { email: string }) {
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");

  async function resend() {
    setVerifying(true);
    const result = await resendVerificationEmail(email);
    setVerifying(false);
    if (result.success) {
      setMessage(result.data.message);
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MailCheck className="text-primary size-5" aria-hidden="true" />
          Check your email
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Email verification is simulated for this frontend demo.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        <p className="text-sm">
          {email
            ? `A confirmation step is ready for ${email}.`
            : "A confirmation step is ready for your demo address."}{" "}
          This is a visual demo; no account was created and no message was sent.
        </p>
        {message ? (
          <p className="text-sm" role="status" aria-live="polite">
            {message}
          </p>
        ) : null}
        <div className="space-y-3">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            loading={verifying}
            loadingText="Preparing demo resend…"
            onClick={() => void resend()}
          >
            <RotateCw aria-hidden="true" />
            Resend demo confirmation
          </Button>
          <Link href="/login" className="block w-full">
            <Button className="w-full">Return to sign in</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
