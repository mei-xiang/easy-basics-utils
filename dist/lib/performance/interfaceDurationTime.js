"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ckeckSome = void 0;
exports.debounce = debounce;
exports.findMax = findMax;
exports.getApiID = getApiID;
exports.interfaceDurationTime = void 0;
exports.isEnterBackend = isEnterBackend;
exports.isFilterApi = isFilterApi;
exports.splitUrl = splitUrl;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, e, r, o) { var p = _get(_getPrototypeOf(1 & o ? t.prototype : t), e, r); return 2 & o ? function (t) { return p.apply(r, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
// fetch 或 XMLHttpRequest 监听
// eslint-disable-next-line camelcase
var interfaceDurationTime = exports.interfaceDurationTime = function interfaceDurationTime() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    type: 1,
    router: null,
    interfaceThen: function interfaceThen() {},
    pageThen: function pageThen() {},
    filterInterface: []
  };
  var type = obj.type,
    router = obj.router,
    interfaceThen = obj.interfaceThen,
    pageThen = obj.pageThen,
    filterInterface = obj.filterInterface,
    samplingRate = obj.samplingRate;
  ckeckSome.updateWait(samplingRate);
  if (type === 1 || type === 0) {
    var originalXHR = window.XMLHttpRequest;
    window.XMLHttpRequest = /*#__PURE__*/function (_originalXHR) {
      function _class() {
        _classCallCheck(this, _class);
        return _callSuper(this, _class, arguments);
      }
      _inherits(_class, _originalXHR);
      return _createClass(_class, [{
        key: "open",
        value: function open(method, url) {
          this.requireUrl = url;
          this.startTime = Date.now();
          saveOfWindow('open', arguments);
          return _superPropGet(_class, "open", this, 3)([method, url]);
        }

        // send (body) {
        //   this.addEventListener('loadend', () => {
        //     // saveOfWindow('onload', { url: this.requireUrl, body, _startTime: this._startTime})
        //   })
        //   return super.send(body)
        // }
      }]);
    }(originalXHR);
    // 保存原始的 open 和 send 方法
    // const originalOpen = XMLHttpRequest.prototype.open
    // const originalSend = XMLHttpRequest.prototype.send

    // XMLHttpRequest.prototype.open = function () {
    //   try {
    //     // 保存请求的开始时间
    //     this._startTime = new Date().getTime()
    //     this.requireUrl = arguments[1]
    //     saveOfWindow('open', arguments)
    //   } catch (error) {
    //     console.log(error)
    //   }
    //   return originalOpen.apply(this, arguments)
    // }

    // XMLHttpRequest.prototype.send = function (body) {
    //   this.onload = (res) => {
    //     try {
    //       saveOfWindow('onload', { url: this.responseURL, body, _startTime: this._startTime, status: res.currentTarget.status })
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }

    //   this.onerror = (res) => {
    //     try {
    //       saveOfWindow('onerror', { url: this.requireUrl, body, _startTime: this._startTime, status: res.currentTarget.status })
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   return originalSend.apply(this, arguments)
    // }
  }
  if (type === 2 || type === 0) {
    // 保存原始的 fetch 方法
    var originalFetch = window.fetch;

    // 创建一个新的 fetch 方法
    window.fetch = function (url) {
      var _this = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // 请求开始前的处理
      try {
        this._startTime = new Date().getTime();
        saveOfWindow('open', [null, url]);
      } catch (error) {
        console.log(error);
      }
      // 创建一个 promise 以便拦截请求完成后的逻辑
      return originalFetch(url, options).then(function (response) {
        try {
          // saveOfWindow('onload', { url, body: options?.body, _startTime: this._startTime, status: response.status })
        } catch (error) {
          console.log(error);
        }
        return response;
      })["catch"](function (response) {
        // 请求失败时的处理
        try {
          saveOfWindow('onerror', {
            url: url,
            body: options === null || options === void 0 ? void 0 : options.body,
            _startTime: _this._startTime,
            status: 0
          });
        } catch (error) {
          console.log(error);
        }
        throw response;
      });
    };
  }

  // 监听资源加载完成事件
  var entryTypes = [];
  if (type === 1 || type === 0) {
    entryTypes.push('xmlhttprequest');
  } else if (type === 2 || type === 0) {
    entryTypes.push('fetch');
  }
  var observer = new PerformanceObserver(function (list) {
    list.getEntries().forEach(function (entry) {
      if (entryTypes.includes(entry.initiatorType)) {
        saveOfWindow('onload', {
          url: entry.name,
          duration: entry.duration
        });
      }
    });
  });
  observer.observe({
    entryTypes: ['resource']
  });
  var saveOfWindow = function saveOfWindow(module, data) {
    var _router$currentRoute, _router$currentRoute$, _router$currentRoute2;
    // 判断是否存在window.pageDueationTimeStore
    if (!window.pageDueationTimeStore) {
      return;
    }
    var pageDueationTime = window.pageDueationTimeStore;
    var pathString = (router === null || router === void 0 ? void 0 : (_router$currentRoute = router.currentRoute) === null || _router$currentRoute === void 0 ? void 0 : (_router$currentRoute$ = _router$currentRoute.value) === null || _router$currentRoute$ === void 0 ? void 0 : _router$currentRoute$.path) || (router === null || router === void 0 ? void 0 : (_router$currentRoute2 = router.currentRoute) === null || _router$currentRoute2 === void 0 ? void 0 : _router$currentRoute2.path) || router.currentRoute.fullPath;
    var pathKey = pageDueationTime[pathString];
    // 判断页面path是否被记录和 接口是否加载完毕
    if (!pathKey) {
      return;
    }
    if (module === 'open') {
      // eslint-disable-next-line no-sequences
      if (isFilterApi(data[1], filterInterface) || pathKey.isApiover) {
        return;
      }
      var interfaceKey = getApiID(data[1]) || splitUrl(data[1]);
      var haveApi = pathKey.apiObj[interfaceKey] !== undefined;
      // 下午优化逻辑
      if (!haveApi) {
        pathKey.apiObj[interfaceKey] = {
          startTime: new Date().getTime(),
          state: 0,
          endTime: null,
          isHidden: document.visibilityState === 'hidden'
        };
      } else if (pathKey.isConfig) {
        pathKey.apiObj[interfaceKey].startTime = new Date().getTime();
        pathKey.apiObj[interfaceKey].state = 0;
        pathKey.apiObj[interfaceKey].endTime = null;
        pathKey.apiObj[interfaceKey].isHidden = document.visibilityState === 'hidden';
      }
    } else if (module === 'onload' || module === 'onerror') {
      if (isFilterApi(data.url, filterInterface)) {
        return;
      }
      var apiId = getApiID(data.url);
      var urlApi = apiId || splitUrl(data.url);
      var objKey = pathKey.apiObj[urlApi];
      if (objKey) {
        objKey.endTime = new Date().getTime();
        objKey.state = 1;
        objKey.status = data.status;
        objKey.isHidden = objKey.isHidden === true ? true : document.visibilityState === 'hidden';
      }
      var duration = 0;
      if (typeof data.duration === 'number' && !isNaN(data.duration) && Number.isFinite(data.duration)) {
        duration = Math.floor(data.duration || 0);
      }
      if (duration === 0 && objKey) {
        duration = new Date().getTime() - objKey.startTime;
      }
      if (!(objKey !== null && objKey !== void 0 && objKey.isHidden)) {
        // 页面隐藏时不记录接口
        interfaceThen({
          url: data.url,
          duration: duration,
          apiId: apiId,
          status: data.status || NaN,
          body: data.body || {}
        });
      }
    }
    ckeckSome(pathKey, pageThen);
  };
};

// 过滤掉不纳入统计的接口，如埋点
function isFilterApi(url, filterInterface) {
  var backData = filterInterface.some(function (item) {
    return url.includes(item) === true;
  });
  return backData;
}

// 判断是否为ecsb请求并获取Api_ID
function getApiID(url) {
  if (url.indexOf('?ssdp=') !== -1) {
    var paransStr = 'http://domain.com?' + atob(url.split('?ssdp=')[1]);
    var urlParams = new URLSearchParams(new URL(paransStr).search);
    return urlParams.get('Api_ID');
  } else {
    return null;
  }
}

// 检查所有接口是否加载完毕
var ckeckSome = exports.ckeckSome = debounce(function (pathKey, pageThen) {
  if (pathKey.isApiover) return;
  var obj = pathKey.apiObj;
  if (JSON.stringify(obj) === '{}') {
    pathKey.isApiover = true;
    pathKey.isApiOverTime = pathKey.startTime + pathKey.el_render_time;
    pathKey.page_load_time = pathKey.el_render_time;
    pageThen(pathKey);
    return;
  }

  // 判读是否预制页面
  if (pathKey.isConfig) {
    // isConfigLength
    var objs = Object.keys(obj).filter(function (item) {
      return obj[item].isConfig && obj[item].state === 1;
    });
    if (objs.length === pathKey.isConfigLength) {
      var maxDate = findMax(obj);
      pathKey.isApiover = true;
      pathKey.isApiOverTime = maxDate;
      pathKey.page_load_time = maxDate - pathKey.startTime;
      if (isEnterBackend(obj)) {
        pageThen(pathKey);
      }
    }
    return objs;
  }
  var backData = Object.keys(obj).every(function (item) {
    return obj[item].state === 1;
  });
  if (backData) {
    var _maxDate = findMax(obj);
    pathKey.isApiover = true;
    pathKey.isApiOverTime = _maxDate;
    pathKey.page_load_time = _maxDate - pathKey.startTime;
    if (isEnterBackend(obj)) {
      pageThen(pathKey);
    }
  }
}, 200);
function isEnterBackend(obj) {
  return Object.keys(obj).every(function (item) {
    return obj[item].isHidden === false;
  });
}

// 去除域名、协议、端口号export function splitUrl(urlString) {
function splitUrl(urlString) {
  if (!hasHttpProtocol(urlString)) {
    urlString = window.location.pathname + urlString;
    urlString = urlString.replace(/\/\//g, '/');
  }
  var pathname = null;
  try {
    var url = new URL(urlString);
    pathname = url.pathname;
  } catch (error) {
    pathname = urlString;
  }
  return pathname;
}
// 判断是否有http协议
function hasHttpProtocol(str) {
  return str.includes('http://') || str.includes('https://');
}

// 查找最大时间戳
function findMax(obj) {
  var max = 0;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var value = obj[key].endTime;
      if (value > max) {
        max = value;
      }
    }
  }
  return max;
}

// 判断是否为对象字符串
// export const isObjectString = (value) => {
//   try {
//     const parsedValue = JSON.parse(value)
//     return typeof parsedValue === 'object' && parsedValue !== null
//   } catch (e) {
//     return false
//   }
// }

// 自定义防抖函数
// export function debounce (func, wait, immediate) {
//   let timer
//   return function () {
//     const context = this
//     const args = arguments

//     if (timer) clearTimeout(timer)
//     if (immediate) {
//       const callNow = !timer
//       timer = setTimeout(() => {
//         timer = null
//       }, wait)
//       if (callNow) func.apply(context, args)
//     } else {
//       timer = setTimeout(() => {
//         func.apply(context, args)
//       }, wait)
//     }
//   }
// }

// 自定义防抖函数，支持动态更新防抖时间
function debounce(func, wait, immediate) {
  var timer;
  var currentWait = wait;
  var debounced = function debounced() {
    var context = this;
    var args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(function () {
        timer = null;
      }, currentWait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(function () {
        func.apply(context, args);
      }, currentWait);
    }
  };

  // 添加一个更新防抖时间的函数
  debounced.updateWait = function (newWait) {
    currentWait = newWait;
  };
  return debounced;
}