import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getAdminCategories } from "@/lib/admin/catalogue";
import { isAdminDemoMode } from "@/lib/auth/admin";
import type { Locale } from "@/lib/i18n/config";
import { ItemForm, type ItemFormDefaults } from "../ItemForm";

const EMPTY: ItemFormDefaults = {
  categoryId: "",
  slug: "",
  nameEn: "",
  nameAr: "",
  summaryEn: "",
  summaryAr: "",
  descriptionEn: "",
  descriptionAr: "",
  featuresEn: "",
  featuresAr: "",
  priceLabelEn: "",
  priceLabelAr: "",
  imageUrl: "",
  isFeatured: false,
  isActive: true,
  sortOrder: 0,
};

export default async function NewItemPage() {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;
  const categories = await getAdminCategories();
  const options = categories.map((c) => ({
    id: c.id,
    name: locale === "ar" ? c.name_ar : c.name_en,
  }));
  const defaults: ItemFormDefaults = { ...EMPTY, categoryId: options[0]?.id ?? "" };

  return (
    <div className="max-w-3xl">
      <Link href="/admin/catalogue" className="text-sm text-muted-foreground hover:text-foreground">
        ← {t("catalogue.title")}
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
        {t("catalogue.newTitle")}
      </h1>
      <div className="mt-6">
        <ItemForm categories={options} defaults={defaults} mode="create" disabled={isAdminDemoMode()} />
      </div>
    </div>
  );
}
