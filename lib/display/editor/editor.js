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
exports.AnnotationEditor = void 0;

var _tools = require("./tools.js");

var _util = require("../../shared/util.js");

class AnnotationEditor {
  #boundFocusin = this.focusin.bind(this);
  #boundFocusout = this.focusout.bind(this);
  #hasBeenSelected = false;
  #isEditing = false;
  #isInEditMode = false;
  #zIndex = AnnotationEditor._zIndex++;
  static _colorManager = new _tools.ColorManager();
  static _zIndex = 1;

  constructor(parameters) {
    if (this.constructor === AnnotationEditor) {
      (0, _util.unreachable)("Cannot initialize AnnotationEditor.");
    }

    this.parent = parameters.parent;
    this.id = parameters.id;
    this.width = this.height = null;
    this.pageIndex = parameters.parent.pageIndex;
    this.name = parameters.name;
    this.div = null;
    const [width, height] = this.parent.viewportBaseDimensions;
    this.x = parameters.x / width;
    this.y = parameters.y / height;
    this.rotation = this.parent.viewport.rotation;
    this.isAttachedToDOM = false;
  }

  static get _defaultLineColor() {
    return (0, _util.shadow)(this, "_defaultLineColor", this._colorManager.getHexCode("CanvasText"));
  }

  setInBackground() {
    this.div.style.zIndex = 0;
  }

  setInForeground() {
    this.div.style.zIndex = this.#zIndex;
  }

  focusin(event) {
    if (!this.#hasBeenSelected) {
      this.parent.setSelected(this);
    } else {
      this.#hasBeenSelected = false;
    }
  }

  focusout(event) {
    if (!this.isAttachedToDOM) {
      return;
    }

    const target = event.relatedTarget;

    if (target?.closest(`#${this.id}`)) {
      return;
    }

    event.preventDefault();

    if (!this.parent.isMultipleSelection) {
      this.commitOrRemove();
    }
  }

  commitOrRemove() {
    if (this.isEmpty()) {
      this.remove();
    } else {
      this.commit();
    }
  }

  commit() {
    this.parent.addToAnnotationStorage(this);
  }

  dragstart(event) {
    const rect = this.parent.div.getBoundingClientRect();
    this.startX = event.clientX - rect.x;
    this.startY = event.clientY - rect.y;
    event.dataTransfer.setData("text/plain", this.id);
    event.dataTransfer.effectAllowed = "move";
  }

  setAt(x, y, tx, ty) {
    const [width, height] = this.parent.viewportBaseDimensions;
    [tx, ty] = this.screenToPageTranslation(tx, ty);
    this.x = (x + tx) / width;
    this.y = (y + ty) / height;
    this.div.style.left = `${100 * this.x}%`;
    this.div.style.top = `${100 * this.y}%`;
  }

  translate(x, y) {
    const [width, height] = this.parent.viewportBaseDimensions;
    [x, y] = this.screenToPageTranslation(x, y);
    this.x += x / width;
    this.y += y / height;
    this.div.style.left = `${100 * this.x}%`;
    this.div.style.top = `${100 * this.y}%`;
  }

  screenToPageTranslation(x, y) {
    const {
      rotation
    } = this.parent.viewport;

    switch (rotation) {
      case 90:
        return [y, -x];

      case 180:
        return [-x, -y];

      case 270:
        return [-y, x];

      default:
        return [x, y];
    }
  }

  setDims(width, height) {
    const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
    this.div.style.width = `${100 * width / parentWidth}%`;
    this.div.style.height = `${100 * height / parentHeight}%`;
  }

  getInitialTranslation() {
    return [0, 0];
  }

  render() {
    this.div = document.createElement("div");
    this.div.setAttribute("data-editor-rotation", (360 - this.rotation) % 360);
    this.div.className = this.name;
    this.div.setAttribute("id", this.id);
    this.div.setAttribute("tabIndex", 0);
    this.setInForeground();
    this.div.addEventListener("focusin", this.#boundFocusin);
    this.div.addEventListener("focusout", this.#boundFocusout);
    const [tx, ty] = this.getInitialTranslation();
    this.translate(tx, ty);
    (0, _tools.bindEvents)(this, this.div, ["dragstart", "pointerdown"]);
    return this.div;
  }

  pointerdown(event) {
    const isMac = _tools.KeyboardManager.platform.isMac;

    if (event.button !== 0 || event.ctrlKey && isMac) {
      event.preventDefault();
      return;
    }

    if (event.ctrlKey && !isMac || event.shiftKey || event.metaKey && isMac) {
      this.parent.toggleSelected(this);
    } else {
      this.parent.setSelected(this);
    }

    this.#hasBeenSelected = true;
  }

  getRect(tx, ty) {
    const [parentWidth, parentHeight] = this.parent.viewportBaseDimensions;
    const [pageWidth, pageHeight] = this.parent.pageDimensions;
    const shiftX = pageWidth * tx / parentWidth;
    const shiftY = pageHeight * ty / parentHeight;
    const x = this.x * pageWidth;
    const y = this.y * pageHeight;
    const width = this.width * pageWidth;
    const height = this.height * pageHeight;

    switch (this.rotation) {
      case 0:
        return [x + shiftX, pageHeight - y - shiftY - height, x + shiftX + width, pageHeight - y - shiftY];

      case 90:
        return [x + shiftY, pageHeight - y + shiftX, x + shiftY + height, pageHeight - y + shiftX + width];

      case 180:
        return [x - shiftX - width, pageHeight - y + shiftY, x - shiftX, pageHeight - y + shiftY + height];

      case 270:
        return [x - shiftY - height, pageHeight - y - shiftX - width, x - shiftY, pageHeight - y - shiftX];

      default:
        throw new Error("Invalid rotation");
    }
  }

  getRectInCurrentCoords(rect, pageHeight) {
    const [x1, y1, x2, y2] = rect;
    const width = x2 - x1;
    const height = y2 - y1;

    switch (this.rotation) {
      case 0:
        return [x1, pageHeight - y2, width, height];

      case 90:
        return [x1, pageHeight - y1, height, width];

      case 180:
        return [x2, pageHeight - y1, width, height];

      case 270:
        return [x2, pageHeight - y2, height, width];

      default:
        throw new Error("Invalid rotation");
    }
  }

  onceAdded() {}

  isEmpty() {
    return false;
  }

  enableEditMode() {
    this.#isInEditMode = true;
  }

  disableEditMode() {
    this.#isInEditMode = false;
  }

  isInEditMode() {
    return this.#isInEditMode;
  }

  shouldGetKeyboardEvents() {
    return false;
  }

  needsToBeRebuilt() {
    return this.div && !this.isAttachedToDOM;
  }

  rebuild() {
    this.div?.addEventListener("focusin", this.#boundFocusin);
  }

  serialize() {
    (0, _util.unreachable)("An editor must be serializable");
  }

  static deserialize(data, parent) {
    const editor = new this.prototype.constructor({
      parent,
      id: parent.getNextId()
    });
    editor.rotation = data.rotation;
    const [pageWidth, pageHeight] = parent.pageDimensions;
    const [x, y, width, height] = editor.getRectInCurrentCoords(data.rect, pageHeight);
    editor.x = x / pageWidth;
    editor.y = y / pageHeight;
    editor.width = width / pageWidth;
    editor.height = height / pageHeight;
    return editor;
  }

  remove() {
    this.div.removeEventListener("focusin", this.#boundFocusin);
    this.div.removeEventListener("focusout", this.#boundFocusout);

    if (!this.isEmpty()) {
      this.commit();
    }

    this.parent.remove(this);
  }

  select() {
    this.div?.classList.add("selectedEditor");
  }

  unselect() {
    this.div?.classList.remove("selectedEditor");
  }

  updateParams(type, value) {}

  disableEditing() {}

  enableEditing() {}

  get propertiesToUpdate() {
    return {};
  }

  get contentDiv() {
    return this.div;
  }

  get isEditing() {
    return this.#isEditing;
  }

  set isEditing(value) {
    this.#isEditing = value;

    if (value) {
      this.parent.setSelected(this);
      this.parent.setActiveEditor(this);
    } else {
      this.parent.setActiveEditor(null);
    }
  }

}

exports.AnnotationEditor = AnnotationEditor;