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
    "I build digital products by listening to real problems first. My work moves between product building, community learning, and social impact: from collaborative travel planning and AI-assisted research to education platforms, mentoring, and village-based community service.",
  url: "https://cahya.dev",
} as const;

export type Personal = typeof personal;
