import { projects } from "./projects";

export type StudioArtifactKind = "trip" | "focus" | "lamp";
export type StudioStep = "question" | "decision" | "result";

interface StudioEntry {
  id: string;
  discipline: string;
  status: string;
  headline: string;
  artifact: StudioArtifactKind;
  caption: string;
  notes: Record<StudioStep, string>;
}

// Editorial summaries of the case studies in content/projects.ts.
const entries: StudioEntry[] = [
  {
    id: "iterra",
    discipline: "Product engineering",
    status: "Self-initiated MVP",
    headline: "The trip starts before you leave.",
    artifact: "trip",
    caption: "Product model / an illustrated guide to Iterra’s scope",
    notes: {
      question: "Why does planning a group trip mean piecing together chats, spreadsheets, and payment screenshots?",
      decision: "Bring the itinerary, shared costs, and group decisions into one mobile-first workspace. I owned the product direction and implementation.",
      result: "A working MVP with itinerary planning, budgets, expense splitting, and member collaboration. Demo mode makes the core flows explorable.",
    },
  },
  {
    id: "adaptive-pomodoro",
    discipline: "Research & software",
    status: "Thesis project",
    headline: "A timer that responds to attention.",
    artifact: "focus",
    caption: "Research artifact / P1 focus-probability plot from the existing case study",
    notes: {
      question: "A fixed timer keeps counting when attention drifts. Could a desktop tool adapt its behavior to estimated focus?",
      decision: "Connect webcam-derived facial features to a classifier and timer state machine. I built the system and logged its predictions, transitions, and resource use.",
      result: "A desktop research prototype with an evaluation trail. This plot records model probabilities in one session; estimating focus still has limits that the case study explores.",
    },
  },
  {
    id: "smart-lamp",
    discipline: "Hardware & field work",
    status: "Team project · School deployment",
    headline: "Small intervention. Real classroom.",
    artifact: "lamp",
    caption: "System sketch / simplified control and connectivity flow",
    notes: {
      question: "How could a connected lamp help a school manage lighting more intentionally, beyond the habits of manual switching?",
      decision: "Combine embedded control and connectivity, then test in a school. My contribution covered the hardware, device behavior, and field testing with the team.",
      result: "A prototype deployed at SMA Negeri 1 Margahayu. Field testing brought practical constraints into view: placement, connectivity, and maintenance.",
    },
  },
];

export const studioWorks = entries.flatMap((entry) => {
  const project = projects.find(({ id }) => id === entry.id);
  return project ? [{ ...entry, project }] : [];
});

export type StudioWork = (typeof studioWorks)[number];
