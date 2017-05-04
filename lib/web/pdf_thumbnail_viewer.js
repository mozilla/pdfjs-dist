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
exports.PDFThumbnailViewer = undefined;

var _ui_utils = require('./ui_utils');

var _pdf_thumbnail_view = require('./pdf_thumbnail_view');

var THUMBNAIL_SCROLL_MARGIN = -19;
var PDFThumbnailViewer = function PDFThumbnailViewerClosure() {
  function PDFThumbnailViewer(options) {
    this.container = options.container;
    this.renderingQueue = options.renderingQueue;
    this.linkService = options.linkService;
    this.scroll = (0, _ui_utils.watchScroll)(this.container, this._scrollUpdated.bind(this));
    this._resetView();
  }
  PDFThumbnailViewer.prototype = {
    _scrollUpdated: function PDFThumbnailViewer_scrollUpdated() {
      this.renderingQueue.renderHighestPriority();
    },
    getThumbnail: function PDFThumbnailViewer_getThumbnail(index) {
      return this.thumbnails[index];
    },
    _getVisibleThumbs: function PDFThumbnailViewer_getVisibleThumbs() {
      return (0, _ui_utils.getVisibleElements)(this.container, this.thumbnails);
    },
    scrollThumbnailIntoView: function PDFThumbnailViewer_scrollThumbnailIntoView(page) {
      var selected = document.querySelector('.thumbnail.selected');
      if (selected) {
        selected.classList.remove('selected');
      }
      var thumbnail = document.querySelector('div.thumbnail[data-page-number="' + page + '"]');
      if (thumbnail) {
        thumbnail.classList.add('selected');
      }
      var visibleThumbs = this._getVisibleThumbs();
      var numVisibleThumbs = visibleThumbs.views.length;
      if (numVisibleThumbs > 0) {
        var first = visibleThumbs.first.id;
        var last = numVisibleThumbs > 1 ? visibleThumbs.last.id : first;
        if (page <= first || page >= last) {
          (0, _ui_utils.scrollIntoView)(thumbnail, { top: THUMBNAIL_SCROLL_MARGIN });
        }
      }
    },
    get pagesRotation() {
      return this._pagesRotation;
    },
    set pagesRotation(rotation) {
      this._pagesRotation = rotation;
      for (var i = 0, l = this.thumbnails.length; i < l; i++) {
        var thumb = this.thumbnails[i];
        thumb.update(rotation);
      }
    },
    cleanup: function PDFThumbnailViewer_cleanup() {
      var tempCanvas = _pdf_thumbnail_view.PDFThumbnailView.tempImageCache;
      if (tempCanvas) {
        tempCanvas.width = 0;
        tempCanvas.height = 0;
      }
      _pdf_thumbnail_view.PDFThumbnailView.tempImageCache = null;
    },
    _resetView: function PDFThumbnailViewer_resetView() {
      this.thumbnails = [];
      this._pageLabels = null;
      this._pagesRotation = 0;
      this._pagesRequests = [];
      this.container.textContent = '';
    },
    setDocument: function PDFThumbnailViewer_setDocument(pdfDocument) {
      var _this = this;

      if (this.pdfDocument) {
        this._cancelRendering();
        this._resetView();
      }
      this.pdfDocument = pdfDocument;
      if (!pdfDocument) {
        return Promise.resolve();
      }
      return pdfDocument.getPage(1).then(function (firstPage) {
        var pagesCount = pdfDocument.numPages;
        var viewport = firstPage.getViewport(1.0);
        for (var pageNum = 1; pageNum <= pagesCount; ++pageNum) {
          var thumbnail = new _pdf_thumbnail_view.PDFThumbnailView({
            container: _this.container,
            id: pageNum,
            defaultViewport: viewport.clone(),
            linkService: _this.linkService,
            renderingQueue: _this.renderingQueue,
            disableCanvasToImageConversion: false
          });
          _this.thumbnails.push(thumbnail);
        }
      });
    },
    _cancelRendering: function PDFThumbnailViewer_cancelRendering() {
      for (var i = 0, ii = this.thumbnails.length; i < ii; i++) {
        if (this.thumbnails[i]) {
          this.thumbnails[i].cancelRendering();
        }
      }
    },
    setPageLabels: function PDFThumbnailViewer_setPageLabels(labels) {
      if (!this.pdfDocument) {
        return;
      }
      if (!labels) {
        this._pageLabels = null;
      } else if (!(labels instanceof Array && this.pdfDocument.numPages === labels.length)) {
        this._pageLabels = null;
        console.error('PDFThumbnailViewer_setPageLabels: Invalid page labels.');
      } else {
        this._pageLabels = labels;
      }
      for (var i = 0, ii = this.thumbnails.length; i < ii; i++) {
        var thumbnailView = this.thumbnails[i];
        var label = this._pageLabels && this._pageLabels[i];
        thumbnailView.setPageLabel(label);
      }
    },
    _ensurePdfPageLoaded: function _ensurePdfPageLoaded(thumbView) {
      var _this2 = this;

      if (thumbView.pdfPage) {
        return Promise.resolve(thumbView.pdfPage);
      }
      var pageNumber = thumbView.id;
      if (this._pagesRequests[pageNumber]) {
        return this._pagesRequests[pageNumber];
      }
      var promise = this.pdfDocument.getPage(pageNumber).then(function (pdfPage) {
        thumbView.setPdfPage(pdfPage);
        _this2._pagesRequests[pageNumber] = null;
        return pdfPage;
      });
      this._pagesRequests[pageNumber] = promise;
      return promise;
    },
    forceRendering: function forceRendering() {
      var _this3 = this;

      var visibleThumbs = this._getVisibleThumbs();
      var thumbView = this.renderingQueue.getHighestPriority(visibleThumbs, this.thumbnails, this.scroll.down);
      if (thumbView) {
        this._ensurePdfPageLoaded(thumbView).then(function () {
          _this3.renderingQueue.renderView(thumbView);
        });
        return true;
      }
      return false;
    }
  };
  return PDFThumbnailViewer;
}();
exports.PDFThumbnailViewer = PDFThumbnailViewer;