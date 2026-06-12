import { cookies } from "next/headers";
import { getRequestConfig } from "next-intl/server";
import { LOCALE_COOKIE, defaultLocale, isLocale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";

/**
 * Per-request i18n config for next-intl (CLAUDE.md Pattern 4).
 * The active locale comes from the EDU_LOCALE cookie set by the language
 * switcher — there is no URL-based locale routing.
 */
export default getRequestConfig(async () => {
  const cookieLocale = cookies().get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieLocale) ? cookieLocale : defaultLocale;

  return {
    locale,
    messages: getMessages(locale),
  };
});
