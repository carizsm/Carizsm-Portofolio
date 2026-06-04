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

This project is ready for Vercel as a Next.js app. The current portfolio uses local TypeScript content files, so Supabase/database setup is not required yet.

1. Push repository to GitHub.
2. Import the repository in Vercel.
3. Use the **Next.js** framework preset. The included `vercel.json` pins:
   - Install command: `npm ci`
   - Build command: `npm run build`
4. Optional but recommended: add `NEXT_PUBLIC_SITE_URL` in Vercel Project Settings → Environment Variables. Use the canonical production URL, for example `https://cahya.dev`.
5. Deploy.

Vercel also provides `VERCEL_PROJECT_PRODUCTION_URL`/`VERCEL_URL`; the app falls back to those values for metadata, sitemap, and robots.txt if `NEXT_PUBLIC_SITE_URL` is not set.

### Future Supabase setup

Only add Supabase if you introduce dynamic data such as a CMS, contact submissions, or authenticated dashboards. At that point, add the required Supabase environment variables in Vercel and keep secret service-role keys server-only.
