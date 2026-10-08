import { catalog, listings } from '../data/catalog';
import { guides, templates } from '../data/resources';
import { buildAppStoreUrl, campaignName } from '../data/app-store';
import { products } from '../data/products';
import { highlights } from '../data/catalog';
import { site } from '../data/site';
export function GET() {
  return new Response(
    JSON.stringify(
      {
        schemaVersion: 1,
        updatedAt: '2026-10-08',
        origin: site.url,
        listingSource: 'src/data/catalog.ts; verified public US Apple listings',
        metrics:
          'Private platform observations are intentionally excluded. Missing metrics must remain null with an availability reason.',
        cadence:
          'Existing manually triggered Growth Hub daily run; no new scheduling.',
        products: catalog.map((product) => ({
          slug: product.slug,
          name: product.name,
          publicSummary: product.description,
          fitAndLimits: highlights[product.slug]?.fit || null,
          pricing: highlights[product.slug]?.price || null,
          workflow:
            products.find((p) => p.slug === product.slug)?.steps || null,
          data: products.find((p) => p.slug === product.slug)?.storage || null,
          export: products.find((p) => p.slug === product.slug)?.export || null,
          backup: products.find((p) => p.slug === product.slug)?.backup || null,
          support: `${site.url}/products/${product.slug}/support`,
          privacy: `${site.url}/products/${product.slug}/privacy`,
          website: `${site.url}/products/${product.slug}`,
          chineseWebsite: `${site.url}/zh/products/${product.slug}`,
          downloadStatus: listings[product.slug]
            ? 'VERIFIED_PUBLIC_US_LISTING'
            : 'NO_VERIFIED_DOWNLOAD_LINK',
          listing: listings[product.slug] || null,
          productCampaign: listings[product.slug]
            ? campaignName(product.slug, 'product')
            : null,
          download: buildAppStoreUrl({ slug: product.slug }) || null,
          guides: guides
            .filter((g) => g.app === product.slug)
            .map((g) => ({
              url: `${site.url}/guides/${g.slug}`,
              template: `${site.url}/templates/${g.template}`,
              campaign: campaignName(product.slug, 'guide', g.slug),
            })),
          templates: templates
            .filter((t) => t.app === product.slug)
            .map((t) => ({
              url: `${site.url}/templates/${t.slug}`,
              campaign: campaignName(product.slug, 'template', t.slug),
            })),
        })),
      },
      null,
      2,
    ),
    { headers: { 'Content-Type': 'application/json; charset=utf-8' } },
  );
}
