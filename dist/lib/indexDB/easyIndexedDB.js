"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var easyIndexedDB = exports["default"] = /*#__PURE__*/function () {
  function easyIndexedDB(dbName, version, storeName, schema) {
    _classCallCheck(this, easyIndexedDB);
    this.dbName = dbName; // 数据库名称
    this.version = version; // 数据库版本
    this.storeName = storeName; // 数据表名称
    this.schema = schema; // 数据表字段 schema
    this.db = null; // 数据库实例
    this.init(); // 初始化数据库
  }

  // 初始化数据库和数据表
  return _createClass(easyIndexedDB, [{
    key: "init",
    value: function init() {
      var _this = this;
      var request = indexedDB.open(this.dbName, this.version);
      request.onupgradeneeded = function (event) {
        _this.db = event.target.result;
        if (!_this.db.objectStoreNames.contains(_this.storeName)) {
          var objectStore = _this.db.createObjectStore(_this.storeName, {
            keyPath: "key"
          });
          _this.schema.forEach(function (field) {
            return objectStore.createIndex(field, field, {
              unique: false
            });
          });
          console.log("\u521B\u5EFA\u6570\u636E\u8868 '".concat(_this.storeName, "'\uFF0C\u5B57\u6BB5 schema: ").concat(_this.schema));
        }
      };
      request.onsuccess = function (event) {
        _this.db = event.target.result;
        console.log("\u6570\u636E\u5E93 '".concat(_this.dbName, "' \u6210\u529F\u6253\u5F00."));
      };
      request.onerror = function (event) {
        console.error("\u6253\u5F00\u6570\u636E\u5E93\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(event.target.error));
      };
    }

    // 确保数据库已初始化
  }, {
    key: "ensureDbInitialized",
    value: function ensureDbInitialized() {
      var _this2 = this;
      return new Promise(function (resolve, reject) {
        if (!_this2.db) {
          reject("数据库未初始化");
        } else {
          resolve();
        }
      });
    }

    // 添加或更新数据
  }, {
    key: "add",
    value: function add(data) {
      var _this3 = this;
      return this.ensureDbInitialized().then(function () {
        var tx = _this3.db.transaction(_this3.storeName, "readwrite");
        var store = tx.objectStore(_this3.storeName);
        return new Promise(function (resolve, reject) {
          var request = store.get(data.key);
          request.onsuccess = function () {
            var existingData = request.result;
            if (existingData) {
              // 如果数据已存在，进行更新
              Object.assign(existingData, data);
              var updateRequest = store.put(existingData);
              updateRequest.onsuccess = function () {
                console.log("\u66F4\u65B0\u6210\u529F\uFF0Ckey '".concat(data.key, "' \u7684\u6570\u636E:"), existingData);
                resolve();
              };
              updateRequest.onerror = function () {
                console.error("\u66F4\u65B0 key '".concat(data.key, "' \u7684\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ").concat(updateRequest.error));
                reject(updateRequest.error);
              };
            } else {
              // 如果数据不存在，进行添加
              var addRequest = store.add(data);
              addRequest.onsuccess = function () {
                console.log("\u6570\u636E\u6DFB\u52A0\u6210\u529F:", data);
                resolve();
              };
              addRequest.onerror = function () {
                console.error("\u6DFB\u52A0\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(addRequest.error));
                reject(addRequest.error);
              };
            }
          };
          request.onerror = function () {
            console.error("\u83B7\u53D6\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(request.error));
            reject(request.error);
          };
        });
      });
    }

    // 根据 key 或指定的键值对查找数据
  }, {
    key: "get",
    value: function get(keyOrQuery) {
      var _this4 = this;
      return this.ensureDbInitialized().then(function () {
        var tx = _this4.db.transaction(_this4.storeName);
        var store = tx.objectStore(_this4.storeName);
        return new Promise(function (resolve, reject) {
          // 如果传入的是对象，则进行索引查找
          if (_typeof(keyOrQuery) === "object") {
            var _Object$entries$ = _slicedToArray(Object.entries(keyOrQuery)[0], 2),
              queryKey = _Object$entries$[0],
              queryValue = _Object$entries$[1];
            var index = store.index(queryKey);
            var request = index.get(queryValue);
            request.onsuccess = function () {
              console.log("\u6839\u636E ".concat(queryKey, "='").concat(queryValue, "' \u6210\u529F\u83B7\u53D6\u6570\u636E:"), request.result);
              resolve(request.result);
            };
            request.onerror = function () {
              console.error("\u6839\u636E ".concat(queryKey, "='").concat(queryValue, "' \u83B7\u53D6\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ").concat(request.error));
              reject(request.error);
            };
          } else {
            // 如果传入的是 key，则直接通过 key 查找
            var _request = store.get(keyOrQuery);
            _request.onsuccess = function () {
              console.log("\u6839\u636E key '".concat(keyOrQuery, "' \u6210\u529F\u83B7\u53D6\u6570\u636E:"), _request.result);
              resolve(_request.result);
            };
            _request.onerror = function () {
              console.error("\u6839\u636E key '".concat(keyOrQuery, "' \u83B7\u53D6\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ").concat(_request.error));
              reject(_request.error);
            };
          }
        });
      });
    }

    // 更新数据，可以通过 key 或键值对查找
  }, {
    key: "update",
    value: function update(keyOrQuery, newData) {
      var _this5 = this;
      return this.get(keyOrQuery).then(function (data) {
        if (!data) {
          console.error("\u6CA1\u6709\u627E\u5230\u6570\u636E");
          return Promise.reject("\u6CA1\u6709\u627E\u5230\u6570\u636E");
        }
        Object.assign(data, newData); // 合并更新数据

        return _this5.ensureDbInitialized().then(function () {
          var tx = _this5.db.transaction(_this5.storeName, "readwrite");
          var store = tx.objectStore(_this5.storeName);
          return new Promise(function (resolve, reject) {
            var updateRequest = store.put(data);
            updateRequest.onsuccess = function () {
              console.log("\u66F4\u65B0\u6210\u529F\uFF0C\u6570\u636E:", data);
              resolve();
            };
            updateRequest.onerror = function () {
              console.error("\u66F4\u65B0\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(updateRequest.error));
              reject(updateRequest.error);
            };
          });
        });
      });
    }

    // 删除数据，可以通过 key 或键值对查找
  }, {
    key: "delete",
    value: function _delete(keyOrQuery) {
      var _this6 = this;
      return this.get(keyOrQuery).then(function (data) {
        if (!data) {
          console.error("\u6CA1\u6709\u627E\u5230\u6570\u636E");
          return Promise.reject("\u6CA1\u6709\u627E\u5230\u6570\u636E");
        }
        return _this6.ensureDbInitialized().then(function () {
          var tx = _this6.db.transaction(_this6.storeName, "readwrite");
          var store = tx.objectStore(_this6.storeName);
          return new Promise(function (resolve, reject) {
            var deleteRequest = store["delete"](data.key);
            deleteRequest.onsuccess = function () {
              console.log("\u6210\u529F\u5220\u9664 key '".concat(data.key, "' \u7684\u6570\u636E"));
              resolve();
            };
            deleteRequest.onerror = function () {
              console.error("\u5220\u9664 key '".concat(data.key, "' \u7684\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ").concat(deleteRequest.error));
              reject(deleteRequest.error);
            };
          });
        });
      });
    }

    // 事务操作，支持多个操作
  }, {
    key: "transaction",
    value: function transaction(operations) {
      var _this7 = this;
      return this.ensureDbInitialized().then(function () {
        var tx = _this7.db.transaction(_this7.storeName, "readwrite");
        var store = tx.objectStore(_this7.storeName);
        return new Promise(function (resolve, reject) {
          operations.forEach(function (op) {
            var method = op.method,
              args = op.args;
            if (method === "add") {
              var data = args[0];
              var request = store.get(data.key);
              request.onsuccess = function () {
                var existingData = request.result;
                if (existingData) {
                  // 如果数据已存在，进行更新
                  Object.assign(existingData, data);
                  var updateRequest = store.put(existingData);
                  updateRequest.onerror = function () {
                    console.error("\u66F4\u65B0 key '".concat(data.key, "' \u7684\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ").concat(updateRequest.error));
                    reject(updateRequest.error);
                  };
                } else {
                  // 如果数据不存在，执行添加操作
                  var addRequest = store.add(data);
                  addRequest.onerror = function () {
                    console.error("\u6DFB\u52A0\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(addRequest.error));
                    reject(addRequest.error);
                  };
                }
              };
              request.onerror = function () {
                console.error("\u83B7\u53D6\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(request.error));
                reject(request.error);
              };
            } else if (method === "update") {
              var keyOrQuery = args[0];
              var newData = args[1];
              _this7.get(keyOrQuery).then(function (data) {
                if (data) {
                  Object.assign(data, newData); // 合并更新数据

                  var updateRequest = store.put(data);
                  updateRequest.onerror = function () {
                    console.error("\u66F4\u65B0\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(updateRequest.error));
                    reject(updateRequest.error);
                  };
                } else {
                  reject("\u6CA1\u6709\u627E\u5230\u6570\u636E");
                }
              })["catch"](function (err) {
                reject(err);
              });
            } else if (method === "delete") {
              var _keyOrQuery = args[0];
              _this7.get(_keyOrQuery).then(function (data) {
                if (data) {
                  var deleteRequest = store["delete"](data.key);
                  deleteRequest.onerror = function () {
                    console.error("\u5220\u9664\u6570\u636E\u65F6\u53D1\u751F\u9519\u8BEF: ".concat(deleteRequest.error));
                    reject(deleteRequest.error);
                  };
                } else {
                  reject("\u6CA1\u6709\u627E\u5230\u6570\u636E");
                }
              })["catch"](function (err) {
                reject(err);
              });
            } else {
              var _request2 = store[method].apply(store, _toConsumableArray(args)); // 其他操作

              _request2.onerror = function () {
                console.error("\u6267\u884C ".concat(method, " \u64CD\u4F5C\u65F6\u53D1\u751F\u9519\u8BEF: ").concat(_request2.error));
                reject(_request2.error);
              };
            }
          });
          tx.oncomplete = function () {
            console.log("事务成功完成.");
            resolve();
          };
          tx.onerror = function (event) {
            console.error("事务失败: ", event.target.error);
            reject(event.target.error);
          };
        });
      });
    }
  }]);
}();