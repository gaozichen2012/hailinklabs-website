import { expect, test } from '@playwright/test';
import { buildAppStoreUrl } from '../src/data/app-store';
import { site } from '../src/data/site';

const slug = 'hybridloop';
const guide = 'how-to-import-a-workout';
const product = `/products/${slug}`;

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} homepage links to HybridLoop and the repeat guide separates comparable results`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 320, height: 640 });
    await page.goto(prefix || '/');
    const homepageLink = page.locator(
      `.hero-bottom a[href="${prefix}${product}"]`,
    );
    await expect(homepageLink).toBeInViewport();
    await homepageLink.click();
    await expect(page.locator('main h1')).toContainText('HybridLoop');
    await page
      .locator(`main a[href="${prefix}/guides/compare-repeat-workouts"]`)
      .click();
    const example = page.locator('#worked-example');
    await expect(example.getByRole('row')).toHaveCount(4);
    await expect(example.getByRole('row').nth(2)).toContainText('9:12');
    await expect(example.getByRole('row').nth(2)).toContainText(
      prefix ? '快 36 秒' : '36 seconds faster',
    );
    await expect(example.getByRole('row').nth(3)).toContainText(
      prefix ? '变式' : 'Variation',
    );
    const overflows = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth,
    );
    expect(overflows).toBe(false);
  });

  test(`${prefix || 'English'} HybridLoop download fits a short phone viewport`, async ({
    page,
  }) => {
    for (const viewport of [
      { width: 390, height: 700 },
      { width: 320, height: 640 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(prefix + product);
      const download = page.locator('.product-intro .store-download a.button');
      await expect(download).toHaveAttribute(
        'href',
        buildAppStoreUrl({ slug })!,
      );
      await expect(download).toBeInViewport({ ratio: 1 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
  });

  test(`${prefix || 'English'} HybridLoop sample and resource links work without JavaScript`, async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      baseURL,
      javaScriptEnabled: false,
    });
    try {
      const page = await context.newPage();
      await page.goto(prefix + product);
      await expect(page.locator('#hybridloop-demo ol li')).toHaveCount(4);
      await expect(page.locator('#hybridloop-demo ol')).toContainText(
        'Repeat Original Plan',
      );
      const sampleLink = `${prefix}/guides/${guide}#sample-plan`;
      await expect(
        page.locator(`#hybridloop-demo a[href="${sampleLink}"]`),
      ).toHaveCount(1);
      await page.locator(`.product-intro a[href="${sampleLink}"]`).click();
      await expect(page.locator('#sample-plan pre')).toHaveText(
        '3 rounds\nRun 800 m\nRow 500 m\nWall Ball 20 reps\nRest 60 s',
      );
      const graph = JSON.parse(
        await page.locator('script[type="application/ld+json"]').innerText(),
      )['@graph'];
      expect(graph).toContainEqual(
        expect.objectContaining({
          '@type': 'Article',
          about: { '@id': `${site.url}${product}#software` },
        }),
      );
      await expect(
        page.locator('main .store-download a.button'),
      ).toHaveAttribute(
        'href',
        buildAppStoreUrl({ slug, source: 'guide', content: guide })!,
      );
      await page
        .locator(
          `.task-shortcuts a[href="${prefix}/templates/repeat-workout-log"]`,
        )
        .press('Enter');
      await expect(
        page.locator('a[href="/downloads/repeat-workout-log.pdf"]'),
      ).toBeVisible();
    } finally {
      await context.close();
    }
  });
}
