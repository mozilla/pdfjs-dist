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
exports.GlobalImageCache = exports.LocalImageCache = void 0;

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

class LocalImageCache {
  constructor() {
    this._nameRefMap = new Map();
    this._imageMap = new Map();
    this._imageCache = new _primitives.RefSetCache();
  }

  getByName(name) {
    const ref = this._nameRefMap.get(name);

    if (ref) {
      return this.getByRef(ref);
    }

    return this._imageMap.get(name) || null;
  }

  getByRef(ref) {
    return this._imageCache.get(ref) || null;
  }

  set(name, ref = null, data) {
    if (!name) {
      throw new Error('LocalImageCache.set - expected "name" argument.');
    }

    if (ref) {
      if (this._imageCache.has(ref)) {
        return;
      }

      this._nameRefMap.set(name, ref);

      this._imageCache.put(ref, data);

      return;
    }

    if (this._imageMap.has(name)) {
      return;
    }

    this._imageMap.set(name, data);
  }

}

exports.LocalImageCache = LocalImageCache;

class GlobalImageCache {
  static get NUM_PAGES_THRESHOLD() {
    return (0, _util.shadow)(this, "NUM_PAGES_THRESHOLD", 2);
  }

  static get MAX_IMAGES_TO_CACHE() {
    return (0, _util.shadow)(this, "MAX_IMAGES_TO_CACHE", 10);
  }

  constructor() {
    this._refCache = new _primitives.RefSetCache();
    this._imageCache = new _primitives.RefSetCache();
  }

  shouldCache(ref, pageIndex) {
    const pageIndexSet = this._refCache.get(ref);

    const numPages = pageIndexSet ? pageIndexSet.size + (pageIndexSet.has(pageIndex) ? 0 : 1) : 1;

    if (numPages < GlobalImageCache.NUM_PAGES_THRESHOLD) {
      return false;
    }

    if (!this._imageCache.has(ref) && this._imageCache.size >= GlobalImageCache.MAX_IMAGES_TO_CACHE) {
      return false;
    }

    return true;
  }

  addPageIndex(ref, pageIndex) {
    let pageIndexSet = this._refCache.get(ref);

    if (!pageIndexSet) {
      pageIndexSet = new Set();

      this._refCache.put(ref, pageIndexSet);
    }

    pageIndexSet.add(pageIndex);
  }

  getData(ref, pageIndex) {
    if (!this._refCache.has(ref)) {
      return null;
    }

    const pageIndexSet = this._refCache.get(ref);

    if (pageIndexSet.size < GlobalImageCache.NUM_PAGES_THRESHOLD) {
      return null;
    }

    if (!this._imageCache.has(ref)) {
      return null;
    }

    pageIndexSet.add(pageIndex);
    return this._imageCache.get(ref);
  }

  setData(ref, data) {
    if (!this._refCache.has(ref)) {
      throw new Error('GlobalImageCache.setData - expected "addPageIndex" to have been called.');
    }

    if (this._imageCache.has(ref)) {
      return;
    }

    if (this._imageCache.size >= GlobalImageCache.MAX_IMAGES_TO_CACHE) {
      (0, _util.info)("GlobalImageCache.setData - ignoring image above MAX_IMAGES_TO_CACHE.");
      return;
    }

    this._imageCache.put(ref, data);
  }

  clear(onlyData = false) {
    if (!onlyData) {
      this._refCache.clear();
    }

    this._imageCache.clear();
  }

}

exports.GlobalImageCache = GlobalImageCache;