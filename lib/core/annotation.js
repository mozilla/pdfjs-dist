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

var sharedUtil = require('../shared/util.js');
var corePrimitives = require('./primitives.js');
var coreStream = require('./stream.js');
var coreColorSpace = require('./colorspace.js');
var coreObj = require('./obj.js');
var coreEvaluator = require('./evaluator.js');
var AnnotationBorderStyleType = sharedUtil.AnnotationBorderStyleType;
var AnnotationFieldFlag = sharedUtil.AnnotationFieldFlag;
var AnnotationFlag = sharedUtil.AnnotationFlag;
var AnnotationType = sharedUtil.AnnotationType;
var OPS = sharedUtil.OPS;
var Util = sharedUtil.Util;
var isArray = sharedUtil.isArray;
var isInt = sharedUtil.isInt;
var stringToBytes = sharedUtil.stringToBytes;
var stringToPDFString = sharedUtil.stringToPDFString;
var warn = sharedUtil.warn;
var Dict = corePrimitives.Dict;
var isDict = corePrimitives.isDict;
var isName = corePrimitives.isName;
var isRef = corePrimitives.isRef;
var isStream = corePrimitives.isStream;
var Stream = coreStream.Stream;
var ColorSpace = coreColorSpace.ColorSpace;
var Catalog = coreObj.Catalog;
var ObjectLoader = coreObj.ObjectLoader;
var FileSpec = coreObj.FileSpec;
var OperatorList = coreEvaluator.OperatorList;
function AnnotationFactory() {}
AnnotationFactory.prototype = {
  create: function AnnotationFactory_create(xref, ref, pdfManager, idFactory) {
    var dict = xref.fetchIfRef(ref);
    if (!isDict(dict)) {
      return;
    }
    var id = isRef(ref) ? ref.toString() : 'annot_' + idFactory.createObjId();
    var subtype = dict.get('Subtype');
    subtype = isName(subtype) ? subtype.name : null;
    var parameters = {
      xref: xref,
      dict: dict,
      ref: isRef(ref) ? ref : null,
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
        var fieldType = Util.getInheritableProperty(dict, 'FT');
        fieldType = isName(fieldType) ? fieldType.name : null;
        switch (fieldType) {
          case 'Tx':
            return new TextWidgetAnnotation(parameters);
          case 'Btn':
            return new ButtonWidgetAnnotation(parameters);
          case 'Ch':
            return new ChoiceWidgetAnnotation(parameters);
        }
        warn('Unimplemented widget field type "' + fieldType + '", ' + 'falling back to base field type.');
        return new WidgetAnnotation(parameters);
      case 'Popup':
        return new PopupAnnotation(parameters);
      case 'Line':
        return new LineAnnotation(parameters);
      case 'Highlight':
        return new HighlightAnnotation(parameters);
      case 'Underline':
        return new UnderlineAnnotation(parameters);
      case 'Squiggly':
        return new SquigglyAnnotation(parameters);
      case 'StrikeOut':
        return new StrikeOutAnnotation(parameters);
      case 'FileAttachment':
        return new FileAttachmentAnnotation(parameters);
      default:
        if (!subtype) {
          warn('Annotation is missing the required /Subtype.');
        } else {
          warn('Unimplemented annotation type "' + subtype + '", ' + 'falling back to base annotation.');
        }
        return new Annotation(parameters);
    }
  }
};
var Annotation = function AnnotationClosure() {
  function getTransformMatrix(rect, bbox, matrix) {
    var bounds = Util.getAxialAlignedBoundingBox(bbox, matrix);
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
  function Annotation(params) {
    var dict = params.dict;
    this.setFlags(dict.get('F'));
    this.setRectangle(dict.getArray('Rect'));
    this.setColor(dict.getArray('C'));
    this.setBorderStyle(dict);
    this.setAppearance(dict);
    this.data = {};
    this.data.id = params.id;
    this.data.subtype = params.subtype;
    this.data.annotationFlags = this.flags;
    this.data.rect = this.rectangle;
    this.data.color = this.color;
    this.data.borderStyle = this.borderStyle;
    this.data.hasAppearance = !!this.appearance;
  }
  Annotation.prototype = {
    _hasFlag: function Annotation_hasFlag(flags, flag) {
      return !!(flags & flag);
    },
    _isViewable: function Annotation_isViewable(flags) {
      return !this._hasFlag(flags, AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, AnnotationFlag.HIDDEN) && !this._hasFlag(flags, AnnotationFlag.NOVIEW);
    },
    _isPrintable: function AnnotationFlag_isPrintable(flags) {
      return this._hasFlag(flags, AnnotationFlag.PRINT) && !this._hasFlag(flags, AnnotationFlag.INVISIBLE) && !this._hasFlag(flags, AnnotationFlag.HIDDEN);
    },
    get viewable() {
      if (this.flags === 0) {
        return true;
      }
      return this._isViewable(this.flags);
    },
    get printable() {
      if (this.flags === 0) {
        return false;
      }
      return this._isPrintable(this.flags);
    },
    setFlags: function Annotation_setFlags(flags) {
      this.flags = isInt(flags) && flags > 0 ? flags : 0;
    },
    hasFlag: function Annotation_hasFlag(flag) {
      return this._hasFlag(this.flags, flag);
    },
    setRectangle: function Annotation_setRectangle(rectangle) {
      if (isArray(rectangle) && rectangle.length === 4) {
        this.rectangle = Util.normalizeRect(rectangle);
      } else {
        this.rectangle = [0, 0, 0, 0];
      }
    },
    setColor: function Annotation_setColor(color) {
      var rgbColor = new Uint8Array(3);
      if (!isArray(color)) {
        this.color = rgbColor;
        return;
      }
      switch (color.length) {
        case 0:
          this.color = null;
          break;
        case 1:
          ColorSpace.singletons.gray.getRgbItem(color, 0, rgbColor, 0);
          this.color = rgbColor;
          break;
        case 3:
          ColorSpace.singletons.rgb.getRgbItem(color, 0, rgbColor, 0);
          this.color = rgbColor;
          break;
        case 4:
          ColorSpace.singletons.cmyk.getRgbItem(color, 0, rgbColor, 0);
          this.color = rgbColor;
          break;
        default:
          this.color = rgbColor;
          break;
      }
    },
    setBorderStyle: function Annotation_setBorderStyle(borderStyle) {
      this.borderStyle = new AnnotationBorderStyle();
      if (!isDict(borderStyle)) {
        return;
      }
      if (borderStyle.has('BS')) {
        var dict = borderStyle.get('BS');
        var dictType = dict.get('Type');
        if (!dictType || isName(dictType, 'Border')) {
          this.borderStyle.setWidth(dict.get('W'));
          this.borderStyle.setStyle(dict.get('S'));
          this.borderStyle.setDashArray(dict.getArray('D'));
        }
      } else if (borderStyle.has('Border')) {
        var array = borderStyle.getArray('Border');
        if (isArray(array) && array.length >= 3) {
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
    },
    setAppearance: function Annotation_setAppearance(dict) {
      this.appearance = null;
      var appearanceStates = dict.get('AP');
      if (!isDict(appearanceStates)) {
        return;
      }
      var normalAppearanceState = appearanceStates.get('N');
      if (isStream(normalAppearanceState)) {
        this.appearance = normalAppearanceState;
        return;
      }
      if (!isDict(normalAppearanceState)) {
        return;
      }
      var as = dict.get('AS');
      if (!isName(as) || !normalAppearanceState.has(as.name)) {
        return;
      }
      this.appearance = normalAppearanceState.get(as.name);
    },
    _preparePopup: function Annotation_preparePopup(dict) {
      if (!dict.has('C')) {
        this.data.color = null;
      }
      this.data.hasPopup = dict.has('Popup');
      this.data.title = stringToPDFString(dict.get('T') || '');
      this.data.contents = stringToPDFString(dict.get('Contents') || '');
    },
    loadResources: function Annotation_loadResources(keys) {
      return this.appearance.dict.getAsync('Resources').then(function (resources) {
        if (!resources) {
          return;
        }
        var objectLoader = new ObjectLoader(resources.map, keys, resources.xref);
        return objectLoader.load().then(function () {
          return resources;
        });
      });
    },
    getOperatorList: function Annotation_getOperatorList(evaluator, task, renderForms) {
      var _this = this;

      if (!this.appearance) {
        return Promise.resolve(new OperatorList());
      }
      var data = this.data;
      var appearanceDict = this.appearance.dict;
      var resourcesPromise = this.loadResources(['ExtGState', 'ColorSpace', 'Pattern', 'Shading', 'XObject', 'Font']);
      var bbox = appearanceDict.getArray('BBox') || [0, 0, 1, 1];
      var matrix = appearanceDict.getArray('Matrix') || [1, 0, 0, 1, 0, 0];
      var transform = getTransformMatrix(data.rect, bbox, matrix);
      return resourcesPromise.then(function (resources) {
        var opList = new OperatorList();
        opList.addOp(OPS.beginAnnotation, [data.rect, transform, matrix]);
        return evaluator.getOperatorList({
          stream: _this.appearance,
          task: task,
          resources: resources,
          operatorList: opList
        }).then(function () {
          opList.addOp(OPS.endAnnotation, []);
          _this.appearance.reset();
          return opList;
        });
      });
    }
  };
  return Annotation;
}();
var AnnotationBorderStyle = function AnnotationBorderStyleClosure() {
  function AnnotationBorderStyle() {
    this.width = 1;
    this.style = AnnotationBorderStyleType.SOLID;
    this.dashArray = [3];
    this.horizontalCornerRadius = 0;
    this.verticalCornerRadius = 0;
  }
  AnnotationBorderStyle.prototype = {
    setWidth: function AnnotationBorderStyle_setWidth(width) {
      if (width === (width | 0)) {
        this.width = width;
      }
    },
    setStyle: function AnnotationBorderStyle_setStyle(style) {
      if (!style) {
        return;
      }
      switch (style.name) {
        case 'S':
          this.style = AnnotationBorderStyleType.SOLID;
          break;
        case 'D':
          this.style = AnnotationBorderStyleType.DASHED;
          break;
        case 'B':
          this.style = AnnotationBorderStyleType.BEVELED;
          break;
        case 'I':
          this.style = AnnotationBorderStyleType.INSET;
          break;
        case 'U':
          this.style = AnnotationBorderStyleType.UNDERLINE;
          break;
        default:
          break;
      }
    },
    setDashArray: function AnnotationBorderStyle_setDashArray(dashArray) {
      if (isArray(dashArray) && dashArray.length > 0) {
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
    },
    setHorizontalCornerRadius: function AnnotationBorderStyle_setHorizontalCornerRadius(radius) {
      if (radius === (radius | 0)) {
        this.horizontalCornerRadius = radius;
      }
    },
    setVerticalCornerRadius: function AnnotationBorderStyle_setVerticalCornerRadius(radius) {
      if (radius === (radius | 0)) {
        this.verticalCornerRadius = radius;
      }
    }
  };
  return AnnotationBorderStyle;
}();
var WidgetAnnotation = function WidgetAnnotationClosure() {
  function WidgetAnnotation(params) {
    Annotation.call(this, params);
    var dict = params.dict;
    var data = this.data;
    data.annotationType = AnnotationType.WIDGET;
    data.fieldName = this._constructFieldName(dict);
    data.fieldValue = Util.getInheritableProperty(dict, 'V', true);
    data.alternativeText = stringToPDFString(dict.get('TU') || '');
    data.defaultAppearance = Util.getInheritableProperty(dict, 'DA') || '';
    var fieldType = Util.getInheritableProperty(dict, 'FT');
    data.fieldType = isName(fieldType) ? fieldType.name : null;
    this.fieldResources = Util.getInheritableProperty(dict, 'DR') || Dict.empty;
    data.fieldFlags = Util.getInheritableProperty(dict, 'Ff');
    if (!isInt(data.fieldFlags) || data.fieldFlags < 0) {
      data.fieldFlags = 0;
    }
    data.readOnly = this.hasFieldFlag(AnnotationFieldFlag.READONLY);
    if (data.fieldType === 'Sig') {
      this.setFlags(AnnotationFlag.HIDDEN);
    }
  }
  Util.inherit(WidgetAnnotation, Annotation, {
    _constructFieldName: function WidgetAnnotation_constructFieldName(dict) {
      if (!dict.has('T') && !dict.has('Parent')) {
        warn('Unknown field name, falling back to empty field name.');
        return '';
      }
      if (!dict.has('Parent')) {
        return stringToPDFString(dict.get('T'));
      }
      var fieldName = [];
      if (dict.has('T')) {
        fieldName.unshift(stringToPDFString(dict.get('T')));
      }
      var loopDict = dict;
      while (loopDict.has('Parent')) {
        loopDict = loopDict.get('Parent');
        if (!isDict(loopDict)) {
          break;
        }
        if (loopDict.has('T')) {
          fieldName.unshift(stringToPDFString(loopDict.get('T')));
        }
      }
      return fieldName.join('.');
    },
    hasFieldFlag: function WidgetAnnotation_hasFieldFlag(flag) {
      return !!(this.data.fieldFlags & flag);
    }
  });
  return WidgetAnnotation;
}();
var TextWidgetAnnotation = function TextWidgetAnnotationClosure() {
  function TextWidgetAnnotation(params) {
    WidgetAnnotation.call(this, params);
    this.data.fieldValue = stringToPDFString(this.data.fieldValue || '');
    var alignment = Util.getInheritableProperty(params.dict, 'Q');
    if (!isInt(alignment) || alignment < 0 || alignment > 2) {
      alignment = null;
    }
    this.data.textAlignment = alignment;
    var maximumLength = Util.getInheritableProperty(params.dict, 'MaxLen');
    if (!isInt(maximumLength) || maximumLength < 0) {
      maximumLength = null;
    }
    this.data.maxLen = maximumLength;
    this.data.multiLine = this.hasFieldFlag(AnnotationFieldFlag.MULTILINE);
    this.data.comb = this.hasFieldFlag(AnnotationFieldFlag.COMB) && !this.hasFieldFlag(AnnotationFieldFlag.MULTILINE) && !this.hasFieldFlag(AnnotationFieldFlag.PASSWORD) && !this.hasFieldFlag(AnnotationFieldFlag.FILESELECT) && this.data.maxLen !== null;
  }
  Util.inherit(TextWidgetAnnotation, WidgetAnnotation, {
    getOperatorList: function TextWidgetAnnotation_getOperatorList(evaluator, task, renderForms) {
      var operatorList = new OperatorList();
      if (renderForms) {
        return Promise.resolve(operatorList);
      }
      if (this.appearance) {
        return Annotation.prototype.getOperatorList.call(this, evaluator, task, renderForms);
      }
      if (!this.data.defaultAppearance) {
        return Promise.resolve(operatorList);
      }
      var stream = new Stream(stringToBytes(this.data.defaultAppearance));
      return evaluator.getOperatorList({
        stream: stream,
        task: task,
        resources: this.fieldResources,
        operatorList: operatorList
      }).then(function () {
        return operatorList;
      });
    }
  });
  return TextWidgetAnnotation;
}();
var ButtonWidgetAnnotation = function ButtonWidgetAnnotationClosure() {
  function ButtonWidgetAnnotation(params) {
    WidgetAnnotation.call(this, params);
    this.data.checkBox = !this.hasFieldFlag(AnnotationFieldFlag.RADIO) && !this.hasFieldFlag(AnnotationFieldFlag.PUSHBUTTON);
    if (this.data.checkBox) {
      if (!isName(this.data.fieldValue)) {
        return;
      }
      this.data.fieldValue = this.data.fieldValue.name;
    }
    this.data.radioButton = this.hasFieldFlag(AnnotationFieldFlag.RADIO) && !this.hasFieldFlag(AnnotationFieldFlag.PUSHBUTTON);
    if (this.data.radioButton) {
      this.data.fieldValue = this.data.buttonValue = null;
      var fieldParent = params.dict.get('Parent');
      if (isDict(fieldParent) && fieldParent.has('V')) {
        var fieldParentValue = fieldParent.get('V');
        if (isName(fieldParentValue)) {
          this.data.fieldValue = fieldParentValue.name;
        }
      }
      var appearanceStates = params.dict.get('AP');
      if (!isDict(appearanceStates)) {
        return;
      }
      var normalAppearanceState = appearanceStates.get('N');
      if (!isDict(normalAppearanceState)) {
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
  }
  Util.inherit(ButtonWidgetAnnotation, WidgetAnnotation, {
    getOperatorList: function ButtonWidgetAnnotation_getOperatorList(evaluator, task, renderForms) {
      var operatorList = new OperatorList();
      if (renderForms) {
        return Promise.resolve(operatorList);
      }
      if (this.appearance) {
        return Annotation.prototype.getOperatorList.call(this, evaluator, task, renderForms);
      }
      return Promise.resolve(operatorList);
    }
  });
  return ButtonWidgetAnnotation;
}();
var ChoiceWidgetAnnotation = function ChoiceWidgetAnnotationClosure() {
  function ChoiceWidgetAnnotation(params) {
    WidgetAnnotation.call(this, params);
    this.data.options = [];
    var options = Util.getInheritableProperty(params.dict, 'Opt');
    if (isArray(options)) {
      var xref = params.xref;
      for (var i = 0, ii = options.length; i < ii; i++) {
        var option = xref.fetchIfRef(options[i]);
        var isOptionArray = isArray(option);
        this.data.options[i] = {
          exportValue: isOptionArray ? xref.fetchIfRef(option[0]) : option,
          displayValue: isOptionArray ? xref.fetchIfRef(option[1]) : option
        };
      }
    }
    if (!isArray(this.data.fieldValue)) {
      this.data.fieldValue = [this.data.fieldValue];
    }
    this.data.combo = this.hasFieldFlag(AnnotationFieldFlag.COMBO);
    this.data.multiSelect = this.hasFieldFlag(AnnotationFieldFlag.MULTISELECT);
  }
  Util.inherit(ChoiceWidgetAnnotation, WidgetAnnotation, {
    getOperatorList: function ChoiceWidgetAnnotation_getOperatorList(evaluator, task, renderForms) {
      var operatorList = new OperatorList();
      if (renderForms) {
        return Promise.resolve(operatorList);
      }
      return Annotation.prototype.getOperatorList.call(this, evaluator, task, renderForms);
    }
  });
  return ChoiceWidgetAnnotation;
}();
var TextAnnotation = function TextAnnotationClosure() {
  var DEFAULT_ICON_SIZE = 22;
  function TextAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.TEXT;
    if (this.data.hasAppearance) {
      this.data.name = 'NoIcon';
    } else {
      this.data.rect[1] = this.data.rect[3] - DEFAULT_ICON_SIZE;
      this.data.rect[2] = this.data.rect[0] + DEFAULT_ICON_SIZE;
      this.data.name = parameters.dict.has('Name') ? parameters.dict.get('Name').name : 'Note';
    }
    this._preparePopup(parameters.dict);
  }
  Util.inherit(TextAnnotation, Annotation, {});
  return TextAnnotation;
}();
var LinkAnnotation = function LinkAnnotationClosure() {
  function LinkAnnotation(params) {
    Annotation.call(this, params);
    var data = this.data;
    data.annotationType = AnnotationType.LINK;
    Catalog.parseDestDictionary({
      destDict: params.dict,
      resultObj: data,
      docBaseUrl: params.pdfManager.docBaseUrl
    });
  }
  Util.inherit(LinkAnnotation, Annotation, {});
  return LinkAnnotation;
}();
var PopupAnnotation = function PopupAnnotationClosure() {
  function PopupAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.POPUP;
    var dict = parameters.dict;
    var parentItem = dict.get('Parent');
    if (!parentItem) {
      warn('Popup annotation has a missing or invalid parent annotation.');
      return;
    }
    var parentSubtype = parentItem.get('Subtype');
    this.data.parentType = isName(parentSubtype) ? parentSubtype.name : null;
    this.data.parentId = dict.getRaw('Parent').toString();
    this.data.title = stringToPDFString(parentItem.get('T') || '');
    this.data.contents = stringToPDFString(parentItem.get('Contents') || '');
    if (!parentItem.has('C')) {
      this.data.color = null;
    } else {
      this.setColor(parentItem.getArray('C'));
      this.data.color = this.color;
    }
    if (!this.viewable) {
      var parentFlags = parentItem.get('F');
      if (this._isViewable(parentFlags)) {
        this.setFlags(parentFlags);
      }
    }
  }
  Util.inherit(PopupAnnotation, Annotation, {});
  return PopupAnnotation;
}();
var LineAnnotation = function LineAnnotationClosure() {
  function LineAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.LINE;
    var dict = parameters.dict;
    this.data.lineCoordinates = Util.normalizeRect(dict.getArray('L'));
    this._preparePopup(dict);
  }
  Util.inherit(LineAnnotation, Annotation, {});
  return LineAnnotation;
}();
var HighlightAnnotation = function HighlightAnnotationClosure() {
  function HighlightAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.HIGHLIGHT;
    this._preparePopup(parameters.dict);
  }
  Util.inherit(HighlightAnnotation, Annotation, {});
  return HighlightAnnotation;
}();
var UnderlineAnnotation = function UnderlineAnnotationClosure() {
  function UnderlineAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.UNDERLINE;
    this._preparePopup(parameters.dict);
  }
  Util.inherit(UnderlineAnnotation, Annotation, {});
  return UnderlineAnnotation;
}();
var SquigglyAnnotation = function SquigglyAnnotationClosure() {
  function SquigglyAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.SQUIGGLY;
    this._preparePopup(parameters.dict);
  }
  Util.inherit(SquigglyAnnotation, Annotation, {});
  return SquigglyAnnotation;
}();
var StrikeOutAnnotation = function StrikeOutAnnotationClosure() {
  function StrikeOutAnnotation(parameters) {
    Annotation.call(this, parameters);
    this.data.annotationType = AnnotationType.STRIKEOUT;
    this._preparePopup(parameters.dict);
  }
  Util.inherit(StrikeOutAnnotation, Annotation, {});
  return StrikeOutAnnotation;
}();
var FileAttachmentAnnotation = function FileAttachmentAnnotationClosure() {
  function FileAttachmentAnnotation(parameters) {
    Annotation.call(this, parameters);
    var file = new FileSpec(parameters.dict.get('FS'), parameters.xref);
    this.data.annotationType = AnnotationType.FILEATTACHMENT;
    this.data.file = file.serializable;
    this._preparePopup(parameters.dict);
  }
  Util.inherit(FileAttachmentAnnotation, Annotation, {});
  return FileAttachmentAnnotation;
}();
exports.Annotation = Annotation;
exports.AnnotationBorderStyle = AnnotationBorderStyle;
exports.AnnotationFactory = AnnotationFactory;