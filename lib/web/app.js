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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFPrintServiceFactory = exports.DefaultExternalServices = exports.PDFViewerApplication = undefined;

var _ui_utils = require('./ui_utils');

var _pdfjs = require('./pdfjs');

var _pdf_rendering_queue = require('./pdf_rendering_queue');

var _pdf_sidebar = require('./pdf_sidebar');

var _pdf_viewer = require('./pdf_viewer');

var _dom_events = require('./dom_events');

var _hand_tool = require('./hand_tool');

var _overlay_manager = require('./overlay_manager');

var _password_prompt = require('./password_prompt');

var _pdf_attachment_viewer = require('./pdf_attachment_viewer');

var _pdf_document_properties = require('./pdf_document_properties');

var _pdf_find_bar = require('./pdf_find_bar');

var _pdf_find_controller = require('./pdf_find_controller');

var _pdf_history = require('./pdf_history');

var _pdf_link_service = require('./pdf_link_service');

var _pdf_outline_viewer = require('./pdf_outline_viewer');

var _pdf_presentation_mode = require('./pdf_presentation_mode');

var _pdf_thumbnail_viewer = require('./pdf_thumbnail_viewer');

var _secondary_toolbar = require('./secondary_toolbar');

var _toolbar = require('./toolbar');

var _view_history = require('./view_history');

var DEFAULT_SCALE_DELTA = 1.1;
var DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT = 5000;
function configure(PDFJS) {
  PDFJS.imageResourcesPath = './images/';
  PDFJS.workerSrc = '../build/pdf.worker.js';
  PDFJS.cMapUrl = '../web/cmaps/';
  PDFJS.cMapPacked = true;
}
var DefaultExternalServices = {
  updateFindControlState: function updateFindControlState(data) {},
  initPassiveLoading: function initPassiveLoading(callbacks) {},
  fallback: function fallback(data, callback) {},
  reportTelemetry: function reportTelemetry(data) {},
  createDownloadManager: function createDownloadManager() {
    throw new Error('Not implemented: createDownloadManager');
  },
  createPreferences: function createPreferences() {
    throw new Error('Not implemented: createPreferences');
  },

  supportsIntegratedFind: false,
  supportsDocumentFonts: true,
  supportsDocumentColors: true,
  supportedMouseWheelZoomModifierKeys: {
    ctrlKey: true,
    metaKey: true
  }
};
var PDFViewerApplication = {
  initialBookmark: document.location.hash.substring(1),
  initialDestination: null,
  initialized: false,
  fellback: false,
  appConfig: null,
  pdfDocument: null,
  pdfLoadingTask: null,
  printService: null,
  pdfViewer: null,
  pdfThumbnailViewer: null,
  pdfRenderingQueue: null,
  pdfPresentationMode: null,
  pdfDocumentProperties: null,
  pdfLinkService: null,
  pdfHistory: null,
  pdfSidebar: null,
  pdfOutlineViewer: null,
  pdfAttachmentViewer: null,
  store: null,
  downloadManager: null,
  preferences: null,
  toolbar: null,
  secondaryToolbar: null,
  eventBus: null,
  pageRotation: 0,
  isInitialViewSet: false,
  viewerPrefs: {
    sidebarViewOnLoad: _pdf_sidebar.SidebarView.NONE,
    pdfBugEnabled: false,
    showPreviousViewOnLoad: true,
    defaultZoomValue: '',
    disablePageLabels: false,
    renderer: 'canvas',
    enhanceTextSelection: false,
    renderInteractiveForms: false,
    enablePrintAutoRotate: false
  },
  isViewerEmbedded: window.parent !== window,
  url: '',
  baseUrl: '',
  externalServices: DefaultExternalServices,
  initialize: function pdfViewInitialize(appConfig) {
    var _this = this;

    this.preferences = this.externalServices.createPreferences();
    configure(_pdfjs.PDFJS);
    this.appConfig = appConfig;
    return this._readPreferences().then(function () {
      return _this._initializeViewerComponents();
    }).then(function () {
      _this.bindEvents();
      _this.bindWindowEvents();
      _ui_utils.localized.then(function () {
        _this.eventBus.dispatch('localized');
      });
      if (_this.isViewerEmbedded && !_pdfjs.PDFJS.isExternalLinkTargetSet()) {
        _pdfjs.PDFJS.externalLinkTarget = _pdfjs.PDFJS.LinkTarget.TOP;
      }
      _this.initialized = true;
    });
  },
  _readPreferences: function _readPreferences() {
    var preferences = this.preferences,
        viewerPrefs = this.viewerPrefs;

    return Promise.all([preferences.get('enableWebGL').then(function resolved(value) {
      _pdfjs.PDFJS.disableWebGL = !value;
    }), preferences.get('sidebarViewOnLoad').then(function resolved(value) {
      viewerPrefs['sidebarViewOnLoad'] = value;
    }), preferences.get('pdfBugEnabled').then(function resolved(value) {
      viewerPrefs['pdfBugEnabled'] = value;
    }), preferences.get('showPreviousViewOnLoad').then(function resolved(value) {
      viewerPrefs['showPreviousViewOnLoad'] = value;
    }), preferences.get('defaultZoomValue').then(function resolved(value) {
      viewerPrefs['defaultZoomValue'] = value;
    }), preferences.get('enhanceTextSelection').then(function resolved(value) {
      viewerPrefs['enhanceTextSelection'] = value;
    }), preferences.get('disableTextLayer').then(function resolved(value) {
      if (_pdfjs.PDFJS.disableTextLayer === true) {
        return;
      }
      _pdfjs.PDFJS.disableTextLayer = value;
    }), preferences.get('disableRange').then(function resolved(value) {
      if (_pdfjs.PDFJS.disableRange === true) {
        return;
      }
      _pdfjs.PDFJS.disableRange = value;
    }), preferences.get('disableStream').then(function resolved(value) {
      if (_pdfjs.PDFJS.disableStream === true) {
        return;
      }
      _pdfjs.PDFJS.disableStream = value;
    }), preferences.get('disableAutoFetch').then(function resolved(value) {
      _pdfjs.PDFJS.disableAutoFetch = value;
    }), preferences.get('disableFontFace').then(function resolved(value) {
      if (_pdfjs.PDFJS.disableFontFace === true) {
        return;
      }
      _pdfjs.PDFJS.disableFontFace = value;
    }), preferences.get('useOnlyCssZoom').then(function resolved(value) {
      _pdfjs.PDFJS.useOnlyCssZoom = value;
    }), preferences.get('externalLinkTarget').then(function resolved(value) {
      if (_pdfjs.PDFJS.isExternalLinkTargetSet()) {
        return;
      }
      _pdfjs.PDFJS.externalLinkTarget = value;
    }), preferences.get('renderer').then(function resolved(value) {
      viewerPrefs['renderer'] = value;
    }), preferences.get('renderInteractiveForms').then(function resolved(value) {
      viewerPrefs['renderInteractiveForms'] = value;
    }), preferences.get('disablePageLabels').then(function resolved(value) {
      viewerPrefs['disablePageLabels'] = value;
    }), preferences.get('enablePrintAutoRotate').then(function resolved(value) {
      viewerPrefs['enablePrintAutoRotate'] = value;
    })]).catch(function (reason) {});
  },
  _initializeViewerComponents: function _initializeViewerComponents() {
    var _this2 = this;

    var appConfig = this.appConfig;
    return new Promise(function (resolve, reject) {
      var eventBus = appConfig.eventBus || (0, _dom_events.getGlobalEventBus)();
      _this2.eventBus = eventBus;
      var pdfRenderingQueue = new _pdf_rendering_queue.PDFRenderingQueue();
      pdfRenderingQueue.onIdle = _this2.cleanup.bind(_this2);
      _this2.pdfRenderingQueue = pdfRenderingQueue;
      var pdfLinkService = new _pdf_link_service.PDFLinkService({ eventBus: eventBus });
      _this2.pdfLinkService = pdfLinkService;
      var downloadManager = _this2.externalServices.createDownloadManager();
      _this2.downloadManager = downloadManager;
      var container = appConfig.mainContainer;
      var viewer = appConfig.viewerContainer;
      _this2.pdfViewer = new _pdf_viewer.PDFViewer({
        container: container,
        viewer: viewer,
        eventBus: eventBus,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService,
        downloadManager: downloadManager,
        renderer: _this2.viewerPrefs['renderer'],
        enhanceTextSelection: _this2.viewerPrefs['enhanceTextSelection'],
        renderInteractiveForms: _this2.viewerPrefs['renderInteractiveForms'],
        enablePrintAutoRotate: _this2.viewerPrefs['enablePrintAutoRotate']
      });
      pdfRenderingQueue.setViewer(_this2.pdfViewer);
      pdfLinkService.setViewer(_this2.pdfViewer);
      var thumbnailContainer = appConfig.sidebar.thumbnailView;
      _this2.pdfThumbnailViewer = new _pdf_thumbnail_viewer.PDFThumbnailViewer({
        container: thumbnailContainer,
        renderingQueue: pdfRenderingQueue,
        linkService: pdfLinkService
      });
      pdfRenderingQueue.setThumbnailViewer(_this2.pdfThumbnailViewer);
      _this2.pdfHistory = new _pdf_history.PDFHistory({
        linkService: pdfLinkService,
        eventBus: eventBus
      });
      pdfLinkService.setHistory(_this2.pdfHistory);
      _this2.findController = new _pdf_find_controller.PDFFindController({ pdfViewer: _this2.pdfViewer });
      _this2.findController.onUpdateResultsCount = function (matchCount) {
        if (_this2.supportsIntegratedFind) {
          return;
        }
        _this2.findBar.updateResultsCount(matchCount);
      };
      _this2.findController.onUpdateState = function (state, previous, matchCount) {
        if (_this2.supportsIntegratedFind) {
          _this2.externalServices.updateFindControlState({
            result: state,
            findPrevious: previous
          });
        } else {
          _this2.findBar.updateUIState(state, previous, matchCount);
        }
      };
      _this2.pdfViewer.setFindController(_this2.findController);
      var findBarConfig = Object.create(appConfig.findBar);
      findBarConfig.findController = _this2.findController;
      findBarConfig.eventBus = eventBus;
      _this2.findBar = new _pdf_find_bar.PDFFindBar(findBarConfig);
      _this2.overlayManager = _overlay_manager.OverlayManager;
      _this2.handTool = new _hand_tool.HandTool({
        container: container,
        eventBus: eventBus,
        preferences: _this2.preferences
      });
      _this2.pdfDocumentProperties = new _pdf_document_properties.PDFDocumentProperties(appConfig.documentProperties);
      _this2.toolbar = new _toolbar.Toolbar(appConfig.toolbar, container, eventBus);
      _this2.secondaryToolbar = new _secondary_toolbar.SecondaryToolbar(appConfig.secondaryToolbar, container, eventBus);
      if (_this2.supportsFullscreen) {
        _this2.pdfPresentationMode = new _pdf_presentation_mode.PDFPresentationMode({
          container: container,
          viewer: viewer,
          pdfViewer: _this2.pdfViewer,
          eventBus: eventBus,
          contextMenuItems: appConfig.fullscreen
        });
      }
      _this2.passwordPrompt = new _password_prompt.PasswordPrompt(appConfig.passwordOverlay);
      _this2.pdfOutlineViewer = new _pdf_outline_viewer.PDFOutlineViewer({
        container: appConfig.sidebar.outlineView,
        eventBus: eventBus,
        linkService: pdfLinkService
      });
      _this2.pdfAttachmentViewer = new _pdf_attachment_viewer.PDFAttachmentViewer({
        container: appConfig.sidebar.attachmentsView,
        eventBus: eventBus,
        downloadManager: downloadManager
      });
      var sidebarConfig = Object.create(appConfig.sidebar);
      sidebarConfig.pdfViewer = _this2.pdfViewer;
      sidebarConfig.pdfThumbnailViewer = _this2.pdfThumbnailViewer;
      sidebarConfig.pdfOutlineViewer = _this2.pdfOutlineViewer;
      sidebarConfig.eventBus = eventBus;
      _this2.pdfSidebar = new _pdf_sidebar.PDFSidebar(sidebarConfig);
      _this2.pdfSidebar.onToggled = _this2.forceRendering.bind(_this2);
      resolve(undefined);
    });
  },

  run: function pdfViewRun(config) {
    this.initialize(config).then(webViewerInitialized);
  },
  zoomIn: function pdfViewZoomIn(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale * DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.ceil(newScale * 10) / 10;
      newScale = Math.min(_ui_utils.MAX_SCALE, newScale);
    } while (--ticks > 0 && newScale < _ui_utils.MAX_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },
  zoomOut: function pdfViewZoomOut(ticks) {
    var newScale = this.pdfViewer.currentScale;
    do {
      newScale = (newScale / DEFAULT_SCALE_DELTA).toFixed(2);
      newScale = Math.floor(newScale * 10) / 10;
      newScale = Math.max(_ui_utils.MIN_SCALE, newScale);
    } while (--ticks > 0 && newScale > _ui_utils.MIN_SCALE);
    this.pdfViewer.currentScaleValue = newScale;
  },
  get pagesCount() {
    return this.pdfDocument ? this.pdfDocument.numPages : 0;
  },
  set page(val) {
    this.pdfViewer.currentPageNumber = val;
  },
  get page() {
    return this.pdfViewer.currentPageNumber;
  },
  get printing() {
    return !!this.printService;
  },
  get supportsPrinting() {
    return PDFPrintServiceFactory.instance.supportsPrinting;
  },
  get supportsFullscreen() {
    var support;
    var doc = document.documentElement;
    support = !!(doc.requestFullscreen || doc.mozRequestFullScreen || doc.webkitRequestFullScreen || doc.msRequestFullscreen);
    if (document.fullscreenEnabled === false || document.mozFullScreenEnabled === false || document.webkitFullscreenEnabled === false || document.msFullscreenEnabled === false) {
      support = false;
    }
    if (support && _pdfjs.PDFJS.disableFullscreen === true) {
      support = false;
    }
    return (0, _pdfjs.shadow)(this, 'supportsFullscreen', support);
  },
  get supportsIntegratedFind() {
    return this.externalServices.supportsIntegratedFind;
  },
  get supportsDocumentFonts() {
    return this.externalServices.supportsDocumentFonts;
  },
  get supportsDocumentColors() {
    return this.externalServices.supportsDocumentColors;
  },
  get loadingBar() {
    var bar = new _ui_utils.ProgressBar('#loadingBar', {});
    return (0, _pdfjs.shadow)(this, 'loadingBar', bar);
  },
  get supportedMouseWheelZoomModifierKeys() {
    return this.externalServices.supportedMouseWheelZoomModifierKeys;
  },
  initPassiveLoading: function pdfViewInitPassiveLoading() {
    throw new Error('Not implemented: initPassiveLoading');
  },
  setTitleUsingUrl: function pdfViewSetTitleUsingUrl(url) {
    this.url = url;
    this.baseUrl = url.split('#')[0];
    var title = (0, _ui_utils.getPDFFileNameFromURL)(url, '');
    if (!title) {
      try {
        title = decodeURIComponent((0, _pdfjs.getFilenameFromUrl)(url)) || url;
      } catch (e) {
        title = url;
      }
    }
    this.setTitle(title);
  },
  setTitle: function pdfViewSetTitle(title) {
    if (this.isViewerEmbedded) {
      return;
    }
    document.title = title;
  },
  close: function pdfViewClose() {
    var errorWrapper = this.appConfig.errorWrapper.container;
    errorWrapper.setAttribute('hidden', 'true');
    if (!this.pdfLoadingTask) {
      return Promise.resolve();
    }
    var promise = this.pdfLoadingTask.destroy();
    this.pdfLoadingTask = null;
    if (this.pdfDocument) {
      this.pdfDocument = null;
      this.pdfThumbnailViewer.setDocument(null);
      this.pdfViewer.setDocument(null);
      this.pdfLinkService.setDocument(null, null);
      this.pdfDocumentProperties.setDocument(null, null);
    }
    this.store = null;
    this.isInitialViewSet = false;
    this.pdfSidebar.reset();
    this.pdfOutlineViewer.reset();
    this.pdfAttachmentViewer.reset();
    this.findController.reset();
    this.findBar.reset();
    this.toolbar.reset();
    this.secondaryToolbar.reset();
    if (typeof PDFBug !== 'undefined') {
      PDFBug.cleanup();
    }
    return promise;
  },
  open: function open(file, args) {
    var _this3 = this;

    if (arguments.length > 2 || typeof args === 'number') {
      return Promise.reject(new Error('Call of open() with obsolete signature.'));
    }
    if (this.pdfLoadingTask) {
      return this.close().then(function () {
        _this3.preferences.reload();
        return _this3.open(file, args);
      });
    }
    var parameters = Object.create(null),
        scale = void 0;
    if (typeof file === 'string') {
      this.setTitleUsingUrl(file);
      parameters.url = file;
    } else if (file && 'byteLength' in file) {
      parameters.data = file;
    } else if (file.url && file.originalUrl) {
      this.setTitleUsingUrl(file.originalUrl);
      parameters.url = file.url;
    }
    if (args) {
      for (var prop in args) {
        parameters[prop] = args[prop];
      }
      if (args.scale) {
        scale = args.scale;
      }
      if (args.length) {
        this.pdfDocumentProperties.setFileSize(args.length);
      }
    }
    this.downloadComplete = false;
    var loadingTask = (0, _pdfjs.getDocument)(parameters);
    this.pdfLoadingTask = loadingTask;
    loadingTask.onPassword = function (updateCallback, reason) {
      _this3.passwordPrompt.setUpdateCallback(updateCallback, reason);
      _this3.passwordPrompt.open();
    };
    loadingTask.onProgress = function (_ref) {
      var loaded = _ref.loaded,
          total = _ref.total;

      _this3.progress(loaded / total);
    };
    loadingTask.onUnsupportedFeature = this.fallback.bind(this);
    return loadingTask.promise.then(function (pdfDocument) {
      _this3.load(pdfDocument, scale);
    }, function (exception) {
      var message = exception && exception.message;
      var loadingErrorMessage = _ui_utils.mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
      if (exception instanceof _pdfjs.InvalidPDFException) {
        loadingErrorMessage = _ui_utils.mozL10n.get('invalid_file_error', null, 'Invalid or corrupted PDF file.');
      } else if (exception instanceof _pdfjs.MissingPDFException) {
        loadingErrorMessage = _ui_utils.mozL10n.get('missing_file_error', null, 'Missing PDF file.');
      } else if (exception instanceof _pdfjs.UnexpectedResponseException) {
        loadingErrorMessage = _ui_utils.mozL10n.get('unexpected_response_error', null, 'Unexpected server response.');
      }
      _this3.error(loadingErrorMessage, { message: message });
      throw new Error(loadingErrorMessage);
    });
  },

  download: function pdfViewDownload() {
    function downloadByUrl() {
      downloadManager.downloadUrl(url, filename);
    }
    var url = this.baseUrl;
    var filename = (0, _ui_utils.getPDFFileNameFromURL)(this.url);
    var downloadManager = this.downloadManager;
    downloadManager.onerror = function (err) {
      PDFViewerApplication.error('PDF failed to download.');
    };
    if (!this.pdfDocument) {
      downloadByUrl();
      return;
    }
    if (!this.downloadComplete) {
      downloadByUrl();
      return;
    }
    this.pdfDocument.getData().then(function getDataSuccess(data) {
      var blob = (0, _pdfjs.createBlob)(data, 'application/pdf');
      downloadManager.download(blob, url, filename);
    }, downloadByUrl).then(null, downloadByUrl);
  },
  fallback: function pdfViewFallback(featureId) {},
  error: function pdfViewError(message, moreInfo) {
    var moreInfoText = _ui_utils.mozL10n.get('error_version_info', {
      version: _pdfjs.version || '?',
      build: _pdfjs.build || '?'
    }, 'PDF.js v{{version}} (build: {{build}})') + '\n';
    if (moreInfo) {
      moreInfoText += _ui_utils.mozL10n.get('error_message', { message: moreInfo.message }, 'Message: {{message}}');
      if (moreInfo.stack) {
        moreInfoText += '\n' + _ui_utils.mozL10n.get('error_stack', { stack: moreInfo.stack }, 'Stack: {{stack}}');
      } else {
        if (moreInfo.filename) {
          moreInfoText += '\n' + _ui_utils.mozL10n.get('error_file', { file: moreInfo.filename }, 'File: {{file}}');
        }
        if (moreInfo.lineNumber) {
          moreInfoText += '\n' + _ui_utils.mozL10n.get('error_line', { line: moreInfo.lineNumber }, 'Line: {{line}}');
        }
      }
    }
    var errorWrapperConfig = this.appConfig.errorWrapper;
    var errorWrapper = errorWrapperConfig.container;
    errorWrapper.removeAttribute('hidden');
    var errorMessage = errorWrapperConfig.errorMessage;
    errorMessage.textContent = message;
    var closeButton = errorWrapperConfig.closeButton;
    closeButton.onclick = function () {
      errorWrapper.setAttribute('hidden', 'true');
    };
    var errorMoreInfo = errorWrapperConfig.errorMoreInfo;
    var moreInfoButton = errorWrapperConfig.moreInfoButton;
    var lessInfoButton = errorWrapperConfig.lessInfoButton;
    moreInfoButton.onclick = function () {
      errorMoreInfo.removeAttribute('hidden');
      moreInfoButton.setAttribute('hidden', 'true');
      lessInfoButton.removeAttribute('hidden');
      errorMoreInfo.style.height = errorMoreInfo.scrollHeight + 'px';
    };
    lessInfoButton.onclick = function () {
      errorMoreInfo.setAttribute('hidden', 'true');
      moreInfoButton.removeAttribute('hidden');
      lessInfoButton.setAttribute('hidden', 'true');
    };
    moreInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    lessInfoButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    closeButton.oncontextmenu = _ui_utils.noContextMenuHandler;
    moreInfoButton.removeAttribute('hidden');
    lessInfoButton.setAttribute('hidden', 'true');
    errorMoreInfo.value = moreInfoText;
  },
  progress: function pdfViewProgress(level) {
    var _this4 = this;

    var percent = Math.round(level * 100);
    if (percent > this.loadingBar.percent || isNaN(percent)) {
      this.loadingBar.percent = percent;
      if (_pdfjs.PDFJS.disableAutoFetch && percent) {
        if (this.disableAutoFetchLoadingBarTimeout) {
          clearTimeout(this.disableAutoFetchLoadingBarTimeout);
          this.disableAutoFetchLoadingBarTimeout = null;
        }
        this.loadingBar.show();
        this.disableAutoFetchLoadingBarTimeout = setTimeout(function () {
          _this4.loadingBar.hide();
          _this4.disableAutoFetchLoadingBarTimeout = null;
        }, DISABLE_AUTO_FETCH_LOADING_BAR_TIMEOUT);
      }
    }
  },
  load: function load(pdfDocument, scale) {
    var _this5 = this;

    scale = scale || _ui_utils.UNKNOWN_SCALE;
    this.pdfDocument = pdfDocument;
    pdfDocument.getDownloadInfo().then(function () {
      _this5.downloadComplete = true;
      _this5.loadingBar.hide();
      firstPagePromise.then(function () {
        _this5.eventBus.dispatch('documentload', { source: _this5 });
      });
    });
    this.toolbar.setPagesCount(pdfDocument.numPages, false);
    this.secondaryToolbar.setPagesCount(pdfDocument.numPages);
    var id = this.documentFingerprint = pdfDocument.fingerprint;
    var store = this.store = new _view_history.ViewHistory(id);
    var baseDocumentUrl = void 0;
    baseDocumentUrl = null;
    this.pdfLinkService.setDocument(pdfDocument, baseDocumentUrl);
    this.pdfDocumentProperties.setDocument(pdfDocument, this.url);
    var pdfViewer = this.pdfViewer;
    pdfViewer.currentScale = scale;
    pdfViewer.setDocument(pdfDocument);
    var firstPagePromise = pdfViewer.firstPagePromise;
    var pagesPromise = pdfViewer.pagesPromise;
    var onePageRendered = pdfViewer.onePageRendered;
    this.pageRotation = 0;
    var pdfThumbnailViewer = this.pdfThumbnailViewer;
    pdfThumbnailViewer.setDocument(pdfDocument);
    firstPagePromise.then(function (pdfPage) {
      _this5.loadingBar.setWidth(_this5.appConfig.viewerContainer);
      if (!_pdfjs.PDFJS.disableHistory && !_this5.isViewerEmbedded) {
        if (!_this5.viewerPrefs['showPreviousViewOnLoad']) {
          _this5.pdfHistory.clearHistoryState();
        }
        _this5.pdfHistory.initialize(_this5.documentFingerprint);
        if (_this5.pdfHistory.initialDestination) {
          _this5.initialDestination = _this5.pdfHistory.initialDestination;
        } else if (_this5.pdfHistory.initialBookmark) {
          _this5.initialBookmark = _this5.pdfHistory.initialBookmark;
        }
      }
      var initialParams = {
        destination: _this5.initialDestination,
        bookmark: _this5.initialBookmark,
        hash: null
      };
      var storedHash = _this5.viewerPrefs['defaultZoomValue'] ? 'zoom=' + _this5.viewerPrefs['defaultZoomValue'] : null;
      var sidebarView = _this5.viewerPrefs['sidebarViewOnLoad'];
      new Promise(function (resolve, reject) {
        if (!_this5.viewerPrefs['showPreviousViewOnLoad']) {
          resolve();
          return;
        }
        store.getMultiple({
          exists: false,
          page: '1',
          zoom: _ui_utils.DEFAULT_SCALE_VALUE,
          scrollLeft: '0',
          scrollTop: '0',
          sidebarView: _pdf_sidebar.SidebarView.NONE
        }).then(function (values) {
          if (!values.exists) {
            resolve();
            return;
          }
          storedHash = 'page=' + values.page + '&zoom=' + (_this5.viewerPrefs['defaultZoomValue'] || values.zoom) + ',' + values.scrollLeft + ',' + values.scrollTop;
          sidebarView = _this5.viewerPrefs['sidebarViewOnLoad'] || values.sidebarView | 0;
          resolve();
        }).catch(function () {
          resolve();
        });
      }).then(function () {
        _this5.setInitialView(storedHash, {
          sidebarView: sidebarView,
          scale: scale
        });
        initialParams.hash = storedHash;
        if (!_this5.isViewerEmbedded) {
          _this5.pdfViewer.focus();
        }
        return pagesPromise;
      }).then(function () {
        if (!initialParams.destination && !initialParams.bookmark && !initialParams.hash) {
          return;
        }
        if (_this5.hasEqualPageSizes) {
          return;
        }
        _this5.initialDestination = initialParams.destination;
        _this5.initialBookmark = initialParams.bookmark;
        _this5.pdfViewer.currentScaleValue = _this5.pdfViewer.currentScaleValue;
        _this5.setInitialView(initialParams.hash);
      });
    });
    pdfDocument.getPageLabels().then(function (labels) {
      if (!labels || _this5.viewerPrefs['disablePageLabels']) {
        return;
      }
      var i = 0,
          numLabels = labels.length;
      if (numLabels !== _this5.pagesCount) {
        console.error('The number of Page Labels does not match ' + 'the number of pages in the document.');
        return;
      }
      while (i < numLabels && labels[i] === (i + 1).toString()) {
        i++;
      }
      if (i === numLabels) {
        return;
      }
      pdfViewer.setPageLabels(labels);
      pdfThumbnailViewer.setPageLabels(labels);
      _this5.toolbar.setPagesCount(pdfDocument.numPages, true);
      _this5.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
    });
    pagesPromise.then(function () {
      if (!_this5.supportsPrinting) {
        return;
      }
      pdfDocument.getJavaScript().then(function (javaScript) {
        if (javaScript.length) {
          console.warn('Warning: JavaScript is not supported');
          _this5.fallback(_pdfjs.UNSUPPORTED_FEATURES.javaScript);
        }
        var regex = /\bprint\s*\(/;
        for (var i = 0, ii = javaScript.length; i < ii; i++) {
          var js = javaScript[i];
          if (js && regex.test(js)) {
            setTimeout(function () {
              window.print();
            });
            return;
          }
        }
      });
    });
    Promise.all([onePageRendered, _ui_utils.animationStarted]).then(function () {
      pdfDocument.getOutline().then(function (outline) {
        _this5.pdfOutlineViewer.render({ outline: outline });
      });
      pdfDocument.getAttachments().then(function (attachments) {
        _this5.pdfAttachmentViewer.render({ attachments: attachments });
      });
    });
    pdfDocument.getMetadata().then(function (_ref2) {
      var info = _ref2.info,
          metadata = _ref2.metadata;

      _this5.documentInfo = info;
      _this5.metadata = metadata;
      console.log('PDF ' + pdfDocument.fingerprint + ' [' + info.PDFFormatVersion + ' ' + (info.Producer || '-').trim() + ' / ' + (info.Creator || '-').trim() + ']' + ' (PDF.js: ' + (_pdfjs.version || '-') + (!_pdfjs.PDFJS.disableWebGL ? ' [WebGL]' : '') + ')');
      var pdfTitle = void 0;
      if (metadata && metadata.has('dc:title')) {
        var title = metadata.get('dc:title');
        if (title !== 'Untitled') {
          pdfTitle = title;
        }
      }
      if (!pdfTitle && info && info['Title']) {
        pdfTitle = info['Title'];
      }
      if (pdfTitle) {
        _this5.setTitle(pdfTitle + ' - ' + document.title);
      }
      if (info.IsAcroFormPresent) {
        console.warn('Warning: AcroForm/XFA is not supported');
        _this5.fallback(_pdfjs.UNSUPPORTED_FEATURES.forms);
      }
    });
  },
  setInitialView: function setInitialView(storedHash) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$scale = options.scale,
        scale = _options$scale === undefined ? 0 : _options$scale,
        _options$sidebarView = options.sidebarView,
        sidebarView = _options$sidebarView === undefined ? _pdf_sidebar.SidebarView.NONE : _options$sidebarView;

    this.isInitialViewSet = true;
    this.pdfSidebar.setInitialView(sidebarView);
    if (this.initialDestination) {
      this.pdfLinkService.navigateTo(this.initialDestination);
      this.initialDestination = null;
    } else if (this.initialBookmark) {
      this.pdfLinkService.setHash(this.initialBookmark);
      this.pdfHistory.push({ hash: this.initialBookmark }, true);
      this.initialBookmark = null;
    } else if (storedHash) {
      this.pdfLinkService.setHash(storedHash);
    } else if (scale) {
      this.pdfViewer.currentScaleValue = scale;
      this.page = 1;
    }
    this.toolbar.setPageNumber(this.pdfViewer.currentPageNumber, this.pdfViewer.currentPageLabel);
    this.secondaryToolbar.setPageNumber(this.pdfViewer.currentPageNumber);
    if (!this.pdfViewer.currentScaleValue) {
      this.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
    }
  },

  cleanup: function pdfViewCleanup() {
    if (!this.pdfDocument) {
      return;
    }
    this.pdfViewer.cleanup();
    this.pdfThumbnailViewer.cleanup();
    if (this.pdfViewer.renderer !== _ui_utils.RendererType.SVG) {
      this.pdfDocument.cleanup();
    }
  },
  forceRendering: function pdfViewForceRendering() {
    this.pdfRenderingQueue.printing = this.printing;
    this.pdfRenderingQueue.isThumbnailViewEnabled = this.pdfSidebar.isThumbnailViewVisible;
    this.pdfRenderingQueue.renderHighestPriority();
  },
  beforePrint: function pdfViewSetupBeforePrint() {
    if (this.printService) {
      return;
    }
    if (!this.supportsPrinting) {
      var printMessage = _ui_utils.mozL10n.get('printing_not_supported', null, 'Warning: Printing is not fully supported by this browser.');
      this.error(printMessage);
      return;
    }
    if (!this.pdfViewer.pageViewsReady) {
      var notReadyMessage = _ui_utils.mozL10n.get('printing_not_ready', null, 'Warning: The PDF is not fully loaded for printing.');
      window.alert(notReadyMessage);
      return;
    }
    var pagesOverview = this.pdfViewer.getPagesOverview();
    var printContainer = this.appConfig.printContainer;
    var printService = PDFPrintServiceFactory.instance.createPrintService(this.pdfDocument, pagesOverview, printContainer);
    this.printService = printService;
    this.forceRendering();
    printService.layout();
  },
  get hasEqualPageSizes() {
    var firstPage = this.pdfViewer.getPageView(0);
    for (var i = 1, ii = this.pagesCount; i < ii; ++i) {
      var pageView = this.pdfViewer.getPageView(i);
      if (pageView.width !== firstPage.width || pageView.height !== firstPage.height) {
        return false;
      }
    }
    return true;
  },
  afterPrint: function pdfViewSetupAfterPrint() {
    if (this.printService) {
      this.printService.destroy();
      this.printService = null;
    }
    this.forceRendering();
  },
  rotatePages: function pdfViewRotatePages(delta) {
    var pageNumber = this.page;
    this.pageRotation = (this.pageRotation + 360 + delta) % 360;
    this.pdfViewer.pagesRotation = this.pageRotation;
    this.pdfThumbnailViewer.pagesRotation = this.pageRotation;
    this.forceRendering();
    this.pdfViewer.currentPageNumber = pageNumber;
  },
  requestPresentationMode: function pdfViewRequestPresentationMode() {
    if (!this.pdfPresentationMode) {
      return;
    }
    this.pdfPresentationMode.request();
  },
  bindEvents: function pdfViewBindEvents() {
    var eventBus = this.eventBus;
    eventBus.on('resize', webViewerResize);
    eventBus.on('hashchange', webViewerHashchange);
    eventBus.on('beforeprint', this.beforePrint.bind(this));
    eventBus.on('afterprint', this.afterPrint.bind(this));
    eventBus.on('pagerendered', webViewerPageRendered);
    eventBus.on('textlayerrendered', webViewerTextLayerRendered);
    eventBus.on('updateviewarea', webViewerUpdateViewarea);
    eventBus.on('pagechanging', webViewerPageChanging);
    eventBus.on('scalechanging', webViewerScaleChanging);
    eventBus.on('sidebarviewchanged', webViewerSidebarViewChanged);
    eventBus.on('pagemode', webViewerPageMode);
    eventBus.on('namedaction', webViewerNamedAction);
    eventBus.on('presentationmodechanged', webViewerPresentationModeChanged);
    eventBus.on('presentationmode', webViewerPresentationMode);
    eventBus.on('openfile', webViewerOpenFile);
    eventBus.on('print', webViewerPrint);
    eventBus.on('download', webViewerDownload);
    eventBus.on('firstpage', webViewerFirstPage);
    eventBus.on('lastpage', webViewerLastPage);
    eventBus.on('nextpage', webViewerNextPage);
    eventBus.on('previouspage', webViewerPreviousPage);
    eventBus.on('zoomin', webViewerZoomIn);
    eventBus.on('zoomout', webViewerZoomOut);
    eventBus.on('pagenumberchanged', webViewerPageNumberChanged);
    eventBus.on('scalechanged', webViewerScaleChanged);
    eventBus.on('rotatecw', webViewerRotateCw);
    eventBus.on('rotateccw', webViewerRotateCcw);
    eventBus.on('documentproperties', webViewerDocumentProperties);
    eventBus.on('find', webViewerFind);
    eventBus.on('findfromurlhash', webViewerFindFromUrlHash);
    eventBus.on('fileinputchange', webViewerFileInputChange);
  },
  bindWindowEvents: function pdfViewBindWindowEvents() {
    var eventBus = this.eventBus;
    window.addEventListener('wheel', webViewerWheel);
    window.addEventListener('click', webViewerClick);
    window.addEventListener('keydown', webViewerKeyDown);
    window.addEventListener('resize', function windowResize() {
      eventBus.dispatch('resize');
    });
    window.addEventListener('hashchange', function windowHashChange() {
      eventBus.dispatch('hashchange', { hash: document.location.hash.substring(1) });
    });
    window.addEventListener('beforeprint', function windowBeforePrint() {
      eventBus.dispatch('beforeprint');
    });
    window.addEventListener('afterprint', function windowAfterPrint() {
      eventBus.dispatch('afterprint');
    });
    window.addEventListener('change', function windowChange(evt) {
      var files = evt.target.files;
      if (!files || files.length === 0) {
        return;
      }
      eventBus.dispatch('fileinputchange', { fileInput: evt.target });
    });
  }
};
var validateFileURL;
{
  var HOSTED_VIEWER_ORIGINS = ['null', 'http://mozilla.github.io', 'https://mozilla.github.io'];
  validateFileURL = function validateFileURL(file) {
    try {
      var viewerOrigin = new URL(window.location.href).origin || 'null';
      if (HOSTED_VIEWER_ORIGINS.indexOf(viewerOrigin) >= 0) {
        return;
      }
      var fileOrigin = new URL(file, window.location.href).origin;
      if (fileOrigin !== viewerOrigin) {
        throw new Error('file origin does not match viewer\'s');
      }
    } catch (e) {
      var message = e && e.message;
      var loadingErrorMessage = _ui_utils.mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.');
      var moreInfo = { message: message };
      PDFViewerApplication.error(loadingErrorMessage, moreInfo);
      throw e;
    }
  };
}
function loadAndEnablePDFBug(enabledTabs) {
  return new Promise(function (resolve, reject) {
    var appConfig = PDFViewerApplication.appConfig;
    var script = document.createElement('script');
    script.src = appConfig.debuggerScriptPath;
    script.onload = function () {
      PDFBug.enable(enabledTabs);
      PDFBug.init({
        PDFJS: _pdfjs.PDFJS,
        OPS: _pdfjs.OPS
      }, appConfig.mainContainer);
      resolve();
    };
    script.onerror = function () {
      reject(new Error('Cannot load debugger at ' + script.src));
    };
    (document.getElementsByTagName('head')[0] || document.body).appendChild(script);
  });
}
function webViewerInitialized() {
  var appConfig = PDFViewerApplication.appConfig;
  var file;
  var queryString = document.location.search.substring(1);
  var params = (0, _ui_utils.parseQueryString)(queryString);
  file = 'file' in params ? params.file : appConfig.defaultUrl;
  validateFileURL(file);
  var waitForBeforeOpening = [];
  var fileInput = document.createElement('input');
  fileInput.id = appConfig.openFileInputName;
  fileInput.className = 'fileInput';
  fileInput.setAttribute('type', 'file');
  fileInput.oncontextmenu = _ui_utils.noContextMenuHandler;
  document.body.appendChild(fileInput);
  if (!window.File || !window.FileReader || !window.FileList || !window.Blob) {
    appConfig.toolbar.openFile.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.openFileButton.setAttribute('hidden', 'true');
  } else {
    fileInput.value = null;
  }
  if (PDFViewerApplication.viewerPrefs['pdfBugEnabled']) {
    var hash = document.location.hash.substring(1);
    var hashParams = (0, _ui_utils.parseQueryString)(hash);
    if ('disableworker' in hashParams) {
      _pdfjs.PDFJS.disableWorker = hashParams['disableworker'] === 'true';
    }
    if ('disablerange' in hashParams) {
      _pdfjs.PDFJS.disableRange = hashParams['disablerange'] === 'true';
    }
    if ('disablestream' in hashParams) {
      _pdfjs.PDFJS.disableStream = hashParams['disablestream'] === 'true';
    }
    if ('disableautofetch' in hashParams) {
      _pdfjs.PDFJS.disableAutoFetch = hashParams['disableautofetch'] === 'true';
    }
    if ('disablefontface' in hashParams) {
      _pdfjs.PDFJS.disableFontFace = hashParams['disablefontface'] === 'true';
    }
    if ('disablehistory' in hashParams) {
      _pdfjs.PDFJS.disableHistory = hashParams['disablehistory'] === 'true';
    }
    if ('webgl' in hashParams) {
      _pdfjs.PDFJS.disableWebGL = hashParams['webgl'] !== 'true';
    }
    if ('useonlycsszoom' in hashParams) {
      _pdfjs.PDFJS.useOnlyCssZoom = hashParams['useonlycsszoom'] === 'true';
    }
    if ('verbosity' in hashParams) {
      _pdfjs.PDFJS.verbosity = hashParams['verbosity'] | 0;
    }
    if ('ignorecurrentpositiononzoom' in hashParams) {
      _pdfjs.PDFJS.ignoreCurrentPositionOnZoom = hashParams['ignorecurrentpositiononzoom'] === 'true';
    }
    if ('locale' in hashParams) {
      _pdfjs.PDFJS.locale = hashParams['locale'];
    }
    if ('textlayer' in hashParams) {
      switch (hashParams['textlayer']) {
        case 'off':
          _pdfjs.PDFJS.disableTextLayer = true;
          break;
        case 'visible':
        case 'shadow':
        case 'hover':
          var viewer = appConfig.viewerContainer;
          viewer.classList.add('textLayer-' + hashParams['textlayer']);
          break;
      }
    }
    if ('pdfbug' in hashParams) {
      _pdfjs.PDFJS.pdfBug = true;
      var pdfBug = hashParams['pdfbug'];
      var enabled = pdfBug.split(',');
      waitForBeforeOpening.push(loadAndEnablePDFBug(enabled));
    }
  }
  _ui_utils.mozL10n.setLanguage(_pdfjs.PDFJS.locale);
  if (!PDFViewerApplication.supportsPrinting) {
    appConfig.toolbar.print.classList.add('hidden');
    appConfig.secondaryToolbar.printButton.classList.add('hidden');
  }
  if (!PDFViewerApplication.supportsFullscreen) {
    appConfig.toolbar.presentationModeButton.classList.add('hidden');
    appConfig.secondaryToolbar.presentationModeButton.classList.add('hidden');
  }
  if (PDFViewerApplication.supportsIntegratedFind) {
    appConfig.toolbar.viewFind.classList.add('hidden');
  }
  appConfig.sidebar.mainContainer.addEventListener('transitionend', function (e) {
    if (e.target === this) {
      PDFViewerApplication.eventBus.dispatch('resize');
    }
  }, true);
  appConfig.sidebar.toggleButton.addEventListener('click', function () {
    PDFViewerApplication.pdfSidebar.toggle();
  });
  Promise.all(waitForBeforeOpening).then(function () {
    webViewerOpenFileViaURL(file);
  }).catch(function (reason) {
    PDFViewerApplication.error(_ui_utils.mozL10n.get('loading_error', null, 'An error occurred while opening.'), reason);
  });
}
var webViewerOpenFileViaURL;
{
  webViewerOpenFileViaURL = function webViewerOpenFileViaURL(file) {
    if (file && file.lastIndexOf('file:', 0) === 0) {
      PDFViewerApplication.setTitleUsingUrl(file);
      var xhr = new XMLHttpRequest();
      xhr.onload = function () {
        PDFViewerApplication.open(new Uint8Array(xhr.response));
      };
      try {
        xhr.open('GET', file);
        xhr.responseType = 'arraybuffer';
        xhr.send();
      } catch (e) {
        PDFViewerApplication.error(_ui_utils.mozL10n.get('loading_error', null, 'An error occurred while loading the PDF.'), e);
      }
      return;
    }
    if (file) {
      PDFViewerApplication.open(file);
    }
  };
}
function webViewerPageRendered(e) {
  var pageNumber = e.pageNumber;
  var pageIndex = pageNumber - 1;
  var pageView = PDFViewerApplication.pdfViewer.getPageView(pageIndex);
  if (pageNumber === PDFViewerApplication.page) {
    PDFViewerApplication.toolbar.updateLoadingIndicatorState(false);
  }
  if (!pageView) {
    return;
  }
  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    var thumbnailView = PDFViewerApplication.pdfThumbnailViewer.getThumbnail(pageIndex);
    thumbnailView.setImage(pageView);
  }
  if (_pdfjs.PDFJS.pdfBug && Stats.enabled && pageView.stats) {
    Stats.add(pageNumber, pageView.stats);
  }
  if (pageView.error) {
    PDFViewerApplication.error(_ui_utils.mozL10n.get('rendering_error', null, 'An error occurred while rendering the page.'), pageView.error);
  }
}
function webViewerTextLayerRendered(e) {}
function webViewerPageMode(e) {
  var mode = e.mode,
      view;
  switch (mode) {
    case 'thumbs':
      view = _pdf_sidebar.SidebarView.THUMBS;
      break;
    case 'bookmarks':
    case 'outline':
      view = _pdf_sidebar.SidebarView.OUTLINE;
      break;
    case 'attachments':
      view = _pdf_sidebar.SidebarView.ATTACHMENTS;
      break;
    case 'none':
      view = _pdf_sidebar.SidebarView.NONE;
      break;
    default:
      console.error('Invalid "pagemode" hash parameter: ' + mode);
      return;
  }
  PDFViewerApplication.pdfSidebar.switchView(view, true);
}
function webViewerNamedAction(e) {
  var action = e.action;
  switch (action) {
    case 'GoToPage':
      PDFViewerApplication.appConfig.toolbar.pageNumber.select();
      break;
    case 'Find':
      if (!PDFViewerApplication.supportsIntegratedFind) {
        PDFViewerApplication.findBar.toggle();
      }
      break;
  }
}
function webViewerPresentationModeChanged(e) {
  var active = e.active;
  var switchInProgress = e.switchInProgress;
  PDFViewerApplication.pdfViewer.presentationModeState = switchInProgress ? _pdf_viewer.PresentationModeState.CHANGING : active ? _pdf_viewer.PresentationModeState.FULLSCREEN : _pdf_viewer.PresentationModeState.NORMAL;
}
function webViewerSidebarViewChanged(evt) {
  PDFViewerApplication.pdfRenderingQueue.isThumbnailViewEnabled = PDFViewerApplication.pdfSidebar.isThumbnailViewVisible;
  var store = PDFViewerApplication.store;
  if (store && PDFViewerApplication.isInitialViewSet) {
    store.set('sidebarView', evt.view).catch(function () {});
  }
}
function webViewerUpdateViewarea(evt) {
  var location = evt.location,
      store = PDFViewerApplication.store;
  if (store && PDFViewerApplication.isInitialViewSet) {
    store.setMultiple({
      'exists': true,
      'page': location.pageNumber,
      'zoom': location.scale,
      'scrollLeft': location.left,
      'scrollTop': location.top
    }).catch(function () {});
  }
  var href = PDFViewerApplication.pdfLinkService.getAnchorUrl(location.pdfOpenParams);
  PDFViewerApplication.appConfig.toolbar.viewBookmark.href = href;
  PDFViewerApplication.appConfig.secondaryToolbar.viewBookmarkButton.href = href;
  PDFViewerApplication.pdfHistory.updateCurrentBookmark(location.pdfOpenParams, location.pageNumber);
  var currentPage = PDFViewerApplication.pdfViewer.getPageView(PDFViewerApplication.page - 1);
  var loading = currentPage.renderingState !== _pdf_rendering_queue.RenderingStates.FINISHED;
  PDFViewerApplication.toolbar.updateLoadingIndicatorState(loading);
}
function webViewerResize() {
  var currentScaleValue = PDFViewerApplication.pdfViewer.currentScaleValue;
  if (currentScaleValue === 'auto' || currentScaleValue === 'page-fit' || currentScaleValue === 'page-width') {
    PDFViewerApplication.pdfViewer.currentScaleValue = currentScaleValue;
  } else if (!currentScaleValue) {
    PDFViewerApplication.pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
  }
  PDFViewerApplication.pdfViewer.update();
}
function webViewerHashchange(e) {
  if (PDFViewerApplication.pdfHistory.isHashChangeUnlocked) {
    var hash = e.hash;
    if (!hash) {
      return;
    }
    if (!PDFViewerApplication.isInitialViewSet) {
      PDFViewerApplication.initialBookmark = hash;
    } else {
      PDFViewerApplication.pdfLinkService.setHash(hash);
    }
  }
}
var webViewerFileInputChange;
{
  webViewerFileInputChange = function webViewerFileInputChange(e) {
    var file = e.fileInput.files[0];
    if (!_pdfjs.PDFJS.disableCreateObjectURL && typeof URL !== 'undefined' && URL.createObjectURL) {
      PDFViewerApplication.open(URL.createObjectURL(file));
    } else {
      var fileReader = new FileReader();
      fileReader.onload = function webViewerChangeFileReaderOnload(evt) {
        var buffer = evt.target.result;
        var uint8Array = new Uint8Array(buffer);
        PDFViewerApplication.open(uint8Array);
      };
      fileReader.readAsArrayBuffer(file);
    }
    PDFViewerApplication.setTitleUsingUrl(file.name);
    var appConfig = PDFViewerApplication.appConfig;
    appConfig.toolbar.viewBookmark.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.viewBookmarkButton.setAttribute('hidden', 'true');
    appConfig.toolbar.download.setAttribute('hidden', 'true');
    appConfig.secondaryToolbar.downloadButton.setAttribute('hidden', 'true');
  };
}
function webViewerPresentationMode() {
  PDFViewerApplication.requestPresentationMode();
}
function webViewerOpenFile() {
  var openFileInputName = PDFViewerApplication.appConfig.openFileInputName;
  document.getElementById(openFileInputName).click();
}
function webViewerPrint() {
  window.print();
}
function webViewerDownload() {
  PDFViewerApplication.download();
}
function webViewerFirstPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = 1;
  }
}
function webViewerLastPage() {
  if (PDFViewerApplication.pdfDocument) {
    PDFViewerApplication.page = PDFViewerApplication.pagesCount;
  }
}
function webViewerNextPage() {
  PDFViewerApplication.page++;
}
function webViewerPreviousPage() {
  PDFViewerApplication.page--;
}
function webViewerZoomIn() {
  PDFViewerApplication.zoomIn();
}
function webViewerZoomOut() {
  PDFViewerApplication.zoomOut();
}
function webViewerPageNumberChanged(e) {
  var pdfViewer = PDFViewerApplication.pdfViewer;
  pdfViewer.currentPageLabel = e.value;
  if (e.value !== pdfViewer.currentPageNumber.toString() && e.value !== pdfViewer.currentPageLabel) {
    PDFViewerApplication.toolbar.setPageNumber(pdfViewer.currentPageNumber, pdfViewer.currentPageLabel);
  }
}
function webViewerScaleChanged(e) {
  PDFViewerApplication.pdfViewer.currentScaleValue = e.value;
}
function webViewerRotateCw() {
  PDFViewerApplication.rotatePages(90);
}
function webViewerRotateCcw() {
  PDFViewerApplication.rotatePages(-90);
}
function webViewerDocumentProperties() {
  PDFViewerApplication.pdfDocumentProperties.open();
}
function webViewerFind(e) {
  PDFViewerApplication.findController.executeCommand('find' + e.type, {
    query: e.query,
    phraseSearch: e.phraseSearch,
    caseSensitive: e.caseSensitive,
    highlightAll: e.highlightAll,
    findPrevious: e.findPrevious
  });
}
function webViewerFindFromUrlHash(e) {
  PDFViewerApplication.findController.executeCommand('find', {
    query: e.query,
    phraseSearch: e.phraseSearch,
    caseSensitive: false,
    highlightAll: true,
    findPrevious: false
  });
}
function webViewerScaleChanging(e) {
  PDFViewerApplication.toolbar.setPageScale(e.presetValue, e.scale);
  PDFViewerApplication.pdfViewer.update();
}
function webViewerPageChanging(e) {
  var page = e.pageNumber;
  PDFViewerApplication.toolbar.setPageNumber(page, e.pageLabel || null);
  PDFViewerApplication.secondaryToolbar.setPageNumber(page);
  if (PDFViewerApplication.pdfSidebar.isThumbnailViewVisible) {
    PDFViewerApplication.pdfThumbnailViewer.scrollThumbnailIntoView(page);
  }
  if (_pdfjs.PDFJS.pdfBug && Stats.enabled) {
    var pageView = PDFViewerApplication.pdfViewer.getPageView(page - 1);
    if (pageView.stats) {
      Stats.add(page, pageView.stats);
    }
  }
}
var zoomDisabled = false,
    zoomDisabledTimeout;
function webViewerWheel(evt) {
  var pdfViewer = PDFViewerApplication.pdfViewer;
  if (pdfViewer.isInPresentationMode) {
    return;
  }
  if (evt.ctrlKey || evt.metaKey) {
    var support = PDFViewerApplication.supportedMouseWheelZoomModifierKeys;
    if (evt.ctrlKey && !support.ctrlKey || evt.metaKey && !support.metaKey) {
      return;
    }
    evt.preventDefault();
    if (zoomDisabled) {
      return;
    }
    var previousScale = pdfViewer.currentScale;
    var delta = (0, _ui_utils.normalizeWheelEventDelta)(evt);
    var MOUSE_WHEEL_DELTA_PER_PAGE_SCALE = 3.0;
    var ticks = delta * MOUSE_WHEEL_DELTA_PER_PAGE_SCALE;
    if (ticks < 0) {
      PDFViewerApplication.zoomOut(-ticks);
    } else {
      PDFViewerApplication.zoomIn(ticks);
    }
    var currentScale = pdfViewer.currentScale;
    if (previousScale !== currentScale) {
      var scaleCorrectionFactor = currentScale / previousScale - 1;
      var rect = pdfViewer.container.getBoundingClientRect();
      var dx = evt.clientX - rect.left;
      var dy = evt.clientY - rect.top;
      pdfViewer.container.scrollLeft += dx * scaleCorrectionFactor;
      pdfViewer.container.scrollTop += dy * scaleCorrectionFactor;
    }
  } else {
    zoomDisabled = true;
    clearTimeout(zoomDisabledTimeout);
    zoomDisabledTimeout = setTimeout(function () {
      zoomDisabled = false;
    }, 1000);
  }
}
function webViewerClick(evt) {
  if (!PDFViewerApplication.secondaryToolbar.isOpen) {
    return;
  }
  var appConfig = PDFViewerApplication.appConfig;
  if (PDFViewerApplication.pdfViewer.containsElement(evt.target) || appConfig.toolbar.container.contains(evt.target) && evt.target !== appConfig.secondaryToolbar.toggleButton) {
    PDFViewerApplication.secondaryToolbar.close();
  }
}
function webViewerKeyDown(evt) {
  if (_overlay_manager.OverlayManager.active) {
    return;
  }
  var handled = false,
      ensureViewerFocused = false;
  var cmd = (evt.ctrlKey ? 1 : 0) | (evt.altKey ? 2 : 0) | (evt.shiftKey ? 4 : 0) | (evt.metaKey ? 8 : 0);
  var pdfViewer = PDFViewerApplication.pdfViewer;
  var isViewerInPresentationMode = pdfViewer && pdfViewer.isInPresentationMode;
  if (cmd === 1 || cmd === 8 || cmd === 5 || cmd === 12) {
    switch (evt.keyCode) {
      case 70:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          PDFViewerApplication.findBar.open();
          handled = true;
        }
        break;
      case 71:
        if (!PDFViewerApplication.supportsIntegratedFind) {
          var findState = PDFViewerApplication.findController.state;
          if (findState) {
            PDFViewerApplication.findController.executeCommand('findagain', {
              query: findState.query,
              phraseSearch: findState.phraseSearch,
              caseSensitive: findState.caseSensitive,
              highlightAll: findState.highlightAll,
              findPrevious: cmd === 5 || cmd === 12
            });
          }
          handled = true;
        }
        break;
      case 61:
      case 107:
      case 187:
      case 171:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomIn();
        }
        handled = true;
        break;
      case 173:
      case 109:
      case 189:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.zoomOut();
        }
        handled = true;
        break;
      case 48:
      case 96:
        if (!isViewerInPresentationMode) {
          setTimeout(function () {
            pdfViewer.currentScaleValue = _ui_utils.DEFAULT_SCALE_VALUE;
          });
          handled = false;
        }
        break;
      case 38:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 40:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
    }
  }
  if (cmd === 1 || cmd === 8) {
    switch (evt.keyCode) {
      case 83:
        PDFViewerApplication.download();
        handled = true;
        break;
    }
  }
  if (cmd === 3 || cmd === 10) {
    switch (evt.keyCode) {
      case 80:
        PDFViewerApplication.requestPresentationMode();
        handled = true;
        break;
      case 71:
        PDFViewerApplication.appConfig.toolbar.pageNumber.select();
        handled = true;
        break;
    }
  }
  if (handled) {
    if (ensureViewerFocused && !isViewerInPresentationMode) {
      pdfViewer.focus();
    }
    evt.preventDefault();
    return;
  }
  var curElement = document.activeElement || document.querySelector(':focus');
  var curElementTagName = curElement && curElement.tagName.toUpperCase();
  if (curElementTagName === 'INPUT' || curElementTagName === 'TEXTAREA' || curElementTagName === 'SELECT') {
    if (evt.keyCode !== 27) {
      return;
    }
  }
  if (cmd === 0) {
    switch (evt.keyCode) {
      case 38:
      case 33:
      case 8:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
        }
      case 37:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          break;
        }
      case 75:
      case 80:
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }
        handled = true;
        break;
      case 27:
        if (PDFViewerApplication.secondaryToolbar.isOpen) {
          PDFViewerApplication.secondaryToolbar.close();
          handled = true;
        }
        if (!PDFViewerApplication.supportsIntegratedFind && PDFViewerApplication.findBar.opened) {
          PDFViewerApplication.findBar.close();
          handled = true;
        }
        break;
      case 40:
      case 34:
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
        }
      case 39:
        if (pdfViewer.isHorizontalScrollbarEnabled) {
          break;
        }
      case 74:
      case 78:
        if (PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page++;
        }
        handled = true;
        break;
      case 36:
        if (isViewerInPresentationMode || PDFViewerApplication.page > 1) {
          PDFViewerApplication.page = 1;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 35:
        if (isViewerInPresentationMode || PDFViewerApplication.page < PDFViewerApplication.pagesCount) {
          PDFViewerApplication.page = PDFViewerApplication.pagesCount;
          handled = true;
          ensureViewerFocused = true;
        }
        break;
      case 72:
        if (!isViewerInPresentationMode) {
          PDFViewerApplication.handTool.toggle();
        }
        break;
      case 82:
        PDFViewerApplication.rotatePages(90);
        break;
    }
  }
  if (cmd === 4) {
    switch (evt.keyCode) {
      case 32:
        if (!isViewerInPresentationMode && pdfViewer.currentScaleValue !== 'page-fit') {
          break;
        }
        if (PDFViewerApplication.page > 1) {
          PDFViewerApplication.page--;
        }
        handled = true;
        break;
      case 82:
        PDFViewerApplication.rotatePages(-90);
        break;
    }
  }
  if (!handled && !isViewerInPresentationMode) {
    if (evt.keyCode >= 33 && evt.keyCode <= 40 || evt.keyCode === 32 && curElementTagName !== 'BUTTON') {
      ensureViewerFocused = true;
    }
  }
  if (cmd === 2) {
    switch (evt.keyCode) {
      case 37:
        if (isViewerInPresentationMode) {
          PDFViewerApplication.pdfHistory.back();
          handled = true;
        }
        break;
      case 39:
        if (isViewerInPresentationMode) {
          PDFViewerApplication.pdfHistory.forward();
          handled = true;
        }
        break;
    }
  }
  if (ensureViewerFocused && !pdfViewer.containsElement(curElement)) {
    pdfViewer.focus();
  }
  if (handled) {
    evt.preventDefault();
  }
}
_ui_utils.localized.then(function webViewerLocalized() {
  document.getElementsByTagName('html')[0].dir = _ui_utils.mozL10n.getDirection();
});
var PDFPrintServiceFactory = {
  instance: {
    supportsPrinting: false,
    createPrintService: function createPrintService() {
      throw new Error('Not implemented: createPrintService');
    }
  }
};
exports.PDFViewerApplication = PDFViewerApplication;
exports.DefaultExternalServices = DefaultExternalServices;
exports.PDFPrintServiceFactory = PDFPrintServiceFactory;