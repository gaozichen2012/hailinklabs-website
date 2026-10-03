import { catalog, categories, highlights, listings } from './catalog';
import type { Locale } from './i18n';
import { copy } from './products';
import { site } from './site';

const absolute = (path: string) => new URL(path, site.url).href;

export function socialImage(englishPath: string, locale: Locale) {
  const product = catalog.find(
    (item) =>
      englishPath === `/products/${item.slug}` ||
      englishPath.startsWith(`/products/${item.slug}/`) ||
      (['cluemend', 'affixhop'].includes(item.slug) &&
        (englishPath === `/${item.slug}` ||
          englishPath.startsWith(`/${item.slug}/`))),
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
  if (!product) {
    return englishPath === '/' || englishPath === '/about'
      ? { '@context': 'https://schema.org', '@graph': [organization] }
      : undefined;
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
    '@graph': [organization, application],
  };
}
