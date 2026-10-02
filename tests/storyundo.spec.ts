import { test, expect } from '@playwright/test';

for (const prefix of ['', '/zh']) {
  for (const base of ['/storyundo', '/products/storyundo']) {
    for (const kind of ['', '/support', '/privacy']) {
      test(`${prefix || 'en'} ${base}${kind} is reachable with honest availability and language links`, async ({
        page,
      }) => {
        const path = `${prefix}${base}${kind}`;
        expect((await page.goto(path))?.status()).toBe(200);
        await expect(page.locator('h1')).toContainText('StoryUndo');
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          'href',
          `https://hailinklabs.com${path}`,
        );
        await expect(page.locator('.page-intro .availability')).toContainText(
          prefix ? '尚未在 App Store 公开提供' : 'Not publicly available',
        );
        await expect(
          page.locator('a[href^="https://apps.apple.com"]'),
        ).toHaveCount(0);
        await expect(page.locator('main a[href^="mailto:"]')).toHaveAttribute(
          'href',
          'mailto:gaozichen@hailinklabs.com?subject=StoryUndo%20Support',
        );
        await page.locator('.language-switch').click();
        const otherPrefix = prefix ? '' : '/zh';
        await expect(page).toHaveURL(
          new RegExp(`${otherPrefix}${base}${kind}$`),
        );
        await page
          .locator(`main a[href="${otherPrefix}${base}/support"]`)
          .click();
        await expect(page.locator('h1')).toContainText('StoryUndo');
        await page
          .locator(`main a[href="${otherPrefix}${base}/privacy"]`)
          .click();
        await expect(page.locator('article.policy')).toContainText(
          prefix ? 'off by default' : '默认关闭',
        );
        for (const width of [320, 768]) {
          await page.setViewportSize({ width, height: 900 });
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBe(true);
        }
      });
    }
  }
  test(`${prefix || 'en'} StoryUndo support preserves the six-free boundary and backup protection`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/storyundo/support`);
    const content = page.locator('article.policy');
    for (const expected of prefix
      ? [
          '六题',
          '其余 42',
          'US$6.99',
          '没有订阅或自动续费',
          '购买权益或 Apple 收据',
          '不会替换现有学习库',
          '只用昵称',
          '恢复权益，不恢复学习记录',
        ]
      : [
          'Six stories remain free',
          'other 42',
          'US$6.99',
          'no subscription or automatic renewal',
          'never purchase entitlement or Apple receipts',
          'without replacing your existing learning store',
          'Use a nickname only',
          'restores access, not learning records',
        ]) {
      await expect(content).toContainText(expected);
    }
  });
  test(`${prefix || 'en'} StoryUndo privacy separates private cloud, deletion and parent support`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/storyundo/privacy`);
    const policy = page.locator('article.policy');
    for (const expected of prefix
      ? [
          '默认关闭',
          '未完成草稿不同步',
          '昵称',
          '删除时间',
          '成功同步前删除仍待处理',
          '既有 iCloud 副本',
          '腾讯企业邮箱',
          '12 个月',
          'GitHub Pages',
        ]
      : [
          'off by default',
          'Unfinished drafts do not sync',
          'nickname',
          'deletion timestamp',
          'deletion is pending until successful sync',
          'existing iCloud copies',
          'Tencent business email',
          '12 months',
          'GitHub Pages',
        ]) {
      await expect(policy).toContainText(expected);
    }
    await expect(policy).not.toContainText(
      /end-to-end encrypted|端到端加密|clinically proven|治疗效果/i,
    );
    if (prefix) {
      await expect(policy.locator('a[hreflang="en"]')).toHaveAttribute(
        'href',
        '/storyundo/privacy',
      );
    }
  });
}
