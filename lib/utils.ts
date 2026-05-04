export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPeriod(start: string, end: string | "Present"): string {
  return `${start} – ${end}`;
}
