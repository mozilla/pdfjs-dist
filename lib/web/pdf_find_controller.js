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
exports.PDFFindController = exports.FindState = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pdf = require('../pdf');

var _ui_utils = require('./ui_utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var FindState = {
  FOUND: 0,
  NOT_FOUND: 1,
  WRAPPED: 2,
  PENDING: 3
};
var FIND_SCROLL_OFFSET_TOP = -50;
var FIND_SCROLL_OFFSET_LEFT = -400;
var FIND_TIMEOUT = 250;
var CHARACTERS_TO_NORMALIZE = {
  '\u2018': '\'',
  '\u2019': '\'',
  '\u201A': '\'',
  '\u201B': '\'',
  '\u201C': '"',
  '\u201D': '"',
  '\u201E': '"',
  '\u201F': '"',
  '\xBC': '1/4',
  '\xBD': '1/2',
  '\xBE': '3/4'
};

var PDFFindController = function () {
  function PDFFindController(_ref) {
    var pdfViewer = _ref.pdfViewer;

    _classCallCheck(this, PDFFindController);

    this.pdfViewer = pdfViewer;
    this.onUpdateResultsCount = null;
    this.onUpdateState = null;
    this.reset();
    var replace = Object.keys(CHARACTERS_TO_NORMALIZE).join('');
    this.normalizationRegex = new RegExp('[' + replace + ']', 'g');
  }

  _createClass(PDFFindController, [{
    key: 'reset',
    value: function reset() {
      var _this = this;

      this.startedTextExtraction = false;
      this.extractTextPromises = [];
      this.pendingFindMatches = Object.create(null);
      this.active = false;
      this.pageContents = [];
      this.pageMatches = [];
      this.pageMatchesLength = null;
      this.matchCount = 0;
      this.selected = {
        pageIdx: -1,
        matchIdx: -1
      };
      this.offset = {
        pageIdx: null,
        matchIdx: null
      };
      this.pagesToSearch = null;
      this.resumePageIdx = null;
      this.state = null;
      this.dirtyMatch = false;
      this.findTimeout = null;
      this._firstPagePromise = new Promise(function (resolve) {
        _this.resolveFirstPage = resolve;
      });
    }
  }, {
    key: 'executeCommand',
    value: function executeCommand(cmd, state) {
      var _this2 = this;

      if (this.state === null || cmd !== 'findagain') {
        this.dirtyMatch = true;
      }
      this.state = state;
      this._updateUIState(FindState.PENDING);
      this._firstPagePromise.then(function () {
        _this2._extractText();
        clearTimeout(_this2.findTimeout);
        if (cmd === 'find') {
          _this2.findTimeout = setTimeout(_this2._nextMatch.bind(_this2), FIND_TIMEOUT);
        } else {
          _this2._nextMatch();
        }
      });
    }
  }, {
    key: 'updateMatchPosition',
    value: function updateMatchPosition(pageIndex, matchIndex, elements, beginIdx) {
      if (this.selected.matchIdx === matchIndex && this.selected.pageIdx === pageIndex) {
        var spot = {
          top: FIND_SCROLL_OFFSET_TOP,
          left: FIND_SCROLL_OFFSET_LEFT
        };
        (0, _ui_utils.scrollIntoView)(elements[beginIdx], spot, true);
      }
    }
  }, {
    key: '_normalize',
    value: function _normalize(text) {
      return text.replace(this.normalizationRegex, function (ch) {
        return CHARACTERS_TO_NORMALIZE[ch];
      });
    }
  }, {
    key: '_prepareMatches',
    value: function _prepareMatches(matchesWithLength, matches, matchesLength) {
      function isSubTerm(matchesWithLength, currentIndex) {
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
        if (isSubTerm(matchesWithLength, i)) {
          continue;
        }
        matches.push(matchesWithLength[i].match);
        matchesLength.push(matchesWithLength[i].matchLength);
      }
    }
  }, {
    key: '_calculatePhraseMatch',
    value: function _calculatePhraseMatch(query, pageIndex, pageContent) {
      var matches = [];
      var queryLen = query.length;
      var matchIdx = -queryLen;
      while (true) {
        matchIdx = pageContent.indexOf(query, matchIdx + queryLen);
        if (matchIdx === -1) {
          break;
        }
        matches.push(matchIdx);
      }
      this.pageMatches[pageIndex] = matches;
    }
  }, {
    key: '_calculateWordMatch',
    value: function _calculateWordMatch(query, pageIndex, pageContent) {
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
          matchesWithLength.push({
            match: matchIdx,
            matchLength: subqueryLen,
            skipped: false
          });
        }
      }
      if (!this.pageMatchesLength) {
        this.pageMatchesLength = [];
      }
      this.pageMatchesLength[pageIndex] = [];
      this.pageMatches[pageIndex] = [];
      this._prepareMatches(matchesWithLength, this.pageMatches[pageIndex], this.pageMatchesLength[pageIndex]);
    }
  }, {
    key: '_calculateMatch',
    value: function _calculateMatch(pageIndex) {
      var pageContent = this._normalize(this.pageContents[pageIndex]);
      var query = this._normalize(this.state.query);
      var caseSensitive = this.state.caseSensitive;
      var phraseSearch = this.state.phraseSearch;
      var queryLen = query.length;
      if (queryLen === 0) {
        return;
      }
      if (!caseSensitive) {
        pageContent = pageContent.toLowerCase();
        query = query.toLowerCase();
      }
      if (phraseSearch) {
        this._calculatePhraseMatch(query, pageIndex, pageContent);
      } else {
        this._calculateWordMatch(query, pageIndex, pageContent);
      }
      this._updatePage(pageIndex);
      if (this.resumePageIdx === pageIndex) {
        this.resumePageIdx = null;
        this._nextPageMatch();
      }
      if (this.pageMatches[pageIndex].length > 0) {
        this.matchCount += this.pageMatches[pageIndex].length;
        this._updateUIResultsCount();
      }
    }
  }, {
    key: '_extractText',
    value: function _extractText() {
      var _this3 = this;

      if (this.startedTextExtraction) {
        return;
      }
      this.startedTextExtraction = true;
      this.pageContents.length = 0;
      var promise = Promise.resolve();

      var _loop = function _loop(i, ii) {
        var extractTextCapability = (0, _pdf.createPromiseCapability)();
        _this3.extractTextPromises[i] = extractTextCapability.promise;
        promise = promise.then(function () {
          return _this3.pdfViewer.getPageTextContent(i).then(function (textContent) {
            var textItems = textContent.items;
            var strBuf = [];
            for (var j = 0, jj = textItems.length; j < jj; j++) {
              strBuf.push(textItems[j].str);
            }
            _this3.pageContents[i] = strBuf.join('');
            extractTextCapability.resolve(i);
          }, function (reason) {
            console.error('Unable to get page ' + (i + 1) + ' text content', reason);
            _this3.pageContents[i] = '';
            extractTextCapability.resolve(i);
          });
        });
      };

      for (var i = 0, ii = this.pdfViewer.pagesCount; i < ii; i++) {
        _loop(i, ii);
      }
    }
  }, {
    key: '_updatePage',
    value: function _updatePage(index) {
      if (this.selected.pageIdx === index) {
        this.pdfViewer.currentPageNumber = index + 1;
      }
      var page = this.pdfViewer.getPageView(index);
      if (page.textLayer) {
        page.textLayer.updateMatches();
      }
    }
  }, {
    key: '_nextMatch',
    value: function _nextMatch() {
      var _this4 = this;

      var previous = this.state.findPrevious;
      var currentPageIndex = this.pdfViewer.currentPageNumber - 1;
      var numPages = this.pdfViewer.pagesCount;
      this.active = true;
      if (this.dirtyMatch) {
        this.dirtyMatch = false;
        this.selected.pageIdx = this.selected.matchIdx = -1;
        this.offset.pageIdx = currentPageIndex;
        this.offset.matchIdx = null;
        this.hadMatch = false;
        this.resumePageIdx = null;
        this.pageMatches = [];
        this.matchCount = 0;
        this.pageMatchesLength = null;
        for (var i = 0; i < numPages; i++) {
          this._updatePage(i);
          if (!(i in this.pendingFindMatches)) {
            this.pendingFindMatches[i] = true;
            this.extractTextPromises[i].then(function (pageIdx) {
              delete _this4.pendingFindMatches[pageIdx];
              _this4._calculateMatch(pageIdx);
            });
          }
        }
      }
      if (this.state.query === '') {
        this._updateUIState(FindState.FOUND);
        return;
      }
      if (this.resumePageIdx) {
        return;
      }
      var offset = this.offset;
      this.pagesToSearch = numPages;
      if (offset.matchIdx !== null) {
        var numPageMatches = this.pageMatches[offset.pageIdx].length;
        if (!previous && offset.matchIdx + 1 < numPageMatches || previous && offset.matchIdx > 0) {
          this.hadMatch = true;
          offset.matchIdx = previous ? offset.matchIdx - 1 : offset.matchIdx + 1;
          this._updateMatch(true);
          return;
        }
        this._advanceOffsetPage(previous);
      }
      this._nextPageMatch();
    }
  }, {
    key: '_matchesReady',
    value: function _matchesReady(matches) {
      var offset = this.offset;
      var numMatches = matches.length;
      var previous = this.state.findPrevious;
      if (numMatches) {
        this.hadMatch = true;
        offset.matchIdx = previous ? numMatches - 1 : 0;
        this._updateMatch(true);
        return true;
      }
      this._advanceOffsetPage(previous);
      if (offset.wrapped) {
        offset.matchIdx = null;
        if (this.pagesToSearch < 0) {
          this._updateMatch(false);
          return true;
        }
      }
      return false;
    }
  }, {
    key: '_nextPageMatch',
    value: function _nextPageMatch() {
      if (this.resumePageIdx !== null) {
        console.error('There can only be one pending page.');
      }
      var matches = null;
      do {
        var pageIdx = this.offset.pageIdx;
        matches = this.pageMatches[pageIdx];
        if (!matches) {
          this.resumePageIdx = pageIdx;
          break;
        }
      } while (!this._matchesReady(matches));
    }
  }, {
    key: '_advanceOffsetPage',
    value: function _advanceOffsetPage(previous) {
      var offset = this.offset;
      var numPages = this.extractTextPromises.length;
      offset.pageIdx = previous ? offset.pageIdx - 1 : offset.pageIdx + 1;
      offset.matchIdx = null;
      this.pagesToSearch--;
      if (offset.pageIdx >= numPages || offset.pageIdx < 0) {
        offset.pageIdx = previous ? numPages - 1 : 0;
        offset.wrapped = true;
      }
    }
  }, {
    key: '_updateMatch',
    value: function _updateMatch() {
      var found = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var state = FindState.NOT_FOUND;
      var wrapped = this.offset.wrapped;
      this.offset.wrapped = false;
      if (found) {
        var previousPage = this.selected.pageIdx;
        this.selected.pageIdx = this.offset.pageIdx;
        this.selected.matchIdx = this.offset.matchIdx;
        state = wrapped ? FindState.WRAPPED : FindState.FOUND;
        if (previousPage !== -1 && previousPage !== this.selected.pageIdx) {
          this._updatePage(previousPage);
        }
      }
      this._updateUIState(state, this.state.findPrevious);
      if (this.selected.pageIdx !== -1) {
        this._updatePage(this.selected.pageIdx);
      }
    }
  }, {
    key: '_updateUIResultsCount',
    value: function _updateUIResultsCount() {
      if (this.onUpdateResultsCount) {
        this.onUpdateResultsCount(this.matchCount);
      }
    }
  }, {
    key: '_updateUIState',
    value: function _updateUIState(state, previous) {
      if (this.onUpdateState) {
        this.onUpdateState(state, previous, this.matchCount);
      }
    }
  }]);

  return PDFFindController;
}();

exports.FindState = FindState;
exports.PDFFindController = PDFFindController;