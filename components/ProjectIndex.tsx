import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects, projectArchive } from "@/content/projects";

export function ProjectIndex() {
  return <details id="work-index" className="story-explore-panel">
    <summary><span>Project archive</span><span className="eyebrow">{String(projects.length).padStart(2, "0")} projects</span></summary>
    <div className="archive-grid">{projects.map((project, index) => <Link key={project.id} href={project.detailHref ?? "/projects/" + project.id} className="archive-project">
      <span className="eyebrow">{String(index + 1).padStart(2, "0")}</span><div><h3>{project.title}</h3><p>{project.type} · {project.period}</p></div><ArrowUpRight size={21} aria-hidden />
    </Link>)}</div>
    <details className="earlier-work"><summary>Earlier collaborations<span>{projectArchive.length} more</span></summary>{projectArchive.map(project => <article key={project.id}><h3>{project.title}</h3><p className="eyebrow">{project.role} / {project.period}</p><p>{project.description}</p></article>)}</details>
  </details>;
}
