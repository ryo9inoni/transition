// config
import MODE from '../config/mode'; 
import DATA from '../config/data';
import EL from '../config/element';
import ORDER from '../config/order';
import STATE from '../config/state';
import Feature from '../feature';

const FEATURE = new Feature();

export default class Way {
  constructor() {
    this.beforePos = document.documentElement.scrollTop;

    window.addEventListener(FEATURE.wheel, this.App.bind(this));
    window.addEventListener('scroll', this.App.bind(this));  
    window.addEventListener('keydown', this.App.bind(this));
    window.addEventListener('touchstart', (e) => { this.s_y = e.touches[0].pageY; });
    window.addEventListener('touchmove', (e) => { this.e_y = e.touches[0].pageY; this.App(this) });
  }

  App(e) {
    if (STATE.active || STATE.contents) return;
    this.offset = MODE.IS_IE == true ? document.documentElement.scrollTop : window.pageYOffset;
    this.delta = e.deltaY ? -(e.deltaY) : e.wheelDelta ? e.wheelDelta : -(e.detail);
    this.ajustNum = MODE.IS_ANDROID == true ? 100 : 30;
    
    if (e.keyCode == 40) this.key = -1;
    if (e.keyCode == 38) this.key = 1;
    
    if (this.s_y > this.e_y) this.touch = -1;
    if (this.s_y < this.e_y) this.touch = 1;

    if (MODE.IS_IE) {
      this.afterPos = document.documentElement.scrollTop;
      if (this.beforePos < this.afterPos && this.afterPos !== 0) {
        this.scroll = -1;
      } else if (this.beforePos > this.afterPos && this.afterPos !== 0) {
        this.scroll = 1;
      } else if (this.beforePos > 10 && this.afterPos > 10 && this.dirBack) {
        this.scroll = 1;
      }
      this.beforePos = this.afterPos;
    }

    this.dirFront = this.delta < 0 || this.scroll < 0 || this.touch < 0 || this.key < 0;
    this.dirBack = this.delta > 0 || this.scroll > 0 || this.touch > 0 || this.key > 0;

    this.Fix();
    this.Start();
    this.Jump();
    this.End();
    this.Anchor();
  }

  Fix() {
    const containerTop = this.offset + EL.container.getBoundingClientRect().top;
    
    if (!STATE.fix && ORDER[DATA.index].area == 'start' && this.dirFront && this.offset >= containerTop - this.ajustNum) {
      STATE.dir = true;
      FEATURE.Fix();
      
      EL.stage.canvas.width = DATA.windowW;
      EL.stage.canvas.height = DATA.windowH;
      FEATURE.Retina();

      if (MODE.IS_WIN == 0 && DATA.windowH <= DATA.initHeight) {
        EL.map.scaleX = (DATA.windowH - 40) / EL.image.getBounds().height;
        EL.map.scaleY = EL.map.scaleX;
      }

      EL.map.x = DATA.windowW / 2;
      EL.map.y = DATA.windowH / 2;
      
      if (MODE.IS_IE) {
        if (this.beforePos == 0) {
          document.documentElement.scrollTop = 10;
          this.beforePos = document.documentElement.scrollTop;
        }
      }
    } else if (STATE.fix && ORDER[DATA.index].area == 'start' && this.dirBack && this.offset <= containerTop + this.ajustNum) {
      STATE.dir = false;
      EL.base.style.display = 'block';
      FEATURE.Fix();
      document.documentElement.scrollTop = document.documentElement.clientHeight;

      if (MODE.IS_WIN == 0 && STATE.fix) {
        EL.stage.canvas.width = DATA.windowW;
        EL.stage.canvas.height = DATA.baseHeight;
        FEATURE.Retina();
        if (MODE.IS_WIN == 0 && DATA.windowH <= DATA.initHeight) {
          EL.map.scaleX = DATA.windowH / EL.image.getBounds().height;
          EL.map.scaleY = EL.map.scaleX;
        }
        EL.map.x = DATA.windowW / 2;
        EL.map.y = DATA.baseHeight / 2;
      } else if (MODE.IS_WIN == 1) {
        EL.stage.canvas.width = DATA.windowW;
        EL.stage.canvas.height = (DATA.mapHeight * ((DATA.windowW - 20) / DATA.mapWidth));
        FEATURE.Retina();
        EL.map.x = DATA.windowW / 2;
        EL.map.y = (DATA.mapHeight * ((DATA.windowW - 20) / DATA.mapWidth)) / 2;
      }
    }
  }

  Start() {
    if (ORDER[DATA.index].area !== 'start') return;
    const searchPos = EL.search.getBoundingClientRect().bottom;
    
    if (!STATE.zoom && searchPos <= 0) {
      DATA.index++;
      STATE.dir = true;
      let timing = DATA.duration * 2;
      FEATURE.Active(timing);
      FEATURE.ScrollWatch(timing);

      //アニメーション
      new Promise((resolve) => {
        if (MODE.IS_IE) STATE.contents = true;
        FEATURE.FadeOut(EL.search);
        [...EL.searchRadioAll].forEach(el => {
          if (el.checked) el.checked = false;
          if (el.value == 'all') el.checked = true;
        });
        
        FEATURE.Wave();
        setTimeout(resolve, DATA.duration / 1.5);
      }).then(() => {
        return new Promise((resolve) => {
          FEATURE.Move();
          FEATURE.Point();
          setTimeout(resolve, DATA.duration);
        })
      }).then(() => {
        STATE.zoom = true;
        FEATURE.ContentsOpen();
        EL.base.style.display = 'none';
        if (MODE.IS_IE) {
          this.beforePos = document.documentElement.scrollTop;
          setTimeout(() => {
            STATE.contents = false;
          }, 100);
        }
      });
    }
  }

  Jump() {
    if (ORDER[DATA.index].area == 'start' || ORDER[DATA.index].area == 'end' || !STATE.zoom) return;
    const area = document.querySelector('.area[data-area="' + ORDER[DATA.index].area + '"]');
    const frontAjust = MODE.IS_WIN == 0 ? area.getBoundingClientRect().bottom * 1.5 : area.getBoundingClientRect().bottom * 2;

    if (this.dirFront) {
      if (this.offset >= frontAjust) {
        if (MODE.IS_IE) STATE.contents = true;
        DATA.index++;
        STATE.dir = true;
        FEATURE.FadeOut(area);
        setTimeout(() => {
          $(area).stop();          
        }, 400);
        let timing = DATA.duration * 2;
        if (ORDER[DATA.index].area == 'end') {
          timing = DATA.duration * 1.5;
        }
        FEATURE.Active(timing);
        FEATURE.ScrollWatch(timing);

        //アニメーション
        new Promise((resolve) => {
          FEATURE.Move();
          FEATURE.Point();
          setTimeout(resolve, DATA.duration);
        }).then(() => {
          FEATURE.ContentsOpen();
          if (ORDER[DATA.index].area == 'end') {
            EL.body.classList.add('-end');
          }
          if (MODE.IS_IE) {
            this.beforePos = document.documentElement.scrollTop;
            setTimeout(() => {
              STATE.contents = false;
            }, 100);
          }
        });
      }
    } else if (this.dirBack) {
      if (this.offset <= 30) {
        if (MODE.IS_IE) STATE.contents = true;
        DATA.index--;
        STATE.dir = false;
        FEATURE.FadeOut(area);
        setTimeout(() => {
          $(area).stop();          
        }, 400);
        let timing = DATA.duration * 2;
        if (ORDER[DATA.index].area == 'start') {
          timing = DATA.duration;
        }
        FEATURE.Active(timing); 
        FEATURE.ScrollWatch(timing);

        //アニメーション
        new Promise((resolve) => {
          FEATURE.Move();
          FEATURE.Point();
          setTimeout(resolve, DATA.duration);
        }).then(() => {
          FEATURE.ContentsOpen();
          if (MODE.IS_IE) {
            this.beforePos = document.documentElement.scrollTop;
            setTimeout(() => {
              STATE.contents = false;
            }, 100);
          }
        });
      }
    }
  }

  End() {
    if (ORDER[DATA.index].area !== 'end') return;

    if (this.dirBack && this.offset <= this.ajustNum) {
      DATA.index--;
      STATE.dir = false;
      STATE.zoom = true;
      let timing = (DATA.duration*2) + DATA.duration/2;
      FEATURE.Active(timing);
      FEATURE.ScrollWatch(timing);
      
      new Promise((resolve) => {
        if (MODE.IS_IE) STATE.contents = true;
        EL.body.classList.remove('-end');
        FEATURE.Wave();
        FEATURE.FadeOut(EL.end, DATA.duration / 2);
        setTimeout(resolve, DATA.duration / 1.5);
      }).then(() => {
        return new Promise((resolve) => {
          FEATURE.Move();
          FEATURE.Point();
          setTimeout(resolve, DATA.duration);
        });
      }).then(() => {
        FEATURE.ContentsOpen();
        if (MODE.IS_IE) {
          this.beforePos = document.documentElement.scrollTop;
          setTimeout(() => {
            STATE.contents = false;
          }, 100);
        }
      });
    }
  }

  Anchor() {
    const anchorItemBefore = document.querySelector('.anchor__item.-active');
    const anchorItemAfter = document.querySelector('.anchor__item[data-area="' + ORDER[DATA.index].area + '"]');
    const currentArea = anchorItemBefore.dataset.area;
    anchorItemBefore.classList.remove('-active');
    anchorItemAfter.classList.add('-active');

    if (currentArea !== ORDER[DATA.index].area) {
      $(EL.anchor).animate({ scrollLeft: Number(anchorItemAfter.dataset.flick) }, 400, 'easeOutCubic');
    }
  }
}