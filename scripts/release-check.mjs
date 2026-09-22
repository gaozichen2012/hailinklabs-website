import { readFile } from 'node:fs/promises';

const review = JSON.parse(
  await readFile(
    new URL('../src/data/privacy-review.json', import.meta.url),
    'utf8',
  ),
);
if (!review.approved || !review.reviewedOn || review.remaining.length) {
  console.error(
    'Release blocked: the SameJob privacy policy needs owner confirmation. See docs/DEPLOYMENT.md (privacy publication gate).',
  );
  process.exit(1);
}
for (const slug of [
  'samejob',
  'tmproof',
  'litterround',
  'calvingpocket',
  'gearproof',
]) {
  const product = review.productSourceReviews?.[slug];
  if (
    !product?.reviewedOn ||
    product.method !== 'source-audit' ||
    !Array.isArray(product.remaining) ||
    product.remaining.length
  ) {
    console.error(
      `Release blocked: missing or incomplete ${slug} privacy source review.`,
    );
    process.exit(1);
  }
}
console.log(
  'Company privacy publication review and all product source reviews are complete.',
);
