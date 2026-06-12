export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-9 w-64 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted/70" />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-56 animate-pulse rounded-xl border bg-muted/40" />
        ))}
      </div>
    </div>
  );
}
