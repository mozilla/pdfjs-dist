/* Copyright 2017 Mozilla Foundation
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
 */
'use strict';

var sharedUtil = require('../shared/util.js');
var displayFontLoader = require('./font_loader.js');
var displayCanvas = require('./canvas.js');
var displayMetadata = require('./metadata.js');
var displayDOMUtils = require('./dom_utils.js');
var amdRequire;
var InvalidPDFException = sharedUtil.InvalidPDFException;
var MessageHandler = sharedUtil.MessageHandler;
var MissingPDFException = sharedUtil.MissingPDFException;
var PageViewport = sharedUtil.PageViewport;
var PasswordException = sharedUtil.PasswordException;
var StatTimer = sharedUtil.StatTimer;
var UnexpectedResponseException = sharedUtil.UnexpectedResponseException;
var UnknownErrorException = sharedUtil.UnknownErrorException;
var Util = sharedUtil.Util;
var createPromiseCapability = sharedUtil.createPromiseCapability;
var error = sharedUtil.error;
var deprecated = sharedUtil.deprecated;
var getVerbosityLevel = sharedUtil.getVerbosityLevel;
var info = sharedUtil.info;
var isInt = sharedUtil.isInt;
var isArray = sharedUtil.isArray;
var isArrayBuffer = sharedUtil.isArrayBuffer;
var isSameOrigin = sharedUtil.isSameOrigin;
var loadJpegStream = sharedUtil.loadJpegStream;
var stringToBytes = sharedUtil.stringToBytes;
var globalScope = sharedUtil.globalScope;
var warn = sharedUtil.warn;
var FontFaceObject = displayFontLoader.FontFaceObject;
var FontLoader = displayFontLoader.FontLoader;
var CanvasGraphics = displayCanvas.CanvasGraphics;
var Metadata = displayMetadata.Metadata;
var RenderingCancelledException = displayDOMUtils.RenderingCancelledException;
var getDefaultSetting = displayDOMUtils.getDefaultSetting;
var DOMCanvasFactory = displayDOMUtils.DOMCanvasFactory;
var DOMCMapReaderFactory = displayDOMUtils.DOMCMapReaderFactory;
var DEFAULT_RANGE_CHUNK_SIZE = 65536;
var isWorkerDisabled = false;
var workerSrc;
var isPostMessageTransfersDisabled = false;
var pdfjsFilePath = typeof document !== 'undefined' && document.currentScript ? document.currentScript.src : null;
var fakeWorkerFilesLoader = null;
var useRequireEnsure = false;
if (typeof __pdfjsdev_webpack__ === 'undefined') {
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
    workerSrc = requirejs.toUrl('pdfjs-dist/build/pdf.worker.js');
  }
  var dynamicLoaderSupported = typeof requirejs !== 'undefined' && requirejs.load;
  fakeWorkerFilesLoader = useRequireEnsure ? function (callback) {
    require.ensure([], function () {
      var worker = require('./pdf.worker.js');
      callback(worker.WorkerMessageHandler);
    });
  } : dynamicLoaderSupported ? function (callback) {
    requirejs(['pdfjs-dist/build/pdf.worker'], function (worker) {
      callback(worker.WorkerMessageHandler);
    });
  } : null;
}
function getDocument(src, pdfDataRangeTransport, passwordCallback, progressCallback) {
  var task = new PDFDocumentLoadingTask();
  if (arguments.length > 1) {
    deprecated('getDocument is called with pdfDataRangeTransport, ' + 'passwordCallback or progressCallback argument');
  }
  if (pdfDataRangeTransport) {
    if (!(pdfDataRangeTransport instanceof PDFDataRangeTransport)) {
      pdfDataRangeTransport = Object.create(pdfDataRangeTransport);
      pdfDataRangeTransport.length = src.length;
      pdfDataRangeTransport.initialData = src.initialData;
      if (!pdfDataRangeTransport.abort) {
        pdfDataRangeTransport.abort = function () {};
      }
    }
    src = Object.create(src);
    src.range = pdfDataRangeTransport;
  }
  task.onPassword = passwordCallback || null;
  task.onProgress = progressCallback || null;
  var source;
  if (typeof src === 'string') {
    source = { url: src };
  } else if (isArrayBuffer(src)) {
    source = { data: src };
  } else if (src instanceof PDFDataRangeTransport) {
    source = { range: src };
  } else {
    if (typeof src !== 'object') {
      error('Invalid parameter in getDocument, need either Uint8Array, ' + 'string or a parameter object');
    }
    if (!src.url && !src.data && !src.range) {
      error('Invalid parameter object: need either .data, .range or .url');
    }
    source = src;
  }
  var params = {};
  var rangeTransport = null;
  var worker = null;
  for (var key in source) {
    if (key === 'url' && typeof window !== 'undefined') {
      params[key] = new URL(source[key], window.location).href;
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
        params[key] = stringToBytes(pdfBytes);
      } else if (typeof pdfBytes === 'object' && pdfBytes !== null && !isNaN(pdfBytes.length)) {
        params[key] = new Uint8Array(pdfBytes);
      } else if (isArrayBuffer(pdfBytes)) {
        params[key] = new Uint8Array(pdfBytes);
      } else {
        error('Invalid PDF binary data: either typed array, string or ' + 'array-like object is expected in the data property.');
      }
      continue;
    }
    params[key] = source[key];
  }
  params.rangeChunkSize = params.rangeChunkSize || DEFAULT_RANGE_CHUNK_SIZE;
  params.disableNativeImageDecoder = params.disableNativeImageDecoder === true;
  var CMapReaderFactory = params.CMapReaderFactory || DOMCMapReaderFactory;
  if (!worker) {
    var workerPort = getDefaultSetting('workerPort');
    worker = workerPort ? new PDFWorker(null, workerPort) : new PDFWorker();
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
      var messageHandler = new MessageHandler(docId, workerId, worker.port);
      var transport = new WorkerTransport(messageHandler, task, rangeTransport, CMapReaderFactory);
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
  source.disableAutoFetch = getDefaultSetting('disableAutoFetch');
  source.disableStream = getDefaultSetting('disableStream');
  source.chunkedViewerLoading = !!pdfDataRangeTransport;
  if (pdfDataRangeTransport) {
    source.length = pdfDataRangeTransport.length;
    source.initialData = pdfDataRangeTransport.initialData;
  }
  return worker.messageHandler.sendWithPromise('GetDocRequest', {
    docId: docId,
    source: source,
    disableRange: getDefaultSetting('disableRange'),
    maxImageSize: getDefaultSetting('maxImageSize'),
    disableFontFace: getDefaultSetting('disableFontFace'),
    disableCreateObjectURL: getDefaultSetting('disableCreateObjectURL'),
    postMessageTransfers: getDefaultSetting('postMessageTransfers') && !isPostMessageTransfersDisabled,
    docBaseUrl: source.docBaseUrl,
    disableNativeImageDecoder: source.disableNativeImageDecoder
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
    this._capability = createPromiseCapability();
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
    destroy: function () {
      this.destroyed = true;
      var transportDestroyed = !this._transport ? Promise.resolve() : this._transport.destroy();
      return transportDestroyed.then(function () {
        this._transport = null;
        if (this._worker) {
          this._worker.destroy();
          this._worker = null;
        }
      }.bind(this));
    },
    then: function PDFDocumentLoadingTask_then(onFulfilled, onRejected) {
      return this.promise.then.apply(this.promise, arguments);
    }
  };
  return PDFDocumentLoadingTask;
}();
var PDFDataRangeTransport = function pdfDataRangeTransportClosure() {
  function PDFDataRangeTransport(length, initialData) {
    this.length = length;
    this.initialData = initialData;
    this._rangeListeners = [];
    this._progressListeners = [];
    this._progressiveReadListeners = [];
    this._readyCapability = createPromiseCapability();
  }
  PDFDataRangeTransport.prototype = {
    addRangeListener: function PDFDataRangeTransport_addRangeListener(listener) {
      this._rangeListeners.push(listener);
    },
    addProgressListener: function PDFDataRangeTransport_addProgressListener(listener) {
      this._progressListeners.push(listener);
    },
    addProgressiveReadListener: function PDFDataRangeTransport_addProgressiveReadListener(listener) {
      this._progressiveReadListeners.push(listener);
    },
    onDataRange: function PDFDataRangeTransport_onDataRange(begin, chunk) {
      var listeners = this._rangeListeners;
      for (var i = 0, n = listeners.length; i < n; ++i) {
        listeners[i](begin, chunk);
      }
    },
    onDataProgress: function PDFDataRangeTransport_onDataProgress(loaded) {
      this._readyCapability.promise.then(function () {
        var listeners = this._progressListeners;
        for (var i = 0, n = listeners.length; i < n; ++i) {
          listeners[i](loaded);
        }
      }.bind(this));
    },
    onDataProgressiveRead: function PDFDataRangeTransport_onDataProgress(chunk) {
      this._readyCapability.promise.then(function () {
        var listeners = this._progressiveReadListeners;
        for (var i = 0, n = listeners.length; i < n; ++i) {
          listeners[i](chunk);
        }
      }.bind(this));
    },
    transportReady: function PDFDataRangeTransport_transportReady() {
      this._readyCapability.resolve();
    },
    requestDataRange: function PDFDataRangeTransport_requestDataRange(begin, end) {
      throw new Error('Abstract method PDFDataRangeTransport.requestDataRange');
    },
    abort: function PDFDataRangeTransport_abort() {}
  };
  return PDFDataRangeTransport;
}();
var PDFDocumentProxy = function PDFDocumentProxyClosure() {
  function PDFDocumentProxy(pdfInfo, transport, loadingTask) {
    this.pdfInfo = pdfInfo;
    this.transport = transport;
    this.loadingTask = loadingTask;
  }
  PDFDocumentProxy.prototype = {
    get numPages() {
      return this.pdfInfo.numPages;
    },
    get fingerprint() {
      return this.pdfInfo.fingerprint;
    },
    getPage: function PDFDocumentProxy_getPage(pageNumber) {
      return this.transport.getPage(pageNumber);
    },
    getPageIndex: function PDFDocumentProxy_getPageIndex(ref) {
      return this.transport.getPageIndex(ref);
    },
    getDestinations: function PDFDocumentProxy_getDestinations() {
      return this.transport.getDestinations();
    },
    getDestination: function PDFDocumentProxy_getDestination(id) {
      return this.transport.getDestination(id);
    },
    getPageLabels: function PDFDocumentProxy_getPageLabels() {
      return this.transport.getPageLabels();
    },
    getAttachments: function PDFDocumentProxy_getAttachments() {
      return this.transport.getAttachments();
    },
    getJavaScript: function PDFDocumentProxy_getJavaScript() {
      return this.transport.getJavaScript();
    },
    getOutline: function PDFDocumentProxy_getOutline() {
      return this.transport.getOutline();
    },
    getMetadata: function PDFDocumentProxy_getMetadata() {
      return this.transport.getMetadata();
    },
    getData: function PDFDocumentProxy_getData() {
      return this.transport.getData();
    },
    getDownloadInfo: function PDFDocumentProxy_getDownloadInfo() {
      return this.transport.downloadInfoCapability.promise;
    },
    getStats: function PDFDocumentProxy_getStats() {
      return this.transport.getStats();
    },
    cleanup: function PDFDocumentProxy_cleanup() {
      this.transport.startCleanup();
    },
    destroy: function PDFDocumentProxy_destroy() {
      return this.loadingTask.destroy();
    }
  };
  return PDFDocumentProxy;
}();
var PDFPageProxy = function PDFPageProxyClosure() {
  function PDFPageProxy(pageIndex, pageInfo, transport) {
    this.pageIndex = pageIndex;
    this.pageInfo = pageInfo;
    this.transport = transport;
    this.stats = new StatTimer();
    this.stats.enabled = getDefaultSetting('enableStats');
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
      return this.pageInfo.rotate;
    },
    get ref() {
      return this.pageInfo.ref;
    },
    get userUnit() {
      return this.pageInfo.userUnit;
    },
    get view() {
      return this.pageInfo.view;
    },
    getViewport: function PDFPageProxy_getViewport(scale, rotate) {
      if (arguments.length < 2) {
        rotate = this.rotate;
      }
      return new PageViewport(this.view, scale, rotate, 0, 0);
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
      var stats = this.stats;
      stats.time('Overall');
      this.pendingCleanup = false;
      var renderingIntent = params.intent === 'print' ? 'print' : 'display';
      var renderInteractiveForms = params.renderInteractiveForms === true ? true : false;
      var canvasFactory = params.canvasFactory || new DOMCanvasFactory();
      if (!this.intentStates[renderingIntent]) {
        this.intentStates[renderingIntent] = Object.create(null);
      }
      var intentState = this.intentStates[renderingIntent];
      if (!intentState.displayReadyCapability) {
        intentState.receivingOperatorList = true;
        intentState.displayReadyCapability = createPromiseCapability();
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };
        this.stats.time('Page Request');
        this.transport.messageHandler.send('RenderPageRequest', {
          pageIndex: this.pageNumber - 1,
          intent: renderingIntent,
          renderInteractiveForms: renderInteractiveForms
        });
      }
      var internalRenderTask = new InternalRenderTask(complete, params, this.objs, this.commonObjs, intentState.operatorList, this.pageNumber, canvasFactory);
      internalRenderTask.useRequestAnimationFrame = renderingIntent !== 'print';
      if (!intentState.renderTasks) {
        intentState.renderTasks = [];
      }
      intentState.renderTasks.push(internalRenderTask);
      var renderTask = internalRenderTask.task;
      if (params.continueCallback) {
        deprecated('render is used with continueCallback parameter');
        renderTask.onContinue = params.continueCallback;
      }
      var self = this;
      intentState.displayReadyCapability.promise.then(function pageDisplayReadyPromise(transparency) {
        if (self.pendingCleanup) {
          complete();
          return;
        }
        stats.time('Rendering');
        internalRenderTask.initializeGraphics(transparency);
        internalRenderTask.operatorListChanged();
      }, function pageDisplayReadPromiseError(reason) {
        complete(reason);
      });
      function complete(error) {
        var i = intentState.renderTasks.indexOf(internalRenderTask);
        if (i >= 0) {
          intentState.renderTasks.splice(i, 1);
        }
        if (self.cleanupAfterRender) {
          self.pendingCleanup = true;
        }
        self._tryCleanup();
        if (error) {
          internalRenderTask.capability.reject(error);
        } else {
          internalRenderTask.capability.resolve();
        }
        stats.timeEnd('Rendering');
        stats.timeEnd('Overall');
      }
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
        intentState.opListReadCapability = createPromiseCapability();
        intentState.renderTasks = [];
        intentState.renderTasks.push(opListTask);
        intentState.operatorList = {
          fnArray: [],
          argsArray: [],
          lastChunk: false
        };
        this.transport.messageHandler.send('RenderPageRequest', {
          pageIndex: this.pageIndex,
          intent: renderingIntent
        });
      }
      return intentState.opListReadCapability.promise;
    },
    getTextContent: function PDFPageProxy_getTextContent(params) {
      return this.transport.messageHandler.sendWithPromise('GetTextContent', {
        pageIndex: this.pageNumber - 1,
        normalizeWhitespace: params && params.normalizeWhitespace === true ? true : false,
        combineTextItems: params && params.disableCombineTextItems === true ? false : true
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
    destroy: function () {
      deprecated('page destroy method, use cleanup() instead');
      this.cleanup();
    },
    cleanup: function PDFPageProxy_cleanup() {
      this.pendingCleanup = true;
      this._tryCleanup();
    },
    _tryCleanup: function PDFPageProxy_tryCleanup() {
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
    }
  };
  return PDFPageProxy;
}();
var PDFWorker = function PDFWorkerClosure() {
  var nextFakeWorkerId = 0;
  function getWorkerSrc() {
    if (typeof workerSrc !== 'undefined') {
      return workerSrc;
    }
    if (getDefaultSetting('workerSrc')) {
      return getDefaultSetting('workerSrc');
    }
    if (pdfjsFilePath) {
      return pdfjsFilePath.replace(/\.js$/i, '.worker.js');
    }
    error('No PDFJS.workerSrc specified');
  }
  var fakeWorkerFilesLoadedCapability;
  function setupFakeWorkerGlobal() {
    var WorkerMessageHandler;
    if (fakeWorkerFilesLoadedCapability) {
      return fakeWorkerFilesLoadedCapability.promise;
    }
    fakeWorkerFilesLoadedCapability = createPromiseCapability();
    var loader = fakeWorkerFilesLoader || function (callback) {
      Util.loadScript(getWorkerSrc(), function () {
        callback(window.pdfjsDistBuildPdfWorker.WorkerMessageHandler);
      });
    };
    loader(fakeWorkerFilesLoadedCapability.resolve);
    return fakeWorkerFilesLoadedCapability.promise;
  }
  function FakeWorkerPort(defer) {
    this._listeners = [];
    this._defer = defer;
    this._deferred = Promise.resolve(undefined);
  }
  FakeWorkerPort.prototype = {
    postMessage: function (obj, transfers) {
      function cloneValue(value) {
        if (typeof value !== 'object' || value === null) {
          return value;
        }
        if (cloned.has(value)) {
          return cloned.get(value);
        }
        var result;
        var buffer;
        if ((buffer = value.buffer) && isArrayBuffer(buffer)) {
          var transferable = transfers && transfers.indexOf(buffer) >= 0;
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
        result = isArray(value) ? [] : {};
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
        this._listeners.forEach(function (listener) {
          listener.call(this, e);
        }, this);
      }.bind(this));
    },
    addEventListener: function (name, listener) {
      this._listeners.push(listener);
    },
    removeEventListener: function (name, listener) {
      var i = this._listeners.indexOf(listener);
      this._listeners.splice(i, 1);
    },
    terminate: function () {
      this._listeners = [];
    }
  };
  function createCDNWrapper(url) {
    var wrapper = 'importScripts(\'' + url + '\');';
    return URL.createObjectURL(new Blob([wrapper]));
  }
  function PDFWorker(name, port) {
    this.name = name;
    this.destroyed = false;
    this._readyCapability = createPromiseCapability();
    this._port = null;
    this._webWorker = null;
    this._messageHandler = null;
    if (port) {
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
      this._messageHandler = new MessageHandler('main', 'worker', port);
      this._messageHandler.on('ready', function () {});
      this._readyCapability.resolve();
    },
    _initialize: function PDFWorker_initialize() {
      if (!isWorkerDisabled && !getDefaultSetting('disableWorker') && typeof Worker !== 'undefined') {
        var workerSrc = getWorkerSrc();
        try {
          if (!isSameOrigin(window.location.href, workerSrc)) {
            workerSrc = createCDNWrapper(new URL(workerSrc, window.location).href);
          }
          var worker = new Worker(workerSrc);
          var messageHandler = new MessageHandler('main', 'worker', worker);
          var terminateEarly = function () {
            worker.removeEventListener('error', onWorkerError);
            messageHandler.destroy();
            worker.terminate();
            if (this.destroyed) {
              this._readyCapability.reject(new Error('Worker was destroyed'));
            } else {
              this._setupFakeWorker();
            }
          }.bind(this);
          var onWorkerError = function (event) {
            if (!this._webWorker) {
              terminateEarly();
            }
          }.bind(this);
          worker.addEventListener('error', onWorkerError);
          messageHandler.on('test', function PDFWorker_test(data) {
            worker.removeEventListener('error', onWorkerError);
            if (this.destroyed) {
              terminateEarly();
              return;
            }
            var supportTypedArray = data && data.supportTypedArray;
            if (supportTypedArray) {
              this._messageHandler = messageHandler;
              this._port = worker;
              this._webWorker = worker;
              if (!data.supportTransfers) {
                isPostMessageTransfersDisabled = true;
              }
              this._readyCapability.resolve();
              messageHandler.send('configure', { verbosity: getVerbosityLevel() });
            } else {
              this._setupFakeWorker();
              messageHandler.destroy();
              worker.terminate();
            }
          }.bind(this));
          messageHandler.on('console_log', function (data) {
            console.log.apply(console, data);
          });
          messageHandler.on('console_error', function (data) {
            console.error.apply(console, data);
          });
          messageHandler.on('ready', function (data) {
            worker.removeEventListener('error', onWorkerError);
            if (this.destroyed) {
              terminateEarly();
              return;
            }
            try {
              sendTest();
            } catch (e) {
              this._setupFakeWorker();
            }
          }.bind(this));
          var sendTest = function () {
            var postMessageTransfers = getDefaultSetting('postMessageTransfers') && !isPostMessageTransfersDisabled;
            var testObj = new Uint8Array([postMessageTransfers ? 255 : 0]);
            try {
              messageHandler.send('test', testObj, [testObj.buffer]);
            } catch (ex) {
              info('Cannot use postMessage transfers');
              testObj[0] = 0;
              messageHandler.send('test', testObj);
            }
          };
          sendTest();
          return;
        } catch (e) {
          info('The worker has been disabled.');
        }
      }
      this._setupFakeWorker();
    },
    _setupFakeWorker: function PDFWorker_setupFakeWorker() {
      if (!isWorkerDisabled && !getDefaultSetting('disableWorker')) {
        warn('Setting up fake worker.');
        isWorkerDisabled = true;
      }
      setupFakeWorkerGlobal().then(function (WorkerMessageHandler) {
        if (this.destroyed) {
          this._readyCapability.reject(new Error('Worker was destroyed'));
          return;
        }
        var isTypedArraysPresent = Uint8Array !== Float32Array;
        var port = new FakeWorkerPort(isTypedArraysPresent);
        this._port = port;
        var id = 'fake' + nextFakeWorkerId++;
        var workerHandler = new MessageHandler(id + '_worker', id, port);
        WorkerMessageHandler.setup(workerHandler, port);
        var messageHandler = new MessageHandler(id, id + '_worker', port);
        this._messageHandler = messageHandler;
        this._readyCapability.resolve();
      }.bind(this));
    },
    destroy: function PDFWorker_destroy() {
      this.destroyed = true;
      if (this._webWorker) {
        this._webWorker.terminate();
        this._webWorker = null;
      }
      this._port = null;
      if (this._messageHandler) {
        this._messageHandler.destroy();
        this._messageHandler = null;
      }
    }
  };
  return PDFWorker;
}();
var WorkerTransport = function WorkerTransportClosure() {
  function WorkerTransport(messageHandler, loadingTask, pdfDataRangeTransport, CMapReaderFactory) {
    this.messageHandler = messageHandler;
    this.loadingTask = loadingTask;
    this.pdfDataRangeTransport = pdfDataRangeTransport;
    this.commonObjs = new PDFObjects();
    this.fontLoader = new FontLoader(loadingTask.docId);
    this.CMapReaderFactory = new CMapReaderFactory({
      baseUrl: getDefaultSetting('cMapUrl'),
      isCompressed: getDefaultSetting('cMapPacked')
    });
    this.destroyed = false;
    this.destroyCapability = null;
    this._passwordCapability = null;
    this.pageCache = [];
    this.pagePromises = [];
    this.downloadInfoCapability = createPromiseCapability();
    this.setupMessageHandler();
  }
  WorkerTransport.prototype = {
    destroy: function WorkerTransport_destroy() {
      if (this.destroyCapability) {
        return this.destroyCapability.promise;
      }
      this.destroyed = true;
      this.destroyCapability = createPromiseCapability();
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
      var self = this;
      var terminated = this.messageHandler.sendWithPromise('Terminate', null);
      waitOn.push(terminated);
      Promise.all(waitOn).then(function () {
        self.fontLoader.clear();
        if (self.pdfDataRangeTransport) {
          self.pdfDataRangeTransport.abort();
          self.pdfDataRangeTransport = null;
        }
        if (self.messageHandler) {
          self.messageHandler.destroy();
          self.messageHandler = null;
        }
        self.destroyCapability.resolve();
      }, this.destroyCapability.reject);
      return this.destroyCapability.promise;
    },
    setupMessageHandler: function WorkerTransport_setupMessageHandler() {
      var messageHandler = this.messageHandler;
      var loadingTask = this.loadingTask;
      var pdfDataRangeTransport = this.pdfDataRangeTransport;
      if (pdfDataRangeTransport) {
        pdfDataRangeTransport.addRangeListener(function (begin, chunk) {
          messageHandler.send('OnDataRange', {
            begin: begin,
            chunk: chunk
          });
        });
        pdfDataRangeTransport.addProgressListener(function (loaded) {
          messageHandler.send('OnDataProgress', { loaded: loaded });
        });
        pdfDataRangeTransport.addProgressiveReadListener(function (chunk) {
          messageHandler.send('OnDataRange', { chunk: chunk });
        });
        messageHandler.on('RequestDataRange', function transportDataRange(data) {
          pdfDataRangeTransport.requestDataRange(data.begin, data.end);
        }, this);
      }
      messageHandler.on('GetDoc', function transportDoc(data) {
        var pdfInfo = data.pdfInfo;
        this.numPages = data.pdfInfo.numPages;
        var loadingTask = this.loadingTask;
        var pdfDocument = new PDFDocumentProxy(pdfInfo, this, loadingTask);
        this.pdfDocument = pdfDocument;
        loadingTask._capability.resolve(pdfDocument);
      }, this);
      messageHandler.on('PasswordRequest', function transportPasswordRequest(exception) {
        this._passwordCapability = createPromiseCapability();
        if (loadingTask.onPassword) {
          var updatePassword = function (password) {
            this._passwordCapability.resolve({ password: password });
          }.bind(this);
          loadingTask.onPassword(updatePassword, exception.code);
        } else {
          this._passwordCapability.reject(new PasswordException(exception.message, exception.code));
        }
        return this._passwordCapability.promise;
      }, this);
      messageHandler.on('PasswordException', function transportPasswordException(exception) {
        loadingTask._capability.reject(new PasswordException(exception.message, exception.code));
      }, this);
      messageHandler.on('InvalidPDF', function transportInvalidPDF(exception) {
        this.loadingTask._capability.reject(new InvalidPDFException(exception.message));
      }, this);
      messageHandler.on('MissingPDF', function transportMissingPDF(exception) {
        this.loadingTask._capability.reject(new MissingPDFException(exception.message));
      }, this);
      messageHandler.on('UnexpectedResponse', function transportUnexpectedResponse(exception) {
        this.loadingTask._capability.reject(new UnexpectedResponseException(exception.message, exception.status));
      }, this);
      messageHandler.on('UnknownError', function transportUnknownError(exception) {
        this.loadingTask._capability.reject(new UnknownErrorException(exception.message, exception.details));
      }, this);
      messageHandler.on('DataLoaded', function transportPage(data) {
        this.downloadInfoCapability.resolve(data);
      }, this);
      messageHandler.on('PDFManagerReady', function transportPage(data) {
        if (this.pdfDataRangeTransport) {
          this.pdfDataRangeTransport.transportReady();
        }
      }, this);
      messageHandler.on('StartRenderPage', function transportRender(data) {
        if (this.destroyed) {
          return;
        }
        var page = this.pageCache[data.pageIndex];
        page.stats.timeEnd('Page Request');
        page._startRenderPage(data.transparency, data.intent);
      }, this);
      messageHandler.on('RenderPageChunk', function transportRender(data) {
        if (this.destroyed) {
          return;
        }
        var page = this.pageCache[data.pageIndex];
        page._renderPageChunk(data.operatorList, data.intent);
      }, this);
      messageHandler.on('commonobj', function transportObj(data) {
        if (this.destroyed) {
          return;
        }
        var id = data[0];
        var type = data[1];
        if (this.commonObjs.hasData(id)) {
          return;
        }
        switch (type) {
          case 'Font':
            var exportedData = data[2];
            if ('error' in exportedData) {
              var exportedError = exportedData.error;
              warn('Error during font loading: ' + exportedError);
              this.commonObjs.resolve(id, exportedError);
              break;
            }
            var fontRegistry = null;
            if (getDefaultSetting('pdfBug') && globalScope.FontInspector && globalScope['FontInspector'].enabled) {
              fontRegistry = {
                registerFont: function (font, url) {
                  globalScope['FontInspector'].fontAdded(font, url);
                }
              };
            }
            var font = new FontFaceObject(exportedData, {
              isEvalSuported: getDefaultSetting('isEvalSupported'),
              disableFontFace: getDefaultSetting('disableFontFace'),
              fontRegistry: fontRegistry
            });
            this.fontLoader.bind([font], function fontReady(fontObjs) {
              this.commonObjs.resolve(id, font);
            }.bind(this));
            break;
          case 'FontPath':
            this.commonObjs.resolve(id, data[2]);
            break;
          default:
            error('Got unknown common object type ' + type);
        }
      }, this);
      messageHandler.on('obj', function transportObj(data) {
        if (this.destroyed) {
          return;
        }
        var id = data[0];
        var pageIndex = data[1];
        var type = data[2];
        var pageProxy = this.pageCache[pageIndex];
        var imageData;
        if (pageProxy.objs.hasData(id)) {
          return;
        }
        switch (type) {
          case 'JpegStream':
            imageData = data[3];
            loadJpegStream(id, imageData, pageProxy.objs);
            break;
          case 'Image':
            imageData = data[3];
            pageProxy.objs.resolve(id, imageData);
            var MAX_IMAGE_SIZE_TO_STORE = 8000000;
            if (imageData && 'data' in imageData && imageData.data.length > MAX_IMAGE_SIZE_TO_STORE) {
              pageProxy.cleanupAfterRender = true;
            }
            break;
          default:
            error('Got unknown object type ' + type);
        }
      }, this);
      messageHandler.on('DocProgress', function transportDocProgress(data) {
        if (this.destroyed) {
          return;
        }
        var loadingTask = this.loadingTask;
        if (loadingTask.onProgress) {
          loadingTask.onProgress({
            loaded: data.loaded,
            total: data.total
          });
        }
      }, this);
      messageHandler.on('PageError', function transportError(data) {
        if (this.destroyed) {
          return;
        }
        var page = this.pageCache[data.pageNum - 1];
        var intentState = page.intentStates[data.intent];
        if (intentState.displayReadyCapability) {
          intentState.displayReadyCapability.reject(data.error);
        } else {
          error(data.error);
        }
        if (intentState.operatorList) {
          intentState.operatorList.lastChunk = true;
          for (var i = 0; i < intentState.renderTasks.length; i++) {
            intentState.renderTasks[i].operatorListChanged();
          }
        }
      }, this);
      messageHandler.on('UnsupportedFeature', function transportUnsupportedFeature(data) {
        if (this.destroyed) {
          return;
        }
        var featureId = data.featureId;
        var loadingTask = this.loadingTask;
        if (loadingTask.onUnsupportedFeature) {
          loadingTask.onUnsupportedFeature(featureId);
        }
        _UnsupportedManager.notify(featureId);
      }, this);
      messageHandler.on('JpegDecode', function (data) {
        if (this.destroyed) {
          return Promise.reject(new Error('Worker was destroyed'));
        }
        if (typeof document === 'undefined') {
          return Promise.reject(new Error('"document" is not defined.'));
        }
        var imageUrl = data[0];
        var components = data[1];
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
            var buf = new Uint8Array(size * components);
            var tmpCanvas = document.createElement('canvas');
            tmpCanvas.width = width;
            tmpCanvas.height = height;
            var tmpCtx = tmpCanvas.getContext('2d');
            tmpCtx.drawImage(img, 0, 0);
            var data = tmpCtx.getImageData(0, 0, width, height).data;
            var i, j;
            if (components === 3) {
              for (i = 0, j = 0; i < rgbaLength; i += 4, j += 3) {
                buf[j] = data[i];
                buf[j + 1] = data[i + 1];
                buf[j + 2] = data[i + 2];
              }
            } else if (components === 1) {
              for (i = 0, j = 0; i < rgbaLength; i += 4, j++) {
                buf[j] = data[i];
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
    },
    getData: function WorkerTransport_getData() {
      return this.messageHandler.sendWithPromise('GetData', null);
    },
    getPage: function WorkerTransport_getPage(pageNumber, capability) {
      if (!isInt(pageNumber) || pageNumber <= 0 || pageNumber > this.numPages) {
        return Promise.reject(new Error('Invalid page request'));
      }
      var pageIndex = pageNumber - 1;
      if (pageIndex in this.pagePromises) {
        return this.pagePromises[pageIndex];
      }
      var promise = this.messageHandler.sendWithPromise('GetPage', { pageIndex: pageIndex }).then(function (pageInfo) {
        if (this.destroyed) {
          throw new Error('Transport destroyed');
        }
        var page = new PDFPageProxy(pageIndex, pageInfo, this);
        this.pageCache[pageIndex] = page;
        return page;
      }.bind(this));
      this.pagePromises[pageIndex] = promise;
      return promise;
    },
    getPageIndex: function WorkerTransport_getPageIndexByRef(ref) {
      return this.messageHandler.sendWithPromise('GetPageIndex', { ref: ref }).catch(function (reason) {
        return Promise.reject(new Error(reason));
      });
    },
    getAnnotations: function WorkerTransport_getAnnotations(pageIndex, intent) {
      return this.messageHandler.sendWithPromise('GetAnnotations', {
        pageIndex: pageIndex,
        intent: intent
      });
    },
    getDestinations: function WorkerTransport_getDestinations() {
      return this.messageHandler.sendWithPromise('GetDestinations', null);
    },
    getDestination: function WorkerTransport_getDestination(id) {
      return this.messageHandler.sendWithPromise('GetDestination', { id: id });
    },
    getPageLabels: function WorkerTransport_getPageLabels() {
      return this.messageHandler.sendWithPromise('GetPageLabels', null);
    },
    getAttachments: function WorkerTransport_getAttachments() {
      return this.messageHandler.sendWithPromise('GetAttachments', null);
    },
    getJavaScript: function WorkerTransport_getJavaScript() {
      return this.messageHandler.sendWithPromise('GetJavaScript', null);
    },
    getOutline: function WorkerTransport_getOutline() {
      return this.messageHandler.sendWithPromise('GetOutline', null);
    },
    getMetadata: function WorkerTransport_getMetadata() {
      return this.messageHandler.sendWithPromise('GetMetadata', null).then(function transportMetadata(results) {
        return {
          info: results[0],
          metadata: results[1] ? new Metadata(results[1]) : null
        };
      });
    },
    getStats: function WorkerTransport_getStats() {
      return this.messageHandler.sendWithPromise('GetStats', null);
    },
    startCleanup: function WorkerTransport_startCleanup() {
      this.messageHandler.sendWithPromise('Cleanup', null).then(function endCleanup() {
        for (var i = 0, ii = this.pageCache.length; i < ii; i++) {
          var page = this.pageCache[i];
          if (page) {
            page.cleanup();
          }
        }
        this.commonObjs.clear();
        this.fontLoader.clear();
      }.bind(this));
    }
  };
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
        capability: createPromiseCapability(),
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
        error('Requesting object that isn\'t resolved yet ' + objId);
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
  function InternalRenderTask(callback, params, objs, commonObjs, operatorList, pageNumber, canvasFactory) {
    this.callback = callback;
    this.params = params;
    this.objs = objs;
    this.commonObjs = commonObjs;
    this.operatorListIdx = null;
    this.operatorList = operatorList;
    this.pageNumber = pageNumber;
    this.canvasFactory = canvasFactory;
    this.running = false;
    this.graphicsReadyCallback = null;
    this.graphicsReady = false;
    this.useRequestAnimationFrame = false;
    this.cancelled = false;
    this.capability = createPromiseCapability();
    this.task = new RenderTask(this);
    this._continueBound = this._continue.bind(this);
    this._scheduleNextBound = this._scheduleNext.bind(this);
    this._nextBound = this._next.bind(this);
  }
  InternalRenderTask.prototype = {
    initializeGraphics: function InternalRenderTask_initializeGraphics(transparency) {
      if (this.cancelled) {
        return;
      }
      if (getDefaultSetting('pdfBug') && globalScope.StepperManager && globalScope.StepperManager.enabled) {
        this.stepper = globalScope.StepperManager.create(this.pageNumber - 1);
        this.stepper.init(this.operatorList);
        this.stepper.nextBreakPoint = this.stepper.getNextBreakPoint();
      }
      var params = this.params;
      this.gfx = new CanvasGraphics(params.canvasContext, this.commonObjs, this.objs, this.canvasFactory, params.imageLayer);
      this.gfx.beginDrawing(params.transform, params.viewport, transparency);
      this.operatorListIdx = 0;
      this.graphicsReady = true;
      if (this.graphicsReadyCallback) {
        this.graphicsReadyCallback();
      }
    },
    cancel: function InternalRenderTask_cancel() {
      this.running = false;
      this.cancelled = true;
      if (getDefaultSetting('pdfjsNext')) {
        this.callback(new RenderingCancelledException('Rendering cancelled, page ' + this.pageNumber, 'canvas'));
      } else {
        this.callback('cancelled');
      }
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
      if (this.useRequestAnimationFrame && typeof window !== 'undefined') {
        window.requestAnimationFrame(this._nextBound);
      } else {
        Promise.resolve(undefined).then(this._nextBound);
      }
    },
    _next: function InternalRenderTask__next() {
      if (this.cancelled) {
        return;
      }
      this.operatorListIdx = this.gfx.executeOperatorList(this.operatorList, this.operatorListIdx, this._continueBound, this.stepper);
      if (this.operatorListIdx === this.operatorList.argsArray.length) {
        this.running = false;
        if (this.operatorList.lastChunk) {
          this.gfx.endDrawing();
          this.callback();
        }
      }
    }
  };
  return InternalRenderTask;
}();
var _UnsupportedManager = function UnsupportedManagerClosure() {
  var listeners = [];
  return {
    listen: function (cb) {
      deprecated('Global UnsupportedManager.listen is used: ' + ' use PDFDocumentLoadingTask.onUnsupportedFeature instead');
      listeners.push(cb);
    },
    notify: function (featureId) {
      for (var i = 0, ii = listeners.length; i < ii; i++) {
        listeners[i](featureId);
      }
    }
  };
}();
exports.version = '1.8.183';
exports.build = '22744655';
exports.getDocument = getDocument;
exports.PDFDataRangeTransport = PDFDataRangeTransport;
exports.PDFWorker = PDFWorker;
exports.PDFDocumentProxy = PDFDocumentProxy;
exports.PDFPageProxy = PDFPageProxy;
exports._UnsupportedManager = _UnsupportedManager;