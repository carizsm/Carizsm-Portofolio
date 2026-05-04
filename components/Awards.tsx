import { awards } from "@/content/awards";
import { SectionHead, SectionShell } from "./Section";
import { Reveal } from "./Reveal";

export function Awards() {
  return (
    <SectionShell id="awards" className="!pt-8 sm:!pt-10">
      <SectionHead index="05" label="Recognition" title="Awards and milestones." />
      <div className="grid gap-3">
        {awards.map((award, idx) => (
          <Reveal key={award.id} delay={idx * 0.04} className="rounded-xl border border-border p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-fg">{award.title}</h3>
                <p className="text-sm text-fg-muted">{award.org}</p>
              </div>
              <span className="text-sm text-fg-subtle">{award.year}</span>
            </div>
            {award.description ? <p className="mt-2 text-sm text-fg-muted">{award.description}</p> : null}
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
