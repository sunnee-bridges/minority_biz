import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
const canonicalSite = "https://denverblackguide.com";
const site =
  process.env.CONTEXT === "production"
    ? canonicalSite
    : (process.env.SITE_URL ||
       process.env.URL ||
       process.env.DEPLOY_PRIME_URL ||
       "http://localhost:4321");
const enableSitemap =
  process.env.CONTEXT === "production" ||
  process.env.GENERATE_SITEMAP === "true";
export default defineConfig({
  site,
  trailingSlash: "always",
  integrations: enableSitemap ? [sitemap()] : [],
});