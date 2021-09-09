// config
import MODE from '../config/mode';
import AREA from '../config/area';
import DATA from '../config/data';
import EL from '../config/element';
import ORDER from '../config/order';
import STATE from '../config/state';
import GRAPHIC from '../config/graphic';

import Feature from '../feature';
const FEATURE = new Feature();

export default class Init {
  constructor() {
    createjs.ColorPlugin.install();
    createjs.RelativePlugin.install();

    this.Loading();
    this.Ticker();
    this.Measure();
    this.Map();
    this.Point();
    this.Setting();
    this.Resize();
    this.Device();
    this.Draw();
  }

  Loading() {
    setTimeout(() => {
      FEATURE.FadeOut(EL.loading, 1200);
    }, 6000);
  }

  Ticker() {
    const handleTick = () => {
      EL.stage.update();

      ORDER[0].x[MODE.IS_WIN] = DATA.windowW / 2;
      ORDER[0].y[MODE.IS_WIN] = DATA.windowH / 2;
      ORDER[ORDER.length - 1].x[MODE.IS_WIN] = DATA.windowW / 2;
      ORDER[ORDER.length - 1].y[MODE.IS_WIN] = DATA.windowH / 2;
    }
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener('tick', handleTick);
  }

  Measure() {
    let newEl;
    newEl = document.createElement('div');
    newEl.setAttribute('class', 'lxl-fact-measure -horizon');
    EL.container.appendChild(newEl);
    EL.measureHorizon = document.querySelector('.lxl-fact-measure.-horizon');
    newEl = document.createElement('div');
    newEl.setAttribute('class', 'lxl-fact-measure -vertical');
    EL.container.appendChild(newEl);
    EL.measureVertical = document.querySelector('.lxl-fact-measure.-vertical');
  }

  Map() {
    if (MODE.IS_WIN == 0) {
      EL.stage.canvas.width = DATA.windowW;
      EL.stage.canvas.height = DATA.windowH;

      EL.stage.addChild(EL.map);

      EL.image.setBounds(0, 0, DATA.mapWidth, DATA.mapHeight);
      EL.map.addChild(EL.image);

      if (DATA.windowH <= DATA.initHeight && DATA.IS_MODE == 0) {
        EL.map.scaleX = DATA.windowH / EL.image.getBounds().width;
        EL.map.scaleY = EL.map.scaleX;
      } else {
        EL.map.scaleX = EL.container.clientHeight / EL.image.getBounds().height;
        EL.map.scaleY = EL.map.scaleX;
      }
      EL.map.regX = EL.image.getBounds().width / 2;
      EL.map.regY = EL.image.getBounds().height / 2;
      EL.map.x = EL.stage.canvas.width / 2;
      EL.map.y = EL.stage.canvas.height / 2;

      ORDER[0].x[MODE.IS_WIN] = DATA.windowW / 2;
      ORDER[0].y[MODE.IS_WIN] = DATA.windowH / 2;
      ORDER[ORDER.length - 1].x[MODE.IS_WIN] = DATA.windowW / 2;
      ORDER[ORDER.length - 1].y[MODE.IS_WIN] = DATA.windowH / 2;
    } else if (MODE.IS_WIN == 1) {
      EL.stage.canvas.width = DATA.windowW;
      EL.stage.canvas.height = DATA.mapHeight * ((DATA.windowW - 20) / DATA.mapWidth);

      EL.stage.addChild(EL.map);

      EL.image.setBounds(0, 0, DATA.mapWidth, DATA.mapHeight);
      EL.map.addChild(EL.image);

      EL.map.scaleX = (DATA.windowW - 20) / DATA.mapWidth;
      EL.map.scaleY = EL.map.scaleX;
      EL.map.regX = EL.image.getBounds().width / 2;
      EL.map.regY = EL.image.getBounds().height / 2;

      EL.map.x = DATA.windowW / 2;
      EL.map.y = (DATA.mapHeight * ((DATA.windowW - 20) / DATA.mapWidth)) / 2;

      ORDER[0].size[MODE.IS_WIN] = (DATA.windowW - 20) / DATA.mapWidth;
      ORDER[ORDER.length - 1].size[MODE.IS_WIN] = (DATA.windowW - 20) / DATA.mapWidth;
      ORDER[0].x[MODE.IS_WIN] = DATA.windowW / 2;
      ORDER[0].y[MODE.IS_WIN] = DATA.windowH / 2;
      ORDER[ORDER.length - 1].x[MODE.IS_WIN] = DATA.windowW / 2;
      ORDER[ORDER.length - 1].y[MODE.IS_WIN] = DATA.windowH / 2;
    }
    FEATURE.Retina();
  }

  Point() {
    EL.map.addChild(EL.point);
    for (let i = 0; i < AREA.length; i++) {
      const child = new createjs.Container();
      const circle = new createjs.Shape();
      const ex = MODE.IS_IE ? '.png' : '.svg';

      circle.graphics.beginFill(GRAPHIC.all.color);
      circle.graphics.drawCircle(0, 0, GRAPHIC.circle.origin);
      circle.alpha = .5;
      circle.name = 'circle';
      child.addChild(circle);

      if (AREA[i].name == 'fukaya' || AREA[i].name == 'igaueno') {
        const name = new createjs.Bitmap('/corporate/brand/pic/factory/point_' + AREA[i].name + ex);
        name.setBounds(0, 0, name.image.width, name.image.height);

        if (AREA[i].name == 'fukaya') {
          name.x = 16;
        } else if (AREA[i].name == 'igaueno') {
          name.x = -98 - 16;
        }
        name.y = -7;
        name.alpha = 0;
        name.name = 'name';
        child.addChild(name);

        const border = new createjs.Shape();
        border.graphics.beginStroke(GRAPHIC.all.color);
        border.graphics.setStrokeStyle(1);
        border.graphics.drawCircle(0, 0, 9);
        border.alpha = 0;
        border.name = 'border';
        child.addChild(border);

        const wave = new createjs.Shape();
        wave.graphics.beginFill(GRAPHIC.all.color);
        wave.graphics.drawCircle(0, 0, GRAPHIC.circle.origin);
        wave.alpha = 0;
        wave.name = 'wave';
        child.addChild(wave);
      } else if (AREA[i].focus == 'fukaya' || AREA[i].focus == 'igaueno') {
        const name = new createjs.Bitmap('/corporate/brand/pic/factory/point_' + AREA[i].name + '.png');
        name.setBounds(0, 0, name.image.width, name.image.height);

        if (AREA[i].name == 'enokido') {
          name.x = -60 - 10;
        } else if (AREA[i].name == 'seto') {
          name.x = -90 - 10;
        } else if (AREA[i].name == 'tokoname') {
          name.x = -214 - 10;
        } else if (AREA[i].name == 'tokoname') {
        } else {
          name.x = 10;
        }
        name.y = -5;
        name.alpha = 0;
        name.name = 'name';
        child.addChild(name);
      }

      const ajust = 0.005;
      child.x = MODE.IS_ANDROID && AREA[i].name == 'kiryu' ? DATA.mapWidth * (AREA[i].x + 0.009) : DATA.mapWidth * (AREA[i].x + ajust);
      child.y = MODE.IS_ANDROID && AREA[i].name == 'kiryu' ? DATA.mapHeight * (AREA[i].y + 0.006) : DATA.mapHeight * (AREA[i].y + ajust);
      child.name = AREA[i].name;
      child.cat = AREA[i].cat;
      child.focus = AREA[i].focus;
      EL.point.addChild(child);
    }
  }

  Setting() {
    const set = () => {
      [...EL.contentsAreaAll].forEach(el => {
        if (MODE.IS_WIN == 0) {
          el.style.paddingTop = DATA.windowH + 'px';
        } else {
          el.style.paddingTop = '70vh';
        }
        el.style.paddingBottom = DATA.windowH + 'px';
      });

      EL.end.style.height = window.innerHeight + 'px';
    };
    set();

    window.addEventListener('resize', set);
  }

  Resize() {
    let timer = 0;
    const handleResize = () => {
      if (!STATE.fix) {
        EL.stage.canvas.width = DATA.windowW;
        EL.stage.canvas.height = DATA.baseHeight;
        FEATURE.Retina();

        if (MODE.IS_WIN == 0) {
          EL.map.x = DATA.windowW / 2;
          EL.map.y = DATA.baseHeight / 2;
        } else if (MODE.IS_WIN == 1) {
          EL.map.x = DATA.windowW / 2;
          EL.map.y = (DATA.mapHeight * EL.map.scaleX) / 2;
        }
      } else if (STATE.fix && !STATE.zoom) {
        EL.stage.canvas.width = DATA.windowW;
        EL.stage.canvas.height = DATA.windowH;
        FEATURE.Retina();
        if (DATA.windowH <= DATA.initHeight && !MODE.IS_IOS && !MODE.IS_ANDROID) {
          EL.map.scaleX = (DATA.windowH - 40) / EL.image.getBounds().height;
          EL.map.scaleY = EL.map.scaleX;
        } else {
          EL.map.scaleX = ORDER[DATA.index].size[MODE.IS_WIN];
          EL.map.scaleY = EL.map.scaleX;
        }
        EL.map.x = DATA.windowW / 2;
        EL.map.y = DATA.windowH / 2;
      } else if (STATE.fix && STATE.zoom) {
        EL.stage.canvas.width = DATA.windowW;
        EL.stage.canvas.height = DATA.windowH;
        FEATURE.Retina();

        if (DATA.winWidth > (DATA.windowW)) {
          createjs.Tween.get(EL.map)
            .to({ x: EL.map.x - (DATA.measureHorizon[MODE.IS_WIN] - EL.measureHorizon.getBoundingClientRect().left) }, DATA.duration / 2, createjs.Ease.circOut);
          DATA.winWidth = (DATA.windowW);
          DATA.measureHorizon[MODE.IS_WIN] = EL.measureHorizon.getBoundingClientRect().left;
        } else if (DATA.winWidth < (DATA.windowW)) {
          createjs.Tween.get(EL.map)
            .to({ x: EL.map.x - (DATA.measureHorizon[MODE.IS_WIN] - EL.measureHorizon.getBoundingClientRect().left) }, DATA.duration / 2, createjs.Ease.circOut);
          DATA.winWidth = (DATA.windowW);
          DATA.measureHorizon[MODE.IS_WIN] = EL.measureHorizon.getBoundingClientRect().left;
        }
        if (DATA.winHeight > DATA.windowH) {
          createjs.Tween.get(EL.map)
            .to({ y: EL.map.y - (DATA.measureVertical[MODE.IS_WIN] - EL.measureVertical.getBoundingClientRect().top) }, DATA.duration / 2, createjs.Ease.circOut);
          DATA.winHeight = DATA.windowH;
          DATA.measureVertical[MODE.IS_WIN] = EL.measureVertical.getBoundingClientRect().top;
        } else if (DATA.winHeight < DATA.windowH) {
          createjs.Tween.get(EL.map)
            .to({ y: EL.map.y - (DATA.measureVertical[MODE.IS_WIN] - EL.measureVertical.getBoundingClientRect().top) }, DATA.duration / 2, createjs.Ease.circOut);
          DATA.winHeight = DATA.windowH;
          DATA.measureVertical[MODE.IS_WIN] = EL.measureVertical.getBoundingClientRect().top;
        }
      }
    }
    window.addEventListener('resize', handleResize);
  }

  Device() {
    if (MODE.IS_IE) {
      EL.body.classList.add('-ie');
    } else if (MODE.IS_ANDROID) {
      EL.body.classList.add('-android');
    } else if (MODE.IS_IOS) {
      EL.body.classList.add('-ios');
    }
  }

  Draw() {
    // パフォーマンス向上のため、前もってアニメーション描画
    const centerY = MODE.IS_WIN == 0 ? DATA.windowH / 2 : (DATA.mapHeight * ((DATA.windowW - 20) / DATA.mapWidth)) / 2;
    createjs.Tween.get(EL.map)
      .to({
        scaleX: ORDER[1].size[MODE.IS_WIN],
        scaleY: ORDER[1].size[MODE.IS_WIN],
        x: ORDER[1].x[MODE.IS_WIN],
        y: ORDER[1].y[MODE.IS_WIN],
      }, DATA.duration, createjs.Ease.circOut)
      .to({
        scaleX: ORDER[DATA.index].size[MODE.IS_WIN],
        scaleY: ORDER[DATA.index].size[MODE.IS_WIN],
        x: DATA.windowW / 2,
        y: centerY,
      }, DATA.duration, createjs.Ease.circOut)
      .to({
        scaleX: ORDER[1].size[MODE.IS_WIN],
        scaleY: ORDER[1].size[MODE.IS_WIN],
        x: ORDER[1].x[MODE.IS_WIN],
        y: ORDER[1].y[MODE.IS_WIN],
      }, DATA.duration, createjs.Ease.circOut)
      .to({
        scaleX: ORDER[DATA.index].size[MODE.IS_WIN],
        scaleY: ORDER[DATA.index].size[MODE.IS_WIN],
        x: DATA.windowW / 2,
        y: centerY,
      }, DATA.duration, createjs.Ease.circOut);
  }
}