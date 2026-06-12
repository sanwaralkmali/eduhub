import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { RibbonDivider } from "@/components/ui/Ribbon";
import { IconArrowRight, IconSparkle } from "@/components/ui/icons";
import { enquiryHref } from "@/lib/enquiries/links";
import { cn } from "@/lib/utils";

/** Flagship hero: one strong promise + a browse CTA and a request-a-quote CTA. */
export async function ProductsHero() {
  const t = await getTranslations("products");

  return (
    <section className="border-b border-border bg-secondary/40">
      <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
        <Badge variant="accent" className="mx-auto">
          <IconSparkle className="h-3.5 w-3.5" />
          {t("heroBadge")}
        </Badge>

        <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {t("heroTitle")}
        </h1>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          {t("heroSubtitle")}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#all-products"
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "group w-full sm:w-auto")}
          >
            {t("heroCtaPrimary")}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
          <Link
            href={enquiryHref({ topic: "quote" })}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full sm:w-auto")}
          >
            {t("heroCtaSecondary")}
          </Link>
        </div>

        <RibbonDivider className="mx-auto mt-12 max-w-xs rounded-full" />
      </div>
    </section>
  );
}
