import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { buildAppStoreUrl } from '../src/data/app-store';

test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} Puppy weight template reader can compare the App, review actual screenshots and reach pricing`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/templates/puppy-weight-log`);
    const freeCsv = `/downloads/puppy-weight-log${prefix ? '-zh' : ''}.csv`;
    const option = page.locator('.task-app-shortcut');
    expect(
      (await page.locator(`a[href="${freeCsv}"]`).boundingBox())!.y,
    ).toBeLessThan((await option.boundingBox())!.y);
    expect((await option.boundingBox())!.y).toBeLessThan(
      (await page.locator('.worksheet-preview').first().boundingBox())!.y,
    );
    const freeDownloadEvent = page.waitForEvent('download');
    await page.locator(`a[href="${freeCsv}"]`).click();
    expect(await (await freeDownloadEvent).failure()).toBeNull();
    const freeResponse = await request.get(freeCsv);
    expect(freeResponse.ok()).toBe(true);
    expect(
      createHash('sha256')
        .update(await freeResponse.body())
        .digest('hex'),
    ).toBe(
      createHash('sha256')
        .update(await readFile(`public${freeCsv}`))
        .digest('hex'),
    );
    await expect(
      option.locator(`a[href="${prefix}/products/litterround#gallery-title"]`),
    ).toHaveCount(1);
    const shortcut = option.locator(`a[href="${prefix}/products/litterround"]`);
    await shortcut.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/products/litterround$`));
    await expect(
      page.locator('.product-intro .store-download a'),
    ).toHaveAttribute('href', buildAppStoreUrl({ slug: 'litterround' })!);
    await page.locator('.product-gallery a[href="#gallery-title"]').click();
    await expect(page.locator('#gallery-title')).toBeInViewport();
    const shots = page
      .locator('.product-gallery')
      .nth(1)
      .locator('.screenshot-grid img');
    expect(await shots.count()).toBeGreaterThan(1);
    await expect
      .poll(() =>
        shots.evaluateAll((imgs: HTMLImageElement[]) =>
          imgs.every((img) => img.complete && img.naturalWidth > 0),
        ),
      )
      .toBe(true);
    await page.locator('.product-intro a[href="#pricing"]').click();
    await expect(page.locator('#pricing')).toBeInViewport();
    await expect(page.locator('#pricing')).toContainText('$9.99');
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
