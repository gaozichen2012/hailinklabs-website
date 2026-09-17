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
  privacy: readonly Copy[];
  media: readonly Copy[];
}
export const products = [
  {
    slug: 'samejob',
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
      'Litter and puppy records, including photos you select, are kept locally on your iPhone. No app-operated cloud sync or Hailink Labs record server is used. You choose whether to export files to another app or a cloud folder.',
      '窝次与幼犬记录（包括你选择的照片）保存在 iPhone 本地。不使用 App 自动云同步或 Hailink Labs 记录服务器。是否导出至其他 App 或云端文件夹由你决定。',
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
] as const satisfies readonly ProductData[];
