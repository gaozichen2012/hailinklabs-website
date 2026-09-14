# Deployment

## Architecture

The public website repository builds with Astro and deploys `dist/` through GitHub Actions to GitHub Pages at **https://hailinklabs.com**. Registrar/DNS remain with 新网 and email remains with Tencent. No runtime backend or paid service is introduced.

The private `internal/` submodule contains records only. CI uses `submodules: false`; no private-repository credentials are needed for website builds. Never copy internal records into `src/`, `public/`, `dist/`, public logs or artifacts.

## Workflow

Push to `main` runs installation, lint, typecheck, privacy release check, build and browser tests, then uploads only `dist/` and deploys Pages. Branches and pull requests run checks without deploying. Deployment uses GitHub's short-lived token and OIDC permissions.

A public checkout without initialized submodules supports the complete website check:

```sh
npm ci
npx playwright install chromium webkit
npm run check
npm run release:check
npm run verify:production
```

Production checks cover seven pages, sitemap, robots, favicon, missing-path 404, normal certificate trust, HTTP-to-HTTPS and www-to-apex redirects. Browser emulation does not constitute physical-device testing.

## Privacy publication gate

`src/data/privacy-review.json` records approval, review date and unresolved items. `npm run release:check` blocks publication until the recorded approval is complete. Authorized maintainers must review the private supporting records when data practices change; the public build does not access them.

## Operations and rollback

For DNS, email or account operations, authorized maintainers must initialize the private submodule and read its engineering handbook and operational records first. Website-only work does not require private access. Do not change infrastructure as part of routine website publishing.

Revert a website change with a normal reviewed Git commit and let `main` deploy again. Do not rewrite history or change DNS as a routine deployment rollback.

See [project state](项目当前状态.md) for the public engineering snapshot and [private records instructions](../README.md#private-records) for submodule maintenance.
