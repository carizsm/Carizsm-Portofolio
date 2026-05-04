/**
 * Skills — grouped by category, with honest comfort levels.
 *
 * `level` is a self-assessment: 1 (learning) · 2 (comfortable) · 3 (fluent).
 * Used for visual emphasis only — keep it honest, not aspirational.
 *
 * To add a new skill, append to the right group's `items` array.
 * To add a new group, push a new SkillGroup with its own label and items.
 */

export type SkillLevel = 1 | 2 | 3;

export interface Skill {
  name: string;
  level: SkillLevel;
}

export interface SkillGroup {
  label: string;
  items: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    items: [
      { name: "Vue 3 / Nuxt 3", level: 3 },
      { name: "TypeScript", level: 2 },
      { name: "JavaScript", level: 3 },
      { name: "HTML / CSS", level: 3 },
      { name: "Tailwind CSS", level: 3 },
      { name: "REST integration", level: 3 },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "Laravel", level: 2 },
      { name: "REST API design", level: 2 },
      { name: "SQL / Modeling", level: 2 },
      { name: "Java", level: 2 },
    ],
  },
  {
    label: "Design",
    items: [
      { name: "Figma", level: 3 },
      { name: "UI / UX", level: 3 },
      { name: "Prototyping", level: 2 },
      { name: "User research", level: 2 },
      { name: "Design thinking", level: 2 },
    ],
  },
  {
    label: "Mobile & Platform",
    items: [
      { name: "Android (Java)", level: 2 },
      { name: "iOS / Swift", level: 1 },
      { name: "C++", level: 1 },
      { name: "IoT / Embedded", level: 2 },
      { name: "AI / LLM integration", level: 2 },
    ],
  },
  {
    label: "Leadership",
    items: [
      { name: "Product leadership", level: 2 },
      { name: "Public speaking", level: 2 },
      { name: "Mentoring", level: 3 },
      { name: "Team coordination", level: 3 },
    ],
  },
];
