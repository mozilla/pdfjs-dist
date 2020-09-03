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

var _annotation_storage = require("../../display/annotation_storage.js");

describe("AnnotationStorage", function () {
  describe("GetOrCreateValue", function () {
    it("should get and set a new value in the annotation storage", function (done) {
      const annotationStorage = new _annotation_storage.AnnotationStorage();
      let value = annotationStorage.getOrCreateValue("123A", "hello world");
      expect(value).toEqual("hello world");
      value = annotationStorage.getOrCreateValue("123A", "an other string");
      expect(value).toEqual("hello world");
      done();
    });
  });
  describe("SetValue", function () {
    it("should set a new value in the annotation storage", function (done) {
      const annotationStorage = new _annotation_storage.AnnotationStorage();
      annotationStorage.setValue("123A", "an other string");
      const value = annotationStorage.getAll()["123A"];
      expect(value).toEqual("an other string");
      done();
    });
    it("should call onSetModified() if value is changed", function (done) {
      const annotationStorage = new _annotation_storage.AnnotationStorage();
      let called = false;

      const callback = function () {
        called = true;
      };

      annotationStorage.onSetModified = callback;
      annotationStorage.getOrCreateValue("asdf", "original");
      expect(called).toBe(false);
      annotationStorage.setValue("asdf", "original");
      expect(called).toBe(false);
      annotationStorage.setValue("asdf", "modified");
      expect(called).toBe(true);
      done();
    });
  });
  describe("ResetModified", function () {
    it("should call onResetModified() if set", function (done) {
      const annotationStorage = new _annotation_storage.AnnotationStorage();
      let called = false;

      const callback = function () {
        called = true;
      };

      annotationStorage.onResetModified = callback;
      annotationStorage.getOrCreateValue("asdf", "original");
      annotationStorage.setValue("asdf", "original");
      annotationStorage.resetModified();
      expect(called).toBe(false);
      annotationStorage.setValue("asdf", "modified");
      annotationStorage.resetModified();
      expect(called).toBe(true);
      done();
    });
  });
});