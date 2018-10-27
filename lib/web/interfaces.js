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

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IPDFLinkService = function () {
  function IPDFLinkService() {
    _classCallCheck(this, IPDFLinkService);
  }

  _createClass(IPDFLinkService, [{
    key: 'navigateTo',
    value: function navigateTo(dest) {}
  }, {
    key: 'getDestinationHash',
    value: function getDestinationHash(dest) {}
  }, {
    key: 'getAnchorUrl',
    value: function getAnchorUrl(hash) {}
  }, {
    key: 'setHash',
    value: function setHash(hash) {}
  }, {
    key: 'executeNamedAction',
    value: function executeNamedAction(action) {}
  }, {
    key: 'cachePageRef',
    value: function cachePageRef(pageNum, pageRef) {}
  }, {
    key: 'pagesCount',
    get: function get() {}
  }, {
    key: 'page',
    get: function get() {},
    set: function set(value) {}
  }, {
    key: 'rotation',
    get: function get() {},
    set: function set(value) {}
  }]);

  return IPDFLinkService;
}();

var IPDFHistory = function () {
  function IPDFHistory() {
    _classCallCheck(this, IPDFHistory);
  }

  _createClass(IPDFHistory, [{
    key: 'initialize',
    value: function initialize(fingerprint) {
      var resetHistory = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    }
  }, {
    key: 'push',
    value: function push(_ref) {
      var namedDest = _ref.namedDest,
          explicitDest = _ref.explicitDest,
          pageNumber = _ref.pageNumber;
    }
  }, {
    key: 'pushCurrentPosition',
    value: function pushCurrentPosition() {}
  }, {
    key: 'back',
    value: function back() {}
  }, {
    key: 'forward',
    value: function forward() {}
  }]);

  return IPDFHistory;
}();

var IRenderableView = function () {
  function IRenderableView() {
    _classCallCheck(this, IRenderableView);
  }

  _createClass(IRenderableView, [{
    key: 'draw',
    value: function draw() {}
  }, {
    key: 'resume',
    value: function resume() {}
  }, {
    key: 'renderingId',
    get: function get() {}
  }, {
    key: 'renderingState',
    get: function get() {}
  }]);

  return IRenderableView;
}();

var IPDFTextLayerFactory = function () {
  function IPDFTextLayerFactory() {
    _classCallCheck(this, IPDFTextLayerFactory);
  }

  _createClass(IPDFTextLayerFactory, [{
    key: 'createTextLayerBuilder',
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    }
  }]);

  return IPDFTextLayerFactory;
}();

var IPDFAnnotationLayerFactory = function () {
  function IPDFAnnotationLayerFactory() {
    _classCallCheck(this, IPDFAnnotationLayerFactory);
  }

  _createClass(IPDFAnnotationLayerFactory, [{
    key: 'createAnnotationLayerBuilder',
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var imageResourcesPath = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var renderInteractiveForms = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var l10n = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;
    }
  }]);

  return IPDFAnnotationLayerFactory;
}();

var IL10n = function () {
  function IL10n() {
    _classCallCheck(this, IL10n);
  }

  _createClass(IL10n, [{
    key: 'getLanguage',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLanguage() {
        return _ref2.apply(this, arguments);
      }

      return getLanguage;
    }()
  }, {
    key: 'getDirection',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDirection() {
        return _ref3.apply(this, arguments);
      }

      return getDirection;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(key, args, fallback) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x6, _x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'translate',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(element) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function translate(_x9) {
        return _ref5.apply(this, arguments);
      }

      return translate;
    }()
  }]);

  return IL10n;
}();