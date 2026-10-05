import { buildAppStoreUrl } from '../src/data/app-store';
import { expect, test } from '@playwright/test';
import { catalog, listings } from '../src/data/catalog';
import { routes, site } from '../src/data/site';
import { serializeStructuredData } from '../src/data/seo';

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} verified downloads and honest availability`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/products`);
    await expect(page.locator('.availability')).toHaveCount(18);
    await expect(page.locator('.availability.is-available')).toHaveCount(6);
    await expect(page.locator('.store-download')).toHaveCount(6);
    for (const product of catalog) {
      const card = page.locator('.matrix-card').filter({
        has: page.getByRole('heading', { name: product.name, exact: true }),
      });
      await expect(card.locator('.availability')).toHaveText(
        listings[product.slug]
          ? prefix
            ? '已在美国 App Store 上架'
            : 'Available on the US App Store'
          : prefix
            ? '下载链接暂未提供'
            : 'Download link not yet available',
      );
    }
    for (const [slug, id, price] of [
      ['tmproof', '6814884804', '$9.99'],
      ['calvingpocket', '6815103146', '$19.99'],
      ['pressrecipe', '6816618604', '$9.99'],
    ]) {
      const link = page.locator(`.matrix-card a[href*="/id${id}"]`);
      await expect(link).toBeVisible();
      await page
        .locator(`.matrix-card a[href="${prefix}/products/${slug}"]`)
        .click();
      await expect(
        page.locator('.product-intro .store-download a'),
      ).toHaveAttribute('href', buildAppStoreUrl({ slug, source: 'product' })!);
      await expect(page.locator('.product-intro .price-summary')).toContainText(
        price,
      );
      await expect(
        page.locator('.product-intro .store-download'),
      ).toContainText('iOS 18');
      await page.locator('.language-switch').click();
      await expect(
        page.locator('.product-intro .store-download a'),
      ).toHaveAttribute('href', buildAppStoreUrl({ slug, source: 'product' })!);
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${prefix}/products/${slug}$`));
      await page.goBack();
      await expect(page).toHaveURL(new RegExp(`${prefix}/products$`));
    }
  });

  test(`${prefix || 'English'} product schema describes real facts without reviews`, async ({
    page,
  }) => {
    for (const product of catalog) {
      await page.goto(`${prefix}/products/${product.slug}`);
      const schema = JSON.parse(
        await page.locator('script[type="application/ld+json"]').innerText(),
      );
      expect(schema['@context']).toBe('https://schema.org');
      const organization = schema['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'Organization',
      );
      const app = schema['@graph'].find(
        (item: { '@type': string }) => item['@type'] === 'SoftwareApplication',
      );
      expect(organization.name).toBe(site.name);
      expect(app.name).toBe(product.storeName);
      expect(app.url).toBe(`${site.url}${prefix}/products/${product.slug}`);
      expect(app.publisher['@id']).toBe(organization['@id']);
      expect(app.image).toBe(`${site.url}/social/${product.slug}.png`);
      expect(app).not.toHaveProperty('aggregateRating');
      expect(app).not.toHaveProperty('review');
      if (listings[product.slug]) {
        expect(app.downloadUrl).toBe(listings[product.slug].url);
        expect(app.offers.price).toBe('0');
        expect(app.offers.priceCurrency).toBe('USD');
        expect(app.offers.description).toContain(
          product.slug === 'samejob'
            ? '$29.99'
            : ['tmproof', 'litterround', 'pressrecipe'].includes(product.slug)
              ? '$9.99'
              : '$19.99',
        );
        if (product.slug === 'samejob') {
          expect(app.offers.description).toContain('$1.49');
          expect(app.offers.description).toContain('$14.99');
        }
      } else {
        expect(app).not.toHaveProperty('downloadUrl');
        expect(app).not.toHaveProperty('offers');
      }
    }
  });
}

test('social previews cover every route and resolve to real 1200 × 630 PNGs', async ({
  request,
}) => {
  test.setTimeout(120_000);
  const images = new Set<string>();
  for (const path of routes) {
    const response = await request.get(path);
    expect(response.ok()).toBe(true);
    const html = await response.text();
    const image = html.match(/property="og:image" content="([^"]+)"/)?.[1];
    expect(image, path).toMatch(
      /^https:\/\/hailinklabs\.com\/social\/[a-z-]+\.png$/,
    );
    expect(html).toContain(`name="twitter:image" content="${image}"`);
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toMatch(/property="og:image:alt" content="[^"]+"/);
    images.add(new URL(image!).pathname);
  }
  expect(images.size).toBe(19);
  for (const image of images) {
    const response = await request.get(image);
    expect(response.ok(), image).toBe(true);
    expect(response.headers()['content-type']).toContain('image/png');
    const bytes = await response.body();
    expect(bytes.subarray(1, 4).toString()).toBe('PNG');
    expect(bytes.readUInt32BE(16)).toBe(1200);
    expect(bytes.readUInt32BE(20)).toBe(630);
    expect(bytes.length).toBeLessThan(500_000);
  }
});

test('organization data is scoped and JSON-LD remains inert', async ({
  page,
}) => {
  for (const path of ['/', '/zh', '/about', '/zh/about']) {
    await page.goto(path);
    const schema = JSON.parse(
      await page.locator('script[type="application/ld+json"]').innerText(),
    );
    expect(schema['@graph']).toHaveLength(
      path === '/' || path === '/zh' ? 2 : 1,
    );
    expect(schema['@graph'][0]['@type']).toBe('Organization');
    expect(schema['@graph'][0].legalName).toBe(site.legalNameZh);
    expect(schema['@graph'][0].alternateName).toBe(site.legalName);
  }
  for (const path of [
    '/products/tmproof/support',
    '/zh/products/samejob/privacy',
    '/404',
  ]) {
    await page.goto(path);
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).toHaveCount(0);
  }
  const hostile = '</script><script>alert("test")</script>&';
  const serialized = serializeStructuredData({ description: hostile });
  expect(serialized).not.toMatch(/[<>&]/);
  expect(JSON.parse(serialized).description).toBe(hostile);
});
