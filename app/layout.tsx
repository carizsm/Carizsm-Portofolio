import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/ThemeProvider";
import { Nav } from "@/components/Nav";
import { personal } from "@/content/personal";
import { brand } from "@/content/brand";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import "./studio.css";
import "./explorations.css";

const siteUrl = getSiteUrl();

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: brand.name,
  title: {
    default: brand.title,
    template: `%s — ${brand.name}`,
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
    title: brand.title,
    description: personal.tagline,
    siteName: brand.name,
  },
  twitter: {
    card: "summary_large_image",
    title: brand.title,
    description: personal.tagline,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f3ed" },
    { media: "(prefers-color-scheme: dark)", color: "#151923" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} ${instrumentSerif.variable}`}
    >
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
        </ThemeProvider>
      </body>
    </html>
  );
}
