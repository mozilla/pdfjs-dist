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
exports.SecondaryToolbar = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base_viewer = require('./base_viewer');

var _pdf_cursor_tools = require('./pdf_cursor_tools');

var _pdf_single_page_viewer = require('./pdf_single_page_viewer');

var _ui_utils = require('./ui_utils');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SecondaryToolbar = function () {
  function SecondaryToolbar(options, mainContainer, eventBus) {
    var _this = this;

    _classCallCheck(this, SecondaryToolbar);

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
      element: options.cursorSelectToolButton,
      eventName: 'switchcursortool',
      eventDetails: { tool: _pdf_cursor_tools.CursorTool.SELECT },
      close: true
    }, {
      element: options.cursorHandToolButton,
      eventName: 'switchcursortool',
      eventDetails: { tool: _pdf_cursor_tools.CursorTool.HAND },
      close: true
    }, {
      element: options.scrollVerticalButton,
      eventName: 'switchscrollmode',
      eventDetails: { mode: _base_viewer.ScrollMode.VERTICAL },
      close: true
    }, {
      element: options.scrollHorizontalButton,
      eventName: 'switchscrollmode',
      eventDetails: { mode: _base_viewer.ScrollMode.HORIZONTAL },
      close: true
    }, {
      element: options.scrollWrappedButton,
      eventName: 'switchscrollmode',
      eventDetails: { mode: _base_viewer.ScrollMode.WRAPPED },
      close: true
    }, {
      element: options.spreadNoneButton,
      eventName: 'switchspreadmode',
      eventDetails: { mode: _base_viewer.SpreadMode.NONE },
      close: true
    }, {
      element: options.spreadOddButton,
      eventName: 'switchspreadmode',
      eventDetails: { mode: _base_viewer.SpreadMode.ODD },
      close: true
    }, {
      element: options.spreadEvenButton,
      eventName: 'switchspreadmode',
      eventDetails: { mode: _base_viewer.SpreadMode.EVEN },
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
    this._bindCursorToolsListener(options);
    this._bindScrollModeListener(options);
    this._bindSpreadModeListener(options);
    this.eventBus.on('resize', this._setMaxHeight.bind(this));
    this.eventBus.on('baseviewerinit', function (evt) {
      if (evt.source instanceof _pdf_single_page_viewer.PDFSinglePageViewer) {
        _this.toolbarButtonContainer.classList.add('hiddenScrollModeButtons', 'hiddenSpreadModeButtons');
      } else {
        _this.toolbarButtonContainer.classList.remove('hiddenScrollModeButtons', 'hiddenSpreadModeButtons');
      }
    });
  }

  _createClass(SecondaryToolbar, [{
    key: 'setPageNumber',
    value: function setPageNumber(pageNumber) {
      this.pageNumber = pageNumber;
      this._updateUIState();
    }
  }, {
    key: 'setPagesCount',
    value: function setPagesCount(pagesCount) {
      this.pagesCount = pagesCount;
      this._updateUIState();
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.pageNumber = 0;
      this.pagesCount = 0;
      this._updateUIState();
      this.eventBus.dispatch('secondarytoolbarreset', { source: this });
    }
  }, {
    key: '_updateUIState',
    value: function _updateUIState() {
      this.items.firstPage.disabled = this.pageNumber <= 1;
      this.items.lastPage.disabled = this.pageNumber >= this.pagesCount;
      this.items.pageRotateCw.disabled = this.pagesCount === 0;
      this.items.pageRotateCcw.disabled = this.pagesCount === 0;
    }
  }, {
    key: '_bindClickListeners',
    value: function _bindClickListeners() {
      var _this2 = this;

      this.toggleButton.addEventListener('click', this.toggle.bind(this));

      var _loop = function _loop(button) {
        var _buttons$button = _this2.buttons[button],
            element = _buttons$button.element,
            eventName = _buttons$button.eventName,
            close = _buttons$button.close,
            eventDetails = _buttons$button.eventDetails;

        element.addEventListener('click', function (evt) {
          if (eventName !== null) {
            var details = { source: _this2 };
            for (var property in eventDetails) {
              details[property] = eventDetails[property];
            }
            _this2.eventBus.dispatch(eventName, details);
          }
          if (close) {
            _this2.close();
          }
        });
      };

      for (var button in this.buttons) {
        _loop(button);
      }
    }
  }, {
    key: '_bindCursorToolsListener',
    value: function _bindCursorToolsListener(buttons) {
      this.eventBus.on('cursortoolchanged', function (evt) {
        buttons.cursorSelectToolButton.classList.remove('toggled');
        buttons.cursorHandToolButton.classList.remove('toggled');
        switch (evt.tool) {
          case _pdf_cursor_tools.CursorTool.SELECT:
            buttons.cursorSelectToolButton.classList.add('toggled');
            break;
          case _pdf_cursor_tools.CursorTool.HAND:
            buttons.cursorHandToolButton.classList.add('toggled');
            break;
        }
      });
    }
  }, {
    key: '_bindScrollModeListener',
    value: function _bindScrollModeListener(buttons) {
      var _this3 = this;

      function scrollModeChanged(evt) {
        buttons.scrollVerticalButton.classList.remove('toggled');
        buttons.scrollHorizontalButton.classList.remove('toggled');
        buttons.scrollWrappedButton.classList.remove('toggled');
        switch (evt.mode) {
          case _base_viewer.ScrollMode.VERTICAL:
            buttons.scrollVerticalButton.classList.add('toggled');
            break;
          case _base_viewer.ScrollMode.HORIZONTAL:
            buttons.scrollHorizontalButton.classList.add('toggled');
            break;
          case _base_viewer.ScrollMode.WRAPPED:
            buttons.scrollWrappedButton.classList.add('toggled');
            break;
        }
        var isScrollModeHorizontal = evt.mode === _base_viewer.ScrollMode.HORIZONTAL;
        buttons.spreadNoneButton.disabled = isScrollModeHorizontal;
        buttons.spreadOddButton.disabled = isScrollModeHorizontal;
        buttons.spreadEvenButton.disabled = isScrollModeHorizontal;
      }
      this.eventBus.on('scrollmodechanged', scrollModeChanged);
      this.eventBus.on('secondarytoolbarreset', function (evt) {
        if (evt.source === _this3) {
          scrollModeChanged({ mode: _base_viewer.ScrollMode.VERTICAL });
        }
      });
    }
  }, {
    key: '_bindSpreadModeListener',
    value: function _bindSpreadModeListener(buttons) {
      var _this4 = this;

      function spreadModeChanged(evt) {
        buttons.spreadNoneButton.classList.remove('toggled');
        buttons.spreadOddButton.classList.remove('toggled');
        buttons.spreadEvenButton.classList.remove('toggled');
        switch (evt.mode) {
          case _base_viewer.SpreadMode.NONE:
            buttons.spreadNoneButton.classList.add('toggled');
            break;
          case _base_viewer.SpreadMode.ODD:
            buttons.spreadOddButton.classList.add('toggled');
            break;
          case _base_viewer.SpreadMode.EVEN:
            buttons.spreadEvenButton.classList.add('toggled');
            break;
        }
      }
      this.eventBus.on('spreadmodechanged', spreadModeChanged);
      this.eventBus.on('secondarytoolbarreset', function (evt) {
        if (evt.source === _this4) {
          spreadModeChanged({ mode: _base_viewer.SpreadMode.NONE });
        }
      });
    }
  }, {
    key: 'open',
    value: function open() {
      if (this.opened) {
        return;
      }
      this.opened = true;
      this._setMaxHeight();
      this.toggleButton.classList.add('toggled');
      this.toolbar.classList.remove('hidden');
    }
  }, {
    key: 'close',
    value: function close() {
      if (!this.opened) {
        return;
      }
      this.opened = false;
      this.toolbar.classList.add('hidden');
      this.toggleButton.classList.remove('toggled');
    }
  }, {
    key: 'toggle',
    value: function toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    }
  }, {
    key: '_setMaxHeight',
    value: function _setMaxHeight() {
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
  }, {
    key: 'isOpen',
    get: function get() {
      return this.opened;
    }
  }]);

  return SecondaryToolbar;
}();

exports.SecondaryToolbar = SecondaryToolbar;