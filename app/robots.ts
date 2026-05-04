import type { MetadataRoute } from "next";
import { personal } from "@/content/personal";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${personal.url}/sitemap.xml`,
  };
}
