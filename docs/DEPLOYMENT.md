# Deployment

## Architecture

The public website repository builds locally with Astro; the existing published site is hosted on GitHub Pages at **https://hailinklabs.com**. The site has no runtime backend.

The private `internal/` submodule contains records only. Local website checks and builds do not read the submodule; no private-repository credentials are needed. Never copy internal records into `src/`, `public/`, `dist/`, public logs or artifacts.

## Workflow

The user's updated 2026-10-07 policy allows Actions only to publish locally verified output and inspect that deployment's progress. All builds and tests remain local. Copilot coding agents, automated AI reviews, GitHub Models and AI workflows remain prohibited.

The manual-only workflow on main verifies the operator-supplied SHA-256 of `.pages-release/site.tar.gz`, extracts it and uploads/deploys Pages. It does not install dependencies, build, test or read private submodules. The adjacent manifest records website source and file hashes. Prepare a new verified package after website changes; dispatching an old package does not publish new source.

Use `[skip ci]` for ordinary source pushes. Keep repository Actions disabled except during an authorized release. Such release authorization permits temporarily enabling Actions, manually dispatching the selected package, reading publication progress and disabling Actions after completion. Verify the live website locally before recording it as released. Keep the existing Pages domain, DNS and email configuration.

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
