# Hailink Labs

English-first company website for **Hailink Labs / 深圳市海狸智联科技有限公司**, including Invoice Maker: SameJob product, support, and privacy pages.

Astro and TypeScript generate static HTML/CSS. No runtime backend, database, CMS, forms, analytics, tracking cookies, or client JavaScript. Hosting is **GitHub Pages**; registrar and DNS stay at **新网**, and business email stays at **Tencent**. Canonical origin: https://hailinklabs.com.

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

Push to `main` runs `.github/workflows/check.yml`: npm ci → lint → typecheck → privacy release check → build → browser tests → upload dist → deploy Pages. Other branches and pull requests run checks only. GitHub's built-in short-lived token and OIDC provide deployment access; no stored custom credentials are needed.

Follow [deployment](docs/DEPLOYMENT.md). DNS and account operations require the private operational records. `npm run verify:production` records live acceptance in ignored `artifacts/production-verification.json`; local success is not production success.

## Maintenance

- Identity and routes: `src/data/site.ts`.
- Pages: `src/pages`; shared layout/CSS: `src/layouts`, `src/styles`.
- SameJob privacy publication decision: `src/data/privacy-review.json`. Recheck against app source and actual operations when practices change.
- No App Store download badge until a real listing exists.
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

Do not put private contents in public commit messages or CI output. Moving records to the submodule does not remove earlier versions from public Git history. Credentials and raw private evidence belong outside both repositories.
