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
exports.FontLoader = exports.FontFaceObject = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = require('../shared/util');

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BaseFontLoader = function () {
  function BaseFontLoader(docId) {
    _classCallCheck(this, BaseFontLoader);

    if (this.constructor === BaseFontLoader) {
      (0, _util.unreachable)('Cannot initialize BaseFontLoader.');
    }
    this.docId = docId;
    this.nativeFontFaces = [];
    this.styleElement = null;
    this.loadingContext = {
      requests: [],
      nextRequestId: 0
    };
  }

  _createClass(BaseFontLoader, [{
    key: 'addNativeFontFace',
    value: function addNativeFontFace(nativeFontFace) {
      this.nativeFontFaces.push(nativeFontFace);
      document.fonts.add(nativeFontFace);
    }
  }, {
    key: 'insertRule',
    value: function insertRule(rule) {
      var styleElement = this.styleElement;
      if (!styleElement) {
        styleElement = this.styleElement = document.createElement('style');
        styleElement.id = 'PDFJS_FONT_STYLE_TAG_' + this.docId;
        document.documentElement.getElementsByTagName('head')[0].appendChild(styleElement);
      }
      var styleSheet = styleElement.sheet;
      styleSheet.insertRule(rule, styleSheet.cssRules.length);
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.nativeFontFaces.forEach(function (nativeFontFace) {
        document.fonts.delete(nativeFontFace);
      });
      this.nativeFontFaces.length = 0;
      if (this.styleElement) {
        this.styleElement.remove();
        this.styleElement = null;
      }
    }
  }, {
    key: 'bind',
    value: function bind(fonts, callback) {
      var rules = [];
      var fontsToLoad = [];
      var fontLoadPromises = [];
      var getNativeFontPromise = function getNativeFontPromise(nativeFontFace) {
        return nativeFontFace.loaded.catch(function (reason) {
          (0, _util.warn)('Failed to load font "' + nativeFontFace.family + '": ' + reason);
        });
      };
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = fonts[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var font = _step.value;

          if (font.attached || font.missingFile) {
            continue;
          }
          font.attached = true;
          if (this.isFontLoadingAPISupported) {
            var nativeFontFace = font.createNativeFontFace();
            if (nativeFontFace) {
              this.addNativeFontFace(nativeFontFace);
              fontLoadPromises.push(getNativeFontPromise(nativeFontFace));
            }
          } else {
            var rule = font.createFontFaceRule();
            if (rule) {
              this.insertRule(rule);
              rules.push(rule);
              fontsToLoad.push(font);
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var request = this._queueLoadingCallback(callback);
      if (this.isFontLoadingAPISupported) {
        Promise.all(fontLoadPromises).then(request.complete);
      } else if (rules.length > 0 && !this.isSyncFontLoadingSupported) {
        this._prepareFontLoadEvent(rules, fontsToLoad, request);
      } else {
        request.complete();
      }
    }
  }, {
    key: '_queueLoadingCallback',
    value: function _queueLoadingCallback(callback) {
      function completeRequest() {
        (0, _util.assert)(!request.done, 'completeRequest() cannot be called twice.');
        request.done = true;
        while (context.requests.length > 0 && context.requests[0].done) {
          var otherRequest = context.requests.shift();
          setTimeout(otherRequest.callback, 0);
        }
      }
      var context = this.loadingContext;
      var request = {
        id: 'pdfjs-font-loading-' + context.nextRequestId++,
        done: false,
        complete: completeRequest,
        callback: callback
      };
      context.requests.push(request);
      return request;
    }
  }, {
    key: '_prepareFontLoadEvent',
    value: function _prepareFontLoadEvent(rules, fontsToLoad, request) {
      (0, _util.unreachable)('Abstract method `_prepareFontLoadEvent`.');
    }
  }, {
    key: 'isFontLoadingAPISupported',
    get: function get() {
      (0, _util.unreachable)('Abstract method `isFontLoadingAPISupported`.');
    }
  }, {
    key: 'isSyncFontLoadingSupported',
    get: function get() {
      (0, _util.unreachable)('Abstract method `isSyncFontLoadingSupported`.');
    }
  }, {
    key: '_loadTestFont',
    get: function get() {
      (0, _util.unreachable)('Abstract method `_loadTestFont`.');
    }
  }]);

  return BaseFontLoader;
}();

var FontLoader = void 0;
{
  exports.FontLoader = FontLoader = function (_BaseFontLoader) {
    _inherits(GenericFontLoader, _BaseFontLoader);

    function GenericFontLoader(docId) {
      _classCallCheck(this, GenericFontLoader);

      var _this = _possibleConstructorReturn(this, (GenericFontLoader.__proto__ || Object.getPrototypeOf(GenericFontLoader)).call(this, docId));

      _this.loadTestFontId = 0;
      return _this;
    }

    _createClass(GenericFontLoader, [{
      key: '_prepareFontLoadEvent',
      value: function _prepareFontLoadEvent(rules, fonts, request) {
        function int32(data, offset) {
          return data.charCodeAt(offset) << 24 | data.charCodeAt(offset + 1) << 16 | data.charCodeAt(offset + 2) << 8 | data.charCodeAt(offset + 3) & 0xff;
        }
        function spliceString(s, offset, remove, insert) {
          var chunk1 = s.substring(0, offset);
          var chunk2 = s.substring(offset + remove);
          return chunk1 + insert + chunk2;
        }
        var i = void 0,
            ii = void 0;
        var canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        var ctx = canvas.getContext('2d');
        var called = 0;
        function isFontReady(name, callback) {
          called++;
          if (called > 30) {
            (0, _util.warn)('Load test font never loaded.');
            callback();
            return;
          }
          ctx.font = '30px ' + name;
          ctx.fillText('.', 0, 20);
          var imageData = ctx.getImageData(0, 0, 1, 1);
          if (imageData.data[3] > 0) {
            callback();
            return;
          }
          setTimeout(isFontReady.bind(null, name, callback));
        }
        var loadTestFontId = 'lt' + Date.now() + this.loadTestFontId++;
        var data = this._loadTestFont;
        var COMMENT_OFFSET = 976;
        data = spliceString(data, COMMENT_OFFSET, loadTestFontId.length, loadTestFontId);
        var CFF_CHECKSUM_OFFSET = 16;
        var XXXX_VALUE = 0x58585858;
        var checksum = int32(data, CFF_CHECKSUM_OFFSET);
        for (i = 0, ii = loadTestFontId.length - 3; i < ii; i += 4) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId, i) | 0;
        }
        if (i < loadTestFontId.length) {
          checksum = checksum - XXXX_VALUE + int32(loadTestFontId + 'XXX', i) | 0;
        }
        data = spliceString(data, CFF_CHECKSUM_OFFSET, 4, (0, _util.string32)(checksum));
        var url = 'url(data:font/opentype;base64,' + btoa(data) + ');';
        var rule = '@font-face {font-family:"' + loadTestFontId + '";src:' + url + '}';
        this.insertRule(rule);
        var names = [];
        for (i = 0, ii = fonts.length; i < ii; i++) {
          names.push(fonts[i].loadedName);
        }
        names.push(loadTestFontId);
        var div = document.createElement('div');
        div.setAttribute('style', 'visibility: hidden;' + 'width: 10px; height: 10px;' + 'position: absolute; top: 0px; left: 0px;');
        for (i = 0, ii = names.length; i < ii; ++i) {
          var span = document.createElement('span');
          span.textContent = 'Hi';
          span.style.fontFamily = names[i];
          div.appendChild(span);
        }
        document.body.appendChild(div);
        isFontReady(loadTestFontId, function () {
          document.body.removeChild(div);
          request.complete();
        });
      }
    }, {
      key: 'isFontLoadingAPISupported',
      get: function get() {
        var supported = typeof document !== 'undefined' && !!document.fonts;
        if (supported && typeof navigator !== 'undefined') {
          var m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
          if (m && m[1] < 63) {
            supported = false;
          }
        }
        return (0, _util.shadow)(this, 'isFontLoadingAPISupported', supported);
      }
    }, {
      key: 'isSyncFontLoadingSupported',
      get: function get() {
        var supported = false;
        if (typeof navigator === 'undefined') {
          supported = true;
        } else {
          var m = /Mozilla\/5.0.*?rv:(\d+).*? Gecko/.exec(navigator.userAgent);
          if (m && m[1] >= 14) {
            supported = true;
          }
        }
        return (0, _util.shadow)(this, 'isSyncFontLoadingSupported', supported);
      }
    }, {
      key: '_loadTestFont',
      get: function get() {
        var getLoadTestFont = function getLoadTestFont() {
          return atob('T1RUTwALAIAAAwAwQ0ZGIDHtZg4AAAOYAAAAgUZGVE1lkzZwAAAEHAAAABxHREVGABQA' + 'FQAABDgAAAAeT1MvMlYNYwkAAAEgAAAAYGNtYXABDQLUAAACNAAAAUJoZWFk/xVFDQAA' + 'ALwAAAA2aGhlYQdkA+oAAAD0AAAAJGhtdHgD6AAAAAAEWAAAAAZtYXhwAAJQAAAAARgA' + 'AAAGbmFtZVjmdH4AAAGAAAAAsXBvc3T/hgAzAAADeAAAACAAAQAAAAEAALZRFsRfDzz1' + 'AAsD6AAAAADOBOTLAAAAAM4KHDwAAAAAA+gDIQAAAAgAAgAAAAAAAAABAAADIQAAAFoD' + '6AAAAAAD6AABAAAAAAAAAAAAAAAAAAAAAQAAUAAAAgAAAAQD6AH0AAUAAAKKArwAAACM' + 'AooCvAAAAeAAMQECAAACAAYJAAAAAAAAAAAAAQAAAAAAAAAAAAAAAFBmRWQAwAAuAC4D' + 'IP84AFoDIQAAAAAAAQAAAAAAAAAAACAAIAABAAAADgCuAAEAAAAAAAAAAQAAAAEAAAAA' + 'AAEAAQAAAAEAAAAAAAIAAQAAAAEAAAAAAAMAAQAAAAEAAAAAAAQAAQAAAAEAAAAAAAUA' + 'AQAAAAEAAAAAAAYAAQAAAAMAAQQJAAAAAgABAAMAAQQJAAEAAgABAAMAAQQJAAIAAgAB' + 'AAMAAQQJAAMAAgABAAMAAQQJAAQAAgABAAMAAQQJAAUAAgABAAMAAQQJAAYAAgABWABY' + 'AAAAAAAAAwAAAAMAAAAcAAEAAAAAADwAAwABAAAAHAAEACAAAAAEAAQAAQAAAC7//wAA' + 'AC7////TAAEAAAAAAAABBgAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMAAAAAAAD/gwAyAAAAAQAAAAAAAAAAAAAAAAAA' + 'AAABAAQEAAEBAQJYAAEBASH4DwD4GwHEAvgcA/gXBIwMAYuL+nz5tQXkD5j3CBLnEQAC' + 'AQEBIVhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYAAABAQAADwACAQEEE/t3' + 'Dov6fAH6fAT+fPp8+nwHDosMCvm1Cvm1DAz6fBQAAAAAAAABAAAAAMmJbzEAAAAAzgTj' + 'FQAAAADOBOQpAAEAAAAAAAAADAAUAAQAAAABAAAAAgABAAAAAAAAAAAD6AAAAAAAAA==');
        };
        return (0, _util.shadow)(this, '_loadTestFont', getLoadTestFont());
      }
    }]);

    return GenericFontLoader;
  }(BaseFontLoader);
}
var IsEvalSupportedCached = {
  get value() {
    return (0, _util.shadow)(this, 'value', (0, _util.isEvalSupported)());
  }
};

var FontFaceObject = function () {
  function FontFaceObject(translatedData, _ref) {
    var _ref$isEvalSupported = _ref.isEvalSupported,
        isEvalSupported = _ref$isEvalSupported === undefined ? true : _ref$isEvalSupported,
        _ref$disableFontFace = _ref.disableFontFace,
        disableFontFace = _ref$disableFontFace === undefined ? false : _ref$disableFontFace,
        _ref$ignoreErrors = _ref.ignoreErrors,
        ignoreErrors = _ref$ignoreErrors === undefined ? false : _ref$ignoreErrors,
        _ref$onUnsupportedFea = _ref.onUnsupportedFeature,
        onUnsupportedFeature = _ref$onUnsupportedFea === undefined ? null : _ref$onUnsupportedFea,
        _ref$fontRegistry = _ref.fontRegistry,
        fontRegistry = _ref$fontRegistry === undefined ? null : _ref$fontRegistry;

    _classCallCheck(this, FontFaceObject);

    this.compiledGlyphs = Object.create(null);
    for (var i in translatedData) {
      this[i] = translatedData[i];
    }
    this.isEvalSupported = isEvalSupported !== false;
    this.disableFontFace = disableFontFace === true;
    this.ignoreErrors = ignoreErrors === true;
    this._onUnsupportedFeature = onUnsupportedFeature;
    this.fontRegistry = fontRegistry;
  }

  _createClass(FontFaceObject, [{
    key: 'createNativeFontFace',
    value: function createNativeFontFace() {
      if (!this.data || this.disableFontFace) {
        return null;
      }
      var nativeFontFace = new FontFace(this.loadedName, this.data, {});
      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this);
      }
      return nativeFontFace;
    }
  }, {
    key: 'createFontFaceRule',
    value: function createFontFaceRule() {
      if (!this.data || this.disableFontFace) {
        return null;
      }
      var data = (0, _util.bytesToString)(new Uint8Array(this.data));
      var url = 'url(data:' + this.mimetype + ';base64,' + btoa(data) + ');';
      var rule = '@font-face {font-family:"' + this.loadedName + '";src:' + url + '}';
      if (this.fontRegistry) {
        this.fontRegistry.registerFont(this, url);
      }
      return rule;
    }
  }, {
    key: 'getPathGenerator',
    value: function getPathGenerator(objs, character) {
      if (this.compiledGlyphs[character] !== undefined) {
        return this.compiledGlyphs[character];
      }
      var cmds = void 0,
          current = void 0;
      try {
        cmds = objs.get(this.loadedName + '_path_' + character);
      } catch (ex) {
        if (!this.ignoreErrors) {
          throw ex;
        }
        if (this._onUnsupportedFeature) {
          this._onUnsupportedFeature({ featureId: _util.UNSUPPORTED_FEATURES.font });
        }
        (0, _util.warn)('getPathGenerator - ignoring character: "' + ex + '".');
        return this.compiledGlyphs[character] = function (c, size) {};
      }
      if (this.isEvalSupported && IsEvalSupportedCached.value) {
        var args = void 0,
            js = '';
        for (var i = 0, ii = cmds.length; i < ii; i++) {
          current = cmds[i];
          if (current.args !== undefined) {
            args = current.args.join(',');
          } else {
            args = '';
          }
          js += 'c.' + current.cmd + '(' + args + ');\n';
        }
        return this.compiledGlyphs[character] = new Function('c', 'size', js);
      }
      return this.compiledGlyphs[character] = function (c, size) {
        for (var _i = 0, _ii = cmds.length; _i < _ii; _i++) {
          current = cmds[_i];
          if (current.cmd === 'scale') {
            current.args = [size, -size];
          }
          c[current.cmd].apply(c, current.args);
        }
      };
    }
  }]);

  return FontFaceObject;
}();

exports.FontFaceObject = FontFaceObject;
exports.FontLoader = FontLoader;