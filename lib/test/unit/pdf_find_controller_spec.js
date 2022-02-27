/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2022 Mozilla Foundation
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

var _is_node = require("../../shared/is_node.js");

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
      findPrevious: false,
      matchDiacritics: false
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
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "1/2"
      },
      matchesPerPage: [2],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[27, 54]],
      pageMatchesLength: [[1, 1]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "½"
      },
      matchesPerPage: [2],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[27, 54]],
      pageMatchesLength: [[1, 1]]
    });
  });
  it("performs a normal search, where the text with diacritics is normalized", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController("french_diacritics.pdf");
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "a"
      },
      matchesPerPage: [6],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[0, 2, 4, 6, 8, 10]],
      pageMatchesLength: [[1, 1, 1, 1, 1, 1]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "u"
      },
      matchesPerPage: [6],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[44, 46, 48, 50, 52, 54]],
      pageMatchesLength: [[1, 1, 1, 1, 1, 1]]
    });
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "ë",
        matchDiacritics: true
      },
      matchesPerPage: [2],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[28, 30]],
      pageMatchesLength: [[1, 1]]
    });
  });
  it("performs a search where one of the results contains an hyphen", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "optimiz"
      },
      matchesPerPage: [1, 4, 2, 3, 3, 0, 2, 9, 1, 0, 0, 6, 3, 4],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      }
    });
  });
  it("performs a search where the result is on two lines", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "user experience"
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[2743]],
      pageMatchesLength: [[14]]
    });
  });
  it("performs a search where the result is on two lines with a punctuation at eol", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "version.the"
      },
      matchesPerPage: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 1,
        matchIndex: 0
      },
      pageMatches: [[], [1493]],
      pageMatchesLength: [[], [11]]
    });
  });
  it("performs a search with a minus sign in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "trace-based  just-in-time"
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[0], [], [], [], [], [], [], [], [], [], [], [], [], [2087]],
      pageMatchesLength: [[24], [], [], [], [], [], [], [], [], [], [], [], [], [24]]
    });
  });
  it("performs a search with square brackets in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "[Programming Languages]"
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1501]],
      pageMatchesLength: [[25]]
    });
  });
  it("performs a search with parenthesis in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "\t   (checks)"
      },
      matchesPerPage: [0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 1,
        matchIndex: 0
      },
      pageMatches: [[], [201]],
      pageMatchesLength: [[], [9]]
    });
  });
  it("performs a search with a final dot in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    const query = "complex applications.";
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1946]],
      pageMatchesLength: [[21]]
    });
  });
  it("performs a search with a dot in the query and a missing whitespace", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    const query = "complex applications.J";
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1946]],
      pageMatchesLength: [[23]]
    });
  });
  it("performs a search with a dot followed by a whitespace in the query", async function () {
    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController();
    const query = "complex applications. j";
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query
      },
      matchesPerPage: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[1946]],
      pageMatchesLength: [[23]]
    });
  });
  it("performs a search in a text containing diacritics before -\\n", async function () {
    if (_is_node.isNodeJS) {
      pending("Linked test-cases are not supported in Node.js.");
    }

    const {
      eventBus,
      pdfFindController
    } = await initPdfFindController("issue14562.pdf");
    await testSearch({
      eventBus,
      pdfFindController,
      state: {
        query: "ä",
        matchDiacritics: true
      },
      matchesPerPage: [80],
      selectedMatch: {
        pageIndex: 0,
        matchIndex: 0
      },
      pageMatches: [[299, 337, 414, 476, 623, 797, 978, 984, 1010, 1058, 1079, 1144, 1152, 1274, 1343, 1391, 1399, 1421, 1497, 1521, 1527, 1684, 1774, 1786, 1857, 1879, 1909, 1946, 2064, 2074, 2161, 2178, 2213, 2227, 2272, 2322, 2359, 2401, 2412, 2423, 2462, 2532, 2538, 2553, 2562, 2576, 2602, 2613, 2638, 2668, 2792, 2805, 2836, 2848, 2859, 2896, 2902, 2916, 2940, 2960, 3091, 3239, 3249, 3339, 3387, 3394, 3468, 3477, 3485, 3502, 3690, 3696, 3711, 3758, 3789, 3865, 3977, 4052, 4058, 4071]],
      pageMatchesLength: [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
    });
  });
});