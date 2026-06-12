export default function Loading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="h-4 w-40 animate-pulse rounded bg-muted" />
      <div className="mt-6 h-9 w-56 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-4 w-80 max-w-full animate-pulse rounded bg-muted/70" />
      <div className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-md bg-muted/50" />
          ))}
        </div>
        <div className="h-32 animate-pulse rounded-md bg-muted/50" />
        <div className="h-12 w-40 animate-pulse rounded-md bg-muted" />
      </div>
    </div>
  );
}
