import { expect, test } from '@playwright/test';
import { routes, site } from '../src/data/site';

for (const path of routes) {
  test(`${path} content, metadata, navigation and layout`, async ({
    page,
    request,
  }, testInfo) => {
    const errors: string[] = [];
    const externalRequests: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (req) => {
      if (new URL(req.url()).hostname !== '127.0.0.1')
        externalRequests.push(req.url());
    });
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main h1')).toHaveCount(1);
    await expect(page.locator('footer')).toContainText(site.legalName);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      new URL(path, site.url).href,
    );
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      'content',
      /\S.{30}/,
    );
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      new URL(path, site.url).href,
    );
    await expect(page.locator('body')).not.toContainText(
      /lorem ipsum|placeholder|\bTODO\b|review copy|coming soon/i,
    );
    expect(await page.locator('script').count()).toBe(0);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    expect(errors).toEqual([]);
    expect(externalRequests).toEqual([]);
    const links = await page
      .locator('a[href]')
      .evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')!));
    for (const href of new Set(links)) {
      if (href.startsWith('/') && !href.startsWith('//'))
        expect((await request.get(href)).status(), href).toBe(200);
    }
    await page.screenshot({
      path: `artifacts/screenshots/${testInfo.project.name}-${path.replaceAll('/', '_') || 'home'}.png`,
      fullPage: true,
    });
    const footerLink = page
      .getByRole('navigation', { name: 'Footer navigation' })
      .getByRole('link', { name: 'Contact' });
    await footerLink.click();
    await expect(page).toHaveURL(/\/contact$/);
    await expect(page.locator('main')).toContainText(site.email);
  });
}

test('404, sitemap, robots, content policy and mail links', async ({
  request,
  page,
}) => {
  const missing = await request.get('/this-page-does-not-exist');
  expect(missing.status()).toBe(404);
  expect(await missing.text()).toContain('Page not found');
  await page.goto('/');
  await expect(
    page.locator('meta[http-equiv="Content-Security-Policy"]'),
  ).toHaveAttribute('content', /default-src 'none'/);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.status()).toBe(200);
  for (const path of routes)
    expect(await sitemap.text()).toContain(
      `<loc>${new URL(path, site.url).href}</loc>`,
    );
  expect(await (await request.get('/robots.txt')).text()).toContain(
    'Sitemap: https://hailinklabs.com/sitemap.xml',
  );
  expect((await request.get('/favicon.svg')).status()).toBe(200);
  await page.goto('/products/samejob/support');
  await expect(page.locator('main a[href^="mailto:"]').first()).toHaveAttribute(
    'href',
    `mailto:${site.email}?subject=SameJob%20Support`,
  );
});

test('keyboard access and small viewport', async ({ page, browserName }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/');
  // Safari on macOS uses Option-Tab to include links in keyboard navigation.
  await page.keyboard.press(
    browserName === 'webkit' && process.platform === 'darwin'
      ? 'Alt+Tab'
      : 'Tab',
  );
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toBeFocused();
  await page.keyboard.press('Enter');
  expect(await page.evaluate(() => document.activeElement?.id)).toBe('main');
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
