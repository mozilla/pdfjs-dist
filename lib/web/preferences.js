/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2018 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @licend The above is the entire license notice for the
 * Javascript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasePreferences = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultPreferences = null;
function getDefaultPreferences() {
  if (!defaultPreferences) {
    defaultPreferences = Promise.resolve({
      "showPreviousViewOnLoad": true,
      "defaultZoomValue": "",
      "sidebarViewOnLoad": 0,
      "cursorToolOnLoad": 0,
      "enableWebGL": false,
      "eventBusDispatchToDOM": false,
      "pdfBugEnabled": false,
      "disableRange": false,
      "disableStream": false,
      "disableAutoFetch": false,
      "disableFontFace": false,
      "textLayerMode": 1,
      "useOnlyCssZoom": false,
      "externalLinkTarget": 0,
      "renderer": "canvas",
      "renderInteractiveForms": false,
      "enablePrintAutoRotate": false,
      "disablePageMode": false,
      "disablePageLabels": false,
      "scrollModeOnLoad": 0,
      "spreadModeOnLoad": 0
    });
  }
  return defaultPreferences;
}

var BasePreferences = function () {
  function BasePreferences() {
    var _this = this;

    _classCallCheck(this, BasePreferences);

    if (this.constructor === BasePreferences) {
      throw new Error('Cannot initialize BasePreferences.');
    }
    this.prefs = null;
    this._initializedPromise = getDefaultPreferences().then(function (defaults) {
      Object.defineProperty(_this, 'defaults', {
        value: Object.freeze(defaults),
        writable: false,
        enumerable: true,
        configurable: false
      });
      _this.prefs = Object.assign(Object.create(null), defaults);
      return _this._readFromStorage(defaults);
    }).then(function (prefs) {
      if (!prefs) {
        return;
      }
      for (var name in prefs) {
        var defaultValue = _this.defaults[name],
            prefValue = prefs[name];
        if (defaultValue === undefined || (typeof prefValue === "undefined" ? "undefined" : _typeof(prefValue)) !== (typeof defaultValue === "undefined" ? "undefined" : _typeof(defaultValue))) {
          continue;
        }
        _this.prefs[name] = prefValue;
      }
    });
  }

  _createClass(BasePreferences, [{
    key: "_writeToStorage",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(prefObj) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                throw new Error('Not implemented: _writeToStorage');

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _writeToStorage(_x) {
        return _ref.apply(this, arguments);
      }

      return _writeToStorage;
    }()
  }, {
    key: "_readFromStorage",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(prefObj) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                throw new Error('Not implemented: _readFromStorage');

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _readFromStorage(_x2) {
        return _ref2.apply(this, arguments);
      }

      return _readFromStorage;
    }()
  }, {
    key: "reset",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._initializedPromise;

              case 2:
                this.prefs = Object.assign(Object.create(null), this.defaults);
                return _context3.abrupt("return", this._writeToStorage(this.defaults));

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function reset() {
        return _ref3.apply(this, arguments);
      }

      return reset;
    }()
  }, {
    key: "set",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(name, value) {
        var defaultValue, valueType, defaultType;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._initializedPromise;

              case 2:
                defaultValue = this.defaults[name];

                if (!(defaultValue === undefined)) {
                  _context4.next = 7;
                  break;
                }

                throw new Error("Set preference: \"" + name + "\" is undefined.");

              case 7:
                if (!(value === undefined)) {
                  _context4.next = 9;
                  break;
                }

                throw new Error('Set preference: no value is specified.');

              case 9:
                valueType = typeof value === "undefined" ? "undefined" : _typeof(value);
                defaultType = typeof defaultValue === "undefined" ? "undefined" : _typeof(defaultValue);

                if (!(valueType !== defaultType)) {
                  _context4.next = 19;
                  break;
                }

                if (!(valueType === 'number' && defaultType === 'string')) {
                  _context4.next = 16;
                  break;
                }

                value = value.toString();
                _context4.next = 17;
                break;

              case 16:
                throw new Error("Set preference: \"" + value + "\" is a " + valueType + ", " + ("expected a " + defaultType + "."));

              case 17:
                _context4.next = 21;
                break;

              case 19:
                if (!(valueType === 'number' && !Number.isInteger(value))) {
                  _context4.next = 21;
                  break;
                }

                throw new Error("Set preference: \"" + value + "\" must be an integer.");

              case 21:
                this.prefs[name] = value;
                return _context4.abrupt("return", this._writeToStorage(this.prefs));

              case 23:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function set(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(name) {
        var defaultValue, prefValue;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._initializedPromise;

              case 2:
                defaultValue = this.defaults[name];

                if (!(defaultValue === undefined)) {
                  _context5.next = 7;
                  break;
                }

                throw new Error("Get preference: \"" + name + "\" is undefined.");

              case 7:
                prefValue = this.prefs[name];

                if (!(prefValue !== undefined)) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", prefValue);

              case 10:
                return _context5.abrupt("return", defaultValue);

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x5) {
        return _ref5.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6() {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._initializedPromise;

              case 2:
                return _context6.abrupt("return", Object.assign(Object.create(null), this.defaults, this.prefs));

              case 3:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getAll() {
        return _ref6.apply(this, arguments);
      }

      return getAll;
    }()
  }]);

  return BasePreferences;
}();

exports.BasePreferences = BasePreferences;