import { canonicalPath } from '../src/data/route-policy';
import { test, expect } from '@playwright/test';

for (const prefix of ['', '/zh']) {
  for (const base of ['/cluemend', '/products/cluemend']) {
    test(`${prefix || 'en'} ${base} release pages preserve availability and language navigation`, async ({
      page,
    }) => {
      for (const kind of ['', '/support', '/privacy']) {
        const path = `${prefix}${base}${kind}`;
        expect((await page.goto(path))?.status()).toBe(200);
        await expect(page.locator('h1')).toContainText('ClueMend');
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          'href',
          `https://hailinklabs.com${canonicalPath(path)}`,
        );
        await expect(page.locator('.page-intro .availability')).toHaveText(
          prefix ? '下载链接暂未提供。' : 'Download link not yet available.',
        );
        await expect(
          page.locator('a[href^="https://apps.apple.com"]'),
        ).toHaveCount(0);
        await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
          'content',
          'https://hailinklabs.com/social/cluemend.png',
        );
        await expect(page.locator('main a[href^="mailto:"]')).toHaveAttribute(
          'href',
          'mailto:gaozichen@hailinklabs.com?subject=ClueMend%20Support',
        );
        await page.locator('.language-switch').click();
        await expect(page).toHaveURL(
          new RegExp(`${prefix ? '' : '/zh'}${canonicalPath(base)}${kind}$`),
        );
        await page.waitForLoadState('load');
        for (const width of [320, 768]) {
          await page.setViewportSize({ width, height: 900 });
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBe(true);
        }
      }
    });
  }
  test(`${prefix || 'en'} ClueMend explains trial, restoration and recording copies`, async ({
    page,
  }) => {
    await page.goto(`${prefix}/cluemend/support`);
    for (const value of prefix
      ? [
          '七天',
          'US$9.99',
          '无订阅或自动扣费',
          '恢复购买不会重新计时',
          '不恢复游戏历史或录音',
          '不提供 Apple 家人共享',
          'ClueMend 不加密 ZIP',
          'Talk Live',
        ]
      : [
          'seven days',
          'US$9.99',
          'no subscription or automatic charge',
          'restoring does not restart',
          'not game history or recordings',
          'Apple Family Sharing is not offered',
          'ZIP files are not encrypted',
          'Talk Live',
        ]) {
      await expect(page.locator('article.policy')).toContainText(value);
    }
    await page.goto(`${prefix}/cluemend/privacy`);
    for (const value of prefix
      ? [
          '默认关闭',
          '不发送给 Hailink Labs',
          '备份与家长主动导出可能包含录音',
          '并不完整擦除每条云端记录',
          '腾讯企业邮箱',
          '12 个月',
          'GitHub Pages',
        ]
      : [
          'off by default',
          'not sent to Hailink Labs',
          'Backups and parent-initiated exports may include recordings',
          'not a complete erasure of every cloud record',
          'Tencent business email',
          '12 months',
          'GitHub Pages',
        ]) {
      await expect(page.locator('article.policy')).toContainText(value);
    }
    await expect(page.locator('article.policy')).not.toContainText(
      /end-to-end encrypted|clinically proven|端到端加密|治疗效果/i,
    );
  });
}
