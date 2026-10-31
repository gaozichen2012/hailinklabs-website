import { test, expect } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const cases = [
  [
    'samejob',
    'invoice-template-repeat-customers',
    'repeat-customer-invoice',
    '6814700434',
  ],
  [
    'tmproof',
    'time-and-materials-ticket-template',
    'time-and-materials-ticket',
    '6814884804',
  ],
  [
    'pressrecipe',
    'heat-press-settings-log',
    'heat-press-settings-log',
    '6816618604',
  ],
  [
    'litterround',
    'puppy-weight-log-template',
    'puppy-weight-log',
    '6814862263',
  ],
];

for (const [slug, guide, sheet, appId] of cases) {
  for (const prefix of ['', '/zh']) {
    test(`${slug} ${prefix || 'en'} search to worksheet and official App`, async ({
      page,
      request,
    }) => {
      await page.goto(`${prefix}/products/${slug}`);
      await page.locator('.product-resource-links a').first().click();
      await expect(page).toHaveURL(
        new RegExp(`${prefix}/guides/${guide}#record-format$`),
      );
      await expect(page.locator('#record-format')).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const graph = JSON.parse(
        (await page
          .locator('script[type="application/ld+json"]')
          .textContent())!,
      )['@graph'];
      expect(
        graph.find((n: Record<string, unknown>) => n['@type'] === 'Article')
          .about['@id'],
      ).toBe(`https://hailinklabs.com/products/${slug}#software`);
      await page
        .locator(`a[href="${prefix}/templates/${sheet}"]`)
        .first()
        .click();
      await expect(page.locator('h1')).toHaveCount(1);
      const csv = await request.get(`/downloads/${sheet}.csv`);
      expect(csv.ok()).toBe(true);
      expect(
        createHash('sha256')
          .update(await csv.body())
          .digest('hex'),
      ).toBe(
        createHash('sha256')
          .update(await readFile(`public/downloads/${sheet}.csv`))
          .digest('hex'),
      );
      await page.goto(`${prefix}/guides/${guide}`);
      await page.locator('.resource-product-details a').first().click();
      await expect(page).toHaveURL(
        new RegExp(`/products/${slug}#common-questions$`),
      );
      await expect(page.locator('#common-questions h3')).toHaveCount(
        slug === 'samejob' ? 9 : 8,
      );
      const productGraph = JSON.parse(
        (await page
          .locator('script[type="application/ld+json"]')
          .textContent())!,
      )['@graph'];
      const app = productGraph.find(
        (n: Record<string, unknown>) => n['@type'] === 'SoftwareApplication',
      );
      expect(app['@id']).toBe(
        `https://hailinklabs.com/products/${slug}#software`,
      );
      expect(app.identifier).toBe(appId);
      expect(app.downloadUrl).toContain(`id${appId}`);
      expect(
        await page
          .locator('main a[href*="apps.apple.com"]')
          .first()
          .getAttribute('href'),
      ).toContain(`id${appId}`);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    });
  }
}
