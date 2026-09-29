import { AuthGuestPage } from "@/components/auth/auth-guest-page";
import { RegisterForm } from "@/features/auth/components/register-form";

export default function RegisterPage() {
  return (
    <AuthGuestPage>
      <RegisterForm />
    </AuthGuestPage>
  );
}
