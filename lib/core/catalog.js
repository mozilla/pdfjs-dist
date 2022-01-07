/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2021 Mozilla Foundation
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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Catalog = void 0;

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _util = require("../shared/util.js");

var _name_number_tree = require("./name_number_tree.js");

var _base_stream = require("./base_stream.js");

var _colorspace = require("./colorspace.js");

var _file_spec = require("./file_spec.js");

var _image_utils = require("./image_utils.js");

var _metadata_parser = require("./metadata_parser.js");

var _struct_tree = require("./struct_tree.js");

function fetchDestination(dest) {
  if (dest instanceof _primitives.Dict) {
    dest = dest.get("D");
  }

  return Array.isArray(dest) ? dest : null;
}

class Catalog {
  constructor(pdfManager, xref) {
    this.pdfManager = pdfManager;
    this.xref = xref;
    this._catDict = xref.getCatalogObj();

    if (!(this._catDict instanceof _primitives.Dict)) {
      throw new _util.FormatError("Catalog object is not a dictionary.");
    }

    this.toplevelPagesDict;
    this._actualNumPages = null;
    this.fontCache = new _primitives.RefSetCache();
    this.builtInCMapCache = new Map();
    this.standardFontDataCache = new Map();
    this.globalImageCache = new _image_utils.GlobalImageCache();
    this.pageKidsCountCache = new _primitives.RefSetCache();
    this.pageIndexCache = new _primitives.RefSetCache();
    this.nonBlendModesSet = new _primitives.RefSet();
  }

  get version() {
    const version = this._catDict.get("Version");

    return (0, _util.shadow)(this, "version", version instanceof _primitives.Name ? version.name : null);
  }

  get lang() {
    const lang = this._catDict.get("Lang");

    return (0, _util.shadow)(this, "lang", typeof lang === "string" ? (0, _util.stringToPDFString)(lang) : null);
  }

  get needsRendering() {
    const needsRendering = this._catDict.get("NeedsRendering");

    return (0, _util.shadow)(this, "needsRendering", typeof needsRendering === "boolean" ? needsRendering : false);
  }

  get collection() {
    let collection = null;

    try {
      const obj = this._catDict.get("Collection");

      if ((0, _primitives.isDict)(obj) && obj.size > 0) {
        collection = obj;
      }
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.info)("Cannot fetch Collection entry; assuming no collection is present.");
    }

    return (0, _util.shadow)(this, "collection", collection);
  }

  get acroForm() {
    let acroForm = null;

    try {
      const obj = this._catDict.get("AcroForm");

      if ((0, _primitives.isDict)(obj) && obj.size > 0) {
        acroForm = obj;
      }
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.info)("Cannot fetch AcroForm entry; assuming no forms are present.");
    }

    return (0, _util.shadow)(this, "acroForm", acroForm);
  }

  get acroFormRef() {
    const value = this._catDict.getRaw("AcroForm");

    return (0, _util.shadow)(this, "acroFormRef", (0, _primitives.isRef)(value) ? value : null);
  }

  get metadata() {
    const streamRef = this._catDict.getRaw("Metadata");

    if (!(streamRef instanceof _primitives.Ref)) {
      return (0, _util.shadow)(this, "metadata", null);
    }

    let metadata = null;

    try {
      const suppressEncryption = !(this.xref.encrypt && this.xref.encrypt.encryptMetadata);
      const stream = this.xref.fetch(streamRef, suppressEncryption);

      if (stream instanceof _base_stream.BaseStream && stream.dict instanceof _primitives.Dict) {
        const type = stream.dict.get("Type");
        const subtype = stream.dict.get("Subtype");

        if ((0, _primitives.isName)(type, "Metadata") && (0, _primitives.isName)(subtype, "XML")) {
          const data = (0, _util.stringToUTF8String)(stream.getString());

          if (data) {
            metadata = new _metadata_parser.MetadataParser(data).serializable;
          }
        }
      }
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.info)(`Skipping invalid Metadata: "${ex}".`);
    }

    return (0, _util.shadow)(this, "metadata", metadata);
  }

  get markInfo() {
    let markInfo = null;

    try {
      markInfo = this._readMarkInfo();
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)("Unable to read mark info.");
    }

    return (0, _util.shadow)(this, "markInfo", markInfo);
  }

  _readMarkInfo() {
    const obj = this._catDict.get("MarkInfo");

    if (!(0, _primitives.isDict)(obj)) {
      return null;
    }

    const markInfo = Object.assign(Object.create(null), {
      Marked: false,
      UserProperties: false,
      Suspects: false
    });

    for (const key in markInfo) {
      if (!obj.has(key)) {
        continue;
      }

      const value = obj.get(key);

      if (!(0, _util.isBool)(value)) {
        continue;
      }

      markInfo[key] = value;
    }

    return markInfo;
  }

  get structTreeRoot() {
    let structTree = null;

    try {
      structTree = this._readStructTreeRoot();
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)("Unable read to structTreeRoot info.");
    }

    return (0, _util.shadow)(this, "structTreeRoot", structTree);
  }

  _readStructTreeRoot() {
    const obj = this._catDict.get("StructTreeRoot");

    if (!(0, _primitives.isDict)(obj)) {
      return null;
    }

    const root = new _struct_tree.StructTreeRoot(obj);
    root.init();
    return root;
  }

  get toplevelPagesDict() {
    const pagesObj = this._catDict.get("Pages");

    if (!(0, _primitives.isDict)(pagesObj)) {
      throw new _util.FormatError("Invalid top-level pages dictionary.");
    }

    return (0, _util.shadow)(this, "toplevelPagesDict", pagesObj);
  }

  get documentOutline() {
    let obj = null;

    try {
      obj = this._readDocumentOutline();
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)("Unable to read document outline.");
    }

    return (0, _util.shadow)(this, "documentOutline", obj);
  }

  _readDocumentOutline() {
    let obj = this._catDict.get("Outlines");

    if (!(0, _primitives.isDict)(obj)) {
      return null;
    }

    obj = obj.getRaw("First");

    if (!(0, _primitives.isRef)(obj)) {
      return null;
    }

    const root = {
      items: []
    };
    const queue = [{
      obj,
      parent: root
    }];
    const processed = new _primitives.RefSet();
    processed.put(obj);
    const xref = this.xref,
          blackColor = new Uint8ClampedArray(3);

    while (queue.length > 0) {
      const i = queue.shift();
      const outlineDict = xref.fetchIfRef(i.obj);

      if (outlineDict === null) {
        continue;
      }

      if (!outlineDict.has("Title")) {
        throw new _util.FormatError("Invalid outline item encountered.");
      }

      const data = {
        url: null,
        dest: null
      };
      Catalog.parseDestDictionary({
        destDict: outlineDict,
        resultObj: data,
        docBaseUrl: this.pdfManager.docBaseUrl
      });
      const title = outlineDict.get("Title");
      const flags = outlineDict.get("F") || 0;
      const color = outlineDict.getArray("C");
      const count = outlineDict.get("Count");
      let rgbColor = blackColor;

      if (Array.isArray(color) && color.length === 3 && (color[0] !== 0 || color[1] !== 0 || color[2] !== 0)) {
        rgbColor = _colorspace.ColorSpace.singletons.rgb.getRgb(color, 0);
      }

      const outlineItem = {
        dest: data.dest,
        url: data.url,
        unsafeUrl: data.unsafeUrl,
        newWindow: data.newWindow,
        title: (0, _util.stringToPDFString)(title),
        color: rgbColor,
        count: Number.isInteger(count) ? count : undefined,
        bold: !!(flags & 2),
        italic: !!(flags & 1),
        items: []
      };
      i.parent.items.push(outlineItem);
      obj = outlineDict.getRaw("First");

      if ((0, _primitives.isRef)(obj) && !processed.has(obj)) {
        queue.push({
          obj,
          parent: outlineItem
        });
        processed.put(obj);
      }

      obj = outlineDict.getRaw("Next");

      if ((0, _primitives.isRef)(obj) && !processed.has(obj)) {
        queue.push({
          obj,
          parent: i.parent
        });
        processed.put(obj);
      }
    }

    return root.items.length > 0 ? root.items : null;
  }

  get permissions() {
    let permissions = null;

    try {
      permissions = this._readPermissions();
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)("Unable to read permissions.");
    }

    return (0, _util.shadow)(this, "permissions", permissions);
  }

  _readPermissions() {
    const encrypt = this.xref.trailer.get("Encrypt");

    if (!(0, _primitives.isDict)(encrypt)) {
      return null;
    }

    let flags = encrypt.get("P");

    if (!(0, _util.isNum)(flags)) {
      return null;
    }

    flags += 2 ** 32;
    const permissions = [];

    for (const key in _util.PermissionFlag) {
      const value = _util.PermissionFlag[key];

      if (flags & value) {
        permissions.push(value);
      }
    }

    return permissions;
  }

  get optionalContentConfig() {
    let config = null;

    try {
      const properties = this._catDict.get("OCProperties");

      if (!properties) {
        return (0, _util.shadow)(this, "optionalContentConfig", null);
      }

      const defaultConfig = properties.get("D");

      if (!defaultConfig) {
        return (0, _util.shadow)(this, "optionalContentConfig", null);
      }

      const groupsData = properties.get("OCGs");

      if (!Array.isArray(groupsData)) {
        return (0, _util.shadow)(this, "optionalContentConfig", null);
      }

      const groups = [];
      const groupRefs = [];

      for (const groupRef of groupsData) {
        if (!(0, _primitives.isRef)(groupRef)) {
          continue;
        }

        groupRefs.push(groupRef);
        const group = this.xref.fetchIfRef(groupRef);
        groups.push({
          id: groupRef.toString(),
          name: (0, _util.isString)(group.get("Name")) ? (0, _util.stringToPDFString)(group.get("Name")) : null,
          intent: (0, _util.isString)(group.get("Intent")) ? (0, _util.stringToPDFString)(group.get("Intent")) : null
        });
      }

      config = this._readOptionalContentConfig(defaultConfig, groupRefs);
      config.groups = groups;
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)(`Unable to read optional content config: ${ex}`);
    }

    return (0, _util.shadow)(this, "optionalContentConfig", config);
  }

  _readOptionalContentConfig(config, contentGroupRefs) {
    function parseOnOff(refs) {
      const onParsed = [];

      if (Array.isArray(refs)) {
        for (const value of refs) {
          if (!(0, _primitives.isRef)(value)) {
            continue;
          }

          if (contentGroupRefs.includes(value)) {
            onParsed.push(value.toString());
          }
        }
      }

      return onParsed;
    }

    function parseOrder(refs, nestedLevels = 0) {
      if (!Array.isArray(refs)) {
        return null;
      }

      const order = [];

      for (const value of refs) {
        if ((0, _primitives.isRef)(value) && contentGroupRefs.includes(value)) {
          parsedOrderRefs.put(value);
          order.push(value.toString());
          continue;
        }

        const nestedOrder = parseNestedOrder(value, nestedLevels);

        if (nestedOrder) {
          order.push(nestedOrder);
        }
      }

      if (nestedLevels > 0) {
        return order;
      }

      const hiddenGroups = [];

      for (const groupRef of contentGroupRefs) {
        if (parsedOrderRefs.has(groupRef)) {
          continue;
        }

        hiddenGroups.push(groupRef.toString());
      }

      if (hiddenGroups.length) {
        order.push({
          name: null,
          order: hiddenGroups
        });
      }

      return order;
    }

    function parseNestedOrder(ref, nestedLevels) {
      if (++nestedLevels > MAX_NESTED_LEVELS) {
        (0, _util.warn)("parseNestedOrder - reached MAX_NESTED_LEVELS.");
        return null;
      }

      const value = xref.fetchIfRef(ref);

      if (!Array.isArray(value)) {
        return null;
      }

      const nestedName = xref.fetchIfRef(value[0]);

      if (typeof nestedName !== "string") {
        return null;
      }

      const nestedOrder = parseOrder(value.slice(1), nestedLevels);

      if (!nestedOrder || !nestedOrder.length) {
        return null;
      }

      return {
        name: (0, _util.stringToPDFString)(nestedName),
        order: nestedOrder
      };
    }

    const xref = this.xref,
          parsedOrderRefs = new _primitives.RefSet(),
          MAX_NESTED_LEVELS = 10;
    return {
      name: (0, _util.isString)(config.get("Name")) ? (0, _util.stringToPDFString)(config.get("Name")) : null,
      creator: (0, _util.isString)(config.get("Creator")) ? (0, _util.stringToPDFString)(config.get("Creator")) : null,
      baseState: (0, _primitives.isName)(config.get("BaseState")) ? config.get("BaseState").name : null,
      on: parseOnOff(config.get("ON")),
      off: parseOnOff(config.get("OFF")),
      order: parseOrder(config.get("Order")),
      groups: null
    };
  }

  setActualNumPages(num = null) {
    this._actualNumPages = num;
  }

  get hasActualNumPages() {
    return this._actualNumPages !== null;
  }

  get _pagesCount() {
    const obj = this.toplevelPagesDict.get("Count");

    if (!Number.isInteger(obj)) {
      throw new _util.FormatError("Page count in top-level pages dictionary is not an integer.");
    }

    return (0, _util.shadow)(this, "_pagesCount", obj);
  }

  get numPages() {
    return this.hasActualNumPages ? this._actualNumPages : this._pagesCount;
  }

  get destinations() {
    const obj = this._readDests(),
          dests = Object.create(null);

    if (obj instanceof _name_number_tree.NameTree) {
      for (const [key, value] of obj.getAll()) {
        const dest = fetchDestination(value);

        if (dest) {
          dests[key] = dest;
        }
      }
    } else if (obj instanceof _primitives.Dict) {
      obj.forEach(function (key, value) {
        const dest = fetchDestination(value);

        if (dest) {
          dests[key] = dest;
        }
      });
    }

    return (0, _util.shadow)(this, "destinations", dests);
  }

  getDestination(id) {
    const obj = this._readDests();

    if (obj instanceof _name_number_tree.NameTree) {
      const dest = fetchDestination(obj.get(id));

      if (dest) {
        return dest;
      }

      const allDest = this.destinations[id];

      if (allDest) {
        (0, _util.warn)(`Found "${id}" at an incorrect position in the NameTree.`);
        return allDest;
      }
    } else if (obj instanceof _primitives.Dict) {
      const dest = fetchDestination(obj.get(id));

      if (dest) {
        return dest;
      }
    }

    return null;
  }

  _readDests() {
    const obj = this._catDict.get("Names");

    if (obj && obj.has("Dests")) {
      return new _name_number_tree.NameTree(obj.getRaw("Dests"), this.xref);
    } else if (this._catDict.has("Dests")) {
      return this._catDict.get("Dests");
    }

    return undefined;
  }

  get pageLabels() {
    let obj = null;

    try {
      obj = this._readPageLabels();
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)("Unable to read page labels.");
    }

    return (0, _util.shadow)(this, "pageLabels", obj);
  }

  _readPageLabels() {
    const obj = this._catDict.getRaw("PageLabels");

    if (!obj) {
      return null;
    }

    const pageLabels = new Array(this.numPages);
    let style = null,
        prefix = "";
    const numberTree = new _name_number_tree.NumberTree(obj, this.xref);
    const nums = numberTree.getAll();
    let currentLabel = "",
        currentIndex = 1;

    for (let i = 0, ii = this.numPages; i < ii; i++) {
      const labelDict = nums.get(i);

      if (labelDict !== undefined) {
        if (!(0, _primitives.isDict)(labelDict)) {
          throw new _util.FormatError("PageLabel is not a dictionary.");
        }

        if (labelDict.has("Type") && !(0, _primitives.isName)(labelDict.get("Type"), "PageLabel")) {
          throw new _util.FormatError("Invalid type in PageLabel dictionary.");
        }

        if (labelDict.has("S")) {
          const s = labelDict.get("S");

          if (!(0, _primitives.isName)(s)) {
            throw new _util.FormatError("Invalid style in PageLabel dictionary.");
          }

          style = s.name;
        } else {
          style = null;
        }

        if (labelDict.has("P")) {
          const p = labelDict.get("P");

          if (!(0, _util.isString)(p)) {
            throw new _util.FormatError("Invalid prefix in PageLabel dictionary.");
          }

          prefix = (0, _util.stringToPDFString)(p);
        } else {
          prefix = "";
        }

        if (labelDict.has("St")) {
          const st = labelDict.get("St");

          if (!(Number.isInteger(st) && st >= 1)) {
            throw new _util.FormatError("Invalid start in PageLabel dictionary.");
          }

          currentIndex = st;
        } else {
          currentIndex = 1;
        }
      }

      switch (style) {
        case "D":
          currentLabel = currentIndex;
          break;

        case "R":
        case "r":
          currentLabel = (0, _core_utils.toRomanNumerals)(currentIndex, style === "r");
          break;

        case "A":
        case "a":
          const LIMIT = 26;
          const A_UPPER_CASE = 0x41,
                A_LOWER_CASE = 0x61;
          const baseCharCode = style === "a" ? A_LOWER_CASE : A_UPPER_CASE;
          const letterIndex = currentIndex - 1;
          const character = String.fromCharCode(baseCharCode + letterIndex % LIMIT);
          const charBuf = [];

          for (let j = 0, jj = letterIndex / LIMIT | 0; j <= jj; j++) {
            charBuf.push(character);
          }

          currentLabel = charBuf.join("");
          break;

        default:
          if (style) {
            throw new _util.FormatError(`Invalid style "${style}" in PageLabel dictionary.`);
          }

          currentLabel = "";
      }

      pageLabels[i] = prefix + currentLabel;
      currentIndex++;
    }

    return pageLabels;
  }

  get pageLayout() {
    const obj = this._catDict.get("PageLayout");

    let pageLayout = "";

    if ((0, _primitives.isName)(obj)) {
      switch (obj.name) {
        case "SinglePage":
        case "OneColumn":
        case "TwoColumnLeft":
        case "TwoColumnRight":
        case "TwoPageLeft":
        case "TwoPageRight":
          pageLayout = obj.name;
      }
    }

    return (0, _util.shadow)(this, "pageLayout", pageLayout);
  }

  get pageMode() {
    const obj = this._catDict.get("PageMode");

    let pageMode = "UseNone";

    if ((0, _primitives.isName)(obj)) {
      switch (obj.name) {
        case "UseNone":
        case "UseOutlines":
        case "UseThumbs":
        case "FullScreen":
        case "UseOC":
        case "UseAttachments":
          pageMode = obj.name;
      }
    }

    return (0, _util.shadow)(this, "pageMode", pageMode);
  }

  get viewerPreferences() {
    const ViewerPreferencesValidators = {
      HideToolbar: _util.isBool,
      HideMenubar: _util.isBool,
      HideWindowUI: _util.isBool,
      FitWindow: _util.isBool,
      CenterWindow: _util.isBool,
      DisplayDocTitle: _util.isBool,
      NonFullScreenPageMode: _primitives.isName,
      Direction: _primitives.isName,
      ViewArea: _primitives.isName,
      ViewClip: _primitives.isName,
      PrintArea: _primitives.isName,
      PrintClip: _primitives.isName,
      PrintScaling: _primitives.isName,
      Duplex: _primitives.isName,
      PickTrayByPDFSize: _util.isBool,
      PrintPageRange: Array.isArray,
      NumCopies: Number.isInteger
    };

    const obj = this._catDict.get("ViewerPreferences");

    let prefs = null;

    if ((0, _primitives.isDict)(obj)) {
      for (const key in ViewerPreferencesValidators) {
        if (!obj.has(key)) {
          continue;
        }

        const value = obj.get(key);

        if (!ViewerPreferencesValidators[key](value)) {
          (0, _util.info)(`Bad value in ViewerPreferences for "${key}".`);
          continue;
        }

        let prefValue;

        switch (key) {
          case "NonFullScreenPageMode":
            switch (value.name) {
              case "UseNone":
              case "UseOutlines":
              case "UseThumbs":
              case "UseOC":
                prefValue = value.name;
                break;

              default:
                prefValue = "UseNone";
            }

            break;

          case "Direction":
            switch (value.name) {
              case "L2R":
              case "R2L":
                prefValue = value.name;
                break;

              default:
                prefValue = "L2R";
            }

            break;

          case "ViewArea":
          case "ViewClip":
          case "PrintArea":
          case "PrintClip":
            switch (value.name) {
              case "MediaBox":
              case "CropBox":
              case "BleedBox":
              case "TrimBox":
              case "ArtBox":
                prefValue = value.name;
                break;

              default:
                prefValue = "CropBox";
            }

            break;

          case "PrintScaling":
            switch (value.name) {
              case "None":
              case "AppDefault":
                prefValue = value.name;
                break;

              default:
                prefValue = "AppDefault";
            }

            break;

          case "Duplex":
            switch (value.name) {
              case "Simplex":
              case "DuplexFlipShortEdge":
              case "DuplexFlipLongEdge":
                prefValue = value.name;
                break;

              default:
                prefValue = "None";
            }

            break;

          case "PrintPageRange":
            const length = value.length;

            if (length % 2 !== 0) {
              break;
            }

            const isValid = value.every((page, i, arr) => {
              return Number.isInteger(page) && page > 0 && (i === 0 || page >= arr[i - 1]) && page <= this.numPages;
            });

            if (isValid) {
              prefValue = value;
            }

            break;

          case "NumCopies":
            if (value > 0) {
              prefValue = value;
            }

            break;

          default:
            if (typeof value !== "boolean") {
              throw new _util.FormatError(`viewerPreferences - expected a boolean value for: ${key}`);
            }

            prefValue = value;
        }

        if (prefValue !== undefined) {
          if (!prefs) {
            prefs = Object.create(null);
          }

          prefs[key] = prefValue;
        } else {
          (0, _util.info)(`Bad value in ViewerPreferences for "${key}".`);
        }
      }
    }

    return (0, _util.shadow)(this, "viewerPreferences", prefs);
  }

  get openAction() {
    const obj = this._catDict.get("OpenAction");

    const openAction = Object.create(null);

    if ((0, _primitives.isDict)(obj)) {
      const destDict = new _primitives.Dict(this.xref);
      destDict.set("A", obj);
      const resultObj = {
        url: null,
        dest: null,
        action: null
      };
      Catalog.parseDestDictionary({
        destDict,
        resultObj
      });

      if (Array.isArray(resultObj.dest)) {
        openAction.dest = resultObj.dest;
      } else if (resultObj.action) {
        openAction.action = resultObj.action;
      }
    } else if (Array.isArray(obj)) {
      openAction.dest = obj;
    }

    return (0, _util.shadow)(this, "openAction", (0, _util.objectSize)(openAction) > 0 ? openAction : null);
  }

  get attachments() {
    const obj = this._catDict.get("Names");

    let attachments = null;

    if (obj instanceof _primitives.Dict && obj.has("EmbeddedFiles")) {
      const nameTree = new _name_number_tree.NameTree(obj.getRaw("EmbeddedFiles"), this.xref);

      for (const [key, value] of nameTree.getAll()) {
        const fs = new _file_spec.FileSpec(value, this.xref);

        if (!attachments) {
          attachments = Object.create(null);
        }

        attachments[(0, _util.stringToPDFString)(key)] = fs.serializable;
      }
    }

    return (0, _util.shadow)(this, "attachments", attachments);
  }

  get xfaImages() {
    const obj = this._catDict.get("Names");

    let xfaImages = null;

    if (obj instanceof _primitives.Dict && obj.has("XFAImages")) {
      const nameTree = new _name_number_tree.NameTree(obj.getRaw("XFAImages"), this.xref);

      for (const [key, value] of nameTree.getAll()) {
        if (!xfaImages) {
          xfaImages = new _primitives.Dict(this.xref);
        }

        xfaImages.set(key, value);
      }
    }

    return (0, _util.shadow)(this, "xfaImages", xfaImages);
  }

  _collectJavaScript() {
    const obj = this._catDict.get("Names");

    let javaScript = null;

    function appendIfJavaScriptDict(name, jsDict) {
      if (!(jsDict instanceof _primitives.Dict)) {
        return;
      }

      if (!(0, _primitives.isName)(jsDict.get("S"), "JavaScript")) {
        return;
      }

      let js = jsDict.get("JS");

      if ((0, _primitives.isStream)(js)) {
        js = js.getString();
      } else if (typeof js !== "string") {
        return;
      }

      if (javaScript === null) {
        javaScript = new Map();
      }

      javaScript.set(name, (0, _util.stringToPDFString)(js));
    }

    if (obj instanceof _primitives.Dict && obj.has("JavaScript")) {
      const nameTree = new _name_number_tree.NameTree(obj.getRaw("JavaScript"), this.xref);

      for (const [key, value] of nameTree.getAll()) {
        appendIfJavaScriptDict(key, value);
      }
    }

    const openAction = this._catDict.get("OpenAction");

    if (openAction) {
      appendIfJavaScriptDict("OpenAction", openAction);
    }

    return javaScript;
  }

  get javaScript() {
    const javaScript = this._collectJavaScript();

    return (0, _util.shadow)(this, "javaScript", javaScript ? [...javaScript.values()] : null);
  }

  get jsActions() {
    const javaScript = this._collectJavaScript();

    let actions = (0, _core_utils.collectActions)(this.xref, this._catDict, _util.DocumentActionEventType);

    if (javaScript) {
      if (!actions) {
        actions = Object.create(null);
      }

      for (const [key, val] of javaScript) {
        if (key in actions) {
          actions[key].push(val);
        } else {
          actions[key] = [val];
        }
      }
    }

    return (0, _util.shadow)(this, "jsActions", actions);
  }

  fontFallback(id, handler) {
    const promises = [];
    this.fontCache.forEach(function (promise) {
      promises.push(promise);
    });
    return Promise.all(promises).then(translatedFonts => {
      for (const translatedFont of translatedFonts) {
        if (translatedFont.loadedName === id) {
          translatedFont.fallback(handler);
          return;
        }
      }
    });
  }

  cleanup(manuallyTriggered = false) {
    (0, _primitives.clearPrimitiveCaches)();
    this.globalImageCache.clear(manuallyTriggered);
    this.pageKidsCountCache.clear();
    this.pageIndexCache.clear();
    this.nonBlendModesSet.clear();
    const promises = [];
    this.fontCache.forEach(function (promise) {
      promises.push(promise);
    });
    return Promise.all(promises).then(translatedFonts => {
      for (const {
        dict
      } of translatedFonts) {
        delete dict.cacheKey;
      }

      this.fontCache.clear();
      this.builtInCMapCache.clear();
      this.standardFontDataCache.clear();
    });
  }

  getPageDict(pageIndex) {
    const capability = (0, _util.createPromiseCapability)();
    const nodesToVisit = [this.toplevelPagesDict];
    const visitedNodes = new _primitives.RefSet();

    const pagesRef = this._catDict.getRaw("Pages");

    if (pagesRef instanceof _primitives.Ref) {
      visitedNodes.put(pagesRef);
    }

    const xref = this.xref,
          pageKidsCountCache = this.pageKidsCountCache;
    let currentPageIndex = 0;

    function next() {
      while (nodesToVisit.length) {
        const currentNode = nodesToVisit.pop();

        if (currentNode instanceof _primitives.Ref) {
          const count = pageKidsCountCache.get(currentNode);

          if (count >= 0 && currentPageIndex + count <= pageIndex) {
            currentPageIndex += count;
            continue;
          }

          if (visitedNodes.has(currentNode)) {
            capability.reject(new _util.FormatError("Pages tree contains circular reference."));
            return;
          }

          visitedNodes.put(currentNode);
          xref.fetchAsync(currentNode).then(function (obj) {
            if ((0, _primitives.isDict)(obj, "Page") || (0, _primitives.isDict)(obj) && !obj.has("Kids")) {
              if (currentNode && !pageKidsCountCache.has(currentNode)) {
                pageKidsCountCache.put(currentNode, 1);
              }

              if (pageIndex === currentPageIndex) {
                capability.resolve([obj, currentNode]);
              } else {
                currentPageIndex++;
                next();
              }

              return;
            }

            nodesToVisit.push(obj);
            next();
          }, capability.reject);
          return;
        }

        if (!(currentNode instanceof _primitives.Dict)) {
          capability.reject(new _util.FormatError("Page dictionary kid reference points to wrong type of object."));
          return;
        }

        let count;

        try {
          count = currentNode.get("Count");
        } catch (ex) {
          if (ex instanceof _core_utils.MissingDataException) {
            throw ex;
          }
        }

        if (Number.isInteger(count) && count >= 0) {
          const objId = currentNode.objId;

          if (objId && !pageKidsCountCache.has(objId)) {
            pageKidsCountCache.put(objId, count);
          }

          if (currentPageIndex + count <= pageIndex) {
            currentPageIndex += count;
            continue;
          }
        }

        let kids;

        try {
          kids = currentNode.get("Kids");
        } catch (ex) {
          if (ex instanceof _core_utils.MissingDataException) {
            throw ex;
          }
        }

        if (!Array.isArray(kids)) {
          let type;

          try {
            type = currentNode.get("Type");
          } catch (ex) {
            if (ex instanceof _core_utils.MissingDataException) {
              throw ex;
            }
          }

          if ((0, _primitives.isName)(type, "Page") || !currentNode.has("Type") && currentNode.has("Contents")) {
            if (currentPageIndex === pageIndex) {
              capability.resolve([currentNode, null]);
              return;
            }

            currentPageIndex++;
            continue;
          }

          capability.reject(new _util.FormatError("Page dictionary kids object is not an array."));
          return;
        }

        for (let last = kids.length - 1; last >= 0; last--) {
          nodesToVisit.push(kids[last]);
        }
      }

      capability.reject(new Error(`Page index ${pageIndex} not found.`));
    }

    next();
    return capability.promise;
  }

  getAllPageDicts(recoveryMode = false) {
    const queue = [{
      currentNode: this.toplevelPagesDict,
      posInKids: 0
    }];
    const visitedNodes = new _primitives.RefSet();

    const pagesRef = this._catDict.getRaw("Pages");

    if (pagesRef instanceof _primitives.Ref) {
      visitedNodes.put(pagesRef);
    }

    const map = new Map();
    let pageIndex = 0;

    function addPageDict(pageDict, pageRef) {
      map.set(pageIndex++, [pageDict, pageRef]);
    }

    function addPageError(error) {
      map.set(pageIndex++, [error, null]);
    }

    while (queue.length > 0) {
      const queueItem = queue[queue.length - 1];
      const {
        currentNode,
        posInKids
      } = queueItem;
      let kids;

      try {
        kids = currentNode.get("Kids");
      } catch (ex) {
        if (ex instanceof _core_utils.MissingDataException) {
          throw ex;
        }

        if (ex instanceof _core_utils.XRefEntryException && !recoveryMode) {
          throw ex;
        }

        addPageError(ex);
        break;
      }

      if (!Array.isArray(kids)) {
        addPageError(new _util.FormatError("Page dictionary kids object is not an array."));
        break;
      }

      if (posInKids >= kids.length) {
        queue.pop();
        continue;
      }

      const kidObj = kids[posInKids];
      let obj;

      if (kidObj instanceof _primitives.Ref) {
        try {
          obj = this.xref.fetch(kidObj);
        } catch (ex) {
          if (ex instanceof _core_utils.MissingDataException) {
            throw ex;
          }

          if (ex instanceof _core_utils.XRefEntryException && !recoveryMode) {
            throw ex;
          }

          addPageError(ex);
          break;
        }

        if (visitedNodes.has(kidObj)) {
          addPageError(new _util.FormatError("Pages tree contains circular reference."));
          break;
        }

        visitedNodes.put(kidObj);
      } else {
        obj = kidObj;
      }

      if (!(obj instanceof _primitives.Dict)) {
        addPageError(new _util.FormatError("Page dictionary kid reference points to wrong type of object."));
        break;
      }

      if ((0, _primitives.isDict)(obj, "Page") || !obj.has("Kids")) {
        addPageDict(obj, kidObj instanceof _primitives.Ref ? kidObj : null);
      } else {
        queue.push({
          currentNode: obj,
          posInKids: 0
        });
      }

      queueItem.posInKids++;
    }

    return map;
  }

  getPageIndex(pageRef) {
    const cachedPageIndex = this.pageIndexCache.get(pageRef);

    if (cachedPageIndex !== undefined) {
      return Promise.resolve(cachedPageIndex);
    }

    const xref = this.xref;

    function pagesBeforeRef(kidRef) {
      let total = 0,
          parentRef;
      return xref.fetchAsync(kidRef).then(function (node) {
        if ((0, _primitives.isRefsEqual)(kidRef, pageRef) && !(0, _primitives.isDict)(node, "Page") && !((0, _primitives.isDict)(node) && !node.has("Type") && node.has("Contents"))) {
          throw new _util.FormatError("The reference does not point to a /Page dictionary.");
        }

        if (!node) {
          return null;
        }

        if (!(0, _primitives.isDict)(node)) {
          throw new _util.FormatError("Node must be a dictionary.");
        }

        parentRef = node.getRaw("Parent");
        return node.getAsync("Parent");
      }).then(function (parent) {
        if (!parent) {
          return null;
        }

        if (!(0, _primitives.isDict)(parent)) {
          throw new _util.FormatError("Parent must be a dictionary.");
        }

        return parent.getAsync("Kids");
      }).then(function (kids) {
        if (!kids) {
          return null;
        }

        const kidPromises = [];
        let found = false;

        for (let i = 0, ii = kids.length; i < ii; i++) {
          const kid = kids[i];

          if (!(0, _primitives.isRef)(kid)) {
            throw new _util.FormatError("Kid must be a reference.");
          }

          if ((0, _primitives.isRefsEqual)(kid, kidRef)) {
            found = true;
            break;
          }

          kidPromises.push(xref.fetchAsync(kid).then(function (obj) {
            if (!(0, _primitives.isDict)(obj)) {
              throw new _util.FormatError("Kid node must be a dictionary.");
            }

            if (obj.has("Count")) {
              total += obj.get("Count");
            } else {
              total++;
            }
          }));
        }

        if (!found) {
          throw new _util.FormatError("Kid reference not found in parent's kids.");
        }

        return Promise.all(kidPromises).then(function () {
          return [total, parentRef];
        });
      });
    }

    let total = 0;

    const next = ref => pagesBeforeRef(ref).then(args => {
      if (!args) {
        this.pageIndexCache.put(pageRef, total);
        return total;
      }

      const [count, parentRef] = args;
      total += count;
      return next(parentRef);
    });

    return next(pageRef);
  }

  static parseDestDictionary(params) {
    const destDict = params.destDict;

    if (!(0, _primitives.isDict)(destDict)) {
      (0, _util.warn)("parseDestDictionary: `destDict` must be a dictionary.");
      return;
    }

    const resultObj = params.resultObj;

    if (typeof resultObj !== "object") {
      (0, _util.warn)("parseDestDictionary: `resultObj` must be an object.");
      return;
    }

    const docBaseUrl = params.docBaseUrl || null;
    let action = destDict.get("A"),
        url,
        dest;

    if (!(0, _primitives.isDict)(action)) {
      if (destDict.has("Dest")) {
        action = destDict.get("Dest");
      } else {
        action = destDict.get("AA");

        if ((0, _primitives.isDict)(action)) {
          if (action.has("D")) {
            action = action.get("D");
          } else if (action.has("U")) {
            action = action.get("U");
          }
        }
      }
    }

    if ((0, _primitives.isDict)(action)) {
      const actionType = action.get("S");

      if (!(0, _primitives.isName)(actionType)) {
        (0, _util.warn)("parseDestDictionary: Invalid type in Action dictionary.");
        return;
      }

      const actionName = actionType.name;

      switch (actionName) {
        case "ResetForm":
          const flags = action.get("Flags");
          const include = (((0, _util.isNum)(flags) ? flags : 0) & 1) === 0;
          const fields = [];
          const refs = [];

          for (const obj of action.get("Fields") || []) {
            if ((0, _primitives.isRef)(obj)) {
              refs.push(obj.toString());
            } else if ((0, _util.isString)(obj)) {
              fields.push((0, _util.stringToPDFString)(obj));
            }
          }

          resultObj.resetForm = {
            fields,
            refs,
            include
          };
          break;

        case "URI":
          url = action.get("URI");

          if (url instanceof _primitives.Name) {
            url = "/" + url.name;
          }

          break;

        case "GoTo":
          dest = action.get("D");
          break;

        case "Launch":
        case "GoToR":
          const urlDict = action.get("F");

          if ((0, _primitives.isDict)(urlDict)) {
            url = urlDict.get("F") || null;
          } else if ((0, _util.isString)(urlDict)) {
            url = urlDict;
          }

          let remoteDest = action.get("D");

          if (remoteDest) {
            if ((0, _primitives.isName)(remoteDest)) {
              remoteDest = remoteDest.name;
            }

            if ((0, _util.isString)(url)) {
              const baseUrl = url.split("#")[0];

              if ((0, _util.isString)(remoteDest)) {
                url = baseUrl + "#" + remoteDest;
              } else if (Array.isArray(remoteDest)) {
                url = baseUrl + "#" + JSON.stringify(remoteDest);
              }
            }
          }

          const newWindow = action.get("NewWindow");

          if ((0, _util.isBool)(newWindow)) {
            resultObj.newWindow = newWindow;
          }

          break;

        case "Named":
          const namedAction = action.get("N");

          if ((0, _primitives.isName)(namedAction)) {
            resultObj.action = namedAction.name;
          }

          break;

        case "JavaScript":
          const jsAction = action.get("JS");
          let js;

          if ((0, _primitives.isStream)(jsAction)) {
            js = jsAction.getString();
          } else if ((0, _util.isString)(jsAction)) {
            js = jsAction;
          }

          const jsURL = js && (0, _core_utils.recoverJsURL)((0, _util.stringToPDFString)(js));

          if (jsURL) {
            url = jsURL.url;
            resultObj.newWindow = jsURL.newWindow;
            break;
          }

        default:
          if (actionName === "JavaScript" || actionName === "SubmitForm") {
            break;
          }

          (0, _util.warn)(`parseDestDictionary - unsupported action: "${actionName}".`);
          break;
      }
    } else if (destDict.has("Dest")) {
      dest = destDict.get("Dest");
    }

    if ((0, _util.isString)(url)) {
      const absoluteUrl = (0, _util.createValidAbsoluteUrl)(url, docBaseUrl, {
        addDefaultProtocol: true,
        tryConvertEncoding: true
      });

      if (absoluteUrl) {
        resultObj.url = absoluteUrl.href;
      }

      resultObj.unsafeUrl = url;
    }

    if (dest) {
      if ((0, _primitives.isName)(dest)) {
        dest = dest.name;
      }

      if ((0, _util.isString)(dest) || Array.isArray(dest)) {
        resultObj.dest = dest;
      }
    }
  }

}

exports.Catalog = Catalog;