"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/auth/admin";
import { catalogueItemInputSchema, type CatalogueItemInput } from "@/lib/catalogue/item-schema";

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/** Server actions are their own endpoints — re-check admin here, not just in the page gate. */
async function isAdmin(): Promise<boolean> {
  const user = await getAdminUser();
  return Boolean(user && !user.demo);
}

function toRow(input: CatalogueItemInput) {
  return {
    category_id: input.categoryId,
    slug: input.slug,
    name_en: input.nameEn,
    name_ar: input.nameAr,
    summary_en: input.summaryEn || null,
    summary_ar: input.summaryAr || null,
    description_en: input.descriptionEn || null,
    description_ar: input.descriptionAr || null,
    features_en: input.featuresEn ?? [],
    features_ar: input.featuresAr ?? [],
    price_label_en: input.priceLabelEn || null,
    price_label_ar: input.priceLabelAr || null,
    image_url: input.imageUrl || null,
    is_featured: input.isFeatured ?? false,
    is_active: input.isActive ?? true,
    sort_order: input.sortOrder ?? 0,
  };
}

export async function createItem(input: CatalogueItemInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };
  const parsed = catalogueItemInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("catalogue_items").insert(toRow(parsed.data));
    if (error) {
      return { ok: false, error: error.code === "23505" ? "duplicate_slug" : "insert_failed" };
    }
  } catch {
    return { ok: false, error: "server_error" };
  }
  revalidatePath("/admin/catalogue");
  return { ok: true };
}

export async function updateItem(id: string, input: CatalogueItemInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };
  const parsed = catalogueItemInputSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "validation", fieldErrors: parsed.error.flatten().fieldErrors };
  }
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("catalogue_items").update(toRow(parsed.data)).eq("id", id);
    if (error) {
      return { ok: false, error: error.code === "23505" ? "duplicate_slug" : "update_failed" };
    }
  } catch {
    return { ok: false, error: "server_error" };
  }
  revalidatePath("/admin/catalogue");
  return { ok: true };
}

export async function deleteItem(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("catalogue_items").delete().eq("id", id);
    if (error) return { ok: false, error: "delete_failed" };
  } catch {
    return { ok: false, error: "server_error" };
  }
  revalidatePath("/admin/catalogue");
  return { ok: true };
}
