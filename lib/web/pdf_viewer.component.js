/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2017 Mozilla Foundation
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
exports.PDFJS = undefined;

var _annotation_layer_builder = require('./annotation_layer_builder.js');

var _text_layer_builder = require('./text_layer_builder.js');

var _ui_utils = require('./ui_utils.js');

var _pdf_link_service = require('./pdf_link_service.js');

var _download_manager = require('./download_manager.js');

var _genericl10n = require('./genericl10n.js');

var _pdf_find_controller = require('./pdf_find_controller.js');

var _pdf_history = require('./pdf_history.js');

var _pdfjs = require('./pdfjs.js');

var _pdfjs2 = _interopRequireDefault(_pdfjs);

var _pdf_page_view = require('./pdf_page_view.js');

var _pdf_single_page_viewer = require('./pdf_single_page_viewer');

var _pdf_viewer = require('./pdf_viewer.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PDFJS = _pdfjs2.default.PDFJS;

PDFJS.PDFViewer = _pdf_viewer.PDFViewer;
PDFJS.PDFSinglePageViewer = _pdf_single_page_viewer.PDFSinglePageViewer;
PDFJS.PDFPageView = _pdf_page_view.PDFPageView;
PDFJS.PDFLinkService = _pdf_link_service.PDFLinkService;
PDFJS.SimpleLinkService = _pdf_link_service.SimpleLinkService;
PDFJS.TextLayerBuilder = _text_layer_builder.TextLayerBuilder;
PDFJS.DefaultTextLayerFactory = _text_layer_builder.DefaultTextLayerFactory;
PDFJS.AnnotationLayerBuilder = _annotation_layer_builder.AnnotationLayerBuilder;
PDFJS.DefaultAnnotationLayerFactory = _annotation_layer_builder.DefaultAnnotationLayerFactory;
PDFJS.PDFHistory = _pdf_history.PDFHistory;
PDFJS.PDFFindController = _pdf_find_controller.PDFFindController;
PDFJS.EventBus = _ui_utils.EventBus;
PDFJS.DownloadManager = _download_manager.DownloadManager;
PDFJS.ProgressBar = _ui_utils.ProgressBar;
PDFJS.GenericL10n = _genericl10n.GenericL10n;
PDFJS.NullL10n = _ui_utils.NullL10n;
exports.PDFJS = PDFJS;