import { test, expect } from '@playwright/test';

for (const locale of ['en', 'zh'] as const) {
  const prefix = locale === 'zh' ? '/zh' : '';
  const otherPrefix = locale === 'zh' ? '' : '/zh';
  for (const kind of ['support', 'privacy'] as const) {
    test(`${locale} TillTinker ${kind} has working language and policy links`, async ({
      page,
    }) => {
      const path = `${prefix}/products/tilltinker/${kind}`;
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('h1')).toContainText('TillTinker');
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        `https://hailinklabs.com${path}`,
      );
      await expect(page.locator('main a[href^="mailto:"]')).toHaveAttribute(
        'href',
        /subject=TillTinker%20Support/,
      );
      await expect(
        page.locator('main a[href^="https://apps.apple.com"]'),
      ).toHaveCount(0);
      const other = page
        .locator(`a[href="${otherPrefix}/products/tilltinker/${kind}"]`)
        .first();
      await other.click();
      await expect(page).toHaveURL(
        new RegExp(`${otherPrefix}/products/tilltinker/${kind}$`),
      );
      const partner = kind === 'support' ? 'privacy' : 'support';
      await page
        .locator(`main a[href="${otherPrefix}/products/tilltinker/${partner}"]`)
        .click();
      await expect(page).toHaveURL(
        new RegExp(`${otherPrefix}/products/tilltinker/${partner}$`),
      );
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    });
  }
  test(`${locale} TillTinker privacy separates local learning, Apple and exports`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/products/tilltinker/privacy`);
    const policy = page.locator('article.policy');
    await expect(policy).toContainText(
      locale === 'en' ? 'off by default' : '默认关闭',
    );
    await expect(policy).toContainText(
      locale === 'en'
        ? 'Active rounds, drawers, trays, Undo history and detailed Replay do not sync'
        : '进行中的轮次、钱箱、托盘、Undo 历史及详细 Replay 不同步',
    );
    await expect(policy).toContainText(
      locale === 'en'
        ? 'never purchase access, trial entitlement or Apple receipts'
        : '不包含购买权益、试用授权或 Apple 收据',
    );
    await expect(policy).toContainText(
      locale === 'en'
        ? 'Turning sync off does not delete previous iCloud records'
        : '关闭同步不会删除原有 iCloud 记录',
    );
    await expect(policy).toContainText(
      locale === 'en' ? 'safety copies can remain' : '内部安全副本可能保留',
    );
    await expect(policy).toContainText(
      locale === 'en'
        ? 'Keychain trial-clock record can remain'
        : 'Keychain 中的试用时钟记录可能',
    );
    await expect(policy).toContainText(
      locale === 'en' ? 'GitHub Pages' : 'GitHub Pages',
    );
    await expect(policy).toContainText(
      locale === 'en' ? '12 months' : '12 个月',
    );
  });
  test(`${locale} TillTinker support explains parent-started trial and retained history`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/products/tilltinker/support`);
    const content = page.locator('article.policy');
    await expect(content).toContainText(
      locale === 'en' ? '36 guided missions' : '36 个引导任务',
    );
    await expect(content).toContainText('Trade First');
    await expect(content).toContainText(
      locale === 'en'
        ? 'Installing the app does not start the trial'
        : '安装 App 不会自动开始试用',
    );
    await expect(content).toContainText(
      locale === 'en'
        ? 'no subscription or automatic renewal'
        : '没有订阅或自动续费',
    );
    await expect(content).toContainText(
      locale === 'en'
        ? 'An already-started round can finish'
        : '已开始的轮次可继续完成',
    );
    await expect(content).toContainText(
      locale === 'en'
        ? 'Apple’s current localized price'
        : 'Apple 当前本地化价格',
    );
    await expect(content).toContainText('Restore Purchases');
    await expect(content).toContainText('Restore Learning Backup');
  });
}
