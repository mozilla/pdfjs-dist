/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
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
"use strict";

var _test_utils = require("./test_utils.js");

var _event_utils = require("../../web/event_utils.js");

var _api = require("../../display/api.js");

var _pdf_find_controller = require("../../web/pdf_find_controller.js");

var _pdf_link_service = require("../../web/pdf_link_service.js");

const tracemonkeyFileName = "tracemonkey.pdf";

class MockLinkService extends _pdf_link_service.SimpleLinkService {
  constructor() {
    super();
    this._page = 1;
    this._pdfDocument = null;
  }

  setDocument(pdfDocument) {
    this._pdfDocument = pdfDocument;
  }

  get pagesCount() {
    return this._pdfDocument.numPages;
  }

  get page() {
    return this._page;
  }

  set page(value) {
    this._page = value;
  }

}

async function initPdfFindController(filename) {
  const loadingTask = (0, _api.getDocument)((0, _test_utils.buildGetDocumentParams)(filename || tracemonkeyFileName));
  const pdfDocument = await loadingTask.promise;
  const eventBus = new _event_utils.EventBus();
  const linkService = new MockLinkService();
  linkService.setDocument(pdfDocument);
  const pdfFindController = new _pdf_find_controller.PDFFindController({
    linkService,
    eventBus
  });
  pdfFindController.setDocument(pdfDocument);
  return {
    eventBus,
    pdfFindController
  };
}

function testSearch({
  eventBus,
  pdfFindController,
  state,
  matchesPerPage,
  selectedMatch,
  pageMatches = null,
  pageMatchesLength = null
}) {
  return new Promise(function (resolve) {
    const eventState = Object.assign(Object.create(null), {
      source: this,
      type: "",
      query: null,
      caseSensitive: false,
      entireWord: false,
      phraseSearch: true,
      findPrevious: false
    }, state);
    eventBus.dispatch("find", eventState);
    let totalPages = matchesPerPage.length;

    for (let i = totalPages - 1; i >= 0; i--) {
      if (matchesPerPage[i] > 0) {
        totalPages = i + 1;
        break;
      }
    }

    const totalMatches = matchesPerPage.reduce((a, b) => {
      return a + b;
    });
    eventBus.on("updatefindmatchescount", function onUpdateFindMatchesCount(evt) {
      if (pdfFindController.pageMatches.length !== totalPages) {
        return;
      }

      eventBus.off("updatefindmatchescount", onUpdateFindMatchesCount);
      expect(evt.matchesCount.total).toBe(totalMatches);

      for (let i = 0; i < totalPages; i++) {
        expect(pdfFindController.pageMatches[i].length).toEqual(matchesPerPage[i]);
      }

      expect(pdfFindController.selected.pageIdx).toEqual(selectedMatch.pageIndex);
      expect(pdfFindController.selected.matchIdx).toEqual(selectedMatch.matchIndex);

      if (pageMatches) {
        expect(pdfFindController.pageMatches).toEqual(pageMatches);
        expect(pdfFindController.pageMatchesLength).toEqual(pageMatchesLength);
      }

      resolve();
    });
  });
}

describe("pdf_find_controller", function () {
  it("performs a normal search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "Dynamic"
      },
      matchesPerPage: [11, 5, 0, 3, 0, 0, 0, 1, 1, 1, 0, 3, 4, 4],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      }
    });
  });
  it("performs a normal search and finds the previous result", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "conference",
        findPrevious: true
      },
      matchesPerPage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5],
      selectedMatch: {
        pageIndex: 13,
        matchIndex: 4
      }
    });
  });
  it("performs a case sensitive search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "Dynamic",
        caseSensitive: true
      },
      matchesPerPage: [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 3],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      }
    });
  });
  it("performs an entire word search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "Government",
        entireWord: true
      },
      matchesPerPage: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
      selectedMatch: {
        pageIndex: 12,
        matchIndex: 0
      }
    });
  });
  it("performs a multiple term (no phrase) search", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "alternate solution",
        phraseSearch: false
      },
      matchesPerPage: [0, 0, 0, 0, 0, 1, 0, 0, 4, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 5,
        matchIndex: 0
      }
    });
  });
  it("performs a normal search, where the text is normalized", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController("fraction-highlight.pdf");
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "fraction"
      },
      matchesPerPage: [3],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[19, 46, 62]],
      pageMatchesLength: [[8, 8, 8]]
    });
  });
});