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
exports.moveToEndOfArray = exports.waitOnEventOrTimeout = exports.WaitOnType = exports.animationStarted = exports.normalizeWheelEventDelta = exports.binarySearchFirstItem = exports.watchScroll = exports.scrollIntoView = exports.getOutputScale = exports.approximateFraction = exports.getPageSizeInches = exports.roundToDivide = exports.getVisibleElements = exports.backtrackBeforeAllVisibleElements = exports.parseQueryString = exports.noContextMenuHandler = exports.getPDFFileNameFromURL = exports.ProgressBar = exports.EventBus = exports.NullL10n = exports.TextLayerMode = exports.RendererType = exports.PresentationModeState = exports.isPortraitOrientation = exports.isValidRotation = exports.VERTICAL_PADDING = exports.SCROLLBAR_PADDING = exports.MAX_AUTO_SCALE = exports.UNKNOWN_SCALE = exports.MAX_SCALE = exports.MIN_SCALE = exports.DEFAULT_SCALE = exports.DEFAULT_SCALE_VALUE = exports.CSS_UNITS = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var CSS_UNITS = 96.0 / 72.0;
var DEFAULT_SCALE_VALUE = 'auto';
var DEFAULT_SCALE = 1.0;
var MIN_SCALE = 0.10;
var MAX_SCALE = 10.0;
var UNKNOWN_SCALE = 0;
var MAX_AUTO_SCALE = 1.25;
var SCROLLBAR_PADDING = 40;
var VERTICAL_PADDING = 5;
var PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
var RendererType = {
  CANVAS: 'canvas',
  SVG: 'svg'
};
var TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_ENHANCE: 2
};
function formatL10nValue(text, args) {
  if (!args) {
    return text;
  }
  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, function (all, name) {
    return name in args ? args[name] : '{{' + name + '}}';
  });
}
var NullL10n = {
  getLanguage: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt('return', 'en-us');

            case 1:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function getLanguage() {
      return _ref.apply(this, arguments);
    }

    return getLanguage;
  }(),
  getDirection: function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt('return', 'ltr');

            case 1:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function getDirection() {
      return _ref2.apply(this, arguments);
    }

    return getDirection;
  }(),
  get: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee3(property, args, fallback) {
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt('return', formatL10nValue(fallback, args));

            case 1:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function get(_x, _x2, _x3) {
      return _ref3.apply(this, arguments);
    }

    return get;
  }(),
  translate: function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee4(element) {
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

    function translate(_x4) {
      return _ref4.apply(this, arguments);
    }

    return translate;
  }()
};
function getOutputScale(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
  var pixelRatio = devicePixelRatio / backingStoreRatio;
  return {
    sx: pixelRatio,
    sy: pixelRatio,
    scaled: pixelRatio !== 1
  };
}
function scrollIntoView(element, spot) {
  var skipOverflowHiddenElements = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  var parent = element.offsetParent;
  if (!parent) {
    console.error('offsetParent is not set -- cannot scroll');
    return;
  }
  var offsetY = element.offsetTop + element.clientTop;
  var offsetX = element.offsetLeft + element.clientLeft;
  while (parent.clientHeight === parent.scrollHeight && parent.clientWidth === parent.scrollWidth || skipOverflowHiddenElements && getComputedStyle(parent).overflow === 'hidden') {
    if (parent.dataset._scaleY) {
      offsetY /= parent.dataset._scaleY;
      offsetX /= parent.dataset._scaleX;
    }
    offsetY += parent.offsetTop;
    offsetX += parent.offsetLeft;
    parent = parent.offsetParent;
    if (!parent) {
      return;
    }
  }
  if (spot) {
    if (spot.top !== undefined) {
      offsetY += spot.top;
    }
    if (spot.left !== undefined) {
      offsetX += spot.left;
      parent.scrollLeft = offsetX;
    }
  }
  parent.scrollTop = offsetY;
}
function watchScroll(viewAreaElement, callback) {
  var debounceScroll = function debounceScroll(evt) {
    if (rAF) {
      return;
    }
    rAF = window.requestAnimationFrame(function viewAreaElementScrolled() {
      rAF = null;
      var currentX = viewAreaElement.scrollLeft;
      var lastX = state.lastX;
      if (currentX !== lastX) {
        state.right = currentX > lastX;
      }
      state.lastX = currentX;
      var currentY = viewAreaElement.scrollTop;
      var lastY = state.lastY;
      if (currentY !== lastY) {
        state.down = currentY > lastY;
      }
      state.lastY = currentY;
      callback(state);
    });
  };
  var state = {
    right: true,
    down: true,
    lastX: viewAreaElement.scrollLeft,
    lastY: viewAreaElement.scrollTop,
    _eventHandler: debounceScroll
  };
  var rAF = null;
  viewAreaElement.addEventListener('scroll', debounceScroll, true);
  return state;
}
function parseQueryString(query) {
  var parts = query.split('&');
  var params = Object.create(null);
  for (var i = 0, ii = parts.length; i < ii; ++i) {
    var param = parts[i].split('=');
    var key = param[0].toLowerCase();
    var value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }
  return params;
}
function binarySearchFirstItem(items, condition) {
  var minIndex = 0;
  var maxIndex = items.length - 1;
  if (items.length === 0 || !condition(items[maxIndex])) {
    return items.length;
  }
  if (condition(items[minIndex])) {
    return minIndex;
  }
  while (minIndex < maxIndex) {
    var currentIndex = minIndex + maxIndex >> 1;
    var currentItem = items[currentIndex];
    if (condition(currentItem)) {
      maxIndex = currentIndex;
    } else {
      minIndex = currentIndex + 1;
    }
  }
  return minIndex;
}
function approximateFraction(x) {
  if (Math.floor(x) === x) {
    return [x, 1];
  }
  var xinv = 1 / x;
  var limit = 8;
  if (xinv > limit) {
    return [1, limit];
  } else if (Math.floor(xinv) === xinv) {
    return [1, xinv];
  }
  var x_ = x > 1 ? xinv : x;
  var a = 0,
      b = 1,
      c = 1,
      d = 1;
  while (true) {
    var p = a + c,
        q = b + d;
    if (q > limit) {
      break;
    }
    if (x_ <= p / q) {
      c = p;
      d = q;
    } else {
      a = p;
      b = q;
    }
  }
  var result = void 0;
  if (x_ - a / b < c / d - x_) {
    result = x_ === x ? [a, b] : [b, a];
  } else {
    result = x_ === x ? [c, d] : [d, c];
  }
  return result;
}
function roundToDivide(x, div) {
  var r = x % div;
  return r === 0 ? x : Math.round(x - r + div);
}
function getPageSizeInches(_ref5) {
  var view = _ref5.view,
      userUnit = _ref5.userUnit,
      rotate = _ref5.rotate;

  var _view = _slicedToArray(view, 4),
      x1 = _view[0],
      y1 = _view[1],
      x2 = _view[2],
      y2 = _view[3];

  var changeOrientation = rotate % 180 !== 0;
  var width = (x2 - x1) / 72 * userUnit;
  var height = (y2 - y1) / 72 * userUnit;
  return {
    width: changeOrientation ? height : width,
    height: changeOrientation ? width : height
  };
}
function backtrackBeforeAllVisibleElements(index, views, top) {
  if (index < 2) {
    return index;
  }
  var elt = views[index].div;
  var pageTop = elt.offsetTop + elt.clientTop;
  if (pageTop >= top) {
    elt = views[index - 1].div;
    pageTop = elt.offsetTop + elt.clientTop;
  }
  for (var i = index - 2; i >= 0; --i) {
    elt = views[i].div;
    if (elt.offsetTop + elt.clientTop + elt.clientHeight <= pageTop) {
      break;
    }
    index = i;
  }
  return index;
}
function getVisibleElements(scrollEl, views) {
  var sortByVisibility = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var horizontal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var top = scrollEl.scrollTop,
      bottom = top + scrollEl.clientHeight;
  var left = scrollEl.scrollLeft,
      right = left + scrollEl.clientWidth;
  function isElementBottomAfterViewTop(view) {
    var element = view.div;
    var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }
  function isElementRightAfterViewLeft(view) {
    var element = view.div;
    var elementRight = element.offsetLeft + element.clientLeft + element.clientWidth;
    return elementRight > left;
  }
  var visible = [],
      view = void 0,
      element = void 0;
  var currentHeight = void 0,
      viewHeight = void 0,
      viewBottom = void 0,
      hiddenHeight = void 0;
  var currentWidth = void 0,
      viewWidth = void 0,
      viewRight = void 0,
      hiddenWidth = void 0;
  var percentVisible = void 0;
  var firstVisibleElementInd = views.length === 0 ? 0 : binarySearchFirstItem(views, horizontal ? isElementRightAfterViewLeft : isElementBottomAfterViewTop);
  if (views.length > 0 && !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }
  var lastEdge = horizontal ? right : -1;
  for (var i = firstVisibleElementInd, ii = views.length; i < ii; i++) {
    view = views[i];
    element = view.div;
    currentWidth = element.offsetLeft + element.clientLeft;
    currentHeight = element.offsetTop + element.clientTop;
    viewWidth = element.clientWidth;
    viewHeight = element.clientHeight;
    viewRight = currentWidth + viewWidth;
    viewBottom = currentHeight + viewHeight;
    if (lastEdge === -1) {
      if (viewBottom >= bottom) {
        lastEdge = viewBottom;
      }
    } else if ((horizontal ? currentWidth : currentHeight) > lastEdge) {
      break;
    }
    if (viewBottom <= top || currentHeight >= bottom || viewRight <= left || currentWidth >= right) {
      continue;
    }
    hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    percentVisible = (viewHeight - hiddenHeight) * (viewWidth - hiddenWidth) * 100 / viewHeight / viewWidth | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view: view,
      percent: percentVisible
    });
  }
  var first = visible[0];
  var last = visible[visible.length - 1];
  if (sortByVisibility) {
    visible.sort(function (a, b) {
      var pc = a.percent - b.percent;
      if (Math.abs(pc) > 0.001) {
        return -pc;
      }
      return a.id - b.id;
    });
  }
  return {
    first: first,
    last: last,
    views: visible
  };
}
function noContextMenuHandler(evt) {
  evt.preventDefault();
}
function isDataSchema(url) {
  var i = 0,
      ii = url.length;
  while (i < ii && url[i].trim() === '') {
    i++;
  }
  return url.substring(i, i + 5).toLowerCase() === 'data:';
}
function getPDFFileNameFromURL(url) {
  var defaultFilename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'document.pdf';

  if (typeof url !== 'string') {
    return defaultFilename;
  }
  if (isDataSchema(url)) {
    console.warn('getPDFFileNameFromURL: ' + 'ignoring "data:" URL for performance reasons.');
    return defaultFilename;
  }
  var reURI = /^(?:(?:[^:]+:)?\/\/[^\/]+)?([^?#]*)(\?[^#]*)?(#.*)?$/;
  var reFilename = /[^\/?#=]+\.pdf\b(?!.*\.pdf\b)/i;
  var splitURI = reURI.exec(url);
  var suggestedFilename = reFilename.exec(splitURI[1]) || reFilename.exec(splitURI[2]) || reFilename.exec(splitURI[3]);
  if (suggestedFilename) {
    suggestedFilename = suggestedFilename[0];
    if (suggestedFilename.includes('%')) {
      try {
        suggestedFilename = reFilename.exec(decodeURIComponent(suggestedFilename))[0];
      } catch (ex) {}
    }
  }
  return suggestedFilename || defaultFilename;
}
function normalizeWheelEventDelta(evt) {
  var delta = Math.sqrt(evt.deltaX * evt.deltaX + evt.deltaY * evt.deltaY);
  var angle = Math.atan2(evt.deltaY, evt.deltaX);
  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }
  var MOUSE_DOM_DELTA_PIXEL_MODE = 0;
  var MOUSE_DOM_DELTA_LINE_MODE = 1;
  var MOUSE_PIXELS_PER_LINE = 30;
  var MOUSE_LINES_PER_PAGE = 30;
  if (evt.deltaMode === MOUSE_DOM_DELTA_PIXEL_MODE) {
    delta /= MOUSE_PIXELS_PER_LINE * MOUSE_LINES_PER_PAGE;
  } else if (evt.deltaMode === MOUSE_DOM_DELTA_LINE_MODE) {
    delta /= MOUSE_LINES_PER_PAGE;
  }
  return delta;
}
function isValidRotation(angle) {
  return Number.isInteger(angle) && angle % 90 === 0;
}
function isPortraitOrientation(size) {
  return size.width <= size.height;
}
var WaitOnType = {
  EVENT: 'event',
  TIMEOUT: 'timeout'
};
function waitOnEventOrTimeout(_ref6) {
  var target = _ref6.target,
      name = _ref6.name,
      _ref6$delay = _ref6.delay,
      delay = _ref6$delay === undefined ? 0 : _ref6$delay;

  return new Promise(function (resolve, reject) {
    if ((typeof target === 'undefined' ? 'undefined' : _typeof(target)) !== 'object' || !(name && typeof name === 'string') || !(Number.isInteger(delay) && delay >= 0)) {
      throw new Error('waitOnEventOrTimeout - invalid parameters.');
    }
    function handler(type) {
      if (target instanceof EventBus) {
        target.off(name, eventHandler);
      } else {
        target.removeEventListener(name, eventHandler);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
      resolve(type);
    }
    var eventHandler = handler.bind(null, WaitOnType.EVENT);
    if (target instanceof EventBus) {
      target.on(name, eventHandler);
    } else {
      target.addEventListener(name, eventHandler);
    }
    var timeoutHandler = handler.bind(null, WaitOnType.TIMEOUT);
    var timeout = setTimeout(timeoutHandler, delay);
  });
}
var animationStarted = new Promise(function (resolve) {
  if (typeof window === 'undefined') {
    setTimeout(resolve, 20);
    return;
  }
  window.requestAnimationFrame(resolve);
});

var EventBus = function () {
  function EventBus() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref7$dispatchToDOM = _ref7.dispatchToDOM,
        dispatchToDOM = _ref7$dispatchToDOM === undefined ? false : _ref7$dispatchToDOM;

    _classCallCheck(this, EventBus);

    this._listeners = Object.create(null);
    this._dispatchToDOM = dispatchToDOM === true;
  }

  _createClass(EventBus, [{
    key: 'on',
    value: function on(eventName, listener) {
      var eventListeners = this._listeners[eventName];
      if (!eventListeners) {
        eventListeners = [];
        this._listeners[eventName] = eventListeners;
      }
      eventListeners.push(listener);
    }
  }, {
    key: 'off',
    value: function off(eventName, listener) {
      var eventListeners = this._listeners[eventName];
      var i = void 0;
      if (!eventListeners || (i = eventListeners.indexOf(listener)) < 0) {
        return;
      }
      eventListeners.splice(i, 1);
    }
  }, {
    key: 'dispatch',
    value: function dispatch(eventName) {
      var eventListeners = this._listeners[eventName];
      if (!eventListeners || eventListeners.length === 0) {
        if (this._dispatchToDOM) {
          var _args5 = Array.prototype.slice.call(arguments, 1);
          this._dispatchDOMEvent(eventName, _args5);
        }
        return;
      }
      var args = Array.prototype.slice.call(arguments, 1);
      eventListeners.slice(0).forEach(function (listener) {
        listener.apply(null, args);
      });
      if (this._dispatchToDOM) {
        this._dispatchDOMEvent(eventName, args);
      }
    }
  }, {
    key: '_dispatchDOMEvent',
    value: function _dispatchDOMEvent(eventName) {
      var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (!this._dispatchToDOM) {
        return;
      }
      var details = Object.create(null);
      if (args && args.length > 0) {
        var obj = args[0];
        for (var key in obj) {
          var value = obj[key];
          if (key === 'source') {
            if (value === window || value === document) {
              return;
            }
            continue;
          }
          details[key] = value;
        }
      }
      var event = document.createEvent('CustomEvent');
      event.initCustomEvent(eventName, true, true, details);
      document.dispatchEvent(event);
    }
  }]);

  return EventBus;
}();

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

var ProgressBar = function () {
  function ProgressBar(id) {
    var _ref8 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        height = _ref8.height,
        width = _ref8.width,
        units = _ref8.units;

    _classCallCheck(this, ProgressBar);

    this.visible = true;
    this.div = document.querySelector(id + ' .progress');
    this.bar = this.div.parentNode;
    this.height = height || 100;
    this.width = width || 100;
    this.units = units || '%';
    this.div.style.height = this.height + this.units;
    this.percent = 0;
  }

  _createClass(ProgressBar, [{
    key: '_updateBar',
    value: function _updateBar() {
      if (this._indeterminate) {
        this.div.classList.add('indeterminate');
        this.div.style.width = this.width + this.units;
        return;
      }
      this.div.classList.remove('indeterminate');
      var progressSize = this.width * this._percent / 100;
      this.div.style.width = progressSize + this.units;
    }
  }, {
    key: 'setWidth',
    value: function setWidth(viewer) {
      if (!viewer) {
        return;
      }
      var container = viewer.parentNode;
      var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;
      if (scrollbarWidth > 0) {
        this.bar.setAttribute('style', 'width: calc(100% - ' + scrollbarWidth + 'px);');
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      if (!this.visible) {
        return;
      }
      this.visible = false;
      this.bar.classList.add('hidden');
      document.body.classList.remove('loadingInProgress');
    }
  }, {
    key: 'show',
    value: function show() {
      if (this.visible) {
        return;
      }
      this.visible = true;
      document.body.classList.add('loadingInProgress');
      this.bar.classList.remove('hidden');
    }
  }, {
    key: 'percent',
    get: function get() {
      return this._percent;
    },
    set: function set(val) {
      this._indeterminate = isNaN(val);
      this._percent = clamp(val, 0, 100);
      this._updateBar();
    }
  }]);

  return ProgressBar;
}();

function moveToEndOfArray(arr, condition) {
  var moved = [],
      len = arr.length;
  var write = 0;
  for (var read = 0; read < len; ++read) {
    if (condition(arr[read])) {
      moved.push(arr[read]);
    } else {
      arr[write] = arr[read];
      ++write;
    }
  }
  for (var _read = 0; write < len; ++_read, ++write) {
    arr[write] = moved[_read];
  }
}
exports.CSS_UNITS = CSS_UNITS;
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
exports.MIN_SCALE = MIN_SCALE;
exports.MAX_SCALE = MAX_SCALE;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
exports.isValidRotation = isValidRotation;
exports.isPortraitOrientation = isPortraitOrientation;
exports.PresentationModeState = PresentationModeState;
exports.RendererType = RendererType;
exports.TextLayerMode = TextLayerMode;
exports.NullL10n = NullL10n;
exports.EventBus = EventBus;
exports.ProgressBar = ProgressBar;
exports.getPDFFileNameFromURL = getPDFFileNameFromURL;
exports.noContextMenuHandler = noContextMenuHandler;
exports.parseQueryString = parseQueryString;
exports.backtrackBeforeAllVisibleElements = backtrackBeforeAllVisibleElements;
exports.getVisibleElements = getVisibleElements;
exports.roundToDivide = roundToDivide;
exports.getPageSizeInches = getPageSizeInches;
exports.approximateFraction = approximateFraction;
exports.getOutputScale = getOutputScale;
exports.scrollIntoView = scrollIntoView;
exports.watchScroll = watchScroll;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.animationStarted = animationStarted;
exports.WaitOnType = WaitOnType;
exports.waitOnEventOrTimeout = waitOnEventOrTimeout;
exports.moveToEndOfArray = moveToEndOfArray;