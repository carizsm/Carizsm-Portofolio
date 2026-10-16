import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { IterraScene } from "./IterraScene";
import { WorkPreview } from "./WorkPreview";
import { Reveal } from "./Reveal";
import { ScrollScene } from "./ScrollScene";
import { projects } from "@/content/projects";
import { researchFlow } from "@/content/portfolio";
import { motionTokens } from "@/lib/motion-tokens";

export function Projects() {
  const research = projects.find(({ id }) => id === "adaptive-pomodoro")!;
  return <section id="work" className="portfolio-work" aria-labelledby="work-title">
    <header className="portfolio-shell story-work-label"><h2 id="work-title" className="eyebrow">01 / Selected work</h2><span className="eyebrow">Problem → decision → build<ArrowDown size={14} aria-hidden /></span></header>
    <IterraScene />
    <article id="work-adaptive-pomodoro" className="research-project story-research" aria-labelledby="research-title">
      <div className="portfolio-shell">
        <header className="story-research-heading">
          <p className="eyebrow">02 / From products to experiments</p>
          <Reveal><h3 id="research-title">Can a timer respond<br /><em>to estimated focus?</em></h3></Reveal>
          <p>Alongside product work, I explored this question in my thesis.</p>
        </header>
        <ol className="story-research-flow" aria-label="Adaptive Pomodoro prototype workflow">
          {researchFlow.map((step, index) => <li key={step.title}><Reveal delay={index * motionTokens.duration.stagger}><span className="eyebrow">0{index + 1}</span><strong>{step.title}</strong><p>{step.body}</p></Reveal></li>)}
        </ol>
        <div className="research-layout story-research-layout">
          <ScrollScene className="research-evidence"><WorkPreview project={research} /></ScrollScene>
          <Reveal className="research-copy">
            <p className="eyebrow">Adaptive Pomodoro / Thesis prototype</p>
            <h4>Build the loop.<br /><em>Inspect the output.</em></h4>
            <p>I connected webcam-derived features, a classifier, and a timer state machine, then recorded predictions, transitions, and processing latency.</p>
            <p className="research-limitation">These are recorded model estimates. They do not establish whether a person was actually focused.</p>
            <Link href="/projects/adaptive-pomodoro" className="portfolio-link">Experiment & findings<ArrowUpRight size={18} aria-hidden /></Link>
          </Reveal>
        </div>
        <div className="story-team-handoff"><span className="eyebrow">Next / Beyond independent projects</span><a href="#experience">Work experience<ArrowDown size={20} aria-hidden /></a></div>
      </div>
    </article>
  </section>;
}
