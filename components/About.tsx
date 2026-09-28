import { SectionHead, SectionShell } from "./Section";
import { stats } from "@/content/stats";
import { personal } from "@/content/personal";

export function About() {
  return (
    <SectionShell id="about">
      <SectionHead index="02" label="A little about me" title={<>The person<br /><span className="text-fg-muted">behind the work.</span></>} />
      <div className="studio-about-grid">
        <div>
          <p className="studio-about-lead">{personal.about}</p>
          <p className="studio-about-copy">
            I like moving between the big question and the small details:
            what someone needs, how a system works, and what it takes to
            make the two meet.
          </p>
          <dl className="studio-about-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt><dd>{stat.value}</dd>
                {stat.caption && <dd className="studio-stat-caption">{stat.caption}</dd>}
              </div>
            ))}
          </dl>
        </div>
        <aside className="practice-note" aria-labelledby="practice-note-title">
          <span className="studio-label">How I work</span>
          <h3 id="practice-note-title">Across disciplines.<br />Close to the details.</h3>
          <p>My projects span web products, applied research, and connected devices. I like being involved in both the idea and the implementation.</p>
          <a href="#work-index" className="studio-text-link">Explore the projects <span aria-hidden="true">↗</span></a>
        </aside>
      </div>
    </SectionShell>
  );
}
