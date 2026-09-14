# Deployment

## Frozen architecture

GitHub `gaozichen2012/hailinklabs-website` → GitHub Actions → GitHub Pages → **https://hailinklabs.com**. New website service cost: **RMB 0/year**. Existing domain renewal and email costs are unchanged. No paid plans, Cloudflare, Nameserver migration, or email reconfiguration.

Official sources checked 2026-09-14:

- [GitHub Pages availability](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site): GitHub Free requires a public repository; public repository Actions are free.
- [Astro deployment](https://docs.astro.build/en/guides/deploy/github/): static Pages deployment via Actions; a custom domain uses `site` with no repository `base` prefix. Astro recommends its official action; this project uses the documented GitHub upload/deploy actions directly so lint, typecheck and tests gate the exact uploaded build.
- [GitHub custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages): upload the built artifact, then deploy with `pages:write` and `id-token:write`.
- [Custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site): bind the custom domain before DNS writes. With Actions, the API/Settings binding is authoritative; a CNAME file alone does not configure it.

## Workflow

`.github/workflows/check.yml`, production branch `main`:

1. Checkout; Node version from `.node-version`; `npm ci`.
2. `npm run lint`, `npm run typecheck`, `npm run release:check`, `npm run build`.
3. Install Chromium/WebKit; `npm test`.
4. Upload `dist/` using GitHub's Pages artifact action.
5. Deploy using a dedicated job with short-lived GitHub OIDC permissions and `github-pages` environment.

Branch and PR runs cannot deploy. The site has no runtime worker or server. GitHub Pages controls HTTP headers; the website uses a supported HTML CSP and referrer meta policy, and does not claim to provide Cloudflare custom headers. Extensionless `.html` routes are verified against Pages separately from Astro preview.

## Initial setup and verification

Audit all Git history and files before making the repository public. Set Pages source to GitHub Actions (`build_type: workflow`), then bind `hailinklabs.com` through Settings → Pages or the GitHub REST API. After the complete DNS backup gate in [DOMAIN_AND_DNS.md](DOMAIN_AND_DNS.md), add only the two user-approved website A records and www CNAME there (新网 limits the same name/type to two; the user accepted this on 2026-09-14). Once the GitHub certificate is issued, enable Enforce HTTPS.

```sh
npm ci
npm run check
npm run release:check
npm run verify:production
```

Verify seven pages, sitemap, robots, favicon, missing-path 404, normal certificate trust, HTTP→HTTPS and www→apex (including paths and query strings). Verify email DNS separately and complete actual external send/receive acceptance.

## Privacy baseline

The previous website task read SameJob source at `263bef96173827698545f434384c2ee1091a84d7`. The owner confirmed support information is not used for additional AI/analytics/crash collection and delegated routine retention choices; the policy uses support-only handling and at most 12 months after issue closure, except ongoing issues or legal obligations. This is a publication decision, not proof of App Store Connect submission or live CloudKit configuration. The website hosting paragraph now identifies GitHub Pages.

## Rollback

Revert the website commit via a normal reviewed Git commit and let `main` deploy again; do not rewrite history or roll back mail DNS. If website DNS must be rolled back, restore only changed A/www records from the full pre-write snapshot. Nameservers and all email records stay unchanged. See current deployment evidence in [project state](项目当前状态.md).

## Current deployment evidence

Source commit `bc0fcdb27a102078f96bb33c2082ba77380d2f2d` was pushed to `main`. [Actions run 34829995379](https://github.com/gaozichen2012/hailinklabs-website/actions/runs/34829995379) completed both check and deploy successfully. Direct HTTP requests to GitHub Pages using the company Host header verified all seven routes and canonical tags, static resources, and custom 404 (11/11). Public DNS now returns the two approved GitHub A records and www CNAME. GitHub has issued the apex/www certificate (expiry 2026-12-13), and Enforce HTTPS is enabled. Public production verification passes 13/13 checks with normal certificate validation. Live Chrome checks pass all seven HTTPS pages at 390×844 with no horizontal overflow; desktop home and mobile Contact/SameJob screenshots were reviewed. The original four MX/NS records are unchanged, and the full pre/post zone comparison is documented in DOMAIN_AND_DNS.md.
