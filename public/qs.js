let QuickSettings = require('quicksettings');

QuickSettings.useExtStyleSheet();
var qs = QuickSettings.create(document.body.clientWidth - 40, 20, 'Control Panel');
qs.addMultpleRange = function(title, values, callback) {
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
  values.forEach(function(value, i, values) {
    var rangePart = elm.cloneNode();
    rangePart.type = 'range';
    rangePart.removeAttribute('data-values');
    rangePart.value = value;
    rangePart = div.insertBefore(rangePart, elm);
    
    rangePart.addEventListener(eventName, function() {
      var values = Array.prototype.map.call(
        div.querySelectorAll('input'),
        function(input) {
          return parseFloat(input.value);
        }
      )
      callback(values);
    },false);
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
document.body.addEventListener('mousedown', function(e){
  // this is vanilla.js way of delegate blur event
  if (!e.target.matches('.qs_main, .qs_main *') && !qs._collapsed) {
    $main.classList.toggle('qs_collapse');
    adjustPosition(qs._collapsed);
    qs.collapse();
  }
}, false);

$title.addEventListener('dblclick', function() {
  adjustPosition(!qs._collapsed);
  $main.classList.toggle('qs_collapse');
}, false);

$toggleExpand.addEventListener('click', function(e) {
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

export default qs;