import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';

const brand = JSON.parse(
  await readFile(
    new URL('../src/data/brand-assets.json', import.meta.url),
    'utf8',
  ),
);

const origin = 'https://hailinklabs.com';
const businessPaths = [
  '/',
  '/about',
  '/products',
  '/products/samejob',
  '/products/samejob/privacy',
  '/products/samejob/support',
  '/contact',
  '/products/tmproof',
  '/products/tmproof/privacy',
  '/products/tmproof/support',
  '/products/litterround',
  '/products/litterround/privacy',
  '/products/litterround/support',
  '/products/hybridloop',
  '/products/hybridloop/privacy',
  '/products/hybridloop/support',
  '/products/pressrecipe',
  '/products/pressrecipe/privacy',
  '/products/pressrecipe/support',
  '/products/gearproof',
  '/products/gearproof/privacy',
  '/products/gearproof/support',
  '/products/calvingpocket',
  '/products/calvingpocket/privacy',
  '/products/calvingpocket/support',
];
const paths = [
  ...businessPaths,
  ...businessPaths.map((path) => `/zh${path === '/' ? '' : path}`),
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.svg',
  '/favicon-32.png',
  '/apple-touch-icon.png',
  '/brand/hailink-logo.svg',
  '/brand/hailink-symbol.svg',
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
    const pass =
      r.status === 200 &&
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
          !/lorem ipsum|placeholder|\bTODO\b|review copy|coming soon/i.test(
            body,
          )));
    results.push({ url, status: r.status, finalUrl: r.url, pass });
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
