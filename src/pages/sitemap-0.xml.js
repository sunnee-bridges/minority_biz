import { getCollection } from 'astro:content';

export async function GET() {
  const site = 'https://denverblackguide.com';
  
  // Get all businesses
  const businesses = await getCollection('businesses');
  const businessUrls = businesses.map(b => `/business/${b.data.slug}/`);
  
  // Extract unique neighborhoods from businesses (it's an array)
  const neighborhoods = [...new Set(
    businesses
      .flatMap(b => b.data.neighborhoods || []) // flatMap handles arrays
      .filter(Boolean)
  )];
  const neighborhoodUrls = neighborhoods.map(n => 
    `/neighborhood/${n.toLowerCase().replace(/\s+/g, '-').replace(/'/g, '-')}/`
  );
  
  // Extract unique business types
  const types = [...new Set(
    businesses
      .map(b => b.data.type)
      .filter(Boolean)
  )];
  const typeUrls = types.map(t => 
    `/type/${t.toLowerCase()}/`
  );
  
  // Static pages
  const staticPages = [
    '/',
    '/about/',
    '/all/',
    '/categories/',
    '/contact/',
    '/contact/thanks/',
    '/neighborhood/',
  ];

  const allUrls = [
    ...staticPages,
    ...businessUrls,
    ...neighborhoodUrls,
    ...typeUrls,
  ];

  const urlTags = allUrls.map(url => 
    `  <url>\n    <loc>${site}${url}</loc>\n  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlTags}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}