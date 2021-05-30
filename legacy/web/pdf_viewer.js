/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
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

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pdfjs-dist/web/pdf_viewer", [], factory);
	else if(typeof exports === 'object')
		exports["pdfjs-dist/web/pdf_viewer"] = factory();
	else
		root["pdfjs-dist/web/pdf_viewer"] = root.pdfjsViewer = factory();
})(this, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DefaultAnnotationLayerFactory = exports.AnnotationLayerBuilder = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

var _l10n_utils = __w_pdfjs_require__(3);

var _pdf_link_service = __w_pdfjs_require__(6);

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationLayerBuilder = /*#__PURE__*/function () {
  function AnnotationLayerBuilder(_ref) {
    var pageDiv = _ref.pageDiv,
        pdfPage = _ref.pdfPage,
        linkService = _ref.linkService,
        downloadManager = _ref.downloadManager,
        _ref$annotationStorag = _ref.annotationStorage,
        annotationStorage = _ref$annotationStorag === void 0 ? null : _ref$annotationStorag,
        _ref$imageResourcesPa = _ref.imageResourcesPath,
        imageResourcesPath = _ref$imageResourcesPa === void 0 ? "" : _ref$imageResourcesPa,
        _ref$renderInteractiv = _ref.renderInteractiveForms,
        renderInteractiveForms = _ref$renderInteractiv === void 0 ? true : _ref$renderInteractiv,
        _ref$l10n = _ref.l10n,
        l10n = _ref$l10n === void 0 ? _l10n_utils.NullL10n : _ref$l10n,
        _ref$enableScripting = _ref.enableScripting,
        enableScripting = _ref$enableScripting === void 0 ? false : _ref$enableScripting,
        _ref$hasJSActionsProm = _ref.hasJSActionsPromise,
        hasJSActionsPromise = _ref$hasJSActionsProm === void 0 ? null : _ref$hasJSActionsProm,
        _ref$mouseState = _ref.mouseState,
        mouseState = _ref$mouseState === void 0 ? null : _ref$mouseState;

    _classCallCheck(this, AnnotationLayerBuilder);

    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.linkService = linkService;
    this.downloadManager = downloadManager;
    this.imageResourcesPath = imageResourcesPath;
    this.renderInteractiveForms = renderInteractiveForms;
    this.l10n = l10n;
    this.annotationStorage = annotationStorage;
    this.enableScripting = enableScripting;
    this._hasJSActionsPromise = hasJSActionsPromise;
    this._mouseState = mouseState;
    this.div = null;
    this._cancelled = false;
  }

  _createClass(AnnotationLayerBuilder, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var intent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "display";
      return Promise.all([this.pdfPage.getAnnotations({
        intent: intent
      }), this._hasJSActionsPromise]).then(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            annotations = _ref3[0],
            _ref3$ = _ref3[1],
            hasJSActions = _ref3$ === void 0 ? false : _ref3$;

        if (_this._cancelled) {
          return;
        }

        if (annotations.length === 0) {
          return;
        }

        var parameters = {
          viewport: viewport.clone({
            dontFlip: true
          }),
          div: _this.div,
          annotations: annotations,
          page: _this.pdfPage,
          imageResourcesPath: _this.imageResourcesPath,
          renderInteractiveForms: _this.renderInteractiveForms,
          linkService: _this.linkService,
          downloadManager: _this.downloadManager,
          annotationStorage: _this.annotationStorage,
          enableScripting: _this.enableScripting,
          hasJSActions: hasJSActions,
          mouseState: _this._mouseState
        };

        if (_this.div) {
          _pdfjsLib.AnnotationLayer.update(parameters);
        } else {
          _this.div = document.createElement("div");
          _this.div.className = "annotationLayer";

          _this.pageDiv.appendChild(_this.div);

          parameters.div = _this.div;

          _pdfjsLib.AnnotationLayer.render(parameters);

          _this.l10n.translate(_this.div);
        }
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._cancelled = true;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.div) {
        return;
      }

      this.div.hidden = true;
    }
  }]);

  return AnnotationLayerBuilder;
}();

exports.AnnotationLayerBuilder = AnnotationLayerBuilder;

var DefaultAnnotationLayerFactory = /*#__PURE__*/function () {
  function DefaultAnnotationLayerFactory() {
    _classCallCheck(this, DefaultAnnotationLayerFactory);
  }

  _createClass(DefaultAnnotationLayerFactory, [{
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderInteractiveForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : true;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _l10n_utils.NullL10n;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      return new AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        imageResourcesPath: imageResourcesPath,
        renderInteractiveForms: renderInteractiveForms,
        linkService: new _pdf_link_service.SimpleLinkService(),
        l10n: l10n,
        annotationStorage: annotationStorage,
        enableScripting: enableScripting,
        hasJSActionsPromise: hasJSActionsPromise,
        mouseState: mouseState
      });
    }
  }]);

  return DefaultAnnotationLayerFactory;
}();

exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;

/***/ }),
/* 2 */
/***/ ((module) => {



var pdfjsLib;

if (typeof window !== "undefined" && window["pdfjs-dist/build/pdf"]) {
  pdfjsLib = window["pdfjs-dist/build/pdf"];
} else {
  pdfjsLib = require("../build/pdf.js");
}

module.exports = pdfjsLib;

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getL10nFallback = getL10nFallback;
exports.NullL10n = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(4));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var DEFAULT_L10N_STRINGS = {
  of_pages: "of {{pagesCount}}",
  page_of_pages: "({{pageNumber}} of {{pagesCount}})",
  document_properties_kb: "{{size_kb}} KB ({{size_b}} bytes)",
  document_properties_mb: "{{size_mb}} MB ({{size_b}} bytes)",
  document_properties_date_string: "{{date}}, {{time}}",
  document_properties_page_size_unit_inches: "in",
  document_properties_page_size_unit_millimeters: "mm",
  document_properties_page_size_orientation_portrait: "portrait",
  document_properties_page_size_orientation_landscape: "landscape",
  document_properties_page_size_name_a3: "A3",
  document_properties_page_size_name_a4: "A4",
  document_properties_page_size_name_letter: "Letter",
  document_properties_page_size_name_legal: "Legal",
  document_properties_page_size_dimension_string: "{{width}} × {{height}} {{unit}} ({{orientation}})",
  document_properties_page_size_dimension_name_string: "{{width}} × {{height}} {{unit}} ({{name}}, {{orientation}})",
  document_properties_linearized_yes: "Yes",
  document_properties_linearized_no: "No",
  print_progress_percent: "{{progress}}%",
  "toggle_sidebar.title": "Toggle Sidebar",
  "toggle_sidebar_notification2.title": "Toggle Sidebar (document contains outline/attachments/layers)",
  additional_layers: "Additional Layers",
  page_landmark: "Page {{page}}",
  thumb_page_title: "Page {{page}}",
  thumb_page_canvas: "Thumbnail of Page {{page}}",
  find_reached_top: "Reached top of document, continued from bottom",
  find_reached_bottom: "Reached end of document, continued from top",
  "find_match_count[one]": "{{current}} of {{total}} match",
  "find_match_count[other]": "{{current}} of {{total}} matches",
  "find_match_count_limit[one]": "More than {{limit}} match",
  "find_match_count_limit[other]": "More than {{limit}} matches",
  find_not_found: "Phrase not found",
  error_version_info: "PDF.js v{{version}} (build: {{build}})",
  error_message: "Message: {{message}}",
  error_stack: "Stack: {{stack}}",
  error_file: "File: {{file}}",
  error_line: "Line: {{line}}",
  rendering_error: "An error occurred while rendering the page.",
  page_scale_width: "Page Width",
  page_scale_fit: "Page Fit",
  page_scale_auto: "Automatic Zoom",
  page_scale_actual: "Actual Size",
  page_scale_percent: "{{scale}}%",
  loading: "Loading…",
  loading_error: "An error occurred while loading the PDF.",
  invalid_file_error: "Invalid or corrupted PDF file.",
  missing_file_error: "Missing PDF file.",
  unexpected_response_error: "Unexpected server response.",
  printing_not_supported: "Warning: Printing is not fully supported by this browser.",
  printing_not_ready: "Warning: The PDF is not fully loaded for printing.",
  web_fonts_disabled: "Web fonts are disabled: unable to use embedded PDF fonts."
};

function getL10nFallback(key, args) {
  switch (key) {
    case "find_match_count":
      key = "find_match_count[".concat(args.total === 1 ? "one" : "other", "]");
      break;

    case "find_match_count_limit":
      key = "find_match_count_limit[".concat(args.limit === 1 ? "one" : "other", "]");
      break;
  }

  return DEFAULT_L10N_STRINGS[key] || "";
}

function formatL10nValue(text, args) {
  if (!args) {
    return text;
  }

  return text.replace(/\{\{\s*(\w+)\s*\}\}/g, function (all, name) {
    return name in args ? args[name] : "{{" + name + "}}";
  });
}

var NullL10n = {
  getLanguage: function getLanguage() {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", "en-us");

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  getDirection: function getDirection() {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", "ltr");

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }))();
  },
  get: function get(key) {
    var _arguments = arguments;
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var args, fallback;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              args = _arguments.length > 1 && _arguments[1] !== undefined ? _arguments[1] : null;
              fallback = _arguments.length > 2 && _arguments[2] !== undefined ? _arguments[2] : getL10nFallback(key, args);
              return _context3.abrupt("return", formatL10nValue(fallback, args));

            case 3:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }))();
  },
  translate: function translate(element) {
    return _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }))();
  }
};
exports.NullL10n = NullL10n;

/***/ }),
/* 4 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {



module.exports = __w_pdfjs_require__(5);

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __w_pdfjs_require__) => {

/* module decorator */ module = __w_pdfjs_require__.nmd(module);


function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var runtime = function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined;
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);
    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  exports.wrap = wrap;

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  exports.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  exports.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  exports.AsyncIterator = AsyncIterator;

  exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined) {
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator["return"]) {
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      context[delegate.resultName] = info.value;
      context.next = delegate.nextLoc;

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      return info;
    }

    context.delegate = null;
    return ContinueSentinel;
  }

  defineIteratorMethods(Gp);
  define(Gp, toStringTagSymbol, "Generator");

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse();
    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  exports.values = values;

  function doneResult() {
    return {
      value: undefined,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },
    stop: function stop() {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
  return exports;
}(( false ? 0 : _typeof(module)) === "object" ? module.exports : {});

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  Function("r", "regeneratorRuntime = r")(runtime);
}

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SimpleLinkService = exports.PDFLinkService = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(4));

var _ui_utils = __w_pdfjs_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFLinkService = /*#__PURE__*/function () {
  function PDFLinkService() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        eventBus = _ref.eventBus,
        _ref$externalLinkTarg = _ref.externalLinkTarget,
        externalLinkTarget = _ref$externalLinkTarg === void 0 ? null : _ref$externalLinkTarg,
        _ref$externalLinkRel = _ref.externalLinkRel,
        externalLinkRel = _ref$externalLinkRel === void 0 ? null : _ref$externalLinkRel,
        _ref$externalLinkEnab = _ref.externalLinkEnabled,
        externalLinkEnabled = _ref$externalLinkEnab === void 0 ? true : _ref$externalLinkEnab,
        _ref$ignoreDestinatio = _ref.ignoreDestinationZoom,
        ignoreDestinationZoom = _ref$ignoreDestinatio === void 0 ? false : _ref$ignoreDestinatio;

    _classCallCheck(this, PDFLinkService);

    this.eventBus = eventBus;
    this.externalLinkTarget = externalLinkTarget;
    this.externalLinkRel = externalLinkRel;
    this.externalLinkEnabled = externalLinkEnabled;
    this._ignoreDestinationZoom = ignoreDestinationZoom;
    this.baseUrl = null;
    this.pdfDocument = null;
    this.pdfViewer = null;
    this.pdfHistory = null;
    this._pagesRefCache = null;
  }

  _createClass(PDFLinkService, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var baseUrl = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.baseUrl = baseUrl;
      this.pdfDocument = pdfDocument;
      this._pagesRefCache = Object.create(null);
    }
  }, {
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setHistory",
    value: function setHistory(pdfHistory) {
      this.pdfHistory = pdfHistory;
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
  }, {
    key: "page",
    get: function get() {
      return this.pdfViewer.currentPageNumber;
    },
    set: function set(value) {
      this.pdfViewer.currentPageNumber = value;
    }
  }, {
    key: "rotation",
    get: function get() {
      return this.pdfViewer.pagesRotation;
    },
    set: function set(value) {
      this.pdfViewer.pagesRotation = value;
    }
  }, {
    key: "_goToDestinationHelper",
    value: function _goToDestinationHelper(rawDest) {
      var _this = this;

      var namedDest = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var explicitDest = arguments.length > 2 ? arguments[2] : undefined;
      var destRef = explicitDest[0];
      var pageNumber;

      if (destRef instanceof Object) {
        pageNumber = this._cachedPageNumber(destRef);

        if (pageNumber === null) {
          this.pdfDocument.getPageIndex(destRef).then(function (pageIndex) {
            _this.cachePageRef(pageIndex + 1, destRef);

            _this._goToDestinationHelper(rawDest, namedDest, explicitDest);
          })["catch"](function () {
            console.error("PDFLinkService._goToDestinationHelper: \"".concat(destRef, "\" is not ") + "a valid page reference, for dest=\"".concat(rawDest, "\"."));
          });
          return;
        }
      } else if (Number.isInteger(destRef)) {
        pageNumber = destRef + 1;
      } else {
        console.error("PDFLinkService._goToDestinationHelper: \"".concat(destRef, "\" is not ") + "a valid destination reference, for dest=\"".concat(rawDest, "\"."));
        return;
      }

      if (!pageNumber || pageNumber < 1 || pageNumber > this.pagesCount) {
        console.error("PDFLinkService._goToDestinationHelper: \"".concat(pageNumber, "\" is not ") + "a valid page number, for dest=\"".concat(rawDest, "\"."));
        return;
      }

      if (this.pdfHistory) {
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.push({
          namedDest: namedDest,
          explicitDest: explicitDest,
          pageNumber: pageNumber
        });
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber: pageNumber,
        destArray: explicitDest,
        ignoreDestinationZoom: this._ignoreDestinationZoom
      });
    }
  }, {
    key: "goToDestination",
    value: function () {
      var _goToDestination = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(dest) {
        var namedDest, explicitDest;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.pdfDocument) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                if (!(typeof dest === "string")) {
                  _context.next = 9;
                  break;
                }

                namedDest = dest;
                _context.next = 6;
                return this.pdfDocument.getDestination(dest);

              case 6:
                explicitDest = _context.sent;
                _context.next = 13;
                break;

              case 9:
                namedDest = null;
                _context.next = 12;
                return dest;

              case 12:
                explicitDest = _context.sent;

              case 13:
                if (Array.isArray(explicitDest)) {
                  _context.next = 16;
                  break;
                }

                console.error("PDFLinkService.goToDestination: \"".concat(explicitDest, "\" is not ") + "a valid destination array, for dest=\"".concat(dest, "\"."));
                return _context.abrupt("return");

              case 16:
                this._goToDestinationHelper(dest, namedDest, explicitDest);

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function goToDestination(_x) {
        return _goToDestination.apply(this, arguments);
      }

      return goToDestination;
    }()
  }, {
    key: "goToPage",
    value: function goToPage(val) {
      if (!this.pdfDocument) {
        return;
      }

      var pageNumber = typeof val === "string" && this.pdfViewer.pageLabelToPageNumber(val) || val | 0;

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("PDFLinkService.goToPage: \"".concat(val, "\" is not a valid page."));
        return;
      }

      if (this.pdfHistory) {
        this.pdfHistory.pushCurrentPosition();
        this.pdfHistory.pushPage(pageNumber);
      }

      this.pdfViewer.scrollPageIntoView({
        pageNumber: pageNumber
      });
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {
      if (typeof dest === "string") {
        if (dest.length > 0) {
          return this.getAnchorUrl("#" + escape(dest));
        }
      } else if (Array.isArray(dest)) {
        var str = JSON.stringify(dest);

        if (str.length > 0) {
          return this.getAnchorUrl("#" + escape(str));
        }
      }

      return this.getAnchorUrl("");
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(anchor) {
      return (this.baseUrl || "") + anchor;
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {
      if (!this.pdfDocument) {
        return;
      }

      var pageNumber, dest;

      if (hash.includes("=")) {
        var params = (0, _ui_utils.parseQueryString)(hash);

        if ("search" in params) {
          this.eventBus.dispatch("findfromurlhash", {
            source: this,
            query: params.search.replace(/"/g, ""),
            phraseSearch: params.phrase === "true"
          });
        }

        if ("page" in params) {
          pageNumber = params.page | 0 || 1;
        }

        if ("zoom" in params) {
          var zoomArgs = params.zoom.split(",");
          var zoomArg = zoomArgs[0];
          var zoomArgNumber = parseFloat(zoomArg);

          if (!zoomArg.includes("Fit")) {
            dest = [null, {
              name: "XYZ"
            }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null, zoomArgs.length > 2 ? zoomArgs[2] | 0 : null, zoomArgNumber ? zoomArgNumber / 100 : zoomArg];
          } else {
            if (zoomArg === "Fit" || zoomArg === "FitB") {
              dest = [null, {
                name: zoomArg
              }];
            } else if (zoomArg === "FitH" || zoomArg === "FitBH" || zoomArg === "FitV" || zoomArg === "FitBV") {
              dest = [null, {
                name: zoomArg
              }, zoomArgs.length > 1 ? zoomArgs[1] | 0 : null];
            } else if (zoomArg === "FitR") {
              if (zoomArgs.length !== 5) {
                console.error('PDFLinkService.setHash: Not enough parameters for "FitR".');
              } else {
                dest = [null, {
                  name: zoomArg
                }, zoomArgs[1] | 0, zoomArgs[2] | 0, zoomArgs[3] | 0, zoomArgs[4] | 0];
              }
            } else {
              console.error("PDFLinkService.setHash: \"".concat(zoomArg, "\" is not ") + "a valid zoom value.");
            }
          }
        }

        if (dest) {
          this.pdfViewer.scrollPageIntoView({
            pageNumber: pageNumber || this.page,
            destArray: dest,
            allowNegativeOffset: true
          });
        } else if (pageNumber) {
          this.page = pageNumber;
        }

        if ("pagemode" in params) {
          this.eventBus.dispatch("pagemode", {
            source: this,
            mode: params.pagemode
          });
        }

        if ("nameddest" in params) {
          this.goToDestination(params.nameddest);
        }
      } else {
        dest = unescape(hash);

        try {
          dest = JSON.parse(dest);

          if (!Array.isArray(dest)) {
            dest = dest.toString();
          }
        } catch (ex) {}

        if (typeof dest === "string" || isValidExplicitDestination(dest)) {
          this.goToDestination(dest);
          return;
        }

        console.error("PDFLinkService.setHash: \"".concat(unescape(hash), "\" is not ") + "a valid destination.");
      }
    }
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {
      switch (action) {
        case "GoBack":
          if (this.pdfHistory) {
            this.pdfHistory.back();
          }

          break;

        case "GoForward":
          if (this.pdfHistory) {
            this.pdfHistory.forward();
          }

          break;

        case "NextPage":
          this.pdfViewer.nextPage();
          break;

        case "PrevPage":
          this.pdfViewer.previousPage();
          break;

        case "LastPage":
          this.page = this.pagesCount;
          break;

        case "FirstPage":
          this.page = 1;
          break;

        default:
          break;
      }

      this.eventBus.dispatch("namedaction", {
        source: this,
        action: action
      });
    }
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {
      if (!pageRef) {
        return;
      }

      var refStr = pageRef.gen === 0 ? "".concat(pageRef.num, "R") : "".concat(pageRef.num, "R").concat(pageRef.gen);
      this._pagesRefCache[refStr] = pageNum;
    }
  }, {
    key: "_cachedPageNumber",
    value: function _cachedPageNumber(pageRef) {
      var _this$_pagesRefCache;

      var refStr = pageRef.gen === 0 ? "".concat(pageRef.num, "R") : "".concat(pageRef.num, "R").concat(pageRef.gen);
      return ((_this$_pagesRefCache = this._pagesRefCache) === null || _this$_pagesRefCache === void 0 ? void 0 : _this$_pagesRefCache[refStr]) || null;
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      return this.pdfViewer.isPageVisible(pageNumber);
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      return this.pdfViewer.isPageCached(pageNumber);
    }
  }]);

  return PDFLinkService;
}();

exports.PDFLinkService = PDFLinkService;

function isValidExplicitDestination(dest) {
  if (!Array.isArray(dest)) {
    return false;
  }

  var destLength = dest.length;

  if (destLength < 2) {
    return false;
  }

  var page = dest[0];

  if (!(_typeof(page) === "object" && Number.isInteger(page.num) && Number.isInteger(page.gen)) && !(Number.isInteger(page) && page >= 0)) {
    return false;
  }

  var zoom = dest[1];

  if (!(_typeof(zoom) === "object" && typeof zoom.name === "string")) {
    return false;
  }

  var allowNull = true;

  switch (zoom.name) {
    case "XYZ":
      if (destLength !== 5) {
        return false;
      }

      break;

    case "Fit":
    case "FitB":
      return destLength === 2;

    case "FitH":
    case "FitBH":
    case "FitV":
    case "FitBV":
      if (destLength !== 3) {
        return false;
      }

      break;

    case "FitR":
      if (destLength !== 6) {
        return false;
      }

      allowNull = false;
      break;

    default:
      return false;
  }

  for (var i = 2; i < destLength; i++) {
    var param = dest[i];

    if (!(typeof param === "number" || allowNull && param === null)) {
      return false;
    }
  }

  return true;
}

var SimpleLinkService = /*#__PURE__*/function () {
  function SimpleLinkService() {
    _classCallCheck(this, SimpleLinkService);

    this.externalLinkTarget = null;
    this.externalLinkRel = null;
    this.externalLinkEnabled = true;
    this._ignoreDestinationZoom = false;
  }

  _createClass(SimpleLinkService, [{
    key: "pagesCount",
    get: function get() {
      return 0;
    }
  }, {
    key: "page",
    get: function get() {
      return 0;
    },
    set: function set(value) {}
  }, {
    key: "rotation",
    get: function get() {
      return 0;
    },
    set: function set(value) {}
  }, {
    key: "goToDestination",
    value: function () {
      var _goToDestination2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(dest) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function goToDestination(_x2) {
        return _goToDestination2.apply(this, arguments);
      }

      return goToDestination;
    }()
  }, {
    key: "goToPage",
    value: function goToPage(val) {}
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash(dest) {
      return "#";
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl(hash) {
      return "#";
    }
  }, {
    key: "setHash",
    value: function setHash(hash) {}
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction(action) {}
  }, {
    key: "cachePageRef",
    value: function cachePageRef(pageNum, pageRef) {}
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      return true;
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      return true;
    }
  }]);

  return SimpleLinkService;
}();

exports.SimpleLinkService = SimpleLinkService;

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.apiPageLayoutToSpreadMode = apiPageLayoutToSpreadMode;
exports.apiPageModeToSidebarView = apiPageModeToSidebarView;
exports.approximateFraction = approximateFraction;
exports.backtrackBeforeAllVisibleElements = backtrackBeforeAllVisibleElements;
exports.binarySearchFirstItem = binarySearchFirstItem;
exports.getActiveOrFocusedElement = getActiveOrFocusedElement;
exports.getOutputScale = getOutputScale;
exports.getPageSizeInches = getPageSizeInches;
exports.getVisibleElements = getVisibleElements;
exports.isPortraitOrientation = isPortraitOrientation;
exports.isValidRotation = isValidRotation;
exports.isValidScrollMode = isValidScrollMode;
exports.isValidSpreadMode = isValidSpreadMode;
exports.moveToEndOfArray = moveToEndOfArray;
exports.noContextMenuHandler = noContextMenuHandler;
exports.normalizeWheelEventDelta = normalizeWheelEventDelta;
exports.normalizeWheelEventDirection = normalizeWheelEventDirection;
exports.parseQueryString = parseQueryString;
exports.roundToDivide = roundToDivide;
exports.scrollIntoView = scrollIntoView;
exports.waitOnEventOrTimeout = waitOnEventOrTimeout;
exports.watchScroll = watchScroll;
exports.WaitOnType = exports.VERTICAL_PADDING = exports.UNKNOWN_SCALE = exports.TextLayerMode = exports.SpreadMode = exports.SidebarView = exports.ScrollMode = exports.SCROLLBAR_PADDING = exports.RendererType = exports.ProgressBar = exports.PresentationModeState = exports.MIN_SCALE = exports.MAX_SCALE = exports.MAX_AUTO_SCALE = exports.EventBus = exports.DEFAULT_SCALE_VALUE = exports.DEFAULT_SCALE = exports.CSS_UNITS = exports.AutoPrintRegExp = exports.animationStarted = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CSS_UNITS = 96.0 / 72.0;
exports.CSS_UNITS = CSS_UNITS;
var DEFAULT_SCALE_VALUE = "auto";
exports.DEFAULT_SCALE_VALUE = DEFAULT_SCALE_VALUE;
var DEFAULT_SCALE = 1.0;
exports.DEFAULT_SCALE = DEFAULT_SCALE;
var MIN_SCALE = 0.1;
exports.MIN_SCALE = MIN_SCALE;
var MAX_SCALE = 10.0;
exports.MAX_SCALE = MAX_SCALE;
var UNKNOWN_SCALE = 0;
exports.UNKNOWN_SCALE = UNKNOWN_SCALE;
var MAX_AUTO_SCALE = 1.25;
exports.MAX_AUTO_SCALE = MAX_AUTO_SCALE;
var SCROLLBAR_PADDING = 40;
exports.SCROLLBAR_PADDING = SCROLLBAR_PADDING;
var VERTICAL_PADDING = 5;
exports.VERTICAL_PADDING = VERTICAL_PADDING;
var LOADINGBAR_END_OFFSET_VAR = "--loadingBar-end-offset";
var PresentationModeState = {
  UNKNOWN: 0,
  NORMAL: 1,
  CHANGING: 2,
  FULLSCREEN: 3
};
exports.PresentationModeState = PresentationModeState;
var SidebarView = {
  UNKNOWN: -1,
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3,
  LAYERS: 4
};
exports.SidebarView = SidebarView;
var RendererType = {
  CANVAS: "canvas",
  SVG: "svg"
};
exports.RendererType = RendererType;
var TextLayerMode = {
  DISABLE: 0,
  ENABLE: 1,
  ENABLE_ENHANCE: 2
};
exports.TextLayerMode = TextLayerMode;
var ScrollMode = {
  UNKNOWN: -1,
  VERTICAL: 0,
  HORIZONTAL: 1,
  WRAPPED: 2
};
exports.ScrollMode = ScrollMode;
var SpreadMode = {
  UNKNOWN: -1,
  NONE: 0,
  ODD: 1,
  EVEN: 2
};
exports.SpreadMode = SpreadMode;
var AutoPrintRegExp = /\bprint\s*\(/;
exports.AutoPrintRegExp = AutoPrintRegExp;

function getOutputScale(ctx) {
  var devicePixelRatio = window.devicePixelRatio || 1;
  var backingStoreRatio = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
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
    console.error("offsetParent is not set -- cannot scroll");
    return;
  }

  var offsetY = element.offsetTop + element.clientTop;
  var offsetX = element.offsetLeft + element.clientLeft;

  while (parent.clientHeight === parent.scrollHeight && parent.clientWidth === parent.scrollWidth || skipOverflowHiddenElements && getComputedStyle(parent).overflow === "hidden") {
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
  viewAreaElement.addEventListener("scroll", debounceScroll, true);
  return state;
}

function parseQueryString(query) {
  var parts = query.split("&");
  var params = Object.create(null);

  for (var i = 0, ii = parts.length; i < ii; ++i) {
    var param = parts[i].split("=");
    var key = param[0].toLowerCase();
    var value = param.length > 1 ? param[1] : null;
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return params;
}

function binarySearchFirstItem(items, condition) {
  var minIndex = 0;
  var maxIndex = items.length - 1;

  if (maxIndex < 0 || !condition(items[maxIndex])) {
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

  var result;

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

function getPageSizeInches(_ref) {
  var view = _ref.view,
      userUnit = _ref.userUnit,
      rotate = _ref.rotate;

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

function getVisibleElements(_ref2) {
  var scrollEl = _ref2.scrollEl,
      views = _ref2.views,
      _ref2$sortByVisibilit = _ref2.sortByVisibility,
      sortByVisibility = _ref2$sortByVisibilit === void 0 ? false : _ref2$sortByVisibilit,
      _ref2$horizontal = _ref2.horizontal,
      horizontal = _ref2$horizontal === void 0 ? false : _ref2$horizontal,
      _ref2$rtl = _ref2.rtl,
      rtl = _ref2$rtl === void 0 ? false : _ref2$rtl;
  var top = scrollEl.scrollTop,
      bottom = top + scrollEl.clientHeight;
  var left = scrollEl.scrollLeft,
      right = left + scrollEl.clientWidth;

  function isElementBottomAfterViewTop(view) {
    var element = view.div;
    var elementBottom = element.offsetTop + element.clientTop + element.clientHeight;
    return elementBottom > top;
  }

  function isElementNextAfterViewHorizontally(view) {
    var element = view.div;
    var elementLeft = element.offsetLeft + element.clientLeft;
    var elementRight = elementLeft + element.clientWidth;
    return rtl ? elementLeft < right : elementRight > left;
  }

  var visible = [],
      numViews = views.length;
  var firstVisibleElementInd = binarySearchFirstItem(views, horizontal ? isElementNextAfterViewHorizontally : isElementBottomAfterViewTop);

  if (firstVisibleElementInd > 0 && firstVisibleElementInd < numViews && !horizontal) {
    firstVisibleElementInd = backtrackBeforeAllVisibleElements(firstVisibleElementInd, views, top);
  }

  var lastEdge = horizontal ? right : -1;

  for (var i = firstVisibleElementInd; i < numViews; i++) {
    var view = views[i],
        element = view.div;
    var currentWidth = element.offsetLeft + element.clientLeft;
    var currentHeight = element.offsetTop + element.clientTop;
    var viewWidth = element.clientWidth,
        viewHeight = element.clientHeight;
    var viewRight = currentWidth + viewWidth;
    var viewBottom = currentHeight + viewHeight;

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

    var hiddenHeight = Math.max(0, top - currentHeight) + Math.max(0, viewBottom - bottom);
    var hiddenWidth = Math.max(0, left - currentWidth) + Math.max(0, viewRight - right);
    var fractionHeight = (viewHeight - hiddenHeight) / viewHeight,
        fractionWidth = (viewWidth - hiddenWidth) / viewWidth;
    var percent = fractionHeight * fractionWidth * 100 | 0;
    visible.push({
      id: view.id,
      x: currentWidth,
      y: currentHeight,
      view: view,
      percent: percent,
      widthPercent: fractionWidth * 100 | 0
    });
  }

  var first = visible[0],
      last = visible[visible.length - 1];

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

function normalizeWheelEventDirection(evt) {
  var delta = Math.hypot(evt.deltaX, evt.deltaY);
  var angle = Math.atan2(evt.deltaY, evt.deltaX);

  if (-0.25 * Math.PI < angle && angle < 0.75 * Math.PI) {
    delta = -delta;
  }

  return delta;
}

function normalizeWheelEventDelta(evt) {
  var delta = normalizeWheelEventDirection(evt);
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

function isValidScrollMode(mode) {
  return Number.isInteger(mode) && Object.values(ScrollMode).includes(mode) && mode !== ScrollMode.UNKNOWN;
}

function isValidSpreadMode(mode) {
  return Number.isInteger(mode) && Object.values(SpreadMode).includes(mode) && mode !== SpreadMode.UNKNOWN;
}

function isPortraitOrientation(size) {
  return size.width <= size.height;
}

var WaitOnType = {
  EVENT: "event",
  TIMEOUT: "timeout"
};
exports.WaitOnType = WaitOnType;

function waitOnEventOrTimeout(_ref3) {
  var target = _ref3.target,
      name = _ref3.name,
      _ref3$delay = _ref3.delay,
      delay = _ref3$delay === void 0 ? 0 : _ref3$delay;
  return new Promise(function (resolve, reject) {
    if (_typeof(target) !== "object" || !(name && typeof name === "string") || !(Number.isInteger(delay) && delay >= 0)) {
      throw new Error("waitOnEventOrTimeout - invalid parameters.");
    }

    function handler(type) {
      if (target instanceof EventBus) {
        target._off(name, eventHandler);
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
      target._on(name, eventHandler);
    } else {
      target.addEventListener(name, eventHandler);
    }

    var timeoutHandler = handler.bind(null, WaitOnType.TIMEOUT);
    var timeout = setTimeout(timeoutHandler, delay);
  });
}

var animationStarted = new Promise(function (resolve) {
  window.requestAnimationFrame(resolve);
});
exports.animationStarted = animationStarted;

function dispatchDOMEvent(eventName) {
  var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  throw new Error("Not implemented: dispatchDOMEvent");
}

var EventBus = /*#__PURE__*/function () {
  function EventBus(options) {
    _classCallCheck(this, EventBus);

    this._listeners = Object.create(null);
  }

  _createClass(EventBus, [{
    key: "on",
    value: function on(eventName, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._on(eventName, listener, {
        external: true,
        once: options === null || options === void 0 ? void 0 : options.once
      });
    }
  }, {
    key: "off",
    value: function off(eventName, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

      this._off(eventName, listener, {
        external: true,
        once: options === null || options === void 0 ? void 0 : options.once
      });
    }
  }, {
    key: "dispatch",
    value: function dispatch(eventName) {
      var eventListeners = this._listeners[eventName];

      if (!eventListeners || eventListeners.length === 0) {
        return;
      }

      var args = Array.prototype.slice.call(arguments, 1);
      var externalListeners;

      var _iterator = _createForOfIteratorHelper(eventListeners.slice(0)),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _step.value,
              _listener = _step$value.listener,
              external = _step$value.external,
              once = _step$value.once;

          if (once) {
            this._off(eventName, _listener);
          }

          if (external) {
            (externalListeners || (externalListeners = [])).push(_listener);
            continue;
          }

          _listener.apply(null, args);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (externalListeners) {
        var _iterator2 = _createForOfIteratorHelper(externalListeners),
            _step2;

        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var listener = _step2.value;
            listener.apply(null, args);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }

        externalListeners = null;
      }
    }
  }, {
    key: "_on",
    value: function _on(eventName, listener) {
      var _this$_listeners;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var eventListeners = (_this$_listeners = this._listeners)[eventName] || (_this$_listeners[eventName] = []);
      eventListeners.push({
        listener: listener,
        external: (options === null || options === void 0 ? void 0 : options.external) === true,
        once: (options === null || options === void 0 ? void 0 : options.once) === true
      });
    }
  }, {
    key: "_off",
    value: function _off(eventName, listener) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var eventListeners = this._listeners[eventName];

      if (!eventListeners) {
        return;
      }

      for (var i = 0, ii = eventListeners.length; i < ii; i++) {
        if (eventListeners[i].listener === listener) {
          eventListeners.splice(i, 1);
          return;
        }
      }
    }
  }]);

  return EventBus;
}();

exports.EventBus = EventBus;

function clamp(v, min, max) {
  return Math.min(Math.max(v, min), max);
}

var ProgressBar = /*#__PURE__*/function () {
  function ProgressBar(id) {
    var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        height = _ref4.height,
        width = _ref4.width,
        units = _ref4.units;

    _classCallCheck(this, ProgressBar);

    this.visible = true;
    this.div = document.querySelector(id + " .progress");
    this.bar = this.div.parentNode;
    this.height = height || 100;
    this.width = width || 100;
    this.units = units || "%";
    this.div.style.height = this.height + this.units;
    this.percent = 0;
  }

  _createClass(ProgressBar, [{
    key: "_updateBar",
    value: function _updateBar() {
      if (this._indeterminate) {
        this.div.classList.add("indeterminate");
        this.div.style.width = this.width + this.units;
        return;
      }

      this.div.classList.remove("indeterminate");
      var progressSize = this.width * this._percent / 100;
      this.div.style.width = progressSize + this.units;
    }
  }, {
    key: "percent",
    get: function get() {
      return this._percent;
    },
    set: function set(val) {
      this._indeterminate = isNaN(val);
      this._percent = clamp(val, 0, 100);

      this._updateBar();
    }
  }, {
    key: "setWidth",
    value: function setWidth(viewer) {
      if (!viewer) {
        return;
      }

      var container = viewer.parentNode;
      var scrollbarWidth = container.offsetWidth - viewer.offsetWidth;

      if (scrollbarWidth > 0) {
        var doc = document.documentElement;
        doc.style.setProperty(LOADINGBAR_END_OFFSET_VAR, "".concat(scrollbarWidth, "px"));
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.visible) {
        return;
      }

      this.visible = false;
      this.bar.classList.add("hidden");
    }
  }, {
    key: "show",
    value: function show() {
      if (this.visible) {
        return;
      }

      this.visible = true;
      this.bar.classList.remove("hidden");
    }
  }]);

  return ProgressBar;
}();

exports.ProgressBar = ProgressBar;

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

function getActiveOrFocusedElement() {
  var curRoot = document;
  var curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");

  while ((_curActiveOrFocused = curActiveOrFocused) !== null && _curActiveOrFocused !== void 0 && _curActiveOrFocused.shadowRoot) {
    var _curActiveOrFocused;

    curRoot = curActiveOrFocused.shadowRoot;
    curActiveOrFocused = curRoot.activeElement || curRoot.querySelector(":focus");
  }

  return curActiveOrFocused;
}

function apiPageLayoutToSpreadMode(layout) {
  switch (layout) {
    case "SinglePage":
    case "OneColumn":
      return SpreadMode.NONE;

    case "TwoColumnLeft":
    case "TwoPageLeft":
      return SpreadMode.ODD;

    case "TwoColumnRight":
    case "TwoPageRight":
      return SpreadMode.EVEN;
  }

  return SpreadMode.NONE;
}

function apiPageModeToSidebarView(mode) {
  switch (mode) {
    case "UseNone":
      return SidebarView.NONE;

    case "UseThumbs":
      return SidebarView.THUMBS;

    case "UseOutlines":
      return SidebarView.OUTLINE;

    case "UseAttachments":
      return SidebarView.ATTACHMENTS;

    case "UseOC":
      return SidebarView.LAYERS;
  }

  return SidebarView.NONE;
}

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TextLayerBuilder = exports.DefaultTextLayerFactory = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EXPAND_DIVS_TIMEOUT = 300;

var TextLayerBuilder = /*#__PURE__*/function () {
  function TextLayerBuilder(_ref) {
    var textLayerDiv = _ref.textLayerDiv,
        eventBus = _ref.eventBus,
        pageIndex = _ref.pageIndex,
        viewport = _ref.viewport,
        _ref$findController = _ref.findController,
        findController = _ref$findController === void 0 ? null : _ref$findController,
        _ref$enhanceTextSelec = _ref.enhanceTextSelection,
        enhanceTextSelection = _ref$enhanceTextSelec === void 0 ? false : _ref$enhanceTextSelec;

    _classCallCheck(this, TextLayerBuilder);

    this.textLayerDiv = textLayerDiv;
    this.eventBus = eventBus;
    this.textContent = null;
    this.textContentItemsStr = [];
    this.textContentStream = null;
    this.renderingDone = false;
    this.pageIdx = pageIndex;
    this.pageNumber = this.pageIdx + 1;
    this.matches = [];
    this.viewport = viewport;
    this.textDivs = [];
    this.findController = findController;
    this.textLayerRenderTask = null;
    this.enhanceTextSelection = enhanceTextSelection;
    this._onUpdateTextLayerMatches = null;

    this._bindMouse();
  }

  _createClass(TextLayerBuilder, [{
    key: "_finishRendering",
    value: function _finishRendering() {
      this.renderingDone = true;

      if (!this.enhanceTextSelection) {
        var endOfContent = document.createElement("div");
        endOfContent.className = "endOfContent";
        this.textLayerDiv.appendChild(endOfContent);
      }

      this.eventBus.dispatch("textlayerrendered", {
        source: this,
        pageNumber: this.pageNumber,
        numTextDivs: this.textDivs.length
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var timeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (!(this.textContent || this.textContentStream) || this.renderingDone) {
        return;
      }

      this.cancel();
      this.textDivs = [];
      var textLayerFrag = document.createDocumentFragment();
      this.textLayerRenderTask = (0, _pdfjsLib.renderTextLayer)({
        textContent: this.textContent,
        textContentStream: this.textContentStream,
        container: textLayerFrag,
        viewport: this.viewport,
        textDivs: this.textDivs,
        textContentItemsStr: this.textContentItemsStr,
        timeout: timeout,
        enhanceTextSelection: this.enhanceTextSelection
      });
      this.textLayerRenderTask.promise.then(function () {
        _this.textLayerDiv.appendChild(textLayerFrag);

        _this._finishRendering();

        _this._updateMatches();
      }, function (reason) {});

      if (!this._onUpdateTextLayerMatches) {
        this._onUpdateTextLayerMatches = function (evt) {
          if (evt.pageIndex === _this.pageIdx || evt.pageIndex === -1) {
            _this._updateMatches();
          }
        };

        this.eventBus._on("updatetextlayermatches", this._onUpdateTextLayerMatches);
      }
    }
  }, {
    key: "cancel",
    value: function cancel() {
      if (this.textLayerRenderTask) {
        this.textLayerRenderTask.cancel();
        this.textLayerRenderTask = null;
      }

      if (this._onUpdateTextLayerMatches) {
        this.eventBus._off("updatetextlayermatches", this._onUpdateTextLayerMatches);

        this._onUpdateTextLayerMatches = null;
      }
    }
  }, {
    key: "setTextContentStream",
    value: function setTextContentStream(readableStream) {
      this.cancel();
      this.textContentStream = readableStream;
    }
  }, {
    key: "setTextContent",
    value: function setTextContent(textContent) {
      this.cancel();
      this.textContent = textContent;
    }
  }, {
    key: "_convertMatches",
    value: function _convertMatches(matches, matchesLength) {
      if (!matches) {
        return [];
      }

      var textContentItemsStr = this.textContentItemsStr;
      var i = 0,
          iIndex = 0;
      var end = textContentItemsStr.length - 1;
      var result = [];

      for (var m = 0, mm = matches.length; m < mm; m++) {
        var matchIdx = matches[m];

        while (i !== end && matchIdx >= iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        if (i === textContentItemsStr.length) {
          console.error("Could not find a matching mapping");
        }

        var match = {
          begin: {
            divIdx: i,
            offset: matchIdx - iIndex
          }
        };
        matchIdx += matchesLength[m];

        while (i !== end && matchIdx > iIndex + textContentItemsStr[i].length) {
          iIndex += textContentItemsStr[i].length;
          i++;
        }

        match.end = {
          divIdx: i,
          offset: matchIdx - iIndex
        };
        result.push(match);
      }

      return result;
    }
  }, {
    key: "_renderMatches",
    value: function _renderMatches(matches) {
      if (matches.length === 0) {
        return;
      }

      var findController = this.findController,
          pageIdx = this.pageIdx,
          textContentItemsStr = this.textContentItemsStr,
          textDivs = this.textDivs;
      var isSelectedPage = pageIdx === findController.selected.pageIdx;
      var selectedMatchIdx = findController.selected.matchIdx;
      var highlightAll = findController.state.highlightAll;
      var prevEnd = null;
      var infinity = {
        divIdx: -1,
        offset: undefined
      };

      function beginText(begin, className) {
        var divIdx = begin.divIdx;
        textDivs[divIdx].textContent = "";
        appendTextToDiv(divIdx, 0, begin.offset, className);
      }

      function appendTextToDiv(divIdx, fromOffset, toOffset, className) {
        var div = textDivs[divIdx];
        var content = textContentItemsStr[divIdx].substring(fromOffset, toOffset);
        var node = document.createTextNode(content);

        if (className) {
          var span = document.createElement("span");
          span.className = className;
          span.appendChild(node);
          div.appendChild(span);
          return;
        }

        div.appendChild(node);
      }

      var i0 = selectedMatchIdx,
          i1 = i0 + 1;

      if (highlightAll) {
        i0 = 0;
        i1 = matches.length;
      } else if (!isSelectedPage) {
        return;
      }

      for (var i = i0; i < i1; i++) {
        var match = matches[i];
        var begin = match.begin;
        var end = match.end;
        var isSelected = isSelectedPage && i === selectedMatchIdx;
        var highlightSuffix = isSelected ? " selected" : "";

        if (isSelected) {
          findController.scrollMatchIntoView({
            element: textDivs[begin.divIdx],
            pageIndex: pageIdx,
            matchIndex: selectedMatchIdx
          });
        }

        if (!prevEnd || begin.divIdx !== prevEnd.divIdx) {
          if (prevEnd !== null) {
            appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
          }

          beginText(begin);
        } else {
          appendTextToDiv(prevEnd.divIdx, prevEnd.offset, begin.offset);
        }

        if (begin.divIdx === end.divIdx) {
          appendTextToDiv(begin.divIdx, begin.offset, end.offset, "highlight" + highlightSuffix);
        } else {
          appendTextToDiv(begin.divIdx, begin.offset, infinity.offset, "highlight begin" + highlightSuffix);

          for (var n0 = begin.divIdx + 1, n1 = end.divIdx; n0 < n1; n0++) {
            textDivs[n0].className = "highlight middle" + highlightSuffix;
          }

          beginText(end, "highlight end" + highlightSuffix);
        }

        prevEnd = end;
      }

      if (prevEnd) {
        appendTextToDiv(prevEnd.divIdx, prevEnd.offset, infinity.offset);
      }
    }
  }, {
    key: "_updateMatches",
    value: function _updateMatches() {
      if (!this.renderingDone) {
        return;
      }

      var findController = this.findController,
          matches = this.matches,
          pageIdx = this.pageIdx,
          textContentItemsStr = this.textContentItemsStr,
          textDivs = this.textDivs;
      var clearedUntilDivIdx = -1;

      for (var i = 0, ii = matches.length; i < ii; i++) {
        var match = matches[i];
        var begin = Math.max(clearedUntilDivIdx, match.begin.divIdx);

        for (var n = begin, end = match.end.divIdx; n <= end; n++) {
          var div = textDivs[n];
          div.textContent = textContentItemsStr[n];
          div.className = "";
        }

        clearedUntilDivIdx = match.end.divIdx + 1;
      }

      if (!(findController !== null && findController !== void 0 && findController.highlightMatches)) {
        return;
      }

      var pageMatches = findController.pageMatches[pageIdx] || null;
      var pageMatchesLength = findController.pageMatchesLength[pageIdx] || null;
      this.matches = this._convertMatches(pageMatches, pageMatchesLength);

      this._renderMatches(this.matches);
    }
  }, {
    key: "_bindMouse",
    value: function _bindMouse() {
      var _this2 = this;

      var div = this.textLayerDiv;
      var expandDivsTimer = null;
      div.addEventListener("mousedown", function (evt) {
        if (_this2.enhanceTextSelection && _this2.textLayerRenderTask) {
          _this2.textLayerRenderTask.expandTextDivs(true);

          if (expandDivsTimer) {
            clearTimeout(expandDivsTimer);
            expandDivsTimer = null;
          }

          return;
        }

        var end = div.querySelector(".endOfContent");

        if (!end) {
          return;
        }

        var adjustTop = evt.target !== div;
        adjustTop = adjustTop && window.getComputedStyle(end).getPropertyValue("-moz-user-select") !== "none";

        if (adjustTop) {
          var divBounds = div.getBoundingClientRect();
          var r = Math.max(0, (evt.pageY - divBounds.top) / divBounds.height);
          end.style.top = (r * 100).toFixed(2) + "%";
        }

        end.classList.add("active");
      });
      div.addEventListener("mouseup", function () {
        if (_this2.enhanceTextSelection && _this2.textLayerRenderTask) {
          expandDivsTimer = setTimeout(function () {
            if (_this2.textLayerRenderTask) {
              _this2.textLayerRenderTask.expandTextDivs(false);
            }

            expandDivsTimer = null;
          }, EXPAND_DIVS_TIMEOUT);
          return;
        }

        var end = div.querySelector(".endOfContent");

        if (!end) {
          return;
        }

        end.style.top = "";
        end.classList.remove("active");
      });
    }
  }]);

  return TextLayerBuilder;
}();

exports.TextLayerBuilder = TextLayerBuilder;

var DefaultTextLayerFactory = /*#__PURE__*/function () {
  function DefaultTextLayerFactory() {
    _classCallCheck(this, DefaultTextLayerFactory);
  }

  _createClass(DefaultTextLayerFactory, [{
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      return new TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        pageIndex: pageIndex,
        viewport: viewport,
        enhanceTextSelection: enhanceTextSelection,
        eventBus: eventBus
      });
    }
  }]);

  return DefaultTextLayerFactory;
}();

exports.DefaultTextLayerFactory = DefaultTextLayerFactory;

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.DownloadManager = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

var _viewer_compatibility = __w_pdfjs_require__(10);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

;

function _download(blobUrl, filename) {
  var a = document.createElement("a");

  if (!a.click) {
    throw new Error('DownloadManager: "a.click()" is not supported.');
  }

  a.href = blobUrl;
  a.target = "_parent";

  if ("download" in a) {
    a.download = filename;
  }

  (document.body || document.documentElement).appendChild(a);
  a.click();
  a.remove();
}

var DownloadManager = /*#__PURE__*/function () {
  function DownloadManager() {
    _classCallCheck(this, DownloadManager);

    this._openBlobUrls = new WeakMap();
  }

  _createClass(DownloadManager, [{
    key: "downloadUrl",
    value: function downloadUrl(url, filename) {
      if (!(0, _pdfjsLib.createValidAbsoluteUrl)(url, "http://example.com")) {
        return;
      }

      _download(url + "#pdfjs.action=download", filename);
    }
  }, {
    key: "downloadData",
    value: function downloadData(data, filename, contentType) {
      var blobUrl = (0, _pdfjsLib.createObjectURL)(data, contentType, _viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL);

      _download(blobUrl, filename);
    }
  }, {
    key: "openOrDownloadData",
    value: function openOrDownloadData(element, data, filename) {
      var isPdfData = (0, _pdfjsLib.isPdfFile)(filename);
      var contentType = isPdfData ? "application/pdf" : "";

      if (isPdfData && !_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
        var blobUrl = this._openBlobUrls.get(element);

        if (!blobUrl) {
          blobUrl = URL.createObjectURL(new Blob([data], {
            type: contentType
          }));

          this._openBlobUrls.set(element, blobUrl);
        }

        var viewerUrl;
        viewerUrl = "?file=" + encodeURIComponent(blobUrl + "#" + filename);

        try {
          window.open(viewerUrl);
          return true;
        } catch (ex) {
          console.error("openOrDownloadData: ".concat(ex));
          URL.revokeObjectURL(blobUrl);

          this._openBlobUrls["delete"](element);
        }
      }

      this.downloadData(data, filename, contentType);
      return false;
    }
  }, {
    key: "download",
    value: function download(blob, url, filename) {
      var sourceEventType = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "download";

      if (_viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL) {
        this.downloadUrl(url, filename);
        return;
      }

      var blobUrl = URL.createObjectURL(blob);

      _download(blobUrl, filename);
    }
  }]);

  return DownloadManager;
}();

exports.DownloadManager = DownloadManager;

/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.viewerCompatibilityParams = void 0;
var compatibilityParams = Object.create(null);
{
  var userAgent = typeof navigator !== "undefined" && navigator.userAgent || "";
  var platform = typeof navigator !== "undefined" && navigator.platform || "";
  var maxTouchPoints = typeof navigator !== "undefined" && navigator.maxTouchPoints || 1;
  var isAndroid = /Android/.test(userAgent);
  var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent) || platform === "MacIntel" && maxTouchPoints > 1;
  var isIOSChrome = /CriOS/.test(userAgent);

  (function checkOnBlobSupport() {
    if (isIOSChrome) {
      compatibilityParams.disableCreateObjectURL = true;
    }
  })();

  (function checkCanvasSizeLimitation() {
    if (isIOS || isAndroid) {
      compatibilityParams.maxCanvasPixels = 5242880;
    }
  })();
}
var viewerCompatibilityParams = Object.freeze(compatibilityParams);
exports.viewerCompatibilityParams = viewerCompatibilityParams;

/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.GenericL10n = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(4));

__w_pdfjs_require__(12);

var _l10n_utils = __w_pdfjs_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var webL10n = document.webL10n;

var GenericL10n = /*#__PURE__*/function () {
  function GenericL10n(lang) {
    _classCallCheck(this, GenericL10n);

    this._lang = lang;
    this._ready = new Promise(function (resolve, reject) {
      webL10n.setLanguage(lang, function () {
        resolve(webL10n);
      });
    });
  }

  _createClass(GenericL10n, [{
    key: "getLanguage",
    value: function () {
      var _getLanguage = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var l10n;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._ready;

              case 2:
                l10n = _context.sent;
                return _context.abrupt("return", l10n.getLanguage());

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLanguage() {
        return _getLanguage.apply(this, arguments);
      }

      return getLanguage;
    }()
  }, {
    key: "getDirection",
    value: function () {
      var _getDirection = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var l10n;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._ready;

              case 2:
                l10n = _context2.sent;
                return _context2.abrupt("return", l10n.getDirection());

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getDirection() {
        return _getDirection.apply(this, arguments);
      }

      return getDirection;
    }()
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(key) {
        var args,
            fallback,
            l10n,
            _args3 = arguments;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                args = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : null;
                fallback = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : (0, _l10n_utils.getL10nFallback)(key, args);
                _context3.next = 4;
                return this._ready;

              case 4:
                l10n = _context3.sent;
                return _context3.abrupt("return", l10n.get(key, args, fallback));

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function get(_x) {
        return _get.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "translate",
    value: function () {
      var _translate = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(element) {
        var l10n;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._ready;

              case 2:
                l10n = _context4.sent;
                return _context4.abrupt("return", l10n.translate(element));

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function translate(_x2) {
        return _translate.apply(this, arguments);
      }

      return translate;
    }()
  }]);

  return GenericL10n;
}();

exports.GenericL10n = GenericL10n;

/***/ }),
/* 12 */
/***/ (() => {



document.webL10n = function (window, document, undefined) {
  var gL10nData = {};
  var gTextData = '';
  var gTextProp = 'textContent';
  var gLanguage = '';
  var gMacros = {};
  var gReadyState = 'loading';
  var gAsyncResourceLoading = true;

  function getL10nResourceLinks() {
    return document.querySelectorAll('link[type="application/l10n"]');
  }

  function getL10nDictionary() {
    var script = document.querySelector('script[type="application/l10n"]');
    return script ? JSON.parse(script.innerHTML) : null;
  }

  function getTranslatableChildren(element) {
    return element ? element.querySelectorAll('*[data-l10n-id]') : [];
  }

  function getL10nAttributes(element) {
    if (!element) return {};
    var l10nId = element.getAttribute('data-l10n-id');
    var l10nArgs = element.getAttribute('data-l10n-args');
    var args = {};

    if (l10nArgs) {
      try {
        args = JSON.parse(l10nArgs);
      } catch (e) {
        console.warn('could not parse arguments for #' + l10nId);
      }
    }

    return {
      id: l10nId,
      args: args
    };
  }

  function xhrLoadText(url, onSuccess, onFailure) {
    onSuccess = onSuccess || function _onSuccess(data) {};

    onFailure = onFailure || function _onFailure() {};

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, gAsyncResourceLoading);

    if (xhr.overrideMimeType) {
      xhr.overrideMimeType('text/plain; charset=utf-8');
    }

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status === 0) {
          onSuccess(xhr.responseText);
        } else {
          onFailure();
        }
      }
    };

    xhr.onerror = onFailure;
    xhr.ontimeout = onFailure;

    try {
      xhr.send(null);
    } catch (e) {
      onFailure();
    }
  }

  function parseResource(href, lang, successCallback, failureCallback) {
    var baseURL = href.replace(/[^\/]*$/, '') || './';

    function evalString(text) {
      if (text.lastIndexOf('\\') < 0) return text;
      return text.replace(/\\\\/g, '\\').replace(/\\n/g, '\n').replace(/\\r/g, '\r').replace(/\\t/g, '\t').replace(/\\b/g, '\b').replace(/\\f/g, '\f').replace(/\\{/g, '{').replace(/\\}/g, '}').replace(/\\"/g, '"').replace(/\\'/g, "'");
    }

    function parseProperties(text, parsedPropertiesCallback) {
      var dictionary = {};
      var reBlank = /^\s*|\s*$/;
      var reComment = /^\s*#|^\s*$/;
      var reSection = /^\s*\[(.*)\]\s*$/;
      var reImport = /^\s*@import\s+url\((.*)\)\s*$/i;
      var reSplit = /^([^=\s]*)\s*=\s*(.+)$/;

      function parseRawLines(rawText, extendedSyntax, parsedRawLinesCallback) {
        var entries = rawText.replace(reBlank, '').split(/[\r\n]+/);
        var currentLang = '*';
        var genericLang = lang.split('-', 1)[0];
        var skipLang = false;
        var match = '';

        function nextEntry() {
          while (true) {
            if (!entries.length) {
              parsedRawLinesCallback();
              return;
            }

            var line = entries.shift();
            if (reComment.test(line)) continue;

            if (extendedSyntax) {
              match = reSection.exec(line);

              if (match) {
                currentLang = match[1].toLowerCase();
                skipLang = currentLang !== '*' && currentLang !== lang && currentLang !== genericLang;
                continue;
              } else if (skipLang) {
                continue;
              }

              match = reImport.exec(line);

              if (match) {
                loadImport(baseURL + match[1], nextEntry);
                return;
              }
            }

            var tmp = line.match(reSplit);

            if (tmp && tmp.length == 3) {
              dictionary[tmp[1]] = evalString(tmp[2]);
            }
          }
        }

        nextEntry();
      }

      function loadImport(url, callback) {
        xhrLoadText(url, function (content) {
          parseRawLines(content, false, callback);
        }, function () {
          console.warn(url + ' not found.');
          callback();
        });
      }

      parseRawLines(text, true, function () {
        parsedPropertiesCallback(dictionary);
      });
    }

    xhrLoadText(href, function (response) {
      gTextData += response;
      parseProperties(response, function (data) {
        for (var key in data) {
          var id,
              prop,
              index = key.lastIndexOf('.');

          if (index > 0) {
            id = key.substring(0, index);
            prop = key.substring(index + 1);
          } else {
            id = key;
            prop = gTextProp;
          }

          if (!gL10nData[id]) {
            gL10nData[id] = {};
          }

          gL10nData[id][prop] = data[key];
        }

        if (successCallback) {
          successCallback();
        }
      });
    }, failureCallback);
  }

  function loadLocale(lang, callback) {
    if (lang) {
      lang = lang.toLowerCase();
    }

    callback = callback || function _callback() {};

    clear();
    gLanguage = lang;
    var langLinks = getL10nResourceLinks();
    var langCount = langLinks.length;

    if (langCount === 0) {
      var dict = getL10nDictionary();

      if (dict && dict.locales && dict.default_locale) {
        console.log('using the embedded JSON directory, early way out');
        gL10nData = dict.locales[lang];

        if (!gL10nData) {
          var defaultLocale = dict.default_locale.toLowerCase();

          for (var anyCaseLang in dict.locales) {
            anyCaseLang = anyCaseLang.toLowerCase();

            if (anyCaseLang === lang) {
              gL10nData = dict.locales[lang];
              break;
            } else if (anyCaseLang === defaultLocale) {
              gL10nData = dict.locales[defaultLocale];
            }
          }
        }

        callback();
      } else {
        console.log('no resource to load, early way out');
      }

      gReadyState = 'complete';
      return;
    }

    var onResourceLoaded = null;
    var gResourceCount = 0;

    onResourceLoaded = function onResourceLoaded() {
      gResourceCount++;

      if (gResourceCount >= langCount) {
        callback();
        gReadyState = 'complete';
      }
    };

    function L10nResourceLink(link) {
      var href = link.href;

      this.load = function (lang, callback) {
        parseResource(href, lang, callback, function () {
          console.warn(href + ' not found.');
          console.warn('"' + lang + '" resource not found');
          gLanguage = '';
          callback();
        });
      };
    }

    for (var i = 0; i < langCount; i++) {
      var resource = new L10nResourceLink(langLinks[i]);
      resource.load(lang, onResourceLoaded);
    }
  }

  function clear() {
    gL10nData = {};
    gTextData = '';
    gLanguage = '';
  }

  function getPluralRules(lang) {
    var locales2rules = {
      'af': 3,
      'ak': 4,
      'am': 4,
      'ar': 1,
      'asa': 3,
      'az': 0,
      'be': 11,
      'bem': 3,
      'bez': 3,
      'bg': 3,
      'bh': 4,
      'bm': 0,
      'bn': 3,
      'bo': 0,
      'br': 20,
      'brx': 3,
      'bs': 11,
      'ca': 3,
      'cgg': 3,
      'chr': 3,
      'cs': 12,
      'cy': 17,
      'da': 3,
      'de': 3,
      'dv': 3,
      'dz': 0,
      'ee': 3,
      'el': 3,
      'en': 3,
      'eo': 3,
      'es': 3,
      'et': 3,
      'eu': 3,
      'fa': 0,
      'ff': 5,
      'fi': 3,
      'fil': 4,
      'fo': 3,
      'fr': 5,
      'fur': 3,
      'fy': 3,
      'ga': 8,
      'gd': 24,
      'gl': 3,
      'gsw': 3,
      'gu': 3,
      'guw': 4,
      'gv': 23,
      'ha': 3,
      'haw': 3,
      'he': 2,
      'hi': 4,
      'hr': 11,
      'hu': 0,
      'id': 0,
      'ig': 0,
      'ii': 0,
      'is': 3,
      'it': 3,
      'iu': 7,
      'ja': 0,
      'jmc': 3,
      'jv': 0,
      'ka': 0,
      'kab': 5,
      'kaj': 3,
      'kcg': 3,
      'kde': 0,
      'kea': 0,
      'kk': 3,
      'kl': 3,
      'km': 0,
      'kn': 0,
      'ko': 0,
      'ksb': 3,
      'ksh': 21,
      'ku': 3,
      'kw': 7,
      'lag': 18,
      'lb': 3,
      'lg': 3,
      'ln': 4,
      'lo': 0,
      'lt': 10,
      'lv': 6,
      'mas': 3,
      'mg': 4,
      'mk': 16,
      'ml': 3,
      'mn': 3,
      'mo': 9,
      'mr': 3,
      'ms': 0,
      'mt': 15,
      'my': 0,
      'nah': 3,
      'naq': 7,
      'nb': 3,
      'nd': 3,
      'ne': 3,
      'nl': 3,
      'nn': 3,
      'no': 3,
      'nr': 3,
      'nso': 4,
      'ny': 3,
      'nyn': 3,
      'om': 3,
      'or': 3,
      'pa': 3,
      'pap': 3,
      'pl': 13,
      'ps': 3,
      'pt': 3,
      'rm': 3,
      'ro': 9,
      'rof': 3,
      'ru': 11,
      'rwk': 3,
      'sah': 0,
      'saq': 3,
      'se': 7,
      'seh': 3,
      'ses': 0,
      'sg': 0,
      'sh': 11,
      'shi': 19,
      'sk': 12,
      'sl': 14,
      'sma': 7,
      'smi': 7,
      'smj': 7,
      'smn': 7,
      'sms': 7,
      'sn': 3,
      'so': 3,
      'sq': 3,
      'sr': 11,
      'ss': 3,
      'ssy': 3,
      'st': 3,
      'sv': 3,
      'sw': 3,
      'syr': 3,
      'ta': 3,
      'te': 3,
      'teo': 3,
      'th': 0,
      'ti': 4,
      'tig': 3,
      'tk': 3,
      'tl': 4,
      'tn': 3,
      'to': 0,
      'tr': 0,
      'ts': 3,
      'tzm': 22,
      'uk': 11,
      'ur': 3,
      've': 3,
      'vi': 0,
      'vun': 3,
      'wa': 4,
      'wae': 3,
      'wo': 0,
      'xh': 3,
      'xog': 3,
      'yo': 0,
      'zh': 0,
      'zu': 3
    };

    function isIn(n, list) {
      return list.indexOf(n) !== -1;
    }

    function isBetween(n, start, end) {
      return start <= n && n <= end;
    }

    var pluralRules = {
      '0': function _(n) {
        return 'other';
      },
      '1': function _(n) {
        if (isBetween(n % 100, 3, 10)) return 'few';
        if (n === 0) return 'zero';
        if (isBetween(n % 100, 11, 99)) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '2': function _(n) {
        if (n !== 0 && n % 10 === 0) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '3': function _(n) {
        if (n == 1) return 'one';
        return 'other';
      },
      '4': function _(n) {
        if (isBetween(n, 0, 1)) return 'one';
        return 'other';
      },
      '5': function _(n) {
        if (isBetween(n, 0, 2) && n != 2) return 'one';
        return 'other';
      },
      '6': function _(n) {
        if (n === 0) return 'zero';
        if (n % 10 == 1 && n % 100 != 11) return 'one';
        return 'other';
      },
      '7': function _(n) {
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '8': function _(n) {
        if (isBetween(n, 3, 6)) return 'few';
        if (isBetween(n, 7, 10)) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '9': function _(n) {
        if (n === 0 || n != 1 && isBetween(n % 100, 1, 19)) return 'few';
        if (n == 1) return 'one';
        return 'other';
      },
      '10': function _(n) {
        if (isBetween(n % 10, 2, 9) && !isBetween(n % 100, 11, 19)) return 'few';
        if (n % 10 == 1 && !isBetween(n % 100, 11, 19)) return 'one';
        return 'other';
      },
      '11': function _(n) {
        if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) return 'few';
        if (n % 10 === 0 || isBetween(n % 10, 5, 9) || isBetween(n % 100, 11, 14)) return 'many';
        if (n % 10 == 1 && n % 100 != 11) return 'one';
        return 'other';
      },
      '12': function _(n) {
        if (isBetween(n, 2, 4)) return 'few';
        if (n == 1) return 'one';
        return 'other';
      },
      '13': function _(n) {
        if (isBetween(n % 10, 2, 4) && !isBetween(n % 100, 12, 14)) return 'few';
        if (n != 1 && isBetween(n % 10, 0, 1) || isBetween(n % 10, 5, 9) || isBetween(n % 100, 12, 14)) return 'many';
        if (n == 1) return 'one';
        return 'other';
      },
      '14': function _(n) {
        if (isBetween(n % 100, 3, 4)) return 'few';
        if (n % 100 == 2) return 'two';
        if (n % 100 == 1) return 'one';
        return 'other';
      },
      '15': function _(n) {
        if (n === 0 || isBetween(n % 100, 2, 10)) return 'few';
        if (isBetween(n % 100, 11, 19)) return 'many';
        if (n == 1) return 'one';
        return 'other';
      },
      '16': function _(n) {
        if (n % 10 == 1 && n != 11) return 'one';
        return 'other';
      },
      '17': function _(n) {
        if (n == 3) return 'few';
        if (n === 0) return 'zero';
        if (n == 6) return 'many';
        if (n == 2) return 'two';
        if (n == 1) return 'one';
        return 'other';
      },
      '18': function _(n) {
        if (n === 0) return 'zero';
        if (isBetween(n, 0, 2) && n !== 0 && n != 2) return 'one';
        return 'other';
      },
      '19': function _(n) {
        if (isBetween(n, 2, 10)) return 'few';
        if (isBetween(n, 0, 1)) return 'one';
        return 'other';
      },
      '20': function _(n) {
        if ((isBetween(n % 10, 3, 4) || n % 10 == 9) && !(isBetween(n % 100, 10, 19) || isBetween(n % 100, 70, 79) || isBetween(n % 100, 90, 99))) return 'few';
        if (n % 1000000 === 0 && n !== 0) return 'many';
        if (n % 10 == 2 && !isIn(n % 100, [12, 72, 92])) return 'two';
        if (n % 10 == 1 && !isIn(n % 100, [11, 71, 91])) return 'one';
        return 'other';
      },
      '21': function _(n) {
        if (n === 0) return 'zero';
        if (n == 1) return 'one';
        return 'other';
      },
      '22': function _(n) {
        if (isBetween(n, 0, 1) || isBetween(n, 11, 99)) return 'one';
        return 'other';
      },
      '23': function _(n) {
        if (isBetween(n % 10, 1, 2) || n % 20 === 0) return 'one';
        return 'other';
      },
      '24': function _(n) {
        if (isBetween(n, 3, 10) || isBetween(n, 13, 19)) return 'few';
        if (isIn(n, [2, 12])) return 'two';
        if (isIn(n, [1, 11])) return 'one';
        return 'other';
      }
    };
    var index = locales2rules[lang.replace(/-.*$/, '')];

    if (!(index in pluralRules)) {
      console.warn('plural form unknown for [' + lang + ']');
      return function () {
        return 'other';
      };
    }

    return pluralRules[index];
  }

  gMacros.plural = function (str, param, key, prop) {
    var n = parseFloat(param);
    if (isNaN(n)) return str;
    if (prop != gTextProp) return str;

    if (!gMacros._pluralRules) {
      gMacros._pluralRules = getPluralRules(gLanguage);
    }

    var index = '[' + gMacros._pluralRules(n) + ']';

    if (n === 0 && key + '[zero]' in gL10nData) {
      str = gL10nData[key + '[zero]'][prop];
    } else if (n == 1 && key + '[one]' in gL10nData) {
      str = gL10nData[key + '[one]'][prop];
    } else if (n == 2 && key + '[two]' in gL10nData) {
      str = gL10nData[key + '[two]'][prop];
    } else if (key + index in gL10nData) {
      str = gL10nData[key + index][prop];
    } else if (key + '[other]' in gL10nData) {
      str = gL10nData[key + '[other]'][prop];
    }

    return str;
  };

  function getL10nData(key, args, fallback) {
    var data = gL10nData[key];

    if (!data) {
      console.warn('#' + key + ' is undefined.');

      if (!fallback) {
        return null;
      }

      data = fallback;
    }

    var rv = {};

    for (var prop in data) {
      var str = data[prop];
      str = substIndexes(str, args, key, prop);
      str = substArguments(str, args, key);
      rv[prop] = str;
    }

    return rv;
  }

  function substIndexes(str, args, key, prop) {
    var reIndex = /\{\[\s*([a-zA-Z]+)\(([a-zA-Z]+)\)\s*\]\}/;
    var reMatch = reIndex.exec(str);
    if (!reMatch || !reMatch.length) return str;
    var macroName = reMatch[1];
    var paramName = reMatch[2];
    var param;

    if (args && paramName in args) {
      param = args[paramName];
    } else if (paramName in gL10nData) {
      param = gL10nData[paramName];
    }

    if (macroName in gMacros) {
      var macro = gMacros[macroName];
      str = macro(str, param, key, prop);
    }

    return str;
  }

  function substArguments(str, args, key) {
    var reArgs = /\{\{\s*(.+?)\s*\}\}/g;
    return str.replace(reArgs, function (matched_text, arg) {
      if (args && arg in args) {
        return args[arg];
      }

      if (arg in gL10nData) {
        return gL10nData[arg];
      }

      console.log('argument {{' + arg + '}} for #' + key + ' is undefined.');
      return matched_text;
    });
  }

  function translateElement(element) {
    var l10n = getL10nAttributes(element);
    if (!l10n.id) return;
    var data = getL10nData(l10n.id, l10n.args);

    if (!data) {
      console.warn('#' + l10n.id + ' is undefined.');
      return;
    }

    if (data[gTextProp]) {
      if (getChildElementCount(element) === 0) {
        element[gTextProp] = data[gTextProp];
      } else {
        var children = element.childNodes;
        var found = false;

        for (var i = 0, l = children.length; i < l; i++) {
          if (children[i].nodeType === 3 && /\S/.test(children[i].nodeValue)) {
            if (found) {
              children[i].nodeValue = '';
            } else {
              children[i].nodeValue = data[gTextProp];
              found = true;
            }
          }
        }

        if (!found) {
          var textNode = document.createTextNode(data[gTextProp]);
          element.insertBefore(textNode, element.firstChild);
        }
      }

      delete data[gTextProp];
    }

    for (var k in data) {
      element[k] = data[k];
    }
  }

  function getChildElementCount(element) {
    if (element.children) {
      return element.children.length;
    }

    if (typeof element.childElementCount !== 'undefined') {
      return element.childElementCount;
    }

    var count = 0;

    for (var i = 0; i < element.childNodes.length; i++) {
      count += element.nodeType === 1 ? 1 : 0;
    }

    return count;
  }

  function translateFragment(element) {
    element = element || document.documentElement;
    var children = getTranslatableChildren(element);
    var elementCount = children.length;

    for (var i = 0; i < elementCount; i++) {
      translateElement(children[i]);
    }

    translateElement(element);
  }

  return {
    get: function get(key, args, fallbackString) {
      var index = key.lastIndexOf('.');
      var prop = gTextProp;

      if (index > 0) {
        prop = key.substring(index + 1);
        key = key.substring(0, index);
      }

      var fallback;

      if (fallbackString) {
        fallback = {};
        fallback[prop] = fallbackString;
      }

      var data = getL10nData(key, args, fallback);

      if (data && prop in data) {
        return data[prop];
      }

      return '{{' + key + '}}';
    },
    getData: function getData() {
      return gL10nData;
    },
    getText: function getText() {
      return gTextData;
    },
    getLanguage: function getLanguage() {
      return gLanguage;
    },
    setLanguage: function setLanguage(lang, callback) {
      loadLocale(lang, function () {
        if (callback) callback();
      });
    },
    getDirection: function getDirection() {
      var rtlList = ['ar', 'he', 'fa', 'ps', 'ur'];
      var shortCode = gLanguage.split('-', 1)[0];
      return rtlList.indexOf(shortCode) >= 0 ? 'rtl' : 'ltr';
    },
    translate: translateFragment,
    getReadyState: function getReadyState() {
      return gReadyState;
    },
    ready: function ready(callback) {
      if (!callback) {
        return;
      } else if (gReadyState == 'complete' || gReadyState == 'interactive') {
        window.setTimeout(function () {
          callback();
        });
      } else if (document.addEventListener) {
        document.addEventListener('localized', function once() {
          document.removeEventListener('localized', once);
          callback();
        });
      }
    }
  };
}(window, document);

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFFindController = exports.FindState = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

var _pdf_find_utils = __w_pdfjs_require__(14);

var _ui_utils = __w_pdfjs_require__(7);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
exports.FindState = FindState;
var FIND_TIMEOUT = 250;
var MATCH_SCROLL_OFFSET_TOP = -50;
var MATCH_SCROLL_OFFSET_LEFT = -400;
var CHARACTERS_TO_NORMALIZE = {
  "\u2018": "'",
  "\u2019": "'",
  "\u201A": "'",
  "\u201B": "'",
  "\u201C": '"',
  "\u201D": '"',
  "\u201E": '"',
  "\u201F": '"',
  "\xBC": "1/4",
  "\xBD": "1/2",
  "\xBE": "3/4"
};
var normalizationRegex = null;

function normalize(text) {
  if (!normalizationRegex) {
    var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join("");
    normalizationRegex = new RegExp("[".concat(replace, "]"), "g");
  }

  var diffs = null;
  var normalizedText = text.replace(normalizationRegex, function (ch, index) {
    var normalizedCh = CHARACTERS_TO_NORMALIZE[ch],
        diff = normalizedCh.length - ch.length;

    if (diff !== 0) {
      (diffs || (diffs = [])).push([index, diff]);
    }

    return normalizedCh;
  });
  return [normalizedText, diffs];
}

function getOriginalIndex(matchIndex) {
  var diffs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!diffs) {
    return matchIndex;
  }

  var totalDiff = 0;

  var _iterator = _createForOfIteratorHelper(diffs),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          index = _step$value[0],
          diff = _step$value[1];

      var currentIndex = index + totalDiff;

      if (currentIndex >= matchIndex) {
        break;
      }

      if (currentIndex + diff > matchIndex) {
        totalDiff += matchIndex - currentIndex;
        break;
      }

      totalDiff += diff;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return matchIndex - totalDiff;
}

var PDFFindController = /*#__PURE__*/function () {
  function PDFFindController(_ref) {
    var linkService = _ref.linkService,
        eventBus = _ref.eventBus;

    _classCallCheck(this, PDFFindController);

    this._linkService = linkService;
    this._eventBus = eventBus;

    this._reset();

    eventBus._on("findbarclose", this._onFindBarClose.bind(this));
  }

  _createClass(PDFFindController, [{
    key: "highlightMatches",
    get: function get() {
      return this._highlightMatches;
    }
  }, {
    key: "pageMatches",
    get: function get() {
      return this._pageMatches;
    }
  }, {
    key: "pageMatchesLength",
    get: function get() {
      return this._pageMatchesLength;
    }
  }, {
    key: "selected",
    get: function get() {
      return this._selected;
    }
  }, {
    key: "state",
    get: function get() {
      return this._state;
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      if (this._pdfDocument) {
        this._reset();
      }

      if (!pdfDocument) {
        return;
      }

      this._pdfDocument = pdfDocument;

      this._firstPageCapability.resolve();
    }
  }, {
    key: "executeCommand",
    value: function executeCommand(cmd, state) {
      var _this = this;

      if (!state) {
        return;
      }

      var pdfDocument = this._pdfDocument;

      if (this._state === null || this._shouldDirtyMatch(cmd, state)) {
        this._dirtyMatch = true;
      }

      this._state = state;

      if (cmd !== "findhighlightallchange") {
        this._updateUIState(FindState.PENDING);
      }

      this._firstPageCapability.promise.then(function () {
        if (!_this._pdfDocument || pdfDocument && _this._pdfDocument !== pdfDocument) {
          return;
        }

        _this._extractText();

        var findbarClosed = !_this._highlightMatches;
        var pendingTimeout = !!_this._findTimeout;

        if (_this._findTimeout) {
          clearTimeout(_this._findTimeout);
          _this._findTimeout = null;
        }

        if (cmd === "find") {
          _this._findTimeout = setTimeout(function () {
            _this._nextMatch();

            _this._findTimeout = null;
          }, FIND_TIMEOUT);
        } else if (_this._dirtyMatch) {
          _this._nextMatch();
        } else if (cmd === "findagain") {
          _this._nextMatch();

          if (findbarClosed && _this._state.highlightAll) {
            _this._updateAllPages();
          }
        } else if (cmd === "findhighlightallchange") {
          if (pendingTimeout) {
            _this._nextMatch();
          } else {
            _this._highlightMatches = true;
          }

          _this._updateAllPages();
        } else {
          _this._nextMatch();
        }
      });
    }
  }, {
    key: "scrollMatchIntoView",
    value: function scrollMatchIntoView(_ref2) {
      var _ref2$element = _ref2.element,
          element = _ref2$element === void 0 ? null : _ref2$element,
          _ref2$pageIndex = _ref2.pageIndex,
          pageIndex = _ref2$pageIndex === void 0 ? -1 : _ref2$pageIndex,
          _ref2$matchIndex = _ref2.matchIndex,
          matchIndex = _ref2$matchIndex === void 0 ? -1 : _ref2$matchIndex;

      if (!this._scrollMatches || !element) {
        return;
      } else if (matchIndex === -1 || matchIndex !== this._selected.matchIdx) {
        return;
      } else if (pageIndex === -1 || pageIndex !== this._selected.pageIdx) {
        return;
      }

      this._scrollMatches = false;
      var spot = {
        top: MATCH_SCROLL_OFFSET_TOP,
        left: MATCH_SCROLL_OFFSET_LEFT
      };
      (0, _ui_utils.scrollIntoView)(element, spot, true);
    }
  }, {
    key: "_reset",
    value: function _reset() {
      this._highlightMatches = false;
      this._scrollMatches = false;
      this._pdfDocument = null;
      this._pageMatches = [];
      this._pageMatchesLength = [];
      this._state = null;
      this._selected = {
        pageIdx: -1,
        matchIdx: -1
      };
      this._offset = {
        pageIdx: null,
        matchIdx: null,
        wrapped: false
      };
      this._extractTextPromises = [];
      this._pageContents = [];
      this._pageDiffs = [];
      this._matchesCountTotal = 0;
      this._pagesToSearch = null;
      this._pendingFindMatches = new Set();
      this._resumePageIdx = null;
      this._dirtyMatch = false;
      clearTimeout(this._findTimeout);
      this._findTimeout = null;
      this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
    }
  }, {
    key: "_query",
    get: function get() {
      if (this._state.query !== this._rawQuery) {
        this._rawQuery = this._state.query;

        var _normalize = normalize(this._state.query);

        var _normalize2 = _slicedToArray(_normalize, 1);

        this._normalizedQuery = _normalize2[0];
      }

      return this._normalizedQuery;
    }
  }, {
    key: "_shouldDirtyMatch",
    value: function _shouldDirtyMatch(cmd, state) {
      if (state.query !== this._state.query) {
        return true;
      }

      switch (cmd) {
        case "findagain":
          var pageNumber = this._selected.pageIdx + 1;
          var linkService = this._linkService;

          if (pageNumber >= 1 && pageNumber <= linkService.pagesCount && pageNumber !== linkService.page && !linkService.isPageVisible(pageNumber)) {
            return true;
          }

          return false;

        case "findhighlightallchange":
          return false;
      }

      return true;
    }
  }, {
    key: "_prepareMatches",
    value: function _prepareMatches(matchesWithLength, matches, matchesLength) {
      function isSubTerm(currentIndex) {
        var currentElem = matchesWithLength[currentIndex];
        var nextElem = matchesWithLength[currentIndex + 1];

        if (currentIndex < matchesWithLength.length - 1 && currentElem.match === nextElem.match) {
          currentElem.skipped = true;
          return true;
        }

        for (var i = currentIndex - 1; i >= 0; i--) {
          var prevElem = matchesWithLength[i];

          if (prevElem.skipped) {
            continue;
          }

          if (prevElem.match + prevElem.matchLength < currentElem.match) {
            break;
          }

          if (prevElem.match + prevElem.matchLength >= currentElem.match + currentElem.matchLength) {
            currentElem.skipped = true;
            return true;
          }
        }

        return false;
      }

      matchesWithLength.sort(function (a, b) {
        return a.match === b.match ? a.matchLength - b.matchLength : a.match - b.match;
      });

      for (var i = 0, len = matchesWithLength.length; i < len; i++) {
        if (isSubTerm(i)) {
          continue;
        }

        matches.push(matchesWithLength[i].match);
        matchesLength.push(matchesWithLength[i].matchLength);
      }
    }
  }, {
    key: "_isEntireWord",
    value: function _isEntireWord(content, startIdx, length) {
      if (startIdx > 0) {
        var first = content.charCodeAt(startIdx);
        var limit = content.charCodeAt(startIdx - 1);

        if ((0, _pdf_find_utils.getCharacterType)(first) === (0, _pdf_find_utils.getCharacterType)(limit)) {
          return false;
        }
      }

      var endIdx = startIdx + length - 1;

      if (endIdx < content.length - 1) {
        var last = content.charCodeAt(endIdx);

        var _limit = content.charCodeAt(endIdx + 1);

        if ((0, _pdf_find_utils.getCharacterType)(last) === (0, _pdf_find_utils.getCharacterType)(_limit)) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "_calculatePhraseMatch",
    value: function _calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
      var matches = [],
          matchesLength = [];
      var queryLen = query.length;
      var matchIdx = -queryLen;

      while (true) {
        matchIdx = pageContent.indexOf(query, matchIdx + queryLen);

        if (matchIdx === -1) {
          break;
        }

        if (entireWord && !this._isEntireWord(pageContent, matchIdx, queryLen)) {
          continue;
        }

        var originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
            matchEnd = matchIdx + queryLen - 1,
            originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
        matches.push(originalMatchIdx);
        matchesLength.push(originalQueryLen);
      }

      this._pageMatches[pageIndex] = matches;
      this._pageMatchesLength[pageIndex] = matchesLength;
    }
  }, {
    key: "_calculateWordMatch",
    value: function _calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord) {
      var matchesWithLength = [];
      var queryArray = query.match(/\S+/g);

      for (var i = 0, len = queryArray.length; i < len; i++) {
        var subquery = queryArray[i];
        var subqueryLen = subquery.length;
        var matchIdx = -subqueryLen;

        while (true) {
          matchIdx = pageContent.indexOf(subquery, matchIdx + subqueryLen);

          if (matchIdx === -1) {
            break;
          }

          if (entireWord && !this._isEntireWord(pageContent, matchIdx, subqueryLen)) {
            continue;
          }

          var originalMatchIdx = getOriginalIndex(matchIdx, pageDiffs),
              matchEnd = matchIdx + subqueryLen - 1,
              originalQueryLen = getOriginalIndex(matchEnd, pageDiffs) - originalMatchIdx + 1;
          matchesWithLength.push({
            match: originalMatchIdx,
            matchLength: originalQueryLen,
            skipped: false
          });
        }
      }

      this._pageMatchesLength[pageIndex] = [];
      this._pageMatches[pageIndex] = [];

      this._prepareMatches(matchesWithLength, this._pageMatches[pageIndex], this._pageMatchesLength[pageIndex]);
    }
  }, {
    key: "_calculateMatch",
    value: function _calculateMatch(pageIndex) {
      var pageContent = this._pageContents[pageIndex];
      var pageDiffs = this._pageDiffs[pageIndex];
      var query = this._query;
      var _this$_state = this._state,
          caseSensitive = _this$_state.caseSensitive,
          entireWord = _this$_state.entireWord,
          phraseSearch = _this$_state.phraseSearch;

      if (query.length === 0) {
        return;
      }

      if (!caseSensitive) {
        pageContent = pageContent.toLowerCase();
        query = query.toLowerCase();
      }

      if (phraseSearch) {
        this._calculatePhraseMatch(query, pageIndex, pageContent, pageDiffs, entireWord);
      } else {
        this._calculateWordMatch(query, pageIndex, pageContent, pageDiffs, entireWord);
      }

      if (this._state.highlightAll) {
        this._updatePage(pageIndex);
      }

      if (this._resumePageIdx === pageIndex) {
        this._resumePageIdx = null;

        this._nextPageMatch();
      }

      var pageMatchesCount = this._pageMatches[pageIndex].length;

      if (pageMatchesCount > 0) {
        this._matchesCountTotal += pageMatchesCount;

        this._updateUIResultsCount();
      }
    }
  }, {
    key: "_extractText",
    value: function _extractText() {
      var _this2 = this;

      if (this._extractTextPromises.length > 0) {
        return;
      }

      var promise = Promise.resolve();

      var _loop = function _loop(i, ii) {
        var extractTextCapability = (0, _pdfjsLib.createPromiseCapability)();
        _this2._extractTextPromises[i] = extractTextCapability.promise;
        promise = promise.then(function () {
          return _this2._pdfDocument.getPage(i + 1).then(function (pdfPage) {
            return pdfPage.getTextContent({
              normalizeWhitespace: true
            });
          }).then(function (textContent) {
            var textItems = textContent.items;
            var strBuf = [];

            for (var j = 0, jj = textItems.length; j < jj; j++) {
              strBuf.push(textItems[j].str);
            }

            var _normalize3 = normalize(strBuf.join(""));

            var _normalize4 = _slicedToArray(_normalize3, 2);

            _this2._pageContents[i] = _normalize4[0];
            _this2._pageDiffs[i] = _normalize4[1];
            extractTextCapability.resolve(i);
          }, function (reason) {
            console.error("Unable to get text content for page ".concat(i + 1), reason);
            _this2._pageContents[i] = "";
            _this2._pageDiffs[i] = null;
            extractTextCapability.resolve(i);
          });
        });
      };

      for (var i = 0, ii = this._linkService.pagesCount; i < ii; i++) {
        _loop(i, ii);
      }
    }
  }, {
    key: "_updatePage",
    value: function _updatePage(index) {
      if (this._scrollMatches && this._selected.pageIdx === index) {
        this._linkService.page = index + 1;
      }

      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: index
      });
    }
  }, {
    key: "_updateAllPages",
    value: function _updateAllPages() {
      this._eventBus.dispatch("updatetextlayermatches", {
        source: this,
        pageIndex: -1
      });
    }
  }, {
    key: "_nextMatch",
    value: function _nextMatch() {
      var _this3 = this;

      var previous = this._state.findPrevious;
      var currentPageIndex = this._linkService.page - 1;
      var numPages = this._linkService.pagesCount;
      this._highlightMatches = true;

      if (this._dirtyMatch) {
        this._dirtyMatch = false;
        this._selected.pageIdx = this._selected.matchIdx = -1;
        this._offset.pageIdx = currentPageIndex;
        this._offset.matchIdx = null;
        this._offset.wrapped = false;
        this._resumePageIdx = null;
        this._pageMatches.length = 0;
        this._pageMatchesLength.length = 0;
        this._matchesCountTotal = 0;

        this._updateAllPages();

        for (var i = 0; i < numPages; i++) {
          if (this._pendingFindMatches.has(i)) {
            continue;
          }

          this._pendingFindMatches.add(i);

          this._extractTextPromises[i].then(function (pageIdx) {
            _this3._pendingFindMatches["delete"](pageIdx);

            _this3._calculateMatch(pageIdx);
          });
        }
      }

      if (this._query === "") {
        this._updateUIState(FindState.FOUND);

        return;
      }

      if (this._resumePageIdx) {
        return;
      }

      var offset = this._offset;
      this._pagesToSearch = numPages;

      if (offset.matchIdx !== null) {
        var numPageMatches = this._pageMatches[offset.pageIdx].length;

        if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
          offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;

          this._updateMatch(true);

          return;
        }

        this._advanceOffsetPage(previous);
      }

      this._nextPageMatch();
    }
  }, {
    key: "_matchesReady",
    value: function _matchesReady(matches) {
      var offset = this._offset;
      var numMatches = matches.length;
      var previous = this._state.findPrevious;

      if (numMatches) {
        offset.matchIdx = previous ? numMatches - 1 : 0;

        this._updateMatch(true);

        return true;
      }

      this._advanceOffsetPage(previous);

      if (offset.wrapped) {
        offset.matchIdx = null;

        if (this._pagesToSearch < 0) {
          this._updateMatch(false);

          return true;
        }
      }

      return false;
    }
  }, {
    key: "_nextPageMatch",
    value: function _nextPageMatch() {
      if (this._resumePageIdx !== null) {
        console.error("There can only be one pending page.");
      }

      var matches = null;

      do {
        var pageIdx = this._offset.pageIdx;
        matches = this._pageMatches[pageIdx];

        if (!matches) {
          this._resumePageIdx = pageIdx;
          break;
        }
      } while (!this._matchesReady(matches));
    }
  }, {
    key: "_advanceOffsetPage",
    value: function _advanceOffsetPage(previous) {
      var offset = this._offset;
      var numPages = this._linkService.pagesCount;
      offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
      offset.matchIdx = null;
      this._pagesToSearch--;

      if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
        offset.pageIdx = previous ? numPages - 1 : 0;
        offset.wrapped = true;
      }
    }
  }, {
    key: "_updateMatch",
    value: function _updateMatch() {
      var found = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var state = FindState.NOT_FOUND;
      var wrapped = this._offset.wrapped;
      this._offset.wrapped = false;

      if (found) {
        var previousPage = this._selected.pageIdx;
        this._selected.pageIdx = this._offset.pageIdx;
        this._selected.matchIdx = this._offset.matchIdx;
        state = wrapped ? FindState.WRAPPED : FindState.FOUND;

        if (previousPage !== -1 && previousPage !== this._selected.pageIdx) {
          this._updatePage(previousPage);
        }
      }

      this._updateUIState(state, this._state.findPrevious);

      if (this._selected.pageIdx !== -1) {
        this._scrollMatches = true;

        this._updatePage(this._selected.pageIdx);
      }
    }
  }, {
    key: "_onFindBarClose",
    value: function _onFindBarClose(evt) {
      var _this4 = this;

      var pdfDocument = this._pdfDocument;

      this._firstPageCapability.promise.then(function () {
        if (!_this4._pdfDocument || pdfDocument && _this4._pdfDocument !== pdfDocument) {
          return;
        }

        if (_this4._findTimeout) {
          clearTimeout(_this4._findTimeout);
          _this4._findTimeout = null;
        }

        if (_this4._resumePageIdx) {
          _this4._resumePageIdx = null;
          _this4._dirtyMatch = true;
        }

        _this4._updateUIState(FindState.FOUND);

        _this4._highlightMatches = false;

        _this4._updateAllPages();
      });
    }
  }, {
    key: "_requestMatchesCount",
    value: function _requestMatchesCount() {
      var _this$_selected = this._selected,
          pageIdx = _this$_selected.pageIdx,
          matchIdx = _this$_selected.matchIdx;
      var current = 0,
          total = this._matchesCountTotal;

      if (matchIdx !== -1) {
        for (var i = 0; i < pageIdx; i++) {
          var _this$_pageMatches$i;

          current += ((_this$_pageMatches$i = this._pageMatches[i]) === null || _this$_pageMatches$i === void 0 ? void 0 : _this$_pageMatches$i.length) || 0;
        }

        current += matchIdx + 1;
      }

      if (current < 1 || current > total) {
        current = total = 0;
      }

      return {
        current: current,
        total: total
      };
    }
  }, {
    key: "_updateUIResultsCount",
    value: function _updateUIResultsCount() {
      this._eventBus.dispatch("updatefindmatchescount", {
        source: this,
        matchesCount: this._requestMatchesCount()
      });
    }
  }, {
    key: "_updateUIState",
    value: function _updateUIState(state, previous) {
      var _this$_state$query, _this$_state2;

      this._eventBus.dispatch("updatefindcontrolstate", {
        source: this,
        state: state,
        previous: previous,
        matchesCount: this._requestMatchesCount(),
        rawQuery: (_this$_state$query = (_this$_state2 = this._state) === null || _this$_state2 === void 0 ? void 0 : _this$_state2.query) !== null && _this$_state$query !== void 0 ? _this$_state$query : null
      });
    }
  }]);

  return PDFFindController;
}();

exports.PDFFindController = PDFFindController;

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.getCharacterType = getCharacterType;
exports.CharacterType = void 0;
var CharacterType = {
  SPACE: 0,
  ALPHA_LETTER: 1,
  PUNCT: 2,
  HAN_LETTER: 3,
  KATAKANA_LETTER: 4,
  HIRAGANA_LETTER: 5,
  HALFWIDTH_KATAKANA_LETTER: 6,
  THAI_LETTER: 7
};
exports.CharacterType = CharacterType;

function isAlphabeticalScript(charCode) {
  return charCode < 0x2e80;
}

function isAscii(charCode) {
  return (charCode & 0xff80) === 0;
}

function isAsciiAlpha(charCode) {
  return charCode >= 0x61 && charCode <= 0x7a || charCode >= 0x41 && charCode <= 0x5a;
}

function isAsciiDigit(charCode) {
  return charCode >= 0x30 && charCode <= 0x39;
}

function isAsciiSpace(charCode) {
  return charCode === 0x20 || charCode === 0x09 || charCode === 0x0d || charCode === 0x0a;
}

function isHan(charCode) {
  return charCode >= 0x3400 && charCode <= 0x9fff || charCode >= 0xf900 && charCode <= 0xfaff;
}

function isKatakana(charCode) {
  return charCode >= 0x30a0 && charCode <= 0x30ff;
}

function isHiragana(charCode) {
  return charCode >= 0x3040 && charCode <= 0x309f;
}

function isHalfwidthKatakana(charCode) {
  return charCode >= 0xff60 && charCode <= 0xff9f;
}

function isThai(charCode) {
  return (charCode & 0xff80) === 0x0e00;
}

function getCharacterType(charCode) {
  if (isAlphabeticalScript(charCode)) {
    if (isAscii(charCode)) {
      if (isAsciiSpace(charCode)) {
        return CharacterType.SPACE;
      } else if (isAsciiAlpha(charCode) || isAsciiDigit(charCode) || charCode === 0x5f) {
        return CharacterType.ALPHA_LETTER;
      }

      return CharacterType.PUNCT;
    } else if (isThai(charCode)) {
      return CharacterType.THAI_LETTER;
    } else if (charCode === 0xa0) {
      return CharacterType.SPACE;
    }

    return CharacterType.ALPHA_LETTER;
  }

  if (isHan(charCode)) {
    return CharacterType.HAN_LETTER;
  } else if (isKatakana(charCode)) {
    return CharacterType.KATAKANA_LETTER;
  } else if (isHiragana(charCode)) {
    return CharacterType.HIRAGANA_LETTER;
  } else if (isHalfwidthKatakana(charCode)) {
    return CharacterType.HALFWIDTH_KATAKANA_LETTER;
  }

  return CharacterType.ALPHA_LETTER;
}

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isDestArraysEqual = isDestArraysEqual;
exports.isDestHashesEqual = isDestHashesEqual;
exports.PDFHistory = void 0;

var _ui_utils = __w_pdfjs_require__(7);

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HASH_CHANGE_TIMEOUT = 1000;
var POSITION_UPDATED_THRESHOLD = 50;
var UPDATE_VIEWAREA_TIMEOUT = 1000;

function getCurrentHash() {
  return document.location.hash;
}

var PDFHistory = /*#__PURE__*/function () {
  function PDFHistory(_ref) {
    var _this = this;

    var linkService = _ref.linkService,
        eventBus = _ref.eventBus;

    _classCallCheck(this, PDFHistory);

    this.linkService = linkService;
    this.eventBus = eventBus;
    this._initialized = false;
    this._fingerprint = "";
    this.reset();
    this._boundEvents = null;
    this._isViewerInPresentationMode = false;

    this.eventBus._on("presentationmodechanged", function (evt) {
      _this._isViewerInPresentationMode = evt.state !== _ui_utils.PresentationModeState.NORMAL;
    });

    this.eventBus._on("pagesinit", function () {
      _this._isPagesLoaded = false;

      _this.eventBus._on("pagesloaded", function (evt) {
        _this._isPagesLoaded = !!evt.pagesCount;
      }, {
        once: true
      });
    });
  }

  _createClass(PDFHistory, [{
    key: "initialize",
    value: function initialize(_ref2) {
      var fingerprint = _ref2.fingerprint,
          _ref2$resetHistory = _ref2.resetHistory,
          resetHistory = _ref2$resetHistory === void 0 ? false : _ref2$resetHistory,
          _ref2$updateUrl = _ref2.updateUrl,
          updateUrl = _ref2$updateUrl === void 0 ? false : _ref2$updateUrl;

      if (!fingerprint || typeof fingerprint !== "string") {
        console.error('PDFHistory.initialize: The "fingerprint" must be a non-empty string.');
        return;
      }

      if (this._initialized) {
        this.reset();
      }

      var reInitialized = this._fingerprint !== "" && this._fingerprint !== fingerprint;
      this._fingerprint = fingerprint;
      this._updateUrl = updateUrl === true;
      this._initialized = true;

      this._bindEvents();

      var state = window.history.state;
      this._popStateInProgress = false;
      this._blockHashChange = 0;
      this._currentHash = getCurrentHash();
      this._numPositionUpdates = 0;
      this._uid = this._maxUid = 0;
      this._destination = null;
      this._position = null;

      if (!this._isValidState(state, true) || resetHistory) {
        var _this$_parseCurrentHa = this._parseCurrentHash(true),
            hash = _this$_parseCurrentHa.hash,
            page = _this$_parseCurrentHa.page,
            rotation = _this$_parseCurrentHa.rotation;

        if (!hash || reInitialized || resetHistory) {
          this._pushOrReplaceState(null, true);

          return;
        }

        this._pushOrReplaceState({
          hash: hash,
          page: page,
          rotation: rotation
        }, true);

        return;
      }

      var destination = state.destination;

      this._updateInternalState(destination, state.uid, true);

      if (destination.rotation !== undefined) {
        this._initialRotation = destination.rotation;
      }

      if (destination.dest) {
        this._initialBookmark = JSON.stringify(destination.dest);
        this._destination.page = null;
      } else if (destination.hash) {
        this._initialBookmark = destination.hash;
      } else if (destination.page) {
        this._initialBookmark = "page=".concat(destination.page);
      }
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this._initialized) {
        this._pageHide();

        this._initialized = false;

        this._unbindEvents();
      }

      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      this._initialBookmark = null;
      this._initialRotation = null;
    }
  }, {
    key: "push",
    value: function push(_ref3) {
      var _this2 = this;

      var _ref3$namedDest = _ref3.namedDest,
          namedDest = _ref3$namedDest === void 0 ? null : _ref3$namedDest,
          explicitDest = _ref3.explicitDest,
          pageNumber = _ref3.pageNumber;

      if (!this._initialized) {
        return;
      }

      if (namedDest && typeof namedDest !== "string") {
        console.error("PDFHistory.push: " + "\"".concat(namedDest, "\" is not a valid namedDest parameter."));
        return;
      } else if (!Array.isArray(explicitDest)) {
        console.error("PDFHistory.push: " + "\"".concat(explicitDest, "\" is not a valid explicitDest parameter."));
        return;
      } else if (!this._isValidPage(pageNumber)) {
        if (pageNumber !== null || this._destination) {
          console.error("PDFHistory.push: " + "\"".concat(pageNumber, "\" is not a valid pageNumber parameter."));
          return;
        }
      }

      var hash = namedDest || JSON.stringify(explicitDest);

      if (!hash) {
        return;
      }

      var forceReplace = false;

      if (this._destination && (isDestHashesEqual(this._destination.hash, hash) || isDestArraysEqual(this._destination.dest, explicitDest))) {
        if (this._destination.page) {
          return;
        }

        forceReplace = true;
      }

      if (this._popStateInProgress && !forceReplace) {
        return;
      }

      this._pushOrReplaceState({
        dest: explicitDest,
        hash: hash,
        page: pageNumber,
        rotation: this.linkService.rotation
      }, forceReplace);

      if (!this._popStateInProgress) {
        this._popStateInProgress = true;
        Promise.resolve().then(function () {
          _this2._popStateInProgress = false;
        });
      }
    }
  }, {
    key: "pushPage",
    value: function pushPage(pageNumber) {
      var _this$_destination,
          _this3 = this;

      if (!this._initialized) {
        return;
      }

      if (!this._isValidPage(pageNumber)) {
        console.error("PDFHistory.pushPage: \"".concat(pageNumber, "\" is not a valid page number."));
        return;
      }

      if (((_this$_destination = this._destination) === null || _this$_destination === void 0 ? void 0 : _this$_destination.page) === pageNumber) {
        return;
      }

      if (this._popStateInProgress) {
        return;
      }

      this._pushOrReplaceState({
        dest: null,
        hash: "page=".concat(pageNumber),
        page: pageNumber,
        rotation: this.linkService.rotation
      });

      if (!this._popStateInProgress) {
        this._popStateInProgress = true;
        Promise.resolve().then(function () {
          _this3._popStateInProgress = false;
        });
      }
    }
  }, {
    key: "pushCurrentPosition",
    value: function pushCurrentPosition() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }

      this._tryPushCurrentPosition();
    }
  }, {
    key: "back",
    value: function back() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }

      var state = window.history.state;

      if (this._isValidState(state) && state.uid > 0) {
        window.history.back();
      }
    }
  }, {
    key: "forward",
    value: function forward() {
      if (!this._initialized || this._popStateInProgress) {
        return;
      }

      var state = window.history.state;

      if (this._isValidState(state) && state.uid < this._maxUid) {
        window.history.forward();
      }
    }
  }, {
    key: "popStateInProgress",
    get: function get() {
      return this._initialized && (this._popStateInProgress || this._blockHashChange > 0);
    }
  }, {
    key: "initialBookmark",
    get: function get() {
      return this._initialized ? this._initialBookmark : null;
    }
  }, {
    key: "initialRotation",
    get: function get() {
      return this._initialized ? this._initialRotation : null;
    }
  }, {
    key: "_pushOrReplaceState",
    value: function _pushOrReplaceState(destination) {
      var forceReplace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var shouldReplace = forceReplace || !this._destination;
      var newState = {
        fingerprint: this._fingerprint,
        uid: shouldReplace ? this._uid : this._uid + 1,
        destination: destination
      };

      this._updateInternalState(destination, newState.uid);

      var newUrl;

      if (this._updateUrl && destination !== null && destination !== void 0 && destination.hash) {
        var baseUrl = document.location.href.split("#")[0];

        if (!baseUrl.startsWith("file://")) {
          newUrl = "".concat(baseUrl, "#").concat(destination.hash);
        }
      }

      if (shouldReplace) {
        window.history.replaceState(newState, "", newUrl);
      } else {
        window.history.pushState(newState, "", newUrl);
      }
    }
  }, {
    key: "_tryPushCurrentPosition",
    value: function _tryPushCurrentPosition() {
      var temporary = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this._position) {
        return;
      }

      var position = this._position;

      if (temporary) {
        position = Object.assign(Object.create(null), this._position);
        position.temporary = true;
      }

      if (!this._destination) {
        this._pushOrReplaceState(position);

        return;
      }

      if (this._destination.temporary) {
        this._pushOrReplaceState(position, true);

        return;
      }

      if (this._destination.hash === position.hash) {
        return;
      }

      if (!this._destination.page && (POSITION_UPDATED_THRESHOLD <= 0 || this._numPositionUpdates <= POSITION_UPDATED_THRESHOLD)) {
        return;
      }

      var forceReplace = false;

      if (this._destination.page >= position.first && this._destination.page <= position.page) {
        if (this._destination.dest !== undefined || !this._destination.first) {
          return;
        }

        forceReplace = true;
      }

      this._pushOrReplaceState(position, forceReplace);
    }
  }, {
    key: "_isValidPage",
    value: function _isValidPage(val) {
      return Number.isInteger(val) && val > 0 && val <= this.linkService.pagesCount;
    }
  }, {
    key: "_isValidState",
    value: function _isValidState(state) {
      var checkReload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!state) {
        return false;
      }

      if (state.fingerprint !== this._fingerprint) {
        if (checkReload) {
          if (typeof state.fingerprint !== "string" || state.fingerprint.length !== this._fingerprint.length) {
            return false;
          }

          var _performance$getEntri = performance.getEntriesByType("navigation"),
              _performance$getEntri2 = _slicedToArray(_performance$getEntri, 1),
              perfEntry = _performance$getEntri2[0];

          if ((perfEntry === null || perfEntry === void 0 ? void 0 : perfEntry.type) !== "reload") {
            return false;
          }
        } else {
          return false;
        }
      }

      if (!Number.isInteger(state.uid) || state.uid < 0) {
        return false;
      }

      if (state.destination === null || _typeof(state.destination) !== "object") {
        return false;
      }

      return true;
    }
  }, {
    key: "_updateInternalState",
    value: function _updateInternalState(destination, uid) {
      var removeTemporary = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      if (removeTemporary && destination !== null && destination !== void 0 && destination.temporary) {
        delete destination.temporary;
      }

      this._destination = destination;
      this._uid = uid;
      this._maxUid = Math.max(this._maxUid, uid);
      this._numPositionUpdates = 0;
    }
  }, {
    key: "_parseCurrentHash",
    value: function _parseCurrentHash() {
      var checkNameddest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var hash = unescape(getCurrentHash()).substring(1);
      var params = (0, _ui_utils.parseQueryString)(hash);
      var nameddest = params.nameddest || "";
      var page = params.page | 0;

      if (!this._isValidPage(page) || checkNameddest && nameddest.length > 0) {
        page = null;
      }

      return {
        hash: hash,
        page: page,
        rotation: this.linkService.rotation
      };
    }
  }, {
    key: "_updateViewarea",
    value: function _updateViewarea(_ref4) {
      var _this4 = this;

      var location = _ref4.location;

      if (this._updateViewareaTimeout) {
        clearTimeout(this._updateViewareaTimeout);
        this._updateViewareaTimeout = null;
      }

      this._position = {
        hash: this._isViewerInPresentationMode ? "page=".concat(location.pageNumber) : location.pdfOpenParams.substring(1),
        page: this.linkService.page,
        first: location.pageNumber,
        rotation: location.rotation
      };

      if (this._popStateInProgress) {
        return;
      }

      if (POSITION_UPDATED_THRESHOLD > 0 && this._isPagesLoaded && this._destination && !this._destination.page) {
        this._numPositionUpdates++;
      }

      if (UPDATE_VIEWAREA_TIMEOUT > 0) {
        this._updateViewareaTimeout = setTimeout(function () {
          if (!_this4._popStateInProgress) {
            _this4._tryPushCurrentPosition(true);
          }

          _this4._updateViewareaTimeout = null;
        }, UPDATE_VIEWAREA_TIMEOUT);
      }
    }
  }, {
    key: "_popState",
    value: function _popState(_ref5) {
      var _this5 = this;

      var state = _ref5.state;
      var newHash = getCurrentHash(),
          hashChanged = this._currentHash !== newHash;
      this._currentHash = newHash;

      if (!state) {
        this._uid++;

        var _this$_parseCurrentHa2 = this._parseCurrentHash(),
            hash = _this$_parseCurrentHa2.hash,
            page = _this$_parseCurrentHa2.page,
            rotation = _this$_parseCurrentHa2.rotation;

        this._pushOrReplaceState({
          hash: hash,
          page: page,
          rotation: rotation
        }, true);

        return;
      }

      if (!this._isValidState(state)) {
        return;
      }

      this._popStateInProgress = true;

      if (hashChanged) {
        this._blockHashChange++;
        (0, _ui_utils.waitOnEventOrTimeout)({
          target: window,
          name: "hashchange",
          delay: HASH_CHANGE_TIMEOUT
        }).then(function () {
          _this5._blockHashChange--;
        });
      }

      var destination = state.destination;

      this._updateInternalState(destination, state.uid, true);

      if ((0, _ui_utils.isValidRotation)(destination.rotation)) {
        this.linkService.rotation = destination.rotation;
      }

      if (destination.dest) {
        this.linkService.goToDestination(destination.dest);
      } else if (destination.hash) {
        this.linkService.setHash(destination.hash);
      } else if (destination.page) {
        this.linkService.page = destination.page;
      }

      Promise.resolve().then(function () {
        _this5._popStateInProgress = false;
      });
    }
  }, {
    key: "_pageHide",
    value: function _pageHide() {
      if (!this._destination || this._destination.temporary) {
        this._tryPushCurrentPosition();
      }
    }
  }, {
    key: "_bindEvents",
    value: function _bindEvents() {
      if (this._boundEvents) {
        return;
      }

      this._boundEvents = {
        updateViewarea: this._updateViewarea.bind(this),
        popState: this._popState.bind(this),
        pageHide: this._pageHide.bind(this)
      };

      this.eventBus._on("updateviewarea", this._boundEvents.updateViewarea);

      window.addEventListener("popstate", this._boundEvents.popState);
      window.addEventListener("pagehide", this._boundEvents.pageHide);
    }
  }, {
    key: "_unbindEvents",
    value: function _unbindEvents() {
      if (!this._boundEvents) {
        return;
      }

      this.eventBus._off("updateviewarea", this._boundEvents.updateViewarea);

      window.removeEventListener("popstate", this._boundEvents.popState);
      window.removeEventListener("pagehide", this._boundEvents.pageHide);
      this._boundEvents = null;
    }
  }]);

  return PDFHistory;
}();

exports.PDFHistory = PDFHistory;

function isDestHashesEqual(destHash, pushHash) {
  if (typeof destHash !== "string" || typeof pushHash !== "string") {
    return false;
  }

  if (destHash === pushHash) {
    return true;
  }

  var _parseQueryString = (0, _ui_utils.parseQueryString)(destHash),
      nameddest = _parseQueryString.nameddest;

  if (nameddest === pushHash) {
    return true;
  }

  return false;
}

function isDestArraysEqual(firstDest, secondDest) {
  function isEntryEqual(first, second) {
    if (_typeof(first) !== _typeof(second)) {
      return false;
    }

    if (Array.isArray(first) || Array.isArray(second)) {
      return false;
    }

    if (first !== null && _typeof(first) === "object" && second !== null) {
      if (Object.keys(first).length !== Object.keys(second).length) {
        return false;
      }

      for (var key in first) {
        if (!isEntryEqual(first[key], second[key])) {
          return false;
        }
      }

      return true;
    }

    return first === second || Number.isNaN(first) && Number.isNaN(second);
  }

  if (!(Array.isArray(firstDest) && Array.isArray(secondDest))) {
    return false;
  }

  if (firstDest.length !== secondDest.length) {
    return false;
  }

  for (var i = 0, ii = firstDest.length; i < ii; i++) {
    if (!isEntryEqual(firstDest[i], secondDest[i])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFPageView = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(4));

var _ui_utils = __w_pdfjs_require__(7);

var _pdfjsLib = __w_pdfjs_require__(2);

var _l10n_utils = __w_pdfjs_require__(3);

var _pdf_rendering_queue = __w_pdfjs_require__(17);

var _viewer_compatibility = __w_pdfjs_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MAX_CANVAS_PIXELS = _viewer_compatibility.viewerCompatibilityParams.maxCanvasPixels || 16777216;

var PDFPageView = /*#__PURE__*/function () {
  function PDFPageView(options) {
    _classCallCheck(this, PDFPageView);

    var container = options.container;
    var defaultViewport = options.defaultViewport;
    this.id = options.id;
    this.renderingId = "page" + this.id;
    this.pdfPage = null;
    this.pageLabel = null;
    this.rotation = 0;
    this.scale = options.scale || _ui_utils.DEFAULT_SCALE;
    this.viewport = defaultViewport;
    this.pdfPageRotate = defaultViewport.rotation;
    this._optionalContentConfigPromise = options.optionalContentConfigPromise || null;
    this.hasRestrictedScaling = false;
    this.textLayerMode = Number.isInteger(options.textLayerMode) ? options.textLayerMode : _ui_utils.TextLayerMode.ENABLE;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.renderInteractiveForms = options.renderInteractiveForms !== false;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels || MAX_CANVAS_PIXELS;
    this.eventBus = options.eventBus;
    this.renderingQueue = options.renderingQueue;
    this.textLayerFactory = options.textLayerFactory;
    this.annotationLayerFactory = options.annotationLayerFactory;
    this.xfaLayerFactory = options.xfaLayerFactory;
    this.structTreeLayerFactory = options.structTreeLayerFactory;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.paintTask = null;
    this.paintedViewportMap = new WeakMap();
    this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
    this.resume = null;
    this._renderError = null;
    this.annotationLayer = null;
    this.textLayer = null;
    this.zoomLayer = null;
    this.xfaLayer = null;
    this.structTreeLayer = null;
    var div = document.createElement("div");
    div.className = "page";
    div.style.width = Math.floor(this.viewport.width) + "px";
    div.style.height = Math.floor(this.viewport.height) + "px";
    div.setAttribute("data-page-number", this.id);
    div.setAttribute("role", "region");
    this.l10n.get("page_landmark", {
      page: this.id
    }).then(function (msg) {
      div.setAttribute("aria-label", msg);
    });
    this.div = div;
    container.appendChild(div);
  }

  _createClass(PDFPageView, [{
    key: "setPdfPage",
    value: function setPdfPage(pdfPage) {
      this.pdfPage = pdfPage;
      this.pdfPageRotate = pdfPage.rotate;
      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = pdfPage.getViewport({
        scale: this.scale * _ui_utils.CSS_UNITS,
        rotation: totalRotation
      });
      this.reset();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.reset();

      if (this.pdfPage) {
        this.pdfPage.cleanup();
      }
    }
  }, {
    key: "_renderAnnotationLayer",
    value: function () {
      var _renderAnnotationLayer2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var error;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                error = null;
                _context.prev = 1;
                _context.next = 4;
                return this.annotationLayer.render(this.viewport, "display");

              case 4:
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](1);
                error = _context.t0;

              case 9:
                _context.prev = 9;
                this.eventBus.dispatch("annotationlayerrendered", {
                  source: this,
                  pageNumber: this.id,
                  error: error
                });
                return _context.finish(9);

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 6, 9, 12]]);
      }));

      function _renderAnnotationLayer() {
        return _renderAnnotationLayer2.apply(this, arguments);
      }

      return _renderAnnotationLayer;
    }()
  }, {
    key: "_renderXfaLayer",
    value: function () {
      var _renderXfaLayer2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var error;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                error = null;
                _context2.prev = 1;
                _context2.next = 4;
                return this.xfaLayer.render(this.viewport, "display");

              case 4:
                _context2.next = 9;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](1);
                error = _context2.t0;

              case 9:
                _context2.prev = 9;
                this.eventBus.dispatch("xfalayerrendered", {
                  source: this,
                  pageNumber: this.id,
                  error: error
                });
                return _context2.finish(9);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6, 9, 12]]);
      }));

      function _renderXfaLayer() {
        return _renderXfaLayer2.apply(this, arguments);
      }

      return _renderXfaLayer;
    }()
  }, {
    key: "_resetZoomLayer",
    value: function _resetZoomLayer() {
      var removeFromDOM = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.zoomLayer) {
        return;
      }

      var zoomLayerCanvas = this.zoomLayer.firstChild;
      this.paintedViewportMap["delete"](zoomLayerCanvas);
      zoomLayerCanvas.width = 0;
      zoomLayerCanvas.height = 0;

      if (removeFromDOM) {
        this.zoomLayer.remove();
      }

      this.zoomLayer = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      var _this$annotationLayer,
          _this$xfaLayer,
          _this = this;

      var keepZoomLayer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var keepAnnotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      this.cancelRendering(keepAnnotations);
      this.renderingState = _pdf_rendering_queue.RenderingStates.INITIAL;
      var div = this.div;
      div.style.width = Math.floor(this.viewport.width) + "px";
      div.style.height = Math.floor(this.viewport.height) + "px";
      var childNodes = div.childNodes;
      var currentZoomLayerNode = keepZoomLayer && this.zoomLayer || null;
      var currentAnnotationNode = keepAnnotations && ((_this$annotationLayer = this.annotationLayer) === null || _this$annotationLayer === void 0 ? void 0 : _this$annotationLayer.div) || null;
      var currentXfaLayerNode = ((_this$xfaLayer = this.xfaLayer) === null || _this$xfaLayer === void 0 ? void 0 : _this$xfaLayer.div) || null;

      for (var i = childNodes.length - 1; i >= 0; i--) {
        var node = childNodes[i];

        if (currentZoomLayerNode === node || currentAnnotationNode === node || currentXfaLayerNode === node) {
          continue;
        }

        div.removeChild(node);
      }

      div.removeAttribute("data-loaded");

      if (currentAnnotationNode) {
        this.annotationLayer.hide();
      } else if (this.annotationLayer) {
        this.annotationLayer.cancel();
        this.annotationLayer = null;
      }

      if (!currentZoomLayerNode) {
        if (this.canvas) {
          this.paintedViewportMap["delete"](this.canvas);
          this.canvas.width = 0;
          this.canvas.height = 0;
          delete this.canvas;
        }

        this._resetZoomLayer();
      }

      if (this.svg) {
        this.paintedViewportMap["delete"](this.svg);
        delete this.svg;
      }

      this.loadingIconDiv = document.createElement("div");
      this.loadingIconDiv.className = "loadingIcon";
      this.loadingIconDiv.setAttribute("role", "img");
      this.l10n.get("loading").then(function (msg) {
        var _this$loadingIconDiv;

        (_this$loadingIconDiv = _this.loadingIconDiv) === null || _this$loadingIconDiv === void 0 ? void 0 : _this$loadingIconDiv.setAttribute("aria-label", msg);
      });
      div.appendChild(this.loadingIconDiv);
    }
  }, {
    key: "update",
    value: function update(scale, rotation) {
      var optionalContentConfigPromise = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      this.scale = scale || this.scale;

      if (typeof rotation !== "undefined") {
        this.rotation = rotation;
      }

      if (optionalContentConfigPromise instanceof Promise) {
        this._optionalContentConfigPromise = optionalContentConfigPromise;
      }

      var totalRotation = (this.rotation + this.pdfPageRotate) % 360;
      this.viewport = this.viewport.clone({
        scale: this.scale * _ui_utils.CSS_UNITS,
        rotation: totalRotation
      });

      if (this.svg) {
        this.cssTransform(this.svg, true);
        this.eventBus.dispatch("pagerendered", {
          source: this,
          pageNumber: this.id,
          cssTransform: true,
          timestamp: performance.now(),
          error: this._renderError
        });
        return;
      }

      var isScalingRestricted = false;

      if (this.canvas && this.maxCanvasPixels > 0) {
        var outputScale = this.outputScale;

        if ((Math.floor(this.viewport.width) * outputScale.sx | 0) * (Math.floor(this.viewport.height) * outputScale.sy | 0) > this.maxCanvasPixels) {
          isScalingRestricted = true;
        }
      }

      if (this.canvas) {
        if (this.useOnlyCssZoom || this.hasRestrictedScaling && isScalingRestricted) {
          this.cssTransform(this.canvas, true);
          this.eventBus.dispatch("pagerendered", {
            source: this,
            pageNumber: this.id,
            cssTransform: true,
            timestamp: performance.now(),
            error: this._renderError
          });
          return;
        }

        if (!this.zoomLayer && !this.canvas.hidden) {
          this.zoomLayer = this.canvas.parentNode;
          this.zoomLayer.style.position = "absolute";
        }
      }

      if (this.zoomLayer) {
        this.cssTransform(this.zoomLayer.firstChild);
      }

      this.reset(true, true);
    }
  }, {
    key: "cancelRendering",
    value: function cancelRendering() {
      var keepAnnotations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (this.paintTask) {
        this.paintTask.cancel();
        this.paintTask = null;
      }

      this.resume = null;

      if (this.textLayer) {
        this.textLayer.cancel();
        this.textLayer = null;
      }

      if (!keepAnnotations && this.annotationLayer) {
        this.annotationLayer.cancel();
        this.annotationLayer = null;
      }

      if (this._onTextLayerRendered) {
        this.eventBus._off("textlayerrendered", this._onTextLayerRendered);

        this._onTextLayerRendered = null;
      }
    }
  }, {
    key: "cssTransform",
    value: function cssTransform(target) {
      var redrawAnnotations = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var width = this.viewport.width;
      var height = this.viewport.height;
      var div = this.div;
      target.style.width = target.parentNode.style.width = div.style.width = Math.floor(width) + "px";
      target.style.height = target.parentNode.style.height = div.style.height = Math.floor(height) + "px";
      var relativeRotation = this.viewport.rotation - this.paintedViewportMap.get(target).rotation;
      var absRotation = Math.abs(relativeRotation);
      var scaleX = 1,
          scaleY = 1;

      if (absRotation === 90 || absRotation === 270) {
        scaleX = height / width;
        scaleY = width / height;
      }

      target.style.transform = "rotate(".concat(relativeRotation, "deg) scale(").concat(scaleX, ", ").concat(scaleY, ")");

      if (this.textLayer) {
        var textLayerViewport = this.textLayer.viewport;
        var textRelativeRotation = this.viewport.rotation - textLayerViewport.rotation;
        var textAbsRotation = Math.abs(textRelativeRotation);
        var scale = width / textLayerViewport.width;

        if (textAbsRotation === 90 || textAbsRotation === 270) {
          scale = width / textLayerViewport.height;
        }

        var textLayerDiv = this.textLayer.textLayerDiv;
        var transX, transY;

        switch (textAbsRotation) {
          case 0:
            transX = transY = 0;
            break;

          case 90:
            transX = 0;
            transY = "-" + textLayerDiv.style.height;
            break;

          case 180:
            transX = "-" + textLayerDiv.style.width;
            transY = "-" + textLayerDiv.style.height;
            break;

          case 270:
            transX = "-" + textLayerDiv.style.width;
            transY = 0;
            break;

          default:
            console.error("Bad rotation value.");
            break;
        }

        textLayerDiv.style.transform = "rotate(".concat(textAbsRotation, "deg) ") + "scale(".concat(scale, ") ") + "translate(".concat(transX, ", ").concat(transY, ")");
        textLayerDiv.style.transformOrigin = "0% 0%";
      }

      if (redrawAnnotations && this.annotationLayer) {
        this._renderAnnotationLayer();
      }

      if (this.xfaLayer) {
        this._renderXfaLayer();
      }
    }
  }, {
    key: "width",
    get: function get() {
      return this.viewport.width;
    }
  }, {
    key: "height",
    get: function get() {
      return this.viewport.height;
    }
  }, {
    key: "getPagePoint",
    value: function getPagePoint(x, y) {
      return this.viewport.convertToPdfPoint(x, y);
    }
  }, {
    key: "draw",
    value: function draw() {
      var _this$annotationLayer2,
          _this2 = this;

      if (this.renderingState !== _pdf_rendering_queue.RenderingStates.INITIAL) {
        console.error("Must be in new state before drawing");
        this.reset();
      }

      var div = this.div,
          pdfPage = this.pdfPage;

      if (!pdfPage) {
        this.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

        if (this.loadingIconDiv) {
          div.removeChild(this.loadingIconDiv);
          delete this.loadingIconDiv;
        }

        return Promise.reject(new Error("pdfPage is not loaded"));
      }

      this.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
      var canvasWrapper = document.createElement("div");
      canvasWrapper.style.width = div.style.width;
      canvasWrapper.style.height = div.style.height;
      canvasWrapper.classList.add("canvasWrapper");

      if ((_this$annotationLayer2 = this.annotationLayer) !== null && _this$annotationLayer2 !== void 0 && _this$annotationLayer2.div) {
        div.insertBefore(canvasWrapper, this.annotationLayer.div);
      } else {
        div.appendChild(canvasWrapper);
      }

      var textLayer = null;

      if (this.textLayerMode !== _ui_utils.TextLayerMode.DISABLE && this.textLayerFactory) {
        var _this$annotationLayer3;

        var textLayerDiv = document.createElement("div");
        textLayerDiv.className = "textLayer";
        textLayerDiv.style.width = canvasWrapper.style.width;
        textLayerDiv.style.height = canvasWrapper.style.height;

        if ((_this$annotationLayer3 = this.annotationLayer) !== null && _this$annotationLayer3 !== void 0 && _this$annotationLayer3.div) {
          div.insertBefore(textLayerDiv, this.annotationLayer.div);
        } else {
          div.appendChild(textLayerDiv);
        }

        textLayer = this.textLayerFactory.createTextLayerBuilder(textLayerDiv, this.id - 1, this.viewport, this.textLayerMode === _ui_utils.TextLayerMode.ENABLE_ENHANCE, this.eventBus);
      }

      this.textLayer = textLayer;
      var renderContinueCallback = null;

      if (this.renderingQueue) {
        renderContinueCallback = function renderContinueCallback(cont) {
          if (!_this2.renderingQueue.isHighestPriority(_this2)) {
            _this2.renderingState = _pdf_rendering_queue.RenderingStates.PAUSED;

            _this2.resume = function () {
              _this2.renderingState = _pdf_rendering_queue.RenderingStates.RUNNING;
              cont();
            };

            return;
          }

          cont();
        };
      }

      var finishPaintTask = /*#__PURE__*/function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
          var error,
              _args3 = arguments;
          return _regenerator["default"].wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  error = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : null;

                  if (paintTask === _this2.paintTask) {
                    _this2.paintTask = null;
                  }

                  if (!(error instanceof _pdfjsLib.RenderingCancelledException)) {
                    _context3.next = 5;
                    break;
                  }

                  _this2._renderError = null;
                  return _context3.abrupt("return");

                case 5:
                  _this2._renderError = error;
                  _this2.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;

                  if (_this2.loadingIconDiv) {
                    div.removeChild(_this2.loadingIconDiv);
                    delete _this2.loadingIconDiv;
                  }

                  _this2._resetZoomLayer(true);

                  _this2.eventBus.dispatch("pagerendered", {
                    source: _this2,
                    pageNumber: _this2.id,
                    cssTransform: false,
                    timestamp: performance.now(),
                    error: _this2._renderError
                  });

                  if (!error) {
                    _context3.next = 12;
                    break;
                  }

                  throw error;

                case 12:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function finishPaintTask() {
          return _ref.apply(this, arguments);
        };
      }();

      var paintTask = this.renderer === _ui_utils.RendererType.SVG ? this.paintOnSvg(canvasWrapper) : this.paintOnCanvas(canvasWrapper);
      paintTask.onRenderContinue = renderContinueCallback;
      this.paintTask = paintTask;
      var resultPromise = paintTask.promise.then(function () {
        return finishPaintTask(null).then(function () {
          if (textLayer) {
            var readableStream = pdfPage.streamTextContent({
              normalizeWhitespace: true,
              includeMarkedContent: true
            });
            textLayer.setTextContentStream(readableStream);
            textLayer.render();
          }
        });
      }, function (reason) {
        return finishPaintTask(reason);
      });

      if (this.annotationLayerFactory) {
        if (!this.annotationLayer) {
          this.annotationLayer = this.annotationLayerFactory.createAnnotationLayerBuilder(div, pdfPage, null, this.imageResourcesPath, this.renderInteractiveForms, this.l10n, null, null, null);
        }

        this._renderAnnotationLayer();
      }

      if (this.xfaLayerFactory) {
        if (!this.xfaLayer) {
          this.xfaLayer = this.xfaLayerFactory.createXfaLayerBuilder(div, pdfPage, null);
        }

        this._renderXfaLayer();
      }

      if (this.structTreeLayerFactory && this.textLayer && this.canvas) {
        this._onTextLayerRendered = function (event) {
          if (event.pageNumber !== _this2.id) {
            return;
          }

          _this2.eventBus._off("textlayerrendered", _this2._onTextLayerRendered);

          _this2._onTextLayerRendered = null;

          if (!_this2.canvas) {
            return;
          }

          _this2.pdfPage.getStructTree().then(function (tree) {
            if (!tree) {
              return;
            }

            if (!_this2.canvas) {
              return;
            }

            var treeDom = _this2.structTreeLayer.render(tree);

            treeDom.classList.add("structTree");

            _this2.canvas.appendChild(treeDom);
          });
        };

        this.eventBus._on("textlayerrendered", this._onTextLayerRendered);

        this.structTreeLayer = this.structTreeLayerFactory.createStructTreeLayerBuilder(pdfPage);
      }

      div.setAttribute("data-loaded", true);
      this.eventBus.dispatch("pagerender", {
        source: this,
        pageNumber: this.id
      });
      return resultPromise;
    }
  }, {
    key: "paintOnCanvas",
    value: function paintOnCanvas(canvasWrapper) {
      var renderCapability = (0, _pdfjsLib.createPromiseCapability)();
      var result = {
        promise: renderCapability.promise,
        onRenderContinue: function onRenderContinue(cont) {
          cont();
        },
        cancel: function cancel() {
          renderTask.cancel();
        }
      };
      var viewport = this.viewport;
      var canvas = document.createElement("canvas");
      canvas.hidden = true;
      var isCanvasHidden = true;

      var showCanvas = function showCanvas() {
        if (isCanvasHidden) {
          canvas.hidden = false;
          isCanvasHidden = false;
        }
      };

      canvasWrapper.appendChild(canvas);
      this.canvas = canvas;
      canvas.mozOpaque = true;
      var ctx = canvas.getContext("2d", {
        alpha: false
      });
      var outputScale = (0, _ui_utils.getOutputScale)(ctx);
      this.outputScale = outputScale;

      if (this.useOnlyCssZoom) {
        var actualSizeViewport = viewport.clone({
          scale: _ui_utils.CSS_UNITS
        });
        outputScale.sx *= actualSizeViewport.width / viewport.width;
        outputScale.sy *= actualSizeViewport.height / viewport.height;
        outputScale.scaled = true;
      }

      if (this.maxCanvasPixels > 0) {
        var pixelsInViewport = viewport.width * viewport.height;
        var maxScale = Math.sqrt(this.maxCanvasPixels / pixelsInViewport);

        if (outputScale.sx > maxScale || outputScale.sy > maxScale) {
          outputScale.sx = maxScale;
          outputScale.sy = maxScale;
          outputScale.scaled = true;
          this.hasRestrictedScaling = true;
        } else {
          this.hasRestrictedScaling = false;
        }
      }

      var sfx = (0, _ui_utils.approximateFraction)(outputScale.sx);
      var sfy = (0, _ui_utils.approximateFraction)(outputScale.sy);
      canvas.width = (0, _ui_utils.roundToDivide)(viewport.width * outputScale.sx, sfx[0]);
      canvas.height = (0, _ui_utils.roundToDivide)(viewport.height * outputScale.sy, sfy[0]);
      canvas.style.width = (0, _ui_utils.roundToDivide)(viewport.width, sfx[1]) + "px";
      canvas.style.height = (0, _ui_utils.roundToDivide)(viewport.height, sfy[1]) + "px";
      this.paintedViewportMap.set(canvas, viewport);
      var transform = !outputScale.scaled ? null : [outputScale.sx, 0, 0, outputScale.sy, 0, 0];
      var renderContext = {
        canvasContext: ctx,
        transform: transform,
        viewport: this.viewport,
        renderInteractiveForms: this.renderInteractiveForms,
        optionalContentConfigPromise: this._optionalContentConfigPromise
      };
      var renderTask = this.pdfPage.render(renderContext);

      renderTask.onContinue = function (cont) {
        showCanvas();

        if (result.onRenderContinue) {
          result.onRenderContinue(cont);
        } else {
          cont();
        }
      };

      renderTask.promise.then(function () {
        showCanvas();
        renderCapability.resolve(undefined);
      }, function (error) {
        showCanvas();
        renderCapability.reject(error);
      });
      return result;
    }
  }, {
    key: "paintOnSvg",
    value: function paintOnSvg(wrapper) {
      var _this3 = this;

      var cancelled = false;

      var ensureNotCancelled = function ensureNotCancelled() {
        if (cancelled) {
          throw new _pdfjsLib.RenderingCancelledException("Rendering cancelled, page ".concat(_this3.id), "svg");
        }
      };

      var pdfPage = this.pdfPage;
      var actualSizeViewport = this.viewport.clone({
        scale: _ui_utils.CSS_UNITS
      });
      var promise = pdfPage.getOperatorList().then(function (opList) {
        ensureNotCancelled();
        var svgGfx = new _pdfjsLib.SVGGraphics(pdfPage.commonObjs, pdfPage.objs, _viewer_compatibility.viewerCompatibilityParams.disableCreateObjectURL);
        return svgGfx.getSVG(opList, actualSizeViewport).then(function (svg) {
          ensureNotCancelled();
          _this3.svg = svg;

          _this3.paintedViewportMap.set(svg, actualSizeViewport);

          svg.style.width = wrapper.style.width;
          svg.style.height = wrapper.style.height;
          _this3.renderingState = _pdf_rendering_queue.RenderingStates.FINISHED;
          wrapper.appendChild(svg);
        });
      });
      return {
        promise: promise,
        onRenderContinue: function onRenderContinue(cont) {
          cont();
        },
        cancel: function cancel() {
          cancelled = true;
        }
      };
    }
  }, {
    key: "setPageLabel",
    value: function setPageLabel(label) {
      this.pageLabel = typeof label === "string" ? label : null;

      if (this.pageLabel !== null) {
        this.div.setAttribute("data-page-label", this.pageLabel);
      } else {
        this.div.removeAttribute("data-page-label");
      }
    }
  }]);

  return PDFPageView;
}();

exports.PDFPageView = PDFPageView;

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RenderingStates = exports.PDFRenderingQueue = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var CLEANUP_TIMEOUT = 30000;
var RenderingStates = {
  INITIAL: 0,
  RUNNING: 1,
  PAUSED: 2,
  FINISHED: 3
};
exports.RenderingStates = RenderingStates;

var PDFRenderingQueue = /*#__PURE__*/function () {
  function PDFRenderingQueue() {
    _classCallCheck(this, PDFRenderingQueue);

    this.pdfViewer = null;
    this.pdfThumbnailViewer = null;
    this.onIdle = null;
    this.highestPriorityPage = null;
    this.idleTimeout = null;
    this.printing = false;
    this.isThumbnailViewEnabled = false;
  }

  _createClass(PDFRenderingQueue, [{
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setThumbnailViewer",
    value: function setThumbnailViewer(pdfThumbnailViewer) {
      this.pdfThumbnailViewer = pdfThumbnailViewer;
    }
  }, {
    key: "isHighestPriority",
    value: function isHighestPriority(view) {
      return this.highestPriorityPage === view.renderingId;
    }
  }, {
    key: "renderHighestPriority",
    value: function renderHighestPriority(currentlyVisiblePages) {
      if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
      }

      if (this.pdfViewer.forceRendering(currentlyVisiblePages)) {
        return;
      }

      if (this.pdfThumbnailViewer && this.isThumbnailViewEnabled) {
        if (this.pdfThumbnailViewer.forceRendering()) {
          return;
        }
      }

      if (this.printing) {
        return;
      }

      if (this.onIdle) {
        this.idleTimeout = setTimeout(this.onIdle.bind(this), CLEANUP_TIMEOUT);
      }
    }
  }, {
    key: "getHighestPriority",
    value: function getHighestPriority(visible, views, scrolledDown) {
      var visibleViews = visible.views;
      var numVisible = visibleViews.length;

      if (numVisible === 0) {
        return null;
      }

      for (var i = 0; i < numVisible; ++i) {
        var view = visibleViews[i].view;

        if (!this.isViewFinished(view)) {
          return view;
        }
      }

      if (scrolledDown) {
        var nextPageIndex = visible.last.id;

        if (views[nextPageIndex] && !this.isViewFinished(views[nextPageIndex])) {
          return views[nextPageIndex];
        }
      } else {
        var previousPageIndex = visible.first.id - 2;

        if (views[previousPageIndex] && !this.isViewFinished(views[previousPageIndex])) {
          return views[previousPageIndex];
        }
      }

      return null;
    }
  }, {
    key: "isViewFinished",
    value: function isViewFinished(view) {
      return view.renderingState === RenderingStates.FINISHED;
    }
  }, {
    key: "renderView",
    value: function renderView(view) {
      var _this = this;

      switch (view.renderingState) {
        case RenderingStates.FINISHED:
          return false;

        case RenderingStates.PAUSED:
          this.highestPriorityPage = view.renderingId;
          view.resume();
          break;

        case RenderingStates.RUNNING:
          this.highestPriorityPage = view.renderingId;
          break;

        case RenderingStates.INITIAL:
          this.highestPriorityPage = view.renderingId;
          view.draw()["finally"](function () {
            _this.renderHighestPriority();
          })["catch"](function (reason) {
            if (reason instanceof _pdfjsLib.RenderingCancelledException) {
              return;
            }

            console.error("renderView: \"".concat(reason, "\""));
          });
          break;
      }

      return true;
    }
  }]);

  return PDFRenderingQueue;
}();

exports.PDFRenderingQueue = PDFRenderingQueue;

/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFScriptingManager = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(4));

var _pdfjsLib = __w_pdfjs_require__(2);

var _ui_utils = __w_pdfjs_require__(7);

var _pdf_rendering_queue = __w_pdfjs_require__(17);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFScriptingManager = /*#__PURE__*/function () {
  function PDFScriptingManager(_ref) {
    var _this = this;

    var eventBus = _ref.eventBus,
        _ref$sandboxBundleSrc = _ref.sandboxBundleSrc,
        sandboxBundleSrc = _ref$sandboxBundleSrc === void 0 ? null : _ref$sandboxBundleSrc,
        _ref$scriptingFactory = _ref.scriptingFactory,
        scriptingFactory = _ref$scriptingFactory === void 0 ? null : _ref$scriptingFactory,
        _ref$docPropertiesLoo = _ref.docPropertiesLookup,
        docPropertiesLookup = _ref$docPropertiesLoo === void 0 ? null : _ref$docPropertiesLoo;

    _classCallCheck(this, PDFScriptingManager);

    this._pdfDocument = null;
    this._pdfViewer = null;
    this._closeCapability = null;
    this._destroyCapability = null;
    this._scripting = null;
    this._mouseState = Object.create(null);
    this._pageEventsReady = false;
    this._ready = false;
    this._eventBus = eventBus;
    this._sandboxBundleSrc = sandboxBundleSrc;
    this._scriptingFactory = scriptingFactory;
    this._docPropertiesLookup = docPropertiesLookup;

    if (!this._scriptingFactory) {
      window.addEventListener("updatefromsandbox", function (event) {
        _this._eventBus.dispatch("updatefromsandbox", {
          source: window,
          detail: event.detail
        });
      });
    }
  }

  _createClass(PDFScriptingManager, [{
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this._pdfViewer = pdfViewer;
    }
  }, {
    key: "setDocument",
    value: function () {
      var _setDocument = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(pdfDocument) {
        var _this2 = this,
            _this$_scripting;

        var _yield$Promise$all, _yield$Promise$all2, objects, calculationOrder, docActions, _iterator, _step, _step$value, name, listener, _iterator2, _step2, _step2$value, _name, _listener, docProperties;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this._pdfDocument) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this._destroyScripting();

              case 3:
                this._pdfDocument = pdfDocument;

                if (pdfDocument) {
                  _context2.next = 6;
                  break;
                }

                return _context2.abrupt("return");

              case 6:
                _context2.next = 8;
                return Promise.all([pdfDocument.getFieldObjects(), pdfDocument.getCalculationOrderIds(), pdfDocument.getJSActions()]);

              case 8:
                _yield$Promise$all = _context2.sent;
                _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
                objects = _yield$Promise$all2[0];
                calculationOrder = _yield$Promise$all2[1];
                docActions = _yield$Promise$all2[2];

                if (!(!objects && !docActions)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 16;
                return this._destroyScripting();

              case 16:
                return _context2.abrupt("return");

              case 17:
                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 19;
                  break;
                }

                return _context2.abrupt("return");

              case 19:
                this._scripting = this._createScripting();

                this._internalEvents.set("updatefromsandbox", function (event) {
                  if ((event === null || event === void 0 ? void 0 : event.source) !== window) {
                    return;
                  }

                  _this2._updateFromSandbox(event.detail);
                });

                this._internalEvents.set("dispatcheventinsandbox", function (event) {
                  var _this2$_scripting;

                  (_this2$_scripting = _this2._scripting) === null || _this2$_scripting === void 0 ? void 0 : _this2$_scripting.dispatchEventInSandbox(event.detail);
                });

                this._internalEvents.set("pagechanging", function (_ref2) {
                  var pageNumber = _ref2.pageNumber,
                      previous = _ref2.previous;

                  if (pageNumber === previous) {
                    return;
                  }

                  _this2._dispatchPageClose(previous);

                  _this2._dispatchPageOpen(pageNumber);
                });

                this._internalEvents.set("pagerendered", function (_ref3) {
                  var pageNumber = _ref3.pageNumber;

                  if (!_this2._pageOpenPending.has(pageNumber)) {
                    return;
                  }

                  if (pageNumber !== _this2._pdfViewer.currentPageNumber) {
                    return;
                  }

                  _this2._dispatchPageOpen(pageNumber);
                });

                this._internalEvents.set("pagesdestroy", /*#__PURE__*/function () {
                  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(event) {
                    var _this2$_scripting2, _this2$_closeCapabili;

                    return _regenerator["default"].wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this2._dispatchPageClose(_this2._pdfViewer.currentPageNumber);

                          case 2:
                            _context.next = 4;
                            return (_this2$_scripting2 = _this2._scripting) === null || _this2$_scripting2 === void 0 ? void 0 : _this2$_scripting2.dispatchEventInSandbox({
                              id: "doc",
                              name: "WillClose"
                            });

                          case 4:
                            (_this2$_closeCapabili = _this2._closeCapability) === null || _this2$_closeCapabili === void 0 ? void 0 : _this2$_closeCapabili.resolve();

                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref4.apply(this, arguments);
                  };
                }());

                this._domEvents.set("mousedown", function (event) {
                  _this2._mouseState.isDown = true;
                });

                this._domEvents.set("mouseup", function (event) {
                  _this2._mouseState.isDown = false;
                });

                _iterator = _createForOfIteratorHelper(this._internalEvents);

                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _step$value = _slicedToArray(_step.value, 2), name = _step$value[0], listener = _step$value[1];

                    this._eventBus._on(name, listener);
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }

                _iterator2 = _createForOfIteratorHelper(this._domEvents);

                try {
                  for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                    _step2$value = _slicedToArray(_step2.value, 2), _name = _step2$value[0], _listener = _step2$value[1];
                    window.addEventListener(_name, _listener);
                  }
                } catch (err) {
                  _iterator2.e(err);
                } finally {
                  _iterator2.f();
                }

                _context2.prev = 31;
                _context2.next = 34;
                return this._getDocProperties();

              case 34:
                docProperties = _context2.sent;

                if (!(pdfDocument !== this._pdfDocument)) {
                  _context2.next = 37;
                  break;
                }

                return _context2.abrupt("return");

              case 37:
                _context2.next = 39;
                return this._scripting.createSandbox({
                  objects: objects,
                  calculationOrder: calculationOrder,
                  appInfo: {
                    platform: navigator.platform,
                    language: navigator.language
                  },
                  docInfo: _objectSpread(_objectSpread({}, docProperties), {}, {
                    actions: docActions
                  })
                });

              case 39:
                this._eventBus.dispatch("sandboxcreated", {
                  source: this
                });

                _context2.next = 48;
                break;

              case 42:
                _context2.prev = 42;
                _context2.t0 = _context2["catch"](31);
                console.error("PDFScriptingManager.setDocument: \"".concat(_context2.t0 === null || _context2.t0 === void 0 ? void 0 : _context2.t0.message, "\"."));
                _context2.next = 47;
                return this._destroyScripting();

              case 47:
                return _context2.abrupt("return");

              case 48:
                _context2.next = 50;
                return (_this$_scripting = this._scripting) === null || _this$_scripting === void 0 ? void 0 : _this$_scripting.dispatchEventInSandbox({
                  id: "doc",
                  name: "Open"
                });

              case 50:
                _context2.next = 52;
                return this._dispatchPageOpen(this._pdfViewer.currentPageNumber, true);

              case 52:
                Promise.resolve().then(function () {
                  if (pdfDocument === _this2._pdfDocument) {
                    _this2._ready = true;
                  }
                });

              case 53:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[31, 42]]);
      }));

      function setDocument(_x) {
        return _setDocument.apply(this, arguments);
      }

      return setDocument;
    }()
  }, {
    key: "dispatchWillSave",
    value: function () {
      var _dispatchWillSave = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3(detail) {
        var _this$_scripting2;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", (_this$_scripting2 = this._scripting) === null || _this$_scripting2 === void 0 ? void 0 : _this$_scripting2.dispatchEventInSandbox({
                  id: "doc",
                  name: "WillSave"
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function dispatchWillSave(_x3) {
        return _dispatchWillSave.apply(this, arguments);
      }

      return dispatchWillSave;
    }()
  }, {
    key: "dispatchDidSave",
    value: function () {
      var _dispatchDidSave = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(detail) {
        var _this$_scripting3;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                return _context4.abrupt("return", (_this$_scripting3 = this._scripting) === null || _this$_scripting3 === void 0 ? void 0 : _this$_scripting3.dispatchEventInSandbox({
                  id: "doc",
                  name: "DidSave"
                }));

              case 1:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function dispatchDidSave(_x4) {
        return _dispatchDidSave.apply(this, arguments);
      }

      return dispatchDidSave;
    }()
  }, {
    key: "dispatchWillPrint",
    value: function () {
      var _dispatchWillPrint = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee5(detail) {
        var _this$_scripting4;

        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", (_this$_scripting4 = this._scripting) === null || _this$_scripting4 === void 0 ? void 0 : _this$_scripting4.dispatchEventInSandbox({
                  id: "doc",
                  name: "WillPrint"
                }));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function dispatchWillPrint(_x5) {
        return _dispatchWillPrint.apply(this, arguments);
      }

      return dispatchWillPrint;
    }()
  }, {
    key: "dispatchDidPrint",
    value: function () {
      var _dispatchDidPrint = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee6(detail) {
        var _this$_scripting5;

        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                return _context6.abrupt("return", (_this$_scripting5 = this._scripting) === null || _this$_scripting5 === void 0 ? void 0 : _this$_scripting5.dispatchEventInSandbox({
                  id: "doc",
                  name: "DidPrint"
                }));

              case 1:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function dispatchDidPrint(_x6) {
        return _dispatchDidPrint.apply(this, arguments);
      }

      return dispatchDidPrint;
    }()
  }, {
    key: "mouseState",
    get: function get() {
      return this._mouseState;
    }
  }, {
    key: "destroyPromise",
    get: function get() {
      var _this$_destroyCapabil;

      return ((_this$_destroyCapabil = this._destroyCapability) === null || _this$_destroyCapabil === void 0 ? void 0 : _this$_destroyCapabil.promise) || null;
    }
  }, {
    key: "ready",
    get: function get() {
      return this._ready;
    }
  }, {
    key: "_internalEvents",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_internalEvents", new Map());
    }
  }, {
    key: "_domEvents",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_domEvents", new Map());
    }
  }, {
    key: "_pageOpenPending",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_pageOpenPending", new Set());
    }
  }, {
    key: "_visitedPages",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_visitedPages", new Map());
    }
  }, {
    key: "_updateFromSandbox",
    value: function () {
      var _updateFromSandbox2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee7(detail) {
        var isInPresentationMode, id, siblings, command, value, ids, _iterator3, _step3, elementId, element, _this$_pdfDocument;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                isInPresentationMode = this._pdfViewer.isInPresentationMode || this._pdfViewer.isChangingPresentationMode;
                id = detail.id, siblings = detail.siblings, command = detail.command, value = detail.value;

                if (id) {
                  _context7.next = 25;
                  break;
                }

                _context7.t0 = command;
                _context7.next = _context7.t0 === "clear" ? 6 : _context7.t0 === "error" ? 8 : _context7.t0 === "layout" ? 10 : _context7.t0 === "page-num" ? 12 : _context7.t0 === "print" ? 14 : _context7.t0 === "println" ? 18 : _context7.t0 === "zoom" ? 20 : 24;
                break;

              case 6:
                console.clear();
                return _context7.abrupt("break", 24);

              case 8:
                console.error(value);
                return _context7.abrupt("break", 24);

              case 10:
                this._pdfViewer.spreadMode = (0, _ui_utils.apiPageLayoutToSpreadMode)(value);
                return _context7.abrupt("break", 24);

              case 12:
                this._pdfViewer.currentPageNumber = value + 1;
                return _context7.abrupt("break", 24);

              case 14:
                _context7.next = 16;
                return this._pdfViewer.pagesPromise;

              case 16:
                this._eventBus.dispatch("print", {
                  source: this
                });

                return _context7.abrupt("break", 24);

              case 18:
                console.log(value);
                return _context7.abrupt("break", 24);

              case 20:
                if (!isInPresentationMode) {
                  _context7.next = 22;
                  break;
                }

                return _context7.abrupt("return");

              case 22:
                this._pdfViewer.currentScaleValue = value;
                return _context7.abrupt("break", 24);

              case 24:
                return _context7.abrupt("return");

              case 25:
                if (!isInPresentationMode) {
                  _context7.next = 28;
                  break;
                }

                if (!detail.focus) {
                  _context7.next = 28;
                  break;
                }

                return _context7.abrupt("return");

              case 28:
                delete detail.id;
                delete detail.siblings;
                ids = siblings ? [id].concat(_toConsumableArray(siblings)) : [id];
                _iterator3 = _createForOfIteratorHelper(ids);

                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                    elementId = _step3.value;
                    element = document.getElementById(elementId);

                    if (element) {
                      element.dispatchEvent(new CustomEvent("updatefromsandbox", {
                        detail: detail
                      }));
                    } else {
                      (_this$_pdfDocument = this._pdfDocument) === null || _this$_pdfDocument === void 0 ? void 0 : _this$_pdfDocument.annotationStorage.setValue(elementId, detail);
                    }
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }

              case 33:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function _updateFromSandbox(_x7) {
        return _updateFromSandbox2.apply(this, arguments);
      }

      return _updateFromSandbox;
    }()
  }, {
    key: "_dispatchPageOpen",
    value: function () {
      var _dispatchPageOpen2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee9(pageNumber) {
        var _this3 = this;

        var initialize,
            pdfDocument,
            visitedPages,
            pageView,
            actionsPromise,
            _args9 = arguments;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                initialize = _args9.length > 1 && _args9[1] !== undefined ? _args9[1] : false;
                pdfDocument = this._pdfDocument, visitedPages = this._visitedPages;

                if (initialize) {
                  this._closeCapability = (0, _pdfjsLib.createPromiseCapability)();
                  this._pageEventsReady = true;
                }

                if (this._pageEventsReady) {
                  _context9.next = 5;
                  break;
                }

                return _context9.abrupt("return");

              case 5:
                pageView = this._pdfViewer.getPageView(pageNumber - 1);

                if (!((pageView === null || pageView === void 0 ? void 0 : pageView.renderingState) !== _pdf_rendering_queue.RenderingStates.FINISHED)) {
                  _context9.next = 9;
                  break;
                }

                this._pageOpenPending.add(pageNumber);

                return _context9.abrupt("return");

              case 9:
                this._pageOpenPending["delete"](pageNumber);

                actionsPromise = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
                  var _pageView$pdfPage, _this3$_scripting;

                  var actions;
                  return _regenerator["default"].wrap(function _callee8$(_context8) {
                    while (1) {
                      switch (_context8.prev = _context8.next) {
                        case 0:
                          _context8.next = 2;
                          return !visitedPages.has(pageNumber) ? (_pageView$pdfPage = pageView.pdfPage) === null || _pageView$pdfPage === void 0 ? void 0 : _pageView$pdfPage.getJSActions() : null;

                        case 2:
                          actions = _context8.sent;

                          if (!(pdfDocument !== _this3._pdfDocument)) {
                            _context8.next = 5;
                            break;
                          }

                          return _context8.abrupt("return");

                        case 5:
                          _context8.next = 7;
                          return (_this3$_scripting = _this3._scripting) === null || _this3$_scripting === void 0 ? void 0 : _this3$_scripting.dispatchEventInSandbox({
                            id: "page",
                            name: "PageOpen",
                            pageNumber: pageNumber,
                            actions: actions
                          });

                        case 7:
                        case "end":
                          return _context8.stop();
                      }
                    }
                  }, _callee8);
                }))();
                visitedPages.set(pageNumber, actionsPromise);

              case 12:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function _dispatchPageOpen(_x8) {
        return _dispatchPageOpen2.apply(this, arguments);
      }

      return _dispatchPageOpen;
    }()
  }, {
    key: "_dispatchPageClose",
    value: function () {
      var _dispatchPageClose2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee10(pageNumber) {
        var _this$_scripting6;

        var pdfDocument, visitedPages, actionsPromise;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                pdfDocument = this._pdfDocument, visitedPages = this._visitedPages;

                if (this._pageEventsReady) {
                  _context10.next = 3;
                  break;
                }

                return _context10.abrupt("return");

              case 3:
                if (!this._pageOpenPending.has(pageNumber)) {
                  _context10.next = 5;
                  break;
                }

                return _context10.abrupt("return");

              case 5:
                actionsPromise = visitedPages.get(pageNumber);

                if (actionsPromise) {
                  _context10.next = 8;
                  break;
                }

                return _context10.abrupt("return");

              case 8:
                visitedPages.set(pageNumber, null);
                _context10.next = 11;
                return actionsPromise;

              case 11:
                if (!(pdfDocument !== this._pdfDocument)) {
                  _context10.next = 13;
                  break;
                }

                return _context10.abrupt("return");

              case 13:
                _context10.next = 15;
                return (_this$_scripting6 = this._scripting) === null || _this$_scripting6 === void 0 ? void 0 : _this$_scripting6.dispatchEventInSandbox({
                  id: "page",
                  name: "PageClose",
                  pageNumber: pageNumber
                });

              case 15:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function _dispatchPageClose(_x9) {
        return _dispatchPageClose2.apply(this, arguments);
      }

      return _dispatchPageClose;
    }()
  }, {
    key: "_getDocProperties",
    value: function () {
      var _getDocProperties2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee11() {
        var _require, docPropertiesLookup;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                if (!this._docPropertiesLookup) {
                  _context11.next = 2;
                  break;
                }

                return _context11.abrupt("return", this._docPropertiesLookup(this._pdfDocument));

              case 2:
                _require = __w_pdfjs_require__(19), docPropertiesLookup = _require.docPropertiesLookup;
                return _context11.abrupt("return", docPropertiesLookup(this._pdfDocument));

              case 4:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function _getDocProperties() {
        return _getDocProperties2.apply(this, arguments);
      }

      return _getDocProperties;
    }()
  }, {
    key: "_createScripting",
    value: function _createScripting() {
      this._destroyCapability = (0, _pdfjsLib.createPromiseCapability)();

      if (this._scripting) {
        throw new Error("_createScripting: Scripting already exists.");
      }

      if (this._scriptingFactory) {
        return this._scriptingFactory.createScripting({
          sandboxBundleSrc: this._sandboxBundleSrc
        });
      }

      var _require2 = __w_pdfjs_require__(19),
          GenericScripting = _require2.GenericScripting;

      return new GenericScripting(this._sandboxBundleSrc);
    }
  }, {
    key: "_destroyScripting",
    value: function () {
      var _destroyScripting2 = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var _this$_destroyCapabil3;

        var _this$_destroyCapabil2, _iterator4, _step4, _step4$value, name, listener, _iterator5, _step5, _step5$value, _name2, _listener2;

        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (this._scripting) {
                  _context12.next = 4;
                  break;
                }

                this._pdfDocument = null;
                (_this$_destroyCapabil2 = this._destroyCapability) === null || _this$_destroyCapabil2 === void 0 ? void 0 : _this$_destroyCapabil2.resolve();
                return _context12.abrupt("return");

              case 4:
                if (!this._closeCapability) {
                  _context12.next = 8;
                  break;
                }

                _context12.next = 7;
                return Promise.race([this._closeCapability.promise, new Promise(function (resolve) {
                  setTimeout(resolve, 1000);
                })])["catch"](function (reason) {});

              case 7:
                this._closeCapability = null;

              case 8:
                this._pdfDocument = null;
                _context12.prev = 9;
                _context12.next = 12;
                return this._scripting.destroySandbox();

              case 12:
                _context12.next = 16;
                break;

              case 14:
                _context12.prev = 14;
                _context12.t0 = _context12["catch"](9);

              case 16:
                _iterator4 = _createForOfIteratorHelper(this._internalEvents);

                try {
                  for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                    _step4$value = _slicedToArray(_step4.value, 2), name = _step4$value[0], listener = _step4$value[1];

                    this._eventBus._off(name, listener);
                  }
                } catch (err) {
                  _iterator4.e(err);
                } finally {
                  _iterator4.f();
                }

                this._internalEvents.clear();

                _iterator5 = _createForOfIteratorHelper(this._domEvents);

                try {
                  for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
                    _step5$value = _slicedToArray(_step5.value, 2), _name2 = _step5$value[0], _listener2 = _step5$value[1];
                    window.removeEventListener(_name2, _listener2);
                  }
                } catch (err) {
                  _iterator5.e(err);
                } finally {
                  _iterator5.f();
                }

                this._domEvents.clear();

                this._pageOpenPending.clear();

                this._visitedPages.clear();

                this._scripting = null;
                delete this._mouseState.isDown;
                this._pageEventsReady = false;
                this._ready = false;
                (_this$_destroyCapabil3 = this._destroyCapability) === null || _this$_destroyCapabil3 === void 0 ? void 0 : _this$_destroyCapabil3.resolve();

              case 29:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this, [[9, 14]]);
      }));

      function _destroyScripting() {
        return _destroyScripting2.apply(this, arguments);
      }

      return _destroyScripting;
    }()
  }]);

  return PDFScriptingManager;
}();

exports.PDFScriptingManager = PDFScriptingManager;

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.docPropertiesLookup = docPropertiesLookup;
exports.GenericScripting = void 0;

var _regenerator = _interopRequireDefault(__w_pdfjs_require__(4));

var _pdfjsLib = __w_pdfjs_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function docPropertiesLookup(_x) {
  return _docPropertiesLookup.apply(this, arguments);
}

function _docPropertiesLookup() {
  _docPropertiesLookup = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee4(pdfDocument) {
    var url, baseUrl, _yield$pdfDocument$ge, info, metadata, contentDispositionFilename, contentLength, _yield$pdfDocument$ge2, length;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            url = "", baseUrl = url.split("#")[0];
            _context4.next = 3;
            return pdfDocument.getMetadata();

          case 3:
            _yield$pdfDocument$ge = _context4.sent;
            info = _yield$pdfDocument$ge.info;
            metadata = _yield$pdfDocument$ge.metadata;
            contentDispositionFilename = _yield$pdfDocument$ge.contentDispositionFilename;
            contentLength = _yield$pdfDocument$ge.contentLength;

            if (contentLength) {
              _context4.next = 14;
              break;
            }

            _context4.next = 11;
            return pdfDocument.getDownloadInfo();

          case 11:
            _yield$pdfDocument$ge2 = _context4.sent;
            length = _yield$pdfDocument$ge2.length;
            contentLength = length;

          case 14:
            return _context4.abrupt("return", _objectSpread(_objectSpread({}, info), {}, {
              baseURL: baseUrl,
              filesize: contentLength,
              filename: contentDispositionFilename || (0, _pdfjsLib.getPdfFilenameFromUrl)(url),
              metadata: metadata === null || metadata === void 0 ? void 0 : metadata.getRaw(),
              authors: metadata === null || metadata === void 0 ? void 0 : metadata.get("dc:creator"),
              numPages: pdfDocument.numPages,
              URL: url
            }));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _docPropertiesLookup.apply(this, arguments);
}

var GenericScripting = /*#__PURE__*/function () {
  function GenericScripting(sandboxBundleSrc) {
    _classCallCheck(this, GenericScripting);

    this._ready = (0, _pdfjsLib.loadScript)(sandboxBundleSrc, true).then(function () {
      return window.pdfjsSandbox.QuickJSSandbox();
    });
  }

  _createClass(GenericScripting, [{
    key: "createSandbox",
    value: function () {
      var _createSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee(data) {
        var sandbox;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._ready;

              case 2:
                sandbox = _context.sent;
                sandbox.create(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createSandbox(_x2) {
        return _createSandbox.apply(this, arguments);
      }

      return createSandbox;
    }()
  }, {
    key: "dispatchEventInSandbox",
    value: function () {
      var _dispatchEventInSandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee2(event) {
        var sandbox;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._ready;

              case 2:
                sandbox = _context2.sent;
                sandbox.dispatchEvent(event);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function dispatchEventInSandbox(_x3) {
        return _dispatchEventInSandbox.apply(this, arguments);
      }

      return dispatchEventInSandbox;
    }()
  }, {
    key: "destroySandbox",
    value: function () {
      var _destroySandbox = _asyncToGenerator( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var sandbox;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this._ready;

              case 2:
                sandbox = _context3.sent;
                sandbox.nukeSandbox();

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function destroySandbox() {
        return _destroySandbox.apply(this, arguments);
      }

      return destroySandbox;
    }()
  }]);

  return GenericScripting;
}();

exports.GenericScripting = GenericScripting;

/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFSinglePageViewer = void 0;

var _base_viewer = __w_pdfjs_require__(21);

var _pdfjsLib = __w_pdfjs_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFSinglePageViewer = /*#__PURE__*/function (_BaseViewer) {
  _inherits(PDFSinglePageViewer, _BaseViewer);

  var _super = _createSuper(PDFSinglePageViewer);

  function PDFSinglePageViewer(options) {
    var _this;

    _classCallCheck(this, PDFSinglePageViewer);

    _this = _super.call(this, options);

    _this.eventBus._on("pagesinit", function (evt) {
      _this._ensurePageViewVisible();
    });

    return _this;
  }

  _createClass(PDFSinglePageViewer, [{
    key: "_viewerElement",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_viewerElement", this._shadowViewer);
    }
  }, {
    key: "_pageWidthScaleFactor",
    get: function get() {
      return 1;
    }
  }, {
    key: "_resetView",
    value: function _resetView() {
      _get(_getPrototypeOf(PDFSinglePageViewer.prototype), "_resetView", this).call(this);

      this._previousPageNumber = 1;
      this._shadowViewer = document.createDocumentFragment();
      this._updateScrollDown = null;
    }
  }, {
    key: "_ensurePageViewVisible",
    value: function _ensurePageViewVisible() {
      var pageView = this._pages[this._currentPageNumber - 1];
      var previousPageView = this._pages[this._previousPageNumber - 1];
      var viewerNodes = this.viewer.childNodes;

      switch (viewerNodes.length) {
        case 0:
          this.viewer.appendChild(pageView.div);
          break;

        case 1:
          if (viewerNodes[0] !== previousPageView.div) {
            throw new Error("_ensurePageViewVisible: Unexpected previously visible page.");
          }

          if (pageView === previousPageView) {
            break;
          }

          this._shadowViewer.appendChild(previousPageView.div);

          this.viewer.appendChild(pageView.div);
          this.container.scrollTop = 0;
          break;

        default:
          throw new Error("_ensurePageViewVisible: Only one page should be visible at a time.");
      }

      this._previousPageNumber = this._currentPageNumber;
    }
  }, {
    key: "_scrollUpdate",
    value: function _scrollUpdate() {
      if (this._updateScrollDown) {
        this._updateScrollDown();
      }

      _get(_getPrototypeOf(PDFSinglePageViewer.prototype), "_scrollUpdate", this).call(this);
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref) {
      var _this2 = this;

      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === void 0 ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === void 0 ? null : _ref$pageNumber;

      if (pageNumber) {
        this._setCurrentPageNumber(pageNumber);
      }

      var scrolledDown = this._currentPageNumber >= this._previousPageNumber;

      this._ensurePageViewVisible();

      this.update();

      _get(_getPrototypeOf(PDFSinglePageViewer.prototype), "_scrollIntoView", this).call(this, {
        pageDiv: pageDiv,
        pageSpot: pageSpot,
        pageNumber: pageNumber
      });

      this._updateScrollDown = function () {
        _this2.scroll.down = scrolledDown;
        _this2._updateScrollDown = null;
      };
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      return this._getCurrentVisiblePage();
    }
  }, {
    key: "_updateHelper",
    value: function _updateHelper(visiblePages) {}
  }, {
    key: "_isScrollModeHorizontal",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_isScrollModeHorizontal", false);
    }
  }, {
    key: "_updateScrollMode",
    value: function _updateScrollMode() {}
  }, {
    key: "_updateSpreadMode",
    value: function _updateSpreadMode() {}
  }, {
    key: "_getPageAdvance",
    value: function _getPageAdvance() {
      return 1;
    }
  }]);

  return PDFSinglePageViewer;
}(_base_viewer.BaseViewer);

exports.PDFSinglePageViewer = PDFSinglePageViewer;

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseViewer = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

var _ui_utils = __w_pdfjs_require__(7);

var _pdf_rendering_queue = __w_pdfjs_require__(17);

var _annotation_layer_builder = __w_pdfjs_require__(1);

var _l10n_utils = __w_pdfjs_require__(3);

var _pdf_page_view = __w_pdfjs_require__(16);

var _pdf_link_service = __w_pdfjs_require__(6);

var _struct_tree_layer_builder = __w_pdfjs_require__(22);

var _text_layer_builder = __w_pdfjs_require__(8);

var _xfa_layer_builder = __w_pdfjs_require__(23);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DEFAULT_CACHE_SIZE = 10;

function PDFPageViewBuffer(size) {
  var data = [];

  this.push = function (view) {
    var i = data.indexOf(view);

    if (i >= 0) {
      data.splice(i, 1);
    }

    data.push(view);

    if (data.length > size) {
      data.shift().destroy();
    }
  };

  this.resize = function (newSize, pagesToKeep) {
    size = newSize;

    if (pagesToKeep) {
      var pageIdsToKeep = new Set();

      for (var i = 0, iMax = pagesToKeep.length; i < iMax; ++i) {
        pageIdsToKeep.add(pagesToKeep[i].id);
      }

      (0, _ui_utils.moveToEndOfArray)(data, function (page) {
        return pageIdsToKeep.has(page.id);
      });
    }

    while (data.length > size) {
      data.shift().destroy();
    }
  };

  this.has = function (view) {
    return data.includes(view);
  };
}

function isSameScale(oldScale, newScale) {
  if (newScale === oldScale) {
    return true;
  }

  if (Math.abs(newScale - oldScale) < 1e-15) {
    return true;
  }

  return false;
}

var BaseViewer = /*#__PURE__*/function () {
  function BaseViewer(options) {
    var _this$container,
        _this$viewer,
        _this = this;

    _classCallCheck(this, BaseViewer);

    if (this.constructor === BaseViewer) {
      throw new Error("Cannot initialize BaseViewer.");
    }

    var viewerVersion = '2.9.359';

    if (_pdfjsLib.version !== viewerVersion) {
      throw new Error("The API version \"".concat(_pdfjsLib.version, "\" does not match the Viewer version \"").concat(viewerVersion, "\"."));
    }

    this._name = this.constructor.name;
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;

    if (!(((_this$container = this.container) === null || _this$container === void 0 ? void 0 : _this$container.tagName.toUpperCase()) === "DIV" && ((_this$viewer = this.viewer) === null || _this$viewer === void 0 ? void 0 : _this$viewer.tagName.toUpperCase()) === "DIV")) {
      throw new Error("Invalid `container` and/or `viewer` option.");
    }

    if (this.container.offsetParent && getComputedStyle(this.container).position !== "absolute") {
      throw new Error("The `container` must be absolutely positioned.");
    }

    this.eventBus = options.eventBus;
    this.linkService = options.linkService || new _pdf_link_service.SimpleLinkService();
    this.downloadManager = options.downloadManager || null;
    this.findController = options.findController || null;
    this._scriptingManager = options.scriptingManager || null;
    this.removePageBorders = options.removePageBorders || false;
    this.textLayerMode = Number.isInteger(options.textLayerMode) ? options.textLayerMode : _ui_utils.TextLayerMode.ENABLE;
    this.imageResourcesPath = options.imageResourcesPath || "";
    this.renderInteractiveForms = options.renderInteractiveForms !== false;
    this.enablePrintAutoRotate = options.enablePrintAutoRotate || false;
    this.renderer = options.renderer || _ui_utils.RendererType.CANVAS;
    this.useOnlyCssZoom = options.useOnlyCssZoom || false;
    this.maxCanvasPixels = options.maxCanvasPixels;
    this.l10n = options.l10n || _l10n_utils.NullL10n;
    this.enableScripting = options.enableScripting === true && !!this._scriptingManager;
    this.defaultRenderingQueue = !options.renderingQueue;

    if (this.defaultRenderingQueue) {
      this.renderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      this.renderingQueue.setViewer(this);
    } else {
      this.renderingQueue = options.renderingQueue;
    }

    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdate.bind(this));
    this.presentationModeState = _ui_utils.PresentationModeState.UNKNOWN;
    this._onBeforeDraw = this._onAfterDraw = null;

    this._resetView();

    if (this.removePageBorders) {
      this.viewer.classList.add("removePageBorders");
    }

    Promise.resolve().then(function () {
      _this.eventBus.dispatch("baseviewerinit", {
        source: _this
      });
    });
  }

  _createClass(BaseViewer, [{
    key: "pagesCount",
    get: function get() {
      return this._pages.length;
    }
  }, {
    key: "getPageView",
    value: function getPageView(index) {
      return this._pages[index];
    }
  }, {
    key: "pageViewsReady",
    get: function get() {
      if (!this._pagesCapability.settled) {
        return false;
      }

      return this._pages.every(function (pageView) {
        return pageView === null || pageView === void 0 ? void 0 : pageView.pdfPage;
      });
    }
  }, {
    key: "currentPageNumber",
    get: function get() {
      return this._currentPageNumber;
    },
    set: function set(val) {
      if (!Number.isInteger(val)) {
        throw new Error("Invalid page number.");
      }

      if (!this.pdfDocument) {
        return;
      }

      if (!this._setCurrentPageNumber(val, true)) {
        console.error("".concat(this._name, ".currentPageNumber: \"").concat(val, "\" is not a valid page."));
      }
    }
  }, {
    key: "_setCurrentPageNumber",
    value: function _setCurrentPageNumber(val) {
      var _this$_pageLabels, _this$_pageLabels2;

      var resetCurrentPageView = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this._currentPageNumber === val) {
        if (resetCurrentPageView) {
          this._resetCurrentPageView();
        }

        return true;
      }

      if (!(0 < val && val <= this.pagesCount)) {
        return false;
      }

      var previous = this._currentPageNumber;
      this._currentPageNumber = val;
      this.eventBus.dispatch("pagechanging", {
        source: this,
        pageNumber: val,
        pageLabel: (_this$_pageLabels = (_this$_pageLabels2 = this._pageLabels) === null || _this$_pageLabels2 === void 0 ? void 0 : _this$_pageLabels2[val - 1]) !== null && _this$_pageLabels !== void 0 ? _this$_pageLabels : null,
        previous: previous
      });

      if (resetCurrentPageView) {
        this._resetCurrentPageView();
      }

      return true;
    }
  }, {
    key: "currentPageLabel",
    get: function get() {
      var _this$_pageLabels3, _this$_pageLabels4;

      return (_this$_pageLabels3 = (_this$_pageLabels4 = this._pageLabels) === null || _this$_pageLabels4 === void 0 ? void 0 : _this$_pageLabels4[this._currentPageNumber - 1]) !== null && _this$_pageLabels3 !== void 0 ? _this$_pageLabels3 : null;
    },
    set: function set(val) {
      if (!this.pdfDocument) {
        return;
      }

      var page = val | 0;

      if (this._pageLabels) {
        var i = this._pageLabels.indexOf(val);

        if (i >= 0) {
          page = i + 1;
        }
      }

      if (!this._setCurrentPageNumber(page, true)) {
        console.error("".concat(this._name, ".currentPageLabel: \"").concat(val, "\" is not a valid page."));
      }
    }
  }, {
    key: "currentScale",
    get: function get() {
      return this._currentScale !== _ui_utils.UNKNOWN_SCALE ? this._currentScale : _ui_utils.DEFAULT_SCALE;
    },
    set: function set(val) {
      if (isNaN(val)) {
        throw new Error("Invalid numeric scale.");
      }

      if (!this.pdfDocument) {
        return;
      }

      this._setScale(val, false);
    }
  }, {
    key: "currentScaleValue",
    get: function get() {
      return this._currentScaleValue;
    },
    set: function set(val) {
      if (!this.pdfDocument) {
        return;
      }

      this._setScale(val, false);
    }
  }, {
    key: "pagesRotation",
    get: function get() {
      return this._pagesRotation;
    },
    set: function set(rotation) {
      if (!(0, _ui_utils.isValidRotation)(rotation)) {
        throw new Error("Invalid pages rotation angle.");
      }

      if (!this.pdfDocument) {
        return;
      }

      rotation %= 360;

      if (rotation < 0) {
        rotation += 360;
      }

      if (this._pagesRotation === rotation) {
        return;
      }

      this._pagesRotation = rotation;
      var pageNumber = this._currentPageNumber;

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        var pageView = this._pages[i];
        pageView.update(pageView.scale, rotation);
      }

      if (this._currentScaleValue) {
        this._setScale(this._currentScaleValue, true);
      }

      this.eventBus.dispatch("rotationchanging", {
        source: this,
        pagesRotation: rotation,
        pageNumber: pageNumber
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }
  }, {
    key: "firstPagePromise",
    get: function get() {
      return this.pdfDocument ? this._firstPageCapability.promise : null;
    }
  }, {
    key: "onePageRendered",
    get: function get() {
      return this.pdfDocument ? this._onePageRenderedCapability.promise : null;
    }
  }, {
    key: "pagesPromise",
    get: function get() {
      return this.pdfDocument ? this._pagesCapability.promise : null;
    }
  }, {
    key: "_viewerElement",
    get: function get() {
      throw new Error("Not implemented: _viewerElement");
    }
  }, {
    key: "_onePageRenderedOrForceFetch",
    value: function _onePageRenderedOrForceFetch() {
      if (!this.container.offsetParent || this._getVisiblePages().views.length === 0) {
        return Promise.resolve();
      }

      return this._onePageRenderedCapability.promise;
    }
  }, {
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      var _this2 = this;

      if (this.pdfDocument) {
        this.eventBus.dispatch("pagesdestroy", {
          source: this
        });

        this._cancelRendering();

        this._resetView();

        if (this.findController) {
          this.findController.setDocument(null);
        }

        if (this._scriptingManager) {
          this._scriptingManager.setDocument(null);
        }
      }

      this.pdfDocument = pdfDocument;

      if (!pdfDocument) {
        return;
      }

      var isPureXfa = pdfDocument.isPureXfa;
      var pagesCount = pdfDocument.numPages;
      var firstPagePromise = pdfDocument.getPage(1);
      var optionalContentConfigPromise = pdfDocument.getOptionalContentConfig();

      this._pagesCapability.promise.then(function () {
        _this2.eventBus.dispatch("pagesloaded", {
          source: _this2,
          pagesCount: pagesCount
        });
      });

      this._onBeforeDraw = function (evt) {
        var pageView = _this2._pages[evt.pageNumber - 1];

        if (!pageView) {
          return;
        }

        _this2._buffer.push(pageView);
      };

      this.eventBus._on("pagerender", this._onBeforeDraw);

      this._onAfterDraw = function (evt) {
        if (evt.cssTransform || _this2._onePageRenderedCapability.settled) {
          return;
        }

        _this2._onePageRenderedCapability.resolve();

        _this2.eventBus._off("pagerendered", _this2._onAfterDraw);

        _this2._onAfterDraw = null;
      };

      this.eventBus._on("pagerendered", this._onAfterDraw);

      firstPagePromise.then(function (firstPdfPage) {
        _this2._firstPageCapability.resolve(firstPdfPage);

        _this2._optionalContentConfigPromise = optionalContentConfigPromise;
        var scale = _this2.currentScale;
        var viewport = firstPdfPage.getViewport({
          scale: scale * _ui_utils.CSS_UNITS
        });
        var textLayerFactory = _this2.textLayerMode !== _ui_utils.TextLayerMode.DISABLE ? _this2 : null;
        var xfaLayerFactory = isPureXfa ? _this2 : null;

        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var pageView = new _pdf_page_view.PDFPageView({
            container: _this2._viewerElement,
            eventBus: _this2.eventBus,
            id: pageNum,
            scale: scale,
            defaultViewport: viewport.clone(),
            optionalContentConfigPromise: optionalContentConfigPromise,
            renderingQueue: _this2.renderingQueue,
            textLayerFactory: textLayerFactory,
            textLayerMode: _this2.textLayerMode,
            annotationLayerFactory: _this2,
            xfaLayerFactory: xfaLayerFactory,
            structTreeLayerFactory: _this2,
            imageResourcesPath: _this2.imageResourcesPath,
            renderInteractiveForms: _this2.renderInteractiveForms,
            renderer: _this2.renderer,
            useOnlyCssZoom: _this2.useOnlyCssZoom,
            maxCanvasPixels: _this2.maxCanvasPixels,
            l10n: _this2.l10n
          });

          _this2._pages.push(pageView);
        }

        var firstPageView = _this2._pages[0];

        if (firstPageView) {
          firstPageView.setPdfPage(firstPdfPage);

          _this2.linkService.cachePageRef(1, firstPdfPage.ref);
        }

        if (_this2._spreadMode !== _ui_utils.SpreadMode.NONE) {
          _this2._updateSpreadMode();
        }

        _this2._onePageRenderedOrForceFetch().then(function () {
          if (_this2.findController) {
            _this2.findController.setDocument(pdfDocument);
          }

          if (_this2.enableScripting) {
            _this2._scriptingManager.setDocument(pdfDocument);
          }

          if (pdfDocument.loadingParams.disableAutoFetch || pagesCount > 7500) {
            _this2._pagesCapability.resolve();

            return;
          }

          var getPagesLeft = pagesCount - 1;

          if (getPagesLeft <= 0) {
            _this2._pagesCapability.resolve();

            return;
          }

          var _loop = function _loop(_pageNum) {
            pdfDocument.getPage(_pageNum).then(function (pdfPage) {
              var pageView = _this2._pages[_pageNum - 1];

              if (!pageView.pdfPage) {
                pageView.setPdfPage(pdfPage);
              }

              _this2.linkService.cachePageRef(_pageNum, pdfPage.ref);

              if (--getPagesLeft === 0) {
                _this2._pagesCapability.resolve();
              }
            }, function (reason) {
              console.error("Unable to get page ".concat(_pageNum, " to initialize viewer"), reason);

              if (--getPagesLeft === 0) {
                _this2._pagesCapability.resolve();
              }
            });
          };

          for (var _pageNum = 2; _pageNum <= pagesCount; ++_pageNum) {
            _loop(_pageNum);
          }
        });

        _this2.eventBus.dispatch("pagesinit", {
          source: _this2
        });

        if (_this2.defaultRenderingQueue) {
          _this2.update();
        }
      })["catch"](function (reason) {
        console.error("Unable to initialize viewer", reason);
      });
    }
  }, {
    key: "setPageLabels",
    value: function setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }

      if (!labels) {
        this._pageLabels = null;
      } else if (!(Array.isArray(labels) && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error("".concat(this._name, ".setPageLabels: Invalid page labels."));
      } else {
        this._pageLabels = labels;
      }

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        var _this$_pageLabels$i, _this$_pageLabels5;

        this._pages[i].setPageLabel((_this$_pageLabels$i = (_this$_pageLabels5 = this._pageLabels) === null || _this$_pageLabels5 === void 0 ? void 0 : _this$_pageLabels5[i]) !== null && _this$_pageLabels$i !== void 0 ? _this$_pageLabels$i : null);
      }
    }
  }, {
    key: "_resetView",
    value: function _resetView() {
      this._pages = [];
      this._currentPageNumber = 1;
      this._currentScale = _ui_utils.UNKNOWN_SCALE;
      this._currentScaleValue = null;
      this._pageLabels = null;
      this._buffer = new PDFPageViewBuffer(DEFAULT_CACHE_SIZE);
      this._location = null;
      this._pagesRotation = 0;
      this._optionalContentConfigPromise = null;
      this._pagesRequests = new WeakMap();
      this._firstPageCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._onePageRenderedCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._pagesCapability = (0, _pdfjsLib.createPromiseCapability)();
      this._scrollMode = _ui_utils.ScrollMode.VERTICAL;
      this._spreadMode = _ui_utils.SpreadMode.NONE;

      if (this._onBeforeDraw) {
        this.eventBus._off("pagerender", this._onBeforeDraw);

        this._onBeforeDraw = null;
      }

      if (this._onAfterDraw) {
        this.eventBus._off("pagerendered", this._onAfterDraw);

        this._onAfterDraw = null;
      }

      this.viewer.textContent = "";

      this._updateScrollMode();
    }
  }, {
    key: "_scrollUpdate",
    value: function _scrollUpdate() {
      if (this.pagesCount === 0) {
        return;
      }

      this.update();
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref) {
      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === void 0 ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === void 0 ? null : _ref$pageNumber;
      (0, _ui_utils.scrollIntoView)(pageDiv, pageSpot);
    }
  }, {
    key: "_setScaleUpdatePages",
    value: function _setScaleUpdatePages(newScale, newValue) {
      var noScroll = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var preset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      this._currentScaleValue = newValue.toString();

      if (isSameScale(this._currentScale, newScale)) {
        if (preset) {
          this.eventBus.dispatch("scalechanging", {
            source: this,
            scale: newScale,
            presetValue: newValue
          });
        }

        return;
      }

      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        this._pages[i].update(newScale);
      }

      this._currentScale = newScale;

      if (!noScroll) {
        var page = this._currentPageNumber,
            dest;

        if (this._location && !(this.isInPresentationMode || this.isChangingPresentationMode)) {
          page = this._location.pageNumber;
          dest = [null, {
            name: "XYZ"
          }, this._location.left, this._location.top, null];
        }

        this.scrollPageIntoView({
          pageNumber: page,
          destArray: dest,
          allowNegativeOffset: true
        });
      }

      this.eventBus.dispatch("scalechanging", {
        source: this,
        scale: newScale,
        presetValue: preset ? newValue : undefined
      });

      if (this.defaultRenderingQueue) {
        this.update();
      }
    }
  }, {
    key: "_pageWidthScaleFactor",
    get: function get() {
      if (this._spreadMode !== _ui_utils.SpreadMode.NONE && this._scrollMode !== _ui_utils.ScrollMode.HORIZONTAL && !this.isInPresentationMode) {
        return 2;
      }

      return 1;
    }
  }, {
    key: "_setScale",
    value: function _setScale(value) {
      var noScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var scale = parseFloat(value);

      if (scale > 0) {
        this._setScaleUpdatePages(scale, value, noScroll, false);
      } else {
        var currentPage = this._pages[this._currentPageNumber - 1];

        if (!currentPage) {
          return;
        }

        var noPadding = this.isInPresentationMode || this.removePageBorders;
        var hPadding = noPadding ? 0 : _ui_utils.SCROLLBAR_PADDING;
        var vPadding = noPadding ? 0 : _ui_utils.VERTICAL_PADDING;

        if (!noPadding && this._isScrollModeHorizontal) {
          var _ref2 = [vPadding, hPadding];
          hPadding = _ref2[0];
          vPadding = _ref2[1];
        }

        var pageWidthScale = (this.container.clientWidth - hPadding) / currentPage.width * currentPage.scale / this._pageWidthScaleFactor;
        var pageHeightScale = (this.container.clientHeight - vPadding) / currentPage.height * currentPage.scale;

        switch (value) {
          case "page-actual":
            scale = 1;
            break;

          case "page-width":
            scale = pageWidthScale;
            break;

          case "page-height":
            scale = pageHeightScale;
            break;

          case "page-fit":
            scale = Math.min(pageWidthScale, pageHeightScale);
            break;

          case "auto":
            var horizontalScale = (0, _ui_utils.isPortraitOrientation)(currentPage) ? pageWidthScale : Math.min(pageHeightScale, pageWidthScale);
            scale = Math.min(_ui_utils.MAX_AUTO_SCALE, horizontalScale);
            break;

          default:
            console.error("".concat(this._name, "._setScale: \"").concat(value, "\" is an unknown zoom value."));
            return;
        }

        this._setScaleUpdatePages(scale, value, noScroll, true);
      }
    }
  }, {
    key: "_resetCurrentPageView",
    value: function _resetCurrentPageView() {
      if (this.isInPresentationMode) {
        this._setScale(this._currentScaleValue, true);
      }

      var pageView = this._pages[this._currentPageNumber - 1];

      this._scrollIntoView({
        pageDiv: pageView.div
      });
    }
  }, {
    key: "pageLabelToPageNumber",
    value: function pageLabelToPageNumber(label) {
      if (!this._pageLabels) {
        return null;
      }

      var i = this._pageLabels.indexOf(label);

      if (i < 0) {
        return null;
      }

      return i + 1;
    }
  }, {
    key: "scrollPageIntoView",
    value: function scrollPageIntoView(_ref3) {
      var pageNumber = _ref3.pageNumber,
          _ref3$destArray = _ref3.destArray,
          destArray = _ref3$destArray === void 0 ? null : _ref3$destArray,
          _ref3$allowNegativeOf = _ref3.allowNegativeOffset,
          allowNegativeOffset = _ref3$allowNegativeOf === void 0 ? false : _ref3$allowNegativeOf,
          _ref3$ignoreDestinati = _ref3.ignoreDestinationZoom,
          ignoreDestinationZoom = _ref3$ignoreDestinati === void 0 ? false : _ref3$ignoreDestinati;

      if (!this.pdfDocument) {
        return;
      }

      var pageView = Number.isInteger(pageNumber) && this._pages[pageNumber - 1];

      if (!pageView) {
        console.error("".concat(this._name, ".scrollPageIntoView: ") + "\"".concat(pageNumber, "\" is not a valid pageNumber parameter."));
        return;
      }

      if (this.isInPresentationMode || !destArray) {
        this._setCurrentPageNumber(pageNumber, true);

        return;
      }

      var x = 0,
          y = 0;
      var width = 0,
          height = 0,
          widthScale,
          heightScale;
      var changeOrientation = pageView.rotation % 180 !== 0;
      var pageWidth = (changeOrientation ? pageView.height : pageView.width) / pageView.scale / _ui_utils.CSS_UNITS;
      var pageHeight = (changeOrientation ? pageView.width : pageView.height) / pageView.scale / _ui_utils.CSS_UNITS;
      var scale = 0;

      switch (destArray[1].name) {
        case "XYZ":
          x = destArray[2];
          y = destArray[3];
          scale = destArray[4];
          x = x !== null ? x : 0;
          y = y !== null ? y : pageHeight;
          break;

        case "Fit":
        case "FitB":
          scale = "page-fit";
          break;

        case "FitH":
        case "FitBH":
          y = destArray[2];
          scale = "page-width";

          if (y === null && this._location) {
            x = this._location.left;
            y = this._location.top;
          } else if (typeof y !== "number") {
            y = pageHeight;
          }

          break;

        case "FitV":
        case "FitBV":
          x = destArray[2];
          width = pageWidth;
          height = pageHeight;
          scale = "page-height";
          break;

        case "FitR":
          x = destArray[2];
          y = destArray[3];
          width = destArray[4] - x;
          height = destArray[5] - y;
          var hPadding = this.removePageBorders ? 0 : _ui_utils.SCROLLBAR_PADDING;
          var vPadding = this.removePageBorders ? 0 : _ui_utils.VERTICAL_PADDING;
          widthScale = (this.container.clientWidth - hPadding) / width / _ui_utils.CSS_UNITS;
          heightScale = (this.container.clientHeight - vPadding) / height / _ui_utils.CSS_UNITS;
          scale = Math.min(Math.abs(widthScale), Math.abs(heightScale));
          break;

        default:
          console.error("".concat(this._name, ".scrollPageIntoView: ") + "\"".concat(destArray[1].name, "\" is not a valid destination type."));
          return;
      }

      if (!ignoreDestinationZoom) {
        if (scale && scale !== this._currentScale) {
          this.currentScaleValue = scale;
        } else if (this._currentScale === _ui_utils.UNKNOWN_SCALE) {
          this.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
        }
      }

      if (scale === "page-fit" && !destArray[4]) {
        this._scrollIntoView({
          pageDiv: pageView.div,
          pageNumber: pageNumber
        });

        return;
      }

      var boundingRect = [pageView.viewport.convertToViewportPoint(x, y), pageView.viewport.convertToViewportPoint(x + width, y + height)];
      var left = Math.min(boundingRect[0][0], boundingRect[1][0]);
      var top = Math.min(boundingRect[0][1], boundingRect[1][1]);

      if (!allowNegativeOffset) {
        left = Math.max(left, 0);
        top = Math.max(top, 0);
      }

      this._scrollIntoView({
        pageDiv: pageView.div,
        pageSpot: {
          left: left,
          top: top
        },
        pageNumber: pageNumber
      });
    }
  }, {
    key: "_updateLocation",
    value: function _updateLocation(firstPage) {
      var currentScale = this._currentScale;
      var currentScaleValue = this._currentScaleValue;
      var normalizedScaleValue = parseFloat(currentScaleValue) === currentScale ? Math.round(currentScale * 10000) / 100 : currentScaleValue;
      var pageNumber = firstPage.id;
      var pdfOpenParams = "#page=" + pageNumber;
      pdfOpenParams += "&zoom=" + normalizedScaleValue;
      var currentPageView = this._pages[pageNumber - 1];
      var container = this.container;
      var topLeft = currentPageView.getPagePoint(container.scrollLeft - firstPage.x, container.scrollTop - firstPage.y);
      var intLeft = Math.round(topLeft[0]);
      var intTop = Math.round(topLeft[1]);
      pdfOpenParams += "," + intLeft + "," + intTop;
      this._location = {
        pageNumber: pageNumber,
        scale: normalizedScaleValue,
        top: intTop,
        left: intLeft,
        rotation: this._pagesRotation,
        pdfOpenParams: pdfOpenParams
      };
    }
  }, {
    key: "_updateHelper",
    value: function _updateHelper(visiblePages) {
      throw new Error("Not implemented: _updateHelper");
    }
  }, {
    key: "update",
    value: function update() {
      var visible = this._getVisiblePages();

      var visiblePages = visible.views,
          numVisiblePages = visiblePages.length;

      if (numVisiblePages === 0) {
        return;
      }

      var newCacheSize = Math.max(DEFAULT_CACHE_SIZE, 2 * numVisiblePages + 1);

      this._buffer.resize(newCacheSize, visiblePages);

      this.renderingQueue.renderHighestPriority(visible);

      this._updateHelper(visiblePages);

      this._updateLocation(visible.first);

      this.eventBus.dispatch("updateviewarea", {
        source: this,
        location: this._location
      });
    }
  }, {
    key: "containsElement",
    value: function containsElement(element) {
      return this.container.contains(element);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.container.focus();
    }
  }, {
    key: "_isScrollModeHorizontal",
    get: function get() {
      return this.isInPresentationMode ? false : this._scrollMode === _ui_utils.ScrollMode.HORIZONTAL;
    }
  }, {
    key: "_isContainerRtl",
    get: function get() {
      return getComputedStyle(this.container).direction === "rtl";
    }
  }, {
    key: "isInPresentationMode",
    get: function get() {
      return this.presentationModeState === _ui_utils.PresentationModeState.FULLSCREEN;
    }
  }, {
    key: "isChangingPresentationMode",
    get: function get() {
      return this.presentationModeState === _ui_utils.PresentationModeState.CHANGING;
    }
  }, {
    key: "isHorizontalScrollbarEnabled",
    get: function get() {
      return this.isInPresentationMode ? false : this.container.scrollWidth > this.container.clientWidth;
    }
  }, {
    key: "isVerticalScrollbarEnabled",
    get: function get() {
      return this.isInPresentationMode ? false : this.container.scrollHeight > this.container.clientHeight;
    }
  }, {
    key: "_getCurrentVisiblePage",
    value: function _getCurrentVisiblePage() {
      if (!this.pagesCount) {
        return {
          views: []
        };
      }

      var pageView = this._pages[this._currentPageNumber - 1];
      var element = pageView.div;
      var view = {
        id: pageView.id,
        x: element.offsetLeft + element.clientLeft,
        y: element.offsetTop + element.clientTop,
        view: pageView
      };
      return {
        first: view,
        last: view,
        views: [view]
      };
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      return (0, _ui_utils.getVisibleElements)({
        scrollEl: this.container,
        views: this._pages,
        sortByVisibility: true,
        horizontal: this._isScrollModeHorizontal,
        rtl: this._isScrollModeHorizontal && this._isContainerRtl
      });
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible(pageNumber) {
      if (!this.pdfDocument) {
        return false;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("".concat(this._name, ".isPageVisible: \"").concat(pageNumber, "\" is not a valid page."));
        return false;
      }

      return this._getVisiblePages().views.some(function (view) {
        return view.id === pageNumber;
      });
    }
  }, {
    key: "isPageCached",
    value: function isPageCached(pageNumber) {
      if (!this.pdfDocument || !this._buffer) {
        return false;
      }

      if (!(Number.isInteger(pageNumber) && pageNumber > 0 && pageNumber <= this.pagesCount)) {
        console.error("".concat(this._name, ".isPageCached: \"").concat(pageNumber, "\" is not a valid page."));
        return false;
      }

      var pageView = this._pages[pageNumber - 1];

      if (!pageView) {
        return false;
      }

      return this._buffer.has(pageView);
    }
  }, {
    key: "cleanup",
    value: function cleanup() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i] && this._pages[i].renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED) {
          this._pages[i].reset();
        }
      }
    }
  }, {
    key: "_cancelRendering",
    value: function _cancelRendering() {
      for (var i = 0, ii = this._pages.length; i < ii; i++) {
        if (this._pages[i]) {
          this._pages[i].cancelRendering();
        }
      }
    }
  }, {
    key: "_ensurePdfPageLoaded",
    value: function _ensurePdfPageLoaded(pageView) {
      var _this3 = this;

      if (pageView.pdfPage) {
        return Promise.resolve(pageView.pdfPage);
      }

      if (this._pagesRequests.has(pageView)) {
        return this._pagesRequests.get(pageView);
      }

      var promise = this.pdfDocument.getPage(pageView.id).then(function (pdfPage) {
        if (!pageView.pdfPage) {
          pageView.setPdfPage(pdfPage);
        }

        _this3._pagesRequests["delete"](pageView);

        return pdfPage;
      })["catch"](function (reason) {
        console.error("Unable to get page for page view", reason);

        _this3._pagesRequests["delete"](pageView);
      });

      this._pagesRequests.set(pageView, promise);

      return promise;
    }
  }, {
    key: "forceRendering",
    value: function forceRendering(currentlyVisiblePages) {
      var _this4 = this;

      var visiblePages = currentlyVisiblePages || this._getVisiblePages();

      var scrollAhead = this._isScrollModeHorizontal ? this.scroll.right : this.scroll.down;
      var pageView = this.renderingQueue.getHighestPriority(visiblePages, this._pages, scrollAhead);

      if (pageView) {
        this._ensurePdfPageLoaded(pageView).then(function () {
          _this4.renderingQueue.renderView(pageView);
        });

        return true;
      }

      return false;
    }
  }, {
    key: "createTextLayerBuilder",
    value: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
      var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var eventBus = arguments.length > 4 ? arguments[4] : undefined;
      return new _text_layer_builder.TextLayerBuilder({
        textLayerDiv: textLayerDiv,
        eventBus: eventBus,
        pageIndex: pageIndex,
        viewport: viewport,
        findController: this.isInPresentationMode ? null : this.findController,
        enhanceTextSelection: this.isInPresentationMode ? false : enhanceTextSelection
      });
    }
  }, {
    key: "createAnnotationLayerBuilder",
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var _this$pdfDocument, _this$pdfDocument2, _this$_scriptingManag;

      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var imageResourcesPath = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var renderInteractiveForms = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
      var l10n = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _l10n_utils.NullL10n;
      var enableScripting = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : null;
      var hasJSActionsPromise = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
      var mouseState = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : null;
      return new _annotation_layer_builder.AnnotationLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage || ((_this$pdfDocument = this.pdfDocument) === null || _this$pdfDocument === void 0 ? void 0 : _this$pdfDocument.annotationStorage),
        imageResourcesPath: imageResourcesPath,
        renderInteractiveForms: renderInteractiveForms,
        linkService: this.linkService,
        downloadManager: this.downloadManager,
        l10n: l10n,
        enableScripting: enableScripting !== null && enableScripting !== void 0 ? enableScripting : this.enableScripting,
        hasJSActionsPromise: hasJSActionsPromise || ((_this$pdfDocument2 = this.pdfDocument) === null || _this$pdfDocument2 === void 0 ? void 0 : _this$pdfDocument2.hasJSActions()),
        mouseState: mouseState || ((_this$_scriptingManag = this._scriptingManager) === null || _this$_scriptingManag === void 0 ? void 0 : _this$_scriptingManag.mouseState)
      });
    }
  }, {
    key: "createXfaLayerBuilder",
    value: function createXfaLayerBuilder(pageDiv, pdfPage) {
      var _this$pdfDocument3;

      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new _xfa_layer_builder.XfaLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage || ((_this$pdfDocument3 = this.pdfDocument) === null || _this$pdfDocument3 === void 0 ? void 0 : _this$pdfDocument3.annotationStorage)
      });
    }
  }, {
    key: "createStructTreeLayerBuilder",
    value: function createStructTreeLayerBuilder(pdfPage) {
      return new _struct_tree_layer_builder.StructTreeLayerBuilder({
        pdfPage: pdfPage
      });
    }
  }, {
    key: "hasEqualPageSizes",
    get: function get() {
      var firstPageView = this._pages[0];

      for (var i = 1, ii = this._pages.length; i < ii; ++i) {
        var pageView = this._pages[i];

        if (pageView.width !== firstPageView.width || pageView.height !== firstPageView.height) {
          return false;
        }
      }

      return true;
    }
  }, {
    key: "getPagesOverview",
    value: function getPagesOverview() {
      var _this5 = this;

      return this._pages.map(function (pageView) {
        var viewport = pageView.pdfPage.getViewport({
          scale: 1
        });

        if (!_this5.enablePrintAutoRotate || (0, _ui_utils.isPortraitOrientation)(viewport)) {
          return {
            width: viewport.width,
            height: viewport.height,
            rotation: viewport.rotation
          };
        }

        return {
          width: viewport.height,
          height: viewport.width,
          rotation: (viewport.rotation - 90) % 360
        };
      });
    }
  }, {
    key: "optionalContentConfigPromise",
    get: function get() {
      if (!this.pdfDocument) {
        return Promise.resolve(null);
      }

      if (!this._optionalContentConfigPromise) {
        return this.pdfDocument.getOptionalContentConfig();
      }

      return this._optionalContentConfigPromise;
    },
    set: function set(promise) {
      if (!(promise instanceof Promise)) {
        throw new Error("Invalid optionalContentConfigPromise: ".concat(promise));
      }

      if (!this.pdfDocument) {
        return;
      }

      if (!this._optionalContentConfigPromise) {
        return;
      }

      this._optionalContentConfigPromise = promise;

      var _iterator = _createForOfIteratorHelper(this._pages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pageView = _step.value;
          pageView.update(pageView.scale, pageView.rotation, promise);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      this.update();
      this.eventBus.dispatch("optionalcontentconfigchanged", {
        source: this,
        promise: promise
      });
    }
  }, {
    key: "scrollMode",
    get: function get() {
      return this._scrollMode;
    },
    set: function set(mode) {
      if (this._scrollMode === mode) {
        return;
      }

      if (!(0, _ui_utils.isValidScrollMode)(mode)) {
        throw new Error("Invalid scroll mode: ".concat(mode));
      }

      this._scrollMode = mode;
      this.eventBus.dispatch("scrollmodechanged", {
        source: this,
        mode: mode
      });

      this._updateScrollMode(this._currentPageNumber);
    }
  }, {
    key: "_updateScrollMode",
    value: function _updateScrollMode() {
      var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var scrollMode = this._scrollMode,
          viewer = this.viewer;
      viewer.classList.toggle("scrollHorizontal", scrollMode === _ui_utils.ScrollMode.HORIZONTAL);
      viewer.classList.toggle("scrollWrapped", scrollMode === _ui_utils.ScrollMode.WRAPPED);

      if (!this.pdfDocument || !pageNumber) {
        return;
      }

      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }

      this._setCurrentPageNumber(pageNumber, true);

      this.update();
    }
  }, {
    key: "spreadMode",
    get: function get() {
      return this._spreadMode;
    },
    set: function set(mode) {
      if (this._spreadMode === mode) {
        return;
      }

      if (!(0, _ui_utils.isValidSpreadMode)(mode)) {
        throw new Error("Invalid spread mode: ".concat(mode));
      }

      this._spreadMode = mode;
      this.eventBus.dispatch("spreadmodechanged", {
        source: this,
        mode: mode
      });

      this._updateSpreadMode(this._currentPageNumber);
    }
  }, {
    key: "_updateSpreadMode",
    value: function _updateSpreadMode() {
      var pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (!this.pdfDocument) {
        return;
      }

      var viewer = this.viewer,
          pages = this._pages;
      viewer.textContent = "";

      if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
        for (var i = 0, iMax = pages.length; i < iMax; ++i) {
          viewer.appendChild(pages[i].div);
        }
      } else {
        var parity = this._spreadMode - 1;
        var spread = null;

        for (var _i = 0, _iMax = pages.length; _i < _iMax; ++_i) {
          if (spread === null) {
            spread = document.createElement("div");
            spread.className = "spread";
            viewer.appendChild(spread);
          } else if (_i % 2 === parity) {
            spread = spread.cloneNode(false);
            viewer.appendChild(spread);
          }

          spread.appendChild(pages[_i].div);
        }
      }

      if (!pageNumber) {
        return;
      }

      if (this._currentScaleValue && isNaN(this._currentScaleValue)) {
        this._setScale(this._currentScaleValue, true);
      }

      this._setCurrentPageNumber(pageNumber, true);

      this.update();
    }
  }, {
    key: "_getPageAdvance",
    value: function _getPageAdvance(currentPageNumber) {
      var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (this.isInPresentationMode) {
        return 1;
      }

      switch (this._scrollMode) {
        case _ui_utils.ScrollMode.WRAPPED:
          {
            var _this$_getVisiblePage = this._getVisiblePages(),
                views = _this$_getVisiblePage.views,
                pageLayout = new Map();

            var _iterator2 = _createForOfIteratorHelper(views),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var _step2$value = _step2.value,
                    id = _step2$value.id,
                    y = _step2$value.y,
                    percent = _step2$value.percent,
                    widthPercent = _step2$value.widthPercent;

                if (percent === 0 || widthPercent < 100) {
                  continue;
                }

                var yArray = pageLayout.get(y);

                if (!yArray) {
                  pageLayout.set(y, yArray || (yArray = []));
                }

                yArray.push(id);
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            var _iterator3 = _createForOfIteratorHelper(pageLayout.values()),
                _step3;

            try {
              for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                var _yArray = _step3.value;

                var currentIndex = _yArray.indexOf(currentPageNumber);

                if (currentIndex === -1) {
                  continue;
                }

                var numPages = _yArray.length;

                if (numPages === 1) {
                  break;
                }

                if (previous) {
                  for (var i = currentIndex - 1, ii = 0; i >= ii; i--) {
                    var currentId = _yArray[i],
                        expectedId = _yArray[i + 1] - 1;

                    if (currentId < expectedId) {
                      return currentPageNumber - expectedId;
                    }
                  }
                } else {
                  for (var _i2 = currentIndex + 1, _ii = numPages; _i2 < _ii; _i2++) {
                    var _currentId = _yArray[_i2],
                        _expectedId = _yArray[_i2 - 1] + 1;

                    if (_currentId > _expectedId) {
                      return _expectedId - currentPageNumber;
                    }
                  }
                }

                if (previous) {
                  var firstId = _yArray[0];

                  if (firstId < currentPageNumber) {
                    return currentPageNumber - firstId + 1;
                  }
                } else {
                  var lastId = _yArray[numPages - 1];

                  if (lastId > currentPageNumber) {
                    return lastId - currentPageNumber + 1;
                  }
                }

                break;
              }
            } catch (err) {
              _iterator3.e(err);
            } finally {
              _iterator3.f();
            }

            break;
          }

        case _ui_utils.ScrollMode.HORIZONTAL:
          {
            break;
          }

        case _ui_utils.ScrollMode.VERTICAL:
          {
            if (this._spreadMode === _ui_utils.SpreadMode.NONE) {
              break;
            }

            var parity = this._spreadMode - 1;

            if (previous && currentPageNumber % 2 !== parity) {
              break;
            } else if (!previous && currentPageNumber % 2 === parity) {
              break;
            }

            var _this$_getVisiblePage2 = this._getVisiblePages(),
                _views = _this$_getVisiblePage2.views,
                _expectedId2 = previous ? currentPageNumber - 1 : currentPageNumber + 1;

            var _iterator4 = _createForOfIteratorHelper(_views),
                _step4;

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var _step4$value = _step4.value,
                    _id = _step4$value.id,
                    _percent = _step4$value.percent,
                    _widthPercent = _step4$value.widthPercent;

                if (_id !== _expectedId2) {
                  continue;
                }

                if (_percent > 0 && _widthPercent === 100) {
                  return 2;
                }

                break;
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            break;
          }
      }

      return 1;
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      var currentPageNumber = this._currentPageNumber,
          pagesCount = this.pagesCount;

      if (currentPageNumber >= pagesCount) {
        return false;
      }

      var advance = this._getPageAdvance(currentPageNumber, false) || 1;
      this.currentPageNumber = Math.min(currentPageNumber + advance, pagesCount);
      return true;
    }
  }, {
    key: "previousPage",
    value: function previousPage() {
      var currentPageNumber = this._currentPageNumber;

      if (currentPageNumber <= 1) {
        return false;
      }

      var advance = this._getPageAdvance(currentPageNumber, true) || 1;
      this.currentPageNumber = Math.max(currentPageNumber - advance, 1);
      return true;
    }
  }]);

  return BaseViewer;
}();

exports.BaseViewer = BaseViewer;

/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.StructTreeLayerBuilder = exports.DefaultStructTreeLayerFactory = void 0;

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDF_ROLE_TO_HTML_ROLE = {
  Document: null,
  DocumentFragment: null,
  Part: "group",
  Sect: "group",
  Div: "group",
  Aside: "note",
  NonStruct: "none",
  P: null,
  H: "heading",
  Title: null,
  FENote: "note",
  Sub: "group",
  Lbl: null,
  Span: null,
  Em: null,
  Strong: null,
  Link: "link",
  Annot: "note",
  Form: "form",
  Ruby: null,
  RB: null,
  RT: null,
  RP: null,
  Warichu: null,
  WT: null,
  WP: null,
  L: "list",
  LI: "listitem",
  LBody: null,
  Table: "table",
  TR: "row",
  TH: "columnheader",
  TD: "cell",
  THead: "columnheader",
  TBody: null,
  TFoot: null,
  Caption: null,
  Figure: "figure",
  Formula: null,
  Artifact: null
};
var HEADING_PATTERN = /^H(\d+)$/;

var StructTreeLayerBuilder = /*#__PURE__*/function () {
  function StructTreeLayerBuilder(_ref) {
    var pdfPage = _ref.pdfPage;

    _classCallCheck(this, StructTreeLayerBuilder);

    this.pdfPage = pdfPage;
  }

  _createClass(StructTreeLayerBuilder, [{
    key: "render",
    value: function render(structTree) {
      return this._walk(structTree);
    }
  }, {
    key: "_setAttributes",
    value: function _setAttributes(structElement, htmlElement) {
      if (structElement.alt !== undefined) {
        htmlElement.setAttribute("aria-label", structElement.alt);
      }

      if (structElement.id !== undefined) {
        htmlElement.setAttribute("aria-owns", structElement.id);
      }
    }
  }, {
    key: "_walk",
    value: function _walk(node) {
      if (!node) {
        return null;
      }

      var element = document.createElement("span");

      if ("role" in node) {
        var role = node.role;
        var match = role.match(HEADING_PATTERN);

        if (match) {
          element.setAttribute("role", "heading");
          element.setAttribute("aria-level", match[1]);
        } else if (PDF_ROLE_TO_HTML_ROLE[role]) {
          element.setAttribute("role", PDF_ROLE_TO_HTML_ROLE[role]);
        }
      }

      this._setAttributes(node, element);

      if (node.children) {
        if (node.children.length === 1 && "id" in node.children[0]) {
          this._setAttributes(node.children[0], element);
        } else {
          var _iterator = _createForOfIteratorHelper(node.children),
              _step;

          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var kid = _step.value;
              element.appendChild(this._walk(kid));
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        }
      }

      return element;
    }
  }]);

  return StructTreeLayerBuilder;
}();

exports.StructTreeLayerBuilder = StructTreeLayerBuilder;

var DefaultStructTreeLayerFactory = /*#__PURE__*/function () {
  function DefaultStructTreeLayerFactory() {
    _classCallCheck(this, DefaultStructTreeLayerFactory);
  }

  _createClass(DefaultStructTreeLayerFactory, [{
    key: "createStructTreeLayerBuilder",
    value: function createStructTreeLayerBuilder(pdfPage) {
      return new StructTreeLayerBuilder({
        pdfPage: pdfPage
      });
    }
  }]);

  return DefaultStructTreeLayerFactory;
}();

exports.DefaultStructTreeLayerFactory = DefaultStructTreeLayerFactory;

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.XfaLayerBuilder = exports.DefaultXfaLayerFactory = void 0;

var _pdfjsLib = __w_pdfjs_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var XfaLayerBuilder = /*#__PURE__*/function () {
  function XfaLayerBuilder(_ref) {
    var pageDiv = _ref.pageDiv,
        pdfPage = _ref.pdfPage,
        annotationStorage = _ref.annotationStorage;

    _classCallCheck(this, XfaLayerBuilder);

    this.pageDiv = pageDiv;
    this.pdfPage = pdfPage;
    this.annotationStorage = annotationStorage;
    this.div = null;
    this._cancelled = false;
  }

  _createClass(XfaLayerBuilder, [{
    key: "render",
    value: function render(viewport) {
      var _this = this;

      var intent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "display";
      return this.pdfPage.getXfa().then(function (xfa) {
        if (_this._cancelled) {
          return;
        }

        var parameters = {
          viewport: viewport.clone({
            dontFlip: true
          }),
          div: _this.div,
          xfa: xfa,
          page: _this.pdfPage,
          annotationStorage: _this.annotationStorage
        };

        if (_this.div) {
          _pdfjsLib.XfaLayer.update(parameters);
        } else {
          _this.div = document.createElement("div");

          _this.pageDiv.appendChild(_this.div);

          parameters.div = _this.div;

          _pdfjsLib.XfaLayer.render(parameters);
        }
      })["catch"](function (error) {
        console.error(error);
      });
    }
  }, {
    key: "cancel",
    value: function cancel() {
      this._cancelled = true;
    }
  }, {
    key: "hide",
    value: function hide() {
      if (!this.div) {
        return;
      }

      this.div.hidden = true;
    }
  }]);

  return XfaLayerBuilder;
}();

exports.XfaLayerBuilder = XfaLayerBuilder;

var DefaultXfaLayerFactory = /*#__PURE__*/function () {
  function DefaultXfaLayerFactory() {
    _classCallCheck(this, DefaultXfaLayerFactory);
  }

  _createClass(DefaultXfaLayerFactory, [{
    key: "createXfaLayerBuilder",
    value: function createXfaLayerBuilder(pageDiv, pdfPage) {
      var annotationStorage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      return new XfaLayerBuilder({
        pageDiv: pageDiv,
        pdfPage: pdfPage,
        annotationStorage: annotationStorage
      });
    }
  }]);

  return DefaultXfaLayerFactory;
}();

exports.DefaultXfaLayerFactory = DefaultXfaLayerFactory;

/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __w_pdfjs_require__) => {



function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PDFViewer = void 0;

var _ui_utils = __w_pdfjs_require__(7);

var _base_viewer = __w_pdfjs_require__(21);

var _pdfjsLib = __w_pdfjs_require__(2);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDFViewer = /*#__PURE__*/function (_BaseViewer) {
  _inherits(PDFViewer, _BaseViewer);

  var _super = _createSuper(PDFViewer);

  function PDFViewer() {
    _classCallCheck(this, PDFViewer);

    return _super.apply(this, arguments);
  }

  _createClass(PDFViewer, [{
    key: "_viewerElement",
    get: function get() {
      return (0, _pdfjsLib.shadow)(this, "_viewerElement", this.viewer);
    }
  }, {
    key: "_scrollIntoView",
    value: function _scrollIntoView(_ref) {
      var pageDiv = _ref.pageDiv,
          _ref$pageSpot = _ref.pageSpot,
          pageSpot = _ref$pageSpot === void 0 ? null : _ref$pageSpot,
          _ref$pageNumber = _ref.pageNumber,
          pageNumber = _ref$pageNumber === void 0 ? null : _ref$pageNumber;

      if (!pageSpot && !this.isInPresentationMode) {
        var left = pageDiv.offsetLeft + pageDiv.clientLeft;
        var right = left + pageDiv.clientWidth;
        var _this$container = this.container,
            scrollLeft = _this$container.scrollLeft,
            clientWidth = _this$container.clientWidth;

        if (this._isScrollModeHorizontal || left < scrollLeft || right > scrollLeft + clientWidth) {
          pageSpot = {
            left: 0,
            top: 0
          };
        }
      }

      _get(_getPrototypeOf(PDFViewer.prototype), "_scrollIntoView", this).call(this, {
        pageDiv: pageDiv,
        pageSpot: pageSpot,
        pageNumber: pageNumber
      });
    }
  }, {
    key: "_getVisiblePages",
    value: function _getVisiblePages() {
      if (this.isInPresentationMode) {
        return this._getCurrentVisiblePage();
      }

      return _get(_getPrototypeOf(PDFViewer.prototype), "_getVisiblePages", this).call(this);
    }
  }, {
    key: "_updateHelper",
    value: function _updateHelper(visiblePages) {
      if (this.isInPresentationMode) {
        return;
      }

      var currentId = this._currentPageNumber;
      var stillFullyVisible = false;

      var _iterator = _createForOfIteratorHelper(visiblePages),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var page = _step.value;

          if (page.percent < 100) {
            break;
          }

          if (page.id === currentId && this._scrollMode === _ui_utils.ScrollMode.VERTICAL && this._spreadMode === _ui_utils.SpreadMode.NONE) {
            stillFullyVisible = true;
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!stillFullyVisible) {
        currentId = visiblePages[0].id;
      }

      this._setCurrentPageNumber(currentId);
    }
  }]);

  return PDFViewer;
}(_base_viewer.BaseViewer);

exports.PDFViewer = PDFViewer;

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __w_pdfjs_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __w_pdfjs_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__w_pdfjs_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "AnnotationLayerBuilder", ({
  enumerable: true,
  get: function get() {
    return _annotation_layer_builder.AnnotationLayerBuilder;
  }
}));
Object.defineProperty(exports, "DefaultAnnotationLayerFactory", ({
  enumerable: true,
  get: function get() {
    return _annotation_layer_builder.DefaultAnnotationLayerFactory;
  }
}));
Object.defineProperty(exports, "DefaultTextLayerFactory", ({
  enumerable: true,
  get: function get() {
    return _text_layer_builder.DefaultTextLayerFactory;
  }
}));
Object.defineProperty(exports, "TextLayerBuilder", ({
  enumerable: true,
  get: function get() {
    return _text_layer_builder.TextLayerBuilder;
  }
}));
Object.defineProperty(exports, "EventBus", ({
  enumerable: true,
  get: function get() {
    return _ui_utils.EventBus;
  }
}));
Object.defineProperty(exports, "ProgressBar", ({
  enumerable: true,
  get: function get() {
    return _ui_utils.ProgressBar;
  }
}));
Object.defineProperty(exports, "PDFLinkService", ({
  enumerable: true,
  get: function get() {
    return _pdf_link_service.PDFLinkService;
  }
}));
Object.defineProperty(exports, "SimpleLinkService", ({
  enumerable: true,
  get: function get() {
    return _pdf_link_service.SimpleLinkService;
  }
}));
Object.defineProperty(exports, "DownloadManager", ({
  enumerable: true,
  get: function get() {
    return _download_manager.DownloadManager;
  }
}));
Object.defineProperty(exports, "GenericL10n", ({
  enumerable: true,
  get: function get() {
    return _genericl10n.GenericL10n;
  }
}));
Object.defineProperty(exports, "NullL10n", ({
  enumerable: true,
  get: function get() {
    return _l10n_utils.NullL10n;
  }
}));
Object.defineProperty(exports, "PDFFindController", ({
  enumerable: true,
  get: function get() {
    return _pdf_find_controller.PDFFindController;
  }
}));
Object.defineProperty(exports, "PDFHistory", ({
  enumerable: true,
  get: function get() {
    return _pdf_history.PDFHistory;
  }
}));
Object.defineProperty(exports, "PDFPageView", ({
  enumerable: true,
  get: function get() {
    return _pdf_page_view.PDFPageView;
  }
}));
Object.defineProperty(exports, "PDFScriptingManager", ({
  enumerable: true,
  get: function get() {
    return _pdf_scripting_manager.PDFScriptingManager;
  }
}));
Object.defineProperty(exports, "PDFSinglePageViewer", ({
  enumerable: true,
  get: function get() {
    return _pdf_single_page_viewer.PDFSinglePageViewer;
  }
}));
Object.defineProperty(exports, "PDFViewer", ({
  enumerable: true,
  get: function get() {
    return _pdf_viewer.PDFViewer;
  }
}));

var _annotation_layer_builder = __w_pdfjs_require__(1);

var _text_layer_builder = __w_pdfjs_require__(8);

var _ui_utils = __w_pdfjs_require__(7);

var _pdf_link_service = __w_pdfjs_require__(6);

var _download_manager = __w_pdfjs_require__(9);

var _genericl10n = __w_pdfjs_require__(11);

var _l10n_utils = __w_pdfjs_require__(3);

var _pdf_find_controller = __w_pdfjs_require__(13);

var _pdf_history = __w_pdfjs_require__(15);

var _pdf_page_view = __w_pdfjs_require__(16);

var _pdf_scripting_manager = __w_pdfjs_require__(18);

var _pdf_single_page_viewer = __w_pdfjs_require__(20);

var _pdf_viewer = __w_pdfjs_require__(24);

var pdfjsVersion = '2.9.359';
var pdfjsBuild = 'e667c8cbc';
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=pdf_viewer.js.map