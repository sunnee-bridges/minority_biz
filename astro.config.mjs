import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const canonicalSite = "https://denverblackguide.com";
const enableSitemap =
  process.env.CONTEXT === "production" ||
  process.env.GENERATE_SITEMAP === "true";

export default defineConfig({
  site: canonicalSite,
  output: "static",
  trailingSlash: "always",
  integrations: [],
});