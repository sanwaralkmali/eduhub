import { cn } from "@/lib/utils";

/**
 * Edu-Hub signature element (CLAUDE.md §6.4): a diagonal ribbon / sash motif
 * in brand-accent, evoking graduation sashes and award ribbons.
 */

/** Folded accent sash tucked into the top-end corner of a card. */
export function RibbonCorner({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute end-0 top-0 h-14 w-14 overflow-hidden rounded-se-xl rtl:-scale-x-100",
        className,
      )}
    >
      <span className="absolute -end-3.5 top-2.5 block h-2.5 w-20 rotate-45 bg-accent shadow-sm" />
    </span>
  );
}

/** Thin brass accent rule used as a section / hero divider (institutional, no gradient). */
export function RibbonDivider({ className }: { className?: string }) {
  return <div aria-hidden className={cn("h-0.5 w-full bg-accent", className)} />;
}
