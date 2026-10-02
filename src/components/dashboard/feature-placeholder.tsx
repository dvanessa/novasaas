import { Construction } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturePlaceholder({ title }: { title: string }) {
  return (
    <Card className="max-w-full min-w-0">
      <CardHeader>
        <CardTitle className="text-base">Integration-ready page</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex min-w-0 items-center gap-3 text-sm">
          <Construction className="text-primary size-5 shrink-0" />
          <span className="min-w-0 break-words">
            Connect {title.toLowerCase()} to your API and adapt the workflow to
            your product.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
