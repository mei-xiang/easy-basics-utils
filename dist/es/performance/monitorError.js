"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.monitorError = void 0;
var monitorError = exports.monitorError = function monitorError() {
  var errorThen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
  try {
    document.addEventListener('DOMContentLoaded', function () {
      window.addEventListener('error', function (event) {
        if (event.error) {
          errorThen({
            errorInfo: event.error.stack
          });
        }
      });
      window.addEventListener('unhandledrejection', function (event) {
        errorThen({
          errorInfo: event.reason
        });
      });
    });
  } catch (error) {}
};