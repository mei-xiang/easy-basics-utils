"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 美化打印实现方法
var prettyLog = function prettyLog() {
  var isEmpty = function isEmpty(value) {
    return value == null || value === undefined || value === '';
  };
  var prettyPrint = function prettyPrint(title, text, color) {
    console.log("%c ".concat(title, " %c ").concat(text, " %c"), "background:".concat(color, ";border:1px solid ").concat(color, "; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;"), "border:1px solid ".concat(color, "; padding: 1px; border-radius: 0 2px 2px 0; color: ").concat(color, ";"), 'background:transparent');
  };
  var info = function info(textOrTitle) {
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var title = isEmpty(content) ? 'Info' : textOrTitle;
    var text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#909399');
  };
  var error = function error(textOrTitle) {
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var title = isEmpty(content) ? 'Error' : textOrTitle;
    var text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#F56C6C');
  };
  var warning = function warning(textOrTitle) {
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var title = isEmpty(content) ? 'Warning' : textOrTitle;
    var text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#E6A23C');
  };
  var success = function success(textOrTitle) {
    var content = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var title = isEmpty(content) ? 'Success ' : textOrTitle;
    var text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#67C23A');
  };
  var img = function img(url) {
    var scale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = function () {
      var c = document.createElement('canvas');
      var ctx = c.getContext('2d');
      if (ctx) {
        c.width = image.width;
        c.height = image.height;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(image, 0, 0);
        var dataUri = c.toDataURL('image/png');
        console.log("%c sup?", "font-size: 1px;\n                    padding: ".concat(Math.floor(image.height * scale / 2), "px ").concat(Math.floor(image.width * scale / 2), "px;\n                    background-image: url(").concat(dataUri, ");\n                    background-repeat: no-repeat;\n                    background-size: ").concat(image.width * scale, "px ").concat(image.height * scale, "px;\n                    color: transparent;\n                    "));
      }
    };
    image.src = url;
  };
  return {
    info: info,
    error: error,
    warning: warning,
    success: success,
    img: img
  };
};
var _default = exports.default = prettyLog;