import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site/config";
import { getCategories, getAllItems } from "@/lib/catalogue/data";

// Regenerate hourly so new catalogue items appear without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/products"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/services"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  // Catalogue routes are data-driven (Supabase, or the seed fallback).
  let categoryEntries: MetadataRoute.Sitemap = [];
  let itemEntries: MetadataRoute.Sitemap = [];
  try {
    const [categories, items] = await Promise.all([getCategories(), getAllItems()]);
    categoryEntries = categories.map((c) => ({
      url: absoluteUrl(`/services/${c.slug}`),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    }));
    itemEntries = items.map((i) => ({
      url: absoluteUrl(`/services/${i.category_slug}/${i.slug}`),
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // Keep the static entries even if the catalogue is briefly unavailable.
  }

  return [...staticEntries, ...categoryEntries, ...itemEntries];
}
