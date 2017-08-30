import qs from './qs';

export default class Param {
  drawSpeed = 30;
  rewind = false;
  lineWidth = 0.7;
  running = false;
  colorChangePeriod = 20;
  drawMode = 'autorun';
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
      .addDropDown('drawMode', ['autorun', 'press-to-run'])
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
      .addButton('clear');

    document.querySelector('.qs_main').classList.add('scroll');
  }

  setRunning() {
    this.running = !(this.running);
    if (this.running) this.updateFn();
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
        if(key === 'drawMode') {
          this.setRunning(this.drawMode === 'autorun');
          this.drawMode = this.gui.getValue(key).value;
          return;
        }
        // todo: why changing drawSpeed make arms move?
        this[key] = this.gui.getValue(key);
        if(key === 'hideArms') {
          this.drawArmsFn();
        }
    }
  }
}