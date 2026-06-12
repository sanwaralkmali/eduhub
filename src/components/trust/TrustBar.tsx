import { getTranslations } from "next-intl/server";
import { IconGlobe, IconTag, IconCheckBadge, IconClock } from "@/components/ui/icons";

// Honest, day-one capability facts — no invented counts, ratings, or "since" year.
const ICONS = [IconGlobe, IconTag, IconCheckBadge, IconClock];

export async function TrustBar() {
  const t = await getTranslations("trust");
  const items = t.raw("assurances") as { title: string; text: string }[];

  return (
    <section className="border-y border-border/70 bg-card">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <div key={item.title} className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="font-display text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
