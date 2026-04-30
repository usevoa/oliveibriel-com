import rss from "@astrojs/rss";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  return rss({
    title: "Gabriel Oliveira",
    description: "Notes and essays on product design, design systems, and AI-native workflows.",
    site: context.site ?? "https://oliveibriel.com",
    items: [],
    customData: `<language>en-us</language>`,
  });
}
