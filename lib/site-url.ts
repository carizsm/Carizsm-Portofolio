import { personal } from "@/content/personal";

function withProtocol(url: string) {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

function withoutTrailingSlash(url: string) {
  return url.replace(/\/$/, "");
}

export function getSiteUrl() {
  const url =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL ??
    personal.url;

  return withoutTrailingSlash(withProtocol(url));
}
