import type { Locale } from "@/lib/i18n/config";

/** Raw row shapes (snake_case) matching the Supabase tables. */
export interface ServiceCategoryRow {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  tagline_en: string | null;
  tagline_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  sort_order: number;
  is_active: boolean;
}

export interface CatalogueItemRow {
  id: string;
  category_id: string;
  /** Joined in by the data layer — not a stored column. */
  category_slug: string;
  slug: string;
  name_en: string;
  name_ar: string;
  summary_en: string | null;
  summary_ar: string | null;
  description_en: string | null;
  description_ar: string | null;
  features_en: string[];
  features_ar: string[];
  price_label_en: string | null;
  price_label_ar: string | null;
  image_url: string | null;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
}

/** Localized view models the UI actually renders. */
export interface ServiceCategory {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
}

export interface CatalogueItem {
  id: string;
  slug: string;
  categorySlug: string;
  name: string;
  summary: string;
  description: string;
  features: string[];
  priceLabel: string | null;
  imageUrl: string | null;
  isFeatured: boolean;
}

function pick(en: string | null, ar: string | null, locale: Locale): string {
  const value = locale === "ar" ? ar : en;
  return value ?? en ?? ar ?? "";
}

export function localizeCategory(row: ServiceCategoryRow, locale: Locale): ServiceCategory {
  return {
    id: row.id,
    slug: row.slug,
    name: pick(row.name_en, row.name_ar, locale),
    tagline: pick(row.tagline_en, row.tagline_ar, locale),
    description: pick(row.description_en, row.description_ar, locale),
  };
}

export function localizeItem(row: CatalogueItemRow, locale: Locale): CatalogueItem {
  const features = locale === "ar" ? row.features_ar : row.features_en;
  return {
    id: row.id,
    slug: row.slug,
    categorySlug: row.category_slug,
    name: pick(row.name_en, row.name_ar, locale),
    summary: pick(row.summary_en, row.summary_ar, locale),
    description: pick(row.description_en, row.description_ar, locale),
    features: features?.length ? features : row.features_en ?? [],
    priceLabel:
      locale === "ar"
        ? row.price_label_ar ?? row.price_label_en
        : row.price_label_en ?? row.price_label_ar,
    imageUrl: row.image_url,
    isFeatured: row.is_featured,
  };
}
