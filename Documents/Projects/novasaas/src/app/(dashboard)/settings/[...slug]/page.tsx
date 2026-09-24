import { notFound } from "next/navigation";

import { FeaturePage } from "@/components/dashboard/feature-page";
import { settingsNavigation } from "@/config/navigation";

export function generateStaticParams() {
  return settingsNavigation.map((item) => ({
    slug: [item.href.split("/").at(-1)!],
  }));
}

export default async function SettingsFeaturePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/settings/${slug.join("/")}`;
  if (!settingsNavigation.some((item) => item.href === href)) notFound();
  return <FeaturePage href={href} />;
}
