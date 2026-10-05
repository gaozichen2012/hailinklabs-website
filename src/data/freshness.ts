import { resourceForPath } from './resources';
// The 2026-10-04 release changes navigation, structured data and related links
// across existing pages. This is an explicit content date, never a build clock.
// For later substantive edits, add an override and update the resource itself.
const pageUpdates: Record<string, string> = {
  '/beatmend': '2026-10-06',
  '/beatmend-support': '2026-10-06',
  '/beatmend-privacy': '2026-10-06',
  '/carttinker': '2026-10-05',
  '/carttinker/support': '2026-10-05',
  '/carttinker/privacy': '2026-10-05',
  '/products/panebatch/support': '2026-10-05',
  '/products/panebatch/privacy': '2026-10-05',
  '/zh/products/panebatch/support': '2026-10-05',
  '/zh/products/panebatch/privacy': '2026-10-05',
  '/products/formalsflow': '2026-10-05',
  '/products/formalsflow/support': '2026-10-05',
  '/products/formalsflow/privacy': '2026-10-05',
  '/products/hybridloop': '2026-10-05',
  '/products/rulesprout': '2026-10-05',
  '/guides/contractors': '2026-10-05',
  '/guides/animal-records': '2026-10-05',
  '/guides/heat-press': '2026-10-05',
  '/guides/small-business': '2026-10-05',
};
export const lastModified = (path: string) => {
  const english = path.replace(/^\/zh/, '') || '/';
  return (
    pageUpdates[path] || resourceForPath(english)?.updatedAt || '2026-10-04'
  );
};
