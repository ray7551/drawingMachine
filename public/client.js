const Color = require('color');
import Arm from './Arm';
import Param from './Param';
import {onTapHold} from './utils';

// colors below come from https://noni.cmiscm.com/ by Jongmin Kim
let colors = ["#FFFFFF", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B",
  "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
  "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39"
];
let baseColors = colors.map(function(color) {
  return new Color(color);
});

Zepto(function($) {
  // disable Safari Elastic Scrolling
  // @see https://stackoverflow.com/a/12765599/3052933
  // @see https://codepen.io/yisi/pen/PqapWZ
  // $('body').on('touchmove', function(e) {
  //   let searchTerms = '.scroll, .scroll-y, .scroll-x',
  //     $target = $(e.target),
  //     parents = $target.parents(searchTerms);
  //
  //   if (parents.length || $target.hasClass(searchTerms)) {
  //     // ignore as we want the scroll to happen
  //     // (This is where we may need to check if at limit)
  //   } else {
  //     e.preventDefault()
  //   }
  // });


  let armsCanvas = document.getElementById("arms"),
    curveCanvas = document.getElementById("curve"),
    armsCtx = armsCanvas.getContext("2d"),
    curveCtx = curveCanvas.getContext("2d"),
    width = (armsCanvas.width = curveCanvas.width = document.body.clientWidth),
    height = (armsCanvas.height = curveCanvas.height = document.body.clientHeight),
    armUnit = Math.min(width, height) / 200;
  curveCtx.fillStyle = "rgba(0,0,0,0)";
  curveCtx.fillRect(0, 0, width, width);
  curveCtx.strokeStyle = baseColors[0];
  console.log(curveCtx.strokeStyle);

  let param = new Param(curveCtx, drawArms, update);

  let arm = new Arm({x: width / 2, y: height / 2}, { length: 30 * armUnit, amp: 2.5 }),
    angle = 0,
    arm2 = new Arm(arm, { length: 33 * armUnit, amp: 2.12, w: 0.5, phase: 2 - Math.PI / 2 }),
    arm3 = new Arm(arm2, { length: 31 * armUnit, amp: 2.34, w: 1.5, phase: -0.5 });
  arm.angle = arm.calcAngle(angle);
  arm2.angle = arm2.calcAngle(angle);
  arm3.angle = arm3.calcAngle(angle);
  arm2.x = arm.endX;
  arm2.y = arm.endY;
  arm3.x = arm2.endX;
  arm3.y = arm2.endY;
  param.arms = [arm, arm2, arm3];

  //let stage = document.body;
  // let mc = new Hammer(curveCanvas);

  onTapHold(curveCanvas, {
    onHoldStart: () => {
      if (param.drawMode === 'press-to-run' && !param.running) {
        param.running = true;
        update();
      }
    },
    onHoldEnd: () => {
      if(param.drawMode==='press-to-run') {
        param.running = false;
      }
    }
  });

  //let lastFrameTime = window.performance.now();
  update();
  function update() {
    //console.log(arm3.getEndX(), arm3.getEndY());
    // var t = window.performance.now();
    // var deltaT = t - lastFrameTime;
    // lastFrameTime = t;

    curveCtx.lineWidth = param.lineWidth;

    let colorIndex = (
        Math.floor(Math.abs(angle) / param.colorChangePeriod)
        + param.changeColorTimes
      ) % (baseColors.length - 1);
    let mixRate = angle % param.colorChangePeriod / param.colorChangePeriod;
    curveCtx.strokeStyle = baseColors[colorIndex].mix(baseColors[colorIndex + 1], mixRate).string();
    let {x, y} = {x: arm3.endX, y: arm3.endY};

    arm.angle = arm.calcAngle(Math.abs(angle));
    arm2.angle = arm2.calcAngle(Math.abs(angle));
    arm3.angle = arm3.calcAngle(Math.abs(angle));
    arm2.x = arm.endX;
    arm2.y = arm.endY;
    arm3.x = arm2.endX;
    arm3.y = arm2.endY;
    angle += param.drawSpeed / 1000 * (param.rewind ? -1 : 1); // * deltaT;

    drawCurve(x, y, arm3.endX, arm3.endY);
    drawArms();

    //console.log(arm3.getEndX(), arm3.getEndY());
    curveCtx.lineTo(arm3.endX, arm3.endY);
    curveCtx.stroke();
    //param.running = false;
    if (param.running) requestAnimationFrame(update);
  }

  function drawArms(){
    armsCtx.clearRect(0, 0, width, height);
    if(!param.hideArms) {
      arm.render(armsCtx);
      arm2.render(armsCtx);
      arm3.render(armsCtx);
    }
  }
  function drawCurve(x, y, endX, endY) {
    curveCtx.beginPath();
    curveCtx.moveTo(x, y);

    curveCtx.lineTo(endX, endY);
    curveCtx.stroke();
  }
});