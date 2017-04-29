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

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function IPDFLinkService() {}
IPDFLinkService.prototype = {
  get page() {},
  set page(value) {},
  navigateTo: function navigateTo(dest) {},
  getDestinationHash: function getDestinationHash(dest) {},
  getAnchorUrl: function getAnchorUrl(hash) {},
  setHash: function setHash(hash) {},
  executeNamedAction: function executeNamedAction(action) {},
  cachePageRef: function cachePageRef(pageNum, pageRef) {}
};
function IPDFHistory() {}
IPDFHistory.prototype = {
  forward: function forward() {},
  back: function back() {},
  push: function push(params) {},
  updateNextHashParam: function updateNextHashParam(hash) {}
};
function IRenderableView() {}
IRenderableView.prototype = {
  get renderingId() {},
  get renderingState() {},
  draw: function draw() {},
  resume: function resume() {}
};
function IPDFTextLayerFactory() {}
IPDFTextLayerFactory.prototype = {
  createTextLayerBuilder: function createTextLayerBuilder(textLayerDiv, pageIndex, viewport) {
    var enhanceTextSelection = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  }
};

var IPDFAnnotationLayerFactory = function () {
  function IPDFAnnotationLayerFactory() {
    _classCallCheck(this, IPDFAnnotationLayerFactory);
  }

  _createClass(IPDFAnnotationLayerFactory, [{
    key: 'createAnnotationLayerBuilder',
    value: function createAnnotationLayerBuilder(pageDiv, pdfPage) {
      var renderInteractiveForms = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    }
  }]);

  return IPDFAnnotationLayerFactory;
}();