"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { key: "products", href: "/products" },
  { key: "services", href: "/services" },
  { key: "why", href: "/#why" },
  { key: "contact", href: "/contact" },
] as const;

// On mobile, primary navigation lives in the bottom tab bar (app-style), so the
// top bar stays minimal: logo + language switch. Desktop keeps the full nav.
export function Navbar() {
  const t = useTranslation("nav");
  const tc = useTranslation("common");

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <nav
        aria-label={t("primaryNav")}
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-display text-xl font-semibold text-brand-navy"
        >
          <Image
            src="/eduhub-scholar-mark-color.png"
            alt=""
            width={36}
            height={36}
            className="h-9 w-9"
            priority
          />
          {tc("brand")}
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.key}
              href={l.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {t(l.key)}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className={cn(buttonVariants({ variant: "default", size: "sm" }), "hidden sm:inline-flex")}
          >
            {t("contact")}
          </Link>
        </div>
      </nav>
    </header>
  );
}
