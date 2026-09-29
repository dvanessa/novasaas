import { z } from "zod";

export const registerSchema = z
  .object({
    fullName: z.string().trim().min(2, "Name must be at least 2 characters."),
    email: z.string().trim().email("Enter a valid work email address."),
    password: z
      .string()
      .min(8, "Use at least 8 characters.")
      .regex(/[A-Za-z]/, "Include at least one letter.")
      .regex(/[0-9]/, "Include at least one number."),
    confirmPassword: z.string(),
    acceptedTerms: z.boolean().refine((accepted) => accepted, {
      error: "Accept the demo terms to continue.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match.",
  });

export type RegisterValues = z.infer<typeof registerSchema>;
