import { getTranslations } from "next-intl/server";
import { ProductsHero } from "@/components/products/ProductsHero";
import { FeaturedProducts } from "@/components/products/FeaturedProducts";
import { ProductPillar } from "@/components/products/ProductPillar";
import type { ProductCardLabels } from "@/components/products/ProductCard";
import { TrustBar } from "@/components/trust/TrustBar";
import { TrackRecord } from "@/components/trust/TrackRecord";
import { HowItWorks } from "@/components/trust/HowItWorks";
import { Guarantees } from "@/components/trust/Guarantees";
import { FounderPromise } from "@/components/trust/FounderPromise";
import { Faq } from "@/components/trust/Faq";
import { FinalCta } from "@/components/trust/FinalCta";
import type { CatalogueItem, ServiceCategory } from "@/lib/catalogue/types";

interface Pillar {
  category: ServiceCategory;
  items: CatalogueItem[];
}

export async function ProductsView({
  pillars,
  featured,
}: {
  pillars: Pillar[];
  featured: CatalogueItem[];
}) {
  const t = await getTranslations("products");

  const labels: ProductCardLabels = {
    featured: t("featured"),
    requestQuote: t("requestQuote"),
    enquire: t("enquire"),
    viewDetails: t("viewDetails"),
  };

  return (
    <>
      <ProductsHero />
      <TrustBar />
      <TrackRecord />

      <FeaturedProducts
        items={featured}
        labels={labels}
        heading={t("featuredTitle")}
        subheading={t("featuredSubtitle")}
      />

      <section id="all-products" className="scroll-mt-20 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t("allTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">{t("allSubtitle")}</p>
          </div>

          <div className="mt-12 space-y-16">
            {pillars.map((pillar) => (
              <ProductPillar
                key={pillar.category.slug}
                category={pillar.category}
                items={pillar.items}
                labels={labels}
              />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <Guarantees />
      <FounderPromise />
      <Faq />
      <FinalCta />
    </>
  );
}
