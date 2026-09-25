export function validateForgotPassword(email: string) {
  return email.includes("@") ? null : "Enter a valid email.";
}
