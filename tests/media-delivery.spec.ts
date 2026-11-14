import { expect, test } from '@playwright/test';
import { listings } from '../src/data/catalog';

test.use({ javaScriptEnabled: false, reducedMotion: 'reduce' });

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'en'} responsive screenshots load without scripts and keep original links`, async ({
    page,
    request,
  }) => {
    test.setTimeout(90000);
    for (const path of [
      '/',
      '/products',
      ...Object.keys(listings).map((slug) => `/products/${slug}`),
    ]) {
      await page.goto(`${prefix}${path === '/' ? '' : path}` || '/');
      const screenshots = page.locator('main img[srcset]');
      expect(await screenshots.count(), path).toBeGreaterThan(0);
      for (const image of await screenshots.all()) {
        await image.scrollIntoViewIfNeeded();
        const state = await image.evaluate(
          async (element: HTMLImageElement) => {
            await element.decode();
            const bounds = element.getBoundingClientRect();
            return {
              src: element.getAttribute('src')!,
              currentSrc: element.currentSrc,
              loaded: element.naturalWidth > 0,
              ratio: bounds.width / bounds.height,
              intrinsicRatio: element.width / element.height,
              link: element.closest('a')?.getAttribute('href'),
            };
          },
        );
        expect(state.loaded).toBe(true);
        expect(state.currentSrc).toMatch(/-\d+w\.webp$/);
        expect(state.ratio).toBeCloseTo(state.intrinsicRatio, 1);
        if (state.link) expect(state.link).toBe(state.src);
      }
      const lead = screenshots.first();
      const original = await request.get((await lead.getAttribute('src'))!);
      const delivered = await request.get(
        await lead.evaluate((i: HTMLImageElement) => i.currentSrc),
      );
      expect(original.ok()).toBe(true);
      expect(delivered.ok()).toBe(true);
      expect((await delivered.body()).length).toBeLessThan(
        (await original.body()).length,
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });

  test(`${prefix || 'en'} product videos wait for playback and reserve their space`, async ({
    page,
  }) => {
    for (const slug of ['gearproof', 'calvingpocket']) {
      const requests: string[] = [];
      const recordRequest = (request: { url(): string }) => {
        if (request.url().endsWith('.mp4')) requests.push(request.url());
      };
      page.on('request', recordRequest);
      await page.goto(`${prefix}/products/${slug}`);
      const video = page.locator('video');
      await video.scrollIntoViewIfNeeded();
      expect(requests).toHaveLength(0);
      const before = await video.boundingBox();
      await video.evaluate(async (v: HTMLVideoElement) => {
        v.muted = true;
        await v.play();
      });
      await expect
        .poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime))
        .toBeGreaterThan(0.2);
      const after = await video.boundingBox();
      expect(after!.height).toBeCloseTo(before!.height, 0);
      await video.evaluate((v: HTMLVideoElement) => v.pause());
      page.off('request', recordRequest);
      await page.goto(`${prefix}/products/${slug}/demo`);
      const levels = await page
        .locator('main :is(h1,h2,h3,h4,h5,h6)')
        .evaluateAll((headings) => headings.map((h) => Number(h.tagName[1])));
      for (let i = 1; i < levels.length; i++)
        expect(levels[i]).toBeLessThanOrEqual(levels[i - 1] + 1);
    }
  });
}
