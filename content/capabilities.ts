export const capabilities = [
  {
    id: "interfaces", label: "Build interfaces", projectId: "iterra",
    heading: "A shared trip, from plan to payment.",
    body: "I owned Iterra’s product direction and implementation: a mobile-first workspace for itinerary planning, budgets, shared expenses, and member decisions.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    observation: "Genuine app captures with sample data. Switch views to inspect the workspace and shared-cost flow.",
  },
  {
    id: "systems", label: "Connect systems", projectId: "skin-cancer-detection",
    heading: "An interface is only part of the system.",
    body: "For the Skin Cancer Detection project, my backend work connected the application, an AI service, and structured data through APIs. This workflow explains that public project’s integration scope.",
    tools: ["REST API", "AI model integration", "Database design"],
    observation: "An explanatory workflow. It makes no claim about clinical accuracy.",
  },
  {
    id: "experiments", label: "Run experiments", projectId: "adaptive-pomodoro",
    heading: "Measure the behavior, then question it.",
    body: "I built an adaptive Pomodoro prototype and recorded predictions, state changes, latency, and resource use to evaluate how the system behaved.",
    tools: ["MediaPipe", "MLP classifier", "Evaluation logs"],
    observation: "Recorded output from an evaluation session. A probability plot shows the model’s behavior; it does not establish that a person was actually focused.",
  },
] as const;

export const integrationSteps = [
  { label: "Application", title: "Define the exchange", body: "Translate application needs into an API request and a response the interface can use." },
  { label: "Service", title: "Connect the AI service", body: "Coordinate the service call and return its output through the application’s backend." },
  { label: "Data", title: "Structure the information", body: "Model the application data and its relationships so the integration fits the wider system." },
] as const;
