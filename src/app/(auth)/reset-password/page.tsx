import { AuthGuestPage } from "@/components/auth/auth-guest-page";
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <AuthGuestPage>
      <ResetPasswordForm />
    </AuthGuestPage>
  );
}
