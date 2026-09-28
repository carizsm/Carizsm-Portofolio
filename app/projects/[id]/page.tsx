import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import { ProjectMediaCarousel } from "@/components/ProjectMediaCarousel";
import { projects, type Project } from "@/content/projects";
import "@/app/case-study.css";

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
    <article className="studio-shell case-study">
      <div className="case-topline">
        <Link href="/#work-index" className="studio-text-link"><ArrowLeft size={16} aria-hidden /> All projects</Link>
        <span className="studio-label">{String(projects.indexOf(project) + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
      </div>
      <header className="case-header">
        <p className="studio-label text-accent">{detail.eyebrow}</p>
        <h1>{project.title}</h1>
        <p className="case-headline">{detail.headline}</p>
        <div className="case-intro-grid">
          <p className="case-summary">{detail.summary}</p>
          <dl className="case-facts">
            <div><dt>My role</dt><dd>{project.role}</dd></div>
            <div><dt>Timeline</dt><dd>{project.period}</dd></div>
          </dl>
        </div>
        {project.outcome && <p className="case-outcome"><span className="studio-label">At a glance</span>{project.outcome}</p>}
        {detail.certificateUrl && (
          <a href={detail.certificateUrl} target="_blank" rel="noopener noreferrer" className="studio-text-link">
            View competition certificate<ExternalLink size={15} aria-hidden /><span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </header>
      <ProjectMediaCarousel key={project.id} media={detail.media} />
      <dl className="case-metrics">
        {detail.metrics.map((metric) => <div key={metric.value}><dt>{metric.label}</dt><dd>{metric.value}</dd></div>)}
      </dl>
      <div className="case-reading-layout">
        <nav className="case-contents" aria-label="In this case study">
          <p className="studio-label">In this case study</p>
          {detail.sections.map((section, index) => <a key={section.title} href={`#section-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{section.title}</a>)}
          <a href="#features"><span>↗</span>{detail.featureEyebrow ?? "Features"}</a>
          <a href="#process"><span>↗</span>Process</a>
        </nav>
        <div className="case-reading-body">
          {detail.sections.map((section, index) => (
            <section key={section.title} id={`section-${index + 1}`} className="case-chapter" aria-labelledby={`chapter-${index + 1}`}>
              <p className="studio-label text-accent">{String(index + 1).padStart(2, "0")}</p>
              <h2 id={`chapter-${index + 1}`}>{section.title}</h2>
              <p>{section.body}</p>
            </section>
          ))}
          <section id="features" className="case-chapter case-features" aria-labelledby="features-title">
            <p className="studio-label text-accent">{detail.featureEyebrow ?? "Core product"}</p>
            <h2 id="features-title">{detail.featureHeadline ?? "Key features"}</h2>
            {detail.features.map((feature) => <div key={feature.title}><h3>{feature.title}</h3><p>{feature.body}</p></div>)}
          </section>
          <section id="process" className="case-chapter" aria-labelledby="process-title">
            <p className="studio-label text-accent">From idea to implementation</p>
            <h2 id="process-title">Process</h2>
            <ol className="case-process">
              {detail.process.map((step) => <li key={step.label}><h3>{step.label}</h3><p>{step.body}</p></li>)}
            </ol>
          </section>
        </div>
      </div>
      <nav aria-label="Continue exploring projects" className="case-next">
        <div className="case-next-heading"><h2>Keep exploring<span className="text-accent">.</span></h2><Link href="/#contact" className="studio-text-link">Start a conversation <ArrowRight size={16} aria-hidden /></Link></div>
        <div className="case-next-links">
          {previousProject && <Link href={`/projects/${previousProject.id}`}><span className="studio-label"><ArrowLeft size={14} aria-hidden /> Previous project</span><strong>{previousProject.title}</strong></Link>}
          {nextProject && <Link href={`/projects/${nextProject.id}`}><span className="studio-label">Next project <ArrowRight size={14} aria-hidden /></span><strong>{nextProject.title}</strong></Link>}
        </div>
      </nav>
    </article>
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
