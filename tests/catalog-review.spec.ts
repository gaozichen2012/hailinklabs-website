import { expect, test } from '@playwright/test';

const prices = [
  ['samejob', ['$29.99', '$1.49', '$14.99']],
  ['tmproof', ['$9.99']],
  ['litterround', ['$9.99']],
  ['calvingpocket', ['$19.99']],
  ['gearproof', ['$19.99']],
  ['hybridloop', ['$19.99']],
  ['pressrecipe', ['$9.99']],
  ['turnmath', ['$6.99']],
  ['minutesprout', ['$6.99']],
  ['botsteps', ['$9.99']],
  ['heardraw', ['$9.99']],
  ['rulesprout', ['$5.99']],
  ['tilltinker', ['$4.99']],
] as const;

for (const prefix of ['', '/zh']) {
  test(`${prefix || 'English'} all 13 products retain their own prices and resources`, async ({
    page,
  }) => {
    test.setTimeout(120_000);
    for (const [slug, amounts] of prices) {
      for (const suffix of ['', '/support']) {
        await page.goto(`${prefix}/products/${slug}${suffix}`);
        for (const amount of amounts)
          await expect(page.locator('main')).toContainText(amount);
        await expect(
          page.locator(`main a[href="${prefix}/products/${slug}/privacy"]`),
        ).toBeVisible();
      }
      await page.goto(`${prefix}/products/${slug}/privacy`);
      await expect(page.locator('article.policy')).toBeVisible();
      await expect(
        page.locator(`main a[href="${prefix}/products/${slug}/support"]`),
      ).toBeVisible();
      if (prefix)
        await expect(
          page.locator(`main a[href="/products/${slug}/privacy"]`),
        ).toBeVisible();
    }
  });

  test(`${prefix || 'English'} new family products preserve different access and storage rules`, async ({
    page,
  }) => {
    for (const [slug, expected] of [
      [
        'botsteps',
        prefix
          ? ['36', '20', '首次使用', '无 App 账号、云同步或导出']
          : ['36', '20', 'first use', 'No app account, cloud sync or export'],
      ],
      [
        'heardraw',
        prefix
          ? ['30', '无评分或数字画布', '不拍摄、上传或评价']
          : [
              '30',
              'no scoring or digital canvas',
              'does not photograph, upload or evaluate',
            ],
      ],
      [
        'rulesprout',
        prefix
          ? ['24', '前六个完整关卡免费', '无订阅或计时试用']
          : [
              '24',
              'first six complete lessons are free',
              'No subscription or timed trial',
            ],
      ],
      [
        'tilltinker',
        prefix
          ? ['36', '安装不会启动试用', '默认关闭', '不恢复购买权益']
          : [
              '36',
              'installing does not start it',
              'off by default',
              'do not restore purchase access',
            ],
      ],
    ] as const) {
      await page.goto(`${prefix}/products/${slug}`);
      for (const text of expected)
        await expect(page.locator('main')).toContainText(text);
      await expect(
        page.locator('.product-gallery, .store-download'),
      ).toHaveCount(0);
      await page
        .locator(`main a[href="${prefix}/products/${slug}/support"]`)
        .click();
      await page.locator(`main a[href="${prefix}/products/${slug}"]`).click();
      await expect(page).toHaveURL(new RegExp(`${prefix}/products/${slug}$`));
    }
  });
}
