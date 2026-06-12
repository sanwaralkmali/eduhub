import { z } from "zod";

/**
 * Server-authoritative validation for an enquiry submission (CLAUDE.md Pattern 6).
 * The client form does its own friendly, translated checks; this schema is the
 * source of truth the API route enforces.
 */
export const enquiryInputSchema = z.object({
  name: z.string().trim().min(2).max(120),
  school: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
  itemId: z.string().uuid().optional(),
  categorySlug: z.string().trim().max(80).optional(),
});

export type EnquiryInput = z.infer<typeof enquiryInputSchema>;
