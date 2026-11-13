import { ProjectIndex } from "./ProjectIndex";
import { Skills } from "./Skills";
import { Reveal } from "./Reveal";
import { motionTokens } from "@/lib/motion-tokens";

export function Explore() {
  return <section id="explore" className="story-explore portfolio-shell" aria-labelledby="explore-title">
    <Reveal as="header"><p className="eyebrow">05 / Explore</p><h2 id="explore-title">Keep <em>exploring.</em></h2></Reveal>
    <Reveal delay={motionTokens.duration.stagger}><ProjectIndex /><Skills /></Reveal>
  </section>;
}
