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
      "Build responsive web apps for educational platforms with Vue 3 / Nuxt 3 and REST APIs.",
    tags: ["Vue 3", "Nuxt 3", "REST"],
  },
  {
    id: "dicoding-community",
    role: "Community Builder",
    org: "Dicoding Indonesia",
    start: "Nov 2025",
    end: "Present",
    summary:
      "Built and lead the campus-level Dicoding Community Network at Telkom University.",
    tags: ["Community", "Programs"],
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
      "Architected scalable backend services and microservices for an internal platform.",
    tags: ["REST API", "Microservices"],
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
