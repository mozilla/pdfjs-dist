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
exports.PDFPresentationMode = undefined;

var _ui_utils = require('./ui_utils');

var DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS = 1500;
var DELAY_BEFORE_HIDING_CONTROLS = 3000;
var ACTIVE_SELECTOR = 'pdfPresentationMode';
var CONTROLS_SELECTOR = 'pdfPresentationModeControls';
var PDFPresentationMode = function PDFPresentationModeClosure() {
  function PDFPresentationMode(options) {
    this.container = options.container;
    this.viewer = options.viewer || options.container.firstElementChild;
    this.pdfViewer = options.pdfViewer;
    this.eventBus = options.eventBus;
    var contextMenuItems = options.contextMenuItems || null;
    this.active = false;
    this.args = null;
    this.contextMenuOpen = false;
    this.mouseScrollTimeStamp = 0;
    this.mouseScrollDelta = 0;
    this.touchSwipeState = null;
    if (contextMenuItems) {
      contextMenuItems.contextFirstPage.addEventListener('click', function PDFPresentationMode_contextFirstPageClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('firstpage');
      }.bind(this));
      contextMenuItems.contextLastPage.addEventListener('click', function PDFPresentationMode_contextLastPageClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('lastpage');
      }.bind(this));
      contextMenuItems.contextPageRotateCw.addEventListener('click', function PDFPresentationMode_contextPageRotateCwClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('rotatecw');
      }.bind(this));
      contextMenuItems.contextPageRotateCcw.addEventListener('click', function PDFPresentationMode_contextPageRotateCcwClick(e) {
        this.contextMenuOpen = false;
        this.eventBus.dispatch('rotateccw');
      }.bind(this));
    }
  }
  PDFPresentationMode.prototype = {
    request: function PDFPresentationMode_request() {
      if (this.switchInProgress || this.active || !this.viewer.hasChildNodes()) {
        return false;
      }
      this._addFullscreenChangeListeners();
      this._setSwitchInProgress();
      this._notifyStateChange();
      if (this.container.requestFullscreen) {
        this.container.requestFullscreen();
      } else if (this.container.mozRequestFullScreen) {
        this.container.mozRequestFullScreen();
      } else if (this.container.webkitRequestFullscreen) {
        this.container.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (this.container.msRequestFullscreen) {
        this.container.msRequestFullscreen();
      } else {
        return false;
      }
      this.args = {
        page: this.pdfViewer.currentPageNumber,
        previousScale: this.pdfViewer.currentScaleValue
      };
      return true;
    },
    _mouseWheel: function PDFPresentationMode_mouseWheel(evt) {
      if (!this.active) {
        return;
      }
      evt.preventDefault();
      var delta = (0, _ui_utils.normalizeWheelEventDelta)(evt);
      var MOUSE_SCROLL_COOLDOWN_TIME = 50;
      var PAGE_SWITCH_THRESHOLD = 0.1;
      var currentTime = new Date().getTime();
      var storedTime = this.mouseScrollTimeStamp;
      if (currentTime > storedTime && currentTime - storedTime < MOUSE_SCROLL_COOLDOWN_TIME) {
        return;
      }
      if (this.mouseScrollDelta > 0 && delta < 0 || this.mouseScrollDelta < 0 && delta > 0) {
        this._resetMouseScrollState();
      }
      this.mouseScrollDelta += delta;
      if (Math.abs(this.mouseScrollDelta) >= PAGE_SWITCH_THRESHOLD) {
        var totalDelta = this.mouseScrollDelta;
        this._resetMouseScrollState();
        var success = totalDelta > 0 ? this._goToPreviousPage() : this._goToNextPage();
        if (success) {
          this.mouseScrollTimeStamp = currentTime;
        }
      }
    },
    get isFullscreen() {
      return !!(document.fullscreenElement || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement);
    },
    _goToPreviousPage: function PDFPresentationMode_goToPreviousPage() {
      var page = this.pdfViewer.currentPageNumber;
      if (page <= 1) {
        return false;
      }
      this.pdfViewer.currentPageNumber = page - 1;
      return true;
    },
    _goToNextPage: function PDFPresentationMode_goToNextPage() {
      var page = this.pdfViewer.currentPageNumber;
      if (page >= this.pdfViewer.pagesCount) {
        return false;
      }
      this.pdfViewer.currentPageNumber = page + 1;
      return true;
    },
    _notifyStateChange: function PDFPresentationMode_notifyStateChange() {
      this.eventBus.dispatch('presentationmodechanged', {
        source: this,
        active: this.active,
        switchInProgress: !!this.switchInProgress
      });
    },
    _setSwitchInProgress: function PDFPresentationMode_setSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
      }
      this.switchInProgress = setTimeout(function switchInProgressTimeout() {
        this._removeFullscreenChangeListeners();
        delete this.switchInProgress;
        this._notifyStateChange();
      }.bind(this), DELAY_BEFORE_RESETTING_SWITCH_IN_PROGRESS);
    },
    _resetSwitchInProgress: function PDFPresentationMode_resetSwitchInProgress() {
      if (this.switchInProgress) {
        clearTimeout(this.switchInProgress);
        delete this.switchInProgress;
      }
    },
    _enter: function PDFPresentationMode_enter() {
      this.active = true;
      this._resetSwitchInProgress();
      this._notifyStateChange();
      this.container.classList.add(ACTIVE_SELECTOR);
      setTimeout(function enterPresentationModeTimeout() {
        this.pdfViewer.currentPageNumber = this.args.page;
        this.pdfViewer.currentScaleValue = 'page-fit';
      }.bind(this), 0);
      this._addWindowListeners();
      this._showControls();
      this.contextMenuOpen = false;
      this.container.setAttribute('contextmenu', 'viewerContextMenu');
      window.getSelection().removeAllRanges();
    },
    _exit: function PDFPresentationMode_exit() {
      var page = this.pdfViewer.currentPageNumber;
      this.container.classList.remove(ACTIVE_SELECTOR);
      setTimeout(function exitPresentationModeTimeout() {
        this.active = false;
        this._removeFullscreenChangeListeners();
        this._notifyStateChange();
        this.pdfViewer.currentScaleValue = this.args.previousScale;
        this.pdfViewer.currentPageNumber = page;
        this.args = null;
      }.bind(this), 0);
      this._removeWindowListeners();
      this._hideControls();
      this._resetMouseScrollState();
      this.container.removeAttribute('contextmenu');
      this.contextMenuOpen = false;
    },
    _mouseDown: function PDFPresentationMode_mouseDown(evt) {
      if (this.contextMenuOpen) {
        this.contextMenuOpen = false;
        evt.preventDefault();
        return;
      }
      if (evt.button === 0) {
        var isInternalLink = evt.target.href && evt.target.classList.contains('internalLink');
        if (!isInternalLink) {
          evt.preventDefault();
          this.pdfViewer.currentPageNumber += evt.shiftKey ? -1 : 1;
        }
      }
    },
    _contextMenu: function PDFPresentationMode_contextMenu() {
      this.contextMenuOpen = true;
    },
    _showControls: function PDFPresentationMode_showControls() {
      if (this.controlsTimeout) {
        clearTimeout(this.controlsTimeout);
      } else {
        this.container.classList.add(CONTROLS_SELECTOR);
      }
      this.controlsTimeout = setTimeout(function showControlsTimeout() {
        this.container.classList.remove(CONTROLS_SELECTOR);
        delete this.controlsTimeout;
      }.bind(this), DELAY_BEFORE_HIDING_CONTROLS);
    },
    _hideControls: function PDFPresentationMode_hideControls() {
      if (!this.controlsTimeout) {
        return;
      }
      clearTimeout(this.controlsTimeout);
      this.container.classList.remove(CONTROLS_SELECTOR);
      delete this.controlsTimeout;
    },
    _resetMouseScrollState: function PDFPresentationMode_resetMouseScrollState() {
      this.mouseScrollTimeStamp = 0;
      this.mouseScrollDelta = 0;
    },
    _touchSwipe: function PDFPresentationMode_touchSwipe(evt) {
      if (!this.active) {
        return;
      }
      var SWIPE_MIN_DISTANCE_THRESHOLD = 50;
      var SWIPE_ANGLE_THRESHOLD = Math.PI / 6;
      if (evt.touches.length > 1) {
        this.touchSwipeState = null;
        return;
      }
      switch (evt.type) {
        case 'touchstart':
          this.touchSwipeState = {
            startX: evt.touches[0].pageX,
            startY: evt.touches[0].pageY,
            endX: evt.touches[0].pageX,
            endY: evt.touches[0].pageY
          };
          break;
        case 'touchmove':
          if (this.touchSwipeState === null) {
            return;
          }
          this.touchSwipeState.endX = evt.touches[0].pageX;
          this.touchSwipeState.endY = evt.touches[0].pageY;
          evt.preventDefault();
          break;
        case 'touchend':
          if (this.touchSwipeState === null) {
            return;
          }
          var delta = 0;
          var dx = this.touchSwipeState.endX - this.touchSwipeState.startX;
          var dy = this.touchSwipeState.endY - this.touchSwipeState.startY;
          var absAngle = Math.abs(Math.atan2(dy, dx));
          if (Math.abs(dx) > SWIPE_MIN_DISTANCE_THRESHOLD && (absAngle <= SWIPE_ANGLE_THRESHOLD || absAngle >= Math.PI - SWIPE_ANGLE_THRESHOLD)) {
            delta = dx;
          } else if (Math.abs(dy) > SWIPE_MIN_DISTANCE_THRESHOLD && Math.abs(absAngle - Math.PI / 2) <= SWIPE_ANGLE_THRESHOLD) {
            delta = dy;
          }
          if (delta > 0) {
            this._goToPreviousPage();
          } else if (delta < 0) {
            this._goToNextPage();
          }
          break;
      }
    },
    _addWindowListeners: function PDFPresentationMode_addWindowListeners() {
      this.showControlsBind = this._showControls.bind(this);
      this.mouseDownBind = this._mouseDown.bind(this);
      this.mouseWheelBind = this._mouseWheel.bind(this);
      this.resetMouseScrollStateBind = this._resetMouseScrollState.bind(this);
      this.contextMenuBind = this._contextMenu.bind(this);
      this.touchSwipeBind = this._touchSwipe.bind(this);
      window.addEventListener('mousemove', this.showControlsBind);
      window.addEventListener('mousedown', this.mouseDownBind);
      window.addEventListener('wheel', this.mouseWheelBind);
      window.addEventListener('keydown', this.resetMouseScrollStateBind);
      window.addEventListener('contextmenu', this.contextMenuBind);
      window.addEventListener('touchstart', this.touchSwipeBind);
      window.addEventListener('touchmove', this.touchSwipeBind);
      window.addEventListener('touchend', this.touchSwipeBind);
    },
    _removeWindowListeners: function PDFPresentationMode_removeWindowListeners() {
      window.removeEventListener('mousemove', this.showControlsBind);
      window.removeEventListener('mousedown', this.mouseDownBind);
      window.removeEventListener('wheel', this.mouseWheelBind);
      window.removeEventListener('keydown', this.resetMouseScrollStateBind);
      window.removeEventListener('contextmenu', this.contextMenuBind);
      window.removeEventListener('touchstart', this.touchSwipeBind);
      window.removeEventListener('touchmove', this.touchSwipeBind);
      window.removeEventListener('touchend', this.touchSwipeBind);
      delete this.showControlsBind;
      delete this.mouseDownBind;
      delete this.mouseWheelBind;
      delete this.resetMouseScrollStateBind;
      delete this.contextMenuBind;
      delete this.touchSwipeBind;
    },
    _fullscreenChange: function PDFPresentationMode_fullscreenChange() {
      if (this.isFullscreen) {
        this._enter();
      } else {
        this._exit();
      }
    },
    _addFullscreenChangeListeners: function PDFPresentationMode_addFullscreenChangeListeners() {
      this.fullscreenChangeBind = this._fullscreenChange.bind(this);
      window.addEventListener('fullscreenchange', this.fullscreenChangeBind);
      window.addEventListener('mozfullscreenchange', this.fullscreenChangeBind);
      window.addEventListener('webkitfullscreenchange', this.fullscreenChangeBind);
      window.addEventListener('MSFullscreenChange', this.fullscreenChangeBind);
    },
    _removeFullscreenChangeListeners: function PDFPresentationMode_removeFullscreenChangeListeners() {
      window.removeEventListener('fullscreenchange', this.fullscreenChangeBind);
      window.removeEventListener('mozfullscreenchange', this.fullscreenChangeBind);
      window.removeEventListener('webkitfullscreenchange', this.fullscreenChangeBind);
      window.removeEventListener('MSFullscreenChange', this.fullscreenChangeBind);
      delete this.fullscreenChangeBind;
    }
  };
  return PDFPresentationMode;
}();
exports.PDFPresentationMode = PDFPresentationMode;