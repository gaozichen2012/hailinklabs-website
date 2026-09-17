import { createHash } from 'node:crypto';
import { expect, test } from '@playwright/test';
import { englishRoutes, routes, site } from '../src/data/site';
import { localizedPath } from '../src/data/i18n';

for (const englishPath of englishRoutes) {
  test(`${englishPath} language pair and SEO`, async ({ page, context }) => {
    for (const locale of ['en', 'zh-CN'] as const) {
      const path = localizedPath(englishPath, locale);
      const otherLocale = locale === 'en' ? 'zh-CN' : 'en';
      const otherPath = localizedPath(englishPath, otherLocale);
      await page.goto(path);
      await expect(page).toHaveURL(
        new RegExp(`${path.replaceAll('/', '\\/')}$`),
      );
      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('footer')).toContainText(
        locale === 'en' ? site.legalName : site.legalNameZh,
      );
      await expect(page.locator('body')).not.toContainText(
        locale === 'en' ? site.legalNameZh : site.legalName,
      );
      const title = await page.title();
      expect(title).toContain('Hailink Labs');
      if (locale === 'zh-CN' && englishPath !== '/products/samejob')
        expect(title).toMatch(/[\u4e00-\u9fff]/);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      if (locale === 'zh-CN') expect(description).toMatch(/[\u4e00-\u9fff]/);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
        'content',
        title,
      );
      await expect(
        page.locator('meta[property="og:description"]'),
      ).toHaveAttribute('content', description!);
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute(
        'content',
        locale === 'en' ? 'en_US' : 'zh_CN',
      );
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        site.url + path,
      );
      for (const [lang, target] of [
        ['en', englishPath],
        ['zh-CN', localizedPath(englishPath, 'zh-CN')],
        ['x-default', englishPath],
      ]) {
        await expect(
          page.locator(`link[rel="alternate"][hreflang="${lang}"]`),
        ).toHaveAttribute('href', site.url + target);
      }
      const switcher = page.locator('header .language-switch');
      await expect(switcher).toHaveText(locale === 'en' ? '中文' : 'English');
      await expect(switcher).toHaveAttribute('href', otherPath);
      await expect(switcher).toHaveAttribute('lang', otherLocale);
      await expect(switcher).toHaveAccessibleName(
        /切换到本页中文版|Read this page in English/,
      );
      const links = await page
        .locator('a[href^="/"]')
        .evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')!));
      expect(
        links.filter((link) => /\.html|\/$/.test(link) && link !== '/'),
      ).toEqual([]);
      // All business links stay in the current language, except the explicit switch
      // and the Chinese policy's link to its authoritative English version.
      for (const link of links) {
        if (link === otherPath) continue;
        expect(
          locale === 'en' ? !link.startsWith('/zh') : link.startsWith('/zh'),
        ).toBe(true);
      }
      expect(
        await page.locator('script, form, a[href*="apps.apple.com"]').count(),
      ).toBe(0);
      expect(await context.cookies()).toEqual([]);
      expect(
        await page.evaluate(() => ({
          local: localStorage.length,
          session: sessionStorage.length,
        })),
      ).toEqual({ local: 0, session: 0 });
      await switcher.click();
      await expect(page).toHaveURL(new RegExp(`${otherPath}$`));
    }
  });
}

test('all sitemap URLs are canonical, unique and complete', async ({
  request,
}) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls.sort()).toEqual(routes.map((path) => site.url + path).sort());
  expect(new Set(urls).size).toBe(routes.length);
  expect(xml).not.toMatch(/\.html|localhost|127\.0\.0\.1/);
});

test('browser language never redirects the English default', async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({ locale: 'zh-CN' });
  const page = await context.newPage();
  await page.goto(baseURL!);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page).toHaveURL(baseURL! + '/');
  await context.close();
});

test('Product identity, no development labels and static bilingual 404', async ({
  page,
}) => {
  for (const locale of ['en', 'zh-CN'] as const) {
    for (const path of ['/', '/products', '/products/samejob']) {
      await page.goto(localizedPath(path, locale));
      await expect(page.locator('main')).toContainText(/SameJob/);
      await expect(page.locator('main')).not.toContainText(
        /In development|开发中|Coming Soon|TestFlight/i,
      );
    }
  }
  await page.goto('/this-page-does-not-exist');
  await expect(page.locator('main a[href="/"]')).toBeVisible();
  await expect(page.locator('main a[href="/zh"]')).toBeVisible();
  await expect(page.locator('link[rel="alternate"]')).toHaveCount(0);
});

// Independent assertions protect policy commitments in both rendered versions.
const commitments = [
  [/primary store/, /本地数据库为主要存储/],
  [/do not need to create a SameJob account/, /无需创建 SameJob 账号/],
  [/does not upload your business database/, /不会将你的业务数据库/],
  [/private iCloud database.*CloudKit/, /CloudKit.*iCloud 私有数据库/],
  [/enabled by default.*turned off/, /默认启用.*关闭/],
  [/Local work remains available/, /仍可在本地使用/],
  [
    /device-related identifier and an installation identifier/,
    /设备相关的标识符和安装标识符/,
  ],
  [/not advertising/, /不用于广告/],
  [/does not by itself erase copies/, /不会自动删除/],
  [/StoreKit.*entitlement/, /StoreKit.*权益/],
  [
    /does not receive your payment card details.*receipt server/,
    /不会.*支付卡信息.*不运营购买收据服务器/,
  ],
  [/does not process, hold, or transfer/, /不处理、持有或转移/],
  [/PDFs, CSV files, and backups/, /PDF、CSV 文件和备份/],
  [/not encrypted by the app/, /不会对备份文件进行应用层面的加密/],
  [/does not remove files you previously exported/, /不会删除你此前导出/],
  [
    /does not include advertising, third-party analytics.*third-party crash reporting SDK/,
    /不包含广告、第三方分析工具或第三方崩溃报告 SDK/,
  ],
  [
    /does not use app information for cross-company tracking.*AI or analytics services/,
    /不会.*跨公司跟踪.*不会.*AI 或分析服务/,
  ],
  [/does not change Apple’s own data handling/, /不改变 Apple 自身的数据处理/],
  [/Tencent’s business email service.*China/, /腾讯企业邮箱服务.*中国/],
  [/do not sell support information/, /不会出售支持信息/],
  [
    /no longer than 12 months.*unless an ongoing issue or legal obligation/,
    /不超过 12 个月.*仍在处理的问题或法律义务/,
  ],
  [
    /Recently Deleted for 30 days before becoming eligible/,
    /“最近删除”中保留 30 天，之后才可/,
  ],
  [
    /cannot erase files held by recipients.*private iCloud account/,
    /无法代你删除.*接收方.*私人 iCloud 账号/,
  ],
  [
    /request access, correction, or deletion.*verify a request/,
    /请求访问、更正或删除.*核实请求/,
  ],
  [
    /no advertising trackers, analytics scripts, contact forms, or account system/,
    /没有广告跟踪器、分析脚本、联系表单或账号系统/,
  ],
  [
    /GitHub processes technical request information such as IP addresses/,
    /GitHub 会处理 IP 地址等技术请求信息/,
  ],
  [/not directed to children under 13/, /不面向 13 岁以下儿童/],
  [/revise the effective date.*Material changes/, /调整生效日期.*重大变更/],
];

test('complete bilingual privacy commitments and English precedence', async ({
  page,
}) => {
  for (const [index, locale] of (['en', 'zh-CN'] as const).entries()) {
    await page.goto(localizedPath('/products/samejob/privacy', locale));
    const policy = page.locator('article.policy');
    await expect(policy.locator('h2')).toHaveCount(12);
    const text = (await policy.innerText()).replace(/\s+/g, ' ');
    // Baseline 4afbaf2 policy, allowing only the authorized English company name.
    if (locale === 'en') {
      const policyText = (await policy.textContent())!.replace(/\s+/g, '');
      expect(createHash('sha256').update(policyText).digest('hex')).toBe(
        '2c9d18303af939d6f8d1cc18ca0b2a5e67c0b1024bf4fe6f0b82eca7d1e6f014',
      );
    }
    for (const pair of commitments) expect(text).toMatch(pair[index]);
    await expect(page.locator('.policy-intro')).toContainText(
      locale === 'en' ? 'Effective September 14, 2026' : '2026 年 9 月 14 日',
    );
    if (locale === 'zh-CN') {
      await expect(policy.locator('aside')).toContainText('以英文版本为准');
      await expect(policy.locator('aside a')).toHaveAttribute(
        'href',
        '/products/samejob/privacy',
      );
    }
  }
});
