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
var coreObj = require('./obj.js');
var coreParser = require('./parser.js');
var coreCrypto = require('./crypto.js');
var coreEvaluator = require('./evaluator.js');
var coreAnnotation = require('./annotation.js');
var OPS = sharedUtil.OPS;
var MissingDataException = sharedUtil.MissingDataException;
var Util = sharedUtil.Util;
var assert = sharedUtil.assert;
var error = sharedUtil.error;
var info = sharedUtil.info;
var isArray = sharedUtil.isArray;
var isArrayBuffer = sharedUtil.isArrayBuffer;
var isNum = sharedUtil.isNum;
var isString = sharedUtil.isString;
var shadow = sharedUtil.shadow;
var stringToBytes = sharedUtil.stringToBytes;
var stringToPDFString = sharedUtil.stringToPDFString;
var warn = sharedUtil.warn;
var isSpace = sharedUtil.isSpace;
var Dict = corePrimitives.Dict;
var isDict = corePrimitives.isDict;
var isName = corePrimitives.isName;
var isStream = corePrimitives.isStream;
var NullStream = coreStream.NullStream;
var Stream = coreStream.Stream;
var StreamsSequenceStream = coreStream.StreamsSequenceStream;
var Catalog = coreObj.Catalog;
var ObjectLoader = coreObj.ObjectLoader;
var XRef = coreObj.XRef;
var Linearization = coreParser.Linearization;
var calculateMD5 = coreCrypto.calculateMD5;
var OperatorList = coreEvaluator.OperatorList;
var PartialEvaluator = coreEvaluator.PartialEvaluator;
var AnnotationFactory = coreAnnotation.AnnotationFactory;
var Page = function PageClosure() {
  var DEFAULT_USER_UNIT = 1.0;
  var LETTER_SIZE_MEDIABOX = [0, 0, 612, 792];
  function isAnnotationRenderable(annotation, intent) {
    return intent === 'display' && annotation.viewable || intent === 'print' && annotation.printable;
  }
  function Page(pdfManager, xref, pageIndex, pageDict, ref, fontCache, builtInCMapCache) {
    this.pdfManager = pdfManager;
    this.pageIndex = pageIndex;
    this.pageDict = pageDict;
    this.xref = xref;
    this.ref = ref;
    this.fontCache = fontCache;
    this.builtInCMapCache = builtInCMapCache;
    this.evaluatorOptions = pdfManager.evaluatorOptions;
    this.resourcesPromise = null;
    var uniquePrefix = 'p' + this.pageIndex + '_';
    var idCounters = { obj: 0 };
    this.idFactory = {
      createObjId: function () {
        return uniquePrefix + ++idCounters.obj;
      }
    };
  }
  Page.prototype = {
    getPageProp: function Page_getPageProp(key) {
      return this.pageDict.get(key);
    },
    getInheritedPageProp: function Page_getInheritedPageProp(key, getArray) {
      var dict = this.pageDict,
          valueArray = null,
          loopCount = 0;
      var MAX_LOOP_COUNT = 100;
      getArray = getArray || false;
      while (dict) {
        var value = getArray ? dict.getArray(key) : dict.get(key);
        if (value !== undefined) {
          if (!valueArray) {
            valueArray = [];
          }
          valueArray.push(value);
        }
        if (++loopCount > MAX_LOOP_COUNT) {
          warn('getInheritedPageProp: maximum loop count exceeded for ' + key);
          return valueArray ? valueArray[0] : undefined;
        }
        dict = dict.get('Parent');
      }
      if (!valueArray) {
        return undefined;
      }
      if (valueArray.length === 1 || !isDict(valueArray[0])) {
        return valueArray[0];
      }
      return Dict.merge(this.xref, valueArray);
    },
    get content() {
      return this.getPageProp('Contents');
    },
    get resources() {
      return shadow(this, 'resources', this.getInheritedPageProp('Resources') || Dict.empty);
    },
    get mediaBox() {
      var mediaBox = this.getInheritedPageProp('MediaBox', true);
      if (!isArray(mediaBox) || mediaBox.length !== 4) {
        return shadow(this, 'mediaBox', LETTER_SIZE_MEDIABOX);
      }
      return shadow(this, 'mediaBox', mediaBox);
    },
    get cropBox() {
      var cropBox = this.getInheritedPageProp('CropBox', true);
      if (!isArray(cropBox) || cropBox.length !== 4) {
        return shadow(this, 'cropBox', this.mediaBox);
      }
      return shadow(this, 'cropBox', cropBox);
    },
    get userUnit() {
      var obj = this.getPageProp('UserUnit');
      if (!isNum(obj) || obj <= 0) {
        obj = DEFAULT_USER_UNIT;
      }
      return shadow(this, 'userUnit', obj);
    },
    get view() {
      var mediaBox = this.mediaBox,
          cropBox = this.cropBox;
      if (mediaBox === cropBox) {
        return shadow(this, 'view', mediaBox);
      }
      var intersection = Util.intersect(cropBox, mediaBox);
      return shadow(this, 'view', intersection || mediaBox);
    },
    get rotate() {
      var rotate = this.getInheritedPageProp('Rotate') || 0;
      if (rotate % 90 !== 0) {
        rotate = 0;
      } else if (rotate >= 360) {
        rotate = rotate % 360;
      } else if (rotate < 0) {
        rotate = (rotate % 360 + 360) % 360;
      }
      return shadow(this, 'rotate', rotate);
    },
    getContentStream: function Page_getContentStream() {
      var content = this.content;
      var stream;
      if (isArray(content)) {
        var xref = this.xref;
        var i,
            n = content.length;
        var streams = [];
        for (i = 0; i < n; ++i) {
          streams.push(xref.fetchIfRef(content[i]));
        }
        stream = new StreamsSequenceStream(streams);
      } else if (isStream(content)) {
        stream = content;
      } else {
        stream = new NullStream();
      }
      return stream;
    },
    loadResources: function Page_loadResources(keys) {
      if (!this.resourcesPromise) {
        this.resourcesPromise = this.pdfManager.ensure(this, 'resources');
      }
      return this.resourcesPromise.then(function resourceSuccess() {
        var objectLoader = new ObjectLoader(this.resources.map, keys, this.xref);
        return objectLoader.load();
      }.bind(this));
    },
    getOperatorList: function Page_getOperatorList(handler, task, intent, renderInteractiveForms) {
      var self = this;
      var pdfManager = this.pdfManager;
      var contentStreamPromise = pdfManager.ensure(this, 'getContentStream', []);
      var resourcesPromise = this.loadResources(['ExtGState', 'ColorSpace', 'Pattern', 'Shading', 'XObject', 'Font']);
      var partialEvaluator = new PartialEvaluator(pdfManager, this.xref, handler, this.pageIndex, this.idFactory, this.fontCache, this.builtInCMapCache, this.evaluatorOptions);
      var dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
      var pageListPromise = dataPromises.then(function (data) {
        var contentStream = data[0];
        var opList = new OperatorList(intent, handler, self.pageIndex);
        handler.send('StartRenderPage', {
          transparency: partialEvaluator.hasBlendModes(self.resources),
          pageIndex: self.pageIndex,
          intent: intent
        });
        return partialEvaluator.getOperatorList(contentStream, task, self.resources, opList).then(function () {
          return opList;
        });
      });
      var annotationsPromise = pdfManager.ensure(this, 'annotations');
      return Promise.all([pageListPromise, annotationsPromise]).then(function (datas) {
        var pageOpList = datas[0];
        var annotations = datas[1];
        if (annotations.length === 0) {
          pageOpList.flush(true);
          return pageOpList;
        }
        var i,
            ii,
            opListPromises = [];
        for (i = 0, ii = annotations.length; i < ii; i++) {
          if (isAnnotationRenderable(annotations[i], intent)) {
            opListPromises.push(annotations[i].getOperatorList(partialEvaluator, task, renderInteractiveForms));
          }
        }
        return Promise.all(opListPromises).then(function (opLists) {
          pageOpList.addOp(OPS.beginAnnotations, []);
          for (i = 0, ii = opLists.length; i < ii; i++) {
            pageOpList.addOpList(opLists[i]);
          }
          pageOpList.addOp(OPS.endAnnotations, []);
          pageOpList.flush(true);
          return pageOpList;
        });
      });
    },
    extractTextContent: function Page_extractTextContent(handler, task, normalizeWhitespace, combineTextItems) {
      var self = this;
      var pdfManager = this.pdfManager;
      var contentStreamPromise = pdfManager.ensure(this, 'getContentStream', []);
      var resourcesPromise = this.loadResources(['ExtGState', 'XObject', 'Font']);
      var dataPromises = Promise.all([contentStreamPromise, resourcesPromise]);
      return dataPromises.then(function (data) {
        var contentStream = data[0];
        var partialEvaluator = new PartialEvaluator(pdfManager, self.xref, handler, self.pageIndex, self.idFactory, self.fontCache, self.builtInCMapCache, self.evaluatorOptions);
        return partialEvaluator.getTextContent(contentStream, task, self.resources, null, normalizeWhitespace, combineTextItems);
      });
    },
    getAnnotationsData: function Page_getAnnotationsData(intent) {
      var annotations = this.annotations;
      var annotationsData = [];
      for (var i = 0, n = annotations.length; i < n; ++i) {
        if (!intent || isAnnotationRenderable(annotations[i], intent)) {
          annotationsData.push(annotations[i].data);
        }
      }
      return annotationsData;
    },
    get annotations() {
      var annotations = [];
      var annotationRefs = this.getInheritedPageProp('Annots') || [];
      var annotationFactory = new AnnotationFactory();
      for (var i = 0, n = annotationRefs.length; i < n; ++i) {
        var annotationRef = annotationRefs[i];
        var annotation = annotationFactory.create(this.xref, annotationRef, this.pdfManager, this.idFactory);
        if (annotation) {
          annotations.push(annotation);
        }
      }
      return shadow(this, 'annotations', annotations);
    }
  };
  return Page;
}();
var PDFDocument = function PDFDocumentClosure() {
  var FINGERPRINT_FIRST_BYTES = 1024;
  var EMPTY_FINGERPRINT = '\x00\x00\x00\x00\x00\x00\x00' + '\x00\x00\x00\x00\x00\x00\x00\x00\x00';
  function PDFDocument(pdfManager, arg) {
    var stream;
    if (isStream(arg)) {
      stream = arg;
    } else if (isArrayBuffer(arg)) {
      stream = new Stream(arg);
    } else {
      error('PDFDocument: Unknown argument type');
    }
    assert(stream.length > 0, 'stream must have data');
    this.pdfManager = pdfManager;
    this.stream = stream;
    this.xref = new XRef(stream, pdfManager);
  }
  function find(stream, needle, limit, backwards) {
    var pos = stream.pos;
    var end = stream.end;
    var strBuf = [];
    if (pos + limit > end) {
      limit = end - pos;
    }
    for (var n = 0; n < limit; ++n) {
      strBuf.push(String.fromCharCode(stream.getByte()));
    }
    var str = strBuf.join('');
    stream.pos = pos;
    var index = backwards ? str.lastIndexOf(needle) : str.indexOf(needle);
    if (index === -1) {
      return false;
    }
    stream.pos += index;
    return true;
  }
  var DocumentInfoValidators = {
    get entries() {
      return shadow(this, 'entries', {
        Title: isString,
        Author: isString,
        Subject: isString,
        Keywords: isString,
        Creator: isString,
        Producer: isString,
        CreationDate: isString,
        ModDate: isString,
        Trapped: isName
      });
    }
  };
  PDFDocument.prototype = {
    parse: function PDFDocument_parse(recoveryMode) {
      this.setup(recoveryMode);
      var version = this.catalog.catDict.get('Version');
      if (isName(version)) {
        this.pdfFormatVersion = version.name;
      }
      try {
        this.acroForm = this.catalog.catDict.get('AcroForm');
        if (this.acroForm) {
          this.xfa = this.acroForm.get('XFA');
          var fields = this.acroForm.get('Fields');
          if ((!fields || !isArray(fields) || fields.length === 0) && !this.xfa) {
            this.acroForm = null;
          }
        }
      } catch (ex) {
        if (ex instanceof MissingDataException) {
          throw ex;
        }
        info('Something wrong with AcroForm entry');
        this.acroForm = null;
      }
    },
    get linearization() {
      var linearization = null;
      if (this.stream.length) {
        try {
          linearization = Linearization.create(this.stream);
        } catch (err) {
          if (err instanceof MissingDataException) {
            throw err;
          }
          info(err);
        }
      }
      return shadow(this, 'linearization', linearization);
    },
    get startXRef() {
      var stream = this.stream;
      var startXRef = 0;
      var linearization = this.linearization;
      if (linearization) {
        stream.reset();
        if (find(stream, 'endobj', 1024)) {
          startXRef = stream.pos + 6;
        }
      } else {
        var step = 1024;
        var found = false,
            pos = stream.end;
        while (!found && pos > 0) {
          pos -= step - 'startxref'.length;
          if (pos < 0) {
            pos = 0;
          }
          stream.pos = pos;
          found = find(stream, 'startxref', step, true);
        }
        if (found) {
          stream.skip(9);
          var ch;
          do {
            ch = stream.getByte();
          } while (isSpace(ch));
          var str = '';
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
      return shadow(this, 'startXRef', startXRef);
    },
    get mainXRefEntriesOffset() {
      var mainXRefEntriesOffset = 0;
      var linearization = this.linearization;
      if (linearization) {
        mainXRefEntriesOffset = linearization.mainXRefEntriesOffset;
      }
      return shadow(this, 'mainXRefEntriesOffset', mainXRefEntriesOffset);
    },
    checkHeader: function PDFDocument_checkHeader() {
      var stream = this.stream;
      stream.reset();
      if (find(stream, '%PDF-', 1024)) {
        stream.moveStart();
        var MAX_VERSION_LENGTH = 12;
        var version = '',
            ch;
        while ((ch = stream.getByte()) > 0x20) {
          if (version.length >= MAX_VERSION_LENGTH) {
            break;
          }
          version += String.fromCharCode(ch);
        }
        if (!this.pdfFormatVersion) {
          this.pdfFormatVersion = version.substring(5);
        }
        return;
      }
    },
    parseStartXRef: function PDFDocument_parseStartXRef() {
      var startXRef = this.startXRef;
      this.xref.setStartXRef(startXRef);
    },
    setup: function PDFDocument_setup(recoveryMode) {
      this.xref.parse(recoveryMode);
      var self = this;
      var pageFactory = {
        createPage: function (pageIndex, dict, ref, fontCache, builtInCMapCache) {
          return new Page(self.pdfManager, self.xref, pageIndex, dict, ref, fontCache, builtInCMapCache);
        }
      };
      this.catalog = new Catalog(this.pdfManager, this.xref, pageFactory);
    },
    get numPages() {
      var linearization = this.linearization;
      var num = linearization ? linearization.numPages : this.catalog.numPages;
      return shadow(this, 'numPages', num);
    },
    get documentInfo() {
      var docInfo = {
        PDFFormatVersion: this.pdfFormatVersion,
        IsAcroFormPresent: !!this.acroForm,
        IsXFAPresent: !!this.xfa
      };
      var infoDict;
      try {
        infoDict = this.xref.trailer.get('Info');
      } catch (err) {
        if (err instanceof MissingDataException) {
          throw err;
        }
        info('The document information dictionary is invalid.');
      }
      if (infoDict) {
        var validEntries = DocumentInfoValidators.entries;
        for (var key in validEntries) {
          if (infoDict.has(key)) {
            var value = infoDict.get(key);
            if (validEntries[key](value)) {
              docInfo[key] = typeof value !== 'string' ? value : stringToPDFString(value);
            } else {
              info('Bad value in document info for "' + key + '"');
            }
          }
        }
      }
      return shadow(this, 'documentInfo', docInfo);
    },
    get fingerprint() {
      var xref = this.xref,
          hash,
          fileID = '';
      var idArray = xref.trailer.get('ID');
      if (idArray && isArray(idArray) && idArray[0] && isString(idArray[0]) && idArray[0] !== EMPTY_FINGERPRINT) {
        hash = stringToBytes(idArray[0]);
      } else {
        if (this.stream.ensureRange) {
          this.stream.ensureRange(0, Math.min(FINGERPRINT_FIRST_BYTES, this.stream.end));
        }
        hash = calculateMD5(this.stream.bytes.subarray(0, FINGERPRINT_FIRST_BYTES), 0, FINGERPRINT_FIRST_BYTES);
      }
      for (var i = 0, n = hash.length; i < n; i++) {
        var hex = hash[i].toString(16);
        fileID += hex.length === 1 ? '0' + hex : hex;
      }
      return shadow(this, 'fingerprint', fileID);
    },
    getPage: function PDFDocument_getPage(pageIndex) {
      return this.catalog.getPage(pageIndex);
    },
    cleanup: function PDFDocument_cleanup() {
      return this.catalog.cleanup();
    }
  };
  return PDFDocument;
}();
exports.Page = Page;
exports.PDFDocument = PDFDocument;