import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const xml = await readFile('dist/sitemap.xml', 'utf8');
const entries = [];
for (const match of xml.matchAll(
  /<url><loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod><\/url>/g,
)) {
  const url = new URL(match[1]);
  const html = await readFile(
    `dist/${url.pathname === '/' ? 'index' : url.pathname.slice(1)}.html`,
    'utf8',
  );
  // Navigation/CSS-only changes do not trigger bulk notifications. Main content,
  // metadata and schema changes do; all are already live before submission.
  const substantive = [
    html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1],
    html.match(/<title>(.*?)<\/title>/)?.[1],
    ...html.matchAll(/<meta name="(?:description|apple-itunes-app)"[^>]*>/g),
    ...html.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g,
    ),
  ]
    .map((part) => String(part))
    .join('\n');
  entries.push({
    url: url.href,
    lastmod: match[2],
    sha256: createHash('sha256').update(substantive).digest('hex'),
  });
}
if (!entries.length) throw new Error('Empty indexable manifest');
await writeFile(
  'dist/indexnow-manifest.json',
  JSON.stringify({ version: 1, entries }, null, 2) + '\n',
);
console.log(`Search manifest: ${entries.length} unique indexable URLs`);
