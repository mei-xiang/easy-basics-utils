"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// 我们在开发过程中很多时候本地运行需要去线上复制token等参数，一天得复制几十次很容易把自己累死。
// 于是我就发明了这款一键复制功能，设计非常人性 
var copyDos = exports["default"] = /*#__PURE__*/function () {
  function copyDos() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
      copyDos: 'copyStorage'
    };
    _classCallCheck(this, copyDos);
    _defineProperty(this, "copyStorage", function () {
      var copyObj = {
        localStorage: {},
        sessionStorage: {}
      };
      for (var i = 0, len = localStorage.length; i < len; i++) {
        var _this$options;
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        if ((_this$options = _this.options) !== null && _this$options !== void 0 && _this$options.localStorage) {
          var _this$options2, _this$options3;
          if (Array.isArray((_this$options2 = _this.options) === null || _this$options2 === void 0 ? void 0 : _this$options2.localStorage) && (_this$options3 = _this.options) !== null && _this$options3 !== void 0 && _this$options3.localStorage.includes(key)) {
            copyObj.localStorage[key] = value;
          }
        } else {
          copyObj.localStorage[key] = value;
        }
      }
      for (var _i = 0, _len = sessionStorage.length; _i < _len; _i++) {
        var _this$options4;
        var _key = sessionStorage.key(_i);
        var _value = sessionStorage.getItem(_key);
        if ((_this$options4 = _this.options) !== null && _this$options4 !== void 0 && _this$options4.sessionStorage) {
          var _this$options5, _this$options6;
          if (Array.isArray((_this$options5 = _this.options) === null || _this$options5 === void 0 ? void 0 : _this$options5.sessionStorage) && (_this$options6 = _this.options) !== null && _this$options6 !== void 0 && _this$options6.sessionStorage.includes(_key)) {
            copyObj.sessionStorage[_key] = _value;
          }
        } else {
          copyObj.sessionStorage[_key] = _value;
        }
      }
      copyObj = JSON.stringify(copyObj);
      copyObj = encodeURI(copyObj);
      copyObj = btoa(copyObj);
      var htmlStr = "\n            <div id=\"utils-copy-dom\" style=\"width: 100vw;height: 100vh;position: fixed;top: 0px; left: 0px; display: flex; justify-content: center; align-items: center; z-index: 9999999; background-color: rgba(255, 255, 255, 0.3);backdrop-filter: blur(10px);box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\">\n                <div  style=\"width: 300px;\">\n                    <textarea type=\"textarea\" id=\"textToCopy\" value=\"\u590D\u5236\u8FD9\u6BB5\u6587\u672C\" style=\"width: 100%; font-size: 12px; border: 1px solid #e5e5e5; padding: 10px; border-radius: 10px; overflow: hidden;\"  rows=\"6\"></textarea>\n                    <button id=\"copyButton\" style=\"font-size: 14px; display: block; width: 110px; background-color: rgba(0, 0, 0, 0); border-radius: 10px; border: 1px solid #ff6633; color: #ff6633; height: 36px; margin: 10px auto; cursor: pointer;\" title=\"\u70B9\u51FB\u590D\u5236\">\u590D\u5236\u5230\u526A\u8D34\u677F</button>\n                </div>\n            </div>\n        ";
      document.body.innerHTML += htmlStr;
      document.getElementById('textToCopy').value = "writeStorage('".concat(copyObj, "')");
      console.log('请点击页面“复制到剪贴板”按钮');
      document.getElementById('copyButton').addEventListener('click', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var textToCopy;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              textToCopy = document.getElementById('textToCopy');
              if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy.value).then(function () {
                  console.log('复制成功！');
                })["catch"](function () {
                  console.log("复制失败，请手动选择文本框内容复制");
                });
                _this.removeFun();
              } else {
                textToCopy.focus();
                textToCopy.select();
                new Promise(function (resolve, reject) {
                  // 执行复制命令并移除文本框
                  document.execCommand("copy") ? resolve() : reject(new Error("出错了"));
                }).then(function () {
                  console.log("复制成功！");
                  _this.removeFun();
                }, function () {
                  console.log("复制失败，请手动选择文本框内容复制");
                  _this.removeFun();
                });
              }
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee);
      })));
    });
    _defineProperty(this, "removeFun", function () {
      if (document.getElementById('textToCopy') === null) {
        return;
      }
      document.getElementById('textToCopy').value = '';
      document.getElementById('copyButton').removeEventListener('click', function () {});
      var element = document.getElementById("utils-copy-dom");
      element.remove();
    });
    this.options = options;
    // 设置拷贝命令
    window[options.copyDos ? options.copyDos : 'copyStorage'] = this.copyStorage;
    window.writeStorage = this.writeStorage;
  }
  return _createClass(copyDos, [{
    key: "writeStorage",
    value: function writeStorage(str) {
      var timestamp = new Date().getTime();
      str = atob(str);
      // 编码转字符串
      str = decodeURI(str);
      str = JSON.parse(str);
      var localStorageTable = [];
      Object.keys(str.localStorage).forEach(function (i) {
        localStorage.setItem(i, str.localStorage[i]);
        localStorageTable.push({
          key: i,
          status: 'success'
        });
      });
      console.group('写入详情');
      console.table(localStorageTable);
      var sessionStorageTable = [];
      Object.keys(str.sessionStorage).forEach(function (i) {
        sessionStorage.setItem(i, str.sessionStorage[i]);
        sessionStorageTable.push({
          key: i,
          status: 'success'
        });
      });
      console.table(sessionStorageTable);
      return "\u5199\u5165\u8017\u65F6\uFF1A".concat((new Date().getTime() - timestamp) / 1000, " \u79D2");
    }
  }]);
}();