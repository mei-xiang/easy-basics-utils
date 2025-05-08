"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performanceInit = void 0;
var _routerEach = require("./routerEach");
var _interfaceDurationTime = require("./interfaceDurationTime");
var _monitorError = require("./monitorError");
var _visibilitychange = require("./visibilitychange");
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var performanceInit = exports.performanceInit = function performanceInit() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _obj$vue = obj.vue,
    vue = _obj$vue === void 0 ? null : _obj$vue,
    _obj$type = obj.type,
    type = _obj$type === void 0 ? 1 : _obj$type,
    _obj$router = obj.router,
    router = _obj$router === void 0 ? null : _obj$router,
    _obj$filterInterface = obj.filterInterface,
    filterInterface = _obj$filterInterface === void 0 ? [] : _obj$filterInterface,
    _obj$pageDueationTime = obj.pageDueationTimeConfig,
    pageDueationTimeConfig = _obj$pageDueationTime === void 0 ? {} : _obj$pageDueationTime,
    _obj$interfaceThen = obj.interfaceThen,
    interfaceThen = _obj$interfaceThen === void 0 ? function () {} : _obj$interfaceThen,
    _obj$pageThen = obj.pageThen,
    pageThen = _obj$pageThen === void 0 ? function () {} : _obj$pageThen,
    _obj$errorThen = obj.errorThen,
    errorThen = _obj$errorThen === void 0 ? null : _obj$errorThen,
    _obj$samplingRate = obj.samplingRate,
    samplingRate = _obj$samplingRate === void 0 ? 200 : _obj$samplingRate;
  if (filterInterface) {
    // eslint-disable-next-line no-const-assign
    filterInterface = [].concat(_toConsumableArray(filterInterface), ['uba-test.saas.crland.com.cn', 'uba-data.crland.com.cn']);
  }
  if (!vue) {
    return console.error('[performanceInit] vue参数不能为空，请传入vue');
  }
  if (!router) {
    return console.error('[performanceInit] router参数不能为空，请传入router');
  }
  (0, _routerEach.addEach)(vue, router, pageDueationTimeConfig, pageThen);
  (0, _interfaceDurationTime.interfaceDurationTime)({
    type: type,
    router: router,
    interfaceThen: interfaceThen,
    pageThen: pageThen,
    filterInterface: filterInterface,
    samplingRate: samplingRate
  });
  if (typeof errorThen === 'function') {
    (0, _monitorError.monitorError)(errorThen);
  }
  // 监听页面可见性变化
  (0, _visibilitychange.addVisibilitychange)();
};