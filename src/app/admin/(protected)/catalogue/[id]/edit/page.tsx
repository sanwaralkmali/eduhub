import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { getAdminCategories, getAdminItem } from "@/lib/admin/catalogue";
import { isAdminDemoMode } from "@/lib/auth/admin";
import type { Locale } from "@/lib/i18n/config";
import { ItemForm, type ItemFormDefaults } from "../../ItemForm";

export default async function EditItemPage({ params }: { params: { id: string } }) {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;

  const [item, categories] = await Promise.all([getAdminItem(params.id), getAdminCategories()]);
  if (!item) notFound();

  const options = categories.map((c) => ({
    id: c.id,
    name: locale === "ar" ? c.name_ar : c.name_en,
  }));

  const defaults: ItemFormDefaults = {
    categoryId: item.category_id,
    slug: item.slug,
    nameEn: item.name_en,
    nameAr: item.name_ar,
    summaryEn: item.summary_en ?? "",
    summaryAr: item.summary_ar ?? "",
    descriptionEn: item.description_en ?? "",
    descriptionAr: item.description_ar ?? "",
    featuresEn: (item.features_en ?? []).join("\n"),
    featuresAr: (item.features_ar ?? []).join("\n"),
    priceLabelEn: item.price_label_en ?? "",
    priceLabelAr: item.price_label_ar ?? "",
    imageUrl: item.image_url ?? "",
    isFeatured: item.is_featured,
    isActive: item.is_active,
    sortOrder: item.sort_order,
  };

  return (
    <div className="max-w-3xl">
      <Link href="/admin/catalogue" className="text-sm text-muted-foreground hover:text-foreground">
        ← {t("catalogue.title")}
      </Link>
      <h1 className="mt-3 font-display text-2xl font-bold text-foreground">
        {t("catalogue.editTitle")}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground" dir="ltr">
        {item.name_en}
      </p>
      <div className="mt-6">
        <ItemForm
          categories={options}
          defaults={defaults}
          mode="edit"
          itemId={item.id}
          disabled={isAdminDemoMode()}
        />
      </div>
    </div>
  );
}
