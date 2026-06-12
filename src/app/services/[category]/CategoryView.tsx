import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/catalogue/Breadcrumbs";
import { ItemCard } from "@/components/catalogue/ItemCard";
import { IconArrowRight } from "@/components/ui/icons";
import type { CatalogueItem, ServiceCategory } from "@/lib/catalogue/types";

export async function CategoryView({
  category,
  items,
}: {
  category: ServiceCategory;
  items: CatalogueItem[];
}) {
  const t = await getTranslations("catalogue");
  const tn = await getTranslations("nav");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { label: tn("home"), href: "/" },
          { label: t("indexTitle"), href: "/services" },
          { label: category.name },
        ]}
      />

      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-3 text-muted-foreground">{category.description}</p>
      </header>

      {items.length > 0 ? (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ItemCard
              key={item.slug}
              item={item}
              featuredLabel={t("featured")}
              viewLabel={t("viewItem")}
            />
          ))}
        </div>
      ) : (
        <p className="mt-10 rounded-xl border border-dashed border-border bg-secondary/30 p-8 text-center text-muted-foreground">
          {t("notFoundText")}
        </p>
      )}

      <div className="mt-12">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          <IconArrowRight className="h-4 w-4 rotate-180 rtl:rotate-0" />
          {t("allServices")}
        </Link>
      </div>
    </div>
  );
}
