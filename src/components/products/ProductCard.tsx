import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconArrowRight, IconFlag, IconTag, IconCap } from "@/components/ui/icons";
import { enquiryHref } from "@/lib/enquiries/links";
import { cn } from "@/lib/utils";
import type { CatalogueItem } from "@/lib/catalogue/types";

const CATEGORY_ICON: Record<string, typeof IconFlag> = {
  activities: IconFlag,
  "school-services": IconTag,
  graduation: IconCap,
};

export interface ProductCardLabels {
  featured: string;
  requestQuote: string;
  enquire: string;
  viewDetails: string;
}

/**
 * Conversion-forward product card: image/branded placeholder, optional Featured
 * highlight (ribbon + badge), one-line value, price-or-"request a quote", and an
 * Enquire CTA on every card (deep-links to /contact with item context). The image
 * and title link to the detail page; the Enquire button is a separate link so the
 * two actions never nest.
 */
export function ProductCard({
  item,
  labels,
}: {
  item: CatalogueItem;
  labels: ProductCardLabels;
}) {
  const Icon = CATEGORY_ICON[item.categorySlug] ?? IconFlag;
  const detailHref = `/services/${item.categorySlug}/${item.slug}`;
  const enquireLink = enquiryHref({ item: item.slug, category: item.categorySlug });

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition hover:shadow-md active:scale-[0.99]">
      {item.isFeatured && <RibbonCorner />}

      <Link
        href={detailHref}
        className="group block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary">
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <span className="absolute inset-0 grid place-items-center text-primary/40">
              <Icon className="h-12 w-12" />
            </span>
          )}
          {item.isFeatured && (
            <Badge variant="accent" className="absolute start-3 top-3 shadow-sm">
              {labels.featured}
            </Badge>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={detailHref} className="focus:outline-none">
          <h3 className="font-display text-lg font-semibold text-foreground transition-colors hover:text-primary">
            {item.name}
          </h3>
        </Link>
        <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>

        <p className="mt-3 text-sm font-semibold text-primary">
          {item.priceLabel ?? labels.requestQuote}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Link
            href={enquireLink}
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "group")}
          >
            {labels.enquire}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
          <Link href={detailHref} className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}>
            {labels.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
