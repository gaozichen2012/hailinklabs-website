import { test, expect } from '@playwright/test';

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} GearProof search journey and video evidence`, async ({
    page,
    request,
  }) => {
    test.setTimeout(120000);
    await page.goto(`${prefix}/guides/equipment-checkout-log-template`);
    await expect(page.locator('.record-table').last()).toContainText(
      'GearProof',
    );
    await page.locator(`a[href="${prefix}/products/gearproof/demo"]`).click();
    await expect(page).toHaveURL(
      new RegExp(`${prefix}/products/gearproof/demo$`),
    );
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('#transcript li')).toHaveCount(5);
    await expect(page.locator('#transcript')).toContainText(
      prefix ? '第三块电池' : 'third battery',
    );
    await expect(page.locator('main')).toContainText(
      prefix ? '模拟器' : 'simulator',
    );
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    const graph = JSON.parse(schema!)['@graph'];
    const videoData = graph.find(
      (entry: Record<string, unknown>) => entry['@type'] === 'VideoObject',
    );
    expect(videoData.duration).toBe('PT38.3S');
    expect(videoData.contentUrl).toBe(
      'https://hailinklabs.com/products/gearproof/camera-kit-demo.mp4',
    );
    expect(videoData.transcript).toContain(
      prefix ? '第三块电池' : 'third battery',
    );
    expect(
      graph.some(
        (entry: Record<string, unknown>) =>
          entry['@type'] === 'SoftwareApplication',
      ),
    ).toBe(false);
    const video = page.locator('video');
    await video.evaluate((v: HTMLVideoElement) => v.load());
    await expect
      .poll(() => video.evaluate((v: HTMLVideoElement) => v.readyState))
      .toBeGreaterThan(0);
    const duration = await video.evaluate((v: HTMLVideoElement) => v.duration);
    expect(duration).toBeCloseTo(38.3, 0);
    for (const link of await page.locator('#transcript a').all()) {
      const href = await link.getAttribute('href');
      const [start, end] = href!.split('#t=')[1].split(',').map(Number);
      expect(start).toBeGreaterThanOrEqual(0);
      expect(end).toBeLessThanOrEqual(duration + 0.05);
      expect(end).toBeGreaterThan(start);
    }
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
    await page
      .getByRole('link', {
        name: prefix
          ? 'GearProof 功能、价格与常见问题'
          : 'GearProof features, pricing and common questions',
      })
      .click();
    await expect(page.locator('main')).toContainText(
      prefix ? '终身买断' : '$19.99',
    );
    await expect(
      page.getByRole('heading', {
        name: prefix
          ? 'GearProof 会自动同步团队的多台手机吗？'
          : 'Does GearProof automatically sync across team phones?',
      }),
    ).toBeVisible();
    const manifest = await (
      await request.get('/acquisition-manifest.json')
    ).json();
    expect(
      manifest.products.find((p: { slug: string }) => p.slug === 'gearproof')
        .listing.appId,
    ).toBe(6814847023);
    expect(await (await request.get('/llms.txt')).text()).toContain(
      'Does GearProof automatically sync across team phones?',
    );
  });
}
