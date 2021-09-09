import MODE from './mode';

const device = MODE.IS_ANDROID ? 20 : 35;

const GRAPHIC = {
  all: {
    color: '#EF7A00',
    opacity: '.5',
  },
  select: {
    on: {
      color: '#EF7A00',
      opacity: '.8',
    },
    off: {
      color: '#DED5B9',
      opacity: '.5',
    }
  },
  focus: {
    on: {
      color: '#EF7A00',
      opacity: '1',
    },
    off: {
      color: '#DED5B9',
      opacity: '1',
    }
  },
  circle: {
    origin: MODE.IS_WIN == 0 ? 20 : device
  }
}

export default GRAPHIC;