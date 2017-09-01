class Arm {
  x = 0;
  y = 0;
  initLength = 10;
  length = 10;
  angle = 0;
  parent = null;
  child = null;
  color = '#FFFFFF';
  ampDecay = 350;
  ampDecayMode = 'exp';
  lengthDecay = 350;
  lengthDecayMode = 'none';
  decayModes = {
    none(value, dt, decay) {
      return value;
      // return 1;
    },
    exp(value, dt, decay) {
      return value * Math.pow(1 - (1/decay), dt);
      // return Math.pow(1 - (1/decay), t / 10);
    },
    linear(value, dt, decay) {
      return value - dt / decay;
      // return -t / 10 / decay + 1;
    }
  };

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
    this.length = this.initLength = length;
    this.initAngle = initAngle;
    this.w = w;
    this.phaseOffset = phaseOffset;
    this.amp = this.initAmp = amp;
    // the second param of rotate should be sum of parents' angle,
    // but it's ok since we'll rotate this arm agian at FKSystem.addArm
    this.rotate(0);
  }

  reset() {
    this.amp = this.initAmp;
    this.length = this.initLength;
  }

  getDecayAmp(t) {
    // return Math.max(this.initAmp * Math.pow(1 - (1/this.ampDecay), t / 10), 0);
    // return this.initAmp * Math.max(this.decayModes[this.ampDecayMode](t, this.ampDecay), 0);
    // console.log(this.decayModes[this.ampDecayMode](this.amp, 0.02, this.ampDecay));
    return Math.max(this.decayModes[this.ampDecayMode](this.amp, 0.02, this.ampDecay), 0);
  }
  getDecayLength(t) {
    // return this.initLength * Math.max(this.decayModes[this.lengthDecayMode](t, this.lengthDecay), 0);
    // console.log(this.decayModes[this.lengthDecayMode](this.length, 0.02, this.lengthDecay));
    return Math.max(this.decayModes[this.lengthDecayMode](this.length, 0.02, this.lengthDecay), 0);
  }
  
  calcAngle(t) {
    this.amp = this.getDecayAmp(t);
    return this.amp * Math.sin(t * this.w + this.phaseOffset) + this.initAngle;
  }

  rotate(t, parentsAngleSum) {
    this.angle = this.calcAngle(t);
    this.length = this.getDecayLength(t);
    // count all parents' angle in so arms move with it's parent
    let totalAngle = parentsAngleSum ? parentsAngleSum + this.angle : this.angle;
    this.endX = this.x + Math.cos(totalAngle) * this.length;
    this.endY = this.y + Math.sin(totalAngle) * this.length;
  }

  render(context) {
    context.strokeStyle = this.color;
    context.lineWidth = 2;
    context.beginPath();
    // console.log(this)
    // console.log(this.x, this.y, this.endX, this.endY);
    context.moveTo(this.x, this.y);
    context.lineTo(this.endX, this.endY);
    context.stroke();
  }
};

export default Arm;