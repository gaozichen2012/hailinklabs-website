export const site = {
  name: 'Hailink Labs',
  legalName: 'Shenzhen Hailink Technology Co., Ltd.',
  legalNameZh: '深圳市海狸智联科技有限公司',
  email: 'gaozichen@hailinklabs.com',
  url: 'https://hailinklabs.com',
  productName: 'Invoice Maker: SameJob',
};

export const englishRoutes = [
  '/',
  '/about',
  '/products',
  '/products/samejob',
  '/products/samejob/privacy',
  '/products/samejob/support',
  '/contact',
  '/products/tmproof',
  '/products/tmproof/privacy',
  '/products/tmproof/support',
  '/products/litterround',
  '/products/litterround/privacy',
  '/products/litterround/support',
  '/products/gearproof',
  '/products/gearproof/privacy',
  '/products/gearproof/support',
  '/products/calvingpocket',
  '/products/calvingpocket/privacy',
  '/products/calvingpocket/support',
] as const;

export const routes = [
  ...englishRoutes,
  ...englishRoutes.map((path) => `/zh${path === '/' ? '' : path}`),
];
