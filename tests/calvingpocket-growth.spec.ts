import { test, expect } from '@playwright/test';
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} calf recording demo and offline preparation`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/products/calvingpocket`);
    await expect(
      page.locator('.product-intro a[href="#calving-demo"]'),
    ).toBeVisible();
    const video = page.locator('#calving-demo video');
    await video.scrollIntoViewIfNeeded();
    expect(await video.getAttribute('autoplay')).toBeNull();
    await video.evaluate((v: HTMLVideoElement) => v.load());
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThan(0);
    const duration = await video.evaluate((v: HTMLVideoElement) => v.duration);
    expect(duration).toBeGreaterThanOrEqual(20);
    expect(duration).toBeLessThanOrEqual(31);
    await video.evaluate((v: HTMLVideoElement) => {
      v.muted = true;
      return v.play();
    });
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(0.2);
    await video.evaluate((v: HTMLVideoElement) => v.pause());
    await expect(page.locator('#calving-demo')).toContainText('DEMO057');
    await expect(page.locator('#calving-demo')).toContainText('DEMO-A101');
    await expect(page.locator('.activation-note')).toContainText('App Store');
    for (const slug of [
      'offline-calving-records',
      'calving-record-book-template',
      'calf-birth-record-sheet',
    ]) {
      await page.goto(`${prefix}/guides/${slug}`);
      await expect(page.locator('#calving-demo img')).toHaveCount(2);
      await expect(page.locator('#calving-demo')).toContainText('Untagged #1');
      for (const img of await page.locator('#calving-demo img').all()) {
        expect((await request.get((await img.getAttribute('src'))!)).ok()).toBe(
          true,
        );
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await expect(page.locator('#calving-demo a')).toHaveAttribute(
        'href',
        `${prefix}/products/calvingpocket#calving-demo`,
      );
    }
  });
}
