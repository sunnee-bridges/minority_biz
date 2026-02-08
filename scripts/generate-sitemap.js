import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const site = 'https://denverblackguide.com';

function generateSitemap() {
  // Read all business JSON files
  const businessesDir = path.join(__dirname, '../src/content/businesses');
  const businessFiles = fs.readdirSync(businessesDir).filter(f => f.endsWith('.json'));
  
  const businesses = businessFiles.map(file => {
    const content = fs.readFileSync(path.join(businessesDir, file), 'utf-8');
    return JSON.parse(content);
  });

  const businessUrls = businesses.map(b => `/business/${b.slug}/`);
  
  // Extract unique neighborhoods
  const neighborhoods = [...new Set(
    businesses.flatMap(b => b.neighborhoods || []).filter(Boolean)
  )];
  const neighborhoodUrls = neighborhoods.map(n => 
    `/neighborhood/${n.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-')}/`
  );
  
  // Extract unique types
  const types = [...new Set(
    businesses.map(b => b.type).filter(Boolean)
  )];
  const typeUrls = types.map(t => `/type/${t.toLowerCase()}/`);
  
  // Static pages
  const staticPages = [
    '/', '/about/', '/all/', '/categories/', 
    '/contact/', '/contact/thanks/', '/neighborhood/'
  ];

  const allUrls = [...staticPages, ...businessUrls, ...neighborhoodUrls, ...typeUrls];

  const urlTags = allUrls.map(url => 
    `  <url>\n    <loc>${site}${url}</loc>\n  </url>`
  ).join('\n');

  const sitemap0 = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${site}/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>`;

  fs.writeFileSync(path.join(__dirname, '../dist/sitemap-0.xml'), sitemap0);
  fs.writeFileSync(path.join(__dirname, '../dist/sitemap-index.xml'), sitemapIndex);
  
  console.log(`✅ Sitemap generated with ${allUrls.length} URLs`);
}

generateSitemap();