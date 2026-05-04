# Cahya Portfolio

Portfolio website built with Next.js 15 + TypeScript + Tailwind v4.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add a new project

1. Open `content/projects.ts`.
2. Add a new object to the `projects` array using the typed schema at the top.

```ts
{
  id: "new-project",
  title: "New Project",
  role: "Lead Developer",
  period: "Jan 2026 – Present",
  description: "Short impact-first summary.",
  tech: ["Next.js", "TypeScript"],
  type: "Self-initiated",
  image: { src: "/projects/new-project.svg", alt: "Preview" },
}
```

## Add a new experience

1. Open `content/experience.ts`.
2. Append a new entry to `experiences`.

```ts
{
  id: "org-role",
  role: "Frontend Engineer",
  org: "Organization",
  start: "Jan 2026",
  end: "Present",
  summary: "One-line scope and impact.",
  tags: ["Vue", "REST"],
}
```

## Update color tokens / theme

Edit `app/globals.css`:
- Light tokens inside `@theme`.
- Dark tokens inside `.dark` override.

## Deploy to Vercel

1. Push repository to GitHub.
2. Import project in Vercel.
3. Framework preset: Next.js.
4. Deploy (no extra env vars required for current version).
