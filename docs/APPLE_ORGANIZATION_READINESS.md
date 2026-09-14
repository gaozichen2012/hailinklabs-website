# Apple Developer Organization readiness

Checked: 2026-09-14. **Public website acceptance is not complete.** Content exists and is locally verified; DNS and HTTPS have not yet passed production checks. This is website readiness, not Apple enrollment approval.

## Official Apple requirements

[Apple organization enrollment requirements](https://developer.apple.com/programs/enroll/) require a functional, publicly accessible organization website on an associated domain and an organization-domain work email. A registrar landing page or minimal-content page is insufficient. Legal entity, D-U-N-S, binding authority and account 2FA are separate enrollment checks; this website task does not submit enrollment, verify those documents, or purchase membership.

The additional route, responsive-layout and metadata checks below are project acceptance criteria, not invented Apple policy.

## Website checklist

| Item                                             | Local implementation                                         | Public production acceptance                                      |
| ------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| hailinklabs.com publicly accessible              | Build ready                                                  | FAIL — DNS has no website address                                 |
| HTTPS and valid certificate                      | Canonical URLs use HTTPS                                     | FAIL — certificate not issued yet                                 |
| Real company content, not Coming Soon            | PASS                                                         | FAIL — public domain unavailable                                  |
| Hailink Labs displayed                           | PASS                                                         | FAIL — public domain unavailable                                  |
| 深圳市海狸智联科技有限公司 displayed             | PASS                                                         | FAIL — public domain unavailable                                  |
| Clear brand/legal entity relationship            | PASS — home/about/contact                                    | FAIL — public domain unavailable                                  |
| Real SameJob product content                     | PASS — source-backed, explicitly in development              | FAIL — public domain unavailable                                  |
| Company-domain email                             | PASS — gaozichen@hailinklabs.com links                       | FAIL — public page unavailable; actual mailbox NOT VERIFIED       |
| Contact                                          | PASS                                                         | FAIL — DNS                                                        |
| Privacy                                          | PASS — source/owner-backed claims; GitHub hosting disclosure | FAIL — DNS                                                        |
| Support                                          | PASS                                                         | FAIL — DNS                                                        |
| Mobile layout                                    | PASS — Chromium/WebKit mobile viewport pages, no overflow    | FAIL — public mobile URL unavailable; physical phone NOT VERIFIED |
| Main URLs avoid 404                              | PASS locally                                                 | FAIL — DNS prevents HTTP checks                                   |
| No TODO, placeholder, Lorem Ipsum or Coming Soon | PASS — rendered content checks                               | FAIL — public domain unavailable                                  |

## SameJob URL contract

- Product: https://hailinklabs.com/products/samejob
- Support: https://hailinklabs.com/products/samejob/support
- Privacy: https://hailinklabs.com/products/samejob/privacy

These are the final canonical addresses, not a claim that DNS is already active. No github.io URL is proposed for App Store public metadata.

## Privacy evidence

The prior website task checked SameJob source at `263bef96173827698545f434384c2ee1091a84d7`, including privacy audit, CloudKit storage, local data flow and StoreKit. The owner answered that there is no additional use of support data for AI/analytics and delegated routine policy choices. The policy covers local data, private iCloud, device/installation sync metadata, purchases, exports, support and retention. That evidence is not a live CloudKit or App Store Connect verification. Website hosting disclosure identifies GitHub Pages.

## Remaining acceptance

Obtain the full 新网 DNS export; change only approved website A/www records, retain all email records, finish GitHub certificate issuance/Enforce HTTPS, then run `npm run verify:production` and production browser checks. Re-evaluate this matrix from actual production evidence. Perform external inbox/reply tests and inspect SPF/DKIM/DMARC headers; do not assume mail PASS from MX alone.
