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
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnnotationFactory = exports.AnnotationBorderStyle = exports.Annotation = void 0;

var _util = require("../shared/util");

var _obj = require("./obj");

var _primitives = require("./primitives");

var _colorspace = require("./colorspace");

var _operator_list = require("./operator_list");

var _stream = require("./stream");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnnotationFactory =
/*#__PURE__*/
function () {
  function AnnotationFactory() {
    _classCallCheck(this, AnnotationFactory);
  }

  _createClass(AnnotationFactory, null, [{
    key: "create",
    value: function create(xref, ref, pdfManager, idFactory) {
      return pdfManager.ensure(this, '_create', [xref, ref, pdfManager, idFactory]);
    }
  }, {
    key: "_create",
    value: function _create(xref, ref, pdfManager, idFactory) {
      var dict = xref.fetchIfRef(ref);

      if (!(0, _primitives.isDict)(dict)) {
        return;
      }

      var id = (0, _primitives.isRef)(ref) ? ref.toString() : 'annot_' + idFactory.createObjId();
      var subtype = dict.get('Subtype');
      subtype = (0, _primitives.isName)(subtype) ? subtype.name : null;
      var parameters = {
        xref: xref,
        dict: dict,
        ref: (0, _primitives.isRef)(ref) ? ref : null,
        subtype: subtype,
        id: id,
        pdfManager: pdfManager
      };

      switch (subtype) {
        case 'Link':
          return new LinkAnnotation(parameters);

        case 'Text':
          return new TextAnnotation(parameters);

        case 'Widget':
          var fieldType = (0, _util.getInheritableProperty)({
            dict: dict,
            key: 'FT'
          });
          fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;

          switch (fieldType) {
            case 'Tx':
              return new TextWidgetAnnotation(parameters);

            case 'Btn':
              return new ButtonWidgetAnnotation(parameters);

            case 'Ch':
              return new ChoiceWidgetAnnotation(parameters);
          }

          (0, _util.warn)('Unimplemented widget field type "' + fieldType + '", ' + 'falling back to base field type.');
          return new WidgetAnnotation(parameters);

        case 'Popup':
          return new PopupAnnotation(parameters);

        case 'Line':
          return new LineAnnotation(parameters);

        case 'Square':
          return new SquareAnnotation(parameters);

        case 'Circle':
          return new CircleAnnotation(parameters);

        case 'PolyLine':
          return new PolylineAnnotation(parameters);

        case 'Polygon':
          return new PolygonAnnotation(parameters);

        case 'Ink':
          return new InkAnnotation(parameters);

        case 'Highlight':
          return new HighlightAnnotation(parameters);

        case 'Underline':
          return new UnderlineAnnotation(parameters);

        case 'Squiggly':
          return new SquigglyAnnotation(parameters);

        case 'StrikeOut':
          return new StrikeOutAnnotation(parameters);

        case 'Stamp':
          return new StampAnnotation(parameters);

        case 'FileAttachment':
          return new FileAttachmentAnnotation(parameters);

        default:
          if (!subtype) {
            (0, _util.warn)('Annotation is missing the required /Subtype.');
          } else {
            (0, _util.warn)('Unimplemented annotation type "' + subtype + '", ' + 'falling back to base annotation.');
          }

          return new Annotation(parameters);
      }
    }
  }]);

  return AnnotationFactory;
}();

exports.AnnotationFactory = AnnotationFactory;

function getTransformMatrix(rect, bbox, matrix) {
  var bounds = _util.Util.getAxialAlignedBoundingBox(bbox, matrix);

  var minX = bounds[0];
  var minY = bounds[1];
  var maxX = bounds[2];
  var maxY = bounds[3];

  if (minX === maxX || minY === maxY) {
    return [1, 0, 0, 1, rect[0], rect[1]];
  }

  var xRatio = (rect[2] - rect[0]) / (maxX - minX);
  var yRatio = (rect[3] - rect[1]) / (maxY - minY);
  return [xRatio, 0, 0, yRatio, rect[0] - minX * xRatio, rect[1] - minY * yRatio];
}

var Annotation =
/*#__PURE__*/
function () {
  function Annotation(params) {
    _classCallCheck(this, Annotation);

    var dict = params.dict;
    this.setFlags(dict.get('F'));
    this.setRectangle(dict.getArray('Rect'));
    this.setColor(dict.getArray('C'));
    this.setBorderStyle(dict);
    this.setAppearance(dict);
    this.data = {
      annotationFlags: this.flags,
      borderStyle: this.borderStyle,
      color: this.color,
      hasAppearance: !!this.appearance,
      id: params.id,
      rect: this.rectangle,
      subtype: params.subtype
    };
  }

  _createClass(Annotation, [{
    key: "_hasFlag",
    value: function _hasFlag(flags, flag) {
      return !!(flags & flag);
    }
  }, {
    key: "_isViewable",
    value: function _isViewable(flags) {
      return !this._hasFlag(flags, _util.AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, _util.AnnotationFlag.HIDDEN) && !this._hasFlag(flags, _util.AnnotationFlag.NOVIEW);
    }
  }, {
    key: "_isPrintable",
    value: function _isPrintable(flags) {
      return this._hasFlag(flags, _util.AnnotationFlag.PRINT) && !this._hasFlag(flags, _util.AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, _util.AnnotationFlag.HIDDEN);
    }
  }, {
    key: "setFlags",
    value: function setFlags(flags) {
      this.flags = Number.isInteger(flags) && flags > 0 ? flags : 0;
    }
  }, {
    key: "hasFlag",
    value: function hasFlag(flag) {
      return this._hasFlag(this.flags, flag);
    }
  }, {
    key: "setRectangle",
    value: function setRectangle(rectangle) {
      if (Array.isArray(rectangle) && rectangle.length === 4) {
        this.rectangle = _util.Util.normalizeRect(rectangle);
      } else {
        this.rectangle = [0, 0, 0, 0];
      }
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      var rgbColor = new Uint8ClampedArray(3);

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
  }, {
    key: "setBorderStyle",
    value: function setBorderStyle(borderStyle) {
      this.borderStyle = new AnnotationBorderStyle();

      if (!(0, _primitives.isDict)(borderStyle)) {
        return;
      }

      if (borderStyle.has('BS')) {
        var dict = borderStyle.get('BS');
        var dictType = dict.get('Type');

        if (!dictType || (0, _primitives.isName)(dictType, 'Border')) {
          this.borderStyle.setWidth(dict.get('W'));
          this.borderStyle.setStyle(dict.get('S'));
          this.borderStyle.setDashArray(dict.getArray('D'));
        }
      } else if (borderStyle.has('Border')) {
        var array = borderStyle.getArray('Border');

        if (Array.isArray(array) && array.length >= 3) {
          this.borderStyle.setHorizontalCornerRadius(array[0]);
          this.borderStyle.setVerticalCornerRadius(array[1]);
          this.borderStyle.setWidth(array[2]);

          if (array.length === 4) {
            this.borderStyle.setDashArray(array[3]);
          }
        }
      } else {
        this.borderStyle.setWidth(0);
      }
    }
  }, {
    key: "setAppearance",
    value: function setAppearance(dict) {
      this.appearance = null;
      var appearanceStates = dict.get('AP');

      if (!(0, _primitives.isDict)(appearanceStates)) {
        return;
      }

      var normalAppearanceState = appearanceStates.get('N');

      if ((0, _primitives.isStream)(normalAppearanceState)) {
        this.appearance = normalAppearanceState;
        return;
      }

      if (!(0, _primitives.isDict)(normalAppearanceState)) {
        return;
      }

      var as = dict.get('AS');

      if (!(0, _primitives.isName)(as) || !normalAppearanceState.has(as.name)) {
        return;
      }

      this.appearance = normalAppearanceState.get(as.name);
    }
  }, {
    key: "_preparePopup",
    value: function _preparePopup(dict) {
      if (!dict.has('C')) {
        this.data.color = null;
      }

      this.data.hasPopup = dict.has('Popup');
      this.data.title = (0, _util.stringToPDFString)(dict.get('T') || '');
      this.data.contents = (0, _util.stringToPDFString)(dict.get('Contents') || '');
    }
  }, {
    key: "loadResources",
    value: function loadResources(keys) {
      return this.appearance.dict.getAsync('Resources').then(function (resources) {
        if (!resources) {
          return;
        }

        var objectLoader = new _obj.ObjectLoader(resources, keys, resources.xref);
        return objectLoader.load().then(function () {
          return resources;
        });
      });
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, renderForms) {
      var _this = this;

      if (!this.appearance) {
        return Promise.resolve(new _operator_list.OperatorList());
      }

      var data = this.data;
      var appearanceDict = this.appearance.dict;
      var resourcesPromise = this.loadResources(['ExtGState', 'ColorSpace', 'Pattern', 'Shading', 'XObject', 'Font']);
      var bbox = appearanceDict.getArray('BBox') || [0, 0, 1, 1];
      var matrix = appearanceDict.getArray('Matrix') || [1, 0, 0, 1, 0, 0];
      var transform = getTransformMatrix(data.rect, bbox, matrix);
      return resourcesPromise.then(function (resources) {
        var opList = new _operator_list.OperatorList();
        opList.addOp(_util.OPS.beginAnnotation, [data.rect, transform, matrix]);
        return evaluator.getOperatorList({
          stream: _this.appearance,
          task: task,
          resources: resources,
          operatorList: opList
        }).then(function () {
          opList.addOp(_util.OPS.endAnnotation, []);

          _this.appearance.reset();

          return opList;
        });
      });
    }
  }, {
    key: "viewable",
    get: function get() {
      if (this.flags === 0) {
        return true;
      }

      return this._isViewable(this.flags);
    }
  }, {
    key: "printable",
    get: function get() {
      if (this.flags === 0) {
        return false;
      }

      return this._isPrintable(this.flags);
    }
  }]);

  return Annotation;
}();

exports.Annotation = Annotation;

var AnnotationBorderStyle =
/*#__PURE__*/
function () {
  function AnnotationBorderStyle() {
    _classCallCheck(this, AnnotationBorderStyle);

    this.width = 1;
    this.style = _util.AnnotationBorderStyleType.SOLID;
    this.dashArray = [3];
    this.horizontalCornerRadius = 0;
    this.verticalCornerRadius = 0;
  }

  _createClass(AnnotationBorderStyle, [{
    key: "setWidth",
    value: function setWidth(width) {
      if ((0, _primitives.isName)(width)) {
        this.width = 0;
        return;
      }

      if (Number.isInteger(width)) {
        this.width = width;
      }
    }
  }, {
    key: "setStyle",
    value: function setStyle(style) {
      if (!(0, _primitives.isName)(style)) {
        return;
      }

      switch (style.name) {
        case 'S':
          this.style = _util.AnnotationBorderStyleType.SOLID;
          break;

        case 'D':
          this.style = _util.AnnotationBorderStyleType.DASHED;
          break;

        case 'B':
          this.style = _util.AnnotationBorderStyleType.BEVELED;
          break;

        case 'I':
          this.style = _util.AnnotationBorderStyleType.INSET;
          break;

        case 'U':
          this.style = _util.AnnotationBorderStyleType.UNDERLINE;
          break;

        default:
          break;
      }
    }
  }, {
    key: "setDashArray",
    value: function setDashArray(dashArray) {
      if (Array.isArray(dashArray) && dashArray.length > 0) {
        var isValid = true;
        var allZeros = true;

        for (var i = 0, len = dashArray.length; i < len; i++) {
          var element = dashArray[i];
          var validNumber = +element >= 0;

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
  }, {
    key: "setHorizontalCornerRadius",
    value: function setHorizontalCornerRadius(radius) {
      if (Number.isInteger(radius)) {
        this.horizontalCornerRadius = radius;
      }
    }
  }, {
    key: "setVerticalCornerRadius",
    value: function setVerticalCornerRadius(radius) {
      if (Number.isInteger(radius)) {
        this.verticalCornerRadius = radius;
      }
    }
  }]);

  return AnnotationBorderStyle;
}();

exports.AnnotationBorderStyle = AnnotationBorderStyle;

var WidgetAnnotation =
/*#__PURE__*/
function (_Annotation) {
  _inherits(WidgetAnnotation, _Annotation);

  function WidgetAnnotation(params) {
    var _this2;

    _classCallCheck(this, WidgetAnnotation);

    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(WidgetAnnotation).call(this, params));
    var dict = params.dict;
    var data = _this2.data;
    data.annotationType = _util.AnnotationType.WIDGET;
    data.fieldName = _this2._constructFieldName(dict);
    data.fieldValue = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'V',
      getArray: true
    });
    data.alternativeText = (0, _util.stringToPDFString)(dict.get('TU') || '');
    data.defaultAppearance = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'DA'
    }) || '';
    var fieldType = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'FT'
    });
    data.fieldType = (0, _primitives.isName)(fieldType) ? fieldType.name : null;
    _this2.fieldResources = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'DR'
    }) || _primitives.Dict.empty;
    data.fieldFlags = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'Ff'
    });

    if (!Number.isInteger(data.fieldFlags) || data.fieldFlags < 0) {
      data.fieldFlags = 0;
    }

    data.readOnly = _this2.hasFieldFlag(_util.AnnotationFieldFlag.READONLY);

    if (data.fieldType === 'Sig') {
      data.fieldValue = null;

      _this2.setFlags(_util.AnnotationFlag.HIDDEN);
    }

    return _this2;
  }

  _createClass(WidgetAnnotation, [{
    key: "_constructFieldName",
    value: function _constructFieldName(dict) {
      if (!dict.has('T') && !dict.has('Parent')) {
        (0, _util.warn)('Unknown field name, falling back to empty field name.');
        return '';
      }

      if (!dict.has('Parent')) {
        return (0, _util.stringToPDFString)(dict.get('T'));
      }

      var fieldName = [];

      if (dict.has('T')) {
        fieldName.unshift((0, _util.stringToPDFString)(dict.get('T')));
      }

      var loopDict = dict;

      while (loopDict.has('Parent')) {
        loopDict = loopDict.get('Parent');

        if (!(0, _primitives.isDict)(loopDict)) {
          break;
        }

        if (loopDict.has('T')) {
          fieldName.unshift((0, _util.stringToPDFString)(loopDict.get('T')));
        }
      }

      return fieldName.join('.');
    }
  }, {
    key: "hasFieldFlag",
    value: function hasFieldFlag(flag) {
      return !!(this.data.fieldFlags & flag);
    }
  }, {
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, renderForms) {
      if (renderForms) {
        return Promise.resolve(new _operator_list.OperatorList());
      }

      return _get(_getPrototypeOf(WidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, renderForms);
    }
  }]);

  return WidgetAnnotation;
}(Annotation);

var TextWidgetAnnotation =
/*#__PURE__*/
function (_WidgetAnnotation) {
  _inherits(TextWidgetAnnotation, _WidgetAnnotation);

  function TextWidgetAnnotation(params) {
    var _this3;

    _classCallCheck(this, TextWidgetAnnotation);

    _this3 = _possibleConstructorReturn(this, _getPrototypeOf(TextWidgetAnnotation).call(this, params));
    var dict = params.dict;
    _this3.data.fieldValue = (0, _util.stringToPDFString)(_this3.data.fieldValue || '');
    var alignment = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'Q'
    });

    if (!Number.isInteger(alignment) || alignment < 0 || alignment > 2) {
      alignment = null;
    }

    _this3.data.textAlignment = alignment;
    var maximumLength = (0, _util.getInheritableProperty)({
      dict: dict,
      key: 'MaxLen'
    });

    if (!Number.isInteger(maximumLength) || maximumLength < 0) {
      maximumLength = null;
    }

    _this3.data.maxLen = maximumLength;
    _this3.data.multiLine = _this3.hasFieldFlag(_util.AnnotationFieldFlag.MULTILINE);
    _this3.data.comb = _this3.hasFieldFlag(_util.AnnotationFieldFlag.COMB) && !_this3.hasFieldFlag(_util.AnnotationFieldFlag.MULTILINE) && !_this3.hasFieldFlag(_util.AnnotationFieldFlag.PASSWORD) && !_this3.hasFieldFlag(_util.AnnotationFieldFlag.FILESELECT) && _this3.data.maxLen !== null;
    return _this3;
  }

  _createClass(TextWidgetAnnotation, [{
    key: "getOperatorList",
    value: function getOperatorList(evaluator, task, renderForms) {
      if (renderForms || this.appearance) {
        return _get(_getPrototypeOf(TextWidgetAnnotation.prototype), "getOperatorList", this).call(this, evaluator, task, renderForms);
      }

      var operatorList = new _operator_list.OperatorList();

      if (!this.data.defaultAppearance) {
        return Promise.resolve(operatorList);
      }

      var stream = new _stream.Stream((0, _util.stringToBytes)(this.data.defaultAppearance));
      return evaluator.getOperatorList({
        stream: stream,
        task: task,
        resources: this.fieldResources,
        operatorList: operatorList
      }).then(function () {
        return operatorList;
      });
    }
  }]);

  return TextWidgetAnnotation;
}(WidgetAnnotation);

var ButtonWidgetAnnotation =
/*#__PURE__*/
function (_WidgetAnnotation2) {
  _inherits(ButtonWidgetAnnotation, _WidgetAnnotation2);

  function ButtonWidgetAnnotation(params) {
    var _this4;

    _classCallCheck(this, ButtonWidgetAnnotation);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(ButtonWidgetAnnotation).call(this, params));
    _this4.data.checkBox = !_this4.hasFieldFlag(_util.AnnotationFieldFlag.RADIO) && !_this4.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    _this4.data.radioButton = _this4.hasFieldFlag(_util.AnnotationFieldFlag.RADIO) && !_this4.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);
    _this4.data.pushButton = _this4.hasFieldFlag(_util.AnnotationFieldFlag.PUSHBUTTON);

    if (_this4.data.checkBox) {
      _this4._processCheckBox(params);
    } else if (_this4.data.radioButton) {
      _this4._processRadioButton(params);
    } else if (_this4.data.pushButton) {
      _this4._processPushButton(params);
    } else {
      (0, _util.warn)('Invalid field flags for button widget annotation');
    }

    return _this4;
  }

  _createClass(ButtonWidgetAnnotation, [{
    key: "_processCheckBox",
    value: function _processCheckBox(params) {
      if ((0, _primitives.isName)(this.data.fieldValue)) {
        this.data.fieldValue = this.data.fieldValue.name;
      }

      var customAppearance = params.dict.get('AP');

      if (!(0, _primitives.isDict)(customAppearance)) {
        return;
      }

      var exportValueOptionsDict = customAppearance.get('D');

      if (!(0, _primitives.isDict)(exportValueOptionsDict)) {
        return;
      }

      var exportValues = exportValueOptionsDict.getKeys();
      var hasCorrectOptionCount = exportValues.length === 2;

      if (!hasCorrectOptionCount) {
        return;
      }

      this.data.exportValue = exportValues[0] === 'Off' ? exportValues[1] : exportValues[0];
    }
  }, {
    key: "_processRadioButton",
    value: function _processRadioButton(params) {
      this.data.fieldValue = this.data.buttonValue = null;
      var fieldParent = params.dict.get('Parent');

      if ((0, _primitives.isDict)(fieldParent) && fieldParent.has('V')) {
        var fieldParentValue = fieldParent.get('V');

        if ((0, _primitives.isName)(fieldParentValue)) {
          this.data.fieldValue = fieldParentValue.name;
        }
      }

      var appearanceStates = params.dict.get('AP');

      if (!(0, _primitives.isDict)(appearanceStates)) {
        return;
      }

      var normalAppearanceState = appearanceStates.get('N');

      if (!(0, _primitives.isDict)(normalAppearanceState)) {
        return;
      }

      var keys = normalAppearanceState.getKeys();

      for (var i = 0, ii = keys.length; i < ii; i++) {
        if (keys[i] !== 'Off') {
          this.data.buttonValue = keys[i];
          break;
        }
      }
    }
  }, {
    key: "_processPushButton",
    value: function _processPushButton(params) {
      if (!params.dict.has('A')) {
        (0, _util.warn)('Push buttons without action dictionaries are not supported');
        return;
      }

      _obj.Catalog.parseDestDictionary({
        destDict: params.dict,
        resultObj: this.data,
        docBaseUrl: params.pdfManager.docBaseUrl
      });
    }
  }]);

  return ButtonWidgetAnnotation;
}(WidgetAnnotation);

var ChoiceWidgetAnnotation =
/*#__PURE__*/
function (_WidgetAnnotation3) {
  _inherits(ChoiceWidgetAnnotation, _WidgetAnnotation3);

  function ChoiceWidgetAnnotation(params) {
    var _this5;

    _classCallCheck(this, ChoiceWidgetAnnotation);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ChoiceWidgetAnnotation).call(this, params));
    _this5.data.options = [];
    var options = (0, _util.getInheritableProperty)({
      dict: params.dict,
      key: 'Opt'
    });

    if (Array.isArray(options)) {
      var xref = params.xref;

      for (var i = 0, ii = options.length; i < ii; i++) {
        var option = xref.fetchIfRef(options[i]);
        var isOptionArray = Array.isArray(option);
        _this5.data.options[i] = {
          exportValue: isOptionArray ? xref.fetchIfRef(option[0]) : option,
          displayValue: (0, _util.stringToPDFString)(isOptionArray ? xref.fetchIfRef(option[1]) : option)
        };
      }
    }

    if (!Array.isArray(_this5.data.fieldValue)) {
      _this5.data.fieldValue = [_this5.data.fieldValue];
    }

    _this5.data.combo = _this5.hasFieldFlag(_util.AnnotationFieldFlag.COMBO);
    _this5.data.multiSelect = _this5.hasFieldFlag(_util.AnnotationFieldFlag.MULTISELECT);
    return _this5;
  }

  return ChoiceWidgetAnnotation;
}(WidgetAnnotation);

var TextAnnotation =
/*#__PURE__*/
function (_Annotation2) {
  _inherits(TextAnnotation, _Annotation2);

  function TextAnnotation(parameters) {
    var _this6;

    _classCallCheck(this, TextAnnotation);

    var DEFAULT_ICON_SIZE = 22;
    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(TextAnnotation).call(this, parameters));
    _this6.data.annotationType = _util.AnnotationType.TEXT;

    if (_this6.data.hasAppearance) {
      _this6.data.name = 'NoIcon';
    } else {
      _this6.data.rect[1] = _this6.data.rect[3] - DEFAULT_ICON_SIZE;
      _this6.data.rect[2] = _this6.data.rect[0] + DEFAULT_ICON_SIZE;
      _this6.data.name = parameters.dict.has('Name') ? parameters.dict.get('Name').name : 'Note';
    }

    _this6._preparePopup(parameters.dict);

    return _this6;
  }

  return TextAnnotation;
}(Annotation);

var LinkAnnotation =
/*#__PURE__*/
function (_Annotation3) {
  _inherits(LinkAnnotation, _Annotation3);

  function LinkAnnotation(params) {
    var _this7;

    _classCallCheck(this, LinkAnnotation);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(LinkAnnotation).call(this, params));
    _this7.data.annotationType = _util.AnnotationType.LINK;

    _obj.Catalog.parseDestDictionary({
      destDict: params.dict,
      resultObj: _this7.data,
      docBaseUrl: params.pdfManager.docBaseUrl
    });

    return _this7;
  }

  return LinkAnnotation;
}(Annotation);

var PopupAnnotation =
/*#__PURE__*/
function (_Annotation4) {
  _inherits(PopupAnnotation, _Annotation4);

  function PopupAnnotation(parameters) {
    var _this8;

    _classCallCheck(this, PopupAnnotation);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(PopupAnnotation).call(this, parameters));
    _this8.data.annotationType = _util.AnnotationType.POPUP;
    var dict = parameters.dict;
    var parentItem = dict.get('Parent');

    if (!parentItem) {
      (0, _util.warn)('Popup annotation has a missing or invalid parent annotation.');
      return _possibleConstructorReturn(_this8);
    }

    var parentSubtype = parentItem.get('Subtype');
    _this8.data.parentType = (0, _primitives.isName)(parentSubtype) ? parentSubtype.name : null;
    _this8.data.parentId = dict.getRaw('Parent').toString();
    _this8.data.title = (0, _util.stringToPDFString)(parentItem.get('T') || '');
    _this8.data.contents = (0, _util.stringToPDFString)(parentItem.get('Contents') || '');

    if (!parentItem.has('C')) {
      _this8.data.color = null;
    } else {
      _this8.setColor(parentItem.getArray('C'));

      _this8.data.color = _this8.color;
    }

    if (!_this8.viewable) {
      var parentFlags = parentItem.get('F');

      if (_this8._isViewable(parentFlags)) {
        _this8.setFlags(parentFlags);
      }
    }

    return _this8;
  }

  return PopupAnnotation;
}(Annotation);

var LineAnnotation =
/*#__PURE__*/
function (_Annotation5) {
  _inherits(LineAnnotation, _Annotation5);

  function LineAnnotation(parameters) {
    var _this9;

    _classCallCheck(this, LineAnnotation);

    _this9 = _possibleConstructorReturn(this, _getPrototypeOf(LineAnnotation).call(this, parameters));
    _this9.data.annotationType = _util.AnnotationType.LINE;
    var dict = parameters.dict;
    _this9.data.lineCoordinates = _util.Util.normalizeRect(dict.getArray('L'));

    _this9._preparePopup(dict);

    return _this9;
  }

  return LineAnnotation;
}(Annotation);

var SquareAnnotation =
/*#__PURE__*/
function (_Annotation6) {
  _inherits(SquareAnnotation, _Annotation6);

  function SquareAnnotation(parameters) {
    var _this10;

    _classCallCheck(this, SquareAnnotation);

    _this10 = _possibleConstructorReturn(this, _getPrototypeOf(SquareAnnotation).call(this, parameters));
    _this10.data.annotationType = _util.AnnotationType.SQUARE;

    _this10._preparePopup(parameters.dict);

    return _this10;
  }

  return SquareAnnotation;
}(Annotation);

var CircleAnnotation =
/*#__PURE__*/
function (_Annotation7) {
  _inherits(CircleAnnotation, _Annotation7);

  function CircleAnnotation(parameters) {
    var _this11;

    _classCallCheck(this, CircleAnnotation);

    _this11 = _possibleConstructorReturn(this, _getPrototypeOf(CircleAnnotation).call(this, parameters));
    _this11.data.annotationType = _util.AnnotationType.CIRCLE;

    _this11._preparePopup(parameters.dict);

    return _this11;
  }

  return CircleAnnotation;
}(Annotation);

var PolylineAnnotation =
/*#__PURE__*/
function (_Annotation8) {
  _inherits(PolylineAnnotation, _Annotation8);

  function PolylineAnnotation(parameters) {
    var _this12;

    _classCallCheck(this, PolylineAnnotation);

    _this12 = _possibleConstructorReturn(this, _getPrototypeOf(PolylineAnnotation).call(this, parameters));
    _this12.data.annotationType = _util.AnnotationType.POLYLINE;
    var dict = parameters.dict;
    var rawVertices = dict.getArray('Vertices');
    _this12.data.vertices = [];

    for (var i = 0, ii = rawVertices.length; i < ii; i += 2) {
      _this12.data.vertices.push({
        x: rawVertices[i],
        y: rawVertices[i + 1]
      });
    }

    _this12._preparePopup(dict);

    return _this12;
  }

  return PolylineAnnotation;
}(Annotation);

var PolygonAnnotation =
/*#__PURE__*/
function (_PolylineAnnotation) {
  _inherits(PolygonAnnotation, _PolylineAnnotation);

  function PolygonAnnotation(parameters) {
    var _this13;

    _classCallCheck(this, PolygonAnnotation);

    _this13 = _possibleConstructorReturn(this, _getPrototypeOf(PolygonAnnotation).call(this, parameters));
    _this13.data.annotationType = _util.AnnotationType.POLYGON;
    return _this13;
  }

  return PolygonAnnotation;
}(PolylineAnnotation);

var InkAnnotation =
/*#__PURE__*/
function (_Annotation9) {
  _inherits(InkAnnotation, _Annotation9);

  function InkAnnotation(parameters) {
    var _this14;

    _classCallCheck(this, InkAnnotation);

    _this14 = _possibleConstructorReturn(this, _getPrototypeOf(InkAnnotation).call(this, parameters));
    _this14.data.annotationType = _util.AnnotationType.INK;
    var dict = parameters.dict;
    var xref = parameters.xref;
    var originalInkLists = dict.getArray('InkList');
    _this14.data.inkLists = [];

    for (var i = 0, ii = originalInkLists.length; i < ii; ++i) {
      _this14.data.inkLists.push([]);

      for (var j = 0, jj = originalInkLists[i].length; j < jj; j += 2) {
        _this14.data.inkLists[i].push({
          x: xref.fetchIfRef(originalInkLists[i][j]),
          y: xref.fetchIfRef(originalInkLists[i][j + 1])
        });
      }
    }

    _this14._preparePopup(dict);

    return _this14;
  }

  return InkAnnotation;
}(Annotation);

var HighlightAnnotation =
/*#__PURE__*/
function (_Annotation10) {
  _inherits(HighlightAnnotation, _Annotation10);

  function HighlightAnnotation(parameters) {
    var _this15;

    _classCallCheck(this, HighlightAnnotation);

    _this15 = _possibleConstructorReturn(this, _getPrototypeOf(HighlightAnnotation).call(this, parameters));
    _this15.data.annotationType = _util.AnnotationType.HIGHLIGHT;

    _this15._preparePopup(parameters.dict);

    return _this15;
  }

  return HighlightAnnotation;
}(Annotation);

var UnderlineAnnotation =
/*#__PURE__*/
function (_Annotation11) {
  _inherits(UnderlineAnnotation, _Annotation11);

  function UnderlineAnnotation(parameters) {
    var _this16;

    _classCallCheck(this, UnderlineAnnotation);

    _this16 = _possibleConstructorReturn(this, _getPrototypeOf(UnderlineAnnotation).call(this, parameters));
    _this16.data.annotationType = _util.AnnotationType.UNDERLINE;

    _this16._preparePopup(parameters.dict);

    return _this16;
  }

  return UnderlineAnnotation;
}(Annotation);

var SquigglyAnnotation =
/*#__PURE__*/
function (_Annotation12) {
  _inherits(SquigglyAnnotation, _Annotation12);

  function SquigglyAnnotation(parameters) {
    var _this17;

    _classCallCheck(this, SquigglyAnnotation);

    _this17 = _possibleConstructorReturn(this, _getPrototypeOf(SquigglyAnnotation).call(this, parameters));
    _this17.data.annotationType = _util.AnnotationType.SQUIGGLY;

    _this17._preparePopup(parameters.dict);

    return _this17;
  }

  return SquigglyAnnotation;
}(Annotation);

var StrikeOutAnnotation =
/*#__PURE__*/
function (_Annotation13) {
  _inherits(StrikeOutAnnotation, _Annotation13);

  function StrikeOutAnnotation(parameters) {
    var _this18;

    _classCallCheck(this, StrikeOutAnnotation);

    _this18 = _possibleConstructorReturn(this, _getPrototypeOf(StrikeOutAnnotation).call(this, parameters));
    _this18.data.annotationType = _util.AnnotationType.STRIKEOUT;

    _this18._preparePopup(parameters.dict);

    return _this18;
  }

  return StrikeOutAnnotation;
}(Annotation);

var StampAnnotation =
/*#__PURE__*/
function (_Annotation14) {
  _inherits(StampAnnotation, _Annotation14);

  function StampAnnotation(parameters) {
    var _this19;

    _classCallCheck(this, StampAnnotation);

    _this19 = _possibleConstructorReturn(this, _getPrototypeOf(StampAnnotation).call(this, parameters));
    _this19.data.annotationType = _util.AnnotationType.STAMP;

    _this19._preparePopup(parameters.dict);

    return _this19;
  }

  return StampAnnotation;
}(Annotation);

var FileAttachmentAnnotation =
/*#__PURE__*/
function (_Annotation15) {
  _inherits(FileAttachmentAnnotation, _Annotation15);

  function FileAttachmentAnnotation(parameters) {
    var _this20;

    _classCallCheck(this, FileAttachmentAnnotation);

    _this20 = _possibleConstructorReturn(this, _getPrototypeOf(FileAttachmentAnnotation).call(this, parameters));
    var file = new _obj.FileSpec(parameters.dict.get('FS'), parameters.xref);
    _this20.data.annotationType = _util.AnnotationType.FILEATTACHMENT;
    _this20.data.file = file.serializable;

    _this20._preparePopup(parameters.dict);

    return _this20;
  }

  return FileAttachmentAnnotation;
}(Annotation);