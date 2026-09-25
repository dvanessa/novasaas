import Link from "next/link";

import { DemoNotice } from "@/components/auth/demo-notice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Password help</CardTitle>
        <p className="text-muted-foreground text-sm">
          Password recovery is not part of this frontend-only demo.
        </p>
      </CardHeader>
      <CardContent className="space-y-5">
        <DemoNotice />
        <Link
          className="bg-primary text-primary-foreground inline-flex h-10 w-full items-center justify-center rounded-md px-6 text-sm font-medium"
          href="/auth/login"
        >
          Back to demo sign in
        </Link>
      </CardContent>
    </Card>
  );
}
