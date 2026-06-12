export default function Loading() {
  return (
    <div>
      <div className="h-7 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-24 animate-pulse rounded-xl border bg-muted/40" />
        ))}
      </div>
    </div>
  );
}
