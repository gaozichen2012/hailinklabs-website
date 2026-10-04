import { createHash } from 'node:crypto';
import { listings } from './catalog';
import config from './search-config.json' with { type: 'json' };
export type CampaignSource = 'product' | 'guide' | 'template' | 'catalog';
const provider =
  import.meta.env?.APPLE_PROVIDER_TOKEN ||
  process.env.APPLE_PROVIDER_TOKEN ||
  config.appleProviderToken;
if (provider && !/^[1-9]\d+$/.test(provider))
  throw new Error('Invalid Apple provider token');
export const appleProviderToken: string | null = provider || null;
export function campaignName(
  slug: string,
  source: CampaignSource,
  content = '',
) {
  const full =
    `hailink_${slug}_${source}${content ? `_${content}` : ''}`.replace(
      /[^a-z0-9_]/g,
      '_',
    );
  return full.length <= 30
    ? full
    : `${full.slice(0, 24)}_${createHash('sha256').update(full).digest('hex').slice(0, 5)}`;
}
export function buildAppStoreUrl({
  slug,
  source = 'product',
  content = '',
  providerToken = appleProviderToken,
}: {
  slug: string;
  source?: CampaignSource;
  content?: string;
  providerToken?: string | null;
}) {
  const listing = listings[slug];
  if (!listing) return undefined;
  if (!providerToken) return listing.url;
  if (!/^[1-9]\d+$/.test(providerToken))
    throw new Error('Invalid Apple provider token');
  const url = new URL(listing.url);
  url.searchParams.set('pt', providerToken);
  url.searchParams.set('ct', campaignName(slug, source, content));
  url.searchParams.set('mt', '8');
  return url.href;
}
export function smartAppBanner(
  slug: string,
  source: CampaignSource,
  content = '',
) {
  const id = listings[slug]?.url.match(/\/id(\d+)/)?.[1];
  if (!id) return undefined;
  return `app-id=${id}${appleProviderToken ? `, affiliate-data=pt=${appleProviderToken}&ct=${campaignName(slug, source, content)}&mt=8` : ''}`;
}
