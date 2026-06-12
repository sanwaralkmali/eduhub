import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((crumb, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
              {crumb.href && !isLast ? (
                <Link href={crumb.href} className="transition-colors hover:text-foreground">
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className={isLast ? "font-medium text-foreground" : undefined}
                  aria-current={isLast ? "page" : undefined}
                >
                  {crumb.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden className="text-muted-foreground/50">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
