"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { cn } from "@/lib/utils";

/**
 * Shop-style product gallery: a large main image plus a thumbnail strip you toggle
 * between. Keyboard-accessible (thumbnails are buttons), RTL-safe (logical flex),
 * and reuses the same framed look as the single-image view.
 */
export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const t = useTranslation("catalogue");
  const [active, setActive] = useState(0);
  const altFor = (i: number) => t("galleryImageAlt", { name, n: i + 1 });
  const current = images[active] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-secondary">
        <RibbonCorner />
        <Image
          src={current}
          alt={altFor(active)}
          fill
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <li key={src} className="shrink-0">
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active ? "true" : undefined}
                aria-label={altFor(i)}
                className={cn(
                  "relative block h-16 w-20 overflow-hidden rounded-lg border transition focus:outline-none focus:ring-2 focus:ring-ring",
                  i === active
                    ? "border-primary ring-2 ring-primary"
                    : "border-border opacity-70 hover:opacity-100",
                )}
              >
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
