import { expect, test } from '@playwright/test';

test('official brand assets load and keep their proportions in both languages', async ({
  page,
}) => {
  for (const path of ['/', '/zh', '/about', '/zh/about']) {
    await page.goto(path);
    const logos = page.locator('.brand-logo');
    expect(await logos.count()).toBeGreaterThanOrEqual(2);
    for (const logo of await logos.all()) {
      await expect(logo).toBeVisible();
      const image = await logo.evaluate((element) => {
        const img = element as HTMLImageElement;
        const rect = img.getBoundingClientRect();
        return {
          loaded: img.complete && img.naturalWidth > 0,
          ratio: rect.width / rect.height,
        };
      });
      expect(image.loaded).toBe(true);
      expect(image.ratio).toBeCloseTo(719 / 106, 1);
    }
    const icon = await page.request.get('/favicon.svg');
    expect(icon.ok()).toBe(true);
    expect(await icon.text()).toContain('#2F7A58');
  }
});

test('contact offers direct support for all supported apps', async ({
  page,
}) => {
  for (const path of ['/contact', '/zh/contact']) {
    await page.goto(path);
    await expect(page.locator('.support-directory a')).toHaveCount(11);
    await page
      .locator('.support-directory a')
      .filter({ hasText: 'PressRecipe' })
      .click();
    await expect(page).toHaveURL(/\/products\/pressrecipe\/support$/);
  }
});
