import { expect, test } from '@playwright/test';
import { site } from '../src/data/site';

// Exercise actual discovery and return paths, rather than only checking the
// data array. Each app keeps its own commercial and data-handling boundaries.
const projects = [
  {
    slug: 'cueladder',
    name: 'CueLadder',
    en: [
      'You assess your playing. CueLadder does not listen, grade notes, use MIDI or AI scoring, or certify performance readiness. Respect copyright when choosing score images.',
      'US$14.99',
    ],
    zh: [
      '由你自评演奏；CueLadder 不听音、不评音符、不使用 MIDI 或 AI 评分、不认证演出准备度；选择乐谱图片时尊重版权。',
      'US$14.99',
    ],
  },
  {
    slug: 'kilnpair',
    name: 'KilnPair',
    en: [
      'App states describe recording progress, not temperature or safe opening. Follow your kiln operating instructions. Resized recording JPEGs are not color-calibrated references.',
      'US$19.99',
    ],
    zh: [
      'App 状态只描述记录进度，不表示温度或安全开窑；遵守窑炉操作规程。缩小 JPEG 不是色彩校准依据。',
      'US$19.99',
    ],
  },
  {
    slug: 'refsettle',
    name: 'RefSettle',
    en: [
      'RefSettle does not move money, connect banks, generate invoices or provide tax advice. Void corrects incorrect or duplicate payment entries; real refunds paid out are outside this version.',
      'US$19.99',
    ],
    zh: [
      'RefSettle 不转账、不连接银行、不开发票、不提供税务建议。Void 用于错误或重复收款；真实退款支出不在本版本范围。',
      'US$19.99',
    ],
  },
  {
    slug: 'loadquilt',
    name: 'LoadQuilt',
    en: [
      'LoadQuilt records human checks. It does not control machinery, certify safety or guarantee quilting quality. Follow your confirmed studio policy and equipment instructions.',
      'US$19.99',
    ],
    zh: [
      'LoadQuilt 记录人工检查，不控制机器、不认证安全、不保证绗缝质量；遵守已确认的工作室规则和设备说明。',
      'US$19.99',
    ],
  },
  {
    slug: 'batchmise',
    name: 'BatchMise',
    en: ['Uncertain', 'Hold', 'US$19.99', 'does not mean added or mixed'],
    zh: ['Uncertain', 'Hold', 'US$19.99', '不代表已加入或混合'],
  },
  {
    slug: 'patchrelay',
    name: 'PatchRelay',
    en: ['64', 'US$19.99', 'does not restore PASS', 'does not detect wiring'],
    zh: ['64', 'US$19.99', '不恢复 PASS', '不检测接线'],
  },
  {
    slug: 'seamcarry',
    name: 'SeamCarry',
    en: [
      'Two patterns',
      'US$9.99',
      'does not certify fit or geometry',
      'without merging',
    ],
    zh: ['两套纸样', 'US$9.99', '不认证合体或几何正确', '不合并'],
  },
  {
    slug: 'siterevisit',
    name: 'SiteRevisit',
    en: [
      'Skipped viewpoints are not counted as photographed',
      'seven-day trial',
      'safety copy',
      'does not restore photos',
    ],
    zh: ['跳过不计为已拍', '七天试用', '安全副本', '不恢复照片'],
  },
  {
    slug: 'panebatch',
    name: 'PaneBatch',
    en: [
      'One complete job',
      'US$19.99',
      'No subscription or timed trial',
      '1/32-inch',
    ],
    zh: ['一个完整工单', 'US$19.99', '无订阅或计时试用', '1/32 英寸'],
  },
  {
    slug: 'carttinker',
    name: 'CartTinker',
    en: ['ages 6–8', '$5.99', 'Prices are pretend', 'off by default'],
    zh: ['6–8', '$5.99', '价格均为虚构', '默认关闭'],
  },
  {
    slug: 'beatmend',
    name: 'BeatMend',
    en: ['24', '$9.99', 'unscored exploration', 'off by default'],
    zh: ['24', 'US$9.99', '不评分', '默认关闭'],
  },
] as const;

for (const prefix of ['', '/zh']) {
  for (const product of projects) {
    test(`${prefix || 'English'} ${product.name} discovery, access and data paths`, async ({
      page,
    }) => {
      const path = `${prefix}/products/${product.slug}`;
      await page.goto(`${prefix}/products`);
      const card = page.locator('.matrix-card').filter({
        has: page.getByRole('heading', { name: product.name, exact: true }),
      });
      await expect(card).toBeVisible();
      await expect(card.locator('.availability')).toHaveText(
        prefix ? '下载链接暂未提供' : 'Download link not yet available',
      );
      await expect(card.locator('.store-download')).toHaveCount(0);
      await card.locator(`a[href="${path}"]`).click();
      await expect(page.locator('main h1')).toContainText(product.name);
      for (const text of prefix ? product.zh : product.en)
        await expect(page.locator('main')).toContainText(text);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        site.url + path,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
      await expect(
        page.locator('a[href^="https://apps.apple.com"]'),
      ).toHaveCount(0);
      await expect(page.locator('meta[name="apple-itunes-app"]')).toHaveCount(
        0,
      );
      for (const width of [320, 768]) {
        await page.setViewportSize({ width, height: 900 });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= window.innerWidth,
          ),
        ).toBe(true);
      }
      await page.screenshot({
        path: `artifacts/catalog-20261008/${test.info().project.name}-${product.slug}${prefix ? '-zh' : '-en'}.png`,
        fullPage: true,
      });
      for (const kind of ['support', 'privacy']) {
        await page.locator(`main a[href="${path}/${kind}"]`).first().click();
        await expect(page).toHaveURL(new RegExp(`${path}/${kind}$`));
        await expect(page.locator('main h1')).toContainText(product.name);
        await page.locator(`main a[href="${path}"]`).first().click();
        await expect(page).toHaveURL(new RegExp(`${path}$`));
      }
      await page.goto(`${prefix}/support`);
      await page
        .locator(`.support-directory a[href="${path}/support"]`)
        .click();
      await expect(page).toHaveURL(new RegExp(`${path}/support$`));
      await page.locator('.language-switch').click();
      await expect(page).toHaveURL(
        new RegExp(`${prefix ? '' : '/zh'}/products/${product.slug}/support$`),
      );
    });
  }
}

test('historic CartTinker and BeatMend links resolve to one indexable language pair', async ({
  page,
  request,
}) => {
  const aliases = [
    ['/carttinker', '/products/carttinker'],
    ['/carttinker/support', '/products/carttinker/support'],
    ['/carttinker/privacy', '/products/carttinker/privacy'],
    ['/beatmend', '/products/beatmend'],
    ['/beatmend-support', '/products/beatmend/support'],
    ['/beatmend-privacy', '/products/beatmend/privacy'],
  ];
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const prefix of ['', '/zh'])
    for (const [oldPath, primary] of aliases) {
      await page.goto(prefix + oldPath);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        'href',
        site.url + prefix + primary,
      );
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        'content',
        'noindex, follow',
      );
      expect(sitemap).not.toContain(
        `<loc>${site.url}${prefix}${oldPath}</loc>`,
      );
      expect(sitemap).toContain(`<loc>${site.url}${prefix}${primary}</loc>`);
      await page.locator('.language-switch').click();
      await expect(page).toHaveURL(
        new RegExp(`${prefix ? '' : '/zh'}${primary}$`),
      );
    }
});
