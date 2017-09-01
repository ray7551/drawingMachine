import Arm from './Arm';
let deepmerge = require('deepmerge');

let FKDrawMode = {
  trippy: 'trippy',
  rainbow: 'rainbow',
  mix: 'mix'
};
// Forward Kinematic System
class FKSystem {
  constructor(canvas, maxLen, { x, y }, {
    length = 0.2 * maxLen,
    initAngle = 0,
    w = 1,
    phaseOffset = 0,
    amp = 1
  }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.maxLen = maxLen;
    this.arms = [];
    this.defaultParam = { length, initAngle, w, phaseOffset, amp };
    this.rootArm = new Arm({ x, y }, this.defaultParam);
    this.lastArm = this.rootArm;
    this.arms.push(this.lastArm);
    this.t = 0;
    this.setDrawMode(FKDrawMode.mix);
    this.updateArms();
  }

  addArm({ length = 10, initAngle = 0, w = 1, phaseOffset = 0, amp = 1 }) {
    let param = deepmerge(this.defaultParam, { length, initAngle, w, phaseOffset, amp });
    console.log('last: ', this.lastArm);
    let arm = new Arm(this.lastArm, param);
    this.arms.push(arm);
    this.lastArm = arm;
    this.setDrawMode(this.drawMode);
    this.updateArms();
    return this;
  }

  updateArms() {
    let parentsAngleSum = 0;
    this.forEachArm(arm => {
      arm.rotate(Math.abs(this.t), parentsAngleSum);
      parentsAngleSum += arm.angle;
      if (arm.child) {
        arm.child.x = arm.endX;
        arm.child.y = arm.endY;
      }
    });
  }

  render() {
    this.forEachArm(arm => arm.render(this.ctx));
  }

  reset() {
    this.t = 0;
    this.forEachArm(arm => arm.reset());
    this.updateArms();
  }

  forEachArm(cb) {
    let arm = this.rootArm;
    while (arm) {
      cb(arm);
      arm = arm.child;
    }
  }

  setDrawMode(drawMode) {
    switch (drawMode) {
      case FKDrawMode.trippy:
        this.forEachArm(arm => {
          arm.ampDecayMode = 'exp';
          arm.lengthDecayMode = 'none';
        });
        this.drawMode = drawMode;
        break;
      case FKDrawMode.rainbow:
        this.forEachArm(arm => {
          arm.ampDecayMode = 'none';
          arm.lengthDecayMode = 'exp';
        });
        this.drawMode = drawMode;
        break;
      case FKDrawMode.mix:
        this.forEachArm(arm => {
          arm.ampDecayMode = 'exp';
          arm.lengthDecayMode = 'exp';
        });
        this.drawMode = drawMode;
        break;
    }
  }
}

export default FKSystem;
export {FKDrawMode};