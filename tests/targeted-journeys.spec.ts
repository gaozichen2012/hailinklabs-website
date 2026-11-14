import { expect, test } from '@playwright/test';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { buildAppStoreUrl } from '../src/data/app-store';

test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} GearProof free sheet opens the actual download page in one step`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/products/gearproof`);
    await page
      .locator(
        `.product-intro a[href="${prefix}/templates/equipment-checkout-log"]`,
      )
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${prefix}/templates/equipment-checkout-log$`),
    );
    const csv = `/downloads/equipment-checkout-log${prefix ? '-zh' : ''}.csv`;
    const downloadEvent = page.waitForEvent('download');
    await page.locator(`a[href="${csv}"]`).click();
    const download = await downloadEvent;
    expect(await download.failure()).toBeNull();
    expect(download.suggestedFilename()).toBe(csv.split('/').at(-1));
    const response = await request.get(csv);
    expect(response.ok()).toBe(true);
    expect(
      createHash('sha256')
        .update(await response.body())
        .digest('hex'),
    ).toBe(
      createHash('sha256')
        .update(await readFile(`public${csv}`))
        .digest('hex'),
    );
    await expect(
      page.locator('.related-app .store-download a'),
    ).toHaveAttribute(
      'href',
      buildAppStoreUrl({
        slug: 'gearproof',
        source: 'template',
        content: 'equipment-checkout-log',
      })!,
    );
  });

  test(`${prefix || 'en'} calving sheet offers the App before previews while downloads stay first`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/templates/calving-record-sheet`);
    const option = page.locator('.task-app-shortcut');
    const downloadY = (await page
      .locator('a[href="/downloads/calving-record-sheet.pdf"]')
      .boundingBox())!.y;
    const optionY = (await option.boundingBox())!.y;
    const previewY = (await page
      .locator('.worksheet-preview')
      .first()
      .boundingBox())!.y;
    expect(downloadY).toBeLessThan(optionY);
    expect(optionY).toBeLessThan(previewY);
    await option
      .locator(`a[href="${prefix}/products/calvingpocket/demo"]`)
      .click();
    await expect(page.locator('#transcript li')).toHaveCount(4);
    const video = page.locator('video');
    await video.evaluate(async (v: HTMLVideoElement) => {
      v.muted = true;
      await v.play();
    });
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(0.2);
    await video.evaluate((v: HTMLVideoElement) => v.pause());
    await expect(page.locator('.store-download a')).toHaveAttribute(
      'href',
      buildAppStoreUrl({ slug: 'calvingpocket' })!,
    );
    await page.locator('.language-switch').click();
    await expect(page).toHaveURL(
      new RegExp(`${prefix ? '' : '/zh'}/products/calvingpocket/demo$`),
    );
  });

  test(`${prefix || 'en'} repeat-invoice guide connects the early choice to SameJob pricing and its real store link`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/guides/repeat-invoice-workflow`);
    await expect(page.locator('.task-shortcuts > a.button')).toHaveAttribute(
      'href',
      `${prefix}/templates/repeat-customer-invoice`,
    );
    const option = page.locator('.task-app-shortcut');
    expect((await option.boundingBox())!.y).toBeLessThan(
      (await page.locator('#record-checklist').boundingBox())!.y,
    );
    await option.locator('a').click();
    await expect(page).toHaveURL(new RegExp(`${prefix}/products/samejob$`));
    await expect(
      page.locator('.product-intro .store-download a'),
    ).toHaveAttribute('href', buildAppStoreUrl({ slug: 'samejob' })!);
    await expect(page.locator('.product-intro .price-summary')).toContainText(
      '$29.99',
    );
    await page.locator('.product-intro a[href="#pricing"]').click();
    await expect(page.locator('#pricing')).toBeInViewport();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
