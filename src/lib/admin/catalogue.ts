import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminDemoMode } from "@/lib/auth/admin";
import { SEED_CATEGORIES, SEED_ITEMS } from "@/lib/catalogue/seed";
import type { CatalogueItemRow, ServiceCategoryRow } from "@/lib/catalogue/types";

// Admin reads use the service role and include INACTIVE rows (unlike the public
// data layer). Demo mode falls back to the seed data.

type ItemRowFromDb = Omit<CatalogueItemRow, "category_slug">;

export async function getAdminCategories(): Promise<ServiceCategoryRow[]> {
  if (isAdminDemoMode()) {
    return [...SEED_CATEGORIES].sort((a, b) => a.sort_order - b.sort_order);
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("service_categories")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []) as ServiceCategoryRow[];
  } catch {
    return [];
  }
}

export async function getAdminItems(): Promise<CatalogueItemRow[]> {
  if (isAdminDemoMode()) {
    return [...SEED_ITEMS].sort(
      (a, b) => a.category_slug.localeCompare(b.category_slug) || a.sort_order - b.sort_order,
    );
  }
  try {
    const supabase = createAdminClient();
    const categories = await getAdminCategories();
    const slugById = new Map(categories.map((c) => [c.id, c.slug]));
    const { data, error } = await supabase
      .from("catalogue_items")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return (data ?? []).map((row) => {
      const r = row as ItemRowFromDb;
      return { ...r, category_slug: slugById.get(r.category_id) ?? "" };
    });
  } catch {
    return [];
  }
}

export async function getAdminItem(id: string): Promise<CatalogueItemRow | null> {
  if (isAdminDemoMode()) {
    return SEED_ITEMS.find((i) => i.id === id) ?? null;
  }
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("catalogue_items")
      .select("*")
      .eq("id", id)
      .maybeSingle();
    if (error) throw error;
    if (!data) return null;
    const categories = await getAdminCategories();
    const r = data as ItemRowFromDb;
    const slug = categories.find((c) => c.id === r.category_id)?.slug ?? "";
    return { ...r, category_slug: slug };
  } catch {
    return null;
  }
}
