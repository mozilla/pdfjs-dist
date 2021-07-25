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
exports.getXfaFontName = getXfaFontName;
exports.getXfaFontWidths = getXfaFontWidths;

var _calibri_factors = require("./calibri_factors.js");

var _helvetica_factors = require("./helvetica_factors.js");

var _liberationsans_widths = require("./liberationsans_widths.js");

var _myriadpro_factors = require("./myriadpro_factors.js");

var _segoeui_factors = require("./segoeui_factors.js");

var _core_utils = require("./core_utils.js");

var _fonts_utils = require("./fonts_utils.js");

const getXFAFontMap = (0, _core_utils.getLookupTableFactory)(function (t) {
  t["MyriadPro-Regular"] = t["PdfJS-Fallback-Regular"] = {
    name: "LiberationSans-Regular",
    factors: _myriadpro_factors.MyriadProRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    lineHeight: _myriadpro_factors.MyriadProRegularLineHeight
  };
  t["MyriadPro-Bold"] = t["PdfJS-Fallback-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _myriadpro_factors.MyriadProBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    lineHeight: _myriadpro_factors.MyriadProBoldLineHeight
  };
  t["MyriadPro-It"] = t["MyriadPro-Italic"] = t["PdfJS-Fallback-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _myriadpro_factors.MyriadProItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    lineHeight: _myriadpro_factors.MyriadProItalicLineHeight
  };
  t["MyriadPro-BoldIt"] = t["MyriadPro-BoldItalic"] = t["PdfJS-Fallback-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _myriadpro_factors.MyriadProBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    lineHeight: _myriadpro_factors.MyriadProBoldItalicLineHeight
  };
  t.ArialMT = t.Arial = t["Arial-Regular"] = {
    name: "LiberationSans-Regular",
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths
  };
  t["Arial-BoldMT"] = t["Arial-Bold"] = {
    name: "LiberationSans-Bold",
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths
  };
  t["Arial-ItalicMT"] = t["Arial-Italic"] = {
    name: "LiberationSans-Italic",
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths
  };
  t["Arial-BoldItalicMT"] = t["Arial-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths
  };
  t["Calibri-Regular"] = {
    name: "LiberationSans-Regular",
    factors: _calibri_factors.CalibriRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    lineHeight: _calibri_factors.CalibriRegularLineHeight
  };
  t["Calibri-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _calibri_factors.CalibriBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    lineHeight: _calibri_factors.CalibriBoldLineHeight
  };
  t["Calibri-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _calibri_factors.CalibriItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    lineHeight: _calibri_factors.CalibriItalicLineHeight
  };
  t["Calibri-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _calibri_factors.CalibriBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    lineHeight: _calibri_factors.CalibriBoldItalicLineHeight
  };
  t["Segoeui-Regular"] = {
    name: "LiberationSans-Regular",
    factors: _segoeui_factors.SegoeuiRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    lineHeight: _segoeui_factors.SegoeuiRegularLineHeight
  };
  t["Segoeui-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _segoeui_factors.SegoeuiBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    lineHeight: _segoeui_factors.SegoeuiBoldLineHeight
  };
  t["Segoeui-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _segoeui_factors.SegoeuiItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    lineHeight: _segoeui_factors.SegoeuiItalicLineHeight
  };
  t["Segoeui-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _segoeui_factors.SegoeuiBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    lineHeight: _segoeui_factors.SegoeuiBoldItalicLineHeight
  };
  t["Helvetica-Regular"] = t.Helvetica = {
    name: "LiberationSans-Regular",
    factors: _helvetica_factors.HelveticaRegularFactors,
    baseWidths: _liberationsans_widths.LiberationSansRegularWidths,
    lineHeight: _helvetica_factors.HelveticaRegularLineHeight
  };
  t["Helvetica-Bold"] = {
    name: "LiberationSans-Bold",
    factors: _helvetica_factors.HelveticaBoldFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldWidths,
    lineHeight: _helvetica_factors.HelveticaBoldLineHeight
  };
  t["Helvetica-Italic"] = {
    name: "LiberationSans-Italic",
    factors: _helvetica_factors.HelveticaItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansItalicWidths,
    lineHeight: _helvetica_factors.HelveticaItalicLineHeight
  };
  t["Helvetica-BoldItalic"] = {
    name: "LiberationSans-BoldItalic",
    factors: _helvetica_factors.HelveticaBoldItalicFactors,
    baseWidths: _liberationsans_widths.LiberationSansBoldItalicWidths,
    lineHeight: _helvetica_factors.HelveticaBoldItalicLineHeight
  };
});

function getXfaFontName(name) {
  const fontName = (0, _fonts_utils.normalizeFontName)(name);
  const fontMap = getXFAFontMap();
  return fontMap[fontName];
}

function getXfaFontWidths(name) {
  const info = getXfaFontName(name);

  if (!info) {
    return null;
  }

  const {
    baseWidths,
    factors
  } = info;

  if (!factors) {
    return baseWidths;
  }

  return baseWidths.map((w, i) => w * factors[i]);
}