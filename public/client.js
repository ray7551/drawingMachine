var Color = require('color');
var Arm = require('./Arm');

// colors below come from https://noni.cmiscm.com/ by Jongmin Kim
var colors = ["#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B", 
    "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
    "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39"];
var baseColors = colors.map(function(color) {
  return new Color(color);
});

window.onload = function() {
  var canvas = document.getElementById("canvas"),
    canvas2 = document.getElementById("canvas2"),
    context = canvas.getContext("2d"),
    context2 = canvas2.getContext("2d"),
    width = (canvas.width = canvas2.width = document.body.clientWidth),
    height = (canvas.height = canvas2.height = document.body.clientHeight),
    drawing = false;
  context2.fillStyle = "#010101";
  context2.fillRect(0, 0, width, width);
  context2.strokeStyle = baseColors[0];
  console.log(context2.strokeStyle);

  var param = {
    drawSpeed: 30,
    rewind: false,
    lineWidth: 0.3,
    running: true,
    colorChangePeriod: 20,
    'pause/run': function() {
      param.running = !(param.running);
      if(param.running) update();
    },
    clear: function() {
      context2.fillStyle = "#010101";
      context2.fillRect(0, 0, width, width);
    }
  };
  var gui = new dat.GUI();
  gui.add(param, "drawSpeed", 0, 500);
  gui.add(param, "rewind");
  gui.add(param, "lineWidth", 0, 5);
  gui.add(param, "pause/run");
  gui.add(param, "clear");
  gui.add(param, "colorChangePeriod", 2, 600);

  var arm = Arm.create(width / 2, height / 2, {length: 61, amp: 2.5}),
    angle = 0,
    arm2 = Arm.create(arm.getEndX(), arm.getEndY(), {length: 83, amp: 2.1, w: 0.5, phase: 2-Math.PI/2}),
    arm3 = Arm.create(arm2.getEndX(), arm2.getEndY(), {length: 71, amp: 2.3, w: 1.5, phase: -0.5});

  arm2.parent = arm;
  arm3.parent = arm2;
    arm.angle = 0;
    arm2.angle = 0;
    arm3.angle = 0;
    arm2.x = arm.getEndX();
    arm2.y = arm.getEndY();
    arm3.x = arm2.getEndX();
    arm3.y = arm2.getEndY();

  var lastFrameTime = window.performance.now();
  update();
  drawing = true;
  
  function update() {
    //console.log(arm3.getEndX(), arm3.getEndY());
    // var t = window.performance.now();
    // var deltaT = t - lastFrameTime;
    // lastFrameTime = t;
    
    context2.lineWidth = param.lineWidth;
    
    var colorIndex = Math.floor(Math.abs(angle) / param.colorChangePeriod) % (baseColors.length - 1);
    var mixRate = angle % param.colorChangePeriod / param.colorChangePeriod;
    context2.strokeStyle = baseColors[colorIndex].mix(baseColors[colorIndex + 1], mixRate).string();
    //if (drawing) {
      context2.beginPath();
      context2.moveTo(arm3.getEndX(), arm3.getEndY());
    //}

    context.clearRect(0, 0, width, height);
    arm.angle = arm.calcAngle(angle);
    arm2.angle = arm2.calcAngle(angle);
    arm3.angle = arm3.calcAngle(angle);
    arm.angle = Math.sin(angle) * 2.5;
    arm2.angle = Math.sin(angle * 0.5 + 2) * 2.12;
    arm3.angle = Math.sin(angle * 1.498 - 0.5) * 2.34;
    arm2.x = arm.getEndX();
    arm2.y = arm.getEndY();
    arm3.x = arm2.getEndX();
    arm3.y = arm2.getEndY();
    angle += param.drawSpeed / 1000  * (param.rewind ? -1 : 1);// * deltaT;
    arm.render(context);
    arm2.render(context);
    arm3.render(context);

    //console.log(arm3.getEndX(), arm3.getEndY());
    //if (drawing) {
      context2.lineTo(arm3.getEndX(), arm3.getEndY());
      context2.stroke();
    //}
    //param.running = false;
    if(param.running) requestAnimationFrame(update);
  }
};
