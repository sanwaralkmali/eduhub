import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { IconArrowRight, IconFlag, IconTag, IconCap } from "@/components/ui/icons";
import { getCoverImage } from "@/lib/catalogue/galleries";
import type { CatalogueItem } from "@/lib/catalogue/types";

const CATEGORY_ICON: Record<string, typeof IconFlag> = {
  activities: IconFlag,
  "school-services": IconTag,
  graduation: IconCap,
};

export function ItemCard({
  item,
  featuredLabel,
  viewLabel,
}: {
  item: CatalogueItem;
  featuredLabel: string;
  viewLabel: string;
}) {
  const Icon = CATEGORY_ICON[item.categorySlug] ?? IconFlag;
  const cover = getCoverImage(item.slug, item.imageUrl);

  return (
    <Link
      href={`/services/${item.categorySlug}/${item.slug}`}
      className="group block focus:outline-none"
    >
      <article className="flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
          {cover ? (
            <Image
              src={cover}
              alt={item.name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-primary/40">
              <Icon className="h-12 w-12" />
            </span>
          )}
          {item.isFeatured && (
            <Badge variant="accent" className="absolute start-3 top-3 shadow-sm">
              {featuredLabel}
            </Badge>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold text-foreground">{item.name}</h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
            {item.summary}
          </p>
          <div className="mt-4 flex items-center justify-between gap-2">
            {item.priceLabel ? (
              <span className="text-sm font-semibold text-primary">{item.priceLabel}</span>
            ) : (
              <span />
            )}
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {viewLabel}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
