import { test, expect } from '@playwright/test';
import { catalog, categories, listings } from '../src/data/catalog';
import { buildAppStoreUrl } from '../src/data/app-store';
import qrTargets from '../src/data/download-qr.json' with { type: 'json' };
import { productGalleries } from '../src/data/screenshots';
import { templates } from '../src/data/resources';
for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} downloadable catalog preserves every category deep link`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/products#downloadable`);
    await expect(page.locator('#downloadable .matrix-card')).toHaveCount(
      Object.keys(listings).length,
    );
    for (const slug of Object.keys(listings)) {
      await expect(
        page.locator(`#download-${slug} .card-art img`),
      ).toHaveAttribute(
        'src',
        `/products/${slug}/${productGalleries[slug][0].file}.jpg`,
      );
    }
    await expect(page.locator('.catalog-group .matrix-card')).toHaveCount(
      catalog.length - Object.keys(listings).length,
    );
    for (const category of categories) {
      await page.locator(`.category-links a[href="#${category.id}"]`).click();
      await expect(page.locator(`#${category.id}`)).toBeInViewport();
      await expect(page.locator(`#${category.id} .matrix-card`)).toHaveCount(
        category.slugs.filter((slug) => !listings[slug]).length,
      );
      const available = category.slugs.filter((slug) => listings[slug]).length;
      await expect(
        page.locator(`#${category.id} .catalog-count`),
      ).toContainText(
        prefix ? `${available} 可下载` : `${available} downloadable`,
      );
    }
    const catalogToggle = page.locator('.full-catalog > summary');
    expect((await catalogToggle.boundingBox())!.height).toBeGreaterThanOrEqual(
      44,
    );
    await catalogToggle.press('Enter');
    await expect(page.locator('#product-categories')).not.toBeVisible();
    await page
      .locator('#downloadable > a[href="#product-categories"]')
      .press('Enter');
    await expect(page.locator('#product-categories')).toBeVisible();
    await page.locator('.category-links a[href="#fitness"]').press('Enter');
    await page
      .locator('#fitness a[href="#download-hybridloop"]')
      .press('Enter');
    const workoutCard = page.locator('#download-hybridloop');
    await expect(workoutCard).toBeInViewport();
    await expect(
      workoutCard.locator('a[href$="/products/hybridloop"]'),
    ).toHaveAccessibleName(`${prefix ? '了解更多' : 'Learn More'}: HybridLoop`);
    await expect(workoutCard.locator('.store-download a')).toHaveAccessibleName(
      /HybridLoop/,
    );
    await expect(workoutCard.locator('.store-download a')).toHaveAttribute(
      'href',
      buildAppStoreUrl({ slug: 'hybridloop', source: 'catalog' })!,
    );
    await expect(page.locator('main')).not.toContainText('1 apps');
  });
  for (const slug of Object.keys(listings)) {
    test(`${prefix || 'English'} ${slug} real screenshots and consistent download QR`, async ({
      page,
    }) => {
      await page.goto(`${prefix}/products/${slug}`);
      const gallery = page.locator(
        '.product-gallery:not(.product-opening .product-gallery) img',
      );
      await expect(gallery).toHaveCount(7);
      for (const [index, shot] of productGalleries[slug]
        .slice(0, 3)
        .entries()) {
        expect(shot.file).toMatch(new RegExp(`^preview-0${index + 1}-`));
        await expect(gallery.nth(index)).toHaveAttribute(
          'src',
          `/products/${slug}/${shot.file}.jpg`,
        );
      }
      await expect(
        page.locator('.product-opening .product-gallery img'),
      ).toHaveAttribute(
        'src',
        `/products/${slug}/${productGalleries[slug][0].file}.jpg`,
      );
      await expect(
        page.locator('.product-intro .store-download a'),
      ).toHaveAttribute('href', buildAppStoreUrl({ slug })!);
      await expect(
        page.locator('.download-panel .store-download a'),
      ).toHaveAttribute('href', qrTargets[slug as keyof typeof qrTargets]);
      const qr = page.locator('.download-qr img');
      if (await qr.isVisible()) {
        await qr.scrollIntoViewIfNeeded();
        await expect
          .poll(() =>
            qr.evaluate((el) => (el as HTMLImageElement).naturalWidth),
          )
          .toBeGreaterThan(0);
      } else {
        await expect(
          page.locator('.product-intro .store-download a'),
        ).toBeVisible();
      }
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
      await expect(
        page.locator('.worksheet-preview .print-sheet .worksheet-section'),
      ).toHaveCount(sheet.sections.length);
      await expect(page.locator('.worksheet-example')).toContainText(
        sheet.app === 'hybridloop'
          ? prefix
            ? 'HybridLoop 使用独立的导出格式'
            : 'HybridLoop exports use a separate format'
          : prefix
            ? '不是 App 导出'
            : /not an app export/i,
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

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} template formats match actual files and no empty related section`, async ({
    page,
  }) => {
    for (const sheet of templates) {
      await page.goto(`${prefix}/templates/${sheet.slug}`);
      const body = page.locator('main');
      if (sheet.app !== 'samejob') {
        await expect(body).not.toContainText('invoice XLSX');
        await expect(body).not.toContainText('发票 XLSX');
        await expect(page.locator('a[href$=".xlsx"]')).toHaveCount(0);
      } else {
        await expect(page.locator('a[href$=".xlsx"]')).toHaveCount(2);
        await expect(page).toHaveTitle(/Excel/);
      }
      await expect(
        page
          .locator('section')
          .filter({
            has: page.getByRole('heading', {
              name: prefix ? '相关模板' : 'Related Templates',
              exact: true,
            }),
          })
          .locator('li'),
      )
        .not.toHaveCount(0, { timeout: 100 })
        .catch(async () => {
          await expect(
            page.getByRole('heading', {
              name: prefix ? '相关模板' : 'Related Templates',
              exact: true,
            }),
          ).toHaveCount(0);
        });
      const toggle = page.locator('#filled-example > summary');
      await toggle.focus();
      await page.keyboard.press('Enter');
      await expect(page.locator('#filled-example')).not.toHaveAttribute(
        'open',
        '',
      );
      await page.keyboard.press('Enter');
      await expect(page.locator('#filled-example')).toHaveAttribute('open', '');
      await page
        .locator('details')
        .evaluateAll((es) =>
          es.forEach((e) => ((e as HTMLDetailsElement).open = false)),
        );
      await page.emulateMedia({ media: 'print' });
      await expect(
        page.locator('.print-only .print-sheet table').first(),
      ).toBeVisible();
      await expect(page.locator('.worksheet-example')).not.toBeVisible();
      await page.emulateMedia({ media: 'screen' });
    }
  });
  test(`${prefix || 'English'} tablet cards remain paired at affected breakpoints`, async ({
    page,
  }) => {
    for (const width of [768, 820, 1024]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(prefix || '/');
      const rects = await page.locator('.matrix-card').evaluateAll((es) =>
        es.map((e) => ({
          y: e.getBoundingClientRect().y,
          w: e.getBoundingClientRect().width,
        })),
      );
      for (let i = 1; i < rects.length; i += 2) {
        expect(rects[i].y).toBe(rects[i - 1].y);
        expect(rects[i].w).toBe(rects[i - 1].w);
      }
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  });
}
