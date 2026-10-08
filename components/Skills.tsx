"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { skillGroups } from "@/content/skills";
import { projects } from "@/content/projects";
import { capabilities, integrationSteps } from "@/content/capabilities";
import { SectionHead, SectionShell } from "./Section";
import { WorkPreview } from "./WorkPreview";
import { motionTokens, shouldAnimate, springs } from "@/lib/motion-tokens";

export function Skills() {
  const [selectedId, setSelectedId] = useState<string>(capabilities[0].id);
  const [stepIndex, setStepIndex] = useState(0);
  const reduced = useReducedMotion();
  const selected = capabilities.find(({ id }) => id === selectedId) ?? capabilities[0];
  const project = projects.find(({ id }) => id === selected.projectId)!;

  return (
    <SectionShell id="skills" className="!pt-8 sm:!pt-10">
      <SectionHead index="04" label="Skills in practice" title="What the tools make possible." />
      <div className="capability-selectors" role="group" aria-label="Explore skills through work">
        {capabilities.map((capability, index) => <button key={capability.id} type="button" aria-pressed={selectedId === capability.id} aria-controls="capability-evidence" onClick={() => { setSelectedId(capability.id); setStepIndex(0); }}>
          <span className="studio-label">0{index + 1}</span>{capability.label}
          {selectedId === capability.id && <motion.i aria-hidden layoutId="capability-selector" transition={shouldAnimate(reduced) ? springs.snappy : { duration: 0 }} />}
        </button>)}
      </div>
      <p className="sr-only" role="status">{selected.label}: showing work from {project.title}.</p>
      <div id="capability-evidence" className="capability-evidence">
        <div className="capability-artifact">
          {selected.id !== "systems" ? <WorkPreview key={project.id} project={project} compact /> : <div className="integration-study">
            <p className="studio-label">Skin Cancer Detection / integration scope</p>
            <div className="integration-path" role="group" aria-label="Explore the integration workflow">
              {integrationSteps.map((step, index) => <div key={step.label}>
                <button type="button" aria-pressed={stepIndex === index} aria-controls="integration-note" onClick={() => setStepIndex(index)}><span>0{index + 1}</span><strong>{step.label}</strong></button>
                {index < integrationSteps.length - 1 && <ArrowRight aria-hidden size={20} />}
              </div>)}
            </div>
            <motion.div id="integration-note" key={stepIndex} className="integration-note" initial={{ opacity: 1 }} animate={{ opacity: [0.7, 1] }} transition={{ duration: motionTokens.duration.fast }} aria-live="polite" aria-atomic="true">
              <h4>{integrationSteps[stepIndex].title}</h4><p>{integrationSteps[stepIndex].body}</p>
            </motion.div>
            <span className="studio-label">Select a step to inspect its responsibility</span>
          </div>}
        </div>
        <motion.div key={selected.id} className="capability-story" initial={{ opacity: 1 }} animate={shouldAnimate(reduced) ? { y: [motionTokens.distance.small, 0] } : { y: 0 }} transition={{ duration: motionTokens.duration.normal, ease: motionTokens.easing.smooth }}>
          <p className="studio-label">In practice / {project.title}</p>
          <h3>{selected.heading}</h3><p>{selected.body}</p>
          <ul className="capability-tools" aria-label="Tools used in this work">{selected.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul>
          <p className="capability-observation">{selected.observation}</p>
          <Link className="studio-text-link" href={project.detailHref ?? `/projects/${project.id}`}>Read the case study<ArrowUpRight size={17} aria-hidden /></Link>
        </motion.div>
      </div>
      <details className="all-tools">
        <summary>Explore the full toolkit <span className="studio-label">{skillGroups.reduce((total, group) => total + group.items.length, 0)} tools & skills</span></summary>
        <div>{skillGroups.map((group) => <section key={group.label}><h3 className="studio-label">{group.label}</h3><ul>{group.items.map((item) => <li key={item.name}>{item.name}{item.detail && <small>{item.detail}</small>}</li>)}</ul></section>)}</div>
      </details>
    </SectionShell>
  );
}
