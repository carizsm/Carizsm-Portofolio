"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { projects, projectArchive } from "@/content/projects";
import { studioWorks, type StudioStep, type StudioWork } from "@/content/studio";
import { StudioArtifact } from "./StudioArtifact";
import { Reveal } from "./Reveal";
import { ProjectIndex } from "./ProjectIndex";

const steps: { id: StudioStep; label: string }[] = [
  { id: "question", label: "The question" },
  { id: "decision", label: "The decision" },
  { id: "result", label: "The result" },
];

export function Projects() {
  return (
    <section id="work" aria-labelledby="work-title" className="studio-work studio-shell">
      <header className="studio-work-heading">
        <div>
          <p className="studio-label text-accent">01 / A few things I’ve worked on</p>
          <h2 id="work-title">Questions in.<br /><span>Working things out.</span></h2>
        </div>
        <div className="studio-work-intro">
          <p>Different mediums. The same instinct to understand a problem, make something, and see what holds up.</p>
          <a href="#work-index" className="studio-text-link">The complete index <ArrowDown aria-hidden size={15} /></a>
        </div>
      </header>
      <div className="studio-selected">
        {studioWorks.map((work, index) => <SelectedWork key={work.id} work={work} index={index} />)}
      </div>
      <div id="work-index" className="studio-index">
        <div className="studio-index-heading">
          <h3>Browse the work<span className="text-accent">.</span></h3>
          <span className="studio-label">{String(projects.length).padStart(2, "0")} projects / Products, research & field work</span>
        </div>
        <ProjectIndex />
        <details className="studio-archive">
          <summary>Earlier collaborations <span className="studio-label">{projectArchive.length} more</span></summary>
          {projectArchive.map((project) => (
            <article key={project.id} className="studio-archive-row">
              <div><h4>{project.title}</h4><p>{project.role} / {project.period}</p></div>
              <p>{project.description}</p>
            </article>
          ))}
        </details>
      </div>
    </section>
  );
}

function SelectedWork({ work, index }: { work: StudioWork; index: number }) {
  const [step, setStep] = useState<StudioStep>("question");
  const reduceMotion = useReducedMotion();
  const { project } = work;
  return (
    <article id={`work-${work.id}`} aria-labelledby={`studio-${work.id}-title`} className="studio-project" data-featured={index === 0}>
      <div className="studio-project-meta studio-label">
        <span>{String(index + 1).padStart(2, "0")} / {work.discipline}</span>
        <span>{work.status}</span>
      </div>
      <figure className="studio-project-figure">
        <Reveal y={16}><StudioArtifact kind={work.artifact} step={step} /></Reveal>
        <figcaption>{work.caption}</figcaption>
      </figure>
      <div className="studio-project-story">
        <div className="studio-project-title">
          <p className="studio-label text-accent">{project.title}</p>
          <h3 id={`studio-${work.id}-title`}>{work.headline}</h3>
          <p className="studio-project-role">{project.role}</p>
        </div>
        <div className="studio-project-notes">
          <div className="studio-step-controls" role="group" aria-label={`${project.title}: explore the story`}>
            {steps.map(({ id, label }, stepIndex) => (
              <button key={id} type="button" aria-pressed={step === id} aria-controls={`note-${work.id}`} onClick={() => setStep(id)}>
                <span aria-hidden>{String(stepIndex + 1).padStart(2, "0")}</span>{label}
                {step === id && <motion.i aria-hidden className="studio-step-indicator" layoutId={`step-${work.id}`} transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }} />}
              </button>
            ))}
          </div>
          <div id={`note-${work.id}`} className="studio-note" aria-live="polite" aria-atomic="true">
            <p key={step}>{work.notes[step]}</p>
          </div>
          <div className="studio-project-links">
            <Link href={project.detailHref ?? `/projects/${project.id}`} className="studio-text-link">Inside {project.title} <ArrowUpRight aria-hidden size={17} /></Link>
            {project.links?.repo && <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="studio-text-link text-fg-muted">Source code <ArrowUpRight aria-hidden size={15} /><span className="sr-only"> (opens in a new tab)</span></a>}
          </div>
        </div>
      </div>
    </article>
  );
}
