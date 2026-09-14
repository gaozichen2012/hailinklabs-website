# Apple Developer Organization readiness

Checked: 2026-09-14. **Public website acceptance: PASS.** All seven HTTPS pages return 200; certificate trust, redirects, company content and live mobile viewport checks pass. The user confirmed company receipt and sending a reply. External reply delivery and authentication headers remain NOT VERIFIED; Gmail has not yet shown the reply. Website readiness is not Apple enrollment approval.

## Official Apple requirements

[Apple organization enrollment requirements](https://developer.apple.com/programs/enroll/) require a functional, publicly accessible organization website on an associated domain and an organization-domain work email. A registrar landing page or minimal-content page is insufficient. Legal entity, D-U-N-S, binding authority and account 2FA are separate enrollment checks; this website task does not submit enrollment, verify those documents, or purchase membership.

The additional route, responsive-layout and metadata checks below are project acceptance criteria, not invented Apple policy.

## Website checklist

| Item                                             | Public production acceptance                                                     |
| ------------------------------------------------ | -------------------------------------------------------------------------------- |
| hailinklabs.com publicly accessible              | PASS — HTTPS 200                                                                 |
| HTTPS and valid certificate                      | PASS — apex/www certificate, Enforce HTTPS enabled                               |
| Real company content, not Coming Soon            | PASS                                                                             |
| Hailink Labs displayed                           | PASS                                                                             |
| 深圳市海狸智联科技有限公司 displayed             | PASS                                                                             |
| Clear brand/legal entity relationship            | PASS — home/about/contact                                                        |
| Real SameJob product content                     | PASS — accurately described as in development                                    |
| Company-domain email displayed                   | PASS — gaozichen@hailinklabs.com; actual mailbox test NOT VERIFIED               |
| Contact                                          | PASS — 200                                                                       |
| Privacy                                          | PASS — 200; source/owner-backed claims, GitHub hosting disclosure                |
| Support                                          | PASS — 200                                                                       |
| Mobile layout                                    | PASS — seven live HTTPS pages at 390×844, no overflow; not a physical phone test |
| Main URLs avoid 404                              | PASS — seven pages 200; deliberate unknown path correctly returns 404            |
| No TODO, placeholder, Lorem Ipsum or Coming Soon | PASS — production response checks                                                |

## SameJob URL contract

- Product: https://hailinklabs.com/products/samejob
- Support: https://hailinklabs.com/products/samejob/support
- Privacy: https://hailinklabs.com/products/samejob/privacy

These canonical addresses are now live and each returns HTTPS 200. No github.io URL is proposed for App Store public metadata.

## Privacy evidence

The prior website task checked SameJob source at `263bef96173827698545f434384c2ee1091a84d7`, including privacy audit, CloudKit storage, local data flow and StoreKit. The owner answered that there is no additional use of support data for AI/analytics and delegated routine policy choices. The policy covers local data, private iCloud, device/installation sync metadata, purchases, exports, support and retention. That evidence is not a live CloudKit or App Store Connect verification. Website hosting disclosure identifies GitHub Pages.

## Remaining acceptance and evidence boundary

The external test email was sent to the company address; company receipt is confirmed by the user, who also confirmed sending a reply. Gmail has not yet shown that reply, so external delivery and SPF/DKIM/DMARC header results remain NOT VERIFIED. Protected MX/NS records are unchanged. The original complete zone contained no SPF, DKIM, DMARC or verification TXT; no mail configuration was added or modified.

The user's domain detail screenshot lists an individual registrant, not the legal entity. This task does not claim company registration ownership or independently verify domain/legal-entity association documents. Apple legal entity, D-U-N-S, signing authority, account 2FA and enrollment approval are outside the website acceptance and remain unverified; the cited Apple policy is not interpreted as automatically rejecting an individual registrant.

Evidence: `artifacts/production-verification.json` (13/13), `artifacts/production-mobile.json` (seven live pages), `artifacts/pages-final.json` (certificate/enforcement), and `artifacts/dns-after.json` (authoritative mail/NS preservation). Source baseline `bc0fcdb` had successful Actions check/deploy; later documentation-only deployments preserve that source. Local Chromium/WebKit suite passed 36/36. These results do not claim actual iPhone hardware or Apple service validation.
