export default function Loading() {
  return (
    <div>
      <div className="border-b border-border bg-secondary/40">
        <div className="mx-auto max-w-3xl px-4 pb-14 pt-16 text-center sm:px-6 sm:pb-20 sm:pt-24">
          <div className="mx-auto h-6 w-56 animate-pulse rounded-full bg-muted" />
          <div className="mx-auto mt-6 h-12 w-80 max-w-full animate-pulse rounded bg-muted" />
          <div className="mx-auto mt-5 h-4 w-96 max-w-full animate-pulse rounded bg-muted/70" />
          <div className="mx-auto mt-8 flex justify-center gap-3">
            <div className="h-12 w-40 animate-pulse rounded-md bg-muted" />
            <div className="h-12 w-40 animate-pulse rounded-md bg-muted/70" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-80 animate-pulse rounded-xl border bg-muted/40" />
          ))}
        </div>
      </div>
    </div>
  );
}
