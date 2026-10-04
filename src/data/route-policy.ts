// Keep every historic URL readable, while giving its content one primary URL.
export const canonicalPath = (path: string) =>
  path.replace(
    /^((?:\/zh)?)(\/(?:storyundo|cluemend|affixhop))(?=\/|$)/,
    '$1/products$2',
  );
export const isAlias = (path: string) => canonicalPath(path) !== path;
