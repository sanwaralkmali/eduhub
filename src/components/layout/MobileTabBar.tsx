"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { IconHome, IconGrid, IconLayers, IconMail, IconWhatsApp } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const TABS = [
  { key: "home", href: "/", Icon: IconHome },
  { key: "products", href: "/products", Icon: IconGrid },
  { key: "services", href: "/services", Icon: IconLayers },
  { key: "contact", href: "/contact", Icon: IconMail },
] as const;

/**
 * Native-app-style bottom tab bar (mobile only). Fixed to the bottom with a
 * raised WhatsApp action in the centre, an active-route indicator, tap feedback,
 * and safe-area padding so it clears the iOS home indicator. Hidden on md+,
 * where the top navbar carries navigation.
 */
export function MobileTabBar() {
  const t = useTranslation("nav");
  const tt = useTranslation("trust");
  const pathname = usePathname();

  const whatsapp = tt("channels.whatsapp");
  const waHref = `https://wa.me/${whatsapp.replace(/[^\d]/g, "")}`;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const left = TABS.slice(0, 2);
  const right = TABS.slice(2);

  return (
    <nav
      aria-label={t("home")}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto flex max-w-md items-stretch">
        {left.map((tab) => (
          <TabLink key={tab.key} tab={tab} active={isActive(tab.href)} label={t(tab.key)} />
        ))}

        <li className="flex-1">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex touch-manipulation flex-col items-center gap-1 pb-1.5 transition-transform active:scale-95"
          >
            <span className="-mt-5 grid h-12 w-12 place-items-center rounded-full border-4 border-background bg-primary text-primary-foreground shadow-lg shadow-primary/30">
              <IconWhatsApp className="h-6 w-6" />
            </span>
            <span className="text-[10px] font-medium leading-none text-muted-foreground">
              {t("whatsapp")}
            </span>
          </a>
        </li>

        {right.map((tab) => (
          <TabLink key={tab.key} tab={tab} active={isActive(tab.href)} label={t(tab.key)} />
        ))}
      </ul>
    </nav>
  );
}

function TabLink({
  tab,
  active,
  label,
}: {
  tab: { href: string; Icon: typeof IconHome };
  active: boolean;
  label: string;
}) {
  return (
    <li className="flex-1">
      <Link
        href={tab.href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative flex touch-manipulation flex-col items-center gap-1 py-2.5 text-[10px] font-medium leading-none transition-colors active:scale-95",
          active ? "text-primary" : "text-muted-foreground",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute top-0 h-0.5 w-8 rounded-full bg-accent transition-opacity",
            active ? "opacity-100" : "opacity-0",
          )}
        />
        <tab.Icon className="h-6 w-6" />
        <span>{label}</span>
      </Link>
    </li>
  );
}
