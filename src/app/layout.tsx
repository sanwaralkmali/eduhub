import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Spectral, Hanken_Grotesk, IBM_Plex_Sans_Arabic } from "next/font/google";
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

// "The Scholar" type system (BRAND.md): Spectral (serif display) + Hanken Grotesk
// (sans body) for Latin, IBM Plex Sans Arabic for Arabic. Exposed as CSS variables.
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  variable: "--font-arabic",
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
  const dir = isRtl(locale) ? "rtl" : "ltr";
  const pathname = headers().get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${spectral.variable} ${hanken.variable} ${plexArabic.variable}`}
    >
      <body className="min-h-screen bg-background font-body text-foreground antialiased">
        <NextIntlClientProvider messages={messages}>
          {isAdmin ? (
            children
          ) : (
            <div className="flex min-h-screen flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
              <StructuredData />
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileTabBar />
            </div>
          )}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
