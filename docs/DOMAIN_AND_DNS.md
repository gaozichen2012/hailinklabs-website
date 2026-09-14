# Domain and DNS

## Current approved SPF repair and acceptance

The user approved adding only apex TXT `v=spf1 include:spf.mail.qq.com ~all`, default routing, TTL 600 seconds. After manual SMS verification, it was saved at **2026-09-14 22:14:49 +08:00**. Both authoritative nameservers and public resolver 1.1.1.1 return it.

**Email DNS modified: YES — only this explicitly approved new SPF TXT.** All original MX, NS, website A and www CNAME records remain unchanged, including the fields and timestamps in the complete provider table. The final zone has eight records: three Website, three Email (two MX plus SPF), and two Infrastructure/NS. No DKIM, DMARC or verification TXT was added.

Before SPF writing, the authenticated full seven-row provider table was re-read and saved as `artifacts/dns-backups/hailinklabs-before-spf-20260914.csv`, SHA-256 `0b0ab65861ac5972ac2a63823b00c13c91a4c0d496d782dfbf664fbe084037d9`. The final eight-row DOM transcription is `hailinklabs-after-spf-20260914.csv`, SHA-256 `e4e1e64c47613f479a050e68afae062ba1e8908f6e4b91695778c3a2ff216c9f`. Both files have mode 600. These are full DOM transcriptions, not new provider exports. Rollback removes only the exact new apex TXT tuple; all seven previous records stay intact.

The company received the external test (user confirmed), then its reply was accepted into Gmail INBOX at **22:16:00 +08:00**, after sending at 22:15:42. Gmail Authentication-Results reports **spf=pass**, sender IP 54.204.34.129. No DKIM-Signature exists and no DMARC result is reported; these are not marked PASS. The previous 550 5.7.26 delivery failure is resolved for this actual test. No further manual mail action remains within this approved scope.

Evidence: `artifacts/email-verification.json` contains only relevant authentication headers and test identifiers; `artifacts/dns-spf-final.json` records public and authoritative checks. Historical website-only DNS snapshots below predate the approved SPF exception.

## Frozen ownership and providers

Existing domain `hailinklabs.com`; registrar and DNS **新网**, nameservers **ns11.xincache.com / ns12.xincache.com**, email **Tencent business email**, website **GitHub Pages**. The user's current instruction explicitly authorizes using the existing domain. Never change registrar, Nameservers, or mail configuration. Added website cost is zero; existing renewal costs are outside this change.

## Pre-write backup gate

**Complete zone export: SAVED AND REVIEWED before DNS writes.** On 2026-09-14 the authenticated 新网 zone lists exactly four records on one page (20/page, total 4, no filter). The provider CSV contains those same four records, including routing, priority, TTL, state, remarks and timestamps. Backup: `artifacts/dns-backups/hailinklabs-before-20260914.csv` (ignored by Git, mode 600; parent mode 700). SHA-256: `ecf4edf3e1d7ac67e5c8e8aeebee28f602db0faec65839553b464c7185c665e2`. Provider UI/export does not expose record IDs; records are uniquely identified by the full name/type/value/priority tuple.

| Classification             | Name            | Type | Value             | Priority | Routing | TTL in provider | State                           |
| -------------------------- | --------------- | ---- | ----------------- | -------- | ------- | --------------- | ------------------------------- |
| Email — protected          | hailinklabs.com | MX   | mxbiz2.qq.com     | 10       | 默认    | 600 seconds     | 正常                            |
| Email — protected          | hailinklabs.com | MX   | mxbiz1.qq.com     | 5        | 默认    | 600 seconds     | 正常                            |
| Infrastructure — protected | hailinklabs.com | NS   | ns11.xincache.com | —        | 默认    | 3600 seconds    | 正常 in export; immutable in UI |
| Infrastructure — protected | hailinklabs.com | NS   | ns12.xincache.com | —        | 默认    | 3600 seconds    | 正常 in export; immutable in UI |

No Website or Other records exist in the complete pre-write zone. SPF, DKIM, DMARC and verification TXT are absent from the zone, rather than merely unobserved in public sampling. Do not add or alter email authentication records. Public NS TTL previously read as 86400; provider export TTL is 3600; preserve both observations without editing NS.

**Rollback confirmed:** all three approved website records are additions. Rollback removes only the exact new @ A 185.199.108.153 and 185.199.109.153 tuples and www CNAME gaozichen2012.github.io tuple; keep the original four records byte-for-byte unchanged in their exported fields. No whole-zone import or replacement. Use default website TTL, verified in the creation form. Official GitHub addresses and Pages cname hailinklabs.com/Actions source were rechecked immediately before this change.

The user completed ownership transfer manually. Their detail screenshot now lists an individual registrant rather than the company. The authenticated new 新网 account contains hailinklabs.com and exposes its DNS management. Company ownership is not claimed; no further ownership modification is part of this DNS task. Automated Enterprise WeChat access remains blocked by browser site policy.

## Public records before changes

| Classification           | Name                        | Type                   | Value / observation                                                          |
| ------------------------ | --------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| Protected infrastructure | @                           | NS                     | ns11.xincache.com., ns12.xincache.com.                                       |
| Email — protected        | @                           | MX                     | priority 5 mxbiz1.qq.com.; priority 10 mxbiz2.qq.com.; authoritative TTL 600 |
| Email — protected        | @                           | TXT/SPF                | No answer in public query; no SPF observed; do not add or replace            |
| Email — protected        | unknown selector._domainkey | TXT/CNAME              | Absent from complete provider zone; no selector configured                   |
| Email — protected        | _dmarc                      | TXT                    | No answer in public query; no DMARC observed; do not add or replace          |
| Email — protected        | unknown                     | Verification TXT/other | None in complete provider zone; preserve original records                    |
| Website                  | @                           | A/AAAA/CNAME           | No answer in public query                                                    |
| Website                  | www                         | A/AAAA/CNAME           | No answer in public query                                                    |
| Other — protected        | @                           | CAA                    | No answer in public query                                                    |

“No answer” does not mean the zone has no other records. NS/MX/SPF/DKIM/DMARC and all mail verification records remain immutable in this task.

## Applied website changes — user-approved two-A configuration

GitHub account and repository owner confirmed through authenticated `gh`: **gaozichen2012**. Actual Pages hostname derived from that confirmed owner using [GitHub's documented hostname format](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): **gaozichen2012.github.io**. Pages API confirms `cname: hailinklabs.com`, `build_type: workflow`.

| Classification | Name | Type  | Target                  |
| -------------- | ---- | ----- | ----------------------- |
| Website        | @    | A     | 185.199.108.153         |
| Website        | @    | A     | 185.199.109.153         |
| Website        | www  | CNAME | gaozichen2012.github.io |

GitHub still documents four addresses. 新网 rejected a third A for the same hostname; its [official FAQ, item 14](https://www.xinnet.com/service/cjwt/domain/2065.html) limits same-name, same-type records to two. The user explicitly approved “接受两条 A，继续完成上线” on 2026-09-14, keeping 新网 DNS, Tencent mail and zero added cost. Only the two addresses above were saved, both with default routing and TTL 600 seconds; .110 and .111 were not saved. The official addresses were rechecked against [GitHub's current official custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) on 2026-09-14. Do not use the repository path in the CNAME target. Do not add AAAA or change other record types. Use 新网's existing/default TTL for new website records; preserve every existing email TTL.

Bind `hailinklabs.com` in GitHub Pages before DNS. With the apex selected and www CNAME configured, GitHub provides www→apex. Enable HTTPS after certificate issuance. A GitHub default hostname is infrastructure only, never a public canonical URL.

## Rollback and email acceptance

GitHub Pages API initially returned `https://gaozichen2012.github.io/hailinklabs-website/`, confirming the actual hostname. It now confirms Actions source and custom domain `hailinklabs.com`; the first deployment succeeded. The binding was rechecked before DNS writing and remains the canonical apex domain.

The pre-write zone had no A/www records. Rollback removes only the three exact website name/type/value tuples listed above; IDs are not exposed by the provider. Never restore an entire zone over unrelated changes or touch protected mail/NS records.

Email acceptance is now complete for the approved SPF repair; see the current result above.

## Post-change verification

The full provider UI shows exactly seven records. Website additions were saved at 21:17:03 (A .108), 21:17:45 (A .109), and 21:21:16 (www CNAME), China time on 2026-09-14. Original MX/NS values, priorities, routing, TTLs, remarks and creation/update timestamps are unchanged. NS state displays `--` in the immutable UI but `正常` in the original export; this is a display difference.

Post-change table transcription: `artifacts/dns-backups/hailinklabs-after-20260914.csv`, mode 600, SHA-256 `a3c4dae4baba11b9423c3f3f2a8ca59b77baa5bcc8f75c55278523fc0713e407`. This is an independently reviewed DOM transcription with NS state normalized to the original export, not a second provider export (the provider download did not complete). Both authoritative NS and public resolver 1.1.1.1 return the approved A/CNAME and original MX/NS. Raw query evidence: `artifacts/dns-after.json`; one Google resolver A query timed out, which is not treated as an incorrect DNS answer.

GitHub certificate provisioning completed. The certificate covers `hailinklabs.com` and `www.hailinklabs.com`, expires 2026-12-13, and Enforce HTTPS is enabled. Normal-trust public checks passed all 13 assertions, including HTTP→HTTPS and www→apex with paths/query strings. The custom domain was removed and immediately re-added once after DNS propagation, following [GitHub certificate troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). Final Pages API evidence is saved in `artifacts/pages-final.json`.

The subsequent authorized SPF repair and actual mail result are recorded in the current section above.
