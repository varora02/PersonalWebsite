import { Link, useNavigate } from "react-router-dom";
import { lifeosInsights, lifeosStack } from "../data/lifeosArticle";

export function LifeOSMetricsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-4xl px-8 py-6">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="brand-logo font-[Instrument_Serif] text-4xl tracking-tight md:text-5xl"
          >
            Varun Arora
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-5 py-2 font-[Inter] text-sm text-[var(--muted)] shadow-sm transition-all hover:scale-105 hover:shadow"
          >
            ← Back
          </button>
        </nav>
      </div>

      <article className="mx-auto max-w-4xl px-8 pb-24 pt-8">
        <h1 className="font-[Instrument_Serif] text-5xl leading-[1.05] text-[#000] sm:text-6xl">
          Instrumenting my life
        </h1>
        <p className="mt-4 max-w-2xl font-[Inter] text-lg leading-8 text-[var(--muted)]">
          How I'm using LifeOS to track location, screentime, and biometrics — then turning that data into a weekly timeline to make better decisions.
        </p>

        <div className="mt-12 h-px w-full bg-black/6" />

        <div className="mt-12 space-y-10 font-[Inter] text-base leading-8 text-[#333]">
          <section>
            <h2 className="font-[Instrument_Serif] text-3xl text-[#000]">The premise</h2>
            <p className="mt-4">
              Most people have no idea where their time actually goes. I didn't either. I knew vaguely that I was "busy" but couldn't tell you how many hours I spent in deep work vs. shallow scrolling on any given day.
            </p>
            <p className="mt-4">
              So I built a system to find out. LifeOS pulls data from three sources — <strong>Whoop</strong> (recovery, strain, sleep), <strong>ActivityWatch</strong> (screen time, app usage on my Mac), and <strong>location data</strong> (office, home, gym) — and stitches them into a single timeline view of my week.
            </p>
          </section>

          <section>
            <h2 className="font-[Instrument_Serif] text-3xl text-[#000]">The weekly timeline</h2>
            <p className="mt-4">
              The core output is a 7-day calendar-style timeline. Each day shows:
            </p>
            <ul className="mt-4 ml-6 list-disc space-y-2 text-[var(--muted)]">
              <li><strong>Where I was</strong> — office, WFH, gym, out. Color-coded blocks across the day.</li>
              <li><strong>What I was doing on screen</strong> — productive hours (VS Code, terminal, Figma) vs. unproductive (social media, YouTube). Broken down by app.</li>
              <li><strong>How my body was doing</strong> — Whoop recovery score, sleep performance, strain. Was I running on fumes or actually recovered?</li>
              <li><strong>Workouts</strong> — type, duration, and strain. Categorized into strength, cardio, and recovery.</li>
            </ul>
            <p className="mt-4">
              The whole thing renders as a single, self-contained HTML file — no server, no CORS issues, all data baked in. I can open it on any device and see exactly how my week played out.
            </p>
          </section>

          <section>
            <h2 className="font-[Instrument_Serif] text-3xl text-[#000]">Data-oriented decisions</h2>
            <p className="mt-4">
              The point isn't to track for the sake of tracking. It's to close the feedback loop between how I <em>feel</em> about my week and what <em>actually</em> happened.
            </p>
            <p className="mt-4">
              Some things I've learned from looking at a few months of data:
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {lifeosInsights.map((item) => (
                <div key={item.insight} className="rounded-xl border border-black/6 bg-[var(--surface)] p-5">
                  <p className="font-medium text-[#000] text-sm">{item.insight}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[Instrument_Serif] text-3xl text-[#000]">The stack</h2>
            <p className="mt-4">
              The pipeline runs locally on my Mac via <code className="rounded bg-[var(--surface)] px-1.5 py-0.5 text-sm">launchd</code> — a Python script pulls from each API, processes the data, generates the dashboard HTML, and deploys to Cloudflare Pages behind Zero Trust auth.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {lifeosStack.map((t) => (
                <span key={t} className="rounded-full bg-[var(--surface-soft)] px-3 py-1.5 text-xs text-[var(--accent-deep)]">
                  {t}
                </span>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-[Instrument_Serif] text-3xl text-[#000]">What's next</h2>
            <p className="mt-4">
              I'm currently experimenting with correlation analysis — specifically testing whether Whoop recovery scores can reliably predict my productive output for the day. If the signal is strong enough, the system could suggest what kind of work to prioritize each morning before I even open my laptop.
            </p>
          </section>
        </div>
      </article>

      <footer className="border-t border-black/6 bg-[var(--background)] px-8 py-10 text-center">
        <p className="font-[Inter] text-xs text-[var(--muted)]">
          <Link to="/" className="text-[var(--accent-deep)] underline-offset-4 hover:underline">
            ← Back to main site
          </Link>
        </p>
      </footer>
    </div>
  );
}
