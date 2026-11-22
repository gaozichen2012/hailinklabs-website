import { expect, test } from '@playwright/test';

const base = 'https://hailinklabs.com';
const policyPath = '/products/songorun/privacy';
const sections = [
  'location',
  'account',
  'clubs',
  'territories',
  'coros',
  'maps',
  'sharing',
  'providers',
  'retention',
  'rights',
  'contact',
];

for (const [prefix, locale, heading] of [
  ['', 'en', 'SONGORUN Privacy Policy'],
  ['/zh', 'zh-CN', '松果跑隐私政策'],
]) {
  test(`SONGORUN opens its ${locale} policy from Support`, async ({ page }) => {
    const path = `${prefix}${policyPath}`;
    await page.goto(`${prefix}/support`);
    const entry = page.getByRole('link', { name: heading, exact: true });
    await expect(entry).toHaveAttribute('href', path);
    await entry.click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(heading);
    await expect(page.locator('html')).toHaveAttribute('lang', locale);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      `${base}${path}`,
    );
    for (const [language, alternate] of [
      ['en', policyPath],
      ['zh-CN', `/zh${policyPath}`],
    ]) {
      await expect(
        page.locator(`link[rel="alternate"][hreflang="${language}"]`),
      ).toHaveAttribute('href', `${base}${alternate}`);
    }
    for (const id of sections) {
      await expect(page.locator(`h2#${id}`)).toBeVisible();
    }
    for (const href of [
      'https://lbs.amap.com/pages/privacy/',
      'https://faq.coros.com/index/getartcate.html?catename=agreements&lang=zh',
      'mailto:gaozichen@hailinklabs.com?subject=SONGORUN%20Privacy',
    ]) {
      await expect(page.locator(`article a[href="${href}"]`)).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}
