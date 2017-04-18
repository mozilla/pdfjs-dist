/* Copyright 2017 Mozilla Foundation
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
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PasswordPrompt = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ui_utils = require('./ui_utils');

var _overlay_manager = require('./overlay_manager');

var _pdfjs = require('./pdfjs');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PasswordPrompt = function () {
  function PasswordPrompt(options) {
    var _this = this;

    _classCallCheck(this, PasswordPrompt);

    this.overlayName = options.overlayName;
    this.container = options.container;
    this.label = options.label;
    this.input = options.input;
    this.submitButton = options.submitButton;
    this.cancelButton = options.cancelButton;
    this.updateCallback = null;
    this.reason = null;
    this.submitButton.addEventListener('click', this.verify.bind(this));
    this.cancelButton.addEventListener('click', this.close.bind(this));
    this.input.addEventListener('keydown', function (e) {
      if (e.keyCode === 13) {
        _this.verify();
      }
    });
    _overlay_manager.OverlayManager.register(this.overlayName, this.container, this.close.bind(this), true);
  }

  _createClass(PasswordPrompt, [{
    key: 'open',
    value: function open() {
      var _this2 = this;

      _overlay_manager.OverlayManager.open(this.overlayName).then(function () {
        _this2.input.focus();
        var promptString = _ui_utils.mozL10n.get('password_label', null, 'Enter the password to open this PDF file.');
        if (_this2.reason === _pdfjs.PasswordResponses.INCORRECT_PASSWORD) {
          promptString = _ui_utils.mozL10n.get('password_invalid', null, 'Invalid password. Please try again.');
        }
        _this2.label.textContent = promptString;
      });
    }
  }, {
    key: 'close',
    value: function close() {
      var _this3 = this;

      _overlay_manager.OverlayManager.close(this.overlayName).then(function () {
        _this3.input.value = '';
      });
    }
  }, {
    key: 'verify',
    value: function verify() {
      var password = this.input.value;
      if (password && password.length > 0) {
        this.close();
        return this.updateCallback(password);
      }
    }
  }, {
    key: 'setUpdateCallback',
    value: function setUpdateCallback(updateCallback, reason) {
      this.updateCallback = updateCallback;
      this.reason = reason;
    }
  }]);

  return PasswordPrompt;
}();

exports.PasswordPrompt = PasswordPrompt;