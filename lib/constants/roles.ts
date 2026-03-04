export const UserRole = {
  CLIENT: "client",
  ADMIN: "admin",
} as const;

// TypeScript type from the enum
export type UserRoleType = typeof UserRole[keyof typeof UserRole];

// For Zod schema
import { z } from "zod";
export const roleSchema = z.enum([UserRole.CLIENT, UserRole.ADMIN]);