import { test, expect } from '@playwright/test';
import { catalog, categories, listings } from '../src/data/catalog';
import { buildAppStoreUrl } from '../src/data/app-store';
import qrTargets from '../src/data/download-qr.json' with { type: 'json' };
import { templates } from '../src/data/resources';
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} downloadable catalog preserves every category deep link`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/products#downloadable`);
    await expect(page.locator('#downloadable .resource-card')).toHaveCount(6);
    await expect(page.locator('.catalog-group .matrix-card')).toHaveCount(
      catalog.length,
    );
    for (const category of categories) {
      await page.locator(`.category-links a[href="#${category.id}"]`).click();
      await expect(page.locator(`#${category.id}`)).toBeInViewport();
      await expect(page.locator(`#${category.id} .matrix-card`)).toHaveCount(
        category.slugs.length,
      );
      const available = category.slugs.filter((slug) => listings[slug]).length;
      await expect(
        page.locator(`#${category.id} .catalog-count`),
      ).toContainText(
        prefix ? `${available} 可下载` : `${available} downloadable`,
      );
    }
    await expect(page.locator('main')).not.toContainText('1 apps');
  });
  for (const slug of Object.keys(listings)) {
    test(`${prefix || 'English'} ${slug} real screenshots and consistent download QR`, async ({
      page,
    }) => {
      await page.goto(`${prefix}/products/${slug}`);
      await expect(page.locator('.product-gallery img')).toHaveCount(4);
      await expect(
        page.locator('.product-intro .store-download a'),
      ).toHaveAttribute('href', buildAppStoreUrl({ slug })!);
      await expect(
        page.locator('.download-panel .store-download a'),
      ).toHaveAttribute('href', qrTargets[slug as keyof typeof qrTargets]);
      const qr = page.locator('.download-qr img');
      await qr.scrollIntoViewIfNeeded();
      await expect
        .poll(() => qr.evaluate((el) => (el as HTMLImageElement).naturalWidth))
        .toBeGreaterThan(0);
      await page.locator('.language-switch').click();
      await expect(page).toHaveURL(`${prefix ? '' : '/zh'}/products/${slug}`);
    });
  }
  test(`${prefix || 'English'} every template has usable sections and labeled examples`, async ({
    page,
    request,
  }) => {
    for (const sheet of templates) {
      await page.goto(`${prefix}/templates/${sheet.slug}`);
      await expect(page.locator('.print-sheet .worksheet-section')).toHaveCount(
        sheet.sections.length,
      );
      await expect(page.locator('.worksheet-example')).toContainText(
        prefix ? '不是 App 导出' : 'not an app export',
      );
      for (const suffix of ['-a4.pdf', '-example.pdf']) {
        const asset = await request.get(`/downloads/${sheet.slug}${suffix}`);
        expect(asset.status()).toBe(200);
        expect((await asset.body()).subarray(0, 5).toString()).toBe('%PDF-');
      }
    }
    await page.goto(`${prefix}/templates/repeat-customer-invoice`);
    const response = await request.get(
      '/downloads/repeat-customer-invoice.xlsx',
    );
    expect(response.status()).toBe(200);
    expect((await response.body()).subarray(0, 2).toString()).toBe('PK');
    await expect(page.locator('main')).not.toContainText(
      prefix ? '幼犬体重' : 'Puppy Weight',
    );
  });
}
