import { test } from 'node:test';
import assert from 'node:assert/strict';
import { changedUrls, validateManifest } from './indexnow-lib.mjs';
const a = {
  url: 'https://hailinklabs.com/products/tmproof',
  sha256: 'a'.repeat(64),
};
const b = {
  url: 'https://hailinklabs.com/guides/time-and-materials-ticket-template',
  sha256: 'b'.repeat(64),
};
test('IndexNow submits changed or new content, not unchanged deploys', () => {
  assert.deepEqual(changedUrls([a, b], [a, b]), []);
  assert.deepEqual(changedUrls([a, b], [a]), [b.url]);
  assert.deepEqual(changedUrls([{ ...a, sha256: 'c'.repeat(64) }, b], [a, b]), [
    a.url,
  ]);
  assert.deepEqual(changedUrls([a], []), [a.url]);
});
test('IndexNow rejects other hosts, duplicate URLs and malformed fingerprints', () => {
  for (const entries of [
    [a, a],
    [{ ...a, url: 'https://example.com/' }],
    [{ ...a, sha256: 'invalid' }],
  ])
    assert.throws(() => validateManifest({ version: 1, entries }));
  assert.equal(
    validateManifest({ version: 1, entries: [a, b] }).entries.length,
    2,
  );
});
