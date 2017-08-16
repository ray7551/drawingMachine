let Qs = require('quicksettings');

export default class Param {
  drawSpeed = 30;
  rewind = false;
  lineWidth = 0.7;
  running = false;
  colorChangePeriod = 20;
  drawMode = 'press-to-run';
  hideArms = false;
  changeColorTimes = 0;
  constructor(ctx, drawArmsFn, updateFn) {
    this.ctx = ctx;
    this.drawArmsFn = drawArmsFn;
    this.updateFn = updateFn;
    Qs.useExtStyleSheet();
    this.gui = Qs.create(document.body.clientWidth - 220, 60, 'Control Panel')
      //.setDraggable(false)
      //.setCollapsible(false)
      .collapse()
      .setGlobalChangeHandler(this.onChange.bind(this))
      .addDropDown('drawMode', ['press-to-run', 'autorun'])
      .addRange('drawSpeed', 0, 500, this.drawSpeed, 1)
      .addRange('lineWidth', 0, 6, this.lineWidth, 0.1)
      .addBoolean('rewind', this.rewind)
      .addBoolean('hideArms', this.hideArms)
      .addRange('colorChangePeriod', 2, 300, this.colorChangePeriod)
      .addButton('changeColor')
      .addButton('clear');
    // gui.add(param, "pause/run");

    let $title = document.querySelector('.qs_title_bar');
    $title.classList.add('collapse');
    $title.addEventListener('click', (evt) => {
      $title.classList.toggle('collapse');
      this.gui.toggleCollapsed();
    });
  }

  setRunning() {
    this.running = !(this.running);
    if (this.running) this.updateFn();
  }

  clear() {
    let canvas = this.ctx.canvas;
    this.ctx.fillStyle = "#010101";
    this.ctx.fillRect(0, 0, canvas.width, canvas.height);
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