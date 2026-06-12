import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalDocument } from "@/components/legal/LegalDocument";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("legal.terms");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: "/terms" },
  };
}

export default async function TermsPage() {
  const t = await getTranslations("legal.terms");
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
