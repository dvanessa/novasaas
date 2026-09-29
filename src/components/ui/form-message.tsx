import { AlertCircle, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

export function FormMessage({
  children,
  className,
  id,
  variant = "error",
}: {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "error" | "success";
}) {
  if (!children) return null;

  return (
    <p
      id={id}
      className={cn(
        "flex items-center gap-1 text-xs",
        variant === "error" ? "text-destructive" : "text-success",
        className,
      )}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
    >
      {variant === "error" ? (
        <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <CheckCircle2 className="size-3.5 shrink-0" aria-hidden="true" />
      )}
      {children}
    </p>
  );
}
