# External Action Required

2026-10-04：网站侧实现与账号侧证据分开记录。当前未能取得平台登录会话（浏览器连接两次超时），现有公开源码无 Google/Bing 验证值；读取授权工程资料后未发现 Apple Provider Token。**不能据此判断站点没有被索引，也不能把 crawler 可访问或 IndexNow 接收称为已索引。**

## 1. Google Search Console

- 页面：[Search Console](https://search.google.com/search-console)。选择已有 `https://hailinklabs.com/` Property；若不存在，新增此 URL-prefix Property，使用官方 HTML tag 验证，无需修改 DNS。
- 需要的真实值：后台生成的 `google-site-verification` 的 `content`。可以保存为 GitHub repository variable `GOOGLE_SITE_VERIFICATION`，或 `src/data/search-config.json` 的 `googleVerification`；重新部署后回读首页 HTML，点击 Verify。若采用官方 HTML 验证文件，将后台提供的原文件放入 `public/`，保留原文件名和正文。
- 权限依赖：需要拥有或获授权访问该 Property 的 Google 登录会话；当前自动化无法读取该会话，不能编造 token 或报告 Indexed 数量。
- 验证后：在 Sitemaps 提交 `https://hailinklabs.com/sitemap.xml`；记录处理结果，检查 Page indexing 中 Crawled/Discovered/Indexed、HTTPS、Core Web Vitals、Manual Actions、Security Issues。
- URL Inspection：抽检首页、Products、六款已核实产品页、Guides、Templates，以及每类至少一个新 Guide/Template。记录 Google-selected canonical、last crawl 和实际 indexing 状态；Live Test 成功不等于已索引。
- 不使用普通网页 Google Indexing API。若已有 Domain Property，沿用已有验证；本次不要求新增 DNS 验证或更改 Nameserver/邮件记录。

## 2. Bing Webmaster Tools

- 页面：[Bing Webmaster Tools](https://www.bing.com/webmasters/)。选择或添加 `https://hailinklabs.com`，使用已验证 Search Console 导入或官方 HTML meta 验证。
- 需要的真实值：官方 `msvalidate.01` 的 `content`，配置 GitHub variable `BING_SITE_VERIFICATION` 或 `search-config.json` 的 `bingVerification`，部署回读后点击 Verify。
- 权限依赖：需要能访问该站点的 Microsoft/Google 等受支持登录会话；当前自动化无法读取会话，无真实 verification 值，不报告 coverage 或 citations 数字。
- 验证后：提交正式 sitemap，执行上述代表 URL 的 URL Inspection，检查 Crawl issues、Site Scan、Index coverage。
- 如账号已提供 AI Performance，查看 AI citations、Grounding queries、Referenced pages、Search intents 和 Citation share；将日期范围和实际可用指标记录在当前状态，缺数据不推断排名。参考 [Bing 官方 AI Performance](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) 与 [后续指标](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/)。

## 3. Apple App Store campaign attribution

- 页面：[App Store Connect](https://appstoreconnect.apple.com/) → Apps → 已有 Analytics 数据的六款之一 → Analytics → Acquisition → Campaigns → `+`。
- 需要的真实值：从 Apple 生成的 Campaign Link 提取 `pt`（Provider Token），保存到 GitHub variable `APPLE_PROVIDER_TOKEN` 或 `search-config.json` 的 `appleProviderToken`。**不是 App ID、Team ID 或 Issuer ID，也不能手工猜测。**
- 权限依赖：当前未能访问后台 Analytics 登录会话，工程资料未包含真实 pt。若 Campaigns/`+` 尚未出现，需等待 App 产生符合 Apple 条件的 Analytics 数据，不创建伪 campaign。
- 现有普通商店链接持续可用；新增资源的 campaign 命名及 Smart Banner 已准备，但未取得真实值前不会生成 `pt`/`ct`，不声称归因已启用。
- 加入真实值后无需改页面：静态构建自动为 Product/Guide/Template/Catalog CTA 生成含 `pt`、`ct`、`mt=8` 的链接，Banner 自动附带 affiliate-data。部署后核对参数及正确 App ID，在 Analytics 达到平台阈值后核对实际数据；参数正确不等于已有下载转化。
- Campaign 名称最多30字符；共享方法保留 `hailink_<app>_<source>_<content>` 语义，过长时使用稳定 hash 后缀避免重名。Provider Token 是公开归因标识，绝不填写账号凭据。
- [Apple 官方 Campaign Links](https://developer.apple.com/help/app-store-connect/view-app-analytics/manage-campaigns/)。

仅上述账号/真实值依赖待完成。网站构建、内容、静态资源、IndexNow key、部署和生产回读由 Agent 完成，不列为人工动作。
