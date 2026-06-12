import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/catalogue/Breadcrumbs";
import { CategoryCard } from "@/components/catalogue/CategoryCard";
import type { ServiceCategory } from "@/lib/catalogue/types";

interface CategoryWithCount {
  category: ServiceCategory;
  count: number;
}

export async function ServicesView({ categories }: { categories: CategoryWithCount[] }) {
  const t = await getTranslations("catalogue");
  const tn = await getTranslations("nav");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: tn("home"), href: "/" }, { label: t("indexTitle") }]} />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("indexTitle")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("indexSubtitle")}</p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(({ category, count }) => (
          <CategoryCard
            key={category.slug}
            category={category}
            browseLabel={t("browse")}
            itemsLabel={t("optionsCount", { count })}
          />
        ))}
      </div>
    </div>
  );
}
