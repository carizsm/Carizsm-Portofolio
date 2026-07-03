import { skillGroups } from "@/content/skills";
import { SectionHead, SectionShell } from "./Section";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <SectionShell id="skills" className="!pt-8 sm:!pt-10">
      <SectionHead index="04" label="Toolbox" title="Skills, grouped by craft." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => (
          <Reveal key={group.label} delay={idx * 0.04} className="rounded-2xl border border-border bg-bg-elevated/40 p-5">
            <h3 className="text-sm uppercase tracking-[0.14em] text-fg-subtle">{group.label}</h3>
            <ul className="mt-3 space-y-2 text-fg">
              {group.items.map((item) => (
                <li key={item.name} className="flex items-center justify-between gap-3 text-sm">
                  <span>{item.name}</span>
                  <span className="max-w-36 text-right text-xs leading-snug text-fg-subtle">
                    {item.detail ?? `L${item.level}`}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
