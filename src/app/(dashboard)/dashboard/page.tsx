import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { PageContainer } from "@/components/dashboard/page-container";

export default function DashboardPage() {
  return (
    <PageContainer
      title="Dashboard"
      description="Monitor your workspace performance and recent activity."
    >
      <DashboardOverview />
    </PageContainer>
  );
}
