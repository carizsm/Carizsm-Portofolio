import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((item) => item.id === id);

  if (!project) notFound();

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

function TemplateBlock({ title, hint }: { title: string; hint: string }) {
  return (
    <article className="rounded-2xl border border-border bg-bg px-4 py-4 sm:px-5">
      <h2 className="serif text-2xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-fg-muted">{hint}</p>
    </article>
  );
}
