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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewHistory = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_VIEW_HISTORY_CACHE_SIZE = 20;

var ViewHistory = function () {
  function ViewHistory(fingerprint) {
    var _this = this;

    var cacheSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_VIEW_HISTORY_CACHE_SIZE;

    _classCallCheck(this, ViewHistory);

    this.fingerprint = fingerprint;
    this.cacheSize = cacheSize;
    this._initializedPromise = this._readFromStorage().then(function (databaseStr) {
      var database = JSON.parse(databaseStr || '{}');
      if (!('files' in database)) {
        database.files = [];
      } else {
        while (database.files.length >= _this.cacheSize) {
          database.files.shift();
        }
      }
      var index = -1;
      for (var i = 0, length = database.files.length; i < length; i++) {
        var branch = database.files[i];
        if (branch.fingerprint === _this.fingerprint) {
          index = i;
          break;
        }
      }
      if (index === -1) {
        index = database.files.push({ fingerprint: _this.fingerprint }) - 1;
      }
      _this.file = database.files[index];
      _this.database = database;
    });
  }

  _createClass(ViewHistory, [{
    key: '_writeToStorage',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var databaseStr;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                databaseStr = JSON.stringify(this.database);

                localStorage.setItem('pdfjs.history', databaseStr);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _writeToStorage() {
        return _ref.apply(this, arguments);
      }

      return _writeToStorage;
    }()
  }, {
    key: '_readFromStorage',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', localStorage.getItem('pdfjs.history'));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _readFromStorage() {
        return _ref2.apply(this, arguments);
      }

      return _readFromStorage;
    }()
  }, {
    key: 'set',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(name, val) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._initializedPromise;

              case 2:
                this.file[name] = val;
                return _context3.abrupt('return', this._writeToStorage());

              case 4:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function set(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return set;
    }()
  }, {
    key: 'setMultiple',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(properties) {
        var name;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._initializedPromise;

              case 2:
                for (name in properties) {
                  this.file[name] = properties[name];
                }
                return _context4.abrupt('return', this._writeToStorage());

              case 4:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setMultiple(_x4) {
        return _ref4.apply(this, arguments);
      }

      return setMultiple;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(name, defaultValue) {
        var val;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._initializedPromise;

              case 2:
                val = this.file[name];
                return _context5.abrupt('return', val !== undefined ? val : defaultValue);

              case 4:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'getMultiple',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(properties) {
        var values, name, val;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this._initializedPromise;

              case 2:
                values = Object.create(null);

                for (name in properties) {
                  val = this.file[name];

                  values[name] = val !== undefined ? val : properties[name];
                }
                return _context6.abrupt('return', values);

              case 5:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getMultiple(_x7) {
        return _ref6.apply(this, arguments);
      }

      return getMultiple;
    }()
  }]);

  return ViewHistory;
}();

exports.ViewHistory = ViewHistory;