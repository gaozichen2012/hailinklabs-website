import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { setTimeout } from 'node:timers/promises';
import { changedUrls, validateManifest } from './indexnow-lib.mjs';
const config = JSON.parse(
  await readFile('src/data/search-config.json', 'utf8'),
);
const origin = 'https://hailinklabs.com';
const baselineFile = 'artifacts/indexnow-baseline.json';
await mkdir('artifacts', { recursive: true });
if (!/^[a-zA-Z0-9-]{8,128}$/.test(config.indexNowKey))
  throw new Error('Invalid IndexNow configuration');
if (process.argv[2] === 'snapshot') {
  let baseline;
  try {
    const r = await fetch(`${origin}/indexnow-manifest.json`, {
      signal: AbortSignal.timeout(20000),
    });
    if (r.status === 404)
      baseline = {
        available: true,
        initial: true,
        manifest: { version: 1, entries: [] },
      };
    else if (r.ok)
      baseline = {
        available: true,
        manifest: validateManifest(await r.json()),
      };
    else throw new Error(`Snapshot HTTP ${r.status}`);
  } catch (error) {
    baseline = { available: false, error: error.message };
  }
  await writeFile(baselineFile, JSON.stringify(baseline, null, 2));
  console.log(
    baseline.available
      ? 'Saved pre-deployment IndexNow baseline'
      : 'Baseline unavailable; notification will be skipped safely',
  );
} else {
  const local = validateManifest(
    JSON.parse(await readFile('dist/indexnow-manifest.json', 'utf8')),
  );
  const baseline = JSON.parse(await readFile(baselineFile, 'utf8'));
  const urls = baseline.available
    ? changedUrls(local.entries, baseline.manifest.entries)
    : [];
  const receipt = {
    checkedAt: new Date().toISOString(),
    initial: baseline.initial || false,
    urls,
    state: baseline.available ? 'NO_CHANGES' : 'BASELINE_UNAVAILABLE',
    attempts: [],
  };
  if (urls.length) {
    const keyText = await readFile(`dist/${config.indexNowKey}.txt`, 'utf8');
    if (keyText.trim() !== config.indexNowKey)
      throw new Error('IndexNow key file mismatch');
    try {
      const key = await fetch(`${origin}/${config.indexNowKey}.txt`, {
        signal: AbortSignal.timeout(20000),
      });
      if (!key.ok || (await key.text()).trim() !== config.indexNowKey)
        throw new Error('Live key is not ready');
      const live = await fetch(`${origin}/indexnow-manifest.json`, {
        signal: AbortSignal.timeout(20000),
      });
      if (
        !live.ok ||
        JSON.stringify(validateManifest(await live.json())) !==
          JSON.stringify(local)
      )
        throw new Error(
          'Deployment manifest does not match; do not submit unpublished URLs',
        );
      const payload = {
        host: 'hailinklabs.com',
        key: config.indexNowKey,
        keyLocation: `${origin}/${config.indexNowKey}.txt`,
        urlList: urls,
      };
      receipt.state = 'NOT_ACCEPTED';
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const r = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(25000),
          });
          receipt.attempts.push({
            status: r.status,
            response: (await r.text()).slice(0, 500),
          });
          if ([200, 202].includes(r.status)) {
            receipt.state =
              r.status === 200 ? 'ACCEPTED' : 'ACCEPTED_KEY_VALIDATION_PENDING';
            break;
          }
          if (r.status < 500 && r.status !== 429) break;
        } catch (error) {
          receipt.attempts.push({ error: error.message });
        }
        if (attempt < 2) await setTimeout(1000 * (attempt + 1));
      }
    } catch (error) {
      receipt.state = 'LIVE_NOT_READY';
      receipt.error = error.message;
    }
  }
  await writeFile(
    'artifacts/indexnow-receipt.json',
    JSON.stringify(receipt, null, 2),
  );
  console.log(
    `IndexNow: ${receipt.state}; ${urls.length} changed URLs. Acceptance is not indexing.`,
  );
  if (
    !['ACCEPTED', 'ACCEPTED_KEY_VALIDATION_PENDING', 'NO_CHANGES'].includes(
      receipt.state,
    )
  )
    console.warn(
      'IndexNow unavailable; website remains deployed. Retain receipt and retry with the saved pre-deployment baseline.',
    );
}
