import { FeaturePlaceholder } from "@/components/dashboard/feature-placeholder";
import { PageContainer } from "@/components/dashboard/page-container";
import { PermissionActionExamples } from "@/components/dashboard/permission-action-examples";
import { getNavItem } from "@/config/navigation";

export function FeaturePage({ href }: { href: string }) {
  const item = getNavItem(href);
  return (
    <PageContainer
      title={item?.label ?? "Workspace"}
      description={item?.description}
    >
      <div className="space-y-6">
        <FeaturePlaceholder title={item?.label ?? "This feature"} />
        <PermissionActionExamples href={href} />
      </div>
    </PageContainer>
  );
}
