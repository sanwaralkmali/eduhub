import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getCategories, getAllItems } from "@/lib/catalogue/data";
import { localizeCategory } from "@/lib/catalogue/types";
import type { Locale } from "@/lib/i18n/config";
import { ServicesView } from "./ServicesView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("catalogue");
  return {
    title: t("indexTitle"),
    description: t("indexSubtitle"),
    alternates: { canonical: "/services" },
  };
}

export default async function ServicesPage() {
  const locale = (await getLocale()) as Locale;
  const [categoryRows, items] = await Promise.all([getCategories(), getAllItems()]);

  const categories = categoryRows.map((row) => ({
    category: localizeCategory(row, locale),
    count: items.filter((i) => i.category_slug === row.slug).length,
  }));

  return <ServicesView categories={categories} />;
}
