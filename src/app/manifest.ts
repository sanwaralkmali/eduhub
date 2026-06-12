import type { MetadataRoute } from "next";

// Web App Manifest — makes Eduhub installable to the home screen and launch in a
// standalone, full-screen, app-like window (no browser chrome).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Eduhub — School Services",
    short_name: "Eduhub",
    description:
      "School events, handled — Activities, School Services, and Graduation, in Arabic and English. Based in Istanbul.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F5EF",
    theme_color: "#14355A",
    icons: [
      { src: "/eduhub-scholar-mark-color.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/eduhub-scholar-mark-color.png", sizes: "192x192", type: "image/png", purpose: "any" },
    ],
  };
}
