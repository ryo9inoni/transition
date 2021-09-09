const MODE = {
  IS_IOS: (() => {
    return (window.navigator.userAgent.toLowerCase().indexOf('iphone') >= 0) || (window.navigator.userAgent.toLowerCase().indexOf('ipad') >= 0) || (window.navigator.userAgent.toLowerCase().indexOf('ipod') >= 0);
  })(),
  IS_ANDROID: (() => {
    return (window.navigator.userAgent.toLowerCase().indexOf('android') >= 0);
  })(),
  IS_IE: (() => {
    return (window.navigator.userAgent.toLowerCase().indexOf('msie') >= 0 || window.navigator.userAgent.toLowerCase().indexOf('trident') >= 0);
  })(),
  IS_WIN: (() => {
    // pc: 0, sp: 1; 
    return (window.innerWidth >= 1024 ? 0 : 1);
  })()
};

export default MODE;