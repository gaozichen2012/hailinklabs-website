import { expect, test } from '@playwright/test';

const names = ['SameJob', 'TMProof', 'LitterRound', 'CalvingPocket'];
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} complete product matrix and resource paths`, async ({
    page,
  }) => {
    for (const route of [prefix || '/', `${prefix}/products`]) {
      await page.goto(route);
      await expect(page.locator('.matrix-card')).toHaveCount(4);
      for (const name of names) {
        const card = page
          .locator('.matrix-card')
          .filter({ has: page.getByRole('heading', { name, exact: true }) });
        await expect(card.locator('a')).toHaveAttribute(
          'href',
          `${prefix}/products/${name.toLowerCase()}`,
        );
      }
    }
    for (const name of names) {
      const path = `${prefix}/products/${name.toLowerCase()}`;
      await page.goto(path);
      await expect(page.locator('main h1')).toContainText(name);
      await expect(page.locator('#pricing')).toBeVisible();
      await page.locator(`main a[href="${path}/support"]`).click();
      await expect(page.locator('main')).toContainText(
        prefix ? '备份' : 'backup',
      );
      await page.locator(`main a[href="${path}/privacy"]`).click();
      await expect(page.locator('article.policy')).toBeVisible();
    }
  });
}

test('product-specific privacy stays faithful to data use', async ({
  page,
}) => {
  await page.goto('/products/tmproof/privacy');
  await expect(page.locator('article')).toContainText(
    'drawn mark, signer name and signing time',
  );
  await expect(page.locator('article')).toContainText(
    'does not use in-app purchase processing',
  );
  await page.goto('/products/litterround/privacy');
  await expect(page.locator('article')).toContainText(
    'Puppy photos are optional',
  );
  await expect(page.locator('article')).toContainText(
    'does not use signatures',
  );
  await page.goto('/products/calvingpocket/privacy');
  await expect(page.locator('article')).toContainText(
    'does not use photos, signatures, location, vaccination records',
  );
  await page.goto('/products/samejob/privacy');
  await expect(page.locator('article')).toContainText(
    'private iCloud database',
  );
});

test('published pricing matches implemented access', async ({ page }) => {
  await page.goto('/products/samejob');
  await expect(page.locator('#pricing')).toContainText('$29.99');
  await expect(page.locator('#pricing')).toContainText(
    '5 finalized invoices and estimates',
  );
  await expect(page.locator('#pricing')).toContainText('no seven-day trial');
  for (const [slug, price] of [
    ['litterround', '$9.99'],
    ['calvingpocket', '$19.99'],
  ]) {
    await page.goto(`/products/${slug}`);
    await expect(page.locator('#pricing')).toContainText(
      `${price} one-time purchase`,
    );
    await expect(page.locator('#pricing')).toContainText('7 days');
  }
});
