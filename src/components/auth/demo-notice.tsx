import { DEMO_AUTH_NOTICE } from "@/config/auth.config";

export function DemoNotice() {
  return (
    <p className="bg-muted text-muted-foreground rounded-md px-3 py-2 text-xs">
      {DEMO_AUTH_NOTICE}
    </p>
  );
}
