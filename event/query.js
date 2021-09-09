// config
import DATA from '../config/data';
import EL from '../config/element';
import STATE from '../config/state';

import Feature from '../feature';
const FEATURE = new Feature();

export default class Query{
  constructor() {
    this.queryStr = window.location.search.slice(1);
    this.query = {};
    if (this.queryStr == '') return;
    this.queryStr.split('?').forEach((str) => {
      const arr = str.split('=');
      this.query[arr[0]] = arr[1];
    });

    setTimeout(() => {
      this.Focus();
    }, DATA.duration*2)
  }

  Focus() {
    STATE.dir = true;
    FEATURE.Fix();
    EL.stage.canvas.width = DATA.windowW;
    EL.stage.canvas.height = DATA.windowH;
    FEATURE.Retina();
    EL.map.x = DATA.windowW / 2;
    EL.map.y = DATA.windowH / 2;

    const anchorItemBefore = document.querySelector('.anchor__item.-active');
    const anchorItemAfter = document.querySelector('.anchor__item[data-area="' + this.query.area + '"]')
    anchorItemBefore.classList.remove('-active');
    anchorItemAfter.classList.add('-active');

    DATA.index = anchorItemAfter.dataset.index;

    let time = 0;
    new Promise((resolve) => {
      setTimeout(resolve, 1500);
    }).then(() => {
      return new Promise((resolve) => {
        time = DATA.duration / 1.5;
        FEATURE.FadeOut(EL.search);
        FEATURE.Wave();
        STATE.zoom = true;
        setTimeout(resolve, time);
      })
    }).then(() => {
      return new Promise((resolve) => {
        time = DATA.duration;  
        FEATURE.Move();
        FEATURE.Point();
        setTimeout(resolve, time);
      })
    }).then(() => {
      FEATURE.ContentsOpen();
    });
  }
}