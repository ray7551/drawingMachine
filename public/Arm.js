class Arm {
  x = 0;
  y = 0;
  length = 100;
  angle = 0;
  parent = null;
  child = null;

  constructor(parent, opt) {
    if (parent instanceof Arm) {
      this.parent = parent;
      this.init(parent.endX, parent.endY, opt);
      parent.child = this;
    } else {
      this.init(parent.x, parent.y, opt);
    }
  }

  init(x, y, {length=10, initAngle=0, w=1, phaseOffset=0, amp=1}) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.initAngle = initAngle;
    this.w = w;
    this.phaseOffset = phaseOffset;
    this.amp = this.initAmp = amp;

    this.angle = this.calcAngle(0);
    this.updateEndX(0);
    this.updateEndY(0);
  }

  reset() {
    this.amp = this.initAmp;
  }

  getDecayAmp(t) {
    return Math.max(this.initAmp - Math.pow(t / 15, 1.4) * 0.01, 0);
  }

  run(t) {
    this.angle = this.calcAngle(t);
  }
  
  calcAngle(t) {
    this.amp = this.getDecayAmp(t);
    return this.amp * Math.sin(t * this.w + this.phaseOffset) + this.initAngle;
  }

  updateEndX(angle) {
    // return this.x + Math.cos(this.getTotalAngle()) * this.length;
    this.endX = this.x + Math.cos(angle) * this.length;
  }

  updateEndY(angle) {
    // return this.y + Math.sin(this.getTotalAngle()) * this.length;
    this.endY = this.y + Math.sin(angle) * this.length;
  }

  render(context) {
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.beginPath();
    // console.log(this)
    // console.log(this.x, this.y, this.endX, this.endY);
    context.moveTo(this.x, this.y);
    context.lineTo(this.endX, this.endY);
    context.stroke();
  }
};

module.exports = Arm;