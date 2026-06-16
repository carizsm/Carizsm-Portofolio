"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projects, type Project } from "@/content/projects";
import { SectionHead, SectionShell } from "./Section";
import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

export function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const scrollToProject = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(projects.length - 1, index));
      const node = railRef.current?.querySelector<HTMLElement>(
        `[data-project-card="${nextIndex}"]`,
      );

      node?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(nextIndex);
    },
    [reduce],
  );

  const handleRailScroll = useCallback(() => {
    if (!railRef.current) return;
    if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);

    scrollFrameRef.current = window.requestAnimationFrame(() => {
      const rail = railRef.current;
      if (!rail) return;

      const railCenter = rail.scrollLeft + rail.clientWidth / 2;
      const cards = Array.from(
        rail.querySelectorAll<HTMLElement>("[data-project-card]"),
      );

      const nearest = cards.reduce(
        (best, card) => {
          const center = card.offsetLeft + card.offsetWidth / 2;
          const distance = Math.abs(center - railCenter);
          const index = Number(card.dataset.projectCard ?? 0);
          return distance < best.distance ? { index, distance } : best;
        },
        { index: activeIndex, distance: Number.POSITIVE_INFINITY },
      );

      setActiveIndex(nearest.index);
    });
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, []);

  return (
    <SectionShell id="work" className="!max-w-none overflow-hidden !py-24 sm:!py-32">
      <div className="mx-auto max-w-6xl">
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

        <div className="mb-5 flex items-center justify-between gap-4">
          <p className="max-w-md text-sm leading-relaxed text-fg-muted">
            A sideways view across product, research, design, and systems work.
          </p>
          <div className="hidden items-center gap-2 sm:flex">
            <RailButton
              label="Previous project"
              disabled={activeIndex === 0}
              onClick={() => scrollToProject(activeIndex - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </RailButton>
            <RailButton
              label="Next project"
              disabled={activeIndex === projects.length - 1}
              onClick={() => scrollToProject(activeIndex + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </RailButton>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={handleRailScroll}
        className="fade-edge-r -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-6 pt-2 [scrollbar-width:none] sm:-mx-8 sm:gap-5 sm:px-8 md:pl-28 lg:pl-32 xl:gap-6 [&::-webkit-scrollbar]:hidden"
        aria-label="Selected work carousel"
      >
        {projects.map((project, index) => (
          <ProjectSlide
            key={project.id}
            project={project}
            index={index}
            active={index === activeIndex}
          />
        ))}
      </div>

      <div className="mx-auto mt-2 flex max-w-6xl items-center justify-between gap-5">
        <div className="flex gap-2">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              onClick={() => scrollToProject(index)}
              title={`Show ${project.title}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex
                  ? "w-8 bg-accent"
                  : "w-2 bg-border-strong hover:bg-fg-subtle",
              )}
            >
              <span className="sr-only">Show {project.title}</span>
            </button>
          ))}
        </div>
        <p className="font-mono text-xs text-fg-subtle">
          {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </p>
      </div>
    </SectionShell>
  );
}

function ProjectSlide({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      data-project-card={index}
      initial={reduce ? { opacity: 0 } : { opacity: 0, x: 36 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.58, ease: easing, delay: Math.min(index * 0.05, 0.18) }}
      className={cn(
        "group relative grid w-[86vw] max-w-[760px] shrink-0 snap-center overflow-hidden rounded-2xl border bg-bg text-fg transition-all duration-500 sm:w-[74vw] md:w-[68vw] lg:w-[58vw] xl:w-[740px]",
        active
          ? "border-accent/45 shadow-[0_28px_90px_color-mix(in_oklch,var(--color-fg)_12%,transparent)]"
          : "border-border opacity-72 shadow-none hover:opacity-100",
      )}
      aria-labelledby={`project-${project.id}-title`}
    >
      <ProjectCover project={project} active={active} />

      <div className="relative z-10 mt-auto border-t border-border bg-bg/90 px-5 py-5 backdrop-blur sm:px-6">
        <ProjectIndex index={index + 1} type={project.type} />

        <div className="mt-3 grid gap-3 lg:grid-cols-[0.7fr_1fr] lg:items-start">
          <div>
            <h3
              id={`project-${project.id}-title`}
              className="serif text-balance text-2xl font-normal tracking-tightish text-fg sm:text-3xl"
            >
              {project.title}
            </h3>
            <p className="mt-2 text-xs text-fg-subtle sm:text-sm">{project.role}</p>
            <p className="mt-1 text-xs text-fg-subtle sm:text-sm">{project.period}</p>
          </div>

          <div>
            <p className="line-clamp-3 text-pretty text-xs leading-relaxed text-fg-muted sm:text-sm">
              {project.description}
            </p>

            {project.outcome && (
              <p className="mt-3 inline-flex items-start gap-2 rounded-lg border border-accent/35 bg-accent-soft/55 px-2.5 py-1.5 text-xs text-fg sm:text-sm">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="line-clamp-2">{project.outcome}</span>
              </p>
            )}

            <TechRow tech={project.tech} />
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectCover({
  project,
  active,
}: {
  project: Project;
  active: boolean;
}) {
  if (!project.image) return null;

  return (
    <div className="relative h-[225px] overflow-hidden bg-bg-elevated sm:h-[250px] lg:h-[275px]">
      <Image
        src={project.image.src}
        alt={project.image.alt}
        fill
        sizes="(min-width: 1280px) 840px, (min-width: 768px) 72vw, 82vw"
        className={cn(
          "object-cover object-[center_8%] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
          active ? "scale-100" : "scale-[0.985] group-hover:scale-100",
        )}
        priority={project.featured}
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/82"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-3 rounded-[1.1rem] border border-fg/10"
      />
    </div>
  );
}

function ProjectIndex({ index, type }: { index: number; type: Project["type"] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-fg-subtle">
      <span className="font-mono text-accent">
        {String(index).padStart(2, "0")}
      </span>
      <span aria-hidden className="h-px w-7 bg-border-strong" />
      <span>Project</span>
      <span className="hidden text-fg-subtle sm:inline">/</span>
      <span className="hidden normal-case tracking-normal text-fg-subtle sm:inline">
        {type}
      </span>
    </div>
  );
}

function TechRow({ tech }: { tech: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-1.5 text-[11px] sm:text-xs">
      {tech.slice(0, 5).map((t) => (
        <span
          key={t}
          className="rounded-full border border-border bg-bg px-2 py-0.5 text-fg-muted"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  const detailHref = project.detailHref ?? `/projects/${project.id}`;
  const links = project.links ?? {};
  const entries = Object.entries(links).filter(([, v]) => Boolean(v));

  if (entries.length === 0 && !detailHref) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-3 text-sm">
      {detailHref && (
        <Link
          href={detailHref}
          className="group/link inline-flex items-center gap-1 text-fg transition-colors hover:text-accent"
        >
          <span>Details</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
      )}
      {entries.map(([label, href]) => (
        <a
          key={label}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex items-center gap-1 text-fg transition-colors hover:text-accent"
        >
          <span className="capitalize">{label}</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      ))}
    </div>
  );
}

function RailButton({
  label,
  disabled,
  onClick,
  children,
}: {
  label: string;
  disabled: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg text-fg-muted transition-colors hover:border-accent/45 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
