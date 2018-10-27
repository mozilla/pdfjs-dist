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
exports.FirefoxCom = exports.DownloadManager = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('../extensions/firefox/tools/l10n');

var _pdf = require('../pdf');

var _preferences = require('./preferences');

var _app = require('./app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  throw new Error('Module "pdfjs-web/firefoxcom" shall not be used outside ' + 'FIREFOX and MOZCENTRAL builds.');
}
var FirefoxCom = function FirefoxComClosure() {
  return {
    requestSync: function requestSync(action, data) {
      var request = document.createTextNode('');
      document.documentElement.appendChild(request);
      var sender = document.createEvent('CustomEvent');
      sender.initCustomEvent('pdf.js.message', true, false, {
        action: action,
        data: data,
        sync: true
      });
      request.dispatchEvent(sender);
      var response = sender.detail.response;
      document.documentElement.removeChild(request);
      return response;
    },
    request: function request(action, data, callback) {
      var request = document.createTextNode('');
      if (callback) {
        document.addEventListener('pdf.js.response', function listener(event) {
          var node = event.target;
          var response = event.detail.response;
          document.documentElement.removeChild(node);
          document.removeEventListener('pdf.js.response', listener);
          return callback(response);
        });
      }
      document.documentElement.appendChild(request);
      var sender = document.createEvent('CustomEvent');
      sender.initCustomEvent('pdf.js.message', true, false, {
        action: action,
        data: data,
        sync: false,
        responseExpected: !!callback
      });
      return request.dispatchEvent(sender);
    }
  };
}();

var DownloadManager = function () {
  function DownloadManager(options) {
    _classCallCheck(this, DownloadManager);

    this.disableCreateObjectURL = false;
  }

  _createClass(DownloadManager, [{
    key: 'downloadUrl',
    value: function downloadUrl(url, filename) {
      FirefoxCom.request('download', {
        originalUrl: url,
        filename: filename
      });
    }
  }, {
    key: 'downloadData',
    value: function downloadData(data, filename, contentType) {
      var blobUrl = (0, _pdf.createObjectURL)(data, contentType);
      FirefoxCom.request('download', {
        blobUrl: blobUrl,
        originalUrl: blobUrl,
        filename: filename,
        isAttachment: true
      });
    }
  }, {
    key: 'download',
    value: function download(blob, url, filename) {
      var _this = this;

      var blobUrl = _pdf.URL.createObjectURL(blob);
      var onResponse = function onResponse(err) {
        if (err && _this.onerror) {
          _this.onerror(err);
        }
        _pdf.URL.revokeObjectURL(blobUrl);
      };
      FirefoxCom.request('download', {
        blobUrl: blobUrl,
        originalUrl: url,
        filename: filename
      }, onResponse);
    }
  }]);

  return DownloadManager;
}();

var FirefoxPreferences = function (_BasePreferences) {
  _inherits(FirefoxPreferences, _BasePreferences);

  function FirefoxPreferences() {
    _classCallCheck(this, FirefoxPreferences);

    return _possibleConstructorReturn(this, (FirefoxPreferences.__proto__ || Object.getPrototypeOf(FirefoxPreferences)).apply(this, arguments));
  }

  _createClass(FirefoxPreferences, [{
    key: '_writeToStorage',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee(prefObj) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', new Promise(function (resolve) {
                  FirefoxCom.request('setPreferences', prefObj, resolve);
                }));

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
                return _context2.abrupt('return', new Promise(function (resolve) {
                  FirefoxCom.request('getPreferences', prefObj, function (prefStr) {
                    var readPrefs = JSON.parse(prefStr);
                    resolve(readPrefs);
                  });
                }));

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

  return FirefoxPreferences;
}(_preferences.BasePreferences);

var MozL10n = function () {
  function MozL10n(mozL10n) {
    _classCallCheck(this, MozL10n);

    this.mozL10n = mozL10n;
  }

  _createClass(MozL10n, [{
    key: 'getLanguage',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', this.mozL10n.getLanguage());

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getLanguage() {
        return _ref3.apply(this, arguments);
      }

      return getLanguage;
    }()
  }, {
    key: 'getDirection',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt('return', this.mozL10n.getDirection());

              case 1:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getDirection() {
        return _ref4.apply(this, arguments);
      }

      return getDirection;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee5(property, args, fallback) {
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt('return', this.mozL10n.get(property, args, fallback));

              case 1:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function get(_x3, _x4, _x5) {
        return _ref5.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'translate',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee6(element) {
        return _regenerator2.default.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                this.mozL10n.translate(element);

              case 1:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function translate(_x6) {
        return _ref6.apply(this, arguments);
      }

      return translate;
    }()
  }]);

  return MozL10n;
}();

(function listenFindEvents() {
  var events = ['find', 'findagain', 'findhighlightallchange', 'findcasesensitivitychange', 'findentirewordchange', 'findbarclose'];
  var handleEvent = function handleEvent(_ref7) {
    var type = _ref7.type,
        detail = _ref7.detail;

    if (!_app.PDFViewerApplication.initialized) {
      return;
    }
    if (type === 'findbarclose') {
      _app.PDFViewerApplication.eventBus.dispatch('findbarclose', { source: window });
      return;
    }
    _app.PDFViewerApplication.eventBus.dispatch('find', {
      source: window,
      type: type.substring('find'.length),
      query: detail.query,
      phraseSearch: true,
      caseSensitive: !!detail.caseSensitive,
      entireWord: !!detail.entireWord,
      highlightAll: !!detail.highlightAll,
      findPrevious: !!detail.findPrevious
    });
  };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = events[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var event = _step.value;

      window.addEventListener(event, handleEvent);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
})();

var FirefoxComDataRangeTransport = function (_PDFDataRangeTranspor) {
  _inherits(FirefoxComDataRangeTransport, _PDFDataRangeTranspor);

  function FirefoxComDataRangeTransport() {
    _classCallCheck(this, FirefoxComDataRangeTransport);

    return _possibleConstructorReturn(this, (FirefoxComDataRangeTransport.__proto__ || Object.getPrototypeOf(FirefoxComDataRangeTransport)).apply(this, arguments));
  }

  _createClass(FirefoxComDataRangeTransport, [{
    key: 'requestDataRange',
    value: function requestDataRange(begin, end) {
      FirefoxCom.request('requestDataRange', {
        begin: begin,
        end: end
      });
    }
  }, {
    key: 'abort',
    value: function abort() {
      FirefoxCom.requestSync('abortLoading', null);
    }
  }]);

  return FirefoxComDataRangeTransport;
}(_pdf.PDFDataRangeTransport);

_app.PDFViewerApplication.externalServices = {
  updateFindControlState: function updateFindControlState(data) {
    FirefoxCom.request('updateFindControlState', data);
  },
  updateFindMatchesCount: function updateFindMatchesCount(data) {
    FirefoxCom.request('updateFindMatchesCount', data);
  },
  initPassiveLoading: function initPassiveLoading(callbacks) {
    var pdfDataRangeTransport = void 0;
    window.addEventListener('message', function windowMessage(e) {
      if (e.source !== null) {
        console.warn('Rejected untrusted message from ' + e.origin);
        return;
      }
      var args = e.data;
      if ((typeof args === 'undefined' ? 'undefined' : _typeof(args)) !== 'object' || !('pdfjsLoadAction' in args)) {
        return;
      }
      switch (args.pdfjsLoadAction) {
        case 'supportsRangedLoading':
          pdfDataRangeTransport = new FirefoxComDataRangeTransport(args.length, args.data);
          callbacks.onOpenWithTransport(args.pdfUrl, args.length, pdfDataRangeTransport);
          break;
        case 'range':
          pdfDataRangeTransport.onDataRange(args.begin, args.chunk);
          break;
        case 'rangeProgress':
          pdfDataRangeTransport.onDataProgress(args.loaded);
          break;
        case 'progressiveRead':
          pdfDataRangeTransport.onDataProgressiveRead(args.chunk);
          break;
        case 'progress':
          callbacks.onProgress(args.loaded, args.total);
          break;
        case 'complete':
          if (!args.data) {
            callbacks.onError(args.errorCode);
            break;
          }
          callbacks.onOpenWithData(args.data);
          break;
      }
    });
    FirefoxCom.requestSync('initPassiveLoading', null);
  },
  fallback: function fallback(data, callback) {
    FirefoxCom.request('fallback', data, callback);
  },
  reportTelemetry: function reportTelemetry(data) {
    FirefoxCom.request('reportTelemetry', JSON.stringify(data));
  },
  createDownloadManager: function createDownloadManager(options) {
    return new DownloadManager(options);
  },
  createPreferences: function createPreferences() {
    return new FirefoxPreferences();
  },
  createL10n: function createL10n(options) {
    var mozL10n = document.mozL10n;
    return new MozL10n(mozL10n);
  },

  get supportsIntegratedFind() {
    var support = FirefoxCom.requestSync('supportsIntegratedFind');
    return (0, _pdf.shadow)(this, 'supportsIntegratedFind', support);
  },
  get supportsDocumentFonts() {
    var support = FirefoxCom.requestSync('supportsDocumentFonts');
    return (0, _pdf.shadow)(this, 'supportsDocumentFonts', support);
  },
  get supportsDocumentColors() {
    var support = FirefoxCom.requestSync('supportsDocumentColors');
    return (0, _pdf.shadow)(this, 'supportsDocumentColors', support);
  },
  get supportedMouseWheelZoomModifierKeys() {
    var support = FirefoxCom.requestSync('supportedMouseWheelZoomModifierKeys');
    return (0, _pdf.shadow)(this, 'supportedMouseWheelZoomModifierKeys', support);
  }
};
document.mozL10n.setExternalLocalizerServices({
  getLocale: function getLocale() {
    return FirefoxCom.requestSync('getLocale', null);
  },
  getStrings: function getStrings(key) {
    return FirefoxCom.requestSync('getStrings', key);
  }
});
exports.DownloadManager = DownloadManager;
exports.FirefoxCom = FirefoxCom;