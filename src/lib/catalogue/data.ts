import { createReadClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { SEED_CATEGORIES, SEED_ITEMS } from "./seed";
import type { CatalogueItemRow, ServiceCategoryRow } from "./types";

const CATEGORY_COLUMNS =
  "id, slug, name_en, name_ar, tagline_en, tagline_ar, description_en, description_ar, sort_order, is_active";
const ITEM_COLUMNS =
  "id, category_id, slug, name_en, name_ar, summary_en, summary_ar, description_en, description_ar, features_en, features_ar, price_label_en, price_label_ar, image_url, is_featured, is_active, sort_order";

type ItemRowFromDb = Omit<CatalogueItemRow, "category_slug">;

export async function getCategories(): Promise<ServiceCategoryRow[]> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createReadClient();
      const { data, error } = await supabase
        .from("service_categories")
        .select(CATEGORY_COLUMNS)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      if (data?.length) return data as ServiceCategoryRow[];
    } catch {
      // fall through to seed
    }
  }
  return [...SEED_CATEGORIES].sort((a, b) => a.sort_order - b.sort_order);
}

export async function getCategoryBySlug(slug: string): Promise<ServiceCategoryRow | null> {
  if (isSupabaseConfigured()) {
    try {
      const supabase = createReadClient();
      const { data, error } = await supabase
        .from("service_categories")
        .select(CATEGORY_COLUMNS)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      if (data) return data as ServiceCategoryRow;
    } catch {
      // fall through to seed
    }
  }
  return SEED_CATEGORIES.find((c) => c.slug === slug && c.is_active) ?? null;
}

export async function getItemsByCategory(categorySlug: string): Promise<CatalogueItemRow[]> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  if (isSupabaseConfigured()) {
    try {
      const supabase = createReadClient();
      const { data, error } = await supabase
        .from("catalogue_items")
        .select(ITEM_COLUMNS)
        .eq("category_id", category.id)
        .eq("is_active", true)
        .order("sort_order", { ascending: true });
      if (error) throw error;
      if (data) {
        return (data as ItemRowFromDb[]).map((row) => ({ ...row, category_slug: categorySlug }));
      }
    } catch {
      // fall through to seed
    }
  }
  return SEED_ITEMS.filter((i) => i.category_slug === categorySlug && i.is_active).sort(
    (a, b) => a.sort_order - b.sort_order,
  );
}

/** All active items across categories — used for counts on the index. */
export async function getAllItems(): Promise<CatalogueItemRow[]> {
  const categories = await getCategories();
  const lists = await Promise.all(categories.map((c) => getItemsByCategory(c.slug)));
  return lists.flat();
}

export async function getItem(
  categorySlug: string,
  itemSlug: string,
): Promise<{ category: ServiceCategoryRow; item: CatalogueItemRow } | null> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  if (isSupabaseConfigured()) {
    try {
      const supabase = createReadClient();
      const { data, error } = await supabase
        .from("catalogue_items")
        .select(ITEM_COLUMNS)
        .eq("category_id", category.id)
        .eq("slug", itemSlug)
        .eq("is_active", true)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        return { category, item: { ...(data as ItemRowFromDb), category_slug: categorySlug } };
      }
    } catch {
      // fall through to seed
    }
  }

  const item = SEED_ITEMS.find(
    (i) => i.category_slug === categorySlug && i.slug === itemSlug && i.is_active,
  );
  return item ? { category, item } : null;
}
