import type { Metadata, Viewport } from "next";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { ScrollAssist } from "@/components/ScrollAssist";
import { personal } from "@/content/personal";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${personal.name} — Designer · Engineer · Builder`,
    template: `%s — ${personal.shortName}`,
  },
  description: personal.tagline,
  keywords: [
    "Cahya Rizqi",
    "Cahya Rizqi Syah Maulana",
    "Telkom University",
    "Bandung",
    "Frontend Developer",
    "UI/UX Designer",
    "Product Designer",
    "Software Engineer",
    "Portfolio",
  ],
  authors: [{ name: personal.name }],
  creator: personal.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: `${personal.name} — Designer · Engineer · Builder`,
    description: personal.tagline,
    siteName: personal.shortName,
  },
  twitter: {
    card: "summary_large_image",
    title: `${personal.name} — Designer · Engineer · Builder`,
    description: personal.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF6" },
    { media: "(prefers-color-scheme: dark)", color: "#161618" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        id="top"
        className="min-h-screen bg-bg font-sans text-fg antialiased selection:bg-accent selection:text-accent-fg"
      >
        <ThemeProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-fg focus:px-3 focus:py-2 focus:text-sm focus:text-bg"
          >
            Skip to content
          </a>
          <Nav />
          <main id="main">{children}</main>
          <ScrollAssist />
        </ThemeProvider>
      </body>
    </html>
  );
}
