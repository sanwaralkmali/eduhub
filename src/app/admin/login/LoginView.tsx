"use client";

import { useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button, buttonVariants } from "@/components/ui/button";
import { IconCheck } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { sendMagicLink } from "./actions";

const FIELD =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function LoginView({ demo }: { demo: boolean }) {
  const t = useTranslation("admin");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      await sendMagicLink(email);
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4 py-16">
      <div className="rounded-2xl border bg-card p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-display font-bold text-primary-foreground">
            E
          </span>
          <span className="font-display text-lg font-bold text-foreground">{t("title")}</span>
        </div>

        {demo ? (
          <div className="space-y-4">
            <h1 className="font-display text-xl font-semibold text-foreground">
              {t("login.demoTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">{t("login.demoText")}</p>
            <a href="/admin" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
              {t("login.demoButton")}
            </a>
          </div>
        ) : state === "sent" ? (
          <div className="space-y-3 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
              <IconCheck className="h-6 w-6" />
            </span>
            <h1 className="font-display text-xl font-semibold text-foreground">
              {t("login.sentTitle")}
            </h1>
            <p className="text-sm text-muted-foreground">{t("login.sentText")}</p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <h1 className="font-display text-xl font-semibold text-foreground">{t("login.title")}</h1>
            <p className="text-sm text-muted-foreground">{t("login.subtitle")}</p>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("login.email")}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("login.emailPlaceholder")}
                className={FIELD}
                autoComplete="email"
              />
            </div>
            {state === "error" && <p className="text-sm text-destructive">{t("login.error")}</p>}
            <Button type="submit" className="w-full" disabled={state === "sending"}>
              {state === "sending" ? t("login.sending") : t("login.submit")}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
