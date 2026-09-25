"use client";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

export default function ForbiddenPage() {
  const { account } = useAuth();
  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Access restricted</CardTitle>
          <p className="text-muted-foreground text-sm">
            {account?.name ?? "This demo account"} does not have permission to
            view this page.
          </p>
        </CardHeader>
        <CardContent className="flex gap-3">
          <Link
            className="bg-primary text-primary-foreground inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium"
            href="/dashboard"
          >
            Return to dashboard
          </Link>
          <Link
            className="border-input bg-background inline-flex h-9 items-center justify-center rounded-md border px-4 text-sm font-medium"
            href="/auth/login"
          >
            Switch account
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
