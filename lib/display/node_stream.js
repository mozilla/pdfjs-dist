/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2018 Mozilla Foundation
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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PDFNodeStream = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../shared/util');

var _network_utils = require('./network_utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs');
var http = require('http');
var https = require('https');
var url = require('url');

var fileUriRegex = /^file:\/\/\/[a-zA-Z]:\//;
function parseUrl(sourceUrl) {
  var parsedUrl = url.parse(sourceUrl);
  if (parsedUrl.protocol === 'file:' || parsedUrl.host) {
    return parsedUrl;
  }
  if (/^[a-z]:[/\\]/i.test(sourceUrl)) {
    return url.parse('file:///' + sourceUrl);
  }
  if (!parsedUrl.host) {
    parsedUrl.protocol = 'file:';
  }
  return parsedUrl;
}

var PDFNodeStream = function () {
  function PDFNodeStream(source) {
    _classCallCheck(this, PDFNodeStream);

    this.source = source;
    this.url = parseUrl(source.url);
    this.isHttp = this.url.protocol === 'http:' || this.url.protocol === 'https:';
    this.isFsUrl = this.url.protocol === 'file:';
    this.httpHeaders = this.isHttp && source.httpHeaders || {};
    this._fullRequest = null;
    this._rangeRequestReaders = [];
  }

  _createClass(PDFNodeStream, [{
    key: 'getFullReader',
    value: function getFullReader() {
      (0, _util.assert)(!this._fullRequest);
      this._fullRequest = this.isFsUrl ? new PDFNodeStreamFsFullReader(this) : new PDFNodeStreamFullReader(this);
      return this._fullRequest;
    }
  }, {
    key: 'getRangeReader',
    value: function getRangeReader(start, end) {
      var rangeReader = this.isFsUrl ? new PDFNodeStreamFsRangeReader(this, start, end) : new PDFNodeStreamRangeReader(this, start, end);
      this._rangeRequestReaders.push(rangeReader);
      return rangeReader;
    }
  }, {
    key: 'cancelAllRequests',
    value: function cancelAllRequests(reason) {
      if (this._fullRequest) {
        this._fullRequest.cancel(reason);
      }
      var readers = this._rangeRequestReaders.slice(0);
      readers.forEach(function (reader) {
        reader.cancel(reason);
      });
    }
  }]);

  return PDFNodeStream;
}();

var BaseFullReader = function () {
  function BaseFullReader(stream) {
    _classCallCheck(this, BaseFullReader);

    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    var source = stream.source;
    this._contentLength = source.length;
    this._loaded = 0;
    this._filename = null;
    this._disableRange = source.disableRange || false;
    this._rangeChunkSize = source.rangeChunkSize;
    if (!this._rangeChunkSize && !this._disableRange) {
      this._disableRange = true;
    }
    this._isStreamingSupported = !source.disableStream;
    this._isRangeSupported = !source.disableRange;
    this._readableStream = null;
    this._readCapability = (0, _util.createPromiseCapability)();
    this._headersCapability = (0, _util.createPromiseCapability)();
  }

  _createClass(BaseFullReader, [{
    key: 'read',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var chunk, buffer;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this._readCapability.promise;

              case 2:
                if (!this._done) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', {
                  value: undefined,
                  done: true
                });

              case 4:
                if (!this._storedError) {
                  _context.next = 6;
                  break;
                }

                throw this._storedError;

              case 6:
                chunk = this._readableStream.read();

                if (!(chunk === null)) {
                  _context.next = 10;
                  break;
                }

                this._readCapability = (0, _util.createPromiseCapability)();
                return _context.abrupt('return', this.read());

              case 10:
                this._loaded += chunk.length;
                if (this.onProgress) {
                  this.onProgress({
                    loaded: this._loaded,
                    total: this._contentLength
                  });
                }
                buffer = new Uint8Array(chunk).buffer;
                return _context.abrupt('return', {
                  value: buffer,
                  done: false
                });

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function read() {
        return _ref.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: 'cancel',
    value: function cancel(reason) {
      if (!this._readableStream) {
        this._error(reason);
        return;
      }
      this._readableStream.destroy(reason);
    }
  }, {
    key: '_error',
    value: function _error(reason) {
      this._storedError = reason;
      this._readCapability.resolve();
    }
  }, {
    key: '_setReadableStream',
    value: function _setReadableStream(readableStream) {
      var _this = this;

      this._readableStream = readableStream;
      readableStream.on('readable', function () {
        _this._readCapability.resolve();
      });
      readableStream.on('end', function () {
        readableStream.destroy();
        _this._done = true;
        _this._readCapability.resolve();
      });
      readableStream.on('error', function (reason) {
        _this._error(reason);
      });
      if (!this._isStreamingSupported && this._isRangeSupported) {
        this._error(new _util.AbortException('streaming is disabled'));
      }
      if (this._storedError) {
        this._readableStream.destroy(this._storedError);
      }
    }
  }, {
    key: 'headersReady',
    get: function get() {
      return this._headersCapability.promise;
    }
  }, {
    key: 'filename',
    get: function get() {
      return this._filename;
    }
  }, {
    key: 'contentLength',
    get: function get() {
      return this._contentLength;
    }
  }, {
    key: 'isRangeSupported',
    get: function get() {
      return this._isRangeSupported;
    }
  }, {
    key: 'isStreamingSupported',
    get: function get() {
      return this._isStreamingSupported;
    }
  }]);

  return BaseFullReader;
}();

var BaseRangeReader = function () {
  function BaseRangeReader(stream) {
    _classCallCheck(this, BaseRangeReader);

    this._url = stream.url;
    this._done = false;
    this._storedError = null;
    this.onProgress = null;
    this._loaded = 0;
    this._readableStream = null;
    this._readCapability = (0, _util.createPromiseCapability)();
    var source = stream.source;
    this._isStreamingSupported = !source.disableStream;
  }

  _createClass(BaseRangeReader, [{
    key: 'read',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var chunk, buffer;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._readCapability.promise;

              case 2:
                if (!this._done) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt('return', {
                  value: undefined,
                  done: true
                });

              case 4:
                if (!this._storedError) {
                  _context2.next = 6;
                  break;
                }

                throw this._storedError;

              case 6:
                chunk = this._readableStream.read();

                if (!(chunk === null)) {
                  _context2.next = 10;
                  break;
                }

                this._readCapability = (0, _util.createPromiseCapability)();
                return _context2.abrupt('return', this.read());

              case 10:
                this._loaded += chunk.length;
                if (this.onProgress) {
                  this.onProgress({ loaded: this._loaded });
                }
                buffer = new Uint8Array(chunk).buffer;
                return _context2.abrupt('return', {
                  value: buffer,
                  done: false
                });

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function read() {
        return _ref2.apply(this, arguments);
      }

      return read;
    }()
  }, {
    key: 'cancel',
    value: function cancel(reason) {
      if (!this._readableStream) {
        this._error(reason);
        return;
      }
      this._readableStream.destroy(reason);
    }
  }, {
    key: '_error',
    value: function _error(reason) {
      this._storedError = reason;
      this._readCapability.resolve();
    }
  }, {
    key: '_setReadableStream',
    value: function _setReadableStream(readableStream) {
      var _this2 = this;

      this._readableStream = readableStream;
      readableStream.on('readable', function () {
        _this2._readCapability.resolve();
      });
      readableStream.on('end', function () {
        readableStream.destroy();
        _this2._done = true;
        _this2._readCapability.resolve();
      });
      readableStream.on('error', function (reason) {
        _this2._error(reason);
      });
      if (this._storedError) {
        this._readableStream.destroy(this._storedError);
      }
    }
  }, {
    key: 'isStreamingSupported',
    get: function get() {
      return this._isStreamingSupported;
    }
  }]);

  return BaseRangeReader;
}();

function createRequestOptions(url, headers) {
  return {
    protocol: url.protocol,
    auth: url.auth,
    host: url.hostname,
    port: url.port,
    path: url.path,
    method: 'GET',
    headers: headers
  };
}

var PDFNodeStreamFullReader = function (_BaseFullReader) {
  _inherits(PDFNodeStreamFullReader, _BaseFullReader);

  function PDFNodeStreamFullReader(stream) {
    _classCallCheck(this, PDFNodeStreamFullReader);

    var _this3 = _possibleConstructorReturn(this, (PDFNodeStreamFullReader.__proto__ || Object.getPrototypeOf(PDFNodeStreamFullReader)).call(this, stream));

    var handleResponse = function handleResponse(response) {
      if (response.statusCode === 404) {
        var error = new _util.MissingPDFException('Missing PDF "' + _this3._url + '".');
        _this3._storedError = error;
        _this3._headersCapability.reject(error);
        return;
      }
      _this3._headersCapability.resolve();
      _this3._setReadableStream(response);
      var getResponseHeader = function getResponseHeader(name) {
        return _this3._readableStream.headers[name.toLowerCase()];
      };

      var _validateRangeRequest = (0, _network_utils.validateRangeRequestCapabilities)({
        getResponseHeader: getResponseHeader,
        isHttp: stream.isHttp,
        rangeChunkSize: _this3._rangeChunkSize,
        disableRange: _this3._disableRange
      }),
          allowRangeRequests = _validateRangeRequest.allowRangeRequests,
          suggestedLength = _validateRangeRequest.suggestedLength;

      _this3._isRangeSupported = allowRangeRequests;
      _this3._contentLength = suggestedLength || _this3._contentLength;
      _this3._filename = (0, _network_utils.extractFilenameFromHeader)(getResponseHeader);
    };
    _this3._request = null;
    if (_this3._url.protocol === 'http:') {
      _this3._request = http.request(createRequestOptions(_this3._url, stream.httpHeaders), handleResponse);
    } else {
      _this3._request = https.request(createRequestOptions(_this3._url, stream.httpHeaders), handleResponse);
    }
    _this3._request.on('error', function (reason) {
      _this3._storedError = reason;
      _this3._headersCapability.reject(reason);
    });
    _this3._request.end();
    return _this3;
  }

  return PDFNodeStreamFullReader;
}(BaseFullReader);

var PDFNodeStreamRangeReader = function (_BaseRangeReader) {
  _inherits(PDFNodeStreamRangeReader, _BaseRangeReader);

  function PDFNodeStreamRangeReader(stream, start, end) {
    _classCallCheck(this, PDFNodeStreamRangeReader);

    var _this4 = _possibleConstructorReturn(this, (PDFNodeStreamRangeReader.__proto__ || Object.getPrototypeOf(PDFNodeStreamRangeReader)).call(this, stream));

    _this4._httpHeaders = {};
    for (var property in stream.httpHeaders) {
      var value = stream.httpHeaders[property];
      if (typeof value === 'undefined') {
        continue;
      }
      _this4._httpHeaders[property] = value;
    }
    _this4._httpHeaders['Range'] = 'bytes=' + start + '-' + (end - 1);
    var handleResponse = function handleResponse(response) {
      if (response.statusCode === 404) {
        var error = new _util.MissingPDFException('Missing PDF "' + _this4._url + '".');
        _this4._storedError = error;
        return;
      }
      _this4._setReadableStream(response);
    };
    _this4._request = null;
    if (_this4._url.protocol === 'http:') {
      _this4._request = http.request(createRequestOptions(_this4._url, _this4._httpHeaders), handleResponse);
    } else {
      _this4._request = https.request(createRequestOptions(_this4._url, _this4._httpHeaders), handleResponse);
    }
    _this4._request.on('error', function (reason) {
      _this4._storedError = reason;
    });
    _this4._request.end();
    return _this4;
  }

  return PDFNodeStreamRangeReader;
}(BaseRangeReader);

var PDFNodeStreamFsFullReader = function (_BaseFullReader2) {
  _inherits(PDFNodeStreamFsFullReader, _BaseFullReader2);

  function PDFNodeStreamFsFullReader(stream) {
    _classCallCheck(this, PDFNodeStreamFsFullReader);

    var _this5 = _possibleConstructorReturn(this, (PDFNodeStreamFsFullReader.__proto__ || Object.getPrototypeOf(PDFNodeStreamFsFullReader)).call(this, stream));

    var path = decodeURIComponent(_this5._url.path);
    if (fileUriRegex.test(_this5._url.href)) {
      path = path.replace(/^\//, '');
    }
    fs.lstat(path, function (error, stat) {
      if (error) {
        if (error.code === 'ENOENT') {
          error = new _util.MissingPDFException('Missing PDF "' + path + '".');
        }
        _this5._storedError = error;
        _this5._headersCapability.reject(error);
        return;
      }
      _this5._contentLength = stat.size;
      _this5._setReadableStream(fs.createReadStream(path));
      _this5._headersCapability.resolve();
    });
    return _this5;
  }

  return PDFNodeStreamFsFullReader;
}(BaseFullReader);

var PDFNodeStreamFsRangeReader = function (_BaseRangeReader2) {
  _inherits(PDFNodeStreamFsRangeReader, _BaseRangeReader2);

  function PDFNodeStreamFsRangeReader(stream, start, end) {
    _classCallCheck(this, PDFNodeStreamFsRangeReader);

    var _this6 = _possibleConstructorReturn(this, (PDFNodeStreamFsRangeReader.__proto__ || Object.getPrototypeOf(PDFNodeStreamFsRangeReader)).call(this, stream));

    var path = decodeURIComponent(_this6._url.path);
    if (fileUriRegex.test(_this6._url.href)) {
      path = path.replace(/^\//, '');
    }
    _this6._setReadableStream(fs.createReadStream(path, {
      start: start,
      end: end - 1
    }));
    return _this6;
  }

  return PDFNodeStreamFsRangeReader;
}(BaseRangeReader);

exports.PDFNodeStream = PDFNodeStream;