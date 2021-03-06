import qs from './qs';
import {FKDrawMode} from './FKSystem';
import {uniq} from './utils';

export default class Param {
  drawSpeed = 30;
  rewind = false;
  lineWidth = 0.7;
  running = false;
  colorChangePeriod = 20;
  runMode = 'autorun';
  drawMode = FKDrawMode.trippy;
  hideArms = false;
  changeColorTimes = 0;
  armLengths = [0.6, 0.2, 0.2];
  constructor(ctx, drawArmsFn, updateFn) {
    this.ctx = ctx;
    this.drawArmsFn = drawArmsFn;
    this.updateFn = updateFn;

    this.gui = qs
      //.setDraggable(false)
      //.setCollapsible(false)
      .setGlobalChangeHandler(this.onChange.bind(this))
      .addDropDown('runMode', ['autorun', 'press-to-run'])
      .addRange('drawSpeed', 0, 500, this.drawSpeed, 1)
      .addBoolean('rewind', this.rewind)
      .addRange('lineWidth', 0, 6, this.lineWidth, 0.1)
      .addRange('colorChangePeriod', 2, 300, this.colorChangePeriod)
      .addButton('changeColor')
      .addMultpleRange("arm length", '0.6 0.8', values => {
        let armLengths = values.sort((a, b) => a - b);
        this.armLengths = armLengths.map((stop, index) => {
          return index===0 ? stop : stop - armLengths[index-1];
        });
        this.armLengths.push(1 - armLengths.pop());

        this.fk.arms.forEach((arm, i) => arm.length = this.armLengths[i] * this.fk.maxLen);
        this.fk.updateArms();
        this.drawArmsFn();
      })
      .addBoolean('hideArms', this.hideArms)
      .addButton('clear')
      .addButton('restart');

    document.querySelector('.qs_main').classList.add('scroll');
  }

  setFk(fk) {
    this.fk = fk;
    console.log(uniq(this.fk.drawMode, ...Object.values(FKDrawMode)));
    this.gui.addDropDown('drawMode', uniq(this.fk.drawMode, ...Object.values(FKDrawMode)));
  }

  setRunning() {
    this.running = !(this.running);
    if (this.running) this.updateFn();
  }

  restart() {
    this.clear();
    this.fk.reset();
  }

  clear() {
    let canvas = this.ctx.canvas;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  changeColor() {
    this.changeColorTimes++;
  }

  onChange(key) {
    switch (typeof this[key]) {
      case 'function':
        this[key]();
        break;
      default:
        if(key === 'runMode') {
          this.setRunning();
          this.runMode = this.gui.getValue(key).value;
          return;
        }
        if(key === 'drawMode') {
          this.drawMode = this.gui.getValue(key).value;
          this.fk.setDrawMode(this.drawMode);
          return;
        }

        this[key] = this.gui.getValue(key);
        if(key === 'hideArms') {
          this.drawArmsFn();
        }
    }
  }
}