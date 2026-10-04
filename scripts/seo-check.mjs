import assert from 'node:assert/strict';
import { readFile, readdir, access, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { URLSearchParams } from 'node:url';
import { parse } from 'parse5';
import { XMLParser, XMLValidator } from 'fast-xml-parser';
const origin = 'https://hailinklabs.com';
const guides = JSON.parse(await readFile('src/data/guides.json', 'utf8'));
const templates = JSON.parse(await readFile('src/data/templates.json', 'utf8'));
const assets = JSON.parse(
  await readFile('src/data/template-assets.json', 'utf8'),
);
const config = JSON.parse(
  await readFile('src/data/search-config.json', 'utf8'),
);
const catalog = await readFile('src/data/catalog.ts', 'utf8');
const listings = new Map(
  [
    ...catalog.matchAll(
      /(\w+):\s*\{\s*url:\s*'(https:\/\/apps\.apple\.com\/[^']+)'/g,
    ),
  ].map((m) => [m[1], m[2]]),
);
const attr = (node, name) => node?.attrs?.find((a) => a.name === name)?.value;
const walk = (node) => [node, ...(node.childNodes || []).flatMap(walk)];
const text = (node) =>
  node.nodeName === '#text'
    ? node.value
    : (node.childNodes || []).map(text).join('');
const canonicalPath = (path) =>
  path.replace(
    /^((?:\/zh)?)(\/(?:storyundo|cluemend|affixhop))(?=\/|$)/,
    '$1/products$2',
  );
const isDate = (value) =>
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  new Date(value).toISOString().slice(0, 10) === value;
assert(guides.length >= 18);
assert(templates.length >= 6);
assert(listings.size >= 6);
assert.equal(new Set(guides.map((g) => g.slug)).size, guides.length);
assert.equal(new Set(guides.map((g) => g.answer[0])).size, guides.length);
for (const slug of new Set([
  'samejob',
  'tmproof',
  'gearproof',
  'litterround',
  'calvingpocket',
  'pressrecipe',
  ...guides.map((g) => g.app),
])) {
  assert(guides.filter((g) => g.app === slug).length >= 3, slug);
  assert(templates.filter((t) => t.app === slug).length >= 1, slug);
}
for (const g of guides) {
  const words = g.answer[0].split(/\s+/).length;
  assert(words >= 40 && words <= 80, `${g.slug} direct answer length`);
  assert(g.steps.length >= 3 && g.mistakes.length >= 2 && g.faq.length >= 2);
}
for (const resource of [...guides, ...templates]) {
  assert(isDate(resource.publishedAt) && isDate(resource.updatedAt));
  assert(resource.updatedAt >= resource.publishedAt);
  assert(listings.has(resource.app));
}
const xml = await readFile('dist/sitemap.xml', 'utf8');
assert.equal(XMLValidator.validate(xml), true, 'Sitemap must be valid XML');
const urls = new XMLParser({ ignoreAttributes: false }).parse(xml).urlset.url;
assert(Array.isArray(urls));
assert.equal(new Set(urls.map((u) => u.loc)).size, urls.length);
for (const u of urls) {
  assert(isDate(u.lastmod));
  assert(u.loc.startsWith(origin));
  assert.equal(new URL(u.loc).pathname, canonicalPath(new URL(u.loc).pathname));
}
const sitemap = new Set(urls.map((u) => u.loc));
const pages = new Map();
const names = await readdir('dist', { recursive: true });
for (const name of names.filter((name) => name.endsWith('.html'))) {
  const path = name === 'index.html' ? '/' : `/${name.replace(/\.html$/, '')}`;
  const html = await readFile(`dist/${name}`, 'utf8');
  const nodes = walk(parse(html));
  const get = (tag, predicate = () => true) =>
    nodes.filter((n) => n.tagName === tag && predicate(n));
  const meta = (key) => get('meta', (n) => attr(n, 'name') === key)[0];
  const noindex = /\bnoindex\b/.test(attr(meta('robots'), 'content') || '');
  const canonical = get('link', (n) => attr(n, 'rel') === 'canonical');
  assert.equal(canonical.length, 1, path);
  assert.equal(attr(canonical[0], 'href'), origin + canonicalPath(path), path);
  assert.equal(
    noindex,
    path === '/404' || path !== canonicalPath(path),
    `${path} noindex policy`,
  );
  assert.equal(sitemap.has(origin + path), !noindex, `${path} sitemap policy`);
  const main = get('main')[0];
  assert(
    main && text(main).trim().length > 100,
    `${path} server-rendered main content`,
  );
  assert.equal(walk(main).filter((n) => n.tagName === 'h1').length, 1, path);
  assert(
    !get('script').some((n) => attr(n, 'type') !== 'application/ld+json'),
    `${path} executable JS`,
  );
  assert(attr(meta('description'), 'content')?.length > 25, path);
  assert.equal(
    attr(get('meta', (n) => attr(n, 'property') === 'og:url')[0], 'content'),
    origin + canonicalPath(path),
  );
  const schemas = get('script').map((n) => JSON.parse(text(n)));
  for (const schema of schemas) {
    assert.equal(schema['@context'], 'https://schema.org');
    assert(
      !/"(?:aggregateRating|review|award|ratingValue|reviewCount)"\s*:/.test(
        JSON.stringify(schema),
      ),
      `${path} invented endorsement`,
    );
  }
  const english = path.replace(/^\/zh/, '') || '/';
  const guide = guides.find((g) => english === `/guides/${g.slug}`);
  const template = templates.find((t) => english === `/templates/${t.slug}`);
  const app =
    guide?.app ||
    template?.app ||
    [...listings.keys()].find((s) => english === `/products/${s}`);
  const banner = attr(meta('apple-itunes-app'), 'content');
  assert.equal(!!banner, !!app, `${path} smart banner scope`);
  if (app) {
    assert(
      banner.includes(`app-id=${listings.get(app).match(/\/id(\d+)/)[1]}`),
    );
    assert(
      get('a', (n) => (attr(n, 'href') || '').startsWith(listings.get(app)))
        .length > 0,
      `${path} App Store CTA`,
    );
  }
  const graph = schemas.flatMap((s) => s['@graph']);
  if (english === '/' && !noindex)
    assert(graph.some((s) => s['@type'] === 'WebSite'));
  if (
    !noindex &&
    (english === '/products' ||
      /^\/products\/[^/]+$/.test(english) ||
      english.startsWith('/guides') ||
      english.startsWith('/templates'))
  )
    assert(
      graph.some((s) => s['@type'] === 'BreadcrumbList'),
      `${path} breadcrumb`,
    );
  if (guide) {
    const article = graph.find((s) => s['@type'] === 'Article');
    assert(
      article &&
        article.dateModified === guide.updatedAt &&
        article.datePublished === guide.publishedAt &&
        article.mainEntityOfPage === origin + path,
      path,
    );
    assert.equal(
      article.headline,
      text(walk(main).find((n) => n.tagName === 'h1')),
    );
  }
  if (/^\/products\/[^/]+$/.test(english)) {
    const software = graph.find((s) => s['@type'] === 'SoftwareApplication');
    assert(software, `${path} software schema`);
    assert.equal(!!software.downloadUrl, !!app, `${path} listing facts`);
    if (app) {
      assert.equal(software.downloadUrl, listings.get(app));
      assert.equal(software.offers.price, '0');
      assert.equal(software.offers.priceCurrency, 'USD');
    }
  }
  for (const [key, expected] of [
    [
      'google-site-verification',
      process.env.GOOGLE_SITE_VERIFICATION || config.googleVerification,
    ],
    [
      'msvalidate.01',
      process.env.BING_SITE_VERIFICATION || config.bingVerification,
    ],
  ]) {
    const value = attr(meta(key), 'content');
    if (value) assert(!/placeholder|example|your_|todo/i.test(value), path);
    assert.equal(value || null, expected || null, `${path} ${key}`);
  }
  if (!config.appleProviderToken && !process.env.APPLE_PROVIDER_TOKEN)
    assert(
      !/href="https:\/\/apps\.apple\.com[^" ]*[?&](?:amp;)?(?:pt|ct)=/.test(
        html,
      ),
      `${path} attribution not faked`,
    );
  const links = get('a')
    .map((n) => attr(n, 'href'))
    .filter(Boolean);
  const provider =
    process.env.APPLE_PROVIDER_TOKEN || config.appleProviderToken;
  for (const href of links.filter((href) =>
    href.startsWith('https://apps.apple.com/'),
  )) {
    const url = new URL(href);
    assert(
      [...listings.values()].some(
        (listing) => new URL(listing).pathname === url.pathname,
      ),
      `${path} genuine App Store destination`,
    );
    assert.equal(
      url.searchParams.get('pt'),
      provider || null,
      `${path} provider token`,
    );
    if (provider) {
      assert.match(
        url.searchParams.get('ct') || '',
        /^hailink_[a-z0-9_]{1,22}$/,
        `${path} campaign name`,
      );
      assert.equal(
        url.searchParams.get('mt'),
        '8',
        `${path} campaign media type`,
      );
    }
  }
  if (banner && provider) {
    const affiliate = new URLSearchParams(banner.split('affiliate-data=')[1]);
    assert.equal(affiliate.get('pt'), provider, `${path} banner provider`);
    assert.match(
      affiliate.get('ct') || '',
      /^hailink_[a-z0-9_]{1,22}$/,
      `${path} banner campaign`,
    );
    assert.equal(affiliate.get('mt'), '8', `${path} banner media type`);
  }
  const internal = links.filter(
    (href) => href.startsWith('/') && !href.startsWith('//'),
  );
  for (const href of internal) {
    const target = new URL(href, origin).pathname;
    if (target.includes('.')) await access(`dist${target}`);
    else
      await access(`dist/${target === '/' ? 'index' : target.slice(1)}.html`);
    assert.equal(target, canonicalPath(target), `${path} internal alias link`);
  }
  for (const img of get('img')) {
    const src = attr(img, 'src');
    assert(src?.startsWith('/'), `${path} remote image`);
    await access('dist' + new URL(src, origin).pathname);
    assert(
      attr(img, 'width') &&
        attr(img, 'height') &&
        attr(img, 'alt') !== undefined,
      `${path} image geometry/accessibility`,
    );
  }
  pages.set(path, {
    get,
    graph,
    noindex,
    internal,
    title: text(get('title')[0]),
    mainLinks: walk(main)
      .filter((n) => n.tagName === 'a')
      .map((n) => attr(n, 'href'))
      .filter(Boolean),
  });
}
const titles = new Set();
for (const [path, p] of pages) {
  if (p.noindex) continue;
  assert(!titles.has(p.title), `${path} duplicate title`);
  titles.add(p.title);
  const en = path.replace(/^\/zh/, '') || '/';
  const expected = {
    en: origin + en,
    'zh-CN': origin + (en === '/' ? '/zh' : '/zh' + en),
    'x-default': origin + en,
  };
  for (const [language, url] of Object.entries(expected)) {
    const link = p.get('link', (n) => attr(n, 'hreflang') === language);
    assert.equal(link.length, 1, `${path} ${language}`);
    assert.equal(attr(link[0], 'href'), url);
    assert(pages.has(new URL(url).pathname), `${path} reciprocal target`);
  }
  if (/^\/(?:zh\/)?(?:guides|templates)\//.test(path))
    assert(
      [...pages].some(
        ([other, q]) => other !== path && q.mainLinks.includes(path),
      ),
      `${path} orphan resource`,
    );
}
const robots = await readFile('dist/robots.txt', 'utf8');
for (const bot of [
  'Googlebot',
  'Bingbot',
  'OAI-SearchBot',
  'ChatGPT-User',
  '*',
])
  assert(robots.includes(`User-agent: ${bot}\nAllow: /`));
assert(!/crawl-delay|Disallow:\s*\//i.test(robots));
assert(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
assert.equal(
  (await readFile(`dist/${config.indexNowKey}.txt`, 'utf8')).trim(),
  config.indexNowKey,
);
assert(
  (await readFile('dist/llms.txt', 'utf8')).includes(
    'Shenzhen Hailink Technology Co., Ltd.',
  ),
);
assert.equal(
  assets.sourceSha256,
  createHash('sha256')
    .update(await readFile('src/data/templates.json'))
    .digest('hex'),
  'Regenerate template assets after field/copy changes',
);
for (const asset of assets.assets) {
  const bytes = await readFile('dist' + asset.file);
  assert.equal(createHash('sha256').update(bytes).digest('hex'), asset.sha256);
  if (asset.file.endsWith('.pdf'))
    assert(bytes.toString('utf8', 0, 5) === '%PDF-');
  else assert(bytes.toString('utf8').split(/\r?\n/).length >= 11);
}
const report = {
  pages: pages.size,
  indexable: sitemap.size,
  guides: guides.length * 2,
  templates: templates.length * 2,
  downloads: assets.assets.length,
  serverRendered: true,
  canonical: true,
  hreflang: true,
  schema: true,
  robots: true,
  smartBanners: true,
  internalLinks: true,
};
await mkdir('artifacts', { recursive: true });
await writeFile('artifacts/seo-check.json', JSON.stringify(report, null, 2));
console.log('SEO gate PASS', report);
