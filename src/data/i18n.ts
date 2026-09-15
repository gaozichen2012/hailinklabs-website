import { site } from './site';
import { zh } from './zh';

export type Locale = 'en' | 'zh-CN';
export const companyName = (locale: Locale) =>
  locale === 'zh-CN' ? site.legalNameZh : site.legalName;

export function localizedPath(path: string, locale: Locale): string {
  return locale === 'en' ? path : `/zh${path === '/' ? '' : path}`;
}

// Translation runs only at build time. Astro escapes all translated text.
export const translator = (locale: Locale) => (source: keyof typeof zh) =>
  locale === 'en' ? source : zh[source];
