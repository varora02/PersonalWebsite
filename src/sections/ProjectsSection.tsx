import { useState } from "react";
import { projects, projectFilters, type ProjectFilter, type Project } from "../data/projects";
import { publicAsset } from "../lib/assets";
import { DayNightPreview } from "../components/DayNightPreview";

function ProjectCard({ project }: { project: Project }) {
  const preview = project.image ? <img src={publicAsset(project.image.src)} alt={project.image.alt} width="720" height="450" loading="lazy" /> : null;
  return (
    <article className={`project-card ${project.image ? "has-preview" : "text-project"}`}>
      {project.image && project.nightImage ? <DayNightPreview day={project.image} night={project.nightImage} /> : preview ? project.link ? <a className={`project-preview preview-${project.id}`} href={project.link.href} target="_blank" rel="noreferrer" aria-label={`${project.link.label}: ${project.title}`}>{preview}<span className="preview-open" aria-hidden="true">↗</span></a> : <div className={`project-preview preview-${project.id}`}>{preview}</div> : null}
      <div className="project-card-body">
        <div className="project-card-heading"><h3>{project.title}</h3></div>
        <p>{project.description}</p>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const visible = projects.filter((project) => filter === "All" || project.category === filter);
  const visual = visible.filter((project) => project.image);
  const textOnly = visible.filter((project) => !project.image);
  return (
    <section id="projects" className="section-shell projects-section" aria-labelledby="projects-heading">
      <div className="projects-topline"><h2 id="projects-heading">Projects</h2>
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          {projectFilters.map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
      </div>
      <span className="sr-only" role="status">{visible.length} {visible.length === 1 ? "project" : "projects"}</span>
      {visual.length > 0 ? <div className="project-gallery">{visual.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : null}
      {textOnly.length > 0 ? <div className="project-secondary">{textOnly.map((project) => <ProjectCard key={project.id} project={project} />)}</div> : null}
    </section>
  );
}
