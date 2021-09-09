import DATA from './data';
import MODE from './mode';

const deviceFukayaX = MODE.IS_ANDROID ? -220 : -370;
const deviceFukayaY = MODE.IS_ANDROID ? -370 : -630;
const deviceIgauenoX = MODE.IS_ANDROID ? 580 : 740;
const deviceIgauenoY = MODE.IS_ANDROID ? -695 : -1080;

// index番号順にmapを移動する
const ORDER = [
  // index: 0
  {
    area: 'start',
    x: [0, 0],
    y: [0, 0],
    size: [DATA.baseWidth / DATA.mapWidth, 0],
  },
  // index: 1
  {
    area: 'fukaya',
    x: [-230, deviceFukayaX],
    y: [-630, deviceFukayaY],
    size: [1, 1],
  },
  // index: 2
  {
    area: 'igaueno',
    x: [825, deviceIgauenoX],
    y: [-1080, deviceIgauenoY],
    size: [1, 1],
  },
  // index: 3
  {
    area: 'end',
    x: [0, 0],
    y: [0, 0],
    size: [DATA.endWidth / DATA.mapWidth, 0],
  },
];

export default ORDER;