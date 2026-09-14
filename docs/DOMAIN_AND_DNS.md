# Domain and DNS

Snapshot date: **2026-09-14**. **Email DNS modified: NO. No DNS writes performed.**

## Frozen ownership and providers

Existing domain `hailinklabs.com`; registrar and DNS **新网**, nameservers **ns11.xincache.com / ns12.xincache.com**, email **Tencent business email**, website **GitHub Pages**. The user's current instruction explicitly authorizes using the existing domain. Never change registrar, Nameservers, or mail configuration. Added website cost is zero; existing renewal costs are outside this change.

## Pre-write backup gate

**Complete zone export: NOT YET AVAILABLE. DNS writes are blocked until it is saved and reviewed.** Browser control currently fails, so the authenticated 新网 zone cannot be read. Public DNS cannot enumerate all records or unknown DKIM selectors. `artifacts/dns-before.json` is the earlier task's public sample; `artifacts/dns-pages-before.json` is the current task's authoritative refresh. Neither is a complete zone export.

Before writing: read/export ALL pages of the 新网 record list; save record IDs, names, types, line/routing settings, priority, exact values, enabled state and TTL to a restricted local file outside Git; record its path/hash here without publishing credentials. Classify Website/Email/Other; protect all unknown records. Confirm only the planned website records differ and that their previous values can be restored.

## Public records before changes

| Classification           | Name                        | Type                   | Value / observation                                                          |
| ------------------------ | --------------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| Protected infrastructure | @                           | NS                     | ns11.xincache.com., ns12.xincache.com.                                       |
| Email — protected        | @                           | MX                     | priority 5 mxbiz1.qq.com.; priority 10 mxbiz2.qq.com.; authoritative TTL 600 |
| Email — protected        | @                           | TXT/SPF                | No answer in public query; no SPF observed; do not add or replace            |
| Email — protected        | unknown selector._domainkey | TXT/CNAME              | Selector unknown; NOT VERIFIED; must inspect full zone                       |
| Email — protected        | _dmarc                      | TXT                    | No answer in public query; no DMARC observed; do not add or replace          |
| Email — protected        | unknown                     | Verification TXT/other | Full zone not yet inspected; preserve all                                    |
| Website                  | @                           | A/AAAA/CNAME           | No answer in public query                                                    |
| Website                  | www                         | A/AAAA/CNAME           | No answer in public query                                                    |
| Other — protected        | @                           | CAA                    | No answer in public query                                                    |

“No answer” does not mean the zone has no other records. NS/MX/SPF/DKIM/DMARC and all mail verification records remain immutable in this task.

## Exact proposed website changes — not yet applied

GitHub account and repository owner confirmed through authenticated `gh`: **gaozichen2012**. Actual Pages hostname derived from that confirmed owner using [GitHub's documented hostname format](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): **gaozichen2012.github.io**. Confirm Pages configuration again before writing.

| Classification | Name | Type  | Target                  |
| -------------- | ---- | ----- | ----------------------- |
| Website        | @    | A     | 185.199.108.153         |
| Website        | @    | A     | 185.199.109.153         |
| Website        | @    | A     | 185.199.110.153         |
| Website        | @    | A     | 185.199.111.153         |
| Website        | www  | CNAME | gaozichen2012.github.io |

The four addresses were rechecked against [GitHub's current official custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) on 2026-09-14. Do not use the repository path in the CNAME target. Do not add AAAA or change other record types. Use 新网's existing/default TTL for new website records; preserve every existing email TTL.

Bind `hailinklabs.com` in GitHub Pages before DNS. With the apex selected and www CNAME configured, GitHub provides www→apex. Enable HTTPS after certificate issuance. A GitHub default hostname is infrastructure only, never a public canonical URL.

## Rollback and email acceptance

Capture the exact previous A/www configuration before changes. For newly added records, rollback removes only those new record IDs; for replacements, restore exact previous values/TTL/routing. Never restore an entire zone over unrelated changes or touch protected mail/NS records.

After website DNS changes, compare the full protected record set and direct authoritative answers against the backup. Check the actual DKIM selector from that export, then test external mail into `gaozichen@hailinklabs.com` and a reply back out. Inspect `Authentication-Results` and `DKIM-Signature` for SPF/DKIM/DMARC. Current end-to-end send/receive: **NOT VERIFIED**. If mailbox access is unavailable, that send/receive/header check remains manual acceptance; do not label it PASS.
