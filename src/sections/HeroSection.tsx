import { useEffect, useRef, useState } from "react";
import { publicAsset } from "../lib/assets";
import { SiteNav } from "../components/SiteNav";

const CYCLING_WORDS = ["systems", "websites", "services", "apps"];
const HOME_BG_VIDEO_URL = publicAsset("videos/home_bg.mp4");

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
    const totalCycles = CYCLING_WORDS.length * 2;

    const tick = () => {
      setWordIndex(idx % CYCLING_WORDS.length);
      setVisible(true);
      idx++;
      count++;
      if (count < totalCycles) {
        cycleRef.current = setTimeout(tick, intervalMs);
      } else {
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

  // Preserve the word slot so the final "I build" slide stays centered.
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

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  const [wordDone, setWordDone] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);

  useEffect(() => {
    if (!wordDone) return;
    const t1 = setTimeout(() => { setShowArrow(true); setArrowVisible(true); }, 1050);
    const t2 = setTimeout(() => setArrowVisible(false), 5500);
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
    <section id="home" className="relative min-h-screen w-full overflow-hidden bg-[var(--background)]">
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

      <SiteNav />

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
  );
}
