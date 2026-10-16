import { awards, education } from "@/content/awards";
import { Reveal } from "./Reveal";

export function About() {
  return <section id="about" className="portfolio-about portfolio-shell" aria-labelledby="about-title">
    <Reveal as="header"><p className="eyebrow">04 / Personal context</p><h2 id="about-title">A little<br /><em>closer.</em></h2></Reveal>
    <Reveal className="about-context"><p className="about-lead">Based in Bandung.</p><p>Outside software, I have a soft spot for astronomy.</p><div className="education-note"><span className="eyebrow">Education</span><strong>Information Technology · {education.org}</strong><span>GPA {education.gpa}</span></div></Reveal>
    <details className="recognition-disclosure"><summary>Recognition<span>{awards.length} milestones</span></summary><ul>{awards.map(award => <li key={award.id}><span className="eyebrow">{award.year}</span><div><strong>{award.title}</strong><p>{award.org}</p>{award.description && <p>{award.description}</p>}</div></li>)}</ul></details>
  </section>;
}
