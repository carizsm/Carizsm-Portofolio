import { experiences } from "@/content/experience";
import { SectionHead, SectionShell } from "./Section";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <SectionShell id="experience" className="!pt-8 sm:!pt-10">
      <SectionHead index="03" label="Experience" title="Work and leadership arcs." />
      <ol className="relative border-l border-border pl-6 sm:pl-8">
        {experiences.map((item, idx) => (
          <Reveal key={item.id} as="li" delay={idx * 0.04} className="relative mb-10">
            <span className="absolute -left-[2.05rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent sm:-left-[2.55rem]" />
            <p className="text-xs uppercase tracking-[0.16em] text-fg-subtle">{item.start} — {item.end}</p>
            <h3 className="mt-2 text-lg font-medium text-fg">{item.role}</h3>
            <p className="text-sm text-fg-muted">{item.org}</p>
            <p className="mt-3 text-fg-muted">{item.summary}</p>
          </Reveal>
        ))}
      </ol>
    </SectionShell>
  );
}
