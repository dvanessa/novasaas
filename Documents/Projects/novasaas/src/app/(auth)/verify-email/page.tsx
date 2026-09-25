import { VerifyEmailDemo } from "@/features/auth/components/verify-email-demo";

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const { email } = await searchParams;
  return <VerifyEmailDemo email={email ?? ""} />;
}
