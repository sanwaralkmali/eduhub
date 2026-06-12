// Locale configuration for Edu-Hub (CLAUDE.md Pattern 4 — bilingual copy).

export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Cookie that stores the visitor's chosen locale (set by the language switcher). */
export const LOCALE_COOKIE = "EDU_LOCALE";

/** Display names, each written in its own script. */
export const localeNames: Record<Locale, string> = {
  en: "English",
  ar: "العربية",
};

/** Right-to-left layout is driven by locale, never by per-component CSS hacks. */
export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

/** Narrow an unknown cookie value to a supported Locale. */
export function isLocale(value: string | undefined | null): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}
