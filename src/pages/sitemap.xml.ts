import type { APIRoute } from 'astro';
import { routes, site } from '../data/site';
import { isAlias } from '../data/route-policy';
import { lastModified } from '../data/freshness';
import review from '../data/privacy-review.json';
export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
      .filter(
        (path) =>
          !isAlias(path) && (review.approved || !path.endsWith('/privacy')),
      )
      .map(
        (path) =>
          `<url><loc>${new URL(path, site.url).href}</loc><lastmod>${lastModified(path)}</lastmod></url>`,
      )
      .join('')}</urlset>`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } },
  );
