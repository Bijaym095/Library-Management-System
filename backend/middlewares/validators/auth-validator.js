import { z } from "zod";

export const registrationSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(5, { message: "Must be 5 or more characters long" }),
    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(5, { message: "Password Must be 5 or more characters long" }),
    confirmPassword: z
      .string({ required_error: "Password is required" })
      .trim()
      .min(5, { message: "Password Must be 5 or more characters long" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim(),
});
