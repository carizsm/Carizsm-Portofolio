"use client";

import { useState } from "react";
import { skillGroups, type SkillLevel } from "@/content/skills";
import { SectionHead, SectionShell } from "./Section";
import { Reveal } from "./Reveal";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Info, Sparkles } from "lucide-react";

export function Skills() {
  const [selectedLevel, setSelectedLevel] = useState<SkillLevel | "All">("All");
  const [hoveredSkill, setHoveredSkill] = useState<{ name: string; level: SkillLevel; detail?: string } | null>(null);

  const getLevelLabel = (level: SkillLevel) => {
    switch (level) {
      case 3:
        return "L3 — Fluent & Production-ready";
      case 2:
        return "L2 — Comfortable / Active Use";
      case 1:
        return "L1 — Learning / Exploring";
      default:
        return "";
    }
  };

  const getLevelDescription = (level: SkillLevel) => {
    switch (level) {
      case 3:
        return "Can build complex architectures independently with deep architectural understanding.";
      case 2:
        return "Comfortable delivering features, working with standard workflows, and troubleshooting.";
      case 1:
        return "Actively learning, prototyping, and expanding understanding.";
      default:
        return "";
    }
  };

  return (
    <SectionShell id="skills" className="!pt-8 sm:!pt-10">
      <SectionHead index="04" label="Toolbox" title="Skills, grouped by craft." />

      {/* Filter bar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-fg-muted">
          Hover or tap a skill to see proficiency details. Filter by comfort level below:
        </p>

        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedLevel("All")}
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
              selectedLevel === "All"
                ? "bg-accent border-accent text-accent-fg shadow-[0_4px_12px_color-mix(in_oklch,var(--color-accent)_20%,transparent)]"
                : "bg-bg-elevated/40 border-border text-fg-muted hover:border-border-strong hover:text-fg"
            )}
          >
            All
          </button>
          {([3, 2, 1] as SkillLevel[]).map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setSelectedLevel(level)}
              className={cn(
                "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent",
                selectedLevel === level
                  ? "bg-accent border-accent text-accent-fg shadow-[0_4px_12px_color-mix(in_oklch,var(--color-accent)_20%,transparent)]"
                  : "bg-bg-elevated/40 border-border text-fg-muted hover:border-border-strong hover:text-fg"
              )}
            >
              L{level} — {level === 3 ? "Fluent" : level === 2 ? "Comfortable" : "Learning"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, idx) => {
          // Check if group has items matching the selected level
          const hasMatchingItems = group.items.some(
            (item) => selectedLevel === "All" || item.level === selectedLevel
          );

          if (!hasMatchingItems) return null;

          return (
            <Reveal
              key={group.label}
              delay={idx * 0.04}
              className="rounded-2xl border border-border bg-bg-elevated/40 p-5 transition-all duration-300 hover:border-border-strong"
            >
              <h3 className="text-sm uppercase tracking-[0.14em] text-fg-subtle border-b border-border/60 pb-2 mb-3">
                {group.label}
              </h3>
              <ul className="space-y-3 text-fg">
                {group.items.map((item) => {
                  const isFiltered = selectedLevel !== "All" && item.level !== selectedLevel;
                  return (
                    <motion.li
                      key={item.name}
                      layout="position"
                      onMouseEnter={() => setHoveredSkill(item)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => setHoveredSkill(hoveredSkill?.name === item.name ? null : item)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between gap-3 rounded-lg p-1.5 -mx-1.5 text-sm transition-all duration-300 hover:bg-bg-elevated",
                        isFiltered && "opacity-25"
                      )}
                    >
                      <span className="font-medium inline-flex items-center gap-1.5">
                        {item.name}
                        {item.level === 3 && (
                          <Sparkles className="h-3 w-3 text-accent animate-pulse" />
                        )}
                      </span>

                      <div className="flex items-center gap-2">
                        {item.detail ? (
                          <span className="text-xs text-accent bg-accent-soft/40 border border-accent/20 rounded-full px-2 py-0.5">
                            {item.detail}
                          </span>
                        ) : (
                          <div className="flex gap-1" title={getLevelLabel(item.level)}>
                            {([1, 2, 3] as const).map((dotVal) => (
                              <span
                                key={dotVal}
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full transition-all duration-300",
                                  dotVal <= item.level
                                    ? item.level === 3
                                      ? "bg-accent scale-110"
                                      : "bg-fg-muted"
                                    : "bg-border-strong"
                                )}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </Reveal>
          );
        })}
      </div>

      {/* Info Popover / Detail Indicator Panel */}
      <div className="mt-6">
        <AnimatePresence mode="wait">
          {hoveredSkill ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass-panel flex flex-col gap-2 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between border border-accent/20 bg-accent-soft/10"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-fg text-sm">{hoveredSkill.name}</h4>
                  <p className="text-xs text-accent">
                    {hoveredSkill.detail ? hoveredSkill.detail : getLevelLabel(hoveredSkill.level)}
                  </p>
                </div>
              </div>
              <p className="max-w-md text-xs leading-relaxed text-fg-muted sm:text-right">
                {hoveredSkill.detail ? "Personal language efficiency level" : getLevelDescription(hoveredSkill.level)}
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 rounded-2xl border border-dashed border-border p-4 text-xs text-fg-subtle"
            >
              <Info className="h-4 w-4 text-accent shrink-0" />
              <span>
                Comfort level guide: <strong>L3</strong> (Fluent, idiomatic use & deep frameworks expertise),{" "}
                <strong>L2</strong> (Comfortable shipping complex products),{" "}
                <strong>L1</strong> (Active exploration or peripheral use).
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionShell>
  );
}

