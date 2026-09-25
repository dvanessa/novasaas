import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid demo email address."),
  password: z.string().min(1, "Enter the demo password."),
});

export type LoginValues = z.infer<typeof loginSchema>;
