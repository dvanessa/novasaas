import { FeaturePlaceholder } from "@/components/dashboard/feature-placeholder";
import { PageContainer } from "@/components/dashboard/page-container";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPage() {
  return (
    <PageContainer
      title="Welcome to NovaSaaS"
      description="Your workspace overview will appear here as features are connected."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {[1, 2, 3].map((card) => (
          <Card key={card}>
            <CardContent className="space-y-3 pt-6">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-3 w-36" />
            </CardContent>
          </Card>
        ))}
      </div>
      <FeaturePlaceholder title="Dashboard activity" />
    </PageContainer>
  );
}
