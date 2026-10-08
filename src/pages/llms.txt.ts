import type { APIRoute } from 'astro';
import { catalog, listings, highlights } from '../data/catalog';
import { guides, templates } from '../data/resources';
import { products } from '../data/products';
import { site } from '../data/site';
export const GET: APIRoute = () =>
  new Response(
    [
      `# ${site.name}`,
      '',
      '> Small iOS apps for everyday work and record keeping. Official public product descriptions and practical resources.',
      '',
      `Legal entity: ${site.legalName} / ${site.legalNameZh}`,
      `Website: ${site.url}`,
      `Support email: ${site.email}`,
      'Last updated: 2026-10-08',
      'This discovery file is supplementary; it is not a Google ranking requirement or a guarantee of AI citations.',
      '',
      '## Indexes',
      ...['products', 'guides', 'templates', 'support', 'about', 'contact'].map(
        (s) => `- [${s}](${site.url}/${s})`,
      ),
      '',
      '## Apps with verified public US App Store listings',
      ...catalog
        .filter((p) => listings[p.slug])
        .flatMap((p) => [
          `### ${p.storeName}`,
          p.description[0],
          `- [Product](${site.url}/products/${p.slug})`,
          `- [App Store](${listings[p.slug].url})`,
          `- Fit and limits: ${highlights[p.slug].fit?.[0] || p.description[0]}`,
          `- Pricing (US reference; download is free, paid access differs): ${highlights[p.slug].price[0]}`,
          `- Data: ${highlights[p.slug].data[0]}`,
          ...products
            .filter((item) => item.slug === p.slug)
            .flatMap((item) => [
              `- Scope: ${item.principles[0]}`,
              `- Storage: ${item.storage[0]}`,
              `- Export: ${item.export[0]}`,
              `- Backup: ${item.backup[0]}`,
            ]),
          `- [Support](${site.url}/products/${p.slug}/support)`,
          `- [Privacy](${site.url}/products/${p.slug}/privacy)`,
          ...guides
            .filter((g) => g.app === p.slug)
            .map((g) => `- [${g.title[0]}](${site.url}/guides/${g.slug})`),
          ...templates
            .filter((t) => t.app === p.slug)
            .map(
              (t) =>
                `- [Free template: ${t.title[0]}](${site.url}/templates/${t.slug})`,
            ),
          '',
        ]),
      '## Product information without a verified download link',
      ...catalog
        .filter((p) => !listings[p.slug])
        .flatMap((p) => [
          `### ${p.storeName}`,
          p.description[0],
          `- [Product](${site.url}/products/${p.slug})`,
          `- [Support](${site.url}/products/${p.slug}/support)`,
          `- [Privacy](${site.url}/products/${p.slug}/privacy)`,
          'No verified public download link is supplied.',
          '',
        ]),
    ].join('\n') + '\n',
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
