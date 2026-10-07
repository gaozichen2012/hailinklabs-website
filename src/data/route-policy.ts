// Keep historic URLs readable, with one primary URL per piece of content.
export const canonicalPath = (path: string) =>
  path
    .replace(
      /^((?:\/zh)?)\/beatmend-(support|privacy)$/,
      '$1/products/beatmend/$2',
    )
    .replace(
      /^((?:\/zh)?)(\/(?:storyundo|cluemend|affixhop|carttinker|beatmend))(?=\/|$)/,
      '$1/products$2',
    );
export const isAlias = (path: string) => canonicalPath(path) !== path;
