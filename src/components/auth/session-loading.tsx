import { Skeleton } from "@/components/ui/skeleton";

export function SessionLoading() {
  return (
    <div
      className="bg-background flex min-h-[calc(100svh-5rem)] flex-col items-center justify-center gap-4 px-6"
      role="status"
      aria-live="polite"
    >
      <div className="w-full max-w-sm space-y-3">
        <Skeleton className="mx-auto h-10 w-10 rounded-lg" />
        <Skeleton className="mx-auto h-4 w-48" />
        <Skeleton className="mx-auto h-3 w-64" />
      </div>
      <p className="text-muted-foreground text-sm">Checking demo session…</p>
    </div>
  );
}
