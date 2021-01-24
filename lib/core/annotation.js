/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2020 Mozilla Foundation
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
exports.getQuadPoints = getQuadPoints;
exports.MarkupAnnotation = exports.AnnotationFactory = exports.AnnotationBorderStyle = exports.Annotation = void 0;

var _util = require("../shared/util.js");

var _obj = require("./obj.js");

var _core_utils = require("./core_utils.js");

var _default_appearance = require("./default_appearance.js");

var _primitives = require("./primitives.js");

var _colorspace = require("./colorspace.js");

var _operator_list = require("./operator_list.js");

var _stream = require("./stream.js");

var _writer = require("./writer.js");

class AnnotationFactory {
  static create(xref, ref, pdfManager, idFactory) {
    return pdfManager.ensureCatalog("acroForm").then(acroForm => {
      return pdfManager.ensure(this, "_create", [xref, ref, pdfManager, idFactory, acroForm]);
    });
  }

  static _create(xref, ref, pdfManager, idFactory, acroForm) {
    const dict = xref.fetchIfRef(ref);

    if (!(0, _primitives.isDict)(dict)) {
      return undefined;
    }

    const id = (0, _primitives.isRef)(ref) ? ref.toString() : `annot_${idFactory.createObjId()}`;
    let subtype = dict.get("Subtype");
    subtype = (0, _primitives.isName)(subtype) ? subtype.name : null;
    const parameters = {
      xref,
      ref,
      dict,
      subtype,
      id,
      pdfManager,
      acroForm: acroForm instanceof _primitives.Dict ? acroForm : _primitives.Dict.empty
    };

    switch (subtype) {
      case "Link":
        return new LinkAnnotation(parameters);

      case "Text":
        return new TextAnnotation(parameters);

      case "Widget":
        let fieldType = (0, _core_utils.getInheritableProperty)({
          dict,
          key: "FT"
        });
        fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;

        switch (fieldType) {
          case "Tx":
            return new TextWidgetAnnotation(parameters);

          case "Btn":
            return new ButtonWidgetAnnotation(parameters);

          case "Ch":
            return new ChoiceWidgetAnnotation(parameters);
        }

        (0, _util.warn)('Unimplemented widget field type "' + fieldType + '", ' + "falling back to base field type.");
        return new WidgetAnnotation(parameters);

      case "Popup":
        return new PopupAnnotation(parameters);

      case "FreeText":
        return new FreeTextAnnotation(parameters);

      case "Line":
        return new LineAnnotation(parameters);

      case "Square":
        return new SquareAnnotation(parameters);

      case "Circle":
        return new CircleAnnotation(parameters);

      case "PolyLine":
        return new PolylineAnnotation(parameters);

      case "Polygon":
        return new PolygonAnnotation(parameters);

      case "Caret":
        return new CaretAnnotation(parameters);

      case "Ink":
        return new InkAnnotation(parameters);

      case "Highlight":
        return new HighlightAnnotation(parameters);

      case "Underline":
        return new UnderlineAnnotation(parameters);

      case "Squiggly":
        return new SquigglyAnnotation(parameters);

      case "StrikeOut":
        return new StrikeOutAnnotation(parameters);

      case "Stamp":
        return new StampAnnotation(parameters);

      case "FileAttachment":
        return new FileAttachmentAnnotation(parameters);

      default:
        if (!subtype) {
          (0, _util.warn)("Annotation is missing the required /Subtype.");
        } else {
          (0, _util.warn)('Unimplemented annotation type "' + subtype + '", ' + "falling back to base annotation.");
        }

        return new Annotation(parameters);
    }
  }

}

exports.AnnotationFactory = AnnotationFactory;

function getQuadPoints(dict, rect) {
  if (!dict.has("QuadPoints")) {
    return null;
  }

  const quadPoints = dict.getArray("QuadPoints");

  if (!Array.isArray(quadPoints) || quadPoints.length === 0 || quadPoints.length % 8 > 0) {
    return null;
  }

  const quadPointsLists = [];

  for (let i = 0, ii = quadPoints.length / 8; i < ii; i++) {
    quadPointsLists.push([]);

    for (let j = i * 8, jj = i * 8 + 8; j < jj; j += 2) {
      const x = quadPoints[j];
      const y = quadPoints[j + 1];

      if (rect !== null && (x < rect[0] || x > rect[2] || y < rect[1] || y > rect[3])) {
        return null;
      }

      quadPointsLists[i].push({
        x,
        y
      });
    }
  }

  return quadPointsLists.map(quadPointsList => {
    const [minX, maxX, minY, maxY] = quadPointsList.reduce(([mX, MX, mY, MY], quadPoint) => [Math.min(mX, quadPoint.x), Math.max(MX, quadPoint.x), Math.min(mY, quadPoint.y), Math.max(MY, quadPoint.y)], [Number.MAX_VALUE, Number.MIN_VALUE, Number.MAX_VALUE, Number.MIN_VALUE]);
    return [{
      x: minX,
      y: maxY
    }, {
      x: maxX,
      y: maxY
    }, {
      x: minX,
      y: minY
    }, {
      x: maxX,
      y: minY
    }];
  });
}

function getTransformMatrix(rect, bbox, matrix) {
  const [minX, minY, maxX, maxY] = _util.Util.getAxialAlignedBoundingBox(bbox, matrix);

  if (minX === maxX || minY === maxY) {
    return [1, 0, 0, 1, rect[0], rect[1]];
  }

  const xRatio = (rect[2] - rect[0]) / (maxX - minX);
  const yRatio = (rect[3] - rect[1]) / (maxY - minY);
  return [xRatio, 0, 0, yRatio, rect[0] - minX * xRatio, rect[1] - minY * yRatio];
}

class Annotation {
  constructor(params) {
    const dict = params.dict;
    this.setContents(dict.get("Contents"));
    this.setModificationDate(dict.get("M"));
    this.setFlags(dict.get("F"));
    this.setRectangle(dict.getArray("Rect"));
    this.setColor(dict.getArray("C"));
    this.setBorderStyle(dict);
    this.setAppearance(dict);
    this._streams = [];

    if (this.appearance) {
      this._streams.push(this.appearance);
    }

    this.data = {
      annotationFlags: this.flags,
      borderStyle: this.borderStyle,
      color: this.color,
      contents: this.contents,
      hasAppearance: !!this.appearance,
      id: params.id,
      modificationDate: this.modificationDate,
      rect: this.rectangle,
      subtype: params.subtype
    };
    this._fallbackFontDict = null;
  }

  _hasFlag(flags, flag) {
    return !!(flags & flag);
  }

  _isViewable(flags) {
    return !this._hasFlag(flags, _util.AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, _util.AnnotationFlag.NOVIEW);
  }

  _isPrintable(flags) {
    return this._hasFlag(flags, _util.AnnotationFlag.PRINT) && !this._hasFlag(flags, _util.AnnotationFlag.INVISIBLE);
  }

  isHidden(annotationStorage) {
    const data = annotationStorage && annotationStorage[this.data.id];

    if (data && "hidden" in data) {
      return data.hidden;
    }

    return this._hasFlag(this.flags, _util.AnnotationFlag.HIDDEN);
  }

  get viewable() {
    if (this.data.quadPoints === null) {
      return false;
    }

    if (this.flags === 0) {
      return true;
    }

    return this._isViewable(this.flags);
  }

  get printable() {
    if (this.data.quadPoints === null) {
      return false;
    }

    if (this.flags === 0) {
      return false;
    }

    return this._isPrintable(this.flags);
  }

  setContents(contents) {
    this.contents = (0, _util.stringToPDFString)(contents || "");
  }

  setModificationDate(modificationDate) {
    this.modificationDate = (0, _util.isString)(modificationDate) ? modificationDate : null;
  }

  setFlags(flags) {
    this.flags = Number.isInteger(flags) && flags > 0 ? flags : 0;
  }

  hasFlag(flag) {
    return this._hasFlag(this.flags, flag);
  }

  setRectangle(rectangle) {
    if (Array.isArray(rectangle) && rectangle.length === 4) {
      this.rectangle = _util.Util.normalizeRect(rectangle);
    } else {
      this.rectangle = [0, 0, 0, 0];
    }
  }

  setColor(color) {
    const rgbColor = new Uint8ClampedArray(3);

    if (!Array.isArray(color)) {
      this.color = rgbColor;
      return;
    }

    switch (color.length) {
      case 0:
        this.color = null;
        break;

      case 1:
        _colorspace.ColorSpace.singletons.gray.getRgbItem(color, 0, rgbColor, 0);

        this.color = rgbColor;
        break;

      case 3:
        _colorspace.ColorSpace.singletons.rgb.getRgbItem(color, 0, rgbColor, 0);

        this.color = rgbColor;
        break;

      case 4:
        _colorspace.ColorSpace.singletons.cmyk.getRgbItem(color, 0, rgbColor, 0);

        this.color = rgbColor;
        break;

      default:
        this.color = rgbColor;
        break;
    }
  }

  setBorderStyle(borderStyle) {
    this.borderStyle = new AnnotationBorderStyle();

    if (!(0, _primitives.isDict)(borderStyle)) {
      return;
    }

    if (borderStyle.has("BS")) {
      const dict = borderStyle.get("BS");
      const dictType = dict.get("Type");

      if (!dictType || (0, _primitives.isName)(dictType, "Border")) {
        this.borderStyle.setWidth(dict.get("W"), this.rectangle);
        this.borderStyle.setStyle(dict.get("S"));
        this.borderStyle.setDashArray(dict.getArray("D"));
      }
    } else if (borderStyle.has("Border")) {
      const array = borderStyle.getArray("Border");

      if (Array.isArray(array) && array.length >= 3) {
        this.borderStyle.setHorizontalCornerRadius(array[0]);
        this.borderStyle.setVerticalCornerRadius(array[1]);
        this.borderStyle.setWidth(array[2], this.rectangle);

        if (array.length === 4) {
          this.borderStyle.setDashArray(array[3]);
        }
      }
    } else {
      this.borderStyle.setWidth(0);
    }
  }

  setAppearance(dict) {
    this.appearance = null;
    const appearanceStates = dict.get("AP");

    if (!(0, _primitives.isDict)(appearanceStates)) {
      return;
    }

    const normalAppearanceState = appearanceStates.get("N");

    if ((0, _primitives.isStream)(normalAppearanceState)) {
      this.appearance = normalAppearanceState;
      return;
    }

    if (!(0, _primitives.isDict)(normalAppearanceState)) {
      return;
    }

    const as = dict.get("AS");

    if (!(0, _primitives.isName)(as) || !normalAppearanceState.has(as.name)) {
      return;
    }

    this.appearance = normalAppearanceState.get(as.name);
  }

  loadResources(keys) {
    return this.appearance.dict.getAsync("Resources").then(resources => {
      if (!resources) {
        return undefined;
      }

      const objectLoader = new _obj.ObjectLoader(resources, keys, resources.xref);
      return objectLoader.load().then(function () {
        return resources;
      });
    });
  }

  getOperatorList(evaluator, task, renderForms, annotationStorage) {
    if (!this.appearance) {
      return Promise.resolve(new _operator_list.OperatorList());
    }

    const appearance = this.appearance;
    const data = this.data;
    const appearanceDict = appearance.dict;
    const resourcesPromise = this.loadResources(["ExtGState", "ColorSpace", "Pattern", "Shading", "XObject", "Font"]);
    const bbox = appearanceDict.getArray("BBox") || [0, 0, 1, 1];
    const matrix = appearanceDict.getArray("Matrix") || [1, 0, 0, 1, 0, 0];
    const transform = getTransformMatrix(data.rect, bbox, matrix);
    return resourcesPromise.then(resources => {
      const opList = new _operator_list.OperatorList();
      opList.addOp(_util.OPS.beginAnnotation, [data.rect, transform, matrix]);
      return evaluator.getOperatorList({
        stream: appearance,
        task,
        resources,
        operatorList: opList,
        fallbackFontDict: this._fallbackFontDict
      }).then(() => {
        opList.addOp(_util.OPS.endAnnotation, []);
        this.reset();
        return opList;
      });
    });
  }

  async save(evaluator, task, annotationStorage) {
    return null;
  }

  getFieldObject() {
    return null;
  }

  reset() {
    for (const stream of this._streams) {
      stream.reset();
    }
  }

}

exports.Annotation = Annotation;

class AnnotationBorderStyle {
  constructor() {
    this.width = 1;
    this.style = _util.AnnotationBorderStyleType.SOLID;
    this.dashArray = [3];
    this.horizontalCornerRadius = 0;
    this.verticalCornerRadius = 0;
  }

  setWidth(width, rect = [0, 0, 0, 0]) {
    if ((0, _primitives.isName)(width)) {
      this.width = 0;
      return;
    }

    if (Number.isInteger(width)) {
      if (width > 0) {
        const maxWidth = (rect[2] - rect[0]) / 2;
        const maxHeight = (rect[3] - rect[1]) / 2;

        if (maxWidth > 0 && maxHeight > 0 && (width > maxWidth || width > maxHeight)) {
          (0, _util.warn)(`AnnotationBorderStyle.setWidth - ignoring width: ${width}`);
          width = 1;
        }
      }

      this.width = width;
    }
  }

  setStyle(style) {
    if (!(0, _primitives.isName)(style)) {
      return;
    }

    switch (style.name) {
      case "S":
        this.style = _util.AnnotationBorderStyleType.SOLID;
        break;

      case "D":
        this.style = _util.AnnotationBorderStyleType.DASHED;
        break;

      case "B":
        this.style = _util.AnnotationBorderStyleType.BEVELED;
        break;

      case "I":
        this.style = _util.AnnotationBorderStyleType.INSET;
        break;

      case "U":
        this.style = _util.AnnotationBorderStyleType.UNDERLINE;
        break;

      default:
        break;
    }
  }

  setDashArray(dashArray) {
    if (Array.isArray(dashArray) && dashArray.length > 0) {
      let isValid = true;
      let allZeros = true;

      for (const element of dashArray) {
        const validNumber = +element >= 0;

        if (!validNumber) {
          isValid = false;
          break;
        } else if (element > 0) {
          allZeros = false;
        }
      }

      if (isValid && !allZeros) {
        this.dashArray = dashArray;
      } else {
        this.width = 0;
      }
    } else if (dashArray) {
      this.width = 0;
    }
  }

  setHorizontalCornerRadius(radius) {
    if (Number.isInteger(radius)) {
      this.horizontalCornerRadius = radius;
    }
  }

  setVerticalCornerRadius(radius) {
    if (Number.isInteger(radius)) {
      this.verticalCornerRadius = radius;
    }
  }

}

exports.AnnotationBorderStyle = AnnotationBorderStyle;

class MarkupAnnotation extends Annotation {
  constructor(parameters) {
    super(parameters);
    const dict = parameters.dict;

    if (dict.has("IRT")) {
      const rawIRT = dict.getRaw("IRT");
      this.data.inReplyTo = (0, _primitives.isRef)(rawIRT) ? rawIRT.toString() : null;
      const rt = dict.get("RT");
      this.data.replyType = (0, _primitives.isName)(rt) ? rt.name : _util.AnnotationReplyType.REPLY;
    }

    if (this.data.replyType === _util.AnnotationReplyType.GROUP) {
      const parent = dict.get("IRT");
      this.data.title = (0, _util.stringToPDFString)(parent.get("T") || "");
      this.setContents(parent.get("Contents"));
      this.data.contents = this.contents;

      if (!parent.has("CreationDate")) {
        this.data.creationDate = null;
      } else {
        this.setCreationDate(parent.get("CreationDate"));
        this.data.creationDate = this.creationDate;
      }

      if (!parent.has("M")) {
        this.data.modificationDate = null;
      } else {
        this.setModificationDate(parent.get("M"));
        this.data.modificationDate = this.modificationDate;
      }

      this.data.hasPopup = parent.has("Popup");

      if (!parent.has("C")) {
        this.data.color = null;
      } else {
        this.setColor(parent.getArray("C"));
        this.data.color = this.color;
      }
    } else {
      this.data.title = (0, _util.stringToPDFString)(dict.get("T") || "");
      this.setCreationDate(dict.get("CreationDate"));
      this.data.creationDate = this.creationDate;
      this.data.hasPopup = dict.has("Popup");

      if (!dict.has("C")) {
        this.data.color = null;
      }
    }
  }

  setCreationDate(creationDate) {
    this.creationDate = (0, _util.isString)(creationDate) ? creationDate : null;
  }

  _setDefaultAppearance({
    xref,
    extra,
    strokeColor,
    fillColor,
    blendMode,
    pointsCallback
  }) {
    let minX = Number.MAX_VALUE;
    let minY = Number.MAX_VALUE;
    let maxX = Number.MIN_VALUE;
    let maxY = Number.MIN_VALUE;
    const buffer = ["q"];

    if (extra) {
      buffer.push(extra);
    }

    if (strokeColor) {
      buffer.push(`${strokeColor[0]} ${strokeColor[1]} ${strokeColor[2]} RG`);
    }

    if (fillColor) {
      buffer.push(`${fillColor[0]} ${fillColor[1]} ${fillColor[2]} rg`);
    }

    for (const points of this.data.quadPoints) {
      const [mX, MX, mY, MY] = pointsCallback(buffer, points);
      minX = Math.min(minX, mX);
      maxX = Math.max(maxX, MX);
      minY = Math.min(minY, mY);
      maxY = Math.max(maxY, MY);
    }

    buffer.push("Q");
    const formDict = new _primitives.Dict(xref);
    const appearanceStreamDict = new _primitives.Dict(xref);
    appearanceStreamDict.set("Subtype", _primitives.Name.get("Form"));
    const appearanceStream = new _stream.StringStream(buffer.join(" "));
    appearanceStream.dict = appearanceStreamDict;
    formDict.set("Fm0", appearanceStream);
    const gsDict = new _primitives.Dict(xref);

    if (blendMode) {
      gsDict.set("BM", _primitives.Name.get(blendMode));
    }

    const stateDict = new _primitives.Dict(xref);
    stateDict.set("GS0", gsDict);
    const resources = new _primitives.Dict(xref);
    resources.set("ExtGState", stateDict);
    resources.set("XObject", formDict);
    const appearanceDict = new _primitives.Dict(xref);
    appearanceDict.set("Resources", resources);
    const bbox = this.data.rect = [minX, minY, maxX, maxY];
    appearanceDict.set("BBox", bbox);
    this.appearance = new _stream.StringStream("/GS0 gs /Fm0 Do");
    this.appearance.dict = appearanceDict;

    this._streams.push(this.appearance, appearanceStream);
  }

}

exports.MarkupAnnotation = MarkupAnnotation;

class WidgetAnnotation extends Annotation {
  constructor(params) {
    super(params);
    const dict = params.dict;
    const data = this.data;
    this.ref = params.ref;
    data.annotationType = _util.AnnotationType.WIDGET;
    data.fieldName = this._constructFieldName(dict);
    data.actions = (0, _core_utils.collectActions)(params.xref, dict, _util.AnnotationActionEventType);
    const fieldValue = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "V",
      getArray: true
    });
    data.fieldValue = this._decodeFormValue(fieldValue);
    const defaultFieldValue = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "DV",
      getArray: true
    });
    data.defaultFieldValue = this._decodeFormValue(defaultFieldValue);
    data.alternativeText = (0, _util.stringToPDFString)(dict.get("TU") || "");
    const defaultAppearance = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "DA"
    }) || params.acroForm.get("DA") || "";
    data.defaultAppearance = (0, _util.isString)(defaultAppearance) ? defaultAppearance : "";
    data.defaultAppearanceData = (0, _default_appearance.parseDefaultAppearance)(data.defaultAppearance);
    const fieldType = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "FT"
    });
    data.fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;
    const localResources = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "DR"
    });
    const acroFormResources = params.acroForm.get("DR");
    const appearanceResources = this.appearance && this.appearance.dict.get("Resources");
    this._fieldResources = {
      localResources,
      acroFormResources,
      appearanceResources,
      mergedResources: _primitives.Dict.merge({
        xref: params.xref,
        dictArray: [localResources, appearanceResources, acroFormResources],
        mergeSubDicts: true
      })
    };
    data.fieldFlags = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "Ff"
    });

    if (!Number.isInteger(data.fieldFlags) || data.fieldFlags < 0) {
      data.fieldFlags = 0;
    }

    data.readOnly = this.hasFieldFlag(_util.AnnotationFieldFlag.READONLY);
    data.hidden = this._hasFlag(data.annotationFlags, _util.AnnotationFlag.HIDDEN);

    if (data.fieldType === "Sig") {
      data.fieldValue = null;
      this.setFlags(_util.AnnotationFlag.HIDDEN);
      data.hidden = true;
    }
  }

  _constructFieldName(dict) {
    if (!dict.has("T") && !dict.has("Parent")) {
      (0, _util.warn)("Unknown field name, falling back to empty field name.");
      return "";
    }

    if (!dict.has("Parent")) {
      return (0, _util.stringToPDFString)(dict.get("T"));
    }

    const fieldName = [];

    if (dict.has("T")) {
      fieldName.unshift((0, _util.stringToPDFString)(dict.get("T")));
    }

    let loopDict = dict;

    while (loopDict.has("Parent")) {
      loopDict = loopDict.get("Parent");

      if (!(0, _primitives.isDict)(loopDict)) {
        break;
      }

      if (loopDict.has("T")) {
        fieldName.unshift((0, _util.stringToPDFString)(loopDict.get("T")));
      }
    }

    return fieldName.join(".");
  }

  _decodeFormValue(formValue) {
    if (Array.isArray(formValue)) {
      return formValue.filter(item => (0, _util.isString)(item)).map(item => (0, _util.stringToPDFString)(item));
    } else if ((0, _primitives.isName)(formValue)) {
      return (0, _util.stringToPDFString)(formValue.name);
    } else if ((0, _util.isString)(formValue)) {
      return (0, _util.stringToPDFString)(formValue);
    }

    return null;
  }

  hasFieldFlag(flag) {
    return !!(this.data.fieldFlags & flag);
  }

  getOperatorList(evaluator, task, renderForms, annotationStorage) {
    if (renderForms) {
      return Promise.resolve(new _operator_list.OperatorList());
    }

    if (!this._hasText) {
      return super.getOperatorList(evaluator, task, renderForms, annotationStorage);
    }

    return this._getAppearance(evaluator, task, annotationStorage).then(content => {
      if (this.appearance && content === null) {
        return super.getOperatorList(evaluator, task, renderForms, annotationStorage);
      }

      const operatorList = new _operator_list.OperatorList();

      if (!this.data.defaultAppearance || content === null) {
        return operatorList;
      }

      const matrix = [1, 0, 0, 1, 0, 0];
      const bbox = [0, 0, this.data.rect[2] - this.data.rect[0], this.data.rect[3] - this.data.rect[1]];
      const transform = getTransformMatrix(this.data.rect, bbox, matrix);
      operatorList.addOp(_util.OPS.beginAnnotation, [this.data.rect, transform, matrix]);
      const stream = new _stream.StringStream(content);
      return evaluator.getOperatorList({
        stream,
        task,
        resources: this._fieldResources.mergedResources,
        operatorList
      }).then(function () {
        operatorList.addOp(_util.OPS.endAnnotation, []);
        return operatorList;
      });
    });
  }

  async save(evaluator, task, annotationStorage) {
    const value = annotationStorage[this.data.id] && annotationStorage[this.data.id].value;

    if (value === this.data.fieldValue || value === undefined) {
      return null;
    }

    let appearance = await this._getAppearance(evaluator, task, annotationStorage);

    if (appearance === null) {
      return null;
    }

    const {
      xref
    } = evaluator;
    const dict = xref.fetchIfRef(this.ref);

    if (!(0, _primitives.isDict)(dict)) {
      return null;
    }

    const bbox = [0, 0, this.data.rect[2] - this.data.rect[0], this.data.rect[3] - this.data.rect[1]];
    const xfa = {
      path: (0, _util.stringToPDFString)(dict.get("T") || ""),
      value
    };
    const newRef = xref.getNewRef();
    const AP = new _primitives.Dict(xref);
    AP.set("N", newRef);
    const encrypt = xref.encrypt;
    let originalTransform = null;
    let newTransform = null;

    if (encrypt) {
      originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
      newTransform = encrypt.createCipherTransform(newRef.num, newRef.gen);
      appearance = newTransform.encryptString(appearance);
    }

    dict.set("V", (0, _util.isAscii)(value) ? value : (0, _util.stringToUTF16BEString)(value));
    dict.set("AP", AP);
    dict.set("M", `D:${(0, _util.getModificationDate)()}`);
    const appearanceDict = new _primitives.Dict(xref);
    appearanceDict.set("Length", appearance.length);
    appearanceDict.set("Subtype", _primitives.Name.get("Form"));
    appearanceDict.set("Resources", this._getSaveFieldResources(xref));
    appearanceDict.set("BBox", bbox);
    const bufferOriginal = [`${this.ref.num} ${this.ref.gen} obj\n`];
    (0, _writer.writeDict)(dict, bufferOriginal, originalTransform);
    bufferOriginal.push("\nendobj\n");
    const bufferNew = [`${newRef.num} ${newRef.gen} obj\n`];
    (0, _writer.writeDict)(appearanceDict, bufferNew, newTransform);
    bufferNew.push(" stream\n");
    bufferNew.push(appearance);
    bufferNew.push("\nendstream\nendobj\n");
    return [{
      ref: this.ref,
      data: bufferOriginal.join(""),
      xfa
    }, {
      ref: newRef,
      data: bufferNew.join(""),
      xfa: null
    }];
  }

  async _getAppearance(evaluator, task, annotationStorage) {
    const isPassword = this.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD);

    if (!annotationStorage || isPassword) {
      return null;
    }

    const value = annotationStorage[this.data.id] && annotationStorage[this.data.id].value;

    if (value === undefined) {
      return null;
    }

    if (value === "") {
      return "";
    }

    const defaultPadding = 2;
    const hPadding = defaultPadding;
    const totalHeight = this.data.rect[3] - this.data.rect[1];
    const totalWidth = this.data.rect[2] - this.data.rect[0];

    if (!this.data.defaultAppearance) {
      this.data.defaultAppearance = "/Helvetica 0 Tf 0 g";
      this.data.defaultAppearanceData = (0, _default_appearance.parseDefaultAppearance)(this.data.defaultAppearance);
    }

    const font = await this._getFontData(evaluator, task);

    const fontSize = this._computeFontSize(font, totalHeight);

    let descent = font.descent;

    if (isNaN(descent)) {
      descent = 0;
    }

    const vPadding = defaultPadding + Math.abs(descent) * fontSize;
    const defaultAppearance = this.data.defaultAppearance;
    const alignment = this.data.textAlignment;

    if (this.data.multiLine) {
      return this._getMultilineAppearance(defaultAppearance, value, font, fontSize, totalWidth, totalHeight, alignment, hPadding, vPadding);
    }

    const encodedString = font.encodeString(value).join("");

    if (this.data.comb) {
      return this._getCombAppearance(defaultAppearance, font, encodedString, totalWidth, hPadding, vPadding);
    }

    if (alignment === 0 || alignment > 2) {
      return "/Tx BMC q BT " + defaultAppearance + ` 1 0 0 1 ${hPadding} ${vPadding} Tm (${(0, _util.escapeString)(encodedString)}) Tj` + " ET Q EMC";
    }

    const renderedText = this._renderText(encodedString, font, fontSize, totalWidth, alignment, hPadding, vPadding);

    return "/Tx BMC q BT " + defaultAppearance + ` 1 0 0 1 0 0 Tm ${renderedText}` + " ET Q EMC";
  }

  async _getFontData(evaluator, task) {
    const operatorList = new _operator_list.OperatorList();
    const initialState = {
      font: null,

      clone() {
        return this;
      }

    };
    const {
      fontName,
      fontSize
    } = this.data.defaultAppearanceData;
    await evaluator.handleSetFont(this._fieldResources.mergedResources, [fontName, fontSize], null, operatorList, task, initialState, null);
    return initialState.font;
  }

  _computeFontSize(font, height) {
    let fontSize = this.data.defaultAppearanceData.fontSize;

    if (!fontSize) {
      const {
        fontColor,
        fontName
      } = this.data.defaultAppearanceData;
      let capHeight;

      if (font.capHeight) {
        capHeight = font.capHeight;
      } else {
        const glyphs = font.charsToGlyphs(font.encodeString("M").join(""));

        if (glyphs.length === 1 && glyphs[0].width) {
          const em = glyphs[0].width / 1000;
          capHeight = 0.7 * em;
        } else {
          capHeight = 0.7;
        }
      }

      fontSize = Math.max(1, Math.floor(height / (1.5 * capHeight)));
      this.data.defaultAppearance = (0, _default_appearance.createDefaultAppearance)({
        fontSize,
        fontName,
        fontColor
      });
    }

    return fontSize;
  }

  _renderText(text, font, fontSize, totalWidth, alignment, hPadding, vPadding) {
    const glyphs = font.charsToGlyphs(text);
    const scale = fontSize / 1000;
    let width = 0;

    for (const glyph of glyphs) {
      width += glyph.width * scale;
    }

    let shift;

    if (alignment === 1) {
      shift = (totalWidth - width) / 2;
    } else if (alignment === 2) {
      shift = totalWidth - width - hPadding;
    } else {
      shift = hPadding;
    }

    shift = shift.toFixed(2);
    vPadding = vPadding.toFixed(2);
    return `${shift} ${vPadding} Td (${(0, _util.escapeString)(text)}) Tj`;
  }

  _getSaveFieldResources(xref) {
    const {
      localResources,
      appearanceResources,
      acroFormResources
    } = this._fieldResources;
    const fontNameStr = this.data.defaultAppearanceData && this.data.defaultAppearanceData.fontName.name;

    if (!fontNameStr) {
      return localResources || _primitives.Dict.empty;
    }

    for (const resources of [localResources, appearanceResources]) {
      if (resources instanceof _primitives.Dict) {
        const localFont = resources.get("Font");

        if (localFont instanceof _primitives.Dict && localFont.has(fontNameStr)) {
          return resources;
        }
      }
    }

    if (acroFormResources instanceof _primitives.Dict) {
      const acroFormFont = acroFormResources.get("Font");

      if (acroFormFont instanceof _primitives.Dict && acroFormFont.has(fontNameStr)) {
        const subFontDict = new _primitives.Dict(xref);
        subFontDict.set(fontNameStr, acroFormFont.getRaw(fontNameStr));
        const subResourcesDict = new _primitives.Dict(xref);
        subResourcesDict.set("Font", subFontDict);
        return _primitives.Dict.merge({
          xref,
          dictArray: [subResourcesDict, localResources],
          mergeSubDicts: true
        });
      }
    }

    return localResources || _primitives.Dict.empty;
  }

  getFieldObject() {
    if (this.data.fieldType === "Sig") {
      return {
        id: this.data.id,
        value: null,
        type: "signature"
      };
    }

    return null;
  }

}

class TextWidgetAnnotation extends WidgetAnnotation {
  constructor(params) {
    super(params);
    this._hasText = true;
    const dict = params.dict;

    if (!(0, _util.isString)(this.data.fieldValue)) {
      this.data.fieldValue = "";
    }

    let alignment = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "Q"
    });

    if (!Number.isInteger(alignment) || alignment < 0 || alignment > 2) {
      alignment = null;
    }

    this.data.textAlignment = alignment;
    let maximumLength = (0, _core_utils.getInheritableProperty)({
      dict,
      key: "MaxLen"
    });

    if (!Number.isInteger(maximumLength) || maximumLength < 0) {
      maximumLength = null;
    }

    this.data.maxLen = maximumLength;
    this.data.multiLine = this.hasFieldFlag(_util.AnnotationFieldFlag.MULTILINE);
    this.data.comb = this.hasFieldFlag(_util.AnnotationFieldFlag.COMB) && !this.hasFieldFlag(_util.AnnotationFieldFlag.MULTILINE) && !this.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD) && !this.hasFieldFlag(_util.AnnotationFieldFlag.FILESELECT) && this.data.maxLen !== null;
  }

  _getCombAppearance(defaultAppearance, font, text, width, hPadding, vPadding) {
    const combWidth = (width / this.data.maxLen).toFixed(2);
    const buf = [];
    const positions = font.getCharPositions(text);

    for (const [start, end] of positions) {
      buf.push(`(${(0, _util.escapeString)(text.substring(start, end))}) Tj`);
    }

    const renderedComb = buf.join(` ${combWidth} 0 Td `);
    return "/Tx BMC q BT " + defaultAppearance + ` 1 0 0 1 ${hPadding} ${vPadding} Tm ${renderedComb}` + " ET Q EMC";
  }

  _getMultilineAppearance(defaultAppearance, text, font, fontSize, width, height, alignment, hPadding, vPadding) {
    const lines = text.split(/\r\n|\r|\n/);
    const buf = [];
    const totalWidth = width - 2 * hPadding;

    for (const line of lines) {
      const chunks = this._splitLine(line, font, fontSize, totalWidth);

      for (const chunk of chunks) {
        const padding = buf.length === 0 ? hPadding : 0;
        buf.push(this._renderText(chunk, font, fontSize, width, alignment, padding, -fontSize));
      }
    }

    const renderedText = buf.join("\n");
    return "/Tx BMC q BT " + defaultAppearance + ` 1 0 0 1 0 ${height} Tm ${renderedText}` + " ET Q EMC";
  }

  _splitLine(line, font, fontSize, width) {
    line = font.encodeString(line).join("");
    const glyphs = font.charsToGlyphs(line);

    if (glyphs.length <= 1) {
      return [line];
    }

    const positions = font.getCharPositions(line);
    const scale = fontSize / 1000;
    const chunks = [];
    let lastSpacePosInStringStart = -1,
        lastSpacePosInStringEnd = -1,
        lastSpacePos = -1,
        startChunk = 0,
        currentWidth = 0;

    for (let i = 0, ii = glyphs.length; i < ii; i++) {
      const [start, end] = positions[i];
      const glyph = glyphs[i];
      const glyphWidth = glyph.width * scale;

      if (glyph.unicode === " ") {
        if (currentWidth + glyphWidth > width) {
          chunks.push(line.substring(startChunk, start));
          startChunk = start;
          currentWidth = glyphWidth;
          lastSpacePosInStringStart = -1;
          lastSpacePos = -1;
        } else {
          currentWidth += glyphWidth;
          lastSpacePosInStringStart = start;
          lastSpacePosInStringEnd = end;
          lastSpacePos = i;
        }
      } else {
        if (currentWidth + glyphWidth > width) {
          if (lastSpacePosInStringStart !== -1) {
            chunks.push(line.substring(startChunk, lastSpacePosInStringEnd));
            startChunk = lastSpacePosInStringEnd;
            i = lastSpacePos + 1;
            lastSpacePosInStringStart = -1;
            currentWidth = 0;
          } else {
            chunks.push(line.substring(startChunk, start));
            startChunk = start;
            currentWidth = glyphWidth;
          }
        } else {
          currentWidth += glyphWidth;
        }
      }
    }

    if (startChunk < line.length) {
      chunks.push(line.substring(startChunk, line.length));
    }

    return chunks;
  }

  getFieldObject() {
    return {
      id: this.data.id,
      value: this.data.fieldValue,
      defaultValue: this.data.defaultFieldValue,
      multiline: this.data.multiLine,
      password: this.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD),
      charLimit: this.data.maxLen,
      comb: this.data.comb,
      editable: !this.data.readOnly,
      hidden: this.data.hidden,
      name: this.data.fieldName,
      rect: this.data.rect,
      actions: this.data.actions,
      type: "text"
    };
  }

}

class ButtonWidgetAnnotation extends WidgetAnnotation {
  constructor(params) {
    super(params);
    this.checkedAppearance = null;
    this.uncheckedAppearance = null;
    this.data.checkBox = !this.hasFieldFlag(_util.AnnotationFieldFlag.RADIO) && !this.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    this.data.radioButton = this.hasFieldFlag(_util.AnnotationFieldFlag.RADIO) && !this.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    this.data.pushButton = this.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    this.data.isTooltipOnly = false;

    if (this.data.checkBox) {
      this._processCheckBox(params);
    } else if (this.data.radioButton) {
      this._processRadioButton(params);
    } else if (this.data.pushButton) {
      this._processPushButton(params);
    } else {
      (0, _util.warn)("Invalid field flags for button widget annotation");
    }
  }

  getOperatorList(evaluator, task, renderForms, annotationStorage) {
    if (this.data.pushButton) {
      return super.getOperatorList(evaluator, task, false, annotationStorage);
    }

    if (annotationStorage) {
      const value = annotationStorage[this.data.id] && annotationStorage[this.data.id].value;

      if (value === undefined) {
        return super.getOperatorList(evaluator, task, renderForms, annotationStorage);
      }

      let appearance;

      if (value) {
        appearance = this.checkedAppearance;
      } else {
        appearance = this.uncheckedAppearance;
      }

      if (appearance) {
        const savedAppearance = this.appearance;
        this.appearance = appearance;
        const operatorList = super.getOperatorList(evaluator, task, renderForms, annotationStorage);
        this.appearance = savedAppearance;
        return operatorList;
      }

      return Promise.resolve(new _operator_list.OperatorList());
    }

    return super.getOperatorList(evaluator, task, renderForms, annotationStorage);
  }

  async save(evaluator, task, annotationStorage) {
    if (this.data.checkBox) {
      return this._saveCheckbox(evaluator, task, annotationStorage);
    }

    if (this.data.radioButton) {
      return this._saveRadioButton(evaluator, task, annotationStorage);
    }

    return null;
  }

  async _saveCheckbox(evaluator, task, annotationStorage) {
    const value = annotationStorage[this.data.id] && annotationStorage[this.data.id].value;

    if (value === undefined) {
      return null;
    }

    const defaultValue = this.data.fieldValue && this.data.fieldValue !== "Off";

    if (defaultValue === value) {
      return null;
    }

    const dict = evaluator.xref.fetchIfRef(this.ref);

    if (!(0, _primitives.isDict)(dict)) {
      return null;
    }

    const xfa = {
      path: (0, _util.stringToPDFString)(dict.get("T") || ""),
      value: value ? this.data.exportValue : ""
    };

    const name = _primitives.Name.get(value ? this.data.exportValue : "Off");

    dict.set("V", name);
    dict.set("AS", name);
    dict.set("M", `D:${(0, _util.getModificationDate)()}`);
    const encrypt = evaluator.xref.encrypt;
    let originalTransform = null;

    if (encrypt) {
      originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
    }

    const buffer = [`${this.ref.num} ${this.ref.gen} obj\n`];
    (0, _writer.writeDict)(dict, buffer, originalTransform);
    buffer.push("\nendobj\n");
    return [{
      ref: this.ref,
      data: buffer.join(""),
      xfa
    }];
  }

  async _saveRadioButton(evaluator, task, annotationStorage) {
    const value = annotationStorage[this.data.id] && annotationStorage[this.data.id].value;

    if (value === undefined) {
      return null;
    }

    const defaultValue = this.data.fieldValue === this.data.buttonValue;

    if (defaultValue === value) {
      return null;
    }

    const dict = evaluator.xref.fetchIfRef(this.ref);

    if (!(0, _primitives.isDict)(dict)) {
      return null;
    }

    const xfa = {
      path: (0, _util.stringToPDFString)(dict.get("T") || ""),
      value: value ? this.data.buttonValue : ""
    };

    const name = _primitives.Name.get(value ? this.data.buttonValue : "Off");

    let parentBuffer = null;
    const encrypt = evaluator.xref.encrypt;

    if (value) {
      if ((0, _primitives.isRef)(this.parent)) {
        const parent = evaluator.xref.fetch(this.parent);
        let parentTransform = null;

        if (encrypt) {
          parentTransform = encrypt.createCipherTransform(this.parent.num, this.parent.gen);
        }

        parent.set("V", name);
        parentBuffer = [`${this.parent.num} ${this.parent.gen} obj\n`];
        (0, _writer.writeDict)(parent, parentBuffer, parentTransform);
        parentBuffer.push("\nendobj\n");
      } else if ((0, _primitives.isDict)(this.parent)) {
        this.parent.set("V", name);
      }
    }

    dict.set("AS", name);
    dict.set("M", `D:${(0, _util.getModificationDate)()}`);
    let originalTransform = null;

    if (encrypt) {
      originalTransform = encrypt.createCipherTransform(this.ref.num, this.ref.gen);
    }

    const buffer = [`${this.ref.num} ${this.ref.gen} obj\n`];
    (0, _writer.writeDict)(dict, buffer, originalTransform);
    buffer.push("\nendobj\n");
    const newRefs = [{
      ref: this.ref,
      data: buffer.join(""),
      xfa
    }];

    if (parentBuffer !== null) {
      newRefs.push({
        ref: this.parent,
        data: parentBuffer.join(""),
        xfa: null
      });
    }

    return newRefs;
  }

  _processCheckBox(params) {
    const customAppearance = params.dict.get("AP");

    if (!(0, _primitives.isDict)(customAppearance)) {
      return;
    }

    const normalAppearance = customAppearance.get("N");

    if (!(0, _primitives.isDict)(normalAppearance)) {
      return;
    }

    const exportValues = normalAppearance.getKeys();

    if (!exportValues.includes("Off")) {
      exportValues.push("Off");
    }

    if (exportValues.length !== 2) {
      return;
    }

    this.data.exportValue = exportValues[0] === "Off" ? exportValues[1] : exportValues[0];
    this.checkedAppearance = normalAppearance.get(this.data.exportValue);
    this.uncheckedAppearance = normalAppearance.get("Off") || null;

    this._streams.push(this.checkedAppearance);

    if (this.uncheckedAppearance) {
      this._streams.push(this.uncheckedAppearance);
    }

    this._fallbackFontDict = this.fallbackFontDict;
  }

  _processRadioButton(params) {
    this.data.fieldValue = this.data.buttonValue = null;
    const fieldParent = params.dict.get("Parent");

    if ((0, _primitives.isDict)(fieldParent)) {
      this.parent = params.dict.getRaw("Parent");
      const fieldParentValue = fieldParent.get("V");

      if ((0, _primitives.isName)(fieldParentValue)) {
        this.data.fieldValue = this._decodeFormValue(fieldParentValue);
      }
    }

    const appearanceStates = params.dict.get("AP");

    if (!(0, _primitives.isDict)(appearanceStates)) {
      return;
    }

    const normalAppearance = appearanceStates.get("N");

    if (!(0, _primitives.isDict)(normalAppearance)) {
      return;
    }

    for (const key of normalAppearance.getKeys()) {
      if (key !== "Off") {
        this.data.buttonValue = this._decodeFormValue(key);
        break;
      }
    }

    this.checkedAppearance = normalAppearance.get(this.data.buttonValue);
    this.uncheckedAppearance = normalAppearance.get("Off") || null;

    this._streams.push(this.checkedAppearance);

    if (this.uncheckedAppearance) {
      this._streams.push(this.uncheckedAppearance);
    }

    this._fallbackFontDict = this.fallbackFontDict;
  }

  _processPushButton(params) {
    if (!params.dict.has("A") && !params.dict.has("AA") && !this.data.alternativeText) {
      (0, _util.warn)("Push buttons without action dictionaries are not supported");
      return;
    }

    this.data.isTooltipOnly = !params.dict.has("A") && !params.dict.has("AA");

    _obj.Catalog.parseDestDictionary({
      destDict: params.dict,
      resultObj: this.data,
      docBaseUrl: params.pdfManager.docBaseUrl
    });
  }

  getFieldObject() {
    let type = "button";
    let exportValues;

    if (this.data.checkBox) {
      type = "checkbox";
      exportValues = this.data.exportValue;
    } else if (this.data.radioButton) {
      type = "radiobutton";
      exportValues = this.data.buttonValue;
    }

    return {
      id: this.data.id,
      value: this.data.fieldValue || "Off",
      defaultValue: this.data.defaultFieldValue,
      exportValues,
      editable: !this.data.readOnly,
      name: this.data.fieldName,
      rect: this.data.rect,
      hidden: this.data.hidden,
      actions: this.data.actions,
      type
    };
  }

  get fallbackFontDict() {
    const dict = new _primitives.Dict();
    dict.set("BaseFont", _primitives.Name.get("ZapfDingbats"));
    dict.set("Type", _primitives.Name.get("FallbackType"));
    dict.set("Subtype", _primitives.Name.get("FallbackType"));
    dict.set("Encoding", _primitives.Name.get("ZapfDingbatsEncoding"));
    return (0, _util.shadow)(this, "fallbackFontDict", dict);
  }

}

class ChoiceWidgetAnnotation extends WidgetAnnotation {
  constructor(params) {
    super(params);
    this.data.options = [];
    const options = (0, _core_utils.getInheritableProperty)({
      dict: params.dict,
      key: "Opt"
    });

    if (Array.isArray(options)) {
      const xref = params.xref;

      for (let i = 0, ii = options.length; i < ii; i++) {
        const option = xref.fetchIfRef(options[i]);
        const isOptionArray = Array.isArray(option);
        this.data.options[i] = {
          exportValue: this._decodeFormValue(isOptionArray ? xref.fetchIfRef(option[0]) : option),
          displayValue: this._decodeFormValue(isOptionArray ? xref.fetchIfRef(option[1]) : option)
        };
      }
    }

    if ((0, _util.isString)(this.data.fieldValue)) {
      this.data.fieldValue = [this.data.fieldValue];
    } else if (!this.data.fieldValue) {
      this.data.fieldValue = [];
    }

    this.data.combo = this.hasFieldFlag(_util.AnnotationFieldFlag.COMBO);
    this.data.multiSelect = this.hasFieldFlag(_util.AnnotationFieldFlag.MULTISELECT);
    this._hasText = true;
  }

  getFieldObject() {
    const type = this.data.combo ? "combobox" : "listbox";
    const value = this.data.fieldValue.length > 0 ? this.data.fieldValue[0] : null;
    return {
      id: this.data.id,
      value,
      defaultValue: this.data.defaultFieldValue,
      editable: !this.data.readOnly,
      name: this.data.fieldName,
      rect: this.data.rect,
      numItems: this.data.fieldValue.length,
      multipleSelection: this.data.multiSelect,
      hidden: this.data.hidden,
      actions: this.data.actions,
      type
    };
  }

}

class TextAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    const DEFAULT_ICON_SIZE = 22;
    super(parameters);
    const dict = parameters.dict;
    this.data.annotationType = _util.AnnotationType.TEXT;

    if (this.data.hasAppearance) {
      this.data.name = "NoIcon";
    } else {
      this.data.rect[1] = this.data.rect[3] - DEFAULT_ICON_SIZE;
      this.data.rect[2] = this.data.rect[0] + DEFAULT_ICON_SIZE;
      this.data.name = dict.has("Name") ? dict.get("Name").name : "Note";
    }

    if (dict.has("State")) {
      this.data.state = dict.get("State") || null;
      this.data.stateModel = dict.get("StateModel") || null;
    } else {
      this.data.state = null;
      this.data.stateModel = null;
    }
  }

}

class LinkAnnotation extends Annotation {
  constructor(params) {
    super(params);
    this.data.annotationType = _util.AnnotationType.LINK;
    const quadPoints = getQuadPoints(params.dict, this.rectangle);

    if (quadPoints) {
      this.data.quadPoints = quadPoints;
    }

    _obj.Catalog.parseDestDictionary({
      destDict: params.dict,
      resultObj: this.data,
      docBaseUrl: params.pdfManager.docBaseUrl
    });
  }

}

class PopupAnnotation extends Annotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.POPUP;
    let parentItem = parameters.dict.get("Parent");

    if (!parentItem) {
      (0, _util.warn)("Popup annotation has a missing or invalid parent annotation.");
      return;
    }

    const parentSubtype = parentItem.get("Subtype");
    this.data.parentType = (0, _primitives.isName)(parentSubtype) ? parentSubtype.name : null;
    const rawParent = parameters.dict.getRaw("Parent");
    this.data.parentId = (0, _primitives.isRef)(rawParent) ? rawParent.toString() : null;
    const parentRect = parentItem.getArray("Rect");

    if (Array.isArray(parentRect) && parentRect.length === 4) {
      this.data.parentRect = _util.Util.normalizeRect(parentRect);
    } else {
      this.data.parentRect = [0, 0, 0, 0];
    }

    const rt = parentItem.get("RT");

    if ((0, _primitives.isName)(rt, _util.AnnotationReplyType.GROUP)) {
      parentItem = parentItem.get("IRT");
    }

    if (!parentItem.has("M")) {
      this.data.modificationDate = null;
    } else {
      this.setModificationDate(parentItem.get("M"));
      this.data.modificationDate = this.modificationDate;
    }

    if (!parentItem.has("C")) {
      this.data.color = null;
    } else {
      this.setColor(parentItem.getArray("C"));
      this.data.color = this.color;
    }

    if (!this.viewable) {
      const parentFlags = parentItem.get("F");

      if (this._isViewable(parentFlags)) {
        this.setFlags(parentFlags);
      }
    }

    this.data.title = (0, _util.stringToPDFString)(parentItem.get("T") || "");
    this.data.contents = (0, _util.stringToPDFString)(parentItem.get("Contents") || "");
  }

}

class FreeTextAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.FREETEXT;
  }

}

class LineAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.LINE;
    this.data.lineCoordinates = _util.Util.normalizeRect(parameters.dict.getArray("L"));
  }

}

class SquareAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.SQUARE;
  }

}

class CircleAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.CIRCLE;
  }

}

class PolylineAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.POLYLINE;
    this.data.vertices = [];
    const rawVertices = parameters.dict.getArray("Vertices");

    if (!Array.isArray(rawVertices)) {
      return;
    }

    for (let i = 0, ii = rawVertices.length; i < ii; i += 2) {
      this.data.vertices.push({
        x: rawVertices[i],
        y: rawVertices[i + 1]
      });
    }
  }

}

class PolygonAnnotation extends PolylineAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.POLYGON;
  }

}

class CaretAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.CARET;
  }

}

class InkAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.INK;
    this.data.inkLists = [];
    const rawInkLists = parameters.dict.getArray("InkList");

    if (!Array.isArray(rawInkLists)) {
      return;
    }

    const xref = parameters.xref;

    for (let i = 0, ii = rawInkLists.length; i < ii; ++i) {
      this.data.inkLists.push([]);

      for (let j = 0, jj = rawInkLists[i].length; j < jj; j += 2) {
        this.data.inkLists[i].push({
          x: xref.fetchIfRef(rawInkLists[i][j]),
          y: xref.fetchIfRef(rawInkLists[i][j + 1])
        });
      }
    }
  }

}

class HighlightAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.HIGHLIGHT;
    const quadPoints = this.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!this.appearance) {
        const fillColor = this.color ? Array.from(this.color).map(c => c / 255) : [1, 1, 0];

        this._setDefaultAppearance({
          xref: parameters.xref,
          fillColor,
          blendMode: "Multiply",
          pointsCallback: (buffer, points) => {
            buffer.push(`${points[0].x} ${points[0].y} m`);
            buffer.push(`${points[1].x} ${points[1].y} l`);
            buffer.push(`${points[3].x} ${points[3].y} l`);
            buffer.push(`${points[2].x} ${points[2].y} l`);
            buffer.push("f");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      this.data.hasPopup = false;
    }
  }

}

class UnderlineAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.UNDERLINE;
    const quadPoints = this.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!this.appearance) {
        const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];

        this._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor,
          pointsCallback: (buffer, points) => {
            buffer.push(`${points[2].x} ${points[2].y} m`);
            buffer.push(`${points[3].x} ${points[3].y} l`);
            buffer.push("S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      this.data.hasPopup = false;
    }
  }

}

class SquigglyAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.SQUIGGLY;
    const quadPoints = this.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!this.appearance) {
        const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];

        this._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor,
          pointsCallback: (buffer, points) => {
            const dy = (points[0].y - points[2].y) / 6;
            let shift = dy;
            let x = points[2].x;
            const y = points[2].y;
            const xEnd = points[3].x;
            buffer.push(`${x} ${y + shift} m`);

            do {
              x += 2;
              shift = shift === 0 ? dy : 0;
              buffer.push(`${x} ${y + shift} l`);
            } while (x < xEnd);

            buffer.push("S");
            return [points[2].x, xEnd, y - 2 * dy, y + 2 * dy];
          }
        });
      }
    } else {
      this.data.hasPopup = false;
    }
  }

}

class StrikeOutAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.STRIKEOUT;
    const quadPoints = this.data.quadPoints = getQuadPoints(parameters.dict, null);

    if (quadPoints) {
      if (!this.appearance) {
        const strokeColor = this.color ? Array.from(this.color).map(c => c / 255) : [0, 0, 0];

        this._setDefaultAppearance({
          xref: parameters.xref,
          extra: "[] 0 d 1 w",
          strokeColor,
          pointsCallback: (buffer, points) => {
            buffer.push(`${(points[0].x + points[2].x) / 2}` + ` ${(points[0].y + points[2].y) / 2} m`);
            buffer.push(`${(points[1].x + points[3].x) / 2}` + ` ${(points[1].y + points[3].y) / 2} l`);
            buffer.push("S");
            return [points[0].x, points[1].x, points[3].y, points[1].y];
          }
        });
      }
    } else {
      this.data.hasPopup = false;
    }
  }

}

class StampAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    this.data.annotationType = _util.AnnotationType.STAMP;
  }

}

class FileAttachmentAnnotation extends MarkupAnnotation {
  constructor(parameters) {
    super(parameters);
    const file = new _obj.FileSpec(parameters.dict.get("FS"), parameters.xref);
    this.data.annotationType = _util.AnnotationType.FILEATTACHMENT;
    this.data.file = file.serializable;
  }

}