/**
 * Projects — selected work, in display order.
 *
 * To add a new project, append a Project object to the array below.
 * Required fields: id, title, role, period, description, tech, type.
 * Optional: outcome, links, image, featured.
 *
 * `featured: true` gives the project a full-bleed lead layout. Two featured
 * projects max is the suggested ceiling — beyond that the page loses rhythm.
 *
 * Example:
 * {
 *   id: "my-project",
 *   title: "My New Project",
 *   role: "Lead Developer (solo)",
 *   period: "Jan 2026 – Present",
 *   description: "One or two sentences. Lead with the user-visible outcome.",
 *   tech: ["TypeScript", "Postgres"],
 *   outcome: "10k MAU within 3 months",
 *   type: "Self-initiated",
 *   featured: false,
 *   links: { live: "https://...", repo: "https://github.com/..." },
 *   image: { src: "/projects/my-project.svg", alt: "App home screen" },
 * }
 */

export type ProjectType =
  | "Self-initiated startup"
  | "Self-initiated"
  | "Class project"
  | "Class/lab project"
  | "Real-world deployment"
  | "Research / Thesis";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  period: string;
  description: string;
  tech: string[];
  outcome?: string;
  type: ProjectType;
  featured?: boolean;
  links?: {
    live?: string;
    repo?: string;
    paper?: string;
  };
  image?: ProjectImage;
}

export const projects: Project[] = [
  {
    id: "motiva",
    title: "MOTIVA",
    role: "Founder & CEO · Team of 4",
    period: "Oct 2024 – Mar 2025",
    description:
      "An AI-powered personal coaching app that delivers personalized motivation and structured guidance to help users hit their goals. I owned product vision, business model, and pitch — taking it from a napkin idea to a working prototype in five months.",
    tech: ["Concept → Prototype", "AI / LLM", "Product strategy", "Pitch"],
    outcome:
      "2nd Place — ADIKARA Entrepreneur Competition 2024",
    type: "Self-initiated startup",
    featured: true,
    image: {
      src: "/projects/motiva.svg",
      alt: "MOTIVA app — coaching dashboard concept",
    },
  },
  {
    id: "adaptive-pomodoro",
    title: "Adaptive Pomodoro",
    role: "Researcher & Developer · Solo (Final-year Thesis)",
    period: "Sep 2025 – Present",
    description:
      "A desktop Pomodoro that adapts to your focus in real time. Uses MediaPipe Face Mesh to extract five geometric features (eye aspect ratio, mouth aspect ratio, head roll, brow, face position), feeds them through an MLP classifier trained with SMOTE balancing, and steers the timer state machine when attention drops.",
    tech: [
      "Python",
      "MediaPipe",
      "scikit-learn (MLP)",
      "Tkinter",
      "OpenCV",
    ],
    outcome:
      "Calibrated focus threshold via G-Mean on validation; logs frame-level metrics, state transitions, and system stats for evaluation.",
    type: "Research / Thesis",
    featured: true,
    image: {
      src: "/projects/adaptive-pomodoro.svg",
      alt: "Adaptive Pomodoro desktop UI — focus detection running",
    },
  },
  {
    id: "skin-cancer-detection",
    title: "Skin Cancer Detection",
    role: "Backend Developer · Team (Humic Engineering)",
    period: "Feb 2025 – May 2025",
    description:
      "Built a REST API around an AI model for skin lesion classification. Designed the database schema and server architecture with reliability in mind — the kind of plumbing a clinical-adjacent product can lean on.",
    tech: ["REST API", "AI model integration", "Database design"],
    type: "Class/lab project",
    image: {
      src: "/projects/skin-cancer.svg",
      alt: "API architecture diagram for the skin cancer detection service",
    },
  },
  {
    id: "edu-parent",
    title: "Edu Parent",
    role: "UI / UX Designer · Team",
    period: "Nov 2024 – Jan 2025",
    description:
      "Designed the UI and UX for a parenting companion app that helps parents access knowledge and track child activities. The product target is sleep-deprived parents — every flow is one-handed-friendly and forgiving.",
    tech: ["Figma", "User research", "Prototyping"],
    type: "Class project",
    image: {
      src: "/projects/edu-parent.svg",
      alt: "Edu Parent app — onboarding and tracking screens",
    },
  },
  {
    id: "smart-lamp",
    title: "Smart Lamp",
    role: "IoT Developer · Team",
    period: "Sep 2024 – Jan 2025",
    description:
      "An IoT-connected lamp system deployed at SMA Negeri 1 Margahayu to cut electricity waste. Hardware design, network connectivity, and field testing — a small, pragmatic intervention in a real building.",
    tech: ["IoT hardware", "Embedded", "Network integration"],
    outcome: "Live deployment in a public high school",
    type: "Real-world deployment",
    image: {
      src: "/projects/smart-lamp.svg",
      alt: "Smart Lamp prototype installed in a classroom",
    },
  },
];
