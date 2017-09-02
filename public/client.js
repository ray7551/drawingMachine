import Zepto from 'zepto';
import Arm from './Arm';
import FKSystem from './FKSystem';
import Param from './Param';
import Palette from './Palette';
import {onTapHold} from './utils';

let palette = new Palette();

// console.clear();

Zepto(function($) {
  // disable Safari Elastic Scrolling
  // @see https://stackoverflow.com/a/12765599/3052933
  // @see https://codepen.io/yisi/pen/PqapWZ
  $('body').on('touchmove', function(e) {
    let searchTerms = '.scroll, .scroll-y, .scroll-x',
      $target = $(e.target),
      parents = $target.parents(searchTerms);

    if (parents.length || $target.hasClass(searchTerms)) {
      // ignore as we want the scroll to happen
      // (This is where we may need to check if at limit)
    } else {
      e.preventDefault()
    }
  });


  let {width, height} = document.body.getBoundingClientRect();
  let armsCanvas = document.getElementById("arms"),
    curveCanvas = document.getElementById("curve"),
    armsCtx = armsCanvas.getContext("2d"),
    curveCtx = curveCanvas.getContext("2d");
  armsCanvas.width = curveCanvas.width = width,
  armsCanvas.height = curveCanvas.height = height,
  curveCtx.fillStyle = "rgba(0,0,0,0)";
  curveCtx.fillRect(0, 0, width, width);
  curveCtx.strokeStyle = palette.colors[0].hex();
  console.log(curveCtx.strokeStyle);

  let maxLen = Math.min(width, height) / 2;

  let param = new Param(curveCtx, drawArms, update);
  let fk = new FKSystem(armsCanvas, maxLen, {x: width/2, y: height/2}, {
    length: param.armLengths[0] * maxLen,
    amp: 2.5,
    initAngle: 1.2
  }).addArm({
    length: param.armLengths[1] * maxLen,
    amp: 2.12,
    w: 0.5,
    initAngle: Math.PI / 2,
    // phaseOffset: Math.PI
  }).addArm({
    length: param.armLengths[2] * maxLen,
    amp: 2.12,
    w: 0.5,
    initAngle: Math.PI / 2,
    // phaseOffset: Math.PI
  });
  fk.render();

  param.setFk(fk);
  if(param.runMode == 'autorun') {
    param.running = true;
    update();
  }

  onTapHold(curveCanvas, {
    onHoldStart: () => {
      if (param.runMode === 'press-to-run' && !param.running) {
        param.running = true;
        update();
      }
    },
    onHoldEnd: () => {
      if(param.runMode === 'press-to-run') {
        param.running = false;
      }
    }
  });

  //let lastFrameTime = window.performance.now();
  function update() {
    // var t = window.performance.now();
    // var deltaT = t - lastFrameTime;
    // lastFrameTime = t;
    curveCtx.lineWidth = param.lineWidth;
    curveCtx.strokeStyle = palette.mix(fk.t, param.colorChangePeriod, param.changeColorTimes);

    fk.lastArm.color = curveCtx.strokeStyle;
    let {x, y} = {x: fk.lastArm.endX, y: fk.lastArm.endY};

    fk.t += param.drawSpeed / 1000 * (param.rewind ? -1 : 1); // * deltaT;
    fk.updateArms();

    drawCurve(x, y, fk.lastArm.endX, fk.lastArm.endY);
    drawArms();

    if (param.running) requestAnimationFrame(update);
  }

  function drawArms(){
    armsCtx.clearRect(0, 0, width, height);
    if(!param.hideArms) {
      fk.render();
    }
  }
  function drawCurve(x, y, endX, endY) {
    curveCtx.beginPath();
    curveCtx.moveTo(x, y);
    curveCtx.lineTo(endX, endY);
    curveCtx.stroke();
  }
});