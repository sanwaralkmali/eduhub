"use client";

import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/button";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslation("catalogue");

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <h2 className="font-display text-xl font-bold text-foreground">{t("errorTitle")}</h2>
      <p className="text-muted-foreground">{t("errorText")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </div>
  );
}
