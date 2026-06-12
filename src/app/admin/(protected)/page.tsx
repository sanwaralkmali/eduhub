import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAdminStats } from "@/lib/admin/data";

export default async function AdminDashboardPage() {
  const t = await getTranslations("admin");
  const stats = await getAdminStats();

  const cards = [
    { label: t("dashboard.newEnquiries"), value: stats.newEnquiries, accent: true },
    { label: t("dashboard.totalEnquiries"), value: stats.totalEnquiries, accent: false },
    { label: t("dashboard.catalogueItems"), value: stats.catalogueItems, accent: false },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground">{t("dashboard.title")}</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <p className="text-sm text-muted-foreground">{c.label}</p>
            <p
              className={`mt-2 font-display text-3xl font-bold ${c.accent ? "text-primary" : "text-foreground"}`}
            >
              {c.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/admin/enquiries" className="text-sm font-semibold text-primary hover:underline">
          {t("dashboard.viewEnquiries")} →
        </Link>
      </div>
    </div>
  );
}
