"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Breadcrumbs } from "@/components/catalogue/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { IconCheck } from "@/components/ui/icons";

export interface ItemContext {
  kind: "item";
  itemName: string;
  categorySlug: string;
  itemSlug: string;
}

export interface TopicContext {
  kind: "topic";
  topicLabel: string;
  topic: string;
}

export type ContactContext = ItemContext | TopicContext;

const FIELD =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

export function ContactView({ context }: { context: ContactContext | null }) {
  const t = useTranslation("contact");
  const tn = useTranslation("nav");
  const tc = useTranslation("cta");
  const email = tc("email");

  const prefill = context
    ? context.kind === "item"
      ? t("itemPrefill", { item: context.itemName })
      : t("topicPrefill", { topic: context.topicLabel })
    : "";

  const [values, setValues] = useState({
    name: "",
    school: "",
    email: "",
    phone: "",
    message: prefill,
    company: "", // honeypot — must stay empty
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [done, setDone] = useState(false);

  function set<K extends keyof typeof values>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate() {
    const next: typeof errors = {};
    if (values.name.trim().length < 2) next.name = t("errors.name");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(values.email.trim())) next.email = t("errors.email");
    if (values.message.trim().length < 10) next.message = t("errors.message");
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "submitting") return;
    if (values.company) {
      setDone(true); // bot tripped the honeypot — pretend success, post nothing
      return;
    }
    if (!validate()) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name,
          school: values.school,
          email: values.email,
          phone: values.phone,
          message: values.message,
          categorySlug: context?.kind === "item" ? context.categorySlug : undefined,
        }),
      });
      const json = (await res.json()) as { error: string | null };
      if (res.ok && json.error == null) {
        setDone(true);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumbs items={[{ label: tn("home"), href: "/" }, { label: t("title") }]} />

      <header className="mt-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("subtitle")}</p>
      </header>

      {done ? (
        <div
          role="status"
          className="mt-10 flex flex-col items-center gap-4 rounded-2xl border bg-secondary/40 p-10 text-center"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground">
            <IconCheck className="h-6 w-6" />
          </span>
          <h2 className="font-display text-xl font-semibold text-foreground">{t("successTitle")}</h2>
          <p className="text-muted-foreground">{t("successText")}</p>
          <Link href="/services" className="text-sm font-semibold text-primary hover:underline">
            {tn("services")}
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} noValidate className="mt-8 space-y-5">
          {context && (
            <p className="rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-foreground">
              {context.kind === "item"
                ? t("contextNote", { item: context.itemName })
                : t("topicContextNote", { topic: context.topicLabel })}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("name")}
              </label>
              <input
                id="name"
                name="name"
                value={values.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder={t("namePlaceholder")}
                className={FIELD}
                autoComplete="name"
                aria-required="true"
                aria-invalid={errors.name ? "true" : undefined}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" role="alert" className="mt-1 text-xs text-destructive">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="school" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("school")} <span className="text-muted-foreground">({t("optional")})</span>
              </label>
              <input
                id="school"
                name="school"
                value={values.school}
                onChange={(e) => set("school", e.target.value)}
                placeholder={t("schoolPlaceholder")}
                className={FIELD}
                autoComplete="organization"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={values.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder={t("emailPlaceholder")}
                className={FIELD}
                autoComplete="email"
                aria-required="true"
                aria-invalid={errors.email ? "true" : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" role="alert" className="mt-1 text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("phone")} <span className="text-muted-foreground">({t("optional")})</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={values.phone}
                onChange={(e) => set("phone", e.target.value)}
                placeholder={t("phonePlaceholder")}
                className={FIELD}
                autoComplete="tel"
                dir="ltr"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
              {t("message")}
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => set("message", e.target.value)}
              placeholder={t("messagePlaceholder")}
              className={FIELD}
              aria-required="true"
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="mt-1 text-xs text-destructive">
                {errors.message}
              </p>
            )}
          </div>

          <input
            type="text"
            name="company"
            value={values.company}
            onChange={(e) => set("company", e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="hidden"
          />

          {status === "error" && (
            <p role="alert" className="text-sm text-destructive">
              {t("errors.server")}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" size="lg" disabled={status === "submitting"}>
              {status === "submitting" ? t("submitting") : t("submit")}
            </Button>
            <span className="text-sm text-muted-foreground">
              {t("emailNote")}{" "}
              <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
                {email}
              </a>
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
