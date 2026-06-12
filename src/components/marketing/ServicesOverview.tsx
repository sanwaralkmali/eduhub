import Link from "next/link";
import { getTranslations } from "next-intl/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { IconFlag, IconTag, IconCap, IconCheck, IconArrowRight } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const SERVICES = [
  { key: "activities", slug: "activities", Icon: IconFlag },
  { key: "schoolServices", slug: "school-services", Icon: IconTag },
  { key: "graduation", slug: "graduation", Icon: IconCap },
] as const;

export async function ServicesOverview() {
  const t = await getTranslations("services");

  return (
    <section id="services" className="scroll-mt-20 bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {SERVICES.map(({ key, slug, Icon }) => {
            const points = t.raw(`items.${key}.points`) as string[];
            return (
              <Card key={key} className="relative flex flex-col overflow-hidden transition-shadow hover:shadow-md">
                <RibbonCorner />
                <CardHeader>
                  <span className="mb-2 grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <CardTitle>{t(`items.${key}.title`)}</CardTitle>
                  <CardDescription className="leading-relaxed">
                    {t(`items.${key}.description`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <ul className="space-y-2 text-sm text-foreground/80">
                    {points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <IconCheck className="mt-0.5 h-4 w-4 text-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                  >
                    {t("cta")}
                    <IconArrowRight className="h-4 w-4 rtl:-scale-x-100" />
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/products"
            className={cn(buttonVariants({ variant: "outline", size: "lg" }), "group")}
          >
            {t("allProductsCta")}
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100" />
          </Link>
        </div>
      </div>
    </section>
  );
}
