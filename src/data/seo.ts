import { catalog, categories, highlights, listings } from './catalog';
import type { Locale } from './i18n';
import { copy } from './products';
import { guides, templates, hubs, resourceText } from './resources';
import { site } from './site';

const absolute = (path: string) => new URL(path, site.url).href;

// Keep page headings intact while giving long search titles a concise variant.
const searchTitles: Record<string, string> = {
  '/products/hybridloop':
    'HybridLoop — Voice-Guided Workout Timer | Hailink Labs',
  '/products/rulesprout': 'RuleSprout: Logic for Kids | Hailink Labs',
  '/guides/estimate-to-invoice-workflow':
    'Estimate-to-Invoice Workflow for Solo Businesses | Hailink Labs',
};
export const searchTitle = (path: string, fallback: string) =>
  searchTitles[path] || fallback;

export function socialImage(englishPath: string, locale: Locale) {
  const product = catalog.find(
    (item) =>
      englishPath === `/products/${item.slug}` ||
      englishPath.startsWith(`/products/${item.slug}/`) ||
      englishPath === `/${item.slug}` ||
      englishPath.startsWith(`/${item.slug}/`),
  );
  const screenshot = product && ['samejob', 'gearproof'].includes(product.slug);
  return {
    url: absolute(`/social/${product?.slug ?? 'hailink-labs'}.png`),
    width: 1200,
    height: 630,
    alt: product
      ? locale === 'en'
        ? `${product.name} by Hailink Labs — ${product.subtitle[0]}${screenshot ? '. Includes an actual English-language app screenshot.' : '.'}`
        : `${product.name}，Hailink Labs 出品 — ${product.subtitle[1]}。分享图使用英文${screenshot ? '，含真实 App 界面' : ''}。`
      : locale === 'en'
        ? 'Hailink Labs — Small apps. Real-life value.'
        : 'Hailink Labs — 小应用，真实价值。分享图使用英文。',
  };
}

// JSON-LD is static data, not executable client JavaScript. Keep the existing CSP.
// Escape HTML delimiters so future copy cannot terminate the script element.
export const serializeStructuredData = (value: unknown) =>
  JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');

export function structuredData(
  englishPath: string,
  canonical: string,
  locale: Locale,
) {
  const organization = {
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalNameZh,
    alternateName: site.legalName,
    url: site.url,
    logo: absolute('/brand/hailink-symbol.svg?v=1.1'),
    email: site.email,
  };
  const product = catalog.find(
    (item) => englishPath === `/products/${item.slug}`,
  );
  // Only actual product pages describe a SoftwareApplication. Support/privacy
  // pages must not be mistaken for download pages or given purchase offers.
  const guide = guides.find((g) => englishPath === `/guides/${g.slug}`);
  const template = templates.find(
    (t) => englishPath === `/templates/${t.slug}`,
  );
  const hub = hubs.find((h) => englishPath === `/guides/${h.slug}`);
  const label = (values: readonly string[]) => resourceText(values, locale);
  const prefix = locale === 'en' ? '' : '/zh';
  const crumbs = [{ name: site.name, item: site.url + (prefix || '/') }];
  if (englishPath.startsWith('/products'))
    crumbs.push({
      name: locale === 'en' ? 'Products' : '产品',
      item: site.url + prefix + '/products',
    });
  if (englishPath.startsWith('/guides'))
    crumbs.push({
      name: locale === 'en' ? 'Guides & Resources' : '指南与资源',
      item: site.url + prefix + '/guides',
    });
  if (englishPath.startsWith('/templates'))
    crumbs.push({
      name: locale === 'en' ? 'Free Templates' : '免费模板',
      item: site.url + prefix + '/templates',
    });
  if (guide) {
    const category = hubs.find((h) => h.slug === guide.category)!;
    crumbs.push({
      name: label(category.title),
      item: site.url + prefix + `/guides/${category.slug}`,
    });
  }
  if (product || guide || template || hub)
    crumbs.push({
      name: product?.storeName || label((guide || template || hub)!.title),
      item: canonical,
    });
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${canonical}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      ...crumb,
    })),
  };
  if (!product) {
    const graph: unknown[] = [organization];
    if (englishPath === '/')
      graph.push({
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        name: site.name,
        alternateName: site.legalName,
        url: site.url,
        publisher: { '@id': organization['@id'] },
      });
    else if (
      englishPath !== '/about' &&
      !englishPath.startsWith('/guides') &&
      !englishPath.startsWith('/templates') &&
      englishPath !== '/products'
    )
      return undefined;
    if (crumbs.length > 1) graph.push(breadcrumb);
    if (guide)
      graph.push({
        '@type': 'Article',
        '@id': `${canonical}#article`,
        headline: label(guide.title),
        description: label(guide.description),
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        author: { '@id': organization['@id'] },
        publisher: { '@id': organization['@id'] },
        mainEntityOfPage: canonical,
        inLanguage: locale,
        image: socialImage(englishPath, locale).url,
      });
    if (template)
      graph.push({
        '@type': 'WebPage',
        '@id': canonical,
        name: label(template.title),
        description: label(template.description),
        datePublished: template.publishedAt,
        dateModified: template.updatedAt,
        publisher: { '@id': organization['@id'] },
        inLanguage: locale,
        relatedLink: [
          `${site.url}/downloads/${template.slug}.pdf`,
          `${site.url}/downloads/${template.slug}.csv`,
        ],
      });
    return { '@context': 'https://schema.org', '@graph': graph };
  }
  const listing = listings[product.slug];
  const category = categories.find((item) => item.slugs.includes(product.slug));
  const applicationCategory =
    category?.id === 'family'
      ? 'EducationalApplication'
      : category?.id === 'fitness'
        ? 'SportsApplication'
        : 'BusinessApplication';
  const application = {
    '@type': 'SoftwareApplication',
    '@id': `${canonical}#software`,
    name: product.storeName,
    description: copy(product.description, locale),
    url: canonical,
    applicationCategory,
    operatingSystem: listing ? `iOS ${listing.ios} or later` : 'iOS',
    publisher: { '@id': organization['@id'] },
    image: socialImage(englishPath, locale).url,
    ...(listing && {
      downloadUrl: listing.url,
      sameAs: listing.url,
      offers: {
        '@type': 'Offer',
        name:
          locale === 'en'
            ? 'Free download with in-app purchases'
            : '免费下载，提供 App 内购买',
        price: '0',
        priceCurrency: 'USD',
        url: listing.url,
        description: copy(highlights[product.slug].price, locale),
      },
    }),
  };
  // Do not invent ratings/reviews to satisfy rich-result eligibility. Search
  // engines decide whether to show enhanced results; valid schema is no promise.
  return {
    '@context': 'https://schema.org',
    '@graph': [organization, application, breadcrumb],
  };
}
