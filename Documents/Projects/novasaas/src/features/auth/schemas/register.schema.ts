import { z } from "zod";

export const registerSchema = z.object({
  workspace: z
    .string()
    .trim()
    .min(2, "Workspace name must be at least 2 characters."),
  email: z.string().trim().email("Enter a valid work email address."),
});

export type RegisterValues = z.infer<typeof registerSchema>;
