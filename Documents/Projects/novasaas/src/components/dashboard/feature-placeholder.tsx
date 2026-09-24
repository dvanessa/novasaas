import { Construction } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeaturePlaceholder({ title }: { title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Coming in a future step</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-muted-foreground flex items-center gap-3 text-sm">
          <Construction className="text-primary size-5" />
          <span>{title} is ready for your product data and workflows.</span>
        </div>
      </CardContent>
    </Card>
  );
}
