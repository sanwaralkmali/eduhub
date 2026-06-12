"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/button";

export default function ServicesError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslation("catalogue");

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <h2 className="font-display text-2xl font-bold text-foreground">{t("errorTitle")}</h2>
      <p className="text-muted-foreground">{t("errorText")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
