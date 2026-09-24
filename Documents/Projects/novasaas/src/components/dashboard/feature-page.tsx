import { FeaturePlaceholder } from "@/components/dashboard/feature-placeholder";
import { PageContainer } from "@/components/dashboard/page-container";
import { getNavItem } from "@/config/navigation";

export function FeaturePage({ href }: { href: string }) {
  const item = getNavItem(href);
  return (
    <PageContainer
      title={item?.label ?? "Workspace"}
      description={item?.description}
    >
      <FeaturePlaceholder title={item?.label ?? "This feature"} />
    </PageContainer>
  );
}
