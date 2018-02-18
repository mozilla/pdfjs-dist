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

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DummyStatTimer = exports.StatTimer = exports.SimpleXMLParser = exports.DOMSVGFactory = exports.DOMCMapReaderFactory = exports.DOMCanvasFactory = exports.DEFAULT_LINK_REL = exports.getDefaultSetting = exports.LinkTarget = exports.getFilenameFromUrl = exports.addLinkAttributes = exports.RenderingCancelledException = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../shared/util');

var _global_scope = require('../shared/global_scope');

var _global_scope2 = _interopRequireDefault(_global_scope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_LINK_REL = 'noopener noreferrer nofollow';
var SVG_NS = 'http://www.w3.org/2000/svg';

var DOMCanvasFactory = function () {
  function DOMCanvasFactory() {
    _classCallCheck(this, DOMCanvasFactory);
  }

  _createClass(DOMCanvasFactory, [{
    key: 'create',
    value: function create(width, height) {
      if (width <= 0 || height <= 0) {
        throw new Error('invalid canvas size');
      }
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      return {
        canvas: canvas,
        context: context
      };
    }
  }, {
    key: 'reset',
    value: function reset(canvasAndContext, width, height) {
      if (!canvasAndContext.canvas) {
        throw new Error('canvas is not specified');
      }
      if (width <= 0 || height <= 0) {
        throw new Error('invalid canvas size');
      }
      canvasAndContext.canvas.width = width;
      canvasAndContext.canvas.height = height;
    }
  }, {
    key: 'destroy',
    value: function destroy(canvasAndContext) {
      if (!canvasAndContext.canvas) {
        throw new Error('canvas is not specified');
      }
      canvasAndContext.canvas.width = 0;
      canvasAndContext.canvas.height = 0;
      canvasAndContext.canvas = null;
      canvasAndContext.context = null;
    }
  }]);

  return DOMCanvasFactory;
}();

var DOMCMapReaderFactory = function () {
  function DOMCMapReaderFactory(_ref) {
    var _ref$baseUrl = _ref.baseUrl,
        baseUrl = _ref$baseUrl === undefined ? null : _ref$baseUrl,
        _ref$isCompressed = _ref.isCompressed,
        isCompressed = _ref$isCompressed === undefined ? false : _ref$isCompressed;

    _classCallCheck(this, DOMCMapReaderFactory);

    this.baseUrl = baseUrl;
    this.isCompressed = isCompressed;
  }

  _createClass(DOMCMapReaderFactory, [{
    key: 'fetch',
    value: function fetch(_ref2) {
      var _this = this;

      var name = _ref2.name;

      if (!this.baseUrl) {
        return Promise.reject(new Error('CMap baseUrl must be specified, ' + 'see "PDFJS.cMapUrl" (and also "PDFJS.cMapPacked").'));
      }
      if (!name) {
        return Promise.reject(new Error('CMap name must be specified.'));
      }
      return new Promise(function (resolve, reject) {
        var url = _this.baseUrl + name + (_this.isCompressed ? '.bcmap' : '');
        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        if (_this.isCompressed) {
          request.responseType = 'arraybuffer';
        }
        request.onreadystatechange = function () {
          if (request.readyState !== XMLHttpRequest.DONE) {
            return;
          }
          if (request.status === 200 || request.status === 0) {
            var data = void 0;
            if (_this.isCompressed && request.response) {
              data = new Uint8Array(request.response);
            } else if (!_this.isCompressed && request.responseText) {
              data = (0, _util.stringToBytes)(request.responseText);
            }
            if (data) {
              resolve({
                cMapData: data,
                compressionType: _this.isCompressed ? _util.CMapCompressionType.BINARY : _util.CMapCompressionType.NONE
              });
              return;
            }
          }
          reject(new Error('Unable to load ' + (_this.isCompressed ? 'binary ' : '') + 'CMap at: ' + url));
        };
        request.send(null);
      });
    }
  }]);

  return DOMCMapReaderFactory;
}();

var DOMSVGFactory = function () {
  function DOMSVGFactory() {
    _classCallCheck(this, DOMSVGFactory);
  }

  _createClass(DOMSVGFactory, [{
    key: 'create',
    value: function create(width, height) {
      (0, _util.assert)(width > 0 && height > 0, 'Invalid SVG dimensions');
      var svg = document.createElementNS(SVG_NS, 'svg:svg');
      svg.setAttribute('version', '1.1');
      svg.setAttribute('width', width + 'px');
      svg.setAttribute('height', height + 'px');
      svg.setAttribute('preserveAspectRatio', 'none');
      svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
      return svg;
    }
  }, {
    key: 'createElement',
    value: function createElement(type) {
      (0, _util.assert)(typeof type === 'string', 'Invalid SVG element type');
      return document.createElementNS(SVG_NS, type);
    }
  }]);

  return DOMSVGFactory;
}();

var SimpleDOMNode = function () {
  function SimpleDOMNode(nodeName, nodeValue) {
    _classCallCheck(this, SimpleDOMNode);

    this.nodeName = nodeName;
    this.nodeValue = nodeValue;
    Object.defineProperty(this, 'parentNode', {
      value: null,
      writable: true
    });
  }

  _createClass(SimpleDOMNode, [{
    key: 'hasChildNodes',
    value: function hasChildNodes() {
      return this.childNodes && this.childNodes.length > 0;
    }
  }, {
    key: 'firstChild',
    get: function get() {
      return this.childNodes[0];
    }
  }, {
    key: 'nextSibling',
    get: function get() {
      var index = this.parentNode.childNodes.indexOf(this);
      return this.parentNode.childNodes[index + 1];
    }
  }, {
    key: 'textContent',
    get: function get() {
      if (!this.childNodes) {
        return this.nodeValue || '';
      }
      return this.childNodes.map(function (child) {
        return child.textContent;
      }).join('');
    }
  }]);

  return SimpleDOMNode;
}();

var SimpleXMLParser = function () {
  function SimpleXMLParser() {
    _classCallCheck(this, SimpleXMLParser);
  }

  _createClass(SimpleXMLParser, [{
    key: 'parseFromString',
    value: function parseFromString(data) {
      var _this2 = this;

      var nodes = [];
      data = data.replace(/<\?[\s\S]*?\?>|<!--[\s\S]*?-->/g, '').trim();
      data = data.replace(/<!DOCTYPE[^>\[]+(\[[^\]]+)?[^>]+>/g, '').trim();
      data = data.replace(/>([^<][\s\S]*?)</g, function (all, text) {
        var length = nodes.length;
        var node = new SimpleDOMNode('#text', _this2._decodeXML(text));
        nodes.push(node);
        if (node.textContent.trim().length === 0) {
          return '><';
        }
        return '>' + length + ',<';
      });
      data = data.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, function (all, text) {
        var length = nodes.length;
        var node = new SimpleDOMNode('#text', text);
        nodes.push(node);
        return length + ',';
      });
      var regex = /<([\w\:]+)((?:[\s\w:=]|'[^']*'|"[^"]*")*)(?:\/>|>([\d,]*)<\/[^>]+>)/g;
      var lastLength = void 0;
      do {
        lastLength = nodes.length;
        data = data.replace(regex, function (all, name, attrs, data) {
          var length = nodes.length;
          var node = new SimpleDOMNode(name);
          var children = [];
          if (data) {
            data = data.split(',');
            data.pop();
            data.forEach(function (child) {
              var childNode = nodes[+child];
              childNode.parentNode = node;
              children.push(childNode);
            });
          }
          node.childNodes = children;
          nodes.push(node);
          return length + ',';
        });
      } while (lastLength < nodes.length);
      return { documentElement: nodes.pop() };
    }
  }, {
    key: '_decodeXML',
    value: function _decodeXML(text) {
      if (!text.includes('&')) {
        return text;
      }
      return text.replace(/&(#(x[0-9a-f]+|\d+)|\w+);/gi, function (all, entityName, number) {
        if (number) {
          if (number[0] === 'x') {
            number = parseInt(number.substring(1), 16);
          } else {
            number = +number;
          }
          return String.fromCharCode(number);
        }
        switch (entityName) {
          case 'amp':
            return '&';
          case 'lt':
            return '<';
          case 'gt':
            return '>';
          case 'quot':
            return '\"';
          case 'apos':
            return '\'';
        }
        return '&' + entityName + ';';
      });
    }
  }]);

  return SimpleXMLParser;
}();

var RenderingCancelledException = function RenderingCancelledException() {
  function RenderingCancelledException(msg, type) {
    this.message = msg;
    this.type = type;
  }
  RenderingCancelledException.prototype = new Error();
  RenderingCancelledException.prototype.name = 'RenderingCancelledException';
  RenderingCancelledException.constructor = RenderingCancelledException;
  return RenderingCancelledException;
}();
var LinkTarget = {
  NONE: 0,
  SELF: 1,
  BLANK: 2,
  PARENT: 3,
  TOP: 4
};
var LinkTargetStringMap = ['', '_self', '_blank', '_parent', '_top'];
function addLinkAttributes(link) {
  var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      url = _ref3.url,
      target = _ref3.target,
      rel = _ref3.rel;

  link.href = link.title = url ? (0, _util.removeNullCharacters)(url) : '';
  if (url) {
    var LinkTargetValues = Object.values(LinkTarget);
    var targetIndex = LinkTargetValues.includes(target) ? target : LinkTarget.NONE;
    link.target = LinkTargetStringMap[targetIndex];
    link.rel = typeof rel === 'string' ? rel : DEFAULT_LINK_REL;
  }
}
function getFilenameFromUrl(url) {
  var anchor = url.indexOf('#');
  var query = url.indexOf('?');
  var end = Math.min(anchor > 0 ? anchor : url.length, query > 0 ? query : url.length);
  return url.substring(url.lastIndexOf('/', end) + 1, end);
}
function getDefaultSetting(id) {
  var globalSettings = _global_scope2.default.PDFJS;
  switch (id) {
    case 'pdfBug':
      return globalSettings ? globalSettings.pdfBug : false;
    case 'disableAutoFetch':
      return globalSettings ? globalSettings.disableAutoFetch : false;
    case 'disableStream':
      return globalSettings ? globalSettings.disableStream : false;
    case 'disableRange':
      return globalSettings ? globalSettings.disableRange : false;
    case 'disableFontFace':
      return globalSettings ? globalSettings.disableFontFace : false;
    case 'disableCreateObjectURL':
      return globalSettings ? globalSettings.disableCreateObjectURL : false;
    case 'cMapUrl':
      return globalSettings ? globalSettings.cMapUrl : null;
    case 'cMapPacked':
      return globalSettings ? globalSettings.cMapPacked : false;
    case 'maxImageSize':
      return globalSettings ? globalSettings.maxImageSize : -1;
    case 'isEvalSupported':
      return globalSettings ? globalSettings.isEvalSupported : true;
    default:
      throw new Error('Unknown default setting: ' + id);
  }
}

var StatTimer = function () {
  function StatTimer() {
    var enable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    _classCallCheck(this, StatTimer);

    this.enabled = !!enable;
    this.started = Object.create(null);
    this.times = [];
  }

  _createClass(StatTimer, [{
    key: 'time',
    value: function time(name) {
      if (!this.enabled) {
        return;
      }
      if (name in this.started) {
        (0, _util.warn)('Timer is already running for ' + name);
      }
      this.started[name] = Date.now();
    }
  }, {
    key: 'timeEnd',
    value: function timeEnd(name) {
      if (!this.enabled) {
        return;
      }
      if (!(name in this.started)) {
        (0, _util.warn)('Timer has not been started for ' + name);
      }
      this.times.push({
        'name': name,
        'start': this.started[name],
        'end': Date.now()
      });
      delete this.started[name];
    }
  }, {
    key: 'toString',
    value: function toString() {
      var times = this.times;
      var out = '',
          longest = 0;
      for (var i = 0, ii = times.length; i < ii; ++i) {
        var name = times[i]['name'];
        if (name.length > longest) {
          longest = name.length;
        }
      }
      for (var _i = 0, _ii = times.length; _i < _ii; ++_i) {
        var span = times[_i];
        var duration = span.end - span.start;
        out += span['name'].padEnd(longest) + ' ' + duration + 'ms\n';
      }
      return out;
    }
  }]);

  return StatTimer;
}();

var DummyStatTimer = function () {
  function DummyStatTimer() {
    _classCallCheck(this, DummyStatTimer);

    (0, _util.unreachable)('Cannot initialize DummyStatTimer.');
  }

  _createClass(DummyStatTimer, null, [{
    key: 'time',
    value: function time(name) {}
  }, {
    key: 'timeEnd',
    value: function timeEnd(name) {}
  }, {
    key: 'toString',
    value: function toString() {
      return '';
    }
  }]);

  return DummyStatTimer;
}();

exports.RenderingCancelledException = RenderingCancelledException;
exports.addLinkAttributes = addLinkAttributes;
exports.getFilenameFromUrl = getFilenameFromUrl;
exports.LinkTarget = LinkTarget;
exports.getDefaultSetting = getDefaultSetting;
exports.DEFAULT_LINK_REL = DEFAULT_LINK_REL;
exports.DOMCanvasFactory = DOMCanvasFactory;
exports.DOMCMapReaderFactory = DOMCMapReaderFactory;
exports.DOMSVGFactory = DOMSVGFactory;
exports.SimpleXMLParser = SimpleXMLParser;
exports.StatTimer = StatTimer;
exports.DummyStatTimer = DummyStatTimer;