import { personal } from "@/content/personal";
import { SectionShell } from "./Section";

export function Contact() {
  return (
    <SectionShell id="contact" className="!pt-12">
      <footer className="rounded-2xl border border-border bg-bg-elevated/30 p-6 sm:p-8">
        <p className="serif text-3xl text-fg sm:text-4xl">Let&apos;s build something meaningful.</p>
        <p className="mt-3 max-w-xl text-fg-muted">I&apos;m open to collaborations, internships, and conversations around product, iOS, and thoughtful software.</p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a className="inline-flex min-h-11 items-center rounded-full bg-accent px-5 py-2 font-medium text-accent-fg transition-colors hover:bg-accent-hover" href={`mailto:${personal.email}`}>Email me</a>
          <a className="inline-flex min-h-11 items-center rounded-full border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent" href={personal.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a className="inline-flex min-h-11 items-center rounded-full border border-border px-4 py-2 transition-colors hover:border-accent hover:text-accent" href={personal.links.github} target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </footer>
    </SectionShell>
  );
}
