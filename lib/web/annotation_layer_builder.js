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

var uiUtils = require('./ui_utils.js');
var pdfLinkService = require('./pdf_link_service.js');
var pdfjsLib = require('./pdfjs.js');
var mozL10n = uiUtils.mozL10n;
var SimpleLinkService = pdfLinkService.SimpleLinkService;
var AnnotationLayerBuilder = function AnnotationLayerBuilderClosure() {
  function AnnotationLayerBuilder(options) {
    this.pageDiv = options.pageDiv;
    this.pdfPage = options.pdfPage;
    this.renderInteractiveForms = options.renderInteractiveForms;
    this.linkService = options.linkService;
    this.downloadManager = options.downloadManager;
    this.div = null;
  }
  AnnotationLayerBuilder.prototype = {
    render: function AnnotationLayerBuilder_render(viewport, intent) {
      var self = this;
      var parameters = { intent: intent === undefined ? 'display' : intent };
      this.pdfPage.getAnnotations(parameters).then(function (annotations) {
        viewport = viewport.clone({ dontFlip: true });
        parameters = {
          viewport: viewport,
          div: self.div,
          annotations: annotations,
          page: self.pdfPage,
          renderInteractiveForms: self.renderInteractiveForms,
          linkService: self.linkService,
          downloadManager: self.downloadManager
        };
        if (self.div) {
          pdfjsLib.AnnotationLayer.update(parameters);
        } else {
          if (annotations.length === 0) {
            return;
          }
          self.div = document.createElement('div');
          self.div.className = 'annotationLayer';
          self.pageDiv.appendChild(self.div);
          parameters.div = self.div;
          pdfjsLib.AnnotationLayer.render(parameters);
          if (typeof mozL10n !== 'undefined') {
            mozL10n.translate(self.div);
          }
        }
      });
    },
    hide: function AnnotationLayerBuilder_hide() {
      if (!this.div) {
        return;
      }
      this.div.setAttribute('hidden', 'true');
    }
  };
  return AnnotationLayerBuilder;
}();
function DefaultAnnotationLayerFactory() {}
DefaultAnnotationLayerFactory.prototype = {
  createAnnotationLayerBuilder: function (pageDiv, pdfPage, renderInteractiveForms) {
    return new AnnotationLayerBuilder({
      pageDiv: pageDiv,
      pdfPage: pdfPage,
      renderInteractiveForms: renderInteractiveForms,
      linkService: new SimpleLinkService()
    });
  }
};
exports.AnnotationLayerBuilder = AnnotationLayerBuilder;
exports.DefaultAnnotationLayerFactory = DefaultAnnotationLayerFactory;