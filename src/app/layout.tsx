import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Cairo, Amiri } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { isRtl, type Locale } from "@/lib/i18n/config";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { StructuredData } from "@/components/seo/StructuredData";
import "./globals.css";

// Navy themed status bar + cover the safe areas so the app fills notched screens.
export const viewport: Viewport = {
  themeColor: "#14355A",
  viewportFit: "cover",
};

// Bilingual type: Cairo for Latin, Amiri (classical Naskh) for Arabic. Each font is
// loaded for its own script only, so glyph fallback renders each script in its own
// face — Arabic → Amiri, Latin → Cairo — regardless of page locale.
const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  const title = t("title");
  const description = t("description");
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://eduhub-sable-zeta.vercel.app"),
    title: { default: title, template: "%s · Eduhub" },
    description,
    applicationName: "Eduhub",
    appleWebApp: { capable: true, title: "Eduhub", statusBarStyle: "default" },
    icons: { icon: "/eduhub-scholar-mark-color.png", apple: "/eduhub-scholar-mark-color.png" },
    openGraph: {
      type: "website",
      siteName: "Eduhub",
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Locale + messages come from src/i18n/request.ts (driven by the EDU_LOCALE cookie).
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const tc = await getTranslations("common");
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const pathname = headers().get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${cairo.variable} ${amiri.variable}`}
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {isAdmin ? (
            children
          ) : (
            <div className="flex min-h-screen flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
              >
                {tc("skipToContent")}
              </a>
              <StructuredData />
              <Navbar />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
              <MobileTabBar />
            </div>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
