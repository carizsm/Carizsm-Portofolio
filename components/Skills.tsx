"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { skillGroups, type SkillLevel } from "@/content/skills";
import { SectionHead, SectionShell } from "./Section";

const levels: Record<SkillLevel, string> = { 3: "Fluent", 2: "Comfortable", 1: "Learning" };

export function Skills() {
  const reduceMotion = useReducedMotion();
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | "All">("All");
  const groups = skillGroups.map((group) => ({
    ...group,
    items: group.items.filter((item) => selectedLevel === "All" || item.level === selectedLevel),
  })).filter((group) => group.items.length > 0);
  const total = skillGroups.reduce((sum, group) => sum + group.items.length, 0);
  const visible = groups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <SectionShell id="skills" className="!pt-8 sm:!pt-10">
      <SectionHead index="04" label="Toolbox" title="Tools I reach for." />
      <div className="studio-skills-toolbar">
        <p>Comfort levels are a self-assessment, not a finish line.</p>
        <div role="group" aria-label="Filter skills by comfort level" className="studio-skill-filters">
          {(["All", 3, 2, 1] as const).map((level) => (
            <button key={level} type="button" aria-pressed={selectedLevel === level} onClick={() => setSelectedLevel(level)}>
              {level === "All" ? "All" : levels[level]}
            </button>
          ))}
        </div>
      </div>
      <p className="studio-label studio-skill-count" aria-live="polite" aria-atomic="true">{visible} of {total} skills</p>
      <div className="studio-skill-groups">
        {groups.map((group) => (
          <motion.div key={group.label} layout={reduceMotion ? false : "position"} initial={false} transition={{ duration: reduceMotion ? 0 : 0.22 }}>
            <h3 className="studio-label">{group.label}</h3>
            <ul>
              {group.items.map((item) => (
                <motion.li layout={reduceMotion ? false : "position"} initial={false} transition={{ duration: reduceMotion ? 0 : 0.22 }} key={item.name}><span>{item.name}</span><span>{item.detail ?? levels[item.level]}</span></motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  );
}
