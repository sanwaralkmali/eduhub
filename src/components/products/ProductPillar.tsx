import { ProductCard, type ProductCardLabels } from "./ProductCard";
import { IconFlag, IconTag, IconCap } from "@/components/ui/icons";
import type { CatalogueItem, ServiceCategory } from "@/lib/catalogue/types";

const CATEGORY_ICON: Record<string, typeof IconFlag> = {
  activities: IconFlag,
  "school-services": IconTag,
  graduation: IconCap,
};

/** One pillar (Activities / School Services / Graduation): header + product grid.
 *  `id={slug}` makes it an in-page anchor target for the hero/nav. */
export function ProductPillar({
  category,
  items,
  labels,
}: {
  category: ServiceCategory;
  items: CatalogueItem[];
  labels: ProductCardLabels;
}) {
  if (!items.length) return null;
  const Icon = CATEGORY_ICON[category.slug] ?? IconFlag;

  return (
    <section id={category.slug} className="scroll-mt-24">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </span>
        <div>
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {category.name}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{category.tagline}</p>
        </div>
      </div>

      <div className="reveal mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} labels={labels} />
        ))}
      </div>
    </section>
  );
}
