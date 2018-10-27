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
exports.build = exports.version = exports.setPDFNetworkStreamFactory = exports.PDFPageProxy = exports.PDFDocumentProxy = exports.PDFWorker = exports.PDFDataRangeTransport = exports.LoopbackPort = exports.getDocument = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = require('../shared/util');

var _dom_utils = require('./dom_utils');

var _font_loader = require('./font_loader');

var _api_compatibility = require('./api_compatibility');

var _canvas = require('./canvas');

var _global_scope = require('../shared/global_scope');

var _global_scope2 = _interopRequireDefault(_global_scope);

var _worker_options = require('./worker_options');

var _message_handler = require('../shared/message_handler');

var _metadata = require('./metadata');

var _transport_stream = require('./transport_stream');

var _webgl = require('./webgl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var isWorkerDisabled = false;
var fallbackWorkerSrc = void 0;
var fakeWorkerFilesLoader = null;
{
  var useRequireEnsure = false;
  if (typeof window === 'undefined') {
    isWorkerDisabled = true;
    if (typeof require.ensure === 'undefined') {
      require.ensure = require('node-ensure');
    }
    useRequireEnsure = true;
  } else if (typeof require !== 'undefined' && typeof require.ensure === 'function') {
    useRequireEnsure = true;
  }
  if (typeof requirejs !== 'undefined' && requirejs.toUrl) {
    fallbackWorkerSrc = requirejs.toUrl('pdfjs-dist/build/pdf.worker.js');
  }
  var dynamicLoaderSupported = typeof requirejs !== 'undefined' && requirejs.load;
  fakeWorkerFilesLoader = useRequireEnsure ? function () {
    return new Promise(function (resolve, reject) {
      require.ensure([], function () {
        try {
          var worker = void 0;
          worker = require('../pdf.worker.js');
          resolve(worker.WorkerMessageHandler);
        } catch (ex) {
          reject(ex);
        }
      }, reject, 'pdfjsWorker');
    });
  } : dynamicLoaderSupported ? function () {
    return new Promise(function (resolve, reject) {
      requirejs(['pdfjs-dist/build/pdf.worker'], function (worker) {
        try {
          resolve(worker.WorkerMessageHandler);
        } catch (ex) {
          reject(ex);
        }
      }, reject);
    });
  } : null;
  if (!fallbackWorkerSrc && typeof document !== 'undefined') {
    var pdfjsFilePath = document.currentScript && document.currentScript.src;
    if (pdfjsFilePath) {
      fallbackWorkerSrc = pdfjsFilePath.replace(/(\.(?:min\.)?js)(\?.*)?$/i, '.worker$1$2');
    }
  }
}
var createPDFNetworkStream;
function setPDFNetworkStreamFactory(pdfNetworkStreamFactory) {
  createPDFNetworkStream = pdfNetworkStreamFactory;
}
function getDocument(src) {
  var task = new PDFDocumentLoadingTask();
  var source;
  if (typeof src === 'string') {
    source = { url: src };
  } else if ((0, _util.isArrayBuffer)(src)) {
    source = { data: src };
  } else if (src instanceof PDFDataRangeTransport) {
    source = { range: src };
  } else {
    if ((typeof src === 'undefined' ? 'undefined' : _typeof(src)) !== 'object') {
      throw new Error('Invalid parameter in getDocument, ' + 'need either Uint8Array, string or a parameter object');
    }
    if (!src.url && !src.data && !src.range) {
      throw new Error('Invalid parameter object: need either .data, .range or .url');
    }
    source = src;
  }
  var params = Object.create(null);
  var rangeTransport = null;
  var worker = null;
  for (var key in source) {
    if (key === 'url' && typeof window !== 'undefined') {
      params[key] = new _util.URL(source[key], window.location).href;
      continue;
    } else if (key === 'range') {
      rangeTransport = source[key];
      continue;
    } else if (key === 'worker') {
      worker = source[key];
      continue;
    } else if (key === 'data' && !(source[key] instanceof Uint8Array)) {
      var pdfBytes = source[key];
      if (typeof pdfBytes === 'string') {
        params[key] = (0, _util.stringToBytes)(pdfBytes);
      } else if ((typeof pdfBytes === 'undefined' ? 'undefined' : _typeof(pdfBytes)) === 'object' && pdfBytes !== null && !isNaN(pdfBytes.length)) {
        params[key] = new Uint8Array(pdfBytes);
      } else if ((0, _util.isArrayBuffer)(pdfBytes)) {
        params[key] = new Uint8Array(pdfBytes);
      } else {
        throw new Error('Invalid PDF binary data: either typed array, ' + 'string or array-like object is expected in the ' + 'data property.');
      }
      continue;
    }
    params[key] = source[key];
  }
  params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
  params.CMapReaderFactory = params.CMapReaderFactory || _dom_utils.DOMCMapReaderFactory;
  params.ignoreErrors = params.stopAtErrors !== true;
  params.pdfBug = params.pdfBug === true;
  var NativeImageDecoderValues = Object.values(_util.NativeImageDecoding);
  if (params.nativeImageDecoderSupport === undefined || !NativeImageDecoderValues.includes(params.nativeImageDecoderSupport)) {
    params.nativeImageDecoderSupport = _api_compatibility.apiCompatibilityParams.nativeImageDecoderSupport || _util.NativeImageDecoding.DECODE;
  }
  if (!Number.isInteger(params.maxImageSize)) {
    params.maxImageSize = -1;
  }
  if (typeof params.isEvalSupported !== 'boolean') {
    params.isEvalSupported = true;
  }
  if (typeof params.disableFontFace !== 'boolean') {
    params.disableFontFace = _api_compatibility.apiCompatibilityParams.disableFontFace || false;
  }
  if (typeof params.disableRange !== 'boolean') {
    params.disableRange = false;
  }
  if (typeof params.disableStream !== 'boolean') {
    params.disableStream = false;
  }
  if (typeof params.disableAutoFetch !== 'boolean') {
    params.disableAutoFetch = false;
  }
  if (typeof params.disableCreateObjectURL !== 'boolean') {
    params.disableCreateObjectURL = _api_compatibility.apiCompatibilityParams.disableCreateObjectURL || false;
  }
  (0, _util.setVerbosityLevel)(params.verbosity);
  if (!worker) {
    var workerParams = {
      postMessageTransfers: params.postMessageTransfers,
      verbosity: params.verbosity
    };
    var workerPort = _worker_options.GlobalWorkerOptions.workerPort;
    if (workerPort) {
      workerParams.port = workerPort;
      worker = PDFWorker.fromPort(workerParams);
    } else {
      worker = new PDFWorker(workerParams);
    }
    task._worker = worker;
  }
  var docId = task.docId;
  worker.promise.then(function () {
    if (task.destroyed) {
      throw new Error('Loading aborted');
    }
    return _fetchDocument(worker, params, rangeTransport, docId).then(function (workerId) {
      if (task.destroyed) {
        throw new Error('Loading aborted');
      }
      var networkStream = void 0;
      if (rangeTransport) {
        networkStream = new _transport_stream.PDFDataTransportStream({
          length: params.length,
          initialData: params.initialData,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        }, rangeTransport);
      } else if (!params.data) {
        networkStream = createPDFNetworkStream({
          url: params.url,
          length: params.length,
          httpHeaders: params.httpHeaders,
          withCredentials: params.withCredentials,
          rangeChunkSize: params.rangeChunkSize,
          disableRange: params.disableRange,
          disableStream: params.disableStream
        });
      }
      var messageHandler = new _message_handler.MessageHandler(docId, workerId, worker.port);
      messageHandler.postMessageTransfers = worker.postMessageTransfers;
      var transport = new WorkerTransport(messageHandler, task, networkStream, params);
      task._transport = transport;
      messageHandler.send('Ready', null);
    });
  }).catch(task._capability.reject);
  return task;
}
function _fetchDocument(worker, source, pdfDataRangeTransport, docId) {
  if (worker.destroyed) {
    return Promise.reject(new Error('Worker was destroyed'));
  }
  if (pdfDataRangeTransport) {
    source.length = pdfDataRangeTransport.length;
    source.initialData = pdfDataRangeTransport.initialData;
  }
  return worker.messageHandler.sendWithPromise('GetDocRequest', {
    docId: docId,
    apiVersion: '2.0.943',
    source: {
      data: source.data,
      url: source.url,
      password: source.password,
      disableAutoFetch: source.disableAutoFetch,
      rangeChunkSize: source.rangeChunkSize,
      length: source.length
    },
    maxImageSize: source.maxImageSize,
    disableFontFace: source.disableFontFace,
    disableCreateObjectURL: source.disableCreateObjectURL,
    postMessageTransfers: worker.postMessageTransfers,
    docBaseUrl: source.docBaseUrl,
    nativeImageDecoderSupport: source.nativeImageDecoderSupport,
    ignoreErrors: source.ignoreErrors,
    isEvalSupported: source.isEvalSupported
  }).then(function (workerId) {
    if (worker.destroyed) {
      throw new Error('Worker was destroyed');
    }
    return workerId;
  });
}
var PDFDocumentLoadingTask = function PDFDocumentLoadingTaskClosure() {
  var nextDocumentId = 0;
  function PDFDocumentLoadingTask() {
    this._capability = (0, _util.createPromiseCapability)();
    this._transport = null;
    this._worker = null;
    this.docId = 'd' + nextDocumentId++;
    this.destroyed = false;
    this.onPassword = null;
    this.onProgress = null;
    this.onUnsupportedFeature = null;
  }
  PDFDocumentLoadingTask.prototype = {
    get promise() {
      return this._capability.promise;
    },
    destroy: function destroy() {
      var _this = this;

      this.destroyed = true;
      var transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
      return transportDestroyed.then(function () {
        _this._transport = null;
        if (_this._worker) {
          _this._worker.destroy();
          _this._worker = null;
        }
      });
    },

    then: function PDFDocumentLoadingTask_then(onFulfilled, onRejected) {
      return this.promise.then.apply(this.promise, arguments);
    }
  };
  return PDFDocumentLoadingTask;
}();

var PDFDataRangeTransport = function () {
  function PDFDataRangeTransport(length, initialData) {
    _classCallCheck(this, PDFDataRangeTransport);

    this.length = length;
    this.initialData = initialData;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._readyCapability = (0, _util.createPromiseCapability)();
  }

  _createClass(PDFDataRangeTransport, [{
    key: 'addRangeListener',
    value: function addRangeListener(listener) {
      this._rangeListeners.push(listener);
    }
  }, {
    key: 'addProgressListener',
    value: function addProgressListener(listener) {
      this._progressListeners.push(listener);
    }
  }, {
    key: 'addProgressiveReadListener',
    value: function addProgressiveReadListener(listener) {
      this._progressiveReadListeners.push(listener);
    }
  }, {
    key: 'onDataRange',
    value: function onDataRange(begin, chunk) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this._rangeListeners[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var listener = _step.value;

          listener(begin, chunk);
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
    }
  }, {
    key: 'onDataProgress',
    value: function onDataProgress(loaded) {
      var _this2 = this;

      this._readyCapability.promise.then(function () {
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _this2._progressListeners[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var listener = _step2.value;

            listener(loaded);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      });
    }
  }, {
    key: 'onDataProgressiveRead',
    value: function onDataProgressiveRead(chunk) {
      var _this3 = this;

      this._readyCapability.promise.then(function () {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _this3._progressiveReadListeners[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var listener = _step3.value;

            listener(chunk);
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
      });
    }
  }, {
    key: 'transportReady',
    value: function transportReady() {
      this._readyCapability.resolve();
    }
  }, {
    key: 'requestDataRange',
    value: function requestDataRange(begin, end) {
      (0, _util.unreachable)('Abstract method PDFDataRangeTransport.requestDataRange');
    }
  }, {
    key: 'abort',
    value: function abort() {}
  }]);

  return PDFDataRangeTransport;
}();

var PDFDocumentProxy = function () {
  function PDFDocumentProxy(pdfInfo, transport, loadingTask) {
    _classCallCheck(this, PDFDocumentProxy);

    this.loadingTask = loadingTask;
    this._pdfInfo = pdfInfo;
    this._transport = transport;
  }

  _createClass(PDFDocumentProxy, [{
    key: 'getPage',
    value: function getPage(pageNumber) {
      return this._transport.getPage(pageNumber);
    }
  }, {
    key: 'getPageIndex',
    value: function getPageIndex(ref) {
      return this._transport.getPageIndex(ref);
    }
  }, {
    key: 'getDestinations',
    value: function getDestinations() {
      return this._transport.getDestinations();
    }
  }, {
    key: 'getDestination',
    value: function getDestination(id) {
      return this._transport.getDestination(id);
    }
  }, {
    key: 'getPageLabels',
    value: function getPageLabels() {
      return this._transport.getPageLabels();
    }
  }, {
    key: 'getPageMode',
    value: function getPageMode() {
      return this._transport.getPageMode();
    }
  }, {
    key: 'getAttachments',
    value: function getAttachments() {
      return this._transport.getAttachments();
    }
  }, {
    key: 'getJavaScript',
    value: function getJavaScript() {
      return this._transport.getJavaScript();
    }
  }, {
    key: 'getOutline',
    value: function getOutline() {
      return this._transport.getOutline();
    }
  }, {
    key: 'getPermissions',
    value: function getPermissions() {
      return this._transport.getPermissions();
    }
  }, {
    key: 'getMetadata',
    value: function getMetadata() {
      return this._transport.getMetadata();
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this._transport.getData();
    }
  }, {
    key: 'getDownloadInfo',
    value: function getDownloadInfo() {
      return this._transport.downloadInfoCapability.promise;
    }
  }, {
    key: 'getStats',
    value: function getStats() {
      return this._transport.getStats();
    }
  }, {
    key: 'cleanup',
    value: function cleanup() {
      this._transport.startCleanup();
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      return this.loadingTask.destroy();
    }
  }, {
    key: 'numPages',
    get: function get() {
      return this._pdfInfo.numPages;
    }
  }, {
    key: 'fingerprint',
    get: function get() {
      return this._pdfInfo.fingerprint;
    }
  }, {
    key: 'loadingParams',
    get: function get() {
      return this._transport.loadingParams;
    }
  }]);

  return PDFDocumentProxy;
}();

var PDFPageProxy = function PDFPageProxyClosure() {
  function PDFPageProxy(pageIndex, pageInfo, transport) {
    var pdfBug = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    this.pageIndex = pageIndex;
    this._pageInfo = pageInfo;
    this.transport = transport;
    this._stats = pdfBug ? new _dom_utils.StatTimer() : _dom_utils.DummyStatTimer;
    this._pdfBug = pdfBug;
    this.commonObjs = transport.commonObjs;
    this.objs = new PDFObjects();
    this.cleanupAfterRender = false;
    this.pendingCleanup = false;
    this.intentStates = Object.create(null);
    this.destroyed = false;
  }
  PDFPageProxy.prototype = {
    get pageNumber() {
      return this.pageIndex + 1;
    },
    get rotate() {
      return this._pageInfo.rotate;
    },
    get ref() {
      return this._pageInfo.ref;
    },
    get userUnit() {
      return this._pageInfo.userUnit;
    },
    get view() {
      return this._pageInfo.view;
    },
    getViewport: function getViewport(scale) {
      var rotate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.rotate;
      var dontFlip = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      return new _dom_utils.PageViewport({
        viewBox: this.view,
        scale: scale,
        rotation: rotate,
        dontFlip: dontFlip
      });
    },

    getAnnotations: function PDFPageProxy_getAnnotations(params) {
      var intent = params && params.intent || null;
      if (!this.annotationsPromise || this.annotationsIntent !== intent) {
        this.annotationsPromise = this.transport.getAnnotations(this.pageIndex, intent);
        this.annotationsIntent = intent;
      }
      return this.annotationsPromise;
    },
    render: function PDFPageProxy_render(params) {
      var _this4 = this;

      var stats = this._stats;
      stats.time('Overall');
      this.pendingCleanup = false;
      var renderingIntent = params.intent === 'print' ? 'print' : 'display';
      var canvasFactory = params.canvasFactory || new _dom_utils.DOMCanvasFactory();
      var webGLContext = new _webgl.WebGLContext({ enable: params.enableWebGL });
      if (!this.intentStates[renderingIntent]) {
        this.intentStates[renderingIntent] = Object.create(null);
      }
      var intentState = this.intentStates[renderingIntent];
      if (!intentState.displayReadyCapability) {
        intentState.receivingOperatorList = true;
        intentState.displayReadyCapability = (0, _util.createPromiseCapability)();
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };
        stats.time('Page Request');
        this.transport.messageHandler.send('RenderPageRequest', {
          pageIndex: this.pageNumber - 1,
          intent: renderingIntent,
          renderInteractiveForms: params.renderInteractiveForms === true
        });
      }
      var complete = function complete(error) {
        var i = intentState.renderTasks.indexOf(internalRenderTask);
        if (i >= 0) {
          intentState.renderTasks.splice(i, 1);
        }
        if (_this4.cleanupAfterRender) {
          _this4.pendingCleanup = true;
        }
        _this4._tryCleanup();
        if (error) {
          internalRenderTask.capability.reject(error);
        } else {
          internalRenderTask.capability.resolve();
        }
        stats.timeEnd('Rendering');
        stats.timeEnd('Overall');
      };
      var internalRenderTask = new InternalRenderTask(complete, params, this.objs, this.commonObjs, intentState.operatorList, this.pageNumber, canvasFactory, webGLContext, this._pdfBug);
      internalRenderTask.useRequestAnimationFrame = renderingIntent !== 'print';
      if (!intentState.renderTasks) {
        intentState.renderTasks = [];
      }
      intentState.renderTasks.push(internalRenderTask);
      var renderTask = internalRenderTask.task;
      intentState.displayReadyCapability.promise.then(function (transparency) {
        if (_this4.pendingCleanup) {
          complete();
          return;
        }
        stats.time('Rendering');
        internalRenderTask.initializeGraphics(transparency);
        internalRenderTask.operatorListChanged();
      }).catch(complete);
      return renderTask;
    },
    getOperatorList: function PDFPageProxy_getOperatorList() {
      function operatorListChanged() {
        if (intentState.operatorList.lastChunk) {
          intentState.opListReadCapability.resolve(intentState.operatorList);
          var i = intentState.renderTasks.indexOf(opListTask);
          if (i >= 0) {
            intentState.renderTasks.splice(i, 1);
          }
        }
      }
      var renderingIntent = 'oplist';
      if (!this.intentStates[renderingIntent]) {
        this.intentStates[renderingIntent] = Object.create(null);
      }
      var intentState = this.intentStates[renderingIntent];
      var opListTask;
      if (!intentState.opListReadCapability) {
        opListTask = {};
        opListTask.operatorListChanged = operatorListChanged;
        intentState.receivingOperatorList = true;
        intentState.opListReadCapability = (0, _util.createPromiseCapability)();
        intentState.renderTasks = [];
        intentState.renderTasks.push(opListTask);
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };
        this._stats.time('Page Request');
        this.transport.messageHandler.send('RenderPageRequest', {
          pageIndex: this.pageIndex,
          intent: renderingIntent
        });
      }
      return intentState.opListReadCapability.promise;
    },
    streamTextContent: function streamTextContent() {
      var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var TEXT_CONTENT_CHUNK_SIZE = 100;
      return this.transport.messageHandler.sendWithStream('GetTextContent', {
        pageIndex: this.pageNumber - 1,
        normalizeWhitespace: params.normalizeWhitespace === true,
        combineTextItems: params.disableCombineTextItems !== true
      }, {
        highWaterMark: TEXT_CONTENT_CHUNK_SIZE,
        size: function size(textContent) {
          return textContent.items.length;
        }
      });
    },

    getTextContent: function PDFPageProxy_getTextContent(params) {
      params = params || {};
      var readableStream = this.streamTextContent(params);
      return new Promise(function (resolve, reject) {
        function pump() {
          reader.read().then(function (_ref) {
            var _textContent$items;

            var value = _ref.value,
                done = _ref.done;

            if (done) {
              resolve(textContent);
              return;
            }
            Object.assign(textContent.styles, value.styles);
            (_textContent$items = textContent.items).push.apply(_textContent$items, _toConsumableArray(value.items));
            pump();
          }, reject);
        }
        var reader = readableStream.getReader();
        var textContent = {
          items: [],
          styles: Object.create(null)
        };
        pump();
      });
    },
    _destroy: function PDFPageProxy_destroy() {
      this.destroyed = true;
      this.transport.pageCache[this.pageIndex] = null;
      var waitOn = [];
      Object.keys(this.intentStates).forEach(function (intent) {
        if (intent === 'oplist') {
          return;
        }
        var intentState = this.intentStates[intent];
        intentState.renderTasks.forEach(function (renderTask) {
          var renderCompleted = renderTask.capability.promise.catch(function () {});
          waitOn.push(renderCompleted);
          renderTask.cancel();
        });
      }, this);
      this.objs.clear();
      this.annotationsPromise = null;
      this.pendingCleanup = false;
      return Promise.all(waitOn);
    },
    cleanup: function cleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      this.pendingCleanup = true;
      this._tryCleanup(resetStats);
    },
    _tryCleanup: function _tryCleanup() {
      var resetStats = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!this.pendingCleanup || Object.keys(this.intentStates).some(function (intent) {
        var intentState = this.intentStates[intent];
        return intentState.renderTasks.length !== 0 || intentState.receivingOperatorList;
      }, this)) {
        return;
      }
      Object.keys(this.intentStates).forEach(function (intent) {
        delete this.intentStates[intent];
      }, this);
      this.objs.clear();
      this.annotationsPromise = null;
      if (resetStats && this._stats instanceof _dom_utils.StatTimer) {
        this._stats = new _dom_utils.StatTimer();
      }
      this.pendingCleanup = false;
    },

    _startRenderPage: function PDFPageProxy_startRenderPage(transparency, intent) {
      var intentState = this.intentStates[intent];
      if (intentState.displayReadyCapability) {
        intentState.displayReadyCapability.resolve(transparency);
      }
    },
    _renderPageChunk: function PDFPageProxy_renderPageChunk(operatorListChunk, intent) {
      var intentState = this.intentStates[intent];
      var i, ii;
      for (i = 0, ii = operatorListChunk.length; i < ii; i++) {
        intentState.operatorList.fnArray.push(operatorListChunk.fnArray[i]);
        intentState.operatorList.argsArray.push(operatorListChunk.argsArray[i]);
      }
      intentState.operatorList.lastChunk = operatorListChunk.lastChunk;
      for (i = 0; i < intentState.renderTasks.length; i++) {
        intentState.renderTasks[i].operatorListChanged();
      }
      if (operatorListChunk.lastChunk) {
        intentState.receivingOperatorList = false;
        this._tryCleanup();
      }
    },
    get stats() {
      return this._stats instanceof _dom_utils.StatTimer ? this._stats : null;
    }
  };
  return PDFPageProxy;
}();

var LoopbackPort = function () {
  function LoopbackPort() {
    var defer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, LoopbackPort);

    this._listeners = [];
    this._defer = defer;
    this._deferred = Promise.resolve(undefined);
  }

  _createClass(LoopbackPort, [{
    key: 'postMessage',
    value: function postMessage(obj, transfers) {
      var _this5 = this;

      function cloneValue(value) {
        if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' || value === null) {
          return value;
        }
        if (cloned.has(value)) {
          return cloned.get(value);
        }
        var result;
        var buffer;
        if ((buffer = value.buffer) && (0, _util.isArrayBuffer)(buffer)) {
          var transferable = transfers && transfers.includes(buffer);
          if (value === buffer) {
            result = value;
          } else if (transferable) {
            result = new value.constructor(buffer, value.byteOffset, value.byteLength);
          } else {
            result = new value.constructor(value);
          }
          cloned.set(value, result);
          return result;
        }
        result = Array.isArray(value) ? [] : {};
        cloned.set(value, result);
        for (var i in value) {
          var desc,
              p = value;
          while (!(desc = Object.getOwnPropertyDescriptor(p, i))) {
            p = Object.getPrototypeOf(p);
          }
          if (typeof desc.value === 'undefined' || typeof desc.value === 'function') {
            continue;
          }
          result[i] = cloneValue(desc.value);
        }
        return result;
      }
      if (!this._defer) {
        this._listeners.forEach(function (listener) {
          listener.call(this, { data: obj });
        }, this);
        return;
      }
      var cloned = new WeakMap();
      var e = { data: cloneValue(obj) };
      this._deferred.then(function () {
        _this5._listeners.forEach(function (listener) {
          listener.call(this, e);
        }, _this5);
      });
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener(name, listener) {
      this._listeners.push(listener);
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(name, listener) {
      var i = this._listeners.indexOf(listener);
      this._listeners.splice(i, 1);
    }
  }, {
    key: 'terminate',
    value: function terminate() {
      this._listeners = [];
    }
  }]);

  return LoopbackPort;
}();

var PDFWorker = function PDFWorkerClosure() {
  var nextFakeWorkerId = 0;
  function getWorkerSrc() {
    if (_worker_options.GlobalWorkerOptions.workerSrc) {
      return _worker_options.GlobalWorkerOptions.workerSrc;
    }
    if (typeof fallbackWorkerSrc !== 'undefined') {
      return fallbackWorkerSrc;
    }
    throw new Error('No "GlobalWorkerOptions.workerSrc" specified.');
  }
  function getMainThreadWorkerMessageHandler() {
    try {
      if (typeof window !== 'undefined') {
        return window.pdfjsWorker && window.pdfjsWorker.WorkerMessageHandler;
      }
    } catch (ex) {}
    return null;
  }
  var fakeWorkerFilesLoadedCapability = void 0;
  function setupFakeWorkerGlobal() {
    if (fakeWorkerFilesLoadedCapability) {
      return fakeWorkerFilesLoadedCapability.promise;
    }
    fakeWorkerFilesLoadedCapability = (0, _util.createPromiseCapability)();
    var mainWorkerMessageHandler = getMainThreadWorkerMessageHandler();
    if (mainWorkerMessageHandler) {
      fakeWorkerFilesLoadedCapability.resolve(mainWorkerMessageHandler);
      return fakeWorkerFilesLoadedCapability.promise;
    }
    var loader = fakeWorkerFilesLoader || function () {
      return (0, _dom_utils.loadScript)(getWorkerSrc()).then(function () {
        return window.pdfjsWorker.WorkerMessageHandler;
      });
    };
    loader().then(fakeWorkerFilesLoadedCapability.resolve, fakeWorkerFilesLoadedCapability.reject);
    return fakeWorkerFilesLoadedCapability.promise;
  }
  function createCDNWrapper(url) {
    var wrapper = 'importScripts(\'' + url + '\');';
    return _util.URL.createObjectURL(new Blob([wrapper]));
  }
  var pdfWorkerPorts = new WeakMap();
  function PDFWorker() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$name = _ref2.name,
        name = _ref2$name === undefined ? null : _ref2$name,
        _ref2$port = _ref2.port,
        port = _ref2$port === undefined ? null : _ref2$port,
        _ref2$postMessageTran = _ref2.postMessageTransfers,
        postMessageTransfers = _ref2$postMessageTran === undefined ? true : _ref2$postMessageTran,
        _ref2$verbosity = _ref2.verbosity,
        verbosity = _ref2$verbosity === undefined ? (0, _util.getVerbosityLevel)() : _ref2$verbosity;

    if (port && pdfWorkerPorts.has(port)) {
      throw new Error('Cannot use more than one PDFWorker per port');
    }
    this.name = name;
    this.destroyed = false;
    this.postMessageTransfers = postMessageTransfers !== false;
    this.verbosity = verbosity;
    this._readyCapability = (0, _util.createPromiseCapability)();
    this._port = null;
    this._webWorker = null;
    this._messageHandler = null;
    if (port) {
      pdfWorkerPorts.set(port, this);
      this._initializeFromPort(port);
      return;
    }
    this._initialize();
  }
  PDFWorker.prototype = {
    get promise() {
      return this._readyCapability.promise;
    },
    get port() {
      return this._port;
    },
    get messageHandler() {
      return this._messageHandler;
    },
    _initializeFromPort: function PDFWorker_initializeFromPort(port) {
      this._port = port;
      this._messageHandler = new _message_handler.MessageHandler('main', 'worker', port);
      this._messageHandler.on('ready', function () {});
      this._readyCapability.resolve();
    },
    _initialize: function PDFWorker_initialize() {
      var _this6 = this;

      if (typeof Worker !== 'undefined' && !isWorkerDisabled && !getMainThreadWorkerMessageHandler()) {
        var workerSrc = getWorkerSrc();
        try {
          if (!(0, _util.isSameOrigin)(window.location.href, workerSrc)) {
            workerSrc = createCDNWrapper(new _util.URL(workerSrc, window.location).href);
          }
          var worker = new Worker(workerSrc);
          var messageHandler = new _message_handler.MessageHandler('main', 'worker', worker);
          var terminateEarly = function terminateEarly() {
            worker.removeEventListener('error', onWorkerError);
            messageHandler.destroy();
            worker.terminate();
            if (_this6.destroyed) {
              _this6._readyCapability.reject(new Error('Worker was destroyed'));
            } else {
              _this6._setupFakeWorker();
            }
          };
          var onWorkerError = function onWorkerError() {
            if (!_this6._webWorker) {
              terminateEarly();
            }
          };
          worker.addEventListener('error', onWorkerError);
          messageHandler.on('test', function (data) {
            worker.removeEventListener('error', onWorkerError);
            if (_this6.destroyed) {
              terminateEarly();
              return;
            }
            if (data && data.supportTypedArray) {
              _this6._messageHandler = messageHandler;
              _this6._port = worker;
              _this6._webWorker = worker;
              if (!data.supportTransfers) {
                _this6.postMessageTransfers = false;
              }
              _this6._readyCapability.resolve();
              messageHandler.send('configure', { verbosity: _this6.verbosity });
            } else {
              _this6._setupFakeWorker();
              messageHandler.destroy();
              worker.terminate();
            }
          });
          messageHandler.on('ready', function (data) {
            worker.removeEventListener('error', onWorkerError);
            if (_this6.destroyed) {
              terminateEarly();
              return;
            }
            try {
              sendTest();
            } catch (e) {
              _this6._setupFakeWorker();
            }
          });
          var sendTest = function sendTest() {
            var testObj = new Uint8Array([_this6.postMessageTransfers ? 255 : 0]);
            try {
              messageHandler.send('test', testObj, [testObj.buffer]);
            } catch (ex) {
              (0, _util.info)('Cannot use postMessage transfers');
              testObj[0] = 0;
              messageHandler.send('test', testObj);
            }
          };
          sendTest();
          return;
        } catch (e) {
          (0, _util.info)('The worker has been disabled.');
        }
      }
      this._setupFakeWorker();
    },
    _setupFakeWorker: function PDFWorker_setupFakeWorker() {
      var _this7 = this;

      if (!isWorkerDisabled) {
        (0, _util.warn)('Setting up fake worker.');
        isWorkerDisabled = true;
      }
      setupFakeWorkerGlobal().then(function (WorkerMessageHandler) {
        if (_this7.destroyed) {
          _this7._readyCapability.reject(new Error('Worker was destroyed'));
          return;
        }
        var port = new LoopbackPort();
        _this7._port = port;
        var id = 'fake' + nextFakeWorkerId++;
        var workerHandler = new _message_handler.MessageHandler(id + '_worker', id, port);
        WorkerMessageHandler.setup(workerHandler, port);
        var messageHandler = new _message_handler.MessageHandler(id, id + '_worker', port);
        _this7._messageHandler = messageHandler;
        _this7._readyCapability.resolve();
      }).catch(function (reason) {
        _this7._readyCapability.reject(new Error('Setting up fake worker failed: "' + reason.message + '".'));
      });
    },
    destroy: function PDFWorker_destroy() {
      this.destroyed = true;
      if (this._webWorker) {
        this._webWorker.terminate();
        this._webWorker = null;
      }
      pdfWorkerPorts.delete(this._port);
      this._port = null;
      if (this._messageHandler) {
        this._messageHandler.destroy();
        this._messageHandler = null;
      }
    }
  };
  PDFWorker.fromPort = function (params) {
    if (!params || !params.port) {
      throw new Error('PDFWorker.fromPort - invalid method signature.');
    }
    if (pdfWorkerPorts.has(params.port)) {
      return pdfWorkerPorts.get(params.port);
    }
    return new PDFWorker(params);
  };
  PDFWorker.getWorkerSrc = function () {
    return getWorkerSrc();
  };
  return PDFWorker;
}();

var WorkerTransport = function () {
  function WorkerTransport(messageHandler, loadingTask, networkStream, params) {
    _classCallCheck(this, WorkerTransport);

    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new _font_loader.FontLoader(loadingTask.docId);
    this._params = params;
    this.CMapReaderFactory = new params.CMapReaderFactory({
      baseUrl: params.cMapUrl,
      isCompressed: params.cMapPacked
    });
    this.destroyed = false;
    this.destroyCapability = null;
    this._passwordCapability = null;
    this._networkStream = networkStream;
    this._fullReader = null;
    this._lastProgress = null;
    this.pageCache = [];
    this.pagePromises = [];
    this.downloadInfoCapability = (0, _util.createPromiseCapability)();
    this.setupMessageHandler();
  }

  _createClass(WorkerTransport, [{
    key: 'destroy',
    value: function destroy() {
      var _this8 = this;

      if (this.destroyCapability) {
        return this.destroyCapability.promise;
      }
      this.destroyed = true;
      this.destroyCapability = (0, _util.createPromiseCapability)();
      if (this._passwordCapability) {
        this._passwordCapability.reject(new Error('Worker was destroyed during onPassword callback'));
      }
      var waitOn = [];
      this.pageCache.forEach(function (page) {
        if (page) {
          waitOn.push(page._destroy());
        }
      });
      this.pageCache = [];
      this.pagePromises = [];
      var terminated = this.messageHandler.sendWithPromise('Terminate', null);
      waitOn.push(terminated);
      Promise.all(waitOn).then(function () {
        _this8.fontLoader.clear();
        if (_this8._networkStream) {
          _this8._networkStream.cancelAllRequests();
        }
        if (_this8.messageHandler) {
          _this8.messageHandler.destroy();
          _this8.messageHandler = null;
        }
        _this8.destroyCapability.resolve();
      }, this.destroyCapability.reject);
      return this.destroyCapability.promise;
    }
  }, {
    key: 'setupMessageHandler',
    value: function setupMessageHandler() {
      var messageHandler = this.messageHandler,
          loadingTask = this.loadingTask;

      messageHandler.on('GetReader', function (data, sink) {
        var _this9 = this;

        (0, _util.assert)(this._networkStream);
        this._fullReader = this._networkStream.getFullReader();
        this._fullReader.onProgress = function (evt) {
          _this9._lastProgress = {
            loaded: evt.loaded,
            total: evt.total
          };
        };
        sink.onPull = function () {
          _this9._fullReader.read().then(function (_ref3) {
            var value = _ref3.value,
                done = _ref3.done;

            if (done) {
              sink.close();
              return;
            }
            (0, _util.assert)((0, _util.isArrayBuffer)(value));
            sink.enqueue(new Uint8Array(value), 1, [value]);
          }).catch(function (reason) {
            sink.error(reason);
          });
        };
        sink.onCancel = function (reason) {
          _this9._fullReader.cancel(reason);
        };
      }, this);
      messageHandler.on('ReaderHeadersReady', function (data) {
        var _this10 = this;

        var headersCapability = (0, _util.createPromiseCapability)();
        var fullReader = this._fullReader;
        fullReader.headersReady.then(function () {
          if (!fullReader.isStreamingSupported || !fullReader.isRangeSupported) {
            if (_this10._lastProgress && loadingTask.onProgress) {
              loadingTask.onProgress(_this10._lastProgress);
            }
            fullReader.onProgress = function (evt) {
              if (loadingTask.onProgress) {
                loadingTask.onProgress({
                  loaded: evt.loaded,
                  total: evt.total
                });
              }
            };
          }
          headersCapability.resolve({
            isStreamingSupported: fullReader.isStreamingSupported,
            isRangeSupported: fullReader.isRangeSupported,
            contentLength: fullReader.contentLength
          });
        }, headersCapability.reject);
        return headersCapability.promise;
      }, this);
      messageHandler.on('GetRangeReader', function (data, sink) {
        (0, _util.assert)(this._networkStream);
        var rangeReader = this._networkStream.getRangeReader(data.begin, data.end);
        sink.onPull = function () {
          rangeReader.read().then(function (_ref4) {
            var value = _ref4.value,
                done = _ref4.done;

            if (done) {
              sink.close();
              return;
            }
            (0, _util.assert)((0, _util.isArrayBuffer)(value));
            sink.enqueue(new Uint8Array(value), 1, [value]);
          }).catch(function (reason) {
            sink.error(reason);
          });
        };
        sink.onCancel = function (reason) {
          rangeReader.cancel(reason);
        };
      }, this);
      messageHandler.on('GetDoc', function (_ref5) {
        var pdfInfo = _ref5.pdfInfo;

        this.numPages = pdfInfo.numPages;
        this.pdfDocument = new PDFDocumentProxy(pdfInfo, this, loadingTask);
        loadingTask._capability.resolve(this.pdfDocument);
      }, this);
      messageHandler.on('PasswordRequest', function (exception) {
        var _this11 = this;

        this._passwordCapability = (0, _util.createPromiseCapability)();
        if (loadingTask.onPassword) {
          var updatePassword = function updatePassword(password) {
            _this11._passwordCapability.resolve({ password: password });
          };
          try {
            loadingTask.onPassword(updatePassword, exception.code);
          } catch (ex) {
            this._passwordCapability.reject(ex);
          }
        } else {
          this._passwordCapability.reject(new _util.PasswordException(exception.message, exception.code));
        }
        return this._passwordCapability.promise;
      }, this);
      messageHandler.on('PasswordException', function (exception) {
        loadingTask._capability.reject(new _util.PasswordException(exception.message, exception.code));
      }, this);
      messageHandler.on('InvalidPDF', function (exception) {
        loadingTask._capability.reject(new _util.InvalidPDFException(exception.message));
      }, this);
      messageHandler.on('MissingPDF', function (exception) {
        loadingTask._capability.reject(new _util.MissingPDFException(exception.message));
      }, this);
      messageHandler.on('UnexpectedResponse', function (exception) {
        loadingTask._capability.reject(new _util.UnexpectedResponseException(exception.message, exception.status));
      }, this);
      messageHandler.on('UnknownError', function (exception) {
        loadingTask._capability.reject(new _util.UnknownErrorException(exception.message, exception.details));
      }, this);
      messageHandler.on('DataLoaded', function (data) {
        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.length,
            total: data.length
          });
        }
        this.downloadInfoCapability.resolve(data);
      }, this);
      messageHandler.on('StartRenderPage', function (data) {
        if (this.destroyed) {
          return;
        }
        var page = this.pageCache[data.pageIndex];
        page._stats.timeEnd('Page Request');
        page._startRenderPage(data.transparency, data.intent);
      }, this);
      messageHandler.on('RenderPageChunk', function (data) {
        if (this.destroyed) {
          return;
        }
        var page = this.pageCache[data.pageIndex];
        page._renderPageChunk(data.operatorList, data.intent);
      }, this);
      messageHandler.on('commonobj', function (data) {
        var _this12 = this;

        if (this.destroyed) {
          return;
        }

        var _data = _slicedToArray(data, 3),
            id = _data[0],
            type = _data[1],
            exportedData = _data[2];

        if (this.commonObjs.hasData(id)) {
          return;
        }
        switch (type) {
          case 'Font':
            var params = this._params;
            if ('error' in exportedData) {
              var exportedError = exportedData.error;
              (0, _util.warn)('Error during font loading: ' + exportedError);
              this.commonObjs.resolve(id, exportedError);
              break;
            }
            var fontRegistry = null;
            if (params.pdfBug && _global_scope2.default.FontInspector && _global_scope2.default.FontInspector.enabled) {
              fontRegistry = {
                registerFont: function registerFont(font, url) {
                  _global_scope2.default['FontInspector'].fontAdded(font, url);
                }
              };
            }
            var font = new _font_loader.FontFaceObject(exportedData, {
              isEvalSupported: params.isEvalSupported,
              disableFontFace: params.disableFontFace,
              ignoreErrors: params.ignoreErrors,
              onUnsupportedFeature: this._onUnsupportedFeature.bind(this),
              fontRegistry: fontRegistry
            });
            var fontReady = function fontReady(fontObjs) {
              _this12.commonObjs.resolve(id, font);
            };
            this.fontLoader.bind([font], fontReady);
            break;
          case 'FontPath':
            this.commonObjs.resolve(id, exportedData);
            break;
          default:
            throw new Error('Got unknown common object type ' + type);
        }
      }, this);
      messageHandler.on('obj', function (data) {
        if (this.destroyed) {
          return;
        }

        var _data2 = _slicedToArray(data, 4),
            id = _data2[0],
            pageIndex = _data2[1],
            type = _data2[2],
            imageData = _data2[3];

        var pageProxy = this.pageCache[pageIndex];
        if (pageProxy.objs.hasData(id)) {
          return;
        }
        switch (type) {
          case 'JpegStream':
            return new Promise(function (resolve, reject) {
              var img = new Image();
              img.onload = function () {
                resolve(img);
              };
              img.onerror = function () {
                reject(new Error('Error during JPEG image loading'));
              };
              img.src = imageData;
            }).then(function (img) {
              pageProxy.objs.resolve(id, img);
            });
          case 'Image':
            pageProxy.objs.resolve(id, imageData);
            var MAX_IMAGE_SIZE_TO_STORE = 8000000;
            if (imageData && 'data' in imageData && imageData.data.length > MAX_IMAGE_SIZE_TO_STORE) {
              pageProxy.cleanupAfterRender = true;
            }
            break;
          default:
            throw new Error('Got unknown object type ' + type);
        }
      }, this);
      messageHandler.on('DocProgress', function (data) {
        if (this.destroyed) {
          return;
        }
        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.loaded,
            total: data.total
          });
        }
      }, this);
      messageHandler.on('PageError', function (data) {
        if (this.destroyed) {
          return;
        }
        var page = this.pageCache[data.pageNum - 1];
        var intentState = page.intentStates[data.intent];
        if (intentState.displayReadyCapability) {
          intentState.displayReadyCapability.reject(data.error);
        } else {
          throw new Error(data.error);
        }
        if (intentState.operatorList) {
          intentState.operatorList.lastChunk = true;
          for (var i = 0; i < intentState.renderTasks.length; i++) {
            intentState.renderTasks[i].operatorListChanged();
          }
        }
      }, this);
      messageHandler.on('UnsupportedFeature', this._onUnsupportedFeature, this);
      messageHandler.on('JpegDecode', function (data) {
        if (this.destroyed) {
          return Promise.reject(new Error('Worker was destroyed'));
        }
        if (typeof document === 'undefined') {
          return Promise.reject(new Error('"document" is not defined.'));
        }

        var _data3 = _slicedToArray(data, 2),
            imageUrl = _data3[0],
            components = _data3[1];

        if (components !== 3 && components !== 1) {
          return Promise.reject(new Error('Only 3 components or 1 component can be returned'));
        }
        return new Promise(function (resolve, reject) {
          var img = new Image();
          img.onload = function () {
            var width = img.width;
            var height = img.height;
            var size = width * height;
            var rgbaLength = size * 4;
            var buf = new Uint8ClampedArray(size * components);
            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = width;
            tmpCanvas.height = height;
            var tmpCtx = tmpCanvas.getContext('2d');
            tmpCtx.drawImage(img, 0, 0);
            var data = tmpCtx.getImageData(0, 0, width, height).data;
            if (components === 3) {
              for (var i = 0, j = 0; i < rgbaLength; i += 4, j += 3) {
                buf[j] = data[i];
                buf[j + 1] = data[i + 1];
                buf[j + 2] = data[i + 2];
              }
            } else if (components === 1) {
              for (var _i = 0, _j = 0; _i < rgbaLength; _i += 4, _j++) {
                buf[_j] = data[_i];
              }
            }
            resolve({
              data: buf,
              width: width,
              height: height
            });
          };
          img.onerror = function () {
            reject(new Error('JpegDecode failed to load image'));
          };
          img.src = imageUrl;
        });
      }, this);
      messageHandler.on('FetchBuiltInCMap', function (data) {
        if (this.destroyed) {
          return Promise.reject(new Error('Worker was destroyed'));
        }
        return this.CMapReaderFactory.fetch({ name: data.name });
      }, this);
    }
  }, {
    key: '_onUnsupportedFeature',
    value: function _onUnsupportedFeature(_ref6) {
      var featureId = _ref6.featureId;

      if (this.destroyed) {
        return;
      }
      if (this.loadingTask.onUnsupportedFeature) {
        this.loadingTask.onUnsupportedFeature(featureId);
      }
    }
  }, {
    key: 'getData',
    value: function getData() {
      return this.messageHandler.sendWithPromise('GetData', null);
    }
  }, {
    key: 'getPage',
    value: function getPage(pageNumber) {
      var _this13 = this;

      if (!Number.isInteger(pageNumber) || pageNumber <= 0 || pageNumber > this.numPages) {
        return Promise.reject(new Error('Invalid page request'));
      }
      var pageIndex = pageNumber - 1;
      if (pageIndex in this.pagePromises) {
        return this.pagePromises[pageIndex];
      }
      var promise = this.messageHandler.sendWithPromise('GetPage', { pageIndex: pageIndex }).then(function (pageInfo) {
        if (_this13.destroyed) {
          throw new Error('Transport destroyed');
        }
        var page = new PDFPageProxy(pageIndex, pageInfo, _this13, _this13._params.pdfBug);
        _this13.pageCache[pageIndex] = page;
        return page;
      });
      this.pagePromises[pageIndex] = promise;
      return promise;
    }
  }, {
    key: 'getPageIndex',
    value: function getPageIndex(ref) {
      return this.messageHandler.sendWithPromise('GetPageIndex', { ref: ref }).catch(function (reason) {
        return Promise.reject(new Error(reason));
      });
    }
  }, {
    key: 'getAnnotations',
    value: function getAnnotations(pageIndex, intent) {
      return this.messageHandler.sendWithPromise('GetAnnotations', {
        pageIndex: pageIndex,
        intent: intent
      });
    }
  }, {
    key: 'getDestinations',
    value: function getDestinations() {
      return this.messageHandler.sendWithPromise('GetDestinations', null);
    }
  }, {
    key: 'getDestination',
    value: function getDestination(id) {
      if (typeof id !== 'string') {
        return Promise.reject(new Error('Invalid destination request.'));
      }
      return this.messageHandler.sendWithPromise('GetDestination', { id: id });
    }
  }, {
    key: 'getPageLabels',
    value: function getPageLabels() {
      return this.messageHandler.sendWithPromise('GetPageLabels', null);
    }
  }, {
    key: 'getPageMode',
    value: function getPageMode() {
      return this.messageHandler.sendWithPromise('GetPageMode', null);
    }
  }, {
    key: 'getAttachments',
    value: function getAttachments() {
      return this.messageHandler.sendWithPromise('GetAttachments', null);
    }
  }, {
    key: 'getJavaScript',
    value: function getJavaScript() {
      return this.messageHandler.sendWithPromise('GetJavaScript', null);
    }
  }, {
    key: 'getOutline',
    value: function getOutline() {
      return this.messageHandler.sendWithPromise('GetOutline', null);
    }
  }, {
    key: 'getPermissions',
    value: function getPermissions() {
      return this.messageHandler.sendWithPromise('GetPermissions', null);
    }
  }, {
    key: 'getMetadata',
    value: function getMetadata() {
      var _this14 = this;

      return this.messageHandler.sendWithPromise('GetMetadata', null).then(function (results) {
        return {
          info: results[0],
          metadata: results[1] ? new _metadata.Metadata(results[1]) : null,
          contentDispositionFilename: _this14._fullReader ? _this14._fullReader.filename : null
        };
      });
    }
  }, {
    key: 'getStats',
    value: function getStats() {
      return this.messageHandler.sendWithPromise('GetStats', null);
    }
  }, {
    key: 'startCleanup',
    value: function startCleanup() {
      var _this15 = this;

      this.messageHandler.sendWithPromise('Cleanup', null).then(function () {
        for (var i = 0, ii = _this15.pageCache.length; i < ii; i++) {
          var page = _this15.pageCache[i];
          if (page) {
            page.cleanup();
          }
        }
        _this15.commonObjs.clear();
        _this15.fontLoader.clear();
      });
    }
  }, {
    key: 'loadingParams',
    get: function get() {
      var params = this._params;
      return (0, _util.shadow)(this, 'loadingParams', {
        disableAutoFetch: params.disableAutoFetch,
        disableCreateObjectURL: params.disableCreateObjectURL,
        disableFontFace: params.disableFontFace,
        nativeImageDecoderSupport: params.nativeImageDecoderSupport
      });
    }
  }]);

  return WorkerTransport;
}();

var PDFObjects = function PDFObjectsClosure() {
  function PDFObjects() {
    this.objs = Object.create(null);
  }
  PDFObjects.prototype = {
    ensureObj: function PDFObjects_ensureObj(objId) {
      if (this.objs[objId]) {
        return this.objs[objId];
      }
      var obj = {
        capability: (0, _util.createPromiseCapability)(),
        data: null,
        resolved: false
      };
      this.objs[objId] = obj;
      return obj;
    },
    get: function PDFObjects_get(objId, callback) {
      if (callback) {
        this.ensureObj(objId).capability.promise.then(callback);
        return null;
      }
      var obj = this.objs[objId];
      if (!obj || !obj.resolved) {
        throw new Error('Requesting object that isn\'t resolved yet ' + objId);
      }
      return obj.data;
    },
    resolve: function PDFObjects_resolve(objId, data) {
      var obj = this.ensureObj(objId);
      obj.resolved = true;
      obj.data = data;
      obj.capability.resolve(data);
    },
    isResolved: function PDFObjects_isResolved(objId) {
      var objs = this.objs;
      if (!objs[objId]) {
        return false;
      }
      return objs[objId].resolved;
    },
    hasData: function PDFObjects_hasData(objId) {
      return this.isResolved(objId);
    },
    getData: function PDFObjects_getData(objId) {
      var objs = this.objs;
      if (!objs[objId] || !objs[objId].resolved) {
        return null;
      }
      return objs[objId].data;
    },
    clear: function PDFObjects_clear() {
      this.objs = Object.create(null);
    }
  };
  return PDFObjects;
}();
var RenderTask = function RenderTaskClosure() {
  function RenderTask(internalRenderTask) {
    this._internalRenderTask = internalRenderTask;
    this.onContinue = null;
  }
  RenderTask.prototype = {
    get promise() {
      return this._internalRenderTask.capability.promise;
    },
    cancel: function RenderTask_cancel() {
      this._internalRenderTask.cancel();
    },
    then: function RenderTask_then(onFulfilled, onRejected) {
      return this.promise.then.apply(this.promise, arguments);
    }
  };
  return RenderTask;
}();
var InternalRenderTask = function InternalRenderTaskClosure() {
  var canvasInRendering = new WeakMap();
  function InternalRenderTask(callback, params, objs, commonObjs, operatorList, pageNumber, canvasFactory, webGLContext) {
    var pdfBug = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;

    this.callback = callback;
    this.params = params;
    this.objs = objs;
    this.commonObjs = commonObjs;
    this.operatorListIdx = null;
    this.operatorList = operatorList;
    this.pageNumber = pageNumber;
    this.canvasFactory = canvasFactory;
    this.webGLContext = webGLContext;
    this._pdfBug = pdfBug;
    this.running = false;
    this.graphicsReadyCallback = null;
    this.graphicsReady = false;
    this.useRequestAnimationFrame = false;
    this.cancelled = false;
    this.capability = (0, _util.createPromiseCapability)();
    this.task = new RenderTask(this);
    this._continueBound = this._continue.bind(this);
    this._scheduleNextBound = this._scheduleNext.bind(this);
    this._nextBound = this._next.bind(this);
    this._canvas = params.canvasContext.canvas;
  }
  InternalRenderTask.prototype = {
    initializeGraphics: function initializeGraphics(transparency) {
      if (this.cancelled) {
        return;
      }
      if (this._canvas) {
        if (canvasInRendering.has(this._canvas)) {
          throw new Error('Cannot use the same canvas during multiple render() operations. ' + 'Use different canvas or ensure previous operations were ' + 'cancelled or completed.');
        }
        canvasInRendering.set(this._canvas, this);
      }
      if (this._pdfBug && _global_scope2.default.StepperManager && _global_scope2.default.StepperManager.enabled) {
        this.stepper = _global_scope2.default.StepperManager.create(this.pageNumber - 1);
        this.stepper.init(this.operatorList);
        this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
      }
      var params = this.params;
      this.gfx = new _canvas.CanvasGraphics(params.canvasContext, this.commonObjs, this.objs, this.canvasFactory, this.webGLContext, params.imageLayer);
      this.gfx.beginDrawing({
        transform: params.transform,
        viewport: params.viewport,
        transparency: transparency,
        background: params.background
      });
      this.operatorListIdx = 0;
      this.graphicsReady = true;
      if (this.graphicsReadyCallback) {
        this.graphicsReadyCallback();
      }
    },

    cancel: function InternalRenderTask_cancel() {
      this.running = false;
      this.cancelled = true;
      if (this._canvas) {
        canvasInRendering.delete(this._canvas);
      }
      this.callback(new _dom_utils.RenderingCancelledException('Rendering cancelled, page ' + this.pageNumber, 'canvas'));
    },
    operatorListChanged: function InternalRenderTask_operatorListChanged() {
      if (!this.graphicsReady) {
        if (!this.graphicsReadyCallback) {
          this.graphicsReadyCallback = this._continueBound;
        }
        return;
      }
      if (this.stepper) {
        this.stepper.updateOperatorList(this.operatorList);
      }
      if (this.running) {
        return;
      }
      this._continue();
    },
    _continue: function InternalRenderTask__continue() {
      this.running = true;
      if (this.cancelled) {
        return;
      }
      if (this.task.onContinue) {
        this.task.onContinue(this._scheduleNextBound);
      } else {
        this._scheduleNext();
      }
    },
    _scheduleNext: function InternalRenderTask__scheduleNext() {
      var _this16 = this;

      if (this.useRequestAnimationFrame && typeof window !== 'undefined') {
        window.requestAnimationFrame(function () {
          _this16._nextBound().catch(_this16.callback);
        });
      } else {
        Promise.resolve().then(this._nextBound).catch(this.callback);
      }
    },
    _next: function InternalRenderTask__next() {
      var _this17 = this;

      return new Promise(function () {
        if (_this17.cancelled) {
          return;
        }
        _this17.operatorListIdx = _this17.gfx.executeOperatorList(_this17.operatorList, _this17.operatorListIdx, _this17._continueBound, _this17.stepper);
        if (_this17.operatorListIdx === _this17.operatorList.argsArray.length) {
          _this17.running = false;
          if (_this17.operatorList.lastChunk) {
            _this17.gfx.endDrawing();
            if (_this17._canvas) {
              canvasInRendering.delete(_this17._canvas);
            }
            _this17.callback();
          }
        }
      });
    }
  };
  return InternalRenderTask;
}();
var version, build;
{
  exports.version = version = '2.0.943';
  exports.build = build = 'dc98bf76';
}
exports.getDocument = getDocument;
exports.LoopbackPort = LoopbackPort;
exports.PDFDataRangeTransport = PDFDataRangeTransport;
exports.PDFWorker = PDFWorker;
exports.PDFDocumentProxy = PDFDocumentProxy;
exports.PDFPageProxy = PDFPageProxy;
exports.setPDFNetworkStreamFactory = setPDFNetworkStreamFactory;
exports.version = version;
exports.build = build;