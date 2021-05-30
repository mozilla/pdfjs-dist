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
exports.PDFDocument = exports.Page = void 0;

var _util = require("../shared/util.js");

var _primitives = require("./primitives.js");

var _core_utils = require("./core_utils.js");

var _stream = require("./stream.js");

var _annotation = require("./annotation.js");

var _base_stream = require("./base_stream.js");

var _crypto = require("./crypto.js");

var _catalog = require("./catalog.js");

var _parser = require("./parser.js");

var _object_loader = require("./object_loader.js");

var _operator_list = require("./operator_list.js");

var _evaluator = require("./evaluator.js");

var _decode_stream = require("./decode_stream.js");

var _struct_tree = require("./struct_tree.js");

var _factory = require("./xfa/factory.js");

var _xref = require("./xref.js");

const DEFAULT_USER_UNIT = 1.0;
const LETTER_SIZE_MEDIABOX = [0, 0, 612, 792];

class Page {
  constructor({
    pdfManager,
    xref,
    pageIndex,
    pageDict,
    ref,
    globalIdFactory,
    fontCache,
    builtInCMapCache,
    globalImageCache,
    nonBlendModesSet,
    xfaFactory
  }) {
    this.pdfManager = pdfManager;
    this.pageIndex = pageIndex;
    this.pageDict = pageDict;
    this.xref = xref;
    this.ref = ref;
    this.fontCache = fontCache;
    this.builtInCMapCache = builtInCMapCache;
    this.globalImageCache = globalImageCache;
    this.nonBlendModesSet = nonBlendModesSet;
    this.evaluatorOptions = pdfManager.evaluatorOptions;
    this.resourcesPromise = null;
    this.xfaFactory = xfaFactory;
    const idCounters = {
      obj: 0
    };
    this._localIdFactory = class extends globalIdFactory {
      static createObjId() {
        return `p${pageIndex}_${++idCounters.obj}`;
      }

      static getPageObjId() {
        return `page${ref.toString()}`;
      }

    };
  }

  _getInheritableProperty(key, getArray = false) {
    const value = (0, _core_utils.getInheritableProperty)({
      dict: this.pageDict,
      key,
      getArray,
      stopWhenFound: false
    });

    if (!Array.isArray(value)) {
      return value;
    }

    if (value.length === 1 || !(0, _primitives.isDict)(value[0])) {
      return value[0];
    }

    return _primitives.Dict.merge({
      xref: this.xref,
      dictArray: value
    });
  }

  get content() {
    return this.pageDict.getArray("Contents");
  }

  get resources() {
    return (0, _util.shadow)(this, "resources", this._getInheritableProperty("Resources") || _primitives.Dict.empty);
  }

  _getBoundingBox(name) {
    if (this.xfaData) {
      const {
        width,
        height
      } = this.xfaData.attributes.style;
      return [0, 0, parseInt(width), parseInt(height)];
    }

    const box = this._getInheritableProperty(name, true);

    if (Array.isArray(box) && box.length === 4) {
      if (box[2] - box[0] !== 0 && box[3] - box[1] !== 0) {
        return box;
      }

      (0, _util.warn)(`Empty /${name} entry.`);
    }

    return null;
  }

  get mediaBox() {
    return (0, _util.shadow)(this, "mediaBox", this._getBoundingBox("MediaBox") || LETTER_SIZE_MEDIABOX);
  }

  get cropBox() {
    return (0, _util.shadow)(this, "cropBox", this._getBoundingBox("CropBox") || this.mediaBox);
  }

  get userUnit() {
    let obj = this.pageDict.get("UserUnit");

    if (!(0, _util.isNum)(obj) || obj <= 0) {
      obj = DEFAULT_USER_UNIT;
    }

    return (0, _util.shadow)(this, "userUnit", obj);
  }

  get view() {
    const {
      cropBox,
      mediaBox
    } = this;
    let view;

    if (cropBox === mediaBox || (0, _util.isArrayEqual)(cropBox, mediaBox)) {
      view = mediaBox;
    } else {
      const box = _util.Util.intersect(cropBox, mediaBox);

      if (box && box[2] - box[0] !== 0 && box[3] - box[1] !== 0) {
        view = box;
      } else {
        (0, _util.warn)("Empty /CropBox and /MediaBox intersection.");
      }
    }

    return (0, _util.shadow)(this, "view", view || mediaBox);
  }

  get rotate() {
    let rotate = this._getInheritableProperty("Rotate") || 0;

    if (rotate % 90 !== 0) {
      rotate = 0;
    } else if (rotate >= 360) {
      rotate = rotate % 360;
    } else if (rotate < 0) {
      rotate = (rotate % 360 + 360) % 360;
    }

    return (0, _util.shadow)(this, "rotate", rotate);
  }

  getContentStream() {
    return this.pdfManager.ensure(this, "content").then(content => {
      if (content instanceof _base_stream.BaseStream) {
        return content;
      }

      if (Array.isArray(content)) {
        return new _decode_stream.StreamsSequenceStream(content);
      }

      return new _stream.NullStream();
    });
  }

  get xfaData() {
    if (this.xfaFactory) {
      return (0, _util.shadow)(this, "xfaData", this.xfaFactory.getPage(this.pageIndex));
    }

    return (0, _util.shadow)(this, "xfaData", null);
  }

  save(handler, task, annotationStorage) {
    const partialEvaluator = new _evaluator.PartialEvaluator({
      xref: this.xref,
      handler,
      pageIndex: this.pageIndex,
      idFactory: this._localIdFactory,
      fontCache: this.fontCache,
      builtInCMapCache: this.builtInCMapCache,
      globalImageCache: this.globalImageCache,
      options: this.evaluatorOptions
    });
    return this._parsedAnnotations.then(function (annotations) {
      const newRefsPromises = [];

      for (const annotation of annotations) {
        if (!annotation.mustBePrinted(annotationStorage)) {
          continue;
        }

        newRefsPromises.push(annotation.save(partialEvaluator, task, annotationStorage).catch(function (reason) {
          (0, _util.warn)("save - ignoring annotation data during " + `"${task.name}" task: "${reason}".`);
          return null;
        }));
      }

      return Promise.all(newRefsPromises);
    });
  }

  loadResources(keys) {
    if (!this.resourcesPromise) {
      this.resourcesPromise = this.pdfManager.ensure(this, "resources");
    }

    return this.resourcesPromise.then(() => {
      const objectLoader = new _object_loader.ObjectLoader(this.resources, keys, this.xref);
      return objectLoader.load();
    });
  }

  getOperatorList({
    handler,
    sink,
    task,
    intent,
    renderInteractiveForms,
    annotationStorage
  }) {
    const contentStreamPromise = this.getContentStream();
    const resourcesPromise = this.loadResources(["ColorSpace", "ExtGState", "Font", "Pattern", "Properties", "Shading", "XObject"]);
    const partialEvaluator = new _evaluator.PartialEvaluator({
      xref: this.xref,
      handler,
      pageIndex: this.pageIndex,
      idFactory: this._localIdFactory,
      fontCache: this.fontCache,
      builtInCMapCache: this.builtInCMapCache,
      globalImageCache: this.globalImageCache,
      options: this.evaluatorOptions
    });
    const dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
    const pageListPromise = dataPromises.then(([contentStream]) => {
      const opList = new _operator_list.OperatorList(intent, sink);
      handler.send("StartRenderPage", {
        transparency: partialEvaluator.hasBlendModes(this.resources, this.nonBlendModesSet),
        pageIndex: this.pageIndex,
        intent
      });
      return partialEvaluator.getOperatorList({
        stream: contentStream,
        task,
        resources: this.resources,
        operatorList: opList
      }).then(function () {
        return opList;
      });
    });
    return Promise.all([pageListPromise, this._parsedAnnotations]).then(function ([pageOpList, annotations]) {
      if (annotations.length === 0) {
        pageOpList.flush(true);
        return {
          length: pageOpList.totalLength
        };
      }

      const opListPromises = [];

      for (const annotation of annotations) {
        if (intent === "display" && annotation.mustBeViewed(annotationStorage) || intent === "print" && annotation.mustBePrinted(annotationStorage)) {
          opListPromises.push(annotation.getOperatorList(partialEvaluator, task, renderInteractiveForms, annotationStorage).catch(function (reason) {
            (0, _util.warn)("getOperatorList - ignoring annotation data during " + `"${task.name}" task: "${reason}".`);
            return null;
          }));
        }
      }

      return Promise.all(opListPromises).then(function (opLists) {
        pageOpList.addOp(_util.OPS.beginAnnotations, []);

        for (const opList of opLists) {
          pageOpList.addOpList(opList);
        }

        pageOpList.addOp(_util.OPS.endAnnotations, []);
        pageOpList.flush(true);
        return {
          length: pageOpList.totalLength
        };
      });
    });
  }

  extractTextContent({
    handler,
    task,
    normalizeWhitespace,
    includeMarkedContent,
    sink,
    combineTextItems
  }) {
    const contentStreamPromise = this.getContentStream();
    const resourcesPromise = this.loadResources(["ExtGState", "Font", "Properties", "XObject"]);
    const dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
    return dataPromises.then(([contentStream]) => {
      const partialEvaluator = new _evaluator.PartialEvaluator({
        xref: this.xref,
        handler,
        pageIndex: this.pageIndex,
        idFactory: this._localIdFactory,
        fontCache: this.fontCache,
        builtInCMapCache: this.builtInCMapCache,
        globalImageCache: this.globalImageCache,
        options: this.evaluatorOptions
      });
      return partialEvaluator.getTextContent({
        stream: contentStream,
        task,
        resources: this.resources,
        normalizeWhitespace,
        includeMarkedContent,
        combineTextItems,
        sink
      });
    });
  }

  async getStructTree() {
    const structTreeRoot = await this.pdfManager.ensureCatalog("structTreeRoot");

    if (!structTreeRoot) {
      return null;
    }

    const structTree = await this.pdfManager.ensure(this, "_parseStructTree", [structTreeRoot]);
    return structTree.serializable;
  }

  _parseStructTree(structTreeRoot) {
    const tree = new _struct_tree.StructTreePage(structTreeRoot, this.pageDict);
    tree.parse();
    return tree;
  }

  getAnnotationsData(intent) {
    return this._parsedAnnotations.then(function (annotations) {
      const annotationsData = [];

      for (let i = 0, ii = annotations.length; i < ii; i++) {
        if (!intent || intent === "display" && annotations[i].viewable || intent === "print" && annotations[i].printable) {
          annotationsData.push(annotations[i].data);
        }
      }

      return annotationsData;
    });
  }

  get annotations() {
    const annots = this._getInheritableProperty("Annots");

    return (0, _util.shadow)(this, "annotations", Array.isArray(annots) ? annots : []);
  }

  get _parsedAnnotations() {
    const parsedAnnotations = this.pdfManager.ensure(this, "annotations").then(() => {
      const annotationPromises = [];

      for (const annotationRef of this.annotations) {
        annotationPromises.push(_annotation.AnnotationFactory.create(this.xref, annotationRef, this.pdfManager, this._localIdFactory, false).catch(function (reason) {
          (0, _util.warn)(`_parsedAnnotations: "${reason}".`);
          return null;
        }));
      }

      return Promise.all(annotationPromises).then(function (annotations) {
        return annotations.filter(annotation => !!annotation);
      });
    });
    return (0, _util.shadow)(this, "_parsedAnnotations", parsedAnnotations);
  }

  get jsActions() {
    const actions = (0, _core_utils.collectActions)(this.xref, this.pageDict, _util.PageActionEventType);
    return (0, _util.shadow)(this, "jsActions", actions);
  }

}

exports.Page = Page;
const PDF_HEADER_SIGNATURE = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d]);
const STARTXREF_SIGNATURE = new Uint8Array([0x73, 0x74, 0x61, 0x72, 0x74, 0x78, 0x72, 0x65, 0x66]);
const ENDOBJ_SIGNATURE = new Uint8Array([0x65, 0x6e, 0x64, 0x6f, 0x62, 0x6a]);
const FINGERPRINT_FIRST_BYTES = 1024;
const EMPTY_FINGERPRINT = "\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00";
const PDF_HEADER_VERSION_REGEXP = /^[1-9]\.[0-9]$/;

function find(stream, signature, limit = 1024, backwards = false) {
  const signatureLength = signature.length;
  const scanBytes = stream.peekBytes(limit);
  const scanLength = scanBytes.length - signatureLength;

  if (scanLength <= 0) {
    return false;
  }

  if (backwards) {
    const signatureEnd = signatureLength - 1;
    let pos = scanBytes.length - 1;

    while (pos >= signatureEnd) {
      let j = 0;

      while (j < signatureLength && scanBytes[pos - j] === signature[signatureEnd - j]) {
        j++;
      }

      if (j >= signatureLength) {
        stream.pos += pos - signatureEnd;
        return true;
      }

      pos--;
    }
  } else {
    let pos = 0;

    while (pos <= scanLength) {
      let j = 0;

      while (j < signatureLength && scanBytes[pos + j] === signature[j]) {
        j++;
      }

      if (j >= signatureLength) {
        stream.pos += pos;
        return true;
      }

      pos++;
    }
  }

  return false;
}

class PDFDocument {
  constructor(pdfManager, arg) {
    let stream;

    if ((0, _primitives.isStream)(arg)) {
      stream = arg;
    } else if ((0, _util.isArrayBuffer)(arg)) {
      stream = new _stream.Stream(arg);
    } else {
      throw new Error("PDFDocument: Unknown argument type");
    }

    if (stream.length <= 0) {
      throw new _util.InvalidPDFException("The PDF file is empty, i.e. its size is zero bytes.");
    }

    this.pdfManager = pdfManager;
    this.stream = stream;
    this.xref = new _xref.XRef(stream, pdfManager);
    this._pagePromises = [];
    this._version = null;
    const idCounters = {
      font: 0
    };
    this._globalIdFactory = class {
      static getDocId() {
        return `g_${pdfManager.docId}`;
      }

      static createFontId() {
        return `f${++idCounters.font}`;
      }

      static createObjId() {
        (0, _util.unreachable)("Abstract method `createObjId` called.");
      }

      static getPageObjId() {
        (0, _util.unreachable)("Abstract method `getPageObjId` called.");
      }

    };
  }

  parse(recoveryMode) {
    this.xref.parse(recoveryMode);
    this.catalog = new _catalog.Catalog(this.pdfManager, this.xref);

    if (this.catalog.version) {
      this._version = this.catalog.version;
    }
  }

  get linearization() {
    let linearization = null;

    try {
      linearization = _parser.Linearization.create(this.stream);
    } catch (err) {
      if (err instanceof _core_utils.MissingDataException) {
        throw err;
      }

      (0, _util.info)(err);
    }

    return (0, _util.shadow)(this, "linearization", linearization);
  }

  get startXRef() {
    const stream = this.stream;
    let startXRef = 0;

    if (this.linearization) {
      stream.reset();

      if (find(stream, ENDOBJ_SIGNATURE)) {
        startXRef = stream.pos + 6 - stream.start;
      }
    } else {
      const step = 1024;
      const startXRefLength = STARTXREF_SIGNATURE.length;
      let found = false,
          pos = stream.end;

      while (!found && pos > 0) {
        pos -= step - startXRefLength;

        if (pos < 0) {
          pos = 0;
        }

        stream.pos = pos;
        found = find(stream, STARTXREF_SIGNATURE, step, true);
      }

      if (found) {
        stream.skip(9);
        let ch;

        do {
          ch = stream.getByte();
        } while ((0, _core_utils.isWhiteSpace)(ch));

        let str = "";

        while (ch >= 0x20 && ch <= 0x39) {
          str += String.fromCharCode(ch);
          ch = stream.getByte();
        }

        startXRef = parseInt(str, 10);

        if (isNaN(startXRef)) {
          startXRef = 0;
        }
      }
    }

    return (0, _util.shadow)(this, "startXRef", startXRef);
  }

  checkHeader() {
    const stream = this.stream;
    stream.reset();

    if (!find(stream, PDF_HEADER_SIGNATURE)) {
      return;
    }

    stream.moveStart();
    const MAX_PDF_VERSION_LENGTH = 12;
    let version = "",
        ch;

    while ((ch = stream.getByte()) > 0x20) {
      if (version.length >= MAX_PDF_VERSION_LENGTH) {
        break;
      }

      version += String.fromCharCode(ch);
    }

    if (!this._version) {
      this._version = version.substring(5);
    }
  }

  parseStartXRef() {
    this.xref.setStartXRef(this.startXRef);
  }

  get numPages() {
    if (this.xfaFactory) {
      return (0, _util.shadow)(this, "numPages", this.xfaFactory.numberPages);
    }

    const linearization = this.linearization;
    const num = linearization ? linearization.numPages : this.catalog.numPages;
    return (0, _util.shadow)(this, "numPages", num);
  }

  _hasOnlyDocumentSignatures(fields, recursionDepth = 0) {
    const RECURSION_LIMIT = 10;

    if (!Array.isArray(fields)) {
      return false;
    }

    return fields.every(field => {
      field = this.xref.fetchIfRef(field);

      if (!(field instanceof _primitives.Dict)) {
        return false;
      }

      if (field.has("Kids")) {
        if (++recursionDepth > RECURSION_LIMIT) {
          (0, _util.warn)("_hasOnlyDocumentSignatures: maximum recursion depth reached");
          return false;
        }

        return this._hasOnlyDocumentSignatures(field.get("Kids"), recursionDepth);
      }

      const isSignature = (0, _primitives.isName)(field.get("FT"), "Sig");
      const rectangle = field.get("Rect");
      const isInvisible = Array.isArray(rectangle) && rectangle.every(value => value === 0);
      return isSignature && isInvisible;
    });
  }

  get xfaData() {
    const acroForm = this.catalog.acroForm;

    if (!acroForm) {
      return null;
    }

    const xfa = acroForm.get("XFA");
    const entries = {
      "xdp:xdp": "",
      template: "",
      datasets: "",
      config: "",
      connectionSet: "",
      localeSet: "",
      stylesheet: "",
      "/xdp:xdp": ""
    };

    if ((0, _primitives.isStream)(xfa) && !xfa.isEmpty) {
      try {
        entries["xdp:xdp"] = (0, _util.stringToUTF8String)(xfa.getString());
        return entries;
      } catch (_) {
        (0, _util.warn)("XFA - Invalid utf-8 string.");
        return null;
      }
    }

    if (!Array.isArray(xfa) || xfa.length === 0) {
      return null;
    }

    for (let i = 0, ii = xfa.length; i < ii; i += 2) {
      let name;

      if (i === 0) {
        name = "xdp:xdp";
      } else if (i === ii - 2) {
        name = "/xdp:xdp";
      } else {
        name = xfa[i];
      }

      if (!entries.hasOwnProperty(name)) {
        continue;
      }

      const data = this.xref.fetchIfRef(xfa[i + 1]);

      if (!(0, _primitives.isStream)(data) || data.isEmpty) {
        continue;
      }

      try {
        entries[name] = (0, _util.stringToUTF8String)(data.getString());
      } catch (_) {
        (0, _util.warn)("XFA - Invalid utf-8 string.");
        return null;
      }
    }

    return entries;
  }

  get xfaFactory() {
    if (this.pdfManager.enableXfa && this.formInfo.hasXfa && !this.formInfo.hasAcroForm) {
      const data = this.xfaData;
      return (0, _util.shadow)(this, "xfaFactory", data ? new _factory.XFAFactory(data) : null);
    }

    return (0, _util.shadow)(this, "xfaFaxtory", null);
  }

  get isPureXfa() {
    return this.xfaFactory !== null;
  }

  async loadXfaFonts(handler, task) {
    const acroForm = await this.pdfManager.ensureCatalog("acroForm");

    if (!acroForm) {
      return;
    }

    const resources = await acroForm.getAsync("DR");

    if (!(resources instanceof _primitives.Dict)) {
      return;
    }

    const objectLoader = new _object_loader.ObjectLoader(resources, ["Font"], this.xref);
    await objectLoader.load();
    const fontRes = resources.get("Font");

    if (!(fontRes instanceof _primitives.Dict)) {
      return;
    }

    const partialEvaluator = new _evaluator.PartialEvaluator({
      xref: this.xref,
      handler,
      pageIndex: -1,
      idFactory: this._globalIdFactory,
      fontCache: this.catalog.fontCache,
      builtInCMapCache: this.catalog.builtInCMapCache
    });
    const operatorList = new _operator_list.OperatorList();
    const initialState = {
      font: null,

      clone() {
        return this;
      }

    };
    const fonts = new Map();
    fontRes.forEach((fontName, font) => {
      fonts.set(fontName, font);
    });
    const promises = [];

    for (const [fontName, font] of fonts) {
      const descriptor = font.get("FontDescriptor");

      if (!(descriptor instanceof _primitives.Dict)) {
        continue;
      }

      const fontFamily = descriptor.get("FontFamily");
      const fontWeight = descriptor.get("FontWeight");
      const italicAngle = -descriptor.get("ItalicAngle");
      const cssFontInfo = {
        fontFamily,
        fontWeight,
        italicAngle
      };

      if (!(0, _core_utils.validateCSSFont)(cssFontInfo)) {
        continue;
      }

      promises.push(partialEvaluator.handleSetFont(resources, [_primitives.Name.get(fontName), 1], null, operatorList, task, initialState, null, cssFontInfo).catch(function (reason) {
        (0, _util.warn)(`loadXfaFonts: "${reason}".`);
        return null;
      }));
    }

    await Promise.all(promises);
  }

  get formInfo() {
    const formInfo = {
      hasFields: false,
      hasAcroForm: false,
      hasXfa: false,
      hasSignatures: false
    };
    const acroForm = this.catalog.acroForm;

    if (!acroForm) {
      return (0, _util.shadow)(this, "formInfo", formInfo);
    }

    try {
      const fields = acroForm.get("Fields");
      const hasFields = Array.isArray(fields) && fields.length > 0;
      formInfo.hasFields = hasFields;
      const xfa = acroForm.get("XFA");
      formInfo.hasXfa = Array.isArray(xfa) && xfa.length > 0 || (0, _primitives.isStream)(xfa) && !xfa.isEmpty;
      const sigFlags = acroForm.get("SigFlags");
      const hasSignatures = !!(sigFlags & 0x1);

      const hasOnlyDocumentSignatures = hasSignatures && this._hasOnlyDocumentSignatures(fields);

      formInfo.hasAcroForm = hasFields && !hasOnlyDocumentSignatures;
      formInfo.hasSignatures = hasSignatures;
    } catch (ex) {
      if (ex instanceof _core_utils.MissingDataException) {
        throw ex;
      }

      (0, _util.warn)(`Cannot fetch form information: "${ex}".`);
    }

    return (0, _util.shadow)(this, "formInfo", formInfo);
  }

  get documentInfo() {
    const DocumentInfoValidators = {
      Title: _util.isString,
      Author: _util.isString,
      Subject: _util.isString,
      Keywords: _util.isString,
      Creator: _util.isString,
      Producer: _util.isString,
      CreationDate: _util.isString,
      ModDate: _util.isString,
      Trapped: _primitives.isName
    };
    let version = this._version;

    if (typeof version !== "string" || !PDF_HEADER_VERSION_REGEXP.test(version)) {
      (0, _util.warn)(`Invalid PDF header version number: ${version}`);
      version = null;
    }

    const docInfo = {
      PDFFormatVersion: version,
      IsLinearized: !!this.linearization,
      IsAcroFormPresent: this.formInfo.hasAcroForm,
      IsXFAPresent: this.formInfo.hasXfa,
      IsCollectionPresent: !!this.catalog.collection,
      IsSignaturesPresent: this.formInfo.hasSignatures
    };
    let infoDict;

    try {
      infoDict = this.xref.trailer.get("Info");
    } catch (err) {
      if (err instanceof _core_utils.MissingDataException) {
        throw err;
      }

      (0, _util.info)("The document information dictionary is invalid.");
    }

    if ((0, _primitives.isDict)(infoDict)) {
      for (const key of infoDict.getKeys()) {
        const value = infoDict.get(key);

        if (DocumentInfoValidators[key]) {
          if (DocumentInfoValidators[key](value)) {
            docInfo[key] = typeof value !== "string" ? value : (0, _util.stringToPDFString)(value);
          } else {
            (0, _util.info)(`Bad value in document info for "${key}".`);
          }
        } else if (typeof key === "string") {
          let customValue;

          if ((0, _util.isString)(value)) {
            customValue = (0, _util.stringToPDFString)(value);
          } else if ((0, _primitives.isName)(value) || (0, _util.isNum)(value) || (0, _util.isBool)(value)) {
            customValue = value;
          } else {
            (0, _util.info)(`Unsupported value in document info for (custom) "${key}".`);
            continue;
          }

          if (!docInfo.Custom) {
            docInfo.Custom = Object.create(null);
          }

          docInfo.Custom[key] = customValue;
        }
      }
    }

    return (0, _util.shadow)(this, "documentInfo", docInfo);
  }

  get fingerprint() {
    let hash;
    const idArray = this.xref.trailer.get("ID");

    if (Array.isArray(idArray) && idArray[0] && (0, _util.isString)(idArray[0]) && idArray[0] !== EMPTY_FINGERPRINT) {
      hash = (0, _util.stringToBytes)(idArray[0]);
    } else {
      hash = (0, _crypto.calculateMD5)(this.stream.getByteRange(0, FINGERPRINT_FIRST_BYTES), 0, FINGERPRINT_FIRST_BYTES);
    }

    const fingerprintBuf = [];

    for (let i = 0, ii = hash.length; i < ii; i++) {
      const hex = hash[i].toString(16);
      fingerprintBuf.push(hex.padStart(2, "0"));
    }

    return (0, _util.shadow)(this, "fingerprint", fingerprintBuf.join(""));
  }

  _getLinearizationPage(pageIndex) {
    const {
      catalog,
      linearization
    } = this;

    const ref = _primitives.Ref.get(linearization.objectNumberFirst, 0);

    return this.xref.fetchAsync(ref).then(obj => {
      if ((0, _primitives.isDict)(obj, "Page") || (0, _primitives.isDict)(obj) && !obj.has("Type") && obj.has("Contents")) {
        if (ref && !catalog.pageKidsCountCache.has(ref)) {
          catalog.pageKidsCountCache.put(ref, 1);
        }

        return [obj, ref];
      }

      throw new _util.FormatError("The Linearization dictionary doesn't point " + "to a valid Page dictionary.");
    }).catch(reason => {
      (0, _util.info)(reason);
      return catalog.getPageDict(pageIndex);
    });
  }

  getPage(pageIndex) {
    if (this._pagePromises[pageIndex] !== undefined) {
      return this._pagePromises[pageIndex];
    }

    const {
      catalog,
      linearization
    } = this;

    if (this.xfaFactory) {
      return Promise.resolve(new Page({
        pdfManager: this.pdfManager,
        xref: this.xref,
        pageIndex,
        pageDict: _primitives.Dict.empty,
        ref: null,
        globalIdFactory: this._globalIdFactory,
        fontCache: catalog.fontCache,
        builtInCMapCache: catalog.builtInCMapCache,
        globalImageCache: catalog.globalImageCache,
        nonBlendModesSet: catalog.nonBlendModesSet,
        xfaFactory: this.xfaFactory
      }));
    }

    const promise = linearization && linearization.pageFirst === pageIndex ? this._getLinearizationPage(pageIndex) : catalog.getPageDict(pageIndex);
    return this._pagePromises[pageIndex] = promise.then(([pageDict, ref]) => {
      return new Page({
        pdfManager: this.pdfManager,
        xref: this.xref,
        pageIndex,
        pageDict,
        ref,
        globalIdFactory: this._globalIdFactory,
        fontCache: catalog.fontCache,
        builtInCMapCache: catalog.builtInCMapCache,
        globalImageCache: catalog.globalImageCache,
        nonBlendModesSet: catalog.nonBlendModesSet,
        xfaFactory: null
      });
    });
  }

  checkFirstPage() {
    return this.getPage(0).catch(async reason => {
      if (reason instanceof _core_utils.XRefEntryException) {
        this._pagePromises.length = 0;
        await this.cleanup();
        throw new _core_utils.XRefParseException();
      }
    });
  }

  fontFallback(id, handler) {
    return this.catalog.fontFallback(id, handler);
  }

  async cleanup(manuallyTriggered = false) {
    return this.catalog ? this.catalog.cleanup(manuallyTriggered) : (0, _primitives.clearPrimitiveCaches)();
  }

  _collectFieldObjects(name, fieldRef, promises) {
    const field = this.xref.fetchIfRef(fieldRef);

    if (field.has("T")) {
      const partName = (0, _util.stringToPDFString)(field.get("T"));

      if (name === "") {
        name = partName;
      } else {
        name = `${name}.${partName}`;
      }
    }

    if (!promises.has(name)) {
      promises.set(name, []);
    }

    promises.get(name).push(_annotation.AnnotationFactory.create(this.xref, fieldRef, this.pdfManager, this._localIdFactory, true).then(annotation => annotation && annotation.getFieldObject()).catch(function (reason) {
      (0, _util.warn)(`_collectFieldObjects: "${reason}".`);
      return null;
    }));

    if (field.has("Kids")) {
      const kids = field.get("Kids");

      for (const kid of kids) {
        this._collectFieldObjects(name, kid, promises);
      }
    }
  }

  get fieldObjects() {
    if (!this.formInfo.hasFields) {
      return (0, _util.shadow)(this, "fieldObjects", Promise.resolve(null));
    }

    const allFields = Object.create(null);
    const fieldPromises = new Map();

    for (const fieldRef of this.catalog.acroForm.get("Fields")) {
      this._collectFieldObjects("", fieldRef, fieldPromises);
    }

    const allPromises = [];

    for (const [name, promises] of fieldPromises) {
      allPromises.push(Promise.all(promises).then(fields => {
        fields = fields.filter(field => !!field);

        if (fields.length > 0) {
          allFields[name] = fields;
        }
      }));
    }

    return (0, _util.shadow)(this, "fieldObjects", Promise.all(allPromises).then(() => allFields));
  }

  get hasJSActions() {
    const promise = this.pdfManager.ensureDoc("_parseHasJSActions");
    return (0, _util.shadow)(this, "hasJSActions", promise);
  }

  async _parseHasJSActions() {
    const [catalogJsActions, fieldObjects] = await Promise.all([this.pdfManager.ensureCatalog("jsActions"), this.pdfManager.ensureDoc("fieldObjects")]);

    if (catalogJsActions) {
      return true;
    }

    if (fieldObjects) {
      return Object.values(fieldObjects).some(fieldObject => fieldObject.some(object => object.actions !== null));
    }

    return false;
  }

  get calculationOrderIds() {
    const acroForm = this.catalog.acroForm;

    if (!acroForm || !acroForm.has("CO")) {
      return (0, _util.shadow)(this, "calculationOrderIds", null);
    }

    const calculationOrder = acroForm.get("CO");

    if (!Array.isArray(calculationOrder) || calculationOrder.length === 0) {
      return (0, _util.shadow)(this, "calculationOrderIds", null);
    }

    const ids = calculationOrder.filter(_primitives.isRef).map(ref => ref.toString());

    if (ids.length === 0) {
      return (0, _util.shadow)(this, "calculationOrderIds", null);
    }

    return (0, _util.shadow)(this, "calculationOrderIds", ids);
  }

}

exports.PDFDocument = PDFDocument;