import { getTranslations } from "next-intl/server";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconQuote } from "@/components/ui/icons";

/** First-party trust: a genuine founder's commitment, replacing invented
 *  third-party testimonials. The quote + name are editable placeholders the
 *  owner replaces with their real words and signature. */
export async function FounderPromise() {
  const t = await getTranslations("founder");

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("heading")}
        </h2>

        <figure className="relative mt-8 overflow-hidden rounded-3xl border bg-card p-8 shadow-sm sm:p-12">
          <RibbonCorner />
          <IconQuote className="h-10 w-10 text-accent" />
          <blockquote className="mt-5 font-display text-xl leading-relaxed text-foreground sm:text-2xl">
            {t("quote")}
          </blockquote>
          <figcaption className="mt-6">
            <p className="font-semibold text-foreground">{t("name")}</p>
            <p className="text-sm text-muted-foreground">{t("role")}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
