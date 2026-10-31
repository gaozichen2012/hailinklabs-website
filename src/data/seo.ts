import { catalog, categories, highlights, listings } from './catalog';
import type { Locale } from './i18n';
import { copy } from './products';
import { guides, templates, hubs, resourceText } from './resources';
import { site } from './site';
import { gearproofDemo } from './gearproof-demo';
import { calvingpocketDemo } from './calvingpocket-demo';

const absolute = (path: string) => new URL(path, site.url).href;

// Keep page headings intact while giving long search titles a concise variant.
const searchTitles: Record<string, string> = {
  '/templates/repeat-customer-invoice':
    'Free Repeat Customer Invoice — PDF & Excel | Hailink Labs',
  '/products/hybridloop':
    'HybridLoop — Voice-Guided Workout Timer | Hailink Labs',
  '/products/rulesprout': 'RuleSprout: Logic for Kids | Hailink Labs',
  '/guides/estimate-to-invoice-workflow':
    'Estimate-to-Invoice Workflow for Solo Businesses | Hailink Labs',
};
export const searchTitle = (path: string, fallback: string) =>
  searchTitles[path] || fallback;

const searchDescriptions: Record<string, string> = {
  '/products/calvingpocket':
    'Record calf births without herd setup. Save an untagged calf, add its tag later and export CSV or PDF. Offline with active access. No subscription.',
  '/products/gearproof':
    'Track camera kit checkout, partial returns and damaged accessories on one iPhone. Try GearProof free for 7 days, then unlock lifetime access. No subscription.',
  '/products/hybridloop':
    'Time and record your own hybrid workouts on iPhone with automatic timing, large controls and optional voice commands. Keep your routine customizable.',
  '/guides/contractors':
    'Practical guides and free templates for T&M tickets, extra work and tool handovers. Keep job records separate from equipment movements.',
  '/guides/animal-records':
    'Organize puppy observations and calf birth records with clear identities, dates and units. Explore free logs and guides for reliable handovers.',
  '/guides/heat-press':
    'Keep heat press setup and wash-test records tied to materials, equipment and sample IDs. Explore free templates without universal setting claims.',
  '/guides/small-business':
    'Prepare repeat-customer invoices and estimates with clear job details. Explore guides and free templates for solo service businesses.',
};
export const searchDescription = (path: string, fallback: string) =>
  searchDescriptions[path] || fallback;

export function socialImage(englishPath: string, locale: Locale) {
  const resource =
    templates.find((item) => englishPath === `/templates/${item.slug}`) ||
    guides.find((item) => englishPath === `/guides/${item.slug}`);
  const sheet = resource && templates.find((item) => item.app === resource.app);
  if (sheet && ['tmproof', 'pressrecipe', 'samejob'].includes(sheet.app)) {
    return {
      url: absolute(
        `/social/template-${sheet.slug}${locale === 'en' ? '' : '-zh'}.png`,
      ),
      width: 1200,
      height: 630,
      alt: `${resourceText(sheet.title, locale)} · ${sheet.app === 'samejob' ? 'PDF · CSV · Excel' : 'PDF · CSV'} · ${locale === 'en' ? 'Independent worksheet preview' : '独立工作表预览'}`,
    };
  }
  const product = catalog.find(
    (item) =>
      (resource &&
        [
          'gearproof',
          'calvingpocket',
          'samejob',
          'tmproof',
          'pressrecipe',
          'litterround',
        ].includes(resource.app) &&
        item.slug === resource.app) ||
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
  const demo = [gearproofDemo, calvingpocketDemo].find(
    (item) => englishPath === item.path,
  );
  if (demo) {
    const videoId = `${canonical}#video`;
    return {
      '@context': 'https://schema.org',
      '@graph': [
        organization,
        {
          '@type': 'WebPage',
          '@id': canonical,
          name: copy(demo.title, locale),
          inLanguage: locale,
          mainEntity: { '@id': videoId },
          datePublished: demo.publishedAt,
          publisher: { '@id': organization['@id'] },
        },
        {
          '@type': 'VideoObject',
          '@id': videoId,
          name: copy(demo.title, locale),
          description: copy(demo.description, locale),
          thumbnailUrl: [absolute(demo.poster)],
          contentUrl: absolute(demo.video),
          uploadDate: demo.uploadedAt,
          duration: demo.duration,
          inLanguage: ['en', 'zh-CN'],
          creator: { '@id': organization['@id'] },
          publisher: { '@id': organization['@id'] },
          mainEntityOfPage: canonical,
          about: { '@id': `${site.url}/products/${demo.slug}#software` },
          transcript: demo.segments
            .map(
              (segment) =>
                `${segment.time} ${copy(segment.title, locale)}. ${copy(segment.text, locale)}`,
            )
            .join(' '),
        },
        {
          ...breadcrumb,
          itemListElement: [
            ...breadcrumb.itemListElement,
            {
              '@type': 'ListItem',
              position: 3,
              name: demo.name,
              item: `${site.url}${prefix}/products/${demo.slug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: copy(demo.title, locale),
              item: canonical,
            },
          ],
        },
      ],
    };
  }
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
        ...([
          'gearproof',
          'calvingpocket',
          'samejob',
          'tmproof',
          'pressrecipe',
          'litterround',
        ].includes(guide.app) && {
          about: { '@id': `${site.url}/products/${guide.app}#software` },
        }),
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
      : category?.id === 'music'
        ? 'MusicApplication'
        : category?.id === 'fitness'
          ? 'SportsApplication'
          : 'BusinessApplication';
  const application = {
    '@type': 'SoftwareApplication',
    '@id': [
      'gearproof',
      'calvingpocket',
      'samejob',
      'tmproof',
      'pressrecipe',
      'litterround',
    ].includes(product.slug)
      ? `${site.url}/products/${product.slug}#software`
      : `${canonical}#software`,
    name: product.storeName,
    description: copy(product.description, locale),
    url: canonical,
    applicationCategory,
    operatingSystem: listing ? `iOS ${listing.ios} or later` : 'iOS',
    publisher: { '@id': organization['@id'] },
    image: socialImage(englishPath, locale).url,
    ...(listing && {
      ...(['samejob', 'tmproof', 'pressrecipe', 'litterround'].includes(
        product.slug,
      ) && {
        identifier: String(listing.appId),
        softwareVersion: listing.version,
      }),
      ...(product.slug === 'gearproof' && {
        identifier: String(listing.appId),
        softwareVersion: listing.version,
        inLanguage: 'en',
        subjectOf: { '@id': `${site.url}/products/gearproof/demo#video` },
      }),
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
