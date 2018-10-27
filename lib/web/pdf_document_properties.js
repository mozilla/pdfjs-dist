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
exports.PDFDocumentProperties = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui_utils = require('./ui_utils');

var _pdf = require('../pdf');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_FIELD_CONTENT = '-';
var NON_METRIC_LOCALES = ['en-us', 'en-lr', 'my'];
var US_PAGE_NAMES = {
  '8.5x11': 'Letter',
  '8.5x14': 'Legal'
};
var METRIC_PAGE_NAMES = {
  '297x420': 'A3',
  '210x297': 'A4'
};
function getPageName(size, isPortrait, pageNames) {
  var width = isPortrait ? size.width : size.height;
  var height = isPortrait ? size.height : size.width;
  return pageNames[width + 'x' + height];
}

var PDFDocumentProperties = function () {
  function PDFDocumentProperties(_ref, overlayManager, eventBus) {
    var overlayName = _ref.overlayName,
        fields = _ref.fields,
        container = _ref.container,
        closeButton = _ref.closeButton;

    var _this = this;

    var l10n = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : _ui_utils.NullL10n;

    _classCallCheck(this, PDFDocumentProperties);

    this.overlayName = overlayName;
    this.fields = fields;
    this.container = container;
    this.overlayManager = overlayManager;
    this.l10n = l10n;
    this._reset();
    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }
    this.overlayManager.register(this.overlayName, this.container, this.close.bind(this));
    if (eventBus) {
      eventBus.on('pagechanging', function (evt) {
        _this._currentPageNumber = evt.pageNumber;
      });
      eventBus.on('rotationchanging', function (evt) {
        _this._pagesRotation = evt.pagesRotation;
      });
    }
    this._isNonMetricLocale = true;
    l10n.getLanguage().then(function (locale) {
      _this._isNonMetricLocale = NON_METRIC_LOCALES.includes(locale);
    });
  }

  _createClass(PDFDocumentProperties, [{
    key: 'open',
    value: function open() {
      var _this2 = this;

      var freezeFieldData = function freezeFieldData(data) {
        Object.defineProperty(_this2, 'fieldData', {
          value: Object.freeze(data),
          writable: false,
          enumerable: true,
          configurable: true
        });
      };
      Promise.all([this.overlayManager.open(this.overlayName), this._dataAvailableCapability.promise]).then(function () {
        var currentPageNumber = _this2._currentPageNumber;
        var pagesRotation = _this2._pagesRotation;
        if (_this2.fieldData && currentPageNumber === _this2.fieldData['_currentPageNumber'] && pagesRotation === _this2.fieldData['_pagesRotation']) {
          _this2._updateUI();
          return;
        }
        _this2.pdfDocument.getMetadata().then(function (_ref2) {
          var info = _ref2.info,
              metadata = _ref2.metadata,
              contentDispositionFilename = _ref2.contentDispositionFilename;

          return Promise.all([info, metadata, contentDispositionFilename || (0, _ui_utils.getPDFFileNameFromURL)(_this2.url || ''), _this2._parseFileSize(_this2.maybeFileSize), _this2._parseDate(info.CreationDate), _this2._parseDate(info.ModDate), _this2.pdfDocument.getPage(currentPageNumber).then(function (pdfPage) {
            return _this2._parsePageSize((0, _ui_utils.getPageSizeInches)(pdfPage), pagesRotation);
          }), _this2._parseLinearization(info.IsLinearized)]);
        }).then(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 8),
              info = _ref4[0],
              metadata = _ref4[1],
              fileName = _ref4[2],
              fileSize = _ref4[3],
              creationDate = _ref4[4],
              modDate = _ref4[5],
              pageSize = _ref4[6],
              isLinearized = _ref4[7];

          freezeFieldData({
            'fileName': fileName,
            'fileSize': fileSize,
            'title': info.Title,
            'author': info.Author,
            'subject': info.Subject,
            'keywords': info.Keywords,
            'creationDate': creationDate,
            'modificationDate': modDate,
            'creator': info.Creator,
            'producer': info.Producer,
            'version': info.PDFFormatVersion,
            'pageCount': _this2.pdfDocument.numPages,
            'pageSize': pageSize,
            'linearized': isLinearized,
            '_currentPageNumber': currentPageNumber,
            '_pagesRotation': pagesRotation
          });
          _this2._updateUI();
          return _this2.pdfDocument.getDownloadInfo();
        }).then(function (_ref5) {
          var length = _ref5.length;

          _this2.maybeFileSize = length;
          return _this2._parseFileSize(length);
        }).then(function (fileSize) {
          if (fileSize === _this2.fieldData['fileSize']) {
            return;
          }
          var data = Object.assign(Object.create(null), _this2.fieldData);
          data['fileSize'] = fileSize;
          freezeFieldData(data);
          _this2._updateUI();
        });
      });
    }
  }, {
    key: 'close',
    value: function close() {
      this.overlayManager.close(this.overlayName);
    }
  }, {
    key: 'setDocument',
    value: function setDocument(pdfDocument) {
      var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.pdfDocument) {
        this._reset();
        this._updateUI(true);
      }
      if (!pdfDocument) {
        return;
      }
      this.pdfDocument = pdfDocument;
      this.url = url;
      this._dataAvailableCapability.resolve();
    }
  }, {
    key: 'setFileSize',
    value: function setFileSize(fileSize) {
      if (Number.isInteger(fileSize) && fileSize > 0) {
        this.maybeFileSize = fileSize;
      }
    }
  }, {
    key: '_reset',
    value: function _reset() {
      this.pdfDocument = null;
      this.url = null;
      this.maybeFileSize = 0;
      delete this.fieldData;
      this._dataAvailableCapability = (0, _pdf.createPromiseCapability)();
      this._currentPageNumber = 1;
      this._pagesRotation = 0;
    }
  }, {
    key: '_updateUI',
    value: function _updateUI() {
      var reset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (reset || !this.fieldData) {
        for (var id in this.fields) {
          this.fields[id].textContent = DEFAULT_FIELD_CONTENT;
        }
        return;
      }
      if (this.overlayManager.active !== this.overlayName) {
        return;
      }
      for (var _id in this.fields) {
        var content = this.fieldData[_id];
        this.fields[_id].textContent = content || content === 0 ? content : DEFAULT_FIELD_CONTENT;
      }
    }
  }, {
    key: '_parseFileSize',
    value: function _parseFileSize() {
      var fileSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var kb = fileSize / 1024;
      if (!kb) {
        return Promise.resolve(undefined);
      } else if (kb < 1024) {
        return this.l10n.get('document_properties_kb', {
          size_kb: (+kb.toPrecision(3)).toLocaleString(),
          size_b: fileSize.toLocaleString()
        }, '{{size_kb}} KB ({{size_b}} bytes)');
      }
      return this.l10n.get('document_properties_mb', {
        size_mb: (+(kb / 1024).toPrecision(3)).toLocaleString(),
        size_b: fileSize.toLocaleString()
      }, '{{size_mb}} MB ({{size_b}} bytes)');
    }
  }, {
    key: '_parsePageSize',
    value: function _parsePageSize(pageSizeInches, pagesRotation) {
      var _this3 = this;

      if (!pageSizeInches) {
        return Promise.resolve(undefined);
      }
      if (pagesRotation % 180 !== 0) {
        pageSizeInches = {
          width: pageSizeInches.height,
          height: pageSizeInches.width
        };
      }
      var isPortrait = (0, _ui_utils.isPortraitOrientation)(pageSizeInches);
      var sizeInches = {
        width: Math.round(pageSizeInches.width * 100) / 100,
        height: Math.round(pageSizeInches.height * 100) / 100
      };
      var sizeMillimeters = {
        width: Math.round(pageSizeInches.width * 25.4 * 10) / 10,
        height: Math.round(pageSizeInches.height * 25.4 * 10) / 10
      };
      var pageName = null;
      var name = getPageName(sizeInches, isPortrait, US_PAGE_NAMES) || getPageName(sizeMillimeters, isPortrait, METRIC_PAGE_NAMES);
      if (!name && !(Number.isInteger(sizeMillimeters.width) && Number.isInteger(sizeMillimeters.height))) {
        var exactMillimeters = {
          width: pageSizeInches.width * 25.4,
          height: pageSizeInches.height * 25.4
        };
        var intMillimeters = {
          width: Math.round(sizeMillimeters.width),
          height: Math.round(sizeMillimeters.height)
        };
        if (Math.abs(exactMillimeters.width - intMillimeters.width) < 0.1 && Math.abs(exactMillimeters.height - intMillimeters.height) < 0.1) {
          name = getPageName(intMillimeters, isPortrait, METRIC_PAGE_NAMES);
          if (name) {
            sizeInches = {
              width: Math.round(intMillimeters.width / 25.4 * 100) / 100,
              height: Math.round(intMillimeters.height / 25.4 * 100) / 100
            };
            sizeMillimeters = intMillimeters;
          }
        }
      }
      if (name) {
        pageName = this.l10n.get('document_properties_page_size_name_' + name.toLowerCase(), null, name);
      }
      return Promise.all([this._isNonMetricLocale ? sizeInches : sizeMillimeters, this.l10n.get('document_properties_page_size_unit_' + (this._isNonMetricLocale ? 'inches' : 'millimeters'), null, this._isNonMetricLocale ? 'in' : 'mm'), pageName, this.l10n.get('document_properties_page_size_orientation_' + (isPortrait ? 'portrait' : 'landscape'), null, isPortrait ? 'portrait' : 'landscape')]).then(function (_ref6) {
        var _ref7 = _slicedToArray(_ref6, 4),
            _ref7$ = _ref7[0],
            width = _ref7$.width,
            height = _ref7$.height,
            unit = _ref7[1],
            name = _ref7[2],
            orientation = _ref7[3];

        return _this3.l10n.get('document_properties_page_size_dimension_' + (name ? 'name_' : '') + 'string', {
          width: width.toLocaleString(),
          height: height.toLocaleString(),
          unit: unit,
          name: name,
          orientation: orientation
        }, '{{width}} × {{height}} {{unit}} (' + (name ? '{{name}}, ' : '') + '{{orientation}})');
      });
    }
  }, {
    key: '_parseDate',
    value: function _parseDate(inputDate) {
      if (!inputDate) {
        return;
      }
      var dateToParse = inputDate;
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
      return this.l10n.get('document_properties_date_string', {
        date: dateString,
        time: timeString
      }, '{{date}}, {{time}}');
    }
  }, {
    key: '_parseLinearization',
    value: function _parseLinearization(isLinearized) {
      return this.l10n.get('document_properties_linearized_' + (isLinearized ? 'yes' : 'no'), null, isLinearized ? 'Yes' : 'No');
    }
  }]);

  return PDFDocumentProperties;
}();

exports.PDFDocumentProperties = PDFDocumentProperties;