import { mkdir, writeFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import { routes } from '../src/data/site';

// Capture on the remote runner only. The full normal suite still checks all four
// Chromium/WebKit projects; this avoids redundant copies of visual evidence.
// Separate tests give each viewport its own page and the same bounded budget.
for (const width of [1440, 390]) {
  test(`release screenshots and layout of every bilingual page at ${width}px`, async ({
    page,
  }, testInfo) => {
    test.skip(
      process.env.SITE_VISUAL_AUDIT !== '1' ||
        testInfo.project.name !== 'chromium-desktop',
    );
    test.setTimeout(300_000);
    await mkdir('artifacts/visual-audit', { recursive: true });
    const results = [];
    await page.setViewportSize({ width, height: 900 });
    for (const path of [...routes, '/404']) {
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      for (const image of await page.locator('img').all())
        await image.scrollIntoViewIfNeeded();
      await page.locator('footer').scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          page
            .locator('img')
            .evaluateAll((images) =>
              images.every(
                (image) =>
                  (image as HTMLImageElement).complete &&
                  (image as HTMLImageElement).naturalWidth > 0,
              ),
            ),
        )
        .toBe(true);
      await page.evaluate(() => scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${path} at ${width}`,
      ).toBe(true);
      const filename = `${width}-${path === '/' ? 'home' : path.slice(1).replaceAll('/', '-')}.png`;
      await page.screenshot({
        path: `artifacts/visual-audit/${filename}`,
        fullPage: true,
        animations: 'disabled',
      });
      results.push({ path, width, filename, status: response?.status() });
    }
    await writeFile(
      `artifacts/visual-audit/index-${width}.json`,
      JSON.stringify(results, null, 2),
    );
  });
}
