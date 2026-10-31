import type { Locale } from './i18n';
export type Copy = readonly [string, string];
export const copy = (value: Copy, locale: Locale) =>
  value[locale === 'en' ? 0 : 1];
export interface ProductData {
  slug: string;
  name: string;
  storeName: string;
  subtitle: Copy;
  value: Copy;
  summary: Copy;
  description: Copy;
  problem: Copy;
  steps: readonly (readonly [Copy, Copy])[];
  features: readonly Copy[];
  principles: Copy;
  storage: Copy;
  backup: Copy;
  export: Copy;
  faq: Copy;
  questions?: readonly { question: Copy; answer: Copy }[];
  privacy: readonly Copy[];
  media: readonly Copy[];
}
export const products = [
  {
    slug: 'samejob',
    questions: [
      {
        question: [
          'What is Invoice Maker: SameJob?',
          'Invoice Maker: SameJob 是什么？',
        ],
        answer: [
          'Invoice Maker: SameJob is Hailink Labs’ iPhone app for invoices and estimates in a solo service business. It reuses customer and service details through Invoice Again, exports PDFs and records payment status manually. Its official App Store ID is 6814700434.',
          'Invoice Maker: SameJob 是 Hailink Labs 面向独立服务经营者的 iPhone 发票与估价单 App。通过 Invoice Again 复用客户和服务详情，导出 PDF，并手动记录付款状态。官方 App Store ID 为 6814700434。',
        ],
      },
      {
        question: [
          'Can I reuse a previous invoice without changing the original?',
          '可以复用历史发票而不改动原件吗？',
        ],
        answer: [
          'Use Invoice Again to start a new invoice from a previous job. Check the customer, service, date, quantities and rates before finalizing the new document. Keep the earlier invoice as the record of the earlier work.',
          '使用 Invoice Again 从历史工作创建新发票。确认前核对客户、服务、日期、数量与单价；旧发票继续作为上次工作的记录。',
        ],
      },
      {
        question: [
          'What counts toward the five free invoices and estimates?',
          '每月五张免费额度如何计算？',
        ],
        answer: [
          'Free includes five finalized invoices and estimates combined per calendar month. Drafts do not count. An estimate and a later finalized invoice are two documents in that combined allowance; it is not five of each type.',
          'Free 每自然月可免费确认合计五张发票与估价单，草稿不计入。估价单与之后确认的发票是两张文档，不是每种各五张。',
        ],
      },
      {
        question: [
          'Is SameJob a free trial or a subscription?',
          'SameJob 是免费试用还是订阅？',
        ],
        answer: [
          'SameJob has an ongoing Free plan, not a seven-day trial. Pro removes the document allowance with monthly, yearly or lifetime access. US reference prices are $1.49/month, $14.99/year or $29.99 once; monthly and yearly plans renew until canceled through Apple. Check your local App Store price.',
          'SameJob 提供持续的 Free 方案，不是七天试用。Pro 可选择月度、年度或终身权限，解除文档额度限制。美国参考价为每月 1.49 美元、每年 14.99 美元或一次性 29.99 美元；月度与年度方案通过 Apple 自动续费，直至取消，具体以当地商店价格为准。',
        ],
      },
      {
        question: [
          'Does Invoice Again automatically bill or charge my customer?',
          'Invoice Again 会自动开账单或向客户扣费吗？',
        ],
        answer: [
          'No. You review and finalize each new invoice yourself. SameJob does not process or hold customer payments. Add your own payment instructions and mark payment status manually; a Paid status is your record, not independent payment confirmation.',
          '不会。每张新发票由你核对并确认。SameJob 不处理或持有客户付款。你可填写自己的付款说明并手动标记状态；Paid 是你的记录，不是独立付款确认。',
        ],
      },
      {
        question: [
          'Can I use SameJob as a shared team billing system?',
          'SameJob 能作为团队共享开票系统吗？',
        ],
        answer: [
          'It is designed for a solo service business. Available private iCloud sync uses your own Apple Account, not a team workspace or customer portal. You can share exported PDFs with other people.',
          '它面向独立服务经营者。可用的私有 iCloud 同步使用你自己的 Apple 账号，不是团队工作区或客户门户；可将导出 PDF 分享给他人。',
        ],
      },
      {
        question: [
          'What stays available when I use the Free plan?',
          '使用 Free 方案时，哪些内容仍可使用？',
        ],
        answer: [
          'Your history, exports, full backups and restore remain available. PDF invoices and estimates are document copies; customers and service items can be exported as CSV. Use a full backup to restore business data rather than treating a PDF or CSV as a complete backup.',
          '历史、导出、完整备份与恢复仍可使用。发票和估价单 PDF 是文档副本，客户与服务项目可导出 CSV。恢复业务数据应使用完整备份，不把 PDF 或 CSV 当作完整备份。',
        ],
      },
    ],
    summary: [
      'Reuse previous jobs to create the next invoice.',
      '复用历史工作，创建下一张发票。',
    ],
    name: 'SameJob',
    storeName: 'Invoice Maker: SameJob',
    subtitle: ['Repeat Invoices in Seconds', '快速重复开票'],
    value: ['Less work on the next invoice.', '让下一张发票更省事。'],
    description: [
      'Reuse familiar jobs to create invoices for your small service business. Built for solo operators with repeat customers.',
      '为小型服务业务复用历史工作内容、创建新发票，适合经常服务老客户的独立经营者。',
    ],
    problem: [
      'The same customer, service and price should not mean typing the same invoice again.',
      '同一个客户、同一种服务、相同价格，无需每次重新填写发票。',
    ],
    steps: [
      [
        ['Start with a previous job.', '从历史工作开始。'],
        [
          'Use the work you’ve already entered as your starting point.',
          '以已录入的工作内容为起点。',
        ],
      ],
      [
        ['Review what’s changed.', '检查本次变化。'],
        [
          'Keep the familiar details. Adjust what’s different for this job.',
          '保留相同信息，调整本次工作的不同之处。',
        ],
      ],
      [
        ['Prepare the next invoice.', '生成下一张发票。'],
        [
          'Review the details, finalize a new invoice and export its PDF.',
          '核对内容，确认新发票并导出 PDF。',
        ],
      ],
    ],
    features: [
      ['Reusable customers and service items', '复用客户与服务项目'],
      ['Invoices, estimates and payment status', '发票、估价单与付款状态'],
      ['Local PDF generation and CSV exports', '本地生成 PDF，支持 CSV 导出'],
      [
        'Draft autosave and 30-day Recently Deleted',
        '草稿自动保存与 30 天最近删除',
      ],
    ],
    principles: [
      'Repeat work comes first. Finalized documents keep their original business details when you update a customer or service later. Your history, exports and backups remain accessible on the free plan.',
      '优先服务重复开票。以后修改客户或服务资料，不会改变已确认文档的历史内容。免费方案仍可访问历史记录、导出与备份。',
    ],
    storage: [
      'Your local database is the primary store. No SameJob account is required. When available, iCloud sync and backup use your private Apple CloudKit database. Cloud features are enabled by default and can be switched off in Settings; local work remains available.',
      '以本机数据库为主要存储，无需 SameJob 账号。iCloud 可用时，同步与备份使用 Apple CloudKit 私有数据库。云功能默认开启，可在设置中关闭；本地工作仍可继续。',
    ],
    backup: [
      'Use Settings to export a full backup before moving devices or restoring data. Restore replaces local business data after confirmation; keep a separate copy first. iCloud copies and exported files need to be managed separately.',
      '换机或恢复数据前，先在设置中导出完整备份。确认恢复后会替换本地业务数据，请先保留独立副本。iCloud 副本与已导出文件需要单独管理。',
    ],
    export: [
      'Export invoices and estimates as PDFs, and customers and service items as CSV. Save a full backup for restoration; a PDF is not a restorable business backup.',
      '发票和估价单可导出 PDF，客户与服务项目可导出 CSV。恢复数据需使用完整备份，PDF 不能替代业务备份。',
    ],
    faq: [
      'If iCloud is unavailable, continue working locally. Check the cloud setting and your Apple account connection before trying again. Turning sync off does not delete existing iCloud copies.',
      'iCloud 不可用时可继续本地工作。重试前检查云功能设置及 Apple 账号连接。关闭同步不会删除已有 iCloud 副本。',
    ],
    privacy: [],
    media: [],
  },
  {
    slug: 'tmproof',
    questions: [
      {
        question: [
          'What is TMProof used for on a jobsite?',
          'TMProof 在现场用于记录什么？',
        ],
        answer: [
          'TMProof records extra work in time-and-materials tickets: project, work description, labor, materials, equipment, notes, photos and acknowledgment. It creates a PDF record; it is not an invoice, accounting system or payment processor.',
          'TMProof 用工时与材料工单记录额外工作，包括项目、工作说明、人工、材料、设备、备注、照片和签认，并生成 PDF 记录；它不是发票、会计系统或支付处理工具。',
        ],
      },
      {
        question: [
          'Can I finish a ticket when nobody can sign?',
          '无人签字时可以完成工单吗？',
        ],
        answer: [
          'Yes. A ticket can be completed unsigned, with that status made explicit. If someone signs, record their name and acknowledgment on the same ticket. A signature does not guarantee payment or replace the project’s change-order process.',
          '可以。工单可明确以未签字状态完成。有人签认时，将姓名与签认保存在同一工单；签字不保证付款，也不能替代项目的变更单流程。',
        ],
      },
      {
        question: [
          'Can I prepare tickets and PDFs without a signal?',
          '没有网络信号时能制作工单和 PDF 吗？',
        ],
        answer: [
          'Core ticket work and PDF generation run locally on your iPhone. Activate the trial or restore an existing purchase while online before the job. App Store trial, purchase and purchase restoration require a connection; sharing a PDF depends on the destination you choose.',
          '核心工单与 PDF 生成在 iPhone 本地运行。前往现场前，请联网激活试用或恢复已有购买。App Store 试用、购买与恢复购买需要网络；分享 PDF 是否需要网络取决于所选目标。',
        ],
      },
      {
        question: [
          'What happens after TMProof’s seven-day trial?',
          'TMProof 七天试用结束后会怎样？',
        ],
        answer: [
          'Creating new projects and tickets requires the one-time Lifetime Unlock after expiry. Existing drafts, records, PDFs, backup and restore remain available. The US reference price is $9.99 once, with no subscription or ticket quota; check your local App Store.',
          '到期后，创建新项目和工单需要一次性 Lifetime Unlock。已有草稿、记录、PDF、备份与恢复仍可使用。美国参考价为一次性 9.99 美元，无订阅或工单数量限制，具体以当地 App Store 为准。',
        ],
      },
      {
        question: [
          'Will a full backup merge into my existing ticket library?',
          '完整备份会合并到已有工单库吗？',
        ],
        answer: [
          'No. TMProof restore requires an empty project and ticket library and checks the backup before import. Save a full backup before moving devices. A shared PDF cannot restore the projects, photos, signatures and other records in the library.',
          '不会。TMProof 恢复要求项目与工单库为空，导入前会检查备份。换机前保存完整备份；分享的 PDF 无法恢复库中的项目、照片、签名及其他记录。',
        ],
      },
      {
        question: [
          'Can several phones edit the same project automatically?',
          '多台手机能自动共同编辑同一个项目吗？',
        ],
        answer: [
          'No automatic cloud or team sync is provided. Each iPhone keeps its own library. Share a completed PDF when another person needs a document copy, and keep full backups separately.',
          '不提供自动云端或团队同步，每台 iPhone 保存自己的记录库。需要向他人提供文档副本时分享已完成 PDF，并单独保管完整备份。',
        ],
      },
    ],
    summary: [
      'Record extra work and on-site signatures in a T&M ticket.',
      '用工时与材料工单记录额外工作及现场签认。',
    ],
    name: 'TMProof',
    storeName: 'TMProof: T&M Tickets',
    subtitle: ['Extra Work. Signed On Site.', '额外工作，现场签认。'],
    value: [
      'Document extra work before it becomes a dispute.',
      '在争议发生前，记录额外工作。',
    ],
    description: [
      'Record extra work, labor, materials, equipment, photos and on-site acknowledgment for small contractors and subcontractors.',
      '为小型承包商和分包商记录额外工作、人工、材料、设备、照片及现场签认。',
    ],
    problem: [
      'Extra work is harder to explain after everyone has left the site. Keep the work and its evidence together while the details are fresh.',
      '离开现场后，额外工作往往难以说清。在信息清晰时，将工作内容与现场证据保存在一起。',
    ],
    steps: [
      [
        ['Open a project.', '打开项目。'],
        [
          'Create a T&M ticket and describe the extra work.',
          '创建工时与材料工单，描述额外工作。',
        ],
      ],
      [
        ['Record the details.', '记录细节。'],
        [
          'Add labor, materials, equipment, notes and photos you choose.',
          '添加人工、材料、设备、备注与所选照片。',
        ],
      ],
      [
        ['Sign and share.', '签认并分享。'],
        [
          'Capture on-site acknowledgment, complete the ticket and save or share a PDF.',
          '记录现场签认，完成工单，保存或分享 PDF。',
        ],
      ],
    ],
    features: [
      ['Project and ticket history', '项目与工单历史'],
      ['Labor, material and equipment entries', '人工、材料及设备明细'],
      [
        'Camera or selected photos and drawn signatures',
        '拍摄或选择照片、手写签名',
      ],
      ['Printable PDFs and full local backups', '可打印 PDF 与完整本地备份'],
    ],
    principles: [
      'Keep evidence close to the work. Completed tickets preserve their original details. A signature records acknowledgment; it does not guarantee payment or replace a formal change order.',
      '证据随工作记录。完成的工单保留原始内容。签名用于记录现场确认，不保证付款，也不代替正式变更单。',
    ],
    storage: [
      'Projects, tickets, photos and signatures are stored on your iPhone. No account, automatic cloud sync or Hailink Labs business-data server is used. Core ticket work and PDF generation work offline.',
      '项目、工单、照片和签名保存在 iPhone 本地。无需账号，不使用自动云同步或 Hailink Labs 业务数据服务器。核心工单流程与 PDF 生成支持离线。',
    ],
    backup: [
      'In Settings, open Backup & Restore and export a full backup to Files. Restore requires an empty project and ticket library and validates the backup before importing it. Keep your exported backup before deleting or replacing a device.',
      '在设置中打开 Backup & Restore（备份与恢复），将完整备份导出至“文件”。恢复要求项目与工单库为空，导入前会检查备份。删除 App 或换机前，请先保存导出的备份。',
    ],
    export: [
      'Open a ticket’s PDF preview, then save or share the PDF. Full backups also include records, photos, signatures and saved PDFs. A shared PDF is a document copy, not a full backup.',
      '打开工单 PDF 预览后保存或分享。完整备份还包含记录、照片、签名及已保存 PDF。分享的 PDF 是文档副本，不能替代完整备份。',
    ],
    faq: [
      'If camera access is denied, check the iPhone camera permission or use a photo you select. If PDF generation reports missing evidence, keep the ticket and resolve the missing file before retrying.',
      '相机权限被拒绝时，可检查 iPhone 相机权限或选择已有照片。若生成 PDF 时提示证据缺失，请保留工单，解决文件问题后再试。',
    ],
    privacy: [
      [
        'TMProof uses company and project details, work descriptions, labor, materials, equipment, notes, ticket dates and status, and the photos and signatures you add. These are data used by the app, not data automatically collected by Hailink Labs.',
        'TMProof 使用公司及项目信息、工作描述、人工、材料、设备、备注、工单日期和状态，以及你添加的照片和签名。这些是 App 使用的数据，不是 Hailink Labs 自动收集的数据。',
      ],
    ],
    media: [
      [
        'Camera access is requested when you use the camera. The system photo picker provides only the photos you choose. Signatures include the drawn mark, signer name and signing time; unfinished signature strokes may also be saved locally. These files can appear in your PDFs and backups.',
        '使用相机时才请求相机权限；系统照片选择器仅提供你选择的照片。签名包含手写笔迹、签字人姓名及签署时间，尚未确认的笔迹也可能在本地保存。这些文件可能包含在 PDF 与备份中。',
      ],
    ],
  },
  {
    slug: 'litterround',
    questions: [
      {
        question: [
          'How do I keep track of every puppy during a round?',
          '每轮如何确认整窝幼犬的记录进度？',
        ],
        answer: [
          'Start a Weight or Care Round and work through the litter. LitterRound shows who is done, saves progress and lets you pause and resume. Skip or exclude a puppy explicitly, then review the complete or incomplete summary instead of treating a missing entry as a completed observation.',
          '开始 Weight 或 Care Round，逐只处理整窝幼犬。LitterRound 显示完成对象、保存进度并支持暂停后继续。明确跳过或排除幼犬，再核对完整或未完成摘要，不把缺失记录当作已完成观察。',
        ],
      },
      {
        question: [
          'Which weight units and puppy details can I record?',
          '支持哪些体重单位和幼犬资料？',
        ],
        answer: [
          'Record weights in ounces, pounds plus ounces, or grams. Keep each puppy’s identifier, optional photos, weight history, feeding and other care records together. Preserve the unit and observation time when comparing entries.',
          '体重可用盎司、磅加盎司或克记录。每只幼犬的标识、可选照片、体重历史、喂养和其他护理记录放在一起；比较时保留单位与观察时间。',
        ],
      },
      {
        question: [
          'Does LitterRound diagnose low weight or recommend feeding amounts?',
          'LitterRound 会诊断低体重或推荐喂养量吗？',
        ],
        answer: [
          'No. It records breeder-maintained weights and care observations. Charts and notes are records, not a diagnosis, medication plan or feeding recommendation. Share the relevant history with your veterinarian when you need health interpretation.',
          '不会。它记录繁育者维护的体重和护理观察。图表与备注属于记录，不是诊断、用药方案或喂养量建议；需要健康解释时，将相关历史提供给兽医。',
        ],
      },
      {
        question: [
          'What should I export for puppy handoff and for moving phones?',
          '幼犬交接与换手机分别应导出什么？',
        ],
        answer: [
          'Use the puppy PDF for an individual handoff record and CSV for weight and care rows. Use Create Backup for the complete book, including litters, puppies, photos, rounds, records and notes. PDF and CSV exports are not full backups.',
          '单只幼犬交接可用其 PDF 记录，体重与护理行可导出 CSV。完整记录本应使用 Create Backup，包含窝次、幼犬、照片、轮次、记录和备注；PDF 和 CSV 不属于完整备份。',
        ],
      },
      {
        question: [
          'Does LitterRound automatically sync between carers’ phones?',
          'LitterRound 会在照护者手机之间自动同步吗？',
        ],
        answer: [
          'No. Core records stay on one iPhone and work offline. Share exports deliberately and keep a separate full backup. Restore Backup replaces current data after confirmation; it is not a way to merge several carers’ libraries.',
          '不会。核心记录保存在一台 iPhone 上并支持离线。需要时主动分享导出文件，并单独保存完整备份。Restore Backup 经确认后替换当前数据，不用于合并多位照护者的记录库。',
        ],
      },
      {
        question: [
          'Does the trial start automatically, and what remains after it ends?',
          '试用会自动开始吗？到期后还保留什么？',
        ],
        answer: [
          'The seven-day trial starts when you choose Start 7-Day Trial and confirm through the App Store. It does not become an automatic subscription. After expiry, existing records, PDF/CSV export, backup and restore remain available; new litters, puppies, rounds and records require the one-time $9.99 US Lifetime Unlock. Check your local price.',
          '选择 Start 7-Day Trial 并通过 App Store 确认后，七天试用才开始，不会转为自动订阅。到期后已有记录、PDF/CSV 导出、备份和恢复仍可使用；新增窝次、幼犬、轮次与记录需要一次性 Lifetime Unlock，美国参考价 9.99 美元，具体以当地价格为准。',
        ],
      },
    ],
    summary: [
      'Keep daily weight and care records for the whole litter.',
      '记录整窝幼犬的日常体重与护理。',
    ],
    name: 'LitterRound',
    storeName: 'LitterRound: Puppy Tracker',
    subtitle: ['From birth to handoff.', '从出生记录到交接。'],
    value: [
      'A simple daily record for the whole litter.',
      '用简单的日常记录照看整窝幼犬。',
    ],
    description: [
      'Track early puppy care through the first 8–12 weeks, for small breeders, hobby breeders and foster litters.',
      '为小型繁育者、业余繁育者和寄养家庭，记录幼犬出生后约 8–12 周的早期护理。',
    ],
    problem: [
      'Paper notes and scattered spreadsheets make it easy to lose your place during daily care. Keep each puppy’s record and the whole litter’s progress together.',
      '日常护理时，纸张和分散的表格容易让人遗漏进度。将每只幼犬的记录与整窝的护理进展放在一起。',
    ],
    steps: [
      [
        ['Add the litter.', '添加一窝幼犬。'],
        [
          'Create puppy profiles with identifiers and optional photos.',
          '建立幼犬档案，添加标识及可选照片。',
        ],
      ],
      [
        ['Complete a round.', '完成一轮记录。'],
        [
          'Work through weights or care for the litter, and resume an interrupted round.',
          '逐只记录体重或护理，也可继续尚未完成的一轮。',
        ],
      ],
      [
        ['Review and export.', '回顾并导出。'],
        [
          'Review each puppy’s history and export a puppy PDF or records CSV.',
          '查看每只幼犬的历史，导出幼犬 PDF 或记录 CSV。',
        ],
      ],
    ],
    features: [
      ['Puppy profiles and weight tracking', '幼犬档案与体重记录'],
      ['Feeding, deworming and vaccination records', '喂养、驱虫与疫苗记录'],
      ['Notes and litter-level care rounds', '备注与整窝护理轮次'],
      [
        'Puppy PDFs, records CSV and complete backups',
        '幼犬 PDF、记录 CSV 与完整备份',
      ],
    ],
    principles: [
      'Finish the round without losing your place. Record care as it happens, with no account or complex breeding setup. LitterRound records facts and does not provide medical, medication or feeding advice.',
      '记录护理进度，方便继续未完成的一轮。无需账号或复杂繁育配置。LitterRound 用于记录事实，不提供医疗、用药或喂养建议。',
    ],
    storage: [
      'No account is required. Litter and puppy records, including photos you select, are kept locally on your iPhone and core recordkeeping works offline. No app-operated cloud sync or Hailink Labs record server is used. You choose whether to export files to another app or a cloud folder.',
      '无需账号。窝次与幼犬记录（包括你选择的照片）保存在 iPhone 本地，核心记录流程支持离线。不使用 App 自动云同步或 Hailink Labs 记录服务器。是否导出至其他 App 或云端文件夹由你决定。',
    ],
    backup: [
      'Choose Create Backup in Settings and save the JSON file in Files. A full backup includes all litters, puppies, photos, rounds, records and notes. Restore Backup replaces the current data after confirmation and keeps a local pre-restore recovery copy.',
      '在设置中选择 Create Backup（创建备份），将 JSON 文件保存到“文件”。完整备份包含所有窝次、幼犬、照片、轮次、记录及备注。确认 Restore Backup（恢复备份）后会替换当前数据，并保留本地恢复前副本。',
    ],
    export: [
      'Use a puppy’s PDF export for its record, or Export Records CSV in Settings for weight and care records. CSV is not a full backup. Purchase access is restored separately through Apple.',
      '可导出单只幼犬的 PDF，或在设置中选择 Export Records CSV（导出记录 CSV）导出体重与护理记录。CSV 不是完整备份；购买权益通过 Apple 单独恢复。',
    ],
    faq: [
      'You can pause a round and return to the saved progress. After a trial ends, existing records, exports, backup and restore remain available; lifetime access is needed to add new litters, puppies, rounds or records.',
      '可暂停一轮护理，稍后继续已保存的进度。试用结束后，已有记录、导出、备份及恢复仍可使用；新增窝次、幼犬、轮次或记录需要终身解锁。',
    ],
    privacy: [
      [
        'LitterRound stores litter names, breed, birth dates, dam and sire text, puppy identifiers, names, sex, weights, feeding and other care records, notes, round progress and archive status. This information stays in the app’s local data store unless you choose an export or it is included in an operating-system backup.',
        'LitterRound 保存窝次名称、品种、出生日期、父母犬文字信息、幼犬标识、名称、性别、体重、喂养及其他护理记录、备注、轮次进度和归档状态。这些信息保存在本地，除非你主动导出，或其被包含在操作系统备份中。',
      ],
    ],
    media: [
      [
        'Puppy photos are optional images you select with the system photo picker. The app stores a local image copy and includes it in full backups and relevant puppy PDFs. It does not request access to your entire photo library and does not use signatures.',
        '幼犬照片是通过系统照片选择器选取的可选图片。App 保存本地图片副本，并将其包含在完整备份及相关幼犬 PDF 中。不请求整个照片库的访问权限，也不使用签名。',
      ],
    ],
  },
  {
    slug: 'calvingpocket',
    questions: [
      {
        question: [
          'Can I save a calf birth before adding its ear tag?',
          '还没有耳标时，可以保存犊牛出生记录吗？',
        ],
        answer: [
          'Yes. Enter the dam ID and sex; the birth time defaults to now. Leave Calf ID empty to save an Untagged record. Later, edit that same record to add the permanent tag without creating a duplicate calf.',
          '可以。填写母牛标识与性别，出生时间默认为当前时间。犊牛标识留空时，会保存为 Untagged 临时记录。之后编辑同一条记录补齐永久耳标，无需重复创建犊牛。',
        ],
      },
      {
        question: [
          'Do I need to set up a herd or create an account first?',
          '需要先配置牛群或注册账号吗？',
        ],
        answer: [
          'No. CalvingPocket is a focused calving book for small cow-calf ranches. Start recording in the current season without creating an account, ranch, herd or separate cow profiles.',
          '不需要。CalvingPocket 是面向小型母牛—犊牛牧场的专用产犊本。直接在当前产犊季开始记录，无需创建账号、牧场、牛群或单独的母牛档案。',
        ],
      },
      {
        question: ['Can I record calves offline?', '可以离线记录犊牛吗？'],
        answer: [
          'Yes, with active access. Before leaving mobile coverage, connect to the internet and activate the seven-day trial through the App Store, or restore your existing purchase in Settings. Check your access before heading out. Birth records are stored on your iPhone.',
          '可以，但需要有效访问权限。离开有网络的区域前，请联网在 Settings 中通过 App Store 激活七天试用，或恢复已有购买，并确认访问权限有效。出生记录保存在你的 iPhone 上。',
        ],
      },
      {
        question: [
          'Is CalvingPocket a subscription, and what happens after the trial?',
          'CalvingPocket 是订阅吗？试用到期后会怎样？',
        ],
        answer: [
          'The seven-day free trial does not renew or charge automatically. Optional lifetime access is a one-time purchase (US reference price: $19.99; check your local App Store). After expiry, you can still view, delete, export, back up and restore existing records. Adding or editing records requires lifetime access.',
          '七天免费试用不会自动续费或扣款。可选的终身访问权限为一次性购买（美国参考价 19.99 美元，具体以当地 App Store 为准）。到期后仍可查看、删除、导出、备份和恢复已有记录；新建或编辑记录需要终身解锁。',
        ],
      },
      {
        question: [
          'Does CalvingPocket automatically sync between phones?',
          'CalvingPocket 会在多台手机之间自动同步吗？',
        ],
        answer: [
          'No. Records live on one iPhone, with no account or built-in cloud sync. To move the book, create and save a full backup in Settings, then restore that file on the other iPhone. Restore replaces the current book after confirmation, so save a separate backup first.',
          '不会。记录保存在一台 iPhone 上，没有账号或内置云同步。如需迁移记录本，在设置中创建并保存完整备份，再到另一台 iPhone 恢复该文件。恢复会在确认后替换当前记录本，请先另存备份。',
        ],
      },
      {
        question: [
          'Can I import a spreadsheet or use CSV as a full backup?',
          '可以导入表格，或用 CSV 作为完整备份吗？',
        ],
        answer: [
          'CalvingPocket exports CSV for use in a spreadsheet; it does not import arbitrary CSV files. Use Create Full Backup and Restore from Backup to preserve and restore the complete book. CSV and printable PDF are exports, not full backups.',
          'CalvingPocket 可导出 CSV 供表格软件使用，不支持导入任意 CSV 文件。要保存和恢复完整记录本，请使用 Create Full Backup 与 Restore from Backup。CSV 和可打印 PDF 属于导出文件，不是完整备份。',
        ],
      },
      {
        question: [
          'What should I check when opening an exported calving record?',
          '打开导出的产犊记录时，需要注意什么？',
        ],
        answer: [
          'CSV birth times use UTC; printable season PDF times use the iPhone’s current time zone. When opening CSV in a spreadsheet, set ID columns to Text to preserve leading zeros. Check the season and selected export scope before sharing.',
          'CSV 出生时间使用 UTC，可打印产犊季 PDF 使用 iPhone 当前时区。在表格软件中打开 CSV 时，将标识列设为文本以保留开头的零。分享前请检查产犊季及所选导出范围。',
        ],
      },
    ],
    summary: [
      'Record newborn calves in the field without herd setup.',
      '无需配置牛群，即可现场记录新生犊牛。',
    ],
    name: 'CalvingPocket',
    storeName: 'CalvingPocket: Calf Records',
    subtitle: ['Fast Offline Calving Book', '快速离线产犊记录本'],
    value: ['Record now. Complete later.', '当场记录，稍后补全。'],
    description: [
      'A pocket calving book for small family-operated cow-calf ranches. Capture essential birth details while you are still in the field.',
      '为家庭经营的小型母牛—犊牛牧场打造的口袋产犊本，在现场立即记录关键出生信息。',
    ],
    problem: [
      'A newborn calf should not have to wait for herd setup or an ear tag before it has a record. Capture the birth first and complete the details later.',
      '记录新生犊牛，不该先等牛群配置完成或打好耳标。先记录出生，再补充细节。',
    ],
    steps: [
      [
        ['Open New Calf.', '打开新建犊牛。'],
        [
          'Start in the current calving season without setting up a ranch or herd.',
          '直接从当前产犊季开始，无需建立牧场或牛群。',
        ],
      ],
      [
        ['Enter Dam ID and sex.', '填写母牛标识与性别。'],
        [
          'The birth time defaults to now. Save without a permanent Calf ID.',
          '出生时间默认为当前时间，无需永久犊牛标识即可保存。',
        ],
      ],
      [
        ['Add the tag later.', '稍后补充耳标。'],
        [
          'Find the temporary Untagged record, then add the calf tag and other details.',
          '找到临时的未打标记录，再添加耳标及其他信息。',
        ],
      ],
    ],
    features: [
      [
        'Immediate calf entry with an optional Calf ID',
        '立即记录犊牛，犊牛标识可稍后填写',
      ],
      [
        'Birth time, birth weight and dam identifiers',
        '出生时间、出生体重与母牛标识',
      ],
      [
        'Season lists, search, filters and notes',
        '产犊季列表、搜索、筛选与备注',
      ],
      [
        'CSV, printable season PDF and full backup',
        'CSV、可打印产犊季 PDF 与完整备份',
      ],
    ],
    principles: [
      'No herd setup required. No account, ranch, herd or cow profile is needed before recording a calf. Keep a focused birth record, with an optional permanent tag and details you can add later.',
      '无需牛群配置。记录犊牛前不必创建账号、牧场、牛群或母牛档案。专注出生记录，永久耳标及其他细节均可稍后补全。',
    ],
    storage: [
      'Calving seasons and calf records are stored on your iPhone and work offline. The app has no account, cloud sync, photo management or location tracking. Files leave the app when you choose an export or through your device backup settings.',
      '产犊季与犊牛记录保存在 iPhone，支持离线使用。App 没有账号、云同步、照片管理或位置跟踪。文件可能通过你主动选择的导出，或设备备份设置离开 App。',
    ],
    backup: [
      'In Settings, choose Create Full Backup and save the file. Restore from Backup validates the file and shows record counts before you confirm replacement of the current book. Save a separate backup first.',
      '在设置中选择 Create Full Backup（创建完整备份）并保存文件。Restore from Backup（从备份恢复）会检查文件并显示记录数量，确认后替换当前记录本。请先另存备份。',
    ],
    export: [
      'Export records as CSV or a printable season PDF. CSV birth times use UTC; PDF times use the iPhone’s current time zone. When importing CSV into a spreadsheet, set ID columns to Text to preserve leading zeros.',
      '记录可导出为 CSV 或可打印的产犊季 PDF。CSV 出生时间使用 UTC，PDF 使用 iPhone 当前时区。将 CSV 导入表格时，把标识列设为文本以保留开头的零。',
    ],
    faq: [
      'A Calf ID is optional: the app supplies an Untagged number until you add a tag. After trial expiry, viewing, deleting, exporting, backup and restore remain available; new or edited records require lifetime access.',
      '犊牛标识可留空：添加耳标前，App 会提供临时未打标编号。试用到期后仍可查看、删除、导出、备份与恢复；新建或编辑记录需要终身解锁。',
    ],
    privacy: [
      [
        'CalvingPocket stores seasons, dam identifiers, optional calf and sire identifiers, temporary numbers, birth time, sex, optional birth weight, calving ease, birth type, coat color and notes. Dam and sire identifiers are text fields in birth records, not separate animal profiles.',
        'CalvingPocket 保存产犊季、母牛标识、可选犊牛及公牛标识、临时编号、出生时间、性别、可选出生体重、产犊难易程度、出生类型、毛色和备注。母牛与公牛标识是出生记录中的文字字段，不是独立动物档案。',
      ],
    ],
    media: [
      [
        'CalvingPocket does not use photos, signatures, location, vaccination records or weight-history tracking. It does not request camera or photo-library access.',
        'CalvingPocket 不使用照片、签名、位置、疫苗记录或体重历史追踪，不请求相机或照片库访问权限。',
      ],
    ],
  },
  {
    slug: 'gearproof',
    questions: [
      {
        question: [
          'What is GearProof, and who is it for?',
          'GearProof 是什么，适合谁？',
        ],
        answer: [
          'GearProof: Equipment Checkout is an iPhone app by Hailink Labs for one coordinator managing shared camera kits and other equipment. It keeps borrowers, due dates, partial returns and condition records together on one primary iPhone.',
          'GearProof: Equipment Checkout 是 Hailink Labs 的 iPhone App，供一名负责人管理共享相机套装及其他器材，将借用人、归还期限、部分归还和状况记录集中在一台主要 iPhone 上。',
        ],
      },
      {
        question: [
          'Can GearProof track a partially returned camera kit?',
          '可以记录只归还一部分的相机套装吗？',
        ],
        answer: [
          'Yes. Reconcile returned quantities against the original handoff. If three batteries left and only two return, record two returned and keep one outstanding. Record a damaged charger separately so damage does not hide a missing item. The demonstration uses fictional records.',
          '可以。对照原始交接核对归还数量。例如借出三块电池，只归还两块，就记录两块已归还、一块仍未归还。充电器损坏应单独记录，避免把损坏和缺失混为一谈。演示使用虚构记录。',
        ],
      },
      {
        question: [
          'Is GearProof a subscription? What happens after the trial?',
          'GearProof 是订阅制吗？试用结束后怎样？',
        ],
        answer: [
          'No subscription. The full trial lasts seven days from first launch. Lifetime access is a one-time $19.99 purchase in the US; check your local App Store price. After the trial, existing returns, history and exports remain available. Adding or editing gear and starting new handoffs requires lifetime access.',
          '无订阅。从首次启动开始完整试用七天。美区终身买断为一次性 $19.99，其他地区以当地 App Store 为准。试用结束后仍可处理已有归还、查看历史和导出；新增或编辑器材、新建交接需要终身权益。',
        ],
      },
      {
        question: [
          'Does GearProof automatically sync across team phones?',
          'GearProof 会自动同步团队的多台手机吗？',
        ],
        answer: [
          'No. GearProof stores records on one primary iPhone and provides no automatic cloud or team synchronization. It is not a fit if several people need to edit a live shared inventory from different phones. Sharing a PDF or CSV, or restoring a backup, is not live synchronization.',
          '不会。GearProof 在一台主要 iPhone 上保存记录，没有自动云同步或团队同步。如果需要多人从不同手机实时编辑同一份库存，它不适用。分享 PDF、CSV 或恢复备份不等于实时同步。',
        ],
      },
      {
        question: [
          'Which iPhone and languages does GearProof support?',
          '支持哪些 iPhone 系统和语言？',
        ],
        answer: [
          'The current App Store version requires iOS 18 or later and its interface is English. This website offers English and Simplified Chinese explanations; that does not mean the app has a Chinese interface. Purchases and restoring purchases require an App Store connection.',
          '当前 App Store 版本要求 iOS 18 或更高版本，App 界面为英文。官网提供英文和简体中文说明，不代表 App 有中文界面。购买与恢复购买需要连接 App Store。',
        ],
      },
    ],
    name: 'GearProof',
    storeName: 'GearProof: Equipment Checkout',
    subtitle: ['Scan Gear. Prove Returns.', '扫描器材，核对归还。'],
    value: ['One handoff. Every item accounted for.', '一次交接，逐件有据。'],
    summary: [
      'Check out shared gear and reconcile every return.',
      '记录共享器材借出，逐件核对归还。',
    ],
    description: [
      'Track camera kits from checkout to return. Record missing accessories and damage on one iPhone, for small video and media teams.',
      '用一台 iPhone 记录相机套装从借出到归还的全过程，核对缺失附件与损坏情况，适合小型视频与媒体团队。',
    ],
    problem: [
      'The camera is back. Is every battery back too? Compare the returned kit with the original handoff, keep missing items outstanding and record damage separately.',
      '相机回来了，电池也全部回来了吗？对照原始交接核对归还套装，将缺件保留为未归还，并单独记录损坏。',
    ],
    steps: [
      [
        ['Set up your gear.', '建立器材资料。'],
        [
          'Add gear, saved kits and accessories. Link existing QR or barcode labels, or share and print generated QR codes.',
          '添加器材、套件与附件，关联已有二维码或条码，也可分享打印生成的二维码。',
        ],
      ],
      [
        ['Record one handoff.', '一次记录整次交接。'],
        [
          'Scan or select multiple items and kits, choose a borrower and due date, then confirm with one optional signature.',
          '扫描或选择多件器材与套件，选择借用人和归还日期，可选签名后确认。',
        ],
      ],
      [
        ['Reconcile the return.', '核对归还。'],
        [
          'Compare checkout condition with returned gear. Record missing or damaged items and export an Incident Record when needed.',
          '对照借出时状况核对归还，记录缺失或损坏，按需导出事件记录。',
        ],
      ],
    ],
    features: [
      ['Mixed items and kits in one checkout', '一次交接混合器材与套件'],
      [
        'Partial returns and missing or damaged items',
        '部分归还与缺失损坏记录',
      ],
      ['Condition photos and optional signatures', '状况照片与可选签名'],
      [
        'Local reminders, history, PDF, CSV and full backups',
        '本地提醒、历史、PDF、CSV 与完整备份',
      ],
    ],
    principles: [
      'No account, subscription, ads, team sync or reservation calendar. Designed for one coordinator and one primary checkout iPhone.',
      '无需账号、无订阅广告、无团队同步或预约日历。面向一个主要负责人和一台主要交接 iPhone。',
    ],
    storage: [
      'No account is required. Gear, kits, borrowers, history, photos, signatures and drafts are stored locally on your iPhone. Core handoffs and exports work offline. GearProof has no backend or automatic cloud sync.',
      '无需账号。器材、套件、借用人、历史、照片、签名和草稿保存在 iPhone 本地。核心交接与导出支持离线，不使用后台或自动云同步。',
    ],
    backup: [
      'In Settings, choose Create full backup and save the JSON outside the app. Restore from backup validates the file, asks before replacing records and keeps a local pre-restore recovery copy. Trial and purchase access are separate from backups.',
      '在 Settings 中选择 Create full backup，将 JSON 保存到 App 之外。恢复前检查文件并确认替换，保留本地恢复前副本；试用和购买权益不随备份迁移。',
    ],
    export: [
      'Export history CSV in Settings, or an Incident Record PDF from a handoff. Full JSON backups include photos, signatures and drafts; CSV and PDF are not restorable backups.',
      '在设置中导出历史 CSV，或从交接记录导出事件 PDF。完整 JSON 备份包含照片、签名和草稿；CSV 与 PDF 不可替代完整备份。',
    ],
    faq: [
      'If scanning is unavailable, use manual label entry or select gear from the list. Allow camera access in iPhone Settings to scan. Local reminders are optional and can be enabled in Settings. Out Now always shows due dates. After the trial, existing handoffs, returns and exports remain accessible.',
      '扫码不可用时可手动输入标签或从列表选择器材。可在 iPhone 设置中允许相机权限。本地提醒可在 App 设置中开启，Out Now 始终显示到期日期。试用后仍可访问已有交接、归还和导出。',
    ],
    privacy: [
      [
        'GearProof stores equipment labels and names, kit contents and quantities, borrower names and optional references, checkout and due dates, return events, condition notes, issues, photos, optional signature strokes and unfinished drafts. Hailink Labs does not automatically receive these records.',
        'GearProof 保存器材标签及名称、套件内容和数量、借用人姓名及可选备注、借出及到期日期、归还事件、状况说明、问题、照片、可选签名笔迹与草稿。Hailink Labs 不会自动接收这些记录。',
      ],
    ],
    media: [
      [
        'Camera access supports label scanning and condition photos. The system photo picker shares only selected images. Photos and signature strokes are stored in local records and can be included in PDFs and backups. Optional local notifications use checkout and due-date information; no server or borrower messages are sent.',
        '相机用于标签扫描及状况拍照，系统照片选择器仅提供所选图片。照片和签名笔迹保存在本地，可能包含于 PDF 和备份。本地通知使用交接及到期信息，不发送服务器或借用人消息。',
      ],
    ],
  },
  {
    slug: 'hybridloop',
    name: 'HybridLoop',
    storeName: 'HybridLoop: Workout Timer',
    subtitle: ['Voice-Guided Hybrid Training', '语音引导的混合训练'],
    value: ['Train. Record. Repeat.', '训练、记录，再练一次。'],
    summary: [
      'Execute hybrid workouts and build a history worth repeating.',
      '执行混合训练，留下可供重复与比较的记录。',
    ],
    description: [
      'An iPhone workout timer and recorder for hybrid and functional training. Follow your own workout with automatic timing, large touch controls and optional voice commands.',
      '面向混合训练与功能性训练的 iPhone 计时和记录工具。通过自动计时、大触控按钮及可选语音指令，执行你自己的训练。',
    ],
    problem: [
      'You already know what to train. Keep your attention on the workout, see what comes next and save a useful record for next time.',
      '你已经知道要练什么。专注当下训练，清楚下一项目，为下次留下有用的记录。',
    ],
    steps: [
      [
        ['Choose your workout.', '选择训练。'],
        [
          'Create a workout, review an imported text or image draft, repeat a saved workout, or start an Open Workout.',
          '创建训练，核对文字或图片导入的草稿，重复已保存的训练，或直接开始 Open Workout。',
        ],
      ],
      [
        ['Follow the timer.', '跟随计时。'],
        [
          'Use For Time, Interval, Fixed Cycle / EMOM, AMRAP or Open. Confirm actions with large buttons or optional English voice commands.',
          '使用 For Time、Interval、Fixed Cycle / EMOM、AMRAP 或 Open 模式，通过大按钮或可选英文语音指令确认操作。',
        ],
      ],
      [
        ['Review and repeat.', '回顾并重复。'],
        [
          'Review recorded results, repeat a workout and compare sessions when their training conditions are comparable.',
          '回顾实际记录，重复训练，在训练条件可比时比较历史表现。',
        ],
      ],
    ],
    features: [
      [
        'Five timing modes for structured and open workouts',
        '五种计时模式，支持结构化与开放训练',
      ],
      [
        'Audio guidance and optional on-device English voice commands',
        '语音播报与可选的设备端英文语音指令',
      ],
      [
        'Text and image import with a draft you review before saving',
        '文字与图片导入，保存前核对草稿',
      ],
      [
        'Workout history, repeat and condition-based comparison',
        '训练历史、重复训练与基于可比条件的比较',
      ],
      [
        'CSV exports, JSON backups and private iCloud sync',
        'CSV 导出、JSON 备份与私有 iCloud 同步',
      ],
    ],
    principles: [
      'Your plan is not proof of performance. Missing data stays missing, and a tap or voice confirmation is not a sensor measurement. No account, ads, subscription or AI-generated training program.',
      '计划不等于实际完成。缺失数据保持缺失，触控或语音确认不等于传感器测量。无需注册账号，无广告、订阅或 AI 生成训练计划。',
    ],
    storage: [
      'Workouts and templates are saved locally first, so training does not wait for a network connection. When iCloud is available, the app can sync these records through your Apple Account’s private CloudKit database. No Hailink Labs account is required.',
      '训练与模板优先保存在本地，开练无需等待网络。iCloud 可用时，App 可通过你的 Apple 账号私有 CloudKit 数据库同步这些记录。无需 Hailink Labs 账号。',
    ],
    backup: [
      'In Settings, choose Create JSON Backup and save it outside the app. Restore Backup validates the file and adds missing records without replacing existing records with the same identifiers. Purchase access is not included.',
      '在 Settings 中选择 Create JSON Backup，将文件保存到 App 之外。Restore Backup 会验证文件并添加缺失记录，不替换相同标识的现有记录。购买权益不包含在备份中。',
    ],
    export: [
      'Choose Export CSV in Settings for workout records, or Create JSON Backup for templates, sessions and backup data. CSV uses meters and kilograms and is not a restorable full backup.',
      '在 Settings 中选择 Export CSV 导出训练记录，或选择 Create JSON Backup 保存模板、训练及备份数据。CSV 使用米与千克，不能替代可恢复的完整备份。',
    ],
    faq: [
      'Voice commands are optional and use English on-device recognition. If permissions or recognition are unavailable, use touch controls. Background audio and voice availability depend on iOS. Review image-import drafts before saving. After the trial, history, corrections, exports, backups and an already started workout remain available; starting a new workout requires Lifetime.',
      '语音指令可选，使用设备端英文识别。权限或识别不可用时可使用触控。后台音频与语音可用性取决于 iOS。图片导入后请先核对草稿。试用结束后，历史、修正、导出、备份及已开始的训练仍可继续；新训练需要终身解锁。',
    ],
    privacy: [
      [
        'HybridLoop stores workout templates, exercise names, planned targets, recorded timing and results, session progress, corrections and preferences. Planned targets and user confirmations are recorded as such; they are not sensor measurements. Hailink Labs does not automatically receive these records.',
        'HybridLoop 保存训练模板、动作名称、计划目标、已记录时间与结果、训练进度、修正及偏好设置。计划目标与用户确认按其本来含义记录，不是传感器测量。Hailink Labs 不会自动接收这些记录。',
      ],
    ],
    media: [
      [
        'Optional voice control requests microphone and speech-recognition permission and requires on-device recognition. The app does not save raw audio or full transcripts. If on-device recognition is unavailable, touch controls remain available.',
        '可选语音控制会请求麦克风及语音识别权限，并要求在设备端识别。App 不保存原始音频或完整转写。设备端识别不可用时，仍可使用触控。',
      ],
      [
        'The system photo picker provides only an image you select for on-device text recognition. Clipboard text is read when you choose Paste Clipboard. Review the resulting workout draft before saving; the app does not upload source images to a Hailink Labs server.',
        '系统照片选择器仅提供你选择的图片，用于设备端文字识别。仅在选择 Paste Clipboard 时读取剪贴板文字。保存前请核对生成的训练草稿；App 不向 Hailink Labs 服务器上传原始图片。',
      ],
    ],
  },
  {
    slug: 'pressrecipe',
    questions: [
      {
        question: [
          'Does PressRecipe provide recommended DTF, HTV or sublimation settings?',
          'PressRecipe 提供推荐的 DTF、HTV 或升华参数吗？',
        ],
        answer: [
          'No. It records settings you enter and test on your own press, transfer and blank. Use the applicable manufacturer instructions for a starting point. A saved or Proven recipe is not a manufacturer certification or a guarantee of compatibility.',
          '不提供。它记录你在自己的机器、转印产品和坯件上输入并测试的参数。起点应参考适用厂商说明；已保存或标为 Proven 的配方不是厂商认证，也不保证兼容性。',
        ],
      },
      {
        question: [
          'How do I compare a repeated recipe with the original test?',
          '如何比较重复配方与原始测试？',
        ],
        answer: [
          'Use Repeat to create another test from the recorded setup, then record what changed and the new result. Keep the tests distinct, with each wash observation attached to the test that produced that sample.',
          '使用 Repeat 从已记录配置创建另一次测试，记录改变的内容与新结果。各次测试分别保留，每次水洗观察关联产生该试样的测试。',
        ],
      },
      {
        question: [
          'Does a good first result prove wash durability?',
          '首次结果良好就证明耐洗吗？',
        ],
        answer: [
          'No. Record later wash-test observations against the same sample and test. Keep failed results as well as successful ones. PressRecipe organizes your observations; it does not certify durability or perform a physical test for you.',
          '不能。后续水洗观察应关联同一试样与测试，失败和成功结果都保留。PressRecipe 整理你的观察，不认证耐久性，也不会替你进行实物测试。',
        ],
      },
      {
        question: [
          'Is the CSV export a complete backup?',
          'CSV 导出是完整备份吗？',
        ],
        answer: [
          'No. CSV is for reviewing exported test records in a spreadsheet. Use the full backup and restore workflow to move the complete record collection. Keep photos and the original backup file safe; a worksheet downloaded from this website is a separate resource, not an App backup.',
          '不是。CSV 用于在表格中查看导出的测试记录。迁移完整记录集合应使用完整备份与恢复流程。妥善保管照片与原始备份文件；从本网站下载的工作表是独立资源，不是 App 备份。',
        ],
      },
      {
        question: [
          'Can a team share my private iCloud recipe library?',
          '团队能共享我的私有 iCloud 配方库吗？',
        ],
        answer: [
          'Private iCloud sync, when available, uses your own Apple Account. It is not a shared team workspace. Core records work offline without a PressRecipe account; you choose when to share exported files.',
          '可用时，私有 iCloud 同步使用你自己的 Apple 账号，不是团队共享工作区。核心记录无需 PressRecipe 账号并可离线使用；何时分享导出文件由你决定。',
        ],
      },
      {
        question: [
          'What can I do after the PressRecipe trial ends?',
          'PressRecipe 试用结束后能做什么？',
        ],
        answer: [
          'After the seven-day full trial, continued creation and editing require Lifetime Unlock. Existing records remain readable and exportable. Lifetime is a one-time purchase, with a US reference price of $9.99; check the price in your local App Store.',
          '七天完整试用后，继续创建和编辑需要 Lifetime Unlock；已有记录仍可阅读和导出。终身权限为一次性购买，美国参考价为 9.99 美元，具体价格请查看当地 App Store。',
        ],
      },
    ],
    name: 'PressRecipe',
    storeName: 'PressRecipe: Heat Press Log',
    subtitle: ['Your heat press test log', '你的热压测试记录'],
    value: ['Repeat what worked.', '重复已验证的好结果。'],
    summary: [
      'Save the heat press settings that work on your equipment and materials.',
      '记录适合你的设备与材料的热压参数。',
    ],
    description: [
      'An iPhone log for your presses, transfers, blanks, test runs and wash tests. Find proven settings and repeat them with a new test.',
      '在 iPhone 上记录热压机、转印材料、坯料、测试与水洗结果，找到已验证参数并开始新的重复测试。',
    ],
    problem: [
      'Good results deserve more than a loose note. Keep the settings, materials and actual outcome together.',
      '好结果值得完整记录。将参数、材料和实际结果保存在一起。',
    ],
    steps: [
      [
        ['Add your setup.', '添加设备与材料。'],
        [
          'Save a press, transfer and blank in Library.',
          '在 Library 中保存热压机、转印材料和坯料。',
        ],
      ],
      [
        ['Record a real test.', '记录真实测试。'],
        [
          'Enter temperature, time, pressure and peel details, then complete the test with its actual result.',
          '填写温度、时间、压力和撕膜细节，再按实际结果完成测试。',
        ],
      ],
      [
        ['Prove and repeat.', '验证并重复。'],
        [
          'Mark a completed Pass as Proven, add wash tests, and repeat the recipe as a fresh draft.',
          '将已完成的 Pass 标记为 Proven，添加水洗测试，再将配方重复为新的草稿。',
        ],
      ],
    ],
    features: [
      ['Press, transfer and blank libraries', '热压机、转印材料和坯料资料库'],
      [
        'Keep historical settings when you edit library details',
        '修改资料库后仍保留历史测试参数',
      ],
      [
        'Proven settings, wash-test history and search',
        '已验证参数、水洗历史与搜索',
      ],
      [
        'Optional test photos copied into the app',
        '可选测试照片，保存独立 App 副本',
      ],
      [
        'CSV export and complete .pressrecipe backups',
        'CSV 导出与完整 .pressrecipe 备份',
      ],
    ],
    principles: [
      'Your own test results are the evidence. PressRecipe does not recommend temperatures or guarantee results. Follow your equipment and material instructions. No account, ads or subscription.',
      '以你自己的测试结果为依据。PressRecipe 不推荐温度，也不保证结果。请遵循设备与材料说明。无需注册账号，无广告或订阅。',
    ],
    storage: [
      'No app account is required. Records and selected photos are saved locally first and core recordkeeping works offline. When available, private CloudKit sync uses your Apple Account. Hailink Labs does not operate a record server or automatically receive these records.',
      '无需 App 账号。记录与所选照片优先保存在本地，核心记录流程支持离线。可用时，私有 CloudKit 同步使用你的 Apple 账号。Hailink Labs 不运营记录服务器，也不会自动接收这些记录。',
    ],
    backup: [
      'Choose Create Full Backup in Settings and save the .pressrecipe file outside the app. Restore Full Backup checks that the file, photos and linked records are complete before you confirm replacing all records. A safety backup is created first. Purchase access is excluded. Keep your own external backups; iCloud sync is not a backup history.',
      '在 Settings 中选择 Create Full Backup，将 .pressrecipe 文件保存在 App 之外。Restore Full Backup 会先检查文件、照片与关联记录是否完整，再由你确认替换全部记录；替换前创建安全备份。备份不包含购买权益。请保留外部备份，iCloud 同步不是历史备份。',
    ],
    export: [
      'Export CSV in Settings provides test records and settings in a spreadsheet-friendly file. CSV does not include photo files and cannot replace a full backup. Full backups include records, preferences and copied photos.',
      'Settings 中的 Export CSV 将测试记录和参数导出为表格文件。CSV 不包含照片文件，不能代替完整备份。完整备份包含记录、偏好和照片副本。',
    ],
    faq: [
      'Only a completed Pass can become Proven. Its core settings then stay locked; repeat it to try a change. A failed wash test flags the recipe Needs Review. After trial expiry, viewing, search, photos, export, backup, restore and deletion remain available; creating and editing requires Lifetime Unlock.',
      '只有已完成的 Pass 才能设为 Proven，核心参数随后锁定；要尝试修改，请重复为新测试。水洗失败会将配方标记为 Needs Review。试用到期后仍可查看、搜索、看照片、导出、备份、恢复和删除；新建及编辑需要终身解锁。',
    ],
    privacy: [
      [
        'PressRecipe stores equipment and material descriptions, recipe titles, test settings and results, immutable setup snapshots, wash results, notes, dates, preferences and photos you choose. Purchase transaction facts and observed time are cached separately in the iPhone Keychain for verified offline access; business backups do not include them.',
        'PressRecipe 保存设备与材料说明、配方标题、测试参数及结果、不可变配置快照、水洗结果、备注、日期、偏好及你选择的照片。购买交易事实与已观察时间单独缓存在 iPhone 钥匙串中，用于已验证的离线权益；业务备份不包含这些内容。',
      ],
    ],
    media: [
      [
        'The system photo picker shares only images you select. PressRecipe saves its own JPEG copies, so deleting the original photo does not remove the saved test image. Photos may be included in private iCloud sync and full backups. The app does not request microphone, location or broad photo-library access.',
        '系统照片选择器仅提供你选择的图片。PressRecipe 保存独立 JPEG 副本，因此删除原始照片不会移除已保存的测试图片。照片可能包含在私有 iCloud 同步和完整备份中。App 不请求麦克风、定位或完整相册访问。',
      ],
    ],
  },
  {
    slug: 'turnmath',
    name: 'TurnMath',
    storeName: 'TurnMath: Kids Math Games',
    subtitle: ['For Cards, Dice & Board Games', '为纸牌、骰子与桌游加入数学'],
    value: ['Keep the game. Add the math.', '保留游戏，加入数学。'],
    summary: [
      'Quick math challenges for the physical games your family already plays.',
      '为家庭已有实体游戏加入短数学挑战。',
    ],
    description: [
      'An English-language math companion for ages 6–8. Play with your own board games, cards or dice on iPad and iPhone with iOS 18 or later.',
      '面向 6–8 岁儿童的英语数学伴侣，搭配家庭已有桌游、纸牌或骰子，支持 iOS 18 及以上的 iPad 与 iPhone。',
    ],
    problem: [
      'Keep family play at the table. Use a short addition or subtraction challenge, then return to your physical game.',
      '让家庭互动留在桌面上：完成简短加减法挑战，然后回到实体游戏。',
    ],
    steps: [
      [
        ['Choose a mode.', '选择模式。'],
        [
          'Choose Game Night, Cards or Dice. A parent chooses suitable materials and agrees on the bonus.',
          '选择 Game Night、Cards 或 Dice，由家长准备适合的材料并约定奖励。',
        ],
      ],
      [
        ['Reveal and self-mark.', '揭晓并自行标记。'],
        [
          'Say your answer aloud, reveal it, then choose Got It or Not Yet. The app does not record or judge speech.',
          '口头回答、揭晓答案，再选择 Got It 或 Not Yet；App 不录音，也不判断语音答案。',
        ],
      ],
      [
        ['Return to the game.', '回到游戏。'],
        [
          'Apply the physical bonus and pass the turn. Manual challenges keep the family in control.',
          '执行实体奖励并轮换回合，Manual 模式让家庭自主决定挑战时机。',
        ],
      ],
    ],
    features: [
      ['Game Night, Cards and Dice modes', 'Game Night、Cards、Dice 三种模式'],
      ['Five addition and subtraction levels within 20', '20 以内的五级加减法'],
      [
        'Move Boost, Reroll, Shield and Bonus Point',
        'Move Boost、Reroll、Shield、Bonus Point 四种奖励',
      ],
      [
        'On-device English speech and offline core play',
        '设备端英语朗读与离线核心玩法',
      ],
    ],
    principles: [
      'A companion, not a curriculum or assessment. Self-marked counts do not measure mastery. Purchases, settings and external links are behind a randomized parent gate.',
      '数学伴侣，不是课程或测评；自行标记的统计不代表能力评估。购买、设置和外链均位于随机家长验证之后。',
    ],
    storage: [
      'Settings and unnamed session counts stay on your device. No account, backend, cloud sync, advertising or analytics.',
      '设置和无姓名的会话统计仅保存在本机，无账号、后端、云同步、广告或分析。',
    ],
    backup: [
      'There is no in-app export or backup feature. Removing the app removes local play data; Apple device backups follow your Apple settings.',
      'App 不提供导出或备份功能。卸载会删除本地游戏数据；Apple 设备备份由你的 Apple 设置控制。',
    ],
    export: [
      'No record export, sharing or child profile is provided.',
      '不提供记录导出、分享或儿童档案。',
    ],
    faq: [
      'Tap Parents, hold the lock for two seconds, then select shapes in the displayed random order. In Parent Area, use Restore Purchases with the purchasing Apple Account and an internet connection. For sound, check media volume and Read challenges aloud, or tap Hear again.',
      '点击 Parents，长按锁两秒，再按显示的随机顺序选择形状。在 Parent Area 中联网并使用购买时的 Apple 账号执行 Restore Purchases。声音问题请检查媒体音量与 Read challenges aloud，或点击 Hear again。',
    ],
    privacy: [],
    media: [],
  },
] as const satisfies readonly ProductData[];
