"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeVisibilitychange = exports.addVisibilitychange = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var handleVisibilityChange = function handleVisibilityChange() {
  if (document.visibilityState === 'hidden') {
    setIshidden();
  }
};

// 进入后台时组织当前队列中所有，首屏、页面渲染、接口请求时间性能参数上报
function setIshidden() {
  var savePageDueationTimeStore = window.pageDueationTimeStore;
  if (isNonEmptyObject(savePageDueationTimeStore)) {
    for (var key in savePageDueationTimeStore) {
      savePageDueationTimeStore[key].isHidden = true;
      var apiObj = savePageDueationTimeStore[key].apiObj;
      if (isNonEmptyObject(apiObj)) {
        for (var _key in apiObj) {
          apiObj[_key].isHidden = true;
        }
      }
    }
  }
}
function isNonEmptyObject(obj) {
  return _typeof(obj) === 'object' && obj !== null && Object.keys(obj).length > 0;
}

// 添加事件监听器
var addVisibilitychange = exports.addVisibilitychange = function addVisibilitychange() {
  if (window.isAddVisibilitychange === true) {
    return;
  }
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.isAddVisibilitychange = true;
};

// 移除事件监听器
var removeVisibilitychange = exports.removeVisibilitychange = function removeVisibilitychange() {
  document.removeEventListener('visibilitychange', handleVisibilityChange);
};