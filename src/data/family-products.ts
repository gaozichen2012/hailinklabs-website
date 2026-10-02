import type { Copy } from './products';

// Public descriptions reuse the existing support/privacy pages and frozen V1
// definitions. They describe the products, not App Store approval or QA results.
export interface FamilyProduct {
  slug: string;
  name: string;
  storeName: string;
  subtitle: Copy;
  summary: Copy;
  value: Copy;
  description: Copy;
  device: Copy;
  features: readonly Copy[];
  pricing: Copy;
  storage: Copy;
}

export const familyProducts: readonly FamilyProduct[] = [
  {
    slug: 'botsteps',
    name: 'BotSteps',
    storeName: 'BotSteps: Coding for Kids',
    subtitle: ['Real-world robot missions', '现实空间机器人任务'],
    summary: [
      'Build commands, then become the robot.',
      '编排指令，再由真人成为机器人。',
    ],
    value: ['Take coding into the room.', '把编程带到真实房间里。'],
    description: [
      'For ages 6–8: build a sequence on iPad or iPhone, predict the result, and let a real person follow the commands with household props.',
      '适合 6–8 岁儿童：在 iPad 或 iPhone 上编排指令、预测结果，再让真人用家庭道具执行动作。',
    ],
    device: [
      'iPad and iPhone · iOS / iPadOS 18+ · English',
      'iPad 与 iPhone · iOS / iPadOS 18+ · 英语',
    ],
    features: [
      [
        '36 missions across six worlds, with sequencing, debugging and simple Repeat',
        '六个世界共 36 个任务，学习顺序、调试与简单 Repeat',
      ],
      [
        'Predict, run, self-mark Made It! or Not Yet, then revise your program',
        '预测、运行，自行标记 Made It! 或 Not Yet，再修改程序',
      ],
      [
        'Mission Maker saves up to 20 custom missions on the device',
        'Mission Maker 在本机保存最多 20 个自定义任务',
      ],
      [
        'Bundled offline English commands; no special robot or hardware required',
        '随 App 打包的离线英语指令；无需专用机器人或硬件',
      ],
    ],
    pricing: [
      'Seven full days from first use, then US $9.99 Lifetime as a one-time purchase. No subscription or automatic charge. Purchases and restoration are behind a parental gate.',
      '首次使用起完整试用七天，之后为美国区 $9.99 一次性 Lifetime 买断。无订阅或自动扣款，购买和恢复位于家长门后。',
    ],
    storage: [
      'Progress, programs, settings and custom missions stay on the device. No app account, cloud sync or export. Restoring a purchase restores access, not missions. Fixed audio plays without listening or recording.',
      '进度、程序、设置和自定义任务保存在本机，无 App 账号、云同步或导出。恢复购买恢复权益，不恢复任务；固定音频只播放，不聆听或录音。',
    ],
  },
  {
    slug: 'heardraw',
    name: 'HearDraw',
    storeName: 'HearDraw: Listen & Draw',
    subtitle: ['Listen. Draw. Reveal.', '听线索，画下来，揭晓谜底。'],
    summary: [
      'Follow spoken clues and draw on real paper.',
      '跟随语音线索，在真实纸张上绘画。',
    ],
    value: ['A drawing mystery on real paper.', '真实纸张上的绘画谜题。'],
    description: [
      'For ages 6–8: listen to English clues on iPhone, draw with paper and a pencil, and reveal the reference drawing when you are ready.',
      '适合 6–8 岁儿童：听 iPhone 播放英语线索，用纸和铅笔绘画，准备好后揭晓参考图。',
    ],
    device: ['iPhone · iOS 18+ · English', 'iPhone · iOS 18+ · 英语'],
    features: [
      ['30 drawing mysteries across three levels', '三个级别共 30 个绘画任务'],
      [
        'Repeat each clue and move to the next at your own pace',
        '按自己的节奏重听线索或进入下一步',
      ],
      [
        'Reveal a reference drawing after the final clue; no scoring or digital canvas',
        '最后一条线索后揭晓参考图；无评分或数字画布',
      ],
      [
        'Offline English audio with progress saved locally',
        '离线英语音频，进度保存在本机',
      ],
    ],
    pricing: [
      'Seven full days from first use, then US $9.99 Lifetime as a one-time purchase. No subscription or automatic charge. Purchases and restoration are behind a parental gate.',
      '首次使用起完整试用七天，之后为美国区 $9.99 一次性 Lifetime 买断。无订阅或自动扣款，购买和恢复位于家长门后。',
    ],
    storage: [
      'Mystery progress, completion dates and settings stay on the device. Drawings remain on paper; the app does not photograph, upload or evaluate them. No app account, cloud sync or export. Audio does not listen or record.',
      '任务进度、完成日期和设置保存在本机。作品留在纸上，App 不拍摄、上传或评价作品。无 App 账号、云同步或导出，音频不聆听或录音。',
    ],
  },
  {
    slug: 'rulesprout',
    name: 'RuleSprout',
    storeName: 'RuleSprout: Logic for Kids',
    subtitle: [
      'A little evidence. A new way to think.',
      '一点证据，一种新的思考方式。',
    ],
    summary: [
      'Use examples to test an idea and change a rule.',
      '用例子检验想法，发现规则如何变化。',
    ],
    value: [
      'Find the evidence that changes an idea.',
      '找到能改变想法的证据。',
    ],
    description: [
      'For ages 6–8: examine clues, choose an example that distinguishes two ideas, and test a revised rule in offline visual logic lessons.',
      '适合 6–8 岁儿童：观察线索，选择能区分两种想法的例子，再通过离线视觉逻辑关卡检验新规则。',
    ],
    device: [
      'iPad and iPhone · iOS / iPadOS 18+ · English',
      'iPad 与 iPhone · iOS / iPadOS 18+ · 英语',
    ],
    features: [
      ['24 curated lessons across four worlds', '四个世界共 24 个精编关卡'],
      [
        'Choose an example that gives a different answer from Sprig’s idea',
        '选择与 Sprig 想法产生不同判断的例子',
      ],
      [
        'Watch the rule change, then check three new examples',
        '观察规则变化，再检查三个新例子',
      ],
      [
        'Offline visual feedback, local checkpoints and replay of completed lessons',
        '离线视觉反馈、本地检查点及已完成关卡重玩',
      ],
    ],
    pricing: [
      'The first six complete lessons are free. US $5.99 RuleSprout Lifetime unlocks access to all 24 lessons with one purchase. Worlds still open in learning order. No subscription or timed trial; purchase and restore are in Parent Area.',
      '前六个完整关卡免费。美国区 $5.99 一次性 RuleSprout Lifetime 可获得全部 24 关权益，世界仍按学习顺序开放。无订阅或计时试用，购买和恢复位于家长区。',
    ],
    storage: [
      'Lesson progress, attempts, completion dates, checkpoints and settings stay on the device. No child profile, app account, cloud sync or export. Restoring purchases does not restore lesson progress.',
      '关卡进度、尝试次数、完成日期、检查点和设置保存在本机。无儿童档案、App 账号、云同步或导出；恢复购买不恢复学习进度。',
    ],
  },
  {
    slug: 'tilltinker',
    name: 'TillTinker',
    storeName: 'TillTinker: Money Games',
    subtitle: ['Learn Coins & Make Change', '学习钱币与找零'],
    summary: [
      'Trade equal values, pay, and replay each step.',
      '等值兑换，动手支付，回看每一步。',
    ],
    value: ['Build the trade. Use the money.', '构造等值兑换，动手使用钱币。'],
    description: [
      'For ages 6–8: build equal-value coin trades, pay exact amounts, make change and replay your actual steps with educational practice money.',
      '适合 6–8 岁儿童：构造等值钱币兑换、精确支付、找零，用教学练习钱币回看自己实际采取的步骤。',
    ],
    device: [
      'iPhone and iPad · iOS / iPadOS 18+ · English',
      'iPhone 与 iPad · iOS / iPadOS 18+ · 英语',
    ],
    features: [
      [
        '36 guided missions plus Pay Exact, Make Change and Trade First practice',
        '36 个引导任务，以及 Pay Exact、Make Change、Trade First 练习',
      ],
      [
        'Equal-value trades change the coins available in your drawer and tray',
        '等值兑换真实改变钱箱和托盘中的可用钱币',
      ],
      [
        'Tap controls, Undo, Continue, Replay and completed-round receipts',
        '点击控件、Undo、Continue、Replay 与完成轮次收据',
      ],
      [
        'JSON learning backups and optional private iCloud completion progress',
        'JSON 学习备份与可选私有 iCloud 完成进度同步',
      ],
    ],
    pricing: [
      'A parent starts the seven-day full trial; installing does not start it. US launch pricing is $4.99 for a one-time Lifetime purchase. No subscription or automatic renewal. After expiry, new rounds need Lifetime; saved receipts, Replay, backups and an active round remain available.',
      '由家长主动开始七天完整试用，安装不会启动试用。美国首发定价为 $4.99 一次性 Lifetime 买断，无订阅或自动续费。到期后新轮次需要买断；已有收据、Replay、备份及进行中的轮次仍可使用。',
    ],
    storage: [
      'Learning history and detailed steps stay on the device. Private iCloud sync is off by default and merges only completed guided mission and chapter progress, not live coins or detailed Replay. JSON backups do not restore purchase access. Practice money is educational and does not process real payments.',
      '学习历史和详细步骤保存在本机。私有 iCloud 同步默认关闭，只合并已完成引导任务及章节进度，不同步实时钱币或详细 Replay。JSON 备份不恢复购买权益；教学钱币不处理真实支付。',
    ],
  },
];
