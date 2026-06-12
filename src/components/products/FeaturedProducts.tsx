import { ProductCard, type ProductCardLabels } from "./ProductCard";
import { RibbonDivider } from "@/components/ui/Ribbon";
import type { CatalogueItem } from "@/lib/catalogue/types";

/** Highlights the featured items across all pillars near the top of /products. */
export function FeaturedProducts({
  items,
  labels,
  heading,
  subheading,
}: {
  items: CatalogueItem[];
  labels: ProductCardLabels;
  heading: string;
  subheading: string;
}) {
  if (!items.length) return null;

  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-3 text-muted-foreground">{subheading}</p>
          <RibbonDivider className="mx-auto mt-5 max-w-[10rem] rounded-full" />
        </div>

        <div className="reveal mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ProductCard key={item.id} item={item} labels={labels} />
          ))}
        </div>
      </div>
    </section>
  );
}
