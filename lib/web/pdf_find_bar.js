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

var uiUtils = require('./ui_utils.js');
var pdfFindController = require('./pdf_find_controller.js');
var mozL10n = uiUtils.mozL10n;
var FindStates = pdfFindController.FindStates;
var PDFFindBar = function PDFFindBarClosure() {
  function PDFFindBar(options) {
    this.opened = false;
    this.bar = options.bar || null;
    this.toggleButton = options.toggleButton || null;
    this.findField = options.findField || null;
    this.highlightAll = options.highlightAllCheckbox || null;
    this.caseSensitive = options.caseSensitiveCheckbox || null;
    this.findMsg = options.findMsg || null;
    this.findResultsCount = options.findResultsCount || null;
    this.findStatusIcon = options.findStatusIcon || null;
    this.findPreviousButton = options.findPreviousButton || null;
    this.findNextButton = options.findNextButton || null;
    this.findController = options.findController || null;
    this.eventBus = options.eventBus;
    if (this.findController === null) {
      throw new Error('PDFFindBar cannot be used without a ' + 'PDFFindController instance.');
    }
    var self = this;
    this.toggleButton.addEventListener('click', function () {
      self.toggle();
    });
    this.findField.addEventListener('input', function () {
      self.dispatchEvent('');
    });
    this.bar.addEventListener('keydown', function (evt) {
      switch (evt.keyCode) {
        case 13:
          if (evt.target === self.findField) {
            self.dispatchEvent('again', evt.shiftKey);
          }
          break;
        case 27:
          self.close();
          break;
      }
    });
    this.findPreviousButton.addEventListener('click', function () {
      self.dispatchEvent('again', true);
    });
    this.findNextButton.addEventListener('click', function () {
      self.dispatchEvent('again', false);
    });
    this.highlightAll.addEventListener('click', function () {
      self.dispatchEvent('highlightallchange');
    });
    this.caseSensitive.addEventListener('click', function () {
      self.dispatchEvent('casesensitivitychange');
    });
    this.eventBus.on('resize', this._adjustWidth.bind(this));
  }
  PDFFindBar.prototype = {
    reset: function PDFFindBar_reset() {
      this.updateUIState();
    },
    dispatchEvent: function PDFFindBar_dispatchEvent(type, findPrev) {
      this.eventBus.dispatch('find', {
        source: this,
        type: type,
        query: this.findField.value,
        caseSensitive: this.caseSensitive.checked,
        phraseSearch: true,
        highlightAll: this.highlightAll.checked,
        findPrevious: findPrev
      });
    },
    updateUIState: function PDFFindBar_updateUIState(state, previous, matchCount) {
      var notFound = false;
      var findMsg = '';
      var status = '';
      switch (state) {
        case FindStates.FIND_FOUND:
          break;
        case FindStates.FIND_PENDING:
          status = 'pending';
          break;
        case FindStates.FIND_NOTFOUND:
          findMsg = mozL10n.get('find_not_found', null, 'Phrase not found');
          notFound = true;
          break;
        case FindStates.FIND_WRAPPED:
          if (previous) {
            findMsg = mozL10n.get('find_reached_top', null, 'Reached top of document, continued from bottom');
          } else {
            findMsg = mozL10n.get('find_reached_bottom', null, 'Reached end of document, continued from top');
          }
          break;
      }
      if (notFound) {
        this.findField.classList.add('notFound');
      } else {
        this.findField.classList.remove('notFound');
      }
      this.findField.setAttribute('data-status', status);
      this.findMsg.textContent = findMsg;
      this.updateResultsCount(matchCount);
      this._adjustWidth();
    },
    updateResultsCount: function (matchCount) {
      if (!this.findResultsCount) {
        return;
      }
      if (!matchCount) {
        this.findResultsCount.classList.add('hidden');
        return;
      }
      this.findResultsCount.textContent = matchCount.toLocaleString();
      this.findResultsCount.classList.remove('hidden');
    },
    open: function PDFFindBar_open() {
      if (!this.opened) {
        this.opened = true;
        this.toggleButton.classList.add('toggled');
        this.bar.classList.remove('hidden');
      }
      this.findField.select();
      this.findField.focus();
      this._adjustWidth();
    },
    close: function PDFFindBar_close() {
      if (!this.opened) {
        return;
      }
      this.opened = false;
      this.toggleButton.classList.remove('toggled');
      this.bar.classList.add('hidden');
      this.findController.active = false;
    },
    toggle: function PDFFindBar_toggle() {
      if (this.opened) {
        this.close();
      } else {
        this.open();
      }
    },
    _adjustWidth: function PDFFindBar_adjustWidth() {
      if (!this.opened) {
        return;
      }
      this.bar.classList.remove('wrapContainers');
      var findbarHeight = this.bar.clientHeight;
      var inputContainerHeight = this.bar.firstElementChild.clientHeight;
      if (findbarHeight > inputContainerHeight) {
        this.bar.classList.add('wrapContainers');
      }
    }
  };
  return PDFFindBar;
}();
exports.PDFFindBar = PDFFindBar;