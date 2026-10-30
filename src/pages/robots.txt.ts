import type { APIRoute } from "astro";

// Généré au build : l'adresse du sitemap vient de `site` (astro.config.mjs), écrite une seule fois.
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap.href}\n`);
};
