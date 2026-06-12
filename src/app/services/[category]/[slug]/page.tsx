import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import { getItem } from "@/lib/catalogue/data";
import { localizeCategory, localizeItem } from "@/lib/catalogue/types";
import type { Locale } from "@/lib/i18n/config";
import { ItemView } from "./ItemView";

export async function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}): Promise<Metadata> {
  const result = await getItem(params.category, params.slug);
  if (!result) return {};
  const locale = (await getLocale()) as Locale;
  const item = localizeItem(result.item, locale);
  return { title: item.name, description: item.summary || undefined };
}

export default async function ItemPage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const result = await getItem(params.category, params.slug);
  if (!result) notFound();

  const locale = (await getLocale()) as Locale;

  return (
    <ItemView
      category={localizeCategory(result.category, locale)}
      item={localizeItem(result.item, locale)}
    />
  );
}
