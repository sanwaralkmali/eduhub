// Single source of truth for SEO / structured-data / sitemap facts.
// Display copy still lives in src/content/i18n (cta.email, trust.channels.*);
// these plain constants mirror those values for use outside the translation layer.

/** Absolute site origin, no trailing slash. Set NEXT_PUBLIC_SITE_URL in env / Vercel. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://eduhub-sable-zeta.vercel.app").replace(
  /\/+$/,
  "",
);

export const SITE = {
  url: SITE_URL,
  name: "Eduhub",
  /** Short description used in structured-data + meta fallbacks. */
  description:
    "Activities, school services, and graduation for schools — bilingual, end to end. Based in Istanbul, Türkiye.",
  email: "eduhub.contact26@gmail.com",
  /** Human-readable phone (mirrors trust.channels.phone). */
  phone: "+90 552 471 86 00",
  /** E.164 form for tel: links / structured data. */
  phoneE164: "+905524718600",
  city: "Istanbul",
  country: "TR",
  countryName: "Türkiye",
  /** Logo/mark served from /public. */
  logo: "/eduhub-scholar-mark-color.png",
  locales: ["en", "ar"] as const,
} as const;

/** Build an absolute URL from a site-root path. */
export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
