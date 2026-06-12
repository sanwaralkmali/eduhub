"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/button";

// Pattern-1 conformance for a Supabase-backed route. In practice the catalogue
// data layer falls back to seed data and never throws, so this is a safety net.
export default function ProductsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslation("catalogue");

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <h2 className="font-display text-2xl font-bold text-foreground">{t("errorTitle")}</h2>
      <p className="text-muted-foreground">{t("errorText")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
