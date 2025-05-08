"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "consoleStyle", {
  enumerable: true,
  get: function get() {
    return _console.default;
  }
});
Object.defineProperty(exports, "copyStorage", {
  enumerable: true,
  get: function get() {
    return _copy.default;
  }
});
Object.defineProperty(exports, "easyIndexedDB", {
  enumerable: true,
  get: function get() {
    return _easyIndexedDB.default;
  }
});
Object.defineProperty(exports, "getFistScreenLoad", {
  enumerable: true,
  get: function get() {
    return _fistScreenLoad.getFistScreenLoad;
  }
});
Object.defineProperty(exports, "monitorError", {
  enumerable: true,
  get: function get() {
    return _monitorError.monitorError;
  }
});
Object.defineProperty(exports, "performanceInit", {
  enumerable: true,
  get: function get() {
    return _init.performanceInit;
  }
});
var _copy = _interopRequireDefault(require("./copyStorage/copy"));
var _console = _interopRequireDefault(require("./console/console.style"));
var _easyIndexedDB = _interopRequireDefault(require("./indexDB/easyIndexedDB"));
var _init = require("./performance/init");
var _fistScreenLoad = require("./performance/fistScreenLoad");
var _monitorError = require("./performance/monitorError");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }