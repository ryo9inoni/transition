// config
import MODE from '../config/mode'; 
import AREA from '../config/area';
import DATA from '../config/data';
import EL from '../config/element';
import ORDER from '../config/order';
import STATE from '../config/state';
import GRAPHIC from '../config/graphic';
import EASING from '../config/easing';
import Feature from '../feature';

const FEATURE = new Feature();

export default class Anchor {
  constructor() {
    [...EL.anchorItemAll].forEach(el => {
      el.addEventListener('click', this.Select.bind(this));
    });
    EL.anchor.addEventListener('touchstart', (e) => { STATE.contents = true; });
    EL.anchor.addEventListener('touchend', (e) => { STATE.contents = false; });
  }

  Select(e) {
    STATE.contents = true;
    if (e.target.classList.contains('-active') || STATE.active) return;
    const activeEl = document.querySelector('.lxl-fact-anchor__item.-active');
    if ([...EL.anchorItemAll].some(el => el.classList.contains('-active'))) {
       activeEl.classList.remove('-active');
    }

    if (MODE.IS_WIN == 1) {
      $(EL.anchor).animate({ scrollLeft: Number(e.target.dataset.flick) }, 400, 'easeOutCubic');
    }

    e.target.classList.add('-active');
    this.Focus(e.target.dataset.index, e.target.dataset.area);
  }

  Focus(index) {
    // アニメーション
    let time = 0;
    let noneZoom = false;
    new Promise((resolve) => {
      if (!STATE.fix) {
        STATE.dir = true;
        FEATURE.Fix();
        EL.base.style.display = 'none';
        EL.stage.canvas.width = DATA.windowW;
        EL.stage.canvas.height = DATA.windowH;
        FEATURE.Retina();
        EL.map.x = DATA.windowW / 2;
        EL.map.y = DATA.windowH / 2;
      }

      if (ORDER[DATA.index].area == 'start' && ORDER[index].area == 'end') {
        noneZoom = true;
        EL.body.classList.add('-end');
        FEATURE.FadeOut(EL.search);
        createjs.Tween.get(EL.map)
          .to({
            scaleX: ORDER[ORDER.length - 1].size[MODE.IS_WIN],
            scaleY: ORDER[ORDER.length - 1].size[MODE.IS_WIN],
            x: ORDER[ORDER.length - 1].x[MODE.IS_WIN],
            y: ORDER[ORDER.length - 1].y[MODE.IS_WIN]
          }, DATA.duration, createjs.Ease.circOut);
      } else if (ORDER[DATA.index].area == 'end' && ORDER[index].area == 'start') {
        noneZoom = true;
        EL.body.classList.remove('-end');
        FEATURE.FadeOut(EL.end);
        createjs.Tween.get(EL.map)
          .to({
            scaleX: ORDER[0].size[MODE.IS_WIN],
            scaleY: ORDER[0].size[MODE.IS_WIN],
            x: ORDER[0].x[MODE.IS_WIN],
            y: ORDER[0].y[MODE.IS_WIN]
          }, DATA.duration, createjs.Ease.circOut);
      } else if (ORDER[DATA.index].area == 'end' && ORDER[index].area !== 'start') {
        EL.body.classList.remove('-end');
        FEATURE.FadeOut(EL.end);
      }
      
      if (STATE.zoom) {
        const area = document.querySelector('.lxl-fact-area[data-area="' + ORDER[DATA.index].area + '"]');
        FEATURE.FadeOut(area);
      }

      DATA.index > index ? STATE.dir = false : STATE.dir = true;
      DATA.index = index;

      if (!STATE.zoom && !noneZoom) {
        time = DATA.duration / 1.5;
        FEATURE.FadeOut(EL.search);
        [...EL.searchRadioAll].forEach(el => {
          if (el.checked) el.checked = false;
          if (el.value == 'all') el.checked = true;
        });
        FEATURE.Wave();
        STATE.zoom = true;
      }
      setTimeout(resolve, time);
    }).then(() => {
      return new Promise((resolve) => {
        if (!noneZoom) {
          time = DATA.duration;
          FEATURE.ScrollWatch(time*2);
          FEATURE.Active();
          FEATURE.Move();
          FEATURE.Point();
        }
        setTimeout(resolve, time);
      })
    }).then(() => {
      if (ORDER[index].area == 'end') {
        EL.body.classList.add('-end'); 
      }
      FEATURE.ContentsOpen();
      setTimeout(() => {
        STATE.contents = false;
      }, 100);
    });
  }
}