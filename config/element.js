import MODE from './mode';

const device = MODE.IS_ANDROID ? '-android' : '';

const EL = {
  body: document.querySelector('body'),
  footer: document.querySelector('#footer'),
  base: document.querySelector('.lxl-fact-base'),
  loading: document.querySelector('.lxl-brand-loading'),
  hero: document.querySelector('.lxl-fact-hero'),
  container: document.querySelector('.lxl-fact-container'),
  main: document.querySelector('.lxl-fact-main'),
  truck: document.querySelector('.lxl-fact-truck'),
  canvas: document.querySelector('#canvas'),
  search: document.querySelector('.lxl-fact-search'),
  searchRadioAll: document.querySelectorAll('.lxl-fact-search__radio'),
  mapPointAll: document.querySelectorAll('.lxl-fact-map__point'),
  anchor: document.querySelector('.lxl-fact-anchor'),
  anchorList: document.querySelector('.lxl-fact-anchor__list'),
  anchorItemAll: document.querySelectorAll('.lxl-fact-anchor__item'),
  contents: document.querySelector('.lxl-fact-contents'),
  contentsAreaAll: document.querySelectorAll('.lxl-fact-area'),
  end: document.querySelector('.lxl-fact-end'),
  canvas: document.querySelector('canvas'),
  stage: new createjs.Stage('canvas'),
  map: new createjs.Container(),
  point: new createjs.Container(),
  image: new createjs.Bitmap('/corporate/brand/pic/factory/map' + device +'.png')
}

export default EL;