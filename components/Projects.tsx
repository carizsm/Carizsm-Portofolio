"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { projects, type Project } from "@/content/projects";
import { SectionHead, SectionShell } from "./Section";
import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  return (
    <SectionShell id="work" className="!py-24 sm:!py-32">
      <SectionHead
        index="02"
        label="Selected Work"
        title={
          <>
            Five projects, picked for the way
            <br />
            <span className="italic text-fg-muted">
              they bend across disciplines.
            </span>
          </>
        }
      />

      <div className="flex flex-col gap-20 sm:gap-28">
        {projects.map((project, idx) =>
          project.featured ? (
            <FeaturedProject key={project.id} project={project} index={idx} />
          ) : (
            <SplitProject
              key={project.id}
              project={project}
              index={idx}
              flipped={idx % 2 === 1}
            />
          ),
        )}
      </div>
    </SectionShell>
  );
}

function FeaturedProject({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: easing }}
      className="glass-panel grid gap-8 rounded-3xl p-5 sm:grid-cols-12 sm:gap-10 sm:p-8"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="sm:col-span-12">
        <ProjectCover project={project} large />
      </div>

      <div className="sm:col-span-5">
        <ProjectIndex index={index + 1} />
        <h3
          id={`project-${project.id}-title`}
          className="serif mt-3 text-balance text-4xl font-normal tracking-tightish text-fg sm:text-5xl"
        >
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-fg-subtle">{project.role}</p>
        <p className="mt-1 text-sm text-fg-subtle">{project.period}</p>
      </div>

      <div className="sm:col-span-7 sm:pt-1">
        <p className="text-pretty text-base leading-relaxed text-fg sm:text-lg">
          {project.description}
        </p>

        {project.outcome && (
          <p className="mt-5 inline-flex items-start gap-2 rounded-xl border border-accent/40 bg-accent-soft/50 px-3 py-2 text-sm text-fg">
            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{project.outcome}</span>
          </p>
        )}

        <TechRow tech={project.tech} type={project.type} />
        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
}

function SplitProject({
  project,
  index,
  flipped,
}: {
  project: Project;
  index: number;
  flipped: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: easing }}
      className="glass-panel grid items-center gap-8 rounded-3xl p-5 sm:grid-cols-12 sm:gap-12 sm:p-8"
      aria-labelledby={`project-${project.id}-title`}
    >
      <div
        className={cn(
          "sm:col-span-7",
          flipped ? "sm:order-2" : "sm:order-1",
        )}
      >
        <ProjectCover project={project} />
      </div>
      <div
        className={cn(
          "sm:col-span-5",
          flipped ? "sm:order-1" : "sm:order-2",
        )}
      >
        <ProjectIndex index={index + 1} />
        <h3
          id={`project-${project.id}-title`}
          className="serif mt-3 text-balance text-3xl font-normal tracking-tightish text-fg sm:text-4xl"
        >
          {project.title}
        </h3>
        <p className="mt-2 text-sm text-fg-subtle">{project.role}</p>
        <p className="text-sm text-fg-subtle">{project.period}</p>

        <p className="mt-5 text-pretty text-base leading-relaxed text-fg-muted">
          {project.description}
        </p>

        {project.outcome && (
          <p className="mt-4 text-sm text-fg">
            <span className="text-accent">→ </span>
            {project.outcome}
          </p>
        )}

        <TechRow tech={project.tech} type={project.type} compact />
        <ProjectLinks project={project} />
      </div>
    </motion.article>
  );
}

function ProjectCover({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  if (!project.image) return null;
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-bg-elevated",
        large ? "aspect-[16/9]" : "aspect-[4/3]",
      )}
    >
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes={large ? "(min-width: 768px) 1100px, 100vw" : "(min-width: 768px) 640px, 100vw"}
        className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
        priority={large}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-fg/[0.03]"
      />
    </div>
  );
}

function ProjectIndex({ index }: { index: number }) {
  return (
    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-subtle">
      <span className="font-mono text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <span aria-hidden className="h-px w-6 bg-border-strong" />
      <span>Project</span>
    </div>
  );
}

function TechRow({
  tech,
  type,
  compact = false,
}: {
  tech: string[];
  type: Project["type"];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "mt-6 flex flex-wrap items-center gap-2 text-xs",
        compact ? "mt-5" : "",
      )}
    >
      {tech.map((t) => (
        <span
          key={t}
          className="rounded-full border border-border bg-bg px-2.5 py-1 text-fg-muted"
        >
          {t}
        </span>
      ))}
      <span className="ml-auto hidden text-fg-subtle sm:inline">{type}</span>
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const detailHref = project.detailHref ?? `/projects/${project.id}`;
  const links = project.links ?? {};
  const entries = Object.entries(links).filter(([, v]) => Boolean(v));

  if (entries.length === 0 && !detailHref) return null;

  return (
    <div className="mt-5 flex flex-wrap gap-3 text-sm">
      {detailHref && (
        <Link
          href={detailHref}
          className="group inline-flex items-center gap-1 text-fg transition-colors hover:text-accent"
        >
          <span>Details</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      )}
      {entries.map(([label, href]) => (
        <a
          key={label}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 text-fg transition-colors hover:text-accent"
        >
          <span className="capitalize">{label}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </a>
      ))}
    </div>
  );
}
