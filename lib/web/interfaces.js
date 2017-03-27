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

function IPDFLinkService() {}
IPDFLinkService.prototype = {
  get page() {},
  set page(value) {},
  navigateTo: function (dest) {},
  getDestinationHash: function (dest) {},
  getAnchorUrl: function (hash) {},
  setHash: function (hash) {},
  executeNamedAction: function (action) {},
  cachePageRef: function (pageNum, pageRef) {}
};
function IPDFHistory() {}
IPDFHistory.prototype = {
  forward: function () {},
  back: function () {},
  push: function (params) {},
  updateNextHashParam: function (hash) {}
};
function IRenderableView() {}
IRenderableView.prototype = {
  get renderingId() {},
  get renderingState() {},
  draw: function () {},
  resume: function () {}
};
function IPDFTextLayerFactory() {}
IPDFTextLayerFactory.prototype = {
  createTextLayerBuilder: function (textLayerDiv, pageIndex, viewport, enhanceTextSelection) {}
};
function IPDFAnnotationLayerFactory() {}
IPDFAnnotationLayerFactory.prototype = {
  createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {}
};