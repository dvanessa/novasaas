import { AlertCircle } from "lucide-react";

import { cn } from "@/lib/utils";

export function FormMessage({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  if (!children) return null;

  return (
    <p
      className={cn(
        "text-destructive flex items-center gap-1 text-xs",
        className,
      )}
      role="alert"
    >
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  );
}
