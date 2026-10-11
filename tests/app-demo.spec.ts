import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';

for (const prefix of ['', '/zh']) {
  for (const slug of ['tmproof', 'pressrecipe']) {
    test(`${prefix || 'English'} ${slug} actual demo and export`, async ({
      page,
      request,
    }) => {
      await page.goto(`${prefix}/products/${slug}#app-demo`);
      const demo = page.locator('#app-demo');
      await expect(demo).toBeVisible();
      await expect(demo).toContainText('DEMO');
      await expect(demo).toContainText(
        slug === 'tmproof' ? '1.0.0 (2)' : '1.0.0 (3)',
      );
      await expect(demo).toContainText(
        prefix ? '免费工作表是独立资源' : 'free worksheet is separate',
      );
      const pictures = demo.locator('img');
      await expect(pictures).toHaveCount(3);
      for (const picture of await pictures.all()) {
        await picture.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            picture.evaluate(
              (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
            ),
          )
          .toBe(true);
      }
      await expect(demo.locator('a[download]')).toHaveAttribute(
        'href',
        `/products/${slug}/${slug === 'tmproof' ? 'demo-TM-000001.pdf' : 'demo-tests.csv'}`,
      );
      const response = await request.get(
        (await demo.locator('a[download]').getAttribute('href')) as string,
      );
      expect(response.ok()).toBe(true);
      const bytes = await response.body();
      expect(
        bytes.equals(
          await readFile(
            `public/products/${slug}/${slug === 'tmproof' ? 'demo-TM-000001.pdf' : 'demo-tests.csv'}`,
          ),
        ),
      ).toBe(true);
      if (slug === 'tmproof')
        expect(bytes.subarray(0, 5).toString()).toBe('%PDF-');
      else {
        const lines = bytes.toString().trim().split(/\r?\n/);
        expect(lines).toHaveLength(3);
        expect(lines[0]).toContain('Wash Failed');
        expect(lines.slice(1).every((line) => line.includes('DEMO'))).toBe(
          true,
        );
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.goto(
        `${prefix}/templates/${slug === 'tmproof' ? 'time-and-materials-ticket' : 'heat-press-settings-log'}`,
      );
      await expect(
        page.locator(`a[href="${prefix}/products/${slug}#app-demo"]`),
      ).toBeVisible();
    });
  }
}
