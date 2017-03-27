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

var pdfjsLib = require('./pdfjs.js');
var PDFAttachmentViewer = function PDFAttachmentViewerClosure() {
  function PDFAttachmentViewer(options) {
    this.attachments = null;
    this.container = options.container;
    this.eventBus = options.eventBus;
    this.downloadManager = options.downloadManager;
    this._renderedCapability = pdfjsLib.createPromiseCapability();
    this.eventBus.on('fileattachmentannotation', this._appendAttachment.bind(this));
  }
  PDFAttachmentViewer.prototype = {
    reset: function PDFAttachmentViewer_reset(keepRenderedCapability) {
      this.attachments = null;
      this.container.textContent = '';
      if (!keepRenderedCapability) {
        this._renderedCapability = pdfjsLib.createPromiseCapability();
      }
    },
    _dispatchEvent: function PDFAttachmentViewer_dispatchEvent(attachmentsCount) {
      this.eventBus.dispatch('attachmentsloaded', {
        source: this,
        attachmentsCount: attachmentsCount
      });
      this._renderedCapability.resolve();
    },
    _bindPdfLink: function PDFAttachmentViewer_bindPdfLink(button, content, filename) {
      var blobUrl;
      button.onclick = function () {
        if (!blobUrl) {
          blobUrl = pdfjsLib.createObjectURL(content, 'application/pdf', pdfjsLib.PDFJS.disableCreateObjectURL);
        }
        var viewerUrl;
        viewerUrl = '?file=' + encodeURIComponent(blobUrl + '#' + filename);
        window.open(viewerUrl);
        return false;
      };
    },
    _bindLink: function PDFAttachmentViewer_bindLink(button, content, filename) {
      button.onclick = function downloadFile(e) {
        this.downloadManager.downloadData(content, filename, '');
        return false;
      }.bind(this);
    },
    render: function PDFAttachmentViewer_render(params) {
      params = params || {};
      var attachments = params.attachments || null;
      var attachmentsCount = 0;
      if (this.attachments) {
        var keepRenderedCapability = params.keepRenderedCapability === true;
        this.reset(keepRenderedCapability);
      }
      this.attachments = attachments;
      if (!attachments) {
        this._dispatchEvent(attachmentsCount);
        return;
      }
      var names = Object.keys(attachments).sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
      });
      attachmentsCount = names.length;
      for (var i = 0; i < attachmentsCount; i++) {
        var item = attachments[names[i]];
        var filename = pdfjsLib.getFilenameFromUrl(item.filename);
        filename = pdfjsLib.removeNullCharacters(filename);
        var div = document.createElement('div');
        div.className = 'attachmentsItem';
        var button = document.createElement('button');
        button.textContent = filename;
        if (/\.pdf$/i.test(filename)) {
          this._bindPdfLink(button, item.content, filename);
        } else {
          this._bindLink(button, item.content, filename);
        }
        div.appendChild(button);
        this.container.appendChild(div);
      }
      this._dispatchEvent(attachmentsCount);
    },
    _appendAttachment: function PDFAttachmentViewer_appendAttachment(item) {
      this._renderedCapability.promise.then(function (id, filename, content) {
        var attachments = this.attachments;
        if (!attachments) {
          attachments = Object.create(null);
        } else {
          for (var name in attachments) {
            if (id === name) {
              return;
            }
          }
        }
        attachments[id] = {
          filename: filename,
          content: content
        };
        this.render({
          attachments: attachments,
          keepRenderedCapability: true
        });
      }.bind(this, item.id, item.filename, item.content));
    }
  };
  return PDFAttachmentViewer;
}();
exports.PDFAttachmentViewer = PDFAttachmentViewer;