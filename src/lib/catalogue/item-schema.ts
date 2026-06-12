import { z } from "zod";

/** Validation for admin create/edit of a catalogue item (CLAUDE.md Pattern 6). */
export const catalogueItemInputSchema = z.object({
  categoryId: z.string().min(1),
  slug: z
    .string()
    .trim()
    .min(1)
    .max(80)
    .regex(/^[a-z0-9-]+$/, "lowercase letters, numbers, and hyphens only"),
  nameEn: z.string().trim().min(1).max(160),
  nameAr: z.string().trim().min(1).max(160),
  summaryEn: z.string().trim().max(300).optional().or(z.literal("")),
  summaryAr: z.string().trim().max(300).optional().or(z.literal("")),
  descriptionEn: z.string().trim().max(2000).optional().or(z.literal("")),
  descriptionAr: z.string().trim().max(2000).optional().or(z.literal("")),
  featuresEn: z.array(z.string().trim().min(1)).max(12).optional(),
  featuresAr: z.array(z.string().trim().min(1)).max(12).optional(),
  priceLabelEn: z.string().trim().max(80).optional().or(z.literal("")),
  priceLabelAr: z.string().trim().max(80).optional().or(z.literal("")),
  imageUrl: z.string().trim().url().max(500).optional().or(z.literal("")),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  sortOrder: z.number().int().min(0).max(9999).optional(),
});

export type CatalogueItemInput = z.infer<typeof catalogueItemInputSchema>;
