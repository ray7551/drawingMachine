const Color = require('color');

// colors below come from https://noni.cmiscm.com/ by Jongmin Kim
let defaultColors = ["#FFFFFF", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B",
  "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4",
  "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39"
];

class Palette {
  constructor(colors = defaultColors) {
    this.colors = colors.map(c => new Color(c));
  }

  /**
   * @param float peroid how much time it should take to finish transform from one color to next color
   * @param int changedTimes how many times you manually changed color
   */
  mix(time, period, changedTimes=0) {
    time = Math.abs(time);
    let index = (
        Math.floor(time / period)
        + changedTimes
      ) % (this.colors.length - 1);
    return this.colors[index].mix(
      this.colors[index + 1],
      time % period / period // mix rate
    ).string();
  }
}

export default Palette;