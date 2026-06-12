import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/legal/LegalDocument";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.privacy");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/privacy" },
  };
}

export default async function PrivacyPage() {
  const t = await getTranslations("legal.privacy");
  const tl = await getTranslations("legal");
  return (
    <LegalDocument
      title={t("title")}
      effective={tl("effective")}
      intro={t("intro")}
      sections={t.raw("sections") as { heading: string; body: string[] }[]}
    />
  );
}
