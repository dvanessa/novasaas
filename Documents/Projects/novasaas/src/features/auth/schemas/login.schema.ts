import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid demo email address."),
});

export type LoginValues = z.infer<typeof loginSchema>;
