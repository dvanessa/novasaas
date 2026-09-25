import Link from "next/link";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function VerifyEmailPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <p className="text-muted-foreground text-sm">
          Email verification is represented visually for this demo.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        <p className="text-sm">
          No email is sent and no real account is created.
        </p>
        <Link
          href="/auth/login"
          className="bg-primary text-primary-foreground inline-flex h-10 w-full items-center justify-center rounded-md px-6 text-sm font-medium"
        >
          Continue to demo sign in
        </Link>
      </CardContent>
    </Card>
  );
}
