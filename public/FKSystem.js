import Arm from './Arm';
let deepmerge = require('deepmerge');

// Forward Kinematic System
class FKSystem{
  constructor(canvas, maxLen, {x, y}, {
    length=0.2*maxLen, initAngle=0, w=1, phaseOffset=0, amp=1
  }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.maxLen = maxLen;
    this.arms = [];
    this.defaultParam = {length, initAngle, w, phaseOffset, amp};
    this.rootArm = new Arm({x, y}, this.defaultParam);
    this.lastArm = this.rootArm;
    this.arms.push(this.lastArm);
    this.t = 0;
    this.updateArms();
  }

  addArm({length=10, initAngle=0, w=1, phaseOffset=0, amp=1}) {
    let param = deepmerge(this.defaultParam, {length, initAngle, w, phaseOffset, amp});
    console.log('last: ', this.lastArm);
    let arm = new Arm(this.lastArm, param);
    this.arms.push(arm);
    this.lastArm = arm;
    this.updateArms();
    return this;
  }

  updateArms() {
    let currentArm = this.rootArm;
    let angle = 0;
    while(currentArm) {
      currentArm.angle = currentArm.calcAngle(Math.abs(this.t));
      // count in all parents' angle so arms move with it's parent
      angle += currentArm.angle;

      currentArm.updateEndX(angle);
      currentArm.updateEndY(angle);
      if(currentArm.child) {
        currentArm.child.x = currentArm.endX;
        currentArm.child.y = currentArm.endY;
      }

      currentArm = currentArm.child;
    }
  }

  render() {
    let currentArm = this.rootArm;
    let angle = 0;
    while(currentArm) {
      currentArm.render(this.ctx);
      currentArm = currentArm.child;
    }
  }

}

export default FKSystem;