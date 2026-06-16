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
    id: "iterra",
    title: "Iterra",
    role: "Product Engineer · Self-initiated MVP",
    period: "2026",
    description:
      "A collaborative travel planning web app that brings itinerary, budget, split-cost calculation, member collaboration, and trip review into one mobile-first workspace.",
    tech: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Framer Motion",
      "Recharts",
    ],
    outcome:
      "Built as a mobile-first MVP to reduce friction in group travel planning.",
    type: "Self-initiated",
    featured: true,
    links: {
      repo: "https://github.com/carizsm/Iterra-Project.git",
    },
    image: {
      src: "/projects/iterra.svg",
      alt: "Iterra collaborative travel planning app cover artwork",
    },
    detail: {
      eyebrow: "Self-initiated MVP / Travel planning",
      headline:
        "Planning a group trip should feel exciting, not chaotic.",
      summary:
        "Iterra was built as a collaborative workspace for itinerary planning, budgeting, split-cost calculation, member decisions, and trip review. The product direction came from a simple pain point: group travel often breaks down because plans, money, and decisions live in too many separate chats and spreadsheets.",
      featureEyebrow: "Product scope",
      featureHeadline:
        "One calm workspace for planning, money, and group decisions.",
      metrics: [
        {
          value: "MVP",
          label:
            "built as a self-initiated product prototype for end-to-end planning flows",
        },
        {
          value: "6 tools",
          label:
            "itinerary, budget, expenses, split costs, members, and trip review in one flow",
        },
        {
          value: "Mobile",
          label:
            "interface direction optimized for travel planning on smaller screens",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Group trips often become messy because the plan is split across chat threads, notes, payment screenshots, and individual assumptions. Iterra frames travel planning as a shared workspace rather than a private checklist.",
        },
        {
          title: "Solution",
          body:
            "The MVP combines itinerary planning, budget visibility, expense tracking, split-cost calculation, and collaborative member decisions. The goal is to make the next action clear for every person in the trip.",
        },
        {
          title: "My Role",
          body:
            "I owned the product direction and implementation, translating the planning problem into a mobile-first interface, data model, demo mode, and working web app built with a modern Next.js stack.",
        },
        {
          title: "Design Direction",
          body:
            "The visual system uses a calm warm-earthy, premium minimalist tone so trip planning feels organized and inviting instead of administrative.",
        },
      ],
      features: [
        {
          title: "Shared Itinerary",
          body:
            "Keeps trip activities and planning context in one place so members can understand the schedule quickly.",
        },
        {
          title: "Budget & Split Costs",
          body:
            "Connects expenses and cost sharing so the financial side of a trip is visible instead of scattered.",
        },
        {
          title: "Member Collaboration",
          body:
            "Frames decisions around the group, helping plans move forward without relying on one person to coordinate everything manually.",
        },
      ],
      process: [
        {
          label: "Frame",
          body:
            "Defined the core friction in group travel planning and grouped the product around plan, money, and people.",
        },
        {
          label: "Build",
          body:
            "Implemented the MVP with Next.js, TypeScript, Tailwind CSS, Supabase, Framer Motion, and Recharts.",
        },
        {
          label: "Polish",
          body:
            "Added demo-mode support and refined the interface to make the product easier to present in a portfolio context.",
        },
      ],
      media: [
        {
          src: "/projects/iterra.svg",
          alt: "Iterra collaborative travel planning app cover artwork",
          caption: "Collaborative travel planning MVP",
        },
      ],
    },
  },
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
    detail: {
      eyebrow: "Humic Engineering / Class-lab project",
      headline:
        "A backend foundation for AI-assisted skin lesion screening, built around reliable API and data flow.",
      summary:
        "This project connected a skin lesion classification model with a backend service that could receive prediction requests, manage structured records, and return model results through a clearer REST API contract. My focus was the server-side architecture, database structure, and model integration path.",
      featureEyebrow: "Backend scope",
      featureHeadline:
        "Model integration, records, and API behavior kept separated.",
      metrics: [
        {
          value: "REST",
          label:
            "API style used to expose prediction and supporting service flows",
        },
        {
          value: "3 layers",
          label:
            "server routes, database schema, and AI model integration organized as separate concerns",
        },
        {
          value: "Feb-May",
          label: "2025 project window with the Humic Engineering team",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "A clinical-adjacent AI feature needs more than a model output. The service layer has to accept inputs predictably, preserve useful records, and make the system understandable enough for the rest of the product team to build around it.",
        },
        {
          title: "Backend Direction",
          body:
            "I structured the backend around clear REST endpoints, database entities, and a model integration boundary. That kept API behavior separate from storage concerns and made the classifier easier to connect, test, and replace if the model changed.",
        },
        {
          title: "My Role",
          body:
            "As backend developer, I worked on the API design, database schema, and server-side integration with the AI model. The goal was to make the technical plumbing reliable enough for teammates to consume from the interface layer.",
        },
        {
          title: "Reliability Considerations",
          body:
            "The implementation prioritized predictable request and response shapes, traceable records, and a maintainable architecture because model-backed health products become risky when backend behavior is ambiguous.",
        },
      ],
      features: [
        {
          title: "Prediction API",
          body:
            "Receives classification requests and returns model-backed results through a backend contract designed for frontend consumption.",
        },
        {
          title: "Structured Data Model",
          body:
            "Defines storage around the entities needed to keep prediction records and supporting data organized.",
        },
        {
          title: "Model Integration Boundary",
          body:
            "Keeps AI inference separate from route and database logic, so the backend stays easier to debug and evolve.",
        },
      ],
      process: [
        {
          label: "Architecture",
          body:
            "Mapped the service into API routes, database responsibilities, and model interaction points before implementation.",
        },
        {
          label: "Implementation",
          body:
            "Built the backend flow that receives requests, calls the model integration layer, and prepares response data for the client.",
        },
        {
          label: "Team Handoff",
          body:
            "Kept API behavior and data structure explicit so design and frontend work could continue without relying on backend assumptions.",
        },
      ],
      media: [
        {
          src: "/projects/skin-cancer.svg",
          alt: "API architecture diagram for the skin cancer detection service",
          caption: "Backend and AI integration overview",
        },
      ],
    },
  },
  {
    id: "kakilima",
    title: "Kakilima",
    role: "Product Concept Lead · Self-initiated",
    period: "2026",
    description:
      "A real-time tracking platform concept for mobile street vendors, designed to make nearby sellers easier to discover while giving vendors lightweight visibility tools.",
    tech: ["Product strategy", "Real-time maps", "Vendor discovery", "Mobile UX"],
    type: "Self-initiated",
    image: {
      src: "/projects/kakilima.svg",
      alt: "Kakilima street vendor tracking app cover artwork",
    },
    detail: {
      eyebrow: "Self-initiated concept / Local economy",
      headline:
        "Street vendors are everywhere in Indonesia, but often invisible when buyers need them.",
      summary:
        "Kakilima explores real-time tracking and simple seller tools for mobile street vendors who are not well served by mainstream food delivery platforms. The concept focuses on accessibility, vendor visibility, local route insights, and community-level discovery.",
      featureEyebrow: "Product opportunity",
      featureHeadline:
        "Location-aware discovery for sellers who move through the city.",
      metrics: [
        {
          value: "Local",
          label:
            "focused on mobile street vendors and neighborhood-level discovery",
        },
        {
          value: "Real-time",
          label:
            "core interaction built around live vendor location and route visibility",
        },
        {
          value: "Concept",
          label:
            "framed as an early product idea for accessibility and local economic activity",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Mobile street vendors are part of everyday Indonesian life, but customers often miss them because their location changes and discovery still depends on luck, memory, or word of mouth.",
        },
        {
          title: "Solution",
          body:
            "Kakilima proposes a map-based product where nearby customers can find vendors in real time, while sellers get a simple way to show availability, route patterns, and community events.",
        },
        {
          title: "My Role",
          body:
            "I framed the product opportunity, target users, feature direction, and value proposition around a local problem that blends mobility, commerce, and accessibility.",
        },
        {
          title: "Why It Matters",
          body:
            "The project is less about copying delivery apps and more about designing for sellers whose business model depends on movement, proximity, and informal community trust.",
        },
      ],
      features: [
        {
          title: "Live Vendor Location",
          body:
            "Helps customers discover mobile sellers nearby instead of waiting for chance encounters.",
        },
        {
          title: "Seller Visibility Tools",
          body:
            "Gives vendors a lightweight presence without forcing them into a heavy operational platform.",
        },
        {
          title: "Community Route Insights",
          body:
            "Uses local movement patterns and events to make vendor discovery more useful for neighborhoods.",
        },
      ],
      process: [
        {
          label: "Observe",
          body:
            "Started from the mismatch between how often street vendors move and how hard they are to find at the right moment.",
        },
        {
          label: "Frame",
          body:
            "Defined customers, vendors, route visibility, and subscription-based discovery as the first product pillars.",
        },
        {
          label: "Pitch",
          body:
            "Turned the idea into a portfolio-ready product concept with a clear problem, audience, and social-economic angle.",
        },
      ],
      media: [
        {
          src: "/projects/kakilima.svg",
          alt: "Kakilima street vendor tracking app cover artwork",
          caption: "Real-time street vendor discovery concept",
        },
      ],
    },
  },
  {
    id: "the-goat",
    title: "The Goat",
    role: "Communicator & Product Translator · Community Service",
    period: "Dec 2025",
    description:
      "A standalone automated food dispenser concept for small-scale goat farmers in Margamukti Village, developed through a Telkom University and Universiti Teknologi PETRONAS community service program.",
    tech: ["IoT concept", "Needs translation", "Field communication", "Social impact"],
    type: "Real-world deployment",
    image: {
      src: "/projects/the-goat.svg",
      alt: "The Goat automated feeder project cover artwork",
    },
    detail: {
      eyebrow: "Community service / Margamukti Village",
      headline:
        "Good technology starts by listening before building.",
      summary:
        "The Goat came from an international community service program between Telkom University and Universiti Teknologi PETRONAS in Margamukti Village. My role was to help translate farmer needs into clearer project requirements and communicate the proposed automated feeding solution across English and Indonesian discussions.",
      featureEyebrow: "Community role",
      featureHeadline:
        "Turning field needs into a simple technology direction.",
      metrics: [
        {
          value: "Village",
          label:
            "field context focused on small-scale goat farming in Margamukti",
        },
        {
          value: "Bridge",
          label:
            "communication role across local needs, team discussion, and presentation",
        },
        {
          value: "1 day",
          label:
            "community service engagement documented in the Academy portfolio",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Small-scale farmers can face repetitive feeding routines and resource constraints that are easy to overlook from a purely technical perspective. The project needed to begin with local context rather than a ready-made gadget idea.",
        },
        {
          title: "Solution Direction",
          body:
            "The proposed system was a standalone automated food dispenser for goats, framed as a simple intervention that could support feeding routines without demanding complex digital infrastructure.",
        },
        {
          title: "My Role",
          body:
            "I served as the communication bridge: listening to local farmer needs, translating them into project requirements, facilitating English-Indonesian discussions, and presenting the solution story.",
        },
        {
          title: "Learning",
          body:
            "The strongest takeaway was that useful technology depends on trust, language, and context as much as hardware. For social-impact work, the first design skill is listening carefully.",
        },
      ],
      features: [
        {
          title: "Automated Feeding Concept",
          body:
            "Explores a simple standalone device that can support repeated feeding routines for small-scale farmers.",
        },
        {
          title: "Needs Translation",
          body:
            "Turns field conversations into clearer requirements so the technical proposal stays grounded in real conditions.",
        },
        {
          title: "Cross-Cultural Communication",
          body:
            "Connects local Indonesian context with an international student team through facilitation and presentation.",
        },
      ],
      process: [
        {
          label: "Listen",
          body:
            "Gathered local context from farmer conversations and observed what kind of support would be practical.",
        },
        {
          label: "Translate",
          body:
            "Converted needs into product requirements and helped align the team around a simple automated feeding direction.",
        },
        {
          label: "Present",
          body:
            "Communicated the solution in a way that connected technical intent with community relevance.",
        },
      ],
      media: [
        {
          src: "/projects/the-goat.svg",
          alt: "The Goat automated feeder project cover artwork",
          caption: "Community service product concept",
        },
      ],
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
    detail: {
      eyebrow: "Class project / Product design",
      headline:
        "A parent-facing companion app concept designed for quick, forgiving use during busy family routines.",
      summary:
        "Edu Parent focuses on helping parents access parenting knowledge and track child activities without making the app feel like another chore. The design direction emphasized calm information hierarchy, one-handed mobile flows, and simple tracking interactions.",
      featureEyebrow: "Design scope",
      featureHeadline:
        "Helpful guidance and child activity tracking in a low-friction mobile flow.",
      metrics: [
        {
          value: "Mobile",
          label:
            "primary design context optimized for parent use in short sessions",
        },
        {
          value: "Figma",
          label:
            "main tool for interface exploration, prototyping, and handoff",
        },
        {
          value: "Nov-Jan",
          label: "2024-2025 design window for the class project",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Parents often need quick answers and a lightweight way to monitor child routines, but many parenting products overload the screen with articles, forms, or rigid tracking flows.",
        },
        {
          title: "Design Direction",
          body:
            "The interface was shaped around fast scanning, large touch targets, clear labels, and gentle visual hierarchy. The app should work when the user only has a few seconds of attention.",
        },
        {
          title: "My Role",
          body:
            "I worked as UI/UX designer on the team, translating the product idea into mobile screens, user flows, visual hierarchy, and prototype interactions that could explain the experience clearly.",
        },
        {
          title: "Experience Principle",
          body:
            "The product tone avoids guilt-heavy tracking. It frames activity records and parenting knowledge as support, not judgement, so parents can return without feeling punished by the interface.",
        },
      ],
      features: [
        {
          title: "Parenting Knowledge Hub",
          body:
            "Organizes practical information so parents can find guidance without digging through a dense article feed.",
        },
        {
          title: "Child Activity Tracking",
          body:
            "Supports routine logging with simple inputs that fit into short, repeated parent workflows.",
        },
        {
          title: "Forgiving Mobile Flow",
          body:
            "Uses clear navigation, readable spacing, and direct actions so the app remains usable during interrupted moments.",
        },
      ],
      process: [
        {
          label: "Discovery",
          body:
            "Clarified the parent use case, key content needs, and moments where tracking should feel fast instead of administrative.",
        },
        {
          label: "Wireframe",
          body:
            "Mapped the main screens and navigation flow before refining visual details and interaction states in Figma.",
        },
        {
          label: "Prototype",
          body:
            "Built a clickable prototype to communicate onboarding, knowledge access, and activity tracking behavior to the team.",
        },
      ],
      media: [
        {
          src: "/projects/edu-parent.svg",
          alt: "Edu Parent app onboarding and tracking screens",
          caption: "Mobile app flow overview",
        },
      ],
    },
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
    detail: {
      eyebrow: "SMA Negeri 1 Margahayu / IoT deployment",
      headline:
        "An IoT lamp control project built for a real school environment, focused on reducing wasted electricity.",
      summary:
        "Smart Lamp was a pragmatic hardware and connectivity project deployed at SMA Negeri 1 Margahayu. The work connected lamp control, embedded logic, and network communication so lighting could be managed more intentionally in classrooms and school spaces.",
      featureEyebrow: "Deployment scope",
      featureHeadline:
        "Embedded control, connectivity, and real-building constraints.",
      metrics: [
        {
          value: "School",
          label: "real deployment context at SMA Negeri 1 Margahayu",
        },
        {
          value: "IoT",
          label:
            "hardware, embedded logic, and network integration combined in one prototype",
        },
        {
          value: "Sep-Jan",
          label: "2024-2025 build and field testing period",
        },
      ],
      sections: [
        {
          title: "Problem",
          body:
            "Lighting in shared school spaces can stay on longer than needed because control depends on manual habits. The project explored how a connected lamp system could reduce that waste with a small, practical intervention.",
        },
        {
          title: "System Direction",
          body:
            "The prototype combined lamp hardware, embedded control, and network connectivity. The goal was not only to make the lamp switchable, but to make the system stable enough to test in an actual school setting.",
        },
        {
          title: "My Role",
          body:
            "As IoT developer, I contributed to the hardware and embedded side of the system, including control behavior, connectivity considerations, and field testing with the team.",
        },
        {
          title: "Deployment Learning",
          body:
            "A real building adds constraints that classroom prototypes do not expose: placement, connectivity, maintenance, and how easily people can understand and trust the system.",
        },
      ],
      features: [
        {
          title: "Connected Lamp Control",
          body:
            "Uses IoT connectivity to support more intentional lamp operation instead of relying only on manual switching habits.",
        },
        {
          title: "Embedded Control Logic",
          body:
            "Handles device behavior close to the hardware so the prototype can respond consistently during testing.",
        },
        {
          title: "Field-Tested Prototype",
          body:
            "Designed and tested in the context of a public high school, where reliability and clarity matter more than polished lab demos.",
        },
      ],
      process: [
        {
          label: "Build",
          body:
            "Assembled the hardware and embedded control flow needed for the connected lamp prototype.",
        },
        {
          label: "Connect",
          body:
            "Integrated network communication so the lamp behavior could be managed as part of an IoT system.",
        },
        {
          label: "Deploy",
          body:
            "Tested the prototype in the school environment and learned from the practical constraints of operating in a real space.",
        },
      ],
      media: [
        {
          src: "/projects/smart-lamp.svg",
          alt: "Smart Lamp prototype installed in a classroom",
          caption: "School deployment concept",
        },
      ],
    },
    image: {
      src: "/projects/smart-lamp.svg",
      alt: "Smart Lamp prototype installed in a classroom",
    },
  },
];
