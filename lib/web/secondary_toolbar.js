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
exports.SecondaryToolbar = undefined;

var _ui_utils = require('./ui_utils');

var SecondaryToolbar = function SecondaryToolbarClosure() {
  function SecondaryToolbar(options, mainContainer, eventBus) {
    this.toolbar = options.toolbar;
    this.toggleButton = options.toggleButton;
    this.toolbarButtonContainer = options.toolbarButtonContainer;
    this.buttons = [{
      element: options.presentationModeButton,
      eventName: 'presentationmode',
      close: true
    }, {
      element: options.openFileButton,
      eventName: 'openfile',
      close: true
    }, {
      element: options.printButton,
      eventName: 'print',
      close: true
    }, {
      element: options.downloadButton,
      eventName: 'download',
      close: true
    }, {
      element: options.viewBookmarkButton,
      eventName: null,
      close: true
    }, {
      element: options.firstPageButton,
      eventName: 'firstpage',
      close: true
    }, {
      element: options.lastPageButton,
      eventName: 'lastpage',
      close: true
    }, {
      element: options.pageRotateCwButton,
      eventName: 'rotatecw',
      close: false
    }, {
      element: options.pageRotateCcwButton,
      eventName: 'rotateccw',
      close: false
    }, {
      element: options.toggleHandToolButton,
      eventName: 'togglehandtool',
      close: true
    }, {
      element: options.documentPropertiesButton,
      eventName: 'documentproperties',
      close: true
    }];
    this.items = {
      firstPage: options.firstPageButton,
      lastPage: options.lastPageButton,
      pageRotateCw: options.pageRotateCwButton,
      pageRotateCcw: options.pageRotateCcwButton
    };
    this.mainContainer = mainContainer;
    this.eventBus = eventBus;
    this.opened = false;
    this.containerHeight = null;
    this.previousContainerHeight = null;
    this.reset();
    this._bindClickListeners();
    this._bindHandToolListener(options.toggleHandToolButton);
    this.eventBus.on('resize', this._setMaxHeight.bind(this));
  }
  SecondaryToolbar.prototype = {
    get isOpen() {
      return this.opened;
    },
    setPageNumber: function SecondaryToolbar_setPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
      this._updateUIState();
    },
    setPagesCount: function SecondaryToolbar_setPagesCount(pagesCount) {
      this.pagesCount = pagesCount;
      this._updateUIState();
    },
    reset: function SecondaryToolbar_reset() {
      this.pageNumber = 0;
      this.pagesCount = 0;
      this._updateUIState();
    },
    _updateUIState: function SecondaryToolbar_updateUIState() {
      var items = this.items;
      items.firstPage.disabled = this.pageNumber <= 1;
      items.lastPage.disabled = this.pageNumber >= this.pagesCount;
      items.pageRotateCw.disabled = this.pagesCount === 0;
      items.pageRotateCcw.disabled = this.pagesCount === 0;
    },
    _bindClickListeners: function SecondaryToolbar_bindClickListeners() {
      this.toggleButton.addEventListener('click', this.toggle.bind(this));
      for (var button in this.buttons) {
        var element = this.buttons[button].element;
        var eventName = this.buttons[button].eventName;
        var close = this.buttons[button].close;
        element.addEventListener('click', function (eventName, close) {
          if (eventName !== null) {
            this.eventBus.dispatch(eventName, { source: this });
          }
          if (close) {
            this.close();
          }
        }.bind(this, eventName, close));
      }
    },
    _bindHandToolListener: function SecondaryToolbar_bindHandToolListener(toggleHandToolButton) {
      var isHandToolActive = false;
      this.eventBus.on('handtoolchanged', function (e) {
        if (isHandToolActive === e.isActive) {
          return;
        }
        isHandToolActive = e.isActive;
        if (isHandToolActive) {
          toggleHandToolButton.title = _ui_utils.mozL10n.get('hand_tool_disable.title', null, 'Disable hand tool');
          toggleHandToolButton.firstElementChild.textContent = _ui_utils.mozL10n.get('hand_tool_disable_label', null, 'Disable hand tool');
        } else {
          toggleHandToolButton.title = _ui_utils.mozL10n.get('hand_tool_enable.title', null, 'Enable hand tool');
          toggleHandToolButton.firstElementChild.textContent = _ui_utils.mozL10n.get('hand_tool_enable_label', null, 'Enable hand tool');
        }
      });
    },
    open: function SecondaryToolbar_open() {
      if (this.opened) {
        return;
      }
      this.opened = true;
      this._setMaxHeight();
      this.toggleButton.classList.add('toggled');
      this.toolbar.classList.remove('hidden');
    },
    close: function SecondaryToolbar_close() {
      if (!this.opened) {
        return;
      }
      this.opened = false;
      this.toolbar.classList.add('hidden');
      this.toggleButton.classList.remove('toggled');
    },
    toggle: function SecondaryToolbar_toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    },
    _setMaxHeight: function SecondaryToolbar_setMaxHeight() {
      if (!this.opened) {
        return;
      }
      this.containerHeight = this.mainContainer.clientHeight;
      if (this.containerHeight === this.previousContainerHeight) {
        return;
      }
      this.toolbarButtonContainer.setAttribute('style', 'max-height: ' + (this.containerHeight - _ui_utils.SCROLLBAR_PADDING) + 'px;');
      this.previousContainerHeight = this.containerHeight;
    }
  };
  return SecondaryToolbar;
}();
exports.SecondaryToolbar = SecondaryToolbar;