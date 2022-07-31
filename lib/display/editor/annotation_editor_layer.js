/**
 * @licstart The following is the entire license notice for the
 * JavaScript code in this page
 *
 * Copyright 2022 Mozilla Foundation
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
 * JavaScript code in this page
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationEditorLayer = void 0;

var _util = require("../../shared/util.js");

var _tools = require("./tools.js");

var _display_utils = require("../display_utils.js");

var _freetext = require("./freetext.js");

var _ink = require("./ink.js");

class AnnotationEditorLayer {
  #allowClick = false;
  #boundPointerup = this.pointerup.bind(this);
  #boundPointerdown = this.pointerdown.bind(this);
  #editors = new Map();
  #isCleaningUp = false;
  #textLayerMap = new WeakMap();
  #textNodes = new Map();
  #uiManager;
  #waitingEditors = new Set();
  static _initialized = false;

  constructor(options) {
    if (!AnnotationEditorLayer._initialized) {
      AnnotationEditorLayer._initialized = true;

      _freetext.FreeTextEditor.initialize(options.l10n);

      _ink.InkEditor.initialize(options.l10n);

      options.uiManager.registerEditorTypes([_freetext.FreeTextEditor, _ink.InkEditor]);
    }

    this.#uiManager = options.uiManager;
    this.annotationStorage = options.annotationStorage;
    this.pageIndex = options.pageIndex;
    this.div = options.div;
    this.#uiManager.addLayer(this);
  }

  get textLayerElements() {
    const textLayer = this.div.parentNode.getElementsByClassName("textLayer").item(0);

    if (!textLayer) {
      return (0, _util.shadow)(this, "textLayerElements", null);
    }

    let textChildren = this.#textLayerMap.get(textLayer);

    if (textChildren) {
      return textChildren;
    }

    textChildren = textLayer.querySelectorAll(`span[role="presentation"]`);

    if (textChildren.length === 0) {
      return (0, _util.shadow)(this, "textLayerElements", null);
    }

    textChildren = Array.from(textChildren);
    textChildren.sort(AnnotationEditorLayer.#compareElementPositions);
    this.#textLayerMap.set(textLayer, textChildren);
    return textChildren;
  }

  get #hasTextLayer() {
    return !!this.div.parentNode.querySelector(".textLayer .endOfContent");
  }

  updateToolbar(mode) {
    this.#uiManager.updateToolbar(mode);
  }

  updateMode(mode = this.#uiManager.getMode()) {
    this.#cleanup();

    if (mode === _util.AnnotationEditorType.INK) {
      this.addInkEditorIfNeeded(false);
      this.disableClick();
    } else {
      this.enableClick();
    }

    this.#uiManager.unselectAll();
  }

  addInkEditorIfNeeded(isCommitting) {
    if (!isCommitting && this.#uiManager.getMode() !== _util.AnnotationEditorType.INK) {
      return;
    }

    if (!isCommitting) {
      for (const editor of this.#editors.values()) {
        if (editor.isEmpty()) {
          editor.setInBackground();
          return;
        }
      }
    }

    const editor = this.#createAndAddNewEditor({
      offsetX: 0,
      offsetY: 0
    });
    editor.setInBackground();
  }

  setEditingState(isEditing) {
    this.#uiManager.setEditingState(isEditing);
  }

  addCommands(params) {
    this.#uiManager.addCommands(params);
  }

  enable() {
    this.div.style.pointerEvents = "auto";

    for (const editor of this.#editors.values()) {
      editor.enableEditing();
    }
  }

  disable() {
    this.div.style.pointerEvents = "none";

    for (const editor of this.#editors.values()) {
      editor.disableEditing();
    }
  }

  setActiveEditor(editor) {
    const currentActive = this.#uiManager.getActive();

    if (currentActive === editor) {
      return;
    }

    this.#uiManager.setActiveEditor(editor);
  }

  enableClick() {
    this.div.addEventListener("pointerdown", this.#boundPointerdown);
    this.div.addEventListener("pointerup", this.#boundPointerup);
  }

  disableClick() {
    this.div.removeEventListener("pointerdown", this.#boundPointerdown);
    this.div.removeEventListener("pointerup", this.#boundPointerup);
  }

  attach(editor) {
    this.#editors.set(editor.id, editor);
  }

  detach(editor) {
    this.#editors.delete(editor.id);
    this.removePointerInTextLayer(editor);
  }

  remove(editor) {
    this.#uiManager.removeEditor(editor);
    this.detach(editor);
    this.annotationStorage.removeKey(editor.id);
    editor.div.style.display = "none";
    setTimeout(() => {
      editor.div.style.display = "";
      editor.div.remove();
      editor.isAttachedToDOM = false;

      if (document.activeElement === document.body) {
        this.#uiManager.focusMainContainer();
      }
    }, 0);

    if (!this.#isCleaningUp) {
      this.addInkEditorIfNeeded(false);
    }
  }

  #changeParent(editor) {
    if (editor.parent === this) {
      return;
    }

    this.attach(editor);
    editor.pageIndex = this.pageIndex;
    editor.parent?.detach(editor);
    editor.parent = this;

    if (editor.div && editor.isAttachedToDOM) {
      editor.div.remove();
      this.div.append(editor.div);
    }
  }

  static #compareElementPositions(e1, e2) {
    const rect1 = e1.getBoundingClientRect();
    const rect2 = e2.getBoundingClientRect();

    if (rect1.y + rect1.height <= rect2.y) {
      return -1;
    }

    if (rect2.y + rect2.height <= rect1.y) {
      return +1;
    }

    const centerX1 = rect1.x + rect1.width / 2;
    const centerX2 = rect2.x + rect2.width / 2;
    return centerX1 - centerX2;
  }

  onTextLayerRendered() {
    this.#textNodes.clear();

    for (const editor of this.#waitingEditors) {
      if (editor.isAttachedToDOM) {
        this.addPointerInTextLayer(editor);
      }
    }

    this.#waitingEditors.clear();
  }

  removePointerInTextLayer(editor) {
    if (!this.#hasTextLayer) {
      this.#waitingEditors.delete(editor);
      return;
    }

    const {
      id
    } = editor;
    const node = this.#textNodes.get(id);

    if (!node) {
      return;
    }

    this.#textNodes.delete(id);
    let owns = node.getAttribute("aria-owns");

    if (owns?.includes(id)) {
      owns = owns.split(" ").filter(x => x !== id).join(" ");

      if (owns) {
        node.setAttribute("aria-owns", owns);
      } else {
        node.removeAttribute("aria-owns");
        node.setAttribute("role", "presentation");
      }
    }
  }

  addPointerInTextLayer(editor) {
    if (!this.#hasTextLayer) {
      this.#waitingEditors.add(editor);
      return;
    }

    this.removePointerInTextLayer(editor);
    const children = this.textLayerElements;

    if (!children) {
      return;
    }

    const {
      contentDiv
    } = editor;
    const id = editor.getIdForTextLayer();
    const index = (0, _display_utils.binarySearchFirstItem)(children, node => AnnotationEditorLayer.#compareElementPositions(contentDiv, node) < 0);
    const node = children[Math.max(0, index - 1)];
    const owns = node.getAttribute("aria-owns");

    if (!owns?.includes(id)) {
      node.setAttribute("aria-owns", owns ? `${owns} ${id}` : id);
    }

    node.removeAttribute("role");
    this.#textNodes.set(id, node);
  }

  moveDivInDOM(editor) {
    this.addPointerInTextLayer(editor);
    const {
      div,
      contentDiv
    } = editor;

    if (!this.div.hasChildNodes()) {
      this.div.append(div);
      return;
    }

    const children = Array.from(this.div.childNodes).filter(node => node !== div);

    if (children.length === 0) {
      return;
    }

    const index = (0, _display_utils.binarySearchFirstItem)(children, node => AnnotationEditorLayer.#compareElementPositions(contentDiv, node) < 0);

    if (index === 0) {
      children[0].before(div);
    } else {
      children[index - 1].after(div);
    }
  }

  add(editor) {
    this.#changeParent(editor);
    this.addToAnnotationStorage(editor);
    this.#uiManager.addEditor(editor);
    this.attach(editor);

    if (!editor.isAttachedToDOM) {
      const div = editor.render();
      this.div.append(div);
      editor.isAttachedToDOM = true;
    }

    this.moveDivInDOM(editor);
    editor.onceAdded();
  }

  addToAnnotationStorage(editor) {
    if (!editor.isEmpty() && !this.annotationStorage.has(editor.id)) {
      this.annotationStorage.setValue(editor.id, editor);
    }
  }

  addOrRebuild(editor) {
    if (editor.needsToBeRebuilt()) {
      editor.rebuild();
    } else {
      this.add(editor);
    }
  }

  addANewEditor(editor) {
    const cmd = () => {
      this.addOrRebuild(editor);
    };

    const undo = () => {
      editor.remove();
    };

    this.addCommands({
      cmd,
      undo,
      mustExec: true
    });
  }

  addUndoableEditor(editor) {
    const cmd = () => {
      this.addOrRebuild(editor);
    };

    const undo = () => {
      editor.remove();
    };

    this.addCommands({
      cmd,
      undo,
      mustExec: false
    });
  }

  getNextId() {
    return this.#uiManager.getId();
  }

  #createNewEditor(params) {
    switch (this.#uiManager.getMode()) {
      case _util.AnnotationEditorType.FREETEXT:
        return new _freetext.FreeTextEditor(params);

      case _util.AnnotationEditorType.INK:
        return new _ink.InkEditor(params);
    }

    return null;
  }

  deserialize(data) {
    switch (data.annotationType) {
      case _util.AnnotationEditorType.FREETEXT:
        return _freetext.FreeTextEditor.deserialize(data, this);

      case _util.AnnotationEditorType.INK:
        return _ink.InkEditor.deserialize(data, this);
    }

    return null;
  }

  #createAndAddNewEditor(event) {
    const id = this.getNextId();
    const editor = this.#createNewEditor({
      parent: this,
      id,
      x: event.offsetX,
      y: event.offsetY
    });

    if (editor) {
      this.add(editor);
    }

    return editor;
  }

  setSelected(editor) {
    this.#uiManager.setSelected(editor);
  }

  toggleSelected(editor) {
    this.#uiManager.toggleSelected(editor);
  }

  isSelected(editor) {
    return this.#uiManager.isSelected(editor);
  }

  unselect(editor) {
    this.#uiManager.unselect(editor);
  }

  pointerup(event) {
    const isMac = _tools.KeyboardManager.platform.isMac;

    if (event.button !== 0 || event.ctrlKey && isMac) {
      return;
    }

    if (event.target !== this.div) {
      return;
    }

    if (!this.#allowClick) {
      this.#allowClick = true;
      return;
    }

    this.#createAndAddNewEditor(event);
  }

  pointerdown(event) {
    const isMac = _tools.KeyboardManager.platform.isMac;

    if (event.button !== 0 || event.ctrlKey && isMac) {
      return;
    }

    if (event.target !== this.div) {
      return;
    }

    const editor = this.#uiManager.getActive();
    this.#allowClick = !editor || editor.isEmpty();
  }

  drop(event) {
    const id = event.dataTransfer.getData("text/plain");
    const editor = this.#uiManager.getEditor(id);

    if (!editor) {
      return;
    }

    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    this.#changeParent(editor);
    const rect = this.div.getBoundingClientRect();
    const endX = event.clientX - rect.x;
    const endY = event.clientY - rect.y;
    editor.translate(endX - editor.startX, endY - editor.startY);
    this.moveDivInDOM(editor);
    editor.div.focus();
  }

  dragover(event) {
    event.preventDefault();
  }

  destroy() {
    if (this.#uiManager.getActive()?.parent === this) {
      this.#uiManager.setActiveEditor(null);
    }

    for (const editor of this.#editors.values()) {
      this.removePointerInTextLayer(editor);
      editor.isAttachedToDOM = false;
      editor.div.remove();
      editor.parent = null;
    }

    this.#textNodes.clear();
    this.div = null;
    this.#editors.clear();
    this.#waitingEditors.clear();
    this.#uiManager.removeLayer(this);
  }

  #cleanup() {
    this.#isCleaningUp = true;

    for (const editor of this.#editors.values()) {
      if (editor.isEmpty()) {
        editor.remove();
      }
    }

    this.#isCleaningUp = false;
  }

  render(parameters) {
    this.viewport = parameters.viewport;
    (0, _tools.bindEvents)(this, this.div, ["dragover", "drop"]);
    this.setDimensions();

    for (const editor of this.#uiManager.getEditors(this.pageIndex)) {
      this.add(editor);
    }

    this.updateMode();
  }

  update(parameters) {
    this.viewport = parameters.viewport;
    this.setDimensions();
    this.updateMode();
  }

  get scaleFactor() {
    return this.viewport.scale;
  }

  get pageDimensions() {
    const [pageLLx, pageLLy, pageURx, pageURy] = this.viewport.viewBox;
    const width = pageURx - pageLLx;
    const height = pageURy - pageLLy;
    return [width, height];
  }

  get viewportBaseDimensions() {
    const {
      width,
      height,
      rotation
    } = this.viewport;
    return rotation % 180 === 0 ? [width, height] : [height, width];
  }

  setDimensions() {
    const {
      width,
      height,
      rotation
    } = this.viewport;
    const flipOrientation = rotation % 180 !== 0,
          widthStr = Math.floor(width) + "px",
          heightStr = Math.floor(height) + "px";
    this.div.style.width = flipOrientation ? heightStr : widthStr;
    this.div.style.height = flipOrientation ? widthStr : heightStr;
    this.div.setAttribute("data-main-rotation", rotation);
  }

}

exports.AnnotationEditorLayer = AnnotationEditorLayer;