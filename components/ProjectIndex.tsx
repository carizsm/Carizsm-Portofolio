"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/content/projects";
import { WorkPreview } from "./WorkPreview";
import { shouldAnimate, springs } from "@/lib/motion-tokens";

export function ProjectIndex() {
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const selected = projects.find(({ id }) => id === selectedId) ?? projects[0];

  return (
    <div className="project-collection">
      <div className="project-collection-list" role="group" aria-label="Select a project to preview">
        {projects.map((project, index) => {
          const active = selectedId === project.id;
          return <div key={project.id} className="collection-item" data-active={active}>
            <div className="collection-item-heading">
              <button ref={(element) => { buttons.current[index] = element; }} type="button"
                aria-pressed={active} aria-expanded={active} aria-controls={`collection-mobile-${project.id} collection-desktop`}
                onClick={() => setSelectedId(project.id)} onFocus={() => setSelectedId(project.id)}
                onPointerEnter={(event) => { if (event.pointerType === "mouse") setSelectedId(project.id); }}
                onKeyDown={(event) => {
                  if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
                  event.preventDefault();
                  const next = (index + (event.key === "ArrowDown" ? 1 : -1) + projects.length) % projects.length;
                  buttons.current[next]?.focus();
                }}>
                <span className="collection-number">{String(index + 1).padStart(2, "0")}</span>
                <span><strong>{project.title}</strong><small>{project.period}</small></span>
                {active && <motion.i aria-hidden className="collection-marker" layoutId="collection-marker" transition={shouldAnimate(reduced) ? springs.snappy : { duration: 0 }} />}
              </button>
              <Link href={project.detailHref ?? `/projects/${project.id}`} aria-label={`Open ${project.title} case study`}><ArrowUpRight size={19} aria-hidden /></Link>
            </div>
            <div id={`collection-mobile-${project.id}`} className="collection-mobile-preview" hidden={!active}>
              {active && <WorkPreview key={project.id} project={project} />}
            </div>
          </div>;
        })}
        <p className="collection-hint">Choose a project to look closer.<br />Use ↑ ↓ when browsing with a keyboard.</p>
      </div>
      <aside id="collection-desktop" className="collection-desktop-preview" aria-label="Selected project preview">
        <WorkPreview key={selected.id} project={selected} />
      </aside>
      <p className="sr-only" role="status">{selected.title} preview selected.</p>
    </div>
  );
}
