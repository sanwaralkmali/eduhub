import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconArrowRight } from "@/components/ui/icons";
import { ContactChannels } from "@/components/trust/ContactChannels";
import { cn } from "@/lib/utils";

export async function ContactCta() {
  const t = await getTranslations("cta");
  const email = t("email");

  return (
    <section id="contact" className="scroll-mt-20 bg-background px-4 py-20 sm:px-6 sm:py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-brand-navy px-6 py-14 text-center text-brand-paper sm:px-12">
        <RibbonCorner />
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-brand-paper/85">{t("subtitle")}</p>

        <div className="mt-8 flex justify-center">
          <a
            href={`mailto:${email}`}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }),
              "group bg-brand-paper text-brand-navy hover:bg-white",
            )}
          >
            {t("button")}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </a>
        </div>

        <p className="mt-4 text-sm text-brand-paper/70">{t("note")}</p>
      </div>

      <div className="mx-auto mt-10 max-w-5xl">
        <ContactChannels />
      </div>
    </section>
  );
}
