import { z } from "zod"

export const loginSchema = z.object({
  email: z
  .email({ error: "Invalid email format" })
  .min(1, "Email is required"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Minimum 6 characters"),
})

export type LoginInput = z.infer<typeof loginSchema>