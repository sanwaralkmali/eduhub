import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getCategoryBySlug, getItemsByCategory } from "@/lib/catalogue/data";
import { localizeCategory, localizeItem } from "@/lib/catalogue/types";
import type { Locale } from "@/lib/i18n/config";
import { CategoryView } from "./CategoryView";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = await getCategoryBySlug(params.category);
  if (!category) return {};
  const locale = (await getLocale()) as Locale;
  const localized = localizeCategory(category, locale);
  return {
    title: localized.name,
    description: localized.tagline || undefined,
    alternates: { canonical: `/services/${params.category}` },
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await getCategoryBySlug(params.category);
  if (!category) notFound();

  const locale = (await getLocale()) as Locale;
  const itemRows = await getItemsByCategory(params.category);

  return (
    <CategoryView
      category={localizeCategory(category, locale)}
      items={itemRows.map((row) => localizeItem(row, locale))}
    />
  );
}
