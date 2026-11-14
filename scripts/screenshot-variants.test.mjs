import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import sharp from 'sharp';

test('responsive screenshots preserve originals and have valid smaller delivery files', async () => {
  const images = JSON.parse(
    await readFile('src/data/screenshot-variants.json', 'utf8'),
  );
  const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
  for (const [source, image] of Object.entries(images)) {
    const original = await readFile(`public${source}`);
    assert.equal(hash(original), image.sourceSha256, source);
    assert.equal(original.length, image.sourceBytes, source);
    const metadata = await sharp(original).metadata();
    assert.equal(metadata.width, image.width, source);
    assert.equal(metadata.height, image.height, source);
    assert.equal(image.variants.at(-1).width, image.width, source);
    assert.equal(
      new Set(image.variants.map((v) => v.width)).size,
      image.variants.length,
    );
    for (const variant of image.variants) {
      const bytes = await readFile(`public${variant.file}`);
      assert.equal(hash(bytes), variant.sha256, variant.file);
      assert.equal(bytes.length, variant.bytes, variant.file);
      assert(bytes.length < original.length, variant.file);
      const decoded = await sharp(bytes).metadata();
      assert.equal(decoded.format, 'webp', variant.file);
      assert.equal(decoded.width, variant.width, variant.file);
      assert.equal(decoded.height, variant.height, variant.file);
      assert(variant.width <= image.width, variant.file);
      assert(
        Math.abs(
          variant.height - (image.height * variant.width) / image.width,
        ) <= 1,
        `Uncropped aspect ratio: ${variant.file}`,
      );
    }
  }
});
