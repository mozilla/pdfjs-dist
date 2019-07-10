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
exports.PDFWorkerStream = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PDFWorkerStream =
/*#__PURE__*/
function () {
  function PDFWorkerStream(msgHandler) {
    _classCallCheck(this, PDFWorkerStream);

    this._msgHandler = msgHandler;
    this._contentLength = null;
    this._fullRequestReader = null;
    this._rangeRequestReaders = [];
  }

  _createClass(PDFWorkerStream, [{
    key: "getFullReader",
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequestReader);
      this._fullRequestReader = new PDFWorkerStreamReader(this._msgHandler);
      return this._fullRequestReader;
    }
  }, {
    key: "getRangeReader",
    value: function getRangeReader(begin, end) {
      var reader = new PDFWorkerStreamRangeReader(begin, end, this._msgHandler);

      this._rangeRequestReaders.push(reader);

      return reader;
    }
  }, {
    key: "cancelAllRequests",
    value: function cancelAllRequests(reason) {
      if (this._fullRequestReader) {
        this._fullRequestReader.cancel(reason);
      }

      var readers = this._rangeRequestReaders.slice(0);

      readers.forEach(function (reader) {
        reader.cancel(reason);
      });
    }
  }]);

  return PDFWorkerStream;
}();

exports.PDFWorkerStream = PDFWorkerStream;

var PDFWorkerStreamReader =
/*#__PURE__*/
function () {
  function PDFWorkerStreamReader(msgHandler) {
    var _this = this;

    _classCallCheck(this, PDFWorkerStreamReader);

    this._msgHandler = msgHandler;
    this.onProgress = null;
    this._contentLength = null;
    this._isRangeSupported = false;
    this._isStreamingSupported = false;

    var readableStream = this._msgHandler.sendWithStream('GetReader');

    this._reader = readableStream.getReader();
    this._headersReady = this._msgHandler.sendWithPromise('ReaderHeadersReady').then(function (data) {
      _this._isStreamingSupported = data.isStreamingSupported;
      _this._isRangeSupported = data.isRangeSupported;
      _this._contentLength = data.contentLength;
    });
  }

  _createClass(PDFWorkerStreamReader, [{
    key: "read",
    value: function () {
      var _read = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee() {
        var _ref, value, done;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._reader.read();

              case 2:
                _ref = _context.sent;
                value = _ref.value;
                done = _ref.done;

                if (!done) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 7:
                return _context.abrupt("return", {
                  value: value.buffer,
                  done: false
                });

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _read.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._reader.cancel(reason);
    }
  }, {
    key: "headersReady",
    get: function get() {
      return this._headersReady;
    }
  }, {
    key: "contentLength",
    get: function get() {
      return this._contentLength;
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return this._isStreamingSupported;
    }
  }, {
    key: "isRangeSupported",
    get: function get() {
      return this._isRangeSupported;
    }
  }]);

  return PDFWorkerStreamReader;
}();

var PDFWorkerStreamRangeReader =
/*#__PURE__*/
function () {
  function PDFWorkerStreamRangeReader(begin, end, msgHandler) {
    _classCallCheck(this, PDFWorkerStreamRangeReader);

    this._msgHandler = msgHandler;
    this.onProgress = null;

    var readableStream = this._msgHandler.sendWithStream('GetRangeReader', {
      begin: begin,
      end: end
    });

    this._reader = readableStream.getReader();
  }

  _createClass(PDFWorkerStreamRangeReader, [{
    key: "read",
    value: function () {
      var _read2 = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee2() {
        var _ref2, value, done;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._reader.read();

              case 2:
                _ref2 = _context2.sent;
                value = _ref2.value;
                done = _ref2.done;

                if (!done) {
                  _context2.next = 7;
                  break;
                }

                return _context2.abrupt("return", {
                  value: undefined,
                  done: true
                });

              case 7:
                return _context2.abrupt("return", {
                  value: value.buffer,
                  done: false
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _read2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: "cancel",
    value: function cancel(reason) {
      this._reader.cancel(reason);
    }
  }, {
    key: "isStreamingSupported",
    get: function get() {
      return false;
    }
  }]);

  return PDFWorkerStreamRangeReader;
}();