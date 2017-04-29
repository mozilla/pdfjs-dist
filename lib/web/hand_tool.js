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

var _grab_to_pan = require('./grab_to_pan');

var _ui_utils = require('./ui_utils');

var HandTool = function HandToolClosure() {
  function HandTool(options) {
    var _this = this;

    this.container = options.container;
    this.eventBus = options.eventBus;
    var preferences = options.preferences;
    this.wasActive = false;
    this.handTool = new _grab_to_pan.GrabToPan({
      element: this.container,
      onActiveChanged: function onActiveChanged(isActive) {
        _this.eventBus.dispatch('handtoolchanged', { isActive: isActive });
      }
    });
    this.eventBus.on('togglehandtool', this.toggle.bind(this));
    Promise.all([_ui_utils.localized, preferences.get('enableHandToolOnLoad')]).then(function (values) {
      if (values[1] === true) {
        _this.handTool.activate();
      }
    }).catch(function rejected(reason) {});
    this.eventBus.on('presentationmodechanged', function (e) {
      if (e.switchInProgress) {
        return;
      }
      if (e.active) {
        this.enterPresentationMode();
      } else {
        this.exitPresentationMode();
      }
    }.bind(this));
  }
  HandTool.prototype = {
    get isActive() {
      return !!this.handTool.active;
    },
    toggle: function HandTool_toggle() {
      this.handTool.toggle();
    },
    enterPresentationMode: function HandTool_enterPresentationMode() {
      if (this.isActive) {
        this.wasActive = true;
        this.handTool.deactivate();
      }
    },
    exitPresentationMode: function HandTool_exitPresentationMode() {
      if (this.wasActive) {
        this.wasActive = false;
        this.handTool.activate();
      }
    }
  };
  return HandTool;
}();
exports.HandTool = HandTool;