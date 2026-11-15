import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { buildAppStoreUrl } from '../src/data/app-store';

test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} T&M reader can compare the App, download its actual demo and reach pricing`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/guides/time-and-materials-ticket-template`);
    await expect(page.locator('.task-shortcuts > .button')).toHaveAttribute(
      'href',
      `${prefix}/templates/time-and-materials-ticket`,
    );
    const shortcut = page.locator('.task-app-shortcut a');
    expect((await shortcut.boundingBox())!.y).toBeLessThan(
      (await page.locator('#record-checklist').boundingBox())!.y,
    );
    await shortcut.click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/products/tmproof$`));
    await expect(
      page.locator('.product-intro .store-download a'),
    ).toHaveAttribute('href', buildAppStoreUrl({ slug: 'tmproof' })!);
    await page.locator('.product-intro a[href="#app-demo"]').click();
    await expect(page.locator('#app-demo h2')).toBeInViewport();
    const pdf = '/products/tmproof/demo-TM-000001.pdf';
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
