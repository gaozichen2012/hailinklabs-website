import { writeFile, mkdir, readFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';

const brand = JSON.parse(
  await readFile(
    new URL('../src/data/brand-assets.json', import.meta.url),
    'utf8',
  ),
);

const origin = 'https://hailinklabs.com';
// Read the built sitemap so new language routes cannot be silently skipped.
const sitemap = await readFile(
  new URL('../dist/sitemap.xml', import.meta.url),
  'utf8',
);
const businessPaths = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]).pathname,
);
if (businessPaths.length === 0)
  throw new Error('Build the site before verifying production.');
const media = JSON.parse(
  await readFile(
    new URL('../src/data/product-media.json', import.meta.url),
    'utf8',
  ),
);
const paths = [
  ...businessPaths,
  '/404',
  ...media.assets.map((asset) => asset.file.replace(/^public/, '')),
  ...(await readdir(new URL('../public/social/', import.meta.url)))
    .filter((file) => file.endsWith('.png'))
    .map((file) => `/social/${file}`),
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/brand/hailink-logo.svg',
  '/brand/hailink-symbol.svg',
  ...(await readdir(new URL('../dist/_astro/', import.meta.url)))
    .filter((file) => file.endsWith('.css'))
    .map((file) => `/_astro/${file}`),
];
const results = [];
for (const path of paths) {
  const url = origin + path;
  try {
    const r = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });
    const bytes = Buffer.from(await r.arrayBuffer());
    const body = bytes.toString();
    const asset = brand.assets.find((entry) => entry.file === `public${path}`);
    const page = !path.includes('.');
    const storyUndo =
      /^\/(?:zh\/)?(?:products\/)?storyundo(?:\/(?:support|privacy))?$/.test(
        path,
      );
    const expected = await readFile(
      new URL(
        `../dist/${path === '/' ? 'index.html' : page ? `${path.slice(1)}.html` : path.slice(1)}`,
        import.meta.url,
      ),
    );
    const sha256 = createHash('sha256').update(bytes).digest('hex');
    const expectedSha256 = createHash('sha256').update(expected).digest('hex');
    const pass =
      r.status === 200 &&
      sha256 === expectedSha256 &&
      (!asset ||
        createHash('sha256').update(bytes).digest('hex') === asset.sha256) &&
      new URL(r.url).origin === origin &&
      (!page ||
        (body.includes(
          path.startsWith('/zh')
            ? '深圳市海狸智联科技有限公司'
            : 'Shenzhen Hailink Technology Co., Ltd.',
        ) &&
          body.includes(`lang="${path.startsWith('/zh') ? 'zh-CN' : 'en'}"`) &&
          (!['/contact', '/products/samejob/support'].includes(path) ||
            body.includes('gaozichen@hailinklabs.com')) &&
          body.includes(`rel="canonical" href="${url}"`) &&
          body.includes('/brand/hailink-logo.svg') &&
          !(
            storyUndo
              ? /lorem ipsum|placeholder|\bTODO\b|review copy|in development|开发中|\bBeta\b/i
              : /lorem ipsum|placeholder|\bTODO\b|review copy|coming soon/i
          ).test(body) &&
          (!storyUndo ||
            (body.includes(
              path.startsWith('/zh')
                ? '即将推出，目前处于内部测试，尚未在 App Store 公开提供。'
                : 'Coming soon — internal testing. Not publicly available on the App Store.',
            ) &&
              !/href=["']https:\/\/apps\.apple\.com(?:\/|["'])/i.test(body)))));
    results.push({
      url,
      status: r.status,
      finalUrl: r.url,
      sha256,
      expectedSha256,
      pass,
    });
  } catch (error) {
    results.push({
      url,
      pass: false,
      error: error.cause?.code || error.message,
    });
  }
}
try {
  const url = origin + '/this-page-does-not-exist';
  const r = await fetch(url, { signal: AbortSignal.timeout(15000) });
  results.push({
    url,
    status: r.status,
    pass: r.status === 404 && (await r.text()).includes('Page not found'),
  });
} catch (error) {
  results.push({
    url: origin + '/this-page-does-not-exist',
    pass: false,
    error: error.cause?.code || error.message,
  });
}
for (const url of [
  'https://www.hailinklabs.com/products/samejob/support?check=1',
  'http://hailinklabs.com/products/samejob?check=1',
]) {
  try {
    const r = await fetch(url, {
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
    });
    const expected = url.replace(/^http:/, 'https:').replace('www.', '');
    const location = r.headers.get('location');
    results.push({
      url,
      status: r.status,
      location,
      pass: [301, 308].includes(r.status) && location === expected,
    });
  } catch (error) {
    results.push({
      url,
      pass: false,
      error: error.cause?.code || error.message,
    });
  }
}
await mkdir('artifacts', { recursive: true });
await writeFile(
  'artifacts/production-verification.json',
  JSON.stringify({ checkedAt: new Date().toISOString(), results }, null, 2),
);
console.table(results);
if (results.some((r) => !r.pass)) process.exitCode = 1;
