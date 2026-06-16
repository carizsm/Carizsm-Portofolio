/**
 * Experience — work + leadership history, ordered most recent first.
 *
 * To add a new entry, append an Experience object to the array.
 * Use ISO-like month strings ("Jan 2026") for `start` and `end`. End "Present"
 * is treated specially in the UI (current role marker).
 *
 * Example:
 * {
 *   id: "acme-frontend",
 *   role: "Senior Frontend Engineer",
 *   org: "Acme Corp",
 *   start: "Mar 2027",
 *   end: "Present",
 *   summary: "Lead the design system and ship the marketing site.",
 *   tags: ["Design system", "Next.js"],
 * }
 */

export interface Experience {
  id: string;
  role: string;
  org: string;
  start: string;
  end: string | "Present";
  summary: string;
  tags?: string[];
}

export const experiences: Experience[] = [
  {
    id: "ypt-frontend",
    role: "Frontend Developer",
    org: "Yayasan Pendidikan Telkom",
    start: "Jan 2026",
    end: "Present",
    summary:
      "Contribute to DIGITS and internal education platforms, building responsive interfaces that support school learning and operational workflows.",
    tags: ["Vue 3", "Nuxt 3", "REST", "Education"],
  },
  {
    id: "community-service-goat",
    role: "Communicator / Participant",
    org: "Telkom University x Universiti Teknologi PETRONAS",
    start: "Dec 2025",
    end: "Dec 2025",
    summary:
      "Translated farmer needs into requirements and presented The Goat, a standalone automated food dispenser concept for small-scale goat farmers in Margamukti Village.",
    tags: ["Community service", "Communication", "IoT"],
  },
  {
    id: "dicoding-community",
    role: "Community Builder",
    org: "Dicoding Indonesia",
    start: "Nov 2025",
    end: "May 2026",
    summary:
      "Built and led the campus-level Dicoding Community Network as a peer-learning space for students exploring technology and software development.",
    tags: ["Community", "Programs", "Peer learning"],
  },
  {
    id: "ise-research-assistant",
    role: "Research Assistant",
    org: "Information Systems Engineering Laboratory",
    start: "Jun 2025",
    end: "Dec 2025",
    summary:
      "Researched AI-assisted development workflows using c0.dev, ChatGPT, and DeepSeek, then translated technical experiments into clearer learning material for non-experts.",
    tags: ["AI tools", "Research", "Learning material"],
  },
  {
    id: "prodigi-pic",
    role: "PIC of Entrepreneur",
    org: "PRODIGI Digital Talent Centre Lab",
    start: "Apr 2025",
    end: "Apr 2026",
    summary:
      "Designed and led intensive coaching programs for student entrepreneurs across the campus.",
    tags: ["Programs", "Coaching"],
  },
  {
    id: "humic-backend",
    role: "Backend Developer",
    org: "Humic Engineering",
    start: "Feb 2025",
    end: "May 2025",
    summary:
      "Designed REST APIs and database structures to connect application systems with AI-based service workflows and stable server-side integration.",
    tags: ["REST API", "Database", "AI service"],
  },
  {
    id: "motiva-founder",
    role: "Founder & CEO",
    org: "MOTIVA",
    start: "Oct 2024",
    end: "Mar 2025",
    summary:
      "Took an AI coaching app from concept to working prototype with a team of four — owned product, business model, and pitch.",
    tags: ["Founder", "Product", "AI"],
  },
  {
    id: "chevalier-mentor",
    role: "Mobile Development Mentor",
    org: "Chevalier Laboratory SAS",
    start: "Sep 2023",
    end: "Sep 2024",
    summary:
      "Mentored peers in Android development through study groups and project reviews.",
    tags: ["Android", "Mentorship"],
  },
];
