import { FadeIn } from "../components/FadeIn";
import { GitHubCalendar } from "../components/GitHubCalendar";
import { projects, type Project } from "../data/projects";
import { publicAsset } from "../lib/assets";

function LifeOSPreview() {
  return (
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
  );
}

function VirtualPetPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-black/5 shadow-2xl transition-transform hover:scale-[1.02]">
      <img src={publicAsset("projects/virtualpet/virtualpet.png")} className="w-full h-auto object-cover" alt="VirtualPet" />
    </div>
  );
}

function FailureHarnessPreview() {
  return (
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
  );
}

function PoseGuidePreview() {
  return (
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
  );
}

function ProjectPreview({ project }: { project: Project }) {
  switch (project.id) {
    case "lifeos":
      return <LifeOSPreview />;
    case "virtualpet":
      return <VirtualPetPreview />;
    case "failureHarness":
      return <FailureHarnessPreview />;
    case "poseguide":
      return <PoseGuidePreview />;
  }
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
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
        <ProjectPreview project={project} />
      </div>
    </div>
  );

  return (
    <FadeIn delay={0.05}>
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
}

export function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-black/6 bg-[var(--surface)] px-6 py-20 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
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
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
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
  );
}
