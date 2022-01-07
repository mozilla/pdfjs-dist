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
exports.NodeStandardFontDataFactory = exports.NodeCanvasFactory = exports.NodeCMapReaderFactory = void 0;

var _base_factory = require("./base_factory.js");

var _is_node = require("../shared/is_node.js");

var _util = require("../shared/util.js");

let NodeCanvasFactory = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: NodeCanvasFactory");
  }

};
exports.NodeCanvasFactory = NodeCanvasFactory;
let NodeCMapReaderFactory = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: NodeCMapReaderFactory");
  }

};
exports.NodeCMapReaderFactory = NodeCMapReaderFactory;
let NodeStandardFontDataFactory = class {
  constructor() {
    (0, _util.unreachable)("Not implemented: NodeStandardFontDataFactory");
  }

};
exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory;

if (_is_node.isNodeJS) {
  const fetchData = function (url) {
    return new Promise((resolve, reject) => {
      const fs = require("fs");

      fs.readFile(url, (error, data) => {
        if (error || !data) {
          reject(new Error(error));
          return;
        }

        resolve(new Uint8Array(data));
      });
    });
  };

  exports.NodeCanvasFactory = NodeCanvasFactory = class extends _base_factory.BaseCanvasFactory {
    _createCanvas(width, height) {
      const Canvas = require("canvas");

      return Canvas.createCanvas(width, height);
    }

  };
  exports.NodeCMapReaderFactory = NodeCMapReaderFactory = class extends _base_factory.BaseCMapReaderFactory {
    _fetchData(url, compressionType) {
      return fetchData(url).then(data => {
        return {
          cMapData: data,
          compressionType
        };
      });
    }

  };
  exports.NodeStandardFontDataFactory = NodeStandardFontDataFactory = class extends _base_factory.BaseStandardFontDataFactory {
    _fetchData(url) {
      return fetchData(url);
    }

  };
}