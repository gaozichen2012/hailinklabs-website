# Deployment

## Architecture

The public website repository builds locally with Astro; the existing published site is hosted on GitHub Pages at **https://hailinklabs.com**. The site has no runtime backend.

The private `internal/` submodule contains records only. Local website checks and builds do not read the submodule; no private-repository credentials are needed. Never copy internal records into `src/`, `public/`, `dist/`, public logs or artifacts.

## Workflow

GitHub Actions is disabled by the user's 2026-10-07 instruction. Do not dispatch, rerun, poll or re-enable Actions. GitHub AI features, including Copilot coding agents, automated AI reviews, GitHub Models and AI workflows, must not be used. The workflow file is retained only as historical configuration.

Run installation, lint, typecheck, privacy release check, build, SEO and browser tests locally. Commit with `[skip ci]` and push ordinary source changes. These pushes do not publish Pages. Production publishing is pending a separately authorized method; retain the current site and do not change hosting, DNS or account settings to bypass this restriction.

A public checkout without initialized submodules supports the complete website check:

```sh
npm ci
npx playwright install chromium webkit
npm run check
npm run release:check
npm run verify:production
```

Production checks cover all English and Chinese pages listed in the built sitemap, sitemap, robots, favicon, missing-path 404, normal certificate trust, HTTP-to-HTTPS and www-to-apex redirects. Browser emulation does not constitute physical-device testing.

## Privacy publication gate

`src/data/privacy-review.json` records the existing company publication decision, review date, unresolved items and per-product source-review completion. `npm run release:check` blocks publication until the recorded approval is complete. Authorized maintainers must review the private supporting records when data practices change; the public build does not access them.

## Operations and rollback

For DNS, email or account operations, authorized maintainers must initialize the private submodule and read its engineering handbook and operational records first. Website-only work does not require private access. Do not change infrastructure as part of routine website publishing.

Revert a source change with a normal reviewed Git commit and local verification. Publishing a rollback requires the same separate authorization as a new release. Do not rewrite history or change DNS as a routine deployment rollback.

See [project state](项目当前状态.md) for the public engineering snapshot and [private records instructions](../README.md#private-records) for submodule maintenance.

## Brand assets

Website brand files are byte-for-byte copies of the HailinkLogo V1.1 release at commit `9b0fd21397afabdce6ffafea87c352a99e67546a`. Source paths and SHA-256 values are recorded in `src/data/brand-assets.json`. Use the outlined Primary SVG to avoid external font dependencies; keep the original proportions and at least 0.5W surrounding clear space. The header, footer and About use Primary; the homepage uses Symbol; favicon and Apple touch icon use the supplied platform exports. Update assets from the source repository, never redraw them in this website.
