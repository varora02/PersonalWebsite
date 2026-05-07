import { FadeIn } from "../components/FadeIn";

export function AboutSection() {
  return (
    <section id="about" className="border-t border-black/6 bg-[var(--background)] px-6 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-14">
            <p className="mb-3 font-[Inter] text-xs uppercase tracking-[0.32em] text-[var(--accent-deep)]">
              About
            </p>
            <h2 className="font-[Instrument_Serif] text-4xl leading-[1] text-[#000] sm:text-5xl">
              Who I am.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((_, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex h-48 items-center justify-center rounded-2xl border border-dashed border-black/10 bg-[var(--surface)]">
                <p className="font-[Inter] text-xs text-[var(--muted)] italic">About details coming soon</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
