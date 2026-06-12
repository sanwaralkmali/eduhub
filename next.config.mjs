import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Catalogue images are served from Supabase Storage (Pattern 5).
    // Replace the wildcard with your project ref before launch if you want to lock it down.
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

// Wires next-intl into the App Router (CLAUDE.md Pattern 4).
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
