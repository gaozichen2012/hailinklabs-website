import { test, expect } from '@playwright/test';
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} camera checkout, video and return sheet`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}/products/gearproof`);
    await expect(
      page.locator('.product-intro a[href="#gearproof-demo"]'),
    ).toBeVisible();
    await expect(
      page.locator('.product-gallery').last().locator('img'),
    ).toHaveCount(4);
    const video = page.locator('#gearproof-demo video');
    await video.scrollIntoViewIfNeeded();
    await expect(video).toBeVisible();
    expect(await video.getAttribute('autoplay')).toBeNull();
    await video.evaluate((v: HTMLVideoElement) => v.load());
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThan(0);
    const duration = await video.evaluate((v: HTMLVideoElement) => v.duration);
    expect(duration).toBeGreaterThan(25);
    expect(duration).toBeLessThan(65);
    await video.evaluate((v: HTMLVideoElement) => {
      v.muted = true;
      return v.play();
    });
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
      .toBeGreaterThan(0.2);
    await video.evaluate((v: HTMLVideoElement) => v.pause());
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.goto(`${prefix}/guides/camera-equipment-checkout-sheet`);
    await expect(page.locator('main')).toContainText(
      prefix ? '电池' : 'batter',
    );
    await page.goto(`${prefix}/templates/camera-kit-return-checklist`);
    for (const file of [
      'camera-kit-return-checklist.pdf',
      'camera-kit-return-checklist-a4.pdf',
      'camera-kit-return-checklist-example.pdf',
      `camera-kit-return-checklist${prefix ? '-zh' : ''}.csv`,
    ]) {
      const link = page.locator(`a[href="/downloads/${file}"]`).first();
      await expect(link).toBeVisible();
      const response = await request.get(`/downloads/${file}`);
      expect(response.ok()).toBe(true);
      expect((await response.body()).length).toBeGreaterThan(300);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}
