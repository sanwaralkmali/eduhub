import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Breadcrumbs } from "@/components/catalogue/Breadcrumbs";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconArrowRight, IconCheck, IconFlag, IconTag, IconCap } from "@/components/ui/icons";
import { enquiryHref } from "@/lib/enquiries/links";
import { cn } from "@/lib/utils";
import type { CatalogueItem, ServiceCategory } from "@/lib/catalogue/types";

const CATEGORY_ICON: Record<string, typeof IconFlag> = {
  activities: IconFlag,
  "school-services": IconTag,
  graduation: IconCap,
};

export async function ItemView({
  category,
  item,
}: {
  category: ServiceCategory;
  item: CatalogueItem;
}) {
  const t = await getTranslations("catalogue");
  const tn = await getTranslations("nav");

  const Icon = CATEGORY_ICON[item.categorySlug] ?? IconFlag;
  const enquiryLink = enquiryHref({ item: item.slug, category: item.categorySlug });

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs
        items={[
          { label: tn("home"), href: "/" },
          { label: t("indexTitle"), href: "/services" },
          { label: category.name, href: `/services/${category.slug}` },
          { label: item.name },
        ]}
      />

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-secondary">
          <RibbonCorner />
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-primary/40">
              <Icon className="h-20 w-20" />
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {item.isFeatured && (
            <Badge variant="accent" className="mb-3 w-fit">
              {t("featured")}
            </Badge>
          )}
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {item.name}
          </h1>
          {item.priceLabel && (
            <p className="mt-3 text-lg font-semibold text-primary">{item.priceLabel}</p>
          )}
          <p className="mt-4 leading-relaxed text-muted-foreground">{item.description}</p>

          {item.features.length > 0 && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                {t("whatsIncluded")}
              </h2>
              <ul className="mt-3 space-y-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground/90">
                    <IconCheck className="mt-0.5 h-4 w-4 text-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={enquiryLink}
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "group")}
            >
              {t("enquire")}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </Link>
            <Link
              href={`/services/${category.slug}`}
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              {t("backToCategory", { category: category.name })}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
