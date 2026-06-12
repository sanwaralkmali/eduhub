import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { getAdminItems, getAdminCategories } from "@/lib/admin/catalogue";
import { isAdminDemoMode } from "@/lib/auth/admin";
import { localizeItem } from "@/lib/catalogue/types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/config";
import { DeleteItemButton } from "./DeleteItemButton";

export default async function AdminCataloguePage() {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;
  const demo = isAdminDemoMode();

  const [items, categories] = await Promise.all([getAdminItems(), getAdminCategories()]);
  const categoryName = new Map(
    categories.map((c) => [c.slug, locale === "ar" ? c.name_ar : c.name_en]),
  );

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t("catalogue.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("catalogue.subtitle")}</p>
        </div>
        {!demo && (
          <Link href="/admin/catalogue/new" className={cn(buttonVariants({ size: "sm" }))}>
            {t("catalogue.new")}
          </Link>
        )}
      </header>

      {demo && (
        <p className="mt-4 rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-foreground">
          {t("catalogue.demoNotice")}
        </p>
      )}

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <ul className="divide-y divide-border">
          {items.map((item) => {
            const view = localizeItem(item, locale);
            return (
              <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-foreground">{view.name}</span>
                    {item.is_featured && (
                      <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                        {t("catalogue.featured")}
                      </span>
                    )}
                    {!item.is_active && (
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground">
                        {t("catalogue.inactive")}
                      </span>
                    )}
                  </div>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground" dir="ltr">
                    {categoryName.get(item.category_slug) ?? item.category_slug} · /{item.category_slug}/
                    {item.slug}
                  </p>
                </div>
                {!demo && (
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/catalogue/${item.id}/edit`}
                      className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                    >
                      {t("catalogue.edit")}
                    </Link>
                    <DeleteItemButton id={item.id} name={view.name} />
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        {items.length === 0 && (
          <p className="p-8 text-center text-muted-foreground">{t("catalogue.empty")}</p>
        )}
      </div>
    </div>
  );
}
