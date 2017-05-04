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
var OverlayManager = {
  overlays: {},
  active: null,
  register: function register(name, element, callerCloseMethod, canForceClose) {
    var _this = this;

    return new Promise(function (resolve) {
      var container;
      if (!name || !element || !(container = element.parentNode)) {
        throw new Error('Not enough parameters.');
      } else if (_this.overlays[name]) {
        throw new Error('The overlay is already registered.');
      }
      _this.overlays[name] = {
        element: element,
        container: container,
        callerCloseMethod: callerCloseMethod || null,
        canForceClose: canForceClose || false
      };
      resolve();
    });
  },
  unregister: function unregister(name) {
    var _this2 = this;

    return new Promise(function (resolve) {
      if (!_this2.overlays[name]) {
        throw new Error('The overlay does not exist.');
      } else if (_this2.active === name) {
        throw new Error('The overlay cannot be removed while it is active.');
      }
      delete _this2.overlays[name];
      resolve();
    });
  },
  open: function open(name) {
    var _this3 = this;

    return new Promise(function (resolve) {
      if (!_this3.overlays[name]) {
        throw new Error('The overlay does not exist.');
      } else if (_this3.active) {
        if (_this3.overlays[name].canForceClose) {
          _this3._closeThroughCaller();
        } else if (_this3.active === name) {
          throw new Error('The overlay is already active.');
        } else {
          throw new Error('Another overlay is currently active.');
        }
      }
      _this3.active = name;
      _this3.overlays[_this3.active].element.classList.remove('hidden');
      _this3.overlays[_this3.active].container.classList.remove('hidden');
      window.addEventListener('keydown', _this3._keyDown);
      resolve();
    });
  },
  close: function close(name) {
    var _this4 = this;

    return new Promise(function (resolve) {
      if (!_this4.overlays[name]) {
        throw new Error('The overlay does not exist.');
      } else if (!_this4.active) {
        throw new Error('The overlay is currently not active.');
      } else if (_this4.active !== name) {
        throw new Error('Another overlay is currently active.');
      }
      _this4.overlays[_this4.active].container.classList.add('hidden');
      _this4.overlays[_this4.active].element.classList.add('hidden');
      _this4.active = null;
      window.removeEventListener('keydown', _this4._keyDown);
      resolve();
    });
  },
  _keyDown: function _keyDown(evt) {
    var self = OverlayManager;
    if (self.active && evt.keyCode === 27) {
      self._closeThroughCaller();
      evt.preventDefault();
    }
  },
  _closeThroughCaller: function _closeThroughCaller() {
    if (this.overlays[this.active].callerCloseMethod) {
      this.overlays[this.active].callerCloseMethod();
    }
    if (this.active) {
      this.close(this.active);
    }
  }
};
exports.OverlayManager = OverlayManager;