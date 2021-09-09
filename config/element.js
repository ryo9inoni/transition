import MODE from './mode';

const device = MODE.IS_ANDROID ? '-android' : '';

const EL = {
  body: document.querySelector('body'),
  footer: document.querySelector('#footer'),
  base: document.querySelector('.base'),
  loading: document.querySelector('.lxl-brand-loading'),
  hero: document.querySelector('.hero'),
  container: document.querySelector('.container'),
  main: document.querySelector('.main'),
  truck: document.querySelector('.truck'),
  canvas: document.querySelector('#canvas'),
  search: document.querySelector('.search'),
  searchRadioAll: document.querySelectorAll('.search__radio'),
  mapPointAll: document.querySelectorAll('.map__point'),
  anchor: document.querySelector('.anchor'),
  anchorList: document.querySelector('.anchor__list'),
  anchorItemAll: document.querySelectorAll('.anchor__item'),
  contents: document.querySelector('.contents'),
  contentsAreaAll: document.querySelectorAll('.area'),
  end: document.querySelector('.end'),
  canvas: document.querySelector('canvas'),
  stage: new createjs.Stage('canvas'),
  map: new createjs.Container(),
  point: new createjs.Container(),
  image: new createjs.Bitmap('/assets/img/map' + device +'.png')
}

export default EL;