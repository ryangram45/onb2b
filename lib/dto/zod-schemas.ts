import { z } from "zod";
import { UserRole } from "../constants/roles";

export const signupSchema = z.object({
  userId: z.string().min(8),
  name: z.string().min(2),
  email: z.email(),
  password: z.string().min(6),
});

export const loginFormSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  password: z.string().min(1, "Password is required"),
  rememberUserId: z.boolean().optional(),
});

export const bankAccountSchema = z.object({
  advPlusAccountNumber: z.string().optional(),
  routingNumber: z.string().optional(),
  paperElectronicNumber: z.string().optional(),
  wiresAccountNumber: z.string().optional(),
}).optional();

const creditCardSchema = z.object({
  cardName: z.string().min(2, "Card name is required").optional(),
  cardNumber: z.string().optional(),
}).optional();

export const adminCreateUserSchema = z.object({
  userId: z.string().min(3, "User ID must be at least 3 characters"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum([UserRole.CLIENT, UserRole.ADMIN]).default(UserRole.CLIENT),
  isActive: z.boolean().default(true),
  creditCard: creditCardSchema,
})


export type AdminCreateUserValues = z.infer<typeof adminCreateUserSchema>;