 import { z } from "zod";
 
export const recipientSchema = z
  .object({
    country: z.string().min(2),
    countryCode: z.string().length(2).toUpperCase(),
    currency: z.enum(["INR", "EUR", "USD"]),
    accountType: z.enum(["Personal", "Business"]),
    receiverAccount: z.enum(["My account", "Someone else's account"]),
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    nickName: z.string().optional(),
    recipientAddress: z.string().min(1),
    city: z.string().min(1),
    zipPostalCode: z.string().min(1),
    state: z.string().optional(),
    swiftBic: z.string().min(8).max(11).optional(),
    routingNumber: z.string().min(9).max(9).optional(),
    recipientAccountNumber: z.string().min(1).max(34),
  })
  .superRefine((val, ctx) => {
    if (val.country === "United States") {
      if (!val.routingNumber) {
        ctx.addIssue({
          code: "custom",
          path: ["routingNumber"],
          message: "Routing number is required for United States",
        });
      }
    } else {
      if (!val.swiftBic) {
        ctx.addIssue({
          code: "custom",
          path: ["swiftBic"],
          message: "SWIFT/BIC code is required for international transfers",
        });
      }
    }
  });
 
 export type RecipientValues = z.infer<typeof recipientSchema>;
