/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2017 Mozilla Foundation
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
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _util = require('../../shared/util');

describe('util', function () {
  describe('bytesToString', function () {
    it('handles non-array arguments', function () {
      expect(function () {
        (0, _util.bytesToString)(null);
      }).toThrow(new Error('Invalid argument for bytesToString'));
    });
    it('handles array arguments with a length not exceeding the maximum', function () {
      expect((0, _util.bytesToString)(new Uint8Array([]))).toEqual('');
      expect((0, _util.bytesToString)(new Uint8Array([102, 111, 111]))).toEqual('foo');
    });
    it('handles array arguments with a length exceeding the maximum', function () {
      var length = 10000;
      var bytes = new Uint8Array(length);
      for (var i = 0; i < length; i++) {
        bytes[i] = 'a'.charCodeAt(0);
      }
      var string = Array(length + 1).join('a');
      expect((0, _util.bytesToString)(bytes)).toEqual(string);
    });
  });
  describe('isArrayBuffer', function () {
    it('handles array buffer values', function () {
      expect((0, _util.isArrayBuffer)(new ArrayBuffer(0))).toEqual(true);
      expect((0, _util.isArrayBuffer)(new Uint8Array(0))).toEqual(true);
    });
    it('handles non-array buffer values', function () {
      expect((0, _util.isArrayBuffer)('true')).toEqual(false);
      expect((0, _util.isArrayBuffer)(1)).toEqual(false);
      expect((0, _util.isArrayBuffer)(null)).toEqual(false);
      expect((0, _util.isArrayBuffer)(undefined)).toEqual(false);
    });
  });
  describe('isBool', function () {
    it('handles boolean values', function () {
      expect((0, _util.isBool)(true)).toEqual(true);
      expect((0, _util.isBool)(false)).toEqual(true);
    });
    it('handles non-boolean values', function () {
      expect((0, _util.isBool)('true')).toEqual(false);
      expect((0, _util.isBool)('false')).toEqual(false);
      expect((0, _util.isBool)(1)).toEqual(false);
      expect((0, _util.isBool)(0)).toEqual(false);
      expect((0, _util.isBool)(null)).toEqual(false);
      expect((0, _util.isBool)(undefined)).toEqual(false);
    });
  });
  describe('isEmptyObj', function () {
    it('handles empty objects', function () {
      expect((0, _util.isEmptyObj)({})).toEqual(true);
    });
    it('handles non-empty objects', function () {
      expect((0, _util.isEmptyObj)({ foo: 'bar' })).toEqual(false);
    });
  });
  describe('isNum', function () {
    it('handles numeric values', function () {
      expect((0, _util.isNum)(1)).toEqual(true);
      expect((0, _util.isNum)(0)).toEqual(true);
      expect((0, _util.isNum)(-1)).toEqual(true);
      expect((0, _util.isNum)(1000000000000000000)).toEqual(true);
      expect((0, _util.isNum)(12.34)).toEqual(true);
    });
    it('handles non-numeric values', function () {
      expect((0, _util.isNum)('true')).toEqual(false);
      expect((0, _util.isNum)(true)).toEqual(false);
      expect((0, _util.isNum)(null)).toEqual(false);
      expect((0, _util.isNum)(undefined)).toEqual(false);
    });
  });
  describe('isSpace', function () {
    it('handles space characters', function () {
      expect((0, _util.isSpace)(0x20)).toEqual(true);
      expect((0, _util.isSpace)(0x09)).toEqual(true);
      expect((0, _util.isSpace)(0x0D)).toEqual(true);
      expect((0, _util.isSpace)(0x0A)).toEqual(true);
    });
    it('handles non-space characters', function () {
      expect((0, _util.isSpace)(0x0B)).toEqual(false);
      expect((0, _util.isSpace)(null)).toEqual(false);
      expect((0, _util.isSpace)(undefined)).toEqual(false);
    });
  });
  describe('isString', function () {
    it('handles string values', function () {
      expect((0, _util.isString)('foo')).toEqual(true);
      expect((0, _util.isString)('')).toEqual(true);
    });
    it('handles non-string values', function () {
      expect((0, _util.isString)(true)).toEqual(false);
      expect((0, _util.isString)(1)).toEqual(false);
      expect((0, _util.isString)(null)).toEqual(false);
      expect((0, _util.isString)(undefined)).toEqual(false);
    });
  });
  describe('log2', function () {
    it('handles values smaller than/equal to zero', function () {
      expect((0, _util.log2)(0)).toEqual(0);
      expect((0, _util.log2)(-1)).toEqual(0);
    });
    it('handles values larger than zero', function () {
      expect((0, _util.log2)(1)).toEqual(0);
      expect((0, _util.log2)(2)).toEqual(1);
      expect((0, _util.log2)(3)).toEqual(2);
      expect((0, _util.log2)(3.14)).toEqual(2);
    });
  });
  describe('stringToBytes', function () {
    it('handles non-string arguments', function () {
      expect(function () {
        (0, _util.stringToBytes)(null);
      }).toThrow(new Error('Invalid argument for stringToBytes'));
    });
    it('handles string arguments', function () {
      expect((0, _util.stringToBytes)('')).toEqual(new Uint8Array([]));
      expect((0, _util.stringToBytes)('foo')).toEqual(new Uint8Array([102, 111, 111]));
    });
  });
  describe('stringToPDFString', function () {
    it('handles ISO Latin 1 strings', function () {
      var str = '\x8Dstring\x8E';
      expect((0, _util.stringToPDFString)(str)).toEqual('\u201Cstring\u201D');
    });
    it('handles UTF-16BE strings', function () {
      var str = '\xFE\xFF\x00\x73\x00\x74\x00\x72\x00\x69\x00\x6E\x00\x67';
      expect((0, _util.stringToPDFString)(str)).toEqual('string');
    });
    it('handles empty strings', function () {
      var str1 = '';
      expect((0, _util.stringToPDFString)(str1)).toEqual('');
      var str2 = '\xFE\xFF';
      expect((0, _util.stringToPDFString)(str2)).toEqual('');
    });
  });
  describe('removeNullCharacters', function () {
    it('should not modify string without null characters', function () {
      var str = 'string without null chars';
      expect((0, _util.removeNullCharacters)(str)).toEqual('string without null chars');
    });
    it('should modify string with null characters', function () {
      var str = 'string\x00With\x00Null\x00Chars';
      expect((0, _util.removeNullCharacters)(str)).toEqual('stringWithNullChars');
    });
  });
  describe('ReadableStream', function () {
    it('should return an Object', function () {
      var readable = new _util.ReadableStream();
      expect(typeof readable === 'undefined' ? 'undefined' : _typeof(readable)).toEqual('object');
    });
    it('should have property getReader', function () {
      var readable = new _util.ReadableStream();
      expect(_typeof(readable.getReader)).toEqual('function');
    });
  });
});