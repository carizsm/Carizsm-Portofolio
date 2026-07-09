"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, LayoutGrid, LayoutList } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectArchive, projects, type Project } from "@/content/projects";
import { SectionHead, SectionShell } from "./Section";
import { cn } from "@/lib/utils";

const easing = [0.22, 1, 0.36, 1] as const;

const categories = ["All", "Engineering & Dev", "Product & UX Design", "Research & IoT"] as const;
type Category = (typeof categories)[number];

const projectCategoryMap: Record<string, Category[]> = {
  iterra: ["Engineering & Dev", "Product & UX Design"],
  motiva: ["Product & UX Design"],
  "adaptive-pomodoro": ["Engineering & Dev", "Research & IoT"],
  "skin-cancer-detection": ["Engineering & Dev"],
  kakilima: ["Product & UX Design"],
  "the-goat": ["Research & IoT"],
  "edu-parent": ["Product & UX Design"],
  "smart-lamp": ["Engineering & Dev", "Research & IoT"],
};

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [viewMode, setViewMode] = useState<"carousel" | "grid">("carousel");
  const [activeIndex, setActiveIndex] = useState(0);
  const railRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === "All") return true;
    return projectCategoryMap[project.id]?.includes(selectedCategory);
  });

  const scrollToProject = useCallback(
    (index: number) => {
      const maxIndex = filteredProjects.length - 1;
      const nextIndex = Math.max(0, Math.min(maxIndex, index));
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
    [reduce, filteredProjects.length],
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

      const nextIndex = Math.max(0, Math.min(filteredProjects.length - 1, nearest.index));
      setActiveIndex(nextIndex);
    });
  }, [activeIndex, filteredProjects.length]);

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
              Selected projects, picked for the way
              <br />
              <span className="italic text-fg-muted">
                they bend across disciplines.
              </span>
            </>
          }
        />

        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-md text-sm leading-relaxed text-fg-muted">
            A sideways view across product, research, design, and systems work.
          </p>
          {viewMode === "carousel" && filteredProjects.length > 1 && (
            <p className="hidden text-xs text-fg-subtle sm:block">
              Swipe the cards or use the arrow controls.
            </p>
          )}
        </div>

        {/* Filter and View Mode Controls */}
        <div className="mt-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-center sm:justify-between">
          {/* Categories */}
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(0);
                  if (viewMode === "carousel") {
                    setTimeout(() => {
                      if (railRef.current) {
                        railRef.current.scrollLeft = 0;
                      }
                    }, 10);
                  }
                }}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                  selectedCategory === cat
                    ? "bg-accent border-accent text-accent-fg font-semibold shadow-[0_4px_12px_color-mix(in_oklch,var(--color-accent)_20%,transparent)]"
                    : "bg-bg-elevated/40 border-border text-fg-muted hover:border-border-strong hover:text-fg"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Controls: View Mode & Carousel Nav */}
          <div className="flex items-center justify-between gap-4 sm:justify-end">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-full border border-border bg-bg-elevated/20 p-1">
              <button
                type="button"
                onClick={() => setViewMode("carousel")}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all",
                  viewMode === "carousel"
                    ? "bg-bg text-accent font-semibold shadow-sm"
                    : "text-fg-muted hover:text-fg"
                )}
                title="Carousel view"
              >
                <LayoutList className="h-3.5 w-3.5" />
                <span>Carousel</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-all",
                  viewMode === "grid"
                    ? "bg-bg text-accent font-semibold shadow-sm"
                    : "text-fg-muted hover:text-fg"
                )}
                title="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* Previous/Next buttons */}
            {viewMode === "carousel" && filteredProjects.length > 1 && (
              <div className="flex shrink-0 items-center gap-1.5">
                <RailButton
                  label="Previous project"
                  disabled={activeIndex === 0}
                  onClick={() => scrollToProject(activeIndex - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </RailButton>
                <RailButton
                  label="Next project"
                  disabled={activeIndex === filteredProjects.length - 1}
                  onClick={() => scrollToProject(activeIndex + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </RailButton>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8">
        {viewMode === "carousel" ? (
          filteredProjects.length > 0 ? (
            <>
              <div
                ref={railRef}
                onScroll={handleRailScroll}
                className="fade-edge-r -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 pb-6 pt-2 [scrollbar-width:none] sm:-mx-8 sm:gap-5 sm:px-8 md:pl-28 lg:pl-32 xl:gap-6 [&::-webkit-scrollbar]:hidden"
                aria-label="Selected work carousel"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectSlide
                    key={project.id}
                    project={project}
                    index={index}
                    active={index === activeIndex}
                  />
                ))}
              </div>

              <div className="mx-auto mt-1 flex max-w-6xl items-center justify-between gap-5 px-5 sm:px-8">
                <div className="hidden gap-1 sm:flex">
                  {filteredProjects.map((project, index) => (
                    <button
                      key={project.id}
                      type="button"
                      onClick={() => scrollToProject(index)}
                      title={`Show ${project.title}`}
                      className="group grid h-8 w-8 place-items-center rounded-full"
                    >
                      <span
                        aria-hidden
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-300",
                          index === activeIndex
                            ? "w-8 bg-accent"
                            : "w-2 bg-border-strong group-hover:bg-fg-subtle",
                        )}
                      />
                      <span className="sr-only">Show {project.title}</span>
                    </button>
                  ))}
                </div>
                <p className="font-mono text-xs text-fg-subtle ml-auto">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
                </p>
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-6xl py-12 text-center text-fg-muted px-5">
              No projects in this category.
            </div>
          )
        ) : (
          /* Grid View */
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {filteredProjects.length > 0 ? (
              <motion.div 
                layout={!reduce ? "position" : undefined}
                className="grid gap-6 sm:grid-cols-2"
              >
                {filteredProjects.map((project, index) => (
                  <ProjectSlide
                    key={project.id}
                    project={project}
                    index={index}
                    active={false}
                    isGrid={true}
                  />
                ))}
              </motion.div>
            ) : (
              <div className="py-12 text-center text-fg-muted">
                No projects in this category.
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mx-auto mt-16 max-w-6xl border-t border-border pt-8 sm:mt-20">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
              Project archive
            </p>
            <h3 className="serif mt-2 text-3xl font-normal text-fg">More work.</h3>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-fg-muted">
            Earlier team projects across mobile products and campus systems.
          </p>
        </div>

        <div className="mt-6 divide-y divide-border border-y border-border">
          {projectArchive.map((item) => (
            <article
              key={item.id}
              className="grid gap-4 py-6 md:grid-cols-[0.7fr_1.3fr] md:gap-10"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h4 className="serif text-2xl text-fg">{item.title}</h4>
                  <span className="font-mono text-xs text-fg-subtle">{item.period}</span>
                </div>
                <p className="mt-2 text-sm text-fg-subtle">{item.role}</p>
              </div>
              <div>
                <p className="text-pretty text-sm leading-relaxed text-fg-muted">
                  {item.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-fg-subtle">
                  {item.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}

function ProjectSlide({
  project,
  index,
  active,
  isGrid = false,
}: {
  project: Project;
  index: number;
  active: boolean;
  isGrid?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      layout={!reduce ? "position" : undefined}
      data-project-card={index}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: isGrid ? 20 : 0, x: isGrid ? 0 : 36 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.58, ease: easing, delay: Math.min(index * 0.05, 0.18) }}
      className={cn(
        "group relative grid overflow-hidden rounded-2xl border bg-bg text-fg transition-all duration-500",
        isGrid
          ? "w-full border-border hover:border-accent/45 hover:shadow-[0_16px_48px_color-mix(in_oklch,var(--color-fg)_8%,transparent)]"
          : cn(
              "w-[86vw] max-w-[760px] shrink-0 snap-center sm:w-[74vw] md:w-[68vw] lg:w-[58vw] xl:w-[740px]",
              active
                ? "border-accent/45 shadow-[0_28px_90px_color-mix(in_oklch,var(--color-fg)_12%,transparent)]"
                : "border-border opacity-72 shadow-none hover:opacity-100",
            )
      )}
      aria-labelledby={`project-${project.id}-title`}
    >
      <ProjectCover project={project} active={active || isGrid} />

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
    <div className="mt-4 flex flex-wrap gap-2 text-sm">
      {detailHref && (
        <Link
          href={detailHref}
          className="group/link inline-flex min-h-11 items-center gap-1 rounded-full border border-border px-3 text-fg transition-colors hover:border-accent/45 hover:text-accent"
        >
          <span>View case study</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </Link>
      )}
      {entries.map(([label, href]) => (
        <a
          key={label}
          href={href as string}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-11 items-center gap-1 rounded-full px-3 text-fg transition-colors hover:bg-bg-elevated hover:text-accent"
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
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-bg text-fg-muted transition-colors hover:border-accent/45 hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
    >
      {children}
      <span className="sr-only">{label}</span>
    </button>
  );
}
