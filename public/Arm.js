var Arm = {
  x: 0,
  y: 0,
  length: 100,
  angle: 0,
  parent: null,

  create: function(x, y, opt) {
    var obj = Object.create(this);
    obj.init(x, y, opt);
    return obj;
  },

  init: function(x, y, {length=1, initAngle=0, w=1, phase=0, amp=1}) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.initAngle = initAngle;
    this.w = w;
    this.phase = phase;
    this.amp = amp;
  },
  
  calcAngle(t) {
    return this.amp * Math.sin(t * this.w + this.phase) + this.initAngle;
  },

  getEndX: function() {
    var angle = this.angle,
      parent = this.parent;
    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }
    return this.x + Math.cos(angle) * this.length;
  },

  getEndY: function() {
    var angle = this.angle,
      parent = this.parent;
    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }
    return this.y + Math.sin(angle) * this.length;
  },

  render: function(context) {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.getEndX(), this.getEndY());
    context.stroke();
  }
};

module.exports = Arm;