import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { getItem } from "@/lib/catalogue/data";
import { localizeItem } from "@/lib/catalogue/types";
import { isKnownTopic } from "@/lib/enquiries/links";
import type { Locale } from "@/lib/i18n/config";
import { ContactView, type ContactContext } from "./ContactView";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact");
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: { canonical: "/contact" },
  };
}

export default async function ContactPage({
  searchParams,
}: {
  searchParams: { item?: string; category?: string; topic?: string };
}) {
  const locale = (await getLocale()) as Locale;

  let context: ContactContext | null = null;

  if (searchParams.item && searchParams.category) {
    const result = await getItem(searchParams.category, searchParams.item);
    if (result) {
      const item = localizeItem(result.item, locale);
      context = {
        kind: "item",
        itemName: item.name,
        categorySlug: item.categorySlug,
        itemSlug: item.slug,
      };
    }
  } else if (searchParams.topic) {
    const t = await getTranslations("contact");
    const raw = searchParams.topic.slice(0, 80);
    // Known topics resolve to a localized label; anything else is free text.
    const topicLabel = isKnownTopic(raw) ? t(`topics.${raw}`) : raw;
    context = { kind: "topic", topicLabel, topic: raw };
  }

  return <ContactView context={context} />;
}
