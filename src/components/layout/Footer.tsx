import Link from "next/link";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { RibbonDivider } from "@/components/ui/Ribbon";

const SERVICE_LINKS = [
  { key: "activities", href: "/services/activities" },
  { key: "schoolServices", href: "/services/school-services" },
  { key: "graduation", href: "/services/graduation" },
] as const;

const COMPANY_LINKS = [
  { key: "why", href: "/#why" },
  { key: "contact", href: "/contact" },
] as const;

export async function Footer() {
  const t = await getTranslations("footer");
  const tc = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-brand-paper">
      <RibbonDivider />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Image
            src="/eduhub-scholar-reverse-navy.png"
            alt={tc("brand")}
            width={924}
            height={540}
            className="h-auto w-44"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-paper/70">
            {t("tagline")}
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-paper/60">
            {t("servicesTitle")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {SERVICE_LINKS.map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="text-brand-paper/80 transition-colors hover:text-accent">
                  {t(`links.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-paper/60">
            {t("companyTitle")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            {COMPANY_LINKS.map((l) => (
              <li key={l.key}>
                <Link href={l.href} className="text-brand-paper/80 transition-colors hover:text-accent">
                  {t(`links.${l.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-paper/60">
            {t("contactTitle")}
          </h4>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/contact" className="text-brand-paper/80 transition-colors hover:text-accent">
                {t("links.contact")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-5 text-xs text-brand-paper/60 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {year} <span className="font-brand">{tc("brand")}</span>. {t("rights")}
          </p>
          <nav aria-label={t("legalNavLabel")} className="flex gap-4">
            <Link href="/privacy" className="transition-colors hover:text-accent">
              {t("links.privacy")}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-accent">
              {t("links.terms")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
