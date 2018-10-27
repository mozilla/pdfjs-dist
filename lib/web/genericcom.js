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
exports.GenericCom = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _app = require('./app');

var _preferences = require('./preferences');

var _download_manager = require('./download_manager');

var _genericl10n = require('./genericl10n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

;
var GenericCom = {};

var GenericPreferences = function (_BasePreferences) {
  _inherits(GenericPreferences, _BasePreferences);

  function GenericPreferences() {
    _classCallCheck(this, GenericPreferences);

    return _possibleConstructorReturn(this, (GenericPreferences.__proto__ || Object.getPrototypeOf(GenericPreferences)).apply(this, arguments));
  }

  _createClass(GenericPreferences, [{
    key: '_writeToStorage',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(prefObj) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                localStorage.setItem('pdfjs.preferences', JSON.stringify(prefObj));

              case 1:
              case 'end':
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
    key: '_readFromStorage',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2(prefObj) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', JSON.parse(localStorage.getItem('pdfjs.preferences')));

              case 1:
              case 'end':
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
  }]);

  return GenericPreferences;
}(_preferences.BasePreferences);

var GenericExternalServices = Object.create(_app.DefaultExternalServices);
GenericExternalServices.createDownloadManager = function (options) {
  return new _download_manager.DownloadManager(options);
};
GenericExternalServices.createPreferences = function () {
  return new GenericPreferences();
};
GenericExternalServices.createL10n = function (_ref3) {
  var _ref3$locale = _ref3.locale,
      locale = _ref3$locale === undefined ? 'en-US' : _ref3$locale;

  return new _genericl10n.GenericL10n(locale);
};
_app.PDFViewerApplication.externalServices = GenericExternalServices;
exports.GenericCom = GenericCom;