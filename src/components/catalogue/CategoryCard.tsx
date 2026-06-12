import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconArrowRight, IconFlag, IconTag, IconCap } from "@/components/ui/icons";
import type { ServiceCategory } from "@/lib/catalogue/types";

const CATEGORY_ICON: Record<string, typeof IconFlag> = {
  activities: IconFlag,
  "school-services": IconTag,
  graduation: IconCap,
};

export function CategoryCard({
  category,
  itemsLabel,
  browseLabel,
}: {
  category: ServiceCategory;
  itemsLabel: string;
  browseLabel: string;
}) {
  const Icon = CATEGORY_ICON[category.slug] ?? IconFlag;

  return (
    <Link href={`/services/${category.slug}`} className="group block focus:outline-none">
      <Card className="relative h-full overflow-hidden transition-shadow group-hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-ring">
        <RibbonCorner />
        <CardContent className="flex h-full flex-col p-6">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 font-display text-xl font-semibold text-foreground">{category.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {category.tagline}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground">{itemsLabel}</span>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
              {browseLabel}
              <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
