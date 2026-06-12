import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getCategories, getAllItems } from "@/lib/catalogue/data";
import { localizeCategory, localizeItem } from "@/lib/catalogue/types";
import type { Locale } from "@/lib/i18n/config";
import { ProductsView } from "./ProductsView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("products");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProductsPage() {
  const locale = (await getLocale()) as Locale;
  const [categoryRows, itemRows] = await Promise.all([getCategories(), getAllItems()]);

  const pillars = categoryRows.map((cat) => ({
    category: localizeCategory(cat, locale),
    items: itemRows
      .filter((row) => row.category_slug === cat.slug)
      .map((row) => localizeItem(row, locale)),
  }));

  const featured = itemRows.filter((row) => row.is_featured).map((row) => localizeItem(row, locale));

  return <ProductsView pillars={pillars} featured={featured} />;
}
