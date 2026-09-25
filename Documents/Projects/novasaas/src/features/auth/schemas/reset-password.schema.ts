export function validateResetPassword(password: string, confirmation: string) {
  if (password.length < 8) return "Use at least 8 characters.";
  return password === confirmation ? null : "Passwords do not match.";
}
