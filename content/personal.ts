/**
 * Personal info — single source of truth used in metadata, hero, footer.
 *
 * Update any field here and the rest of the site reflects it.
 */

export const personal = {
  name: "Cahya Rizqi Syah Maulana",
  shortName: "Cahya R. S. Maulana",
  initials: "CR",
  role: "Designer · Engineer · Builder",
  tagline:
    "Final-year IT student turning ideas into intuitive, human-centered products.",
  location: "Bandung, Indonesia",
  email: "cahyarizqi3@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/cahya-rizqi",
    github: "https://github.com/carizsm",
  },
  about:
    "I build at the intersection of design, engineering, and entrepreneurship. From leading an AI-powered student startup to shipping production web apps and mentoring junior developers, I'm drawn to problems where technical depth meets human craft. Currently a final-year Information Technology student at Telkom University and a Bank Indonesia Scholar.",
  url: "https://cahya.dev",
} as const;

export type Personal = typeof personal;
