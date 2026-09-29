"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SessionLoading } from "@/components/auth/session-loading";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listDemoAccounts } from "@/features/auth/services/auth.service";
import { useAuth } from "@/hooks/use-auth";
import { type DemoUser, ROLE_LABELS } from "@/types/auth";

export default function ForbiddenPage() {
  const router = useRouter();
  const { account, hydrated, switchAccount } = useAuth();
  const [accounts, setAccounts] = useState<DemoUser[]>([]);
  const [message, setMessage] = useState("");
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    let active = true;
    void listDemoAccounts().then((items) => {
      if (active) setAccounts(items);
    });
    const frame = window.requestAnimationFrame(() => {
      setCanGoBack(
        document.referrer.startsWith(window.location.origin) &&
          window.history.length > 1,
      );
    });
    return () => {
      active = false;
      window.cancelAnimationFrame(frame);
    };
  }, []);

  if (!hydrated) return <SessionLoading />;

  return (
    <main className="bg-muted/30 flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <p className="text-primary text-sm font-semibold">
            403 · Access restricted
          </p>
          <CardTitle>You don’t have access to this page</CardTitle>
          <p className="text-muted-foreground text-sm">
            {account
              ? `The ${ROLE_LABELS[account.role]} demo role cannot open this area.`
              : "Sign in with a demo account to continue."}
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => router.push("/dashboard")}>
              Return to dashboard
            </Button>
            {canGoBack ? (
              <Button variant="outline" onClick={() => router.back()}>
                Go back
              </Button>
            ) : null}
          </div>
          {account ? (
            <div className="space-y-2 border-t pt-4">
              <p className="text-sm font-medium">Switch demo account</p>
              <p className="text-muted-foreground text-xs">
                Choose an account with access to explore the interface.
              </p>
              <div className="flex flex-wrap gap-2">
                {accounts
                  .filter((candidate) => candidate.id !== account.id)
                  .map((candidate) => (
                    <Button
                      key={candidate.id}
                      size="sm"
                      variant="outline"
                      onClick={async () => {
                        const result = await switchAccount(candidate.id);
                        setMessage(
                          result.success
                            ? `Switched demo account to ${candidate.name}.`
                            : result.error.message,
                        );
                      }}
                    >
                      Use {ROLE_LABELS[candidate.role]}
                    </Button>
                  ))}
              </div>
            </div>
          ) : (
            <Button variant="outline" onClick={() => router.push("/login")}>
              Go to login
            </Button>
          )}
          {message ? (
            <p className="text-muted-foreground text-sm" role="status">
              {message}
            </p>
          ) : null}
          <p className="text-muted-foreground text-xs">
            This access screen is part of a frontend-only demonstration.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
