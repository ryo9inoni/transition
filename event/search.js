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

export default class Search {

  constructor() {
    [...EL.searchRadioAll].forEach(el => {
      el.addEventListener('click', this.Select.bind(this));
    });
  }

  Select(e) {
    if (e.target.value == 'all') {
      this.All();
    } else {
      this.Category(e.target.value);
    }
  }
  
  All() {
    EL.point.children.forEach(el => {
      createjs.Tween.get(el.children[0])
        .to({alpha: GRAPHIC.all.opacity}, 400, createjs.Ease.circOut);
      createjs.Tween.get(el.children[0].graphics._fill)
        .to({style: GRAPHIC.all.color}, 400, createjs.Ease.circOut);
    });
  }

  Category(cat) {
    EL.point.children.forEach(el => {
      if (el.cat.some(el => el == cat)) {
        createjs.Tween.get(el.children[0])
          .to({ alpha: GRAPHIC.select.on.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics._fill)
          .to({ style: GRAPHIC.select.on.color }, 400, createjs.Ease.circOut);
      } else {
        createjs.Tween.get(el.children[0])
          .to({ alpha: GRAPHIC.select.off.opacity }, 400, createjs.Ease.circOut);
        createjs.Tween.get(el.children[0].graphics._fill)
          .to({ style: GRAPHIC.select.off.color }, 400, createjs.Ease.circOut);
      }
    });
  }

}