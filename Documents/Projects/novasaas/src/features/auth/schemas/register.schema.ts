export function validateRegistration(values: {
  email: string;
  workspace: string;
}) {
  if (!values.workspace.trim()) return "Enter a workspace name.";
  return values.email.includes("@") ? null : "Enter a valid email.";
}
