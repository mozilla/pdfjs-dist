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
exports.OverlayManager = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OverlayManager = function () {
  function OverlayManager() {
    _classCallCheck(this, OverlayManager);

    this._overlays = {};
    this._active = null;
    this._keyDownBound = this._keyDown.bind(this);
  }

  _createClass(OverlayManager, [{
    key: 'register',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(name, element) {
        var callerCloseMethod = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var canForceClose = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        var container;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                container = void 0;

                if (!(!name || !element || !(container = element.parentNode))) {
                  _context.next = 5;
                  break;
                }

                throw new Error('Not enough parameters.');

              case 5:
                if (!this._overlays[name]) {
                  _context.next = 7;
                  break;
                }

                throw new Error('The overlay is already registered.');

              case 7:
                this._overlays[name] = {
                  element: element,
                  container: container,
                  callerCloseMethod: callerCloseMethod,
                  canForceClose: canForceClose
                };

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function register(_x3, _x4) {
        return _ref.apply(this, arguments);
      }

      return register;
    }()
  }, {
    key: 'unregister',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(name) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this._overlays[name]) {
                  _context2.next = 4;
                  break;
                }

                throw new Error('The overlay does not exist.');

              case 4:
                if (!(this._active === name)) {
                  _context2.next = 6;
                  break;
                }

                throw new Error('The overlay cannot be removed while it is active.');

              case 6:
                delete this._overlays[name];

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function unregister(_x5) {
        return _ref2.apply(this, arguments);
      }

      return unregister;
    }()
  }, {
    key: 'open',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(name) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (this._overlays[name]) {
                  _context3.next = 4;
                  break;
                }

                throw new Error('The overlay does not exist.');

              case 4:
                if (!this._active) {
                  _context3.next = 14;
                  break;
                }

                if (!this._overlays[name].canForceClose) {
                  _context3.next = 9;
                  break;
                }

                this._closeThroughCaller();
                _context3.next = 14;
                break;

              case 9:
                if (!(this._active === name)) {
                  _context3.next = 13;
                  break;
                }

                throw new Error('The overlay is already active.');

              case 13:
                throw new Error('Another overlay is currently active.');

              case 14:
                this._active = name;
                this._overlays[this._active].element.classList.remove('hidden');
                this._overlays[this._active].container.classList.remove('hidden');
                window.addEventListener('keydown', this._keyDownBound);

              case 18:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function open(_x6) {
        return _ref3.apply(this, arguments);
      }

      return open;
    }()
  }, {
    key: 'close',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(name) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (this._overlays[name]) {
                  _context4.next = 4;
                  break;
                }

                throw new Error('The overlay does not exist.');

              case 4:
                if (this._active) {
                  _context4.next = 8;
                  break;
                }

                throw new Error('The overlay is currently not active.');

              case 8:
                if (!(this._active !== name)) {
                  _context4.next = 10;
                  break;
                }

                throw new Error('Another overlay is currently active.');

              case 10:
                this._overlays[this._active].container.classList.add('hidden');
                this._overlays[this._active].element.classList.add('hidden');
                this._active = null;
                window.removeEventListener('keydown', this._keyDownBound);

              case 14:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function close(_x7) {
        return _ref4.apply(this, arguments);
      }

      return close;
    }()
  }, {
    key: '_keyDown',
    value: function _keyDown(evt) {
      if (this._active && evt.keyCode === 27) {
        this._closeThroughCaller();
        evt.preventDefault();
      }
    }
  }, {
    key: '_closeThroughCaller',
    value: function _closeThroughCaller() {
      if (this._overlays[this._active].callerCloseMethod) {
        this._overlays[this._active].callerCloseMethod();
      }
      if (this._active) {
        this.close(this._active);
      }
    }
  }, {
    key: 'active',
    get: function get() {
      return this._active;
    }
  }]);

  return OverlayManager;
}();

exports.OverlayManager = OverlayManager;