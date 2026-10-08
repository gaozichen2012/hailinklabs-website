import { mkdir, writeFile, readdir, stat, readFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { resolve, extname } from 'node:path';
import { setTimeout } from 'node:timers/promises';
import lighthouse from 'lighthouse';
import { chromium } from '@playwright/test';
const production = process.env.QUALITY_PRODUCTION === '1';
const base = production ? 'https://hailinklabs.com' : 'http://127.0.0.1:4322';
const root = resolve('dist');
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.json': 'application/json',
  '.pdf': 'application/pdf',
  '.csv': 'text/csv',
};
const server = production
  ? undefined
  : createServer(async (req, res) => {
      try {
        const path = decodeURIComponent(new URL(req.url, base).pathname);
        const filename =
          path === '/'
            ? 'index.html'
            : path.slice(1) + (extname(path) ? '' : '.html');
        const full = resolve(root, filename);
        if (!full.startsWith(root + '/')) throw new Error('Invalid path');
        const bytes = await readFile(full);
        res.writeHead(200, {
          'Content-Type': mime[extname(full)] || 'application/octet-stream',
        });
        res.end(bytes);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
if (server)
  await new Promise((done, reject) => {
    server.once('error', reject);
    server.listen(4322, '127.0.0.1', done);
  });
const output = process.env.QUALITY_OUTPUT || 'artifacts/quality';
await mkdir(output, { recursive: true });
let browser;
try {
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const r = await fetch(base);
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {
      /* preview starts asynchronously */
    }
    await setTimeout(300);
  }
  if (!ready) throw new Error('Quality audit preview did not start');
  browser = await chromium.launch({
    args: ['--remote-debugging-port=9229', '--no-proxy-server'],
  });
  const results = [];
  const selectedPaths = process.env.QUALITY_PATHS
    ? process.env.QUALITY_PATHS.split(',')
    : [
        '/',
        '/guides',
        '/guides/time-and-materials-ticket-template',
        '/templates/time-and-materials-ticket',
        '/products/tmproof',
        '/zh/guides/puppy-weight-log-template',
        '/zh/templates/puppy-weight-log',
      ];
  for (const path of selectedPaths) {
    const result = await lighthouse(base + path, {
      port: 9229,
      onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      logLevel: 'error',
      output: ['json', 'html'],
    });
    if (result.lhr.runtimeError)
      throw new Error(result.lhr.runtimeError.message);
    const scores = Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    );
    const metrics = {
      lcp: result.lhr.audits['largest-contentful-paint'].numericValue,
      cls: result.lhr.audits['cumulative-layout-shift'].numericValue,
    };
    const name = path === '/' ? 'home' : path.slice(1).replaceAll('/', '-');
    await writeFile(`${output}/${name}.json`, result.report[0]);
    await writeFile(`${output}/${name}.html`, result.report[1]);
    const failures = Object.values(result.lhr.audits)
      .filter(
        (a) =>
          a.score !== null && a.score < 1 && a.details?.type !== 'opportunity',
      )
      .map((a) => ({ id: a.id, title: a.title, score: a.score }));
    results.push({ path, scores, ...metrics, failures });
    console.log(path, scores, metrics);
  }
  const sizes = [];
  for (const file of await readdir('dist', { recursive: true })) {
    const s = await stat('dist/' + file);
    if (s.isFile()) sizes.push({ file, bytes: s.size });
  }
  const report = {
    checkedAt: new Date().toISOString(),
    mode: production ? 'production' : 'local mobile simulated throttling',
    results,
    largestAssets: sizes.sort((a, b) => b.bytes - a.bytes).slice(0, 15),
    htmlMax: Math.max(
      ...sizes.filter((s) => s.file.endsWith('.html')).map((s) => s.bytes),
    ),
    cssBytes: sizes
      .filter((s) => s.file.endsWith('.css'))
      .reduce((sum, s) => sum + s.bytes, 0),
  };
  await writeFile(`${output}/summary.json`, JSON.stringify(report, null, 2));
} finally {
  await browser?.close();
  if (server) await new Promise((done) => server.close(done));
}
