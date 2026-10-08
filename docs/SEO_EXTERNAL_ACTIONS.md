# 搜索平台接入状态

## 2026-10-08 优化交接

本轮平台读取继续使用现有授权会话。六款 App 的公开美国商店链接、免费下载、系统要求、逐产品试用与收费均已重新核对；目录总数不代表上架数量。Google 已有收录，具体重点页面以 URL Inspection 为准。后台原始数据及最小化指标快照只保存于本机忽略的 `artifacts/full-optimization-20261008/`，不进入官网或公开 Git。

Growth Hub 每日手动运行时读取 `/acquisition-manifest.json`：它由 catalog、guides、templates 和原 Campaign 生成，包含全部目录的官网/中文入口、六款真实 listing、状态来源/核对日期、产品下载 Campaign 及指南/模板关系；缺下载链接为 null，不推断审核状态。部署绑定见项目当前状态与 `.pages-release/manifest.json`，生产 URL/资源持续检查使用 `npm run verify:production`。

- 本轮逐项检查18个重点产品/指南/模板页及首页canonical，收录状态存在差异；实际索引记录、有效搜索窗口、美国缺失明细和六款Campaign数据不足保存在上述本机证据，增长运行按其日期读取，不转存公开报表。Google当前Web搜索报告包含AI功能流量，未提供可分离的AI引用/下载指标，依据 [Google官方AI功能说明](https://developers.google.com/search/docs/appearance/ai-features)。
- 后续观察六款产品页和对应指南/模板的美国查询、曝光、点击与索引；在 Search Console 记录实际有效日期，不把默认三个月选择视为完整网站历史。
- 保留现有 `pt`、`ct`、`mt` 和 Smart App Banner。按本次核对的 [Apple 官方规则](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links)，每个 Campaign 指标需达到所选窗口最低 5 的展示门槛；首次下载归因使用点击后的 24 小时，详细报表小样本还可能被隐私规则隐藏。数据显示不足、破折号与未获取均不能记为零。
- 官网来源、商店页面访问、首次下载、重新下载、付费用户和购买次数分别记录；站内没有事件跟踪。Google AI 搜索表现按其实际报告能力处理，不能从新增页面或 llms 配置推断 AI 引用。
- App 上架但网站无链接时，以独立公开商店证据更新 catalog，再检查产品/目录/指南/模板的链接、QR 和 Banner，重新本地验证并部署；不生成猜测的 URL，不改变未核实产品的原路径/支持/隐私。
- 低流量阶段优先修复事实错误、链接和抓取异常，保持足够观察期，不因一两次访问频繁重写页面。无新调度、后台、第三方脚本或 App 二进制发布。

下方记录为历史接入阶段，不自动作为本轮当前指标。

2026-10-07 当前复查：Google Search Console 的sitemap、索引报告和概述入口均已恢复；sitemap列表与详情已确认成功，官方当日Live Test允许抓取且抓取成功。当前线上sitemap为220个唯一网址。因今日目录实质扩展，已对同一URL提交一次更新并独立读回受理及成功状态；最新统计刷新和全站收录仍未确认。Bing历史sitemap报告尚未跟上当前目录，Apple代表营销活动数据不足，真实归因仍未验证。下方2026-10-05配置与历史产物基线不自动作为当前平台结果。

2026-10-05：Google Search Console、Bing Webmaster Tools 已完成真实 HTML meta 所有权验证；Apple 官方生成的 Provider Token 已启用。网站源码 `3029ec01a1d17b5466510857f1ff9710f959c23b` 的 [Actions 37225394228](https://github.com/gaozichen2012/hailinklabs-website/actions/runs/37225394228) 检查、Pages 部署和生产验收全部成功，生产配置与构建产物一致。

**No pending external actions requiring user input.** 当前没有缺失登录、权限或真实平台 ID；下述平台处理结果与异常不作为人工配置任务。详细后台数据仅记入私有当前状态。

## Google Search Console

- 已验证 URL-prefix Property `https://hailinklabs.com/`，使用官方 `google-site-verification`，真实值保存于 `src/data/search-config.json`；正式首页已回读，无 DNS 变更。
- 正式 `https://hailinklabs.com/sitemap.xml` 当前HTTP200、合法XML、220个唯一网址，robots允许Googlebot且无响应头索引阻断。2026-10-07已读取列表及详情“成功/已成功处理站点地图”，原“无法抓取”不再是当前状态；官方Live Test当日抓取成功。根据目录实质更新已对现有URL重新提交一次，受理回执与列表仍成功均已读回；尚未确认Google已解析最新220条。此前504及旧失败证据保留，原因未证明，不归因于网站或DNS。
- 已完成首页、Products、六款产品、Guides/Templates 入口及每类代表 Guide/Template 的 URL Inspection，并查看 Page indexing、HTTPS、Core Web Vitals、Manual Actions、Security Issues。首页、Guides、Templates入口的历史请求索引均已受理，本次已读回索引及排除报告，详细指标只留私有记录。Live Test、提交受理和正式收录分别记录；缺乏真实用户指标不写成通过。
- 后续只核对最新sitemap统计、实际收录及搜索数据变化；不把低收录量直接当作网站故障，不重复删除/提交sitemap。当前未使用普通网页Google Indexing API，也未修改Nameserver、MX或邮箱记录。诊断与本次更新提交依据 [Google 官方 Sitemaps report](https://support.google.com/webmasters/answer/7451001?hl=en-GB)。

## Bing Webmaster Tools

- 已使用官方 `msvalidate.01` 完成站点验证，真实值保存于构建配置；正式首页已回读。
- 已提交正式 sitemap，后台显示 **Success、172 URLs discovered、0 errors、0 warnings**。这证明 sitemap 处理成功，不证明所有网址已经索引。
- 已完成与 Google 相同范围的 URL Inspection、Live URL、Site Explorer 覆盖与 AI Performance BETA 回读。sitemap 范围的 Site Scan 已完成；三项过长标题及后续实时检查发现的23条英文meta摘要均已修复、部署并通过全站长度Gate及生产哈希核验，指南直接答案、正文、来源和中文摘要保持。最终源码的HybridLoop、估价转发票指南、热压主题页Live URL均可索引且无SEO/GEO问题；未将代表实时检查等同重新完成全站Site Scan。装饰图片空alt与既有aria-hidden语义一致，不为清空扫描提示增加冗余替代文本，依据 [W3C 装饰图片规范](https://www.w3.org/WAI/tutorials/images/decorative/)。
- 后续核对扫描、覆盖与真实搜索/AI 指标；未把旧抓取错误当作当前 DNS 故障，也未根据空报告推断无问题或排名。

## Apple App Store campaign attribution

- 已从 App Store Connect 官方生成的 SameJob Campaign Link 取得真实 Provider Token，保存于 `search-config.json` 的 `appleProviderToken`。Provider Token 为公开归因标识，不是账号凭据、App ID、Team ID 或 Issuer ID。
- 生产中的六款真实 listing 对应 CTA 均启用 `pt`、`ct`、`mt=8`；Product/Guide/Template Smart Banner 包含对应 `affiliate-data`。全站静态 Gate 核对准确 App ID、真实 token、合法 campaign 名称及参数；生产产物哈希与构建一致。
- `buildAppStoreUrl` 统一生成链接；campaign 最多30字符，过长时使用稳定 hash 后缀。新增真实 listing 可沿用同一配置，无需在页面散落 query string。
- 当前 Campaigns 数据不足，未验证实际归因下载或转化。按 [Apple 官方 Campaign links](https://developer.apple.com/help/app-store-connect-analytics/acquisition/campaign-links)，数据展示仍需满足首次用户与处理时间条件；链接启用不能代替真实业务数据。
