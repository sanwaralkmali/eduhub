import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { IconBuilding, IconArrowRight } from "@/components/ui/icons";
import { enquiryHref } from "@/lib/enquiries/links";
import { cn } from "@/lib/utils";

/** Honest invitation for a new company: instead of implying existing clients,
 *  invite schools to be among the first partners. The dashed "Your school" tiles
 *  read as "your logo could be here," not as fake endorsements. */
export async function LogoStrip() {
  const t = await getTranslations("trust");
  const placeholder = t("logos.placeholder");

  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("logos.title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">{t("logos.subtitle")}</p>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background px-4 py-5 text-muted-foreground"
            >
              <IconBuilding className="h-5 w-5 shrink-0" />
              <span className="text-xs font-medium">{placeholder}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href={enquiryHref({ topic: "general" })}
            className={cn(buttonVariants({ variant: "default", size: "lg" }), "group")}
          >
            {t("logos.cta")}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
