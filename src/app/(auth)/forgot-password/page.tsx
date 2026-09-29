import { AuthGuestPage } from "@/components/auth/auth-guest-page";
import { ForgotPasswordForm } from "@/features/auth/components/forgot-password-form";

export default function ForgotPasswordPage() {
  return (
    <AuthGuestPage>
      <ForgotPasswordForm />
    </AuthGuestPage>
  );
}
