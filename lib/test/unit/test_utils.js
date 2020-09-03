/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2020 Mozilla Foundation
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
exports.buildGetDocumentParams = buildGetDocumentParams;
exports.createIdFactory = createIdFactory;
exports.isEmptyObj = isEmptyObj;
exports.TEST_PDFS_PATH = exports.XRefMock = exports.NodeFileReaderFactory = exports.DOMFileReaderFactory = void 0;

var _primitives = require("../../core/primitives.js");

var _document = require("../../core/document.js");

var _util = require("../../shared/util.js");

var _is_node = require("../../shared/is_node.js");

var _stream = require("../../core/stream.js");

class DOMFileReaderFactory {
  static async fetch(params) {
    const response = await fetch(params.path);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return new Uint8Array(await response.arrayBuffer());
  }

}

exports.DOMFileReaderFactory = DOMFileReaderFactory;

class NodeFileReaderFactory {
  static async fetch(params) {
    const fs = require("fs");

    return new Promise((resolve, reject) => {
      fs.readFile(params.path, (error, data) => {
        if (error || !data) {
          reject(error || new Error(`Empty file for: ${params.path}`));
          return;
        }

        resolve(new Uint8Array(data));
      });
    });
  }

}

exports.NodeFileReaderFactory = NodeFileReaderFactory;
const TEST_PDFS_PATH = {
  dom: "../pdfs/",
  node: "./test/pdfs/"
};
exports.TEST_PDFS_PATH = TEST_PDFS_PATH;

function buildGetDocumentParams(filename, options) {
  const params = Object.create(null);

  if (_is_node.isNodeJS) {
    params.url = TEST_PDFS_PATH.node + filename;
  } else {
    params.url = new URL(TEST_PDFS_PATH.dom + filename, window.location).href;
  }

  for (const option in options) {
    params[option] = options[option];
  }

  return params;
}

class XRefMock {
  constructor(array) {
    this._map = Object.create(null);
    this.stats = {
      streamTypes: Object.create(null),
      fontTypes: Object.create(null)
    };
    this._newRefNum = null;

    for (const key in array) {
      const obj = array[key];
      this._map[obj.ref.toString()] = obj.data;
    }
  }

  getNewRef() {
    if (this._newRefNum === null) {
      this._newRefNum = Object.keys(this._map).length;
    }

    return _primitives.Ref.get(this._newRefNum++, 0);
  }

  resetNewRef() {
    this.newRef = null;
  }

  fetch(ref) {
    return this._map[ref.toString()];
  }

  fetchAsync(ref) {
    return Promise.resolve(this.fetch(ref));
  }

  fetchIfRef(obj) {
    if (!(0, _primitives.isRef)(obj)) {
      return obj;
    }

    return this.fetch(obj);
  }

  fetchIfRefAsync(obj) {
    return Promise.resolve(this.fetchIfRef(obj));
  }

}

exports.XRefMock = XRefMock;

function createIdFactory(pageIndex) {
  const pdfManager = {
    get docId() {
      return "d0";
    }

  };
  const stream = new _stream.StringStream("Dummy_PDF_data");
  const pdfDocument = new _document.PDFDocument(pdfManager, stream);
  const page = new _document.Page({
    pdfManager: pdfDocument.pdfManager,
    xref: pdfDocument.xref,
    pageIndex,
    globalIdFactory: pdfDocument._globalIdFactory
  });
  return page._localIdFactory;
}

function isEmptyObj(obj) {
  (0, _util.assert)(typeof obj === "object" && obj !== null, "isEmptyObj - invalid argument.");
  return Object.keys(obj).length === 0;
}