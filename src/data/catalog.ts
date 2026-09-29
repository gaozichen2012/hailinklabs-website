import { products, type ProductData, type Copy } from './products';
export type CatalogProduct = Pick<
  ProductData,
  | 'slug'
  | 'name'
  | 'storeName'
  | 'subtitle'
  | 'summary'
  | 'value'
  | 'description'
>;
export const catalog: readonly CatalogProduct[] = [
  ...products,
  {
    slug: 'minutesprout',
    name: 'MinuteSprout',
    storeName: 'MinuteSprout: Kids Time Games',
    subtitle: ['Learn time by doing', '动手学习时间'],
    summary: [
      'Predict and measure everyday activities together.',
      '一起预测并测量日常活动的用时。',
    ],
    value: [
      'Make time something children can explore.',
      '让孩子在探索中理解时间。',
    ],
    description: [
      'For ages 6–8: guess how long an activity takes, measure it, and plan with personal time cards.',
      '适合 6–8 岁儿童：猜测活动用时，动手测量，再用个人时间卡练习安排。',
    ],
  },
];
export const categories: readonly {
  id: string;
  title: Copy;
  slugs: readonly string[];
}[] = [
  {
    id: 'work',
    title: ['Work & Business', '工作与业务'],
    slugs: ['samejob', 'gearproof', 'tmproof', 'pressrecipe'],
  },
  {
    id: 'animals',
    title: ['Animal Records', '动物记录'],
    slugs: ['litterround', 'calvingpocket'],
  },
  { id: 'fitness', title: ['Fitness', '运动训练'], slugs: ['hybridloop'] },
  {
    id: 'family',
    title: ['Kids & Family', '儿童与家庭'],
    slugs: ['turnmath', 'minutesprout'],
  },
];
export const featured = ['samejob', 'gearproof', 'litterround'].map((slug) =>
  catalog.find((p) => p.slug === slug)!,
);
export const supportProducts = [
  ...catalog,
  { slug: 'botsteps', name: 'BotSteps' },
  { slug: 'heardraw', name: 'HearDraw' },
];
// Public US listings checked against Apple's lookup endpoint on 2026-09-29.
// A US URL is not a claim of worldwide availability or a device purchase test.
export const listings: Record<
  string,
  { url: string; ios: number; verified: string }
> = {
  samejob: {
    url: 'https://apps.apple.com/us/app/invoice-maker-samejob/id6814700434',
    ios: 17,
    verified: '2026-09-29',
  },
  gearproof: {
    url: 'https://apps.apple.com/us/app/gearproof-equipment-checkout/id6814847023',
    ios: 18,
    verified: '2026-09-29',
  },
  litterround: {
    url: 'https://apps.apple.com/us/app/litterround-puppy-tracker/id6814862263',
    ios: 18,
    verified: '2026-09-29',
  },
};
export const highlights: Record<
  string,
  { price: Copy; data: Copy; seo: Copy }
> = {
  samejob: {
    price: [
      '5 free invoices and estimates combined each month · Pro $29.99 lifetime, $1.49/month or $14.99/year',
      '每月免费确认合计 5 张发票和估价单 · Pro $29.99 终身、$1.49/月或 $14.99/年',
    ],
    data: [
      'No app account needed. Work locally, with optional private iCloud sync.',
      '无需 App 账号，可本地工作，也可使用私有 iCloud 同步。',
    ],
    seo: [
      'SameJob — Invoice App for Repeat Customers',
      'SameJob — 面向回头客的开票 App',
    ],
  },
  gearproof: {
    price: [
      '7-day full trial · $19.99 lifetime · No subscription',
      '7 天完整试用 · $19.99 终身买断 · 无订阅',
    ],
    data: [
      'Records stay on this iPhone. Export a backup before moving devices; no automatic cloud sync.',
      '记录保存在这台 iPhone 上。换机前请导出备份；不支持自动云同步。',
    ],
    seo: [
      'GearProof — Equipment Checkout for Small Teams',
      'GearProof — 小团队器材借出与归还记录',
    ],
  },
  litterround: {
    price: [
      '7-day full trial · $9.99 lifetime · No subscription',
      '7 天完整试用 · $9.99 终身买断 · 无订阅',
    ],
    data: [
      'Keep puppy care records on your device. Export a full backup before moving phones.',
      '幼犬护理记录保存在本机，换机前请导出完整备份。',
    ],
    seo: [
      'LitterRound — Puppy Weight and Care Records',
      'LitterRound — 幼犬称重与护理记录',
    ],
  },
  turnmath: {
    price: [
      'Free Starter · $6.99 lifetime unlock · No subscription or timed trial',
      'Free Starter 免费基础版 · $6.99 终身解锁 · 无订阅或计时试用',
    ],
    data: [
      'No app account needed. Core games work offline; settings and anonymous session counts stay on the device.',
      '无需 App 账号，核心游戏可离线使用；设置和匿名会话计数保留在本机。',
    ],
    seo: [
      'TurnMath — Math Practice for Family Game Night',
      'TurnMath — 家庭桌游中的数学练习',
    ],
  },
};
