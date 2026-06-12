import { getTranslations } from "next-intl/server";
import { IconClock, IconShield, IconCheckBadge, IconTruck } from "@/components/ui/icons";

// Order mirrors guarantees.items: on-time, quality, satisfaction, reply-within.
const ICONS = [IconTruck, IconShield, IconCheckBadge, IconClock];

/** Editable guarantee cards placed before the final CTA, so the reassurance sits
 *  next to the ask. Never promises more than the business can honour — copy is a
 *  placeholder the owner tailors. */
export async function Guarantees() {
  const t = await getTranslations("trust");
  const items = t.raw("guarantees.items") as { title: string; text: string }[];

  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("guarantees.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("guarantees.subtitle")}</p>
        </div>

        <div className="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div
                key={item.title}
                className="rounded-xl border border-border/70 bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-base font-semibold text-foreground">
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
