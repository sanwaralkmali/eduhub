import { getTranslations } from "next-intl/server";
import { IconGlobe, IconBuilding, IconCheckBadge, IconSparkle } from "@/components/ui/icons";

const ICONS = [IconGlobe, IconBuilding, IconCheckBadge, IconSparkle];

export async function WhyEduHub() {
  const t = await getTranslations("why");
  const items = t.raw("items") as { title: string; text: string }[];

  return (
    <section id="why" className="scroll-mt-20 bg-secondary/40 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={item.title}
                className="rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-accent/15 text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
