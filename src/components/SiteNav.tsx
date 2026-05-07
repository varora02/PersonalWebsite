import { Link } from "react-router-dom";

export function SiteNav() {
  return (
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
  );
}
