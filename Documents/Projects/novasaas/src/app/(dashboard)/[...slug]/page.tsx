import { notFound } from "next/navigation";

import { FeaturePage } from "@/components/dashboard/feature-page";
import { allNavigation } from "@/config/navigation";

export function generateStaticParams() {
  return allNavigation
    .filter((item) => !item.href.startsWith("/settings"))
    .filter((item) => item.href !== "/dashboard")
    .map((item) => ({ slug: item.href.slice(1).split("/") }));
}

export default async function RoutePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const href = `/${slug.join("/")}`;
  if (!allNavigation.some((item) => item.href === href)) notFound();
  return <FeaturePage href={href} />;
}
