import { readFile } from 'node:fs/promises';

const review = JSON.parse(
  await readFile(
    new URL('../src/data/privacy-review.json', import.meta.url),
    'utf8',
  ),
);
if (!review.approved || !review.reviewedOn || review.remaining.length) {
  console.error(
    'Release blocked: the SameJob privacy policy needs owner confirmation. See docs/APPLE_ORGANIZATION_READINESS.md.',
  );
  process.exit(1);
}
console.log('Privacy publication review is complete.');
