import type { MetadataRoute } from "next";
import { personal } from "@/content/personal";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
