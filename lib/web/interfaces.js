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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IRenderableView = exports.IPDFXfaLayerFactory = exports.IPDFTextLayerFactory = exports.IPDFStructTreeLayerFactory = exports.IPDFLinkService = exports.IPDFHistory = exports.IPDFAnnotationLayerFactory = exports.IL10n = void 0;

class IPDFLinkService {
  get pagesCount() {}

  get page() {}

  set page(value) {}

  get rotation() {}

  set rotation(value) {}

  get externalLinkEnabled() {}

  set externalLinkEnabled(value) {}

  async goToDestination(dest) {}

  goToPage(val) {}

  getDestinationHash(dest) {}

  getAnchorUrl(hash) {}

  setHash(hash) {}

  executeNamedAction(action) {}

  cachePageRef(pageNum, pageRef) {}

  isPageVisible(pageNumber) {}

  isPageCached(pageNumber) {}

}

exports.IPDFLinkService = IPDFLinkService;

class IPDFHistory {
  initialize({
    fingerprint,
    resetHistory = false,
    updateUrl = false
  }) {}

  reset() {}

  push({
    namedDest = null,
    explicitDest,
    pageNumber
  }) {}

  pushPage(pageNumber) {}

  pushCurrentPosition() {}

  back() {}

  forward() {}

}

exports.IPDFHistory = IPDFHistory;

class IRenderableView {
  get renderingId() {}

  get renderingState() {}

  draw() {}

  resume() {}

}

exports.IRenderableView = IRenderableView;

class IPDFTextLayerFactory {
  createTextLayerBuilder(textLayerDiv, pageIndex, viewport, enhanceTextSelection = false, eventBus) {}

}

exports.IPDFTextLayerFactory = IPDFTextLayerFactory;

class IPDFAnnotationLayerFactory {
  createAnnotationLayerBuilder(pageDiv, pdfPage, annotationStorage = null, imageResourcesPath = "", renderInteractiveForms = true, l10n = undefined, enableScripting = false, hasJSActionsPromise = null, mouseState = null) {}

}

exports.IPDFAnnotationLayerFactory = IPDFAnnotationLayerFactory;

class IPDFXfaLayerFactory {
  createXfaLayerBuilder(pageDiv, pdfPage) {}

}

exports.IPDFXfaLayerFactory = IPDFXfaLayerFactory;

class IPDFStructTreeLayerFactory {
  createStructTreeLayerBuilder(pdfPage) {}

}

exports.IPDFStructTreeLayerFactory = IPDFStructTreeLayerFactory;

class IL10n {
  async getLanguage() {}

  async getDirection() {}

  async get(key, args, fallback) {}

  async translate(element) {}

}

exports.IL10n = IL10n;