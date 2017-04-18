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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui_utils = require('./ui_utils');

var _pdfjs = require('./pdfjs');

var _overlay_manager = require('./overlay_manager');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PDFDocumentProperties = function () {
  function PDFDocumentProperties(options) {
    _classCallCheck(this, PDFDocumentProperties);

    this.overlayName = options.overlayName;
    this.fields = options.fields;
    this.container = options.container;
    this.rawFileSize = 0;
    this.url = null;
    this.pdfDocument = null;
    if (options.closeButton) {
      options.closeButton.addEventListener('click', this.close.bind(this));
    }
    this._dataAvailableCapability = (0, _pdfjs.createPromiseCapability)();
    _overlay_manager.OverlayManager.register(this.overlayName, this.container, this.close.bind(this));
  }

  _createClass(PDFDocumentProperties, [{
    key: 'open',
    value: function open() {
      var _this = this;

      Promise.all([_overlay_manager.OverlayManager.open(this.overlayName), this._dataAvailableCapability.promise]).then(function () {
        _this._getProperties();
      });
    }
  }, {
    key: 'close',
    value: function close() {
      _overlay_manager.OverlayManager.close(this.overlayName);
    }
  }, {
    key: 'setFileSize',
    value: function setFileSize(fileSize) {
      if (fileSize > 0) {
        this.rawFileSize = fileSize;
      }
    }
  }, {
    key: 'setDocumentAndUrl',
    value: function setDocumentAndUrl(pdfDocument, url) {
      this.pdfDocument = pdfDocument;
      this.url = url;
      this._dataAvailableCapability.resolve();
    }
  }, {
    key: '_getProperties',
    value: function _getProperties() {
      var _this2 = this;

      if (!_overlay_manager.OverlayManager.active) {
        return;
      }
      this.pdfDocument.getDownloadInfo().then(function (data) {
        if (data.length === _this2.rawFileSize) {
          return;
        }
        _this2.setFileSize(data.length);
        _this2._updateUI(_this2.fields['fileSize'], _this2._parseFileSize());
      });
      this.pdfDocument.getMetadata().then(function (data) {
        var content = {
          'fileName': (0, _ui_utils.getPDFFileNameFromURL)(_this2.url),
          'fileSize': _this2._parseFileSize(),
          'title': data.info.Title,
          'author': data.info.Author,
          'subject': data.info.Subject,
          'keywords': data.info.Keywords,
          'creationDate': _this2._parseDate(data.info.CreationDate),
          'modificationDate': _this2._parseDate(data.info.ModDate),
          'creator': data.info.Creator,
          'producer': data.info.Producer,
          'version': data.info.PDFFormatVersion,
          'pageCount': _this2.pdfDocument.numPages
        };
        for (var identifier in content) {
          _this2._updateUI(_this2.fields[identifier], content[identifier]);
        }
      });
    }
  }, {
    key: '_updateUI',
    value: function _updateUI(field, content) {
      if (field && content !== undefined && content !== '') {
        field.textContent = content;
      }
    }
  }, {
    key: '_parseFileSize',
    value: function _parseFileSize() {
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
    }
  }, {
    key: '_parseDate',
    value: function _parseDate(inputDate) {
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
  }]);

  return PDFDocumentProperties;
}();

exports.PDFDocumentProperties = PDFDocumentProperties;