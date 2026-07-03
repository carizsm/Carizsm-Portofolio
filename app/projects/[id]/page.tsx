import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ProjectMediaCarousel } from "@/components/ProjectMediaCarousel";
import { projects, type Project } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) return {};

  return {
    title: project.title,
    description: project.detail?.headline ?? project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) notFound();

  const projectIndex = projects.findIndex((item) => item.id === id);
  const previousProject = projectIndex > 0 ? projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex < projects.length - 1 ? projects[projectIndex + 1] : null;

  if (project.detail) {
    return (
      <CaseStudyDetail
        project={project}
        detail={project.detail}
        previousProject={previousProject}
        nextProject={nextProject}
      />
    );
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-24 sm:px-8 sm:py-28">
      <p className="mb-4 text-xs uppercase tracking-[0.18em] text-fg-subtle">
        Project Detail Template
      </p>
      <h1 className="serif text-4xl tracking-tightish sm:text-5xl">{project.title}</h1>
      <p className="mt-3 text-fg-subtle">{project.role}</p>
      <p className="text-fg-subtle">{project.period}</p>

      <div className="glass-panel mt-10 space-y-8 rounded-3xl p-6 sm:p-8">
        <TemplateBlock title="Overview" hint="Ringkas masalah yang diselesaikan, konteks project, dan target pengguna." />
        <TemplateBlock title="My Role" hint="Jelaskan kontribusi personal: keputusan teknis, desain, leadership, dll." />
        <TemplateBlock title="Process" hint="Tambahkan milestone: discovery, prototyping, implementation, testing." />
        <TemplateBlock title="Tech Stack" hint="Sebut tools/libraries/hardware dan alasan pemilihannya." />
        <TemplateBlock title="Result & Impact" hint="Isi metrik, outcome, feedback user, atau pembelajaran utama." />
      </div>

      <div className="mt-8 flex gap-4 text-sm">
        <Link href="/#work" className="text-fg transition-colors hover:text-accent">
          ← Kembali ke daftar project
        </Link>
      </div>
    </section>
  );
}

function CaseStudyDetail({
  project,
  detail,
  previousProject,
  nextProject,
}: {
  project: Project;
  detail: NonNullable<Project["detail"]>;
  previousProject: Project | null;
  nextProject: Project | null;
}) {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-24 sm:px-8 sm:py-28">
      <Link
        href="/#work"
        className="mb-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-accent"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to selected work
      </Link>

      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-fg-subtle">
            {detail.eyebrow}
          </p>
          <h1 className="serif text-balance text-5xl font-normal tracking-tightish text-fg sm:text-6xl">
            {project.title}
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-xl leading-relaxed text-fg sm:text-2xl">
            {detail.headline}
          </p>
          <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-fg-muted">
            {detail.summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-border bg-bg px-3 py-1.5 text-fg-muted">
              {project.role}
            </span>
            <span className="rounded-full border border-border bg-bg px-3 py-1.5 text-fg-muted">
              {project.period}
            </span>
            {project.outcome && (
              <span className="rounded-full border border-accent/40 bg-accent-soft/60 px-3 py-1.5 text-fg">
                {project.outcome}
              </span>
            )}
          </div>

          {detail.certificateUrl && (
            <a
              href={detail.certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-accent px-4 py-2 text-sm font-medium text-accent-fg transition-colors hover:bg-accent-hover"
            >
              View competition certificate
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>

        <ProjectMediaCarousel media={detail.media} />
      </div>

      <div className="mt-14 grid gap-3 sm:grid-cols-3">
        {detail.metrics.map((metric) => (
          <article
            key={metric.value}
            className="rounded-2xl border border-border bg-bg px-5 py-5"
          >
            <p className="font-mono text-3xl text-accent">{metric.value}</p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {metric.label}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2">
        {detail.sections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-border bg-bg px-5 py-5 sm:px-6 sm:py-6"
          >
            <h2 className="serif text-2xl text-fg">{section.title}</h2>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-fg-muted sm:text-base">
              {section.body}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
            {detail.featureEyebrow ?? "Core product"}
          </p>
          <h2 className="serif mt-3 text-4xl font-normal tracking-tightish text-fg">
            {detail.featureHeadline ?? "Three features, one motivation loop."}
          </h2>
        </div>
        <div className="grid gap-3">
          {detail.features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-2xl border border-border bg-bg px-5 py-4"
            >
              <h3 className="text-base font-medium text-fg">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                {feature.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="glass-panel mt-16 rounded-3xl p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle">
          Process
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {detail.process.map((step, index) => (
            <article key={step.label}>
              <p className="font-mono text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="serif mt-3 text-2xl text-fg">{step.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-muted">
                {step.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <nav
        aria-label="Continue exploring projects"
        className="mt-16 border-t border-border pt-8"
      >
        <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.id}`}
              className="group flex min-h-24 flex-col justify-center rounded-2xl border border-border px-5 py-4 transition-colors hover:border-accent/45"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-fg-subtle">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous case study
              </span>
              <span className="serif mt-2 text-2xl text-fg transition-colors group-hover:text-accent">
                {previousProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          <Link
            href="/#contact"
            className="inline-flex min-h-24 items-center justify-center rounded-2xl bg-accent px-6 py-4 text-center font-medium text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Start a conversation
          </Link>

          {nextProject ? (
            <Link
              href={`/projects/${nextProject.id}`}
              className="group flex min-h-24 flex-col items-end justify-center rounded-2xl border border-border px-5 py-4 text-right transition-colors hover:border-accent/45"
            >
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-fg-subtle">
                Next case study <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="serif mt-2 text-2xl text-fg transition-colors group-hover:text-accent">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </nav>
    </section>
  );
}

function TemplateBlock({ title, hint }: { title: string; hint: string }) {
  return (
    <article className="rounded-2xl border border-border bg-bg px-4 py-4 sm:px-5">
      <h2 className="serif text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{hint}</p>
    </article>
  );
}
