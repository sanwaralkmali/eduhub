"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n/useTranslation";
import { RibbonCorner } from "@/components/ui/Ribbon";
import { cn } from "@/lib/utils";

/**
 * Shop-style product gallery. On mobile it's a swipeable, scroll-snapping carousel
 * with dot indicators (native-app feel); on md+ a thumbnail strip jumps to any
 * image. Both stay in sync with the scroll position. Keyboard-accessible + RTL-safe.
 */
export function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const t = useTranslation("catalogue");
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const altFor = (i: number) => t("galleryImageAlt", { name, n: i + 1 });
  const multiple = images.length > 1;

  function goTo(i: number) {
    const child = trackRef.current?.children[i] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    setActive(i);
  }

  function onScroll() {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const i = Math.round(Math.abs(track.scrollLeft) / track.clientWidth);
    setActive(Math.min(images.length - 1, Math.max(0, i)));
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-2xl border bg-secondary">
        <div
          ref={trackRef}
          onScroll={multiple ? onScroll : undefined}
          className="flex snap-x snap-mandatory overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] w-full shrink-0 snap-center">
              <Image
                src={src}
                alt={altFor(i)}
                fill
                priority={i === 0}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        <RibbonCorner />
      </div>

      {multiple && (
        <>
          {/* Mobile: swipe the carousel; dots show position and jump on tap. */}
          <div className="mt-3 flex justify-center gap-1.5 md:hidden">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-current={i === active ? "true" : undefined}
                aria-label={altFor(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  i === active ? "w-5 bg-primary" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>

          {/* md+: thumbnail strip. */}
          <ul className="mt-3 hidden gap-2 overflow-x-auto pb-1 md:flex">
            {images.map((src, i) => (
              <li key={src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => goTo(i)}
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
        </>
      )}
    </div>
  );
}
