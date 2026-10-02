// Regenerate the checked-in 1200 × 630 social cards after changing public copy:
//   node scripts/generate-social-images.mjs
// Run npm ci first. Uses TypeScript and the sharp version already locked through
// Astro, plus local assets and system fonts. No browser or runtime code is added.
// These are brand compositions, not new or modified app interface screenshots.

import assert from 'node:assert/strict';
import { Buffer } from 'node:buffer';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'public/social');
const width = 1200;
const height = 630;

// Transpile the site's source data in memory. No build, server, generated module
// or duplicated product descriptions are needed to regenerate the cards.
const asModule = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString('base64')}`;
const transpile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const productsModule = asModule(
  transpile(await readFile(join(root, 'src/data/products.ts'), 'utf8')),
);
const catalogSource = transpile(
  await readFile(join(root, 'src/data/catalog.ts'), 'utf8'),
).replace(/from ['"]\.\/products['"]/g, `from '${productsModule}'`);
const { catalog, categories } = await import(asModule(catalogSource));

const brandManifest = JSON.parse(
  await readFile(join(root, 'src/data/brand-assets.json'), 'utf8'),
);
const mediaManifest = JSON.parse(
  await readFile(join(root, 'src/data/product-media.json'), 'utf8'),
);
async function asset(relativePath, mime) {
  const buffer = await readFile(join(root, relativePath));
  const source = [...brandManifest.assets, ...mediaManifest.assets].find(
    (entry) => entry.file === relativePath,
  );
  assert(source, `Missing source provenance: ${relativePath}`);
  assert.equal(
    createHash('sha256').update(buffer).digest('hex'),
    source.sha256,
    `Source asset changed: ${relativePath}`,
  );
  return `data:${mime};base64,${buffer.toString('base64')}`;
}

const logo = await asset('public/brand/hailink-logo.svg', 'image/svg+xml');
const symbol = await asset('public/brand/hailink-symbol.svg', 'image/svg+xml');
const screenshots = {
  samejob: await asset(
    'public/products/samejob/01-repeat-invoices.jpg',
    'image/jpeg',
  ),
  gearproof: await asset(
    'public/products/gearproof/01-multi-item-handoff.jpg',
    'image/jpeg',
  ),
};

const escape = (value) =>
  value.replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        character
      ],
  );

const cards = [
  {
    slug: 'hailink-labs',
    name: 'Small apps.',
    secondLine: 'Real-life value.',
    summary: 'Focused apps for work, training, and family life.',
    category: 'Independent software',
    general: true,
  },
  ...catalog.map((product) => ({
    slug: product.slug,
    name: product.name,
    summary: product.summary[0],
    category: categories.find((category) =>
      category.slugs.includes(product.slug),
    )?.title[0],
  })),
];

// Text and rasterization use the same local font stack. Measure every line so
// future public copy changes fail clearly rather than clipping a social card.
const font = 'Arial';
async function measure(text, size, bold = false) {
  const { info } = await sharp({
    text: {
      text: escape(text),
      font: `${font} ${bold ? 'Bold ' : ''}${size}`,
      rgba: true,
    },
  }).toBuffer({ resolveWithObject: true });
  return info.width;
}

async function balancedLines(text, size, maxWidth) {
  const words = text.split(' ');
  if ((await measure(text, size)) <= 440) return [text];
  const candidates = [];
  for (let index = 1; index < words.length; index += 1) {
    const lines = [
      words.slice(0, index).join(' '),
      words.slice(index).join(' '),
    ];
    const lengths = await Promise.all(lines.map((line) => measure(line, size)));
    if (lengths.every((length) => length <= maxWidth)) {
      candidates.push({ lines, difference: Math.abs(lengths[0] - lengths[1]) });
    }
  }
  candidates.sort((a, b) => a.difference - b.difference);
  assert(
    candidates.length,
    `Summary needs shorter copy or a new layout: ${text}`,
  );
  return candidates[0].lines;
}

async function renderCard(card) {
  assert.match(card.slug, /^[a-z0-9-]+$/);
  assert(card.category, `Missing category for ${card.slug}`);
  const screenshot = screenshots[card.slug];
  const titleSize = card.general ? 80 : 78;
  const summarySize = card.general ? 27 : 32;
  const lines = await balancedLines(card.summary, summarySize, 685);
  assert(
    (await measure(card.name, titleSize, true)) < 736,
    `${card.slug}: title too long`,
  );
  if (card.secondLine) {
    assert(
      (await measure(card.secondLine, titleSize, true)) < 736,
      'Second title line too long',
    );
  }
  const image = screenshot
    ? `<image x="920" y="36" width="220" height="478" href="${screenshot}" preserveAspectRatio="xMidYMid meet"/>
       <text x="1030" y="536" text-anchor="middle" font-size="13" fill="#56655b">App interface · English</text>`
    : `<path d="M898 142H1168 M898 409H1168" stroke="#cad8ce"/>
       <image x="917" y="199" width="232" height="155" href="${symbol}" preserveAspectRatio="xMidYMid meet"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="#f5f7f5"/>
    <rect x="866" width="334" height="551" fill="#e7eee8"/>
    <path d="M866 0V551" stroke="#d7e0d9"/>
    <g font-family="Arial, Helvetica, sans-serif" fill="#17191b">
      ${image}
      <image x="64" y="52" width="292" height="43.05" href="${logo}" preserveAspectRatio="xMinYMid meet"/>
      <text x="64" y="${card.general ? 190 : 219}" fill="#2f7a58" font-size="18" font-weight="600" letter-spacing="1.7">${escape(card.category.toUpperCase())}</text>
      <text x="64" y="${card.general ? 288 : 323}" font-size="${titleSize}" font-weight="700" letter-spacing="-3.3">${escape(card.name)}</text>
      ${card.secondLine ? `<text x="64" y="374" font-size="${titleSize}" font-weight="700" letter-spacing="-3.3" fill="#626269">${escape(card.secondLine)}</text>` : ''}
      ${lines.map((line, index) => `<text x="64" y="${(card.general ? 444 : 391) + index * (card.general ? 38 : 43)}" fill="#555e58" font-size="${summarySize}">${escape(line)}</text>`).join('')}
      <path d="M64 551H1136" stroke="#cad4cb"/>
      <text x="64" y="598" font-size="18" fill="#4d5751">hailinklabs.com</text>
      <path d="M1096 591H1136" stroke="#2f7a58" stroke-width="4"/>
    </g>
  </svg>`;
}

await mkdir(output, { recursive: true });
const selectedSlugs = process.argv.slice(2);
for (const slug of selectedSlugs) {
  assert(
    cards.some((card) => card.slug === slug),
    `Unknown card: ${slug}`,
  );
}
for (const card of cards.filter(
  (card) => !selectedSlugs.length || selectedSlugs.includes(card.slug),
)) {
  const svg = await renderCard(card);
  const png = await sharp(Buffer.from(svg))
    .png({ compressionLevel: 9 })
    .toBuffer();
  assert.equal(png.readUInt32BE(16), width);
  assert.equal(png.readUInt32BE(20), height);
  const destination = join(output, `${card.slug}.png`);
  await writeFile(destination, png);
  console.log(
    `${card.slug}.png: ${width}×${height}, ${Math.ceil(png.length / 1024)} KiB`,
  );
}
