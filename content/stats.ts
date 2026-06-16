/**
 * Quick-glance stats shown in the About panel.
 *
 * Each stat is a paired big-number + caption. Keep number under ~6 chars.
 * To add a stat, append a new object — the panel reflows automatically.
 */

export interface Stat {
  value: string;
  label: string;
  caption?: string;
}

export const stats: Stat[] = [
  { value: "3.83", label: "GPA / 4.00", caption: "Telkom University" },
  { value: "BI", label: "Scholar", caption: "Cohort 2025" },
  { value: "8", label: "Selected works", caption: "Web · Mobile · IoT" },
  { value: "2nd", label: "ADIKARA 2024", caption: "Entrepreneur track" },
];
