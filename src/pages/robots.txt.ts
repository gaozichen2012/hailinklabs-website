import type { APIRoute } from 'astro';
import { site } from '../data/site';
export const GET: APIRoute = () =>
  new Response(
    [
      ...[
        'Googlebot',
        'Bingbot',
        'OAI-SearchBot',
        'ChatGPT-User',
        'GPTBot',
        'Claude-SearchBot',
        'Claude-User',
        'ClaudeBot',
        'PerplexityBot',
        'Perplexity-User',
        'Google-Extended',
        '*',
      ].map((bot) => `User-agent: ${bot}\nAllow: /\n`),
      `Sitemap: ${site.url}/sitemap.xml\n`,
    ].join('\n'),
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
