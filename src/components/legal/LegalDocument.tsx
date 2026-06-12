type LegalSection = { heading: string; body: string[] };

// Presentational shell shared by the Privacy and Terms pages. Content is passed
// in from i18n by each page (Pattern 4 — no hardcoded copy).
export function LegalDocument({
  title,
  effective,
  intro,
  sections,
}: {
  title: string;
  effective: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-brand-slate">{effective}</p>
      <p className="mt-6 leading-relaxed text-foreground/90">{intro}</p>

      <div className="mt-10 space-y-8">
        {sections.map((section, i) => (
          <section key={i}>
            <h2 className="font-display text-xl font-semibold text-foreground">{section.heading}</h2>
            <div className="mt-3 space-y-3">
              {section.body.map((paragraph, j) => (
                <p key={j} className="leading-relaxed text-foreground/80">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
