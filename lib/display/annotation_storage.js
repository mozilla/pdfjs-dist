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
exports.AnnotationStorage = void 0;

class AnnotationStorage {
  constructor() {
    this._storage = new Map();
    this._modified = false;
    this.onSetModified = null;
    this.onResetModified = null;
  }

  getOrCreateValue(key, defaultValue) {
    if (this._storage.has(key)) {
      return this._storage.get(key);
    }

    this._storage.set(key, defaultValue);

    return defaultValue;
  }

  setValue(key, value) {
    if (this._storage.get(key) !== value) {
      this._setModified();
    }

    this._storage.set(key, value);
  }

  getAll() {
    if (this._storage.size === 0) {
      return null;
    }

    return Object.fromEntries(this._storage);
  }

  get size() {
    return this._storage.size;
  }

  _setModified() {
    if (!this._modified) {
      this._modified = true;

      if (typeof this.onSetModified === "function") {
        this.onSetModified();
      }
    }
  }

  resetModified() {
    if (this._modified) {
      this._modified = false;

      if (typeof this.onResetModified === "function") {
        this.onResetModified();
      }
    }
  }

}

exports.AnnotationStorage = AnnotationStorage;