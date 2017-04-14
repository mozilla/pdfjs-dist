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
exports.PDFOutlineViewer = undefined;

var _pdfjs = require('./pdfjs');

var DEFAULT_TITLE = '\u2013';
var PDFOutlineViewer = function PDFOutlineViewerClosure() {
  function PDFOutlineViewer(options) {
    this.outline = null;
    this.lastToggleIsShow = true;
    this.container = options.container;
    this.linkService = options.linkService;
    this.eventBus = options.eventBus;
  }
  PDFOutlineViewer.prototype = {
    reset: function PDFOutlineViewer_reset() {
      this.outline = null;
      this.lastToggleIsShow = true;
      this.container.textContent = '';
      this.container.classList.remove('outlineWithDeepNesting');
    },
    _dispatchEvent: function PDFOutlineViewer_dispatchEvent(outlineCount) {
      this.eventBus.dispatch('outlineloaded', {
        source: this,
        outlineCount: outlineCount
      });
    },
    _bindLink: function PDFOutlineViewer_bindLink(element, item) {
      if (item.url) {
        (0, _pdfjs.addLinkAttributes)(element, {
          url: item.url,
          target: item.newWindow ? _pdfjs.PDFJS.LinkTarget.BLANK : undefined
        });
        return;
      }
      var self = this,
          destination = item.dest;
      element.href = self.linkService.getDestinationHash(destination);
      element.onclick = function () {
        if (destination) {
          self.linkService.navigateTo(destination);
        }
        return false;
      };
    },
    _setStyles: function PDFOutlineViewer_setStyles(element, item) {
      var styleStr = '';
      if (item.bold) {
        styleStr += 'font-weight: bold;';
      }
      if (item.italic) {
        styleStr += 'font-style: italic;';
      }
      if (styleStr) {
        element.setAttribute('style', styleStr);
      }
    },
    _addToggleButton: function PDFOutlineViewer_addToggleButton(div) {
      var toggler = document.createElement('div');
      toggler.className = 'outlineItemToggler';
      toggler.onclick = function (event) {
        event.stopPropagation();
        toggler.classList.toggle('outlineItemsHidden');
        if (event.shiftKey) {
          var shouldShowAll = !toggler.classList.contains('outlineItemsHidden');
          this._toggleOutlineItem(div, shouldShowAll);
        }
      }.bind(this);
      div.insertBefore(toggler, div.firstChild);
    },
    _toggleOutlineItem: function PDFOutlineViewer_toggleOutlineItem(root, show) {
      this.lastToggleIsShow = show;
      var togglers = root.querySelectorAll('.outlineItemToggler');
      for (var i = 0, ii = togglers.length; i < ii; ++i) {
        togglers[i].classList[show ? 'remove' : 'add']('outlineItemsHidden');
      }
    },
    toggleOutlineTree: function PDFOutlineViewer_toggleOutlineTree() {
      if (!this.outline) {
        return;
      }
      this._toggleOutlineItem(this.container, !this.lastToggleIsShow);
    },
    render: function PDFOutlineViewer_render(params) {
      var outline = params && params.outline || null;
      var outlineCount = 0;
      if (this.outline) {
        this.reset();
      }
      this.outline = outline;
      if (!outline) {
        this._dispatchEvent(outlineCount);
        return;
      }
      var fragment = document.createDocumentFragment();
      var queue = [{
        parent: fragment,
        items: this.outline
      }];
      var hasAnyNesting = false;
      while (queue.length > 0) {
        var levelData = queue.shift();
        for (var i = 0, len = levelData.items.length; i < len; i++) {
          var item = levelData.items[i];
          var div = document.createElement('div');
          div.className = 'outlineItem';
          var element = document.createElement('a');
          this._bindLink(element, item);
          this._setStyles(element, item);
          element.textContent = (0, _pdfjs.removeNullCharacters)(item.title) || DEFAULT_TITLE;
          div.appendChild(element);
          if (item.items.length > 0) {
            hasAnyNesting = true;
            this._addToggleButton(div);
            var itemsDiv = document.createElement('div');
            itemsDiv.className = 'outlineItems';
            div.appendChild(itemsDiv);
            queue.push({
              parent: itemsDiv,
              items: item.items
            });
          }
          levelData.parent.appendChild(div);
          outlineCount++;
        }
      }
      if (hasAnyNesting) {
        this.container.classList.add('outlineWithDeepNesting');
      }
      this.container.appendChild(fragment);
      this._dispatchEvent(outlineCount);
    }
  };
  return PDFOutlineViewer;
}();
exports.PDFOutlineViewer = PDFOutlineViewer;