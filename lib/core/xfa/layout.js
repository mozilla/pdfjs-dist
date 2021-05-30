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
exports.addHTML = addHTML;
exports.flushHTML = flushHTML;
exports.getAvailableSpace = getAvailableSpace;

var _xfa_object = require("./xfa_object.js");

var _html_utils = require("./html_utils.js");

function flushHTML(node) {
  const attributes = node[_xfa_object.$extra].attributes;
  const html = {
    name: "div",
    attributes,
    children: node[_xfa_object.$extra].children
  };

  if (node[_xfa_object.$extra].failingNode) {
    const htmlFromFailing = node[_xfa_object.$extra].failingNode[_xfa_object.$flushHTML]();

    if (htmlFromFailing) {
      html.children.push(htmlFromFailing);
    }
  }

  if (html.children.length === 0) {
    return null;
  }

  node[_xfa_object.$extra].children = [];
  delete node[_xfa_object.$extra].line;
  return html;
}

function addHTML(node, html, bbox) {
  const extra = node[_xfa_object.$extra];
  const availableSpace = extra.availableSpace;

  switch (node.layout) {
    case "position":
      {
        const [x, y, w, h] = bbox;
        extra.width = Math.max(extra.width, x + w);
        extra.height = Math.max(extra.height, y + h);
        extra.children.push(html);
        break;
      }

    case "lr-tb":
    case "rl-tb":
      if (!extra.line || extra.attempt === 1) {
        extra.line = {
          name: "div",
          attributes: {
            class: node.layout === "lr-tb" ? "xfaLr" : "xfaRl"
          },
          children: []
        };
        extra.children.push(extra.line);
      }

      extra.line.children.push(html);

      if (extra.attempt === 0) {
        const [,, w, h] = bbox;
        extra.currentWidth += w;
        extra.height = Math.max(extra.height, extra.prevHeight + h);
      } else {
        const [,, w, h] = bbox;
        extra.width = Math.max(extra.width, extra.currentWidth);
        extra.currentWidth = w;
        extra.prevHeight = extra.height;
        extra.height += h;
        extra.attempt = 0;
      }

      break;

    case "rl-row":
    case "row":
      {
        extra.children.push(html);
        const [,, w, h] = bbox;
        extra.width += w;
        extra.height = Math.max(extra.height, h);
        const height = (0, _html_utils.measureToString)(extra.height);

        for (const child of extra.children) {
          if (child.attributes.class === "xfaWrapper") {
            child.children[child.children.length - 1].attributes.style.height = height;
          } else {
            child.attributes.style.height = height;
          }
        }

        break;
      }

    case "table":
      {
        const [,, w, h] = bbox;
        extra.width = Math.min(availableSpace.width, Math.max(extra.width, w));
        extra.height += h;
        extra.children.push(html);
        break;
      }

    case "tb":
      {
        const [,,, h] = bbox;
        extra.width = availableSpace.width;
        extra.height += h;
        extra.children.push(html);
        break;
      }
  }
}

function getAvailableSpace(node) {
  const availableSpace = node[_xfa_object.$extra].availableSpace;

  switch (node.layout) {
    case "lr-tb":
    case "rl-tb":
      switch (node[_xfa_object.$extra].attempt) {
        case 0:
          return {
            width: availableSpace.width - node[_xfa_object.$extra].currentWidth,
            height: availableSpace.height - node[_xfa_object.$extra].prevHeight
          };

        case 1:
          return {
            width: availableSpace.width,
            height: availableSpace.height - node[_xfa_object.$extra].height
          };

        default:
          return {
            width: Infinity,
            height: availableSpace.height - node[_xfa_object.$extra].prevHeight
          };
      }

    case "rl-row":
    case "row":
      const width = node[_xfa_object.$extra].columnWidths.slice(node[_xfa_object.$extra].currentColumn).reduce((a, x) => a + x);

      return {
        width,
        height: availableSpace.height
      };

    case "table":
    case "tb":
      return {
        width: availableSpace.width,
        height: availableSpace.height - node[_xfa_object.$extra].height
      };

    case "position":
    default:
      return availableSpace;
  }
}