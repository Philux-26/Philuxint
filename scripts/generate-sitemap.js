import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://philuxint.com.ng';
const TODAY = new Date().toISOString().split('T')[0];

const STATIC_ROUTES = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/services', priority: '0.9', changefreq: 'weekly' },
    { loc: '/shop', priority: '0.9', changefreq: 'weekly' },
    { loc: '/blog', priority: '0.8', changefreq: 'daily' },
    { loc: '/about', priority: '0.8', changefreq: 'monthly' },
    { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
];

async function generateSitemap() {
    console.log('Generating dynamic SEO XML sitemap...');

    let postIds = ['100', '99', '98', '97', '96', '95', '94', '93'];
    try {
        const { getAllPostIds } = await import('../src/services/wp-api.js');
        const ids = await getAllPostIds();
        if (ids && ids.length > 0) {
            postIds = ids;
        }
    } catch (err) {
        console.warn('Using fallback post IDs for sitemap generation:', err.message);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

${STATIC_ROUTES.map(
        (r) => `  <url>
    <loc>${SITE_URL}${r.loc}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
    ).join('\n\n')}

${postIds.map(
        (id) => `  <url>
    <loc>${SITE_URL}/blog/${id}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    ).join('\n\n')}

</urlset>
`;

    const publicPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    fs.writeFileSync(publicPath, xml.trim(), 'utf8');
    console.log(`Successfully generated dynamic sitemap with ${STATIC_ROUTES.length + postIds.length} URLs at public/sitemap.xml`);
}

generateSitemap();
