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
var displayDOMUtils = require('./dom_utils.js');
var displayAPI = require('./api.js');
var displayAnnotationLayer = require('./annotation_layer.js');
var displayTextLayer = require('./text_layer.js');
var displayMetadata = require('./metadata.js');
var displaySVG = require('./svg.js');
var globalScope = sharedUtil.globalScope;
var deprecated = sharedUtil.deprecated;
var warn = sharedUtil.warn;
var LinkTarget = displayDOMUtils.LinkTarget;
var DEFAULT_LINK_REL = displayDOMUtils.DEFAULT_LINK_REL;
var isWorker = typeof window === 'undefined';
if (!globalScope.PDFJS) {
  globalScope.PDFJS = {};
}
var PDFJS = globalScope.PDFJS;
PDFJS.version = '1.8.183';
PDFJS.build = '22744655';
PDFJS.pdfBug = false;
if (PDFJS.verbosity !== undefined) {
  sharedUtil.setVerbosityLevel(PDFJS.verbosity);
}
delete PDFJS.verbosity;
Object.defineProperty(PDFJS, 'verbosity', {
  get: function () {
    return sharedUtil.getVerbosityLevel();
  },
  set: function (level) {
    sharedUtil.setVerbosityLevel(level);
  },
  enumerable: true,
  configurable: true
});
PDFJS.VERBOSITY_LEVELS = sharedUtil.VERBOSITY_LEVELS;
PDFJS.OPS = sharedUtil.OPS;
PDFJS.UNSUPPORTED_FEATURES = sharedUtil.UNSUPPORTED_FEATURES;
PDFJS.isValidUrl = displayDOMUtils.isValidUrl;
PDFJS.shadow = sharedUtil.shadow;
PDFJS.createBlob = sharedUtil.createBlob;
PDFJS.createObjectURL = function PDFJS_createObjectURL(data, contentType) {
  return sharedUtil.createObjectURL(data, contentType, PDFJS.disableCreateObjectURL);
};
Object.defineProperty(PDFJS, 'isLittleEndian', {
  configurable: true,
  get: function PDFJS_isLittleEndian() {
    var value = sharedUtil.isLittleEndian();
    return sharedUtil.shadow(PDFJS, 'isLittleEndian', value);
  }
});
PDFJS.removeNullCharacters = sharedUtil.removeNullCharacters;
PDFJS.PasswordResponses = sharedUtil.PasswordResponses;
PDFJS.PasswordException = sharedUtil.PasswordException;
PDFJS.UnknownErrorException = sharedUtil.UnknownErrorException;
PDFJS.InvalidPDFException = sharedUtil.InvalidPDFException;
PDFJS.MissingPDFException = sharedUtil.MissingPDFException;
PDFJS.UnexpectedResponseException = sharedUtil.UnexpectedResponseException;
PDFJS.Util = sharedUtil.Util;
PDFJS.PageViewport = sharedUtil.PageViewport;
PDFJS.createPromiseCapability = sharedUtil.createPromiseCapability;
PDFJS.maxImageSize = PDFJS.maxImageSize === undefined ? -1 : PDFJS.maxImageSize;
PDFJS.cMapUrl = PDFJS.cMapUrl === undefined ? null : PDFJS.cMapUrl;
PDFJS.cMapPacked = PDFJS.cMapPacked === undefined ? false : PDFJS.cMapPacked;
PDFJS.disableFontFace = PDFJS.disableFontFace === undefined ? false : PDFJS.disableFontFace;
PDFJS.imageResourcesPath = PDFJS.imageResourcesPath === undefined ? '' : PDFJS.imageResourcesPath;
PDFJS.disableWorker = PDFJS.disableWorker === undefined ? false : PDFJS.disableWorker;
PDFJS.workerSrc = PDFJS.workerSrc === undefined ? null : PDFJS.workerSrc;
PDFJS.workerPort = PDFJS.workerPort === undefined ? null : PDFJS.workerPort;
PDFJS.disableRange = PDFJS.disableRange === undefined ? false : PDFJS.disableRange;
PDFJS.disableStream = PDFJS.disableStream === undefined ? false : PDFJS.disableStream;
PDFJS.disableAutoFetch = PDFJS.disableAutoFetch === undefined ? false : PDFJS.disableAutoFetch;
PDFJS.pdfBug = PDFJS.pdfBug === undefined ? false : PDFJS.pdfBug;
PDFJS.postMessageTransfers = PDFJS.postMessageTransfers === undefined ? true : PDFJS.postMessageTransfers;
PDFJS.disableCreateObjectURL = PDFJS.disableCreateObjectURL === undefined ? false : PDFJS.disableCreateObjectURL;
PDFJS.disableWebGL = PDFJS.disableWebGL === undefined ? true : PDFJS.disableWebGL;
PDFJS.externalLinkTarget = PDFJS.externalLinkTarget === undefined ? LinkTarget.NONE : PDFJS.externalLinkTarget;
PDFJS.externalLinkRel = PDFJS.externalLinkRel === undefined ? DEFAULT_LINK_REL : PDFJS.externalLinkRel;
PDFJS.isEvalSupported = PDFJS.isEvalSupported === undefined ? true : PDFJS.isEvalSupported;
PDFJS.pdfjsNext = PDFJS.pdfjsNext === undefined ? false : PDFJS.pdfjsNext;
var savedOpenExternalLinksInNewWindow = PDFJS.openExternalLinksInNewWindow;
delete PDFJS.openExternalLinksInNewWindow;
Object.defineProperty(PDFJS, 'openExternalLinksInNewWindow', {
  get: function () {
    return PDFJS.externalLinkTarget === LinkTarget.BLANK;
  },
  set: function (value) {
    if (value) {
      deprecated('PDFJS.openExternalLinksInNewWindow, please use ' + '"PDFJS.externalLinkTarget = PDFJS.LinkTarget.BLANK" instead.');
    }
    if (PDFJS.externalLinkTarget !== LinkTarget.NONE) {
      warn('PDFJS.externalLinkTarget is already initialized');
      return;
    }
    PDFJS.externalLinkTarget = value ? LinkTarget.BLANK : LinkTarget.NONE;
  },
  enumerable: true,
  configurable: true
});
if (savedOpenExternalLinksInNewWindow) {
  PDFJS.openExternalLinksInNewWindow = savedOpenExternalLinksInNewWindow;
}
PDFJS.getDocument = displayAPI.getDocument;
PDFJS.PDFDataRangeTransport = displayAPI.PDFDataRangeTransport;
PDFJS.PDFWorker = displayAPI.PDFWorker;
Object.defineProperty(PDFJS, 'hasCanvasTypedArrays', {
  configurable: true,
  get: function PDFJS_hasCanvasTypedArrays() {
    var value = displayDOMUtils.hasCanvasTypedArrays();
    return sharedUtil.shadow(PDFJS, 'hasCanvasTypedArrays', value);
  }
});
PDFJS.CustomStyle = displayDOMUtils.CustomStyle;
PDFJS.LinkTarget = LinkTarget;
PDFJS.addLinkAttributes = displayDOMUtils.addLinkAttributes;
PDFJS.getFilenameFromUrl = displayDOMUtils.getFilenameFromUrl;
PDFJS.isExternalLinkTargetSet = displayDOMUtils.isExternalLinkTargetSet;
PDFJS.AnnotationLayer = displayAnnotationLayer.AnnotationLayer;
PDFJS.renderTextLayer = displayTextLayer.renderTextLayer;
PDFJS.Metadata = displayMetadata.Metadata;
PDFJS.SVGGraphics = displaySVG.SVGGraphics;
PDFJS.UnsupportedManager = displayAPI._UnsupportedManager;
exports.globalScope = globalScope;
exports.isWorker = isWorker;
exports.PDFJS = globalScope.PDFJS;