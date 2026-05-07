import { Link } from "react-router-dom";
import { FadeIn } from "../components/FadeIn";

export function ExperimentsSection() {
  return (
    <section id="experiments" className="border-t border-black/6 bg-[var(--surface)] px-6 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="mb-14">
            <p className="mb-3 font-[Inter] text-xs uppercase tracking-[0.32em] text-[var(--accent-deep)]">
              Experiments
            </p>
            <h2 className="font-[Instrument_Serif] text-4xl leading-[1] text-[#000] sm:text-5xl">
              What I'm trying.
            </h2>
          </div>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-3">
          <FadeIn delay={0}>
            <Link
              to="/experiments/lifeos-metrics"
              className="group flex flex-col justify-between rounded-2xl border border-black/6 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:scale-[1.01]"
            >
              <div>
                <span className="rounded-full bg-[#e8f2ff] px-2.5 py-0.5 font-[Inter] text-[10px] text-[var(--accent-deep)]">Data</span>
                <h3 className="mt-4 font-[Instrument_Serif] text-2xl text-[#000]">Instrumenting my life</h3>
                <p className="mt-3 font-[Inter] text-sm leading-6 text-[var(--muted)]">
                  Using Whoop, ActivityWatch, and location data to build a weekly timeline of how I actually spend my time — then making decisions from it.
                </p>
              </div>
              <span className="mt-5 inline-flex items-center gap-1.5 font-[Inter] text-xs text-[var(--accent-deep)] group-hover:gap-2.5 transition-all">
                Read more <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </span>
            </Link>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-black/10 bg-[var(--surface)] p-7">
              <p className="font-[Inter] text-xs text-[var(--muted)] italic">Coming soon</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="flex flex-col justify-between rounded-2xl border border-black/6 bg-white p-7 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
              <div>
                <span className="rounded-full bg-[#e6f7ee] px-2.5 py-0.5 font-[Inter] text-[10px] text-[#2d7a52]">Systems</span>
                <h3 className="mt-4 font-[Instrument_Serif] text-2xl text-[#000]">Reddit idea mining</h3>
                <p className="mt-3 font-[Inter] text-sm leading-6 text-[var(--muted)]">
                  Scraping 30+ startup and product subreddits to find recurring pain points — automated pipeline that surfaces ideas worth building.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
