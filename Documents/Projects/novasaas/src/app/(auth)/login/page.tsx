import { AuthGuestPage } from "@/components/auth/auth-guest-page";
import { LoginForm } from "@/features/auth/components/login-form";
import { getSafeReturnUrl } from "@/lib/safe-return-url";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ returnTo?: string | string[] }>;
}) {
  const query = await searchParams;
  const returnTo = getSafeReturnUrl(
    Array.isArray(query.returnTo) ? query.returnTo[0] : query.returnTo,
  );

  return (
    <AuthGuestPage>
      <LoginForm returnTo={returnTo} />
    </AuthGuestPage>
  );
}
