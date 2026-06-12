import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconArrowRight } from "@/components/ui/icons";
import { ContactChannels } from "./ContactChannels";
import { enquiryHref } from "@/lib/enquiries/links";
import { cn } from "@/lib/utils";

/** Closing CTA: one strong ask + the reply-soon reassurance, with the visible
 *  contact channels right beneath it so a cautious buyer can reach a human. */
export async function FinalCta() {
  const t = await getTranslations("trust");

  return (
    <section className="bg-background px-4 py-16 sm:px-6 sm:py-20">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center text-brand-paper sm:px-12">
        <RibbonCorner />
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("finalCta.title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-paper/85">{t("finalCta.subtitle")}</p>

        <div className="mt-8 flex justify-center">
          <Link
            href={enquiryHref({ topic: "quote" })}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "group bg-brand-paper text-brand-navy hover:bg-white",
            )}
          >
            {t("finalCta.button")}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>

        <p className="mt-4 text-sm text-brand-paper/70">{t("finalCta.note")}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <ContactChannels />
      </div>
    </section>
  );
}
