import { projects, type ProjectMedia } from "./projects";

const overrides: Record<string, ProjectMedia[]> = {
  iterra: [
    { src: "/projects/captures/iterra-overview.png", alt: "Iterra demo workspace with trip budget, next activity, and members", caption: "Workspace · genuine app capture, sample data", fit: "contain" },
    { src: "/projects/captures/iterra-expenses.png", alt: "Iterra demo expense screen showing member balances and suggested repayments", caption: "Shared costs · genuine app capture, sample data", fit: "contain" },
  ],
  "adaptive-pomodoro": [
    { src: "/projects/adaptive-pomodoro-probability.png", alt: "Recorded focus probabilities from the PomodoroNet P1 evaluation", caption: "Recorded model output · P1 research artifact", fit: "contain" },
    { src: "/projects/adaptive-pomodoro-latency.png", alt: "Measured PomodoroNet processing latency breakdown", caption: "Processing latency · research artifact", fit: "contain" },
  ],
};

export function getWorkPreview(projectId: string): ProjectMedia[] {
  if (overrides[projectId]) return overrides[projectId];
  const project = projects.find(({ id }) => id === projectId);
  const media = project?.detail?.media ?? [];
  return media.map((item) => ({ ...item, caption: `${item.caption} · concept illustration` }));
}
