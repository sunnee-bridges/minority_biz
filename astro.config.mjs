import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site =
  process.env.SITE_URL ||          // set this to https://denverblackguide.com in Netlify env
  process.env.URL ||               // Netlify primary site URL
  process.env.DEPLOY_PRIME_URL ||  // deploy preview URL
  "http://localhost:4321";

// Only generate sitemap on Netlify production deploys
const enableSitemap =
  process.env.CONTEXT === "production" ||
  process.env.GENERATE_SITEMAP === "true";

export default defineConfig({
  site,
  trailingSlash: "never",
  integrations: enableSitemap ? [sitemap()] : [],
});
