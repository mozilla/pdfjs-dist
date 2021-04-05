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
exports.layoutClass = layoutClass;
exports.measureToString = measureToString;
exports.toStyle = toStyle;

var _xfa_object = require("./xfa_object.js");

var _util = require("../../shared/util.js");

function measureToString(m) {
  if (typeof m === "string") {
    return "0px";
  }

  return Number.isInteger(m) ? `${m}px` : `${m.toFixed(2)}px`;
}

const converters = {
  anchorType(node, style) {
    if (!("transform" in style)) {
      style.transform = "";
    }

    switch (node.anchorType) {
      case "bottomCenter":
        style.transform += "translate(-50%, -100%)";
        break;

      case "bottomLeft":
        style.transform += "translate(0,-100%)";
        break;

      case "bottomRight":
        style.transform += "translate(-100%,-100%)";
        break;

      case "middleCenter":
        style.transform += "translate(-50%,-50%)";
        break;

      case "middleLeft":
        style.transform += "translate(0,-50%)";
        break;

      case "middleRight":
        style.transform += "translate(-100%,-50%)";
        break;

      case "topCenter":
        style.transform += "translate(-50%,0)";
        break;

      case "topRight":
        style.transform += "translate(-100%,0)";
        break;
    }
  },

  dimensions(node, style) {
    if (node.w) {
      style.width = measureToString(node.w);
    } else {
      style.width = "auto";

      if (node.maxW > 0) {
        style.maxWidth = measureToString(node.maxW);
      }

      style.minWidth = measureToString(node.minW);
    }

    if (node.h) {
      style.height = measureToString(node.h);
    } else {
      style.height = "auto";

      if (node.maxH > 0) {
        style.maxHeight = measureToString(node.maxH);
      }

      style.minHeight = measureToString(node.minH);
    }
  },

  position(node, style) {
    const parent = node[_xfa_object.$getParent]();

    if (parent && parent.layout && parent.layout !== "position") {
      return;
    }

    style.position = "absolute";
    style.left = measureToString(node.x);
    style.top = measureToString(node.y);
  },

  rotate(node, style) {
    if (node.rotate) {
      if (!("transform" in style)) {
        style.transform = "";
      }

      style.transform += `rotate(-${node.rotate}deg)`;
      style.transformOrigin = "top left";
    }
  },

  presence(node, style) {
    switch (node.presence) {
      case "invisible":
        style.visibility = "hidden";
        break;

      case "hidden":
      case "inactive":
        style.display = "none";
        break;
    }
  }

};

function layoutClass(node) {
  switch (node.layout) {
    case "position":
      return "xfaPosition";

    case "lr-tb":
      return "xfaLrTb";

    case "rl-row":
      return "xfaRlRow";

    case "rl-tb":
      return "xfaRlTb";

    case "row":
      return "xfaRow";

    case "table":
      return "xfaTable";

    case "tb":
      return "xfaTb";

    default:
      return "xfaPosition";
  }
}

function toStyle(node, ...names) {
  const style = Object.create(null);

  for (const name of names) {
    const value = node[name];

    if (value === null) {
      continue;
    }

    if (value instanceof _xfa_object.XFAObject) {
      const newStyle = value[_xfa_object.$toStyle]();

      if (newStyle) {
        Object.assign(style, newStyle);
      } else {
        (0, _util.warn)(`(DEBUG) - XFA - style for ${name} not implemented yet`);
      }

      continue;
    }

    if (converters.hasOwnProperty(name)) {
      converters[name](node, style);
    }
  }

  return style;
}