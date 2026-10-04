import { resourceForPath } from './resources';
// The 2026-10-04 release changes navigation, structured data and related links
// across existing pages. This is an explicit content date, never a build clock.
// For later substantive edits, add an override and update the resource itself.
const pageUpdates: Record<string, string> = {};
export const lastModified = (path: string) => {
  const english = path.replace(/^\/zh/, '') || '/';
  return (
    resourceForPath(english)?.updatedAt || pageUpdates[english] || '2026-10-04'
  );
};
