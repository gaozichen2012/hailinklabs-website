export const changedUrls = (current, previous) => {
  const old = new Map(previous.map((entry) => [entry.url, entry.sha256]));
  return current
    .filter((entry) => old.get(entry.url) !== entry.sha256)
    .map((entry) => entry.url);
};
export function validateManifest(manifest) {
  if (manifest.version !== 1 || !Array.isArray(manifest.entries))
    throw new Error('Invalid search manifest');
  const urls = new Set();
  for (const entry of manifest.entries) {
    const url = new URL(entry.url);
    if (
      url.origin !== 'https://hailinklabs.com' ||
      url.search ||
      url.hash ||
      !/^[a-f0-9]{64}$/.test(entry.sha256) ||
      urls.has(entry.url)
    )
      throw new Error('Invalid or duplicate IndexNow URL');
    urls.add(entry.url);
  }
  return manifest;
}
