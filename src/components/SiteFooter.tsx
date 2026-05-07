export function SiteFooter() {
  return (
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
  );
}
