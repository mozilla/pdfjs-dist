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
exports.OptionKind = exports.AppOptions = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pdf = require('../pdf');

var _viewer_compatibility = require('./viewer_compatibility');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionKind = {
  VIEWER: 'viewer',
  API: 'api',
  WORKER: 'worker'
};
var defaultOptions = {
  cursorToolOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER
  },
  defaultUrl: {
    value: 'compressed.tracemonkey-pldi-09.pdf',
    kind: OptionKind.VIEWER
  },
  defaultZoomValue: {
    value: '',
    kind: OptionKind.VIEWER
  },
  disableFullscreen: {
    value: _viewer_compatibility.viewerCompatibilityParams.disableFullscreen || false,
    kind: OptionKind.VIEWER
  },
  disableHistory: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageLabels: {
    value: false,
    kind: OptionKind.VIEWER
  },
  disablePageMode: {
    value: false,
    kind: OptionKind.VIEWER
  },
  enablePrintAutoRotate: {
    value: false,
    kind: OptionKind.VIEWER
  },
  enableWebGL: {
    value: false,
    kind: OptionKind.VIEWER
  },
  externalLinkRel: {
    value: 'noopener noreferrer nofollow',
    kind: OptionKind.VIEWER
  },
  externalLinkTarget: {
    value: 0,
    kind: OptionKind.VIEWER
  },
  imageResourcesPath: {
    value: './images/',
    kind: OptionKind.VIEWER
  },
  locale: {
    value: typeof navigator !== 'undefined' ? navigator.language : 'en-US',
    kind: OptionKind.VIEWER
  },
  maxCanvasPixels: {
    value: _viewer_compatibility.viewerCompatibilityParams.maxCanvasPixels || 16777216,
    kind: OptionKind.VIEWER
  },
  pdfBugEnabled: {
    value: false,
    kind: OptionKind.VIEWER
  },
  renderer: {
    value: 'canvas',
    kind: OptionKind.VIEWER
  },
  renderInteractiveForms: {
    value: false,
    kind: OptionKind.VIEWER
  },
  showPreviousViewOnLoad: {
    value: true,
    kind: OptionKind.VIEWER
  },
  sidebarViewOnLoad: {
    value: 0,
    kind: OptionKind.VIEWER
  },
  textLayerMode: {
    value: 1,
    kind: OptionKind.VIEWER
  },
  useOnlyCssZoom: {
    value: false,
    kind: OptionKind.VIEWER
  },
  cMapPacked: {
    value: true,
    kind: OptionKind.API
  },
  cMapUrl: {
    value: '../web/cmaps/',
    kind: OptionKind.API
  },
  disableAutoFetch: {
    value: false,
    kind: OptionKind.API
  },
  disableCreateObjectURL: {
    value: _pdf.apiCompatibilityParams.disableCreateObjectURL || false,
    kind: OptionKind.API
  },
  disableFontFace: {
    value: false,
    kind: OptionKind.API
  },
  disableRange: {
    value: _pdf.apiCompatibilityParams.disableRange || false,
    kind: OptionKind.API
  },
  disableStream: {
    value: _pdf.apiCompatibilityParams.disableStream || false,
    kind: OptionKind.API
  },
  isEvalSupported: {
    value: true,
    kind: OptionKind.API
  },
  maxImageSize: {
    value: -1,
    kind: OptionKind.API
  },
  pdfBug: {
    value: false,
    kind: OptionKind.API
  },
  postMessageTransfers: {
    value: true,
    kind: OptionKind.API
  },
  verbosity: {
    value: 1,
    kind: OptionKind.API
  },
  workerPort: {
    value: null,
    kind: OptionKind.WORKER
  },
  workerSrc: {
    value: '../build/pdf.worker.js',
    kind: OptionKind.WORKER
  }
};
var userOptions = Object.create(null);

var AppOptions = function () {
  function AppOptions() {
    _classCallCheck(this, AppOptions);

    throw new Error('Cannot initialize AppOptions.');
  }

  _createClass(AppOptions, null, [{
    key: 'get',
    value: function get(name) {
      var defaultOption = defaultOptions[name],
          userOption = userOptions[name];
      if (userOption !== undefined) {
        return userOption;
      }
      return defaultOption !== undefined ? defaultOption.value : undefined;
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var kind = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      var options = Object.create(null);
      for (var name in defaultOptions) {
        var defaultOption = defaultOptions[name],
            userOption = userOptions[name];
        if (kind && defaultOption.kind !== kind) {
          continue;
        }
        options[name] = userOption !== undefined ? userOption : defaultOption.value;
      }
      return options;
    }
  }, {
    key: 'set',
    value: function set(name, value) {
      userOptions[name] = value;
    }
  }, {
    key: 'remove',
    value: function remove(name) {
      delete userOptions[name];
    }
  }]);

  return AppOptions;
}();

exports.AppOptions = AppOptions;
exports.OptionKind = OptionKind;