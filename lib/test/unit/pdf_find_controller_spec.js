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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _test_utils = require('./test_utils');

var _ui_utils = require('../../web/ui_utils');

var _api = require('../../display/api');

var _pdf_find_controller = require('../../web/pdf_find_controller');

var _pdf_link_service = require('../../web/pdf_link_service');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MockLinkService = function (_SimpleLinkService) {
  _inherits(MockLinkService, _SimpleLinkService);

  function MockLinkService() {
    _classCallCheck(this, MockLinkService);

    var _this = _possibleConstructorReturn(this, (MockLinkService.__proto__ || Object.getPrototypeOf(MockLinkService)).call(this));

    _this._page = 1;
    _this._pdfDocument = null;
    return _this;
  }

  _createClass(MockLinkService, [{
    key: 'setDocument',
    value: function setDocument(pdfDocument) {
      this._pdfDocument = pdfDocument;
    }
  }, {
    key: 'pagesCount',
    get: function get() {
      return this._pdfDocument.numPages;
    }
  }, {
    key: 'page',
    get: function get() {
      return this._page;
    },
    set: function set(value) {
      this._page = value;
    }
  }]);

  return MockLinkService;
}(_pdf_link_service.SimpleLinkService);

describe('pdf_find_controller', function () {
  var eventBus = void 0;
  var pdfFindController = void 0;
  beforeEach(function (done) {
    var loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)('tracemonkey.pdf'));
    loadingTask.promise.then(function (pdfDocument) {
      eventBus = new _ui_utils.EventBus();
      var linkService = new MockLinkService();
      linkService.setDocument(pdfDocument);
      pdfFindController = new _pdf_find_controller.PDFFindController({
        linkService: linkService,
        eventBus: eventBus
      });
      pdfFindController.setDocument(pdfDocument);
      done();
    });
  });
  afterEach(function () {
    eventBus = null;
    pdfFindController = null;
  });
  it('performs a basic search', function (done) {
    pdfFindController.executeCommand('find', { query: 'Dynamic' });
    var matchesPerPage = [11, 5, 0, 3, 0, 0, 0, 1, 1, 1, 0, 3, 4, 4];
    var totalPages = matchesPerPage.length;
    var totalMatches = matchesPerPage.reduce(function (a, b) {
      return a + b;
    });
    eventBus.on('updatefindmatchescount', function onUpdateFindMatchesCount(evt) {
      if (pdfFindController.pageMatches.length !== totalPages) {
        return;
      }
      eventBus.off('updatefindmatchescount', onUpdateFindMatchesCount);
      expect(evt.matchesCount.total).toBe(totalMatches);
      for (var i = 0; i < totalPages; i++) {
        expect(pdfFindController.pageMatches[i].length).toEqual(matchesPerPage[i]);
      }
      done();
    });
  });
});