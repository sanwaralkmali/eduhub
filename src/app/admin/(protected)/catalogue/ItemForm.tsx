"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { Button } from "@/components/ui/button";
import { createItem, updateItem } from "./actions";
import type { CatalogueItemInput } from "@/lib/catalogue/item-schema";

const FIELD =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-60";
const LABEL = "mb-1.5 block text-sm font-medium text-foreground";
const ERR = "mt-1 text-xs text-destructive";

export interface ItemFormDefaults {
  categoryId: string;
  slug: string;
  nameEn: string;
  nameAr: string;
  summaryEn: string;
  summaryAr: string;
  descriptionEn: string;
  descriptionAr: string;
  featuresEn: string;
  featuresAr: string;
  priceLabelEn: string;
  priceLabelAr: string;
  imageUrl: string;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
}

export function ItemForm({
  categories,
  defaults,
  mode,
  itemId,
  disabled = false,
}: {
  categories: { id: string; name: string }[];
  defaults: ItemFormDefaults;
  mode: "create" | "edit";
  itemId?: string;
  disabled?: boolean;
}) {
  const t = useTranslation("admin");
  const router = useRouter();
  const [v, setV] = useState<ItemFormDefaults>(defaults);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "saving" | "error">("idle");
  const [errorKey, setErrorKey] = useState<string | null>(null);

  function up<K extends keyof ItemFormDefaults>(key: K, value: ItemFormDefaults[K]) {
    setV((s) => ({ ...s, [key]: value }));
  }
  const lines = (s: string) =>
    s
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);
  const err = (key: string) => errors[key]?.[0];

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (disabled || status === "saving") return;
    setStatus("saving");
    setErrors({});
    setErrorKey(null);

    const input: CatalogueItemInput = {
      categoryId: v.categoryId,
      slug: v.slug.trim(),
      nameEn: v.nameEn,
      nameAr: v.nameAr,
      summaryEn: v.summaryEn,
      summaryAr: v.summaryAr,
      descriptionEn: v.descriptionEn,
      descriptionAr: v.descriptionAr,
      featuresEn: lines(v.featuresEn),
      featuresAr: lines(v.featuresAr),
      priceLabelEn: v.priceLabelEn,
      priceLabelAr: v.priceLabelAr,
      imageUrl: v.imageUrl,
      isFeatured: v.isFeatured,
      isActive: v.isActive,
      sortOrder: Number(v.sortOrder) || 0,
    };

    const res = mode === "create" ? await createItem(input) : await updateItem(itemId!, input);
    if (res.ok) {
      router.push("/admin/catalogue");
      router.refresh();
      return;
    }
    if (res.error === "validation" && res.fieldErrors) {
      setErrors(res.fieldErrors);
      setStatus("idle");
    } else {
      setErrorKey(res.error);
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {disabled && (
        <p className="rounded-md border border-accent/30 bg-accent/10 px-3 py-2 text-sm text-foreground">
          {t("catalogue.demoNotice")}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL} htmlFor="categoryId">
            {t("catalogue.fields.category")}
          </label>
          <select
            id="categoryId"
            value={v.categoryId}
            onChange={(e) => up("categoryId", e.target.value)}
            className={FIELD}
            disabled={disabled}
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          {err("categoryId") && <p className={ERR}>{t("catalogue.fields.required")}</p>}
        </div>
        <div>
          <label className={LABEL} htmlFor="slug">
            {t("catalogue.fields.slug")}
          </label>
          <input
            id="slug"
            value={v.slug}
            onChange={(e) => up("slug", e.target.value)}
            className={FIELD}
            dir="ltr"
            placeholder="science-fair"
            disabled={disabled}
          />
          {err("slug") && <p className={ERR}>{t("catalogue.fields.slugError")}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{t("catalogue.fields.nameEn")}</label>
          <input value={v.nameEn} onChange={(e) => up("nameEn", e.target.value)} className={FIELD} dir="ltr" disabled={disabled} />
          {err("nameEn") && <p className={ERR}>{t("catalogue.fields.required")}</p>}
        </div>
        <div>
          <label className={LABEL}>{t("catalogue.fields.nameAr")}</label>
          <input value={v.nameAr} onChange={(e) => up("nameAr", e.target.value)} className={FIELD} dir="rtl" disabled={disabled} />
          {err("nameAr") && <p className={ERR}>{t("catalogue.fields.required")}</p>}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{t("catalogue.fields.summaryEn")}</label>
          <input value={v.summaryEn} onChange={(e) => up("summaryEn", e.target.value)} className={FIELD} dir="ltr" disabled={disabled} />
        </div>
        <div>
          <label className={LABEL}>{t("catalogue.fields.summaryAr")}</label>
          <input value={v.summaryAr} onChange={(e) => up("summaryAr", e.target.value)} className={FIELD} dir="rtl" disabled={disabled} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{t("catalogue.fields.descriptionEn")}</label>
          <textarea rows={4} value={v.descriptionEn} onChange={(e) => up("descriptionEn", e.target.value)} className={FIELD} dir="ltr" disabled={disabled} />
        </div>
        <div>
          <label className={LABEL}>{t("catalogue.fields.descriptionAr")}</label>
          <textarea rows={4} value={v.descriptionAr} onChange={(e) => up("descriptionAr", e.target.value)} className={FIELD} dir="rtl" disabled={disabled} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{t("catalogue.fields.featuresEn")}</label>
          <textarea rows={4} value={v.featuresEn} onChange={(e) => up("featuresEn", e.target.value)} className={FIELD} dir="ltr" disabled={disabled} />
          <p className="mt-1 text-xs text-muted-foreground">{t("catalogue.fields.featuresHint")}</p>
        </div>
        <div>
          <label className={LABEL}>{t("catalogue.fields.featuresAr")}</label>
          <textarea rows={4} value={v.featuresAr} onChange={(e) => up("featuresAr", e.target.value)} className={FIELD} dir="rtl" disabled={disabled} />
          <p className="mt-1 text-xs text-muted-foreground">{t("catalogue.fields.featuresHint")}</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={LABEL}>{t("catalogue.fields.priceLabelEn")}</label>
          <input value={v.priceLabelEn} onChange={(e) => up("priceLabelEn", e.target.value)} className={FIELD} dir="ltr" disabled={disabled} />
        </div>
        <div>
          <label className={LABEL}>{t("catalogue.fields.priceLabelAr")}</label>
          <input value={v.priceLabelAr} onChange={(e) => up("priceLabelAr", e.target.value)} className={FIELD} dir="rtl" disabled={disabled} />
        </div>
      </div>

      <div>
        <label className={LABEL}>{t("catalogue.fields.imageUrl")}</label>
        <input value={v.imageUrl} onChange={(e) => up("imageUrl", e.target.value)} className={FIELD} dir="ltr" placeholder="https://…" disabled={disabled} />
        {err("imageUrl") && <p className={ERR}>{t("catalogue.fields.urlError")}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={v.isFeatured} onChange={(e) => up("isFeatured", e.target.checked)} disabled={disabled} />
          {t("catalogue.fields.featured")}
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={v.isActive} onChange={(e) => up("isActive", e.target.checked)} disabled={disabled} />
          {t("catalogue.fields.active")}
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          {t("catalogue.fields.sortOrder")}
          <input
            type="number"
            min={0}
            value={v.sortOrder}
            onChange={(e) => up("sortOrder", Number(e.target.value))}
            className="w-20 rounded-md border border-input bg-background px-2 py-1 text-sm disabled:opacity-60"
            disabled={disabled}
          />
        </label>
      </div>

      {status === "error" && (
        <p className="text-sm text-destructive">
          {errorKey === "duplicate_slug" ? t("catalogue.fields.slugTaken") : t("catalogue.saveError")}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={disabled || status === "saving"}>
          {status === "saving" ? t("catalogue.saving") : t("catalogue.save")}
        </Button>
        <button
          type="button"
          onClick={() => router.push("/admin/catalogue")}
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {t("catalogue.cancel")}
        </button>
      </div>
    </form>
  );
}
