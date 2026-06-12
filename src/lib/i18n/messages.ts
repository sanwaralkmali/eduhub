import type { AbstractIntlMessages } from "next-intl";
import type { Locale } from "./config";
import en from "@/content/i18n/en.json";
import ar from "@/content/i18n/ar.json";

// All user-facing strings live in src/content/i18n/*.json (CLAUDE.md Pattern 4).
const messagesByLocale = { en, ar } as const;

// next-intl's AbstractIntlMessages type doesn't model string[] leaves (e.g. the
// `points`/`items` arrays), though they're valid at runtime and read via t.raw().
// Relax the return type so `next build` type-checks; runtime is unchanged.
export function getMessages(locale: Locale): AbstractIntlMessages {
  return messagesByLocale[locale] as unknown as AbstractIntlMessages;
}
