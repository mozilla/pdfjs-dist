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
exports.FreeTextEditor = void 0;

var _util = require("../../shared/util.js");

var _tools = require("./tools.js");

var _editor = require("./editor.js");

class FreeTextEditor extends _editor.AnnotationEditor {
  #boundEditorDivBlur = this.editorDivBlur.bind(this);
  #boundEditorDivFocus = this.editorDivFocus.bind(this);
  #boundEditorDivKeydown = this.editorDivKeydown.bind(this);
  #color;
  #content = "";
  #contentHTML = "";
  #hasAlreadyBeenCommitted = false;
  #fontSize;
  static _freeTextDefaultContent = "";
  static _l10nPromise;
  static _internalPadding = 0;
  static _defaultColor = null;
  static _defaultFontSize = 10;
  static _keyboardManager = new _tools.KeyboardManager([[["ctrl+Enter", "mac+meta+Enter", "Escape", "mac+Escape"], FreeTextEditor.prototype.commitOrRemove]]);

  constructor(params) {
    super({ ...params,
      name: "freeTextEditor"
    });
    this.#color = params.color || FreeTextEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor;
    this.#fontSize = params.fontSize || FreeTextEditor._defaultFontSize;
  }

  static initialize(l10n) {
    this._l10nPromise = new Map(["free_text_default_content", "editor_free_text_aria_label"].map(str => [str, l10n.get(str)]));
    const style = getComputedStyle(document.documentElement);
    this._internalPadding = parseFloat(style.getPropertyValue("--freetext-padding"));
  }

  static updateDefaultParams(type, value) {
    switch (type) {
      case _util.AnnotationEditorParamsType.FREETEXT_SIZE:
        FreeTextEditor._defaultFontSize = value;
        break;

      case _util.AnnotationEditorParamsType.FREETEXT_COLOR:
        FreeTextEditor._defaultColor = value;
        break;
    }
  }

  updateParams(type, value) {
    switch (type) {
      case _util.AnnotationEditorParamsType.FREETEXT_SIZE:
        this.#updateFontSize(value);
        break;

      case _util.AnnotationEditorParamsType.FREETEXT_COLOR:
        this.#updateColor(value);
        break;
    }
  }

  static get defaultPropertiesToUpdate() {
    return [[_util.AnnotationEditorParamsType.FREETEXT_SIZE, FreeTextEditor._defaultFontSize], [_util.AnnotationEditorParamsType.FREETEXT_COLOR, FreeTextEditor._defaultColor || _editor.AnnotationEditor._defaultLineColor]];
  }

  get propertiesToUpdate() {
    return [[_util.AnnotationEditorParamsType.FREETEXT_SIZE, this.#fontSize], [_util.AnnotationEditorParamsType.FREETEXT_COLOR, this.#color]];
  }

  #updateFontSize(fontSize) {
    const setFontsize = size => {
      this.editorDiv.style.fontSize = `calc(${size}px * var(--scale-factor))`;
      this.translate(0, -(size - this.#fontSize) * this.parent.scaleFactor);
      this.#fontSize = size;
      this.#setEditorDimensions();
    };

    const savedFontsize = this.#fontSize;
    this.parent.addCommands({
      cmd: () => {
        setFontsize(fontSize);
      },
      undo: () => {
        setFontsize(savedFontsize);
      },
      mustExec: true,
      type: _util.AnnotationEditorParamsType.FREETEXT_SIZE,
      overwriteIfSameType: true,
      keepUndo: true
    });
  }

  #updateColor(color) {
    const savedColor = this.#color;
    this.parent.addCommands({
      cmd: () => {
        this.#color = color;
        this.editorDiv.style.color = color;
      },
      undo: () => {
        this.#color = savedColor;
        this.editorDiv.style.color = savedColor;
      },
      mustExec: true,
      type: _util.AnnotationEditorParamsType.FREETEXT_COLOR,
      overwriteIfSameType: true,
      keepUndo: true
    });
  }

  getInitialTranslation() {
    return [-FreeTextEditor._internalPadding * this.parent.scaleFactor, -(FreeTextEditor._internalPadding + this.#fontSize) * this.parent.scaleFactor];
  }

  rebuild() {
    super.rebuild();

    if (this.div === null) {
      return;
    }

    if (!this.isAttachedToDOM) {
      this.parent.add(this);
    }
  }

  enableEditMode() {
    if (this.isInEditMode()) {
      return;
    }

    this.parent.setEditingState(false);
    this.parent.updateToolbar(_util.AnnotationEditorType.FREETEXT);
    super.enableEditMode();
    this.overlayDiv.classList.remove("enabled");
    this.editorDiv.contentEditable = true;
    this.div.draggable = false;
    this.editorDiv.addEventListener("keydown", this.#boundEditorDivKeydown);
    this.editorDiv.addEventListener("focus", this.#boundEditorDivFocus);
    this.editorDiv.addEventListener("blur", this.#boundEditorDivBlur);
  }

  disableEditMode() {
    if (!this.isInEditMode()) {
      return;
    }

    this.parent.setEditingState(true);
    super.disableEditMode();
    this.overlayDiv.classList.add("enabled");
    this.editorDiv.contentEditable = false;
    this.div.draggable = true;
    this.editorDiv.removeEventListener("keydown", this.#boundEditorDivKeydown);
    this.editorDiv.removeEventListener("focus", this.#boundEditorDivFocus);
    this.editorDiv.removeEventListener("blur", this.#boundEditorDivBlur);
    this.div.focus();
    this.isEditing = false;
  }

  focusin(event) {
    super.focusin(event);

    if (event.target !== this.editorDiv) {
      this.editorDiv.focus();
    }
  }

  onceAdded() {
    if (this.width) {
      return;
    }

    this.enableEditMode();
    this.editorDiv.focus();
  }

  isEmpty() {
    return !this.editorDiv || this.editorDiv.innerText.trim() === "";
  }

  remove() {
    this.isEditing = false;
    this.parent.setEditingState(true);
    super.remove();
  }

  #extractText() {
    const divs = this.editorDiv.getElementsByTagName("div");

    if (divs.length === 0) {
      return this.editorDiv.innerText;
    }

    const buffer = [];

    for (let i = 0, ii = divs.length; i < ii; i++) {
      const div = divs[i];
      const first = div.firstChild;

      if (first?.nodeName === "#text") {
        buffer.push(first.data);
      } else {
        buffer.push("");
      }
    }

    return buffer.join("\n");
  }

  #setEditorDimensions() {
    const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
    const rect = this.div.getBoundingClientRect();
    this.width = rect.width / parentWidth;
    this.height = rect.height / parentHeight;
  }

  commit() {
    super.commit();

    if (!this.#hasAlreadyBeenCommitted) {
      this.#hasAlreadyBeenCommitted = true;
      this.parent.addUndoableEditor(this);
    }

    this.disableEditMode();
    this.#contentHTML = this.editorDiv.innerHTML;
    this.#content = this.#extractText().trimEnd();
    this.#setEditorDimensions();
  }

  shouldGetKeyboardEvents() {
    return this.isInEditMode();
  }

  dblclick(event) {
    this.enableEditMode();
    this.editorDiv.focus();
  }

  keydown(event) {
    if (event.target === this.div && event.key === "Enter") {
      this.enableEditMode();
      this.editorDiv.focus();
    }
  }

  editorDivKeydown(event) {
    FreeTextEditor._keyboardManager.exec(this, event);
  }

  editorDivFocus(event) {
    this.isEditing = true;
  }

  editorDivBlur(event) {
    this.isEditing = false;
  }

  disableEditing() {
    this.editorDiv.setAttribute("role", "comment");
    this.editorDiv.removeAttribute("aria-multiline");
  }

  enableEditing() {
    this.editorDiv.setAttribute("role", "textbox");
    this.editorDiv.setAttribute("aria-multiline", true);
  }

  getIdForTextLayer() {
    return this.editorDiv.id;
  }

  render() {
    if (this.div) {
      return this.div;
    }

    let baseX, baseY;

    if (this.width) {
      baseX = this.x;
      baseY = this.y;
    }

    super.render();
    this.editorDiv = document.createElement("div");
    this.editorDiv.className = "internal";
    this.editorDiv.setAttribute("id", `${this.id}-editor`);
    this.enableEditing();

    FreeTextEditor._l10nPromise.get("editor_free_text_aria_label").then(msg => this.editorDiv?.setAttribute("aria-label", msg));

    FreeTextEditor._l10nPromise.get("free_text_default_content").then(msg => this.editorDiv?.setAttribute("default-content", msg));

    this.editorDiv.contentEditable = true;
    const {
      style
    } = this.editorDiv;
    style.fontSize = `calc(${this.#fontSize}px * var(--scale-factor))`;
    style.color = this.#color;
    this.div.append(this.editorDiv);
    this.overlayDiv = document.createElement("div");
    this.overlayDiv.classList.add("overlay", "enabled");
    this.div.append(this.overlayDiv);
    (0, _tools.bindEvents)(this, this.div, ["dblclick", "keydown"]);

    if (this.width) {
      const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
      this.setAt(baseX * parentWidth, baseY * parentHeight, this.width * parentWidth, this.height * parentHeight);
      this.editorDiv.innerHTML = this.#contentHTML;
      this.div.draggable = true;
      this.editorDiv.contentEditable = false;
    } else {
      this.div.draggable = false;
      this.editorDiv.contentEditable = true;
    }

    return this.div;
  }

  get contentDiv() {
    return this.editorDiv;
  }

  static deserialize(data, parent) {
    const editor = super.deserialize(data, parent);
    editor.#fontSize = data.fontSize;
    editor.#color = _util.Util.makeHexColor(...data.color);
    editor.#content = data.value;
    editor.#contentHTML = data.value.split("\n").map(line => `<div>${line}</div>`).join("");
    return editor;
  }

  serialize() {
    if (this.isEmpty()) {
      return null;
    }

    const padding = FreeTextEditor._internalPadding * this.parent.scaleFactor;
    const rect = this.getRect(padding, padding);

    const color = _editor.AnnotationEditor._colorManager.convert(getComputedStyle(this.editorDiv).color);

    return {
      annotationType: _util.AnnotationEditorType.FREETEXT,
      color,
      fontSize: this.#fontSize,
      value: this.#content,
      pageIndex: this.parent.pageIndex,
      rect,
      rotation: this.rotation
    };
  }

}

exports.FreeTextEditor = FreeTextEditor;