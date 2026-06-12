import { getTranslations } from "next-intl/server";
import { IconFlag, IconCap } from "@/components/ui/icons";

// Real early work — honest, concrete proof for a new company (NOT a placeholder).
// Update these as more events are delivered.
const ICONS = [IconFlag, IconCap];

export async function TrackRecord() {
  const t = await getTranslations("trust");
  const items = t.raw("delivered.items") as { title: string; value: string; note: string }[];

  return (
    <section className="bg-background py-14 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t("delivered.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("delivered.subtitle")}</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={item.title}
                className="flex items-start gap-4 rounded-xl border border-border/70 bg-card p-6 shadow-sm"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-primary">{item.value}</p>
                  <p className="font-semibold text-foreground">{item.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
