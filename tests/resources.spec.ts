import { test, expect } from '@playwright/test';
import { guides, templates } from '../src/data/resources';
import { listings } from '../src/data/catalog';
import { buildAppStoreUrl, campaignName } from '../src/data/app-store';
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} resource clusters, answers and real App Store banners`, async ({
    request,
  }) => {
    test.setTimeout(120_000);
    for (const g of guides) {
      const response = await request.get(`${prefix}/guides/${g.slug}`);
      expect(response.status()).toBe(200);
      const html = await response.text();
      expect(html).toContain('class="quick-answer"');
      expect(html).toContain(
        `app-id=${listings[g.app].url.match(/id(\d+)/)![1]}`,
      );
      expect(html).toContain(`${prefix}/templates/${g.template}`);
      expect(html).toContain(`${prefix}/products/${g.app}`);
      expect(html).toContain('"@type":"Article"');
      expect(html).not.toMatch(/"@type":"(?:FAQPage|Review)"/);
    }
    for (const t of templates) {
      const r = await request.get(`${prefix}/templates/${t.slug}`);
      expect(r.status()).toBe(200);
      const html = await r.text();
      expect(html).toContain(`href="/downloads/${t.slug}.pdf"`);
      expect(html).toContain(
        `href="/downloads/${t.slug}${prefix ? '-zh' : ''}.csv"`,
      );
      expect(html).toContain('class="print-sheet"');
      for (const suffix of ['.pdf', '.csv', '-zh.csv']) {
        const asset = await request.get(`/downloads/${t.slug}${suffix}`);
        expect(asset.status()).toBe(200);
        expect(asset.headers()['content-type']).toContain(
          suffix === '.pdf' ? 'application/pdf' : 'text/csv',
        );
        const bytes = await asset.body();
        expect(bytes.length).toBeGreaterThan(100);
        if (suffix === '.pdf')
          expect(bytes.toString('utf8', 0, 5)).toBe('%PDF-');
      }
    }
  });
}
test('direct answers and template downloads work with JavaScript disabled', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    acceptDownloads: true,
  });
  const page = await context.newPage();
  await page.goto(`${baseURL}/guides/time-and-materials-ticket-template`);
  await expect(page.locator('.quick-answer')).toContainText('labor hours');
  await page
    .getByRole('link', { name: 'View, print or download the template' })
    .click();
  await expect(page.locator('.print-sheet table tbody tr')).toHaveCount(11);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download CSV', exact: true }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    'time-and-materials-ticket.csv',
  );
  await page.locator('.language-switch').click();
  await expect(page.locator('h1')).toHaveText('工时与材料工单模板');
  await context.close();
});
test('campaigns retain normal links without a provider and use stable legal-length names', () => {
  expect(
    buildAppStoreUrl({
      slug: 'tmproof',
      source: 'guide',
      content: 'tm_ticket',
      providerToken: null,
    }),
  ).toBe(listings.tmproof.url);
  const names = new Set<string>();
  for (const item of [...guides, ...templates]) {
    const source = guides.includes(item as (typeof guides)[number])
      ? 'guide'
      : 'template';
    const name = campaignName(item.app, source, item.slug);
    expect(name.length).toBeLessThanOrEqual(30);
    expect(names.has(name)).toBe(false);
    names.add(name);
    expect(campaignName(item.app, source, item.slug)).toBe(name);
    const url = new URL(
      buildAppStoreUrl({
        slug: item.app,
        source,
        content: item.slug,
        providerToken: '987654321',
      })!,
    );
    expect(url.searchParams.get('pt')).toBe('987654321');
    expect(url.searchParams.get('ct')).toBe(name);
    expect(url.searchParams.get('mt')).toBe('8');
  }
  expect(
    buildAppStoreUrl({ slug: 'linelilt', providerToken: null }),
  ).toBeUndefined();
  expect(() =>
    buildAppStoreUrl({ slug: 'samejob', providerToken: 'placeholder' }),
  ).toThrow();
});
