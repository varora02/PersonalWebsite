import { useEffect, useRef, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

// Words that cycle before settling on nothing
const CYCLING_WORDS = ["systems", "websites", "services", "apps"];

function CyclingWord({ onDone }: { onDone: () => void }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [done, setDone] = useState(false);
  const cycleRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let idx = 0;
    let count = 0;
    const intervalMs = 350;
    const totalCycles = CYCLING_WORDS.length * 2; // 2 full loops

    const tick = () => {
      setWordIndex(idx % CYCLING_WORDS.length);
      setVisible(true);
      idx++;
      count++;
      if (count < totalCycles) {
        cycleRef.current = setTimeout(tick, intervalMs);
      } else {
        // Hold last word, then fade out cleanly — no italics
        cycleRef.current = setTimeout(() => {
          setVisible(false);
          cycleRef.current = setTimeout(() => {
            setDone(true);
            onDoneRef.current();
          }, 420);
        }, 500);
      }
    };

    cycleRef.current = setTimeout(tick, 700);
    return () => { if (cycleRef.current) clearTimeout(cycleRef.current); };
  }, []);

  // When done, keep an invisible placeholder with the same minWidth so that
  // "I build" stays left-of-center and the parent's translateX can slide it
  // to the visual center precisely.
  if (done) return <span style={{ display: "inline-block", minWidth: "7ch" }} />;

  return (
    <span
      style={{
        display: "inline-block",
        minWidth: "7ch",
        textAlign: "left",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        color: "var(--accent-deep)",
      }}
    >
      {CYCLING_WORDS[wordIndex]}
    </span>
  );
}

const HOME_BG_VIDEO_URL = "/videos/home_bg.mp4";

type Project = {
  title: string;
  category: string;
  description: string;
  details: string[];
  status: "Building" | "Live" | "Exploring" | "Archived";
};

const projects: Project[] = [
  {
    title: "LifeOS",
    category: "Systems / Product",
    description:
      "A personal operating system for translating reflection, energy, and routines into cleaner execution.",
    details: ["Decision support", "Behavior systems", "React + automation"],
    status: "Building",
  },
  {
    title: "VirtualPet",
    category: "Game / Social",
    description:
      "A multiplayer Pomodoro app where your focus sessions keep a shared pet world alive. Study together, grow together.",
    details: ["Multiplayer", "Pomodoro sessions", "React + Canvas"],
    status: "Building",
  },
  {
    title: "Failure Harness",
    category: "AI Evaluation",
    description:
      "A local-first LLM evaluation harness for measuring JSON and schema reliability across prompts and model runs.",
    details: ["Schema validation", "Run reports", "Python + Ollama"],
    status: "Building",
  },
  {
    title: "PoseGuide",
    category: "iOS / Computer Vision",
    description:
      "An iPhone MVP for camera-based pose guidance with simulator-friendly capture flows and pose overlay validation.",
    details: ["SwiftUI", "Vision overlays", "Node backend"],
    status: "Exploring",
  },
];



const buildLog = [
  {
    date: "Apr 2026",
    entry: "Refining a personal operating system for better execution across work and recovery.",
  },
  {
    date: "Mar 2026",
    entry: "Building AI-assisted planning workflows — prompts, agents, and structured review loops.",
  },
  {
    date: "Feb 2026",
    entry: "Exploring motion-heavy interfaces for product storytelling and portfolio presentation.",
  },
  {
    date: "Jan 2026",
    entry: "Instrumenting daily data: Whoop, ActivityWatch, and location to close the feedback loop.",
  },
];

const experiments = [
  {
    title: "Agentic Knowledge bases",
    tag: "AI",
    description: "Teaching an agent to traverse my local obsidian vault and suggest connections.",
  },
  {
    title: "Focus-aware OS",
    tag: "Systems",
    description: "Minimalist desktop shell that only allows 2 apps at once during deep work sessions.",
  },
  {
    title: "Biometric storybeats",
    tag: "Design",
    description: "Modifying video timeline pacing based on viewer heart rate data in real-time.",
  },
];


const aboutCards = [
  {
    icon: "⬡",
    label: "What I build",
    text: "Systems, tools, and interfaces for deep work, sharper execution, and thoughtful workflows.",
  },
  {
    icon: "◌",
    label: "How I work",
    text: "I move between structure and exploration — outlining clearly, then iterating fast inside the frame.",
  },
  {
    icon: "⊞",
    label: "Stack I use",
    text: "React, TypeScript, Python, Vite. Automation with shell scripts and lightweight orchestration.",
  },
  {
    icon: "◎",
    label: "What I care about",
    text: "Clarity over cleverness. Products that earn attention. Systems that reduce friction, not add it.",
  },
];

const statusColors: Record<Project["status"], string> = {
  Building: "bg-[#e8f2ff] text-[#456b92]",
  Live: "bg-[#e6f7ee] text-[#2d7a52]",
  Exploring: "bg-[#f5f0ff] text-[#6b52a0]",
  Archived: "bg-[#f5f5f5] text-[#888]",
};

function useOnScreen(ref: React.RefObject<Element | null>, rootMargin = "0px") {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);
  return isVisible;
}

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useOnScreen(ref, "-60px");
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function GitHubCalendar() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/varora02")
      .then((res) => res.json())
      .then((res) => {
        const yearData = res.contributions.filter((d: any) => d.date.startsWith(String(currentYear)));

        const firstDate = new Date(`${currentYear}-01-01`);
        const paddingCount = firstDate.getDay();
        const paddedData = [
          ...Array(paddingCount).fill({ date: "pad", count: 0, level: -1 }),
          ...yearData
        ];

        setData(paddedData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch GitHub contributions:", err);
        setLoading(false);
      });
  }, [currentYear]);

  const getColor = (level: number) => {
    if (level === -1) return "transparent"; // Padding
    switch (level) {
      case 1: return "#9be9a8";
      case 2: return "#40c463";
      case 3: return "#30a14e";
      case 4: return "#216e39";
      default: return "#ebedf0";
    }
  };

  if (loading) {
    return (
      <div className="flex h-32 w-full animate-pulse items-center justify-center rounded-xl bg-[var(--surface-soft)]">
        <p className="font-[Inter] text-xs text-[var(--muted)]">Fetching contribution data...</p>
      </div>
    );
  }

  if (data.length === 0) return null;

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-black/6 bg-white p-6 shadow-[0_4px_24px_rgba(0,0,0,0.03)] md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-[Instrument_Serif] text-xl text-[#000]">GitHub Contributions {currentYear}</h3>
        <div className="flex items-center gap-1.5 font-[Inter] text-[10px] text-[var(--muted)]">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div key={l} className="h-2 w-2 rounded-sm" style={{ backgroundColor: getColor(l) }} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-[700px] flex-col">
          <div
            className="grid h-28 gap-[3px]"
            style={{
              gridTemplateRows: "repeat(7, 1fr)",
              gridAutoFlow: "column",
              gridAutoColumns: "minmax(10px, 1fr)"
            }}
          >
            {data.map((day, i) => (
              <div
                key={day.date === "pad" ? `pad-${i}` : day.date}
                className={`group relative h-2.5 w-2.5 rounded-[2px] ${day.level === -1 ? "" : "hover:ring-2 hover:ring-black/10 transition-all"}`}
                style={{ backgroundColor: getColor(day.level) }}
              >
                {/* Tooltip */}
                {day.level !== -1 && (
                  <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 scale-75 whitespace-nowrap rounded bg-black px-2.5 py-1.5 font-[Inter] text-[10px] text-white opacity-0 transition-all group-hover:scale-100 group-hover:opacity-100">
                    {day.count} contributions on {day.date}
                    <div className="absolute left-1/2 top-full -translate-x-1/2 border-[4px] border-transparent border-t-black" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between font-[Inter] text-[10px] text-[var(--muted)] uppercase tracking-wider">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
            <span>Oct</span>
            <span>Nov</span>
            <span>Dec</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  // Cycling word animation state
  const [wordDone, setWordDone] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    if (!wordDone) return;
    // Show arrow 1s after slide finishes (slide is 0.9s)
    const t1 = setTimeout(() => { setShowArrow(true); setArrowVisible(true); }, 1050);
    // Fade arrow out after 4.4s of visibility (increased by 2s)
    const t2 = setTimeout(() => setArrowVisible(false), 5500);
    // Remove from DOM after fade completes
    const t3 = setTimeout(() => setShowArrow(false), 6100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [wordDone]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    const fadeWindow = 0.5;

    const cancelScheduledWork = () => {
      if (frameRef.current !== null) { cancelAnimationFrame(frameRef.current); frameRef.current = null; }
      if (resetTimeoutRef.current !== null) { window.clearTimeout(resetTimeoutRef.current); resetTimeoutRef.current = null; }
    };

    const updateOpacity = () => {
      const { currentTime, duration } = video;
      if (!duration || Number.isNaN(duration)) {
        video.style.opacity = "0";
      } else if (currentTime < fadeWindow) {
        video.style.opacity = String(currentTime / fadeWindow);
      } else if (duration - currentTime < fadeWindow) {
        video.style.opacity = String(Math.max((duration - currentTime) / fadeWindow, 0));
      } else {
        video.style.opacity = "1";
      }
      frameRef.current = requestAnimationFrame(updateOpacity);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      resetTimeoutRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, 100);
    };

    const handleCanPlay = () => {
      cancelScheduledWork();
      video.style.opacity = "0";
      void video.play();
      frameRef.current = requestAnimationFrame(updateOpacity);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("ended", handleEnded);
    if (video.readyState >= 2) handleCanPlay();

    return () => {
      cancelScheduledWork();
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]">
        {/* Video backdrop */}
        <div className="absolute z-0 overflow-hidden" style={{ top: "120px", inset: "auto 0 0 0" }}>
          <video
            ref={videoRef}
            className="h-[calc(100vh-120px)] w-full object-cover object-top opacity-0 transition-opacity duration-300 scale-[1.1] origin-top"
            src={HOME_BG_VIDEO_URL}
            muted
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-transparent to-[var(--background)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(255,255,255,0.25)_24%,rgba(255,255,255,0.02)_46%,rgba(255,255,255,0.08)_70%,rgba(255,255,255,0.52)_100%)]" />
        </div>

        {/* Nav */}
        <div className="relative z-10 mx-auto max-w-7xl px-8 py-6">
          <nav className="flex items-center justify-between">
            <a href="#home" className="brand-logo font-[Instrument_Serif] text-4xl tracking-tight md:text-5xl">
              Varun Arora
            </a>
            <div className="hidden items-center gap-7 font-[Inter] text-sm font-medium md:flex">
              <a href="#home" className="text-[#111] transition-colors hover:text-[var(--accent-deep)]">Home</a>
              <a href="#projects" className="text-[#444] transition-colors hover:text-[var(--accent-deep)]">Projects</a>
              <a href="#about" className="text-[#444] transition-colors hover:text-[var(--accent-deep)]">About</a>
              <Link
                to="/cat"
                className="text-[#444] transition-colors hover:text-[var(--accent-deep)]"
              >
                Cat
              </Link>
            </div>
          </nav>
        </div>

        {/* Hero copy */}
        <div className="relative z-10 flex flex-col items-center justify-center px-6 pb-40 pt-[calc(8rem-75px)] text-center">
          <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col items-center justify-center">
            {/*
              Separate the entrance fade (wrapper) from the horizontal slide (h1).
              The animate-fade-rise class uses transform: translateY which conflicts
              with our translateX inline style — so we split them across two elements.
            */}
            <div className="animate-fade-rise">
              <h1
                className="font-[Instrument_Serif] text-5xl leading-[0.95] font-normal tracking-[-2.46px] text-[#000000] sm:text-7xl md:text-8xl"
                style={{
                  // "I build [word]" starts centered.
                  // The word slot is minWidth:7ch + 1 space (~0.3em).
                  // Shift right by half that amount so "I build" lands centered.
                  transform: wordDone ? "translateX(calc((7ch + 0.3em) / 2))" : "translateX(0)",
                  transition: wordDone
                    ? "transform 1.1s cubic-bezier(0.16, 1, 0.3, 1)"
                    : "none",
                  willChange: "transform",
                }}
              >
                I build{" "}<CyclingWord onDone={() => setWordDone(true)} />
              </h1>
            </div>

            <p className="animate-fade-rise-delay mx-auto mt-8 max-w-2xl font-[Inter] text-base leading-relaxed text-[var(--muted)] sm:text-lg">
              Helllloooo :) Trying to be ambitious. Learning to ship fast.
            </p>

            {/* Arrow callout — pops in briefly pointing to the CTA */}
            <div
              className="mt-8 flex flex-col items-center gap-1.5"
              style={{
                opacity: showArrow ? (arrowVisible ? 1 : 0) : 0,
                transform: showArrow ? (arrowVisible ? "translateY(0) scale(1)" : "translateY(-10px) scale(0.9)") : "translateY(-10px) scale(0.9)",
                transition: "opacity 0.45s ease, transform 0.45s ease",
                pointerEvents: "none",
                minHeight: showArrow ? undefined : "0px",
              }}
              aria-hidden="true"
            >
              <span className="font-[Inter] text-xs tracking-[0.18em] uppercase text-[var(--accent-deep)]">Click here</span>
              <span
                className="text-[var(--accent-deep)] text-2xl"
                style={{ animation: arrowVisible ? "arrowBounce 0.7s ease-in-out infinite alternate" : "none" }}
              >
                ↓
              </span>
            </div>

            <div className="animate-fade-rise-delay-2 mt-4 flex items-center gap-4">
              <a
                href="#projects"
                className="inline-flex rounded-full bg-[var(--accent-deep)] px-10 py-4 font-[Inter] text-sm text-white transition-transform duration-200 hover:scale-[1.03] hover:bg-[var(--accent)]"
              >
                Explore Projects
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* ─── FEATURED PROJECT ─────────────────────────────────── */}
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

      {/* ─── PROJECTS GALLERY (featured-style alternating) ─────── */}
      <section id="projects" className="border-t border-black/6 bg-[var(--surface)] px-6 py-20 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* GitHub 2026 Heatmap moved from About */}
          <FadeIn delay={0.1}>
            <div className="mb-20">
              <GitHubCalendar />
            </div>
          </FadeIn>

          <FadeIn>
            <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-[Inter] text-xs uppercase tracking-[0.32em] text-[var(--accent-deep)]">
                  Selected projects
                </p>
                <h2 className="mt-3 font-[Instrument_Serif] text-4xl leading-[1] text-[#000000] sm:text-5xl">
                  Always making updates
                </h2>
              </div>
            </div>
          </FadeIn>

          <div className="flex flex-col gap-6">
            {projects.map((project, index) => {
              // Even index: sample LEFT, details RIGHT
              // Odd index:  details LEFT, sample RIGHT
              const sampleLeft = index % 2 === 0;

              const DetailsPanel = () => (
                <div className="flex flex-col justify-between px-9 py-11 lg:px-12 lg:py-14">
                  <div>
                    <div className="mt-2 flex items-center gap-4">
                      <h3 className="font-[Instrument_Serif] text-5xl leading-[0.97] text-[#000] sm:text-6xl">
                        {project.title}
                      </h3>
                      <a
                        href="https://github.com/varora02"
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1 text-black/30 transition-colors hover:text-[var(--accent-deep)]"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                        </svg>
                      </a>
                    </div>
                    <p className="mt-5 max-w-md font-[Inter] text-base leading-7 text-[var(--muted)]">
                      {project.description}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-2">
                      {project.details.map((t) => (
                        <span key={t} className="rounded-full bg-[var(--surface-soft)] px-3 py-1.5 font-[Inter] text-xs text-[var(--accent-deep)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );

              const SamplePanel = () => (
                <div className={`flex items-center justify-center bg-[var(--surface)] p-1 ${sampleLeft ? "lg:rounded-l-[2rem]" : "lg:rounded-r-[2rem]"
                  }`}>
                  <div className="w-full max-w-sm space-y-3">
                    {project.title === "LifeOS" && (
                      <>
                        {[
                          { label: "Recovery score", value: "84%", bar: 84 },
                          { label: "Productive hours", value: "6.2 h", bar: 62 },
                          { label: "Deep work streak", value: "4 days", bar: 70 },
                        ].map((row) => (
                          <div key={row.label} className="rounded-xl border border-black/6 bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                            <div className="flex items-center justify-between font-[Inter] text-xs text-[var(--muted)]">
                              <span>{row.label}</span>
                              <span className="font-medium text-[#000]">{row.value}</span>
                            </div>
                            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-soft)]">
                              <div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${row.bar}%` }} />
                            </div>
                          </div>
                        ))}
                        <p className="pt-1 text-center font-[Inter] text-[10px] text-[var(--muted)]">LifeOS · weekly snapshot</p>
                      </>
                    )}

                    {project.title === "VirtualPet" && (
                      <div className="overflow-hidden rounded-2xl border border-black/5 shadow-2xl transition-transform hover:scale-[1.02]">
                        <img src="/projects/virtualpet/virtualpet.png" className="w-full h-auto object-cover" alt="VirtualPet" />
                      </div>
                    )}

                    {project.title === "Failure Harness" && (
                      <>
                        <p className="mb-3 font-[Inter] text-[10px] uppercase tracking-widest text-[var(--muted)]">Schema reliability run</p>
                        {[
                          { tag: "JSON parse", prompt: "94% pass rate across local model responses." },
                          { tag: "Schema valid", prompt: "Required fields, enums, and types checked per case." },
                          { tag: "Report", prompt: "Markdown summaries capture failure categories and run metadata." },
                        ].map((item) => (
                          <div key={item.tag} className="rounded-xl border border-black/6 bg-white px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
                            <span className="rounded-full bg-[#e8f2ff] px-2.5 py-0.5 font-[Inter] text-[10px] text-[var(--accent-deep)]">{item.tag}</span>
                            <p className="mt-2 font-[Inter] text-xs leading-5 text-[var(--muted)] line-clamp-2">{item.prompt}</p>
                          </div>
                        ))}
                        <p className="pt-1 text-center font-[Inter] text-[10px] text-[var(--muted)]">Failure Harness · local eval report</p>
                      </>
                    )}

                    {project.title === "PoseGuide" && (
                      <>
                        <p className="mb-3 font-[Inter] text-[10px] uppercase tracking-widest text-[var(--muted)]">Pose overlay preview</p>
                        <div className="mx-auto max-w-[220px] rounded-[2rem] border border-black/10 bg-[#111] p-3 shadow-2xl">
                          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-gradient-to-b from-[#e9f3ff] to-[#f7eee6]">
                            <div className="absolute left-1/2 top-4 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/20" />
                            <div className="absolute left-1/2 top-[25%] h-10 w-10 -translate-x-1/2 rounded-full border-2 border-[var(--accent-deep)] bg-white/70" />
                            <div className="absolute left-1/2 top-[37%] h-24 w-16 -translate-x-1/2 rounded-[2rem] border-2 border-[var(--accent-deep)] bg-white/40" />
                            <div className="absolute left-[21%] top-[38%] h-1.5 w-24 rotate-[22deg] rounded-full bg-[var(--accent)]" />
                            <div className="absolute right-[21%] top-[38%] h-1.5 w-24 rotate-[-22deg] rounded-full bg-[var(--accent)]" />
                            <div className="absolute bottom-[23%] left-[34%] h-24 w-1.5 rotate-[13deg] rounded-full bg-[var(--accent)]" />
                            <div className="absolute bottom-[23%] right-[34%] h-24 w-1.5 rotate-[-13deg] rounded-full bg-[var(--accent)]" />
                            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 font-[Inter] text-[10px] text-[var(--accent-deep)]">
                              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                              Alignment detected
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <div className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                          <span className="font-[Inter] text-xs text-[var(--muted)]">Simulator capture flow active</span>
                        </div>
                        <p className="text-center font-[Inter] text-[10px] text-[var(--muted)]">PoseGuide · guidance overlay</p>
                      </>
                    )}
                  </div>
                </div>
              );

              return (
                <FadeIn key={project.title} delay={0.05}>
                  <div className="overflow-hidden rounded-[2rem] border border-black/6 bg-white shadow-[0_24px_80px_rgba(0,0,0,0.06)]">
                    <div className="grid lg:grid-cols-2">
                      {sampleLeft ? (
                        <>
                          <SamplePanel />
                          <DetailsPanel />
                        </>
                      ) : (
                        <>
                          <DetailsPanel />
                          <SamplePanel />
                        </>
                      )}
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>

          <FadeIn delay={0.1}>
            <div className="mt-16 text-center">
              <p className="font-[Inter] text-sm text-[var(--muted)]">
                More experiments, prototypes, and utilities live on{" "}
                <a
                  href="https://github.com/varora02"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--accent-deep)] underline-offset-4 hover:underline"
                >
                  GitHub
                </a>
                .
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── EXPERIMENTS ─────────────────────────────────────── */}
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
            {/* Experiment 1 — LifeOS Metrics (links to dedicated page) */}
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

            {/* Experiment 2 */}
            <FadeIn delay={0.1}>
              <div className="flex h-full min-h-[200px] items-center justify-center rounded-2xl border border-dashed border-black/10 bg-[var(--surface)] p-7">
                <p className="font-[Inter] text-xs text-[var(--muted)] italic">Coming soon</p>
              </div>
            </FadeIn>

            {/* Experiment 3 */}
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

      {/* ─── ABOUT ──────────────────────────────────────────── */}
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

          {/* GitHub 2026 Heatmap moved to Projects above */}

          {/* About Placeholder / Cards */}
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

      {/* ─── FOOTER ───────────────────────────────────────────── */}
      <footer className="border-t border-black/6 bg-[var(--background)] px-6 py-14 md:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <a href="#home" className="brand-logo font-[Instrument_Serif] text-3xl tracking-tight">
                Varun Arora
              </a>
            </div>

            <div className="flex items-center gap-6 font-[Inter] text-sm text-[var(--muted)]">
              <a
                href="https://github.com/varora02"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--accent-deep)]"
              >
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/varora02/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[var(--accent-deep)]"
              >
                LinkedIn
              </a>
              <a
                href="mailto:varorav99@gmail.com"
                className="transition-colors hover:text-[var(--accent-deep)]"
              >
                Email
              </a>
            </div>
          </div>
          <div className="mt-10 border-t border-black/5 pt-6">
            <p className="font-[Inter] text-xs text-[var(--muted)]">
              © {new Date().getFullYear()} Varun Arora
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── CAT PAGE ─────────────────────────────────────────────────────────────────

const MANGO_FACTS = [
  "Mango sleeps 12–16 hours a day. The original sleepmaxxer.",
  "A group of cats is called a clowder. Very official.",
  "Mango has a unique nose print — like a fingerprint, but sharper.",
  "Purring can heal bones. Science agrees: Mango is magical.",
  "Mango always lands on his feet thanks to a righting reflex. Built-in error handling.",
];

function CatPage() {
  const navigate = useNavigate();
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  const cycleFact = () => {
    setFactVisible(false);
    setTimeout(() => {
      setFactIndex((i) => (i + 1) % MANGO_FACTS.length);
      setFactVisible(true);
    }, 300);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #fff9f0 0%, #fff2e0 40%, #ffead0 100%)" }}
    >
      {/* Nav */}
      <div className="mx-auto max-w-6xl px-8 py-6">
        <nav className="flex items-center justify-between">
          <Link
            to="/"
            className="font-[Instrument_Serif] text-4xl tracking-tight text-[#e67e22] transition-opacity hover:opacity-70 md:text-5xl"
          >
            Varun Arora
          </Link>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full border border-[#f39c12]/30 bg-white px-5 py-2 font-[Inter] text-sm text-[#e67e22] shadow-sm transition-all hover:scale-105 hover:shadow"
          >
            Back
          </button>
        </nav>
      </div>

      {/* Hero */}
      <div className="mx-auto max-w-6xl px-8 pb-12 pt-16 text-center">
        <h1
          className="font-[Instrument_Serif] text-6xl leading-none text-[#2a1520] sm:text-7xl md:text-8xl"
          style={{ letterSpacing: "-2px" }}
        >
          Meet <span className="bg-gradient-to-r from-[#ff8c00] via-[#ffae00] to-[#ffd700] bg-clip-text text-transparent">Mango</span>
        </h1>
      </div>

      {/* Cat Fact Card */}
      <div className="mx-auto mb-10 max-w-2xl px-8">
        <div
          className="relative cursor-pointer overflow-hidden rounded-3xl border border-[#f39c12]/20 bg-white p-8 shadow-[0_8px_40px_rgba(230,126,34,0.08)] transition-all duration-200 hover:scale-[1.01] hover:shadow-[0_12px_50px_rgba(230,126,34,0.14)]"
          onClick={cycleFact}
          role="button"
          aria-label="Next Mango fact"
        >
          <div className="mb-4 flex items-center gap-2">
            <p className="font-[Inter] text-xs uppercase tracking-[0.28em] text-[#e67e22]">
              Cat facts · click for next
            </p>
          </div>
          <p
            className="font-[Instrument_Serif] text-2xl leading-snug text-[#2a1520]"
            style={{
              opacity: factVisible ? 1 : 0,
              transform: factVisible ? "translateY(0)" : "translateY(8px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            {MANGO_FACTS[factIndex]}
          </p>
          <div className="mt-5 flex gap-1.5">
            {MANGO_FACTS.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-300"
                style={{
                  width: i === factIndex ? "24px" : "8px",
                  backgroundColor: i === factIndex ? "#e67e22" : "#ffe0b2",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="mx-auto max-w-6xl px-8 pb-0">
        <div className="mb-12">
          <p className="mb-1 font-[Inter] text-xs uppercase tracking-[0.32em] text-[#e67e22]">
            Photo album
          </p>
          <h2 className="font-[Instrument_Serif] text-4xl text-[#2a1520]">
            The Mango Gallery
          </h2>
        </div>

        {/* Floating collage gallery with real photos — spread across 3-4 columns */}
        <div className="relative mx-auto h-[1050px] w-full max-w-7xl overflow-visible">
          {[
            "IMG_0359.jpeg",
            "IMG_2042.jpeg",
            "IMG_2396.jpeg",
            "IMG_2973.jpeg",
            "IMG_3389.jpeg",
            "IMG_3990.jpeg",
            "123_1.jpeg",
            "6373922d-8d75-4d10-8a26-9061f17663bf.jpg"
          ].map((filename, i) => {
            const configs = [
              // Col 1
              { top: "0%", left: "0%", rotate: "-5deg", scale: 1.0, duration: "8s", delay: "0s" },
              // Col 2
              { top: "5%", left: "35%", rotate: "4deg", scale: 0.95, duration: "10s", delay: "-2s" },
              // Col 3
              { top: "0%", left: "70%", rotate: "-3deg", scale: 1.05, duration: "12s", delay: "-4s" },
              
              // Col 1.5
              { top: "25%", left: "15%", rotate: "6deg", scale: 1.1, duration: "9s", delay: "-1s" },
              // Col 2.5
              { top: "30%", left: "55%", rotate: "-4deg", scale: 0.9, duration: "11s", delay: "-5s" },
              
              // Col 1
              { top: "55%", left: "5%", rotate: "8deg", scale: 1.15, duration: "13s", delay: "-3s" },
              // Col 2
              { top: "60%", left: "40%", rotate: "-6deg", scale: 0.95, duration: "14s", delay: "-6s" },
              // Col 3
              { top: "55%", left: "75%", rotate: "3deg", scale: 1.0, duration: "10s", delay: "-7s" },
            ];
            const cfg = configs[i % configs.length];

            return (
              <div
                key={i}
                className="group absolute overflow-hidden rounded-2xl border border-[#f39c12]/10 bg-white shadow-xl transition-transform duration-500 hover:z-50 hover:scale-110 hover:rotate-0"
                style={{
                  top: cfg.top,
                  left: cfg.left,
                  width: "350px", // Increased size
                  height: "350px",
                  transform: `rotate(${cfg.rotate}) scale(${cfg.scale})`,
                  "--orig-rotate": cfg.rotate,
                  animation: `drift ${cfg.duration} ease-in-out infinite alternate`,
                  animationDelay: cfg.delay,
                } as React.CSSProperties}
              >
                <img
                  src={`/mango/${filename}`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={`Mango photo ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-[#f39c12]/20 bg-white/60 px-8 py-8 text-center" id="mango-footer">
        <p className="font-[Inter] text-xs text-[#d35400]/60">
          Made with love for Mango ·{" "}
          <Link to="/" className="underline underline-offset-4 hover:text-[#e67e22]">
            Back to main site
          </Link>
        </p>
      </footer>
    </div>
  );
}

// ─── APP ROUTER ───────────────────────────────────────────────────────────────

function HomePage() {
  return <App />;
}

// ─── LIFEOS METRICS EXPERIMENT PAGE ────────────────────────────────────────────

function LifeOSMetricsPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--background)] text-[var(--foreground)]">
      {/* Nav */}
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

      {/* Article */}
      <article className="mx-auto max-w-4xl px-8 pb-24 pt-8">


        <h1 className="font-[Instrument_Serif] text-5xl leading-[1.05] text-[#000] sm:text-6xl">
          Instrumenting my life
        </h1>
        <p className="mt-4 max-w-2xl font-[Inter] text-lg leading-8 text-[var(--muted)]">
          How I'm using LifeOS to track location, screentime, and biometrics — then turning that data into a weekly timeline to make better decisions.
        </p>

        <div className="mt-12 h-px w-full bg-black/6" />

        {/* Body */}
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
              {[
                {
                  insight: "Office days = 2.3x more productive hours",
                  detail: "WFH felt productive, but the numbers consistently showed more deep work at the office. Changed my default to 4 office days.",
                },
                {
                  insight: "Recovery score < 33% = useless day",
                  detail: "On low-recovery days, my productive screen time dropped by 40%. Now I plan lighter work on red recovery days instead of fighting it.",
                },
                {
                  insight: "Morning gym sessions don't hurt output",
                  detail: "I assumed morning workouts would cut into my best coding hours. Data showed no difference. The 6am sessions actually correlated with longer focus streaks.",
                },
                {
                  insight: "Weekend coding is mostly shallow",
                  detail: "I was counting weekend hours as productive, but ActivityWatch showed it was mostly config tweaking and browsing docs. Real building happens Mon–Fri.",
                },
              ].map((item) => (
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
              {["Python", "Whoop API", "ActivityWatch", "launchd", "Cloudflare Pages", "Zero Trust", "React"].map((t) => (
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

      {/* Footer */}
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

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cat" element={<CatPage />} />
      <Route path="/experiments/lifeos-metrics" element={<LifeOSMetricsPage />} />
    </Routes>
  );
}
