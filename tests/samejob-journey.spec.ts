import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { buildAppStoreUrl } from '../src/data/app-store';

test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} Repeat customer invoice template reader can compare the App, review actual screenshots and reach pricing`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/templates/repeat-customer-invoice`);
    const freeCsv = `/downloads/repeat-customer-invoice${prefix ? '-zh' : ''}.csv`;
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
    for (const asset of [
      '/downloads/repeat-customer-invoice.xlsx',
      '/downloads/repeat-customer-invoice-example.xlsx',
    ]) {
      const event = page.waitForEvent('download');
      await page.locator(`a[href="${asset}"]`).click();
      expect(await (await event).failure()).toBeNull();
      const response = await request.get(asset);
      expect(response.ok()).toBe(true);
      expect(
        createHash('sha256')
          .update(await response.body())
          .digest('hex'),
      ).toBe(
        createHash('sha256')
          .update(await readFile(`public${asset}`))
          .digest('hex'),
      );
    }
    await expect(
      option.locator(`a[href="${prefix}/products/samejob#gallery-title"]`),
    ).toHaveCount(1);
    const shortcut = option.locator(`a[href="${prefix}/products/samejob"]`);
    await shortcut.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/products/samejob$`));
    await expect(
      page.locator('.product-intro .store-download a'),
    ).toHaveAttribute('href', buildAppStoreUrl({ slug: 'samejob' })!);
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
    await expect(page.locator('#pricing')).toContainText('$29.99');
    await expect(page.locator('.product-intro .price-summary')).toContainText(
      '5',
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
