/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2019 Mozilla Foundation
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
exports.getLookupTableFactory = getLookupTableFactory;
exports.getInheritableProperty = getInheritableProperty;
exports.toRomanNumerals = toRomanNumerals;
exports.XRefParseException = exports.XRefEntryException = exports.MissingDataException = void 0;

var _util = require("../shared/util");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function getLookupTableFactory(initializer) {
  var lookup;
  return function () {
    if (initializer) {
      lookup = Object.create(null);
      initializer(lookup);
      initializer = null;
    }

    return lookup;
  };
}

var MissingDataException =
/*#__PURE__*/
function (_BaseException) {
  _inherits(MissingDataException, _BaseException);

  function MissingDataException(begin, end) {
    var _this;

    _classCallCheck(this, MissingDataException);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MissingDataException).call(this, "Missing data [".concat(begin, ", ").concat(end, ")")));
    _this.begin = begin;
    _this.end = end;
    return _this;
  }

  return MissingDataException;
}(_util.BaseException);

exports.MissingDataException = MissingDataException;

var XRefEntryException =
/*#__PURE__*/
function (_BaseException2) {
  _inherits(XRefEntryException, _BaseException2);

  function XRefEntryException() {
    _classCallCheck(this, XRefEntryException);

    return _possibleConstructorReturn(this, _getPrototypeOf(XRefEntryException).apply(this, arguments));
  }

  return XRefEntryException;
}(_util.BaseException);

exports.XRefEntryException = XRefEntryException;

var XRefParseException =
/*#__PURE__*/
function (_BaseException3) {
  _inherits(XRefParseException, _BaseException3);

  function XRefParseException() {
    _classCallCheck(this, XRefParseException);

    return _possibleConstructorReturn(this, _getPrototypeOf(XRefParseException).apply(this, arguments));
  }

  return XRefParseException;
}(_util.BaseException);

exports.XRefParseException = XRefParseException;

function getInheritableProperty(_ref) {
  var dict = _ref.dict,
      key = _ref.key,
      _ref$getArray = _ref.getArray,
      getArray = _ref$getArray === void 0 ? false : _ref$getArray,
      _ref$stopWhenFound = _ref.stopWhenFound,
      stopWhenFound = _ref$stopWhenFound === void 0 ? true : _ref$stopWhenFound;
  var LOOP_LIMIT = 100;
  var loopCount = 0;
  var values;

  while (dict) {
    var value = getArray ? dict.getArray(key) : dict.get(key);

    if (value !== undefined) {
      if (stopWhenFound) {
        return value;
      }

      if (!values) {
        values = [];
      }

      values.push(value);
    }

    if (++loopCount > LOOP_LIMIT) {
      (0, _util.warn)("getInheritableProperty: maximum loop count exceeded for \"".concat(key, "\""));
      break;
    }

    dict = dict.get('Parent');
  }

  return values;
}

var ROMAN_NUMBER_MAP = ['', 'C', 'CC', 'CCC', 'CD', 'D', 'DC', 'DCC', 'DCCC', 'CM', '', 'X', 'XX', 'XXX', 'XL', 'L', 'LX', 'LXX', 'LXXX', 'XC', '', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

function toRomanNumerals(number) {
  var lowerCase = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  (0, _util.assert)(Number.isInteger(number) && number > 0, 'The number should be a positive integer.');
  var pos,
      romanBuf = [];

  while (number >= 1000) {
    number -= 1000;
    romanBuf.push('M');
  }

  pos = number / 100 | 0;
  number %= 100;
  romanBuf.push(ROMAN_NUMBER_MAP[pos]);
  pos = number / 10 | 0;
  number %= 10;
  romanBuf.push(ROMAN_NUMBER_MAP[10 + pos]);
  romanBuf.push(ROMAN_NUMBER_MAP[20 + number]);
  var romanStr = romanBuf.join('');
  return lowerCase ? romanStr.toLowerCase() : romanStr;
}