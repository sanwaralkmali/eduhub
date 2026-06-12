export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-4 w-56 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-9 w-72 max-w-full animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-96 max-w-full animate-pulse rounded bg-muted/70" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-xl border">
            <div className="aspect-[16/10] animate-pulse bg-muted" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted/70" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
