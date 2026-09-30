import { expect, test } from '@playwright/test';

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} discovery, support and real screenshots`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/products`);
    await expect(page.locator('.catalog-group')).toHaveCount(4);
    await page.locator('.category-links a[href="#family"]').click();
    await expect(page.locator('#family')).toBeInViewport();
    await expect(page.locator('#family')).toContainText('TurnMath');
    await expect(page.locator('#family')).toContainText('MinuteSprout');
    await page.locator(`header a[href="${prefix}/support"]`).click();
    await expect(page.locator('.support-directory a')).toHaveCount(12);
    await page
      .locator('.support-directory a')
      .filter({ hasText: 'HearDraw' })
      .click();
    await expect(page).toHaveURL(/heardraw\/support$/);
    for (const slug of ['samejob', 'gearproof']) {
      await page.goto(`${prefix}/products/${slug}`);
      await expect(page.locator('.product-intro .price-summary')).toContainText(
        slug === 'samejob' ? '$29.99' : '$19.99',
      );
      await expect(page.locator('.product-intro .data-summary')).toBeVisible();
      const images = page.locator('.product-gallery img');
      await expect(images).toHaveCount(4);
      for (const image of await images.all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect
          .poll(() =>
            image.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);
      }
    }
  });
}
