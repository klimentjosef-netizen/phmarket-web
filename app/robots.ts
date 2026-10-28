import type { MetadataRoute } from "next";
import { headers } from "next/headers";
import { COUNTRY_DOMAINS } from "@/i18n/domains";

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
  const h = (headers().get("host") ?? "").replace(/^(?!www\.)/, "www.");
  const host = COUNTRY_DOMAINS.some((d) => d.live && d.domain === h) ? h : "www.phmarket.cz";
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
    // Each country domain points to its own sitemap.
    sitemap: `https://${host}/sitemap.xml`,
    host: `https://${host}`,
  };
}
