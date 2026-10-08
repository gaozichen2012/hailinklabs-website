import type { Copy } from './products';

// Public copy comes from the corresponding support/privacy pages. Keep each
// app's access and data model distinct; no listing or release status is inferred.
export interface ProjectProduct {
  slug: string;
  name: string;
  storeName: string;
  subtitle: Copy;
  summary: Copy;
  value: Copy;
  description: Copy;
  steps: readonly (readonly [Copy, Copy])[];
  scope: Copy;
  access: Copy;
  data: Copy;
}
export const projectProducts: readonly ProjectProduct[] = [
  {
    slug: 'cueladder',
    name: 'CueLadder',
    storeName: 'CueLadder',
    subtitle: ['Piano Memory Practice & Landmarks', '钢琴记忆练习与路标'],
    summary: [
      'Check your unaided starts. Practice weak spots.',
      '检查无提示起奏，练习薄弱路标。',
    ],
    value: [
      'Separate clean starts from assisted practice.',
      '区分独立起奏与有提示练习。',
    ],
    description: [
      'Record piano landmarks, honest self-ratings and practice history locally. Check unaided starts, then practice weak spots and forward recovery.',
      '在本机记录钢琴路标、诚实自评和练习历史，检查无提示起奏，再练习薄弱点与向前恢复。',
    ],
    steps: [
      [
        ['Create your landmarks', '建立自己的路标'],
        [
          'Use your score edition’s bar numbers and add at least three landmarks. Bar 0 supports a pickup; selected images can provide optional hints.',
          '按所用谱本小节编号添加至少三个路标，弱起可用第0小节；可选择图片作为提示。',
        ],
      ],
      [
        ['Check before practising', '先检查，再练习'],
        [
          'Start Check and rate first unaided starts honestly. Revealing a hint changes Clean to Assisted; skipped or interrupted landmarks stay untested.',
          'Start Check 后诚实自评首次无提示起奏；揭示提示使 Clean 变为 Assisted，跳过或中断仍属未测。',
        ],
      ],
      [
        ['Recover without overwriting the check', '保留检查，再练习恢复'],
        [
          'Practice Weak Spots and use Forward Recovery to start at the nearest later landmark, without wrapping. Practice does not overwrite the Check.',
          '练习薄弱路标，Forward Recovery 从最近的后续路标开始，不绕回开头；练习不覆盖 Check。',
        ],
      ],
    ],
    scope: [
      'You assess your playing. CueLadder does not listen, grade notes, use MIDI or AI scoring, or certify performance readiness. Respect copyright when choosing score images.',
      '由你自评演奏；CueLadder 不听音、不评音符、不使用 MIDI 或 AI 评分、不认证演出准备度；选择乐谱图片时尊重版权。',
    ],
    access: [
      'One active piece includes all features free. Archive it to activate another while keeping history. US$14.99 one-time Lifetime unlocks multiple active pieces. No subscription or timed trial; Apple displays the applicable price.',
      '一首活跃曲目包含全部功能，永久免费；归档后可启用另一首并保留历史。US$14.99 一次性 Lifetime 解锁多首活跃曲目，无订阅或限时试用；实际价格以 Apple 显示为准。',
    ],
    data: [
      'Practice data and selected image copies stay locally without automatic cloud sync. CSV is not a full backup. Save a complete .cueladderbackup outside the app; restore validates, previews and replaces the library after a safety copy. Purchase restoration is separate.',
      '练习资料与所选图片副本保存在本机，无自动云同步。CSV 不是全量备份；将完整 .cueladderbackup 保存在 App 外。恢复先验证、预览并创建安全副本，再替换资料；恢复购买独立进行。',
    ],
  },
  {
    slug: 'kilnpair',
    name: 'KilnPair',
    storeName: 'KilnPair',
    subtitle: ['Kiln Shelf Photos & Firing Records', '窑层照片与窑次记录'],
    summary: [
      'Pair before and after photos by shelf.',
      '按窑层关联烧前与烧后照片。',
    ],
    value: [
      'Keep firing observations tied to the recorded shelf.',
      '让窑次观察对应实际记录的窑层。',
    ],
    description: [
      'Record kiln firings, shelf photo pairs and manual piece marks. Compare observations across firings and export local PDF, CSV or full backups.',
      '记录窑次、窑层前后照片和手工作品标记，跨窑次比较观察，并导出 PDF、CSV 或完整备份。',
    ],
    steps: [
      [
        ['Record the loading', '记录装窑'],
        [
          'Create a kiln and firing, name and reorder shelves, then add before photos and optional manual piece marks.',
          '创建窑炉与窑次，命名和排序窑层，添加烧前照片及可选手工作品标记。',
        ],
      ],
      [
        ['Record the unloading', '记录出窑'],
        [
          'After confirming loading records, record unloading in reverse shelf order. Add after photos, missing-photo reasons and results.',
          '确认装窑记录后，按逆序记录出窑，补充烧后照片、缺图原因与结果。',
        ],
      ],
      [
        ['Compare your observations', '比较自己的观察'],
        [
          'Compare one shelf or manually selected shelves and pieces across firings. Keep your records and save a full ZIP outside the app.',
          '比较同层，或手动选择跨窑次的窑层与作品；保留记录，并将完整 ZIP 保存在 App 外。',
        ],
      ],
    ],
    scope: [
      'App states describe recording progress, not temperature or safe opening. Follow your kiln operating instructions. Resized recording JPEGs are not color-calibrated references.',
      'App 状态只描述记录进度，不表示温度或安全开窑；遵守窑炉操作规程。缩小 JPEG 不是色彩校准依据。',
    ],
    access: [
      'Two user firing records include all features free. Archived records count; the sample and Trash do not. US$19.99 one-time Lifetime unlocks unlimited new firings, subject to storage. No subscription; Apple displays the applicable price.',
      '两条用户窑次免费并包含全部功能；归档计数，示例和回收站不计。US$19.99 一次性 Lifetime 解锁不限新增窑次，受存储限制；无订阅，实际价格以 Apple 显示为准。',
    ],
    data: [
      'Records and recording photos stay locally without automatic cloud sync. PDF and CSV cannot restore data. Full ZIP import validates files and appends independent records with new IDs, retaining existing data and skipping duplicates. Backups do not transfer purchase access.',
      '记录和记录照片保存在本机，无自动云同步。PDF 和 CSV 不能恢复；完整 ZIP 导入先校验，再用新 ID 追加独立记录，保留已有资料并跳过重复。备份不转移购买权益。',
    ],
  },
  {
    slug: 'refsettle',
    name: 'RefSettle',
    storeName: 'RefSettle',
    subtitle: ['Referee Pay & Game Fee Matching', '裁判报酬与比赛费用核对'],
    summary: [
      'Match received pay to game fees.',
      '将已收到的报酬核对到比赛费用。',
    ],
    value: [
      'Keep unmatched amounts and known deductions explicit.',
      '明确待核对款项与已知扣减。',
    ],
    description: [
      'Track referee game fees, received payments and explicit matching locally. Keep unknown amounts unmatched and export records or full backups.',
      '在本机记录裁判比赛费用、实际收款与明确核销，未知金额保持待核对，并导出记录或完整备份。',
    ],
    steps: [
      [
        ['Record expected fees', '记录预期费用'],
        [
          'Record each game and its expected fee. Keep a payment source separate from the school or league payer identity.',
          '记录每场比赛及预期费用，将支付来源与学校或联盟付款人身份分开。',
        ],
      ],
      [
        ['Match actual receipts', '核对实际到账'],
        [
          'Record a payment only after receiving it. Match payment with explicit credit for each game; unknown amounts remain unmatched.',
          '实际到账后才记录收款；Match payment 时为每场明确输入核销额，未知金额保持待核对。',
        ],
      ],
      [
        ['Keep corrections accountable', '保留明确修订'],
        [
          'A short payment does not automatically become a deduction. Record only known withholding with a confirmed reason; it never increases cash received.',
          '少款不自动成为扣减；只记录有确认原因的已知扣减，扣减不增加实际现金。',
        ],
      ],
    ],
    scope: [
      'RefSettle does not move money, connect banks, generate invoices or provide tax advice. Void corrects incorrect or duplicate payment entries; real refunds paid out are outside this version.',
      'RefSettle 不转账、不连接银行、不开发票、不提供税务建议。Void 用于错误或重复收款；真实退款支出不在本版本范围。',
    ],
    access: [
      'The first 12 successfully created games are free with no time limit. Deletion or archiving does not return the allowance. US$19.99 one-time Lifetime unlocks unlimited new games. Existing payments, matching, corrections and exports remain available; Apple displays the applicable price.',
      '累计前12场成功创建比赛免费，无时间限制；删除或归档不返还额度。US$19.99 一次性 Lifetime 解锁不限新增比赛；已有收款、核销、修订与导出保持可用，实际价格以 Apple 显示为准。',
    ],
    data: [
      'The ledger stays on the device without automatic sync. Save readable full backups to a private location outside the device. Restore validates and replaces the ledger after confirmation; it does not merge or lower the known cumulative allowance. Purchase access is separate from backups.',
      '账簿保存在本机，无自动同步。完整备份含可读取收入资料，保存在设备外私有位置。恢复先验证，经确认替换账簿，不合并或降低已知累计额度；购买权益与备份分开。',
    ],
  },
  {
    slug: 'loadquilt',
    name: 'LoadQuilt',
    storeName: 'LoadQuilt',
    subtitle: [
      'Longarm Quilt Backing & Intake Checks',
      '长臂绗缝背布与收件复核',
    ],
    summary: ['Check the backing before loading.', '上机前复核实际背布。'],
    value: [
      'Keep each confirmation tied to the current revision.',
      '让每次确认对应当前修订。',
    ],
    description: [
      'Record quilt tops, usable backing dimensions, margins, photos and issues. Review the current revision before issuing a ticket or recording loading.',
      '记录绗缝面层、可用背布尺寸、余量、照片与问题；签发检查单或记录上机前复核当前修订。',
    ],
    steps: [
      [
        ['Record actual usable dimensions', '记录实际可用尺寸'],
        [
          'Set your confirmed studio margin policy, then record the received top and usable backing rectangle, orientation and issues.',
          '设置已确认的工作室余量规则，再记录实收面层与可用背布矩形、方向和问题。',
        ],
      ],
      [
        ['Resolve HOLD and remeasure', '处理 HOLD 并重测'],
        [
          'Correct any HOLD, remeasure and complete all four human checks for the current revision before READY.',
          '处理 HOLD，重测并完成当前修订的全部四项人工检查后才可 READY。',
        ],
      ],
      [
        ['Issue the checked revision', '签发已核对版本'],
        [
          'Issue a ticket and record loading only after confirming the current revision. Relevant changes invalidate old confirmations while keeping historical tickets.',
          '确认当前修订后签发检查单和记录上机；相关修改使旧确认失效，同时保留历史检查单。',
        ],
      ],
    ],
    scope: [
      'LoadQuilt records human checks. It does not control machinery, certify safety or guarantee quilting quality. Follow your confirmed studio policy and equipment instructions.',
      'LoadQuilt 记录人工检查，不控制机器、不认证安全、不保证绗缝质量；遵守已确认的工作室规则和设备说明。',
    ],
    access: [
      'Actively claim the separate free seven-day Apple Trial. It starts with the first verified original transaction and does not renew or charge automatically. US$19.99 one-time Lifetime unlock is separate; no subscription. Existing data remains available after expiry; Apple displays the applicable price.',
      '主动领取独立的七天 Apple 免费试用，从首次已验证原始交易开始，不续期或自动扣费。US$19.99 一次性 Lifetime 独立购买，无订阅；到期后已有资料保持可用，实际价格以 Apple 显示为准。',
    ],
    data: [
      'Jobs, measurements, photos and tickets stay locally without automatic cloud sync. CSV is a summary, not a full backup. Save a complete .loadquiltbackup outside the device. Restore validates, saves a safety backup and replaces the full library; it does not merge or restore purchases.',
      '工作、尺寸、照片和检查单保存在本机，无自动云同步。CSV 是摘要，不是完整备份；将完整 .loadquiltbackup 保存在设备外。恢复先验证并创建安全备份，再替换整库，不合并或恢复购买权益。',
    ],
  },
  {
    slug: 'batchmise',
    name: 'BatchMise',
    storeName: 'BatchMise',
    subtitle: ['Recipe Scaling & Batch Checks', '配方缩放与逐批备料'],
    summary: ['Scale your recipe. Check each batch.', '缩放配方，逐批核对。'],
    value: [
      'Keep prepared ingredients and uncertain batches distinct.',
      '区分已备原料与待核对批次。',
    ],
    description: [
      'Plan weight-based recipes, split target yields into batches and record ingredient preparation, interruptions and results on your iPhone.',
      '在 iPhone 上规划重量制配方、按目标产量拆批，并记录原料备妥、中断与结果。',
    ],
    steps: [
      [
        ['Plan from your recipe', '从自己的配方规划'],
        [
          'Add your tested recipe, target yield and batch limits. Review the split and total quantities before starting.',
          '添加自己验证的配方、目标产量和批次上限，开始前复核拆批与总量。',
        ],
      ],
      [
        ['Weigh and check each batch', '逐批称量与核对'],
        [
          'Confirm an ingredient only after weighing and preparing it. Mark Uncertain when the physical situation needs checking; the batch stays on Hold.',
          '称量备妥后才确认该批原料。实际情况不明时标记 Uncertain，批次保持 Hold 待核对。',
        ],
      ],
      [
        ['Resume with a fresh check', '核对后继续'],
        [
          'An active run becomes Paused after restarting. Check the real batch before continuing. Completed runs retain recipe and quantity snapshots; Repeat starts a fresh draft.',
          '重启后活动 Run 变为 Paused，核对实际批次后继续。完成记录保留配方与数量快照；Repeat 创建新的草稿。',
        ],
      ],
    ],
    scope: [
      'Ingredients use g/kg; yields use pieces or grams. A preparation check does not mean added or mixed. BatchMise does not read scales, convert cups or ingredient density, supply recipes, guarantee results or certify food safety.',
      '原料使用 g/kg，产量使用件数或克。确认备妥不代表已加入或混合。不读取电子秤、换算杯数或食材密度、提供食谱、保证结果或认证食品安全。',
    ],
    access: [
      'The fictional Demo stays free. Actively claim the free seven-day Apple trial when ready; it starts with the first verified transaction and never renews or charges automatically. US$19.99 one-time Lifetime access is required for new real runs after expiry. Already started runs and saved-data retrieval remain available. No subscription; Apple shows the applicable price.',
      '虚构 Demo 永久免费。准备好后主动领取七天 Apple 试用，从首次已验证交易开始，不续期或自动收费。到期后新的真实 Run 需要 US$19.99 一次性 Lifetime；已开始 Run 和已有数据取回继续可用。无订阅，实际价格以 Apple 显示为准。',
    ],
    data: [
      'Recipes and batch records stay on the device. Export PDF/CSV reports or a full JSON backup to a destination you choose. Full restore validates and backs up existing data before replacement; it does not merge data or restore purchases. Keep an external backup.',
      '配方与批次记录保存在本机。可将 PDF/CSV 报告或完整 JSON 备份导出到自己选择的位置。整库恢复先验证与备份，再替换数据，不合并或恢复购买权益；请保留离机备份。',
    ],
  },
  {
    slug: 'patchrelay',
    name: 'PatchRelay',
    storeName: 'PatchRelay',
    subtitle: ['Stage Routes & Act Handoffs', '舞台线路与场次交接'],
    summary: [
      'Compare the next Act. Check every line.',
      '比较下一场，逐条核对线路。',
    ],
    value: [
      'Keep route changes tied to actual stage checks.',
      '让线路变化对应实际舞台核对。',
    ],
    description: [
      'Organize Show and Act routes, stage boxes, change actions and line checks, with dated PDF handoffs and local backups on your iPhone.',
      '在 iPhone 上管理 Show 与 Act 线路、舞台箱、换场动作和逐条声检，导出版本 PDF 并保留本地备份。',
    ],
    steps: [
      [
        ['Build the Show', '建立演出线路'],
        [
          'Add Acts and stage boxes, edit routes or import UTF-8 CSV. Manually verify the planned routes as your actual baseline, or declare an unconnected stage.',
          '添加 Act 和舞台箱，编辑线路或导入 UTF-8 CSV。人工核对计划线路作为实际基线，或声明未连接舞台。',
        ],
      ],
      [
        ['Compare and check', '比较与声检'],
        [
          'Compare the next Act, confirm actions and check every line. Route changes invalidate affected checks; reverting a route does not restore PASS.',
          '比较下一场，确认动作并逐条声检。线路变化使相关检查失效，改回旧线路不恢复 PASS。',
        ],
      ],
      [
        ['Hand off a saved version', '交接已保存版本'],
        [
          'Wait for a successful save, then export a frozen PDF/CSV snapshot. Resolving an issue returns it to pending; exclusions require a reason.',
          '等待保存成功，再导出冻结版本的 PDF/CSV。解决问题后回到待检；排除需要填写原因。',
        ],
      ],
    ],
    scope: [
      'Each Show supports 64 active inputs, 10 Acts and 10 stage boxes. PatchRelay records manual confirmations; it does not detect wiring, control consoles, authorize opening sound or guarantee electrical safety. No automatic cloud sync or collaboration.',
      '每份 Show 支持 64 路活动输入、10 个 Act 和 10 个舞台箱。记录人工确认，不检测接线、控制调音台、授权开声或保证电气安全。无自动云同步或协作。',
    ],
    access: [
      'The first real Show is fully free; the separate Demo does not use that allowance. More Shows require US$19.99 one-time Lifetime access. No subscription or automatic charge. Existing documents, exports, backups and restoration remain accessible.',
      '首份真实 Show 完整免费，独立 Demo 不占名额。更多 Show 需 US$19.99 一次性 Lifetime，无订阅或自动扣费。已有文档、导出、备份与恢复保持可用。',
    ],
    data: [
      'Show records stay locally. Save full backups outside the device. Restore validates and imports a self-contained new copy; imported runs need a fresh stage check. Restore Purchases restores verified access, not Show data.',
      'Show 记录保存在本地，请将完整备份保存到设备之外。恢复先校验，再导入自洽新副本；恢复的 Run 需要重新核对舞台。恢复购买只恢复验证权益，不恢复 Show 数据。',
    ],
  },
  {
    slug: 'seamcarry',
    name: 'SeamCarry',
    storeName: 'SeamCarry',
    subtitle: ['Paper Pattern Versions & Sewing Notes', '纸样版本与缝纫笔记'],
    summary: [
      'Match the paper to the version you use.',
      '核对实物纸样与制作版本。',
    ],
    value: [
      'Keep changes, paper checks and make history together.',
      '关联修改、纸样核对与制作历史。',
    ],
    description: [
      'Record sewing pattern changes, confirm the physical paper version before cutting, and keep notes, photos and make snapshots on your iPhone.',
      '在 iPhone 上记录纸样修改，裁布前确认实物版本，并保存笔记、照片和制作快照。',
    ],
    steps: [
      [
        ['Label your paper', '给纸样做标记'],
        [
          'Create a pattern and label the physical paper with its short code. Record changes as Needs check.',
          '创建纸样并用短码标记实物，将修改记为 Needs check。',
        ],
      ],
      [
        ['Check each change', '逐项核对修改'],
        [
          'Confirm Applied only after changing that paper copy, or choose Not using with a reason. Check the label, view and size before sealing a version.',
          '在实物纸样落实修改后才确认 Applied，不采用则选择 Not using 并填写原因；封存版本前核对标签、款式与尺寸。',
        ],
      ],
      [
        ['Keep the make snapshot', '保留制作快照'],
        [
          'Check again before every new make. Snapshots preserve the version used; new paper versions copy notes but need fresh confirmations.',
          '每次新制作前再次核对。快照保留当时所用版本；新纸样版本复制笔记，但需要重新确认。',
        ],
      ],
    ],
    scope: [
      'Ready records your confirmation; it does not certify fit or geometry. PDF/CSV are reports, not full-size sewing patterns or restorable backups.',
      'Ready 记录你的确认，不认证合体或几何正确。PDF/CSV 是报告，不是原比例纸样或可恢复备份。',
    ],
    access: [
      'Two patterns are free with every feature. Archived patterns count; Trash and the separate sample do not. US$9.99 one-time Lifetime unlocks unlimited new patterns. No subscription. Existing records remain usable after refunds or temporary store errors; Apple shows the applicable price.',
      '两套纸样免费并包含所有功能。归档计入额度，Trash 和独立示例不计。US$9.99 一次性 Lifetime 解锁无限新建，无订阅。退款或商店临时错误后已有记录仍可使用，实际价格以 Apple 显示为准。',
    ],
    data: [
      'Records and copied photos stay on the device. Save complete .seamcarry backups outside it. Restore validates and previews the file, creates a local checkpoint and replaces the full library without merging. Chosen iCloud Drive files are backups, not automatic database sync. Purchase restoration is separate.',
      '记录和照片副本保存在本机，请将完整 .seamcarry 备份另存到设备之外。恢复先验证与预览、创建本地检查点，再替换整库，不合并。主动保存的 iCloud Drive 文件是备份，不是自动数据库同步；恢复购买独立进行。',
    ],
  },
  {
    slug: 'siterevisit',
    name: 'SiteRevisit',
    storeName: 'SiteRevisit',
    subtitle: [
      'Site Viewpoints & Repeat Photo Visits',
      '现场点位与重复拍照回访',
    ],
    summary: [
      'Check every viewpoint before leaving.',
      '离开现场前核对每个点位。',
    ],
    value: [
      'Keep photographed and skipped viewpoints distinct.',
      '区分已拍与跳过的点位。',
    ],
    description: [
      'Keep site projects, viewpoints and original visit photos on your iPhone. Check pending viewpoints before leaving and export reports or full backups.',
      '在 iPhone 上保存现场项目、点位与回访原图，离开前核对未处理点位，并导出报告或完整备份。',
    ],
    steps: [
      [
        ['Photograph a viewpoint', '拍摄点位'],
        [
          'Use the camera or import one selected photo. Wait for Saved before relying on the new photograph.',
          '使用相机或导入一张所选照片，等待 Saved 后再依赖新照片。',
        ],
      ],
      [
        ['Check before leaving', '离开前核对'],
        [
          'Photograph every pending viewpoint or enter a reason to skip it. Skipped viewpoints are not counted as photographed. Save & Exit resumes the same open visit later.',
          '为每个未处理点位拍照或填写跳过原因；跳过不计为已拍。Save & Exit 后可继续同一轮回访。',
        ],
      ],
      [
        ['Keep originals and reports', '保留原图与报告'],
        [
          'Retake saves the new photograph before replacing its reference and keeps the previous version. Export PDF, CSV, original photos or a complete backup to a chosen destination.',
          '重拍先保存新照片再替换引用，并保留旧版本。可将 PDF、CSV、原图或完整备份导出到自己选择的位置。',
        ],
      ],
    ],
    scope: [
      'SiteRevisit keeps your site records; a skipped viewpoint is not evidence that it was photographed. You remain responsible for permission to photograph and share site content.',
      'SiteRevisit 保存你的现场记录；跳过点位不代表已拍摄。拍摄及分享现场内容需要你拥有相应许可。',
    ],
    access: [
      'Actively start the seven-day trial when ready; it does not charge automatically. Lifetime Access is a separate one-time purchase. After expiry, history and exports stay available and already-started visits can be finished. See the support page for purchase and restoration steps.',
      '准备好后主动开始七天试用，不自动收费。Lifetime Access 为独立的一次性购买。到期后历史与导出保持可用，已开始回访仍可完成。购买与恢复步骤见支持页。',
    ],
    data: [
      'Projects, photos and reports stay on the device without an app account or automatic cloud sync. Full backups contain original photos and reports and are not password-encrypted. Restore validates and replaces the workspace, retaining the previous workspace as a safety copy. Restore Purchases does not restore photos.',
      '项目、照片与报告保存在本机，无 App 账号或自动云同步。全量备份含原图及报告，无密码加密。恢复先校验再替换工作区，并保留上一个工作区作为安全副本。恢复购买不恢复照片。',
    ],
  },
  {
    slug: 'panebatch',
    name: 'PaneBatch',
    storeName: 'PaneBatch: Window Screen Jobs',
    subtitle: ['Window Screen Repairs & Refitting', '纱窗维修与返装'],
    summary: [
      'Keep every screen matched to its opening.',
      '让每扇纱窗对应原窗口。',
    ],
    value: [
      'Carry screen identity from measurement to refit.',
      '从测量到返装保留纱窗身份。',
    ],
    description: [
      'Track window screen jobs, measured specifications, workshop revisions and refitting on your iPhone, with PDF/CSV worksheets and local full backups.',
      '在 iPhone 上管理纱窗工单、实测规格、工作台修订和返装，导出 PDF/CSV 工作表并保留本地完整备份。',
    ],
    steps: [
      [
        ['Tag and measure', '标记与测量'],
        [
          'Create a job, add screens and physically tag each stable number. Record the room, opening, finished outside-frame dimensions, frame, mesh and hardware.',
          '创建工单、添加纱窗并用稳定编号标记实物，记录房间、原窗口、成品框外尺寸、框架、网材与五金。',
        ],
      ],
      [
        ['Build the current revision', '制作当前修订'],
        [
          'Review the specification and Confirm Ready. Workshop marks the current revision Built/Rescreened. Critical changes create a new revision and Needs Check.',
          '复核规格后 Confirm Ready，在 Workshop 确认当前修订为 Built/Rescreened。关键修改生成新修订及 Needs Check。',
        ],
      ],
      [
        ['Refit at the original opening', '返装到原窗口'],
        [
          'Record Installed or Fit Issue. The job completes after all non-cancelled screens are installed. Keep a current PDF/CSV and a full backup.',
          '记录 Installed 或 Fit Issue；所有未取消纱窗装回后工单才完成。保留当前 PDF/CSV 和完整备份。',
        ],
      ],
    ],
    scope: [
      'Enter your own measurements in exact 1/32-inch increments. The app does not measure from photos or calculate manufacturing clearances; diagrams are not to scale. Verify physical fit and safety yourself.',
      '自行录入按精确 1/32 英寸递增的尺寸。不从照片测量或计算制造间隙；图示不按比例。请自行核验实体配合与安全。',
    ],
    access: [
      'One complete job is free with all core features and no watermark or screen/photo/export quotas. US$19.99 one-time Lifetime unlocks unlimited jobs. No subscription or timed trial. Archived jobs and jobs in Trash count until permanently deleted. Apple shows the applicable price.',
      '一个完整工单免费，包含全部核心功能，无水印或纱窗、照片、导出配额。US$19.99 一次性 Lifetime 解锁不限工单，无订阅或计时试用。归档及 Trash 内工单在永久删除前占名额；实际价格以 Apple 显示为准。',
    ],
    data: [
      'Jobs and copied photos stay locally without an account or CloudKit sync. PDF/CSV worksheets are not full backups. Save a readable .panebatchbackup outside the app; Full Replace validates and previews it, requires confirmation and retains a rollback snapshot. Backups do not transfer purchases.',
      '工单及照片副本保存在本地，无账号或 CloudKit 同步。PDF/CSV 工作表不是全量备份。将可读取的 .panebatchbackup 保存在 App 外；Full Replace 先校验与预览，经确认后替换并保留回滚快照。备份不转移购买权益。',
    ],
  },
];

// These two apps already have public overview content; reuse it at the catalog
// URLs rather than maintaining a second set of pricing or privacy statements.
export const existingProjectProducts = [
  {
    slug: 'carttinker',
    name: 'CartTinker',
    storeName: 'CartTinker: Kids Money Games',
    subtitle: ['Pretend Budgets & Plan Changes', '虚构预算与计划调整'],
    summary: [
      'Keep the goal. Make the plan fit.',
      '保留目标，让计划符合条件。',
    ],
    value: [
      'Compare alternatives and check every condition.',
      '比较替代品，检查全部条件。',
    ],
    description: [
      'For ages 6–8: compare a pretend supply plan, swap items and check budget conditions, with local learning records and parent controls.',
      '适合 6–8 岁儿童：比较虚构用品计划、替换物品并检查预算条件，保留本地学习记录与家长管理。',
    ],
  },
  {
    slug: 'beatmend',
    name: 'BeatMend',
    storeName: 'BeatMend: Kids Rhythm Games',
    subtitle: ['Listen, Change & Play Again', '倾听、改变与重新演奏'],
    summary: [
      'Explore sound and quiet with one pad.',
      '用一个按键探索声音与安静。',
    ],
    value: [
      'Predict a rhythm change, listen and play again.',
      '预测节奏变化，试听后亲手再演奏。',
    ],
    description: [
      'For ages 6–8: explore 24 short rhythm activities with one sound pad and a parent nearby. Unscored play, local records and optional private iCloud.',
      '适合 6–8 岁儿童：在家长陪伴下，用一个按键探索 24 个短节奏活动，不评分，保留本地记录并可选私有 iCloud。',
    ],
  },
] as const;
