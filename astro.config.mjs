import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site =
  process.env.SITE_URL ||          // <-- you set this when domain is final
  process.env.URL ||               // Netlify primary site URL 
  process.env.DEPLOY_PRIME_URL ||  // available on Netlify :contentReference[oaicite:2]{index=2}
  "http://localhost:4321";

const enableSitemap = !!process.env.SITE_URL; // turn on only when final domain is known

export default defineConfig({
  site,
  trailingSlash: "never",
  integrations: [enableSitemap ? sitemap() : null].filter(Boolean),
});
