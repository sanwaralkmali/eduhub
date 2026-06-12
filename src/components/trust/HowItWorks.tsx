import { getTranslations } from "next-intl/server";
import { RibbonDivider } from "@/components/ui/Ribbon";

/** Kills uncertainty for a cautious buyer: Enquire → Plan & quote → Delivered. */
export async function HowItWorks() {
  const t = await getTranslations("trust");
  const steps = t.raw("how.steps") as { title: string; text: string }[];

  return (
    <section className="bg-secondary/40 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("how.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("how.subtitle")}</p>
          <RibbonDivider className="mx-auto mt-5 max-w-[10rem] rounded-full" />
        </div>

        <ol className="reveal mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-base font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
