import guideData from './guides.json' with { type: 'json' };
import templateData from './templates.json' with { type: 'json' };
export const guides = guideData;
export const templates = templateData;
export type Guide = (typeof guides)[number];
export type Template = (typeof templates)[number];
export const resourceText = (
  value: readonly string[],
  locale: 'en' | 'zh-CN',
) => value[locale === 'en' ? 0 : 1];
export const hubs = [
  {
    slug: 'contractors',
    title: ['Contractor & Team Records', '施工与团队记录'],
    intro: [
      'Keep job records and equipment handovers connected to identifiable work. A work ticket answers what happened on the job; a checkout record answers who has a tool and whether it came back. These are different records, so use stable project and asset references rather than one mixed notebook.',
      '让工作记录和器材交接对应到可识别的任务。工单回答现场做了什么，借出记录回答谁持有工具及是否归还。两者不同，使用固定项目和资产引用，不混入一本难以区分的笔记。',
    ],
    questions: [
      [
        ['What should I record first?', '先记录什么？'],
        [
          'Start with the project or asset ID, date and responsible person. Add quantities or handover details while they are still clear.',
          '先记录项目或资产编号、日期和负责人，在细节清楚时补上数量或交接详情。',
        ],
      ],
      [
        ['What should an acknowledgment say?', '签认应说明什么？'],
        [
          'Describe the work or items being acknowledged and the signer’s role. Do not imply a payment guarantee or an unstated agreement.',
          '说明被确认的工作或物品，以及签认人角色；不暗示付款保证或未说明的约定。',
        ],
      ],
    ],
    workflow: [
      'Separate work performed from tool movement. Use a T&M ticket for the job and a checkout entry for the equipment. Review each record before sharing, retain the original and note corrections explicitly. The templates provide a starting format; the guides below cover the different decisions at each step.',
      '区分已完成工作与工具流转。用工时材料工单记录项目，用借出条目记录器材。分享前核对，各自保留原件，更正明确注明。模板提供起点，下方指南解释各步骤的不同决策。',
    ],
  },
  {
    slug: 'animal-records',
    title: ['Animal Record Keeping', '动物记录整理'],
    intro: [
      'A useful animal record preserves identity, time and the observation actually made. Puppy measurements and calf birth entries have different fields, but both benefit from clear units and explicit unknowns. This collection covers record organization and handovers, with health interpretation left to a veterinarian.',
      '有用的动物记录保留身份、时间和实际观察。幼犬测量与犊牛出生记录字段不同，但都需要清楚的单位和未知值。本资源讨论记录整理与交接，健康解释由兽医处理。',
    ],
    questions: [
      [
        ['How do I avoid mixing animals?', '如何避免混淆个体？'],
        [
          'Use a stable puppy or calf ID on every entry and keep the litter or season reference beside it.',
          '每条使用固定幼犬或犊牛编号，并保留整窝或产犊季引用。',
        ],
      ],
      [
        ['What if a value was not recorded?', '没有记录某个值怎么办？'],
        [
          'Write not recorded or unknown. A zero or an invented timestamp changes the meaning of the record.',
          '写未记录或未知。零值或编造的时间会改变记录含义。',
        ],
      ],
    ],
    workflow: [
      'Prepare identifiers, capture dated observations, review handovers and retain a separate backup. Keep measurements distinct from professional instructions. Paper and CSV can both work if each entry remains traceable; a local iPhone record is another option for organizing those same facts.',
      '先准备标识，再录入带日期的观察、核对交接并保留独立备份。区分测量与专业指导。只要可追溯，纸面与 CSV 都能使用，本地 iPhone 记录是整理相同事实的另一选择。',
    ],
  },
  {
    slug: 'heat-press',
    title: ['Heat Press Test Records', '热压测试记录'],
    intro: [
      'A tested setting is useful only when its material, blank, transfer and equipment are known. This collection separates the initial setup from later wash observations so you can find what was actually tested. It supplies record formats rather than universal temperature, time or pressure recommendations.',
      '只有材料、坯件、转印产品与设备明确，已测参数才有参考价值。本资源区分初始配置与后续水洗观察，便于查找实际测试内容；提供记录格式，不提供通用温度、时间或压力推荐。',
    ],
    questions: [
      [
        ['Which instructions apply?', '遵循哪些说明？'],
        [
          'Consult the manufacturer instructions for the actual material, transfer and press. Record the reference alongside the tested settings.',
          '查阅实际材料、转印产品与机器厂商说明，将引用与测试参数一起保存。',
        ],
      ],
      [
        ['Is a good first result enough?', '首次效果良好就够了吗？'],
        [
          'An immediate appearance and a later wash observation are separate records. Link both to the same sample without claiming certification.',
          '当下外观和后续水洗观察是独立记录，应关联同一试样，不宣称认证。',
        ],
      ],
    ],
    workflow: [
      'Give each sample a distinct ID. Record the settings used with units and machine-specific pressure notation, describe the immediate result, then add dated wash observations. Keep unsuccessful tests so a later comparison includes the actual tested conditions rather than only a remembered success.',
      '每个试样使用独立编号。记录带单位的参数与机器特定压力表示，描述当下结果，再补充带日期的水洗观察。保留不成功测试，让后续比较依据实际条件，而非仅凭成功印象。',
    ],
  },
  {
    slug: 'small-business',
    title: ['Solo Service Business Records', '个人服务业务记录'],
    intro: [
      'Repeat customers make information reusable, but every service visit is still a new event. This collection helps separate a reusable draft, an estimate and a confirmed invoice. It focuses on document preparation and checking the actual work, without determining tax requirements or legal obligations.',
      '回头客信息可以复用，但每次服务仍是新事件。本资源帮助区分可复用草稿、估价单与已确认发票，专注文件制作及实际工作核对，不判断税务要求或法律义务。',
    ],
    questions: [
      [
        ['What can I reuse?', '可以复用什么？'],
        [
          'Reuse the customer and service structure, then recheck dates, identifiers, quantities, rates and the recipient.',
          '可复用客户与服务结构，再核对日期、编号、数量、单价和收件人。',
        ],
      ],
      [
        ['What should stay separate?', '什么应单独保留？'],
        [
          'Keep the original estimate and past invoices. Create a distinct invoice for the actual reviewed work instead of overwriting history.',
          '保留原估价单与历史发票。为实际核对工作创建新发票，不覆盖历史。',
        ],
      ],
    ],
    workflow: [
      'Prepare a reusable service draft, compare proposed and actual work, calculate line amounts and review a new invoice before sharing. A spreadsheet worksheet can capture the fields, while an invoice app can organize customer and work information. In either case, confirmation is a deliberate review step.',
      '准备可复用服务草稿，比较拟议与实际工作，核算行金额，分享前审核新发票。电子表格可记录字段，开票 App 可整理客户和工作信息；两者都需要主动核对后确认。',
    ],
  },
];
export const resourceRoutes = [
  '/guides',
  '/templates',
  ...hubs.map((h) => `/guides/${h.slug}`),
  ...guides.map((g) => `/guides/${g.slug}`),
  ...templates.map((t) => `/templates/${t.slug}`),
];
export const resourceForPath = (path: string) =>
  guides.find((g) => path === `/guides/${g.slug}`) ??
  templates.find((t) => path === `/templates/${t.slug}`);
