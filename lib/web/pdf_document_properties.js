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
exports.PDFDocumentProperties = undefined;

var _ui_utils = require('./ui_utils');

var _overlay_manager = require('./overlay_manager');

var PDFDocumentProperties = function PDFDocumentPropertiesClosure() {
  function PDFDocumentProperties(options) {
    this.fields = options.fields;
    this.overlayName = options.overlayName;
    this.container = options.container;
    this.rawFileSize = 0;
    this.url = null;
    this.pdfDocument = null;
    if (options.closeButton) {
      options.closeButton.addEventListener('click', this.close.bind(this));
    }
    this.dataAvailablePromise = new Promise(function (resolve) {
      this.resolveDataAvailable = resolve;
    }.bind(this));
    _overlay_manager.OverlayManager.register(this.overlayName, this.container, this.close.bind(this));
  }
  PDFDocumentProperties.prototype = {
    open: function PDFDocumentProperties_open() {
      Promise.all([_overlay_manager.OverlayManager.open(this.overlayName), this.dataAvailablePromise]).then(function () {
        this._getProperties();
      }.bind(this));
    },
    close: function PDFDocumentProperties_close() {
      _overlay_manager.OverlayManager.close(this.overlayName);
    },
    setFileSize: function PDFDocumentProperties_setFileSize(fileSize) {
      if (fileSize > 0) {
        this.rawFileSize = fileSize;
      }
    },
    setDocumentAndUrl: function PDFDocumentProperties_setDocumentAndUrl(pdfDocument, url) {
      this.pdfDocument = pdfDocument;
      this.url = url;
      this.resolveDataAvailable();
    },
    _getProperties: function PDFDocumentProperties_getProperties() {
      if (!_overlay_manager.OverlayManager.active) {
        return;
      }
      this.pdfDocument.getDownloadInfo().then(function (data) {
        if (data.length === this.rawFileSize) {
          return;
        }
        this.setFileSize(data.length);
        this._updateUI(this.fields['fileSize'], this._parseFileSize());
      }.bind(this));
      this.pdfDocument.getMetadata().then(function (data) {
        var content = {
          'fileName': (0, _ui_utils.getPDFFileNameFromURL)(this.url),
          'fileSize': this._parseFileSize(),
          'title': data.info.Title,
          'author': data.info.Author,
          'subject': data.info.Subject,
          'keywords': data.info.Keywords,
          'creationDate': this._parseDate(data.info.CreationDate),
          'modificationDate': this._parseDate(data.info.ModDate),
          'creator': data.info.Creator,
          'producer': data.info.Producer,
          'version': data.info.PDFFormatVersion,
          'pageCount': this.pdfDocument.numPages
        };
        for (var identifier in content) {
          this._updateUI(this.fields[identifier], content[identifier]);
        }
      }.bind(this));
    },
    _updateUI: function PDFDocumentProperties_updateUI(field, content) {
      if (field && content !== undefined && content !== '') {
        field.textContent = content;
      }
    },
    _parseFileSize: function PDFDocumentProperties_parseFileSize() {
      var fileSize = this.rawFileSize,
          kb = fileSize / 1024;
      if (!kb) {
        return;
      } else if (kb < 1024) {
        return _ui_utils.mozL10n.get('document_properties_kb', {
          size_kb: (+kb.toPrecision(3)).toLocaleString(),
          size_b: fileSize.toLocaleString()
        }, '{{size_kb}} KB ({{size_b}} bytes)');
      }
      return _ui_utils.mozL10n.get('document_properties_mb', {
        size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
        size_b: fileSize.toLocaleString()
      }, '{{size_mb}} MB ({{size_b}} bytes)');
    },
    _parseDate: function PDFDocumentProperties_parseDate(inputDate) {
      var dateToParse = inputDate;
      if (dateToParse === undefined) {
        return '';
      }
      if (dateToParse.substring(0, 2) === 'D:') {
        dateToParse = dateToParse.substring(2);
      }
      var year = parseInt(dateToParse.substring(0, 4), 10);
      var month = parseInt(dateToParse.substring(4, 6), 10) - 1;
      var day = parseInt(dateToParse.substring(6, 8), 10);
      var hours = parseInt(dateToParse.substring(8, 10), 10);
      var minutes = parseInt(dateToParse.substring(10, 12), 10);
      var seconds = parseInt(dateToParse.substring(12, 14), 10);
      var utRel = dateToParse.substring(14, 15);
      var offsetHours = parseInt(dateToParse.substring(15, 17), 10);
      var offsetMinutes = parseInt(dateToParse.substring(18, 20), 10);
      if (utRel === '-') {
        hours += offsetHours;
        minutes += offsetMinutes;
      } else if (utRel === '+') {
        hours -= offsetHours;
        minutes -= offsetMinutes;
      }
      var date = new Date(Date.UTC(year, month, day, hours, minutes, seconds));
      var dateString = date.toLocaleDateString();
      var timeString = date.toLocaleTimeString();
      return _ui_utils.mozL10n.get('document_properties_date_string', {
        date: dateString,
        time: timeString
      }, '{{date}}, {{time}}');
    }
  };
  return PDFDocumentProperties;
}();
exports.PDFDocumentProperties = PDFDocumentProperties;