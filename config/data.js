import MODE from './mode';

const deviceW = MODE.IS_ANDROID ? 4000 : 5476;
const deviceH = MODE.IS_ANDROID ? 3752 : 5136;

const DATA = {
  index: 0,
  duration: 1500,
  initHorizon: [1340/4, 375/2],
  initVertical: [670/2, 670/2],
  initWidth: 1340,
  initHeight: 670,
  measureHorizon: [1340/4, 375/2],
  measureVertical: [670/2, 670/2],
  winWidth: 1340,
  winHeight: 670,
  baseWidth: 680,
  baseHeight: 638,
  endWidth: 458,
  endHeight: 416,
  mapWidth: deviceW,
  mapHeight: deviceH,
  windowW: MODE.IS_IOS || MODE.IS_ANDROID ? window.innerWidth : window.innerWidth,
  windowH: MODE.IS_IOS || MODE.IS_ANDROID ? window.innerHeight : window.innerHeight,
  shrink: 0,
  resolution: 2,
  barW: window.innerWidth - document.body.clientWidth
}

window.addEventListener('resize', () => {
  DATA.windowW = MODE.IS_IOS || MODE.IS_ANDROID ? window.innerWidth : window.innerWidth;
  DATA.windowH = MODE.IS_IOS || MODE.IS_ANDROID ? window.innerHeight : window.innerHeight;
});

export default DATA;