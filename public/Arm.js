class Arm {
  x = 0;
  y = 0;
  length = 100;
  angle = 0;
  parent = null;

  constructor(parent, opt) {
    if (parent instanceof Arm) {
      this.parent = parent;
      this.init(parent.endX, parent.endY, opt);
    } else {
      this.init(parent.x, parent.y, opt);
    }
  }

  init(x, y, {length=10, initAngle=0, w=1, phase=0, amp=1}) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.initAngle = initAngle;
    this.w = w;
    this.phase = phase;
    this.amp = this.initAmp = amp;
  }

  reset() {
    this.amp = this.initAmp;
  }

  getDecayAmp(t) {
    return Math.max(this.initAmp - Math.pow(Math.floor(t / 15), 1.4) * 0.01, 0);
  }
  
  calcAngle(t) {
    this.amp = this.getDecayAmp(t);
    return this.amp * Math.sin(t * this.w + this.phase) + this.initAngle;
  }

  // count in all parents' angle so arms move with parent
  getTotalAngle() {
    var angle = this.angle,
      parent = this.parent;
    while (parent) {
      angle += parent.angle;
      parent = parent.parent;
    }
    return angle;
  }

  get endX() {
    return this.x + Math.cos(this.getTotalAngle()) * this.length;
  }

  get endY() {
    return this.y + Math.sin(this.getTotalAngle()) * this.length;
  }

  render(context) {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.endX, this.endY);
    context.stroke();
  }
};

module.exports = Arm;