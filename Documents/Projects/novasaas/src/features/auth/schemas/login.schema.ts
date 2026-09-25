export function validateLogin(values: { email: string }) {
  return values.email.includes("@") ? null : "Enter a valid demo email.";
}
