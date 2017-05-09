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
exports.HandTool = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _grab_to_pan = require('./grab_to_pan');

var _ui_utils = require('./ui_utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HandTool = function () {
  function HandTool(_ref) {
    var _this = this;

    var container = _ref.container,
        eventBus = _ref.eventBus,
        preferences = _ref.preferences;

    _classCallCheck(this, HandTool);

    this.container = container;
    this.eventBus = eventBus;
    this.wasActive = false;
    this.handTool = new _grab_to_pan.GrabToPan({
      element: this.container,
      onActiveChanged: function onActiveChanged(isActive) {
        _this.eventBus.dispatch('handtoolchanged', { isActive: isActive });
      }
    });
    this.eventBus.on('togglehandtool', this.toggle.bind(this));
    var enableOnLoad = preferences.get('enableHandToolOnLoad');
    Promise.all([_ui_utils.localized, enableOnLoad]).then(function (values) {
      if (values[1] === true) {
        _this.handTool.activate();
      }
    }).catch(function (reason) {});
    this.eventBus.on('presentationmodechanged', function (evt) {
      if (evt.switchInProgress) {
        return;
      }
      if (evt.active) {
        _this.enterPresentationMode();
      } else {
        _this.exitPresentationMode();
      }
    });
  }

  _createClass(HandTool, [{
    key: 'toggle',
    value: function toggle() {
      this.handTool.toggle();
    }
  }, {
    key: 'enterPresentationMode',
    value: function enterPresentationMode() {
      if (this.isActive) {
        this.wasActive = true;
        this.handTool.deactivate();
      }
    }
  }, {
    key: 'exitPresentationMode',
    value: function exitPresentationMode() {
      if (this.wasActive) {
        this.wasActive = false;
        this.handTool.activate();
      }
    }
  }, {
    key: 'isActive',
    get: function get() {
      return !!this.handTool.active;
    }
  }]);

  return HandTool;
}();

exports.HandTool = HandTool;