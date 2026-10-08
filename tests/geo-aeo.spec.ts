import { expect, test } from '@playwright/test';
const slugs = [
  'samejob',
  'gearproof',
  'tmproof',
  'pressrecipe',
  'litterround',
  'calvingpocket',
];
for (const prefix of ['', '/zh']) {
  for (const slug of slugs) {
    test(`GEO ${prefix || 'en'} ${slug} decision facts are visible without scripts`, async ({
      page,
    }) => {
      await page.goto(`${prefix}/products/${slug}`);
      for (const heading of prefix
        ? ['适用与不适用', '导出与备份', '常见问题']
        : ['When to choose it', 'Export and backup', 'Common questions']) {
        await expect(
          page.getByRole('heading', { name: heading, exact: true }),
        ).toBeVisible();
      }
      await expect(
        page.locator('a[href*="apps.apple.com"]').first(),
      ).toHaveAttribute('href', /[?&]pt=/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://hailinklabs.com${prefix}/products/${slug}`,
      );
      const main = await page.locator('main').innerText();
      expect(main.length).toBeGreaterThan(1000);
      expect(main).not.toMatch(/Coming Soon|ignore previous instructions/i);
      const html = await page.content();
      expect(html).not.toMatch(/<script(?![^>]*type="application\/ld\+json")/);
    });
  }
}
test('GEO discovery and compatible handoff facts', async ({ request }) => {
  const llms = await (await request.get('/llms.txt')).text();
  expect(llms.indexOf('## Apps with verified')).toBeLessThan(
    llms.indexOf('## Product information without'),
  );
  for (const slug of slugs) {
    expect(llms).toContain(`/products/${slug}/support`);
    expect(llms).toContain(`/products/${slug}/privacy`);
  }
  const manifest = await (
    await request.get('/acquisition-manifest.json')
  ).json();
  expect(manifest.schemaVersion).toBe(1);
  for (const slug of slugs) {
    const product = manifest.products.find(
      (p: { slug: string }) => p.slug === slug,
    );
    expect(product.listing.appId).toBeGreaterThan(0);
    expect(product.listing.version).toBeTruthy();
    expect(product.fitAndLimits).toHaveLength(2);
    expect(product.templates).toHaveLength(1);
    expect(product.guides).toHaveLength(3);
  }
});
