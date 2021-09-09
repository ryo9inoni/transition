// config
import MODE from './config/mode'; 
import AREA from './config/area';
import DATA from './config/data';
import EL from './config/element';
import ORDER from './config/order';
import STATE from './config/state';
import GRAPHIC from './config/graphic';

const scrollStop = (e) => {
  e.preventDefault();
}

export default class Feature {
  constructor() {
    this.wheel = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  }

  Active(time) {
    if (time == null) time = DATA.duration;
    STATE.active = true;
    setTimeout(() => {
      STATE.active = false;
    }, time);
  }

  Fix() {
    if (STATE.dir) {
      STATE.fix = true;
      EL.body.classList.add('-fix');
    } else {
      STATE.fix = false;
      EL.body.classList.remove('-fix');
    }
  }

  FadeIn(el, duration) {
    if (duration == null) duration = 100;
    el.style.display = 'block';
    setTimeout(() => {
      el.style.opacity = '1';
    }, duration);
  }
  
  FadeOut(el, duration) {
    if (duration == null) duration = 400;
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.display = 'none';
    }, duration);
  }

  Wave() {
    EL.point.children.forEach(el => {
      if (ORDER[DATA.index].area == el.name) {
        const wave = el.getChildByName('wave');
        createjs.Tween.get(wave)
          .to({ alpha: 0.5, })
          .to({ scaleX: 14, scaleY: 14, alpha: 0, }, 750, createjs.Ease.circOut)
          .to({ scaleX: 1, scaleY: 1, alpha: 0.5, })
          .to({ scaleX: 14, scaleY: 14, alpha: 0, }, 750, createjs.Ease.circOut)
          .to({ scaleX: 1, scaleY: 1, alpha: 0, });
      } else {
        createjs.Tween.get(el.children[0].graphics._fill)
          .to({ style: GRAPHIC.focus.off.color }, 400, createjs.Ease.circOut);
      }
    });
  }

  Move() {
    let diffHorizon;
    let diffVertical;
    if (ORDER[DATA.index].area !== 'start' && ORDER[DATA.index].area !== 'end') {
      diffHorizon = DATA.initHorizon[MODE.IS_WIN] - EL.measureHorizon.getBoundingClientRect().left;
      diffVertical = DATA.initVertical[MODE.IS_WIN] - EL.measureVertical.getBoundingClientRect().top;
    } else {
      diffHorizon = 0;
      diffVertical = 0;
    }
    
    createjs.Tween.get(EL.map)
      .to({
        scaleX: ORDER[DATA.index].size[MODE.IS_WIN],
        scaleY: ORDER[DATA.index].size[MODE.IS_WIN],
        x: ORDER[DATA.index].x[MODE.IS_WIN] - diffHorizon,
        y: ORDER[DATA.index].y[MODE.IS_WIN] - diffVertical
      }, DATA.duration, createjs.Ease.circOut);
    
    if (ORDER[DATA.index].area == 'start' && ORDER[DATA.index].area == 'end') {
      DATA.measureHorizon[MODE.IS_WIN] = DATA.initHorizon[MODE.IS_WIN];
      DATA.measureVertical[MODE.IS_WIN] = DATA.initVertical[MODE.IS_WIN];      
    } else {
      DATA.measureHorizon[MODE.IS_WIN] = EL.measureHorizon.getBoundingClientRect().left;
      DATA.measureVertical[MODE.IS_WIN] = EL.measureVertical.getBoundingClientRect().top;      
    }
  }

  ContentsOpen() {
    let num01;
    if (MODE.IS_WIN == 0) {
      num01 = DATA.windowH - 80;
    } else {
      num01 = 80;
    }
    [...EL.contentsAreaAll].forEach(el => {
      if (ORDER[DATA.index].area == el.dataset.area) {
        this.FadeIn(el, 400);
        setTimeout(() => {
          document.documentElement.scrollTop = num01;
        }, 400);
      }
    });

    let num02 = 0;
    if (MODE.IS_IE) num02 = 30;
    if (ORDER[DATA.index].area == 'start' && !STATE.dir) {
      this.FadeIn(EL.search);
      document.documentElement.scrollTop = num02;
      STATE.zoom = false;
    } else if (ORDER[DATA.index].area == 'end' && STATE.dir) {
      this.FadeIn(EL.end);
      document.documentElement.scrollTop = num02;
      STATE.zoom = false;
    }
  }

  Point() {
    EL.point.children.forEach(el => {
      if (ORDER[DATA.index].area == 'start') {
        STATE.zoom = false;
        createjs.Tween.get(el.children[0])
          .to({ alpha: GRAPHIC.all.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics._fill)
          .to({ style: GRAPHIC.all.color }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics.command)
          .to({ radius: GRAPHIC.circle.origin }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics.command)
          .to({ radius: GRAPHIC.circle.origin }, 400, createjs.Ease.circOut);
        if (el.children[1]) {
          createjs.Tween.get(el.children[1])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        } else if (el.children[2]) {
          createjs.Tween.get(el.children[2])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        }
      } else if (ORDER[DATA.index].area == 'end') {
        STATE.zoom = false;
        createjs.Tween.get(el.children[0])
          .to({ alpha: GRAPHIC.all.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics._fill)
          .to({ style: GRAPHIC.all.color }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics.command)
          .to({ radius: GRAPHIC.circle.origin }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics.command)
          .to({ radius: GRAPHIC.circle.origin }, 400, createjs.Ease.circOut);
        if (el.children[1]) {
          createjs.Tween.get(el.children[1])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        } else if (el.children[2]) {
          createjs.Tween.get(el.children[2])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        }
      } else if (ORDER[DATA.index].area == el.name) {
        const circle = el.getChildByName('circle');
        const border = el.children[1];
        const name = el.children[2];

        createjs.Tween.get(circle.graphics._fill)
          .to({ style: GRAPHIC.focus.on.color }, 400, createjs.Ease.circOut);
        createjs.Tween.get(circle.graphics.command)
          .to({ radius: 7 }, 400, createjs.Ease.circOut);
        createjs.Tween.get(circle)
          .wait(DATA.duration)
          .to({ alpha: GRAPHIC.focus.on.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(border)
          .wait(DATA.duration)
          .to({ alpha: GRAPHIC.focus.on.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(name)
          .wait(DATA.duration)
          .to({ alpha: GRAPHIC.focus.on.opacity }, 400, createjs.Ease.circOut);
      } else if (ORDER[DATA.index].area == el.focus) {
        const circle = el.getChildByName('circle');
        const name = el.children[1];
        createjs.Tween.get(circle.graphics._fill)
          .to({ style: GRAPHIC.focus.off.color }, 400, createjs.Ease.circOut);
        createjs.Tween.get(circle.graphics.command)
          .to({ radius: 5 }, 400, createjs.Ease.circOut);
        createjs.Tween.get(circle)
          .wait(DATA.duration)
          .to({ alpha: GRAPHIC.focus.off.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(name)
          .wait(DATA.duration)
          .to({ alpha: GRAPHIC.focus.on.opacity }, 400, createjs.Ease.circOut);
      } else if (ORDER[DATA.index].area !== el.name && ORDER[DATA.index].area !== el.focus) {
        if (el.name == 'fukaya' || el.name == 'igaueno') {
          createjs.Tween.get(el.children[2])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        }
        createjs.Tween.get(el.children[0])
          .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        if (el.children[1]) {
          createjs.Tween.get(el.children[1])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        } else if (el.children[2]) {
          createjs.Tween.get(el.children[2])
            .to({ alpha: 0 }, 400, createjs.Ease.circOut);
        }
      }
    });
  }

  Retina() {
    EL.canvas.width *= DATA.resolution;
    EL.canvas.height *= DATA.resolution;
    EL.canvas.style.width = EL.canvas.width / DATA.resolution + 'px';
    EL.canvas.style.height = EL.canvas.height / DATA.resolution + 'px';
    EL.stage.scaleX = DATA.resolution;
    EL.stage.scaleY = DATA.resolution;
  }

  ScrollWatch(timing) {
    document.addEventListener(this.wheel, scrollStop, { passive: false });
    document.addEventListener('touchmove', scrollStop, { passive: false });
    setTimeout(() => {
      document.removeEventListener(this.wheel, scrollStop, { passive: false });
      document.removeEventListener('touchmove', scrollStop, { passive: false });    
    }, timing);
  }
}