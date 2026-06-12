import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { requireAdmin, isAdminDemoMode } from "@/lib/auth/admin";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  const demo = isAdminDemoMode();
  const t = await getTranslations("admin");

  const nav = [
    { href: "/admin", label: t("nav.dashboard") },
    { href: "/admin/enquiries", label: t("nav.enquiries") },
    { href: "/admin/catalogue", label: t("nav.catalogue") },
  ];

  return (
    <div className="min-h-screen bg-secondary/20">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary font-display font-bold text-primary-foreground">
              E
            </span>
            <span className="font-display font-bold text-foreground">{t("title")}</span>
            {demo && (
              <span className="rounded-full bg-accent/20 px-2 py-0.5 text-xs font-semibold text-accent-foreground">
                {t("demoBadge")}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 text-sm">
            <LanguageSwitcher />
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
              {t("viewSite")}
            </Link>
            {!demo && (
              <form action="/admin/auth/signout" method="post">
                <button type="submit" className="font-medium text-primary hover:underline">
                  {t("signOut")}
                </button>
              </form>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 md:flex-row">
        <nav className="flex gap-1 overflow-x-auto md:w-48 md:flex-col">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
