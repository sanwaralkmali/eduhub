"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { LOCALE_COOKIE, localeNames, type Locale } from "@/lib/i18n/config";
import { IconGlobe } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const ONE_YEAR = 60 * 60 * 24 * 365;

/**
 * Toggles the EDU_LOCALE cookie and refreshes the server components so the
 * whole tree (including <html dir>) re-renders in the new language.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const next: Locale = locale === "ar" ? "en" : "ar";

  function switchTo(target: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${target};path=/;max-age=${ONE_YEAR};samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <button
      type="button"
      onClick={() => switchTo(next)}
      aria-label={`Switch language to ${localeNames[next]}`}
      disabled={pending}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary disabled:opacity-60",
        className,
      )}
    >
      <IconGlobe className="h-4 w-4" aria-hidden />
      <span>{localeNames[next]}</span>
    </button>
  );
}
