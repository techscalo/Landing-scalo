import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.scalo.tech/b", priority: 1 },
    { url: "https://www.scalo.tech/a-leadmagnet", priority: 0.8 },
  ];
}
