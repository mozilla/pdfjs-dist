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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildGetDocumentParams = buildGetDocumentParams;
exports.TEST_PDFS_PATH = exports.XRefMock = exports.NodeCMapReaderFactory = exports.NodeCanvasFactory = exports.NodeFileReaderFactory = void 0;

var _util = require("../../shared/util");

var _is_node = _interopRequireDefault(require("../../shared/is_node"));

var _primitives = require("../../core/primitives");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var NodeFileReaderFactory =
/*#__PURE__*/
function () {
  function NodeFileReaderFactory() {
    _classCallCheck(this, NodeFileReaderFactory);
  }

  _createClass(NodeFileReaderFactory, null, [{
    key: "fetch",
    value: function fetch(params) {
      var fs = require('fs');

      var file = fs.readFileSync(params.path);
      return new Uint8Array(file);
    }
  }]);

  return NodeFileReaderFactory;
}();

exports.NodeFileReaderFactory = NodeFileReaderFactory;
var TEST_PDFS_PATH = {
  dom: '../pdfs/',
  node: './test/pdfs/'
};
exports.TEST_PDFS_PATH = TEST_PDFS_PATH;

function buildGetDocumentParams(filename, options) {
  var params = Object.create(null);

  if ((0, _is_node.default)()) {
    params.url = TEST_PDFS_PATH.node + filename;
  } else {
    params.url = new URL(TEST_PDFS_PATH.dom + filename, window.location).href;
  }

  for (var option in options) {
    params[option] = options[option];
  }

  return params;
}

var NodeCanvasFactory =
/*#__PURE__*/
function () {
  function NodeCanvasFactory() {
    _classCallCheck(this, NodeCanvasFactory);
  }

  _createClass(NodeCanvasFactory, [{
    key: "create",
    value: function create(width, height) {
      (0, _util.assert)(width > 0 && height > 0, 'Invalid canvas size');

      var Canvas = require('canvas');

      var canvas = Canvas.createCanvas(width, height);
      return {
        canvas: canvas,
        context: canvas.getContext('2d')
      };
    }
  }, {
    key: "reset",
    value: function reset(canvasAndContext, width, height) {
      (0, _util.assert)(canvasAndContext.canvas, 'Canvas is not specified');
      (0, _util.assert)(width > 0 && height > 0, 'Invalid canvas size');
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }
  }, {
    key: "destroy",
    value: function destroy(canvasAndContext) {
      (0, _util.assert)(canvasAndContext.canvas, 'Canvas is not specified');
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }]);

  return NodeCanvasFactory;
}();

exports.NodeCanvasFactory = NodeCanvasFactory;

var NodeCMapReaderFactory =
/*#__PURE__*/
function () {
  function NodeCMapReaderFactory(_ref) {
    var _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === void 0 ? null : _ref$baseUrl,
        _ref$isCompressed = _ref.isCompressed,
        isCompressed = _ref$isCompressed === void 0 ? false : _ref$isCompressed;

    _classCallCheck(this, NodeCMapReaderFactory);

    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  _createClass(NodeCMapReaderFactory, [{
    key: "fetch",
    value: function fetch(_ref2) {
      var _this = this;

      var name = _ref2.name;

      if (!this.baseUrl) {
        return Promise.reject(new Error('The CMap "baseUrl" parameter must be specified, ensure that ' + 'the "cMapUrl" and "cMapPacked" API parameters are provided.'));
      }

      if (!name) {
        return Promise.reject(new Error('CMap name must be specified.'));
      }

      return new Promise(function (resolve, reject) {
        var url = _this.baseUrl + name + (_this.isCompressed ? '.bcmap' : '');

        var fs = require('fs');

        fs.readFile(url, function (error, data) {
          if (error || !data) {
            reject(new Error('Unable to load ' + (_this.isCompressed ? 'binary ' : '') + 'CMap at: ' + url));
            return;
          }

          resolve({
            cMapData: new Uint8Array(data),
            compressionType: _this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE
          });
        });
      });
    }
  }]);

  return NodeCMapReaderFactory;
}();

exports.NodeCMapReaderFactory = NodeCMapReaderFactory;

var XRefMock =
/*#__PURE__*/
function () {
  function XRefMock(array) {
    _classCallCheck(this, XRefMock);

    this._map = Object.create(null);

    for (var key in array) {
      var obj = array[key];
      this._map[obj.ref.toString()] = obj.data;
    }
  }

  _createClass(XRefMock, [{
    key: "fetch",
    value: function fetch(ref) {
      return this._map[ref.toString()];
    }
  }, {
    key: "fetchAsync",
    value: function fetchAsync(ref) {
      return Promise.resolve(this.fetch(ref));
    }
  }, {
    key: "fetchIfRef",
    value: function fetchIfRef(obj) {
      if (!(0, _primitives.isRef)(obj)) {
        return obj;
      }

      return this.fetch(obj);
    }
  }, {
    key: "fetchIfRefAsync",
    value: function fetchIfRefAsync(obj) {
      return Promise.resolve(this.fetchIfRef(obj));
    }
  }]);

  return XRefMock;
}();

exports.XRefMock = XRefMock;