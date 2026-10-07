import { resourceForPath } from './resources';
// The 2026-10-04 release changes navigation, structured data and related links
// across existing pages. This is an explicit content date, never a build clock.
// For later substantive edits, add an override and update the resource itself.
const pageUpdates: Record<string, string> = {
  '/': '2026-10-07',
  '/products': '2026-10-07',
  '/support': '2026-10-07',
  '/contact': '2026-10-07',
  '/about': '2026-10-07',
  '/products/batchmise': '2026-10-07',
  '/products/patchrelay': '2026-10-07',
  '/products/seamcarry': '2026-10-07',
  '/products/siterevisit': '2026-10-07',
  '/products/panebatch': '2026-10-07',
  '/products/carttinker': '2026-10-07',
  '/products/carttinker/support': '2026-10-07',
  '/products/carttinker/privacy': '2026-10-07',
  '/products/beatmend': '2026-10-07',
  '/products/beatmend/support': '2026-10-07',
  '/products/beatmend/privacy': '2026-10-07',
  '/products/batchmise/support': '2026-10-07',
  '/products/batchmise/privacy': '2026-10-07',
  '/products/patchrelay/support': '2026-10-07',
  '/products/patchrelay/privacy': '2026-10-07',
  '/products/seamcarry/support': '2026-10-07',
  '/products/seamcarry/privacy': '2026-10-07',
  '/products/siterevisit/support': '2026-10-07',
  '/products/siterevisit/privacy': '2026-10-07',
  '/products/panebatch/support': '2026-10-07',
  '/products/panebatch/privacy': '2026-10-07',
  '/carttinker': '2026-10-07',
  '/carttinker/support': '2026-10-07',
  '/carttinker/privacy': '2026-10-07',
  '/beatmend': '2026-10-07',
  '/beatmend-support': '2026-10-07',
  '/beatmend-privacy': '2026-10-07',

  '/products/linelilt': '2026-10-07',
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
    pageUpdates[path] ||
    pageUpdates[english] ||
    resourceForPath(english)?.updatedAt ||
    '2026-10-04'
  );
};
