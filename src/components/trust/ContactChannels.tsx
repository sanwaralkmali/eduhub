import { getTranslations } from "next-intl/server";
import { IconPhone, IconWhatsApp, IconMail } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

/** Transparency: visible phone / WhatsApp / email. Values are placeholders — the
 *  email reuses the existing `cta.email`; phone & WhatsApp come from `trust.channels`. */
export async function ContactChannels({ className }: { className?: string }) {
  const t = await getTranslations("trust");
  const tc = await getTranslations("cta");

  const email = tc("email");
  const phone = t("channels.phone");
  const whatsapp = t("channels.whatsapp");
  const waDigits = whatsapp.replace(/[^\d]/g, "");

  const channels = [
    {
      Icon: IconPhone,
      label: t("channels.phoneLabel"),
      value: phone,
      href: `tel:${phone.replace(/\s/g, "")}`,
    },
    {
      Icon: IconWhatsApp,
      label: t("channels.whatsappLabel"),
      value: whatsapp,
      href: `https://wa.me/${waDigits}`,
    },
    {
      Icon: IconMail,
      label: t("channels.emailLabel"),
      value: email,
      href: `mailto:${email}`,
    },
  ];

  return (
    <div className={cn(className)}>
      <div className="grid gap-4 sm:grid-cols-3">
        {channels.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 transition-shadow hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
              <c.Icon className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-xs text-muted-foreground">{c.label}</span>
              <span className="block truncate text-sm font-semibold text-foreground" dir="ltr">
                {c.value}
              </span>
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] text-muted-foreground/70">
        {t("channels.note")}
      </p>
    </div>
  );
}
