import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const site =
  process.env.URL ||               // prod
  process.env.DEPLOY_PRIME_URL ||  // deploy previews
  "https://YOUR-SITE.netlify.app";

export default defineConfig({
  site,
  trailingSlash: "never",
  integrations: [sitemap()],
});
