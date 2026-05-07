import { FadeIn } from "../components/FadeIn";

export function FeaturedProjectSection() {
  return (
    <section className="border-t border-black/6 bg-[var(--background)] px-6 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="mb-3 font-[Inter] text-xs uppercase tracking-[0.32em] text-[var(--accent-deep)]">
            Featured project
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mt-4 flex h-[400px] items-center justify-center rounded-[2rem] border border-dashed border-black/10 bg-[var(--surface)]">
            <p className="font-[Inter] text-sm text-[var(--muted)]">New featured content coming soon.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
