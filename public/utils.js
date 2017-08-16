let noop = function(){};

let bind = function (target, events, cb) {
  events.split(' ').forEach(evt => {
    target.addEventListener(evt, cb);
  });
};
let onTapHold = function (target, {onHoldStart=noop, onHoldEnd=noop}) {
  // let isPressing = false;
  bind(target, 'touchstart mousedown', (evt) => {
    if (evt.type === 'mousedown' && evt.button !== 0) {
      return;
    }
    // isPressing = true;
    onHoldStart();
  });
  bind(target, 'touchend mouseup mouseleave', (evt) => {
    if (evt.type === 'mouseup' && evt.button !== 0) {
      return;
    }
    // isPressing = false;
    onHoldEnd();
  });
};


export {
  bind, onTapHold
}