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

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("pdfjs-dist/image_decoders/pdf.image_decoders", [], factory);
	else if(typeof exports === 'object')
		exports["pdfjs-dist/image_decoders/pdf.image_decoders"] = factory();
	else
		root["pdfjs-dist/image_decoders/pdf.image_decoders"] = root.pdfjsImageDecoders = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __w_pdfjs_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __w_pdfjs_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__w_pdfjs_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__w_pdfjs_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__w_pdfjs_require__.d = function(exports, name, getter) {
/******/ 		if(!__w_pdfjs_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__w_pdfjs_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__w_pdfjs_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __w_pdfjs_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__w_pdfjs_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __w_pdfjs_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__w_pdfjs_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__w_pdfjs_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__w_pdfjs_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__w_pdfjs_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __w_pdfjs_require__(__w_pdfjs_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getVerbosityLevel", {
  enumerable: true,
  get: function get() {
    return _util.getVerbosityLevel;
  }
});
Object.defineProperty(exports, "setVerbosityLevel", {
  enumerable: true,
  get: function get() {
    return _util.setVerbosityLevel;
  }
});
Object.defineProperty(exports, "Jbig2mage", {
  enumerable: true,
  get: function get() {
    return _jbig.Jbig2mage;
  }
});
Object.defineProperty(exports, "JpegImage", {
  enumerable: true,
  get: function get() {
    return _jpg.JpegImage;
  }
});
Object.defineProperty(exports, "JpxImage", {
  enumerable: true,
  get: function get() {
    return _jpx.JpxImage;
  }
});

var _util = __w_pdfjs_require__(1);

var _jbig = __w_pdfjs_require__(158);

var _jpg = __w_pdfjs_require__(161);

var _jpx = __w_pdfjs_require__(162);

var pdfjsVersion = '2.3.200';
var pdfjsBuild = '4ae3f9fc';

/***/ }),
/* 1 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayByteLength = arrayByteLength;
exports.arraysToBytes = arraysToBytes;
exports.assert = assert;
exports.bytesToString = bytesToString;
exports.createPromiseCapability = createPromiseCapability;
exports.getVerbosityLevel = getVerbosityLevel;
exports.info = info;
exports.isArrayBuffer = isArrayBuffer;
exports.isArrayEqual = isArrayEqual;
exports.isBool = isBool;
exports.isEmptyObj = isEmptyObj;
exports.isNum = isNum;
exports.isString = isString;
exports.isSpace = isSpace;
exports.isSameOrigin = isSameOrigin;
exports.createValidAbsoluteUrl = createValidAbsoluteUrl;
exports.isLittleEndian = isLittleEndian;
exports.isEvalSupported = isEvalSupported;
exports.log2 = log2;
exports.readInt8 = readInt8;
exports.readUint16 = readUint16;
exports.readUint32 = readUint32;
exports.removeNullCharacters = removeNullCharacters;
exports.setVerbosityLevel = setVerbosityLevel;
exports.shadow = shadow;
exports.string32 = string32;
exports.stringToBytes = stringToBytes;
exports.stringToPDFString = stringToPDFString;
exports.stringToUTF8String = stringToUTF8String;
exports.utf8StringToString = utf8StringToString;
exports.warn = warn;
exports.unreachable = unreachable;
Object.defineProperty(exports, "ReadableStream", {
  enumerable: true,
  get: function () {
    return _streams_polyfill.ReadableStream;
  }
});
exports.createObjectURL = exports.FormatError = exports.Util = exports.UnknownErrorException = exports.UnexpectedResponseException = exports.TextRenderingMode = exports.StreamType = exports.PermissionFlag = exports.PasswordResponses = exports.PasswordException = exports.NativeImageDecoding = exports.MissingPDFException = exports.InvalidPDFException = exports.AbortException = exports.CMapCompressionType = exports.ImageKind = exports.FontType = exports.AnnotationType = exports.AnnotationStateModelType = exports.AnnotationReviewState = exports.AnnotationReplyType = exports.AnnotationMarkedState = exports.AnnotationFlag = exports.AnnotationFieldFlag = exports.AnnotationBorderStyleType = exports.UNSUPPORTED_FEATURES = exports.VerbosityLevel = exports.OPS = exports.IDENTITY_MATRIX = exports.FONT_IDENTITY_MATRIX = exports.BaseException = void 0;

__w_pdfjs_require__(2);

var _streams_polyfill = __w_pdfjs_require__(157);

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var IDENTITY_MATRIX = [1, 0, 0, 1, 0, 0];
exports.IDENTITY_MATRIX = IDENTITY_MATRIX;
var FONT_IDENTITY_MATRIX = [0.001, 0, 0, 0.001, 0, 0];
exports.FONT_IDENTITY_MATRIX = FONT_IDENTITY_MATRIX;
var NativeImageDecoding = {
  NONE: 'none',
  DECODE: 'decode',
  DISPLAY: 'display'
};
exports.NativeImageDecoding = NativeImageDecoding;
var PermissionFlag = {
  PRINT: 0x04,
  MODIFY_CONTENTS: 0x08,
  COPY: 0x10,
  MODIFY_ANNOTATIONS: 0x20,
  FILL_INTERACTIVE_FORMS: 0x100,
  COPY_FOR_ACCESSIBILITY: 0x200,
  ASSEMBLE: 0x400,
  PRINT_HIGH_QUALITY: 0x800
};
exports.PermissionFlag = PermissionFlag;
var TextRenderingMode = {
  FILL: 0,
  STROKE: 1,
  FILL_STROKE: 2,
  INVISIBLE: 3,
  FILL_ADD_TO_PATH: 4,
  STROKE_ADD_TO_PATH: 5,
  FILL_STROKE_ADD_TO_PATH: 6,
  ADD_TO_PATH: 7,
  FILL_STROKE_MASK: 3,
  ADD_TO_PATH_FLAG: 4
};
exports.TextRenderingMode = TextRenderingMode;
var ImageKind = {
  GRAYSCALE_1BPP: 1,
  RGB_24BPP: 2,
  RGBA_32BPP: 3
};
exports.ImageKind = ImageKind;
var AnnotationType = {
  TEXT: 1,
  LINK: 2,
  FREETEXT: 3,
  LINE: 4,
  SQUARE: 5,
  CIRCLE: 6,
  POLYGON: 7,
  POLYLINE: 8,
  HIGHLIGHT: 9,
  UNDERLINE: 10,
  SQUIGGLY: 11,
  STRIKEOUT: 12,
  STAMP: 13,
  CARET: 14,
  INK: 15,
  POPUP: 16,
  FILEATTACHMENT: 17,
  SOUND: 18,
  MOVIE: 19,
  WIDGET: 20,
  SCREEN: 21,
  PRINTERMARK: 22,
  TRAPNET: 23,
  WATERMARK: 24,
  THREED: 25,
  REDACT: 26
};
exports.AnnotationType = AnnotationType;
var AnnotationStateModelType = {
  MARKED: 'Marked',
  REVIEW: 'Review'
};
exports.AnnotationStateModelType = AnnotationStateModelType;
var AnnotationMarkedState = {
  MARKED: 'Marked',
  UNMARKED: 'Unmarked'
};
exports.AnnotationMarkedState = AnnotationMarkedState;
var AnnotationReviewState = {
  ACCEPTED: 'Accepted',
  REJECTED: 'Rejected',
  CANCELLED: 'Cancelled',
  COMPLETED: 'Completed',
  NONE: 'None'
};
exports.AnnotationReviewState = AnnotationReviewState;
var AnnotationReplyType = {
  GROUP: 'Group',
  REPLY: 'R'
};
exports.AnnotationReplyType = AnnotationReplyType;
var AnnotationFlag = {
  INVISIBLE: 0x01,
  HIDDEN: 0x02,
  PRINT: 0x04,
  NOZOOM: 0x08,
  NOROTATE: 0x10,
  NOVIEW: 0x20,
  READONLY: 0x40,
  LOCKED: 0x80,
  TOGGLENOVIEW: 0x100,
  LOCKEDCONTENTS: 0x200
};
exports.AnnotationFlag = AnnotationFlag;
var AnnotationFieldFlag = {
  READONLY: 0x0000001,
  REQUIRED: 0x0000002,
  NOEXPORT: 0x0000004,
  MULTILINE: 0x0001000,
  PASSWORD: 0x0002000,
  NOTOGGLETOOFF: 0x0004000,
  RADIO: 0x0008000,
  PUSHBUTTON: 0x0010000,
  COMBO: 0x0020000,
  EDIT: 0x0040000,
  SORT: 0x0080000,
  FILESELECT: 0x0100000,
  MULTISELECT: 0x0200000,
  DONOTSPELLCHECK: 0x0400000,
  DONOTSCROLL: 0x0800000,
  COMB: 0x1000000,
  RICHTEXT: 0x2000000,
  RADIOSINUNISON: 0x2000000,
  COMMITONSELCHANGE: 0x4000000
};
exports.AnnotationFieldFlag = AnnotationFieldFlag;
var AnnotationBorderStyleType = {
  SOLID: 1,
  DASHED: 2,
  BEVELED: 3,
  INSET: 4,
  UNDERLINE: 5
};
exports.AnnotationBorderStyleType = AnnotationBorderStyleType;
var StreamType = {
  UNKNOWN: 'UNKNOWN',
  FLATE: 'FLATE',
  LZW: 'LZW',
  DCT: 'DCT',
  JPX: 'JPX',
  JBIG: 'JBIG',
  A85: 'A85',
  AHX: 'AHX',
  CCF: 'CCF',
  RLX: 'RLX'
};
exports.StreamType = StreamType;
var FontType = {
  UNKNOWN: 'UNKNOWN',
  TYPE1: 'TYPE1',
  TYPE1C: 'TYPE1C',
  CIDFONTTYPE0: 'CIDFONTTYPE0',
  CIDFONTTYPE0C: 'CIDFONTTYPE0C',
  TRUETYPE: 'TRUETYPE',
  CIDFONTTYPE2: 'CIDFONTTYPE2',
  TYPE3: 'TYPE3',
  OPENTYPE: 'OPENTYPE',
  TYPE0: 'TYPE0',
  MMTYPE1: 'MMTYPE1'
};
exports.FontType = FontType;
var VerbosityLevel = {
  ERRORS: 0,
  WARNINGS: 1,
  INFOS: 5
};
exports.VerbosityLevel = VerbosityLevel;
var CMapCompressionType = {
  NONE: 0,
  BINARY: 1,
  STREAM: 2
};
exports.CMapCompressionType = CMapCompressionType;
var OPS = {
  dependency: 1,
  setLineWidth: 2,
  setLineCap: 3,
  setLineJoin: 4,
  setMiterLimit: 5,
  setDash: 6,
  setRenderingIntent: 7,
  setFlatness: 8,
  setGState: 9,
  save: 10,
  restore: 11,
  transform: 12,
  moveTo: 13,
  lineTo: 14,
  curveTo: 15,
  curveTo2: 16,
  curveTo3: 17,
  closePath: 18,
  rectangle: 19,
  stroke: 20,
  closeStroke: 21,
  fill: 22,
  eoFill: 23,
  fillStroke: 24,
  eoFillStroke: 25,
  closeFillStroke: 26,
  closeEOFillStroke: 27,
  endPath: 28,
  clip: 29,
  eoClip: 30,
  beginText: 31,
  endText: 32,
  setCharSpacing: 33,
  setWordSpacing: 34,
  setHScale: 35,
  setLeading: 36,
  setFont: 37,
  setTextRenderingMode: 38,
  setTextRise: 39,
  moveText: 40,
  setLeadingMoveText: 41,
  setTextMatrix: 42,
  nextLine: 43,
  showText: 44,
  showSpacedText: 45,
  nextLineShowText: 46,
  nextLineSetSpacingShowText: 47,
  setCharWidth: 48,
  setCharWidthAndBounds: 49,
  setStrokeColorSpace: 50,
  setFillColorSpace: 51,
  setStrokeColor: 52,
  setStrokeColorN: 53,
  setFillColor: 54,
  setFillColorN: 55,
  setStrokeGray: 56,
  setFillGray: 57,
  setStrokeRGBColor: 58,
  setFillRGBColor: 59,
  setStrokeCMYKColor: 60,
  setFillCMYKColor: 61,
  shadingFill: 62,
  beginInlineImage: 63,
  beginImageData: 64,
  endInlineImage: 65,
  paintXObject: 66,
  markPoint: 67,
  markPointProps: 68,
  beginMarkedContent: 69,
  beginMarkedContentProps: 70,
  endMarkedContent: 71,
  beginCompat: 72,
  endCompat: 73,
  paintFormXObjectBegin: 74,
  paintFormXObjectEnd: 75,
  beginGroup: 76,
  endGroup: 77,
  beginAnnotations: 78,
  endAnnotations: 79,
  beginAnnotation: 80,
  endAnnotation: 81,
  paintJpegXObject: 82,
  paintImageMaskXObject: 83,
  paintImageMaskXObjectGroup: 84,
  paintImageXObject: 85,
  paintInlineImageXObject: 86,
  paintInlineImageXObjectGroup: 87,
  paintImageXObjectRepeat: 88,
  paintImageMaskXObjectRepeat: 89,
  paintSolidColorImageMask: 90,
  constructPath: 91
};
exports.OPS = OPS;
var UNSUPPORTED_FEATURES = {
  unknown: 'unknown',
  forms: 'forms',
  javaScript: 'javaScript',
  smask: 'smask',
  shadingPattern: 'shadingPattern',
  font: 'font'
};
exports.UNSUPPORTED_FEATURES = UNSUPPORTED_FEATURES;
var PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
exports.PasswordResponses = PasswordResponses;
var verbosity = VerbosityLevel.WARNINGS;

function setVerbosityLevel(level) {
  if (Number.isInteger(level)) {
    verbosity = level;
  }
}

function getVerbosityLevel() {
  return verbosity;
}

function info(msg) {
  if (verbosity >= VerbosityLevel.INFOS) {
    console.log("Info: ".concat(msg));
  }
}

function warn(msg) {
  if (verbosity >= VerbosityLevel.WARNINGS) {
    console.log("Warning: ".concat(msg));
  }
}

function unreachable(msg) {
  throw new Error(msg);
}

function assert(cond, msg) {
  if (!cond) {
    unreachable(msg);
  }
}

function isSameOrigin(baseUrl, otherUrl) {
  var base;

  try {
    base = new URL(baseUrl);

    if (!base.origin || base.origin === 'null') {
      return false;
    }
  } catch (e) {
    return false;
  }

  var other = new URL(otherUrl, base);
  return base.origin === other.origin;
}

function _isValidProtocol(url) {
  if (!url) {
    return false;
  }

  switch (url.protocol) {
    case 'http:':
    case 'https:':
    case 'ftp:':
    case 'mailto:':
    case 'tel:':
      return true;

    default:
      return false;
  }
}

function createValidAbsoluteUrl(url, baseUrl) {
  if (!url) {
    return null;
  }

  try {
    var absoluteUrl = baseUrl ? new URL(url, baseUrl) : new URL(url);

    if (_isValidProtocol(absoluteUrl)) {
      return absoluteUrl;
    }
  } catch (ex) {}

  return null;
}

function shadow(obj, prop, value) {
  Object.defineProperty(obj, prop, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: false
  });
  return value;
}

var BaseException = function BaseExceptionClosure() {
  function BaseException(message) {
    if (this.constructor === BaseException) {
      unreachable('Cannot initialize BaseException.');
    }

    this.message = message;
    this.name = this.constructor.name;
  }

  BaseException.prototype = new Error();
  BaseException.constructor = BaseException;
  return BaseException;
}();

exports.BaseException = BaseException;

var PasswordException =
/*#__PURE__*/
function (_BaseException) {
  _inherits(PasswordException, _BaseException);

  function PasswordException(msg, code) {
    var _this;

    _classCallCheck(this, PasswordException);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PasswordException).call(this, msg));
    _this.code = code;
    return _this;
  }

  return PasswordException;
}(BaseException);

exports.PasswordException = PasswordException;

var UnknownErrorException =
/*#__PURE__*/
function (_BaseException2) {
  _inherits(UnknownErrorException, _BaseException2);

  function UnknownErrorException(msg, details) {
    var _this2;

    _classCallCheck(this, UnknownErrorException);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(UnknownErrorException).call(this, msg));
    _this2.details = details;
    return _this2;
  }

  return UnknownErrorException;
}(BaseException);

exports.UnknownErrorException = UnknownErrorException;

var InvalidPDFException =
/*#__PURE__*/
function (_BaseException3) {
  _inherits(InvalidPDFException, _BaseException3);

  function InvalidPDFException() {
    _classCallCheck(this, InvalidPDFException);

    return _possibleConstructorReturn(this, _getPrototypeOf(InvalidPDFException).apply(this, arguments));
  }

  return InvalidPDFException;
}(BaseException);

exports.InvalidPDFException = InvalidPDFException;

var MissingPDFException =
/*#__PURE__*/
function (_BaseException4) {
  _inherits(MissingPDFException, _BaseException4);

  function MissingPDFException() {
    _classCallCheck(this, MissingPDFException);

    return _possibleConstructorReturn(this, _getPrototypeOf(MissingPDFException).apply(this, arguments));
  }

  return MissingPDFException;
}(BaseException);

exports.MissingPDFException = MissingPDFException;

var UnexpectedResponseException =
/*#__PURE__*/
function (_BaseException5) {
  _inherits(UnexpectedResponseException, _BaseException5);

  function UnexpectedResponseException(msg, status) {
    var _this3;

    _classCallCheck(this, UnexpectedResponseException);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(UnexpectedResponseException).call(this, msg));
    _this3.status = status;
    return _this3;
  }

  return UnexpectedResponseException;
}(BaseException);

exports.UnexpectedResponseException = UnexpectedResponseException;

var FormatError =
/*#__PURE__*/
function (_BaseException6) {
  _inherits(FormatError, _BaseException6);

  function FormatError() {
    _classCallCheck(this, FormatError);

    return _possibleConstructorReturn(this, _getPrototypeOf(FormatError).apply(this, arguments));
  }

  return FormatError;
}(BaseException);

exports.FormatError = FormatError;

var AbortException =
/*#__PURE__*/
function (_BaseException7) {
  _inherits(AbortException, _BaseException7);

  function AbortException() {
    _classCallCheck(this, AbortException);

    return _possibleConstructorReturn(this, _getPrototypeOf(AbortException).apply(this, arguments));
  }

  return AbortException;
}(BaseException);

exports.AbortException = AbortException;
var NullCharactersRegExp = /\x00/g;

function removeNullCharacters(str) {
  if (typeof str !== 'string') {
    warn('The argument for removeNullCharacters must be a string.');
    return str;
  }

  return str.replace(NullCharactersRegExp, '');
}

function bytesToString(bytes) {
  assert(bytes !== null && _typeof(bytes) === 'object' && bytes.length !== undefined, 'Invalid argument for bytesToString');
  var length = bytes.length;
  var MAX_ARGUMENT_COUNT = 8192;

  if (length < MAX_ARGUMENT_COUNT) {
    return String.fromCharCode.apply(null, bytes);
  }

  var strBuf = [];

  for (var i = 0; i < length; i += MAX_ARGUMENT_COUNT) {
    var chunkEnd = Math.min(i + MAX_ARGUMENT_COUNT, length);
    var chunk = bytes.subarray(i, chunkEnd);
    strBuf.push(String.fromCharCode.apply(null, chunk));
  }

  return strBuf.join('');
}

function stringToBytes(str) {
  assert(typeof str === 'string', 'Invalid argument for stringToBytes');
  var length = str.length;
  var bytes = new Uint8Array(length);

  for (var i = 0; i < length; ++i) {
    bytes[i] = str.charCodeAt(i) & 0xFF;
  }

  return bytes;
}

function arrayByteLength(arr) {
  if (arr.length !== undefined) {
    return arr.length;
  }

  assert(arr.byteLength !== undefined);
  return arr.byteLength;
}

function arraysToBytes(arr) {
  var length = arr.length;

  if (length === 1 && arr[0] instanceof Uint8Array) {
    return arr[0];
  }

  var resultLength = 0;

  for (var i = 0; i < length; i++) {
    resultLength += arrayByteLength(arr[i]);
  }

  var pos = 0;
  var data = new Uint8Array(resultLength);

  for (var _i = 0; _i < length; _i++) {
    var item = arr[_i];

    if (!(item instanceof Uint8Array)) {
      if (typeof item === 'string') {
        item = stringToBytes(item);
      } else {
        item = new Uint8Array(item);
      }
    }

    var itemLength = item.byteLength;
    data.set(item, pos);
    pos += itemLength;
  }

  return data;
}

function string32(value) {
  return String.fromCharCode(value >> 24 & 0xff, value >> 16 & 0xff, value >> 8 & 0xff, value & 0xff);
}

function log2(x) {
  if (x <= 0) {
    return 0;
  }

  return Math.ceil(Math.log2(x));
}

function readInt8(data, start) {
  return data[start] << 24 >> 24;
}

function readUint16(data, offset) {
  return data[offset] << 8 | data[offset + 1];
}

function readUint32(data, offset) {
  return (data[offset] << 24 | data[offset + 1] << 16 | data[offset + 2] << 8 | data[offset + 3]) >>> 0;
}

function isLittleEndian() {
  var buffer8 = new Uint8Array(4);
  buffer8[0] = 1;
  var view32 = new Uint32Array(buffer8.buffer, 0, 1);
  return view32[0] === 1;
}

function isEvalSupported() {
  try {
    new Function('');
    return true;
  } catch (e) {
    return false;
  }
}

var rgbBuf = ['rgb(', 0, ',', 0, ',', 0, ')'];

var Util =
/*#__PURE__*/
function () {
  function Util() {
    _classCallCheck(this, Util);
  }

  _createClass(Util, null, [{
    key: "makeCssRgb",
    value: function makeCssRgb(r, g, b) {
      rgbBuf[1] = r;
      rgbBuf[3] = g;
      rgbBuf[5] = b;
      return rgbBuf.join('');
    }
  }, {
    key: "transform",
    value: function transform(m1, m2) {
      return [m1[0] * m2[0] + m1[2] * m2[1], m1[1] * m2[0] + m1[3] * m2[1], m1[0] * m2[2] + m1[2] * m2[3], m1[1] * m2[2] + m1[3] * m2[3], m1[0] * m2[4] + m1[2] * m2[5] + m1[4], m1[1] * m2[4] + m1[3] * m2[5] + m1[5]];
    }
  }, {
    key: "applyTransform",
    value: function applyTransform(p, m) {
      var xt = p[0] * m[0] + p[1] * m[2] + m[4];
      var yt = p[0] * m[1] + p[1] * m[3] + m[5];
      return [xt, yt];
    }
  }, {
    key: "applyInverseTransform",
    value: function applyInverseTransform(p, m) {
      var d = m[0] * m[3] - m[1] * m[2];
      var xt = (p[0] * m[3] - p[1] * m[2] + m[2] * m[5] - m[4] * m[3]) / d;
      var yt = (-p[0] * m[1] + p[1] * m[0] + m[4] * m[1] - m[5] * m[0]) / d;
      return [xt, yt];
    }
  }, {
    key: "getAxialAlignedBoundingBox",
    value: function getAxialAlignedBoundingBox(r, m) {
      var p1 = Util.applyTransform(r, m);
      var p2 = Util.applyTransform(r.slice(2, 4), m);
      var p3 = Util.applyTransform([r[0], r[3]], m);
      var p4 = Util.applyTransform([r[2], r[1]], m);
      return [Math.min(p1[0], p2[0], p3[0], p4[0]), Math.min(p1[1], p2[1], p3[1], p4[1]), Math.max(p1[0], p2[0], p3[0], p4[0]), Math.max(p1[1], p2[1], p3[1], p4[1])];
    }
  }, {
    key: "inverseTransform",
    value: function inverseTransform(m) {
      var d = m[0] * m[3] - m[1] * m[2];
      return [m[3] / d, -m[1] / d, -m[2] / d, m[0] / d, (m[2] * m[5] - m[4] * m[3]) / d, (m[4] * m[1] - m[5] * m[0]) / d];
    }
  }, {
    key: "apply3dTransform",
    value: function apply3dTransform(m, v) {
      return [m[0] * v[0] + m[1] * v[1] + m[2] * v[2], m[3] * v[0] + m[4] * v[1] + m[5] * v[2], m[6] * v[0] + m[7] * v[1] + m[8] * v[2]];
    }
  }, {
    key: "singularValueDecompose2dScale",
    value: function singularValueDecompose2dScale(m) {
      var transpose = [m[0], m[2], m[1], m[3]];
      var a = m[0] * transpose[0] + m[1] * transpose[2];
      var b = m[0] * transpose[1] + m[1] * transpose[3];
      var c = m[2] * transpose[0] + m[3] * transpose[2];
      var d = m[2] * transpose[1] + m[3] * transpose[3];
      var first = (a + d) / 2;
      var second = Math.sqrt((a + d) * (a + d) - 4 * (a * d - c * b)) / 2;
      var sx = first + second || 1;
      var sy = first - second || 1;
      return [Math.sqrt(sx), Math.sqrt(sy)];
    }
  }, {
    key: "normalizeRect",
    value: function normalizeRect(rect) {
      var r = rect.slice(0);

      if (rect[0] > rect[2]) {
        r[0] = rect[2];
        r[2] = rect[0];
      }

      if (rect[1] > rect[3]) {
        r[1] = rect[3];
        r[3] = rect[1];
      }

      return r;
    }
  }, {
    key: "intersect",
    value: function intersect(rect1, rect2) {
      function compare(a, b) {
        return a - b;
      }

      var orderedX = [rect1[0], rect1[2], rect2[0], rect2[2]].sort(compare);
      var orderedY = [rect1[1], rect1[3], rect2[1], rect2[3]].sort(compare);
      var result = [];
      rect1 = Util.normalizeRect(rect1);
      rect2 = Util.normalizeRect(rect2);

      if (orderedX[0] === rect1[0] && orderedX[1] === rect2[0] || orderedX[0] === rect2[0] && orderedX[1] === rect1[0]) {
        result[0] = orderedX[1];
        result[2] = orderedX[2];
      } else {
        return null;
      }

      if (orderedY[0] === rect1[1] && orderedY[1] === rect2[1] || orderedY[0] === rect2[1] && orderedY[1] === rect1[1]) {
        result[1] = orderedY[1];
        result[3] = orderedY[2];
      } else {
        return null;
      }

      return result;
    }
  }]);

  return Util;
}();

exports.Util = Util;
var PDFStringTranslateTable = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2D8, 0x2C7, 0x2C6, 0x2D9, 0x2DD, 0x2DB, 0x2DA, 0x2DC, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0x2022, 0x2020, 0x2021, 0x2026, 0x2014, 0x2013, 0x192, 0x2044, 0x2039, 0x203A, 0x2212, 0x2030, 0x201E, 0x201C, 0x201D, 0x2018, 0x2019, 0x201A, 0x2122, 0xFB01, 0xFB02, 0x141, 0x152, 0x160, 0x178, 0x17D, 0x131, 0x142, 0x153, 0x161, 0x17E, 0, 0x20AC];

function stringToPDFString(str) {
  var length = str.length,
      strBuf = [];

  if (str[0] === '\xFE' && str[1] === '\xFF') {
    for (var i = 2; i < length; i += 2) {
      strBuf.push(String.fromCharCode(str.charCodeAt(i) << 8 | str.charCodeAt(i + 1)));
    }
  } else {
    for (var _i2 = 0; _i2 < length; ++_i2) {
      var code = PDFStringTranslateTable[str.charCodeAt(_i2)];
      strBuf.push(code ? String.fromCharCode(code) : str.charAt(_i2));
    }
  }

  return strBuf.join('');
}

function stringToUTF8String(str) {
  return decodeURIComponent(escape(str));
}

function utf8StringToString(str) {
  return unescape(encodeURIComponent(str));
}

function isEmptyObj(obj) {
  for (var key in obj) {
    return false;
  }

  return true;
}

function isBool(v) {
  return typeof v === 'boolean';
}

function isNum(v) {
  return typeof v === 'number';
}

function isString(v) {
  return typeof v === 'string';
}

function isArrayBuffer(v) {
  return _typeof(v) === 'object' && v !== null && v.byteLength !== undefined;
}

function isArrayEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every(function (element, index) {
    return element === arr2[index];
  });
}

function isSpace(ch) {
  return ch === 0x20 || ch === 0x09 || ch === 0x0D || ch === 0x0A;
}

function createPromiseCapability() {
  var capability = Object.create(null);
  var isSettled = false;
  Object.defineProperty(capability, 'settled', {
    get: function get() {
      return isSettled;
    }
  });
  capability.promise = new Promise(function (resolve, reject) {
    capability.resolve = function (data) {
      isSettled = true;
      resolve(data);
    };

    capability.reject = function (reason) {
      isSettled = true;
      reject(reason);
    };
  });
  return capability;
}

var createObjectURL = function createObjectURLClosure() {
  var digits = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  return function createObjectURL(data, contentType) {
    var forceDataSchema = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!forceDataSchema && URL.createObjectURL) {
      var blob = new Blob([data], {
        type: contentType
      });
      return URL.createObjectURL(blob);
    }

    var buffer = "data:".concat(contentType, ";base64,");

    for (var i = 0, ii = data.length; i < ii; i += 3) {
      var b1 = data[i] & 0xFF;
      var b2 = data[i + 1] & 0xFF;
      var b3 = data[i + 2] & 0xFF;
      var d1 = b1 >> 2,
          d2 = (b1 & 3) << 4 | b2 >> 4;
      var d3 = i + 1 < ii ? (b2 & 0xF) << 2 | b3 >> 6 : 64;
      var d4 = i + 2 < ii ? b3 & 0x3F : 64;
      buffer += digits[d1] + digits[d2] + digits[d3] + digits[d4];
    }

    return buffer;
  };
}();

exports.createObjectURL = createObjectURL;

/***/ }),
/* 2 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var globalScope = __w_pdfjs_require__(3);

if (!globalScope._pdfjsCompatibilityChecked) {
  globalScope._pdfjsCompatibilityChecked = true;

  var isNodeJS = __w_pdfjs_require__(4);

  var hasDOM = (typeof window === "undefined" ? "undefined" : _typeof(window)) === 'object' && (typeof document === "undefined" ? "undefined" : _typeof(document)) === 'object';

  (function checkNodeBtoa() {
    if (globalScope.btoa || !isNodeJS()) {
      return;
    }

    globalScope.btoa = function (chars) {
      return Buffer.from(chars, 'binary').toString('base64');
    };
  })();

  (function checkNodeAtob() {
    if (globalScope.atob || !isNodeJS()) {
      return;
    }

    globalScope.atob = function (input) {
      return Buffer.from(input, 'base64').toString('binary');
    };
  })();

  (function checkChildNodeRemove() {
    if (!hasDOM) {
      return;
    }

    if (typeof Element.prototype.remove !== 'undefined') {
      return;
    }

    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  })();

  (function checkDOMTokenListAddRemove() {
    if (!hasDOM || isNodeJS()) {
      return;
    }

    var div = document.createElement('div');
    div.classList.add('testOne', 'testTwo');

    if (div.classList.contains('testOne') === true && div.classList.contains('testTwo') === true) {
      return;
    }

    var OriginalDOMTokenListAdd = DOMTokenList.prototype.add;
    var OriginalDOMTokenListRemove = DOMTokenList.prototype.remove;

    DOMTokenList.prototype.add = function () {
      for (var _len = arguments.length, tokens = new Array(_len), _key = 0; _key < _len; _key++) {
        tokens[_key] = arguments[_key];
      }

      for (var _i = 0, _tokens = tokens; _i < _tokens.length; _i++) {
        var token = _tokens[_i];
        OriginalDOMTokenListAdd.call(this, token);
      }
    };

    DOMTokenList.prototype.remove = function () {
      for (var _len2 = arguments.length, tokens = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        tokens[_key2] = arguments[_key2];
      }

      for (var _i2 = 0, _tokens2 = tokens; _i2 < _tokens2.length; _i2++) {
        var token = _tokens2[_i2];
        OriginalDOMTokenListRemove.call(this, token);
      }
    };
  })();

  (function checkDOMTokenListToggle() {
    if (!hasDOM || isNodeJS()) {
      return;
    }

    var div = document.createElement('div');

    if (div.classList.toggle('test', 0) === false) {
      return;
    }

    DOMTokenList.prototype.toggle = function (token) {
      var force = arguments.length > 1 ? !!arguments[1] : !this.contains(token);
      return this[force ? 'add' : 'remove'](token), force;
    };
  })();

  (function checkStringStartsWith() {
    if (String.prototype.startsWith) {
      return;
    }

    __w_pdfjs_require__(5);
  })();

  (function checkStringEndsWith() {
    if (String.prototype.endsWith) {
      return;
    }

    __w_pdfjs_require__(57);
  })();

  (function checkStringIncludes() {
    if (String.prototype.includes) {
      return;
    }

    __w_pdfjs_require__(59);
  })();

  (function checkArrayIncludes() {
    if (Array.prototype.includes) {
      return;
    }

    __w_pdfjs_require__(61);
  })();

  (function checkArrayFrom() {
    if (Array.from) {
      return;
    }

    __w_pdfjs_require__(68);
  })();

  (function checkObjectAssign() {
    if (Object.assign) {
      return;
    }

    __w_pdfjs_require__(89);
  })();

  (function checkMathLog2() {
    if (Math.log2) {
      return;
    }

    Math.log2 = __w_pdfjs_require__(92);
  })();

  (function checkNumberIsNaN() {
    if (Number.isNaN) {
      return;
    }

    Number.isNaN = __w_pdfjs_require__(94);
  })();

  (function checkNumberIsInteger() {
    if (Number.isInteger) {
      return;
    }

    Number.isInteger = __w_pdfjs_require__(96);
  })();

  (function checkPromise() {})();

  (function checkURL() {})();

  (function checkWeakMap() {
    if (globalScope.WeakMap) {
      return;
    }

    globalScope.WeakMap = __w_pdfjs_require__(99);
  })();

  (function checkWeakSet() {
    if (globalScope.WeakSet) {
      return;
    }

    globalScope.WeakSet = __w_pdfjs_require__(117);
  })();

  (function checkStringCodePointAt() {
    if (String.prototype.codePointAt) {
      return;
    }

    __w_pdfjs_require__(119);
  })();

  (function checkStringFromCodePoint() {
    if (String.fromCodePoint) {
      return;
    }

    String.fromCodePoint = __w_pdfjs_require__(121);
  })();

  (function checkSymbol() {
    if (globalScope.Symbol) {
      return;
    }

    __w_pdfjs_require__(123);
  })();

  (function checkStringPadStart() {
    if (String.prototype.padStart) {
      return;
    }

    __w_pdfjs_require__(146);
  })();

  (function checkStringPadEnd() {
    if (String.prototype.padEnd) {
      return;
    }

    __w_pdfjs_require__(152);
  })();

  (function checkObjectValues() {
    if (Object.values) {
      return;
    }

    Object.values = __w_pdfjs_require__(154);
  })();
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


module.exports = typeof window !== 'undefined' && window.Math === Math ? window : typeof global !== 'undefined' && global.Math === Math ? global : typeof self !== 'undefined' && self.Math === Math ? self : {};

/***/ }),
/* 4 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

module.exports = function isNodeJS() {
  return (typeof process === "undefined" ? "undefined" : _typeof(process)) === 'object' && process + '' === '[object process]' && !process.versions['nw'] && !process.versions['electron'];
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(6);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('String', 'startsWith');

/***/ }),
/* 6 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var toLength = __w_pdfjs_require__(43);
var notARegExp = __w_pdfjs_require__(49);
var requireObjectCoercible = __w_pdfjs_require__(17);
var correctIsRegExpLogic = __w_pdfjs_require__(53);
var nativeStartsWith = ''.startsWith;
var min = Math.min;
$({
 target: 'String',
 proto: true,
 forced: !correctIsRegExpLogic('startsWith')
}, {
 startsWith: function startsWith(searchString) {
  var that = String(requireObjectCoercible(this));
  notARegExp(searchString);
  var index = toLength(min(arguments.length > 1 ? arguments[1] : undefined, that.length));
  var search = String(searchString);
  return nativeStartsWith ? nativeStartsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
 }
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var getOwnPropertyDescriptor = __w_pdfjs_require__(9).f;
var hide = __w_pdfjs_require__(23);
var redefine = __w_pdfjs_require__(26);
var setGlobal = __w_pdfjs_require__(28);
var copyConstructorProperties = __w_pdfjs_require__(36);
var isForced = __w_pdfjs_require__(48);
module.exports = function (options, source) {
 var TARGET = options.target;
 var GLOBAL = options.global;
 var STATIC = options.stat;
 var FORCED, target, key, targetProperty, sourceProperty, descriptor;
 if (GLOBAL) {
  target = global;
 } else if (STATIC) {
  target = global[TARGET] || setGlobal(TARGET, {});
 } else {
  target = (global[TARGET] || {}).prototype;
 }
 if (target)
  for (key in source) {
   sourceProperty = source[key];
   if (options.noTargetGet) {
    descriptor = getOwnPropertyDescriptor(target, key);
    targetProperty = descriptor && descriptor.value;
   } else
    targetProperty = target[key];
   FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
   if (!FORCED && targetProperty !== undefined) {
    if (typeof sourceProperty === typeof targetProperty)
     continue;
    copyConstructorProperties(sourceProperty, targetProperty);
   }
   if (options.sham || targetProperty && targetProperty.sham) {
    hide(sourceProperty, 'sham', true);
   }
   redefine(target, key, sourceProperty, options);
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var O = 'object';
var check = function (it) {
 return it && it.Math == Math && it;
};
module.exports = check(typeof globalThis == O && globalThis) || check(typeof window == O && window) || check(typeof self == O && self) || check(typeof global == O && global) || Function('return this')();

/***/ }),
/* 9 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var propertyIsEnumerableModule = __w_pdfjs_require__(12);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var toIndexedObject = __w_pdfjs_require__(14);
var toPrimitive = __w_pdfjs_require__(18);
var has = __w_pdfjs_require__(20);
var IE8_DOM_DEFINE = __w_pdfjs_require__(21);
var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
 O = toIndexedObject(O);
 P = toPrimitive(P, true);
 if (IE8_DOM_DEFINE)
  try {
   return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) {
  }
 if (has(O, P))
  return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !fails(function () {
 return Object.defineProperty({}, 'a', {
  get: function () {
   return 7;
  }
 }).a != 7;
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = function (exec) {
 try {
  return !!exec();
 } catch (error) {
  return true;
 }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
 var descriptor = getOwnPropertyDescriptor(this, V);
 return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
 return {
  enumerable: !(bitmap & 1),
  configurable: !(bitmap & 2),
  writable: !(bitmap & 4),
  value: value
 };
};

/***/ }),
/* 14 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var IndexedObject = __w_pdfjs_require__(15);
var requireObjectCoercible = __w_pdfjs_require__(17);
module.exports = function (it) {
 return IndexedObject(requireObjectCoercible(it));
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
var classof = __w_pdfjs_require__(16);
var split = ''.split;
module.exports = fails(function () {
 return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
 return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var toString = {}.toString;
module.exports = function (it) {
 return toString.call(it).slice(8, -1);
};

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = function (it) {
 if (it == undefined)
  throw TypeError("Can't call method on " + it);
 return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
module.exports = function (input, PREFERRED_STRING) {
 if (!isObject(input))
  return input;
 var fn, val;
 if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input)))
  return val;
 if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input)))
  return val;
 if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input)))
  return val;
 throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = function (it) {
 return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 20 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
 return hasOwnProperty.call(it, key);
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var fails = __w_pdfjs_require__(11);
var createElement = __w_pdfjs_require__(22);
module.exports = !DESCRIPTORS && !fails(function () {
 return Object.defineProperty(createElement('div'), 'a', {
  get: function () {
   return 7;
  }
 }).a != 7;
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(19);
var document = global.document;
var EXISTS = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
 return EXISTS ? document.createElement(it) : {};
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var definePropertyModule = __w_pdfjs_require__(24);
var createPropertyDescriptor = __w_pdfjs_require__(13);
module.exports = DESCRIPTORS ? function (object, key, value) {
 return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
 object[key] = value;
 return object;
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var IE8_DOM_DEFINE = __w_pdfjs_require__(21);
var anObject = __w_pdfjs_require__(25);
var toPrimitive = __w_pdfjs_require__(18);
var nativeDefineProperty = Object.defineProperty;
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
 anObject(O);
 P = toPrimitive(P, true);
 anObject(Attributes);
 if (IE8_DOM_DEFINE)
  try {
   return nativeDefineProperty(O, P, Attributes);
  } catch (error) {
  }
 if ('get' in Attributes || 'set' in Attributes)
  throw TypeError('Accessors not supported');
 if ('value' in Attributes)
  O[P] = Attributes.value;
 return O;
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
module.exports = function (it) {
 if (!isObject(it)) {
  throw TypeError(String(it) + ' is not an object');
 }
 return it;
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var shared = __w_pdfjs_require__(27);
var hide = __w_pdfjs_require__(23);
var has = __w_pdfjs_require__(20);
var setGlobal = __w_pdfjs_require__(28);
var nativeFunctionToString = __w_pdfjs_require__(30);
var InternalStateModule = __w_pdfjs_require__(31);
var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');
shared('inspectSource', function (it) {
 return nativeFunctionToString.call(it);
});
(module.exports = function (O, key, value, options) {
 var unsafe = options ? !!options.unsafe : false;
 var simple = options ? !!options.enumerable : false;
 var noTargetGet = options ? !!options.noTargetGet : false;
 if (typeof value == 'function') {
  if (typeof key == 'string' && !has(value, 'name'))
   hide(value, 'name', key);
  enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
 }
 if (O === global) {
  if (simple)
   O[key] = value;
  else
   setGlobal(key, value);
  return;
 } else if (!unsafe) {
  delete O[key];
 } else if (!noTargetGet && O[key]) {
  simple = true;
 }
 if (simple)
  O[key] = value;
 else
  hide(O, key, value);
})(Function.prototype, 'toString', function toString() {
 return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var setGlobal = __w_pdfjs_require__(28);
var IS_PURE = __w_pdfjs_require__(29);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});
(module.exports = function (key, value) {
 return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
 version: '3.2.1',
 mode: IS_PURE ? 'pure' : 'global',
 copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

/***/ }),
/* 28 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var hide = __w_pdfjs_require__(23);
module.exports = function (key, value) {
 try {
  hide(global, key, value);
 } catch (error) {
  global[key] = value;
 }
 return value;
};

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = false;

/***/ }),
/* 30 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var shared = __w_pdfjs_require__(27);
module.exports = shared('native-function-to-string', Function.toString);

/***/ }),
/* 31 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var NATIVE_WEAK_MAP = __w_pdfjs_require__(32);
var global = __w_pdfjs_require__(8);
var isObject = __w_pdfjs_require__(19);
var hide = __w_pdfjs_require__(23);
var objectHas = __w_pdfjs_require__(20);
var sharedKey = __w_pdfjs_require__(33);
var hiddenKeys = __w_pdfjs_require__(35);
var WeakMap = global.WeakMap;
var set, get, has;
var enforce = function (it) {
 return has(it) ? get(it) : set(it, {});
};
var getterFor = function (TYPE) {
 return function (it) {
  var state;
  if (!isObject(it) || (state = get(it)).type !== TYPE) {
   throw TypeError('Incompatible receiver, ' + TYPE + ' required');
  }
  return state;
 };
};
if (NATIVE_WEAK_MAP) {
 var store = new WeakMap();
 var wmget = store.get;
 var wmhas = store.has;
 var wmset = store.set;
 set = function (it, metadata) {
  wmset.call(store, it, metadata);
  return metadata;
 };
 get = function (it) {
  return wmget.call(store, it) || {};
 };
 has = function (it) {
  return wmhas.call(store, it);
 };
} else {
 var STATE = sharedKey('state');
 hiddenKeys[STATE] = true;
 set = function (it, metadata) {
  hide(it, STATE, metadata);
  return metadata;
 };
 get = function (it) {
  return objectHas(it, STATE) ? it[STATE] : {};
 };
 has = function (it) {
  return objectHas(it, STATE);
 };
}
module.exports = {
 set: set,
 get: get,
 has: has,
 enforce: enforce,
 getterFor: getterFor
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var nativeFunctionToString = __w_pdfjs_require__(30);
var WeakMap = global.WeakMap;
module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));

/***/ }),
/* 33 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var shared = __w_pdfjs_require__(27);
var uid = __w_pdfjs_require__(34);
var keys = shared('keys');
module.exports = function (key) {
 return keys[key] || (keys[key] = uid(key));
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();
module.exports = function (key) {
 return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 36 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var has = __w_pdfjs_require__(20);
var ownKeys = __w_pdfjs_require__(37);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(9);
var definePropertyModule = __w_pdfjs_require__(24);
module.exports = function (target, source) {
 var keys = ownKeys(source);
 var defineProperty = definePropertyModule.f;
 var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
 for (var i = 0; i < keys.length; i++) {
  var key = keys[i];
  if (!has(target, key))
   defineProperty(target, key, getOwnPropertyDescriptor(source, key));
 }
};

/***/ }),
/* 37 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var getBuiltIn = __w_pdfjs_require__(38);
var getOwnPropertyNamesModule = __w_pdfjs_require__(40);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(47);
var anObject = __w_pdfjs_require__(25);
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
 var keys = getOwnPropertyNamesModule.f(anObject(it));
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};

/***/ }),
/* 38 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var path = __w_pdfjs_require__(39);
var global = __w_pdfjs_require__(8);
var aFunction = function (variable) {
 return typeof variable == 'function' ? variable : undefined;
};
module.exports = function (namespace, method) {
 return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace]) : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};

/***/ }),
/* 39 */
/***/ (function(module, exports, __w_pdfjs_require__) {

module.exports = __w_pdfjs_require__(8);

/***/ }),
/* 40 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var internalObjectKeys = __w_pdfjs_require__(41);
var enumBugKeys = __w_pdfjs_require__(46);
var hiddenKeys = enumBugKeys.concat('length', 'prototype');
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
 return internalObjectKeys(O, hiddenKeys);
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var has = __w_pdfjs_require__(20);
var toIndexedObject = __w_pdfjs_require__(14);
var indexOf = __w_pdfjs_require__(42).indexOf;
var hiddenKeys = __w_pdfjs_require__(35);
module.exports = function (object, names) {
 var O = toIndexedObject(object);
 var i = 0;
 var result = [];
 var key;
 for (key in O)
  !has(hiddenKeys, key) && has(O, key) && result.push(key);
 while (names.length > i)
  if (has(O, key = names[i++])) {
   ~indexOf(result, key) || result.push(key);
  }
 return result;
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toIndexedObject = __w_pdfjs_require__(14);
var toLength = __w_pdfjs_require__(43);
var toAbsoluteIndex = __w_pdfjs_require__(45);
var createMethod = function (IS_INCLUDES) {
 return function ($this, el, fromIndex) {
  var O = toIndexedObject($this);
  var length = toLength(O.length);
  var index = toAbsoluteIndex(fromIndex, length);
  var value;
  if (IS_INCLUDES && el != el)
   while (length > index) {
    value = O[index++];
    if (value != value)
     return true;
   }
  else
   for (; length > index; index++) {
    if ((IS_INCLUDES || index in O) && O[index] === el)
     return IS_INCLUDES || index || 0;
   }
  return !IS_INCLUDES && -1;
 };
};
module.exports = {
 includes: createMethod(true),
 indexOf: createMethod(false)
};

/***/ }),
/* 43 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toInteger = __w_pdfjs_require__(44);
var min = Math.min;
module.exports = function (argument) {
 return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0;
};

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (argument) {
 return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toInteger = __w_pdfjs_require__(44);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
 var integer = toInteger(index);
 return integer < 0 ? max(integer + length, 0) : min(integer, length);
};

/***/ }),
/* 46 */
/***/ (function(module, exports) {

module.exports = [
 'constructor',
 'hasOwnProperty',
 'isPrototypeOf',
 'propertyIsEnumerable',
 'toLocaleString',
 'toString',
 'valueOf'
];

/***/ }),
/* 47 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;

/***/ }),
/* 48 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
var replacement = /#|\.prototype\./;
var isForced = function (feature, detection) {
 var value = data[normalize(feature)];
 return value == POLYFILL ? true : value == NATIVE ? false : typeof detection == 'function' ? fails(detection) : !!detection;
};
var normalize = isForced.normalize = function (string) {
 return String(string).replace(replacement, '.').toLowerCase();
};
var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';
module.exports = isForced;

/***/ }),
/* 49 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isRegExp = __w_pdfjs_require__(50);
module.exports = function (it) {
 if (isRegExp(it)) {
  throw TypeError("The method doesn't accept regular expressions");
 }
 return it;
};

/***/ }),
/* 50 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var classof = __w_pdfjs_require__(16);
var wellKnownSymbol = __w_pdfjs_require__(51);
var MATCH = wellKnownSymbol('match');
module.exports = function (it) {
 var isRegExp;
 return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};

/***/ }),
/* 51 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var shared = __w_pdfjs_require__(27);
var uid = __w_pdfjs_require__(34);
var NATIVE_SYMBOL = __w_pdfjs_require__(52);
var Symbol = global.Symbol;
var store = shared('wks');
module.exports = function (name) {
 return store[name] || (store[name] = NATIVE_SYMBOL && Symbol[name] || (NATIVE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

/***/ }),
/* 52 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
 return !String(Symbol());
});

/***/ }),
/* 53 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(51);
var MATCH = wellKnownSymbol('match');
module.exports = function (METHOD_NAME) {
 var regexp = /./;
 try {
  '/./'[METHOD_NAME](regexp);
 } catch (e) {
  try {
   regexp[MATCH] = false;
   return '/./'[METHOD_NAME](regexp);
  } catch (f) {
  }
 }
 return false;
};

/***/ }),
/* 54 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var bind = __w_pdfjs_require__(55);
var call = Function.call;
module.exports = function (CONSTRUCTOR, METHOD, length) {
 return bind(call, global[CONSTRUCTOR].prototype[METHOD], length);
};

/***/ }),
/* 55 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var aFunction = __w_pdfjs_require__(56);
module.exports = function (fn, that, length) {
 aFunction(fn);
 if (that === undefined)
  return fn;
 switch (length) {
 case 0:
  return function () {
   return fn.call(that);
  };
 case 1:
  return function (a) {
   return fn.call(that, a);
  };
 case 2:
  return function (a, b) {
   return fn.call(that, a, b);
  };
 case 3:
  return function (a, b, c) {
   return fn.call(that, a, b, c);
  };
 }
 return function () {
  return fn.apply(that, arguments);
 };
};

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = function (it) {
 if (typeof it != 'function') {
  throw TypeError(String(it) + ' is not a function');
 }
 return it;
};

/***/ }),
/* 57 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(58);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('String', 'endsWith');

/***/ }),
/* 58 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var toLength = __w_pdfjs_require__(43);
var notARegExp = __w_pdfjs_require__(49);
var requireObjectCoercible = __w_pdfjs_require__(17);
var correctIsRegExpLogic = __w_pdfjs_require__(53);
var nativeEndsWith = ''.endsWith;
var min = Math.min;
$({
 target: 'String',
 proto: true,
 forced: !correctIsRegExpLogic('endsWith')
}, {
 endsWith: function endsWith(searchString) {
  var that = String(requireObjectCoercible(this));
  notARegExp(searchString);
  var endPosition = arguments.length > 1 ? arguments[1] : undefined;
  var len = toLength(that.length);
  var end = endPosition === undefined ? len : min(toLength(endPosition), len);
  var search = String(searchString);
  return nativeEndsWith ? nativeEndsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
 }
});

/***/ }),
/* 59 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(60);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('String', 'includes');

/***/ }),
/* 60 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var notARegExp = __w_pdfjs_require__(49);
var requireObjectCoercible = __w_pdfjs_require__(17);
var correctIsRegExpLogic = __w_pdfjs_require__(53);
$({
 target: 'String',
 proto: true,
 forced: !correctIsRegExpLogic('includes')
}, {
 includes: function includes(searchString) {
  return !!~String(requireObjectCoercible(this)).indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
 }
});

/***/ }),
/* 61 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(62);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('Array', 'includes');

/***/ }),
/* 62 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var $includes = __w_pdfjs_require__(42).includes;
var addToUnscopables = __w_pdfjs_require__(63);
$({
 target: 'Array',
 proto: true
}, {
 includes: function includes(el) {
  return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
 }
});
addToUnscopables('includes');

/***/ }),
/* 63 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(51);
var create = __w_pdfjs_require__(64);
var hide = __w_pdfjs_require__(23);
var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;
if (ArrayPrototype[UNSCOPABLES] == undefined) {
 hide(ArrayPrototype, UNSCOPABLES, create(null));
}
module.exports = function (key) {
 ArrayPrototype[UNSCOPABLES][key] = true;
};

/***/ }),
/* 64 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var defineProperties = __w_pdfjs_require__(65);
var enumBugKeys = __w_pdfjs_require__(46);
var hiddenKeys = __w_pdfjs_require__(35);
var html = __w_pdfjs_require__(67);
var documentCreateElement = __w_pdfjs_require__(22);
var sharedKey = __w_pdfjs_require__(33);
var IE_PROTO = sharedKey('IE_PROTO');
var PROTOTYPE = 'prototype';
var Empty = function () {
};
var createDict = function () {
 var iframe = documentCreateElement('iframe');
 var length = enumBugKeys.length;
 var lt = '<';
 var script = 'script';
 var gt = '>';
 var js = 'java' + script + ':';
 var iframeDocument;
 iframe.style.display = 'none';
 html.appendChild(iframe);
 iframe.src = String(js);
 iframeDocument = iframe.contentWindow.document;
 iframeDocument.open();
 iframeDocument.write(lt + script + gt + 'document.F=Object' + lt + '/' + script + gt);
 iframeDocument.close();
 createDict = iframeDocument.F;
 while (length--)
  delete createDict[PROTOTYPE][enumBugKeys[length]];
 return createDict();
};
module.exports = Object.create || function create(O, Properties) {
 var result;
 if (O !== null) {
  Empty[PROTOTYPE] = anObject(O);
  result = new Empty();
  Empty[PROTOTYPE] = null;
  result[IE_PROTO] = O;
 } else
  result = createDict();
 return Properties === undefined ? result : defineProperties(result, Properties);
};
hiddenKeys[IE_PROTO] = true;

/***/ }),
/* 65 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var definePropertyModule = __w_pdfjs_require__(24);
var anObject = __w_pdfjs_require__(25);
var objectKeys = __w_pdfjs_require__(66);
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
 anObject(O);
 var keys = objectKeys(Properties);
 var length = keys.length;
 var index = 0;
 var key;
 while (length > index)
  definePropertyModule.f(O, key = keys[index++], Properties[key]);
 return O;
};

/***/ }),
/* 66 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var internalObjectKeys = __w_pdfjs_require__(41);
var enumBugKeys = __w_pdfjs_require__(46);
module.exports = Object.keys || function keys(O) {
 return internalObjectKeys(O, enumBugKeys);
};

/***/ }),
/* 67 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var getBuiltIn = __w_pdfjs_require__(38);
module.exports = getBuiltIn('document', 'documentElement');

/***/ }),
/* 68 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(69);
__w_pdfjs_require__(81);
var path = __w_pdfjs_require__(39);
module.exports = path.Array.from;

/***/ }),
/* 69 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var charAt = __w_pdfjs_require__(70).charAt;
var InternalStateModule = __w_pdfjs_require__(31);
var defineIterator = __w_pdfjs_require__(71);
var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);
defineIterator(String, 'String', function (iterated) {
 setInternalState(this, {
  type: STRING_ITERATOR,
  string: String(iterated),
  index: 0
 });
}, function next() {
 var state = getInternalState(this);
 var string = state.string;
 var index = state.index;
 var point;
 if (index >= string.length)
  return {
   value: undefined,
   done: true
  };
 point = charAt(string, index);
 state.index += point.length;
 return {
  value: point,
  done: false
 };
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toInteger = __w_pdfjs_require__(44);
var requireObjectCoercible = __w_pdfjs_require__(17);
var createMethod = function (CONVERT_TO_STRING) {
 return function ($this, pos) {
  var S = String(requireObjectCoercible($this));
  var position = toInteger(pos);
  var size = S.length;
  var first, second;
  if (position < 0 || position >= size)
   return CONVERT_TO_STRING ? '' : undefined;
  first = S.charCodeAt(position);
  return first < 0xD800 || first > 0xDBFF || position + 1 === size || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF ? CONVERT_TO_STRING ? S.charAt(position) : first : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
 };
};
module.exports = {
 codeAt: createMethod(false),
 charAt: createMethod(true)
};

/***/ }),
/* 71 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var createIteratorConstructor = __w_pdfjs_require__(72);
var getPrototypeOf = __w_pdfjs_require__(74);
var setPrototypeOf = __w_pdfjs_require__(79);
var setToStringTag = __w_pdfjs_require__(77);
var hide = __w_pdfjs_require__(23);
var redefine = __w_pdfjs_require__(26);
var wellKnownSymbol = __w_pdfjs_require__(51);
var IS_PURE = __w_pdfjs_require__(29);
var Iterators = __w_pdfjs_require__(78);
var IteratorsCore = __w_pdfjs_require__(73);
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';
var returnThis = function () {
 return this;
};
module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
 createIteratorConstructor(IteratorConstructor, NAME, next);
 var getIterationMethod = function (KIND) {
  if (KIND === DEFAULT && defaultIterator)
   return defaultIterator;
  if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype)
   return IterablePrototype[KIND];
  switch (KIND) {
  case KEYS:
   return function keys() {
    return new IteratorConstructor(this, KIND);
   };
  case VALUES:
   return function values() {
    return new IteratorConstructor(this, KIND);
   };
  case ENTRIES:
   return function entries() {
    return new IteratorConstructor(this, KIND);
   };
  }
  return function () {
   return new IteratorConstructor(this);
  };
 };
 var TO_STRING_TAG = NAME + ' Iterator';
 var INCORRECT_VALUES_NAME = false;
 var IterablePrototype = Iterable.prototype;
 var nativeIterator = IterablePrototype[ITERATOR] || IterablePrototype['@@iterator'] || DEFAULT && IterablePrototype[DEFAULT];
 var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
 var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
 var CurrentIteratorPrototype, methods, KEY;
 if (anyNativeIterator) {
  CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
  if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
   if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
    if (setPrototypeOf) {
     setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
    } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
     hide(CurrentIteratorPrototype, ITERATOR, returnThis);
    }
   }
   setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
   if (IS_PURE)
    Iterators[TO_STRING_TAG] = returnThis;
  }
 }
 if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
  INCORRECT_VALUES_NAME = true;
  defaultIterator = function values() {
   return nativeIterator.call(this);
  };
 }
 if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
  hide(IterablePrototype, ITERATOR, defaultIterator);
 }
 Iterators[NAME] = defaultIterator;
 if (DEFAULT) {
  methods = {
   values: getIterationMethod(VALUES),
   keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
   entries: getIterationMethod(ENTRIES)
  };
  if (FORCED)
   for (KEY in methods) {
    if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
     redefine(IterablePrototype, KEY, methods[KEY]);
    }
   }
  else
   $({
    target: NAME,
    proto: true,
    forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME
   }, methods);
 }
 return methods;
};

/***/ }),
/* 72 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var IteratorPrototype = __w_pdfjs_require__(73).IteratorPrototype;
var create = __w_pdfjs_require__(64);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var setToStringTag = __w_pdfjs_require__(77);
var Iterators = __w_pdfjs_require__(78);
var returnThis = function () {
 return this;
};
module.exports = function (IteratorConstructor, NAME, next) {
 var TO_STRING_TAG = NAME + ' Iterator';
 IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
 setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
 Iterators[TO_STRING_TAG] = returnThis;
 return IteratorConstructor;
};

/***/ }),
/* 73 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var getPrototypeOf = __w_pdfjs_require__(74);
var hide = __w_pdfjs_require__(23);
var has = __w_pdfjs_require__(20);
var wellKnownSymbol = __w_pdfjs_require__(51);
var IS_PURE = __w_pdfjs_require__(29);
var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;
var returnThis = function () {
 return this;
};
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;
if ([].keys) {
 arrayIterator = [].keys();
 if (!('next' in arrayIterator))
  BUGGY_SAFARI_ITERATORS = true;
 else {
  PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
  if (PrototypeOfArrayIteratorPrototype !== Object.prototype)
   IteratorPrototype = PrototypeOfArrayIteratorPrototype;
 }
}
if (IteratorPrototype == undefined)
 IteratorPrototype = {};
if (!IS_PURE && !has(IteratorPrototype, ITERATOR))
 hide(IteratorPrototype, ITERATOR, returnThis);
module.exports = {
 IteratorPrototype: IteratorPrototype,
 BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};

/***/ }),
/* 74 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var has = __w_pdfjs_require__(20);
var toObject = __w_pdfjs_require__(75);
var sharedKey = __w_pdfjs_require__(33);
var CORRECT_PROTOTYPE_GETTER = __w_pdfjs_require__(76);
var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
 O = toObject(O);
 if (has(O, IE_PROTO))
  return O[IE_PROTO];
 if (typeof O.constructor == 'function' && O instanceof O.constructor) {
  return O.constructor.prototype;
 }
 return O instanceof Object ? ObjectPrototype : null;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var requireObjectCoercible = __w_pdfjs_require__(17);
module.exports = function (argument) {
 return Object(requireObjectCoercible(argument));
};

/***/ }),
/* 76 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !fails(function () {
 function F() {
 }
 F.prototype.constructor = null;
 return Object.getPrototypeOf(new F()) !== F.prototype;
});

/***/ }),
/* 77 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineProperty = __w_pdfjs_require__(24).f;
var has = __w_pdfjs_require__(20);
var wellKnownSymbol = __w_pdfjs_require__(51);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
module.exports = function (it, TAG, STATIC) {
 if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
  defineProperty(it, TO_STRING_TAG, {
   configurable: true,
   value: TAG
  });
 }
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = {};

/***/ }),
/* 79 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var aPossiblePrototype = __w_pdfjs_require__(80);
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
 var CORRECT_SETTER = false;
 var test = {};
 var setter;
 try {
  setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
  setter.call(test, []);
  CORRECT_SETTER = test instanceof Array;
 } catch (error) {
 }
 return function setPrototypeOf(O, proto) {
  anObject(O);
  aPossiblePrototype(proto);
  if (CORRECT_SETTER)
   setter.call(O, proto);
  else
   O.__proto__ = proto;
  return O;
 };
}() : undefined);

/***/ }),
/* 80 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
module.exports = function (it) {
 if (!isObject(it) && it !== null) {
  throw TypeError("Can't set " + String(it) + ' as a prototype');
 }
 return it;
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var from = __w_pdfjs_require__(82);
var checkCorrectnessOfIteration = __w_pdfjs_require__(88);
var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
 Array.from(iterable);
});
$({
 target: 'Array',
 stat: true,
 forced: INCORRECT_ITERATION
}, { from: from });

/***/ }),
/* 82 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var bind = __w_pdfjs_require__(55);
var toObject = __w_pdfjs_require__(75);
var callWithSafeIterationClosing = __w_pdfjs_require__(83);
var isArrayIteratorMethod = __w_pdfjs_require__(84);
var toLength = __w_pdfjs_require__(43);
var createProperty = __w_pdfjs_require__(85);
var getIteratorMethod = __w_pdfjs_require__(86);
module.exports = function from(arrayLike) {
 var O = toObject(arrayLike);
 var C = typeof this == 'function' ? this : Array;
 var argumentsLength = arguments.length;
 var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
 var mapping = mapfn !== undefined;
 var index = 0;
 var iteratorMethod = getIteratorMethod(O);
 var length, result, step, iterator;
 if (mapping)
  mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
 if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
  iterator = iteratorMethod.call(O);
  result = new C();
  for (; !(step = iterator.next()).done; index++) {
   createProperty(result, index, mapping ? callWithSafeIterationClosing(iterator, mapfn, [
    step.value,
    index
   ], true) : step.value);
  }
 } else {
  length = toLength(O.length);
  result = new C(length);
  for (; length > index; index++) {
   createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
  }
 }
 result.length = index;
 return result;
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
module.exports = function (iterator, fn, value, ENTRIES) {
 try {
  return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
 } catch (error) {
  var returnMethod = iterator['return'];
  if (returnMethod !== undefined)
   anObject(returnMethod.call(iterator));
  throw error;
 }
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(51);
var Iterators = __w_pdfjs_require__(78);
var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;
module.exports = function (it) {
 return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var toPrimitive = __w_pdfjs_require__(18);
var definePropertyModule = __w_pdfjs_require__(24);
var createPropertyDescriptor = __w_pdfjs_require__(13);
module.exports = function (object, key, value) {
 var propertyKey = toPrimitive(key);
 if (propertyKey in object)
  definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
 else
  object[propertyKey] = value;
};

/***/ }),
/* 86 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var classof = __w_pdfjs_require__(87);
var Iterators = __w_pdfjs_require__(78);
var wellKnownSymbol = __w_pdfjs_require__(51);
var ITERATOR = wellKnownSymbol('iterator');
module.exports = function (it) {
 if (it != undefined)
  return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ }),
/* 87 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var classofRaw = __w_pdfjs_require__(16);
var wellKnownSymbol = __w_pdfjs_require__(51);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var CORRECT_ARGUMENTS = classofRaw(function () {
 return arguments;
}()) == 'Arguments';
var tryGet = function (it, key) {
 try {
  return it[key];
 } catch (error) {
 }
};
module.exports = function (it) {
 var O, tag, result;
 return it === undefined ? 'Undefined' : it === null ? 'Null' : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag : CORRECT_ARGUMENTS ? classofRaw(O) : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};

/***/ }),
/* 88 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var wellKnownSymbol = __w_pdfjs_require__(51);
var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;
try {
 var called = 0;
 var iteratorWithReturn = {
  next: function () {
   return { done: !!called++ };
  },
  'return': function () {
   SAFE_CLOSING = true;
  }
 };
 iteratorWithReturn[ITERATOR] = function () {
  return this;
 };
 Array.from(iteratorWithReturn, function () {
  throw 2;
 });
} catch (error) {
}
module.exports = function (exec, SKIP_CLOSING) {
 if (!SKIP_CLOSING && !SAFE_CLOSING)
  return false;
 var ITERATION_SUPPORT = false;
 try {
  var object = {};
  object[ITERATOR] = function () {
   return {
    next: function () {
     return { done: ITERATION_SUPPORT = true };
    }
   };
  };
  exec(object);
 } catch (error) {
 }
 return ITERATION_SUPPORT;
};

/***/ }),
/* 89 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(90);
var path = __w_pdfjs_require__(39);
module.exports = path.Object.assign;

/***/ }),
/* 90 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var assign = __w_pdfjs_require__(91);
$({
 target: 'Object',
 stat: true,
 forced: Object.assign !== assign
}, { assign: assign });

/***/ }),
/* 91 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var DESCRIPTORS = __w_pdfjs_require__(10);
var fails = __w_pdfjs_require__(11);
var objectKeys = __w_pdfjs_require__(66);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(47);
var propertyIsEnumerableModule = __w_pdfjs_require__(12);
var toObject = __w_pdfjs_require__(75);
var IndexedObject = __w_pdfjs_require__(15);
var nativeAssign = Object.assign;
module.exports = !nativeAssign || fails(function () {
 var A = {};
 var B = {};
 var symbol = Symbol();
 var alphabet = 'abcdefghijklmnopqrst';
 A[symbol] = 7;
 alphabet.split('').forEach(function (chr) {
  B[chr] = chr;
 });
 return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) {
 var T = toObject(target);
 var argumentsLength = arguments.length;
 var index = 1;
 var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
 var propertyIsEnumerable = propertyIsEnumerableModule.f;
 while (argumentsLength > index) {
  var S = IndexedObject(arguments[index++]);
  var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
  var length = keys.length;
  var j = 0;
  var key;
  while (length > j) {
   key = keys[j++];
   if (!DESCRIPTORS || propertyIsEnumerable.call(S, key))
    T[key] = S[key];
  }
 }
 return T;
} : nativeAssign;

/***/ }),
/* 92 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(93);
var path = __w_pdfjs_require__(39);
module.exports = path.Math.log2;

/***/ }),
/* 93 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var log = Math.log;
var LN2 = Math.LN2;
$({
 target: 'Math',
 stat: true
}, {
 log2: function log2(x) {
  return log(x) / LN2;
 }
});

/***/ }),
/* 94 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(95);
var path = __w_pdfjs_require__(39);
module.exports = path.Number.isNaN;

/***/ }),
/* 95 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
$({
 target: 'Number',
 stat: true
}, {
 isNaN: function isNaN(number) {
  return number != number;
 }
});

/***/ }),
/* 96 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(97);
var path = __w_pdfjs_require__(39);
module.exports = path.Number.isInteger;

/***/ }),
/* 97 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var isInteger = __w_pdfjs_require__(98);
$({
 target: 'Number',
 stat: true
}, { isInteger: isInteger });

/***/ }),
/* 98 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var floor = Math.floor;
module.exports = function isInteger(it) {
 return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ }),
/* 99 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(100);
__w_pdfjs_require__(102);
__w_pdfjs_require__(114);
var path = __w_pdfjs_require__(39);
module.exports = path.WeakMap;

/***/ }),
/* 100 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var redefine = __w_pdfjs_require__(26);
var toString = __w_pdfjs_require__(101);
var ObjectPrototype = Object.prototype;
if (toString !== ObjectPrototype.toString) {
 redefine(ObjectPrototype, 'toString', toString, { unsafe: true });
}

/***/ }),
/* 101 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var classof = __w_pdfjs_require__(87);
var wellKnownSymbol = __w_pdfjs_require__(51);
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};
test[TO_STRING_TAG] = 'z';
module.exports = String(test) !== '[object z]' ? function toString() {
 return '[object ' + classof(this) + ']';
} : test.toString;

/***/ }),
/* 102 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var global = __w_pdfjs_require__(8);
var redefineAll = __w_pdfjs_require__(103);
var InternalMetadataModule = __w_pdfjs_require__(104);
var collection = __w_pdfjs_require__(106);
var collectionWeak = __w_pdfjs_require__(110);
var isObject = __w_pdfjs_require__(19);
var enforceIternalState = __w_pdfjs_require__(31).enforce;
var NATIVE_WEAK_MAP = __w_pdfjs_require__(32);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var isExtensible = Object.isExtensible;
var InternalWeakMap;
var wrapper = function (get) {
 return function WeakMap() {
  return get(this, arguments.length ? arguments[0] : undefined);
 };
};
var $WeakMap = module.exports = collection('WeakMap', wrapper, collectionWeak, true, true);
if (NATIVE_WEAK_MAP && IS_IE11) {
 InternalWeakMap = collectionWeak.getConstructor(wrapper, 'WeakMap', true);
 InternalMetadataModule.REQUIRED = true;
 var WeakMapPrototype = $WeakMap.prototype;
 var nativeDelete = WeakMapPrototype['delete'];
 var nativeHas = WeakMapPrototype.has;
 var nativeGet = WeakMapPrototype.get;
 var nativeSet = WeakMapPrototype.set;
 redefineAll(WeakMapPrototype, {
  'delete': function (key) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    return nativeDelete.call(this, key) || state.frozen['delete'](key);
   }
   return nativeDelete.call(this, key);
  },
  has: function has(key) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    return nativeHas.call(this, key) || state.frozen.has(key);
   }
   return nativeHas.call(this, key);
  },
  get: function get(key) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    return nativeHas.call(this, key) ? nativeGet.call(this, key) : state.frozen.get(key);
   }
   return nativeGet.call(this, key);
  },
  set: function set(key, value) {
   if (isObject(key) && !isExtensible(key)) {
    var state = enforceIternalState(this);
    if (!state.frozen)
     state.frozen = new InternalWeakMap();
    nativeHas.call(this, key) ? nativeSet.call(this, key, value) : state.frozen.set(key, value);
   } else
    nativeSet.call(this, key, value);
   return this;
  }
 });
}

/***/ }),
/* 103 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var redefine = __w_pdfjs_require__(26);
module.exports = function (target, src, options) {
 for (var key in src)
  redefine(target, key, src[key], options);
 return target;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var hiddenKeys = __w_pdfjs_require__(35);
var isObject = __w_pdfjs_require__(19);
var has = __w_pdfjs_require__(20);
var defineProperty = __w_pdfjs_require__(24).f;
var uid = __w_pdfjs_require__(34);
var FREEZING = __w_pdfjs_require__(105);
var METADATA = uid('meta');
var id = 0;
var isExtensible = Object.isExtensible || function () {
 return true;
};
var setMetadata = function (it) {
 defineProperty(it, METADATA, {
  value: {
   objectID: 'O' + ++id,
   weakData: {}
  }
 });
};
var fastKey = function (it, create) {
 if (!isObject(it))
  return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
 if (!has(it, METADATA)) {
  if (!isExtensible(it))
   return 'F';
  if (!create)
   return 'E';
  setMetadata(it);
 }
 return it[METADATA].objectID;
};
var getWeakData = function (it, create) {
 if (!has(it, METADATA)) {
  if (!isExtensible(it))
   return true;
  if (!create)
   return false;
  setMetadata(it);
 }
 return it[METADATA].weakData;
};
var onFreeze = function (it) {
 if (FREEZING && meta.REQUIRED && isExtensible(it) && !has(it, METADATA))
  setMetadata(it);
 return it;
};
var meta = module.exports = {
 REQUIRED: false,
 fastKey: fastKey,
 getWeakData: getWeakData,
 onFreeze: onFreeze
};
hiddenKeys[METADATA] = true;

/***/ }),
/* 105 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
module.exports = !fails(function () {
 return Object.isExtensible(Object.preventExtensions({}));
});

/***/ }),
/* 106 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var global = __w_pdfjs_require__(8);
var isForced = __w_pdfjs_require__(48);
var redefine = __w_pdfjs_require__(26);
var InternalMetadataModule = __w_pdfjs_require__(104);
var iterate = __w_pdfjs_require__(107);
var anInstance = __w_pdfjs_require__(108);
var isObject = __w_pdfjs_require__(19);
var fails = __w_pdfjs_require__(11);
var checkCorrectnessOfIteration = __w_pdfjs_require__(88);
var setToStringTag = __w_pdfjs_require__(77);
var inheritIfRequired = __w_pdfjs_require__(109);
module.exports = function (CONSTRUCTOR_NAME, wrapper, common, IS_MAP, IS_WEAK) {
 var NativeConstructor = global[CONSTRUCTOR_NAME];
 var NativePrototype = NativeConstructor && NativeConstructor.prototype;
 var Constructor = NativeConstructor;
 var ADDER = IS_MAP ? 'set' : 'add';
 var exported = {};
 var fixMethod = function (KEY) {
  var nativeMethod = NativePrototype[KEY];
  redefine(NativePrototype, KEY, KEY == 'add' ? function add(value) {
   nativeMethod.call(this, value === 0 ? 0 : value);
   return this;
  } : KEY == 'delete' ? function (key) {
   return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
  } : KEY == 'get' ? function get(key) {
   return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
  } : KEY == 'has' ? function has(key) {
   return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
  } : function set(key, value) {
   nativeMethod.call(this, key === 0 ? 0 : key, value);
   return this;
  });
 };
 if (isForced(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
   new NativeConstructor().entries().next();
  })))) {
  Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
  InternalMetadataModule.REQUIRED = true;
 } else if (isForced(CONSTRUCTOR_NAME, true)) {
  var instance = new Constructor();
  var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
  var THROWS_ON_PRIMITIVES = fails(function () {
   instance.has(1);
  });
  var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) {
   new NativeConstructor(iterable);
  });
  var BUGGY_ZERO = !IS_WEAK && fails(function () {
   var $instance = new NativeConstructor();
   var index = 5;
   while (index--)
    $instance[ADDER](index, index);
   return !$instance.has(-0);
  });
  if (!ACCEPT_ITERABLES) {
   Constructor = wrapper(function (dummy, iterable) {
    anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
    var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
    if (iterable != undefined)
     iterate(iterable, that[ADDER], that, IS_MAP);
    return that;
   });
   Constructor.prototype = NativePrototype;
   NativePrototype.constructor = Constructor;
  }
  if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
   fixMethod('delete');
   fixMethod('has');
   IS_MAP && fixMethod('get');
  }
  if (BUGGY_ZERO || HASNT_CHAINING)
   fixMethod(ADDER);
  if (IS_WEAK && NativePrototype.clear)
   delete NativePrototype.clear;
 }
 exported[CONSTRUCTOR_NAME] = Constructor;
 $({
  global: true,
  forced: Constructor != NativeConstructor
 }, exported);
 setToStringTag(Constructor, CONSTRUCTOR_NAME);
 if (!IS_WEAK)
  common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);
 return Constructor;
};

/***/ }),
/* 107 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var anObject = __w_pdfjs_require__(25);
var isArrayIteratorMethod = __w_pdfjs_require__(84);
var toLength = __w_pdfjs_require__(43);
var bind = __w_pdfjs_require__(55);
var getIteratorMethod = __w_pdfjs_require__(86);
var callWithSafeIterationClosing = __w_pdfjs_require__(83);
var Result = function (stopped, result) {
 this.stopped = stopped;
 this.result = result;
};
var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
 var boundFunction = bind(fn, that, AS_ENTRIES ? 2 : 1);
 var iterator, iterFn, index, length, result, step;
 if (IS_ITERATOR) {
  iterator = iterable;
 } else {
  iterFn = getIteratorMethod(iterable);
  if (typeof iterFn != 'function')
   throw TypeError('Target is not iterable');
  if (isArrayIteratorMethod(iterFn)) {
   for (index = 0, length = toLength(iterable.length); length > index; index++) {
    result = AS_ENTRIES ? boundFunction(anObject(step = iterable[index])[0], step[1]) : boundFunction(iterable[index]);
    if (result && result instanceof Result)
     return result;
   }
   return new Result(false);
  }
  iterator = iterFn.call(iterable);
 }
 while (!(step = iterator.next()).done) {
  result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
  if (result && result instanceof Result)
   return result;
 }
 return new Result(false);
};
iterate.stop = function (result) {
 return new Result(true, result);
};

/***/ }),
/* 108 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name) {
 if (!(it instanceof Constructor)) {
  throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
 }
 return it;
};

/***/ }),
/* 109 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var setPrototypeOf = __w_pdfjs_require__(79);
module.exports = function ($this, dummy, Wrapper) {
 var NewTarget, NewTargetPrototype;
 if (setPrototypeOf && typeof (NewTarget = dummy.constructor) == 'function' && NewTarget !== Wrapper && isObject(NewTargetPrototype = NewTarget.prototype) && NewTargetPrototype !== Wrapper.prototype)
  setPrototypeOf($this, NewTargetPrototype);
 return $this;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var redefineAll = __w_pdfjs_require__(103);
var getWeakData = __w_pdfjs_require__(104).getWeakData;
var anObject = __w_pdfjs_require__(25);
var isObject = __w_pdfjs_require__(19);
var anInstance = __w_pdfjs_require__(108);
var iterate = __w_pdfjs_require__(107);
var ArrayIterationModule = __w_pdfjs_require__(111);
var $has = __w_pdfjs_require__(20);
var InternalStateModule = __w_pdfjs_require__(31);
var setInternalState = InternalStateModule.set;
var internalStateGetterFor = InternalStateModule.getterFor;
var find = ArrayIterationModule.find;
var findIndex = ArrayIterationModule.findIndex;
var id = 0;
var uncaughtFrozenStore = function (store) {
 return store.frozen || (store.frozen = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function () {
 this.entries = [];
};
var findUncaughtFrozen = function (store, key) {
 return find(store.entries, function (it) {
  return it[0] === key;
 });
};
UncaughtFrozenStore.prototype = {
 get: function (key) {
  var entry = findUncaughtFrozen(this, key);
  if (entry)
   return entry[1];
 },
 has: function (key) {
  return !!findUncaughtFrozen(this, key);
 },
 set: function (key, value) {
  var entry = findUncaughtFrozen(this, key);
  if (entry)
   entry[1] = value;
  else
   this.entries.push([
    key,
    value
   ]);
 },
 'delete': function (key) {
  var index = findIndex(this.entries, function (it) {
   return it[0] === key;
  });
  if (~index)
   this.entries.splice(index, 1);
  return !!~index;
 }
};
module.exports = {
 getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
  var C = wrapper(function (that, iterable) {
   anInstance(that, C, CONSTRUCTOR_NAME);
   setInternalState(that, {
    type: CONSTRUCTOR_NAME,
    id: id++,
    frozen: undefined
   });
   if (iterable != undefined)
    iterate(iterable, that[ADDER], that, IS_MAP);
  });
  var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);
  var define = function (that, key, value) {
   var state = getInternalState(that);
   var data = getWeakData(anObject(key), true);
   if (data === true)
    uncaughtFrozenStore(state).set(key, value);
   else
    data[state.id] = value;
   return that;
  };
  redefineAll(C.prototype, {
   'delete': function (key) {
    var state = getInternalState(this);
    if (!isObject(key))
     return false;
    var data = getWeakData(key);
    if (data === true)
     return uncaughtFrozenStore(state)['delete'](key);
    return data && $has(data, state.id) && delete data[state.id];
   },
   has: function has(key) {
    var state = getInternalState(this);
    if (!isObject(key))
     return false;
    var data = getWeakData(key);
    if (data === true)
     return uncaughtFrozenStore(state).has(key);
    return data && $has(data, state.id);
   }
  });
  redefineAll(C.prototype, IS_MAP ? {
   get: function get(key) {
    var state = getInternalState(this);
    if (isObject(key)) {
     var data = getWeakData(key);
     if (data === true)
      return uncaughtFrozenStore(state).get(key);
     return data ? data[state.id] : undefined;
    }
   },
   set: function set(key, value) {
    return define(this, key, value);
   }
  } : {
   add: function add(value) {
    return define(this, value, true);
   }
  });
  return C;
 }
};

/***/ }),
/* 111 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var bind = __w_pdfjs_require__(55);
var IndexedObject = __w_pdfjs_require__(15);
var toObject = __w_pdfjs_require__(75);
var toLength = __w_pdfjs_require__(43);
var arraySpeciesCreate = __w_pdfjs_require__(112);
var push = [].push;
var createMethod = function (TYPE) {
 var IS_MAP = TYPE == 1;
 var IS_FILTER = TYPE == 2;
 var IS_SOME = TYPE == 3;
 var IS_EVERY = TYPE == 4;
 var IS_FIND_INDEX = TYPE == 6;
 var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
 return function ($this, callbackfn, that, specificCreate) {
  var O = toObject($this);
  var self = IndexedObject(O);
  var boundFunction = bind(callbackfn, that, 3);
  var length = toLength(self.length);
  var index = 0;
  var create = specificCreate || arraySpeciesCreate;
  var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
  var value, result;
  for (; length > index; index++)
   if (NO_HOLES || index in self) {
    value = self[index];
    result = boundFunction(value, index, O);
    if (TYPE) {
     if (IS_MAP)
      target[index] = result;
     else if (result)
      switch (TYPE) {
      case 3:
       return true;
      case 5:
       return value;
      case 6:
       return index;
      case 2:
       push.call(target, value);
      }
     else if (IS_EVERY)
      return false;
    }
   }
  return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
 };
};
module.exports = {
 forEach: createMethod(0),
 map: createMethod(1),
 filter: createMethod(2),
 some: createMethod(3),
 every: createMethod(4),
 find: createMethod(5),
 findIndex: createMethod(6)
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var isObject = __w_pdfjs_require__(19);
var isArray = __w_pdfjs_require__(113);
var wellKnownSymbol = __w_pdfjs_require__(51);
var SPECIES = wellKnownSymbol('species');
module.exports = function (originalArray, length) {
 var C;
 if (isArray(originalArray)) {
  C = originalArray.constructor;
  if (typeof C == 'function' && (C === Array || isArray(C.prototype)))
   C = undefined;
  else if (isObject(C)) {
   C = C[SPECIES];
   if (C === null)
    C = undefined;
  }
 }
 return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};

/***/ }),
/* 113 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var classof = __w_pdfjs_require__(16);
module.exports = Array.isArray || function isArray(arg) {
 return classof(arg) == 'Array';
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var DOMIterables = __w_pdfjs_require__(115);
var ArrayIteratorMethods = __w_pdfjs_require__(116);
var hide = __w_pdfjs_require__(23);
var wellKnownSymbol = __w_pdfjs_require__(51);
var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;
for (var COLLECTION_NAME in DOMIterables) {
 var Collection = global[COLLECTION_NAME];
 var CollectionPrototype = Collection && Collection.prototype;
 if (CollectionPrototype) {
  if (CollectionPrototype[ITERATOR] !== ArrayValues)
   try {
    hide(CollectionPrototype, ITERATOR, ArrayValues);
   } catch (error) {
    CollectionPrototype[ITERATOR] = ArrayValues;
   }
  if (!CollectionPrototype[TO_STRING_TAG])
   hide(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
  if (DOMIterables[COLLECTION_NAME])
   for (var METHOD_NAME in ArrayIteratorMethods) {
    if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME])
     try {
      hide(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
     } catch (error) {
      CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
     }
   }
 }
}

/***/ }),
/* 115 */
/***/ (function(module, exports) {

module.exports = {
 CSSRuleList: 0,
 CSSStyleDeclaration: 0,
 CSSValueList: 0,
 ClientRectList: 0,
 DOMRectList: 0,
 DOMStringList: 0,
 DOMTokenList: 1,
 DataTransferItemList: 0,
 FileList: 0,
 HTMLAllCollection: 0,
 HTMLCollection: 0,
 HTMLFormElement: 0,
 HTMLSelectElement: 0,
 MediaList: 0,
 MimeTypeArray: 0,
 NamedNodeMap: 0,
 NodeList: 1,
 PaintRequestList: 0,
 Plugin: 0,
 PluginArray: 0,
 SVGLengthList: 0,
 SVGNumberList: 0,
 SVGPathSegList: 0,
 SVGPointList: 0,
 SVGStringList: 0,
 SVGTransformList: 0,
 SourceBufferList: 0,
 StyleSheetList: 0,
 TextTrackCueList: 0,
 TextTrackList: 0,
 TouchList: 0
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var toIndexedObject = __w_pdfjs_require__(14);
var addToUnscopables = __w_pdfjs_require__(63);
var Iterators = __w_pdfjs_require__(78);
var InternalStateModule = __w_pdfjs_require__(31);
var defineIterator = __w_pdfjs_require__(71);
var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
 setInternalState(this, {
  type: ARRAY_ITERATOR,
  target: toIndexedObject(iterated),
  index: 0,
  kind: kind
 });
}, function () {
 var state = getInternalState(this);
 var target = state.target;
 var kind = state.kind;
 var index = state.index++;
 if (!target || index >= target.length) {
  state.target = undefined;
  return {
   value: undefined,
   done: true
  };
 }
 if (kind == 'keys')
  return {
   value: index,
   done: false
  };
 if (kind == 'values')
  return {
   value: target[index],
   done: false
  };
 return {
  value: [
   index,
   target[index]
  ],
  done: false
 };
}, 'values');
Iterators.Arguments = Iterators.Array;
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ }),
/* 117 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(100);
__w_pdfjs_require__(118);
__w_pdfjs_require__(114);
var path = __w_pdfjs_require__(39);
module.exports = path.WeakSet;

/***/ }),
/* 118 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var collection = __w_pdfjs_require__(106);
var collectionWeak = __w_pdfjs_require__(110);
collection('WeakSet', function (get) {
 return function WeakSet() {
  return get(this, arguments.length ? arguments[0] : undefined);
 };
}, collectionWeak, false, true);

/***/ }),
/* 119 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(120);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('String', 'codePointAt');

/***/ }),
/* 120 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var codeAt = __w_pdfjs_require__(70).codeAt;
$({
 target: 'String',
 proto: true
}, {
 codePointAt: function codePointAt(pos) {
  return codeAt(this, pos);
 }
});

/***/ }),
/* 121 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(122);
var path = __w_pdfjs_require__(39);
module.exports = path.String.fromCodePoint;

/***/ }),
/* 122 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var toAbsoluteIndex = __w_pdfjs_require__(45);
var fromCharCode = String.fromCharCode;
var nativeFromCodePoint = String.fromCodePoint;
var INCORRECT_LENGTH = !!nativeFromCodePoint && nativeFromCodePoint.length != 1;
$({
 target: 'String',
 stat: true,
 forced: INCORRECT_LENGTH
}, {
 fromCodePoint: function fromCodePoint(x) {
  var elements = [];
  var length = arguments.length;
  var i = 0;
  var code;
  while (length > i) {
   code = +arguments[i++];
   if (toAbsoluteIndex(code, 0x10FFFF) !== code)
    throw RangeError(code + ' is not a valid code point');
   elements.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00));
  }
  return elements.join('');
 }
});

/***/ }),
/* 123 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(124);
__w_pdfjs_require__(100);
__w_pdfjs_require__(126);
__w_pdfjs_require__(130);
__w_pdfjs_require__(131);
__w_pdfjs_require__(132);
__w_pdfjs_require__(133);
__w_pdfjs_require__(134);
__w_pdfjs_require__(135);
__w_pdfjs_require__(136);
__w_pdfjs_require__(137);
__w_pdfjs_require__(138);
__w_pdfjs_require__(139);
__w_pdfjs_require__(140);
__w_pdfjs_require__(141);
__w_pdfjs_require__(142);
__w_pdfjs_require__(143);
__w_pdfjs_require__(144);
__w_pdfjs_require__(145);
var path = __w_pdfjs_require__(39);
module.exports = path.Symbol;

/***/ }),
/* 124 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var fails = __w_pdfjs_require__(11);
var isArray = __w_pdfjs_require__(113);
var isObject = __w_pdfjs_require__(19);
var toObject = __w_pdfjs_require__(75);
var toLength = __w_pdfjs_require__(43);
var createProperty = __w_pdfjs_require__(85);
var arraySpeciesCreate = __w_pdfjs_require__(112);
var arrayMethodHasSpeciesSupport = __w_pdfjs_require__(125);
var wellKnownSymbol = __w_pdfjs_require__(51);
var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';
var IS_CONCAT_SPREADABLE_SUPPORT = !fails(function () {
 var array = [];
 array[IS_CONCAT_SPREADABLE] = false;
 return array.concat()[0] !== array;
});
var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');
var isConcatSpreadable = function (O) {
 if (!isObject(O))
  return false;
 var spreadable = O[IS_CONCAT_SPREADABLE];
 return spreadable !== undefined ? !!spreadable : isArray(O);
};
var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;
$({
 target: 'Array',
 proto: true,
 forced: FORCED
}, {
 concat: function concat(arg) {
  var O = toObject(this);
  var A = arraySpeciesCreate(O, 0);
  var n = 0;
  var i, k, length, len, E;
  for (i = -1, length = arguments.length; i < length; i++) {
   E = i === -1 ? O : arguments[i];
   if (isConcatSpreadable(E)) {
    len = toLength(E.length);
    if (n + len > MAX_SAFE_INTEGER)
     throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
    for (k = 0; k < len; k++, n++)
     if (k in E)
      createProperty(A, n, E[k]);
   } else {
    if (n >= MAX_SAFE_INTEGER)
     throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
    createProperty(A, n++, E);
   }
  }
  A.length = n;
  return A;
 }
});

/***/ }),
/* 125 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var fails = __w_pdfjs_require__(11);
var wellKnownSymbol = __w_pdfjs_require__(51);
var SPECIES = wellKnownSymbol('species');
module.exports = function (METHOD_NAME) {
 return !fails(function () {
  var array = [];
  var constructor = array.constructor = {};
  constructor[SPECIES] = function () {
   return { foo: 1 };
  };
  return array[METHOD_NAME](Boolean).foo !== 1;
 });
};

/***/ }),
/* 126 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var global = __w_pdfjs_require__(8);
var IS_PURE = __w_pdfjs_require__(29);
var DESCRIPTORS = __w_pdfjs_require__(10);
var NATIVE_SYMBOL = __w_pdfjs_require__(52);
var fails = __w_pdfjs_require__(11);
var has = __w_pdfjs_require__(20);
var isArray = __w_pdfjs_require__(113);
var isObject = __w_pdfjs_require__(19);
var anObject = __w_pdfjs_require__(25);
var toObject = __w_pdfjs_require__(75);
var toIndexedObject = __w_pdfjs_require__(14);
var toPrimitive = __w_pdfjs_require__(18);
var createPropertyDescriptor = __w_pdfjs_require__(13);
var nativeObjectCreate = __w_pdfjs_require__(64);
var objectKeys = __w_pdfjs_require__(66);
var getOwnPropertyNamesModule = __w_pdfjs_require__(40);
var getOwnPropertyNamesExternal = __w_pdfjs_require__(127);
var getOwnPropertySymbolsModule = __w_pdfjs_require__(47);
var getOwnPropertyDescriptorModule = __w_pdfjs_require__(9);
var definePropertyModule = __w_pdfjs_require__(24);
var propertyIsEnumerableModule = __w_pdfjs_require__(12);
var hide = __w_pdfjs_require__(23);
var redefine = __w_pdfjs_require__(26);
var shared = __w_pdfjs_require__(27);
var sharedKey = __w_pdfjs_require__(33);
var hiddenKeys = __w_pdfjs_require__(35);
var uid = __w_pdfjs_require__(34);
var wellKnownSymbol = __w_pdfjs_require__(51);
var wrappedWellKnownSymbolModule = __w_pdfjs_require__(128);
var defineWellKnownSymbol = __w_pdfjs_require__(129);
var setToStringTag = __w_pdfjs_require__(77);
var InternalStateModule = __w_pdfjs_require__(31);
var $forEach = __w_pdfjs_require__(111).forEach;
var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var JSON = global.JSON;
var nativeJSONStringify = JSON && JSON.stringify;
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
 return nativeObjectCreate(nativeDefineProperty({}, 'a', {
  get: function () {
   return nativeDefineProperty(this, 'a', { value: 7 }).a;
  }
 })).a != 7;
}) ? function (O, P, Attributes) {
 var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
 if (ObjectPrototypeDescriptor)
  delete ObjectPrototype[P];
 nativeDefineProperty(O, P, Attributes);
 if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
  nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
 }
} : nativeDefineProperty;
var wrap = function (tag, description) {
 var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
 setInternalState(symbol, {
  type: SYMBOL,
  tag: tag,
  description: description
 });
 if (!DESCRIPTORS)
  symbol.description = description;
 return symbol;
};
var isSymbol = NATIVE_SYMBOL && typeof $Symbol.iterator == 'symbol' ? function (it) {
 return typeof it == 'symbol';
} : function (it) {
 return Object(it) instanceof $Symbol;
};
var $defineProperty = function defineProperty(O, P, Attributes) {
 if (O === ObjectPrototype)
  $defineProperty(ObjectPrototypeSymbols, P, Attributes);
 anObject(O);
 var key = toPrimitive(P, true);
 anObject(Attributes);
 if (has(AllSymbols, key)) {
  if (!Attributes.enumerable) {
   if (!has(O, HIDDEN))
    nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
   O[HIDDEN][key] = true;
  } else {
   if (has(O, HIDDEN) && O[HIDDEN][key])
    O[HIDDEN][key] = false;
   Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
  }
  return setSymbolDescriptor(O, key, Attributes);
 }
 return nativeDefineProperty(O, key, Attributes);
};
var $defineProperties = function defineProperties(O, Properties) {
 anObject(O);
 var properties = toIndexedObject(Properties);
 var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
 $forEach(keys, function (key) {
  if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key))
   $defineProperty(O, key, properties[key]);
 });
 return O;
};
var $create = function create(O, Properties) {
 return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};
var $propertyIsEnumerable = function propertyIsEnumerable(V) {
 var P = toPrimitive(V, true);
 var enumerable = nativePropertyIsEnumerable.call(this, P);
 if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P))
  return false;
 return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
 var it = toIndexedObject(O);
 var key = toPrimitive(P, true);
 if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key))
  return;
 var descriptor = nativeGetOwnPropertyDescriptor(it, key);
 if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
  descriptor.enumerable = true;
 }
 return descriptor;
};
var $getOwnPropertyNames = function getOwnPropertyNames(O) {
 var names = nativeGetOwnPropertyNames(toIndexedObject(O));
 var result = [];
 $forEach(names, function (key) {
  if (!has(AllSymbols, key) && !has(hiddenKeys, key))
   result.push(key);
 });
 return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
 var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
 var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
 var result = [];
 $forEach(names, function (key) {
  if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
   result.push(AllSymbols[key]);
  }
 });
 return result;
};
if (!NATIVE_SYMBOL) {
 $Symbol = function Symbol() {
  if (this instanceof $Symbol)
   throw TypeError('Symbol is not a constructor');
  var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
  var tag = uid(description);
  var setter = function (value) {
   if (this === ObjectPrototype)
    setter.call(ObjectPrototypeSymbols, value);
   if (has(this, HIDDEN) && has(this[HIDDEN], tag))
    this[HIDDEN][tag] = false;
   setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
  };
  if (DESCRIPTORS && USE_SETTER)
   setSymbolDescriptor(ObjectPrototype, tag, {
    configurable: true,
    set: setter
   });
  return wrap(tag, description);
 };
 redefine($Symbol[PROTOTYPE], 'toString', function toString() {
  return getInternalState(this).tag;
 });
 propertyIsEnumerableModule.f = $propertyIsEnumerable;
 definePropertyModule.f = $defineProperty;
 getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
 getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
 getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;
 if (DESCRIPTORS) {
  nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
   configurable: true,
   get: function description() {
    return getInternalState(this).description;
   }
  });
  if (!IS_PURE) {
   redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
  }
 }
 wrappedWellKnownSymbolModule.f = function (name) {
  return wrap(wellKnownSymbol(name), name);
 };
}
$({
 global: true,
 wrap: true,
 forced: !NATIVE_SYMBOL,
 sham: !NATIVE_SYMBOL
}, { Symbol: $Symbol });
$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
 defineWellKnownSymbol(name);
});
$({
 target: SYMBOL,
 stat: true,
 forced: !NATIVE_SYMBOL
}, {
 'for': function (key) {
  var string = String(key);
  if (has(StringToSymbolRegistry, string))
   return StringToSymbolRegistry[string];
  var symbol = $Symbol(string);
  StringToSymbolRegistry[string] = symbol;
  SymbolToStringRegistry[symbol] = string;
  return symbol;
 },
 keyFor: function keyFor(sym) {
  if (!isSymbol(sym))
   throw TypeError(sym + ' is not a symbol');
  if (has(SymbolToStringRegistry, sym))
   return SymbolToStringRegistry[sym];
 },
 useSetter: function () {
  USE_SETTER = true;
 },
 useSimple: function () {
  USE_SETTER = false;
 }
});
$({
 target: 'Object',
 stat: true,
 forced: !NATIVE_SYMBOL,
 sham: !DESCRIPTORS
}, {
 create: $create,
 defineProperty: $defineProperty,
 defineProperties: $defineProperties,
 getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});
$({
 target: 'Object',
 stat: true,
 forced: !NATIVE_SYMBOL
}, {
 getOwnPropertyNames: $getOwnPropertyNames,
 getOwnPropertySymbols: $getOwnPropertySymbols
});
$({
 target: 'Object',
 stat: true,
 forced: fails(function () {
  getOwnPropertySymbolsModule.f(1);
 })
}, {
 getOwnPropertySymbols: function getOwnPropertySymbols(it) {
  return getOwnPropertySymbolsModule.f(toObject(it));
 }
});
JSON && $({
 target: 'JSON',
 stat: true,
 forced: !NATIVE_SYMBOL || fails(function () {
  var symbol = $Symbol();
  return nativeJSONStringify([symbol]) != '[null]' || nativeJSONStringify({ a: symbol }) != '{}' || nativeJSONStringify(Object(symbol)) != '{}';
 })
}, {
 stringify: function stringify(it) {
  var args = [it];
  var index = 1;
  var replacer, $replacer;
  while (arguments.length > index)
   args.push(arguments[index++]);
  $replacer = replacer = args[1];
  if (!isObject(replacer) && it === undefined || isSymbol(it))
   return;
  if (!isArray(replacer))
   replacer = function (key, value) {
    if (typeof $replacer == 'function')
     value = $replacer.call(this, key, value);
    if (!isSymbol(value))
     return value;
   };
  args[1] = replacer;
  return nativeJSONStringify.apply(JSON, args);
 }
});
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE])
 hide($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
setToStringTag($Symbol, SYMBOL);
hiddenKeys[HIDDEN] = true;

/***/ }),
/* 127 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toIndexedObject = __w_pdfjs_require__(14);
var nativeGetOwnPropertyNames = __w_pdfjs_require__(40).f;
var toString = {}.toString;
var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];
var getWindowNames = function (it) {
 try {
  return nativeGetOwnPropertyNames(it);
 } catch (error) {
  return windowNames.slice();
 }
};
module.exports.f = function getOwnPropertyNames(it) {
 return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : nativeGetOwnPropertyNames(toIndexedObject(it));
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __w_pdfjs_require__) {

exports.f = __w_pdfjs_require__(51);

/***/ }),
/* 129 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var path = __w_pdfjs_require__(39);
var has = __w_pdfjs_require__(20);
var wrappedWellKnownSymbolModule = __w_pdfjs_require__(128);
var defineProperty = __w_pdfjs_require__(24).f;
module.exports = function (NAME) {
 var Symbol = path.Symbol || (path.Symbol = {});
 if (!has(Symbol, NAME))
  defineProperty(Symbol, NAME, { value: wrappedWellKnownSymbolModule.f(NAME) });
};

/***/ }),
/* 130 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('asyncIterator');

/***/ }),
/* 131 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var DESCRIPTORS = __w_pdfjs_require__(10);
var global = __w_pdfjs_require__(8);
var has = __w_pdfjs_require__(20);
var isObject = __w_pdfjs_require__(19);
var defineProperty = __w_pdfjs_require__(24).f;
var copyConstructorProperties = __w_pdfjs_require__(36);
var NativeSymbol = global.Symbol;
if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) || NativeSymbol().description !== undefined)) {
 var EmptyStringDescriptionStore = {};
 var SymbolWrapper = function Symbol() {
  var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
  var result = this instanceof SymbolWrapper ? new NativeSymbol(description) : description === undefined ? NativeSymbol() : NativeSymbol(description);
  if (description === '')
   EmptyStringDescriptionStore[result] = true;
  return result;
 };
 copyConstructorProperties(SymbolWrapper, NativeSymbol);
 var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
 symbolPrototype.constructor = SymbolWrapper;
 var symbolToString = symbolPrototype.toString;
 var native = String(NativeSymbol('test')) == 'Symbol(test)';
 var regexp = /^Symbol\((.*)\)[^)]+$/;
 defineProperty(symbolPrototype, 'description', {
  configurable: true,
  get: function description() {
   var symbol = isObject(this) ? this.valueOf() : this;
   var string = symbolToString.call(symbol);
   if (has(EmptyStringDescriptionStore, symbol))
    return '';
   var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
   return desc === '' ? undefined : desc;
  }
 });
 $({
  global: true,
  forced: true
 }, { Symbol: SymbolWrapper });
}

/***/ }),
/* 132 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('hasInstance');

/***/ }),
/* 133 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('isConcatSpreadable');

/***/ }),
/* 134 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('iterator');

/***/ }),
/* 135 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('match');

/***/ }),
/* 136 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('matchAll');

/***/ }),
/* 137 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('replace');

/***/ }),
/* 138 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('search');

/***/ }),
/* 139 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('species');

/***/ }),
/* 140 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('split');

/***/ }),
/* 141 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('toPrimitive');

/***/ }),
/* 142 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('toStringTag');

/***/ }),
/* 143 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var defineWellKnownSymbol = __w_pdfjs_require__(129);
defineWellKnownSymbol('unscopables');

/***/ }),
/* 144 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var setToStringTag = __w_pdfjs_require__(77);
setToStringTag(Math, 'Math', true);

/***/ }),
/* 145 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var global = __w_pdfjs_require__(8);
var setToStringTag = __w_pdfjs_require__(77);
setToStringTag(global.JSON, 'JSON', true);

/***/ }),
/* 146 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(147);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('String', 'padStart');

/***/ }),
/* 147 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var $padStart = __w_pdfjs_require__(148).start;
var WEBKIT_BUG = __w_pdfjs_require__(150);
$({
 target: 'String',
 proto: true,
 forced: WEBKIT_BUG
}, {
 padStart: function padStart(maxLength) {
  return $padStart(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
 }
});

/***/ }),
/* 148 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var toLength = __w_pdfjs_require__(43);
var repeat = __w_pdfjs_require__(149);
var requireObjectCoercible = __w_pdfjs_require__(17);
var ceil = Math.ceil;
var createMethod = function (IS_END) {
 return function ($this, maxLength, fillString) {
  var S = String(requireObjectCoercible($this));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  var fillLen, stringFiller;
  if (intMaxLength <= stringLength || fillStr == '')
   return S;
  fillLen = intMaxLength - stringLength;
  stringFiller = repeat.call(fillStr, ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen)
   stringFiller = stringFiller.slice(0, fillLen);
  return IS_END ? S + stringFiller : stringFiller + S;
 };
};
module.exports = {
 start: createMethod(false),
 end: createMethod(true)
};

/***/ }),
/* 149 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var toInteger = __w_pdfjs_require__(44);
var requireObjectCoercible = __w_pdfjs_require__(17);
module.exports = ''.repeat || function repeat(count) {
 var str = String(requireObjectCoercible(this));
 var result = '';
 var n = toInteger(count);
 if (n < 0 || n == Infinity)
  throw RangeError('Wrong number of repetitions');
 for (; n > 0; (n >>>= 1) && (str += str))
  if (n & 1)
   result += str;
 return result;
};

/***/ }),
/* 150 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var userAgent = __w_pdfjs_require__(151);
module.exports = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

/***/ }),
/* 151 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var getBuiltIn = __w_pdfjs_require__(38);
module.exports = getBuiltIn('navigator', 'userAgent') || '';

/***/ }),
/* 152 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(153);
var entryUnbind = __w_pdfjs_require__(54);
module.exports = entryUnbind('String', 'padEnd');

/***/ }),
/* 153 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";

var $ = __w_pdfjs_require__(7);
var $padEnd = __w_pdfjs_require__(148).end;
var WEBKIT_BUG = __w_pdfjs_require__(150);
$({
 target: 'String',
 proto: true,
 forced: WEBKIT_BUG
}, {
 padEnd: function padEnd(maxLength) {
  return $padEnd(this, maxLength, arguments.length > 1 ? arguments[1] : undefined);
 }
});

/***/ }),
/* 154 */
/***/ (function(module, exports, __w_pdfjs_require__) {

__w_pdfjs_require__(155);
var path = __w_pdfjs_require__(39);
module.exports = path.Object.values;

/***/ }),
/* 155 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var $ = __w_pdfjs_require__(7);
var $values = __w_pdfjs_require__(156).values;
$({
 target: 'Object',
 stat: true
}, {
 values: function values(O) {
  return $values(O);
 }
});

/***/ }),
/* 156 */
/***/ (function(module, exports, __w_pdfjs_require__) {

var DESCRIPTORS = __w_pdfjs_require__(10);
var objectKeys = __w_pdfjs_require__(66);
var toIndexedObject = __w_pdfjs_require__(14);
var propertyIsEnumerable = __w_pdfjs_require__(12).f;
var createMethod = function (TO_ENTRIES) {
 return function (it) {
  var O = toIndexedObject(it);
  var keys = objectKeys(O);
  var length = keys.length;
  var i = 0;
  var result = [];
  var key;
  while (length > i) {
   key = keys[i++];
   if (!DESCRIPTORS || propertyIsEnumerable.call(O, key)) {
    result.push(TO_ENTRIES ? [
     key,
     O[key]
    ] : O[key]);
   }
  }
  return result;
 };
};
module.exports = {
 entries: createMethod(true),
 values: createMethod(false)
};

/***/ }),
/* 157 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  var isReadableStreamSupported = false;

  if (typeof ReadableStream !== 'undefined') {
    try {
      new ReadableStream({
        start: function start(controller) {
          controller.close();
        }
      });
      isReadableStreamSupported = true;
    } catch (e) {}
  }

  if (isReadableStreamSupported) {
    exports.ReadableStream = ReadableStream;
  } else {
    var DummyReadableStream = function DummyReadableStream() {
      _classCallCheck(this, DummyReadableStream);

      throw new Error('The current image decoders are synchronous, ' + 'hence `ReadableStream` shouldn\'t need to be ' + 'polyfilled for the IMAGE_DECODERS build target.');
    };

    exports.ReadableStream = DummyReadableStream;
  }
}

/***/ }),
/* 158 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Jbig2Image = void 0;

var _util = __w_pdfjs_require__(1);

var _arithmetic_decoder = __w_pdfjs_require__(159);

var _ccitt = __w_pdfjs_require__(160);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Jbig2Error =
/*#__PURE__*/
function (_BaseException) {
  _inherits(Jbig2Error, _BaseException);

  function Jbig2Error(msg) {
    _classCallCheck(this, Jbig2Error);

    return _possibleConstructorReturn(this, _getPrototypeOf(Jbig2Error).call(this, "JBIG2 error: ".concat(msg)));
  }

  return Jbig2Error;
}(_util.BaseException);

var Jbig2Image = function Jbig2ImageClosure() {
  function ContextCache() {}

  ContextCache.prototype = {
    getContexts: function getContexts(id) {
      if (id in this) {
        return this[id];
      }

      return this[id] = new Int8Array(1 << 16);
    }
  };

  function DecodingContext(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
  }

  DecodingContext.prototype = {
    get decoder() {
      var decoder = new _arithmetic_decoder.ArithmeticDecoder(this.data, this.start, this.end);
      return (0, _util.shadow)(this, 'decoder', decoder);
    },

    get contextCache() {
      var cache = new ContextCache();
      return (0, _util.shadow)(this, 'contextCache', cache);
    }

  };

  function decodeInteger(contextCache, procedure, decoder) {
    var contexts = contextCache.getContexts(procedure);
    var prev = 1;

    function readBits(length) {
      var v = 0;

      for (var i = 0; i < length; i++) {
        var bit = decoder.readBit(contexts, prev);
        prev = prev < 256 ? prev << 1 | bit : (prev << 1 | bit) & 511 | 256;
        v = v << 1 | bit;
      }

      return v >>> 0;
    }

    var sign = readBits(1);
    var value = readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(1) ? readBits(32) + 4436 : readBits(12) + 340 : readBits(8) + 84 : readBits(6) + 20 : readBits(4) + 4 : readBits(2);
    return sign === 0 ? value : value > 0 ? -value : null;
  }

  function decodeIAID(contextCache, decoder, codeLength) {
    var contexts = contextCache.getContexts('IAID');
    var prev = 1;

    for (var i = 0; i < codeLength; i++) {
      var bit = decoder.readBit(contexts, prev);
      prev = prev << 1 | bit;
    }

    if (codeLength < 31) {
      return prev & (1 << codeLength) - 1;
    }

    return prev & 0x7FFFFFFF;
  }

  var SegmentTypes = ['SymbolDictionary', null, null, null, 'IntermediateTextRegion', null, 'ImmediateTextRegion', 'ImmediateLosslessTextRegion', null, null, null, null, null, null, null, null, 'PatternDictionary', null, null, null, 'IntermediateHalftoneRegion', null, 'ImmediateHalftoneRegion', 'ImmediateLosslessHalftoneRegion', null, null, null, null, null, null, null, null, null, null, null, null, 'IntermediateGenericRegion', null, 'ImmediateGenericRegion', 'ImmediateLosslessGenericRegion', 'IntermediateGenericRefinementRegion', null, 'ImmediateGenericRefinementRegion', 'ImmediateLosslessGenericRefinementRegion', null, null, null, null, 'PageInformation', 'EndOfPage', 'EndOfStripe', 'EndOfFile', 'Profiles', 'Tables', null, null, null, null, null, null, null, null, 'Extension'];
  var CodingTemplates = [[{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: 2,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: 2,
    y: -1
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -1,
    y: -2
  }, {
    x: 0,
    y: -2
  }, {
    x: 1,
    y: -2
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }], [{
    x: -3,
    y: -1
  }, {
    x: -2,
    y: -1
  }, {
    x: -1,
    y: -1
  }, {
    x: 0,
    y: -1
  }, {
    x: 1,
    y: -1
  }, {
    x: -4,
    y: 0
  }, {
    x: -3,
    y: 0
  }, {
    x: -2,
    y: 0
  }, {
    x: -1,
    y: 0
  }]];
  var RefinementTemplates = [{
    coding: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: -1,
      y: 1
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }, {
    coding: [{
      x: -1,
      y: -1
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: -1
    }, {
      x: -1,
      y: 0
    }],
    reference: [{
      x: 0,
      y: -1
    }, {
      x: -1,
      y: 0
    }, {
      x: 0,
      y: 0
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }, {
      x: 1,
      y: 1
    }]
  }];
  var ReusedContexts = [0x9B25, 0x0795, 0x00E5, 0x0195];
  var RefinementReusedContexts = [0x0020, 0x0008];

  function decodeBitmapTemplate0(width, height, decodingContext) {
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var contextLabel,
        i,
        j,
        pixel,
        row,
        row1,
        row2,
        bitmap = [];
    var OLD_PIXEL_MASK = 0x7BF7;

    for (i = 0; i < height; i++) {
      row = bitmap[i] = new Uint8Array(width);
      row1 = i < 1 ? row : bitmap[i - 1];
      row2 = i < 2 ? row : bitmap[i - 2];
      contextLabel = row2[0] << 13 | row2[1] << 12 | row2[2] << 11 | row1[0] << 7 | row1[1] << 6 | row1[2] << 5 | row1[3] << 4;

      for (j = 0; j < width; j++) {
        row[j] = pixel = decoder.readBit(contexts, contextLabel);
        contextLabel = (contextLabel & OLD_PIXEL_MASK) << 1 | (j + 3 < width ? row2[j + 3] << 11 : 0) | (j + 4 < width ? row1[j + 4] << 4 : 0) | pixel;
      }
    }

    return bitmap;
  }

  function decodeBitmap(mmr, width, height, templateIndex, prediction, skip, at, decodingContext) {
    if (mmr) {
      var input = new Reader(decodingContext.data, decodingContext.start, decodingContext.end);
      return decodeMMRBitmap(input, width, height, false);
    }

    if (templateIndex === 0 && !skip && !prediction && at.length === 4 && at[0].x === 3 && at[0].y === -1 && at[1].x === -3 && at[1].y === -1 && at[2].x === 2 && at[2].y === -2 && at[3].x === -2 && at[3].y === -2) {
      return decodeBitmapTemplate0(width, height, decodingContext);
    }

    var useskip = !!skip;
    var template = CodingTemplates[templateIndex].concat(at);
    template.sort(function (a, b) {
      return a.y - b.y || a.x - b.x;
    });
    var templateLength = template.length;
    var templateX = new Int8Array(templateLength);
    var templateY = new Int8Array(templateLength);
    var changingTemplateEntries = [];
    var reuseMask = 0,
        minX = 0,
        maxX = 0,
        minY = 0;
    var c, k;

    for (k = 0; k < templateLength; k++) {
      templateX[k] = template[k].x;
      templateY[k] = template[k].y;
      minX = Math.min(minX, template[k].x);
      maxX = Math.max(maxX, template[k].x);
      minY = Math.min(minY, template[k].y);

      if (k < templateLength - 1 && template[k].y === template[k + 1].y && template[k].x === template[k + 1].x - 1) {
        reuseMask |= 1 << templateLength - 1 - k;
      } else {
        changingTemplateEntries.push(k);
      }
    }

    var changingEntriesLength = changingTemplateEntries.length;
    var changingTemplateX = new Int8Array(changingEntriesLength);
    var changingTemplateY = new Int8Array(changingEntriesLength);
    var changingTemplateBit = new Uint16Array(changingEntriesLength);

    for (c = 0; c < changingEntriesLength; c++) {
      k = changingTemplateEntries[c];
      changingTemplateX[c] = template[k].x;
      changingTemplateY[c] = template[k].y;
      changingTemplateBit[c] = 1 << templateLength - 1 - k;
    }

    var sbb_left = -minX;
    var sbb_top = -minY;
    var sbb_right = width - maxX;
    var pseudoPixelContext = ReusedContexts[templateIndex];
    var row = new Uint8Array(width);
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GB');
    var ltp = 0,
        j,
        i0,
        j0,
        contextLabel = 0,
        bit,
        shift;

    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;

        if (ltp) {
          bitmap.push(row);
          continue;
        }
      }

      row = new Uint8Array(row);
      bitmap.push(row);

      for (j = 0; j < width; j++) {
        if (useskip && skip[i][j]) {
          row[j] = 0;
          continue;
        }

        if (j >= sbb_left && j < sbb_right && i >= sbb_top) {
          contextLabel = contextLabel << 1 & reuseMask;

          for (k = 0; k < changingEntriesLength; k++) {
            i0 = i + changingTemplateY[k];
            j0 = j + changingTemplateX[k];
            bit = bitmap[i0][j0];

            if (bit) {
              bit = changingTemplateBit[k];
              contextLabel |= bit;
            }
          }
        } else {
          contextLabel = 0;
          shift = templateLength - 1;

          for (k = 0; k < templateLength; k++, shift--) {
            j0 = j + templateX[k];

            if (j0 >= 0 && j0 < width) {
              i0 = i + templateY[k];

              if (i0 >= 0) {
                bit = bitmap[i0][j0];

                if (bit) {
                  contextLabel |= bit << shift;
                }
              }
            }
          }
        }

        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }

    return bitmap;
  }

  function decodeRefinement(width, height, templateIndex, referenceBitmap, offsetX, offsetY, prediction, at, decodingContext) {
    var codingTemplate = RefinementTemplates[templateIndex].coding;

    if (templateIndex === 0) {
      codingTemplate = codingTemplate.concat([at[0]]);
    }

    var codingTemplateLength = codingTemplate.length;
    var codingTemplateX = new Int32Array(codingTemplateLength);
    var codingTemplateY = new Int32Array(codingTemplateLength);
    var k;

    for (k = 0; k < codingTemplateLength; k++) {
      codingTemplateX[k] = codingTemplate[k].x;
      codingTemplateY[k] = codingTemplate[k].y;
    }

    var referenceTemplate = RefinementTemplates[templateIndex].reference;

    if (templateIndex === 0) {
      referenceTemplate = referenceTemplate.concat([at[1]]);
    }

    var referenceTemplateLength = referenceTemplate.length;
    var referenceTemplateX = new Int32Array(referenceTemplateLength);
    var referenceTemplateY = new Int32Array(referenceTemplateLength);

    for (k = 0; k < referenceTemplateLength; k++) {
      referenceTemplateX[k] = referenceTemplate[k].x;
      referenceTemplateY[k] = referenceTemplate[k].y;
    }

    var referenceWidth = referenceBitmap[0].length;
    var referenceHeight = referenceBitmap.length;
    var pseudoPixelContext = RefinementReusedContexts[templateIndex];
    var bitmap = [];
    var decoder = decodingContext.decoder;
    var contexts = decodingContext.contextCache.getContexts('GR');
    var ltp = 0;

    for (var i = 0; i < height; i++) {
      if (prediction) {
        var sltp = decoder.readBit(contexts, pseudoPixelContext);
        ltp ^= sltp;

        if (ltp) {
          throw new Jbig2Error('prediction is not supported');
        }
      }

      var row = new Uint8Array(width);
      bitmap.push(row);

      for (var j = 0; j < width; j++) {
        var i0, j0;
        var contextLabel = 0;

        for (k = 0; k < codingTemplateLength; k++) {
          i0 = i + codingTemplateY[k];
          j0 = j + codingTemplateX[k];

          if (i0 < 0 || j0 < 0 || j0 >= width) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | bitmap[i0][j0];
          }
        }

        for (k = 0; k < referenceTemplateLength; k++) {
          i0 = i + referenceTemplateY[k] - offsetY;
          j0 = j + referenceTemplateX[k] - offsetX;

          if (i0 < 0 || i0 >= referenceHeight || j0 < 0 || j0 >= referenceWidth) {
            contextLabel <<= 1;
          } else {
            contextLabel = contextLabel << 1 | referenceBitmap[i0][j0];
          }
        }

        var pixel = decoder.readBit(contexts, contextLabel);
        row[j] = pixel;
      }
    }

    return bitmap;
  }

  function decodeSymbolDictionary(huffman, refinement, symbols, numberOfNewSymbols, numberOfExportedSymbols, huffmanTables, templateIndex, at, refinementTemplateIndex, refinementAt, decodingContext, huffmanInput) {
    if (huffman && refinement) {
      throw new Jbig2Error('symbol refinement with Huffman is not supported');
    }

    var newSymbols = [];
    var currentHeight = 0;
    var symbolCodeLength = (0, _util.log2)(symbols.length + numberOfNewSymbols);
    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var tableB1, symbolWidths;

    if (huffman) {
      tableB1 = getStandardTable(1);
      symbolWidths = [];
      symbolCodeLength = Math.max(symbolCodeLength, 1);
    }

    while (newSymbols.length < numberOfNewSymbols) {
      var deltaHeight = huffman ? huffmanTables.tableDeltaHeight.decode(huffmanInput) : decodeInteger(contextCache, 'IADH', decoder);
      currentHeight += deltaHeight;
      var currentWidth = 0,
          totalWidth = 0;
      var firstSymbol = huffman ? symbolWidths.length : 0;

      while (true) {
        var deltaWidth = huffman ? huffmanTables.tableDeltaWidth.decode(huffmanInput) : decodeInteger(contextCache, 'IADW', decoder);

        if (deltaWidth === null) {
          break;
        }

        currentWidth += deltaWidth;
        totalWidth += currentWidth;
        var bitmap;

        if (refinement) {
          var numberOfInstances = decodeInteger(contextCache, 'IAAI', decoder);

          if (numberOfInstances > 1) {
            bitmap = decodeTextRegion(huffman, refinement, currentWidth, currentHeight, 0, numberOfInstances, 1, symbols.concat(newSymbols), symbolCodeLength, 0, 0, 1, 0, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext, 0, huffmanInput);
          } else {
            var symbolId = decodeIAID(contextCache, decoder, symbolCodeLength);
            var rdx = decodeInteger(contextCache, 'IARDX', decoder);
            var rdy = decodeInteger(contextCache, 'IARDY', decoder);
            var symbol = symbolId < symbols.length ? symbols[symbolId] : newSymbols[symbolId - symbols.length];
            bitmap = decodeRefinement(currentWidth, currentHeight, refinementTemplateIndex, symbol, rdx, rdy, false, refinementAt, decodingContext);
          }

          newSymbols.push(bitmap);
        } else if (huffman) {
          symbolWidths.push(currentWidth);
        } else {
          bitmap = decodeBitmap(false, currentWidth, currentHeight, templateIndex, false, null, at, decodingContext);
          newSymbols.push(bitmap);
        }
      }

      if (huffman && !refinement) {
        var bitmapSize = huffmanTables.tableBitmapSize.decode(huffmanInput);
        huffmanInput.byteAlign();
        var collectiveBitmap = void 0;

        if (bitmapSize === 0) {
          collectiveBitmap = readUncompressedBitmap(huffmanInput, totalWidth, currentHeight);
        } else {
          var originalEnd = huffmanInput.end;
          var bitmapEnd = huffmanInput.position + bitmapSize;
          huffmanInput.end = bitmapEnd;
          collectiveBitmap = decodeMMRBitmap(huffmanInput, totalWidth, currentHeight, false);
          huffmanInput.end = originalEnd;
          huffmanInput.position = bitmapEnd;
        }

        var numberOfSymbolsDecoded = symbolWidths.length;

        if (firstSymbol === numberOfSymbolsDecoded - 1) {
          newSymbols.push(collectiveBitmap);
        } else {
          var _i = void 0,
              y = void 0,
              xMin = 0,
              xMax = void 0,
              bitmapWidth = void 0,
              symbolBitmap = void 0;

          for (_i = firstSymbol; _i < numberOfSymbolsDecoded; _i++) {
            bitmapWidth = symbolWidths[_i];
            xMax = xMin + bitmapWidth;
            symbolBitmap = [];

            for (y = 0; y < currentHeight; y++) {
              symbolBitmap.push(collectiveBitmap[y].subarray(xMin, xMax));
            }

            newSymbols.push(symbolBitmap);
            xMin = xMax;
          }
        }
      }
    }

    var exportedSymbols = [];
    var flags = [],
        currentFlag = false;
    var totalSymbolsLength = symbols.length + numberOfNewSymbols;

    while (flags.length < totalSymbolsLength) {
      var runLength = huffman ? tableB1.decode(huffmanInput) : decodeInteger(contextCache, 'IAEX', decoder);

      while (runLength--) {
        flags.push(currentFlag);
      }

      currentFlag = !currentFlag;
    }

    for (var i = 0, ii = symbols.length; i < ii; i++) {
      if (flags[i]) {
        exportedSymbols.push(symbols[i]);
      }
    }

    for (var j = 0; j < numberOfNewSymbols; i++, j++) {
      if (flags[i]) {
        exportedSymbols.push(newSymbols[j]);
      }
    }

    return exportedSymbols;
  }

  function decodeTextRegion(huffman, refinement, width, height, defaultPixelValue, numberOfSymbolInstances, stripSize, inputSymbols, symbolCodeLength, transposed, dsOffset, referenceCorner, combinationOperator, huffmanTables, refinementTemplateIndex, refinementAt, decodingContext, logStripSize, huffmanInput) {
    if (huffman && refinement) {
      throw new Jbig2Error('refinement with Huffman is not supported');
    }

    var bitmap = [];
    var i, row;

    for (i = 0; i < height; i++) {
      row = new Uint8Array(width);

      if (defaultPixelValue) {
        for (var j = 0; j < width; j++) {
          row[j] = defaultPixelValue;
        }
      }

      bitmap.push(row);
    }

    var decoder = decodingContext.decoder;
    var contextCache = decodingContext.contextCache;
    var stripT = huffman ? -huffmanTables.tableDeltaT.decode(huffmanInput) : -decodeInteger(contextCache, 'IADT', decoder);
    var firstS = 0;
    i = 0;

    while (i < numberOfSymbolInstances) {
      var deltaT = huffman ? huffmanTables.tableDeltaT.decode(huffmanInput) : decodeInteger(contextCache, 'IADT', decoder);
      stripT += deltaT;
      var deltaFirstS = huffman ? huffmanTables.tableFirstS.decode(huffmanInput) : decodeInteger(contextCache, 'IAFS', decoder);
      firstS += deltaFirstS;
      var currentS = firstS;

      do {
        var currentT = 0;

        if (stripSize > 1) {
          currentT = huffman ? huffmanInput.readBits(logStripSize) : decodeInteger(contextCache, 'IAIT', decoder);
        }

        var t = stripSize * stripT + currentT;
        var symbolId = huffman ? huffmanTables.symbolIDTable.decode(huffmanInput) : decodeIAID(contextCache, decoder, symbolCodeLength);
        var applyRefinement = refinement && (huffman ? huffmanInput.readBit() : decodeInteger(contextCache, 'IARI', decoder));
        var symbolBitmap = inputSymbols[symbolId];
        var symbolWidth = symbolBitmap[0].length;
        var symbolHeight = symbolBitmap.length;

        if (applyRefinement) {
          var rdw = decodeInteger(contextCache, 'IARDW', decoder);
          var rdh = decodeInteger(contextCache, 'IARDH', decoder);
          var rdx = decodeInteger(contextCache, 'IARDX', decoder);
          var rdy = decodeInteger(contextCache, 'IARDY', decoder);
          symbolWidth += rdw;
          symbolHeight += rdh;
          symbolBitmap = decodeRefinement(symbolWidth, symbolHeight, refinementTemplateIndex, symbolBitmap, (rdw >> 1) + rdx, (rdh >> 1) + rdy, false, refinementAt, decodingContext);
        }

        var offsetT = t - (referenceCorner & 1 ? 0 : symbolHeight - 1);
        var offsetS = currentS - (referenceCorner & 2 ? symbolWidth - 1 : 0);
        var s2, t2, symbolRow;

        if (transposed) {
          for (s2 = 0; s2 < symbolHeight; s2++) {
            row = bitmap[offsetS + s2];

            if (!row) {
              continue;
            }

            symbolRow = symbolBitmap[s2];
            var maxWidth = Math.min(width - offsetT, symbolWidth);

            switch (combinationOperator) {
              case 0:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] |= symbolRow[t2];
                }

                break;

              case 2:
                for (t2 = 0; t2 < maxWidth; t2++) {
                  row[offsetT + t2] ^= symbolRow[t2];
                }

                break;

              default:
                throw new Jbig2Error("operator ".concat(combinationOperator, " is not supported"));
            }
          }

          currentS += symbolHeight - 1;
        } else {
          for (t2 = 0; t2 < symbolHeight; t2++) {
            row = bitmap[offsetT + t2];

            if (!row) {
              continue;
            }

            symbolRow = symbolBitmap[t2];

            switch (combinationOperator) {
              case 0:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] |= symbolRow[s2];
                }

                break;

              case 2:
                for (s2 = 0; s2 < symbolWidth; s2++) {
                  row[offsetS + s2] ^= symbolRow[s2];
                }

                break;

              default:
                throw new Jbig2Error("operator ".concat(combinationOperator, " is not supported"));
            }
          }

          currentS += symbolWidth - 1;
        }

        i++;
        var deltaS = huffman ? huffmanTables.tableDeltaS.decode(huffmanInput) : decodeInteger(contextCache, 'IADS', decoder);

        if (deltaS === null) {
          break;
        }

        currentS += deltaS + dsOffset;
      } while (true);
    }

    return bitmap;
  }

  function decodePatternDictionary(mmr, patternWidth, patternHeight, maxPatternIndex, template, decodingContext) {
    var at = [];

    if (!mmr) {
      at.push({
        x: -patternWidth,
        y: 0
      });

      if (template === 0) {
        at.push({
          x: -3,
          y: -1
        });
        at.push({
          x: 2,
          y: -2
        });
        at.push({
          x: -2,
          y: -2
        });
      }
    }

    var collectiveWidth = (maxPatternIndex + 1) * patternWidth;
    var collectiveBitmap = decodeBitmap(mmr, collectiveWidth, patternHeight, template, false, null, at, decodingContext);
    var patterns = [],
        i = 0,
        patternBitmap,
        xMin,
        xMax,
        y;

    while (i <= maxPatternIndex) {
      patternBitmap = [];
      xMin = patternWidth * i;
      xMax = xMin + patternWidth;

      for (y = 0; y < patternHeight; y++) {
        patternBitmap.push(collectiveBitmap[y].subarray(xMin, xMax));
      }

      patterns.push(patternBitmap);
      i++;
    }

    return patterns;
  }

  function decodeHalftoneRegion(mmr, patterns, template, regionWidth, regionHeight, defaultPixelValue, enableSkip, combinationOperator, gridWidth, gridHeight, gridOffsetX, gridOffsetY, gridVectorX, gridVectorY, decodingContext) {
    var skip = null;

    if (enableSkip) {
      throw new Jbig2Error('skip is not supported');
    }

    if (combinationOperator !== 0) {
      throw new Jbig2Error('operator ' + combinationOperator + ' is not supported in halftone region');
    }

    var regionBitmap = [];
    var i, j, row;

    for (i = 0; i < regionHeight; i++) {
      row = new Uint8Array(regionWidth);

      if (defaultPixelValue) {
        for (j = 0; j < regionWidth; j++) {
          row[j] = defaultPixelValue;
        }
      }

      regionBitmap.push(row);
    }

    var numberOfPatterns = patterns.length;
    var pattern0 = patterns[0];
    var patternWidth = pattern0[0].length,
        patternHeight = pattern0.length;
    var bitsPerValue = (0, _util.log2)(numberOfPatterns);
    var at = [];

    if (!mmr) {
      at.push({
        x: template <= 1 ? 3 : 2,
        y: -1
      });

      if (template === 0) {
        at.push({
          x: -3,
          y: -1
        });
        at.push({
          x: 2,
          y: -2
        });
        at.push({
          x: -2,
          y: -2
        });
      }
    }

    var grayScaleBitPlanes = [],
        mmrInput,
        bitmap;

    if (mmr) {
      mmrInput = new Reader(decodingContext.data, decodingContext.start, decodingContext.end);
    }

    for (i = bitsPerValue - 1; i >= 0; i--) {
      if (mmr) {
        bitmap = decodeMMRBitmap(mmrInput, gridWidth, gridHeight, true);
      } else {
        bitmap = decodeBitmap(false, gridWidth, gridHeight, template, false, skip, at, decodingContext);
      }

      grayScaleBitPlanes[i] = bitmap;
    }

    var mg, ng, bit, patternIndex, patternBitmap, x, y, patternRow, regionRow;

    for (mg = 0; mg < gridHeight; mg++) {
      for (ng = 0; ng < gridWidth; ng++) {
        bit = 0;
        patternIndex = 0;

        for (j = bitsPerValue - 1; j >= 0; j--) {
          bit = grayScaleBitPlanes[j][mg][ng] ^ bit;
          patternIndex |= bit << j;
        }

        patternBitmap = patterns[patternIndex];
        x = gridOffsetX + mg * gridVectorY + ng * gridVectorX >> 8;
        y = gridOffsetY + mg * gridVectorX - ng * gridVectorY >> 8;

        if (x >= 0 && x + patternWidth <= regionWidth && y >= 0 && y + patternHeight <= regionHeight) {
          for (i = 0; i < patternHeight; i++) {
            regionRow = regionBitmap[y + i];
            patternRow = patternBitmap[i];

            for (j = 0; j < patternWidth; j++) {
              regionRow[x + j] |= patternRow[j];
            }
          }
        } else {
          var regionX = void 0,
              regionY = void 0;

          for (i = 0; i < patternHeight; i++) {
            regionY = y + i;

            if (regionY < 0 || regionY >= regionHeight) {
              continue;
            }

            regionRow = regionBitmap[regionY];
            patternRow = patternBitmap[i];

            for (j = 0; j < patternWidth; j++) {
              regionX = x + j;

              if (regionX >= 0 && regionX < regionWidth) {
                regionRow[regionX] |= patternRow[j];
              }
            }
          }
        }
      }
    }

    return regionBitmap;
  }

  function readSegmentHeader(data, start) {
    var segmentHeader = {};
    segmentHeader.number = (0, _util.readUint32)(data, start);
    var flags = data[start + 4];
    var segmentType = flags & 0x3F;

    if (!SegmentTypes[segmentType]) {
      throw new Jbig2Error('invalid segment type: ' + segmentType);
    }

    segmentHeader.type = segmentType;
    segmentHeader.typeName = SegmentTypes[segmentType];
    segmentHeader.deferredNonRetain = !!(flags & 0x80);
    var pageAssociationFieldSize = !!(flags & 0x40);
    var referredFlags = data[start + 5];
    var referredToCount = referredFlags >> 5 & 7;
    var retainBits = [referredFlags & 31];
    var position = start + 6;

    if (referredFlags === 7) {
      referredToCount = (0, _util.readUint32)(data, position - 1) & 0x1FFFFFFF;
      position += 3;
      var bytes = referredToCount + 7 >> 3;
      retainBits[0] = data[position++];

      while (--bytes > 0) {
        retainBits.push(data[position++]);
      }
    } else if (referredFlags === 5 || referredFlags === 6) {
      throw new Jbig2Error('invalid referred-to flags');
    }

    segmentHeader.retainBits = retainBits;
    var referredToSegmentNumberSize = segmentHeader.number <= 256 ? 1 : segmentHeader.number <= 65536 ? 2 : 4;
    var referredTo = [];
    var i, ii;

    for (i = 0; i < referredToCount; i++) {
      var number = referredToSegmentNumberSize === 1 ? data[position] : referredToSegmentNumberSize === 2 ? (0, _util.readUint16)(data, position) : (0, _util.readUint32)(data, position);
      referredTo.push(number);
      position += referredToSegmentNumberSize;
    }

    segmentHeader.referredTo = referredTo;

    if (!pageAssociationFieldSize) {
      segmentHeader.pageAssociation = data[position++];
    } else {
      segmentHeader.pageAssociation = (0, _util.readUint32)(data, position);
      position += 4;
    }

    segmentHeader.length = (0, _util.readUint32)(data, position);
    position += 4;

    if (segmentHeader.length === 0xFFFFFFFF) {
      if (segmentType === 38) {
        var genericRegionInfo = readRegionSegmentInformation(data, position);
        var genericRegionSegmentFlags = data[position + RegionSegmentInformationFieldLength];
        var genericRegionMmr = !!(genericRegionSegmentFlags & 1);
        var searchPatternLength = 6;
        var searchPattern = new Uint8Array(searchPatternLength);

        if (!genericRegionMmr) {
          searchPattern[0] = 0xFF;
          searchPattern[1] = 0xAC;
        }

        searchPattern[2] = genericRegionInfo.height >>> 24 & 0xFF;
        searchPattern[3] = genericRegionInfo.height >> 16 & 0xFF;
        searchPattern[4] = genericRegionInfo.height >> 8 & 0xFF;
        searchPattern[5] = genericRegionInfo.height & 0xFF;

        for (i = position, ii = data.length; i < ii; i++) {
          var j = 0;

          while (j < searchPatternLength && searchPattern[j] === data[i + j]) {
            j++;
          }

          if (j === searchPatternLength) {
            segmentHeader.length = i + searchPatternLength;
            break;
          }
        }

        if (segmentHeader.length === 0xFFFFFFFF) {
          throw new Jbig2Error('segment end was not found');
        }
      } else {
        throw new Jbig2Error('invalid unknown segment length');
      }
    }

    segmentHeader.headerEnd = position;
    return segmentHeader;
  }

  function readSegments(header, data, start, end) {
    var segments = [];
    var position = start;

    while (position < end) {
      var segmentHeader = readSegmentHeader(data, position);
      position = segmentHeader.headerEnd;
      var segment = {
        header: segmentHeader,
        data: data
      };

      if (!header.randomAccess) {
        segment.start = position;
        position += segmentHeader.length;
        segment.end = position;
      }

      segments.push(segment);

      if (segmentHeader.type === 51) {
        break;
      }
    }

    if (header.randomAccess) {
      for (var i = 0, ii = segments.length; i < ii; i++) {
        segments[i].start = position;
        position += segments[i].header.length;
        segments[i].end = position;
      }
    }

    return segments;
  }

  function readRegionSegmentInformation(data, start) {
    return {
      width: (0, _util.readUint32)(data, start),
      height: (0, _util.readUint32)(data, start + 4),
      x: (0, _util.readUint32)(data, start + 8),
      y: (0, _util.readUint32)(data, start + 12),
      combinationOperator: data[start + 16] & 7
    };
  }

  var RegionSegmentInformationFieldLength = 17;

  function processSegment(segment, visitor) {
    var header = segment.header;
    var data = segment.data,
        position = segment.start,
        end = segment.end;
    var args, at, i, atLength;

    switch (header.type) {
      case 0:
        var dictionary = {};
        var dictionaryFlags = (0, _util.readUint16)(data, position);
        dictionary.huffman = !!(dictionaryFlags & 1);
        dictionary.refinement = !!(dictionaryFlags & 2);
        dictionary.huffmanDHSelector = dictionaryFlags >> 2 & 3;
        dictionary.huffmanDWSelector = dictionaryFlags >> 4 & 3;
        dictionary.bitmapSizeSelector = dictionaryFlags >> 6 & 1;
        dictionary.aggregationInstancesSelector = dictionaryFlags >> 7 & 1;
        dictionary.bitmapCodingContextUsed = !!(dictionaryFlags & 256);
        dictionary.bitmapCodingContextRetained = !!(dictionaryFlags & 512);
        dictionary.template = dictionaryFlags >> 10 & 3;
        dictionary.refinementTemplate = dictionaryFlags >> 12 & 1;
        position += 2;

        if (!dictionary.huffman) {
          atLength = dictionary.template === 0 ? 4 : 1;
          at = [];

          for (i = 0; i < atLength; i++) {
            at.push({
              x: (0, _util.readInt8)(data, position),
              y: (0, _util.readInt8)(data, position + 1)
            });
            position += 2;
          }

          dictionary.at = at;
        }

        if (dictionary.refinement && !dictionary.refinementTemplate) {
          at = [];

          for (i = 0; i < 2; i++) {
            at.push({
              x: (0, _util.readInt8)(data, position),
              y: (0, _util.readInt8)(data, position + 1)
            });
            position += 2;
          }

          dictionary.refinementAt = at;
        }

        dictionary.numberOfExportedSymbols = (0, _util.readUint32)(data, position);
        position += 4;
        dictionary.numberOfNewSymbols = (0, _util.readUint32)(data, position);
        position += 4;
        args = [dictionary, header.number, header.referredTo, data, position, end];
        break;

      case 6:
      case 7:
        var textRegion = {};
        textRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var textRegionSegmentFlags = (0, _util.readUint16)(data, position);
        position += 2;
        textRegion.huffman = !!(textRegionSegmentFlags & 1);
        textRegion.refinement = !!(textRegionSegmentFlags & 2);
        textRegion.logStripSize = textRegionSegmentFlags >> 2 & 3;
        textRegion.stripSize = 1 << textRegion.logStripSize;
        textRegion.referenceCorner = textRegionSegmentFlags >> 4 & 3;
        textRegion.transposed = !!(textRegionSegmentFlags & 64);
        textRegion.combinationOperator = textRegionSegmentFlags >> 7 & 3;
        textRegion.defaultPixelValue = textRegionSegmentFlags >> 9 & 1;
        textRegion.dsOffset = textRegionSegmentFlags << 17 >> 27;
        textRegion.refinementTemplate = textRegionSegmentFlags >> 15 & 1;

        if (textRegion.huffman) {
          var textRegionHuffmanFlags = (0, _util.readUint16)(data, position);
          position += 2;
          textRegion.huffmanFS = textRegionHuffmanFlags & 3;
          textRegion.huffmanDS = textRegionHuffmanFlags >> 2 & 3;
          textRegion.huffmanDT = textRegionHuffmanFlags >> 4 & 3;
          textRegion.huffmanRefinementDW = textRegionHuffmanFlags >> 6 & 3;
          textRegion.huffmanRefinementDH = textRegionHuffmanFlags >> 8 & 3;
          textRegion.huffmanRefinementDX = textRegionHuffmanFlags >> 10 & 3;
          textRegion.huffmanRefinementDY = textRegionHuffmanFlags >> 12 & 3;
          textRegion.huffmanRefinementSizeSelector = !!(textRegionHuffmanFlags & 0x4000);
        }

        if (textRegion.refinement && !textRegion.refinementTemplate) {
          at = [];

          for (i = 0; i < 2; i++) {
            at.push({
              x: (0, _util.readInt8)(data, position),
              y: (0, _util.readInt8)(data, position + 1)
            });
            position += 2;
          }

          textRegion.refinementAt = at;
        }

        textRegion.numberOfSymbolInstances = (0, _util.readUint32)(data, position);
        position += 4;
        args = [textRegion, header.referredTo, data, position, end];
        break;

      case 16:
        var patternDictionary = {};
        var patternDictionaryFlags = data[position++];
        patternDictionary.mmr = !!(patternDictionaryFlags & 1);
        patternDictionary.template = patternDictionaryFlags >> 1 & 3;
        patternDictionary.patternWidth = data[position++];
        patternDictionary.patternHeight = data[position++];
        patternDictionary.maxPatternIndex = (0, _util.readUint32)(data, position);
        position += 4;
        args = [patternDictionary, header.number, data, position, end];
        break;

      case 22:
      case 23:
        var halftoneRegion = {};
        halftoneRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var halftoneRegionFlags = data[position++];
        halftoneRegion.mmr = !!(halftoneRegionFlags & 1);
        halftoneRegion.template = halftoneRegionFlags >> 1 & 3;
        halftoneRegion.enableSkip = !!(halftoneRegionFlags & 8);
        halftoneRegion.combinationOperator = halftoneRegionFlags >> 4 & 7;
        halftoneRegion.defaultPixelValue = halftoneRegionFlags >> 7 & 1;
        halftoneRegion.gridWidth = (0, _util.readUint32)(data, position);
        position += 4;
        halftoneRegion.gridHeight = (0, _util.readUint32)(data, position);
        position += 4;
        halftoneRegion.gridOffsetX = (0, _util.readUint32)(data, position) & 0xFFFFFFFF;
        position += 4;
        halftoneRegion.gridOffsetY = (0, _util.readUint32)(data, position) & 0xFFFFFFFF;
        position += 4;
        halftoneRegion.gridVectorX = (0, _util.readUint16)(data, position);
        position += 2;
        halftoneRegion.gridVectorY = (0, _util.readUint16)(data, position);
        position += 2;
        args = [halftoneRegion, header.referredTo, data, position, end];
        break;

      case 38:
      case 39:
        var genericRegion = {};
        genericRegion.info = readRegionSegmentInformation(data, position);
        position += RegionSegmentInformationFieldLength;
        var genericRegionSegmentFlags = data[position++];
        genericRegion.mmr = !!(genericRegionSegmentFlags & 1);
        genericRegion.template = genericRegionSegmentFlags >> 1 & 3;
        genericRegion.prediction = !!(genericRegionSegmentFlags & 8);

        if (!genericRegion.mmr) {
          atLength = genericRegion.template === 0 ? 4 : 1;
          at = [];

          for (i = 0; i < atLength; i++) {
            at.push({
              x: (0, _util.readInt8)(data, position),
              y: (0, _util.readInt8)(data, position + 1)
            });
            position += 2;
          }

          genericRegion.at = at;
        }

        args = [genericRegion, data, position, end];
        break;

      case 48:
        var pageInfo = {
          width: (0, _util.readUint32)(data, position),
          height: (0, _util.readUint32)(data, position + 4),
          resolutionX: (0, _util.readUint32)(data, position + 8),
          resolutionY: (0, _util.readUint32)(data, position + 12)
        };

        if (pageInfo.height === 0xFFFFFFFF) {
          delete pageInfo.height;
        }

        var pageSegmentFlags = data[position + 16];
        (0, _util.readUint16)(data, position + 17);
        pageInfo.lossless = !!(pageSegmentFlags & 1);
        pageInfo.refinement = !!(pageSegmentFlags & 2);
        pageInfo.defaultPixelValue = pageSegmentFlags >> 2 & 1;
        pageInfo.combinationOperator = pageSegmentFlags >> 3 & 3;
        pageInfo.requiresBuffer = !!(pageSegmentFlags & 32);
        pageInfo.combinationOperatorOverride = !!(pageSegmentFlags & 64);
        args = [pageInfo];
        break;

      case 49:
        break;

      case 50:
        break;

      case 51:
        break;

      case 53:
        args = [header.number, data, position, end];
        break;

      case 62:
        break;

      default:
        throw new Jbig2Error("segment type ".concat(header.typeName, "(").concat(header.type, ")") + ' is not implemented');
    }

    var callbackName = 'on' + header.typeName;

    if (callbackName in visitor) {
      visitor[callbackName].apply(visitor, args);
    }
  }

  function processSegments(segments, visitor) {
    for (var i = 0, ii = segments.length; i < ii; i++) {
      processSegment(segments[i], visitor);
    }
  }

  function parseJbig2Chunks(chunks) {
    var visitor = new SimpleSegmentVisitor();

    for (var i = 0, ii = chunks.length; i < ii; i++) {
      var chunk = chunks[i];
      var segments = readSegments({}, chunk.data, chunk.start, chunk.end);
      processSegments(segments, visitor);
    }

    return visitor.buffer;
  }

  function parseJbig2(data) {
    var position = 0,
        end = data.length;

    if (data[position] !== 0x97 || data[position + 1] !== 0x4A || data[position + 2] !== 0x42 || data[position + 3] !== 0x32 || data[position + 4] !== 0x0D || data[position + 5] !== 0x0A || data[position + 6] !== 0x1A || data[position + 7] !== 0x0A) {
      throw new Jbig2Error('parseJbig2 - invalid header.');
    }

    var header = Object.create(null);
    position += 8;
    var flags = data[position++];
    header.randomAccess = !(flags & 1);

    if (!(flags & 2)) {
      header.numberOfPages = (0, _util.readUint32)(data, position);
      position += 4;
    }

    var segments = readSegments(header, data, position, end);
    var visitor = new SimpleSegmentVisitor();
    processSegments(segments, visitor);
    var _visitor$currentPageI = visitor.currentPageInfo,
        width = _visitor$currentPageI.width,
        height = _visitor$currentPageI.height;
    var bitPacked = visitor.buffer;
    var imgData = new Uint8ClampedArray(width * height);
    var q = 0,
        k = 0;

    for (var i = 0; i < height; i++) {
      var mask = 0,
          buffer = void 0;

      for (var j = 0; j < width; j++) {
        if (!mask) {
          mask = 128;
          buffer = bitPacked[k++];
        }

        imgData[q++] = buffer & mask ? 0 : 255;
        mask >>= 1;
      }
    }

    return {
      imgData: imgData,
      width: width,
      height: height
    };
  }

  function SimpleSegmentVisitor() {}

  SimpleSegmentVisitor.prototype = {
    onPageInformation: function SimpleSegmentVisitor_onPageInformation(info) {
      this.currentPageInfo = info;
      var rowSize = info.width + 7 >> 3;
      var buffer = new Uint8ClampedArray(rowSize * info.height);

      if (info.defaultPixelValue) {
        for (var i = 0, ii = buffer.length; i < ii; i++) {
          buffer[i] = 0xFF;
        }
      }

      this.buffer = buffer;
    },
    drawBitmap: function SimpleSegmentVisitor_drawBitmap(regionInfo, bitmap) {
      var pageInfo = this.currentPageInfo;
      var width = regionInfo.width,
          height = regionInfo.height;
      var rowSize = pageInfo.width + 7 >> 3;
      var combinationOperator = pageInfo.combinationOperatorOverride ? regionInfo.combinationOperator : pageInfo.combinationOperator;
      var buffer = this.buffer;
      var mask0 = 128 >> (regionInfo.x & 7);
      var offset0 = regionInfo.y * rowSize + (regionInfo.x >> 3);
      var i, j, mask, offset;

      switch (combinationOperator) {
        case 0:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;

            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] |= mask;
              }

              mask >>= 1;

              if (!mask) {
                mask = 128;
                offset++;
              }
            }

            offset0 += rowSize;
          }

          break;

        case 2:
          for (i = 0; i < height; i++) {
            mask = mask0;
            offset = offset0;

            for (j = 0; j < width; j++) {
              if (bitmap[i][j]) {
                buffer[offset] ^= mask;
              }

              mask >>= 1;

              if (!mask) {
                mask = 128;
                offset++;
              }
            }

            offset0 += rowSize;
          }

          break;

        default:
          throw new Jbig2Error("operator ".concat(combinationOperator, " is not supported"));
      }
    },
    onImmediateGenericRegion: function SimpleSegmentVisitor_onImmediateGenericRegion(region, data, start, end) {
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeBitmap(region.mmr, regionInfo.width, regionInfo.height, region.template, region.prediction, null, region.at, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessGenericRegion: function SimpleSegmentVisitor_onImmediateLosslessGenericRegion() {
      this.onImmediateGenericRegion.apply(this, arguments);
    },
    onSymbolDictionary: function SimpleSegmentVisitor_onSymbolDictionary(dictionary, currentSegment, referredSegments, data, start, end) {
      var huffmanTables, huffmanInput;

      if (dictionary.huffman) {
        huffmanTables = getSymbolDictionaryHuffmanTables(dictionary, referredSegments, this.customTables);
        huffmanInput = new Reader(data, start, end);
      }

      var symbols = this.symbols;

      if (!symbols) {
        this.symbols = symbols = {};
      }

      var inputSymbols = [];

      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        var referredSymbols = symbols[referredSegments[i]];

        if (referredSymbols) {
          inputSymbols = inputSymbols.concat(referredSymbols);
        }
      }

      var decodingContext = new DecodingContext(data, start, end);
      symbols[currentSegment] = decodeSymbolDictionary(dictionary.huffman, dictionary.refinement, inputSymbols, dictionary.numberOfNewSymbols, dictionary.numberOfExportedSymbols, huffmanTables, dictionary.template, dictionary.at, dictionary.refinementTemplate, dictionary.refinementAt, decodingContext, huffmanInput);
    },
    onImmediateTextRegion: function SimpleSegmentVisitor_onImmediateTextRegion(region, referredSegments, data, start, end) {
      var regionInfo = region.info;
      var huffmanTables, huffmanInput;
      var symbols = this.symbols;
      var inputSymbols = [];

      for (var i = 0, ii = referredSegments.length; i < ii; i++) {
        var referredSymbols = symbols[referredSegments[i]];

        if (referredSymbols) {
          inputSymbols = inputSymbols.concat(referredSymbols);
        }
      }

      var symbolCodeLength = (0, _util.log2)(inputSymbols.length);

      if (region.huffman) {
        huffmanInput = new Reader(data, start, end);
        huffmanTables = getTextRegionHuffmanTables(region, referredSegments, this.customTables, inputSymbols.length, huffmanInput);
      }

      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeTextRegion(region.huffman, region.refinement, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.numberOfSymbolInstances, region.stripSize, inputSymbols, symbolCodeLength, region.transposed, region.dsOffset, region.referenceCorner, region.combinationOperator, huffmanTables, region.refinementTemplate, region.refinementAt, decodingContext, region.logStripSize, huffmanInput);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessTextRegion: function SimpleSegmentVisitor_onImmediateLosslessTextRegion() {
      this.onImmediateTextRegion.apply(this, arguments);
    },
    onPatternDictionary: function onPatternDictionary(dictionary, currentSegment, data, start, end) {
      var patterns = this.patterns;

      if (!patterns) {
        this.patterns = patterns = {};
      }

      var decodingContext = new DecodingContext(data, start, end);
      patterns[currentSegment] = decodePatternDictionary(dictionary.mmr, dictionary.patternWidth, dictionary.patternHeight, dictionary.maxPatternIndex, dictionary.template, decodingContext);
    },
    onImmediateHalftoneRegion: function onImmediateHalftoneRegion(region, referredSegments, data, start, end) {
      var patterns = this.patterns[referredSegments[0]];
      var regionInfo = region.info;
      var decodingContext = new DecodingContext(data, start, end);
      var bitmap = decodeHalftoneRegion(region.mmr, patterns, region.template, regionInfo.width, regionInfo.height, region.defaultPixelValue, region.enableSkip, region.combinationOperator, region.gridWidth, region.gridHeight, region.gridOffsetX, region.gridOffsetY, region.gridVectorX, region.gridVectorY, decodingContext);
      this.drawBitmap(regionInfo, bitmap);
    },
    onImmediateLosslessHalftoneRegion: function onImmediateLosslessHalftoneRegion() {
      this.onImmediateHalftoneRegion.apply(this, arguments);
    },
    onTables: function onTables(currentSegment, data, start, end) {
      var customTables = this.customTables;

      if (!customTables) {
        this.customTables = customTables = {};
      }

      customTables[currentSegment] = decodeTablesSegment(data, start, end);
    }
  };

  function HuffmanLine(lineData) {
    if (lineData.length === 2) {
      this.isOOB = true;
      this.rangeLow = 0;
      this.prefixLength = lineData[0];
      this.rangeLength = 0;
      this.prefixCode = lineData[1];
      this.isLowerRange = false;
    } else {
      this.isOOB = false;
      this.rangeLow = lineData[0];
      this.prefixLength = lineData[1];
      this.rangeLength = lineData[2];
      this.prefixCode = lineData[3];
      this.isLowerRange = lineData[4] === 'lower';
    }
  }

  function HuffmanTreeNode(line) {
    this.children = [];

    if (line) {
      this.isLeaf = true;
      this.rangeLength = line.rangeLength;
      this.rangeLow = line.rangeLow;
      this.isLowerRange = line.isLowerRange;
      this.isOOB = line.isOOB;
    } else {
      this.isLeaf = false;
    }
  }

  HuffmanTreeNode.prototype = {
    buildTree: function buildTree(line, shift) {
      var bit = line.prefixCode >> shift & 1;

      if (shift <= 0) {
        this.children[bit] = new HuffmanTreeNode(line);
      } else {
        var node = this.children[bit];

        if (!node) {
          this.children[bit] = node = new HuffmanTreeNode(null);
        }

        node.buildTree(line, shift - 1);
      }
    },
    decodeNode: function decodeNode(reader) {
      if (this.isLeaf) {
        if (this.isOOB) {
          return null;
        }

        var htOffset = reader.readBits(this.rangeLength);
        return this.rangeLow + (this.isLowerRange ? -htOffset : htOffset);
      }

      var node = this.children[reader.readBit()];

      if (!node) {
        throw new Jbig2Error('invalid Huffman data');
      }

      return node.decodeNode(reader);
    }
  };

  function HuffmanTable(lines, prefixCodesDone) {
    if (!prefixCodesDone) {
      this.assignPrefixCodes(lines);
    }

    this.rootNode = new HuffmanTreeNode(null);
    var i,
        ii = lines.length,
        line;

    for (i = 0; i < ii; i++) {
      line = lines[i];

      if (line.prefixLength > 0) {
        this.rootNode.buildTree(line, line.prefixLength - 1);
      }
    }
  }

  HuffmanTable.prototype = {
    decode: function decode(reader) {
      return this.rootNode.decodeNode(reader);
    },
    assignPrefixCodes: function assignPrefixCodes(lines) {
      var linesLength = lines.length,
          prefixLengthMax = 0,
          i;

      for (i = 0; i < linesLength; i++) {
        prefixLengthMax = Math.max(prefixLengthMax, lines[i].prefixLength);
      }

      var histogram = new Uint32Array(prefixLengthMax + 1);

      for (i = 0; i < linesLength; i++) {
        histogram[lines[i].prefixLength]++;
      }

      var currentLength = 1,
          firstCode = 0,
          currentCode,
          currentTemp,
          line;
      histogram[0] = 0;

      while (currentLength <= prefixLengthMax) {
        firstCode = firstCode + histogram[currentLength - 1] << 1;
        currentCode = firstCode;
        currentTemp = 0;

        while (currentTemp < linesLength) {
          line = lines[currentTemp];

          if (line.prefixLength === currentLength) {
            line.prefixCode = currentCode;
            currentCode++;
          }

          currentTemp++;
        }

        currentLength++;
      }
    }
  };

  function decodeTablesSegment(data, start, end) {
    var flags = data[start];
    var lowestValue = (0, _util.readUint32)(data, start + 1) & 0xFFFFFFFF;
    var highestValue = (0, _util.readUint32)(data, start + 5) & 0xFFFFFFFF;
    var reader = new Reader(data, start + 9, end);
    var prefixSizeBits = (flags >> 1 & 7) + 1;
    var rangeSizeBits = (flags >> 4 & 7) + 1;
    var lines = [];
    var prefixLength,
        rangeLength,
        currentRangeLow = lowestValue;

    do {
      prefixLength = reader.readBits(prefixSizeBits);
      rangeLength = reader.readBits(rangeSizeBits);
      lines.push(new HuffmanLine([currentRangeLow, prefixLength, rangeLength, 0]));
      currentRangeLow += 1 << rangeLength;
    } while (currentRangeLow < highestValue);

    prefixLength = reader.readBits(prefixSizeBits);
    lines.push(new HuffmanLine([lowestValue - 1, prefixLength, 32, 0, 'lower']));
    prefixLength = reader.readBits(prefixSizeBits);
    lines.push(new HuffmanLine([highestValue, prefixLength, 32, 0]));

    if (flags & 1) {
      prefixLength = reader.readBits(prefixSizeBits);
      lines.push(new HuffmanLine([prefixLength, 0]));
    }

    return new HuffmanTable(lines, false);
  }

  var standardTablesCache = {};

  function getStandardTable(number) {
    var table = standardTablesCache[number];

    if (table) {
      return table;
    }

    var lines;

    switch (number) {
      case 1:
        lines = [[0, 1, 4, 0x0], [16, 2, 8, 0x2], [272, 3, 16, 0x6], [65808, 3, 32, 0x7]];
        break;

      case 2:
        lines = [[0, 1, 0, 0x0], [1, 2, 0, 0x2], [2, 3, 0, 0x6], [3, 4, 3, 0xE], [11, 5, 6, 0x1E], [75, 6, 32, 0x3E], [6, 0x3F]];
        break;

      case 3:
        lines = [[-256, 8, 8, 0xFE], [0, 1, 0, 0x0], [1, 2, 0, 0x2], [2, 3, 0, 0x6], [3, 4, 3, 0xE], [11, 5, 6, 0x1E], [-257, 8, 32, 0xFF, 'lower'], [75, 7, 32, 0x7E], [6, 0x3E]];
        break;

      case 4:
        lines = [[1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 0, 0x6], [4, 4, 3, 0xE], [12, 5, 6, 0x1E], [76, 5, 32, 0x1F]];
        break;

      case 5:
        lines = [[-255, 7, 8, 0x7E], [1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 0, 0x6], [4, 4, 3, 0xE], [12, 5, 6, 0x1E], [-256, 7, 32, 0x7F, 'lower'], [76, 6, 32, 0x3E]];
        break;

      case 6:
        lines = [[-2048, 5, 10, 0x1C], [-1024, 4, 9, 0x8], [-512, 4, 8, 0x9], [-256, 4, 7, 0xA], [-128, 5, 6, 0x1D], [-64, 5, 5, 0x1E], [-32, 4, 5, 0xB], [0, 2, 7, 0x0], [128, 3, 7, 0x2], [256, 3, 8, 0x3], [512, 4, 9, 0xC], [1024, 4, 10, 0xD], [-2049, 6, 32, 0x3E, 'lower'], [2048, 6, 32, 0x3F]];
        break;

      case 7:
        lines = [[-1024, 4, 9, 0x8], [-512, 3, 8, 0x0], [-256, 4, 7, 0x9], [-128, 5, 6, 0x1A], [-64, 5, 5, 0x1B], [-32, 4, 5, 0xA], [0, 4, 5, 0xB], [32, 5, 5, 0x1C], [64, 5, 6, 0x1D], [128, 4, 7, 0xC], [256, 3, 8, 0x1], [512, 3, 9, 0x2], [1024, 3, 10, 0x3], [-1025, 5, 32, 0x1E, 'lower'], [2048, 5, 32, 0x1F]];
        break;

      case 8:
        lines = [[-15, 8, 3, 0xFC], [-7, 9, 1, 0x1FC], [-5, 8, 1, 0xFD], [-3, 9, 0, 0x1FD], [-2, 7, 0, 0x7C], [-1, 4, 0, 0xA], [0, 2, 1, 0x0], [2, 5, 0, 0x1A], [3, 6, 0, 0x3A], [4, 3, 4, 0x4], [20, 6, 1, 0x3B], [22, 4, 4, 0xB], [38, 4, 5, 0xC], [70, 5, 6, 0x1B], [134, 5, 7, 0x1C], [262, 6, 7, 0x3C], [390, 7, 8, 0x7D], [646, 6, 10, 0x3D], [-16, 9, 32, 0x1FE, 'lower'], [1670, 9, 32, 0x1FF], [2, 0x1]];
        break;

      case 9:
        lines = [[-31, 8, 4, 0xFC], [-15, 9, 2, 0x1FC], [-11, 8, 2, 0xFD], [-7, 9, 1, 0x1FD], [-5, 7, 1, 0x7C], [-3, 4, 1, 0xA], [-1, 3, 1, 0x2], [1, 3, 1, 0x3], [3, 5, 1, 0x1A], [5, 6, 1, 0x3A], [7, 3, 5, 0x4], [39, 6, 2, 0x3B], [43, 4, 5, 0xB], [75, 4, 6, 0xC], [139, 5, 7, 0x1B], [267, 5, 8, 0x1C], [523, 6, 8, 0x3C], [779, 7, 9, 0x7D], [1291, 6, 11, 0x3D], [-32, 9, 32, 0x1FE, 'lower'], [3339, 9, 32, 0x1FF], [2, 0x0]];
        break;

      case 10:
        lines = [[-21, 7, 4, 0x7A], [-5, 8, 0, 0xFC], [-4, 7, 0, 0x7B], [-3, 5, 0, 0x18], [-2, 2, 2, 0x0], [2, 5, 0, 0x19], [3, 6, 0, 0x36], [4, 7, 0, 0x7C], [5, 8, 0, 0xFD], [6, 2, 6, 0x1], [70, 5, 5, 0x1A], [102, 6, 5, 0x37], [134, 6, 6, 0x38], [198, 6, 7, 0x39], [326, 6, 8, 0x3A], [582, 6, 9, 0x3B], [1094, 6, 10, 0x3C], [2118, 7, 11, 0x7D], [-22, 8, 32, 0xFE, 'lower'], [4166, 8, 32, 0xFF], [2, 0x2]];
        break;

      case 11:
        lines = [[1, 1, 0, 0x0], [2, 2, 1, 0x2], [4, 4, 0, 0xC], [5, 4, 1, 0xD], [7, 5, 1, 0x1C], [9, 5, 2, 0x1D], [13, 6, 2, 0x3C], [17, 7, 2, 0x7A], [21, 7, 3, 0x7B], [29, 7, 4, 0x7C], [45, 7, 5, 0x7D], [77, 7, 6, 0x7E], [141, 7, 32, 0x7F]];
        break;

      case 12:
        lines = [[1, 1, 0, 0x0], [2, 2, 0, 0x2], [3, 3, 1, 0x6], [5, 5, 0, 0x1C], [6, 5, 1, 0x1D], [8, 6, 1, 0x3C], [10, 7, 0, 0x7A], [11, 7, 1, 0x7B], [13, 7, 2, 0x7C], [17, 7, 3, 0x7D], [25, 7, 4, 0x7E], [41, 8, 5, 0xFE], [73, 8, 32, 0xFF]];
        break;

      case 13:
        lines = [[1, 1, 0, 0x0], [2, 3, 0, 0x4], [3, 4, 0, 0xC], [4, 5, 0, 0x1C], [5, 4, 1, 0xD], [7, 3, 3, 0x5], [15, 6, 1, 0x3A], [17, 6, 2, 0x3B], [21, 6, 3, 0x3C], [29, 6, 4, 0x3D], [45, 6, 5, 0x3E], [77, 7, 6, 0x7E], [141, 7, 32, 0x7F]];
        break;

      case 14:
        lines = [[-2, 3, 0, 0x4], [-1, 3, 0, 0x5], [0, 1, 0, 0x0], [1, 3, 0, 0x6], [2, 3, 0, 0x7]];
        break;

      case 15:
        lines = [[-24, 7, 4, 0x7C], [-8, 6, 2, 0x3C], [-4, 5, 1, 0x1C], [-2, 4, 0, 0xC], [-1, 3, 0, 0x4], [0, 1, 0, 0x0], [1, 3, 0, 0x5], [2, 4, 0, 0xD], [3, 5, 1, 0x1D], [5, 6, 2, 0x3D], [9, 7, 4, 0x7D], [-25, 7, 32, 0x7E, 'lower'], [25, 7, 32, 0x7F]];
        break;

      default:
        throw new Jbig2Error("standard table B.".concat(number, " does not exist"));
    }

    var length = lines.length,
        i;

    for (i = 0; i < length; i++) {
      lines[i] = new HuffmanLine(lines[i]);
    }

    table = new HuffmanTable(lines, true);
    standardTablesCache[number] = table;
    return table;
  }

  function Reader(data, start, end) {
    this.data = data;
    this.start = start;
    this.end = end;
    this.position = start;
    this.shift = -1;
    this.currentByte = 0;
  }

  Reader.prototype = {
    readBit: function readBit() {
      if (this.shift < 0) {
        if (this.position >= this.end) {
          throw new Jbig2Error('end of data while reading bit');
        }

        this.currentByte = this.data[this.position++];
        this.shift = 7;
      }

      var bit = this.currentByte >> this.shift & 1;
      this.shift--;
      return bit;
    },
    readBits: function readBits(numBits) {
      var result = 0,
          i;

      for (i = numBits - 1; i >= 0; i--) {
        result |= this.readBit() << i;
      }

      return result;
    },
    byteAlign: function byteAlign() {
      this.shift = -1;
    },
    next: function next() {
      if (this.position >= this.end) {
        return -1;
      }

      return this.data[this.position++];
    }
  };

  function getCustomHuffmanTable(index, referredTo, customTables) {
    var currentIndex = 0,
        i,
        ii = referredTo.length,
        table;

    for (i = 0; i < ii; i++) {
      table = customTables[referredTo[i]];

      if (table) {
        if (index === currentIndex) {
          return table;
        }

        currentIndex++;
      }
    }

    throw new Jbig2Error('can\'t find custom Huffman table');
  }

  function getTextRegionHuffmanTables(textRegion, referredTo, customTables, numberOfSymbols, reader) {
    var codes = [],
        i,
        codeLength;

    for (i = 0; i <= 34; i++) {
      codeLength = reader.readBits(4);
      codes.push(new HuffmanLine([i, codeLength, 0, 0]));
    }

    var runCodesTable = new HuffmanTable(codes, false);
    codes.length = 0;

    for (i = 0; i < numberOfSymbols;) {
      codeLength = runCodesTable.decode(reader);

      if (codeLength >= 32) {
        var repeatedLength = void 0,
            numberOfRepeats = void 0,
            j = void 0;

        switch (codeLength) {
          case 32:
            if (i === 0) {
              throw new Jbig2Error('no previous value in symbol ID table');
            }

            numberOfRepeats = reader.readBits(2) + 3;
            repeatedLength = codes[i - 1].prefixLength;
            break;

          case 33:
            numberOfRepeats = reader.readBits(3) + 3;
            repeatedLength = 0;
            break;

          case 34:
            numberOfRepeats = reader.readBits(7) + 11;
            repeatedLength = 0;
            break;

          default:
            throw new Jbig2Error('invalid code length in symbol ID table');
        }

        for (j = 0; j < numberOfRepeats; j++) {
          codes.push(new HuffmanLine([i, repeatedLength, 0, 0]));
          i++;
        }
      } else {
        codes.push(new HuffmanLine([i, codeLength, 0, 0]));
        i++;
      }
    }

    reader.byteAlign();
    var symbolIDTable = new HuffmanTable(codes, false);
    var customIndex = 0,
        tableFirstS,
        tableDeltaS,
        tableDeltaT;

    switch (textRegion.huffmanFS) {
      case 0:
      case 1:
        tableFirstS = getStandardTable(textRegion.huffmanFS + 6);
        break;

      case 3:
        tableFirstS = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error('invalid Huffman FS selector');
    }

    switch (textRegion.huffmanDS) {
      case 0:
      case 1:
      case 2:
        tableDeltaS = getStandardTable(textRegion.huffmanDS + 8);
        break;

      case 3:
        tableDeltaS = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error('invalid Huffman DS selector');
    }

    switch (textRegion.huffmanDT) {
      case 0:
      case 1:
      case 2:
        tableDeltaT = getStandardTable(textRegion.huffmanDT + 11);
        break;

      case 3:
        tableDeltaT = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error('invalid Huffman DT selector');
    }

    if (textRegion.refinement) {
      throw new Jbig2Error('refinement with Huffman is not supported');
    }

    return {
      symbolIDTable: symbolIDTable,
      tableFirstS: tableFirstS,
      tableDeltaS: tableDeltaS,
      tableDeltaT: tableDeltaT
    };
  }

  function getSymbolDictionaryHuffmanTables(dictionary, referredTo, customTables) {
    var customIndex = 0,
        tableDeltaHeight,
        tableDeltaWidth;

    switch (dictionary.huffmanDHSelector) {
      case 0:
      case 1:
        tableDeltaHeight = getStandardTable(dictionary.huffmanDHSelector + 4);
        break;

      case 3:
        tableDeltaHeight = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error('invalid Huffman DH selector');
    }

    switch (dictionary.huffmanDWSelector) {
      case 0:
      case 1:
        tableDeltaWidth = getStandardTable(dictionary.huffmanDWSelector + 2);
        break;

      case 3:
        tableDeltaWidth = getCustomHuffmanTable(customIndex, referredTo, customTables);
        customIndex++;
        break;

      default:
        throw new Jbig2Error('invalid Huffman DW selector');
    }

    var tableBitmapSize, tableAggregateInstances;

    if (dictionary.bitmapSizeSelector) {
      tableBitmapSize = getCustomHuffmanTable(customIndex, referredTo, customTables);
      customIndex++;
    } else {
      tableBitmapSize = getStandardTable(1);
    }

    if (dictionary.aggregationInstancesSelector) {
      tableAggregateInstances = getCustomHuffmanTable(customIndex, referredTo, customTables);
    } else {
      tableAggregateInstances = getStandardTable(1);
    }

    return {
      tableDeltaHeight: tableDeltaHeight,
      tableDeltaWidth: tableDeltaWidth,
      tableBitmapSize: tableBitmapSize,
      tableAggregateInstances: tableAggregateInstances
    };
  }

  function readUncompressedBitmap(reader, width, height) {
    var bitmap = [],
        x,
        y,
        row;

    for (y = 0; y < height; y++) {
      row = new Uint8Array(width);
      bitmap.push(row);

      for (x = 0; x < width; x++) {
        row[x] = reader.readBit();
      }

      reader.byteAlign();
    }

    return bitmap;
  }

  function decodeMMRBitmap(input, width, height, endOfBlock) {
    var params = {
      K: -1,
      Columns: width,
      Rows: height,
      BlackIs1: true,
      EndOfBlock: endOfBlock
    };
    var decoder = new _ccitt.CCITTFaxDecoder(input, params);
    var bitmap = [],
        x,
        y,
        row,
        currentByte,
        shift,
        eof = false;

    for (y = 0; y < height; y++) {
      row = new Uint8Array(width);
      bitmap.push(row);
      shift = -1;

      for (x = 0; x < width; x++) {
        if (shift < 0) {
          currentByte = decoder.readNextChar();

          if (currentByte === -1) {
            currentByte = 0;
            eof = true;
          }

          shift = 7;
        }

        row[x] = currentByte >> shift & 1;
        shift--;
      }
    }

    if (endOfBlock && !eof) {
      var lookForEOFLimit = 5;

      for (var i = 0; i < lookForEOFLimit; i++) {
        if (decoder.readNextChar() === -1) {
          break;
        }
      }
    }

    return bitmap;
  }

  function Jbig2Image() {}

  Jbig2Image.prototype = {
    parseChunks: function parseChunks(chunks) {
      return parseJbig2Chunks(chunks);
    },
    parse: function parse(data) {
      var _parseJbig = parseJbig2(data),
          imgData = _parseJbig.imgData,
          width = _parseJbig.width,
          height = _parseJbig.height;

      this.width = width;
      this.height = height;
      return imgData;
    }
  };
  return Jbig2Image;
}();

exports.Jbig2Image = Jbig2Image;

/***/ }),
/* 159 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArithmeticDecoder = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var QeTable = [{
  qe: 0x5601,
  nmps: 1,
  nlps: 1,
  switchFlag: 1
}, {
  qe: 0x3401,
  nmps: 2,
  nlps: 6,
  switchFlag: 0
}, {
  qe: 0x1801,
  nmps: 3,
  nlps: 9,
  switchFlag: 0
}, {
  qe: 0x0AC1,
  nmps: 4,
  nlps: 12,
  switchFlag: 0
}, {
  qe: 0x0521,
  nmps: 5,
  nlps: 29,
  switchFlag: 0
}, {
  qe: 0x0221,
  nmps: 38,
  nlps: 33,
  switchFlag: 0
}, {
  qe: 0x5601,
  nmps: 7,
  nlps: 6,
  switchFlag: 1
}, {
  qe: 0x5401,
  nmps: 8,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x4801,
  nmps: 9,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x3801,
  nmps: 10,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x3001,
  nmps: 11,
  nlps: 17,
  switchFlag: 0
}, {
  qe: 0x2401,
  nmps: 12,
  nlps: 18,
  switchFlag: 0
}, {
  qe: 0x1C01,
  nmps: 13,
  nlps: 20,
  switchFlag: 0
}, {
  qe: 0x1601,
  nmps: 29,
  nlps: 21,
  switchFlag: 0
}, {
  qe: 0x5601,
  nmps: 15,
  nlps: 14,
  switchFlag: 1
}, {
  qe: 0x5401,
  nmps: 16,
  nlps: 14,
  switchFlag: 0
}, {
  qe: 0x5101,
  nmps: 17,
  nlps: 15,
  switchFlag: 0
}, {
  qe: 0x4801,
  nmps: 18,
  nlps: 16,
  switchFlag: 0
}, {
  qe: 0x3801,
  nmps: 19,
  nlps: 17,
  switchFlag: 0
}, {
  qe: 0x3401,
  nmps: 20,
  nlps: 18,
  switchFlag: 0
}, {
  qe: 0x3001,
  nmps: 21,
  nlps: 19,
  switchFlag: 0
}, {
  qe: 0x2801,
  nmps: 22,
  nlps: 19,
  switchFlag: 0
}, {
  qe: 0x2401,
  nmps: 23,
  nlps: 20,
  switchFlag: 0
}, {
  qe: 0x2201,
  nmps: 24,
  nlps: 21,
  switchFlag: 0
}, {
  qe: 0x1C01,
  nmps: 25,
  nlps: 22,
  switchFlag: 0
}, {
  qe: 0x1801,
  nmps: 26,
  nlps: 23,
  switchFlag: 0
}, {
  qe: 0x1601,
  nmps: 27,
  nlps: 24,
  switchFlag: 0
}, {
  qe: 0x1401,
  nmps: 28,
  nlps: 25,
  switchFlag: 0
}, {
  qe: 0x1201,
  nmps: 29,
  nlps: 26,
  switchFlag: 0
}, {
  qe: 0x1101,
  nmps: 30,
  nlps: 27,
  switchFlag: 0
}, {
  qe: 0x0AC1,
  nmps: 31,
  nlps: 28,
  switchFlag: 0
}, {
  qe: 0x09C1,
  nmps: 32,
  nlps: 29,
  switchFlag: 0
}, {
  qe: 0x08A1,
  nmps: 33,
  nlps: 30,
  switchFlag: 0
}, {
  qe: 0x0521,
  nmps: 34,
  nlps: 31,
  switchFlag: 0
}, {
  qe: 0x0441,
  nmps: 35,
  nlps: 32,
  switchFlag: 0
}, {
  qe: 0x02A1,
  nmps: 36,
  nlps: 33,
  switchFlag: 0
}, {
  qe: 0x0221,
  nmps: 37,
  nlps: 34,
  switchFlag: 0
}, {
  qe: 0x0141,
  nmps: 38,
  nlps: 35,
  switchFlag: 0
}, {
  qe: 0x0111,
  nmps: 39,
  nlps: 36,
  switchFlag: 0
}, {
  qe: 0x0085,
  nmps: 40,
  nlps: 37,
  switchFlag: 0
}, {
  qe: 0x0049,
  nmps: 41,
  nlps: 38,
  switchFlag: 0
}, {
  qe: 0x0025,
  nmps: 42,
  nlps: 39,
  switchFlag: 0
}, {
  qe: 0x0015,
  nmps: 43,
  nlps: 40,
  switchFlag: 0
}, {
  qe: 0x0009,
  nmps: 44,
  nlps: 41,
  switchFlag: 0
}, {
  qe: 0x0005,
  nmps: 45,
  nlps: 42,
  switchFlag: 0
}, {
  qe: 0x0001,
  nmps: 45,
  nlps: 43,
  switchFlag: 0
}, {
  qe: 0x5601,
  nmps: 46,
  nlps: 46,
  switchFlag: 0
}];

var ArithmeticDecoder =
/*#__PURE__*/
function () {
  function ArithmeticDecoder(data, start, end) {
    _classCallCheck(this, ArithmeticDecoder);

    this.data = data;
    this.bp = start;
    this.dataEnd = end;
    this.chigh = data[start];
    this.clow = 0;
    this.byteIn();
    this.chigh = this.chigh << 7 & 0xFFFF | this.clow >> 9 & 0x7F;
    this.clow = this.clow << 7 & 0xFFFF;
    this.ct -= 7;
    this.a = 0x8000;
  }

  _createClass(ArithmeticDecoder, [{
    key: "byteIn",
    value: function byteIn() {
      var data = this.data;
      var bp = this.bp;

      if (data[bp] === 0xFF) {
        if (data[bp + 1] > 0x8F) {
          this.clow += 0xFF00;
          this.ct = 8;
        } else {
          bp++;
          this.clow += data[bp] << 9;
          this.ct = 7;
          this.bp = bp;
        }
      } else {
        bp++;
        this.clow += bp < this.dataEnd ? data[bp] << 8 : 0xFF00;
        this.ct = 8;
        this.bp = bp;
      }

      if (this.clow > 0xFFFF) {
        this.chigh += this.clow >> 16;
        this.clow &= 0xFFFF;
      }
    }
  }, {
    key: "readBit",
    value: function readBit(contexts, pos) {
      var cx_index = contexts[pos] >> 1,
          cx_mps = contexts[pos] & 1;
      var qeTableIcx = QeTable[cx_index];
      var qeIcx = qeTableIcx.qe;
      var d;
      var a = this.a - qeIcx;

      if (this.chigh < qeIcx) {
        if (a < qeIcx) {
          a = qeIcx;
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        } else {
          a = qeIcx;
          d = 1 ^ cx_mps;

          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }

          cx_index = qeTableIcx.nlps;
        }
      } else {
        this.chigh -= qeIcx;

        if ((a & 0x8000) !== 0) {
          this.a = a;
          return cx_mps;
        }

        if (a < qeIcx) {
          d = 1 ^ cx_mps;

          if (qeTableIcx.switchFlag === 1) {
            cx_mps = d;
          }

          cx_index = qeTableIcx.nlps;
        } else {
          d = cx_mps;
          cx_index = qeTableIcx.nmps;
        }
      }

      do {
        if (this.ct === 0) {
          this.byteIn();
        }

        a <<= 1;
        this.chigh = this.chigh << 1 & 0xFFFF | this.clow >> 15 & 1;
        this.clow = this.clow << 1 & 0xFFFF;
        this.ct--;
      } while ((a & 0x8000) === 0);

      this.a = a;
      contexts[pos] = cx_index << 1 | cx_mps;
      return d;
    }
  }]);

  return ArithmeticDecoder;
}();

exports.ArithmeticDecoder = ArithmeticDecoder;

/***/ }),
/* 160 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CCITTFaxDecoder = void 0;

var _util = __w_pdfjs_require__(1);

var CCITTFaxDecoder = function CCITTFaxDecoder() {
  var ccittEOL = -2;
  var ccittEOF = -1;
  var twoDimPass = 0;
  var twoDimHoriz = 1;
  var twoDimVert0 = 2;
  var twoDimVertR1 = 3;
  var twoDimVertL1 = 4;
  var twoDimVertR2 = 5;
  var twoDimVertL2 = 6;
  var twoDimVertR3 = 7;
  var twoDimVertL3 = 8;
  var twoDimTable = [[-1, -1], [-1, -1], [7, twoDimVertL3], [7, twoDimVertR3], [6, twoDimVertL2], [6, twoDimVertL2], [6, twoDimVertR2], [6, twoDimVertR2], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [4, twoDimPass], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimHoriz], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertL1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [3, twoDimVertR1], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0], [1, twoDimVert0]];
  var whiteTable1 = [[-1, -1], [12, ccittEOL], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [11, 1792], [11, 1792], [12, 1984], [12, 2048], [12, 2112], [12, 2176], [12, 2240], [12, 2304], [11, 1856], [11, 1856], [11, 1920], [11, 1920], [12, 2368], [12, 2432], [12, 2496], [12, 2560]];
  var whiteTable2 = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [8, 29], [8, 29], [8, 30], [8, 30], [8, 45], [8, 45], [8, 46], [8, 46], [7, 22], [7, 22], [7, 22], [7, 22], [7, 23], [7, 23], [7, 23], [7, 23], [8, 47], [8, 47], [8, 48], [8, 48], [6, 13], [6, 13], [6, 13], [6, 13], [6, 13], [6, 13], [6, 13], [6, 13], [7, 20], [7, 20], [7, 20], [7, 20], [8, 33], [8, 33], [8, 34], [8, 34], [8, 35], [8, 35], [8, 36], [8, 36], [8, 37], [8, 37], [8, 38], [8, 38], [7, 19], [7, 19], [7, 19], [7, 19], [8, 31], [8, 31], [8, 32], [8, 32], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [6, 12], [6, 12], [6, 12], [6, 12], [6, 12], [6, 12], [6, 12], [6, 12], [8, 53], [8, 53], [8, 54], [8, 54], [7, 26], [7, 26], [7, 26], [7, 26], [8, 39], [8, 39], [8, 40], [8, 40], [8, 41], [8, 41], [8, 42], [8, 42], [8, 43], [8, 43], [8, 44], [8, 44], [7, 21], [7, 21], [7, 21], [7, 21], [7, 28], [7, 28], [7, 28], [7, 28], [8, 61], [8, 61], [8, 62], [8, 62], [8, 63], [8, 63], [8, 0], [8, 0], [8, 320], [8, 320], [8, 384], [8, 384], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 10], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [5, 11], [7, 27], [7, 27], [7, 27], [7, 27], [8, 59], [8, 59], [8, 60], [8, 60], [9, 1472], [9, 1536], [9, 1600], [9, 1728], [7, 18], [7, 18], [7, 18], [7, 18], [7, 24], [7, 24], [7, 24], [7, 24], [8, 49], [8, 49], [8, 50], [8, 50], [8, 51], [8, 51], [8, 52], [8, 52], [7, 25], [7, 25], [7, 25], [7, 25], [8, 55], [8, 55], [8, 56], [8, 56], [8, 57], [8, 57], [8, 58], [8, 58], [6, 192], [6, 192], [6, 192], [6, 192], [6, 192], [6, 192], [6, 192], [6, 192], [6, 1664], [6, 1664], [6, 1664], [6, 1664], [6, 1664], [6, 1664], [6, 1664], [6, 1664], [8, 448], [8, 448], [8, 512], [8, 512], [9, 704], [9, 768], [8, 640], [8, 640], [8, 576], [8, 576], [9, 832], [9, 896], [9, 960], [9, 1024], [9, 1088], [9, 1152], [9, 1216], [9, 1280], [9, 1344], [9, 1408], [7, 256], [7, 256], [7, 256], [7, 256], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 2], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [4, 3], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 128], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 8], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [5, 9], [6, 16], [6, 16], [6, 16], [6, 16], [6, 16], [6, 16], [6, 16], [6, 16], [6, 17], [6, 17], [6, 17], [6, 17], [6, 17], [6, 17], [6, 17], [6, 17], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 4], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [4, 5], [6, 14], [6, 14], [6, 14], [6, 14], [6, 14], [6, 14], [6, 14], [6, 14], [6, 15], [6, 15], [6, 15], [6, 15], [6, 15], [6, 15], [6, 15], [6, 15], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [5, 64], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 6], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7], [4, 7]];
  var blackTable1 = [[-1, -1], [-1, -1], [12, ccittEOL], [12, ccittEOL], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [-1, -1], [11, 1792], [11, 1792], [11, 1792], [11, 1792], [12, 1984], [12, 1984], [12, 2048], [12, 2048], [12, 2112], [12, 2112], [12, 2176], [12, 2176], [12, 2240], [12, 2240], [12, 2304], [12, 2304], [11, 1856], [11, 1856], [11, 1856], [11, 1856], [11, 1920], [11, 1920], [11, 1920], [11, 1920], [12, 2368], [12, 2368], [12, 2432], [12, 2432], [12, 2496], [12, 2496], [12, 2560], [12, 2560], [10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [10, 18], [12, 52], [12, 52], [13, 640], [13, 704], [13, 768], [13, 832], [12, 55], [12, 55], [12, 56], [12, 56], [13, 1280], [13, 1344], [13, 1408], [13, 1472], [12, 59], [12, 59], [12, 60], [12, 60], [13, 1536], [13, 1600], [11, 24], [11, 24], [11, 24], [11, 24], [11, 25], [11, 25], [11, 25], [11, 25], [13, 1664], [13, 1728], [12, 320], [12, 320], [12, 384], [12, 384], [12, 448], [12, 448], [13, 512], [13, 576], [12, 53], [12, 53], [12, 54], [12, 54], [13, 896], [13, 960], [13, 1024], [13, 1088], [13, 1152], [13, 1216], [10, 64], [10, 64], [10, 64], [10, 64], [10, 64], [10, 64], [10, 64], [10, 64]];
  var blackTable2 = [[8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [8, 13], [11, 23], [11, 23], [12, 50], [12, 51], [12, 44], [12, 45], [12, 46], [12, 47], [12, 57], [12, 58], [12, 61], [12, 256], [10, 16], [10, 16], [10, 16], [10, 16], [10, 17], [10, 17], [10, 17], [10, 17], [12, 48], [12, 49], [12, 62], [12, 63], [12, 30], [12, 31], [12, 32], [12, 33], [12, 40], [12, 41], [11, 22], [11, 22], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [8, 14], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 10], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [7, 11], [9, 15], [9, 15], [9, 15], [9, 15], [9, 15], [9, 15], [9, 15], [9, 15], [12, 128], [12, 192], [12, 26], [12, 27], [12, 28], [12, 29], [11, 19], [11, 19], [11, 20], [11, 20], [12, 34], [12, 35], [12, 36], [12, 37], [12, 38], [12, 39], [11, 21], [11, 21], [12, 42], [12, 43], [10, 0], [10, 0], [10, 0], [10, 0], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12], [7, 12]];
  var blackTable3 = [[-1, -1], [-1, -1], [-1, -1], [-1, -1], [6, 9], [6, 8], [5, 7], [5, 7], [4, 6], [4, 6], [4, 6], [4, 6], [4, 5], [4, 5], [4, 5], [4, 5], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 1], [3, 4], [3, 4], [3, 4], [3, 4], [3, 4], [3, 4], [3, 4], [3, 4], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2], [2, 2]];

  function CCITTFaxDecoder(source) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!source || typeof source.next !== 'function') {
      throw new Error('CCITTFaxDecoder - invalid "source" parameter.');
    }

    this.source = source;
    this.eof = false;
    this.encoding = options['K'] || 0;
    this.eoline = options['EndOfLine'] || false;
    this.byteAlign = options['EncodedByteAlign'] || false;
    this.columns = options['Columns'] || 1728;
    this.rows = options['Rows'] || 0;
    var eoblock = options['EndOfBlock'];

    if (eoblock === null || eoblock === undefined) {
      eoblock = true;
    }

    this.eoblock = eoblock;
    this.black = options['BlackIs1'] || false;
    this.codingLine = new Uint32Array(this.columns + 1);
    this.refLine = new Uint32Array(this.columns + 2);
    this.codingLine[0] = this.columns;
    this.codingPos = 0;
    this.row = 0;
    this.nextLine2D = this.encoding < 0;
    this.inputBits = 0;
    this.inputBuf = 0;
    this.outputBits = 0;
    this.rowsDone = false;
    var code1;

    while ((code1 = this._lookBits(12)) === 0) {
      this._eatBits(1);
    }

    if (code1 === 1) {
      this._eatBits(12);
    }

    if (this.encoding > 0) {
      this.nextLine2D = !this._lookBits(1);

      this._eatBits(1);
    }
  }

  CCITTFaxDecoder.prototype = {
    readNextChar: function readNextChar() {
      if (this.eof) {
        return -1;
      }

      var refLine = this.refLine;
      var codingLine = this.codingLine;
      var columns = this.columns;
      var refPos, blackPixels, bits, i;

      if (this.outputBits === 0) {
        if (this.rowsDone) {
          this.eof = true;
        }

        if (this.eof) {
          return -1;
        }

        this.err = false;
        var code1, code2, code3;

        if (this.nextLine2D) {
          for (i = 0; codingLine[i] < columns; ++i) {
            refLine[i] = codingLine[i];
          }

          refLine[i++] = columns;
          refLine[i] = columns;
          codingLine[0] = 0;
          this.codingPos = 0;
          refPos = 0;
          blackPixels = 0;

          while (codingLine[this.codingPos] < columns) {
            code1 = this._getTwoDimCode();

            switch (code1) {
              case twoDimPass:
                this._addPixels(refLine[refPos + 1], blackPixels);

                if (refLine[refPos + 1] < columns) {
                  refPos += 2;
                }

                break;

              case twoDimHoriz:
                code1 = code2 = 0;

                if (blackPixels) {
                  do {
                    code1 += code3 = this._getBlackCode();
                  } while (code3 >= 64);

                  do {
                    code2 += code3 = this._getWhiteCode();
                  } while (code3 >= 64);
                } else {
                  do {
                    code1 += code3 = this._getWhiteCode();
                  } while (code3 >= 64);

                  do {
                    code2 += code3 = this._getBlackCode();
                  } while (code3 >= 64);
                }

                this._addPixels(codingLine[this.codingPos] + code1, blackPixels);

                if (codingLine[this.codingPos] < columns) {
                  this._addPixels(codingLine[this.codingPos] + code2, blackPixels ^ 1);
                }

                while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                  refPos += 2;
                }

                break;

              case twoDimVertR3:
                this._addPixels(refLine[refPos] + 3, blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  ++refPos;

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case twoDimVertR2:
                this._addPixels(refLine[refPos] + 2, blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  ++refPos;

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case twoDimVertR1:
                this._addPixels(refLine[refPos] + 1, blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  ++refPos;

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case twoDimVert0:
                this._addPixels(refLine[refPos], blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  ++refPos;

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case twoDimVertL3:
                this._addPixelsNeg(refLine[refPos] - 3, blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  if (refPos > 0) {
                    --refPos;
                  } else {
                    ++refPos;
                  }

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case twoDimVertL2:
                this._addPixelsNeg(refLine[refPos] - 2, blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  if (refPos > 0) {
                    --refPos;
                  } else {
                    ++refPos;
                  }

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case twoDimVertL1:
                this._addPixelsNeg(refLine[refPos] - 1, blackPixels);

                blackPixels ^= 1;

                if (codingLine[this.codingPos] < columns) {
                  if (refPos > 0) {
                    --refPos;
                  } else {
                    ++refPos;
                  }

                  while (refLine[refPos] <= codingLine[this.codingPos] && refLine[refPos] < columns) {
                    refPos += 2;
                  }
                }

                break;

              case ccittEOF:
                this._addPixels(columns, 0);

                this.eof = true;
                break;

              default:
                (0, _util.info)('bad 2d code');

                this._addPixels(columns, 0);

                this.err = true;
            }
          }
        } else {
          codingLine[0] = 0;
          this.codingPos = 0;
          blackPixels = 0;

          while (codingLine[this.codingPos] < columns) {
            code1 = 0;

            if (blackPixels) {
              do {
                code1 += code3 = this._getBlackCode();
              } while (code3 >= 64);
            } else {
              do {
                code1 += code3 = this._getWhiteCode();
              } while (code3 >= 64);
            }

            this._addPixels(codingLine[this.codingPos] + code1, blackPixels);

            blackPixels ^= 1;
          }
        }

        var gotEOL = false;

        if (this.byteAlign) {
          this.inputBits &= ~7;
        }

        if (!this.eoblock && this.row === this.rows - 1) {
          this.rowsDone = true;
        } else {
          code1 = this._lookBits(12);

          if (this.eoline) {
            while (code1 !== ccittEOF && code1 !== 1) {
              this._eatBits(1);

              code1 = this._lookBits(12);
            }
          } else {
            while (code1 === 0) {
              this._eatBits(1);

              code1 = this._lookBits(12);
            }
          }

          if (code1 === 1) {
            this._eatBits(12);

            gotEOL = true;
          } else if (code1 === ccittEOF) {
            this.eof = true;
          }
        }

        if (!this.eof && this.encoding > 0 && !this.rowsDone) {
          this.nextLine2D = !this._lookBits(1);

          this._eatBits(1);
        }

        if (this.eoblock && gotEOL && this.byteAlign) {
          code1 = this._lookBits(12);

          if (code1 === 1) {
            this._eatBits(12);

            if (this.encoding > 0) {
              this._lookBits(1);

              this._eatBits(1);
            }

            if (this.encoding >= 0) {
              for (i = 0; i < 4; ++i) {
                code1 = this._lookBits(12);

                if (code1 !== 1) {
                  (0, _util.info)('bad rtc code: ' + code1);
                }

                this._eatBits(12);

                if (this.encoding > 0) {
                  this._lookBits(1);

                  this._eatBits(1);
                }
              }
            }

            this.eof = true;
          }
        } else if (this.err && this.eoline) {
          while (true) {
            code1 = this._lookBits(13);

            if (code1 === ccittEOF) {
              this.eof = true;
              return -1;
            }

            if (code1 >> 1 === 1) {
              break;
            }

            this._eatBits(1);
          }

          this._eatBits(12);

          if (this.encoding > 0) {
            this._eatBits(1);

            this.nextLine2D = !(code1 & 1);
          }
        }

        if (codingLine[0] > 0) {
          this.outputBits = codingLine[this.codingPos = 0];
        } else {
          this.outputBits = codingLine[this.codingPos = 1];
        }

        this.row++;
      }

      var c;

      if (this.outputBits >= 8) {
        c = this.codingPos & 1 ? 0 : 0xFF;
        this.outputBits -= 8;

        if (this.outputBits === 0 && codingLine[this.codingPos] < columns) {
          this.codingPos++;
          this.outputBits = codingLine[this.codingPos] - codingLine[this.codingPos - 1];
        }
      } else {
        bits = 8;
        c = 0;

        do {
          if (this.outputBits > bits) {
            c <<= bits;

            if (!(this.codingPos & 1)) {
              c |= 0xFF >> 8 - bits;
            }

            this.outputBits -= bits;
            bits = 0;
          } else {
            c <<= this.outputBits;

            if (!(this.codingPos & 1)) {
              c |= 0xFF >> 8 - this.outputBits;
            }

            bits -= this.outputBits;
            this.outputBits = 0;

            if (codingLine[this.codingPos] < columns) {
              this.codingPos++;
              this.outputBits = codingLine[this.codingPos] - codingLine[this.codingPos - 1];
            } else if (bits > 0) {
              c <<= bits;
              bits = 0;
            }
          }
        } while (bits);
      }

      if (this.black) {
        c ^= 0xFF;
      }

      return c;
    },
    _addPixels: function _addPixels(a1, blackPixels) {
      var codingLine = this.codingLine;
      var codingPos = this.codingPos;

      if (a1 > codingLine[codingPos]) {
        if (a1 > this.columns) {
          (0, _util.info)('row is wrong length');
          this.err = true;
          a1 = this.columns;
        }

        if (codingPos & 1 ^ blackPixels) {
          ++codingPos;
        }

        codingLine[codingPos] = a1;
      }

      this.codingPos = codingPos;
    },
    _addPixelsNeg: function _addPixelsNeg(a1, blackPixels) {
      var codingLine = this.codingLine;
      var codingPos = this.codingPos;

      if (a1 > codingLine[codingPos]) {
        if (a1 > this.columns) {
          (0, _util.info)('row is wrong length');
          this.err = true;
          a1 = this.columns;
        }

        if (codingPos & 1 ^ blackPixels) {
          ++codingPos;
        }

        codingLine[codingPos] = a1;
      } else if (a1 < codingLine[codingPos]) {
        if (a1 < 0) {
          (0, _util.info)('invalid code');
          this.err = true;
          a1 = 0;
        }

        while (codingPos > 0 && a1 < codingLine[codingPos - 1]) {
          --codingPos;
        }

        codingLine[codingPos] = a1;
      }

      this.codingPos = codingPos;
    },
    _findTableCode: function _findTableCode(start, end, table, limit) {
      var limitValue = limit || 0;

      for (var i = start; i <= end; ++i) {
        var code = this._lookBits(i);

        if (code === ccittEOF) {
          return [true, 1, false];
        }

        if (i < end) {
          code <<= end - i;
        }

        if (!limitValue || code >= limitValue) {
          var p = table[code - limitValue];

          if (p[0] === i) {
            this._eatBits(i);

            return [true, p[1], true];
          }
        }
      }

      return [false, 0, false];
    },
    _getTwoDimCode: function _getTwoDimCode() {
      var code = 0;
      var p;

      if (this.eoblock) {
        code = this._lookBits(7);
        p = twoDimTable[code];

        if (p && p[0] > 0) {
          this._eatBits(p[0]);

          return p[1];
        }
      } else {
        var result = this._findTableCode(1, 7, twoDimTable);

        if (result[0] && result[2]) {
          return result[1];
        }
      }

      (0, _util.info)('Bad two dim code');
      return ccittEOF;
    },
    _getWhiteCode: function _getWhiteCode() {
      var code = 0;
      var p;

      if (this.eoblock) {
        code = this._lookBits(12);

        if (code === ccittEOF) {
          return 1;
        }

        if (code >> 5 === 0) {
          p = whiteTable1[code];
        } else {
          p = whiteTable2[code >> 3];
        }

        if (p[0] > 0) {
          this._eatBits(p[0]);

          return p[1];
        }
      } else {
        var result = this._findTableCode(1, 9, whiteTable2);

        if (result[0]) {
          return result[1];
        }

        result = this._findTableCode(11, 12, whiteTable1);

        if (result[0]) {
          return result[1];
        }
      }

      (0, _util.info)('bad white code');

      this._eatBits(1);

      return 1;
    },
    _getBlackCode: function _getBlackCode() {
      var code, p;

      if (this.eoblock) {
        code = this._lookBits(13);

        if (code === ccittEOF) {
          return 1;
        }

        if (code >> 7 === 0) {
          p = blackTable1[code];
        } else if (code >> 9 === 0 && code >> 7 !== 0) {
          p = blackTable2[(code >> 1) - 64];
        } else {
          p = blackTable3[code >> 7];
        }

        if (p[0] > 0) {
          this._eatBits(p[0]);

          return p[1];
        }
      } else {
        var result = this._findTableCode(2, 6, blackTable3);

        if (result[0]) {
          return result[1];
        }

        result = this._findTableCode(7, 12, blackTable2, 64);

        if (result[0]) {
          return result[1];
        }

        result = this._findTableCode(10, 13, blackTable1);

        if (result[0]) {
          return result[1];
        }
      }

      (0, _util.info)('bad black code');

      this._eatBits(1);

      return 1;
    },
    _lookBits: function _lookBits(n) {
      var c;

      while (this.inputBits < n) {
        if ((c = this.source.next()) === -1) {
          if (this.inputBits === 0) {
            return ccittEOF;
          }

          return this.inputBuf << n - this.inputBits & 0xFFFF >> 16 - n;
        }

        this.inputBuf = this.inputBuf << 8 | c;
        this.inputBits += 8;
      }

      return this.inputBuf >> this.inputBits - n & 0xFFFF >> 16 - n;
    },
    _eatBits: function _eatBits(n) {
      if ((this.inputBits -= n) < 0) {
        this.inputBits = 0;
      }
    }
  };
  return CCITTFaxDecoder;
}();

exports.CCITTFaxDecoder = CCITTFaxDecoder;

/***/ }),
/* 161 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JpegImage = void 0;

var _util = __w_pdfjs_require__(1);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var JpegError =
/*#__PURE__*/
function (_BaseException) {
  _inherits(JpegError, _BaseException);

  function JpegError(msg) {
    _classCallCheck(this, JpegError);

    return _possibleConstructorReturn(this, _getPrototypeOf(JpegError).call(this, "JPEG error: ".concat(msg)));
  }

  return JpegError;
}(_util.BaseException);

var DNLMarkerError =
/*#__PURE__*/
function (_BaseException2) {
  _inherits(DNLMarkerError, _BaseException2);

  function DNLMarkerError(message, scanLines) {
    var _this;

    _classCallCheck(this, DNLMarkerError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DNLMarkerError).call(this, message));
    _this.scanLines = scanLines;
    return _this;
  }

  return DNLMarkerError;
}(_util.BaseException);

var EOIMarkerError =
/*#__PURE__*/
function (_BaseException3) {
  _inherits(EOIMarkerError, _BaseException3);

  function EOIMarkerError() {
    _classCallCheck(this, EOIMarkerError);

    return _possibleConstructorReturn(this, _getPrototypeOf(EOIMarkerError).apply(this, arguments));
  }

  return EOIMarkerError;
}(_util.BaseException);

var JpegImage = function JpegImageClosure() {
  var dctZigZag = new Uint8Array([0, 1, 8, 16, 9, 2, 3, 10, 17, 24, 32, 25, 18, 11, 4, 5, 12, 19, 26, 33, 40, 48, 41, 34, 27, 20, 13, 6, 7, 14, 21, 28, 35, 42, 49, 56, 57, 50, 43, 36, 29, 22, 15, 23, 30, 37, 44, 51, 58, 59, 52, 45, 38, 31, 39, 46, 53, 60, 61, 54, 47, 55, 62, 63]);
  var dctCos1 = 4017;
  var dctSin1 = 799;
  var dctCos3 = 3406;
  var dctSin3 = 2276;
  var dctCos6 = 1567;
  var dctSin6 = 3784;
  var dctSqrt2 = 5793;
  var dctSqrt1d2 = 2896;

  function JpegImage() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$decodeTransform = _ref.decodeTransform,
        decodeTransform = _ref$decodeTransform === void 0 ? null : _ref$decodeTransform,
        _ref$colorTransform = _ref.colorTransform,
        colorTransform = _ref$colorTransform === void 0 ? -1 : _ref$colorTransform;

    this._decodeTransform = decodeTransform;
    this._colorTransform = colorTransform;
  }

  function buildHuffmanTable(codeLengths, values) {
    var k = 0,
        code = [],
        i,
        j,
        length = 16;

    while (length > 0 && !codeLengths[length - 1]) {
      length--;
    }

    code.push({
      children: [],
      index: 0
    });
    var p = code[0],
        q;

    for (i = 0; i < length; i++) {
      for (j = 0; j < codeLengths[i]; j++) {
        p = code.pop();
        p.children[p.index] = values[k];

        while (p.index > 0) {
          p = code.pop();
        }

        p.index++;
        code.push(p);

        while (code.length <= i) {
          code.push(q = {
            children: [],
            index: 0
          });
          p.children[p.index] = q.children;
          p = q;
        }

        k++;
      }

      if (i + 1 < length) {
        code.push(q = {
          children: [],
          index: 0
        });
        p.children[p.index] = q.children;
        p = q;
      }
    }

    return code[0].children;
  }

  function getBlockBufferOffset(component, row, col) {
    return 64 * ((component.blocksPerLine + 1) * row + col);
  }

  function decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successivePrev, successive) {
    var parseDNLMarker = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : false;
    var mcusPerLine = frame.mcusPerLine;
    var progressive = frame.progressive;
    var startOffset = offset,
        bitsData = 0,
        bitsCount = 0;

    function readBit() {
      if (bitsCount > 0) {
        bitsCount--;
        return bitsData >> bitsCount & 1;
      }

      bitsData = data[offset++];

      if (bitsData === 0xFF) {
        var nextByte = data[offset++];

        if (nextByte) {
          if (nextByte === 0xDC && parseDNLMarker) {
            offset += 2;
            var scanLines = data[offset++] << 8 | data[offset++];

            if (scanLines > 0 && scanLines !== frame.scanLines) {
              throw new DNLMarkerError('Found DNL marker (0xFFDC) while parsing scan data', scanLines);
            }
          } else if (nextByte === 0xD9) {
            throw new EOIMarkerError('Found EOI marker (0xFFD9) while parsing scan data');
          }

          throw new JpegError("unexpected marker ".concat((bitsData << 8 | nextByte).toString(16)));
        }
      }

      bitsCount = 7;
      return bitsData >>> 7;
    }

    function decodeHuffman(tree) {
      var node = tree;

      while (true) {
        node = node[readBit()];

        if (typeof node === 'number') {
          return node;
        }

        if (_typeof(node) !== 'object') {
          throw new JpegError('invalid huffman sequence');
        }
      }
    }

    function receive(length) {
      var n = 0;

      while (length > 0) {
        n = n << 1 | readBit();
        length--;
      }

      return n;
    }

    function receiveAndExtend(length) {
      if (length === 1) {
        return readBit() === 1 ? 1 : -1;
      }

      var n = receive(length);

      if (n >= 1 << length - 1) {
        return n;
      }

      return n + (-1 << length) + 1;
    }

    function decodeBaseline(component, offset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t);
      component.blockData[offset] = component.pred += diff;
      var k = 1;

      while (k < 64) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
            r = rs >> 4;

        if (s === 0) {
          if (r < 15) {
            break;
          }

          k += 16;
          continue;
        }

        k += r;
        var z = dctZigZag[k];
        component.blockData[offset + z] = receiveAndExtend(s);
        k++;
      }
    }

    function decodeDCFirst(component, offset) {
      var t = decodeHuffman(component.huffmanTableDC);
      var diff = t === 0 ? 0 : receiveAndExtend(t) << successive;
      component.blockData[offset] = component.pred += diff;
    }

    function decodeDCSuccessive(component, offset) {
      component.blockData[offset] |= readBit() << successive;
    }

    var eobrun = 0;

    function decodeACFirst(component, offset) {
      if (eobrun > 0) {
        eobrun--;
        return;
      }

      var k = spectralStart,
          e = spectralEnd;

      while (k <= e) {
        var rs = decodeHuffman(component.huffmanTableAC);
        var s = rs & 15,
            r = rs >> 4;

        if (s === 0) {
          if (r < 15) {
            eobrun = receive(r) + (1 << r) - 1;
            break;
          }

          k += 16;
          continue;
        }

        k += r;
        var z = dctZigZag[k];
        component.blockData[offset + z] = receiveAndExtend(s) * (1 << successive);
        k++;
      }
    }

    var successiveACState = 0,
        successiveACNextValue;

    function decodeACSuccessive(component, offset) {
      var k = spectralStart;
      var e = spectralEnd;
      var r = 0;
      var s;
      var rs;

      while (k <= e) {
        var offsetZ = offset + dctZigZag[k];
        var sign = component.blockData[offsetZ] < 0 ? -1 : 1;

        switch (successiveACState) {
          case 0:
            rs = decodeHuffman(component.huffmanTableAC);
            s = rs & 15;
            r = rs >> 4;

            if (s === 0) {
              if (r < 15) {
                eobrun = receive(r) + (1 << r);
                successiveACState = 4;
              } else {
                r = 16;
                successiveACState = 1;
              }
            } else {
              if (s !== 1) {
                throw new JpegError('invalid ACn encoding');
              }

              successiveACNextValue = receiveAndExtend(s);
              successiveACState = r ? 2 : 3;
            }

            continue;

          case 1:
          case 2:
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              r--;

              if (r === 0) {
                successiveACState = successiveACState === 2 ? 3 : 0;
              }
            }

            break;

          case 3:
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            } else {
              component.blockData[offsetZ] = successiveACNextValue << successive;
              successiveACState = 0;
            }

            break;

          case 4:
            if (component.blockData[offsetZ]) {
              component.blockData[offsetZ] += sign * (readBit() << successive);
            }

            break;
        }

        k++;
      }

      if (successiveACState === 4) {
        eobrun--;

        if (eobrun === 0) {
          successiveACState = 0;
        }
      }
    }

    function decodeMcu(component, decode, mcu, row, col) {
      var mcuRow = mcu / mcusPerLine | 0;
      var mcuCol = mcu % mcusPerLine;
      var blockRow = mcuRow * component.v + row;
      var blockCol = mcuCol * component.h + col;
      var offset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, offset);
    }

    function decodeBlock(component, decode, mcu) {
      var blockRow = mcu / component.blocksPerLine | 0;
      var blockCol = mcu % component.blocksPerLine;
      var offset = getBlockBufferOffset(component, blockRow, blockCol);
      decode(component, offset);
    }

    var componentsLength = components.length;
    var component, i, j, k, n;
    var decodeFn;

    if (progressive) {
      if (spectralStart === 0) {
        decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
      } else {
        decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
      }
    } else {
      decodeFn = decodeBaseline;
    }

    var mcu = 0,
        fileMarker;
    var mcuExpected;

    if (componentsLength === 1) {
      mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
    } else {
      mcuExpected = mcusPerLine * frame.mcusPerColumn;
    }

    var h, v;

    while (mcu < mcuExpected) {
      var mcuToRead = resetInterval ? Math.min(mcuExpected - mcu, resetInterval) : mcuExpected;

      for (i = 0; i < componentsLength; i++) {
        components[i].pred = 0;
      }

      eobrun = 0;

      if (componentsLength === 1) {
        component = components[0];

        for (n = 0; n < mcuToRead; n++) {
          decodeBlock(component, decodeFn, mcu);
          mcu++;
        }
      } else {
        for (n = 0; n < mcuToRead; n++) {
          for (i = 0; i < componentsLength; i++) {
            component = components[i];
            h = component.h;
            v = component.v;

            for (j = 0; j < v; j++) {
              for (k = 0; k < h; k++) {
                decodeMcu(component, decodeFn, mcu, j, k);
              }
            }
          }

          mcu++;
        }
      }

      bitsCount = 0;
      fileMarker = findNextFileMarker(data, offset);

      if (!fileMarker) {
        break;
      } else if (fileMarker.invalid) {
        (0, _util.warn)('decodeScan - unexpected MCU data, current marker is: ' + fileMarker.invalid);
        offset = fileMarker.offset;
      }

      var marker = fileMarker && fileMarker.marker;

      if (!marker || marker <= 0xFF00) {
        throw new JpegError('decodeScan - a valid marker was not found.');
      }

      if (marker >= 0xFFD0 && marker <= 0xFFD7) {
        offset += 2;
      } else {
        break;
      }
    }

    fileMarker = findNextFileMarker(data, offset);

    if (fileMarker && fileMarker.invalid) {
      (0, _util.warn)('decodeScan - unexpected Scan data, current marker is: ' + fileMarker.invalid);
      offset = fileMarker.offset;
    }

    return offset - startOffset;
  }

  function quantizeAndInverse(component, blockBufferOffset, p) {
    var qt = component.quantizationTable,
        blockData = component.blockData;
    var v0, v1, v2, v3, v4, v5, v6, v7;
    var p0, p1, p2, p3, p4, p5, p6, p7;
    var t;

    if (!qt) {
      throw new JpegError('missing required Quantization Table.');
    }

    for (var row = 0; row < 64; row += 8) {
      p0 = blockData[blockBufferOffset + row];
      p1 = blockData[blockBufferOffset + row + 1];
      p2 = blockData[blockBufferOffset + row + 2];
      p3 = blockData[blockBufferOffset + row + 3];
      p4 = blockData[blockBufferOffset + row + 4];
      p5 = blockData[blockBufferOffset + row + 5];
      p6 = blockData[blockBufferOffset + row + 6];
      p7 = blockData[blockBufferOffset + row + 7];
      p0 *= qt[row];

      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = dctSqrt2 * p0 + 512 >> 10;
        p[row] = t;
        p[row + 1] = t;
        p[row + 2] = t;
        p[row + 3] = t;
        p[row + 4] = t;
        p[row + 5] = t;
        p[row + 6] = t;
        p[row + 7] = t;
        continue;
      }

      p1 *= qt[row + 1];
      p2 *= qt[row + 2];
      p3 *= qt[row + 3];
      p4 *= qt[row + 4];
      p5 *= qt[row + 5];
      p6 *= qt[row + 6];
      p7 *= qt[row + 7];
      v0 = dctSqrt2 * p0 + 128 >> 8;
      v1 = dctSqrt2 * p4 + 128 >> 8;
      v2 = p2;
      v3 = p6;
      v4 = dctSqrt1d2 * (p1 - p7) + 128 >> 8;
      v7 = dctSqrt1d2 * (p1 + p7) + 128 >> 8;
      v5 = p3 << 4;
      v6 = p5 << 4;
      v0 = v0 + v1 + 1 >> 1;
      v1 = v0 - v1;
      t = v2 * dctSin6 + v3 * dctCos6 + 128 >> 8;
      v2 = v2 * dctCos6 - v3 * dctSin6 + 128 >> 8;
      v3 = t;
      v4 = v4 + v6 + 1 >> 1;
      v6 = v4 - v6;
      v7 = v7 + v5 + 1 >> 1;
      v5 = v7 - v5;
      v0 = v0 + v3 + 1 >> 1;
      v3 = v0 - v3;
      v1 = v1 + v2 + 1 >> 1;
      v2 = v1 - v2;
      t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
      v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
      v7 = t;
      t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
      v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
      v6 = t;
      p[row] = v0 + v7;
      p[row + 7] = v0 - v7;
      p[row + 1] = v1 + v6;
      p[row + 6] = v1 - v6;
      p[row + 2] = v2 + v5;
      p[row + 5] = v2 - v5;
      p[row + 3] = v3 + v4;
      p[row + 4] = v3 - v4;
    }

    for (var col = 0; col < 8; ++col) {
      p0 = p[col];
      p1 = p[col + 8];
      p2 = p[col + 16];
      p3 = p[col + 24];
      p4 = p[col + 32];
      p5 = p[col + 40];
      p6 = p[col + 48];
      p7 = p[col + 56];

      if ((p1 | p2 | p3 | p4 | p5 | p6 | p7) === 0) {
        t = dctSqrt2 * p0 + 8192 >> 14;
        t = t < -2040 ? 0 : t >= 2024 ? 255 : t + 2056 >> 4;
        blockData[blockBufferOffset + col] = t;
        blockData[blockBufferOffset + col + 8] = t;
        blockData[blockBufferOffset + col + 16] = t;
        blockData[blockBufferOffset + col + 24] = t;
        blockData[blockBufferOffset + col + 32] = t;
        blockData[blockBufferOffset + col + 40] = t;
        blockData[blockBufferOffset + col + 48] = t;
        blockData[blockBufferOffset + col + 56] = t;
        continue;
      }

      v0 = dctSqrt2 * p0 + 2048 >> 12;
      v1 = dctSqrt2 * p4 + 2048 >> 12;
      v2 = p2;
      v3 = p6;
      v4 = dctSqrt1d2 * (p1 - p7) + 2048 >> 12;
      v7 = dctSqrt1d2 * (p1 + p7) + 2048 >> 12;
      v5 = p3;
      v6 = p5;
      v0 = (v0 + v1 + 1 >> 1) + 4112;
      v1 = v0 - v1;
      t = v2 * dctSin6 + v3 * dctCos6 + 2048 >> 12;
      v2 = v2 * dctCos6 - v3 * dctSin6 + 2048 >> 12;
      v3 = t;
      v4 = v4 + v6 + 1 >> 1;
      v6 = v4 - v6;
      v7 = v7 + v5 + 1 >> 1;
      v5 = v7 - v5;
      v0 = v0 + v3 + 1 >> 1;
      v3 = v0 - v3;
      v1 = v1 + v2 + 1 >> 1;
      v2 = v1 - v2;
      t = v4 * dctSin3 + v7 * dctCos3 + 2048 >> 12;
      v4 = v4 * dctCos3 - v7 * dctSin3 + 2048 >> 12;
      v7 = t;
      t = v5 * dctSin1 + v6 * dctCos1 + 2048 >> 12;
      v5 = v5 * dctCos1 - v6 * dctSin1 + 2048 >> 12;
      v6 = t;
      p0 = v0 + v7;
      p7 = v0 - v7;
      p1 = v1 + v6;
      p6 = v1 - v6;
      p2 = v2 + v5;
      p5 = v2 - v5;
      p3 = v3 + v4;
      p4 = v3 - v4;
      p0 = p0 < 16 ? 0 : p0 >= 4080 ? 255 : p0 >> 4;
      p1 = p1 < 16 ? 0 : p1 >= 4080 ? 255 : p1 >> 4;
      p2 = p2 < 16 ? 0 : p2 >= 4080 ? 255 : p2 >> 4;
      p3 = p3 < 16 ? 0 : p3 >= 4080 ? 255 : p3 >> 4;
      p4 = p4 < 16 ? 0 : p4 >= 4080 ? 255 : p4 >> 4;
      p5 = p5 < 16 ? 0 : p5 >= 4080 ? 255 : p5 >> 4;
      p6 = p6 < 16 ? 0 : p6 >= 4080 ? 255 : p6 >> 4;
      p7 = p7 < 16 ? 0 : p7 >= 4080 ? 255 : p7 >> 4;
      blockData[blockBufferOffset + col] = p0;
      blockData[blockBufferOffset + col + 8] = p1;
      blockData[blockBufferOffset + col + 16] = p2;
      blockData[blockBufferOffset + col + 24] = p3;
      blockData[blockBufferOffset + col + 32] = p4;
      blockData[blockBufferOffset + col + 40] = p5;
      blockData[blockBufferOffset + col + 48] = p6;
      blockData[blockBufferOffset + col + 56] = p7;
    }
  }

  function buildComponentData(frame, component) {
    var blocksPerLine = component.blocksPerLine;
    var blocksPerColumn = component.blocksPerColumn;
    var computationBuffer = new Int16Array(64);

    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
      for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
        var offset = getBlockBufferOffset(component, blockRow, blockCol);
        quantizeAndInverse(component, offset, computationBuffer);
      }
    }

    return component.blockData;
  }

  function findNextFileMarker(data, currentPos) {
    var startPos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : currentPos;

    function peekUint16(pos) {
      return data[pos] << 8 | data[pos + 1];
    }

    var maxPos = data.length - 1;
    var newPos = startPos < currentPos ? startPos : currentPos;

    if (currentPos >= maxPos) {
      return null;
    }

    var currentMarker = peekUint16(currentPos);

    if (currentMarker >= 0xFFC0 && currentMarker <= 0xFFFE) {
      return {
        invalid: null,
        marker: currentMarker,
        offset: currentPos
      };
    }

    var newMarker = peekUint16(newPos);

    while (!(newMarker >= 0xFFC0 && newMarker <= 0xFFFE)) {
      if (++newPos >= maxPos) {
        return null;
      }

      newMarker = peekUint16(newPos);
    }

    return {
      invalid: currentMarker.toString(16),
      marker: newMarker,
      offset: newPos
    };
  }

  JpegImage.prototype = {
    parse: function parse(data) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$dnlScanLines = _ref2.dnlScanLines,
          dnlScanLines = _ref2$dnlScanLines === void 0 ? null : _ref2$dnlScanLines;

      function readUint16() {
        var value = data[offset] << 8 | data[offset + 1];
        offset += 2;
        return value;
      }

      function readDataBlock() {
        var length = readUint16();
        var endOffset = offset + length - 2;
        var fileMarker = findNextFileMarker(data, endOffset, offset);

        if (fileMarker && fileMarker.invalid) {
          (0, _util.warn)('readDataBlock - incorrect length, current marker is: ' + fileMarker.invalid);
          endOffset = fileMarker.offset;
        }

        var array = data.subarray(offset, endOffset);
        offset += array.length;
        return array;
      }

      function prepareComponents(frame) {
        var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / frame.maxH);
        var mcusPerColumn = Math.ceil(frame.scanLines / 8 / frame.maxV);

        for (var i = 0; i < frame.components.length; i++) {
          component = frame.components[i];
          var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / frame.maxH);
          var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines / 8) * component.v / frame.maxV);
          var blocksPerLineForMcu = mcusPerLine * component.h;
          var blocksPerColumnForMcu = mcusPerColumn * component.v;
          var blocksBufferSize = 64 * blocksPerColumnForMcu * (blocksPerLineForMcu + 1);
          component.blockData = new Int16Array(blocksBufferSize);
          component.blocksPerLine = blocksPerLine;
          component.blocksPerColumn = blocksPerColumn;
        }

        frame.mcusPerLine = mcusPerLine;
        frame.mcusPerColumn = mcusPerColumn;
      }

      var offset = 0;
      var jfif = null;
      var adobe = null;
      var frame, resetInterval;
      var numSOSMarkers = 0;
      var quantizationTables = [];
      var huffmanTablesAC = [],
          huffmanTablesDC = [];
      var fileMarker = readUint16();

      if (fileMarker !== 0xFFD8) {
        throw new JpegError('SOI not found');
      }

      fileMarker = readUint16();

      markerLoop: while (fileMarker !== 0xFFD9) {
        var i, j, l;

        switch (fileMarker) {
          case 0xFFE0:
          case 0xFFE1:
          case 0xFFE2:
          case 0xFFE3:
          case 0xFFE4:
          case 0xFFE5:
          case 0xFFE6:
          case 0xFFE7:
          case 0xFFE8:
          case 0xFFE9:
          case 0xFFEA:
          case 0xFFEB:
          case 0xFFEC:
          case 0xFFED:
          case 0xFFEE:
          case 0xFFEF:
          case 0xFFFE:
            var appData = readDataBlock();

            if (fileMarker === 0xFFE0) {
              if (appData[0] === 0x4A && appData[1] === 0x46 && appData[2] === 0x49 && appData[3] === 0x46 && appData[4] === 0) {
                jfif = {
                  version: {
                    major: appData[5],
                    minor: appData[6]
                  },
                  densityUnits: appData[7],
                  xDensity: appData[8] << 8 | appData[9],
                  yDensity: appData[10] << 8 | appData[11],
                  thumbWidth: appData[12],
                  thumbHeight: appData[13],
                  thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
                };
              }
            }

            if (fileMarker === 0xFFEE) {
              if (appData[0] === 0x41 && appData[1] === 0x64 && appData[2] === 0x6F && appData[3] === 0x62 && appData[4] === 0x65) {
                adobe = {
                  version: appData[5] << 8 | appData[6],
                  flags0: appData[7] << 8 | appData[8],
                  flags1: appData[9] << 8 | appData[10],
                  transformCode: appData[11]
                };
              }
            }

            break;

          case 0xFFDB:
            var quantizationTablesLength = readUint16();
            var quantizationTablesEnd = quantizationTablesLength + offset - 2;
            var z;

            while (offset < quantizationTablesEnd) {
              var quantizationTableSpec = data[offset++];
              var tableData = new Uint16Array(64);

              if (quantizationTableSpec >> 4 === 0) {
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = data[offset++];
                }
              } else if (quantizationTableSpec >> 4 === 1) {
                for (j = 0; j < 64; j++) {
                  z = dctZigZag[j];
                  tableData[z] = readUint16();
                }
              } else {
                throw new JpegError('DQT - invalid table spec');
              }

              quantizationTables[quantizationTableSpec & 15] = tableData;
            }

            break;

          case 0xFFC0:
          case 0xFFC1:
          case 0xFFC2:
            if (frame) {
              throw new JpegError('Only single frame JPEGs supported');
            }

            readUint16();
            frame = {};
            frame.extended = fileMarker === 0xFFC1;
            frame.progressive = fileMarker === 0xFFC2;
            frame.precision = data[offset++];
            var sofScanLines = readUint16();
            frame.scanLines = dnlScanLines || sofScanLines;
            frame.samplesPerLine = readUint16();
            frame.components = [];
            frame.componentIds = {};
            var componentsCount = data[offset++],
                componentId;
            var maxH = 0,
                maxV = 0;

            for (i = 0; i < componentsCount; i++) {
              componentId = data[offset];
              var h = data[offset + 1] >> 4;
              var v = data[offset + 1] & 15;

              if (maxH < h) {
                maxH = h;
              }

              if (maxV < v) {
                maxV = v;
              }

              var qId = data[offset + 2];
              l = frame.components.push({
                h: h,
                v: v,
                quantizationId: qId,
                quantizationTable: null
              });
              frame.componentIds[componentId] = l - 1;
              offset += 3;
            }

            frame.maxH = maxH;
            frame.maxV = maxV;
            prepareComponents(frame);
            break;

          case 0xFFC4:
            var huffmanLength = readUint16();

            for (i = 2; i < huffmanLength;) {
              var huffmanTableSpec = data[offset++];
              var codeLengths = new Uint8Array(16);
              var codeLengthSum = 0;

              for (j = 0; j < 16; j++, offset++) {
                codeLengthSum += codeLengths[j] = data[offset];
              }

              var huffmanValues = new Uint8Array(codeLengthSum);

              for (j = 0; j < codeLengthSum; j++, offset++) {
                huffmanValues[j] = data[offset];
              }

              i += 17 + codeLengthSum;
              (huffmanTableSpec >> 4 === 0 ? huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] = buildHuffmanTable(codeLengths, huffmanValues);
            }

            break;

          case 0xFFDD:
            readUint16();
            resetInterval = readUint16();
            break;

          case 0xFFDA:
            var parseDNLMarker = ++numSOSMarkers === 1 && !dnlScanLines;
            readUint16();
            var selectorsCount = data[offset++];
            var components = [],
                component;

            for (i = 0; i < selectorsCount; i++) {
              var componentIndex = frame.componentIds[data[offset++]];
              component = frame.components[componentIndex];
              var tableSpec = data[offset++];
              component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
              component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
              components.push(component);
            }

            var spectralStart = data[offset++];
            var spectralEnd = data[offset++];
            var successiveApproximation = data[offset++];

            try {
              var processed = decodeScan(data, offset, frame, components, resetInterval, spectralStart, spectralEnd, successiveApproximation >> 4, successiveApproximation & 15, parseDNLMarker);
              offset += processed;
            } catch (ex) {
              if (ex instanceof DNLMarkerError) {
                (0, _util.warn)("".concat(ex.message, " -- attempting to re-parse the JPEG image."));
                return this.parse(data, {
                  dnlScanLines: ex.scanLines
                });
              } else if (ex instanceof EOIMarkerError) {
                (0, _util.warn)("".concat(ex.message, " -- ignoring the rest of the image data."));
                break markerLoop;
              }

              throw ex;
            }

            break;

          case 0xFFDC:
            offset += 4;
            break;

          case 0xFFFF:
            if (data[offset] !== 0xFF) {
              offset--;
            }

            break;

          default:
            if (data[offset - 3] === 0xFF && data[offset - 2] >= 0xC0 && data[offset - 2] <= 0xFE) {
              offset -= 3;
              break;
            }

            var nextFileMarker = findNextFileMarker(data, offset - 2);

            if (nextFileMarker && nextFileMarker.invalid) {
              (0, _util.warn)('JpegImage.parse - unexpected data, current marker is: ' + nextFileMarker.invalid);
              offset = nextFileMarker.offset;
              break;
            }

            if (offset > data.length - 2) {
              (0, _util.warn)('JpegImage.parse - reached the end of the image data ' + 'without finding an EOI marker (0xFFD9).');
              break markerLoop;
            }

            throw new JpegError('JpegImage.parse - unknown marker: ' + fileMarker.toString(16));
        }

        fileMarker = readUint16();
      }

      this.width = frame.samplesPerLine;
      this.height = frame.scanLines;
      this.jfif = jfif;
      this.adobe = adobe;
      this.components = [];

      for (i = 0; i < frame.components.length; i++) {
        component = frame.components[i];
        var quantizationTable = quantizationTables[component.quantizationId];

        if (quantizationTable) {
          component.quantizationTable = quantizationTable;
        }

        this.components.push({
          output: buildComponentData(frame, component),
          scaleX: component.h / frame.maxH,
          scaleY: component.v / frame.maxV,
          blocksPerLine: component.blocksPerLine,
          blocksPerColumn: component.blocksPerColumn
        });
      }

      this.numComponents = this.components.length;
      return undefined;
    },
    _getLinearizedBlockData: function _getLinearizedBlockData(width, height) {
      var isSourcePDF = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var scaleX = this.width / width,
          scaleY = this.height / height;
      var component, componentScaleX, componentScaleY, blocksPerScanline;
      var x, y, i, j, k;
      var index;
      var offset = 0;
      var output;
      var numComponents = this.components.length;
      var dataLength = width * height * numComponents;
      var data = new Uint8ClampedArray(dataLength);
      var xScaleBlockOffset = new Uint32Array(width);
      var mask3LSB = 0xfffffff8;

      for (i = 0; i < numComponents; i++) {
        component = this.components[i];
        componentScaleX = component.scaleX * scaleX;
        componentScaleY = component.scaleY * scaleY;
        offset = i;
        output = component.output;
        blocksPerScanline = component.blocksPerLine + 1 << 3;

        for (x = 0; x < width; x++) {
          j = 0 | x * componentScaleX;
          xScaleBlockOffset[x] = (j & mask3LSB) << 3 | j & 7;
        }

        for (y = 0; y < height; y++) {
          j = 0 | y * componentScaleY;
          index = blocksPerScanline * (j & mask3LSB) | (j & 7) << 3;

          for (x = 0; x < width; x++) {
            data[offset] = output[index + xScaleBlockOffset[x]];
            offset += numComponents;
          }
        }
      }

      var transform = this._decodeTransform;

      if (!isSourcePDF && numComponents === 4 && !transform) {
        transform = new Int32Array([-256, 255, -256, 255, -256, 255, -256, 255]);
      }

      if (transform) {
        for (i = 0; i < dataLength;) {
          for (j = 0, k = 0; j < numComponents; j++, i++, k += 2) {
            data[i] = (data[i] * transform[k] >> 8) + transform[k + 1];
          }
        }
      }

      return data;
    },

    get _isColorConversionNeeded() {
      if (this.adobe) {
        return !!this.adobe.transformCode;
      }

      if (this.numComponents === 3) {
        if (this._colorTransform === 0) {
          return false;
        }

        return true;
      }

      if (this._colorTransform === 1) {
        return true;
      }

      return false;
    },

    _convertYccToRgb: function convertYccToRgb(data) {
      var Y, Cb, Cr;

      for (var i = 0, length = data.length; i < length; i += 3) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = Y - 179.456 + 1.402 * Cr;
        data[i + 1] = Y + 135.459 - 0.344 * Cb - 0.714 * Cr;
        data[i + 2] = Y - 226.816 + 1.772 * Cb;
      }

      return data;
    },
    _convertYcckToRgb: function convertYcckToRgb(data) {
      var Y, Cb, Cr, k;
      var offset = 0;

      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        k = data[i + 3];
        data[offset++] = -122.67195406894 + Cb * (-6.60635669420364e-5 * Cb + 0.000437130475926232 * Cr - 5.4080610064599e-5 * Y + 0.00048449797120281 * k - 0.154362151871126) + Cr * (-0.000957964378445773 * Cr + 0.000817076911346625 * Y - 0.00477271405408747 * k + 1.53380253221734) + Y * (0.000961250184130688 * Y - 0.00266257332283933 * k + 0.48357088451265) + k * (-0.000336197177618394 * k + 0.484791561490776);
        data[offset++] = 107.268039397724 + Cb * (2.19927104525741e-5 * Cb - 0.000640992018297945 * Cr + 0.000659397001245577 * Y + 0.000426105652938837 * k - 0.176491792462875) + Cr * (-0.000778269941513683 * Cr + 0.00130872261408275 * Y + 0.000770482631801132 * k - 0.151051492775562) + Y * (0.00126935368114843 * Y - 0.00265090189010898 * k + 0.25802910206845) + k * (-0.000318913117588328 * k - 0.213742400323665);
        data[offset++] = -20.810012546947 + Cb * (-0.000570115196973677 * Cb - 2.63409051004589e-5 * Cr + 0.0020741088115012 * Y - 0.00288260236853442 * k + 0.814272968359295) + Cr * (-1.53496057440975e-5 * Cr - 0.000132689043961446 * Y + 0.000560833691242812 * k - 0.195152027534049) + Y * (0.00174418132927582 * Y - 0.00255243321439347 * k + 0.116935020465145) + k * (-0.000343531996510555 * k + 0.24165260232407);
      }

      return data.subarray(0, offset);
    },
    _convertYcckToCmyk: function convertYcckToCmyk(data) {
      var Y, Cb, Cr;

      for (var i = 0, length = data.length; i < length; i += 4) {
        Y = data[i];
        Cb = data[i + 1];
        Cr = data[i + 2];
        data[i] = 434.456 - Y - 1.402 * Cr;
        data[i + 1] = 119.541 - Y + 0.344 * Cb + 0.714 * Cr;
        data[i + 2] = 481.816 - Y - 1.772 * Cb;
      }

      return data;
    },
    _convertCmykToRgb: function convertCmykToRgb(data) {
      var c, m, y, k;
      var offset = 0;
      var scale = 1 / 255;

      for (var i = 0, length = data.length; i < length; i += 4) {
        c = data[i] * scale;
        m = data[i + 1] * scale;
        y = data[i + 2] * scale;
        k = data[i + 3] * scale;
        data[offset++] = 255 + c * (-4.387332384609988 * c + 54.48615194189176 * m + 18.82290502165302 * y + 212.25662451639585 * k - 285.2331026137004) + m * (1.7149763477362134 * m - 5.6096736904047315 * y - 17.873870861415444 * k - 5.497006427196366) + y * (-2.5217340131683033 * y - 21.248923337353073 * k + 17.5119270841813) - k * (21.86122147463605 * k + 189.48180835922747);
        data[offset++] = 255 + c * (8.841041422036149 * c + 60.118027045597366 * m + 6.871425592049007 * y + 31.159100130055922 * k - 79.2970844816548) + m * (-15.310361306967817 * m + 17.575251261109482 * y + 131.35250912493976 * k - 190.9453302588951) + y * (4.444339102852739 * y + 9.8632861493405 * k - 24.86741582555878) - k * (20.737325471181034 * k + 187.80453709719578);
        data[offset++] = 255 + c * (0.8842522430003296 * c + 8.078677503112928 * m + 30.89978309703729 * y - 0.23883238689178934 * k - 14.183576799673286) + m * (10.49593273432072 * m + 63.02378494754052 * y + 50.606957656360734 * k - 112.23884253719248) + y * (0.03296041114873217 * y + 115.60384449646641 * k - 193.58209356861505) - k * (22.33816807309886 * k + 180.12613974708367);
      }

      return data.subarray(0, offset);
    },
    getData: function getData(_ref3) {
      var width = _ref3.width,
          height = _ref3.height,
          _ref3$forceRGB = _ref3.forceRGB,
          forceRGB = _ref3$forceRGB === void 0 ? false : _ref3$forceRGB,
          _ref3$isSourcePDF = _ref3.isSourcePDF,
          isSourcePDF = _ref3$isSourcePDF === void 0 ? false : _ref3$isSourcePDF;

      if (this.numComponents > 4) {
        throw new JpegError('Unsupported color mode');
      }

      var data = this._getLinearizedBlockData(width, height, isSourcePDF);

      if (this.numComponents === 1 && forceRGB) {
        var dataLength = data.length;
        var rgbData = new Uint8ClampedArray(dataLength * 3);
        var offset = 0;

        for (var i = 0; i < dataLength; i++) {
          var grayColor = data[i];
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
          rgbData[offset++] = grayColor;
        }

        return rgbData;
      } else if (this.numComponents === 3 && this._isColorConversionNeeded) {
        return this._convertYccToRgb(data);
      } else if (this.numComponents === 4) {
        if (this._isColorConversionNeeded) {
          if (forceRGB) {
            return this._convertYcckToRgb(data);
          }

          return this._convertYcckToCmyk(data);
        } else if (forceRGB) {
          return this._convertCmykToRgb(data);
        }
      }

      return data;
    }
  };
  return JpegImage;
}();

exports.JpegImage = JpegImage;

/***/ }),
/* 162 */
/***/ (function(module, exports, __w_pdfjs_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JpxImage = void 0;

var _util = __w_pdfjs_require__(1);

var _arithmetic_decoder = __w_pdfjs_require__(159);

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var JpxError =
/*#__PURE__*/
function (_BaseException) {
  _inherits(JpxError, _BaseException);

  function JpxError(msg) {
    _classCallCheck(this, JpxError);

    return _possibleConstructorReturn(this, _getPrototypeOf(JpxError).call(this, "JPX error: ".concat(msg)));
  }

  return JpxError;
}(_util.BaseException);

var JpxImage = function JpxImageClosure() {
  var SubbandsGainLog2 = {
    'LL': 0,
    'LH': 1,
    'HL': 1,
    'HH': 2
  };

  function JpxImage() {
    this.failOnCorruptedImage = false;
  }

  JpxImage.prototype = {
    parse: function JpxImage_parse(data) {
      var head = (0, _util.readUint16)(data, 0);

      if (head === 0xFF4F) {
        this.parseCodestream(data, 0, data.length);
        return;
      }

      var position = 0,
          length = data.length;

      while (position < length) {
        var headerSize = 8;
        var lbox = (0, _util.readUint32)(data, position);
        var tbox = (0, _util.readUint32)(data, position + 4);
        position += headerSize;

        if (lbox === 1) {
          lbox = (0, _util.readUint32)(data, position) * 4294967296 + (0, _util.readUint32)(data, position + 4);
          position += 8;
          headerSize += 8;
        }

        if (lbox === 0) {
          lbox = length - position + headerSize;
        }

        if (lbox < headerSize) {
          throw new JpxError('Invalid box field size');
        }

        var dataLength = lbox - headerSize;
        var jumpDataLength = true;

        switch (tbox) {
          case 0x6A703268:
            jumpDataLength = false;
            break;

          case 0x636F6C72:
            var method = data[position];

            if (method === 1) {
              var colorspace = (0, _util.readUint32)(data, position + 3);

              switch (colorspace) {
                case 16:
                case 17:
                case 18:
                  break;

                default:
                  (0, _util.warn)('Unknown colorspace ' + colorspace);
                  break;
              }
            } else if (method === 2) {
              (0, _util.info)('ICC profile not supported');
            }

            break;

          case 0x6A703263:
            this.parseCodestream(data, position, position + dataLength);
            break;

          case 0x6A502020:
            if ((0, _util.readUint32)(data, position) !== 0x0d0a870a) {
              (0, _util.warn)('Invalid JP2 signature');
            }

            break;

          case 0x6A501A1A:
          case 0x66747970:
          case 0x72726571:
          case 0x72657320:
          case 0x69686472:
            break;

          default:
            var headerType = String.fromCharCode(tbox >> 24 & 0xFF, tbox >> 16 & 0xFF, tbox >> 8 & 0xFF, tbox & 0xFF);
            (0, _util.warn)('Unsupported header type ' + tbox + ' (' + headerType + ')');
            break;
        }

        if (jumpDataLength) {
          position += dataLength;
        }
      }
    },
    parseImageProperties: function JpxImage_parseImageProperties(stream) {
      var newByte = stream.getByte();

      while (newByte >= 0) {
        var oldByte = newByte;
        newByte = stream.getByte();
        var code = oldByte << 8 | newByte;

        if (code === 0xFF51) {
          stream.skip(4);
          var Xsiz = stream.getInt32() >>> 0;
          var Ysiz = stream.getInt32() >>> 0;
          var XOsiz = stream.getInt32() >>> 0;
          var YOsiz = stream.getInt32() >>> 0;
          stream.skip(16);
          var Csiz = stream.getUint16();
          this.width = Xsiz - XOsiz;
          this.height = Ysiz - YOsiz;
          this.componentsCount = Csiz;
          this.bitsPerComponent = 8;
          return;
        }
      }

      throw new JpxError('No size marker found in JPX stream');
    },
    parseCodestream: function JpxImage_parseCodestream(data, start, end) {
      var context = {};
      var doNotRecover = false;

      try {
        var position = start;

        while (position + 1 < end) {
          var code = (0, _util.readUint16)(data, position);
          position += 2;
          var length = 0,
              j,
              sqcd,
              spqcds,
              spqcdSize,
              scalarExpounded,
              tile;

          switch (code) {
            case 0xFF4F:
              context.mainHeader = true;
              break;

            case 0xFFD9:
              break;

            case 0xFF51:
              length = (0, _util.readUint16)(data, position);
              var siz = {};
              siz.Xsiz = (0, _util.readUint32)(data, position + 4);
              siz.Ysiz = (0, _util.readUint32)(data, position + 8);
              siz.XOsiz = (0, _util.readUint32)(data, position + 12);
              siz.YOsiz = (0, _util.readUint32)(data, position + 16);
              siz.XTsiz = (0, _util.readUint32)(data, position + 20);
              siz.YTsiz = (0, _util.readUint32)(data, position + 24);
              siz.XTOsiz = (0, _util.readUint32)(data, position + 28);
              siz.YTOsiz = (0, _util.readUint32)(data, position + 32);
              var componentsCount = (0, _util.readUint16)(data, position + 36);
              siz.Csiz = componentsCount;
              var components = [];
              j = position + 38;

              for (var i = 0; i < componentsCount; i++) {
                var component = {
                  precision: (data[j] & 0x7F) + 1,
                  isSigned: !!(data[j] & 0x80),
                  XRsiz: data[j + 1],
                  YRsiz: data[j + 2]
                };
                j += 3;
                calculateComponentDimensions(component, siz);
                components.push(component);
              }

              context.SIZ = siz;
              context.components = components;
              calculateTileGrids(context, components);
              context.QCC = [];
              context.COC = [];
              break;

            case 0xFF5C:
              length = (0, _util.readUint16)(data, position);
              var qcd = {};
              j = position + 2;
              sqcd = data[j++];

              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;

                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;

                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;

                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }

              qcd.noQuantization = spqcdSize === 8;
              qcd.scalarExpounded = scalarExpounded;
              qcd.guardBits = sqcd >> 5;
              spqcds = [];

              while (j < length + position) {
                var spqcd = {};

                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }

                spqcds.push(spqcd);
              }

              qcd.SPqcds = spqcds;

              if (context.mainHeader) {
                context.QCD = qcd;
              } else {
                context.currentTile.QCD = qcd;
                context.currentTile.QCC = [];
              }

              break;

            case 0xFF5D:
              length = (0, _util.readUint16)(data, position);
              var qcc = {};
              j = position + 2;
              var cqcc;

              if (context.SIZ.Csiz < 257) {
                cqcc = data[j++];
              } else {
                cqcc = (0, _util.readUint16)(data, j);
                j += 2;
              }

              sqcd = data[j++];

              switch (sqcd & 0x1F) {
                case 0:
                  spqcdSize = 8;
                  scalarExpounded = true;
                  break;

                case 1:
                  spqcdSize = 16;
                  scalarExpounded = false;
                  break;

                case 2:
                  spqcdSize = 16;
                  scalarExpounded = true;
                  break;

                default:
                  throw new Error('Invalid SQcd value ' + sqcd);
              }

              qcc.noQuantization = spqcdSize === 8;
              qcc.scalarExpounded = scalarExpounded;
              qcc.guardBits = sqcd >> 5;
              spqcds = [];

              while (j < length + position) {
                spqcd = {};

                if (spqcdSize === 8) {
                  spqcd.epsilon = data[j++] >> 3;
                  spqcd.mu = 0;
                } else {
                  spqcd.epsilon = data[j] >> 3;
                  spqcd.mu = (data[j] & 0x7) << 8 | data[j + 1];
                  j += 2;
                }

                spqcds.push(spqcd);
              }

              qcc.SPqcds = spqcds;

              if (context.mainHeader) {
                context.QCC[cqcc] = qcc;
              } else {
                context.currentTile.QCC[cqcc] = qcc;
              }

              break;

            case 0xFF52:
              length = (0, _util.readUint16)(data, position);
              var cod = {};
              j = position + 2;
              var scod = data[j++];
              cod.entropyCoderWithCustomPrecincts = !!(scod & 1);
              cod.sopMarkerUsed = !!(scod & 2);
              cod.ephMarkerUsed = !!(scod & 4);
              cod.progressionOrder = data[j++];
              cod.layersCount = (0, _util.readUint16)(data, j);
              j += 2;
              cod.multipleComponentTransform = data[j++];
              cod.decompositionLevelsCount = data[j++];
              cod.xcb = (data[j++] & 0xF) + 2;
              cod.ycb = (data[j++] & 0xF) + 2;
              var blockStyle = data[j++];
              cod.selectiveArithmeticCodingBypass = !!(blockStyle & 1);
              cod.resetContextProbabilities = !!(blockStyle & 2);
              cod.terminationOnEachCodingPass = !!(blockStyle & 4);
              cod.verticallyStripe = !!(blockStyle & 8);
              cod.predictableTermination = !!(blockStyle & 16);
              cod.segmentationSymbolUsed = !!(blockStyle & 32);
              cod.reversibleTransformation = data[j++];

              if (cod.entropyCoderWithCustomPrecincts) {
                var precinctsSizes = [];

                while (j < length + position) {
                  var precinctsSize = data[j++];
                  precinctsSizes.push({
                    PPx: precinctsSize & 0xF,
                    PPy: precinctsSize >> 4
                  });
                }

                cod.precinctsSizes = precinctsSizes;
              }

              var unsupported = [];

              if (cod.selectiveArithmeticCodingBypass) {
                unsupported.push('selectiveArithmeticCodingBypass');
              }

              if (cod.resetContextProbabilities) {
                unsupported.push('resetContextProbabilities');
              }

              if (cod.terminationOnEachCodingPass) {
                unsupported.push('terminationOnEachCodingPass');
              }

              if (cod.verticallyStripe) {
                unsupported.push('verticallyStripe');
              }

              if (cod.predictableTermination) {
                unsupported.push('predictableTermination');
              }

              if (unsupported.length > 0) {
                doNotRecover = true;
                throw new Error('Unsupported COD options (' + unsupported.join(', ') + ')');
              }

              if (context.mainHeader) {
                context.COD = cod;
              } else {
                context.currentTile.COD = cod;
                context.currentTile.COC = [];
              }

              break;

            case 0xFF90:
              length = (0, _util.readUint16)(data, position);
              tile = {};
              tile.index = (0, _util.readUint16)(data, position + 2);
              tile.length = (0, _util.readUint32)(data, position + 4);
              tile.dataEnd = tile.length + position - 2;
              tile.partIndex = data[position + 8];
              tile.partsCount = data[position + 9];
              context.mainHeader = false;

              if (tile.partIndex === 0) {
                tile.COD = context.COD;
                tile.COC = context.COC.slice(0);
                tile.QCD = context.QCD;
                tile.QCC = context.QCC.slice(0);
              }

              context.currentTile = tile;
              break;

            case 0xFF93:
              tile = context.currentTile;

              if (tile.partIndex === 0) {
                initializeTile(context, tile.index);
                buildPackets(context);
              }

              length = tile.dataEnd - position;
              parseTilePackets(context, data, position, length);
              break;

            case 0xFF55:
            case 0xFF57:
            case 0xFF58:
            case 0xFF64:
              length = (0, _util.readUint16)(data, position);
              break;

            case 0xFF53:
              throw new Error('Codestream code 0xFF53 (COC) is ' + 'not implemented');

            default:
              throw new Error('Unknown codestream code: ' + code.toString(16));
          }

          position += length;
        }
      } catch (e) {
        if (doNotRecover || this.failOnCorruptedImage) {
          throw new JpxError(e.message);
        } else {
          (0, _util.warn)('JPX: Trying to recover from: ' + e.message);
        }
      }

      this.tiles = transformComponents(context);
      this.width = context.SIZ.Xsiz - context.SIZ.XOsiz;
      this.height = context.SIZ.Ysiz - context.SIZ.YOsiz;
      this.componentsCount = context.SIZ.Csiz;
    }
  };

  function calculateComponentDimensions(component, siz) {
    component.x0 = Math.ceil(siz.XOsiz / component.XRsiz);
    component.x1 = Math.ceil(siz.Xsiz / component.XRsiz);
    component.y0 = Math.ceil(siz.YOsiz / component.YRsiz);
    component.y1 = Math.ceil(siz.Ysiz / component.YRsiz);
    component.width = component.x1 - component.x0;
    component.height = component.y1 - component.y0;
  }

  function calculateTileGrids(context, components) {
    var siz = context.SIZ;
    var tile,
        tiles = [];
    var numXtiles = Math.ceil((siz.Xsiz - siz.XTOsiz) / siz.XTsiz);
    var numYtiles = Math.ceil((siz.Ysiz - siz.YTOsiz) / siz.YTsiz);

    for (var q = 0; q < numYtiles; q++) {
      for (var p = 0; p < numXtiles; p++) {
        tile = {};
        tile.tx0 = Math.max(siz.XTOsiz + p * siz.XTsiz, siz.XOsiz);
        tile.ty0 = Math.max(siz.YTOsiz + q * siz.YTsiz, siz.YOsiz);
        tile.tx1 = Math.min(siz.XTOsiz + (p + 1) * siz.XTsiz, siz.Xsiz);
        tile.ty1 = Math.min(siz.YTOsiz + (q + 1) * siz.YTsiz, siz.Ysiz);
        tile.width = tile.tx1 - tile.tx0;
        tile.height = tile.ty1 - tile.ty0;
        tile.components = [];
        tiles.push(tile);
      }
    }

    context.tiles = tiles;
    var componentsCount = siz.Csiz;

    for (var i = 0, ii = componentsCount; i < ii; i++) {
      var component = components[i];

      for (var j = 0, jj = tiles.length; j < jj; j++) {
        var tileComponent = {};
        tile = tiles[j];
        tileComponent.tcx0 = Math.ceil(tile.tx0 / component.XRsiz);
        tileComponent.tcy0 = Math.ceil(tile.ty0 / component.YRsiz);
        tileComponent.tcx1 = Math.ceil(tile.tx1 / component.XRsiz);
        tileComponent.tcy1 = Math.ceil(tile.ty1 / component.YRsiz);
        tileComponent.width = tileComponent.tcx1 - tileComponent.tcx0;
        tileComponent.height = tileComponent.tcy1 - tileComponent.tcy0;
        tile.components[i] = tileComponent;
      }
    }
  }

  function getBlocksDimensions(context, component, r) {
    var codOrCoc = component.codingStyleParameters;
    var result = {};

    if (!codOrCoc.entropyCoderWithCustomPrecincts) {
      result.PPx = 15;
      result.PPy = 15;
    } else {
      result.PPx = codOrCoc.precinctsSizes[r].PPx;
      result.PPy = codOrCoc.precinctsSizes[r].PPy;
    }

    result.xcb_ = r > 0 ? Math.min(codOrCoc.xcb, result.PPx - 1) : Math.min(codOrCoc.xcb, result.PPx);
    result.ycb_ = r > 0 ? Math.min(codOrCoc.ycb, result.PPy - 1) : Math.min(codOrCoc.ycb, result.PPy);
    return result;
  }

  function buildPrecincts(context, resolution, dimensions) {
    var precinctWidth = 1 << dimensions.PPx;
    var precinctHeight = 1 << dimensions.PPy;
    var isZeroRes = resolution.resLevel === 0;
    var precinctWidthInSubband = 1 << dimensions.PPx + (isZeroRes ? 0 : -1);
    var precinctHeightInSubband = 1 << dimensions.PPy + (isZeroRes ? 0 : -1);
    var numprecinctswide = resolution.trx1 > resolution.trx0 ? Math.ceil(resolution.trx1 / precinctWidth) - Math.floor(resolution.trx0 / precinctWidth) : 0;
    var numprecinctshigh = resolution.try1 > resolution.try0 ? Math.ceil(resolution.try1 / precinctHeight) - Math.floor(resolution.try0 / precinctHeight) : 0;
    var numprecincts = numprecinctswide * numprecinctshigh;
    resolution.precinctParameters = {
      precinctWidth: precinctWidth,
      precinctHeight: precinctHeight,
      numprecinctswide: numprecinctswide,
      numprecinctshigh: numprecinctshigh,
      numprecincts: numprecincts,
      precinctWidthInSubband: precinctWidthInSubband,
      precinctHeightInSubband: precinctHeightInSubband
    };
  }

  function buildCodeblocks(context, subband, dimensions) {
    var xcb_ = dimensions.xcb_;
    var ycb_ = dimensions.ycb_;
    var codeblockWidth = 1 << xcb_;
    var codeblockHeight = 1 << ycb_;
    var cbx0 = subband.tbx0 >> xcb_;
    var cby0 = subband.tby0 >> ycb_;
    var cbx1 = subband.tbx1 + codeblockWidth - 1 >> xcb_;
    var cby1 = subband.tby1 + codeblockHeight - 1 >> ycb_;
    var precinctParameters = subband.resolution.precinctParameters;
    var codeblocks = [];
    var precincts = [];
    var i, j, codeblock, precinctNumber;

    for (j = cby0; j < cby1; j++) {
      for (i = cbx0; i < cbx1; i++) {
        codeblock = {
          cbx: i,
          cby: j,
          tbx0: codeblockWidth * i,
          tby0: codeblockHeight * j,
          tbx1: codeblockWidth * (i + 1),
          tby1: codeblockHeight * (j + 1)
        };
        codeblock.tbx0_ = Math.max(subband.tbx0, codeblock.tbx0);
        codeblock.tby0_ = Math.max(subband.tby0, codeblock.tby0);
        codeblock.tbx1_ = Math.min(subband.tbx1, codeblock.tbx1);
        codeblock.tby1_ = Math.min(subband.tby1, codeblock.tby1);
        var pi = Math.floor((codeblock.tbx0_ - subband.tbx0) / precinctParameters.precinctWidthInSubband);
        var pj = Math.floor((codeblock.tby0_ - subband.tby0) / precinctParameters.precinctHeightInSubband);
        precinctNumber = pi + pj * precinctParameters.numprecinctswide;
        codeblock.precinctNumber = precinctNumber;
        codeblock.subbandType = subband.type;
        codeblock.Lblock = 3;

        if (codeblock.tbx1_ <= codeblock.tbx0_ || codeblock.tby1_ <= codeblock.tby0_) {
          continue;
        }

        codeblocks.push(codeblock);
        var precinct = precincts[precinctNumber];

        if (precinct !== undefined) {
          if (i < precinct.cbxMin) {
            precinct.cbxMin = i;
          } else if (i > precinct.cbxMax) {
            precinct.cbxMax = i;
          }

          if (j < precinct.cbyMin) {
            precinct.cbxMin = j;
          } else if (j > precinct.cbyMax) {
            precinct.cbyMax = j;
          }
        } else {
          precincts[precinctNumber] = precinct = {
            cbxMin: i,
            cbyMin: j,
            cbxMax: i,
            cbyMax: j
          };
        }

        codeblock.precinct = precinct;
      }
    }

    subband.codeblockParameters = {
      codeblockWidth: xcb_,
      codeblockHeight: ycb_,
      numcodeblockwide: cbx1 - cbx0 + 1,
      numcodeblockhigh: cby1 - cby0 + 1
    };
    subband.codeblocks = codeblocks;
    subband.precincts = precincts;
  }

  function createPacket(resolution, precinctNumber, layerNumber) {
    var precinctCodeblocks = [];
    var subbands = resolution.subbands;

    for (var i = 0, ii = subbands.length; i < ii; i++) {
      var subband = subbands[i];
      var codeblocks = subband.codeblocks;

      for (var j = 0, jj = codeblocks.length; j < jj; j++) {
        var codeblock = codeblocks[j];

        if (codeblock.precinctNumber !== precinctNumber) {
          continue;
        }

        precinctCodeblocks.push(codeblock);
      }
    }

    return {
      layerNumber: layerNumber,
      codeblocks: precinctCodeblocks
    };
  }

  function LayerResolutionComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;

    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }

    var l = 0,
        r = 0,
        i = 0,
        k = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      for (; l < layersCount; l++) {
        for (; r <= maxDecompositionLevelsCount; r++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];

            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }

            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;

            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }

            k = 0;
          }

          i = 0;
        }

        r = 0;
      }

      throw new JpxError('Out of packets');
    };
  }

  function ResolutionLayerComponentPositionIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var maxDecompositionLevelsCount = 0;

    for (var q = 0; q < componentsCount; q++) {
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, tile.components[q].codingStyleParameters.decompositionLevelsCount);
    }

    var r = 0,
        l = 0,
        i = 0,
        k = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; l < layersCount; l++) {
          for (; i < componentsCount; i++) {
            var component = tile.components[i];

            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }

            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;

            for (; k < numprecincts;) {
              var packet = createPacket(resolution, k, l);
              k++;
              return packet;
            }

            k = 0;
          }

          i = 0;
        }

        l = 0;
      }

      throw new JpxError('Out of packets');
    };
  }

  function ResolutionPositionComponentLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var l, r, c, p;
    var maxDecompositionLevelsCount = 0;

    for (c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      maxDecompositionLevelsCount = Math.max(maxDecompositionLevelsCount, component.codingStyleParameters.decompositionLevelsCount);
    }

    var maxNumPrecinctsInLevel = new Int32Array(maxDecompositionLevelsCount + 1);

    for (r = 0; r <= maxDecompositionLevelsCount; ++r) {
      var maxNumPrecincts = 0;

      for (c = 0; c < componentsCount; ++c) {
        var resolutions = tile.components[c].resolutions;

        if (r < resolutions.length) {
          maxNumPrecincts = Math.max(maxNumPrecincts, resolutions[r].precinctParameters.numprecincts);
        }
      }

      maxNumPrecinctsInLevel[r] = maxNumPrecincts;
    }

    l = 0;
    r = 0;
    c = 0;
    p = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      for (; r <= maxDecompositionLevelsCount; r++) {
        for (; p < maxNumPrecinctsInLevel[r]; p++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];

            if (r > component.codingStyleParameters.decompositionLevelsCount) {
              continue;
            }

            var resolution = component.resolutions[r];
            var numprecincts = resolution.precinctParameters.numprecincts;

            if (p >= numprecincts) {
              continue;
            }

            for (; l < layersCount;) {
              var packet = createPacket(resolution, p, l);
              l++;
              return packet;
            }

            l = 0;
          }

          c = 0;
        }

        p = 0;
      }

      throw new JpxError('Out of packets');
    };
  }

  function PositionComponentResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var precinctsIterationSizes = precinctsSizes;
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      for (; py < precinctsIterationSizes.maxNumHigh; py++) {
        for (; px < precinctsIterationSizes.maxNumWide; px++) {
          for (; c < componentsCount; c++) {
            var component = tile.components[c];
            var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;

            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsSizes.components[c].resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);

              if (k === null) {
                continue;
              }

              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }

              l = 0;
            }

            r = 0;
          }

          c = 0;
        }

        px = 0;
      }

      throw new JpxError('Out of packets');
    };
  }

  function ComponentPositionResolutionLayerIterator(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var layersCount = tile.codingStyleDefaultParameters.layersCount;
    var componentsCount = siz.Csiz;
    var precinctsSizes = getPrecinctSizesInImageScale(tile);
    var l = 0,
        r = 0,
        c = 0,
        px = 0,
        py = 0;

    this.nextPacket = function JpxImage_nextPacket() {
      for (; c < componentsCount; ++c) {
        var component = tile.components[c];
        var precinctsIterationSizes = precinctsSizes.components[c];
        var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;

        for (; py < precinctsIterationSizes.maxNumHigh; py++) {
          for (; px < precinctsIterationSizes.maxNumWide; px++) {
            for (; r <= decompositionLevelsCount; r++) {
              var resolution = component.resolutions[r];
              var sizeInImageScale = precinctsIterationSizes.resolutions[r];
              var k = getPrecinctIndexIfExist(px, py, sizeInImageScale, precinctsIterationSizes, resolution);

              if (k === null) {
                continue;
              }

              for (; l < layersCount;) {
                var packet = createPacket(resolution, k, l);
                l++;
                return packet;
              }

              l = 0;
            }

            r = 0;
          }

          px = 0;
        }

        py = 0;
      }

      throw new JpxError('Out of packets');
    };
  }

  function getPrecinctIndexIfExist(pxIndex, pyIndex, sizeInImageScale, precinctIterationSizes, resolution) {
    var posX = pxIndex * precinctIterationSizes.minWidth;
    var posY = pyIndex * precinctIterationSizes.minHeight;

    if (posX % sizeInImageScale.width !== 0 || posY % sizeInImageScale.height !== 0) {
      return null;
    }

    var startPrecinctRowIndex = posY / sizeInImageScale.width * resolution.precinctParameters.numprecinctswide;
    return posX / sizeInImageScale.height + startPrecinctRowIndex;
  }

  function getPrecinctSizesInImageScale(tile) {
    var componentsCount = tile.components.length;
    var minWidth = Number.MAX_VALUE;
    var minHeight = Number.MAX_VALUE;
    var maxNumWide = 0;
    var maxNumHigh = 0;
    var sizePerComponent = new Array(componentsCount);

    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var sizePerResolution = new Array(decompositionLevelsCount + 1);
      var minWidthCurrentComponent = Number.MAX_VALUE;
      var minHeightCurrentComponent = Number.MAX_VALUE;
      var maxNumWideCurrentComponent = 0;
      var maxNumHighCurrentComponent = 0;
      var scale = 1;

      for (var r = decompositionLevelsCount; r >= 0; --r) {
        var resolution = component.resolutions[r];
        var widthCurrentResolution = scale * resolution.precinctParameters.precinctWidth;
        var heightCurrentResolution = scale * resolution.precinctParameters.precinctHeight;
        minWidthCurrentComponent = Math.min(minWidthCurrentComponent, widthCurrentResolution);
        minHeightCurrentComponent = Math.min(minHeightCurrentComponent, heightCurrentResolution);
        maxNumWideCurrentComponent = Math.max(maxNumWideCurrentComponent, resolution.precinctParameters.numprecinctswide);
        maxNumHighCurrentComponent = Math.max(maxNumHighCurrentComponent, resolution.precinctParameters.numprecinctshigh);
        sizePerResolution[r] = {
          width: widthCurrentResolution,
          height: heightCurrentResolution
        };
        scale <<= 1;
      }

      minWidth = Math.min(minWidth, minWidthCurrentComponent);
      minHeight = Math.min(minHeight, minHeightCurrentComponent);
      maxNumWide = Math.max(maxNumWide, maxNumWideCurrentComponent);
      maxNumHigh = Math.max(maxNumHigh, maxNumHighCurrentComponent);
      sizePerComponent[c] = {
        resolutions: sizePerResolution,
        minWidth: minWidthCurrentComponent,
        minHeight: minHeightCurrentComponent,
        maxNumWide: maxNumWideCurrentComponent,
        maxNumHigh: maxNumHighCurrentComponent
      };
    }

    return {
      components: sizePerComponent,
      minWidth: minWidth,
      minHeight: minHeight,
      maxNumWide: maxNumWide,
      maxNumHigh: maxNumHigh
    };
  }

  function buildPackets(context) {
    var siz = context.SIZ;
    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var componentsCount = siz.Csiz;

    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var decompositionLevelsCount = component.codingStyleParameters.decompositionLevelsCount;
      var resolutions = [];
      var subbands = [];

      for (var r = 0; r <= decompositionLevelsCount; r++) {
        var blocksDimensions = getBlocksDimensions(context, component, r);
        var resolution = {};
        var scale = 1 << decompositionLevelsCount - r;
        resolution.trx0 = Math.ceil(component.tcx0 / scale);
        resolution.try0 = Math.ceil(component.tcy0 / scale);
        resolution.trx1 = Math.ceil(component.tcx1 / scale);
        resolution.try1 = Math.ceil(component.tcy1 / scale);
        resolution.resLevel = r;
        buildPrecincts(context, resolution, blocksDimensions);
        resolutions.push(resolution);
        var subband;

        if (r === 0) {
          subband = {};
          subband.type = 'LL';
          subband.tbx0 = Math.ceil(component.tcx0 / scale);
          subband.tby0 = Math.ceil(component.tcy0 / scale);
          subband.tbx1 = Math.ceil(component.tcx1 / scale);
          subband.tby1 = Math.ceil(component.tcy1 / scale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolution.subbands = [subband];
        } else {
          var bscale = 1 << decompositionLevelsCount - r + 1;
          var resolutionSubbands = [];
          subband = {};
          subband.type = 'HL';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'LH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          subband = {};
          subband.type = 'HH';
          subband.tbx0 = Math.ceil(component.tcx0 / bscale - 0.5);
          subband.tby0 = Math.ceil(component.tcy0 / bscale - 0.5);
          subband.tbx1 = Math.ceil(component.tcx1 / bscale - 0.5);
          subband.tby1 = Math.ceil(component.tcy1 / bscale - 0.5);
          subband.resolution = resolution;
          buildCodeblocks(context, subband, blocksDimensions);
          subbands.push(subband);
          resolutionSubbands.push(subband);
          resolution.subbands = resolutionSubbands;
        }
      }

      component.resolutions = resolutions;
      component.subbands = subbands;
    }

    var progressionOrder = tile.codingStyleDefaultParameters.progressionOrder;

    switch (progressionOrder) {
      case 0:
        tile.packetsIterator = new LayerResolutionComponentPositionIterator(context);
        break;

      case 1:
        tile.packetsIterator = new ResolutionLayerComponentPositionIterator(context);
        break;

      case 2:
        tile.packetsIterator = new ResolutionPositionComponentLayerIterator(context);
        break;

      case 3:
        tile.packetsIterator = new PositionComponentResolutionLayerIterator(context);
        break;

      case 4:
        tile.packetsIterator = new ComponentPositionResolutionLayerIterator(context);
        break;

      default:
        throw new JpxError("Unsupported progression order ".concat(progressionOrder));
    }
  }

  function parseTilePackets(context, data, offset, dataLength) {
    var position = 0;
    var buffer,
        bufferSize = 0,
        skipNextBit = false;

    function readBits(count) {
      while (bufferSize < count) {
        var b = data[offset + position];
        position++;

        if (skipNextBit) {
          buffer = buffer << 7 | b;
          bufferSize += 7;
          skipNextBit = false;
        } else {
          buffer = buffer << 8 | b;
          bufferSize += 8;
        }

        if (b === 0xFF) {
          skipNextBit = true;
        }
      }

      bufferSize -= count;
      return buffer >>> bufferSize & (1 << count) - 1;
    }

    function skipMarkerIfEqual(value) {
      if (data[offset + position - 1] === 0xFF && data[offset + position] === value) {
        skipBytes(1);
        return true;
      } else if (data[offset + position] === 0xFF && data[offset + position + 1] === value) {
        skipBytes(2);
        return true;
      }

      return false;
    }

    function skipBytes(count) {
      position += count;
    }

    function alignToByte() {
      bufferSize = 0;

      if (skipNextBit) {
        position++;
        skipNextBit = false;
      }
    }

    function readCodingpasses() {
      if (readBits(1) === 0) {
        return 1;
      }

      if (readBits(1) === 0) {
        return 2;
      }

      var value = readBits(2);

      if (value < 3) {
        return value + 3;
      }

      value = readBits(5);

      if (value < 31) {
        return value + 6;
      }

      value = readBits(7);
      return value + 37;
    }

    var tileIndex = context.currentTile.index;
    var tile = context.tiles[tileIndex];
    var sopMarkerUsed = context.COD.sopMarkerUsed;
    var ephMarkerUsed = context.COD.ephMarkerUsed;
    var packetsIterator = tile.packetsIterator;

    while (position < dataLength) {
      alignToByte();

      if (sopMarkerUsed && skipMarkerIfEqual(0x91)) {
        skipBytes(4);
      }

      var packet = packetsIterator.nextPacket();

      if (!readBits(1)) {
        continue;
      }

      var layerNumber = packet.layerNumber;
      var queue = [],
          codeblock;

      for (var i = 0, ii = packet.codeblocks.length; i < ii; i++) {
        codeblock = packet.codeblocks[i];
        var precinct = codeblock.precinct;
        var codeblockColumn = codeblock.cbx - precinct.cbxMin;
        var codeblockRow = codeblock.cby - precinct.cbyMin;
        var codeblockIncluded = false;
        var firstTimeInclusion = false;
        var valueReady;

        if (codeblock['included'] !== undefined) {
          codeblockIncluded = !!readBits(1);
        } else {
          precinct = codeblock.precinct;
          var inclusionTree, zeroBitPlanesTree;

          if (precinct['inclusionTree'] !== undefined) {
            inclusionTree = precinct.inclusionTree;
          } else {
            var width = precinct.cbxMax - precinct.cbxMin + 1;
            var height = precinct.cbyMax - precinct.cbyMin + 1;
            inclusionTree = new InclusionTree(width, height, layerNumber);
            zeroBitPlanesTree = new TagTree(width, height);
            precinct.inclusionTree = inclusionTree;
            precinct.zeroBitPlanesTree = zeroBitPlanesTree;
          }

          if (inclusionTree.reset(codeblockColumn, codeblockRow, layerNumber)) {
            while (true) {
              if (readBits(1)) {
                valueReady = !inclusionTree.nextLevel();

                if (valueReady) {
                  codeblock.included = true;
                  codeblockIncluded = firstTimeInclusion = true;
                  break;
                }
              } else {
                inclusionTree.incrementValue(layerNumber);
                break;
              }
            }
          }
        }

        if (!codeblockIncluded) {
          continue;
        }

        if (firstTimeInclusion) {
          zeroBitPlanesTree = precinct.zeroBitPlanesTree;
          zeroBitPlanesTree.reset(codeblockColumn, codeblockRow);

          while (true) {
            if (readBits(1)) {
              valueReady = !zeroBitPlanesTree.nextLevel();

              if (valueReady) {
                break;
              }
            } else {
              zeroBitPlanesTree.incrementValue();
            }
          }

          codeblock.zeroBitPlanes = zeroBitPlanesTree.value;
        }

        var codingpasses = readCodingpasses();

        while (readBits(1)) {
          codeblock.Lblock++;
        }

        var codingpassesLog2 = (0, _util.log2)(codingpasses);
        var bits = (codingpasses < 1 << codingpassesLog2 ? codingpassesLog2 - 1 : codingpassesLog2) + codeblock.Lblock;
        var codedDataLength = readBits(bits);
        queue.push({
          codeblock: codeblock,
          codingpasses: codingpasses,
          dataLength: codedDataLength
        });
      }

      alignToByte();

      if (ephMarkerUsed) {
        skipMarkerIfEqual(0x92);
      }

      while (queue.length > 0) {
        var packetItem = queue.shift();
        codeblock = packetItem.codeblock;

        if (codeblock['data'] === undefined) {
          codeblock.data = [];
        }

        codeblock.data.push({
          data: data,
          start: offset + position,
          end: offset + position + packetItem.dataLength,
          codingpasses: packetItem.codingpasses
        });
        position += packetItem.dataLength;
      }
    }

    return position;
  }

  function copyCoefficients(coefficients, levelWidth, levelHeight, subband, delta, mb, reversible, segmentationSymbolUsed) {
    var x0 = subband.tbx0;
    var y0 = subband.tby0;
    var width = subband.tbx1 - subband.tbx0;
    var codeblocks = subband.codeblocks;
    var right = subband.type.charAt(0) === 'H' ? 1 : 0;
    var bottom = subband.type.charAt(1) === 'H' ? levelWidth : 0;

    for (var i = 0, ii = codeblocks.length; i < ii; ++i) {
      var codeblock = codeblocks[i];
      var blockWidth = codeblock.tbx1_ - codeblock.tbx0_;
      var blockHeight = codeblock.tby1_ - codeblock.tby0_;

      if (blockWidth === 0 || blockHeight === 0) {
        continue;
      }

      if (codeblock['data'] === undefined) {
        continue;
      }

      var bitModel, currentCodingpassType;
      bitModel = new BitModel(blockWidth, blockHeight, codeblock.subbandType, codeblock.zeroBitPlanes, mb);
      currentCodingpassType = 2;
      var data = codeblock.data,
          totalLength = 0,
          codingpasses = 0;
      var j, jj, dataItem;

      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        totalLength += dataItem.end - dataItem.start;
        codingpasses += dataItem.codingpasses;
      }

      var encodedData = new Uint8Array(totalLength);
      var position = 0;

      for (j = 0, jj = data.length; j < jj; j++) {
        dataItem = data[j];
        var chunk = dataItem.data.subarray(dataItem.start, dataItem.end);
        encodedData.set(chunk, position);
        position += chunk.length;
      }

      var decoder = new _arithmetic_decoder.ArithmeticDecoder(encodedData, 0, totalLength);
      bitModel.setDecoder(decoder);

      for (j = 0; j < codingpasses; j++) {
        switch (currentCodingpassType) {
          case 0:
            bitModel.runSignificancePropagationPass();
            break;

          case 1:
            bitModel.runMagnitudeRefinementPass();
            break;

          case 2:
            bitModel.runCleanupPass();

            if (segmentationSymbolUsed) {
              bitModel.checkSegmentationSymbol();
            }

            break;
        }

        currentCodingpassType = (currentCodingpassType + 1) % 3;
      }

      var offset = codeblock.tbx0_ - x0 + (codeblock.tby0_ - y0) * width;
      var sign = bitModel.coefficentsSign;
      var magnitude = bitModel.coefficentsMagnitude;
      var bitsDecoded = bitModel.bitsDecoded;
      var magnitudeCorrection = reversible ? 0 : 0.5;
      var k, n, nb;
      position = 0;
      var interleave = subband.type !== 'LL';

      for (j = 0; j < blockHeight; j++) {
        var row = offset / width | 0;
        var levelOffset = 2 * row * (levelWidth - width) + right + bottom;

        for (k = 0; k < blockWidth; k++) {
          n = magnitude[position];

          if (n !== 0) {
            n = (n + magnitudeCorrection) * delta;

            if (sign[position] !== 0) {
              n = -n;
            }

            nb = bitsDecoded[position];
            var pos = interleave ? levelOffset + (offset << 1) : offset;

            if (reversible && nb >= mb) {
              coefficients[pos] = n;
            } else {
              coefficients[pos] = n * (1 << mb - nb);
            }
          }

          offset++;
          position++;
        }

        offset += width - blockWidth;
      }
    }
  }

  function transformTile(context, tile, c) {
    var component = tile.components[c];
    var codingStyleParameters = component.codingStyleParameters;
    var quantizationParameters = component.quantizationParameters;
    var decompositionLevelsCount = codingStyleParameters.decompositionLevelsCount;
    var spqcds = quantizationParameters.SPqcds;
    var scalarExpounded = quantizationParameters.scalarExpounded;
    var guardBits = quantizationParameters.guardBits;
    var segmentationSymbolUsed = codingStyleParameters.segmentationSymbolUsed;
    var precision = context.components[c].precision;
    var reversible = codingStyleParameters.reversibleTransformation;
    var transform = reversible ? new ReversibleTransform() : new IrreversibleTransform();
    var subbandCoefficients = [];
    var b = 0;

    for (var i = 0; i <= decompositionLevelsCount; i++) {
      var resolution = component.resolutions[i];
      var width = resolution.trx1 - resolution.trx0;
      var height = resolution.try1 - resolution.try0;
      var coefficients = new Float32Array(width * height);

      for (var j = 0, jj = resolution.subbands.length; j < jj; j++) {
        var mu, epsilon;

        if (!scalarExpounded) {
          mu = spqcds[0].mu;
          epsilon = spqcds[0].epsilon + (i > 0 ? 1 - i : 0);
        } else {
          mu = spqcds[b].mu;
          epsilon = spqcds[b].epsilon;
          b++;
        }

        var subband = resolution.subbands[j];
        var gainLog2 = SubbandsGainLog2[subband.type];
        var delta = reversible ? 1 : Math.pow(2, precision + gainLog2 - epsilon) * (1 + mu / 2048);
        var mb = guardBits + epsilon - 1;
        copyCoefficients(coefficients, width, height, subband, delta, mb, reversible, segmentationSymbolUsed);
      }

      subbandCoefficients.push({
        width: width,
        height: height,
        items: coefficients
      });
    }

    var result = transform.calculate(subbandCoefficients, component.tcx0, component.tcy0);
    return {
      left: component.tcx0,
      top: component.tcy0,
      width: result.width,
      height: result.height,
      items: result.items
    };
  }

  function transformComponents(context) {
    var siz = context.SIZ;
    var components = context.components;
    var componentsCount = siz.Csiz;
    var resultImages = [];

    for (var i = 0, ii = context.tiles.length; i < ii; i++) {
      var tile = context.tiles[i];
      var transformedTiles = [];
      var c;

      for (c = 0; c < componentsCount; c++) {
        transformedTiles[c] = transformTile(context, tile, c);
      }

      var tile0 = transformedTiles[0];
      var out = new Uint8ClampedArray(tile0.items.length * componentsCount);
      var result = {
        left: tile0.left,
        top: tile0.top,
        width: tile0.width,
        height: tile0.height,
        items: out
      };
      var shift, offset;
      var pos = 0,
          j,
          jj,
          y0,
          y1,
          y2;

      if (tile.codingStyleDefaultParameters.multipleComponentTransform) {
        var fourComponents = componentsCount === 4;
        var y0items = transformedTiles[0].items;
        var y1items = transformedTiles[1].items;
        var y2items = transformedTiles[2].items;
        var y3items = fourComponents ? transformedTiles[3].items : null;
        shift = components[0].precision - 8;
        offset = (128 << shift) + 0.5;
        var component0 = tile.components[0];
        var alpha01 = componentsCount - 3;
        jj = y0items.length;

        if (!component0.codingStyleParameters.reversibleTransformation) {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            out[pos++] = y0 + 1.402 * y2 >> shift;
            out[pos++] = y0 - 0.34413 * y1 - 0.71414 * y2 >> shift;
            out[pos++] = y0 + 1.772 * y1 >> shift;
          }
        } else {
          for (j = 0; j < jj; j++, pos += alpha01) {
            y0 = y0items[j] + offset;
            y1 = y1items[j];
            y2 = y2items[j];
            var g = y0 - (y2 + y1 >> 2);
            out[pos++] = g + y2 >> shift;
            out[pos++] = g >> shift;
            out[pos++] = g + y1 >> shift;
          }
        }

        if (fourComponents) {
          for (j = 0, pos = 3; j < jj; j++, pos += 4) {
            out[pos] = y3items[j] + offset >> shift;
          }
        }
      } else {
        for (c = 0; c < componentsCount; c++) {
          var items = transformedTiles[c].items;
          shift = components[c].precision - 8;
          offset = (128 << shift) + 0.5;

          for (pos = c, j = 0, jj = items.length; j < jj; j++) {
            out[pos] = items[j] + offset >> shift;
            pos += componentsCount;
          }
        }
      }

      resultImages.push(result);
    }

    return resultImages;
  }

  function initializeTile(context, tileIndex) {
    var siz = context.SIZ;
    var componentsCount = siz.Csiz;
    var tile = context.tiles[tileIndex];

    for (var c = 0; c < componentsCount; c++) {
      var component = tile.components[c];
      var qcdOrQcc = context.currentTile.QCC[c] !== undefined ? context.currentTile.QCC[c] : context.currentTile.QCD;
      component.quantizationParameters = qcdOrQcc;
      var codOrCoc = context.currentTile.COC[c] !== undefined ? context.currentTile.COC[c] : context.currentTile.COD;
      component.codingStyleParameters = codOrCoc;
    }

    tile.codingStyleDefaultParameters = context.currentTile.COD;
  }

  var TagTree = function TagTreeClosure() {
    function TagTree(width, height) {
      var levelsLength = (0, _util.log2)(Math.max(width, height)) + 1;
      this.levels = [];

      for (var i = 0; i < levelsLength; i++) {
        var level = {
          width: width,
          height: height,
          items: []
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }

    TagTree.prototype = {
      reset: function TagTree_reset(i, j) {
        var currentLevel = 0,
            value = 0,
            level;

        while (currentLevel < this.levels.length) {
          level = this.levels[currentLevel];
          var index = i + j * level.width;

          if (level.items[index] !== undefined) {
            value = level.items[index];
            break;
          }

          level.index = index;
          i >>= 1;
          j >>= 1;
          currentLevel++;
        }

        currentLevel--;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        this.currentLevel = currentLevel;
        delete this.value;
      },
      incrementValue: function TagTree_incrementValue() {
        var level = this.levels[this.currentLevel];
        level.items[level.index]++;
      },
      nextLevel: function TagTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        currentLevel--;

        if (currentLevel < 0) {
          this.value = value;
          return false;
        }

        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return TagTree;
  }();

  var InclusionTree = function InclusionTreeClosure() {
    function InclusionTree(width, height, defaultValue) {
      var levelsLength = (0, _util.log2)(Math.max(width, height)) + 1;
      this.levels = [];

      for (var i = 0; i < levelsLength; i++) {
        var items = new Uint8Array(width * height);

        for (var j = 0, jj = items.length; j < jj; j++) {
          items[j] = defaultValue;
        }

        var level = {
          width: width,
          height: height,
          items: items
        };
        this.levels.push(level);
        width = Math.ceil(width / 2);
        height = Math.ceil(height / 2);
      }
    }

    InclusionTree.prototype = {
      reset: function InclusionTree_reset(i, j, stopValue) {
        var currentLevel = 0;

        while (currentLevel < this.levels.length) {
          var level = this.levels[currentLevel];
          var index = i + j * level.width;
          level.index = index;
          var value = level.items[index];

          if (value === 0xFF) {
            break;
          }

          if (value > stopValue) {
            this.currentLevel = currentLevel;
            this.propagateValues();
            return false;
          }

          i >>= 1;
          j >>= 1;
          currentLevel++;
        }

        this.currentLevel = currentLevel - 1;
        return true;
      },
      incrementValue: function InclusionTree_incrementValue(stopValue) {
        var level = this.levels[this.currentLevel];
        level.items[level.index] = stopValue + 1;
        this.propagateValues();
      },
      propagateValues: function InclusionTree_propagateValues() {
        var levelIndex = this.currentLevel;
        var level = this.levels[levelIndex];
        var currentValue = level.items[level.index];

        while (--levelIndex >= 0) {
          level = this.levels[levelIndex];
          level.items[level.index] = currentValue;
        }
      },
      nextLevel: function InclusionTree_nextLevel() {
        var currentLevel = this.currentLevel;
        var level = this.levels[currentLevel];
        var value = level.items[level.index];
        level.items[level.index] = 0xFF;
        currentLevel--;

        if (currentLevel < 0) {
          return false;
        }

        this.currentLevel = currentLevel;
        level = this.levels[currentLevel];
        level.items[level.index] = value;
        return true;
      }
    };
    return InclusionTree;
  }();

  var BitModel = function BitModelClosure() {
    var UNIFORM_CONTEXT = 17;
    var RUNLENGTH_CONTEXT = 18;
    var LLAndLHContextsLabel = new Uint8Array([0, 5, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 1, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8, 0, 0, 0, 0, 0, 2, 6, 8, 0, 3, 7, 8, 0, 4, 7, 8]);
    var HLContextLabel = new Uint8Array([0, 3, 4, 0, 5, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 1, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8, 0, 0, 0, 0, 0, 2, 3, 4, 0, 6, 7, 7, 0, 8, 8, 8]);
    var HHContextLabel = new Uint8Array([0, 1, 2, 0, 1, 2, 2, 0, 2, 2, 2, 0, 0, 0, 0, 0, 3, 4, 5, 0, 4, 5, 5, 0, 5, 5, 5, 0, 0, 0, 0, 0, 6, 7, 7, 0, 7, 7, 7, 0, 7, 7, 7, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8, 0, 0, 0, 0, 0, 8, 8, 8, 0, 8, 8, 8, 0, 8, 8, 8]);

    function BitModel(width, height, subband, zeroBitPlanes, mb) {
      this.width = width;
      this.height = height;
      this.contextLabelTable = subband === 'HH' ? HHContextLabel : subband === 'HL' ? HLContextLabel : LLAndLHContextsLabel;
      var coefficientCount = width * height;
      this.neighborsSignificance = new Uint8Array(coefficientCount);
      this.coefficentsSign = new Uint8Array(coefficientCount);
      this.coefficentsMagnitude = mb > 14 ? new Uint32Array(coefficientCount) : mb > 6 ? new Uint16Array(coefficientCount) : new Uint8Array(coefficientCount);
      this.processingFlags = new Uint8Array(coefficientCount);
      var bitsDecoded = new Uint8Array(coefficientCount);

      if (zeroBitPlanes !== 0) {
        for (var i = 0; i < coefficientCount; i++) {
          bitsDecoded[i] = zeroBitPlanes;
        }
      }

      this.bitsDecoded = bitsDecoded;
      this.reset();
    }

    BitModel.prototype = {
      setDecoder: function BitModel_setDecoder(decoder) {
        this.decoder = decoder;
      },
      reset: function BitModel_reset() {
        this.contexts = new Int8Array(19);
        this.contexts[0] = 4 << 1 | 0;
        this.contexts[UNIFORM_CONTEXT] = 46 << 1 | 0;
        this.contexts[RUNLENGTH_CONTEXT] = 3 << 1 | 0;
      },
      setNeighborsSignificance: function BitModel_setNeighborsSignificance(row, column, index) {
        var neighborsSignificance = this.neighborsSignificance;
        var width = this.width,
            height = this.height;
        var left = column > 0;
        var right = column + 1 < width;
        var i;

        if (row > 0) {
          i = index - width;

          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }

          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }

          neighborsSignificance[i] += 0x04;
        }

        if (row + 1 < height) {
          i = index + width;

          if (left) {
            neighborsSignificance[i - 1] += 0x10;
          }

          if (right) {
            neighborsSignificance[i + 1] += 0x10;
          }

          neighborsSignificance[i] += 0x04;
        }

        if (left) {
          neighborsSignificance[index - 1] += 0x01;
        }

        if (right) {
          neighborsSignificance[index + 1] += 0x01;
        }

        neighborsSignificance[index] |= 0x80;
      },
      runSignificancePropagationPass: function BitModel_runSignificancePropagationPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var neighborsSignificance = this.neighborsSignificance;
        var processingFlags = this.processingFlags;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processedInverseMask = ~1;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;

        for (var i0 = 0; i0 < height; i0 += 4) {
          for (var j = 0; j < width; j++) {
            var index = i0 * width + j;

            for (var i1 = 0; i1 < 4; i1++, index += width) {
              var i = i0 + i1;

              if (i >= height) {
                break;
              }

              processingFlags[index] &= processedInverseMask;

              if (coefficentsMagnitude[index] || !neighborsSignificance[index]) {
                continue;
              }

              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);

              if (decision) {
                var sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }

              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      decodeSignBit: function BitModel_decodeSignBit(row, column, index) {
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contribution, sign0, sign1, significance1;
        var contextLabel, decoded;
        significance1 = column > 0 && coefficentsMagnitude[index - 1] !== 0;

        if (column + 1 < width && coefficentsMagnitude[index + 1] !== 0) {
          sign1 = coefficentsSign[index + 1];

          if (significance1) {
            sign0 = coefficentsSign[index - 1];
            contribution = 1 - sign1 - sign0;
          } else {
            contribution = 1 - sign1 - sign1;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - 1];
          contribution = 1 - sign0 - sign0;
        } else {
          contribution = 0;
        }

        var horizontalContribution = 3 * contribution;
        significance1 = row > 0 && coefficentsMagnitude[index - width] !== 0;

        if (row + 1 < height && coefficentsMagnitude[index + width] !== 0) {
          sign1 = coefficentsSign[index + width];

          if (significance1) {
            sign0 = coefficentsSign[index - width];
            contribution = 1 - sign1 - sign0 + horizontalContribution;
          } else {
            contribution = 1 - sign1 - sign1 + horizontalContribution;
          }
        } else if (significance1) {
          sign0 = coefficentsSign[index - width];
          contribution = 1 - sign0 - sign0 + horizontalContribution;
        } else {
          contribution = horizontalContribution;
        }

        if (contribution >= 0) {
          contextLabel = 9 + contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel);
        } else {
          contextLabel = 9 - contribution;
          decoded = this.decoder.readBit(this.contexts, contextLabel) ^ 1;
        }

        return decoded;
      },
      runMagnitudeRefinementPass: function BitModel_runMagnitudeRefinementPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var neighborsSignificance = this.neighborsSignificance;
        var contexts = this.contexts;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var length = width * height;
        var width4 = width * 4;

        for (var index0 = 0, indexNext; index0 < length; index0 = indexNext) {
          indexNext = Math.min(length, index0 + width4);

          for (var j = 0; j < width; j++) {
            for (var index = index0 + j; index < indexNext; index += width) {
              if (!coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }

              var contextLabel = 16;

              if ((processingFlags[index] & firstMagnitudeBitMask) !== 0) {
                processingFlags[index] ^= firstMagnitudeBitMask;
                var significance = neighborsSignificance[index] & 127;
                contextLabel = significance === 0 ? 15 : 14;
              }

              var bit = decoder.readBit(contexts, contextLabel);
              coefficentsMagnitude[index] = coefficentsMagnitude[index] << 1 | bit;
              bitsDecoded[index]++;
              processingFlags[index] |= processedMask;
            }
          }
        }
      },
      runCleanupPass: function BitModel_runCleanupPass() {
        var decoder = this.decoder;
        var width = this.width,
            height = this.height;
        var neighborsSignificance = this.neighborsSignificance;
        var coefficentsMagnitude = this.coefficentsMagnitude;
        var coefficentsSign = this.coefficentsSign;
        var contexts = this.contexts;
        var labels = this.contextLabelTable;
        var bitsDecoded = this.bitsDecoded;
        var processingFlags = this.processingFlags;
        var processedMask = 1;
        var firstMagnitudeBitMask = 2;
        var oneRowDown = width;
        var twoRowsDown = width * 2;
        var threeRowsDown = width * 3;
        var iNext;

        for (var i0 = 0; i0 < height; i0 = iNext) {
          iNext = Math.min(i0 + 4, height);
          var indexBase = i0 * width;
          var checkAllEmpty = i0 + 3 < height;

          for (var j = 0; j < width; j++) {
            var index0 = indexBase + j;
            var allEmpty = checkAllEmpty && processingFlags[index0] === 0 && processingFlags[index0 + oneRowDown] === 0 && processingFlags[index0 + twoRowsDown] === 0 && processingFlags[index0 + threeRowsDown] === 0 && neighborsSignificance[index0] === 0 && neighborsSignificance[index0 + oneRowDown] === 0 && neighborsSignificance[index0 + twoRowsDown] === 0 && neighborsSignificance[index0 + threeRowsDown] === 0;
            var i1 = 0,
                index = index0;
            var i = i0,
                sign;

            if (allEmpty) {
              var hasSignificantCoefficent = decoder.readBit(contexts, RUNLENGTH_CONTEXT);

              if (!hasSignificantCoefficent) {
                bitsDecoded[index0]++;
                bitsDecoded[index0 + oneRowDown]++;
                bitsDecoded[index0 + twoRowsDown]++;
                bitsDecoded[index0 + threeRowsDown]++;
                continue;
              }

              i1 = decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);

              if (i1 !== 0) {
                i = i0 + i1;
                index += i1 * width;
              }

              sign = this.decodeSignBit(i, j, index);
              coefficentsSign[index] = sign;
              coefficentsMagnitude[index] = 1;
              this.setNeighborsSignificance(i, j, index);
              processingFlags[index] |= firstMagnitudeBitMask;
              index = index0;

              for (var i2 = i0; i2 <= i; i2++, index += width) {
                bitsDecoded[index]++;
              }

              i1++;
            }

            for (i = i0 + i1; i < iNext; i++, index += width) {
              if (coefficentsMagnitude[index] || (processingFlags[index] & processedMask) !== 0) {
                continue;
              }

              var contextLabel = labels[neighborsSignificance[index]];
              var decision = decoder.readBit(contexts, contextLabel);

              if (decision === 1) {
                sign = this.decodeSignBit(i, j, index);
                coefficentsSign[index] = sign;
                coefficentsMagnitude[index] = 1;
                this.setNeighborsSignificance(i, j, index);
                processingFlags[index] |= firstMagnitudeBitMask;
              }

              bitsDecoded[index]++;
            }
          }
        }
      },
      checkSegmentationSymbol: function BitModel_checkSegmentationSymbol() {
        var decoder = this.decoder;
        var contexts = this.contexts;
        var symbol = decoder.readBit(contexts, UNIFORM_CONTEXT) << 3 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 2 | decoder.readBit(contexts, UNIFORM_CONTEXT) << 1 | decoder.readBit(contexts, UNIFORM_CONTEXT);

        if (symbol !== 0xA) {
          throw new JpxError('Invalid segmentation symbol');
        }
      }
    };
    return BitModel;
  }();

  var Transform = function TransformClosure() {
    function Transform() {}

    Transform.prototype.calculate = function transformCalculate(subbands, u0, v0) {
      var ll = subbands[0];

      for (var i = 1, ii = subbands.length; i < ii; i++) {
        ll = this.iterate(ll, subbands[i], u0, v0);
      }

      return ll;
    };

    Transform.prototype.extend = function extend(buffer, offset, size) {
      var i1 = offset - 1,
          j1 = offset + 1;
      var i2 = offset + size - 2,
          j2 = offset + size;
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1--] = buffer[j1++];
      buffer[j2++] = buffer[i2--];
      buffer[i1] = buffer[j1];
      buffer[j2] = buffer[i2];
    };

    Transform.prototype.iterate = function Transform_iterate(ll, hl_lh_hh, u0, v0) {
      var llWidth = ll.width,
          llHeight = ll.height,
          llItems = ll.items;
      var width = hl_lh_hh.width;
      var height = hl_lh_hh.height;
      var items = hl_lh_hh.items;
      var i, j, k, l, u, v;

      for (k = 0, i = 0; i < llHeight; i++) {
        l = i * 2 * width;

        for (j = 0; j < llWidth; j++, k++, l += 2) {
          items[l] = llItems[k];
        }
      }

      llItems = ll.items = null;
      var bufferPadding = 4;
      var rowBuffer = new Float32Array(width + 2 * bufferPadding);

      if (width === 1) {
        if ((u0 & 1) !== 0) {
          for (v = 0, k = 0; v < height; v++, k += width) {
            items[k] *= 0.5;
          }
        }
      } else {
        for (v = 0, k = 0; v < height; v++, k += width) {
          rowBuffer.set(items.subarray(k, k + width), bufferPadding);
          this.extend(rowBuffer, bufferPadding, width);
          this.filter(rowBuffer, bufferPadding, width);
          items.set(rowBuffer.subarray(bufferPadding, bufferPadding + width), k);
        }
      }

      var numBuffers = 16;
      var colBuffers = [];

      for (i = 0; i < numBuffers; i++) {
        colBuffers.push(new Float32Array(height + 2 * bufferPadding));
      }

      var b,
          currentBuffer = 0;
      ll = bufferPadding + height;

      if (height === 1) {
        if ((v0 & 1) !== 0) {
          for (u = 0; u < width; u++) {
            items[u] *= 0.5;
          }
        }
      } else {
        for (u = 0; u < width; u++) {
          if (currentBuffer === 0) {
            numBuffers = Math.min(width - u, numBuffers);

            for (k = u, l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                colBuffers[b][l] = items[k + b];
              }
            }

            currentBuffer = numBuffers;
          }

          currentBuffer--;
          var buffer = colBuffers[currentBuffer];
          this.extend(buffer, bufferPadding, height);
          this.filter(buffer, bufferPadding, height);

          if (currentBuffer === 0) {
            k = u - numBuffers + 1;

            for (l = bufferPadding; l < ll; k += width, l++) {
              for (b = 0; b < numBuffers; b++) {
                items[k + b] = colBuffers[b][l];
              }
            }
          }
        }
      }

      return {
        width: width,
        height: height,
        items: items
      };
    };

    return Transform;
  }();

  var IrreversibleTransform = function IrreversibleTransformClosure() {
    function IrreversibleTransform() {
      Transform.call(this);
    }

    IrreversibleTransform.prototype = Object.create(Transform.prototype);

    IrreversibleTransform.prototype.filter = function irreversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n, current, next;
      var alpha = -1.586134342059924;
      var beta = -0.052980118572961;
      var gamma = 0.882911075530934;
      var delta = 0.443506852043971;
      var K = 1.230174104914001;
      var K_ = 1 / K;
      j = offset - 3;

      for (n = len + 4; n--; j += 2) {
        x[j] *= K_;
      }

      j = offset - 2;
      current = delta * x[j - 1];

      for (n = len + 3; n--; j += 2) {
        next = delta * x[j + 1];
        x[j] = K * x[j] - current - next;

        if (n--) {
          j += 2;
          current = delta * x[j + 1];
          x[j] = K * x[j] - current - next;
        } else {
          break;
        }
      }

      j = offset - 1;
      current = gamma * x[j - 1];

      for (n = len + 2; n--; j += 2) {
        next = gamma * x[j + 1];
        x[j] -= current + next;

        if (n--) {
          j += 2;
          current = gamma * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }

      j = offset;
      current = beta * x[j - 1];

      for (n = len + 1; n--; j += 2) {
        next = beta * x[j + 1];
        x[j] -= current + next;

        if (n--) {
          j += 2;
          current = beta * x[j + 1];
          x[j] -= current + next;
        } else {
          break;
        }
      }

      if (len !== 0) {
        j = offset + 1;
        current = alpha * x[j - 1];

        for (n = len; n--; j += 2) {
          next = alpha * x[j + 1];
          x[j] -= current + next;

          if (n--) {
            j += 2;
            current = alpha * x[j + 1];
            x[j] -= current + next;
          } else {
            break;
          }
        }
      }
    };

    return IrreversibleTransform;
  }();

  var ReversibleTransform = function ReversibleTransformClosure() {
    function ReversibleTransform() {
      Transform.call(this);
    }

    ReversibleTransform.prototype = Object.create(Transform.prototype);

    ReversibleTransform.prototype.filter = function reversibleTransformFilter(x, offset, length) {
      var len = length >> 1;
      offset = offset | 0;
      var j, n;

      for (j = offset, n = len + 1; n--; j += 2) {
        x[j] -= x[j - 1] + x[j + 1] + 2 >> 2;
      }

      for (j = offset + 1, n = len; n--; j += 2) {
        x[j] += x[j - 1] + x[j + 1] >> 1;
      }
    };

    return ReversibleTransform;
  }();

  return JpxImage;
}();

exports.JpxImage = JpxImage;

/***/ })
/******/ ]);
});
//# sourceMappingURL=pdf.image_decoders.js.map