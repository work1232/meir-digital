import type { MetadataRoute } from "next";
import { navKeys, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return navKeys.flatMap((item) => {
    const path = item.href === "/" ? "" : item.href;
    return [
      {
        url: `${site.url}${path || "/"}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: item.href === "/" ? 1 : 0.8,
        alternates: {
          languages: {
            he: `${site.url}${path || "/"}`,
            en: `${site.url}/en${path}`,
          },
        },
      },
      {
        url: `${site.url}/en${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: item.href === "/" ? 0.9 : 0.7,
      },
    ];
  });
}
