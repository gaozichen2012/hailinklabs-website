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

test('public AI crawler policy preserves all declared allow groups', async () => {
  const { readFile } = await import('node:fs/promises');
  const robots = await readFile('dist/robots.txt', 'utf8');
  for (const bot of [
    'Googlebot',
    'Bingbot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'Claude-SearchBot',
    'Claude-User',
    'ClaudeBot',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    '*',
  ]) {
    assert.ok(robots.includes(`User-agent: ${bot}\nAllow: /`), bot);
  }
  assert.ok(!/Disallow:\s*\//i.test(robots));
});
test('fixed AI benchmark has independent categories and unbranded discovery questions', async () => {
  const { readFile } = await import('node:fs/promises');
  const { questions } = JSON.parse(
    await readFile('tests/ai-discovery-benchmark.json', 'utf8'),
  );
  assert.equal(questions.length, 36);
  assert.equal(new Set(questions.map((q) => q.id)).size, 36);
  for (const [category, count] of Object.entries({
    recommendation: 12,
    workflow_template: 12,
    brand_fact: 6,
    negative_fit: 6,
  }))
    assert.equal(
      questions.filter((q) => q.category === category).length,
      count,
    );
  for (const q of questions.filter((q) =>
    ['recommendation', 'workflow_template'].includes(q.category),
  ))
    assert.ok(
      !/Hailink|SameJob|GearProof|TMProof|PressRecipe|LitterRound|CalvingPocket|hailinklabs\.com/i.test(
        q.question,
      ),
    );
});
