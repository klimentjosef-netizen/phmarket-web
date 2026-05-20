import type { MetadataRoute } from "next";

const AI_ALLOW_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Meta-ExternalAgent",
  "DuckAssistBot",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      ...AI_ALLOW_BOTS.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://phmarket.cz/sitemap.xml",
    host: "https://phmarket.cz",
  };
}
