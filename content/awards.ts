/**
 * Awards & Recognition — most recent first.
 *
 * To add: append an Award object. Keep `description` short — one line.
 *
 * Example:
 * {
 *   id: "best-paper-2027",
 *   title: "Best Paper Award",
 *   org: "ACM CHI 2027",
 *   year: "2027",
 *   description: "For our work on adaptive focus interfaces.",
 * }
 */

export interface Award {
  id: string;
  title: string;
  org: string;
  year: string;
  description?: string;
}

export const awards: Award[] = [
  {
    id: "bi-scholar",
    title: "Bank Indonesia Scholar",
    org: "Bank Indonesia",
    year: "2025",
    description:
      "Selected for the GenBI scholarship cohort — academic and leadership track.",
  },
  {
    id: "adikara-2nd",
    title: "2nd Place — ADIKARA Entrepreneur Competition",
    org: "PRODIGI · Telkom University",
    year: "2024",
    description: "For MOTIVA, an AI-powered coaching app.",
  },
  {
    id: "cci-finalist",
    title: "Finalist — UI/UX Competition",
    org: "CCI Summit · CCI Telkom University",
    year: "2024",
  },
];

export interface Education {
  degree: string;
  org: string;
  start: string;
  end: string | "Present";
  gpa?: string;
  coursework?: string[];
}

export const education: Education = {
  degree: "B.Sc. Information Technology",
  org: "Telkom University",
  start: "Sep 2022",
  end: "Present",
  gpa: "3.83 / 4.00",
  coursework: [
    "Software Engineering",
    "User Experience Design",
    "Algorithms & Complexity",
    "Database Systems",
    "Object-Oriented Programming",
    "Computer Networks",
  ],
};
