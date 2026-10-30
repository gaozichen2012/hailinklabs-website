import type { Copy } from './products';

// Media metadata for the actual edited simulator recording, not an App feature list.
export const gearproofDemo = {
  path: '/products/gearproof/demo',
  video: '/products/gearproof/camera-kit-demo.mp4',
  poster: '/products/gearproof/demo-poster.jpg',
  publishedAt: '2026-10-30',
  duration: 'PT38.3S',
  uploadedAt: '2026-10-30T06:33:21Z',
  title: [
    'GearProof Demo: Camera Kit Checkout & Partial Returns',
    'GearProof 演示：相机套装借出与部分归还',
  ] as Copy,
  description: [
    'Watch GearProof check out a camera kit, record a partial return and track a missing battery and damaged charger. Real simulator video with a text walkthrough.',
    '观看 38 秒 GearProof 模拟器演示：借出相机套装，记录三块电池归还两块，保留缺失电池与损坏充电器的问题记录。',
  ] as Copy,
  segments: [
    {
      time: '00:00',
      start: 0,
      end: 10.5,
      title: ['Check out the whole kit', '借出整套器材'],
      text: [
        'The fictional Interview Kit is selected for one handoff. Review its items and accessory quantities, then confirm the checkout for the borrower.',
        '为一次交接选择虚构的 Interview Kit，核对器材与附件数量，再确认借给借用人。',
      ],
    },
    {
      time: '00:10.5',
      start: 10.5,
      end: 21.5,
      title: ['Three batteries out. Two back.', '借出三块电池，归还两块'],
      text: [
        'During return reconciliation, enter two returned batteries against the original quantity of three. The third battery has not been received.',
        '归还核对时，对照原始借出的三块电池，录入两块已归还。第三块电池尚未收到。',
      ],
    },
    {
      time: '00:21.5',
      start: 21.5,
      end: 25.5,
      title: ['Record damage separately', '单独记录损坏'],
      text: [
        'Record the charger as damaged. A condition issue is kept separate from the quantity still outstanding.',
        '将充电器记录为损坏，器材状况问题与尚未归还的数量分开记录。',
      ],
    },
    {
      time: '00:25.5',
      start: 25.5,
      end: 29.5,
      title: ['Keep the missing battery outstanding', '保留电池未归还状态'],
      text: [
        'Confirm the partial return while the missing battery remains outstanding. Returning the camera does not mean every accessory has returned.',
        '确认部分归还，同时保留缺失电池的未归还状态。相机归还不等于全部附件已经归还。',
      ],
    },
    {
      time: '00:29.5',
      start: 29.5,
      end: 38.3,
      title: ['Review the remaining issues', '查看尚未解决的问题'],
      text: [
        'The final views show the missing battery and damaged charger on record. Follow up on each issue without marking the entire kit complete.',
        '最后的界面显示缺失电池和损坏充电器的记录，可以分别跟进，不将整套器材误记为已完整归还。',
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
