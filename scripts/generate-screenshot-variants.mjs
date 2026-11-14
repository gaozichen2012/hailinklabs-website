// Generate responsive delivery copies from existing screenshots. Originals and
// their full-size links stay intact. Uses sharp already locked through Astro.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import sharp from 'sharp';

const galleries = JSON.parse(
  await readFile('src/data/product-galleries.json', 'utf8'),
);
const sources = new Set(
  Object.entries(galleries).flatMap(([slug, shots]) =>
    shots.map((shot) => `/products/${slug}/${shot.file}.jpg`),
  ),
);
for (const [slug, files] of Object.entries({
  samejob: [
    '01-repeat-invoices',
    '02-reuse-job-details',
    '03-preview-pdf',
    '04-keep-your-records',
  ],
  gearproof: [
    '04-gearproof',
    'growth-01-whole-kit',
    'growth-03-two-of-three-batteries',
    'growth-04-damage-note',
    'growth-07-keep-the-record',
  ],
  tmproof: ['demo-ticket', 'demo-signature', 'demo-pdf'],
  pressrecipe: ['demo-A-wash', 'demo-B-wash', 'demo-export'],
})) {
  for (const file of files) sources.add(`/products/${slug}/${file}.jpg`);
}

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const screenshots = {};
for (const source of [...sources].sort()) {
  const bytes = await readFile(`public${source}`);
  const { width, height } = await sharp(bytes).metadata();
  assert(width && height, `Missing dimensions: ${source}`);
  const variants = [];
  for (const targetWidth of [...new Set([320, width])]) {
    const file = source.replace(/\.jpg$/, `-${targetWidth}w.webp`);
    const { data, info } = await sharp(bytes)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toBuffer({ resolveWithObject: true });
    assert(data.length < bytes.length, `Variant is larger: ${file}`);
    await mkdir(dirname(`public${file}`), { recursive: true });
    await writeFile(`public${file}`, data);
    variants.push({
      file,
      width: info.width,
      height: info.height,
      bytes: data.length,
      sha256: sha256(data),
    });
  }
  screenshots[source] = {
    width,
    height,
    sourceBytes: bytes.length,
    sourceSha256: sha256(bytes),
    variants,
  };
}
await writeFile(
  'src/data/screenshot-variants.json',
  JSON.stringify(screenshots, null, 2) + '\n',
);
console.log(`Generated responsive copies for ${sources.size} screenshots.`);
