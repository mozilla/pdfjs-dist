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
exports.KeyboardManager = exports.CommandManager = exports.ColorManager = exports.AnnotationEditorUIManager = void 0;
exports.bindEvents = bindEvents;
exports.opacityToHex = opacityToHex;

var _util = require("../../shared/util.js");

var _display_utils = require("../display_utils.js");

function bindEvents(obj, element, names) {
  for (const name of names) {
    element.addEventListener(name, obj[name].bind(obj));
  }
}

function opacityToHex(opacity) {
  return Math.round(Math.min(255, Math.max(1, 255 * opacity))).toString(16).padStart(2, "0");
}

class IdManager {
  #id = 0;

  getId() {
    return `${_util.AnnotationEditorPrefix}${this.#id++}`;
  }

}

class CommandManager {
  #commands = [];
  #locked = false;
  #maxSize;
  #position = -1;

  constructor(maxSize = 128) {
    this.#maxSize = maxSize;
  }

  add({
    cmd,
    undo,
    mustExec,
    type = NaN,
    overwriteIfSameType = false,
    keepUndo = false
  }) {
    if (mustExec) {
      cmd();
    }

    if (this.#locked) {
      return;
    }

    const save = {
      cmd,
      undo,
      type
    };

    if (this.#position === -1) {
      if (this.#commands.length > 0) {
        this.#commands.length = 0;
      }

      this.#position = 0;
      this.#commands.push(save);
      return;
    }

    if (overwriteIfSameType && this.#commands[this.#position].type === type) {
      if (keepUndo) {
        save.undo = this.#commands[this.#position].undo;
      }

      this.#commands[this.#position] = save;
      return;
    }

    const next = this.#position + 1;

    if (next === this.#maxSize) {
      this.#commands.splice(0, 1);
    } else {
      this.#position = next;

      if (next < this.#commands.length) {
        this.#commands.splice(next);
      }
    }

    this.#commands.push(save);
  }

  undo() {
    if (this.#position === -1) {
      return;
    }

    this.#locked = true;
    this.#commands[this.#position].undo();
    this.#locked = false;
    this.#position -= 1;
  }

  redo() {
    if (this.#position < this.#commands.length - 1) {
      this.#position += 1;
      this.#locked = true;
      this.#commands[this.#position].cmd();
      this.#locked = false;
    }
  }

  hasSomethingToUndo() {
    return this.#position !== -1;
  }

  hasSomethingToRedo() {
    return this.#position < this.#commands.length - 1;
  }

  destroy() {
    this.#commands = null;
  }

}

exports.CommandManager = CommandManager;

class KeyboardManager {
  constructor(callbacks) {
    this.buffer = [];
    this.callbacks = new Map();
    this.allKeys = new Set();
    const isMac = KeyboardManager.platform.isMac;

    for (const [keys, callback] of callbacks) {
      for (const key of keys) {
        const isMacKey = key.startsWith("mac+");

        if (isMac && isMacKey) {
          this.callbacks.set(key.slice(4), callback);
          this.allKeys.add(key.split("+").at(-1));
        } else if (!isMac && !isMacKey) {
          this.callbacks.set(key, callback);
          this.allKeys.add(key.split("+").at(-1));
        }
      }
    }
  }

  static get platform() {
    const platform = typeof navigator !== "undefined" ? navigator.platform : "";
    return (0, _util.shadow)(this, "platform", {
      isWin: platform.includes("Win"),
      isMac: platform.includes("Mac")
    });
  }

  #serialize(event) {
    if (event.altKey) {
      this.buffer.push("alt");
    }

    if (event.ctrlKey) {
      this.buffer.push("ctrl");
    }

    if (event.metaKey) {
      this.buffer.push("meta");
    }

    if (event.shiftKey) {
      this.buffer.push("shift");
    }

    this.buffer.push(event.key);
    const str = this.buffer.join("+");
    this.buffer.length = 0;
    return str;
  }

  exec(self, event) {
    if (!this.allKeys.has(event.key)) {
      return;
    }

    const callback = this.callbacks.get(this.#serialize(event));

    if (!callback) {
      return;
    }

    callback.bind(self)();
    event.stopPropagation();
    event.preventDefault();
  }

}

exports.KeyboardManager = KeyboardManager;

class ClipboardManager {
  #elements = null;

  copy(element) {
    if (!element) {
      return;
    }

    if (Array.isArray(element)) {
      this.#elements = element.map(el => el.serialize());
    } else {
      this.#elements = [element.serialize()];
    }

    this.#elements = this.#elements.filter(el => !!el);

    if (this.#elements.length === 0) {
      this.#elements = null;
    }
  }

  paste() {
    return this.#elements;
  }

  isEmpty() {
    return this.#elements === null;
  }

  destroy() {
    this.#elements = null;
  }

}

class ColorManager {
  static _colorsMapping = new Map([["CanvasText", [0, 0, 0]], ["Canvas", [255, 255, 255]]]);

  get _colors() {
    if (typeof document === "undefined") {
      return (0, _util.shadow)(this, "_colors", ColorManager._colorsMapping);
    }

    const colors = new Map([["CanvasText", null], ["Canvas", null]]);
    (0, _display_utils.getColorValues)(colors);
    return (0, _util.shadow)(this, "_colors", colors);
  }

  convert(color) {
    const rgb = (0, _display_utils.getRGB)(color);

    if (!window.matchMedia("(forced-colors: active)").matches) {
      return rgb;
    }

    for (const [name, RGB] of this._colors) {
      if (RGB.every((x, i) => x === rgb[i])) {
        return ColorManager._colorsMapping.get(name);
      }
    }

    return rgb;
  }

  getHexCode(name) {
    const rgb = this._colors.get(name);

    if (!rgb) {
      return name;
    }

    return _util.Util.makeHexColor(...rgb);
  }

}

exports.ColorManager = ColorManager;

class AnnotationEditorUIManager {
  #activeEditor = null;
  #allEditors = new Map();
  #allLayers = new Map();
  #clipboardManager = new ClipboardManager();
  #commandManager = new CommandManager();
  #currentPageIndex = 0;
  #editorTypes = null;
  #eventBus = null;
  #idManager = new IdManager();
  #isEnabled = false;
  #mode = _util.AnnotationEditorType.NONE;
  #selectedEditors = new Set();
  #boundKeydown = this.keydown.bind(this);
  #boundOnEditingAction = this.onEditingAction.bind(this);
  #boundOnPageChanging = this.onPageChanging.bind(this);
  #boundOnTextLayerRendered = this.onTextLayerRendered.bind(this);
  #previousStates = {
    isEditing: false,
    isEmpty: true,
    hasEmptyClipboard: true,
    hasSomethingToUndo: false,
    hasSomethingToRedo: false,
    hasSelectedEditor: false
  };
  #container = null;
  static _keyboardManager = new KeyboardManager([[["ctrl+a", "mac+meta+a"], AnnotationEditorUIManager.prototype.selectAll], [["ctrl+c", "mac+meta+c"], AnnotationEditorUIManager.prototype.copy], [["ctrl+v", "mac+meta+v"], AnnotationEditorUIManager.prototype.paste], [["ctrl+x", "mac+meta+x"], AnnotationEditorUIManager.prototype.cut], [["ctrl+z", "mac+meta+z"], AnnotationEditorUIManager.prototype.undo], [["ctrl+y", "ctrl+shift+Z", "mac+meta+shift+Z"], AnnotationEditorUIManager.prototype.redo], [["Backspace", "alt+Backspace", "ctrl+Backspace", "shift+Backspace", "mac+Backspace", "mac+alt+Backspace", "mac+ctrl+Backspace", "Delete", "ctrl+Delete", "shift+Delete"], AnnotationEditorUIManager.prototype.delete], [["Escape", "mac+Escape"], AnnotationEditorUIManager.prototype.unselectAll]]);

  constructor(container, eventBus) {
    this.#container = container;
    this.#eventBus = eventBus;

    this.#eventBus._on("editingaction", this.#boundOnEditingAction);

    this.#eventBus._on("pagechanging", this.#boundOnPageChanging);

    this.#eventBus._on("textlayerrendered", this.#boundOnTextLayerRendered);
  }

  destroy() {
    this.#removeKeyboardManager();

    this.#eventBus._off("editingaction", this.#boundOnEditingAction);

    this.#eventBus._off("pagechanging", this.#boundOnPageChanging);

    this.#eventBus._off("textlayerrendered", this.#boundOnTextLayerRendered);

    for (const layer of this.#allLayers.values()) {
      layer.destroy();
    }

    this.#allLayers.clear();
    this.#allEditors.clear();
    this.#activeEditor = null;
    this.#selectedEditors.clear();
    this.#clipboardManager.destroy();
    this.#commandManager.destroy();
  }

  onPageChanging({
    pageNumber
  }) {
    this.#currentPageIndex = pageNumber - 1;
  }

  onTextLayerRendered({
    pageNumber
  }) {
    const pageIndex = pageNumber - 1;
    const layer = this.#allLayers.get(pageIndex);
    layer?.onTextLayerRendered();
  }

  focusMainContainer() {
    this.#container.focus();
  }

  #addKeyboardManager() {
    this.#container.addEventListener("keydown", this.#boundKeydown);
  }

  #removeKeyboardManager() {
    this.#container.removeEventListener("keydown", this.#boundKeydown);
  }

  keydown(event) {
    if (!this.getActive()?.shouldGetKeyboardEvents()) {
      AnnotationEditorUIManager._keyboardManager.exec(this, event);
    }
  }

  onEditingAction(details) {
    if (["undo", "redo", "cut", "copy", "paste", "delete", "selectAll"].includes(details.name)) {
      this[details.name]();
    }
  }

  #dispatchUpdateStates(details) {
    const hasChanged = Object.entries(details).some(([key, value]) => this.#previousStates[key] !== value);

    if (hasChanged) {
      this.#eventBus.dispatch("annotationeditorstateschanged", {
        source: this,
        details: Object.assign(this.#previousStates, details)
      });
    }
  }

  #dispatchUpdateUI(details) {
    this.#eventBus.dispatch("annotationeditorparamschanged", {
      source: this,
      details
    });
  }

  setEditingState(isEditing) {
    if (isEditing) {
      this.#addKeyboardManager();
      this.#dispatchUpdateStates({
        isEditing: this.#mode !== _util.AnnotationEditorType.NONE,
        isEmpty: this.#isEmpty(),
        hasSomethingToUndo: this.#commandManager.hasSomethingToUndo(),
        hasSomethingToRedo: this.#commandManager.hasSomethingToRedo(),
        hasSelectedEditor: false,
        hasEmptyClipboard: this.#clipboardManager.isEmpty()
      });
    } else {
      this.#removeKeyboardManager();
      this.#dispatchUpdateStates({
        isEditing: false
      });
    }
  }

  registerEditorTypes(types) {
    this.#editorTypes = types;

    for (const editorType of this.#editorTypes) {
      this.#dispatchUpdateUI(editorType.defaultPropertiesToUpdate);
    }
  }

  getId() {
    return this.#idManager.getId();
  }

  addLayer(layer) {
    this.#allLayers.set(layer.pageIndex, layer);

    if (this.#isEnabled) {
      layer.enable();
    } else {
      layer.disable();
    }
  }

  removeLayer(layer) {
    this.#allLayers.delete(layer.pageIndex);
  }

  updateMode(mode) {
    this.#mode = mode;

    if (mode === _util.AnnotationEditorType.NONE) {
      this.setEditingState(false);
      this.#disableAll();
    } else {
      this.setEditingState(true);
      this.#enableAll();

      for (const layer of this.#allLayers.values()) {
        layer.updateMode(mode);
      }
    }
  }

  updateToolbar(mode) {
    if (mode === this.#mode) {
      return;
    }

    this.#eventBus.dispatch("switchannotationeditormode", {
      source: this,
      mode
    });
  }

  updateParams(type, value) {
    for (const editor of this.#selectedEditors) {
      editor.updateParams(type, value);
    }

    for (const editorType of this.#editorTypes) {
      editorType.updateDefaultParams(type, value);
    }
  }

  #enableAll() {
    if (!this.#isEnabled) {
      this.#isEnabled = true;

      for (const layer of this.#allLayers.values()) {
        layer.enable();
      }
    }
  }

  #disableAll() {
    this.unselectAll();

    if (this.#isEnabled) {
      this.#isEnabled = false;

      for (const layer of this.#allLayers.values()) {
        layer.disable();
      }
    }
  }

  getEditors(pageIndex) {
    const editors = [];

    for (const editor of this.#allEditors.values()) {
      if (editor.pageIndex === pageIndex) {
        editors.push(editor);
      }
    }

    return editors;
  }

  getEditor(id) {
    return this.#allEditors.get(id);
  }

  addEditor(editor) {
    this.#allEditors.set(editor.id, editor);
  }

  removeEditor(editor) {
    this.#allEditors.delete(editor.id);
    this.unselect(editor);
  }

  #addEditorToLayer(editor) {
    const layer = this.#allLayers.get(editor.pageIndex);

    if (layer) {
      layer.addOrRebuild(editor);
    } else {
      this.addEditor(editor);
    }
  }

  setActiveEditor(editor) {
    if (this.#activeEditor === editor) {
      return;
    }

    this.#activeEditor = editor;

    if (editor) {
      this.#dispatchUpdateUI(editor.propertiesToUpdate);
    }
  }

  toggleSelected(editor) {
    if (this.#selectedEditors.has(editor)) {
      this.#selectedEditors.delete(editor);
      editor.unselect();
      this.#dispatchUpdateStates({
        hasSelectedEditor: this.hasSelection
      });
      return;
    }

    this.#selectedEditors.add(editor);
    editor.select();
    this.#dispatchUpdateUI(editor.propertiesToUpdate);
    this.#dispatchUpdateStates({
      hasSelectedEditor: true
    });
  }

  setSelected(editor) {
    for (const ed of this.#selectedEditors) {
      if (ed !== editor) {
        ed.unselect();
      }
    }

    this.#selectedEditors.clear();
    this.#selectedEditors.add(editor);
    editor.select();
    this.#dispatchUpdateUI(editor.propertiesToUpdate);
    this.#dispatchUpdateStates({
      hasSelectedEditor: true
    });
  }

  isSelected(editor) {
    return this.#selectedEditors.has(editor);
  }

  unselect(editor) {
    editor.unselect();
    this.#selectedEditors.delete(editor);
    this.#dispatchUpdateStates({
      hasSelectedEditor: this.hasSelection
    });
  }

  get hasSelection() {
    return this.#selectedEditors.size !== 0;
  }

  undo() {
    this.#commandManager.undo();
    this.#dispatchUpdateStates({
      hasSomethingToUndo: this.#commandManager.hasSomethingToUndo(),
      hasSomethingToRedo: true,
      isEmpty: this.#isEmpty()
    });
  }

  redo() {
    this.#commandManager.redo();
    this.#dispatchUpdateStates({
      hasSomethingToUndo: true,
      hasSomethingToRedo: this.#commandManager.hasSomethingToRedo(),
      isEmpty: this.#isEmpty()
    });
  }

  addCommands(params) {
    this.#commandManager.add(params);
    this.#dispatchUpdateStates({
      hasSomethingToUndo: true,
      hasSomethingToRedo: false,
      isEmpty: this.#isEmpty()
    });
  }

  #isEmpty() {
    if (this.#allEditors.size === 0) {
      return true;
    }

    if (this.#allEditors.size === 1) {
      for (const editor of this.#allEditors.values()) {
        return editor.isEmpty();
      }
    }

    return false;
  }

  delete() {
    if (this.#activeEditor) {
      this.#activeEditor.commitOrRemove();
    }

    if (!this.hasSelection) {
      return;
    }

    const editors = [...this.#selectedEditors];

    const cmd = () => {
      for (const editor of editors) {
        editor.remove();
      }
    };

    const undo = () => {
      for (const editor of editors) {
        this.#addEditorToLayer(editor);
      }
    };

    this.addCommands({
      cmd,
      undo,
      mustExec: true
    });
  }

  copy() {
    if (this.#activeEditor) {
      this.#activeEditor.commitOrRemove();
    }

    if (this.hasSelection) {
      const editors = [];

      for (const editor of this.#selectedEditors) {
        if (!editor.isEmpty()) {
          editors.push(editor);
        }
      }

      if (editors.length === 0) {
        return;
      }

      this.#clipboardManager.copy(editors);
      this.#dispatchUpdateStates({
        hasEmptyClipboard: false
      });
    }
  }

  cut() {
    this.copy();
    this.delete();
  }

  paste() {
    if (this.#clipboardManager.isEmpty()) {
      return;
    }

    this.unselectAll();
    const layer = this.#allLayers.get(this.#currentPageIndex);
    const newEditors = this.#clipboardManager.paste().map(data => layer.deserialize(data));

    const cmd = () => {
      for (const editor of newEditors) {
        this.#addEditorToLayer(editor);
      }

      this.#selectEditors(newEditors);
    };

    const undo = () => {
      for (const editor of newEditors) {
        editor.remove();
      }
    };

    this.addCommands({
      cmd,
      undo,
      mustExec: true
    });
  }

  #selectEditors(editors) {
    this.#selectedEditors.clear();

    for (const editor of editors) {
      if (editor.isEmpty()) {
        continue;
      }

      this.#selectedEditors.add(editor);
      editor.select();
    }

    this.#dispatchUpdateStates({
      hasSelectedEditor: true
    });
  }

  selectAll() {
    for (const editor of this.#selectedEditors) {
      editor.commit();
    }

    this.#selectEditors(this.#allEditors.values());
  }

  unselectAll() {
    if (this.#activeEditor) {
      this.#activeEditor.commitOrRemove();
      return;
    }

    if (this.#selectEditors.size === 0) {
      return;
    }

    for (const editor of this.#selectedEditors) {
      editor.unselect();
    }

    this.#selectedEditors.clear();
    this.#dispatchUpdateStates({
      hasSelectedEditor: false
    });
  }

  isActive(editor) {
    return this.#activeEditor === editor;
  }

  getActive() {
    return this.#activeEditor;
  }

  getMode() {
    return this.#mode;
  }

}

exports.AnnotationEditorUIManager = AnnotationEditorUIManager;