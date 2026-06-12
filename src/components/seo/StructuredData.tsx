import { SITE, SITE_URL, absoluteUrl } from "@/lib/site/config";

// Organization + LocalBusiness JSON-LD for trust + local (Istanbul) SEO.
// Rendered once, site-wide, from the root layout (public pages only).
export function StructuredData() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE.name,
        url: SITE_URL,
        logo: absoluteUrl(SITE.logo),
        email: SITE.email,
        telephone: SITE.phone,
        description: SITE.description,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: SITE.email,
          telephone: SITE.phone,
          availableLanguage: ["en", "ar"],
          areaServed: SITE.countryName,
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: SITE.name,
        url: SITE_URL,
        image: absoluteUrl(SITE.logo),
        email: SITE.email,
        telephone: SITE.phone,
        description: SITE.description,
        address: {
          "@type": "PostalAddress",
          addressLocality: SITE.city,
          addressCountry: SITE.country,
        },
        areaServed: { "@type": "City", name: SITE.city },
        knowsLanguage: ["en", "ar"],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // App-controlled static JSON (no user input) — safe to inline.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
