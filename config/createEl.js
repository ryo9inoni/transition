import MODE from './mode';

const device = MODE.IS_ANDROID ? '-android' : '';

const createEL = {
  stage: new createjs.Stage('canvas'),
  map: new createjs.Container(),
  point: new createjs.Container(),
  image: new createjs.Bitmap('/corporate/brand/pic/factory/map' + device + '.png')
}

export default createEL;