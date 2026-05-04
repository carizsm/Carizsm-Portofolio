import { SectionHead, SectionShell } from "./Section";
import { Reveal } from "./Reveal";
import { stats } from "@/content/stats";
import { personal } from "@/content/personal";

export function About() {
  return (
    <SectionShell id="about">
      <SectionHead
        index="01"
        label="About"
        title={
          <>
            A short story about how
            <br />
            <span className="italic text-fg-muted">design, code, and people</span>{" "}
            keep ending up in the same room.
          </>
        }
      />

      <div className="grid gap-12 sm:grid-cols-12 sm:gap-12">
        <Reveal className="sm:col-span-7">
          <p className="text-pretty text-lg leading-relaxed text-fg sm:text-xl">
            {personal.about}
          </p>
          <p className="mt-6 text-pretty text-base leading-relaxed text-fg-muted sm:text-lg">
            I&apos;m happiest when the problem is fuzzy at the edges — where an
            interface decision changes a business model, or a tiny ML signal
            changes how a tool feels. I like writing code that ships, designs
            that respect the user&apos;s attention, and teams where people grow
            on the way.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 sm:col-span-5">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={0.05 + i * 0.05}
              className="group relative flex flex-col gap-1.5 rounded-2xl border border-border bg-bg-elevated/40 p-5 backdrop-blur-sm transition-colors hover:border-border-strong"
            >
              <span className="serif text-4xl font-normal leading-none tracking-tightish text-fg sm:text-5xl">
                {s.value}
              </span>
              <span className="mt-2 text-sm font-medium text-fg">
                {s.label}
              </span>
              {s.caption && (
                <span className="text-xs text-fg-subtle">{s.caption}</span>
              )}
              <span
                aria-hidden
                className="absolute right-4 top-4 h-1.5 w-1.5 rounded-full bg-accent/60 transition-all group-hover:bg-accent group-hover:shadow-[0_0_0_4px_var(--color-accent-soft)]"
              />
            </Reveal>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
