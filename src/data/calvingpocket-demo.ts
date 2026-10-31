import type { Copy } from './products';

// Actual edited simulator recording and caption timings; no field-speed claim.
export const calvingpocketDemo = {
  slug: 'calvingpocket',
  name: 'CalvingPocket',
  path: '/products/calvingpocket/demo',
  video: '/products/calvingpocket/record-now-tag-later.mp4',
  poster: '/products/calvingpocket/demo-poster.jpg',
  publishedAt: '2026-10-31',
  duration: 'PT23S',
  uploadedAt: '2026-10-30T09:42:38Z',
  title: [
    'CalvingPocket Demo: Record Now, Add the Tag Later',
    'CalvingPocket 演示：先记录出生，稍后补耳标',
  ] as Copy,
  description: [
    'Watch a 23-second CalvingPocket demo: save an untagged calf, add its tag later and open a season export. Real simulator video with captions and a walkthrough.',
    '观看 23 秒 CalvingPocket 演示：保存未打标犊牛，在同一条记录中补齐耳标，再打开产犊季导出。真实模拟器视频，附双语字幕与分步说明。',
  ] as Copy,
  segments: [
    {
      time: '00:00',
      start: 0,
      end: 7.7,
      title: ['Enter dam ID and sex', '填写母牛标识与性别'],
      text: [
        'Open New Calf and enter dam DEMO057 and the calf’s sex. There is no herd setup step. The permanent calf tag is left blank.',
        '打开 New Calf，填写母牛 DEMO057 与犊牛性别，无需先配置牛群。永久犊牛耳标保持留空。',
      ],
    },
    {
      time: '00:07.7',
      start: 7.7,
      end: 11.2,
      title: ['Save an Untagged record', '保存未打标记录'],
      text: [
        'Save the birth as Untagged #1. The temporary number makes the new record identifiable before a permanent ear tag is available.',
        '将出生记录保存为 Untagged #1。在获得永久耳标前，用临时编号识别这条新记录。',
      ],
    },
    {
      time: '00:11.2',
      start: 11.2,
      end: 17.5,
      title: ['Add the tag to the same calf', '为同一头犊牛补齐耳标'],
      text: [
        'Edit the existing record and add DEMO-A101. The calf tag stays with the same dam and birth details; no second calf record is created.',
        '编辑已有记录并补入 DEMO-A101。犊牛耳标与原母牛及出生信息保存在同一条记录中，不重复创建犊牛。',
      ],
    },
    {
      time: '00:17.5',
      start: 17.5,
      end: 23,
      title: ['Open a season export', '打开产犊季导出'],
      text: [
        'Review the CSV and PDF export options and open the iOS share sheet for the season PDF. The recording does not show a file being printed or sent.',
        '查看 CSV 与 PDF 导出选项，并打开产犊季 PDF 的 iOS 分享面板。画面未展示实际打印或发送文件。',
      ],
    },
  ] satisfies {
    time: string;
    start: number;
    end: number;
    title: Copy;
    text: Copy;
  }[],
};
