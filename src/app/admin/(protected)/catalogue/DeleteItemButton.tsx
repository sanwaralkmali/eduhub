"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { deleteItem } from "./actions";

export function DeleteItemButton({ id, name }: { id: string; name: string }) {
  const t = useTranslation("admin");
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [failed, setFailed] = useState(false);

  function onDelete() {
    if (!window.confirm(t("catalogue.deleteConfirm", { name }))) return;
    setFailed(false);
    startTransition(async () => {
      const res = await deleteItem(id);
      if (res.ok) {
        router.refresh();
      } else {
        setFailed(true);
      }
    });
  }

  return (
    <button
      type="button"
      onClick={onDelete}
      disabled={pending}
      className="rounded-md border border-destructive/40 px-3 py-1.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
    >
      {failed ? t("catalogue.deleteFailed") : pending ? t("catalogue.deleting") : t("catalogue.delete")}
    </button>
  );
}
