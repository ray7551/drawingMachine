/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Arm = function () {
  function Arm(parent, opt) {
    _classCallCheck(this, Arm);

    this.x = 0;
    this.y = 0;
    this.initLength = 10;
    this.length = 10;
    this.angle = 0;
    this.parent = null;
    this.child = null;
    this.color = '#FFFFFF';
    this.ampDecay = 350;
    this.ampDecayMode = 'exp';
    this.lengthDecay = 350;
    this.lengthDecayMode = 'none';
    this.decayModes = {
      none: function none(value, dt, decay) {
        return value;
        // return 1;
      },
      exp: function exp(value, dt, decay) {
        return value * Math.pow(1 - 1 / decay, dt);
        // return Math.pow(1 - (1/decay), t / 10);
      },
      linear: function linear(value, dt, decay) {
        return value - dt / decay;
        // return -t / 10 / decay + 1;
      }
    };

    if (parent instanceof Arm) {
      this.parent = parent;
      this.init(parent.endX, parent.endY, opt);
      parent.child = this;
    } else {
      this.init(parent.x, parent.y, opt);
    }
  }

  _createClass(Arm, [{
    key: 'init',
    value: function init(x, y, _ref) {
      var _ref$length = _ref.length,
          length = _ref$length === undefined ? 10 : _ref$length,
          _ref$initAngle = _ref.initAngle,
          initAngle = _ref$initAngle === undefined ? 0 : _ref$initAngle,
          _ref$w = _ref.w,
          w = _ref$w === undefined ? 1 : _ref$w,
          _ref$phaseOffset = _ref.phaseOffset,
          phaseOffset = _ref$phaseOffset === undefined ? 0 : _ref$phaseOffset,
          _ref$amp = _ref.amp,
          amp = _ref$amp === undefined ? 1 : _ref$amp;

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
  }, {
    key: 'reset',
    value: function reset() {
      this.amp = this.initAmp;
      this.length = this.initLength;
    }
  }, {
    key: 'getDecayAmp',
    value: function getDecayAmp(t) {
      // return Math.max(this.initAmp * Math.pow(1 - (1/this.ampDecay), t / 10), 0);
      // return this.initAmp * Math.max(this.decayModes[this.ampDecayMode](t, this.ampDecay), 0);
      // console.log(this.decayModes[this.ampDecayMode](this.amp, 0.02, this.ampDecay));
      return Math.max(this.decayModes[this.ampDecayMode](this.amp, 0.02, this.ampDecay), 0);
    }
  }, {
    key: 'getDecayLength',
    value: function getDecayLength(t) {
      // return this.initLength * Math.max(this.decayModes[this.lengthDecayMode](t, this.lengthDecay), 0);
      // console.log(this.decayModes[this.lengthDecayMode](this.length, 0.02, this.lengthDecay));
      return Math.max(this.decayModes[this.lengthDecayMode](this.length, 0.02, this.lengthDecay), 0);
    }
  }, {
    key: 'calcAngle',
    value: function calcAngle(t) {
      this.amp = this.getDecayAmp(t);
      return this.amp * Math.sin(t * this.w + this.phaseOffset) + this.initAngle;
    }
  }, {
    key: 'rotate',
    value: function rotate(t, parentsAngleSum) {
      this.angle = this.calcAngle(t);
      this.length = this.getDecayLength(t);
      // count all parents' angle in so arms move with it's parent
      var totalAngle = parentsAngleSum ? parentsAngleSum + this.angle : this.angle;
      this.endX = this.x + Math.cos(totalAngle) * this.length;
      this.endY = this.y + Math.sin(totalAngle) * this.length;
    }
  }, {
    key: 'render',
    value: function render(context) {
      context.strokeStyle = this.color;
      context.lineWidth = 2;
      context.beginPath();
      // console.log(this)
      // console.log(this.x, this.y, this.endX, this.endY);
      context.moveTo(this.x, this.y);
      context.lineTo(this.endX, this.endY);
      context.stroke();
    }
  }]);

  return Arm;
}();

;

exports.default = Arm;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FKDrawMode = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Arm = __webpack_require__(0);

var _Arm2 = _interopRequireDefault(_Arm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var deepmerge = __webpack_require__(11);

var FKDrawMode = {
  trippy: 'trippy',
  rainbow: 'rainbow',
  mix: 'mix'
};
// Forward Kinematic System

var FKSystem = function () {
  function FKSystem(canvas, maxLen, _ref, _ref2) {
    var x = _ref.x,
        y = _ref.y;
    var _ref2$length = _ref2.length,
        length = _ref2$length === undefined ? 0.2 * maxLen : _ref2$length,
        _ref2$initAngle = _ref2.initAngle,
        initAngle = _ref2$initAngle === undefined ? 0 : _ref2$initAngle,
        _ref2$w = _ref2.w,
        w = _ref2$w === undefined ? 1 : _ref2$w,
        _ref2$phaseOffset = _ref2.phaseOffset,
        phaseOffset = _ref2$phaseOffset === undefined ? 0 : _ref2$phaseOffset,
        _ref2$amp = _ref2.amp,
        amp = _ref2$amp === undefined ? 1 : _ref2$amp;

    _classCallCheck(this, FKSystem);

    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.maxLen = maxLen;
    this.arms = [];
    this.defaultParam = { length: length, initAngle: initAngle, w: w, phaseOffset: phaseOffset, amp: amp };
    this.rootArm = new _Arm2.default({ x: x, y: y }, this.defaultParam);
    this.lastArm = this.rootArm;
    this.arms.push(this.lastArm);
    this.t = 0;
    this.setDrawMode(FKDrawMode.mix);
    this.updateArms();
  }

  _createClass(FKSystem, [{
    key: 'addArm',
    value: function addArm(_ref3) {
      var _ref3$length = _ref3.length,
          length = _ref3$length === undefined ? 10 : _ref3$length,
          _ref3$initAngle = _ref3.initAngle,
          initAngle = _ref3$initAngle === undefined ? 0 : _ref3$initAngle,
          _ref3$w = _ref3.w,
          w = _ref3$w === undefined ? 1 : _ref3$w,
          _ref3$phaseOffset = _ref3.phaseOffset,
          phaseOffset = _ref3$phaseOffset === undefined ? 0 : _ref3$phaseOffset,
          _ref3$amp = _ref3.amp,
          amp = _ref3$amp === undefined ? 1 : _ref3$amp;

      var param = deepmerge(this.defaultParam, { length: length, initAngle: initAngle, w: w, phaseOffset: phaseOffset, amp: amp });
      console.log('last: ', this.lastArm);
      var arm = new _Arm2.default(this.lastArm, param);
      this.arms.push(arm);
      this.lastArm = arm;
      this.setDrawMode(this.drawMode);
      this.updateArms();
      return this;
    }
  }, {
    key: 'updateArms',
    value: function updateArms() {
      var _this = this;

      var parentsAngleSum = 0;
      this.forEachArm(function (arm) {
        arm.rotate(Math.abs(_this.t), parentsAngleSum);
        parentsAngleSum += arm.angle;
        if (arm.child) {
          arm.child.x = arm.endX;
          arm.child.y = arm.endY;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      this.forEachArm(function (arm) {
        return arm.render(_this2.ctx);
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.t = 0;
      this.forEachArm(function (arm) {
        return arm.reset();
      });
      this.updateArms();
    }
  }, {
    key: 'forEachArm',
    value: function forEachArm(cb) {
      var arm = this.rootArm;
      while (arm) {
        cb(arm);
        arm = arm.child;
      }
    }
  }, {
    key: 'setDrawMode',
    value: function setDrawMode(drawMode) {
      switch (drawMode) {
        case FKDrawMode.trippy:
          this.forEachArm(function (arm) {
            arm.ampDecayMode = 'exp';
            arm.lengthDecayMode = 'none';
          });
          this.drawMode = drawMode;
          break;
        case FKDrawMode.rainbow:
          this.forEachArm(function (arm) {
            arm.ampDecayMode = 'none';
            arm.lengthDecayMode = 'exp';
          });
          this.drawMode = drawMode;
          break;
        case FKDrawMode.mix:
          this.forEachArm(function (arm) {
            arm.ampDecayMode = 'exp';
            arm.lengthDecayMode = 'exp';
          });
          this.drawMode = drawMode;
          break;
      }
    }
  }]);

  return FKSystem;
}();

exports.default = FKSystem;
exports.FKDrawMode = FKDrawMode;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var noop = function noop() {};

var bind = function bind(target, events, cb) {
  events.split(' ').forEach(function (evt) {
    target.addEventListener(evt, cb);
  });
};
var onTapHold = function onTapHold(target, _ref) {
  var _ref$onHoldStart = _ref.onHoldStart,
      onHoldStart = _ref$onHoldStart === undefined ? noop : _ref$onHoldStart,
      _ref$onHoldEnd = _ref.onHoldEnd,
      onHoldEnd = _ref$onHoldEnd === undefined ? noop : _ref$onHoldEnd;

  // let isPressing = false;
  bind(target, 'touchstart mousedown', function (evt) {
    if (evt.type === 'mousedown' && evt.button !== 0) {
      return;
    }
    // isPressing = true;
    onHoldStart();
  });
  bind(target, 'touchend mouseup mouseleave', function (evt) {
    if (evt.type === 'mouseup' && evt.button !== 0) {
      return;
    }
    // isPressing = false;
    onHoldEnd();
  });
};

var uniq = function uniq() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return [].concat(_toConsumableArray(new Set(args)));
};

exports.bind = bind;
exports.onTapHold = onTapHold;
exports.uniq = uniq;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var cssKeywords = __webpack_require__(3);

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

var reverseKeywords = {};
for (var key in cssKeywords) {
	if (cssKeywords.hasOwnProperty(key)) {
		reverseKeywords[cssKeywords[key]] = key;
	}
}

var convert = module.exports = {
	rgb: {channels: 3, labels: 'rgb'},
	hsl: {channels: 3, labels: 'hsl'},
	hsv: {channels: 3, labels: 'hsv'},
	hwb: {channels: 3, labels: 'hwb'},
	cmyk: {channels: 4, labels: 'cmyk'},
	xyz: {channels: 3, labels: 'xyz'},
	lab: {channels: 3, labels: 'lab'},
	lch: {channels: 3, labels: 'lch'},
	hex: {channels: 1, labels: ['hex']},
	keyword: {channels: 1, labels: ['keyword']},
	ansi16: {channels: 1, labels: ['ansi16']},
	ansi256: {channels: 1, labels: ['ansi256']},
	hcg: {channels: 3, labels: ['h', 'c', 'g']},
	apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
	gray: {channels: 1, labels: ['gray']}
};

// hide .channels and .labels properties
for (var model in convert) {
	if (convert.hasOwnProperty(model)) {
		if (!('channels' in convert[model])) {
			throw new Error('missing channels property: ' + model);
		}

		if (!('labels' in convert[model])) {
			throw new Error('missing channel labels property: ' + model);
		}

		if (convert[model].labels.length !== convert[model].channels) {
			throw new Error('channel and label counts mismatch: ' + model);
		}

		var channels = convert[model].channels;
		var labels = convert[model].labels;
		delete convert[model].channels;
		delete convert[model].labels;
		Object.defineProperty(convert[model], 'channels', {value: channels});
		Object.defineProperty(convert[model], 'labels', {value: labels});
	}
}

convert.rgb.hsl = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var l;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};

convert.rgb.hsv = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var min = Math.min(r, g, b);
	var max = Math.max(r, g, b);
	var delta = max - min;
	var h;
	var s;
	var v;

	if (max === 0) {
		s = 0;
	} else {
		s = (delta / max * 1000) / 10;
	}

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	v = ((max / 255) * 1000) / 10;

	return [h, s, v];
};

convert.rgb.hwb = function (rgb) {
	var r = rgb[0];
	var g = rgb[1];
	var b = rgb[2];
	var h = convert.rgb.hsl(rgb)[0];
	var w = 1 / 255 * Math.min(r, Math.min(g, b));

	b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));

	return [h, w * 100, b * 100];
};

convert.rgb.cmyk = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var c;
	var m;
	var y;
	var k;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	return [c * 100, m * 100, y * 100, k * 100];
};

/**
 * See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
 * */
function comparativeDistance(x, y) {
	return (
		Math.pow(x[0] - y[0], 2) +
		Math.pow(x[1] - y[1], 2) +
		Math.pow(x[2] - y[2], 2)
	);
}

convert.rgb.keyword = function (rgb) {
	var reversed = reverseKeywords[rgb];
	if (reversed) {
		return reversed;
	}

	var currentClosestDistance = Infinity;
	var currentClosestKeyword;

	for (var keyword in cssKeywords) {
		if (cssKeywords.hasOwnProperty(keyword)) {
			var value = cssKeywords[keyword];

			// Compute comparative distance
			var distance = comparativeDistance(rgb, value);

			// Check if its less, if so set as closest
			if (distance < currentClosestDistance) {
				currentClosestDistance = distance;
				currentClosestKeyword = keyword;
			}
		}
	}

	return currentClosestKeyword;
};

convert.keyword.rgb = function (keyword) {
	return cssKeywords[keyword];
};

convert.rgb.xyz = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;

	// assume sRGB
	r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);
	g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);
	b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);

	var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
	var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
	var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);

	return [x * 100, y * 100, z * 100];
};

convert.rgb.lab = function (rgb) {
	var xyz = convert.rgb.xyz(rgb);
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.hsl.rgb = function (hsl) {
	var h = hsl[0] / 360;
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var t1;
	var t2;
	var t3;
	var rgb;
	var val;

	if (s === 0) {
		val = l * 255;
		return [val, val, val];
	}

	if (l < 0.5) {
		t2 = l * (1 + s);
	} else {
		t2 = l + s - l * s;
	}

	t1 = 2 * l - t2;

	rgb = [0, 0, 0];
	for (var i = 0; i < 3; i++) {
		t3 = h + 1 / 3 * -(i - 1);
		if (t3 < 0) {
			t3++;
		}
		if (t3 > 1) {
			t3--;
		}

		if (6 * t3 < 1) {
			val = t1 + (t2 - t1) * 6 * t3;
		} else if (2 * t3 < 1) {
			val = t2;
		} else if (3 * t3 < 2) {
			val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
		} else {
			val = t1;
		}

		rgb[i] = val * 255;
	}

	return rgb;
};

convert.hsl.hsv = function (hsl) {
	var h = hsl[0];
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var smin = s;
	var lmin = Math.max(l, 0.01);
	var sv;
	var v;

	l *= 2;
	s *= (l <= 1) ? l : 2 - l;
	smin *= lmin <= 1 ? lmin : 2 - lmin;
	v = (l + s) / 2;
	sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

	return [h, sv * 100, v * 100];
};

convert.hsv.rgb = function (hsv) {
	var h = hsv[0] / 60;
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var hi = Math.floor(h) % 6;

	var f = h - Math.floor(h);
	var p = 255 * v * (1 - s);
	var q = 255 * v * (1 - (s * f));
	var t = 255 * v * (1 - (s * (1 - f)));
	v *= 255;

	switch (hi) {
		case 0:
			return [v, t, p];
		case 1:
			return [q, v, p];
		case 2:
			return [p, v, t];
		case 3:
			return [p, q, v];
		case 4:
			return [t, p, v];
		case 5:
			return [v, p, q];
	}
};

convert.hsv.hsl = function (hsv) {
	var h = hsv[0];
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;
	var vmin = Math.max(v, 0.01);
	var lmin;
	var sl;
	var l;

	l = (2 - s) * v;
	lmin = (2 - s) * vmin;
	sl = s * vmin;
	sl /= (lmin <= 1) ? lmin : 2 - lmin;
	sl = sl || 0;
	l /= 2;

	return [h, sl * 100, l * 100];
};

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert.hwb.rgb = function (hwb) {
	var h = hwb[0] / 360;
	var wh = hwb[1] / 100;
	var bl = hwb[2] / 100;
	var ratio = wh + bl;
	var i;
	var v;
	var f;
	var n;

	// wh + bl cant be > 1
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	i = Math.floor(6 * h);
	v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	n = wh + f * (v - wh); // linear interpolation

	var r;
	var g;
	var b;
	switch (i) {
		default:
		case 6:
		case 0: r = v; g = n; b = wh; break;
		case 1: r = n; g = v; b = wh; break;
		case 2: r = wh; g = v; b = n; break;
		case 3: r = wh; g = n; b = v; break;
		case 4: r = n; g = wh; b = v; break;
		case 5: r = v; g = wh; b = n; break;
	}

	return [r * 255, g * 255, b * 255];
};

convert.cmyk.rgb = function (cmyk) {
	var c = cmyk[0] / 100;
	var m = cmyk[1] / 100;
	var y = cmyk[2] / 100;
	var k = cmyk[3] / 100;
	var r;
	var g;
	var b;

	r = 1 - Math.min(1, c * (1 - k) + k);
	g = 1 - Math.min(1, m * (1 - k) + k);
	b = 1 - Math.min(1, y * (1 - k) + k);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.rgb = function (xyz) {
	var x = xyz[0] / 100;
	var y = xyz[1] / 100;
	var z = xyz[2] / 100;
	var r;
	var g;
	var b;

	r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
	g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
	b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);

	// assume sRGB
	r = r > 0.0031308
		? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)
		: r * 12.92;

	g = g > 0.0031308
		? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)
		: g * 12.92;

	b = b > 0.0031308
		? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)
		: b * 12.92;

	r = Math.min(Math.max(0, r), 1);
	g = Math.min(Math.max(0, g), 1);
	b = Math.min(Math.max(0, b), 1);

	return [r * 255, g * 255, b * 255];
};

convert.xyz.lab = function (xyz) {
	var x = xyz[0];
	var y = xyz[1];
	var z = xyz[2];
	var l;
	var a;
	var b;

	x /= 95.047;
	y /= 100;
	z /= 108.883;

	x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
	y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
	z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

	l = (116 * y) - 16;
	a = 500 * (x - y);
	b = 200 * (y - z);

	return [l, a, b];
};

convert.lab.xyz = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var x;
	var y;
	var z;

	y = (l + 16) / 116;
	x = a / 500 + y;
	z = y - b / 200;

	var y2 = Math.pow(y, 3);
	var x2 = Math.pow(x, 3);
	var z2 = Math.pow(z, 3);
	y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
	x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
	z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

	x *= 95.047;
	y *= 100;
	z *= 108.883;

	return [x, y, z];
};

convert.lab.lch = function (lab) {
	var l = lab[0];
	var a = lab[1];
	var b = lab[2];
	var hr;
	var h;
	var c;

	hr = Math.atan2(b, a);
	h = hr * 360 / 2 / Math.PI;

	if (h < 0) {
		h += 360;
	}

	c = Math.sqrt(a * a + b * b);

	return [l, c, h];
};

convert.lch.lab = function (lch) {
	var l = lch[0];
	var c = lch[1];
	var h = lch[2];
	var a;
	var b;
	var hr;

	hr = h / 360 * 2 * Math.PI;
	a = c * Math.cos(hr);
	b = c * Math.sin(hr);

	return [l, a, b];
};

convert.rgb.ansi16 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];
	var value = 1 in arguments ? arguments[1] : convert.rgb.hsv(args)[2]; // hsv -> ansi16 optimization

	value = Math.round(value / 50);

	if (value === 0) {
		return 30;
	}

	var ansi = 30
		+ ((Math.round(b / 255) << 2)
		| (Math.round(g / 255) << 1)
		| Math.round(r / 255));

	if (value === 2) {
		ansi += 60;
	}

	return ansi;
};

convert.hsv.ansi16 = function (args) {
	// optimization here; we already know the value and don't need to get
	// it converted for us.
	return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
};

convert.rgb.ansi256 = function (args) {
	var r = args[0];
	var g = args[1];
	var b = args[2];

	// we use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	var ansi = 16
		+ (36 * Math.round(r / 255 * 5))
		+ (6 * Math.round(g / 255 * 5))
		+ Math.round(b / 255 * 5);

	return ansi;
};

convert.ansi16.rgb = function (args) {
	var color = args % 10;

	// handle greyscale
	if (color === 0 || color === 7) {
		if (args > 50) {
			color += 3.5;
		}

		color = color / 10.5 * 255;

		return [color, color, color];
	}

	var mult = (~~(args > 50) + 1) * 0.5;
	var r = ((color & 1) * mult) * 255;
	var g = (((color >> 1) & 1) * mult) * 255;
	var b = (((color >> 2) & 1) * mult) * 255;

	return [r, g, b];
};

convert.ansi256.rgb = function (args) {
	// handle greyscale
	if (args >= 232) {
		var c = (args - 232) * 10 + 8;
		return [c, c, c];
	}

	args -= 16;

	var rem;
	var r = Math.floor(args / 36) / 5 * 255;
	var g = Math.floor((rem = args % 36) / 6) / 5 * 255;
	var b = (rem % 6) / 5 * 255;

	return [r, g, b];
};

convert.rgb.hex = function (args) {
	var integer = ((Math.round(args[0]) & 0xFF) << 16)
		+ ((Math.round(args[1]) & 0xFF) << 8)
		+ (Math.round(args[2]) & 0xFF);

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.hex.rgb = function (args) {
	var match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
	if (!match) {
		return [0, 0, 0];
	}

	var colorString = match[0];

	if (match[0].length === 3) {
		colorString = colorString.split('').map(function (char) {
			return char + char;
		}).join('');
	}

	var integer = parseInt(colorString, 16);
	var r = (integer >> 16) & 0xFF;
	var g = (integer >> 8) & 0xFF;
	var b = integer & 0xFF;

	return [r, g, b];
};

convert.rgb.hcg = function (rgb) {
	var r = rgb[0] / 255;
	var g = rgb[1] / 255;
	var b = rgb[2] / 255;
	var max = Math.max(Math.max(r, g), b);
	var min = Math.min(Math.min(r, g), b);
	var chroma = (max - min);
	var grayscale;
	var hue;

	if (chroma < 1) {
		grayscale = min / (1 - chroma);
	} else {
		grayscale = 0;
	}

	if (chroma <= 0) {
		hue = 0;
	} else
	if (max === r) {
		hue = ((g - b) / chroma) % 6;
	} else
	if (max === g) {
		hue = 2 + (b - r) / chroma;
	} else {
		hue = 4 + (r - g) / chroma + 4;
	}

	hue /= 6;
	hue %= 1;

	return [hue * 360, chroma * 100, grayscale * 100];
};

convert.hsl.hcg = function (hsl) {
	var s = hsl[1] / 100;
	var l = hsl[2] / 100;
	var c = 1;
	var f = 0;

	if (l < 0.5) {
		c = 2.0 * s * l;
	} else {
		c = 2.0 * s * (1.0 - l);
	}

	if (c < 1.0) {
		f = (l - 0.5 * c) / (1.0 - c);
	}

	return [hsl[0], c * 100, f * 100];
};

convert.hsv.hcg = function (hsv) {
	var s = hsv[1] / 100;
	var v = hsv[2] / 100;

	var c = s * v;
	var f = 0;

	if (c < 1.0) {
		f = (v - c) / (1 - c);
	}

	return [hsv[0], c * 100, f * 100];
};

convert.hcg.rgb = function (hcg) {
	var h = hcg[0] / 360;
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	if (c === 0.0) {
		return [g * 255, g * 255, g * 255];
	}

	var pure = [0, 0, 0];
	var hi = (h % 1) * 6;
	var v = hi % 1;
	var w = 1 - v;
	var mg = 0;

	switch (Math.floor(hi)) {
		case 0:
			pure[0] = 1; pure[1] = v; pure[2] = 0; break;
		case 1:
			pure[0] = w; pure[1] = 1; pure[2] = 0; break;
		case 2:
			pure[0] = 0; pure[1] = 1; pure[2] = v; break;
		case 3:
			pure[0] = 0; pure[1] = w; pure[2] = 1; break;
		case 4:
			pure[0] = v; pure[1] = 0; pure[2] = 1; break;
		default:
			pure[0] = 1; pure[1] = 0; pure[2] = w;
	}

	mg = (1.0 - c) * g;

	return [
		(c * pure[0] + mg) * 255,
		(c * pure[1] + mg) * 255,
		(c * pure[2] + mg) * 255
	];
};

convert.hcg.hsv = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var v = c + g * (1.0 - c);
	var f = 0;

	if (v > 0.0) {
		f = c / v;
	}

	return [hcg[0], f * 100, v * 100];
};

convert.hcg.hsl = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;

	var l = g * (1.0 - c) + 0.5 * c;
	var s = 0;

	if (l > 0.0 && l < 0.5) {
		s = c / (2 * l);
	} else
	if (l >= 0.5 && l < 1.0) {
		s = c / (2 * (1 - l));
	}

	return [hcg[0], s * 100, l * 100];
};

convert.hcg.hwb = function (hcg) {
	var c = hcg[1] / 100;
	var g = hcg[2] / 100;
	var v = c + g * (1.0 - c);
	return [hcg[0], (v - c) * 100, (1 - v) * 100];
};

convert.hwb.hcg = function (hwb) {
	var w = hwb[1] / 100;
	var b = hwb[2] / 100;
	var v = 1 - b;
	var c = v - w;
	var g = 0;

	if (c < 1) {
		g = (v - c) / (1 - c);
	}

	return [hwb[0], c * 100, g * 100];
};

convert.apple.rgb = function (apple) {
	return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
};

convert.rgb.apple = function (rgb) {
	return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
};

convert.gray.rgb = function (args) {
	return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
};

convert.gray.hsl = convert.gray.hsv = function (args) {
	return [0, 0, args[0]];
};

convert.gray.hwb = function (gray) {
	return [0, 100, gray[0]];
};

convert.gray.cmyk = function (gray) {
	return [0, 0, 0, gray[0]];
};

convert.gray.lab = function (gray) {
	return [gray[0], 0, 0];
};

convert.gray.hex = function (gray) {
	var val = Math.round(gray[0] / 100 * 255) & 0xFF;
	var integer = (val << 16) + (val << 8) + val;

	var string = integer.toString(16).toUpperCase();
	return '000000'.substring(string.length) + string;
};

convert.rgb.gray = function (rgb) {
	var val = (rgb[0] + rgb[1] + rgb[2]) / 3;
	return [val / 255 * 100];
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

__webpack_require__(7);

__webpack_require__(8);

__webpack_require__(9);

__webpack_require__(21);

__webpack_require__(23);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "glitch-dark.efa8315a1d6c8487f05430f15a7d90bf.svg";

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _zepto = __webpack_require__(10);

var _zepto2 = _interopRequireDefault(_zepto);

var _Arm = __webpack_require__(0);

var _Arm2 = _interopRequireDefault(_Arm);

var _FKSystem = __webpack_require__(1);

var _FKSystem2 = _interopRequireDefault(_FKSystem);

var _Param = __webpack_require__(12);

var _Param2 = _interopRequireDefault(_Param);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Color = __webpack_require__(15);


// colors below come from https://noni.cmiscm.com/ by Jongmin Kim
var colors = ["#FFFFFF", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#795548", "#607D8B", "#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39"];
var baseColors = colors.map(function (color) {
  return new Color(color);
});

// console.clear();

(0, _zepto2.default)(function ($) {
  // disable Safari Elastic Scrolling
  // @see https://stackoverflow.com/a/12765599/3052933
  // @see https://codepen.io/yisi/pen/PqapWZ
  $('body').on('touchmove', function (e) {
    var searchTerms = '.scroll, .scroll-y, .scroll-x',
        $target = $(e.target),
        parents = $target.parents(searchTerms);

    if (parents.length || $target.hasClass(searchTerms)) {
      // ignore as we want the scroll to happen
      // (This is where we may need to check if at limit)
    } else {
      e.preventDefault();
    }
  });

  var _document$body$getBou = document.body.getBoundingClientRect(),
      width = _document$body$getBou.width,
      height = _document$body$getBou.height;

  var armsCanvas = document.getElementById("arms"),
      curveCanvas = document.getElementById("curve"),
      armsCtx = armsCanvas.getContext("2d"),
      curveCtx = curveCanvas.getContext("2d");
  armsCanvas.width = curveCanvas.width = width, armsCanvas.height = curveCanvas.height = height, curveCtx.fillStyle = "rgba(0,0,0,0)";
  curveCtx.fillRect(0, 0, width, width);
  curveCtx.strokeStyle = baseColors[0];
  console.log(curveCtx.strokeStyle);

  var maxLen = Math.min(width, height) / 2;

  var param = new _Param2.default(curveCtx, drawArms, update);
  var fk = new _FKSystem2.default(armsCanvas, maxLen, { x: width / 2, y: height / 2 }, {
    length: param.armLengths[0] * maxLen,
    amp: 2.5,
    initAngle: 1.2
  }).addArm({
    length: param.armLengths[1] * maxLen,
    amp: 2.12,
    w: 0.5,
    initAngle: Math.PI / 2
    // phaseOffset: Math.PI
  }).addArm({
    length: param.armLengths[2] * maxLen,
    amp: 2.12,
    w: 0.5,
    initAngle: Math.PI / 2
    // phaseOffset: Math.PI
  });
  fk.render();

  param.setFk(fk);
  if (param.runMode == 'autorun') {
    param.running = true;
    update();
  }

  (0, _utils.onTapHold)(curveCanvas, {
    onHoldStart: function onHoldStart() {
      if (param.runMode === 'press-to-run' && !param.running) {
        param.running = true;
        update();
      }
    },
    onHoldEnd: function onHoldEnd() {
      if (param.runMode === 'press-to-run') {
        param.running = false;
      }
    }
  });

  //let lastFrameTime = window.performance.now();
  function update() {
    // var t = window.performance.now();
    // var deltaT = t - lastFrameTime;
    // lastFrameTime = t;
    curveCtx.lineWidth = param.lineWidth;

    var colorIndex = (Math.floor(Math.abs(fk.t) / param.colorChangePeriod) + param.changeColorTimes) % (baseColors.length - 1);
    var mixRate = fk.t % param.colorChangePeriod / param.colorChangePeriod;
    curveCtx.strokeStyle = baseColors[colorIndex].mix(baseColors[colorIndex + 1], mixRate).string();

    fk.lastArm.color = curveCtx.strokeStyle;
    var _x$y = { x: fk.lastArm.endX, y: fk.lastArm.endY },
        x = _x$y.x,
        y = _x$y.y;


    fk.t += param.drawSpeed / 1000 * (param.rewind ? -1 : 1); // * deltaT;
    fk.updateArms();

    drawCurve(x, y, fk.lastArm.endX, fk.lastArm.endY);
    drawArms();

    if (param.running) requestAnimationFrame(update);
  }

  function drawArms() {
    armsCtx.clearRect(0, 0, width, height);
    if (!param.hideArms) {
      fk.render();
    }
  }
  function drawCurve(x, y, endX, endY) {
    curveCtx.beginPath();
    curveCtx.moveTo(x, y);
    curveCtx.lineTo(endX, endY);
    curveCtx.stroke();
  }
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*** IMPORTS FROM imports-loader ***/
(function() {

/* Zepto v1.2.0 - zepto event ajax form ie - zeptojs.com/license */
!function(t,e){ true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return e(t)}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):e(t)}(this,function(t){var e=function(){function $(t){return null==t?String(t):S[C.call(t)]||"object"}function F(t){return"function"==$(t)}function k(t){return null!=t&&t==t.window}function M(t){return null!=t&&t.nodeType==t.DOCUMENT_NODE}function R(t){return"object"==$(t)}function Z(t){return R(t)&&!k(t)&&Object.getPrototypeOf(t)==Object.prototype}function z(t){var e=!!t&&"length"in t&&t.length,n=r.type(t);return"function"!=n&&!k(t)&&("array"==n||0===e||"number"==typeof e&&e>0&&e-1 in t)}function q(t){return a.call(t,function(t){return null!=t})}function H(t){return t.length>0?r.fn.concat.apply([],t):t}function I(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}function V(t){return t in l?l[t]:l[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function _(t,e){return"number"!=typeof e||h[I(t)]?e:e+"px"}function B(t){var e,n;return c[t]||(e=f.createElement(t),f.body.appendChild(e),n=getComputedStyle(e,"").getPropertyValue("display"),e.parentNode.removeChild(e),"none"==n&&(n="block"),c[t]=n),c[t]}function U(t){return"children"in t?u.call(t.children):r.map(t.childNodes,function(t){return 1==t.nodeType?t:void 0})}function X(t,e){var n,r=t?t.length:0;for(n=0;r>n;n++)this[n]=t[n];this.length=r,this.selector=e||""}function J(t,r,i){for(n in r)i&&(Z(r[n])||L(r[n]))?(Z(r[n])&&!Z(t[n])&&(t[n]={}),L(r[n])&&!L(t[n])&&(t[n]=[]),J(t[n],r[n],i)):r[n]!==e&&(t[n]=r[n])}function W(t,e){return null==e?r(t):r(t).filter(e)}function Y(t,e,n,r){return F(e)?e.call(t,n,r):e}function G(t,e,n){null==n?t.removeAttribute(e):t.setAttribute(e,n)}function K(t,n){var r=t.className||"",i=r&&r.baseVal!==e;return n===e?i?r.baseVal:r:void(i?r.baseVal=n:t.className=n)}function Q(t){try{return t?"true"==t||("false"==t?!1:"null"==t?null:+t+""==t?+t:/^[\[\{]/.test(t)?r.parseJSON(t):t):t}catch(e){return t}}function tt(t,e){e(t);for(var n=0,r=t.childNodes.length;r>n;n++)tt(t.childNodes[n],e)}var e,n,r,i,O,P,o=[],s=o.concat,a=o.filter,u=o.slice,f=t.document,c={},l={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,g=/^(?:body|html)$/i,v=/([A-Z])/g,y=["val","css","html","text","data","width","height","offset"],x=["after","prepend","before","append"],b=f.createElement("table"),E=f.createElement("tr"),j={tr:f.createElement("tbody"),tbody:b,thead:b,tfoot:b,td:E,th:E,"*":f.createElement("div")},w=/complete|loaded|interactive/,T=/^[\w-]*$/,S={},C=S.toString,N={},A=f.createElement("div"),D={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},L=Array.isArray||function(t){return t instanceof Array};return N.matches=function(t,e){if(!e||!t||1!==t.nodeType)return!1;var n=t.matches||t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var r,i=t.parentNode,o=!i;return o&&(i=A).appendChild(t),r=~N.qsa(i,e).indexOf(t),o&&A.removeChild(t),r},O=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})},P=function(t){return a.call(t,function(e,n){return t.indexOf(e)==n})},N.fragment=function(t,n,i){var o,s,a;return d.test(t)&&(o=r(f.createElement(RegExp.$1))),o||(t.replace&&(t=t.replace(m,"<$1></$2>")),n===e&&(n=p.test(t)&&RegExp.$1),n in j||(n="*"),a=j[n],a.innerHTML=""+t,o=r.each(u.call(a.childNodes),function(){a.removeChild(this)})),Z(i)&&(s=r(o),r.each(i,function(t,e){y.indexOf(t)>-1?s[t](e):s.attr(t,e)})),o},N.Z=function(t,e){return new X(t,e)},N.isZ=function(t){return t instanceof N.Z},N.init=function(t,n){var i;if(!t)return N.Z();if("string"==typeof t)if(t=t.trim(),"<"==t[0]&&p.test(t))i=N.fragment(t,RegExp.$1,n),t=null;else{if(n!==e)return r(n).find(t);i=N.qsa(f,t)}else{if(F(t))return r(f).ready(t);if(N.isZ(t))return t;if(L(t))i=q(t);else if(R(t))i=[t],t=null;else if(p.test(t))i=N.fragment(t.trim(),RegExp.$1,n),t=null;else{if(n!==e)return r(n).find(t);i=N.qsa(f,t)}}return N.Z(i,t)},r=function(t,e){return N.init(t,e)},r.extend=function(t){var e,n=u.call(arguments,1);return"boolean"==typeof t&&(e=t,t=n.shift()),n.forEach(function(n){J(t,n,e)}),t},N.qsa=function(t,e){var n,r="#"==e[0],i=!r&&"."==e[0],o=r||i?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&r?(n=t.getElementById(o))?[n]:[]:1!==t.nodeType&&9!==t.nodeType&&11!==t.nodeType?[]:u.call(s&&!r&&t.getElementsByClassName?i?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))},r.contains=f.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){for(;e&&(e=e.parentNode);)if(e===t)return!0;return!1},r.type=$,r.isFunction=F,r.isWindow=k,r.isArray=L,r.isPlainObject=Z,r.isEmptyObject=function(t){var e;for(e in t)return!1;return!0},r.isNumeric=function(t){var e=Number(t),n=typeof t;return null!=t&&"boolean"!=n&&("string"!=n||t.length)&&!isNaN(e)&&isFinite(e)||!1},r.inArray=function(t,e,n){return o.indexOf.call(e,t,n)},r.camelCase=O,r.trim=function(t){return null==t?"":String.prototype.trim.call(t)},r.uuid=0,r.support={},r.expr={},r.noop=function(){},r.map=function(t,e){var n,i,o,r=[];if(z(t))for(i=0;i<t.length;i++)n=e(t[i],i),null!=n&&r.push(n);else for(o in t)n=e(t[o],o),null!=n&&r.push(n);return H(r)},r.each=function(t,e){var n,r;if(z(t)){for(n=0;n<t.length;n++)if(e.call(t[n],n,t[n])===!1)return t}else for(r in t)if(e.call(t[r],r,t[r])===!1)return t;return t},r.grep=function(t,e){return a.call(t,e)},t.JSON&&(r.parseJSON=JSON.parse),r.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){S["[object "+e+"]"]=e.toLowerCase()}),r.fn={constructor:N.Z,length:0,forEach:o.forEach,reduce:o.reduce,push:o.push,sort:o.sort,splice:o.splice,indexOf:o.indexOf,concat:function(){var t,e,n=[];for(t=0;t<arguments.length;t++)e=arguments[t],n[t]=N.isZ(e)?e.toArray():e;return s.apply(N.isZ(this)?this.toArray():this,n)},map:function(t){return r(r.map(this,function(e,n){return t.call(e,n,e)}))},slice:function(){return r(u.apply(this,arguments))},ready:function(t){return w.test(f.readyState)&&f.body?t(r):f.addEventListener("DOMContentLoaded",function(){t(r)},!1),this},get:function(t){return t===e?u.call(this):this[t>=0?t:t+this.length]},toArray:function(){return this.get()},size:function(){return this.length},remove:function(){return this.each(function(){null!=this.parentNode&&this.parentNode.removeChild(this)})},each:function(t){return o.every.call(this,function(e,n){return t.call(e,n,e)!==!1}),this},filter:function(t){return F(t)?this.not(this.not(t)):r(a.call(this,function(e){return N.matches(e,t)}))},add:function(t,e){return r(P(this.concat(r(t,e))))},is:function(t){return this.length>0&&N.matches(this[0],t)},not:function(t){var n=[];if(F(t)&&t.call!==e)this.each(function(e){t.call(this,e)||n.push(this)});else{var i="string"==typeof t?this.filter(t):z(t)&&F(t.item)?u.call(t):r(t);this.forEach(function(t){i.indexOf(t)<0&&n.push(t)})}return r(n)},has:function(t){return this.filter(function(){return R(t)?r.contains(this,t):r(this).find(t).size()})},eq:function(t){return-1===t?this.slice(t):this.slice(t,+t+1)},first:function(){var t=this[0];return t&&!R(t)?t:r(t)},last:function(){var t=this[this.length-1];return t&&!R(t)?t:r(t)},find:function(t){var e,n=this;return e=t?"object"==typeof t?r(t).filter(function(){var t=this;return o.some.call(n,function(e){return r.contains(e,t)})}):1==this.length?r(N.qsa(this[0],t)):this.map(function(){return N.qsa(this,t)}):r()},closest:function(t,e){var n=[],i="object"==typeof t&&r(t);return this.each(function(r,o){for(;o&&!(i?i.indexOf(o)>=0:N.matches(o,t));)o=o!==e&&!M(o)&&o.parentNode;o&&n.indexOf(o)<0&&n.push(o)}),r(n)},parents:function(t){for(var e=[],n=this;n.length>0;)n=r.map(n,function(t){return(t=t.parentNode)&&!M(t)&&e.indexOf(t)<0?(e.push(t),t):void 0});return W(e,t)},parent:function(t){return W(P(this.pluck("parentNode")),t)},children:function(t){return W(this.map(function(){return U(this)}),t)},contents:function(){return this.map(function(){return this.contentDocument||u.call(this.childNodes)})},siblings:function(t){return W(this.map(function(t,e){return a.call(U(e.parentNode),function(t){return t!==e})}),t)},empty:function(){return this.each(function(){this.innerHTML=""})},pluck:function(t){return r.map(this,function(e){return e[t]})},show:function(){return this.each(function(){"none"==this.style.display&&(this.style.display=""),"none"==getComputedStyle(this,"").getPropertyValue("display")&&(this.style.display=B(this.nodeName))})},replaceWith:function(t){return this.before(t).remove()},wrap:function(t){var e=F(t);if(this[0]&&!e)var n=r(t).get(0),i=n.parentNode||this.length>1;return this.each(function(o){r(this).wrapAll(e?t.call(this,o):i?n.cloneNode(!0):n)})},wrapAll:function(t){if(this[0]){r(this[0]).before(t=r(t));for(var e;(e=t.children()).length;)t=e.first();r(t).append(this)}return this},wrapInner:function(t){var e=F(t);return this.each(function(n){var i=r(this),o=i.contents(),s=e?t.call(this,n):t;o.length?o.wrapAll(s):i.append(s)})},unwrap:function(){return this.parent().each(function(){r(this).replaceWith(r(this).children())}),this},clone:function(){return this.map(function(){return this.cloneNode(!0)})},hide:function(){return this.css("display","none")},toggle:function(t){return this.each(function(){var n=r(this);(t===e?"none"==n.css("display"):t)?n.show():n.hide()})},prev:function(t){return r(this.pluck("previousElementSibling")).filter(t||"*")},next:function(t){return r(this.pluck("nextElementSibling")).filter(t||"*")},html:function(t){return 0 in arguments?this.each(function(e){var n=this.innerHTML;r(this).empty().append(Y(this,t,e,n))}):0 in this?this[0].innerHTML:null},text:function(t){return 0 in arguments?this.each(function(e){var n=Y(this,t,e,this.textContent);this.textContent=null==n?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function(t,r){var i;return"string"!=typeof t||1 in arguments?this.each(function(e){if(1===this.nodeType)if(R(t))for(n in t)G(this,n,t[n]);else G(this,t,Y(this,r,e,this.getAttribute(t)))}):0 in this&&1==this[0].nodeType&&null!=(i=this[0].getAttribute(t))?i:e},removeAttr:function(t){return this.each(function(){1===this.nodeType&&t.split(" ").forEach(function(t){G(this,t)},this)})},prop:function(t,e){return t=D[t]||t,1 in arguments?this.each(function(n){this[t]=Y(this,e,n,this[t])}):this[0]&&this[0][t]},removeProp:function(t){return t=D[t]||t,this.each(function(){delete this[t]})},data:function(t,n){var r="data-"+t.replace(v,"-$1").toLowerCase(),i=1 in arguments?this.attr(r,n):this.attr(r);return null!==i?Q(i):e},val:function(t){return 0 in arguments?(null==t&&(t=""),this.each(function(e){this.value=Y(this,t,e,this.value)})):this[0]&&(this[0].multiple?r(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function(e){if(e)return this.each(function(t){var n=r(this),i=Y(this,e,t,n.offset()),o=n.offsetParent().offset(),s={top:i.top-o.top,left:i.left-o.left};"static"==n.css("position")&&(s.position="relative"),n.css(s)});if(!this.length)return null;if(f.documentElement!==this[0]&&!r.contains(f.documentElement,this[0]))return{top:0,left:0};var n=this[0].getBoundingClientRect();return{left:n.left+t.pageXOffset,top:n.top+t.pageYOffset,width:Math.round(n.width),height:Math.round(n.height)}},css:function(t,e){if(arguments.length<2){var i=this[0];if("string"==typeof t){if(!i)return;return i.style[O(t)]||getComputedStyle(i,"").getPropertyValue(t)}if(L(t)){if(!i)return;var o={},s=getComputedStyle(i,"");return r.each(t,function(t,e){o[e]=i.style[O(e)]||s.getPropertyValue(e)}),o}}var a="";if("string"==$(t))e||0===e?a=I(t)+":"+_(t,e):this.each(function(){this.style.removeProperty(I(t))});else for(n in t)t[n]||0===t[n]?a+=I(n)+":"+_(n,t[n])+";":this.each(function(){this.style.removeProperty(I(n))});return this.each(function(){this.style.cssText+=";"+a})},index:function(t){return t?this.indexOf(r(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function(t){return t?o.some.call(this,function(t){return this.test(K(t))},V(t)):!1},addClass:function(t){return t?this.each(function(e){if("className"in this){i=[];var n=K(this),o=Y(this,t,e,n);o.split(/\s+/g).forEach(function(t){r(this).hasClass(t)||i.push(t)},this),i.length&&K(this,n+(n?" ":"")+i.join(" "))}}):this},removeClass:function(t){return this.each(function(n){if("className"in this){if(t===e)return K(this,"");i=K(this),Y(this,t,n,i).split(/\s+/g).forEach(function(t){i=i.replace(V(t)," ")}),K(this,i.trim())}})},toggleClass:function(t,n){return t?this.each(function(i){var o=r(this),s=Y(this,t,i,K(this));s.split(/\s+/g).forEach(function(t){(n===e?!o.hasClass(t):n)?o.addClass(t):o.removeClass(t)})}):this},scrollTop:function(t){if(this.length){var n="scrollTop"in this[0];return t===e?n?this[0].scrollTop:this[0].pageYOffset:this.each(n?function(){this.scrollTop=t}:function(){this.scrollTo(this.scrollX,t)})}},scrollLeft:function(t){if(this.length){var n="scrollLeft"in this[0];return t===e?n?this[0].scrollLeft:this[0].pageXOffset:this.each(n?function(){this.scrollLeft=t}:function(){this.scrollTo(t,this.scrollY)})}},position:function(){if(this.length){var t=this[0],e=this.offsetParent(),n=this.offset(),i=g.test(e[0].nodeName)?{top:0,left:0}:e.offset();return n.top-=parseFloat(r(t).css("margin-top"))||0,n.left-=parseFloat(r(t).css("margin-left"))||0,i.top+=parseFloat(r(e[0]).css("border-top-width"))||0,i.left+=parseFloat(r(e[0]).css("border-left-width"))||0,{top:n.top-i.top,left:n.left-i.left}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||f.body;t&&!g.test(t.nodeName)&&"static"==r(t).css("position");)t=t.offsetParent;return t})}},r.fn.detach=r.fn.remove,["width","height"].forEach(function(t){var n=t.replace(/./,function(t){return t[0].toUpperCase()});r.fn[t]=function(i){var o,s=this[0];return i===e?k(s)?s["inner"+n]:M(s)?s.documentElement["scroll"+n]:(o=this.offset())&&o[t]:this.each(function(e){s=r(this),s.css(t,Y(this,i,e,s[t]()))})}}),x.forEach(function(n,i){var o=i%2;r.fn[n]=function(){var n,a,s=r.map(arguments,function(t){var i=[];return n=$(t),"array"==n?(t.forEach(function(t){return t.nodeType!==e?i.push(t):r.zepto.isZ(t)?i=i.concat(t.get()):void(i=i.concat(N.fragment(t)))}),i):"object"==n||null==t?t:N.fragment(t)}),u=this.length>1;return s.length<1?this:this.each(function(e,n){a=o?n:n.parentNode,n=0==i?n.nextSibling:1==i?n.firstChild:2==i?n:null;var c=r.contains(f.documentElement,a);s.forEach(function(e){if(u)e=e.cloneNode(!0);else if(!a)return r(e).remove();a.insertBefore(e,n),c&&tt(e,function(e){if(!(null==e.nodeName||"SCRIPT"!==e.nodeName.toUpperCase()||e.type&&"text/javascript"!==e.type||e.src)){var n=e.ownerDocument?e.ownerDocument.defaultView:t;n.eval.call(n,e.innerHTML)}})})})},r.fn[o?n+"To":"insert"+(i?"Before":"After")]=function(t){return r(t)[n](this),this}}),N.Z.prototype=X.prototype=r.fn,N.uniq=P,N.deserializeValue=Q,r.zepto=N,r}();return t.Zepto=e,void 0===t.$&&(t.$=e),function(e){function h(t){return t._zid||(t._zid=n++)}function p(t,e,n,r){if(e=d(e),e.ns)var i=m(e.ns);return(a[h(t)]||[]).filter(function(t){return t&&(!e.e||t.e==e.e)&&(!e.ns||i.test(t.ns))&&(!n||h(t.fn)===h(n))&&(!r||t.sel==r)})}function d(t){var e=(""+t).split(".");return{e:e[0],ns:e.slice(1).sort().join(" ")}}function m(t){return new RegExp("(?:^| )"+t.replace(" "," .* ?")+"(?: |$)")}function g(t,e){return t.del&&!f&&t.e in c||!!e}function v(t){return l[t]||f&&c[t]||t}function y(t,n,i,o,s,u,f){var c=h(t),p=a[c]||(a[c]=[]);n.split(/\s/).forEach(function(n){if("ready"==n)return e(document).ready(i);var a=d(n);a.fn=i,a.sel=s,a.e in l&&(i=function(t){var n=t.relatedTarget;return!n||n!==this&&!e.contains(this,n)?a.fn.apply(this,arguments):void 0}),a.del=u;var c=u||i;a.proxy=function(e){if(e=T(e),!e.isImmediatePropagationStopped()){e.data=o;var n=c.apply(t,e._args==r?[e]:[e].concat(e._args));return n===!1&&(e.preventDefault(),e.stopPropagation()),n}},a.i=p.length,p.push(a),"addEventListener"in t&&t.addEventListener(v(a.e),a.proxy,g(a,f))})}function x(t,e,n,r,i){var o=h(t);(e||"").split(/\s/).forEach(function(e){p(t,e,n,r).forEach(function(e){delete a[o][e.i],"removeEventListener"in t&&t.removeEventListener(v(e.e),e.proxy,g(e,i))})})}function T(t,n){return(n||!t.isDefaultPrevented)&&(n||(n=t),e.each(w,function(e,r){var i=n[e];t[e]=function(){return this[r]=b,i&&i.apply(n,arguments)},t[r]=E}),t.timeStamp||(t.timeStamp=Date.now()),(n.defaultPrevented!==r?n.defaultPrevented:"returnValue"in n?n.returnValue===!1:n.getPreventDefault&&n.getPreventDefault())&&(t.isDefaultPrevented=b)),t}function S(t){var e,n={originalEvent:t};for(e in t)j.test(e)||t[e]===r||(n[e]=t[e]);return T(n,t)}var r,n=1,i=Array.prototype.slice,o=e.isFunction,s=function(t){return"string"==typeof t},a={},u={},f="onfocusin"in t,c={focus:"focusin",blur:"focusout"},l={mouseenter:"mouseover",mouseleave:"mouseout"};u.click=u.mousedown=u.mouseup=u.mousemove="MouseEvents",e.event={add:y,remove:x},e.proxy=function(t,n){var r=2 in arguments&&i.call(arguments,2);if(o(t)){var a=function(){return t.apply(n,r?r.concat(i.call(arguments)):arguments)};return a._zid=h(t),a}if(s(n))return r?(r.unshift(t[n],t),e.proxy.apply(null,r)):e.proxy(t[n],t);throw new TypeError("expected function")},e.fn.bind=function(t,e,n){return this.on(t,e,n)},e.fn.unbind=function(t,e){return this.off(t,e)},e.fn.one=function(t,e,n,r){return this.on(t,e,n,r,1)};var b=function(){return!0},E=function(){return!1},j=/^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/,w={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,e,n){return this.on(e,t,n)},e.fn.undelegate=function(t,e,n){return this.off(e,t,n)},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,a,u,f){var c,l,h=this;return t&&!s(t)?(e.each(t,function(t,e){h.on(t,n,a,e,f)}),h):(s(n)||o(u)||u===!1||(u=a,a=n,n=r),(u===r||a===!1)&&(u=a,a=r),u===!1&&(u=E),h.each(function(r,o){f&&(c=function(t){return x(o,t.type,u),u.apply(this,arguments)}),n&&(l=function(t){var r,s=e(t.target).closest(n,o).get(0);return s&&s!==o?(r=e.extend(S(t),{currentTarget:s,liveFired:o}),(c||u).apply(s,[r].concat(i.call(arguments,1)))):void 0}),y(o,t,u,a,n,l||c)}))},e.fn.off=function(t,n,i){var a=this;return t&&!s(t)?(e.each(t,function(t,e){a.off(t,n,e)}),a):(s(n)||o(i)||i===!1||(i=n,n=r),i===!1&&(i=E),a.each(function(){x(this,t,i,n)}))},e.fn.trigger=function(t,n){return t=s(t)||e.isPlainObject(t)?e.Event(t):T(t),t._args=n,this.each(function(){t.type in c&&"function"==typeof this[t.type]?this[t.type]():"dispatchEvent"in this?this.dispatchEvent(t):e(this).triggerHandler(t,n)})},e.fn.triggerHandler=function(t,n){var r,i;return this.each(function(o,a){r=S(s(t)?e.Event(t):t),r._args=n,r.target=a,e.each(p(a,t.type||t),function(t,e){return i=e.proxy(r),r.isImmediatePropagationStopped()?!1:void 0})}),i},"focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return 0 in arguments?this.bind(t,e):this.trigger(t)}}),e.Event=function(t,e){s(t)||(e=t,t=e.type);var n=document.createEvent(u[t]||"Events"),r=!0;if(e)for(var i in e)"bubbles"==i?r=!!e[i]:n[i]=e[i];return n.initEvent(t,r,!0),T(n)}}(e),function(e){function p(t,n,r){var i=e.Event(n);return e(t).trigger(i,r),!i.isDefaultPrevented()}function d(t,e,n,i){return t.global?p(e||r,n,i):void 0}function m(t){t.global&&0===e.active++&&d(t,null,"ajaxStart")}function g(t){t.global&&!--e.active&&d(t,null,"ajaxStop")}function v(t,e){var n=e.context;return e.beforeSend.call(n,t,e)===!1||d(e,n,"ajaxBeforeSend",[t,e])===!1?!1:void d(e,n,"ajaxSend",[t,e])}function y(t,e,n,r){var i=n.context,o="success";n.success.call(i,t,o,e),r&&r.resolveWith(i,[t,o,e]),d(n,i,"ajaxSuccess",[e,n,t]),b(o,e,n)}function x(t,e,n,r,i){var o=r.context;r.error.call(o,n,e,t),i&&i.rejectWith(o,[n,e,t]),d(r,o,"ajaxError",[n,r,t||e]),b(e,n,r)}function b(t,e,n){var r=n.context;n.complete.call(r,e,t),d(n,r,"ajaxComplete",[e,n]),g(n)}function E(t,e,n){if(n.dataFilter==j)return t;var r=n.context;return n.dataFilter.call(r,t,e)}function j(){}function w(t){return t&&(t=t.split(";",2)[0]),t&&(t==c?"html":t==f?"json":a.test(t)?"script":u.test(t)&&"xml")||"text"}function T(t,e){return""==e?t:(t+"&"+e).replace(/[&?]{1,2}/,"?")}function S(t){t.processData&&t.data&&"string"!=e.type(t.data)&&(t.data=e.param(t.data,t.traditional)),!t.data||t.type&&"GET"!=t.type.toUpperCase()&&"jsonp"!=t.dataType||(t.url=T(t.url,t.data),t.data=void 0)}function C(t,n,r,i){return e.isFunction(n)&&(i=r,r=n,n=void 0),e.isFunction(r)||(i=r,r=void 0),{url:t,data:n,success:r,dataType:i}}function O(t,n,r,i){var o,s=e.isArray(n),a=e.isPlainObject(n);e.each(n,function(n,u){o=e.type(u),i&&(n=r?i:i+"["+(a||"object"==o||"array"==o?n:"")+"]"),!i&&s?t.add(u.name,u.value):"array"==o||!r&&"object"==o?O(t,u,r,n):t.add(n,u)})}var i,o,n=+new Date,r=t.document,s=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,a=/^(?:text|application)\/javascript/i,u=/^(?:text|application)\/xml/i,f="application/json",c="text/html",l=/^\s*$/,h=r.createElement("a");h.href=t.location.href,e.active=0,e.ajaxJSONP=function(i,o){if(!("type"in i))return e.ajax(i);var c,p,s=i.jsonpCallback,a=(e.isFunction(s)?s():s)||"Zepto"+n++,u=r.createElement("script"),f=t[a],l=function(t){e(u).triggerHandler("error",t||"abort")},h={abort:l};return o&&o.promise(h),e(u).on("load error",function(n,r){clearTimeout(p),e(u).off().remove(),"error"!=n.type&&c?y(c[0],h,i,o):x(null,r||"error",h,i,o),t[a]=f,c&&e.isFunction(f)&&f(c[0]),f=c=void 0}),v(h,i)===!1?(l("abort"),h):(t[a]=function(){c=arguments},u.src=i.url.replace(/\?(.+)=\?/,"?$1="+a),r.head.appendChild(u),i.timeout>0&&(p=setTimeout(function(){l("timeout")},i.timeout)),h)},e.ajaxSettings={type:"GET",beforeSend:j,success:j,error:j,complete:j,context:null,global:!0,xhr:function(){return new t.XMLHttpRequest},accepts:{script:"text/javascript, application/javascript, application/x-javascript",json:f,xml:"application/xml, text/xml",html:c,text:"text/plain"},crossDomain:!1,timeout:0,processData:!0,cache:!0,dataFilter:j},e.ajax=function(n){var u,f,s=e.extend({},n||{}),a=e.Deferred&&e.Deferred();for(i in e.ajaxSettings)void 0===s[i]&&(s[i]=e.ajaxSettings[i]);m(s),s.crossDomain||(u=r.createElement("a"),u.href=s.url,u.href=u.href,s.crossDomain=h.protocol+"//"+h.host!=u.protocol+"//"+u.host),s.url||(s.url=t.location.toString()),(f=s.url.indexOf("#"))>-1&&(s.url=s.url.slice(0,f)),S(s);var c=s.dataType,p=/\?.+=\?/.test(s.url);if(p&&(c="jsonp"),s.cache!==!1&&(n&&n.cache===!0||"script"!=c&&"jsonp"!=c)||(s.url=T(s.url,"_="+Date.now())),"jsonp"==c)return p||(s.url=T(s.url,s.jsonp?s.jsonp+"=?":s.jsonp===!1?"":"callback=?")),e.ajaxJSONP(s,a);var P,d=s.accepts[c],g={},b=function(t,e){g[t.toLowerCase()]=[t,e]},C=/^([\w-]+:)\/\//.test(s.url)?RegExp.$1:t.location.protocol,N=s.xhr(),O=N.setRequestHeader;if(a&&a.promise(N),s.crossDomain||b("X-Requested-With","XMLHttpRequest"),b("Accept",d||"*/*"),(d=s.mimeType||d)&&(d.indexOf(",")>-1&&(d=d.split(",",2)[0]),N.overrideMimeType&&N.overrideMimeType(d)),(s.contentType||s.contentType!==!1&&s.data&&"GET"!=s.type.toUpperCase())&&b("Content-Type",s.contentType||"application/x-www-form-urlencoded"),s.headers)for(o in s.headers)b(o,s.headers[o]);if(N.setRequestHeader=b,N.onreadystatechange=function(){if(4==N.readyState){N.onreadystatechange=j,clearTimeout(P);var t,n=!1;if(N.status>=200&&N.status<300||304==N.status||0==N.status&&"file:"==C){if(c=c||w(s.mimeType||N.getResponseHeader("content-type")),"arraybuffer"==N.responseType||"blob"==N.responseType)t=N.response;else{t=N.responseText;try{t=E(t,c,s),"script"==c?(1,eval)(t):"xml"==c?t=N.responseXML:"json"==c&&(t=l.test(t)?null:e.parseJSON(t))}catch(r){n=r}if(n)return x(n,"parsererror",N,s,a)}y(t,N,s,a)}else x(N.statusText||null,N.status?"error":"abort",N,s,a)}},v(N,s)===!1)return N.abort(),x(null,"abort",N,s,a),N;var A="async"in s?s.async:!0;if(N.open(s.type,s.url,A,s.username,s.password),s.xhrFields)for(o in s.xhrFields)N[o]=s.xhrFields[o];for(o in g)O.apply(N,g[o]);return s.timeout>0&&(P=setTimeout(function(){N.onreadystatechange=j,N.abort(),x(null,"timeout",N,s,a)},s.timeout)),N.send(s.data?s.data:null),N},e.get=function(){return e.ajax(C.apply(null,arguments))},e.post=function(){var t=C.apply(null,arguments);return t.type="POST",e.ajax(t)},e.getJSON=function(){var t=C.apply(null,arguments);return t.dataType="json",e.ajax(t)},e.fn.load=function(t,n,r){if(!this.length)return this;var a,i=this,o=t.split(/\s/),u=C(t,n,r),f=u.success;return o.length>1&&(u.url=o[0],a=o[1]),u.success=function(t){i.html(a?e("<div>").html(t.replace(s,"")).find(a):t),f&&f.apply(i,arguments)},e.ajax(u),this};var N=encodeURIComponent;e.param=function(t,n){var r=[];return r.add=function(t,n){e.isFunction(n)&&(n=n()),null==n&&(n=""),this.push(N(t)+"="+N(n))},O(r,t,n),r.join("&").replace(/%20/g,"+")}}(e),function(t){t.fn.serializeArray=function(){var e,n,r=[],i=function(t){return t.forEach?t.forEach(i):void r.push({name:e,value:t})};return this[0]&&t.each(this[0].elements,function(r,o){n=o.type,e=o.name,e&&"fieldset"!=o.nodeName.toLowerCase()&&!o.disabled&&"submit"!=n&&"reset"!=n&&"button"!=n&&"file"!=n&&("radio"!=n&&"checkbox"!=n||o.checked)&&i(t(o).val())}),r},t.fn.serialize=function(){var t=[];return this.serializeArray().forEach(function(e){t.push(encodeURIComponent(e.name)+"="+encodeURIComponent(e.value))}),t.join("&")},t.fn.submit=function(e){if(0 in arguments)this.bind("submit",e);else if(this.length){var n=t.Event("submit");this.eq(0).trigger(n),n.isDefaultPrevented()||this.get(0).submit()}return this}}(e),function(){try{getComputedStyle(void 0)}catch(e){var n=getComputedStyle;t.getComputedStyle=function(t,e){try{return n(t,e)}catch(r){return null}}}}(),e});
}.call(window));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var index$2 = function isMergeableObject(value) {
	return isNonNullObject(value) && isNotSpecial(value)
};

function isNonNullObject(value) {
	return !!value && typeof value === 'object'
}

function isNotSpecial(value) {
	var stringValue = Object.prototype.toString.call(value);

	return stringValue !== '[object RegExp]'
		&& stringValue !== '[object Date]'
}

function emptyTarget(val) {
    return Array.isArray(val) ? [] : {}
}

function cloneIfNecessary(value, optionsArgument) {
    var clone = optionsArgument && optionsArgument.clone === true;
    return (clone && index$2(value)) ? deepmerge(emptyTarget(value), value, optionsArgument) : value
}

function defaultArrayMerge(target, source, optionsArgument) {
    var destination = target.slice();
    source.forEach(function(e, i) {
        if (typeof destination[i] === 'undefined') {
            destination[i] = cloneIfNecessary(e, optionsArgument);
        } else if (index$2(e)) {
            destination[i] = deepmerge(target[i], e, optionsArgument);
        } else if (target.indexOf(e) === -1) {
            destination.push(cloneIfNecessary(e, optionsArgument));
        }
    });
    return destination
}

function mergeObject(target, source, optionsArgument) {
    var destination = {};
    if (index$2(target)) {
        Object.keys(target).forEach(function(key) {
            destination[key] = cloneIfNecessary(target[key], optionsArgument);
        });
    }
    Object.keys(source).forEach(function(key) {
        if (!index$2(source[key]) || !target[key]) {
            destination[key] = cloneIfNecessary(source[key], optionsArgument);
        } else {
            destination[key] = deepmerge(target[key], source[key], optionsArgument);
        }
    });
    return destination
}

function deepmerge(target, source, optionsArgument) {
    var sourceIsArray = Array.isArray(source);
    var targetIsArray = Array.isArray(target);
    var options = optionsArgument || { arrayMerge: defaultArrayMerge };
    var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

    if (!sourceAndTargetTypesMatch) {
        return cloneIfNecessary(source, optionsArgument)
    } else if (sourceIsArray) {
        var arrayMerge = options.arrayMerge || defaultArrayMerge;
        return arrayMerge(target, source, optionsArgument)
    } else {
        return mergeObject(target, source, optionsArgument)
    }
}

deepmerge.all = function deepmergeAll(array, optionsArgument) {
    if (!Array.isArray(array) || array.length < 2) {
        throw new Error('first argument should be an array with at least two elements')
    }

    // we are sure there are at least 2 values, so it is safe to have no initial value
    return array.reduce(function(prev, next) {
        return deepmerge(prev, next, optionsArgument)
    })
};

var index = deepmerge;

module.exports = index;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _qs = __webpack_require__(13);

var _qs2 = _interopRequireDefault(_qs);

var _FKSystem = __webpack_require__(1);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Param = function () {
  function Param(ctx, drawArmsFn, updateFn) {
    var _this = this;

    _classCallCheck(this, Param);

    this.drawSpeed = 30;
    this.rewind = false;
    this.lineWidth = 0.7;
    this.running = false;
    this.colorChangePeriod = 20;
    this.runMode = 'autorun';
    this.drawMode = _FKSystem.FKDrawMode.trippy;
    this.hideArms = false;
    this.changeColorTimes = 0;
    this.armLengths = [0.6, 0.2, 0.2];

    this.ctx = ctx;
    this.drawArmsFn = drawArmsFn;
    this.updateFn = updateFn;

    this.gui = _qs2.default
    //.setDraggable(false)
    //.setCollapsible(false)
    .setGlobalChangeHandler(this.onChange.bind(this)).addDropDown('runMode', ['autorun', 'press-to-run']).addRange('drawSpeed', 0, 500, this.drawSpeed, 1).addBoolean('rewind', this.rewind).addRange('lineWidth', 0, 6, this.lineWidth, 0.1).addRange('colorChangePeriod', 2, 300, this.colorChangePeriod).addButton('changeColor').addMultpleRange("arm length", '0.6 0.8', function (values) {
      var armLengths = values.sort(function (a, b) {
        return a - b;
      });
      _this.armLengths = armLengths.map(function (stop, index) {
        return index === 0 ? stop : stop - armLengths[index - 1];
      });
      _this.armLengths.push(1 - armLengths.pop());

      _this.fk.arms.forEach(function (arm, i) {
        return arm.length = _this.armLengths[i] * _this.fk.maxLen;
      });
      _this.fk.updateArms();
      _this.drawArmsFn();
    }).addBoolean('hideArms', this.hideArms).addButton('clear').addButton('restart');

    document.querySelector('.qs_main').classList.add('scroll');
  }

  _createClass(Param, [{
    key: 'setFk',
    value: function setFk(fk) {
      this.fk = fk;
      console.log(_utils.uniq.apply(undefined, [this.fk.drawMode].concat(_toConsumableArray(Object.values(_FKSystem.FKDrawMode)))));
      this.gui.addDropDown('drawMode', _utils.uniq.apply(undefined, [this.fk.drawMode].concat(_toConsumableArray(Object.values(_FKSystem.FKDrawMode)))));
    }
  }, {
    key: 'setRunning',
    value: function setRunning() {
      this.running = !this.running;
      if (this.running) this.updateFn();
    }
  }, {
    key: 'restart',
    value: function restart() {
      this.clear();
      this.fk.reset();
    }
  }, {
    key: 'clear',
    value: function clear() {
      var canvas = this.ctx.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, {
    key: 'changeColor',
    value: function changeColor() {
      this.changeColorTimes++;
    }
  }, {
    key: 'onChange',
    value: function onChange(key) {
      switch (_typeof(this[key])) {
        case 'function':
          this[key]();
          break;
        default:
          if (key === 'runMode') {
            this.setRunning();
            this.runMode = this.gui.getValue(key).value;
            return;
          }
          if (key === 'drawMode') {
            this.drawMode = this.gui.getValue(key).value;
            this.fk.setDrawMode(this.drawMode);
            return;
          }

          this[key] = this.gui.getValue(key);
          if (key === 'hideArms') {
            this.drawArmsFn();
          }
      }
    }
  }]);

  return Param;
}();

exports.default = Param;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var QuickSettings = __webpack_require__(14);

QuickSettings.useExtStyleSheet();
var qs = QuickSettings.create(document.body.clientWidth - 40, 20, 'Control Panel');
qs.addMultpleRange = function (title, values, callback) {
  var s = '<input type="range" class="multiRange qs_range" min="0" step="0.01" max="1" data-values="' + values + '">';
  var div = document.createElement('div');
  div.innerHTML = s;
  var elm = div.children[0];

  qs.addElement(title, div);

  var eventName = "input";
  // if (type === "range" && isIE()) {
  //     eventName = "change";
  // }
  var values = elm.getAttribute('data-values').split(' ');
  values.forEach(function (value, i, values) {
    var rangePart = elm.cloneNode();
    rangePart.type = 'range';
    rangePart.removeAttribute('data-values');
    rangePart.value = value;
    rangePart = div.insertBefore(rangePart, elm);

    rangePart.addEventListener(eventName, function () {
      var values = Array.prototype.map.call(div.querySelectorAll('input'), function (input) {
        return parseFloat(input.value);
      });
      callback(values);
    }, false);
  });
  elm.remove();
  return this;
};

qs.collapse();
var $main = document.querySelector('.qs_main');
var $title = document.querySelector('.qs_title_bar');
$title.innerHTML = '<span>' + $title.textContent + '</span>';
var $toggleExpand = document.createElement('i');
$toggleExpand.classList.add('qs_toggle');
$main.appendChild($toggleExpand);

var expandWidth = $main.clientWidth;
$main.classList.add('qs_collapse');
var isCollapse = true;
var collapseWidth = $main.clientWidth;

$main.setAttribute('tabindex', -1);
document.body.addEventListener('mousedown', function (e) {
  // this is vanilla.js way of delegate blur event
  if (!e.target.matches('.qs_main, .qs_main *') && !qs._collapsed) {
    $main.classList.toggle('qs_collapse');
    adjustPosition(qs._collapsed);
    qs.collapse();
  }
}, false);

$title.addEventListener('dblclick', function () {
  adjustPosition(!qs._collapsed);
  $main.classList.toggle('qs_collapse');
}, false);

$toggleExpand.addEventListener('click', function (e) {
  $main.classList.toggle('qs_collapse');
  adjustPosition(qs._collapsed);
  qs._collapsed ? qs.expand() : qs.collapse();
}, false);

function adjustPosition(isCollapse) {
  // var needCollapse = (isCollapse ? -1 : 1) 
  //   * (expandWidth - collapseWidth);
  // $main.style.left = Number.parseFloat($main.style.left) 
  //   + needCollapse + 'px';
}

exports.default = qs;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

!function(){function a(){return"qs_"+ ++i}function b(a,b){var c=d("div",null,"qs_label",b);return c.innerHTML=a,c}function c(a,b,c,e){var f=d("input",b,c,e);return f.type=a,f}function d(a,b,c,d){var e=document.createElement(a);if(e)return e.id=b,c&&(e.className=c),d&&d.appendChild(e),e}function e(){return-1!=navigator.userAgent.indexOf("rv:11")||-1!=navigator.userAgent.indexOf("MSIE")}function f(){var a=navigator.userAgent.toLowerCase();return!(a.indexOf("chrome")>-1||a.indexOf("firefox")>-1||a.indexOf("epiphany")>-1)&&a.indexOf("safari/")>-1}function g(){return navigator.userAgent.toLowerCase().indexOf("edge")>-1}function h(){var a=document.createElement("style");a.innerText=k,document.head.appendChild(a),j=!0}var i=0,j=!1,k=".qs_main{background-color:#dddddd;text-align:left;position:absolute;width:200px;font:12px sans-serif;box-shadow:5px 5px 8px rgba(0,0,0,0.35);user-select:none;-webkit-user-select:none;color:#000000;border:none}.qs_content{background-color:#cccccc;overflow-y:auto}.qs_title_bar{background-color:#eeeeee;user-select:none;-webkit-user-select:none;cursor:pointer;padding:5px;font-weight:bold;border:none;color:#000000}.qs_container{margin:5px;padding:5px;background-color:#eeeeee;border:none;position:relative}.qs_container_selected{border:none;background-color:#ffffff}.qs_range{-webkit-appearance:none;-moz-appearance:none;width:100%;height:17px;padding:0;margin:0;background-color:transparent;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_range:focus{outline:none;border:none}.qs_range::-webkit-slider-runnable-track{width:100%;height:15px;cursor:pointer;background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-webkit-slider-runnable-track{background:#cccccc}.qs_range::-webkit-slider-thumb{-webkit-appearance:none;height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999999;cursor:pointer;margin-top:0}.qs_range::-moz-range-track{width:100%;height:15px;cursor:pointer;background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range::-moz-range-thumb{height:15px;width:15px;border:none;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999999;cursor:pointer}.qs_range::-ms-track{width:100%;height:15px;cursor:pointer;visibility:hidden;background:transparent}.qs_range::-ms-thumb{height:15px;width:15px;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;background:#999999;cursor:pointer;border:none}.qs_range::-ms-fill-lower{background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-lower{background:#cccccc}.qs_range::-ms-fill-upper{background:#cccccc;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0}.qs_range:focus::-ms-fill-upper{background:#cccccc}.qs_button{background-color:#f6f6f6;color:#000000;height:30px;border:1px solid #aaaaaa;font:12px sans-serif}.qs_button:active{background-color:#ffffff;border:1px solid #aaaaaa}.qs_button:focus{border:1px solid #aaaaaa;outline:none}.qs_checkbox{cursor:pointer;display:inline}.qs_checkbox input{position:absolute;left:-99999px}.qs_checkbox span{height:16px;width:100%;display:block;text-indent:20px;background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAALklEQVQ4T2OcOXPmfwYKACPIgLS0NLKMmDVrFsOoAaNhMJoOGBioFwZkZUWoJgApdFaxjUM1YwAAAABJRU5ErkJggg==') no-repeat}.qs_checkbox input:checked+span{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvElEQVQ4T63Tyw2EIBAA0OFKBxBL40wDRovAUACcKc1IB1zZDAkG18GYZTmSmafzgTnnMgwchoDWGlJKheGcP3JtnPceCqCUAmttSZznuYtgchsXQrgC+77DNE0kUpPbmBOoJaBOIVQylnqWgAAeKhDve/AN+EaklJBzhhgjWRoJVGTbNjiOowAIret6a+4jYIwpX8aDwLIs74C2D0IIYIyVP6Gm898m9kbVm85ljHUTf16k4VUefkwDrxk+zoUEwCt0GbUAAAAASUVORK5CYII=') no-repeat}.qs_checkbox_label{position:absolute;top:7px;left:30px}.qs_label{margin-bottom:3px;user-select:none;-webkit-user-select:none;cursor:default;font:12px sans-serif}.qs_text_input{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;width:100%;padding:0 0 0 5px;height:24px;border:1px inset #ffffff;background-color:#ffffff;color:#000000;font-size:12px}.qs_text_input:focus{outline:none;background:#ffffff;border:1px inset #ffffff}.qs_select{background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAp0lEQVRIS+2SsQ3FIAwF7RVYhA5mgQFhFuhYhJKWL0eKxI8SGylKZ0p4+OBsHGNM+HChAiS7qkgyBKrovaLeOxhjbgtxZ+cFtgelFMg5QwgBvPd/EO5sDbKAlBLUWo/8CjmL075zDmKMj6rEKbpCqBL9aqc4ZUQAhVbInBMQUXz5Vg/WfxOktXZsWWtZLds9uIqlqaH1NFV3jdhSJA47E1CAaE8ViYp+wGiWMZ/T+cgAAAAASUVORK5CYII=') no-repeat right #f6f6f6;-webkit-appearance:none;-moz-appearance:none;appearance:none;color:#000000;width:100%;height:24px;border:1px solid #aaaaaa;-webkit-border-radius:0;-moz-border-radius:0;border-radius:0;padding:0 5px;-moz-outline:none;font-size:14px}.qs_select option{font-size:14px}.qs_select::-ms-expand{display:none}.qs_select:focus{outline:none}.qs_number{height:24px}.qs_image{width:100%}.qs_progress{width:100%;height:15px;background-color:#cccccc;border:none;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_progress_value{height:100%;background-color:#999999}.qs_textarea{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;resize:vertical;width:100%;padding:3px 5px;border:1px inset #ffffff;background-color:#ffffff;color:#000000;font-size:12px}.qs_textarea:focus{outline:none;background:#ffffff;border:1px inset #ffffff}.qs_color{position:absolute;left:-999999px}.qs_color_label{width:100%;height:20px;display:block;border:1px solid #aaaaaa;cursor:pointer;padding:0 0 0 5px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box}.qs_file_chooser{position:absolute;left:-999999px}.qs_file_chooser_label{background-color:#f6f6f6;color:#000000;height:30px;border:1px solid #aaaaaa;font:12px sans-serif;width:100%;display:block;cursor:pointer;padding:7px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}",l={_version:"3.0.2",_topZ:1,_panel:null,_titleBar:null,_content:null,_startX:0,_startY:0,_hidden:!1,_collapsed:!1,_controls:null,_keyCode:-1,_draggable:!0,_collapsible:!0,_globalChangeHandler:null,useExtStyleSheet:function(){j=!0},create:function(a,b,c,d){var e=Object.create(this);return e._init(a,b,c,d),e},destroy:function(){this._panel.parentElement&&this._panel.parentElement.removeChild(this._panel);for(var a in this)this[a]=null},_init:function(a,b,c,d){j||h(),this._bindHandlers(),this._createPanel(a,b,d),this._createTitleBar(c||"QuickSettings"),this._createContent()},_bindHandlers:function(){this._startDrag=this._startDrag.bind(this),this._drag=this._drag.bind(this),this._endDrag=this._endDrag.bind(this),this._doubleClickTitle=this._doubleClickTitle.bind(this),this._onKeyUp=this._onKeyUp.bind(this)},getValuesAsJSON:function(a){var b={};for(var c in this._controls)this._controls[c].getValue&&(b[c]=this._controls[c].getValue());return a&&(b=JSON.stringify(b)),b},setValuesFromJSON:function(a){"string"==typeof a&&(a=JSON.parse(a));for(var b in a)this._controls[b]&&this._controls[b].setValue&&this._controls[b].setValue(a[b]);return this},saveInLocalStorage:function(a){return this._localStorageName=a,this._readFromLocalStorage(a),this},clearLocalStorage:function(a){return localStorage.removeItem(a),this},_saveInLocalStorage:function(a){localStorage.setItem(a,this.getValuesAsJSON(!0))},_readFromLocalStorage:function(a){var b=localStorage.getItem(a);b&&this.setValuesFromJSON(b)},_createPanel:function(a,b,c){this._panel=d("div",null,"qs_main",c||document.body),this._panel.style.zIndex=++l._topZ,this.setPosition(a||0,b||0),this._controls={}},_createTitleBar:function(a){this._titleBar=d("div",null,"qs_title_bar",this._panel),this._titleBar.textContent=a,this._titleBar.addEventListener("mousedown",this._startDrag),this._titleBar.addEventListener("dblclick",this._doubleClickTitle)},_createContent:function(){this._content=d("div",null,"qs_content",this._panel)},_createContainer:function(){var a=d("div",null,"qs_container");return a.addEventListener("focus",function(){this.className+=" qs_container_selected"},!0),a.addEventListener("blur",function(){var a=this.className.indexOf(" qs_container_selected");a>-1&&(this.className=this.className.substr(0,a))},!0),this._content.appendChild(a),a},setPosition:function(a,b){return this._panel.style.left=a+"px",this._panel.style.top=Math.max(b,0)+"px",this},setSize:function(a,b){return this._panel.style.width=a+"px",this._content.style.width=a+"px",this._content.style.height=b-this._titleBar.offsetHeight+"px",this},setWidth:function(a){return this._panel.style.width=a+"px",this._content.style.width=a+"px",this},setHeight:function(a){return this._content.style.height=a-this._titleBar.offsetHeight+"px",this},setDraggable:function(a){return this._draggable=a,this._draggable||this._collapsible?this._titleBar.style.cursor="pointer":this._titleBar.style.cursor="default",this},_startDrag:function(a){this._draggable&&(this._panel.style.zIndex=++l._topZ,document.addEventListener("mousemove",this._drag),document.addEventListener("mouseup",this._endDrag),this._startX=a.clientX,this._startY=a.clientY),a.preventDefault()},_drag:function(a){var b=parseInt(this._panel.style.left),c=parseInt(this._panel.style.top),d=a.clientX,e=a.clientY;this.setPosition(b+d-this._startX,c+e-this._startY),this._startX=d,this._startY=e,a.preventDefault()},_endDrag:function(a){document.removeEventListener("mousemove",this._drag),document.removeEventListener("mouseup",this._endDrag),a.preventDefault()},setGlobalChangeHandler:function(a){return this._globalChangeHandler=a,this},_callGCH:function(a){this._localStorageName&&this._saveInLocalStorage(this._localStorageName),this._globalChangeHandler&&this._globalChangeHandler(a)},hide:function(){return this._panel.style.visibility="hidden",this._hidden=!0,this},show:function(){return this._panel.style.visibility="visible",this._panel.style.zIndex=++l._topZ,this._hidden=!1,this},toggleVisibility:function(){return this._hidden?this.show():this.hide(),this},setCollapsible:function(a){return this._collapsible=a,this._draggable||this._collapsible?this._titleBar.style.cursor="pointer":this._titleBar.style.cursor="default",this},collapse:function(){return this._panel.removeChild(this._content),this._collapsed=!0,this},expand:function(){return this._panel.appendChild(this._content),this._collapsed=!1,this},toggleCollapsed:function(){return this._collapsed?this.expand():this.collapse(),this},setKey:function(a){return this._keyCode=a.toUpperCase().charCodeAt(0),document.addEventListener("keyup",this._onKeyUp),this},_onKeyUp:function(a){a.keyCode===this._keyCode&&["INPUT","SELECT","TEXTAREA"].indexOf(a.target.tagName)<0&&this.toggleVisibility()},_doubleClickTitle:function(){this._collapsible&&this.toggleCollapsed()},removeControl:function(a){if(this._controls[a])var b=this._controls[a].container;return b&&b.parentElement&&b.parentElement.removeChild(b),this._controls[a]=null,this},enableControl:function(a){return this._controls[a]&&(this._controls[a].control.disabled=!1),this},disableControl:function(a){return this._controls[a]&&(this._controls[a].control.disabled=!0),this},hideControl:function(a){return this._controls[a]&&(this._controls[a].container.style.display="none"),this},showControl:function(a){return this._controls[a]&&(this._controls[a].container.style.display="block"),this},overrideStyle:function(a,b,c){return this._controls[a]&&(this._controls[a].control.style[b]=c),this},hideTitle:function(a){var b=this._controls[a].label;return b&&(b.style.display="none"),this},showTitle:function(a){var b=this._controls[a].label;return b&&(b.style.display="block"),this},hideAllTitles:function(){for(var a in this._controls){var b=this._controls[a].label;b&&(b.style.display="none")}return this},showAllTitles:function(){for(var a in this._controls){var b=this._controls[a].label;b&&(b.style.display="block")}return this},getValue:function(a){return this._controls[a].getValue()},setValue:function(a,b){return this._controls[a].setValue(b),this._callGCH(a),this},addBoolean:function(b,e,f){var g=this._createContainer(),h=a(),i=d("label",null,"qs_checkbox_label",g);i.textContent=b,i.setAttribute("for",h);var j=d("label",null,"qs_checkbox",g);j.setAttribute("for",h);var k=c("checkbox",h,null,j);k.checked=e;d("span",null,null,j);this._controls[b]={container:g,control:k,getValue:function(){return this.control.checked},setValue:function(a){this.control.checked=a,f&&f(a)}};var l=this;return k.addEventListener("change",function(){f&&f(k.checked),l._callGCH(b)}),this},bindBoolean:function(a,b,c){return this.addBoolean(a,b,function(b){c[a]=b})},addButton:function(b,d){var e=this._createContainer(),f=c("button",a(),"qs_button",e);f.value=b,this._controls[b]={container:e,control:f};var g=this;return f.addEventListener("click",function(){d&&d(f),g._callGCH(b)}),this},addColor:function(h,i,j){if(f()||g()||e())return this.addText(h,i,j);var k=this._createContainer(),l=b("<b>"+h+":</b> "+i,k),m=a(),n=c("color",m,"qs_color",k);n.value=i||"#ff0000";var o=d("label",null,"qs_color_label",k);o.setAttribute("for",m),o.style.backgroundColor=n.value,this._controls[h]={container:k,control:n,colorLabel:o,label:l,title:h,getValue:function(){return this.control.value},setValue:function(a){this.control.value=a,this.colorLabel.style.backgroundColor=n.value,this.label.innerHTML="<b>"+this.title+":</b> "+this.control.value,j&&j(a)}};var p=this;return n.addEventListener("input",function(){l.innerHTML="<b>"+h+":</b> "+n.value,o.style.backgroundColor=n.value,j&&j(n.value),p._callGCH(h)}),this},bindColor:function(a,b,c){return this.addColor(a,b,function(b){c[a]=b})},addDate:function(d,f,g){var h;if(f instanceof Date){var i=f.getFullYear(),j=f.getMonth()+1;j<10&&(j="0"+j);h=i+"-"+j+"-"+f.getDate()}else h=f;if(e())return this.addText(d,h,g);var k=this._createContainer(),l=b("<b>"+d+"</b>",k),m=c("date",a(),"qs_text_input",k);m.value=h||"",this._controls[d]={container:k,control:m,label:l,getValue:function(){return this.control.value},setValue:function(a){var b;if(a instanceof Date){var c=a.getFullYear(),d=a.getMonth()+1;d<10&&(d="0"+d);var e=a.getDate();e<10&&(e="0"+e),b=c+"-"+d+"-"+e}else b=a;this.control.value=b||"",g&&g(b)}};var n=this;return m.addEventListener("input",function(){g&&g(m.value),n._callGCH(d)}),this},bindDate:function(a,b,c){return this.addDate(a,b,function(b){c[a]=b})},addDropDown:function(a,c,e){for(var f=this._createContainer(),g=b("<b>"+a+"</b>",f),h=d("select",null,"qs_select",f),i=0;i<c.length;i++){var j=d("option"),k=c[i];k.label?(j.value=k.value,j.innerText=k.label):(j.label=k,j.innerText=k),h.add(j)}var l=this;return h.addEventListener("change",function(){var b=h.selectedIndex,d=h.options;e&&e({index:b,label:d[b].label,value:c[b].value||c[b]}),l._callGCH(a)}),this._controls[a]={container:f,control:h,label:g,getValue:function(){var a=this.control.selectedIndex;return{index:a,label:this.control.options[a].label,value:c[a].value||c[a]}},setValue:function(a){var b;b=null!=a.index?a.index:a;var d=this.control.options;this.control.selectedIndex=b,e&&e({index:b,label:d[b].label,value:c[b].value||c[b]})}},this},bindDropDown:function(a,b,c){return this.addDropDown(a,b,function(b){c[a]=b.value})},addElement:function(a,c){var d=this._createContainer(),e=b("<b>"+a+"</b>",d);return d.appendChild(c),this._controls[a]={container:d,label:e},this},addFileChooser:function(e,f,g,h){var i=this._createContainer(),j=b("<b>"+e+"</b>",i),k=a(),l=c("file",k,"qs_file_chooser",i);g&&(l.accept=g);var m=d("label",null,"qs_file_chooser_label",i);m.setAttribute("for",k),m.textContent=f||"Choose a file...",this._controls[e]={container:i,control:l,label:j,getValue:function(){return this.control.files[0]}};var n=this;return l.addEventListener("change",function(){l.files&&l.files.length&&(m.textContent=l.files[0].name,h&&h(l.files[0]),n._callGCH(e))}),this},addHTML:function(a,c){var e=this._createContainer(),f=b("<b>"+a+":</b> ",e),g=d("div",null,null,e);return g.innerHTML=c,this._controls[a]={container:e,label:f,control:g,getValue:function(){return this.control.innerHTML},setValue:function(a){this.control.innerHTML=a}},this},addImage:function(a,c,e){var f=this._createContainer(),g=b("<b>"+a+"</b>",f);return img=d("img",null,"qs_image",f),img.src=c,this._controls[a]={container:f,control:img,label:g,getValue:function(){return this.control.src},setValue:function(a){this.control.src=a,e&&img.addEventListener("load",function b(){img.removeEventListener("load",b),e(a)})}},this},addRange:function(a,b,c,d,e,f){return this._addNumber("range",a,b,c,d,e,f)},addNumber:function(a,b,c,d,e,f){return this._addNumber("number",a,b,c,d,e,f)},_addNumber:function(d,f,g,h,i,j,k){var l=this._createContainer(),m=b("",l),n="range"===d?"qs_range":"qs_text_input qs_number",o=c(d,a(),n,l);o.min=g||0,o.max=h||100,o.step=j||1,o.value=i||0,m.innerHTML="<b>"+f+":</b> "+o.value,this._controls[f]={container:l,control:o,label:m,title:f,callback:k,getValue:function(){return parseFloat(this.control.value)},setValue:function(a){this.control.value=a,this.label.innerHTML="<b>"+this.title+":</b> "+this.control.value,k&&k(parseFloat(a))}};var p="input";"range"===d&&e()&&(p="change");var q=this;return o.addEventListener(p,function(){m.innerHTML="<b>"+f+":</b> "+o.value,k&&k(parseFloat(o.value)),q._callGCH(f)}),this},bindRange:function(a,b,c,d,e,f){return this.addRange(a,b,c,d,e,function(b){f[a]=b})},bindNumber:function(a,b,c,d,e,f){return this.addNumber(a,b,c,d,e,function(b){f[a]=b})},setRangeParameters:function(a,b,c,d){return this.setNumberParameters(a,b,c,d)},setNumberParameters:function(a,b,c,d){var e=this._controls[a],f=e.control.value;return e.control.min=b,e.control.max=c,e.control.step=d,e.control.value!==f&&e.callback&&e.callback(e.control.value),this},addPassword:function(a,b,c){return this._addText("password",a,b,c)},bindPassword:function(a,b,c){return this.addPassword(a,b,function(b){c[a]=b})},addProgressBar:function(a,c,e,f){var g=this._createContainer(),h=b("",g),i=d("div",null,"qs_progress",g),j=d("div",null,"qs_progress_value",i);return j.style.width=e/c*100+"%",h.innerHTML="numbers"===f?"<b>"+a+":</b> "+e+" / "+c:"percent"===f?"<b>"+a+":</b> "+Math.round(e/c*100)+"%":"<b>"+a+"</b>",this._controls[a]={container:g,control:i,valueDiv:j,valueDisplay:f,label:h,value:e,max:c,title:a,getValue:function(){return this.value},setValue:function(a){this.value=Math.max(0,Math.min(a,this.max)),this.valueDiv.style.width=this.value/this.max*100+"%","numbers"===this.valueDisplay?this.label.innerHTML="<b>"+this.title+":</b> "+this.value+" / "+this.max:"percent"===this.valueDisplay&&(this.label.innerHTML="<b>"+this.title+":</b> "+Math.round(this.value/this.max*100)+"%")}},this},setProgressMax:function(a,b){var c=this._controls[a];return c.max=b,c.value=Math.min(c.value,c.max),c.valueDiv.style.width=c.value/c.max*100+"%","numbers"===c.valueDisplay?c.label.innerHTML="<b>"+c.title+":</b> "+c.value+" / "+c.max:"percent"===c.valueDisplay?c.label.innerHTML="<b>"+c.title+":</b> "+Math.round(c.value/c.max*100)+"%":c.label.innerHTML="<b>"+c.title+"</b>",this},addText:function(a,b,c){return this._addText("text",a,b,c)},_addText:function(e,f,g,h){var i,j=this._createContainer(),k=b("<b>"+f+"</b>",j);"textarea"===e?(i=d("textarea",a(),"qs_textarea",j),i.rows=5):i=c(e,a(),"qs_text_input",j),i.value=g||"",this._controls[f]={container:j,control:i,label:k,getValue:function(){return this.control.value},setValue:function(a){this.control.value=a,h&&h(a)}};var l=this;return i.addEventListener("input",function(){h&&h(i.value),l._callGCH(f)}),this},bindText:function(a,b,c){return this.addText(a,b,function(b){c[a]=b})},addTextArea:function(a,b,c){return this._addText("textarea",a,b,c)},setTextAreaRows:function(a,b){return this._controls[a].control.rows=b,this},bindTextArea:function(a,b,c){return this.addTextArea(a,b,function(b){c[a]=b})},addTime:function(d,f,g){var h;if(f instanceof Date){var i=f.getHours();i<10&&(i="0"+i);var j=f.getMinutes();j<10&&(j="0"+j);var k=f.getSeconds();k<10&&(k="0"+k),h=i+":"+j+":"+k}else h=f;if(e())return this.addText(d,h,g);var l=this._createContainer(),m=b("<b>"+d+"</b>",l),n=c("time",a(),"qs_text_input",l);n.value=h||"",this._controls[d]={container:l,control:n,label:m,getValue:function(){return this.control.value},setValue:function(a){var b;if(a instanceof Date){var c=a.getHours();c<10&&(c="0"+c);var d=a.getMinutes();d<10&&(d="0"+d);var e=a.getSeconds();e<10&&(e="0"+e),b=c+":"+d+":"+e}else b=a;this.control.value=b||"",g&&g(b)}};var o=this;return n.addEventListener("input",function(){g&&g(n.value),o._callGCH(d)}),this},bindTime:function(a,b,c){return this.addTime(a,b,function(b){c[a]=b})}}; true?module.exports=l:"function"==typeof define&&define.amd?define(l):window.QuickSettings=l}();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var colorString = __webpack_require__(16);
var convert = __webpack_require__(19);

var _slice = [].slice;

var skippedModels = [
	// to be honest, I don't really feel like keyword belongs in color convert, but eh.
	'keyword',

	// gray conflicts with some method names, and has its own method defined.
	'gray',

	// shouldn't really be in color-convert either...
	'hex'
];

var hashedModelKeys = {};
Object.keys(convert).forEach(function (model) {
	hashedModelKeys[_slice.call(convert[model].labels).sort().join('')] = model;
});

var limiters = {};

function Color(obj, model) {
	if (!(this instanceof Color)) {
		return new Color(obj, model);
	}

	if (model && model in skippedModels) {
		model = null;
	}

	if (model && !(model in convert)) {
		throw new Error('Unknown model: ' + model);
	}

	var i;
	var channels;

	if (!obj) {
		this.model = 'rgb';
		this.color = [0, 0, 0];
		this.valpha = 1;
	} else if (obj instanceof Color) {
		this.model = obj.model;
		this.color = obj.color.slice();
		this.valpha = obj.valpha;
	} else if (typeof obj === 'string') {
		var result = colorString.get(obj);
		if (result === null) {
			throw new Error('Unable to parse color from string: ' + obj);
		}

		this.model = result.model;
		channels = convert[this.model].channels;
		this.color = result.value.slice(0, channels);
		this.valpha = typeof result.value[channels] === 'number' ? result.value[channels] : 1;
	} else if (obj.length) {
		this.model = model || 'rgb';
		channels = convert[this.model].channels;
		var newArr = _slice.call(obj, 0, channels);
		this.color = zeroArray(newArr, channels);
		this.valpha = typeof obj[channels] === 'number' ? obj[channels] : 1;
	} else if (typeof obj === 'number') {
		// this is always RGB - can be converted later on.
		obj &= 0xFFFFFF;
		this.model = 'rgb';
		this.color = [
			(obj >> 16) & 0xFF,
			(obj >> 8) & 0xFF,
			obj & 0xFF
		];
		this.valpha = 1;
	} else {
		this.valpha = 1;

		var keys = Object.keys(obj);
		if ('alpha' in obj) {
			keys.splice(keys.indexOf('alpha'), 1);
			this.valpha = typeof obj.alpha === 'number' ? obj.alpha : 0;
		}

		var hashedKeys = keys.sort().join('');
		if (!(hashedKeys in hashedModelKeys)) {
			throw new Error('Unable to parse color from object: ' + JSON.stringify(obj));
		}

		this.model = hashedModelKeys[hashedKeys];

		var labels = convert[this.model].labels;
		var color = [];
		for (i = 0; i < labels.length; i++) {
			color.push(obj[labels[i]]);
		}

		this.color = zeroArray(color);
	}

	// perform limitations (clamping, etc.)
	if (limiters[this.model]) {
		channels = convert[this.model].channels;
		for (i = 0; i < channels; i++) {
			var limit = limiters[this.model][i];
			if (limit) {
				this.color[i] = limit(this.color[i]);
			}
		}
	}

	this.valpha = Math.max(0, Math.min(1, this.valpha));

	if (Object.freeze) {
		Object.freeze(this);
	}
}

Color.prototype = {
	toString: function () {
		return this.string();
	},

	toJSON: function () {
		return this[this.model]();
	},

	string: function (places) {
		var self = this.model in colorString.to ? this : this.rgb();
		self = self.round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to[self.model](args);
	},

	percentString: function (places) {
		var self = this.rgb().round(typeof places === 'number' ? places : 1);
		var args = self.valpha === 1 ? self.color : self.color.concat(this.valpha);
		return colorString.to.rgb.percent(args);
	},

	array: function () {
		return this.valpha === 1 ? this.color.slice() : this.color.concat(this.valpha);
	},

	object: function () {
		var result = {};
		var channels = convert[this.model].channels;
		var labels = convert[this.model].labels;

		for (var i = 0; i < channels; i++) {
			result[labels[i]] = this.color[i];
		}

		if (this.valpha !== 1) {
			result.alpha = this.valpha;
		}

		return result;
	},

	unitArray: function () {
		var rgb = this.rgb().color;
		rgb[0] /= 255;
		rgb[1] /= 255;
		rgb[2] /= 255;

		if (this.valpha !== 1) {
			rgb.push(this.valpha);
		}

		return rgb;
	},

	unitObject: function () {
		var rgb = this.rgb().object();
		rgb.r /= 255;
		rgb.g /= 255;
		rgb.b /= 255;

		if (this.valpha !== 1) {
			rgb.alpha = this.valpha;
		}

		return rgb;
	},

	round: function (places) {
		places = Math.max(places || 0, 0);
		return new Color(this.color.map(roundToPlace(places)).concat(this.valpha), this.model);
	},

	alpha: function (val) {
		if (arguments.length) {
			return new Color(this.color.concat(Math.max(0, Math.min(1, val))), this.model);
		}

		return this.valpha;
	},

	// rgb
	red: getset('rgb', 0, maxfn(255)),
	green: getset('rgb', 1, maxfn(255)),
	blue: getset('rgb', 2, maxfn(255)),

	hue: getset(['hsl', 'hsv', 'hsl', 'hwb', 'hcg'], 0, function (val) { return ((val % 360) + 360) % 360; }), // eslint-disable-line brace-style

	saturationl: getset('hsl', 1, maxfn(100)),
	lightness: getset('hsl', 2, maxfn(100)),

	saturationv: getset('hsv', 1, maxfn(100)),
	value: getset('hsv', 2, maxfn(100)),

	chroma: getset('hcg', 1, maxfn(100)),
	gray: getset('hcg', 2, maxfn(100)),

	white: getset('hwb', 1, maxfn(100)),
	wblack: getset('hwb', 2, maxfn(100)),

	cyan: getset('cmyk', 0, maxfn(100)),
	magenta: getset('cmyk', 1, maxfn(100)),
	yellow: getset('cmyk', 2, maxfn(100)),
	black: getset('cmyk', 3, maxfn(100)),

	x: getset('xyz', 0, maxfn(100)),
	y: getset('xyz', 1, maxfn(100)),
	z: getset('xyz', 2, maxfn(100)),

	l: getset('lab', 0, maxfn(100)),
	a: getset('lab', 1),
	b: getset('lab', 2),

	keyword: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return convert[this.model].keyword(this.color);
	},

	hex: function (val) {
		if (arguments.length) {
			return new Color(val);
		}

		return colorString.to.hex(this.rgb().round().color);
	},

	rgbNumber: function () {
		var rgb = this.rgb().color;
		return ((rgb[0] & 0xFF) << 16) | ((rgb[1] & 0xFF) << 8) | (rgb[2] & 0xFF);
	},

	luminosity: function () {
		// http://www.w3.org/TR/WCAG20/#relativeluminancedef
		var rgb = this.rgb().color;

		var lum = [];
		for (var i = 0; i < rgb.length; i++) {
			var chan = rgb[i] / 255;
			lum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);
		}

		return 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];
	},

	contrast: function (color2) {
		// http://www.w3.org/TR/WCAG20/#contrast-ratiodef
		var lum1 = this.luminosity();
		var lum2 = color2.luminosity();

		if (lum1 > lum2) {
			return (lum1 + 0.05) / (lum2 + 0.05);
		}

		return (lum2 + 0.05) / (lum1 + 0.05);
	},

	level: function (color2) {
		var contrastRatio = this.contrast(color2);
		if (contrastRatio >= 7.1) {
			return 'AAA';
		}

		return (contrastRatio >= 4.5) ? 'AA' : '';
	},

	dark: function () {
		// YIQ equation from http://24ways.org/2010/calculating-color-contrast
		var rgb = this.rgb().color;
		var yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
		return yiq < 128;
	},

	light: function () {
		return !this.dark();
	},

	negate: function () {
		var rgb = this.rgb();
		for (var i = 0; i < 3; i++) {
			rgb.color[i] = 255 - rgb.color[i];
		}
		return rgb;
	},

	lighten: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] += hsl.color[2] * ratio;
		return hsl;
	},

	darken: function (ratio) {
		var hsl = this.hsl();
		hsl.color[2] -= hsl.color[2] * ratio;
		return hsl;
	},

	saturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] += hsl.color[1] * ratio;
		return hsl;
	},

	desaturate: function (ratio) {
		var hsl = this.hsl();
		hsl.color[1] -= hsl.color[1] * ratio;
		return hsl;
	},

	whiten: function (ratio) {
		var hwb = this.hwb();
		hwb.color[1] += hwb.color[1] * ratio;
		return hwb;
	},

	blacken: function (ratio) {
		var hwb = this.hwb();
		hwb.color[2] += hwb.color[2] * ratio;
		return hwb;
	},

	grayscale: function () {
		// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale
		var rgb = this.rgb().color;
		var val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;
		return Color.rgb(val, val, val);
	},

	fade: function (ratio) {
		return this.alpha(this.valpha - (this.valpha * ratio));
	},

	opaquer: function (ratio) {
		return this.alpha(this.valpha + (this.valpha * ratio));
	},

	rotate: function (degrees) {
		var hsl = this.hsl();
		var hue = hsl.color[0];
		hue = (hue + degrees) % 360;
		hue = hue < 0 ? 360 + hue : hue;
		hsl.color[0] = hue;
		return hsl;
	},

	mix: function (mixinColor, weight) {
		// ported from sass implementation in C
		// https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209
		var color1 = mixinColor.rgb();
		var color2 = this.rgb();
		var p = weight === undefined ? 0.5 : weight;

		var w = 2 * p - 1;
		var a = color1.alpha() - color2.alpha();

		var w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;
		var w2 = 1 - w1;

		return Color.rgb(
				w1 * color1.red() + w2 * color2.red(),
				w1 * color1.green() + w2 * color2.green(),
				w1 * color1.blue() + w2 * color2.blue(),
				color1.alpha() * p + color2.alpha() * (1 - p));
	}
};

// model conversion methods and static constructors
Object.keys(convert).forEach(function (model) {
	if (skippedModels.indexOf(model) !== -1) {
		return;
	}

	var channels = convert[model].channels;

	// conversion methods
	Color.prototype[model] = function () {
		if (this.model === model) {
			return new Color(this);
		}

		if (arguments.length) {
			return new Color(arguments, model);
		}

		var newAlpha = typeof arguments[channels] === 'number' ? channels : this.valpha;
		return new Color(assertArray(convert[this.model][model].raw(this.color)).concat(newAlpha), model);
	};

	// 'static' construction methods
	Color[model] = function (color) {
		if (typeof color === 'number') {
			color = zeroArray(_slice.call(arguments), channels);
		}
		return new Color(color, model);
	};
});

function roundTo(num, places) {
	return Number(num.toFixed(places));
}

function roundToPlace(places) {
	return function (num) {
		return roundTo(num, places);
	};
}

function getset(model, channel, modifier) {
	model = Array.isArray(model) ? model : [model];

	model.forEach(function (m) {
		(limiters[m] || (limiters[m] = []))[channel] = modifier;
	});

	model = model[0];

	return function (val) {
		var result;

		if (arguments.length) {
			if (modifier) {
				val = modifier(val);
			}

			result = this[model]();
			result.color[channel] = val;
			return result;
		}

		result = this[model]().color[channel];
		if (modifier) {
			result = modifier(result);
		}

		return result;
	};
}

function maxfn(max) {
	return function (v) {
		return Math.max(0, Math.min(max, v));
	};
}

function assertArray(val) {
	return Array.isArray(val) ? val : [val];
}

function zeroArray(arr, length) {
	for (var i = 0; i < length; i++) {
		if (typeof arr[i] !== 'number') {
			arr[i] = 0;
		}
	}

	return arr;
}

module.exports = Color;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

/* MIT license */
var colorNames = __webpack_require__(3);
var swizzle = __webpack_require__(17);

var reverseNames = {};

// create a list of reverse color names
for (var name in colorNames) {
	if (colorNames.hasOwnProperty(name)) {
		reverseNames[colorNames[name]] = name;
	}
}

var cs = module.exports = {
	to: {}
};

cs.get = function (string) {
	var prefix = string.substring(0, 3).toLowerCase();
	var val;
	var model;
	switch (prefix) {
		case 'hsl':
			val = cs.get.hsl(string);
			model = 'hsl';
			break;
		case 'hwb':
			val = cs.get.hwb(string);
			model = 'hwb';
			break;
		default:
			val = cs.get.rgb(string);
			model = 'rgb';
			break;
	}

	if (!val) {
		return null;
	}

	return {model: model, value: val};
};

cs.get.rgb = function (string) {
	if (!string) {
		return null;
	}

	var abbr = /^#([a-f0-9]{3,4})$/i;
	var hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	var rgba = /^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var per = /^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var keyword = /(\D+)/;

	var rgb = [0, 0, 0, 1];
	var match;
	var i;
	var hexAlpha;

	if (match = string.match(hex)) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			var i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(abbr)) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = Math.round((parseInt(hexAlpha + hexAlpha, 16) / 255) * 100) / 100;
		}
	} else if (match = string.match(rgba)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(per)) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			rgb[3] = parseFloat(match[4]);
		}
	} else if (match = string.match(keyword)) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		rgb = colorNames[match[1]];

		if (!rgb) {
			return null;
		}

		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
};

cs.get.hsl = function (string) {
	if (!string) {
		return null;
	}

	var hsl = /^hsla?\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hsl);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var s = clamp(parseFloat(match[2]), 0, 100);
		var l = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
};

cs.get.hwb = function (string) {
	if (!string) {
		return null;
	}

	var hwb = /^hwb\(\s*([+-]?\d*[\.]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/;
	var match = string.match(hwb);

	if (match) {
		var alpha = parseFloat(match[4]);
		var h = ((parseFloat(match[1]) % 360) + 360) % 360;
		var w = clamp(parseFloat(match[2]), 0, 100);
		var b = clamp(parseFloat(match[3]), 0, 100);
		var a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
};

cs.to.hex = function () {
	var rgba = swizzle(arguments);

	return (
		'#' +
		hexDouble(rgba[0]) +
		hexDouble(rgba[1]) +
		hexDouble(rgba[2]) +
		(rgba[3] < 1
			? (hexDouble(Math.round(rgba[3] * 255)))
			: '')
	);
};

cs.to.rgb = function () {
	var rgba = swizzle(arguments);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ')'
		: 'rgba(' + Math.round(rgba[0]) + ', ' + Math.round(rgba[1]) + ', ' + Math.round(rgba[2]) + ', ' + rgba[3] + ')';
};

cs.to.rgb.percent = function () {
	var rgba = swizzle(arguments);

	var r = Math.round(rgba[0] / 255 * 100);
	var g = Math.round(rgba[1] / 255 * 100);
	var b = Math.round(rgba[2] / 255 * 100);

	return rgba.length < 4 || rgba[3] === 1
		? 'rgb(' + r + '%, ' + g + '%, ' + b + '%)'
		: 'rgba(' + r + '%, ' + g + '%, ' + b + '%, ' + rgba[3] + ')';
};

cs.to.hsl = function () {
	var hsla = swizzle(arguments);
	return hsla.length < 4 || hsla[3] === 1
		? 'hsl(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%)'
		: 'hsla(' + hsla[0] + ', ' + hsla[1] + '%, ' + hsla[2] + '%, ' + hsla[3] + ')';
};

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
cs.to.hwb = function () {
	var hwba = swizzle(arguments);

	var a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return 'hwb(' + hwba[0] + ', ' + hwba[1] + '%, ' + hwba[2] + '%' + a + ')';
};

cs.to.keyword = function (rgb) {
	return reverseNames[rgb.slice(0, 3)];
};

// helpers
function clamp(num, min, max) {
	return Math.min(Math.max(min, num), max);
}

function hexDouble(num) {
	var str = num.toString(16).toUpperCase();
	return (str.length < 2) ? '0' + str : str;
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isArrayish = __webpack_require__(18);

var concat = Array.prototype.concat;
var slice = Array.prototype.slice;

var swizzle = module.exports = function swizzle(args) {
	var results = [];

	for (var i = 0, len = args.length; i < len; i++) {
		var arg = args[i];

		if (isArrayish(arg)) {
			// http://jsperf.com/javascript-array-concat-vs-push/98
			results = concat.call(results, slice.call(arg));
		} else {
			results.push(arg);
		}
	}

	return results;
};

swizzle.wrap = function (fn) {
	return function () {
		return fn(swizzle(arguments));
	};
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isArrayish(obj) {
	if (!obj || typeof obj === 'string') {
		return false;
	}

	return obj instanceof Array || Array.isArray(obj) ||
		(obj.length >= 0 && (obj.splice instanceof Function ||
			(Object.getOwnPropertyDescriptor(obj, (obj.length - 1)) && obj.constructor.name !== 'String')));
};


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(4);
var route = __webpack_require__(20);

var convert = {};

var models = Object.keys(conversions);

function wrapRaw(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		return fn(args);
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

function wrapRounded(fn) {
	var wrappedFn = function (args) {
		if (args === undefined || args === null) {
			return args;
		}

		if (arguments.length > 1) {
			args = Array.prototype.slice.call(arguments);
		}

		var result = fn(args);

		// we're assuming the result is an array here.
		// see notice in conversions.js; don't use box types
		// in conversion functions.
		if (typeof result === 'object') {
			for (var len = result.length, i = 0; i < len; i++) {
				result[i] = Math.round(result[i]);
			}
		}

		return result;
	};

	// preserve .conversion property if there is one
	if ('conversion' in fn) {
		wrappedFn.conversion = fn.conversion;
	}

	return wrappedFn;
}

models.forEach(function (fromModel) {
	convert[fromModel] = {};

	Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
	Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});

	var routes = route(fromModel);
	var routeModels = Object.keys(routes);

	routeModels.forEach(function (toModel) {
		var fn = routes[toModel];

		convert[fromModel][toModel] = wrapRounded(fn);
		convert[fromModel][toModel].raw = wrapRaw(fn);
	});
});

module.exports = convert;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var conversions = __webpack_require__(4);

/*
	this function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

// https://jsperf.com/object-keys-vs-for-in-with-closure/3
var models = Object.keys(conversions);

function buildGraph() {
	var graph = {};

	for (var len = models.length, i = 0; i < len; i++) {
		graph[models[i]] = {
			// http://jsperf.com/1-vs-infinity
			// micro-opt, but this is simple.
			distance: -1,
			parent: null
		};
	}

	return graph;
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
	var graph = buildGraph();
	var queue = [fromModel]; // unshift -> queue -> pop

	graph[fromModel].distance = 0;

	while (queue.length) {
		var current = queue.pop();
		var adjacents = Object.keys(conversions[current]);

		for (var len = adjacents.length, i = 0; i < len; i++) {
			var adjacent = adjacents[i];
			var node = graph[adjacent];

			if (node.distance === -1) {
				node.distance = graph[current].distance + 1;
				node.parent = current;
				queue.unshift(adjacent);
			}
		}
	}

	return graph;
}

function link(from, to) {
	return function (args) {
		return to(from(args));
	};
}

function wrapConversion(toModel, graph) {
	var path = [graph[toModel].parent, toModel];
	var fn = conversions[graph[toModel].parent][toModel];

	var cur = graph[toModel].parent;
	while (graph[cur].parent) {
		path.unshift(graph[cur].parent);
		fn = link(conversions[graph[cur].parent][cur], fn);
		cur = graph[cur].parent;
	}

	fn.conversion = path;
	return fn;
}

module.exports = function (fromModel) {
	var graph = deriveBFS(fromModel);
	var conversion = {};

	var models = Object.keys(graph);
	for (var len = models.length, i = 0; i < len; i++) {
		var toModel = models[i];
		var node = graph[toModel];

		if (node.parent === null) {
			// no possible conversion, or this node is the source model.
			continue;
		}

		conversion[toModel] = wrapConversion(toModel, graph);
	}

	return conversion;
};



/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;/*! button 2017-09-02 */

!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return require(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c||a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){b.exports=a("./lib/axios")},{"./lib/axios":3}],2:[function(a,b,c){(function(c){"use strict";var d=a("./../utils"),e=a("./../core/settle"),f=a("./../helpers/buildURL"),g=a("./../helpers/parseHeaders"),h=a("./../helpers/isURLSameOrigin"),i=a("../core/createError"),j="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||a("./../helpers/btoa");b.exports=function(b){return new Promise(function(k,l){var m=b.data,n=b.headers;d.isFormData(m)&&delete n["Content-Type"];var o=new XMLHttpRequest,p="onreadystatechange",q=!1;if("test"===c.env.NODE_ENV||"undefined"==typeof window||!window.XDomainRequest||"withCredentials"in o||h(b.url)||(o=new window.XDomainRequest,p="onload",q=!0,o.onprogress=function(){},o.ontimeout=function(){}),b.auth){var r=b.auth.username||"",s=b.auth.password||"";n.Authorization="Basic "+j(r+":"+s)}if(o.open(b.method.toUpperCase(),f(b.url,b.params,b.paramsSerializer),!0),o.timeout=b.timeout,o[p]=function(){if(o&&(4===o.readyState||q)&&(0!==o.status||o.responseURL&&0===o.responseURL.indexOf("file:"))){var a="getAllResponseHeaders"in o?g(o.getAllResponseHeaders()):null,c=b.responseType&&"text"!==b.responseType?o.response:o.responseText,d={data:c,status:1223===o.status?204:o.status,statusText:1223===o.status?"No Content":o.statusText,headers:a,config:b,request:o};e(k,l,d),o=null}},o.onerror=function(){l(i("Network Error",b)),o=null},o.ontimeout=function(){l(i("timeout of "+b.timeout+"ms exceeded",b,"ECONNABORTED")),o=null},d.isStandardBrowserEnv()){var t=a("./../helpers/cookies"),u=(b.withCredentials||h(b.url))&&b.xsrfCookieName?t.read(b.xsrfCookieName):void 0;u&&(n[b.xsrfHeaderName]=u)}if("setRequestHeader"in o&&d.forEach(n,function(a,b){void 0===m&&"content-type"===b.toLowerCase()?delete n[b]:o.setRequestHeader(b,a)}),b.withCredentials&&(o.withCredentials=!0),b.responseType)try{o.responseType=b.responseType}catch(a){if("json"!==b.responseType)throw a}"function"==typeof b.onDownloadProgress&&o.addEventListener("progress",b.onDownloadProgress),"function"==typeof b.onUploadProgress&&o.upload&&o.upload.addEventListener("progress",b.onUploadProgress),b.cancelToken&&b.cancelToken.promise.then(function(a){o&&(o.abort(),l(a),o=null)}),void 0===m&&(m=null),o.send(m)})}}).call(this,a("_process"))},{"../core/createError":9,"./../core/settle":12,"./../helpers/btoa":16,"./../helpers/buildURL":17,"./../helpers/cookies":19,"./../helpers/isURLSameOrigin":21,"./../helpers/parseHeaders":23,"./../utils":25,_process:30}],3:[function(a,b,c){"use strict";function d(a){var b=new g(a),c=f(g.prototype.request,b);return e.extend(c,g.prototype,b),e.extend(c,b),c}var e=a("./utils"),f=a("./helpers/bind"),g=a("./core/Axios"),h=a("./defaults"),i=d(h);i.Axios=g,i.create=function(a){return d(e.merge(h,a))},i.Cancel=a("./cancel/Cancel"),i.CancelToken=a("./cancel/CancelToken"),i.isCancel=a("./cancel/isCancel"),i.all=function(a){return Promise.all(a)},i.spread=a("./helpers/spread"),b.exports=i,b.exports.default=i},{"./cancel/Cancel":4,"./cancel/CancelToken":5,"./cancel/isCancel":6,"./core/Axios":7,"./defaults":14,"./helpers/bind":15,"./helpers/spread":24,"./utils":25}],4:[function(a,b,c){"use strict";function d(a){this.message=a}d.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},d.prototype.__CANCEL__=!0,b.exports=d},{}],5:[function(a,b,c){"use strict";function d(a){if("function"!=typeof a)throw new TypeError("executor must be a function.");var b;this.promise=new Promise(function(a){b=a});var c=this;a(function(a){c.reason||(c.reason=new e(a),b(c.reason))})}var e=a("./Cancel");d.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},d.source=function(){var a;return{token:new d(function(b){a=b}),cancel:a}},b.exports=d},{"./Cancel":4}],6:[function(a,b,c){"use strict";b.exports=function(a){return!(!a||!a.__CANCEL__)}},{}],7:[function(a,b,c){"use strict";function d(a){this.defaults=a,this.interceptors={request:new g,response:new g}}var e=a("./../defaults"),f=a("./../utils"),g=a("./InterceptorManager"),h=a("./dispatchRequest"),i=a("./../helpers/isAbsoluteURL"),j=a("./../helpers/combineURLs");d.prototype.request=function(a){"string"==typeof a&&(a=f.merge({url:arguments[0]},arguments[1])),a=f.merge(e,this.defaults,{method:"get"},a),a.baseURL&&!i(a.url)&&(a.url=j(a.baseURL,a.url));var b=[h,void 0],c=Promise.resolve(a);for(this.interceptors.request.forEach(function(a){b.unshift(a.fulfilled,a.rejected)}),this.interceptors.response.forEach(function(a){b.push(a.fulfilled,a.rejected)});b.length;)c=c.then(b.shift(),b.shift());return c},f.forEach(["delete","get","head","options"],function(a){d.prototype[a]=function(b,c){return this.request(f.merge(c||{},{method:a,url:b}))}}),f.forEach(["post","put","patch"],function(a){d.prototype[a]=function(b,c,d){return this.request(f.merge(d||{},{method:a,url:b,data:c}))}}),b.exports=d},{"./../defaults":14,"./../helpers/combineURLs":18,"./../helpers/isAbsoluteURL":20,"./../utils":25,"./InterceptorManager":8,"./dispatchRequest":10}],8:[function(a,b,c){"use strict";function d(){this.handlers=[]}var e=a("./../utils");d.prototype.use=function(a,b){return this.handlers.push({fulfilled:a,rejected:b}),this.handlers.length-1},d.prototype.eject=function(a){this.handlers[a]&&(this.handlers[a]=null)},d.prototype.forEach=function(a){e.forEach(this.handlers,function(b){null!==b&&a(b)})},b.exports=d},{"./../utils":25}],9:[function(a,b,c){"use strict";var d=a("./enhanceError");b.exports=function(a,b,c,e){var f=new Error(a);return d(f,b,c,e)}},{"./enhanceError":11}],10:[function(a,b,c){"use strict";function d(a){a.cancelToken&&a.cancelToken.throwIfRequested()}var e=a("./../utils"),f=a("./transformData"),g=a("../cancel/isCancel"),h=a("../defaults");b.exports=function(a){return d(a),a.headers=a.headers||{},a.data=f(a.data,a.headers,a.transformRequest),a.headers=e.merge(a.headers.common||{},a.headers[a.method]||{},a.headers||{}),e.forEach(["delete","get","head","post","put","patch","common"],function(b){delete a.headers[b]}),(a.adapter||h.adapter)(a).then(function(b){return d(a),b.data=f(b.data,b.headers,a.transformResponse),b},function(b){return g(b)||(d(a),b&&b.response&&(b.response.data=f(b.response.data,b.response.headers,a.transformResponse))),Promise.reject(b)})}},{"../cancel/isCancel":6,"../defaults":14,"./../utils":25,"./transformData":13}],11:[function(a,b,c){"use strict";b.exports=function(a,b,c,d){return a.config=b,c&&(a.code=c),a.response=d,a}},{}],12:[function(a,b,c){"use strict";var d=a("./createError");b.exports=function(a,b,c){var e=c.config.validateStatus;c.status&&e&&!e(c.status)?b(d("Request failed with status code "+c.status,c.config,null,c)):a(c)}},{"./createError":9}],13:[function(a,b,c){"use strict";var d=a("./../utils");b.exports=function(a,b,c){return d.forEach(c,function(c){a=c(a,b)}),a}},{"./../utils":25}],14:[function(a,b,c){(function(c){"use strict";function d(a,b){!e.isUndefined(a)&&e.isUndefined(a["Content-Type"])&&(a["Content-Type"]=b)}var e=a("./utils"),f=a("./helpers/normalizeHeaderName"),g={"Content-Type":"application/x-www-form-urlencoded"},h={adapter:function(){var b;return"undefined"!=typeof XMLHttpRequest?b=a("./adapters/xhr"):void 0!==c&&(b=a("./adapters/http")),b}(),transformRequest:[function(a,b){return f(b,"Content-Type"),e.isFormData(a)||e.isArrayBuffer(a)||e.isBuffer(a)||e.isStream(a)||e.isFile(a)||e.isBlob(a)?a:e.isArrayBufferView(a)?a.buffer:e.isURLSearchParams(a)?(d(b,"application/x-www-form-urlencoded;charset=utf-8"),a.toString()):e.isObject(a)?(d(b,"application/json;charset=utf-8"),JSON.stringify(a)):a}],transformResponse:[function(a){if("string"==typeof a)try{a=JSON.parse(a)}catch(a){}return a}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(a){return a>=200&&a<300}};h.headers={common:{Accept:"application/json, text/plain, */*"}},e.forEach(["delete","get","head"],function(a){h.headers[a]={}}),e.forEach(["post","put","patch"],function(a){h.headers[a]=e.merge(g)}),b.exports=h}).call(this,a("_process"))},{"./adapters/http":2,"./adapters/xhr":2,"./helpers/normalizeHeaderName":22,"./utils":25,_process:30}],15:[function(a,b,c){"use strict";b.exports=function(a,b){return function(){for(var c=new Array(arguments.length),d=0;d<c.length;d++)c[d]=arguments[d];return a.apply(b,c)}}},{}],16:[function(a,b,c){"use strict";function d(){this.message="String contains an invalid character"}function e(a){for(var b,c,e=String(a),g="",h=0,i=f;e.charAt(0|h)||(i="=",h%1);g+=i.charAt(63&b>>8-h%1*8)){if((c=e.charCodeAt(h+=.75))>255)throw new d;b=b<<8|c}return g}var f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";d.prototype=new Error,d.prototype.code=5,d.prototype.name="InvalidCharacterError",b.exports=e},{}],17:[function(a,b,c){"use strict";function d(a){return encodeURIComponent(a).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var e=a("./../utils");b.exports=function(a,b,c){if(!b)return a;var f;if(c)f=c(b);else if(e.isURLSearchParams(b))f=b.toString();else{var g=[];e.forEach(b,function(a,b){null!==a&&void 0!==a&&(e.isArray(a)&&(b+="[]"),e.isArray(a)||(a=[a]),e.forEach(a,function(a){e.isDate(a)?a=a.toISOString():e.isObject(a)&&(a=JSON.stringify(a)),g.push(d(b)+"="+d(a))}))}),f=g.join("&")}return f&&(a+=(-1===a.indexOf("?")?"?":"&")+f),a}},{"./../utils":25}],18:[function(a,b,c){"use strict";b.exports=function(a,b){return b?a.replace(/\/+$/,"")+"/"+b.replace(/^\/+/,""):a}},{}],19:[function(a,b,c){"use strict";var d=a("./../utils");b.exports=d.isStandardBrowserEnv()?function(){return{write:function(a,b,c,e,f,g){var h=[];h.push(a+"="+encodeURIComponent(b)),d.isNumber(c)&&h.push("expires="+new Date(c).toGMTString()),d.isString(e)&&h.push("path="+e),d.isString(f)&&h.push("domain="+f),!0===g&&h.push("secure"),document.cookie=h.join("; ")},read:function(a){var b=document.cookie.match(new RegExp("(^|;\\s*)("+a+")=([^;]*)"));return b?decodeURIComponent(b[3]):null},remove:function(a){this.write(a,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}()},{"./../utils":25}],20:[function(a,b,c){"use strict";b.exports=function(a){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(a)}},{}],21:[function(a,b,c){"use strict";var d=a("./../utils");b.exports=d.isStandardBrowserEnv()?function(){function a(a){var b=a;return c&&(e.setAttribute("href",b),b=e.href),e.setAttribute("href",b),{href:e.href,protocol:e.protocol?e.protocol.replace(/:$/,""):"",host:e.host,search:e.search?e.search.replace(/^\?/,""):"",hash:e.hash?e.hash.replace(/^#/,""):"",hostname:e.hostname,port:e.port,pathname:"/"===e.pathname.charAt(0)?e.pathname:"/"+e.pathname}}var b,c=/(msie|trident)/i.test(navigator.userAgent),e=document.createElement("a");return b=a(window.location.href),function(c){var e=d.isString(c)?a(c):c;return e.protocol===b.protocol&&e.host===b.host}}():function(){return function(){return!0}}()},{"./../utils":25}],22:[function(a,b,c){"use strict";var d=a("../utils");b.exports=function(a,b){d.forEach(a,function(c,d){d!==b&&d.toUpperCase()===b.toUpperCase()&&(a[b]=c,delete a[d])})}},{"../utils":25}],23:[function(a,b,c){"use strict";var d=a("./../utils");b.exports=function(a){var b,c,e,f={};return a?(d.forEach(a.split("\n"),function(a){e=a.indexOf(":"),b=d.trim(a.substr(0,e)).toLowerCase(),c=d.trim(a.substr(e+1)),b&&(f[b]=f[b]?f[b]+", "+c:c)}),f):f}},{"./../utils":25}],24:[function(a,b,c){"use strict";b.exports=function(a){return function(b){return a.apply(null,b)}}},{}],25:[function(a,b,c){(function(c){"use strict";function d(a){return"[object Array]"===y.call(a)}function e(a){return void 0!==c&&c.isBuffer&&c.isBuffer(a)}function f(a){return"[object ArrayBuffer]"===y.call(a)}function g(a){return"undefined"!=typeof FormData&&a instanceof FormData}function h(a){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(a):a&&a.buffer&&a.buffer instanceof ArrayBuffer}function i(a){return"string"==typeof a}function j(a){return"number"==typeof a}function k(a){return void 0===a}function l(a){return null!==a&&"object"==typeof a}function m(a){return"[object Date]"===y.call(a)}function n(a){return"[object File]"===y.call(a)}function o(a){return"[object Blob]"===y.call(a)}function p(a){return"[object Function]"===y.call(a)}function q(a){return l(a)&&p(a.pipe)}function r(a){return"undefined"!=typeof URLSearchParams&&a instanceof URLSearchParams}function s(a){return a.replace(/^\s*/,"").replace(/\s*$/,"")}function t(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&("undefined"!=typeof window&&"undefined"!=typeof document)}function u(a,b){if(null!==a&&void 0!==a)if("object"==typeof a||d(a)||(a=[a]),d(a))for(var c=0,e=a.length;c<e;c++)b.call(null,a[c],c,a);else for(var f in a)Object.prototype.hasOwnProperty.call(a,f)&&b.call(null,a[f],f,a)}function v(){function a(a,c){"object"==typeof b[c]&&"object"==typeof a?b[c]=v(b[c],a):b[c]=a}for(var b={},c=0,d=arguments.length;c<d;c++)u(arguments[c],a);return b}function w(a,b,c){return u(b,function(b,d){a[d]=c&&"function"==typeof b?x(b,c):b}),a}var x=a("./helpers/bind"),y=Object.prototype.toString;b.exports={isArray:d,isArrayBuffer:f,isBuffer:e,isFormData:g,isArrayBufferView:h,isString:i,isNumber:j,isObject:l,isUndefined:k,isDate:m,isFile:n,isBlob:o,isFunction:p,isStream:q,isURLSearchParams:r,isStandardBrowserEnv:t,forEach:u,merge:v,extend:w,trim:s}}).call(this,a("buffer").Buffer)},{"./helpers/bind":15,buffer:27}],26:[function(a,b,c){"use strict";function d(a){var b=a.length;if(b%4>0)throw new Error("Invalid string. Length must be a multiple of 4");return"="===a[b-2]?2:"="===a[b-1]?1:0}function e(a){return 3*a.length/4-d(a)}function f(a){var b,c,e,f,g,h,i=a.length;g=d(a),h=new l(3*i/4-g),e=g>0?i-4:i;var j=0;for(b=0,c=0;b<e;b+=4,c+=3)f=k[a.charCodeAt(b)]<<18|k[a.charCodeAt(b+1)]<<12|k[a.charCodeAt(b+2)]<<6|k[a.charCodeAt(b+3)],h[j++]=f>>16&255,h[j++]=f>>8&255,h[j++]=255&f;return 2===g?(f=k[a.charCodeAt(b)]<<2|k[a.charCodeAt(b+1)]>>4,h[j++]=255&f):1===g&&(f=k[a.charCodeAt(b)]<<10|k[a.charCodeAt(b+1)]<<4|k[a.charCodeAt(b+2)]>>2,h[j++]=f>>8&255,h[j++]=255&f),h}function g(a){return j[a>>18&63]+j[a>>12&63]+j[a>>6&63]+j[63&a]}function h(a,b,c){for(var d,e=[],f=b;f<c;f+=3)d=(a[f]<<16)+(a[f+1]<<8)+a[f+2],e.push(g(d));return e.join("")}function i(a){for(var b,c=a.length,d=c%3,e="",f=[],g=0,i=c-d;g<i;g+=16383)f.push(h(a,g,g+16383>i?i:g+16383));return 1===d?(b=a[c-1],e+=j[b>>2],e+=j[b<<4&63],e+="=="):2===d&&(b=(a[c-2]<<8)+a[c-1],e+=j[b>>10],e+=j[b>>4&63],e+=j[b<<2&63],e+="="),f.push(e),f.join("")}c.byteLength=e,c.toByteArray=f,c.fromByteArray=i;for(var j=[],k=[],l="undefined"!=typeof Uint8Array?Uint8Array:Array,m="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",n=0,o=m.length;n<o;++n)j[n]=m[n],k[m.charCodeAt(n)]=n;k["-".charCodeAt(0)]=62,k["_".charCodeAt(0)]=63},{}],27:[function(a,b,c){(function(b){"use strict";function d(){return f.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function e(a,b){if(d()<b)throw new RangeError("Invalid typed array length");return f.TYPED_ARRAY_SUPPORT?(a=new Uint8Array(b),a.__proto__=f.prototype):(null===a&&(a=new f(b)),a.length=b),a}function f(a,b,c){if(!(f.TYPED_ARRAY_SUPPORT||this instanceof f))return new f(a,b,c);if("number"==typeof a){if("string"==typeof b)throw new Error("If encoding is specified then the first argument must be a string");return j(this,a)}return g(this,a,b,c)}function g(a,b,c,d){if("number"==typeof b)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&b instanceof ArrayBuffer?m(a,b,c,d):"string"==typeof b?k(a,b,c):n(a,b)}function h(a){if("number"!=typeof a)throw new TypeError('"size" argument must be a number');if(a<0)throw new RangeError('"size" argument must not be negative')}function i(a,b,c,d){return h(b),b<=0?e(a,b):void 0!==c?"string"==typeof d?e(a,b).fill(c,d):e(a,b).fill(c):e(a,b)}function j(a,b){if(h(b),a=e(a,b<0?0:0|o(b)),!f.TYPED_ARRAY_SUPPORT)for(var c=0;c<b;++c)a[c]=0;return a}function k(a,b,c){if("string"==typeof c&&""!==c||(c="utf8"),!f.isEncoding(c))throw new TypeError('"encoding" must be a valid string encoding');var d=0|q(b,c);a=e(a,d);var g=a.write(b,c);return g!==d&&(a=a.slice(0,g)),a}function l(a,b){var c=b.length<0?0:0|o(b.length);a=e(a,c);for(var d=0;d<c;d+=1)a[d]=255&b[d];return a}function m(a,b,c,d){if(b.byteLength,c<0||b.byteLength<c)throw new RangeError("'offset' is out of bounds");if(b.byteLength<c+(d||0))throw new RangeError("'length' is out of bounds");return b=void 0===c&&void 0===d?new Uint8Array(b):void 0===d?new Uint8Array(b,c):new Uint8Array(b,c,d),f.TYPED_ARRAY_SUPPORT?(a=b,a.__proto__=f.prototype):a=l(a,b),a}function n(a,b){if(f.isBuffer(b)){var c=0|o(b.length);return a=e(a,c),0===a.length?a:(b.copy(a,0,0,c),a)}if(b){if("undefined"!=typeof ArrayBuffer&&b.buffer instanceof ArrayBuffer||"length"in b)return"number"!=typeof b.length||X(b.length)?e(a,0):l(a,b);if("Buffer"===b.type&&$(b.data))return l(a,b.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}function o(a){if(a>=d())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+d().toString(16)+" bytes");return 0|a}function p(a){return+a!=a&&(a=0),f.alloc(+a)}function q(a,b){if(f.isBuffer(a))return a.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(a)||a instanceof ArrayBuffer))return a.byteLength;"string"!=typeof a&&(a=""+a);var c=a.length;if(0===c)return 0;for(var d=!1;;)switch(b){case"ascii":case"latin1":case"binary":return c;case"utf8":case"utf-8":case void 0:return S(a).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*c;case"hex":return c>>>1;case"base64":return V(a).length;default:if(d)return S(a).length;b=(""+b).toLowerCase(),d=!0}}function r(a,b,c){var d=!1;if((void 0===b||b<0)&&(b=0),b>this.length)return"";if((void 0===c||c>this.length)&&(c=this.length),c<=0)return"";if(c>>>=0,b>>>=0,c<=b)return"";for(a||(a="utf8");;)switch(a){case"hex":return G(this,b,c);case"utf8":case"utf-8":return C(this,b,c);case"ascii":return E(this,b,c);case"latin1":case"binary":return F(this,b,c);case"base64":return B(this,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return H(this,b,c);default:if(d)throw new TypeError("Unknown encoding: "+a);a=(a+"").toLowerCase(),d=!0}}function s(a,b,c){var d=a[b];a[b]=a[c],a[c]=d}function t(a,b,c,d,e){if(0===a.length)return-1;if("string"==typeof c?(d=c,c=0):c>2147483647?c=2147483647:c<-2147483648&&(c=-2147483648),c=+c,isNaN(c)&&(c=e?0:a.length-1),c<0&&(c=a.length+c),c>=a.length){if(e)return-1;c=a.length-1}else if(c<0){if(!e)return-1;c=0}if("string"==typeof b&&(b=f.from(b,d)),f.isBuffer(b))return 0===b.length?-1:u(a,b,c,d,e);if("number"==typeof b)return b&=255,f.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?e?Uint8Array.prototype.indexOf.call(a,b,c):Uint8Array.prototype.lastIndexOf.call(a,b,c):u(a,[b],c,d,e);throw new TypeError("val must be string, number or Buffer")}function u(a,b,c,d,e){function f(a,b){return 1===g?a[b]:a.readUInt16BE(b*g)}var g=1,h=a.length,i=b.length;if(void 0!==d&&("ucs2"===(d=String(d).toLowerCase())||"ucs-2"===d||"utf16le"===d||"utf-16le"===d)){if(a.length<2||b.length<2)return-1;g=2,h/=2,i/=2,c/=2}var j;if(e){var k=-1;for(j=c;j<h;j++)if(f(a,j)===f(b,-1===k?0:j-k)){if(-1===k&&(k=j),j-k+1===i)return k*g}else-1!==k&&(j-=j-k),k=-1}else for(c+i>h&&(c=h-i),j=c;j>=0;j--){for(var l=!0,m=0;m<i;m++)if(f(a,j+m)!==f(b,m)){l=!1;break}if(l)return j}return-1}function v(a,b,c,d){c=Number(c)||0;var e=a.length-c;d?(d=Number(d))>e&&(d=e):d=e;var f=b.length;if(f%2!=0)throw new TypeError("Invalid hex string");d>f/2&&(d=f/2);for(var g=0;g<d;++g){var h=parseInt(b.substr(2*g,2),16);if(isNaN(h))return g;a[c+g]=h}return g}function w(a,b,c,d){return W(S(b,a.length-c),a,c,d)}function x(a,b,c,d){return W(T(b),a,c,d)}function y(a,b,c,d){return x(a,b,c,d)}function z(a,b,c,d){return W(V(b),a,c,d)}function A(a,b,c,d){return W(U(b,a.length-c),a,c,d)}function B(a,b,c){return 0===b&&c===a.length?Y.fromByteArray(a):Y.fromByteArray(a.slice(b,c))}function C(a,b,c){c=Math.min(a.length,c);for(var d=[],e=b;e<c;){var f=a[e],g=null,h=f>239?4:f>223?3:f>191?2:1;if(e+h<=c){var i,j,k,l;switch(h){case 1:f<128&&(g=f);break;case 2:i=a[e+1],128==(192&i)&&(l=(31&f)<<6|63&i)>127&&(g=l);break;case 3:i=a[e+1],j=a[e+2],128==(192&i)&&128==(192&j)&&(l=(15&f)<<12|(63&i)<<6|63&j)>2047&&(l<55296||l>57343)&&(g=l);break;case 4:i=a[e+1],j=a[e+2],k=a[e+3],128==(192&i)&&128==(192&j)&&128==(192&k)&&(l=(15&f)<<18|(63&i)<<12|(63&j)<<6|63&k)>65535&&l<1114112&&(g=l)}}null===g?(g=65533,h=1):g>65535&&(g-=65536,d.push(g>>>10&1023|55296),g=56320|1023&g),d.push(g),e+=h}return D(d)}function D(a){var b=a.length;if(b<=_)return String.fromCharCode.apply(String,a);for(var c="",d=0;d<b;)c+=String.fromCharCode.apply(String,a.slice(d,d+=_));return c}function E(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;e<c;++e)d+=String.fromCharCode(127&a[e]);return d}function F(a,b,c){var d="";c=Math.min(a.length,c);for(var e=b;e<c;++e)d+=String.fromCharCode(a[e]);return d}function G(a,b,c){var d=a.length;(!b||b<0)&&(b=0),(!c||c<0||c>d)&&(c=d);for(var e="",f=b;f<c;++f)e+=R(a[f]);return e}function H(a,b,c){for(var d=a.slice(b,c),e="",f=0;f<d.length;f+=2)e+=String.fromCharCode(d[f]+256*d[f+1]);return e}function I(a,b,c){if(a%1!=0||a<0)throw new RangeError("offset is not uint");if(a+b>c)throw new RangeError("Trying to access beyond buffer length")}function J(a,b,c,d,e,g){if(!f.isBuffer(a))throw new TypeError('"buffer" argument must be a Buffer instance');if(b>e||b<g)throw new RangeError('"value" argument is out of bounds');if(c+d>a.length)throw new RangeError("Index out of range")}function K(a,b,c,d){b<0&&(b=65535+b+1);for(var e=0,f=Math.min(a.length-c,2);e<f;++e)a[c+e]=(b&255<<8*(d?e:1-e))>>>8*(d?e:1-e)}function L(a,b,c,d){b<0&&(b=4294967295+b+1);for(var e=0,f=Math.min(a.length-c,4);e<f;++e)a[c+e]=b>>>8*(d?e:3-e)&255}function M(a,b,c,d,e,f){if(c+d>a.length)throw new RangeError("Index out of range");if(c<0)throw new RangeError("Index out of range")}function N(a,b,c,d,e){return e||M(a,b,c,4,3.4028234663852886e38,-3.4028234663852886e38),Z.write(a,b,c,d,23,4),c+4}function O(a,b,c,d,e){return e||M(a,b,c,8,1.7976931348623157e308,-1.7976931348623157e308),Z.write(a,b,c,d,52,8),c+8}function P(a){if(a=Q(a).replace(aa,""),a.length<2)return"";for(;a.length%4!=0;)a+="=";return a}function Q(a){return a.trim?a.trim():a.replace(/^\s+|\s+$/g,"")}function R(a){return a<16?"0"+a.toString(16):a.toString(16)}function S(a,b){b=b||1/0;for(var c,d=a.length,e=null,f=[],g=0;g<d;++g){if((c=a.charCodeAt(g))>55295&&c<57344){if(!e){if(c>56319){(b-=3)>-1&&f.push(239,191,189);continue}if(g+1===d){(b-=3)>-1&&f.push(239,191,189);continue}e=c;continue}if(c<56320){(b-=3)>-1&&f.push(239,191,189),e=c;continue}c=65536+(e-55296<<10|c-56320)}else e&&(b-=3)>-1&&f.push(239,191,189);if(e=null,c<128){if((b-=1)<0)break;f.push(c)}else if(c<2048){if((b-=2)<0)break;f.push(c>>6|192,63&c|128)}else if(c<65536){if((b-=3)<0)break;f.push(c>>12|224,c>>6&63|128,63&c|128)}else{if(!(c<1114112))throw new Error("Invalid code point");if((b-=4)<0)break;f.push(c>>18|240,c>>12&63|128,c>>6&63|128,63&c|128)}}return f}function T(a){for(var b=[],c=0;c<a.length;++c)b.push(255&a.charCodeAt(c));return b}function U(a,b){for(var c,d,e,f=[],g=0;g<a.length&&!((b-=2)<0);++g)c=a.charCodeAt(g),d=c>>8,e=c%256,f.push(e),f.push(d);return f}function V(a){return Y.toByteArray(P(a))}function W(a,b,c,d){for(var e=0;e<d&&!(e+c>=b.length||e>=a.length);++e)b[e+c]=a[e];return e}function X(a){return a!==a}var Y=a("base64-js"),Z=a("ieee754"),$=a("isarray");c.Buffer=f,c.SlowBuffer=p,c.INSPECT_MAX_BYTES=50,f.TYPED_ARRAY_SUPPORT=void 0!==b.TYPED_ARRAY_SUPPORT?b.TYPED_ARRAY_SUPPORT:function(){try{var a=new Uint8Array(1);return a.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===a.foo()&&"function"==typeof a.subarray&&0===a.subarray(1,1).byteLength}catch(a){return!1}}(),c.kMaxLength=d(),f.poolSize=8192,f._augment=function(a){return a.__proto__=f.prototype,a},f.from=function(a,b,c){return g(null,a,b,c)},f.TYPED_ARRAY_SUPPORT&&(f.prototype.__proto__=Uint8Array.prototype,f.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&f[Symbol.species]===f&&Object.defineProperty(f,Symbol.species,{value:null,configurable:!0})),f.alloc=function(a,b,c){return i(null,a,b,c)},f.allocUnsafe=function(a){return j(null,a)},f.allocUnsafeSlow=function(a){return j(null,a)},f.isBuffer=function(a){return!(null==a||!a._isBuffer)},f.compare=function(a,b){if(!f.isBuffer(a)||!f.isBuffer(b))throw new TypeError("Arguments must be Buffers");if(a===b)return 0;for(var c=a.length,d=b.length,e=0,g=Math.min(c,d);e<g;++e)if(a[e]!==b[e]){c=a[e],d=b[e];break}return c<d?-1:d<c?1:0},f.isEncoding=function(a){switch(String(a).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},f.concat=function(a,b){if(!$(a))throw new TypeError('"list" argument must be an Array of Buffers');if(0===a.length)return f.alloc(0);var c;if(void 0===b)for(b=0,c=0;c<a.length;++c)b+=a[c].length;var d=f.allocUnsafe(b),e=0;for(c=0;c<a.length;++c){var g=a[c];if(!f.isBuffer(g))throw new TypeError('"list" argument must be an Array of Buffers');g.copy(d,e),e+=g.length}return d},f.byteLength=q,f.prototype._isBuffer=!0,f.prototype.swap16=function(){var a=this.length;if(a%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var b=0;b<a;b+=2)s(this,b,b+1);return this},f.prototype.swap32=function(){var a=this.length;if(a%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var b=0;b<a;b+=4)s(this,b,b+3),s(this,b+1,b+2);return this},f.prototype.swap64=function(){var a=this.length;if(a%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var b=0;b<a;b+=8)s(this,b,b+7),s(this,b+1,b+6),s(this,b+2,b+5),s(this,b+3,b+4);return this},f.prototype.toString=function(){var a=0|this.length;return 0===a?"":0===arguments.length?C(this,0,a):r.apply(this,arguments)},f.prototype.equals=function(a){if(!f.isBuffer(a))throw new TypeError("Argument must be a Buffer");return this===a||0===f.compare(this,a)},f.prototype.inspect=function(){var a="",b=c.INSPECT_MAX_BYTES;return this.length>0&&(a=this.toString("hex",0,b).match(/.{2}/g).join(" "),this.length>b&&(a+=" ... ")),"<Buffer "+a+">"},f.prototype.compare=function(a,b,c,d,e){if(!f.isBuffer(a))throw new TypeError("Argument must be a Buffer");if(void 0===b&&(b=0),void 0===c&&(c=a?a.length:0),void 0===d&&(d=0),void 0===e&&(e=this.length),b<0||c>a.length||d<0||e>this.length)throw new RangeError("out of range index");if(d>=e&&b>=c)return 0;if(d>=e)return-1;if(b>=c)return 1;if(b>>>=0,c>>>=0,d>>>=0,e>>>=0,this===a)return 0;for(var g=e-d,h=c-b,i=Math.min(g,h),j=this.slice(d,e),k=a.slice(b,c),l=0;l<i;++l)if(j[l]!==k[l]){g=j[l],h=k[l];break}return g<h?-1:h<g?1:0},f.prototype.includes=function(a,b,c){return-1!==this.indexOf(a,b,c)},f.prototype.indexOf=function(a,b,c){return t(this,a,b,c,!0)},f.prototype.lastIndexOf=function(a,b,c){return t(this,a,b,c,!1)},f.prototype.write=function(a,b,c,d){if(void 0===b)d="utf8",c=this.length,b=0;else if(void 0===c&&"string"==typeof b)d=b,c=this.length,b=0;else{if(!isFinite(b))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");b|=0,isFinite(c)?(c|=0,void 0===d&&(d="utf8")):(d=c,c=void 0)}var e=this.length-b;if((void 0===c||c>e)&&(c=e),a.length>0&&(c<0||b<0)||b>this.length)throw new RangeError("Attempt to write outside buffer bounds");d||(d="utf8");for(var f=!1;;)switch(d){case"hex":return v(this,a,b,c);case"utf8":case"utf-8":return w(this,a,b,c);case"ascii":return x(this,a,b,c);case"latin1":case"binary":return y(this,a,b,c);case"base64":return z(this,a,b,c);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return A(this,a,b,c);default:if(f)throw new TypeError("Unknown encoding: "+d);d=(""+d).toLowerCase(),f=!0}},f.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var _=4096;f.prototype.slice=function(a,b){var c=this.length;a=~~a,b=void 0===b?c:~~b,a<0?(a+=c)<0&&(a=0):a>c&&(a=c),b<0?(b+=c)<0&&(b=0):b>c&&(b=c),b<a&&(b=a);var d;if(f.TYPED_ARRAY_SUPPORT)d=this.subarray(a,b),d.__proto__=f.prototype;else{var e=b-a;d=new f(e,void 0);for(var g=0;g<e;++g)d[g]=this[g+a]}return d},f.prototype.readUIntLE=function(a,b,c){a|=0,b|=0,c||I(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return d},f.prototype.readUIntBE=function(a,b,c){a|=0,b|=0,c||I(a,b,this.length);for(var d=this[a+--b],e=1;b>0&&(e*=256);)d+=this[a+--b]*e;return d},f.prototype.readUInt8=function(a,b){return b||I(a,1,this.length),this[a]},f.prototype.readUInt16LE=function(a,b){return b||I(a,2,this.length),this[a]|this[a+1]<<8},f.prototype.readUInt16BE=function(a,b){return b||I(a,2,this.length),this[a]<<8|this[a+1]},f.prototype.readUInt32LE=function(a,b){return b||I(a,4,this.length),(this[a]|this[a+1]<<8|this[a+2]<<16)+16777216*this[a+3]},f.prototype.readUInt32BE=function(a,b){return b||I(a,4,this.length),16777216*this[a]+(this[a+1]<<16|this[a+2]<<8|this[a+3])},f.prototype.readIntLE=function(a,b,c){a|=0,b|=0,c||I(a,b,this.length);for(var d=this[a],e=1,f=0;++f<b&&(e*=256);)d+=this[a+f]*e;return e*=128,d>=e&&(d-=Math.pow(2,8*b)),d},f.prototype.readIntBE=function(a,b,c){a|=0,b|=0,c||I(a,b,this.length);for(var d=b,e=1,f=this[a+--d];d>0&&(e*=256);)f+=this[a+--d]*e;return e*=128,f>=e&&(f-=Math.pow(2,8*b)),f},f.prototype.readInt8=function(a,b){return b||I(a,1,this.length),128&this[a]?-1*(255-this[a]+1):this[a]},f.prototype.readInt16LE=function(a,b){b||I(a,2,this.length);var c=this[a]|this[a+1]<<8;return 32768&c?4294901760|c:c},f.prototype.readInt16BE=function(a,b){b||I(a,2,this.length);var c=this[a+1]|this[a]<<8;return 32768&c?4294901760|c:c},f.prototype.readInt32LE=function(a,b){return b||I(a,4,this.length),this[a]|this[a+1]<<8|this[a+2]<<16|this[a+3]<<24},f.prototype.readInt32BE=function(a,b){return b||I(a,4,this.length),this[a]<<24|this[a+1]<<16|this[a+2]<<8|this[a+3]},f.prototype.readFloatLE=function(a,b){return b||I(a,4,this.length),Z.read(this,a,!0,23,4)},f.prototype.readFloatBE=function(a,b){return b||I(a,4,this.length),Z.read(this,a,!1,23,4)},f.prototype.readDoubleLE=function(a,b){return b||I(a,8,this.length),Z.read(this,a,!0,52,8)},f.prototype.readDoubleBE=function(a,b){return b||I(a,8,this.length),Z.read(this,a,!1,52,8)},f.prototype.writeUIntLE=function(a,b,c,d){if(a=+a,b|=0,c|=0,!d){J(this,a,b,c,Math.pow(2,8*c)-1,0)}var e=1,f=0;for(this[b]=255&a;++f<c&&(e*=256);)this[b+f]=a/e&255;return b+c},f.prototype.writeUIntBE=function(a,b,c,d){if(a=+a,b|=0,c|=0,!d){J(this,a,b,c,Math.pow(2,8*c)-1,0)}var e=c-1,f=1;for(this[b+e]=255&a;--e>=0&&(f*=256);)this[b+e]=a/f&255;return b+c},f.prototype.writeUInt8=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,1,255,0),f.TYPED_ARRAY_SUPPORT||(a=Math.floor(a)),this[b]=255&a,b+1},f.prototype.writeUInt16LE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[b]=255&a,this[b+1]=a>>>8):K(this,a,b,!0),b+2},f.prototype.writeUInt16BE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,2,65535,0),f.TYPED_ARRAY_SUPPORT?(this[b]=a>>>8,this[b+1]=255&a):K(this,a,b,!1),b+2},f.prototype.writeUInt32LE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[b+3]=a>>>24,this[b+2]=a>>>16,this[b+1]=a>>>8,this[b]=255&a):L(this,a,b,!0),b+4},
f.prototype.writeUInt32BE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,4,4294967295,0),f.TYPED_ARRAY_SUPPORT?(this[b]=a>>>24,this[b+1]=a>>>16,this[b+2]=a>>>8,this[b+3]=255&a):L(this,a,b,!1),b+4},f.prototype.writeIntLE=function(a,b,c,d){if(a=+a,b|=0,!d){var e=Math.pow(2,8*c-1);J(this,a,b,c,e-1,-e)}var f=0,g=1,h=0;for(this[b]=255&a;++f<c&&(g*=256);)a<0&&0===h&&0!==this[b+f-1]&&(h=1),this[b+f]=(a/g>>0)-h&255;return b+c},f.prototype.writeIntBE=function(a,b,c,d){if(a=+a,b|=0,!d){var e=Math.pow(2,8*c-1);J(this,a,b,c,e-1,-e)}var f=c-1,g=1,h=0;for(this[b+f]=255&a;--f>=0&&(g*=256);)a<0&&0===h&&0!==this[b+f+1]&&(h=1),this[b+f]=(a/g>>0)-h&255;return b+c},f.prototype.writeInt8=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,1,127,-128),f.TYPED_ARRAY_SUPPORT||(a=Math.floor(a)),a<0&&(a=255+a+1),this[b]=255&a,b+1},f.prototype.writeInt16LE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[b]=255&a,this[b+1]=a>>>8):K(this,a,b,!0),b+2},f.prototype.writeInt16BE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,2,32767,-32768),f.TYPED_ARRAY_SUPPORT?(this[b]=a>>>8,this[b+1]=255&a):K(this,a,b,!1),b+2},f.prototype.writeInt32LE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,4,2147483647,-2147483648),f.TYPED_ARRAY_SUPPORT?(this[b]=255&a,this[b+1]=a>>>8,this[b+2]=a>>>16,this[b+3]=a>>>24):L(this,a,b,!0),b+4},f.prototype.writeInt32BE=function(a,b,c){return a=+a,b|=0,c||J(this,a,b,4,2147483647,-2147483648),a<0&&(a=4294967295+a+1),f.TYPED_ARRAY_SUPPORT?(this[b]=a>>>24,this[b+1]=a>>>16,this[b+2]=a>>>8,this[b+3]=255&a):L(this,a,b,!1),b+4},f.prototype.writeFloatLE=function(a,b,c){return N(this,a,b,!0,c)},f.prototype.writeFloatBE=function(a,b,c){return N(this,a,b,!1,c)},f.prototype.writeDoubleLE=function(a,b,c){return O(this,a,b,!0,c)},f.prototype.writeDoubleBE=function(a,b,c){return O(this,a,b,!1,c)},f.prototype.copy=function(a,b,c,d){if(c||(c=0),d||0===d||(d=this.length),b>=a.length&&(b=a.length),b||(b=0),d>0&&d<c&&(d=c),d===c)return 0;if(0===a.length||0===this.length)return 0;if(b<0)throw new RangeError("targetStart out of bounds");if(c<0||c>=this.length)throw new RangeError("sourceStart out of bounds");if(d<0)throw new RangeError("sourceEnd out of bounds");d>this.length&&(d=this.length),a.length-b<d-c&&(d=a.length-b+c);var e,g=d-c;if(this===a&&c<b&&b<d)for(e=g-1;e>=0;--e)a[e+b]=this[e+c];else if(g<1e3||!f.TYPED_ARRAY_SUPPORT)for(e=0;e<g;++e)a[e+b]=this[e+c];else Uint8Array.prototype.set.call(a,this.subarray(c,c+g),b);return g},f.prototype.fill=function(a,b,c,d){if("string"==typeof a){if("string"==typeof b?(d=b,b=0,c=this.length):"string"==typeof c&&(d=c,c=this.length),1===a.length){var e=a.charCodeAt(0);e<256&&(a=e)}if(void 0!==d&&"string"!=typeof d)throw new TypeError("encoding must be a string");if("string"==typeof d&&!f.isEncoding(d))throw new TypeError("Unknown encoding: "+d)}else"number"==typeof a&&(a&=255);if(b<0||this.length<b||this.length<c)throw new RangeError("Out of range index");if(c<=b)return this;b>>>=0,c=void 0===c?this.length:c>>>0,a||(a=0);var g;if("number"==typeof a)for(g=b;g<c;++g)this[g]=a;else{var h=f.isBuffer(a)?a:S(new f(a,d).toString()),i=h.length;for(g=0;g<c-b;++g)this[g+b]=h[g%i]}return this};var aa=/[^+\/0-9A-Za-z-_]/g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"base64-js":26,ieee754:28,isarray:29}],28:[function(a,b,c){c.read=function(a,b,c,d,e){var f,g,h=8*e-d-1,i=(1<<h)-1,j=i>>1,k=-7,l=c?e-1:0,m=c?-1:1,n=a[b+l];for(l+=m,f=n&(1<<-k)-1,n>>=-k,k+=h;k>0;f=256*f+a[b+l],l+=m,k-=8);for(g=f&(1<<-k)-1,f>>=-k,k+=d;k>0;g=256*g+a[b+l],l+=m,k-=8);if(0===f)f=1-j;else{if(f===i)return g?NaN:1/0*(n?-1:1);g+=Math.pow(2,d),f-=j}return(n?-1:1)*g*Math.pow(2,f-d)},c.write=function(a,b,c,d,e,f){var g,h,i,j=8*f-e-1,k=(1<<j)-1,l=k>>1,m=23===e?Math.pow(2,-24)-Math.pow(2,-77):0,n=d?0:f-1,o=d?1:-1,p=b<0||0===b&&1/b<0?1:0;for(b=Math.abs(b),isNaN(b)||b===1/0?(h=isNaN(b)?1:0,g=k):(g=Math.floor(Math.log(b)/Math.LN2),b*(i=Math.pow(2,-g))<1&&(g--,i*=2),b+=g+l>=1?m/i:m*Math.pow(2,1-l),b*i>=2&&(g++,i/=2),g+l>=k?(h=0,g=k):g+l>=1?(h=(b*i-1)*Math.pow(2,e),g+=l):(h=b*Math.pow(2,l-1)*Math.pow(2,e),g=0));e>=8;a[c+n]=255&h,n+=o,h/=256,e-=8);for(g=g<<e|h,j+=e;j>0;a[c+n]=255&g,n+=o,g/=256,j-=8);a[c+n-o]|=128*p}},{}],29:[function(a,b,c){var d={}.toString;b.exports=Array.isArray||function(a){return"[object Array]"==d.call(a)}},{}],30:[function(a,b,c){function d(){throw new Error("setTimeout has not been defined")}function e(){throw new Error("clearTimeout has not been defined")}function f(a){if(l===setTimeout)return setTimeout(a,0);if((l===d||!l)&&setTimeout)return l=setTimeout,setTimeout(a,0);try{return l(a,0)}catch(b){try{return l.call(null,a,0)}catch(b){return l.call(this,a,0)}}}function g(a){if(m===clearTimeout)return clearTimeout(a);if((m===e||!m)&&clearTimeout)return m=clearTimeout,clearTimeout(a);try{return m(a)}catch(b){try{return m.call(null,a)}catch(b){return m.call(this,a)}}}function h(){q&&o&&(q=!1,o.length?p=o.concat(p):r=-1,p.length&&i())}function i(){if(!q){var a=f(h);q=!0;for(var b=p.length;b;){for(o=p,p=[];++r<b;)o&&o[r].run();r=-1,b=p.length}o=null,q=!1,g(a)}}function j(a,b){this.fun=a,this.array=b}function k(){}var l,m,n=b.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:d}catch(a){l=d}try{m="function"==typeof clearTimeout?clearTimeout:e}catch(a){m=e}}();var o,p=[],q=!1,r=-1;n.nextTick=function(a){var b=new Array(arguments.length-1);if(arguments.length>1)for(var c=1;c<arguments.length;c++)b[c-1]=arguments[c];p.push(new j(a,b)),1!==p.length||q||f(i)},j.prototype.run=function(){this.fun.apply(null,this.array)},n.title="browser",n.browser=!0,n.env={},n.argv=[],n.version="",n.versions={},n.on=k,n.addListener=k,n.once=k,n.off=k,n.removeListener=k,n.removeAllListeners=k,n.emit=k,n.prependListener=k,n.prependOnceListener=k,n.listeners=function(a){return[]},n.binding=function(a){throw new Error("process.binding is not supported")},n.cwd=function(){return"/"},n.chdir=function(a){throw new Error("process.chdir is not supported")},n.umask=function(){return 0}},{}],31:[function(a,b,c){"use strict";!function(){var b=a("axios"),c=document.createElement("link");c.rel="stylesheet",c.href="//button.glitch.me/css/button.css",document.head.appendChild(c);var d=document.getElementsByTagName("script");[].forEach.call(d,function(a){if(a.getAttribute("src")&&-1!==a.getAttribute("src").indexOf("//button.glitch.me")&&a.dataset.style){var b=document.createElement("link");b.rel="stylesheet",b.href="//button.glitch.me/css/"+a.dataset.style+".css",document.head.appendChild(b)}});var e=function(a,b){for(;(a=a.parentElement)&&!(a.matches||a.matchesSelector).call(a,b););return a},f=document.getElementsByClassName("glitchButton"),g=[].map.call(f,function(a){return{button:a,projectName:a.getAttribute("data-project")||location.hostname.split(".")[0]}}),h=function(a){var b=e(a.target,".glitchButton"),c=b.getElementsByClassName("glitchOpenWindowElement")[0];c.style.display="none"===c.style.display?"block":"none"};window.onkeyup=function(a){9!==a.keyCode||e(document.activeElement,".glitchButton")||[].forEach.call(document.getElementsByClassName("glitchOpenWindowElement"),function(a){a.style.display="none"})},window.onclick=function(a){if(!e(a.target,".glitchButton")){var b=document.getElementsByClassName("glitchOpenWindowElement");[].forEach.call(b,function(a){a.style.display="none"})}},g.forEach(function(a){b.get("https://api.glitch.com/projects/"+a.projectName).then(function(b){var c=b.data,d=c.domain,e=c.description,f=c.users,g=f.map(function(a){return'<li><img width="25px" src="'+a.avatarUrl+'" alt="avatar of '+a.login+'" />\n            <span class="name">'+a.login+"</span>\n          </li>"}),i='<a class="buttonLinks remix" href="https://glitch.com/edit/#!/remix/'+d+'">Remix on Glitch</a>',j='<a class="buttonLinks viewCode" href="https://glitch.com/edit/#!/'+d+'">View Source</a>',k='<div class="project">\n            <div class="name">'+d+'</div>\n            <p class="description">'+e+'</p>\n            <div class="users">\n              <ul>'+g.join(" ")+'</ul>\n            </div>\n            <div class="footer">'+i+" "+j+"</div>\n          </div>",l=document.createElement("button");l.className="glitchButtonElement",l.innerHTML='<img alt="This is a Glitch app!" width="50px" src="https://cdn.glitch.com/3fd2e3a7-3145-4c1d-9480-32a2e6a6963a%2Flogo-day.svg?1490800908258" />';var m=document.createElement("div");m.className="glitchOpenWindowElement",m.style.display="none",m.innerHTML=k+' <span class="tooltip border"></span><span class="tooltip fill"></span>',l.onclick=h,a.button.appendChild(l),a.button.appendChild(m)}).catch(function(a){console.log(a)})})}()},{axios:1}]},{},[31]);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 22 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Drawing Machine</title>\n    <meta name=\"description\" content=\"A cool thing made with Glitch\">\n    <link id=\"favicon\" rel=\"icon\" href=\"https://glitch.com/edit/favicon-app.ico\" type=\"image/x-icon\">\n    <meta charset=\"utf-8\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n    <meta name=\"viewport\" content=\"initial-scale=1,maximum-scale=1, user-scalable=no, minimal-ui\">\n    <meta name=\"msapplication-tap-highlight\" content=\"no\" />\n  </head>\n  <body class=\"full-window unselectable\">\n    <header>\n      <h1>\n        <span class=\"glitchButton\" data-project=\"drawing-machine\"></span>\n        <!-- <span class=\"title\">Drawing Machine</span> -->\n      </h1>\n    </header>\n\n    <main>\n      <canvas id=\"arms\"></canvas>\n      <canvas id=\"curve\"></canvas>\n    </main>\n\n    <footer class=\"unselectable\">\n      <!-- <a class=\"glitch\" href=\"https://glitch.com/edit/#!/remix/drawing-machine\"><img src=\"./glitch-dark.svg\" alt=\"Remix on Glitch\" /></a> -->\n    </footer>\n\n    <!-- Your web-app is https, so your scripts need to be too -->\n    <!-- <script src=\"https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.12/p5.min.js\"></script> -->\n    <!-- <script src=\"//cdnjs.cloudflare.com/ajax/libs/zepto/1.2.0/zepto.min.js\"></script> -->\n    <!-- <script src=\"/app.js\"></script> -->\n\n    <script>\n      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){\n      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),\n      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)\n      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');\n      ga('create', 'UA-26088031-2', 'auto');\n      ga('send', 'pageview');\n    </script>\n  </body>\n</html>\n";

/***/ })
/******/ ]);