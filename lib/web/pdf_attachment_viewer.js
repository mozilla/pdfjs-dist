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
exports.PDFAttachmentViewer = void 0;

var _pdf = require("../pdf");

var _base_tree_viewer = require("./base_tree_viewer.js");

class PDFAttachmentViewer extends _base_tree_viewer.BaseTreeViewer {
  constructor(options) {
    super(options);
    this.downloadManager = options.downloadManager;

    this.eventBus._on("fileattachmentannotation", this._appendAttachment.bind(this));
  }

  reset(keepRenderedCapability = false) {
    super.reset();
    this._attachments = null;

    if (!keepRenderedCapability) {
      this._renderedCapability = (0, _pdf.createPromiseCapability)();
    }

    if (this._pendingDispatchEvent) {
      clearTimeout(this._pendingDispatchEvent);
    }

    this._pendingDispatchEvent = null;
  }

  _dispatchEvent(attachmentsCount) {
    this._renderedCapability.resolve();

    if (this._pendingDispatchEvent) {
      clearTimeout(this._pendingDispatchEvent);
      this._pendingDispatchEvent = null;
    }

    if (attachmentsCount === 0) {
      this._pendingDispatchEvent = setTimeout(() => {
        this.eventBus.dispatch("attachmentsloaded", {
          source: this,
          attachmentsCount: 0
        });
        this._pendingDispatchEvent = null;
      });
      return;
    }

    this.eventBus.dispatch("attachmentsloaded", {
      source: this,
      attachmentsCount
    });
  }

  _bindLink(element, {
    content,
    filename
  }) {
    element.onclick = () => {
      this.downloadManager.openOrDownloadData(element, content, filename);
      return false;
    };
  }

  render({
    attachments,
    keepRenderedCapability = false
  }) {
    if (this._attachments) {
      this.reset(keepRenderedCapability);
    }

    this._attachments = attachments || null;

    if (!attachments) {
      this._dispatchEvent(0);

      return;
    }

    const names = Object.keys(attachments).sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase());
    });
    const fragment = document.createDocumentFragment();
    let attachmentsCount = 0;

    for (const name of names) {
      const item = attachments[name];
      const content = item.content,
            filename = (0, _pdf.getFilenameFromUrl)(item.filename);
      const div = document.createElement("div");
      div.className = "treeItem";
      const element = document.createElement("a");

      this._bindLink(element, {
        content,
        filename
      });

      element.textContent = this._normalizeTextContent(filename);
      div.appendChild(element);
      fragment.appendChild(div);
      attachmentsCount++;
    }

    this._finishRendering(fragment, attachmentsCount);
  }

  _appendAttachment({
    id,
    filename,
    content
  }) {
    const renderedPromise = this._renderedCapability.promise;
    renderedPromise.then(() => {
      if (renderedPromise !== this._renderedCapability.promise) {
        return;
      }

      let attachments = this._attachments;

      if (!attachments) {
        attachments = Object.create(null);
      } else {
        for (const name in attachments) {
          if (id === name) {
            return;
          }
        }
      }

      attachments[id] = {
        filename,
        content
      };
      this.render({
        attachments,
        keepRenderedCapability: true
      });
    });
  }

}

exports.PDFAttachmentViewer = PDFAttachmentViewer;