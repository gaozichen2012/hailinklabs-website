import variants from './screenshot-variants.json';

// Delivery metadata only; product facts and original screenshot links remain
// in their existing sources. Run scripts/generate-screenshot-variants.mjs after
// changing a screenshot or its gallery selection.
export function screenshot(source: string) {
  const image = variants[source as keyof typeof variants];
  if (!image) throw new Error(`Missing screenshot variants: ${source}`);
  return {
    src: source,
    srcset: image.variants.map((v) => `${v.file} ${v.width}w`).join(', '),
    width: image.width,
    height: image.height,
  };
}
