import { getTranslations } from "next-intl/server";
import { IconChevronDown } from "@/components/ui/icons";

/** Answers a cautious buyer's real objections. Native <details>/<summary> keeps
 *  it keyboard-accessible and JS-free (stays a server component). */
export async function Faq() {
  const t = await getTranslations("trust");
  const items = t.raw("faq.items") as { q: string; a: string }[];

  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("faq.subtitle")}</p>
        </div>

        <div className="mt-10 divide-y divide-border overflow-hidden rounded-xl border bg-card">
          {items.map((item) => (
            <details key={item.q} className="group px-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
                <span>{item.q}</span>
                <IconChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
