import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { buildAppStoreUrl } from '../src/data/app-store';

test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} Heat press template reader can compare the App, download its actual demo and reach pricing`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/templates/heat-press-settings-log`);
    const freeCsv = `/downloads/heat-press-settings-log${prefix ? '-zh' : ''}.csv`;
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
      option.locator(`a[href="${prefix}/products/pressrecipe#app-demo"]`),
    ).toHaveCount(1);
    const shortcut = option.locator(`a[href="${prefix}/products/pressrecipe"]`);
    await shortcut.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/products/pressrecipe$`));
    await expect(
      page.locator('.product-intro .store-download a'),
    ).toHaveAttribute('href', buildAppStoreUrl({ slug: 'pressrecipe' })!);
    await page.locator('.product-intro a[href="#app-demo"]').click();
    await expect(page.locator('#app-demo h2')).toBeInViewport();
    const pdf = '/products/pressrecipe/demo-tests.csv';
    const downloadEvent = page.waitForEvent('download');
    await page.locator(`#app-demo a[href="${pdf}"]`).click();
    expect(await (await downloadEvent).failure()).toBeNull();
    const response = await request.get(pdf);
    expect(response.ok()).toBe(true);
    expect(
      createHash('sha256')
        .update(await response.body())
        .digest('hex'),
    ).toBe(
      createHash('sha256')
        .update(await readFile(`public${pdf}`))
        .digest('hex'),
    );
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
