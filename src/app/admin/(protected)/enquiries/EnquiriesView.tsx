"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/lib/i18n/useTranslation";
import type { EnquiryRow, EnquiryStatus } from "@/lib/admin/types";

const STATUS_STYLES: Record<EnquiryStatus, string> = {
  new: "bg-primary/10 text-primary",
  contacted: "bg-accent/20 text-accent-foreground",
  closed: "bg-secondary text-muted-foreground",
};

export function EnquiriesView({ enquiries }: { enquiries: EnquiryRow[] }) {
  const t = useTranslation("admin");
  const [filter, setFilter] = useState<EnquiryStatus | "all">("all");

  const filtered = useMemo(
    () => (filter === "all" ? enquiries : enquiries.filter((e) => e.status === filter)),
    [enquiries, filter],
  );

  const filters: Array<{ value: EnquiryStatus | "all"; label: string }> = [
    { value: "all", label: t("enquiries.filterAll") },
    { value: "new", label: t("status.new") },
    { value: "contacted", label: t("status.contacted") },
    { value: "closed", label: t("status.closed") },
  ];

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString();

  return (
    <div>
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">{t("enquiries.title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("enquiries.subtitle")}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => setFilter(f.value)}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                filter === f.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground/70 hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </header>

      {filtered.length === 0 ? (
        <p className="mt-8 rounded-xl border border-dashed border-border bg-card p-8 text-center text-muted-foreground">
          {t("enquiries.empty")}
        </p>
      ) : (
        <ul className="mt-6 space-y-3">
          {filtered.map((e) => (
            <li key={e.id} className="rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-foreground">{e.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {e.school ? `${e.school} · ` : ""}
                    <a href={`mailto:${e.email}`} className="text-primary hover:underline">
                      {e.email}
                    </a>
                    {e.phone ? ` · ${e.phone}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[e.status]}`}
                  >
                    {t(`status.${e.status}`)}
                  </span>
                  <span className="text-xs text-muted-foreground">{formatDate(e.created_at)}</span>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">{e.message}</p>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                {e.category_slug && (
                  <span className="rounded bg-secondary px-2 py-0.5 text-muted-foreground">
                    {e.category_slug}
                  </span>
                )}
                <a
                  href={`mailto:${e.email}?subject=${encodeURIComponent(t("enquiries.replySubject"))}`}
                  className="font-medium text-primary hover:underline"
                >
                  {t("enquiries.reply")}
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
