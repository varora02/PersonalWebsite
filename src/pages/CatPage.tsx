import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { mangoFacts, mangoGalleryConfigs, mangoImages } from "../data/mango";
import { publicAsset } from "../lib/assets";

export function CatPage() {
  const navigate = useNavigate();
  const [factIndex, setFactIndex] = useState(0);
  const [factVisible, setFactVisible] = useState(true);

  const cycleFact = () => {
    setFactVisible(false);
    setTimeout(() => {
      setFactIndex((i) => (i + 1) % mangoFacts.length);
      setFactVisible(true);
    }, 300);
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #fff9f0 0%, #fff2e0 40%, #ffead0 100%)" }}
    >
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

      <div className="mx-auto max-w-6xl px-8 pb-12 pt-16 text-center">
        <h1
          className="font-[Instrument_Serif] text-6xl leading-none text-[#2a1520] sm:text-7xl md:text-8xl"
          style={{ letterSpacing: "-2px" }}
        >
          Meet <span className="bg-gradient-to-r from-[#ff8c00] via-[#ffae00] to-[#ffd700] bg-clip-text text-transparent">Mango</span>
        </h1>
      </div>

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
            {mangoFacts[factIndex]}
          </p>
          <div className="mt-5 flex gap-1.5">
            {mangoFacts.map((_, i) => (
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

      <div className="mx-auto max-w-6xl px-8 pb-0">
        <div className="mb-12">
          <p className="mb-1 font-[Inter] text-xs uppercase tracking-[0.32em] text-[#e67e22]">
            Photo album
          </p>
          <h2 className="font-[Instrument_Serif] text-4xl text-[#2a1520]">
            The Mango Gallery
          </h2>
        </div>

        <div className="relative mx-auto h-[1050px] w-full max-w-7xl overflow-visible">
          {mangoImages.map((filename, i) => {
            const cfg = mangoGalleryConfigs[i % mangoGalleryConfigs.length];

            return (
              <div
                key={i}
                className="group absolute overflow-hidden rounded-2xl border border-[#f39c12]/10 bg-white shadow-xl transition-transform duration-500 hover:z-50 hover:scale-110 hover:rotate-0"
                style={{
                  top: cfg.top,
                  left: cfg.left,
                  width: "350px",
                  height: "350px",
                  transform: `rotate(${cfg.rotate}) scale(${cfg.scale})`,
                  "--orig-rotate": cfg.rotate,
                  animation: `drift ${cfg.duration} ease-in-out infinite alternate`,
                  animationDelay: cfg.delay,
                } as React.CSSProperties}
              >
                <img
                  src={publicAsset(`mango/${filename}`)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={`Mango photo ${i + 1}`}
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>

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
