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
exports.Metadata = void 0;

var _util = require("../shared/util.js");

class Metadata {
  constructor({
    parsedData,
    rawData
  }) {
    this._metadataMap = parsedData;
    this._data = rawData;
  }

  getRaw() {
    return this._data;
  }

  get(name) {
    return this._metadataMap.get(name) ?? null;
  }

  getAll() {
    return (0, _util.objectFromMap)(this._metadataMap);
  }

  has(name) {
    return this._metadataMap.has(name);
  }

}

exports.Metadata = Metadata;