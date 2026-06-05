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

export interface ProjectMedia {
  src: string;
  alt: string;
  caption: string;
  fit?: "cover" | "contain";
}

export interface ProjectDetailSection {
  title: string;
  body: string;
}

export interface ProjectDetailMetric {
  value: string;
  label: string;
}

export interface ProjectDetailFeature {
  title: string;
  body: string;
}

export interface ProjectDetailStep {
  label: string;
  body: string;
}

export interface ProjectDetail {
  eyebrow: string;
  headline: string;
  summary: string;
  certificateUrl?: string;
  featureEyebrow?: string;
  featureHeadline?: string;
  metrics: ProjectDetailMetric[];
  sections: ProjectDetailSection[];
  features: ProjectDetailFeature[];
  process: ProjectDetailStep[];
  media: ProjectMedia[];
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
  detailHref?: string;
  image?: ProjectImage;
  detail?: ProjectDetail;
}

export const projects: Project[] = [
  {
    id: "motiva",
    title: "MOTIVA",
    role: "Founder & CEO · Team of 4",
    period: "Oct 2024 – Mar 2025",
    description:
      "An AI-powered mobile concept for self-development, built around personal motivation, habit tracking, and structured progress. I led the product direction, business model, and competition pitch.",
    tech: ["AI coaching", "Habit tracking", "Product strategy", "Pitch"],
    outcome:
      "2nd Place — ADIKARA Entrepreneur Competition 2024",
    type: "Self-initiated startup",
    featured: true,
    image: {
      src: "/projects/motiva.svg",
      alt: "MOTIVA app — coaching dashboard concept",
    },
    detail: {
      eyebrow: "ADIKARA Entrepreneur Competition 2024",
      headline:
        "An AI companion for students who need structure, motivation, and a place to talk through their goals.",
      summary:
        "MOTIVA was designed as a freemium mobile app for self-development. The core idea is simple: combine a progress tracker, habit tracker, and adaptive AI chatbot so users do not only list their goals, but get nudges that feel personal and timely.",
      certificateUrl:
        "https://drive.google.com/file/d/1KLGmUL4kPKsxhiZlAcv8PIEKd-XP94DK/view?usp=sharing",
      metrics: [
        {
          value: "60%",
          label: "surveyed users lost motivation midway through a goal",
        },
        {
          value: "40%",
          label: "felt they had no reliable place to look for support",
        },
        {
          value: "18-24",
          label: "primary early segment: students and young adults",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Many productivity apps stop at reminders and task lists. The proposal focused on a more personal gap: people often know what they want to do, but lose consistency when support, feedback, and emotional context are missing.",
        },
        {
          title: "Solution",
          body:
            "MOTIVA brings goal progress, daily habits, and AI conversation into one flow. The AI coach adapts encouragement and practical suggestions around each user's goals, while trackers keep progress visible.",
        },
        {
          title: "My Role",
          body:
            "As Founder and CEO, I shaped the product vision, positioning, business model, roadmap, and pitch narrative. I also coordinated the team roles across technology, design, and marketing for the competition proposal.",
        },
        {
          title: "Business Direction",
          body:
            "The proposed model was freemium: basic goal and habit features stay accessible, while premium unlocks deeper personalization, analytics, and future AI coaching experiences.",
        },
      ],
      features: [
        {
          title: "Progress Tracker",
          body:
            "Breaks big goals into visible milestones so users can see movement, not just unfinished work.",
        },
        {
          title: "Habit Tracker",
          body:
            "Helps users build repeatable routines with small daily actions and consistency feedback.",
        },
        {
          title: "Adaptive AI Chatbot",
          body:
            "Acts as a virtual support companion that gives motivation, reminders, and suggestions based on user context.",
        },
      ],
      process: [
        {
          label: "Research",
          body:
            "Mapped motivation pain points from survey findings and framed the market around students, young adults, and self-development users.",
        },
        {
          label: "Concept",
          body:
            "Defined the feature set, positioning, PESTEL/SWOT view, team roles, and freemium business direction.",
        },
        {
          label: "Pitch",
          body:
            "Turned the product concept into a concise competition proposal and pitch story for ADIKARA 2024.",
        },
      ],
      media: [
        {
          src: "/projects/motiva-goal.svg",
          alt: "MOTIVA goal dashboard concept",
          caption: "Goal dashboard concept",
        },
        {
          src: "/projects/motiva-chat.svg",
          alt: "MOTIVA AI coaching conversation concept",
          caption: "AI coaching conversation",
        },
        {
          src: "/projects/motiva-habit.svg",
          alt: "MOTIVA habit tracker concept",
          caption: "Habit tracker concept",
        },
      ],
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
    detail: {
      eyebrow: "Final-year thesis / PomodoroNet",
      headline:
        "A real-time Pomodoro system that pauses and resumes itself based on facial-landmark focus detection.",
      summary:
        "PomodoroNet combines a desktop Pomodoro timer with MediaPipe Face Mesh and an MLP classifier trained with SMOTE-balanced data. The system samples the webcam once per second, extracts five geometric facial features, classifies focus probability, then uses timed buffers before changing the Pomodoro state.",
      featureEyebrow: "System design",
      featureHeadline:
        "Lightweight detection, buffered intervention, measurable runtime.",
      metrics: [
        {
          value: "5.84 ms",
          label:
            "average end-to-end frame latency during a 25-minute Pomodoro session, with p95 at 7.92 ms",
        },
        {
          value: "100%",
          label:
            "functional pass rate across eight controlled scenarios, each repeated three times",
        },
        {
          value: "0.708",
          label:
            "best ROC-AUC from the MLP + SMOTE model selected for system integration",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Traditional Pomodoro timers assume the user is focused for the full 25-minute interval. The research gap was to connect lightweight facial-expression recognition with a time-management system that can react when a student looks away, closes their eyes, uses a phone, or disappears from the camera.",
        },
        {
          title: "Approach",
          body:
            "The system maps facial coordinates with MediaPipe Face Mesh, then converts landmarks into five geometric features: eye aspect ratio, mouth aspect ratio, head roll, brow drop, and face length. Those values become the input for a focus classifier rather than a heavy end-to-end vision model.",
        },
        {
          title: "Model Selection",
          body:
            "I compared SVM, Random Forest, and MLP classifiers after standardization and SMOTE balancing. MLP + SMOTE was selected because it reached the strongest ROC-AUC while staying competitive on F1-score, then used a G-Mean threshold of 0.5098 for focus probability.",
        },
        {
          title: "Adaptive Timer Logic",
          body:
            "The timer does not pause from a single unfocused frame. It waits for five consecutive seconds of unfocused or no-face states before pausing, and uses a three-second recovery buffer before resuming. This keeps brief glances from interrupting the study flow.",
        },
        {
          title: "Evaluation",
          body:
            "Functional testing covered normal focus, look-away distractions, short distractions, eyes closed, phone/looking down, recovery after pause, no-face detection, and natural movement. Every scenario passed, though natural movement produced two false pauses, which became the main limitation to address next.",
        },
        {
          title: "Runtime",
          body:
            "During the 25-minute benchmark, the system averaged 4.37% CPU usage and 233.66 MB RAM, with 97.95% face-detection success and zero failed inferences. MediaPipe dominated latency at 4.20 ms, while model inference averaged only 0.41 ms.",
        },
      ],
      features: [
        {
          title: "Geometric Focus Features",
          body:
            "Extracts compact face ratios and angles from landmarks, making the detector lightweight enough for real-time desktop use.",
        },
        {
          title: "Buffered Pause/Resume Control",
          body:
            "Uses consecutive-state buffers before pausing or resuming, so a short glance away does not immediately disrupt the Pomodoro session.",
        },
        {
          title: "Frame-Level Evaluation Logs",
          body:
            "Records latency, CPU, RAM, face-detection rate, probability distribution, and scenario outcomes so the system can be evaluated quantitatively.",
        },
      ],
      process: [
        {
          label: "Dataset & Features",
          body:
            "Extracted MediaPipe landmarks from RAF-DB images, converted seven emotions into focused and unfocused labels, and generated five normalized geometric features.",
        },
        {
          label: "Model Training",
          body:
            "Standardized feature splits, applied SMOTE to the training set, compared SVM, RF, and MLP, then selected MLP + SMOTE using ROC-AUC and a G-Mean threshold.",
        },
        {
          label: "System Testing",
          body:
            "Integrated the model into a desktop Pomodoro state machine and tested latency, resource usage, and behavior across eight real-time scenarios.",
        },
      ],
      media: [
        {
          src: "/projects/adaptive-pomodoro-system.svg",
          alt: "PomodoroNet architecture and evaluation snapshot",
          caption: "PomodoroNet pipeline",
          fit: "cover",
        },
        {
          src: "/projects/adaptive-pomodoro-latency.png",
          alt: "Pipeline latency breakdown chart for Adaptive Pomodoro",
          caption: "Latency breakdown",
          fit: "contain",
        },
        {
          src: "/projects/adaptive-pomodoro-resource.png",
          alt: "CPU and RAM usage distribution charts for Adaptive Pomodoro",
          caption: "CPU and RAM distribution",
          fit: "contain",
        },
        {
          src: "/projects/adaptive-pomodoro-features.png",
          alt: "Geometric feature distribution charts for Adaptive Pomodoro",
          caption: "Geometric feature distributions",
          fit: "contain",
        },
        {
          src: "/projects/adaptive-pomodoro-probability.png",
          alt: "Model focus probability distribution chart for Adaptive Pomodoro",
          caption: "Focus probability distribution",
          fit: "contain",
        },
      ],
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
