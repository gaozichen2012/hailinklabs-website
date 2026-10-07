# Hailink Labs

English-first company website for **Hailink Labs / 深圳市海狸智联科技有限公司**, including Invoice Maker: SameJob product, support, and privacy pages.

Astro and TypeScript generate static HTML/CSS. No runtime backend, database, CMS, forms, analytics, tracking cookies, or client JavaScript. Hosting is **GitHub Pages**. Canonical origin: https://hailinklabs.com.

## Development

Use Node 24 and the committed npm lockfile:

```sh
npm ci
npx playwright install chromium webkit
npm run check
npm run release:check
npm run preview
```

Preview: http://127.0.0.1:4321. Tests cover Chromium/WebKit, desktop/mobile viewports, every page, internal links, metadata, keyboard navigation, sitemap, robots, favicon, and custom 404. Browser emulation does not constitute physical iPhone testing. Astro preview is not the GitHub Pages server: production routing and redirects must be checked separately.

## Publishing

The 2026-10-07 policy permits Actions only for publishing a locally verified static package. Builds, lint, typecheck, release/SEO checks and browser tests run locally. GitHub AI features remain prohibited. `.github/workflows/check.yml` is manual-only on main and requires the package SHA-256; it uploads/deploys `.pages-release/site.tar.gz` without dependencies, builds, tests or private submodules.

Ordinary pushes use `[skip ci]` and do not deploy. Actions is disabled outside an authorized release; temporarily enable it for publication and disable it after completion. Keep the package manifest and local validation evidence in sync with the website source. A successful deploy still requires local verification against the production domain.

Follow [deployment](docs/DEPLOYMENT.md). DNS and account operations require the private operational records. `npm run verify:production` records live acceptance in ignored `artifacts/production-verification.json`; local success is not production success.

## Maintenance

- Identity and routes: `src/data/site.ts`.
- Pages: `src/pages`; shared layout/CSS: `src/layouts`, `src/styles`.
- SameJob privacy publication decision: `src/data/privacy-review.json`. Recheck against app source and actual operations when practices change.
- No App Store download badge until a real listing exists.
- Download availability and verification dates: `src/data/catalog.ts`. An unverified listing is not a claim that an app is unreleased.
- Social preview metadata and static JSON-LD: `src/data/seo.ts`. No invented ratings/reviews; structured data does not guarantee search rich results.
- Regenerate the affected checked-in social PNGs after product copy changes with `node scripts/generate-social-images.mjs` after `npm ci`, then visually review them. The script checks existing source-asset hashes and uses the sharp version already locked through Astro; it adds no runtime JavaScript.
- Keep credentials, complete private DNS exports, browser state and mail contents outside Git.
- Project rules: [AGENTS](AGENTS.md), [engineering handbook](docs/项目工程手册.md), [current state](docs/项目当前状态.md).

## Private records

`internal/` is a Git submodule backed by a **private** repository. Its contents and independent history require authorized GitHub access. The submodule path, repository URL and pinned commit ID are public. Website source, checks and Pages deployment work without this submodule.

Authorized maintainers can initialize the pinned version:

```sh
git submodule update --init internal
```

Before editing internal records, use its main branch and fetch the latest version (first check for existing changes):

```sh
git -C internal status --short --branch
git -C internal switch main
git -C internal pull --ff-only origin main
```

Commit and push the private changes first, then record the new reference in the public repository. Stage only the intended files:

```sh
git -C internal add docs/FILE.md
git -C internal diff --cached --check
git -C internal commit -m "Update internal records"
git -C internal push origin main
git add internal
git diff --cached --check
git commit -m "Update internal records reference"
git push --recurse-submodules=check origin main
```

Do not put private contents in public commit messages or CI output. Credentials and raw private evidence belong outside both repositories.

## Guides, free templates and search

`src/data/guides.json` and `templates.json` feed static English/Chinese routes,
topic hubs, product resource links, Article/Breadcrumb schema and real App Store
banners. Each published app starts with three distinct guides and a suitable free
resource. HTML, English PDFs and bilingual CSVs require no account or tracking.

After substantial content changes, update the explicit content dates; regenerate
PDF/CSV assets with `python3 scripts/generate-templates.py` in an authoring
environment with reportlab and visually review the PDFs. Checked-in assets and
`template-assets.json` let builds verify source freshness without Python.

Run `npm run seo:check` after building and `npm run audit:quality` for Lighthouse
reports. `npm run check` retains the full four-project Playwright suite. Optional
`SITE_VISUAL_AUDIT=1 npm test` captures every page at both release widths.

IndexNow snapshots the previous live content manifest before deployment and
submits only changed indexable URLs after verified deployment. Receipts are saved
in artifacts. A temporary service failure leaves Pages online; retain the original
baseline when retrying. Acceptance does not prove indexing.

Optional real public verification/provider values are configured in
`src/data/search-config.json` or local build environment variables
`GOOGLE_SITE_VERIFICATION`, `BING_SITE_VERIFICATION`, `APPLE_PROVIDER_TOKEN`.
Do not use sample values. Normal App Store URLs remain active until a real Apple
provider token exists. See [external platform actions](docs/SEO_EXTERNAL_ACTIONS.md).
