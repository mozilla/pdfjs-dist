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
exports.NodeCMapReaderFactory = exports.NodeCanvasFactory = void 0;

var _display_utils = require("./display_utils.js");

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

if (_is_node.isNodeJS) {
  exports.NodeCanvasFactory = NodeCanvasFactory = class extends _display_utils.BaseCanvasFactory {
    create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error("Invalid canvas size");
      }

      const Canvas = require("canvas");

      const canvas = Canvas.createCanvas(width, height);
      return {
        canvas,
        context: canvas.getContext("2d")
      };
    }

  };
  exports.NodeCMapReaderFactory = NodeCMapReaderFactory = class extends _display_utils.BaseCMapReaderFactory {
    _fetchData(url, compressionType) {
      return new Promise((resolve, reject) => {
        const fs = require("fs");

        fs.readFile(url, (error, data) => {
          if (error || !data) {
            reject(new Error(error));
            return;
          }

          resolve({
            cMapData: new Uint8Array(data),
            compressionType
          });
        });
      });
    }

  };
}