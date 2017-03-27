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

var pdfRenderingQueue = require('./pdf_rendering_queue.js');
var uiUtils = require('./ui_utils.js');
var RenderingStates = pdfRenderingQueue.RenderingStates;
var mozL10n = uiUtils.mozL10n;
var UI_NOTIFICATION_CLASS = 'pdfSidebarNotification';
var SidebarView = {
  NONE: 0,
  THUMBS: 1,
  OUTLINE: 2,
  ATTACHMENTS: 3
};
var PDFSidebar = function PDFSidebarClosure() {
  function PDFSidebar(options) {
    this.isOpen = false;
    this.active = SidebarView.THUMBS;
    this.isInitialViewSet = false;
    this.onToggled = null;
    this.pdfViewer = options.pdfViewer;
    this.pdfThumbnailViewer = options.pdfThumbnailViewer;
    this.pdfOutlineViewer = options.pdfOutlineViewer;
    this.mainContainer = options.mainContainer;
    this.outerContainer = options.outerContainer;
    this.eventBus = options.eventBus;
    this.toggleButton = options.toggleButton;
    this.thumbnailButton = options.thumbnailButton;
    this.outlineButton = options.outlineButton;
    this.attachmentsButton = options.attachmentsButton;
    this.thumbnailView = options.thumbnailView;
    this.outlineView = options.outlineView;
    this.attachmentsView = options.attachmentsView;
    this.disableNotification = options.disableNotification || false;
    this._addEventListeners();
  }
  PDFSidebar.prototype = {
    reset: function PDFSidebar_reset() {
      this.isInitialViewSet = false;
      this._hideUINotification(null);
      this.switchView(SidebarView.THUMBS);
      this.outlineButton.disabled = false;
      this.attachmentsButton.disabled = false;
    },
    get visibleView() {
      return this.isOpen ? this.active : SidebarView.NONE;
    },
    get isThumbnailViewVisible() {
      return this.isOpen && this.active === SidebarView.THUMBS;
    },
    get isOutlineViewVisible() {
      return this.isOpen && this.active === SidebarView.OUTLINE;
    },
    get isAttachmentsViewVisible() {
      return this.isOpen && this.active === SidebarView.ATTACHMENTS;
    },
    setInitialView: function PDFSidebar_setInitialView(view) {
      if (this.isInitialViewSet) {
        return;
      }
      this.isInitialViewSet = true;
      if (this.isOpen && view === SidebarView.NONE) {
        this._dispatchEvent();
        return;
      }
      var isViewPreserved = view === this.visibleView;
      this.switchView(view, true);
      if (isViewPreserved) {
        this._dispatchEvent();
      }
    },
    switchView: function PDFSidebar_switchView(view, forceOpen) {
      if (view === SidebarView.NONE) {
        this.close();
        return;
      }
      var isViewChanged = view !== this.active;
      var shouldForceRendering = false;
      switch (view) {
        case SidebarView.THUMBS:
          this.thumbnailButton.classList.add('toggled');
          this.outlineButton.classList.remove('toggled');
          this.attachmentsButton.classList.remove('toggled');
          this.thumbnailView.classList.remove('hidden');
          this.outlineView.classList.add('hidden');
          this.attachmentsView.classList.add('hidden');
          if (this.isOpen && isViewChanged) {
            this._updateThumbnailViewer();
            shouldForceRendering = true;
          }
          break;
        case SidebarView.OUTLINE:
          if (this.outlineButton.disabled) {
            return;
          }
          this.thumbnailButton.classList.remove('toggled');
          this.outlineButton.classList.add('toggled');
          this.attachmentsButton.classList.remove('toggled');
          this.thumbnailView.classList.add('hidden');
          this.outlineView.classList.remove('hidden');
          this.attachmentsView.classList.add('hidden');
          break;
        case SidebarView.ATTACHMENTS:
          if (this.attachmentsButton.disabled) {
            return;
          }
          this.thumbnailButton.classList.remove('toggled');
          this.outlineButton.classList.remove('toggled');
          this.attachmentsButton.classList.add('toggled');
          this.thumbnailView.classList.add('hidden');
          this.outlineView.classList.add('hidden');
          this.attachmentsView.classList.remove('hidden');
          break;
        default:
          console.error('PDFSidebar_switchView: "' + view + '" is an unsupported value.');
          return;
      }
      this.active = view | 0;
      if (forceOpen && !this.isOpen) {
        this.open();
        return;
      }
      if (shouldForceRendering) {
        this._forceRendering();
      }
      if (isViewChanged) {
        this._dispatchEvent();
      }
      this._hideUINotification(this.active);
    },
    open: function PDFSidebar_open() {
      if (this.isOpen) {
        return;
      }
      this.isOpen = true;
      this.toggleButton.classList.add('toggled');
      this.outerContainer.classList.add('sidebarMoving');
      this.outerContainer.classList.add('sidebarOpen');
      if (this.active === SidebarView.THUMBS) {
        this._updateThumbnailViewer();
      }
      this._forceRendering();
      this._dispatchEvent();
      this._hideUINotification(this.active);
    },
    close: function PDFSidebar_close() {
      if (!this.isOpen) {
        return;
      }
      this.isOpen = false;
      this.toggleButton.classList.remove('toggled');
      this.outerContainer.classList.add('sidebarMoving');
      this.outerContainer.classList.remove('sidebarOpen');
      this._forceRendering();
      this._dispatchEvent();
    },
    toggle: function PDFSidebar_toggle() {
      if (this.isOpen) {
        this.close();
      } else {
        this.open();
      }
    },
    _dispatchEvent: function PDFSidebar_dispatchEvent() {
      this.eventBus.dispatch('sidebarviewchanged', {
        source: this,
        view: this.visibleView
      });
    },
    _forceRendering: function PDFSidebar_forceRendering() {
      if (this.onToggled) {
        this.onToggled();
      } else {
        this.pdfViewer.forceRendering();
        this.pdfThumbnailViewer.forceRendering();
      }
    },
    _updateThumbnailViewer: function PDFSidebar_updateThumbnailViewer() {
      var pdfViewer = this.pdfViewer;
      var thumbnailViewer = this.pdfThumbnailViewer;
      var pagesCount = pdfViewer.pagesCount;
      for (var pageIndex = 0; pageIndex < pagesCount; pageIndex++) {
        var pageView = pdfViewer.getPageView(pageIndex);
        if (pageView && pageView.renderingState === RenderingStates.FINISHED) {
          var thumbnailView = thumbnailViewer.getThumbnail(pageIndex);
          thumbnailView.setImage(pageView);
        }
      }
      thumbnailViewer.scrollThumbnailIntoView(pdfViewer.currentPageNumber);
    },
    _showUINotification: function (view) {
      if (this.disableNotification) {
        return;
      }
      this.toggleButton.title = mozL10n.get('toggle_sidebar_notification.title', null, 'Toggle Sidebar (document contains outline/attachments)');
      if (!this.isOpen) {
        this.toggleButton.classList.add(UI_NOTIFICATION_CLASS);
      } else if (view === this.active) {
        return;
      }
      switch (view) {
        case SidebarView.OUTLINE:
          this.outlineButton.classList.add(UI_NOTIFICATION_CLASS);
          break;
        case SidebarView.ATTACHMENTS:
          this.attachmentsButton.classList.add(UI_NOTIFICATION_CLASS);
          break;
      }
    },
    _hideUINotification: function (view) {
      if (this.disableNotification) {
        return;
      }
      var removeNotification = function (view) {
        switch (view) {
          case SidebarView.OUTLINE:
            this.outlineButton.classList.remove(UI_NOTIFICATION_CLASS);
            break;
          case SidebarView.ATTACHMENTS:
            this.attachmentsButton.classList.remove(UI_NOTIFICATION_CLASS);
            break;
        }
      }.bind(this);
      if (!this.isOpen && view !== null) {
        return;
      }
      this.toggleButton.classList.remove(UI_NOTIFICATION_CLASS);
      if (view !== null) {
        removeNotification(view);
        return;
      }
      for (view in SidebarView) {
        removeNotification(SidebarView[view]);
      }
      this.toggleButton.title = mozL10n.get('toggle_sidebar.title', null, 'Toggle Sidebar');
    },
    _addEventListeners: function PDFSidebar_addEventListeners() {
      var self = this;
      self.mainContainer.addEventListener('transitionend', function (evt) {
        if (evt.target === this) {
          self.outerContainer.classList.remove('sidebarMoving');
        }
      });
      self.thumbnailButton.addEventListener('click', function () {
        self.switchView(SidebarView.THUMBS);
      });
      self.outlineButton.addEventListener('click', function () {
        self.switchView(SidebarView.OUTLINE);
      });
      self.outlineButton.addEventListener('dblclick', function () {
        self.pdfOutlineViewer.toggleOutlineTree();
      });
      self.attachmentsButton.addEventListener('click', function () {
        self.switchView(SidebarView.ATTACHMENTS);
      });
      self.eventBus.on('outlineloaded', function (e) {
        var outlineCount = e.outlineCount;
        self.outlineButton.disabled = !outlineCount;
        if (outlineCount) {
          self._showUINotification(SidebarView.OUTLINE);
        } else if (self.active === SidebarView.OUTLINE) {
          self.switchView(SidebarView.THUMBS);
        }
      });
      self.eventBus.on('attachmentsloaded', function (e) {
        var attachmentsCount = e.attachmentsCount;
        self.attachmentsButton.disabled = !attachmentsCount;
        if (attachmentsCount) {
          self._showUINotification(SidebarView.ATTACHMENTS);
        } else if (self.active === SidebarView.ATTACHMENTS) {
          self.switchView(SidebarView.THUMBS);
        }
      });
      self.eventBus.on('presentationmodechanged', function (e) {
        if (!e.active && !e.switchInProgress && self.isThumbnailViewVisible) {
          self._updateThumbnailViewer();
        }
      });
    }
  };
  return PDFSidebar;
}();
exports.SidebarView = SidebarView;
exports.PDFSidebar = PDFSidebar;