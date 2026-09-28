import Image from "next/image";
import { ArrowRight, CalendarDays, Coins, Lightbulb, Radio, Users } from "lucide-react";
import type { StudioArtifactKind, StudioStep } from "@/content/studio";

export function StudioArtifact({ kind, step }: { kind: StudioArtifactKind; step: StudioStep }) {
  if (kind === "focus") {
    return (
      <div className="artifact-focus" data-step={step}>
        <div className="artifact-heading studio-label"><span>Observation → Model → Response</span><span>02</span></div>
        <div className="focus-paper">
          <span className="studio-label">From the research notebook</span>
          <p className="focus-paper-title">What does the model see?</p>
          <Image src="/projects/adaptive-pomodoro-probability.png" alt="Histogram of focus probabilities during the P1 session; predictions span both sides of the model’s decision threshold." width={2360} height={1280} sizes="(max-width: 768px) 90vw, 550px" />
          <span className="focus-paper-footer">Recorded model output <span>Adaptive Pomodoro / P1</span></span>
        </div>
      </div>
    );
  }

  if (kind === "lamp") {
    return (
      <div className="artifact-lamp" data-step={step}>
        <div className="artifact-heading studio-label"><span>Beyond the screen</span><span>03</span></div>
        <div className="lamp-schematic" aria-label="A simplified system: connectivity links embedded control with the classroom lamp">
          <div className="lamp-source"><Radio aria-hidden size={28} strokeWidth={1.2} /><span>Connectivity</span></div>
          <div className="lamp-connector" aria-hidden><ArrowRight size={18} /></div>
          <div className="lamp-control"><span className="studio-label">Embedded</span><strong>Control</strong></div>
          <div className="lamp-bulb"><Lightbulb aria-hidden size={72} strokeWidth={1} /><span>Classroom lamp</span></div>
        </div>
        <p className="lamp-footnote">Built for a place.<br /><span>Tested with the people in it.</span></p>
      </div>
    );
  }

  return (
    <div className="artifact-trip" data-step={step}>
      <div className="artifact-heading studio-label"><span>Iterra / The shared trip</span><span>01</span></div>
      <div className="trip-model-title">Less coordinating.<br /><span>More going.</span></div>
      <div className="trip-model" aria-label="Iterra connects three parts of a shared trip: plans, money, and people">
        <div className="trip-module"><CalendarDays aria-hidden size={24} strokeWidth={1.3} /><span className="studio-label">01 / Plan</span><strong>Where next?</strong><span>A shared itinerary.</span></div>
        <span className="trip-join" aria-hidden>+</span>
        <div className="trip-module"><Coins aria-hidden size={24} strokeWidth={1.3} /><span className="studio-label">02 / Money</span><strong>Who paid?</strong><span>Costs, made clear.</span></div>
        <span className="trip-join" aria-hidden>+</span>
        <div className="trip-module"><Users aria-hidden size={24} strokeWidth={1.3} /><span className="studio-label">03 / People</span><strong>All together.</strong><span>Decisions, shared.</span></div>
      </div>
      <div className="trip-model-footer"><span>One trip. One place to plan it.</span><ArrowRight aria-hidden size={23} strokeWidth={1.2} /></div>
    </div>
  );
}
