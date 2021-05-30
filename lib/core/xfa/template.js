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
exports.Value = exports.Text = exports.TemplateNamespace = exports.Template = exports.SetProperty = exports.Items = exports.Field = exports.BindItems = void 0;

var _xfa_object = require("./xfa_object.js");

var _namespaces = require("./namespaces.js");

var _html_utils = require("./html_utils.js");

var _layout = require("./layout.js");

var _utils = require("./utils.js");

var _util = require("../../shared/util.js");

var _som = require("./som.js");

const TEMPLATE_NS_ID = _namespaces.NamespaceIds.template.id;
const MAX_ATTEMPTS_FOR_LRTB_LAYOUT = 2;

function _setValue(templateNode, value) {
  if (!templateNode.value) {
    const nodeValue = new Value({});

    templateNode[_xfa_object.$appendChild](nodeValue);

    templateNode.value = nodeValue;
  }

  templateNode.value[_xfa_object.$setValue](value);
}

function getRoot(node) {
  let parent = node[_xfa_object.$getParent]();

  while (!(parent instanceof Template)) {
    parent = parent[_xfa_object.$getParent]();
  }

  return parent;
}

const NOTHING = 0;
const NOSPACE = 1;
const VALID = 2;

function checkDimensions(node, space) {
  if (node.w !== "" && Math.round(node.w + node.x - space.width) > 1) {
    const area = getRoot(node)[_xfa_object.$extra].currentContentArea;

    if (node.w + node.x > area.w) {
      return NOTHING;
    }

    return NOSPACE;
  }

  if (node.h !== "" && Math.round(node.h + node.y - space.height) > 1) {
    const area = getRoot(node)[_xfa_object.$extra].currentContentArea;

    if (node.h + node.y > area.h) {
      return NOTHING;
    }

    return NOSPACE;
  }

  return VALID;
}

class AppearanceFilter extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "appearanceFilter");
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Arc extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "arc", true);
    this.circular = (0, _utils.getInteger)({
      data: attributes.circular,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    this.id = attributes.id || "";
    this.startAngle = (0, _utils.getFloat)({
      data: attributes.startAngle,
      defaultValue: 0,
      validate: x => true
    });
    this.sweepAngle = (0, _utils.getFloat)({
      data: attributes.sweepAngle,
      defaultValue: 360,
      validate: x => true
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.edge = null;
    this.fill = null;
  }

}

class Area extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "area", true);
    this.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: n => n >= 1 || n === -1
    });
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.desc = null;
    this.extras = null;
    this.area = new _xfa_object.XFAObjectArray();
    this.draw = new _xfa_object.XFAObjectArray();
    this.exObject = new _xfa_object.XFAObjectArray();
    this.exclGroup = new _xfa_object.XFAObjectArray();
    this.field = new _xfa_object.XFAObjectArray();
    this.subform = new _xfa_object.XFAObjectArray();
    this.subformSet = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$isTransparent]() {
    return true;
  }

  [_xfa_object.$addHTML](html, bbox) {
    const [x, y, w, h] = bbox;
    this[_xfa_object.$extra].width = Math.max(this[_xfa_object.$extra].width, x + w);
    this[_xfa_object.$extra].height = Math.max(this[_xfa_object.$extra].height, y + h);

    this[_xfa_object.$extra].children.push(html);
  }

  [_xfa_object.$getAvailableSpace]() {
    return this[_xfa_object.$extra].availableSpace;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const style = (0, _html_utils.toStyle)(this, "position");
    const attributes = {
      style,
      id: this[_xfa_object.$uid],
      class: "xfaArea"
    };

    if (this.name) {
      attributes.xfaName = this.name;
    }

    const children = [];
    this[_xfa_object.$extra] = {
      children,
      width: 0,
      height: 0,
      availableSpace
    };

    if (!this[_xfa_object.$childrenToHTML]({
      filter: new Set(["area", "draw", "field", "exclGroup", "subform", "subformSet"]),
      include: true
    })) {
      delete this[_xfa_object.$extra];
      return _utils.HTMLResult.empty;
    }

    style.width = (0, _html_utils.measureToString)(this[_xfa_object.$extra].width);
    style.height = (0, _html_utils.measureToString)(this[_xfa_object.$extra].height);
    const html = {
      name: "div",
      attributes,
      children
    };
    const bbox = [this.x, this.y, this[_xfa_object.$extra].width, this[_xfa_object.$extra].height];
    delete this[_xfa_object.$extra];
    return _utils.HTMLResult.success(html, bbox);
  }

}

class Assist extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "assist", true);
    this.id = attributes.id || "";
    this.role = attributes.role || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.speak = null;
    this.toolTip = null;
  }

}

class Barcode extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "barcode", true);
    this.charEncoding = (0, _utils.getKeyword)({
      data: attributes.charEncoding ? attributes.charEncoding.toLowerCase() : "",
      defaultValue: "",
      validate: k => ["utf-8", "big-five", "fontspecific", "gbk", "gb-18030", "gb-2312", "ksc-5601", "none", "shift-jis", "ucs-2", "utf-16"].includes(k) || k.match(/iso-8859-[0-9]{2}/)
    });
    this.checksum = (0, _utils.getStringOption)(attributes.checksum, ["none", "1mod10", "1mod10_1mod11", "2mod10", "auto"]);
    this.dataColumnCount = (0, _utils.getInteger)({
      data: attributes.dataColumnCount,
      defaultValue: -1,
      validate: x => x >= 0
    });
    this.dataLength = (0, _utils.getInteger)({
      data: attributes.dataLength,
      defaultValue: -1,
      validate: x => x >= 0
    });
    this.dataPrep = (0, _utils.getStringOption)(attributes.dataPrep, ["none", "flateCompress"]);
    this.dataRowCount = (0, _utils.getInteger)({
      data: attributes.dataRowCount,
      defaultValue: -1,
      validate: x => x >= 0
    });
    this.endChar = attributes.endChar || "";
    this.errorCorrectionLevel = (0, _utils.getInteger)({
      data: attributes.errorCorrectionLevel,
      defaultValue: -1,
      validate: x => x >= 0 && x <= 8
    });
    this.id = attributes.id || "";
    this.moduleHeight = (0, _utils.getMeasurement)(attributes.moduleHeight, "5mm");
    this.moduleWidth = (0, _utils.getMeasurement)(attributes.moduleWidth, "0.25mm");
    this.printCheckDigit = (0, _utils.getInteger)({
      data: attributes.printCheckDigit,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.rowColumnRatio = (0, _utils.getRatio)(attributes.rowColumnRatio);
    this.startChar = attributes.startChar || "";
    this.textLocation = (0, _utils.getStringOption)(attributes.textLocation, ["below", "above", "aboveEmbedded", "belowEmbedded", "none"]);
    this.truncate = (0, _utils.getInteger)({
      data: attributes.truncate,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.type = (0, _utils.getStringOption)(attributes.type ? attributes.type.toLowerCase() : "", ["aztec", "codabar", "code2of5industrial", "code2of5interleaved", "code2of5matrix", "code2of5standard", "code3of9", "code3of9extended", "code11", "code49", "code93", "code128", "code128a", "code128b", "code128c", "code128sscc", "datamatrix", "ean8", "ean8add2", "ean8add5", "ean13", "ean13add2", "ean13add5", "ean13pwcd", "fim", "logmars", "maxicode", "msi", "pdf417", "pdf417macro", "plessey", "postauscust2", "postauscust3", "postausreplypaid", "postausstandard", "postukrm4scc", "postusdpbc", "postusimb", "postusstandard", "postus5zip", "qrcode", "rfid", "rss14", "rss14expanded", "rss14limited", "rss14stacked", "rss14stackedomni", "rss14truncated", "telepen", "ucc128", "ucc128random", "ucc128sscc", "upca", "upcaadd2", "upcaadd5", "upcapwcd", "upce", "upceadd2", "upceadd5", "upcean2", "upcean5", "upsmaxicode"]);
    this.upsMode = (0, _utils.getStringOption)(attributes.upsMode, ["usCarrier", "internationalCarrier", "secureSymbol", "standardSymbol"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.wideNarrowRatio = (0, _utils.getRatio)(attributes.wideNarrowRatio);
    this.encrypt = null;
    this.extras = null;
  }

}

class Bind extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "bind", true);
    this.match = (0, _utils.getStringOption)(attributes.match, ["once", "dataRef", "global", "none"]);
    this.ref = attributes.ref || "";
    this.picture = null;
  }

}

class BindItems extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "bindItems");
    this.connection = attributes.connection || "";
    this.labelRef = attributes.labelRef || "";
    this.ref = attributes.ref || "";
    this.valueRef = attributes.valueRef || "";
  }

}

exports.BindItems = BindItems;

class Bookend extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "bookend");
    this.id = attributes.id || "";
    this.leader = attributes.leader || "";
    this.trailer = attributes.trailer || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class BooleanElement extends _xfa_object.Option01 {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "boolean");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content] === 1);
  }

}

class Border extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "border", true);
    this.break = (0, _utils.getStringOption)(attributes.break, ["close", "open"]);
    this.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    this.id = attributes.id || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.corner = new _xfa_object.XFAObjectArray(4);
    this.edge = new _xfa_object.XFAObjectArray(4);
    this.extras = null;
    this.fill = null;
    this.margin = null;
  }

  [_xfa_object.$toStyle](widths, margins) {
    const edges = this.edge.children.slice();

    if (edges.length < 4) {
      const defaultEdge = edges[edges.length - 1] || new Edge({});

      for (let i = edges.length; i < 4; i++) {
        edges.push(defaultEdge);
      }
    }

    widths = widths || [0, 0, 0, 0];

    for (let i = 0; i < 4; i++) {
      widths[i] = edges[i].thickness;
    }

    margins = margins || [0, 0, 0, 0];
    const edgeStyles = edges.map(node => {
      const style = node[_xfa_object.$toStyle]();

      style.color = style.color || "#000000";
      return style;
    });
    let style;

    if (this.margin) {
      style = this.margin[_xfa_object.$toStyle]();
      margins[0] = this.margin.topInset;
      margins[1] = this.margin.rightInset;
      margins[2] = this.margin.bottomInset;
      margins[3] = this.margin.leftInset;
    } else {
      style = Object.create(null);
    }

    let isForUi = false;

    const parent = this[_xfa_object.$getParent]();

    const grandParent = parent ? parent[_xfa_object.$getParent]() : null;

    if (grandParent instanceof Ui) {
      isForUi = true;
    }

    if (this.fill) {
      Object.assign(style, this.fill[_xfa_object.$toStyle]());
    }

    let hasRadius = false;

    if (this.corner.children.some(node => node.radius !== 0)) {
      const cornerStyles = this.corner.children.map(node => node[_xfa_object.$toStyle]());

      if (cornerStyles.length === 2 || cornerStyles.length === 3) {
        const last = cornerStyles[cornerStyles.length - 1];

        for (let i = cornerStyles.length; i < 4; i++) {
          cornerStyles.push(last);
        }
      }

      style.borderRadius = cornerStyles.map(s => s.radius).join(" ");
      hasRadius = true;
    }

    const firstEdge = edgeStyles[0];

    if (!hasRadius && (this.edge.children.length <= 1 || edgeStyles.every(x => x.style === firstEdge.style && x.width === firstEdge.width && x.color === firstEdge.color) && margins.every(x => x === margins[0]))) {
      let borderStyle;

      switch (this.presence) {
        case "invisible":
        case "hidden":
          borderStyle = "";
          break;

        case "inactive":
          borderStyle = "none";
          break;

        default:
          borderStyle = firstEdge.style;
          break;
      }

      style.outline = `${firstEdge.width} ${firstEdge.color} ${borderStyle}`;
      const offset = edges[0].thickness + margins[0];
      style.outlineOffset = `-${(0, _html_utils.measureToString)(offset)}`;

      if (isForUi) {
        style.padding = `${(0, _html_utils.measureToString)(offset + 1)}`;
      }
    } else {
      switch (this.presence) {
        case "invisible":
        case "hidden":
          style.borderStyle = "";
          break;

        case "inactive":
          style.borderStyle = "none";
          break;

        default:
          style.borderStyle = edgeStyles.map(s => s.style).join(" ");
          break;
      }

      style.borderWidth = edgeStyles.map(s => s.width).join(" ");
      style.borderColor = edgeStyles.map(s => s.color).join(" ");
    }

    return style;
  }

}

class Break extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "break", true);
    this.after = (0, _utils.getStringOption)(attributes.after, ["auto", "contentArea", "pageArea", "pageEven", "pageOdd"]);
    this.afterTarget = attributes.afterTarget || "";
    this.before = (0, _utils.getStringOption)(attributes.before, ["auto", "contentArea", "pageArea", "pageEven", "pageOdd"]);
    this.beforeTarget = attributes.beforeTarget || "";
    this.bookendLeader = attributes.bookendLeader || "";
    this.bookendTrailer = attributes.bookendTrailer || "";
    this.id = attributes.id || "";
    this.overflowLeader = attributes.overflowLeader || "";
    this.overflowTarget = attributes.overflowTarget || "";
    this.overflowTrailer = attributes.overflowTrailer || "";
    this.startNew = (0, _utils.getInteger)({
      data: attributes.startNew,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

}

class BreakAfter extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "breakAfter", true);
    this.id = attributes.id || "";
    this.leader = attributes.leader || "";
    this.startNew = (0, _utils.getInteger)({
      data: attributes.startNew,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.target = attributes.target || "";
    this.targetType = (0, _utils.getStringOption)(attributes.targetType, ["auto", "contentArea", "pageArea", "pageEven", "pageOdd"]);
    this.trailer = attributes.trailer || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.script = null;
  }

}

class BreakBefore extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "breakBefore", true);
    this.id = attributes.id || "";
    this.leader = attributes.leader || "";
    this.startNew = (0, _utils.getInteger)({
      data: attributes.startNew,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.target = attributes.target || "";
    this.targetType = (0, _utils.getStringOption)(attributes.targetType, ["auto", "contentArea", "pageArea", "pageEven", "pageOdd"]);
    this.trailer = attributes.trailer || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.script = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    this[_xfa_object.$extra] = {};
    return _utils.HTMLResult.FAILURE;
  }

}

class Button extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "button", true);
    this.highlight = (0, _utils.getStringOption)(attributes.highlight, ["inverted", "none", "outline", "push"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success({
      name: "button",
      attributes: {
        class: "xfaButton",
        style: {}
      },
      children: []
    });
  }

}

class Calculate extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "calculate", true);
    this.id = attributes.id || "";
    this.override = (0, _utils.getStringOption)(attributes.override, ["disabled", "error", "ignore", "warning"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.message = null;
    this.script = null;
  }

}

class Caption extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "caption", true);
    this.id = attributes.id || "";
    this.placement = (0, _utils.getStringOption)(attributes.placement, ["left", "bottom", "inline", "right", "top"]);
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.reserve = (0, _utils.getMeasurement)(attributes.reserve);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.font = null;
    this.margin = null;
    this.para = null;
    this.value = null;
  }

  [_xfa_object.$setValue](value) {
    _setValue(this, value);
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (!this.value) {
      return _utils.HTMLResult.EMPTY;
    }

    const value = this.value[_xfa_object.$toHTML](availableSpace).html;

    if (!value) {
      return _utils.HTMLResult.EMPTY;
    }

    const children = [];

    if (typeof value === "string") {
      children.push({
        name: "#text",
        value
      });
    } else {
      children.push(value);
    }

    const style = (0, _html_utils.toStyle)(this, "font", "margin", "para", "visibility");

    switch (this.placement) {
      case "left":
      case "right":
        if (this.reserve > 0) {
          style.width = (0, _html_utils.measureToString)(this.reserve);
        } else {
          style.minWidth = (0, _html_utils.measureToString)(this.reserve);
        }

        break;

      case "top":
      case "bottom":
        if (this.reserve > 0) {
          style.height = (0, _html_utils.measureToString)(this.reserve);
        } else {
          style.minHeight = (0, _html_utils.measureToString)(this.reserve);
        }

        break;
    }

    return _utils.HTMLResult.success({
      name: "div",
      attributes: {
        style,
        class: "xfaCaption"
      },
      children
    });
  }

}

class Certificate extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "certificate");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Certificates extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "certificates", true);
    this.credentialServerPolicy = (0, _utils.getStringOption)(attributes.credentialServerPolicy, ["optional", "required"]);
    this.id = attributes.id || "";
    this.url = attributes.url || "";
    this.urlPolicy = attributes.urlPolicy || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.encryption = null;
    this.issuers = null;
    this.keyUsage = null;
    this.oids = null;
    this.signing = null;
    this.subjectDNs = null;
  }

}

class CheckButton extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "checkButton", true);
    this.id = attributes.id || "";
    this.mark = (0, _utils.getStringOption)(attributes.mark, ["default", "check", "circle", "cross", "diamond", "square", "star"]);
    this.shape = (0, _utils.getStringOption)(attributes.shape, ["square", "round"]);
    this.size = (0, _utils.getMeasurement)(attributes.size, "10pt");
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.extras = null;
    this.margin = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const style = (0, _html_utils.toStyle)(this, "border", "margin");
    const size = (0, _html_utils.measureToString)(this.size);
    style.width = style.height = size;
    let mark, radius;

    if (this.shape === "square") {
      mark = "▪";
      radius = "10%";
    } else {
      mark = "●";
      radius = "50%";
    }

    if (!style.borderRadius) {
      style.borderRadius = radius;
    }

    if (this.mark !== "default") {
      switch (this.mark) {
        case "check":
          mark = "✓";
          break;

        case "circle":
          mark = "●";
          break;

        case "cross":
          mark = "✕";
          break;

        case "diamond":
          mark = "♦";
          break;

        case "square":
          mark = "▪";
          break;

        case "star":
          mark = "★";
          break;
      }
    }

    if (size !== "10px") {
      style.fontSize = size;
      style.lineHeight = size;
      style.width = size;
      style.height = size;
    }

    const fieldId = this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$uid];

    const input = {
      name: "input",
      attributes: {
        class: "xfaCheckbox",
        fieldId,
        type: "radio",
        id: `${fieldId}-radio`
      }
    };

    const container = this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$getParent]();

    if (container instanceof ExclGroup) {
      input.attributes.name = container[_xfa_object.$uid];
    }

    return _utils.HTMLResult.success({
      name: "label",
      attributes: {
        class: "xfaLabel"
      },
      children: [input, {
        name: "span",
        attributes: {
          class: "xfaCheckboxMark",
          mark,
          style
        }
      }]
    });
  }

}

class ChoiceList extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "choiceList", true);
    this.commitOn = (0, _utils.getStringOption)(attributes.commitOn, ["select", "exit"]);
    this.id = attributes.id || "";
    this.open = (0, _utils.getStringOption)(attributes.open, ["userControl", "always", "multiSelect", "onEntry"]);
    this.textEntry = (0, _utils.getInteger)({
      data: attributes.textEntry,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.extras = null;
    this.margin = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const style = (0, _html_utils.toStyle)(this, "border", "margin");

    const ui = this[_xfa_object.$getParent]();

    const field = ui[_xfa_object.$getParent]();

    const children = [];

    if (field.items.children.length > 0) {
      const displayed = field.items.children[0][_xfa_object.$toHTML]().html;

      const values = field.items.children[1] ? field.items.children[1][_xfa_object.$toHTML]().html : [];

      for (let i = 0, ii = displayed.length; i < ii; i++) {
        children.push({
          name: "option",
          attributes: {
            value: values[i] || displayed[i]
          },
          value: displayed[i]
        });
      }
    }

    const selectAttributes = {
      class: "xfaSelect",
      fieldId: this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$uid],
      style
    };

    if (this.open === "multiSelect") {
      selectAttributes.multiple = true;
    }

    return _utils.HTMLResult.success({
      name: "label",
      attributes: {
        class: "xfaLabel"
      },
      children: [{
        name: "select",
        children,
        attributes: selectAttributes
      }]
    });
  }

}

class Color extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "color", true);
    this.cSpace = (0, _utils.getStringOption)(attributes.cSpace, ["SRGB"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.value = attributes.value ? (0, _utils.getColor)(attributes.value) : "";
    this.extras = null;
  }

  [_xfa_object.$hasSettableValue]() {
    return false;
  }

  [_xfa_object.$toStyle]() {
    return this.value ? _util.Util.makeHexColor(this.value.r, this.value.g, this.value.b) : null;
  }

}

class Comb extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "comb");
    this.id = attributes.id || "";
    this.numberOfCells = (0, _utils.getInteger)({
      data: attributes.numberOfCells,
      defaultValue: 0,
      validate: x => x >= 0
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Connect extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "connect", true);
    this.connection = attributes.connection || "";
    this.id = attributes.id || "";
    this.ref = attributes.ref || "";
    this.usage = (0, _utils.getStringOption)(attributes.usage, ["exportAndImport", "exportOnly", "importOnly"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.picture = null;
  }

}

class ContentArea extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "contentArea", true);
    this.h = (0, _utils.getMeasurement)(attributes.h);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = (0, _utils.getMeasurement)(attributes.w);
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.desc = null;
    this.extras = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const left = (0, _html_utils.measureToString)(this.x);
    const top = (0, _html_utils.measureToString)(this.y);
    const style = {
      position: "absolute",
      left,
      top,
      width: (0, _html_utils.measureToString)(this.w),
      height: (0, _html_utils.measureToString)(this.h)
    };
    return _utils.HTMLResult.success({
      name: "div",
      children: [],
      attributes: {
        style,
        class: "xfaContentarea",
        id: this[_xfa_object.$uid]
      }
    });
  }

}

class Corner extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "corner", true);
    this.id = attributes.id || "";
    this.inverted = (0, _utils.getInteger)({
      data: attributes.inverted,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.join = (0, _utils.getStringOption)(attributes.join, ["square", "round"]);
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.radius = (0, _utils.getMeasurement)(attributes.radius);
    this.stroke = (0, _utils.getStringOption)(attributes.stroke, ["solid", "dashDot", "dashDotDot", "dashed", "dotted", "embossed", "etched", "lowered", "raised"]);
    this.thickness = (0, _utils.getMeasurement)(attributes.thickness, "0.5pt");
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
  }

  [_xfa_object.$toStyle]() {
    const style = (0, _html_utils.toStyle)(this, "visibility");
    style.radius = (0, _html_utils.measureToString)(this.radius);
    return style;
  }

}

class DateElement extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "date");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    this[_xfa_object.$content] = new Date(this[_xfa_object.$content].trim());
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content].toString());
  }

}

class DateTime extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "dateTime");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    this[_xfa_object.$content] = new Date(this[_xfa_object.$content].trim());
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content].toString());
  }

}

class DateTimeEdit extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "dateTimeEdit", true);
    this.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    this.id = attributes.id || "";
    this.picker = (0, _utils.getStringOption)(attributes.picker, ["host", "none"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.comb = null;
    this.extras = null;
    this.margin = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const style = (0, _html_utils.toStyle)(this, "border", "font", "margin");
    const html = {
      name: "input",
      attributes: {
        type: "text",
        fieldId: this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$uid],
        class: "xfaTextfield",
        style
      }
    };
    return _utils.HTMLResult.success({
      name: "label",
      attributes: {
        class: "xfaLabel"
      },
      children: [html]
    });
  }

}

class Decimal extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "decimal");
    this.fracDigits = (0, _utils.getInteger)({
      data: attributes.fracDigits,
      defaultValue: 2,
      validate: x => true
    });
    this.id = attributes.id || "";
    this.leadDigits = (0, _utils.getInteger)({
      data: attributes.leadDigits,
      defaultValue: -1,
      validate: x => true
    });
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    const number = parseFloat(this[_xfa_object.$content].trim());
    this[_xfa_object.$content] = isNaN(number) ? null : number;
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content] !== null ? this[_xfa_object.$content].toString() : "");
  }

}

class DefaultUi extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "defaultUi", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

}

class Desc extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "desc", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.boolean = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
  }

}

class DigestMethod extends _xfa_object.OptionObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "digestMethod", ["", "SHA1", "SHA256", "SHA512", "RIPEMD160"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class DigestMethods extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "digestMethods", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.digestMethod = new _xfa_object.XFAObjectArray();
  }

}

class Draw extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "draw", true);
    this.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    this.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: n => n >= 1 || n === -1
    });
    this.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.locale = attributes.locale || "";
    this.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    this.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    this.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    this.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.rotate = (0, _utils.getInteger)({
      data: attributes.rotate,
      defaultValue: 0,
      validate: x => x % 90 === 0
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.assist = null;
    this.border = null;
    this.caption = null;
    this.desc = null;
    this.extras = null;
    this.font = null;
    this.keep = null;
    this.margin = null;
    this.para = null;
    this.traversal = null;
    this.ui = null;
    this.value = null;
    this.setProperty = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$setValue](value) {
    _setValue(this, value);
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (this.presence === "hidden" || this.presence === "inactive" || this.h === 0 || this.w === 0) {
      return _utils.HTMLResult.EMPTY;
    }

    (0, _html_utils.fixDimensions)(this);

    if (this.w !== "" && this.h === "" && this.value) {
      const text = this.value[_xfa_object.$text]();

      if (text) {
        const {
          height
        } = (0, _html_utils.layoutText)(text, this.font.size, {
          width: this.w,
          height: Infinity
        });
        this.h = height || "";
      }
    }

    switch (checkDimensions(this, availableSpace)) {
      case NOTHING:
        return _utils.HTMLResult.EMPTY;

      case NOSPACE:
        return _utils.HTMLResult.FAILURE;

      default:
        break;
    }

    const style = (0, _html_utils.toStyle)(this, "font", "hAlign", "dimensions", "position", "presence", "rotate", "anchorType", "borderMarginPadding");
    const classNames = ["xfaDraw"];

    if (this.font) {
      classNames.push("xfaFont");
    }

    const attributes = {
      style,
      id: this[_xfa_object.$uid],
      class: classNames.join(" ")
    };

    if (this.name) {
      attributes.xfaName = this.name;
    }

    const html = {
      name: "div",
      attributes,
      children: []
    };
    const extra = (0, _html_utils.addExtraDivForBorder)(html);
    const bbox = (0, _html_utils.computeBbox)(this, html, availableSpace);
    const value = this.value ? this.value[_xfa_object.$toHTML](availableSpace).html : null;

    if (value === null) {
      return _utils.HTMLResult.success(extra, bbox);
    }

    html.children.push(value);

    if (value.attributes.class === "xfaRich") {
      if (this.h === "") {
        style.height = "auto";
      }

      if (this.w === "") {
        style.width = "auto";
      }

      if (this.para) {
        attributes.style.display = "flex";
        attributes.style.flexDirection = "column";

        switch (this.para.vAlign) {
          case "top":
            attributes.style.justifyContent = "start";
            break;

          case "bottom":
            attributes.style.justifyContent = "end";
            break;

          case "middle":
            attributes.style.justifyContent = "center";
            break;
        }

        const paraStyle = this.para[_xfa_object.$toStyle]();

        if (!value.attributes.style) {
          value.attributes.style = paraStyle;
        } else {
          for (const [key, val] of Object.entries(paraStyle)) {
            if (!(key in value.attributes.style)) {
              value.attributes.style[key] = val;
            }
          }
        }
      }
    }

    return _utils.HTMLResult.success(extra, bbox);
  }

}

class Edge extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "edge", true);
    this.cap = (0, _utils.getStringOption)(attributes.cap, ["square", "butt", "round"]);
    this.id = attributes.id || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.stroke = (0, _utils.getStringOption)(attributes.stroke, ["solid", "dashDot", "dashDotDot", "dashed", "dotted", "embossed", "etched", "lowered", "raised"]);
    this.thickness = Math.max(1, Math.round((0, _utils.getMeasurement)(attributes.thickness, "0.5pt")));
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
  }

  [_xfa_object.$toStyle]() {
    const style = (0, _html_utils.toStyle)(this, "visibility");
    Object.assign(style, {
      linecap: this.cap,
      width: (0, _html_utils.measureToString)(Math.max(1, Math.round(this.thickness))),
      color: this.color ? this.color[_xfa_object.$toStyle]() : "#000000",
      style: ""
    });

    if (this.presence !== "visible") {
      style.style = "none";
    } else {
      switch (this.stroke) {
        case "solid":
          style.style = "solid";
          break;

        case "dashDot":
          style.style = "dashed";
          break;

        case "dashDotDot":
          style.style = "dashed";
          break;

        case "dashed":
          style.style = "dashed";
          break;

        case "dotted":
          style.style = "dotted";
          break;

        case "embossed":
          style.style = "ridge";
          break;

        case "etched":
          style.style = "groove";
          break;

        case "lowered":
          style.style = "inset";
          break;

        case "raised":
          style.style = "outset";
          break;
      }
    }

    return style;
  }

}

class Encoding extends _xfa_object.OptionObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encoding", ["adbe.x509.rsa_sha1", "adbe.pkcs7.detached", "adbe.pkcs7.sha1"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Encodings extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encodings", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.encoding = new _xfa_object.XFAObjectArray();
  }

}

class Encrypt extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encrypt", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.certificate = null;
  }

}

class EncryptData extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encryptData", true);
    this.id = attributes.id || "";
    this.operation = (0, _utils.getStringOption)(attributes.operation, ["encrypt", "decrypt"]);
    this.target = attributes.target || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.filter = null;
    this.manifest = null;
  }

}

class Encryption extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encryption", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.certificate = new _xfa_object.XFAObjectArray();
  }

}

class EncryptionMethod extends _xfa_object.OptionObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encryptionMethod", ["", "AES256-CBC", "TRIPLEDES-CBC", "AES128-CBC", "AES192-CBC"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class EncryptionMethods extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "encryptionMethods", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.encryptionMethod = new _xfa_object.XFAObjectArray();
  }

}

class Event extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "event", true);
    this.activity = (0, _utils.getStringOption)(attributes.activity, ["click", "change", "docClose", "docReady", "enter", "exit", "full", "indexChange", "initialize", "mouseDown", "mouseEnter", "mouseExit", "mouseUp", "postExecute", "postOpen", "postPrint", "postSave", "postSign", "postSubmit", "preExecute", "preOpen", "prePrint", "preSave", "preSign", "preSubmit", "ready", "validationState"]);
    this.id = attributes.id || "";
    this.listen = (0, _utils.getStringOption)(attributes.listen, ["refOnly", "refAndDescendents"]);
    this.name = attributes.name || "";
    this.ref = attributes.ref || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.encryptData = null;
    this.execute = null;
    this.script = null;
    this.signData = null;
    this.submit = null;
  }

}

class ExData extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "exData");
    this.contentType = attributes.contentType || "";
    this.href = attributes.href || "";
    this.id = attributes.id || "";
    this.maxLength = (0, _utils.getInteger)({
      data: attributes.maxLength,
      defaultValue: -1,
      validate: x => x >= -1
    });
    this.name = attributes.name || "";
    this.rid = attributes.rid || "";
    this.transferEncoding = (0, _utils.getStringOption)(attributes.transferEncoding, ["none", "base64", "package"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$onChild](child) {
    if (this.contentType === "text/html" && child[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.xhtml.id) {
      this[_xfa_object.$content] = child;
      return true;
    }

    if (this.contentType === "text/xml") {
      this[_xfa_object.$content] = child;
      return true;
    }

    return false;
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (this.contentType !== "text/html" || !this[_xfa_object.$content]) {
      return _utils.HTMLResult.EMPTY;
    }

    return this[_xfa_object.$content][_xfa_object.$toHTML](availableSpace);
  }

}

class ExObject extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "exObject", true);
    this.archive = attributes.archive || "";
    this.classId = attributes.classId || "";
    this.codeBase = attributes.codeBase || "";
    this.codeType = attributes.codeType || "";
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.boolean = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.exObject = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
  }

}

class ExclGroup extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "exclGroup", true);
    this.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    this.accessKey = attributes.accessKey || "";
    this.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    this.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: n => n >= 1 || n === -1
    });
    this.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.layout = (0, _utils.getStringOption)(attributes.layout, ["position", "lr-tb", "rl-row", "rl-tb", "row", "table", "tb"]);
    this.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    this.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    this.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    this.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.assist = null;
    this.bind = null;
    this.border = null;
    this.calculate = null;
    this.caption = null;
    this.desc = null;
    this.extras = null;
    this.margin = null;
    this.para = null;
    this.traversal = null;
    this.validate = null;
    this.connect = new _xfa_object.XFAObjectArray();
    this.event = new _xfa_object.XFAObjectArray();
    this.field = new _xfa_object.XFAObjectArray();
    this.setProperty = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$hasSettableValue]() {
    return true;
  }

  [_xfa_object.$setValue](value) {
    for (const field of this.field.children) {
      if (!field.value) {
        const nodeValue = new Value({});

        field[_xfa_object.$appendChild](nodeValue);

        field.value = nodeValue;
      }

      const nodeBoolean = new BooleanElement({});
      nodeBoolean[_xfa_object.$content] = 0;

      for (const item of field.items.children) {
        if (item[_xfa_object.$hasItem](value)) {
          nodeBoolean[_xfa_object.$content] = 1;
          break;
        }
      }

      field.value[_xfa_object.$setValue](nodeBoolean);
    }
  }

  [_xfa_object.$flushHTML]() {
    return (0, _layout.flushHTML)(this);
  }

  [_xfa_object.$addHTML](html, bbox) {
    (0, _layout.addHTML)(this, html, bbox);
  }

  [_xfa_object.$getAvailableSpace]() {
    return (0, _layout.getAvailableSpace)(this);
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (this.presence === "hidden" || this.presence === "inactive" || this.h === 0 || this.w === 0) {
      return _utils.HTMLResult.EMPTY;
    }

    (0, _html_utils.fixDimensions)(this);
    const children = [];
    const attributes = {
      id: this[_xfa_object.$uid]
    };

    if (!this[_xfa_object.$extra]) {
      this[_xfa_object.$extra] = Object.create(null);
    }

    Object.assign(this[_xfa_object.$extra], {
      children,
      attributes,
      attempt: 0,
      availableSpace,
      width: 0,
      height: 0,
      prevHeight: 0,
      currentWidth: 0
    });

    switch (checkDimensions(this, availableSpace)) {
      case NOTHING:
        return _utils.HTMLResult.EMPTY;

      case NOSPACE:
        return _utils.HTMLResult.FAILURE;

      default:
        break;
    }

    availableSpace = {
      width: this.w === "" ? availableSpace.width : this.w,
      height: this.h === "" ? availableSpace.height : this.h
    };
    const filter = new Set(["field"]);

    if (this.layout === "row") {
      const columnWidths = this[_xfa_object.$getParent]().columnWidths;

      if (Array.isArray(columnWidths) && columnWidths.length > 0) {
        this[_xfa_object.$extra].columnWidths = columnWidths;
        this[_xfa_object.$extra].currentColumn = 0;
      }
    }

    const style = (0, _html_utils.toStyle)(this, "anchorType", "dimensions", "position", "presence", "borderMarginPadding", "hAlign");
    const classNames = ["xfaExclgroup"];
    const cl = (0, _html_utils.layoutClass)(this);

    if (cl) {
      classNames.push(cl);
    }

    attributes.style = style;
    attributes.class = classNames.join(" ");

    if (this.name) {
      attributes.xfaName = this.name;
    }

    let failure;

    if (this.layout === "lr-tb" || this.layout === "rl-tb") {
      for (; this[_xfa_object.$extra].attempt < MAX_ATTEMPTS_FOR_LRTB_LAYOUT; this[_xfa_object.$extra].attempt++) {
        if (this[_xfa_object.$childrenToHTML]({
          filter,
          include: true
        })) {
          break;
        }
      }

      failure = this[_xfa_object.$extra].attempt === 2;
    } else {
      failure = !this[_xfa_object.$childrenToHTML]({
        filter,
        include: true
      });
    }

    if (failure) {
      return _utils.HTMLResult.FAILURE;
    }

    let marginH = 0;
    let marginV = 0;

    if (this.margin) {
      marginH = this.margin.leftInset + this.margin.rightInset;
      marginV = this.margin.topInset + this.margin.bottomInset;
    }

    if (this.w === "") {
      style.width = (0, _html_utils.measureToString)(this[_xfa_object.$extra].width + marginH);
    }

    if (this.h === "") {
      style.height = (0, _html_utils.measureToString)(this[_xfa_object.$extra].height + marginV);
    }

    let html = {
      name: "div",
      attributes,
      children
    };
    html = (0, _html_utils.addExtraDivForBorder)(html);
    let bbox;

    if (this.w !== "" && this.h !== "") {
      bbox = [this.x, this.y, this.w, this.h];
    } else {
      const width = this.w === "" ? marginH + this[_xfa_object.$extra].width : this.w;
      const height = this.h === "" ? marginV + this[_xfa_object.$extra].height : this.h;
      bbox = [this.x, this.y, width, height];
    }

    delete this[_xfa_object.$extra];
    return _utils.HTMLResult.success(html, bbox);
  }

}

class Execute extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "execute");
    this.connection = attributes.connection || "";
    this.executeType = (0, _utils.getStringOption)(attributes.executeType, ["import", "remerge"]);
    this.id = attributes.id || "";
    this.runAt = (0, _utils.getStringOption)(attributes.runAt, ["client", "both", "server"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Extras extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "extras", true);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.boolean = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.extras = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
  }

}

class Field extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "field", true);
    this.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    this.accessKey = attributes.accessKey || "";
    this.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    this.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: n => n >= 1 || n === -1
    });
    this.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.locale = attributes.locale || "";
    this.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    this.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    this.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    this.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.rotate = (0, _utils.getInteger)({
      data: attributes.rotate,
      defaultValue: 0,
      validate: x => x % 90 === 0
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.assist = null;
    this.bind = null;
    this.border = null;
    this.calculate = null;
    this.caption = null;
    this.desc = null;
    this.extras = null;
    this.font = null;
    this.format = null;
    this.items = new _xfa_object.XFAObjectArray(2);
    this.keep = null;
    this.margin = null;
    this.para = null;
    this.traversal = null;
    this.ui = null;
    this.validate = null;
    this.value = null;
    this.bindItems = new _xfa_object.XFAObjectArray();
    this.connect = new _xfa_object.XFAObjectArray();
    this.event = new _xfa_object.XFAObjectArray();
    this.setProperty = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$setValue](value) {
    _setValue(this, value);
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (!this.ui || this.presence === "hidden" || this.presence === "inactive" || this.h === 0 || this.w === 0) {
      return _utils.HTMLResult.EMPTY;
    }

    (0, _html_utils.fixDimensions)(this);

    switch (checkDimensions(this, availableSpace)) {
      case NOTHING:
        return _utils.HTMLResult.EMPTY;

      case NOSPACE:
        return _utils.HTMLResult.FAILURE;

      default:
        break;
    }

    const style = (0, _html_utils.toStyle)(this, "font", "dimensions", "position", "rotate", "anchorType", "presence", "borderMarginPadding", "hAlign");
    const classNames = ["xfaField"];

    if (this.font) {
      classNames.push("xfaFont");
    }

    const attributes = {
      style,
      id: this[_xfa_object.$uid],
      class: classNames.join(" ")
    };

    if (this.name) {
      attributes.xfaName = this.name;
    }

    const children = [];
    let html = {
      name: "div",
      attributes,
      children
    };
    const bbox = (0, _html_utils.computeBbox)(this, html, availableSpace);
    html = (0, _html_utils.addExtraDivForBorder)(html);
    const ui = this.ui ? this.ui[_xfa_object.$toHTML]().html : null;

    if (!ui) {
      return _utils.HTMLResult.success(html, bbox);
    }

    if (!ui.attributes.style) {
      ui.attributes.style = Object.create(null);
    }

    children.push(ui);

    if (this.value) {
      if (this.ui.imageEdit) {
        ui.children.push(this.value[_xfa_object.$toHTML]().html);
      } else if (ui.name !== "button") {
        const value = this.value[_xfa_object.$toHTML]().html;

        if (value) {
          if (ui.children[0].name === "textarea") {
            ui.children[0].attributes.textContent = value.value;
          } else {
            ui.children[0].attributes.value = value.value;
          }
        }
      }
    }

    const caption = this.caption ? this.caption[_xfa_object.$toHTML]().html : null;

    if (!caption) {
      return _utils.HTMLResult.success(html, bbox);
    }

    if (ui.name === "button") {
      ui.attributes.style.background = style.background;
      delete style.background;

      if (caption.name === "div") {
        caption.name = "span";
      }

      ui.children.push(caption);
      return _utils.HTMLResult.success(html, bbox);
    }

    ui.children.splice(0, 0, caption);

    switch (this.caption.placement) {
      case "left":
        ui.attributes.style.flexDirection = "row";
        break;

      case "right":
        ui.attributes.style.flexDirection = "row-reverse";
        break;

      case "top":
        ui.attributes.style.alignItems = "start";
        ui.attributes.style.flexDirection = "column";
        break;

      case "bottom":
        ui.attributes.style.alignItems = "start";
        ui.attributes.style.flexDirection = "column-reverse";
        break;

      case "inline":
        delete ui.attributes.class;
        caption.attributes.style.float = "left";
        break;
    }

    return _utils.HTMLResult.success(html, bbox);
  }

}

exports.Field = Field;

class Fill extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "fill", true);
    this.id = attributes.id || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
    this.linear = null;
    this.pattern = null;
    this.radial = null;
    this.solid = null;
    this.stipple = null;
  }

  [_xfa_object.$toStyle]() {
    const parent = this[_xfa_object.$getParent]();

    let propName = "color";

    if (parent instanceof Border) {
      propName = "background";
    }

    const style = Object.create(null);

    for (const name of Object.getOwnPropertyNames(this)) {
      if (name === "extras" || name === "color") {
        continue;
      }

      const obj = this[name];

      if (!(obj instanceof _xfa_object.XFAObject)) {
        continue;
      }

      style[propName] = obj[_xfa_object.$toStyle](this.color);
      return style;
    }

    if (this.color) {
      style[propName] = this.color[_xfa_object.$toStyle]();
    }

    return style;
  }

}

class Filter extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "filter", true);
    this.addRevocationInfo = (0, _utils.getStringOption)(attributes.addRevocationInfo, ["", "required", "optional", "none"]);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.version = (0, _utils.getInteger)({
      data: this.version,
      defaultValue: 5,
      validate: x => x >= 1 && x <= 5
    });
    this.appearanceFilter = null;
    this.certificates = null;
    this.digestMethods = null;
    this.encodings = null;
    this.encryptionMethods = null;
    this.handler = null;
    this.lockDocument = null;
    this.mdp = null;
    this.reasons = null;
    this.timeStamp = null;
  }

}

class Float extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "float");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    const number = parseFloat(this[_xfa_object.$content].trim());
    this[_xfa_object.$content] = isNaN(number) ? null : number;
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content] !== null ? this[_xfa_object.$content].toString() : "");
  }

}

class Font extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "font", true);
    this.baselineShift = (0, _utils.getMeasurement)(attributes.baselineShift);
    this.fontHorizontalScale = (0, _utils.getFloat)({
      data: attributes.fontHorizontalScale,
      defaultValue: 100,
      validate: x => x >= 0
    });
    this.fontVerticalScale = (0, _utils.getFloat)({
      data: attributes.fontVerticalScale,
      defaultValue: 100,
      validate: x => x >= 0
    });
    this.id = attributes.id || "";
    this.kerningMode = (0, _utils.getStringOption)(attributes.kerningMode, ["none", "pair"]);
    this.letterSpacing = (0, _utils.getMeasurement)(attributes.letterSpacing, "0");
    this.lineThrough = (0, _utils.getInteger)({
      data: attributes.lineThrough,
      defaultValue: 0,
      validate: x => x === 1 || x === 2
    });
    this.lineThroughPeriod = (0, _utils.getStringOption)(attributes.lineThroughPeriod, ["all", "word"]);
    this.overline = (0, _utils.getInteger)({
      data: attributes.overline,
      defaultValue: 0,
      validate: x => x === 1 || x === 2
    });
    this.overlinePeriod = (0, _utils.getStringOption)(attributes.overlinePeriod, ["all", "word"]);
    this.posture = (0, _utils.getStringOption)(attributes.posture, ["normal", "italic"]);
    this.size = (0, _utils.getMeasurement)(attributes.size, "10pt");
    this.typeface = attributes.typeface || "";
    this.underline = (0, _utils.getInteger)({
      data: attributes.underline,
      defaultValue: 0,
      validate: x => x === 1 || x === 2
    });
    this.underlinePeriod = (0, _utils.getStringOption)(attributes.underlinePeriod, ["all", "word"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.weight = (0, _utils.getStringOption)(attributes.weight, ["normal", "bold"]);
    this.extras = null;
    this.fill = null;
  }

  [_xfa_object.$toStyle]() {
    const style = (0, _html_utils.toStyle)(this, "fill");
    const color = style.color;

    if (color) {
      if (color === "#000000") {
        delete style.color;
      } else if (!color.startsWith("#")) {
        style.background = color;
        style.backgroundClip = "text";
        style.color = "transparent";
      }
    }

    if (this.baselineShift) {
      style.verticalAlign = (0, _html_utils.measureToString)(this.baselineShift);
    }

    if (this.kerningMode !== "none") {
      style.fontKerning = "normal";
    }

    if (this.letterSpacing) {
      style.letterSpacing = (0, _html_utils.measureToString)(this.letterSpacing);
    }

    if (this.lineThrough !== 0) {
      style.textDecoration = "line-through";

      if (this.lineThrough === 2) {
        style.textDecorationStyle = "double";
      }
    }

    if (this.overline !== 0) {
      style.textDecoration = "overline";

      if (this.overline === 2) {
        style.textDecorationStyle = "double";
      }
    }

    if (this.posture !== "normal") {
      style.fontStyle = this.posture;
    }

    const fontSize = (0, _html_utils.measureToString)(0.99 * this.size);

    if (fontSize !== "10px") {
      style.fontSize = fontSize;
    }

    style.fontFamily = (0, _html_utils.getFonts)(this.typeface);

    if (this.underline !== 0) {
      style.textDecoration = "underline";

      if (this.underline === 2) {
        style.textDecorationStyle = "double";
      }
    }

    if (this.weight !== "normal") {
      style.fontWeight = this.weight;
    }

    return style;
  }

}

class Format extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "format", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.picture = null;
  }

}

class Handler extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "handler");
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Hyphenation extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "hyphenation");
    this.excludeAllCaps = (0, _utils.getInteger)({
      data: attributes.excludeAllCaps,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.excludeInitialCap = (0, _utils.getInteger)({
      data: attributes.excludeInitialCap,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.hyphenate = (0, _utils.getInteger)({
      data: attributes.hyphenate,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.id = attributes.id || "";
    this.pushCharacterCount = (0, _utils.getInteger)({
      data: attributes.pushCharacterCount,
      defaultValue: 3,
      validate: x => x >= 0
    });
    this.remainCharacterCount = (0, _utils.getInteger)({
      data: attributes.remainCharacterCount,
      defaultValue: 3,
      validate: x => x >= 0
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.wordCharacterCount = (0, _utils.getInteger)({
      data: attributes.wordCharacterCount,
      defaultValue: 7,
      validate: x => x >= 0
    });
  }

}

class Image extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "image");
    this.aspect = (0, _utils.getStringOption)(attributes.aspect, ["fit", "actual", "height", "none", "width"]);
    this.contentType = attributes.contentType || "";
    this.href = attributes.href || "";
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.transferEncoding = (0, _utils.getStringOption)(attributes.transferEncoding, ["base64", "none", "package"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$toHTML]() {
    if (this.href || !this[_xfa_object.$content]) {
      return _utils.HTMLResult.EMPTY;
    }

    if (this.transferEncoding === "base64") {
      const buffer = (0, _util.stringToBytes)(atob(this[_xfa_object.$content]));
      const blob = new Blob([buffer], {
        type: this.contentType
      });
      return _utils.HTMLResult.success({
        name: "img",
        attributes: {
          class: "xfaImage",
          style: {},
          src: URL.createObjectURL(blob)
        }
      });
    }

    return _utils.HTMLResult.EMPTY;
  }

}

class ImageEdit extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "imageEdit", true);
    this.data = (0, _utils.getStringOption)(attributes.data, ["link", "embed"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.extras = null;
    this.margin = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (this.data === "embed") {
      return _utils.HTMLResult.success({
        name: "div",
        children: [],
        attributes: {}
      });
    }

    return _utils.HTMLResult.EMPTY;
  }

}

class Integer extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "integer");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    const number = parseInt(this[_xfa_object.$content].trim(), 10);
    this[_xfa_object.$content] = isNaN(number) ? null : number;
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content] !== null ? this[_xfa_object.$content].toString() : "");
  }

}

class Issuers extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "issuers", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.certificate = new _xfa_object.XFAObjectArray();
  }

}

class Items extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "items", true);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.ref = attributes.ref || "";
    this.save = (0, _utils.getInteger)({
      data: attributes.save,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.boolean = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$hasItem](value) {
    return this.hasOwnProperty(value[_xfa_object.$nodeName]) && this[value[_xfa_object.$nodeName]].children.some(node => node[_xfa_object.$content] === value[_xfa_object.$content]);
  }

  [_xfa_object.$toHTML]() {
    const output = [];

    for (const child of this[_xfa_object.$getChildren]()) {
      output.push(child[_xfa_object.$text]());
    }

    return _utils.HTMLResult.success(output);
  }

}

exports.Items = Items;

class Keep extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "keep", true);
    this.id = attributes.id || "";
    const options = ["none", "contentArea", "pageArea"];
    this.intact = (0, _utils.getStringOption)(attributes.intact, options);
    this.next = (0, _utils.getStringOption)(attributes.next, options);
    this.previous = (0, _utils.getStringOption)(attributes.previous, options);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

}

class KeyUsage extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "keyUsage");
    const options = ["", "yes", "no"];
    this.crlSign = (0, _utils.getStringOption)(attributes.crlSign, options);
    this.dataEncipherment = (0, _utils.getStringOption)(attributes.dataEncipherment, options);
    this.decipherOnly = (0, _utils.getStringOption)(attributes.decipherOnly, options);
    this.digitalSignature = (0, _utils.getStringOption)(attributes.digitalSignature, options);
    this.encipherOnly = (0, _utils.getStringOption)(attributes.encipherOnly, options);
    this.id = attributes.id || "";
    this.keyAgreement = (0, _utils.getStringOption)(attributes.keyAgreement, options);
    this.keyCertSign = (0, _utils.getStringOption)(attributes.keyCertSign, options);
    this.keyEncipherment = (0, _utils.getStringOption)(attributes.keyEncipherment, options);
    this.nonRepudiation = (0, _utils.getStringOption)(attributes.nonRepudiation, options);
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Line extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "line", true);
    this.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    this.id = attributes.id || "";
    this.slope = (0, _utils.getStringOption)(attributes.slope, ["\\", "/"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.edge = null;
  }

}

class Linear extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "linear", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["toRight", "toBottom", "toLeft", "toTop"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
  }

  [_xfa_object.$toStyle](startColor) {
    startColor = startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
    const transf = this.type.replace(/([RBLT])/, " $1").toLowerCase();
    const endColor = this.color ? this.color[_xfa_object.$toStyle]() : "#000000";
    return `linear-gradient(${transf}, ${startColor}, ${endColor})`;
  }

}

class LockDocument extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "lockDocument");
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    this[_xfa_object.$content] = (0, _utils.getStringOption)(this[_xfa_object.$content], ["auto", "0", "1"]);
  }

}

class Manifest extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "manifest", true);
    this.action = (0, _utils.getStringOption)(attributes.action, ["include", "all", "exclude"]);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.ref = new _xfa_object.XFAObjectArray();
  }

}

class Margin extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "margin", true);
    this.bottomInset = (0, _utils.getMeasurement)(attributes.bottomInset, "0");
    this.id = attributes.id || "";
    this.leftInset = (0, _utils.getMeasurement)(attributes.leftInset, "0");
    this.rightInset = (0, _utils.getMeasurement)(attributes.rightInset, "0");
    this.topInset = (0, _utils.getMeasurement)(attributes.topInset, "0");
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

  [_xfa_object.$toStyle]() {
    return {
      margin: (0, _html_utils.measureToString)(this.topInset) + " " + (0, _html_utils.measureToString)(this.rightInset) + " " + (0, _html_utils.measureToString)(this.bottomInset) + " " + (0, _html_utils.measureToString)(this.leftInset)
    };
  }

}

class Mdp extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "mdp");
    this.id = attributes.id || "";
    this.permissions = (0, _utils.getInteger)({
      data: attributes.permissions,
      defaultValue: 2,
      validate: x => x === 1 || x === 3
    });
    this.signatureType = (0, _utils.getStringOption)(attributes.signatureType, ["filler", "author"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Medium extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "medium");
    this.id = attributes.id || "";
    this.imagingBBox = (0, _utils.getBBox)(attributes.imagingBBox);
    this.long = (0, _utils.getMeasurement)(attributes.long);
    this.orientation = (0, _utils.getStringOption)(attributes.orientation, ["portrait", "landscape"]);
    this.short = (0, _utils.getMeasurement)(attributes.short);
    this.stock = attributes.stock || "";
    this.trayIn = (0, _utils.getStringOption)(attributes.trayIn, ["auto", "delegate", "pageFront"]);
    this.trayOut = (0, _utils.getStringOption)(attributes.trayOut, ["auto", "delegate"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Message extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "message", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.text = new _xfa_object.XFAObjectArray();
  }

}

class NumericEdit extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "numericEdit", true);
    this.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.comb = null;
    this.extras = null;
    this.margin = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const style = (0, _html_utils.toStyle)(this, "border", "font", "margin");
    const html = {
      name: "input",
      attributes: {
        type: "text",
        fieldId: this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$uid],
        class: "xfaTextfield",
        style
      }
    };
    return _utils.HTMLResult.success({
      name: "label",
      attributes: {
        class: "xfaLabel"
      },
      children: [html]
    });
  }

}

class Occur extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "occur", true);
    this.id = attributes.id || "";
    this.initial = (0, _utils.getInteger)({
      data: attributes.initial,
      defaultValue: 1,
      validate: x => true
    });
    this.max = (0, _utils.getInteger)({
      data: attributes.max,
      defaultValue: 1,
      validate: x => true
    });
    this.min = (0, _utils.getInteger)({
      data: attributes.min,
      defaultValue: 1,
      validate: x => true
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

}

class Oid extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "oid");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Oids extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "oids", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.oid = new _xfa_object.XFAObjectArray();
  }

}

class Overflow extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "overflow");
    this.id = attributes.id || "";
    this.leader = attributes.leader || "";
    this.target = attributes.target || "";
    this.trailer = attributes.trailer || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class PageArea extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "pageArea", true);
    this.blankOrNotBlank = (0, _utils.getStringOption)(attributes.blankOrNotBlank, ["any", "blank", "notBlank"]);
    this.id = attributes.id || "";
    this.initialNumber = (0, _utils.getInteger)({
      data: attributes.initialNumber,
      defaultValue: 1,
      validate: x => true
    });
    this.name = attributes.name || "";
    this.numbered = (0, _utils.getInteger)({
      data: attributes.numbered,
      defaultValue: 1,
      validate: x => true
    });
    this.oddOrEven = (0, _utils.getStringOption)(attributes.oddOrEven, ["any", "even", "odd"]);
    this.pagePosition = (0, _utils.getStringOption)(attributes.pagePosition, ["any", "first", "last", "only", "rest"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.desc = null;
    this.extras = null;
    this.medium = null;
    this.occur = null;
    this.area = new _xfa_object.XFAObjectArray();
    this.contentArea = new _xfa_object.XFAObjectArray();
    this.draw = new _xfa_object.XFAObjectArray();
    this.exclGroup = new _xfa_object.XFAObjectArray();
    this.field = new _xfa_object.XFAObjectArray();
    this.subform = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$getNextPage]() {
    if (!this[_xfa_object.$extra]) {
      this[_xfa_object.$extra] = {
        numberOfUse: 1
      };
    }

    const parent = this[_xfa_object.$getParent]();

    if (parent.relation === "orderedOccurrence") {
      if (this.occur && (this.occur.max === -1 || this[_xfa_object.$extra].numberOfUse < this.occur.max)) {
        this[_xfa_object.$extra].numberOfUse += 1;
        return this;
      }
    }

    delete this[_xfa_object.$extra];
    return parent[_xfa_object.$getNextPage]();
  }

  [_xfa_object.$getAvailableSpace]() {
    return {
      width: Infinity,
      height: Infinity
    };
  }

  [_xfa_object.$toHTML]() {
    if (!this[_xfa_object.$extra]) {
      this[_xfa_object.$extra] = {
        numberOfUse: 1
      };
    }

    const children = [];
    this[_xfa_object.$extra].children = children;
    const style = Object.create(null);

    if (this.medium && this.medium.short && this.medium.long) {
      style.width = (0, _html_utils.measureToString)(this.medium.short);
      style.height = (0, _html_utils.measureToString)(this.medium.long);

      if (this.medium.orientation === "landscape") {
        const x = style.width;
        style.width = style.height;
        style.height = x;
      }
    } else {
      (0, _util.warn)("XFA - No medium specified in pageArea: please file a bug.");
    }

    this[_xfa_object.$childrenToHTML]({
      filter: new Set(["area", "draw", "field", "subform", "contentArea"]),
      include: true
    });

    return _utils.HTMLResult.success({
      name: "div",
      children,
      attributes: {
        id: this[_xfa_object.$uid],
        style
      }
    });
  }

}

class PageSet extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "pageSet", true);
    this.duplexImposition = (0, _utils.getStringOption)(attributes.duplexImposition, ["longEdge", "shortEdge"]);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.relation = (0, _utils.getStringOption)(attributes.relation, ["orderedOccurrence", "duplexPaginated", "simplexPaginated"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.occur = null;
    this.pageArea = new _xfa_object.XFAObjectArray();
    this.pageSet = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$getNextPage]() {
    if (!this[_xfa_object.$extra]) {
      this[_xfa_object.$extra] = {
        numberOfUse: 1,
        currentIndex: -1
      };
    }

    if (this.relation === "orderedOccurrence") {
      if (this[_xfa_object.$extra].currentIndex + 1 < this.pageArea.children.length) {
        this[_xfa_object.$extra].currentIndex += 1;
        return this.pageArea.children[this[_xfa_object.$extra].currentIndex];
      }

      if (this[_xfa_object.$extra].currentIndex + 1 < this.pageSet.children.length) {
        this[_xfa_object.$extra].currentIndex += 1;
        return this.pageSet.children[this[_xfa_object.$extra].currentIndex];
      }

      if (this.occur && (this.occur.max === -1 || this[_xfa_object.$extra].numberOfUse < this.occur.max)) {
        this[_xfa_object.$extra].numberOfUse += 1;
        this[_xfa_object.$extra].currentIndex = 0;

        if (this.pageArea.children.length > 0) {
          return this.pageArea.children[0];
        }

        return this.pageSet.children[0][_xfa_object.$getNextPage]();
      }

      delete this[_xfa_object.$extra];

      const parent = this[_xfa_object.$getParent]();

      if (parent instanceof PageSet) {
        return parent[_xfa_object.$getNextPage]();
      }

      return this[_xfa_object.$getNextPage]();
    }

    const pageNumber = getRoot(this)[_xfa_object.$extra].pageNumber;

    const parity = pageNumber % 2 === 0 ? "even" : "odd";
    const position = pageNumber === 0 ? "first" : "rest";
    let page = this.pageArea.children.find(p => p.oddOrEven === parity && p.pagePosition === position);

    if (page) {
      return page;
    }

    page = this.pageArea.children.find(p => p.oddOrEven === "any" && p.pagePosition === position);

    if (page) {
      return page;
    }

    page = this.pageArea.children.find(p => p.oddOrEven === "any" && p.pagePosition === "any");

    if (page) {
      return page;
    }

    return this.pageArea.children[0];
  }

}

class Para extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "para", true);
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.lineHeight = attributes.lineHeight ? (0, _utils.getMeasurement)(attributes.lineHeight, "0pt") : "";
    this.marginLeft = attributes.marginLeft ? (0, _utils.getMeasurement)(attributes.marginLeft, "0pt") : "";
    this.marginRight = attributes.marginRight ? (0, _utils.getMeasurement)(attributes.marginRight, "0pt") : "";
    this.orphans = (0, _utils.getInteger)({
      data: attributes.orphans,
      defaultValue: 0,
      validate: x => x >= 0
    });
    this.preserve = attributes.preserve || "";
    this.radixOffset = attributes.radixOffset ? (0, _utils.getMeasurement)(attributes.radixOffset, "0pt") : "";
    this.spaceAbove = attributes.spaceAbove ? (0, _utils.getMeasurement)(attributes.spaceAbove, "0pt") : "";
    this.spaceBelow = attributes.spaceBelow ? (0, _utils.getMeasurement)(attributes.spaceBelow, "0pt") : "";
    this.tabDefault = attributes.tabDefault ? (0, _utils.getMeasurement)(this.tabDefault) : "";
    this.tabStops = (attributes.tabStops || "").trim().split(/\s+/).map((x, i) => i % 2 === 1 ? (0, _utils.getMeasurement)(x) : x);
    this.textIndent = attributes.textIndent ? (0, _utils.getMeasurement)(attributes.textIndent, "0pt") : "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.vAlign = (0, _utils.getStringOption)(attributes.vAlign, ["top", "bottom", "middle"]);
    this.widows = (0, _utils.getInteger)({
      data: attributes.widows,
      defaultValue: 0,
      validate: x => x >= 0
    });
    this.hyphenation = null;
  }

  [_xfa_object.$toStyle]() {
    const style = (0, _html_utils.toStyle)(this, "hAlign");

    if (this.marginLeft !== "") {
      style.marginLeft = (0, _html_utils.measureToString)(this.marginLeft);
    }

    if (this.marginRight !== "") {
      style.marginRight = (0, _html_utils.measureToString)(this.marginRight);
    }

    if (this.spaceAbove !== "") {
      style.marginTop = (0, _html_utils.measureToString)(this.spaceAbove);
    }

    if (this.spaceBelow !== "") {
      style.marginBottom = (0, _html_utils.measureToString)(this.spaceBelow);
    }

    if (this.textIndent !== "") {
      style.textIndent = (0, _html_utils.measureToString)(this.textIndent);
      (0, _html_utils.fixTextIndent)(style);
    }

    if (this.lineHeight > 0) {
      style.lineHeight = (0, _html_utils.measureToString)(this.lineHeight);
    }

    if (this.tabDefault !== "") {
      style.tabSize = (0, _html_utils.measureToString)(this.tabDefault);
    }

    if (this.tabStops.length > 0) {}

    if (this.hyphenatation) {
      Object.assign(style, this.hyphenatation[_xfa_object.$toStyle]());
    }

    return style;
  }

}

class PasswordEdit extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "passwordEdit", true);
    this.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    this.id = attributes.id || "";
    this.passwordChar = attributes.passwordChar || "*";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.extras = null;
    this.margin = null;
  }

}

class Pattern extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "pattern", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["crossHatch", "crossDiagonal", "diagonalLeft", "diagonalRight", "horizontal", "vertical"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
  }

  [_xfa_object.$toStyle](startColor) {
    startColor = startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
    const endColor = this.color ? this.color[_xfa_object.$toStyle]() : "#000000";
    const width = 5;
    const cmd = "repeating-linear-gradient";
    const colors = `${startColor},${startColor} ${width}px,${endColor} ${width}px,${endColor} ${2 * width}px`;

    switch (this.type) {
      case "crossHatch":
        return `${cmd}(to top,${colors}) ${cmd}(to right,${colors})`;

      case "crossDiagonal":
        return `${cmd}(45deg,${colors}) ${cmd}(-45deg,${colors})`;

      case "diagonalLeft":
        return `${cmd}(45deg,${colors})`;

      case "diagonalRight":
        return `${cmd}(-45deg,${colors})`;

      case "horizontal":
        return `${cmd}(to top,${colors})`;

      case "vertical":
        return `${cmd}(to right,${colors})`;
    }

    return "";
  }

}

class Picture extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "picture");
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Proto extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "proto", true);
    this.appearanceFilter = new _xfa_object.XFAObjectArray();
    this.arc = new _xfa_object.XFAObjectArray();
    this.area = new _xfa_object.XFAObjectArray();
    this.assist = new _xfa_object.XFAObjectArray();
    this.barcode = new _xfa_object.XFAObjectArray();
    this.bindItems = new _xfa_object.XFAObjectArray();
    this.bookend = new _xfa_object.XFAObjectArray();
    this.boolean = new _xfa_object.XFAObjectArray();
    this.border = new _xfa_object.XFAObjectArray();
    this.break = new _xfa_object.XFAObjectArray();
    this.breakAfter = new _xfa_object.XFAObjectArray();
    this.breakBefore = new _xfa_object.XFAObjectArray();
    this.button = new _xfa_object.XFAObjectArray();
    this.calculate = new _xfa_object.XFAObjectArray();
    this.caption = new _xfa_object.XFAObjectArray();
    this.certificate = new _xfa_object.XFAObjectArray();
    this.certificates = new _xfa_object.XFAObjectArray();
    this.checkButton = new _xfa_object.XFAObjectArray();
    this.choiceList = new _xfa_object.XFAObjectArray();
    this.color = new _xfa_object.XFAObjectArray();
    this.comb = new _xfa_object.XFAObjectArray();
    this.connect = new _xfa_object.XFAObjectArray();
    this.contentArea = new _xfa_object.XFAObjectArray();
    this.corner = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.dateTimeEdit = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.defaultUi = new _xfa_object.XFAObjectArray();
    this.desc = new _xfa_object.XFAObjectArray();
    this.digestMethod = new _xfa_object.XFAObjectArray();
    this.digestMethods = new _xfa_object.XFAObjectArray();
    this.draw = new _xfa_object.XFAObjectArray();
    this.edge = new _xfa_object.XFAObjectArray();
    this.encoding = new _xfa_object.XFAObjectArray();
    this.encodings = new _xfa_object.XFAObjectArray();
    this.encrypt = new _xfa_object.XFAObjectArray();
    this.encryptData = new _xfa_object.XFAObjectArray();
    this.encryption = new _xfa_object.XFAObjectArray();
    this.encryptionMethod = new _xfa_object.XFAObjectArray();
    this.encryptionMethods = new _xfa_object.XFAObjectArray();
    this.event = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.exObject = new _xfa_object.XFAObjectArray();
    this.exclGroup = new _xfa_object.XFAObjectArray();
    this.execute = new _xfa_object.XFAObjectArray();
    this.extras = new _xfa_object.XFAObjectArray();
    this.field = new _xfa_object.XFAObjectArray();
    this.fill = new _xfa_object.XFAObjectArray();
    this.filter = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.font = new _xfa_object.XFAObjectArray();
    this.format = new _xfa_object.XFAObjectArray();
    this.handler = new _xfa_object.XFAObjectArray();
    this.hyphenation = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.imageEdit = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.issuers = new _xfa_object.XFAObjectArray();
    this.items = new _xfa_object.XFAObjectArray();
    this.keep = new _xfa_object.XFAObjectArray();
    this.keyUsage = new _xfa_object.XFAObjectArray();
    this.line = new _xfa_object.XFAObjectArray();
    this.linear = new _xfa_object.XFAObjectArray();
    this.lockDocument = new _xfa_object.XFAObjectArray();
    this.manifest = new _xfa_object.XFAObjectArray();
    this.margin = new _xfa_object.XFAObjectArray();
    this.mdp = new _xfa_object.XFAObjectArray();
    this.medium = new _xfa_object.XFAObjectArray();
    this.message = new _xfa_object.XFAObjectArray();
    this.numericEdit = new _xfa_object.XFAObjectArray();
    this.occur = new _xfa_object.XFAObjectArray();
    this.oid = new _xfa_object.XFAObjectArray();
    this.oids = new _xfa_object.XFAObjectArray();
    this.overflow = new _xfa_object.XFAObjectArray();
    this.pageArea = new _xfa_object.XFAObjectArray();
    this.pageSet = new _xfa_object.XFAObjectArray();
    this.para = new _xfa_object.XFAObjectArray();
    this.passwordEdit = new _xfa_object.XFAObjectArray();
    this.pattern = new _xfa_object.XFAObjectArray();
    this.picture = new _xfa_object.XFAObjectArray();
    this.radial = new _xfa_object.XFAObjectArray();
    this.reason = new _xfa_object.XFAObjectArray();
    this.reasons = new _xfa_object.XFAObjectArray();
    this.rectangle = new _xfa_object.XFAObjectArray();
    this.ref = new _xfa_object.XFAObjectArray();
    this.script = new _xfa_object.XFAObjectArray();
    this.setProperty = new _xfa_object.XFAObjectArray();
    this.signData = new _xfa_object.XFAObjectArray();
    this.signature = new _xfa_object.XFAObjectArray();
    this.signing = new _xfa_object.XFAObjectArray();
    this.solid = new _xfa_object.XFAObjectArray();
    this.speak = new _xfa_object.XFAObjectArray();
    this.stipple = new _xfa_object.XFAObjectArray();
    this.subform = new _xfa_object.XFAObjectArray();
    this.subformSet = new _xfa_object.XFAObjectArray();
    this.subjectDN = new _xfa_object.XFAObjectArray();
    this.subjectDNs = new _xfa_object.XFAObjectArray();
    this.submit = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.textEdit = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
    this.timeStamp = new _xfa_object.XFAObjectArray();
    this.toolTip = new _xfa_object.XFAObjectArray();
    this.traversal = new _xfa_object.XFAObjectArray();
    this.traverse = new _xfa_object.XFAObjectArray();
    this.ui = new _xfa_object.XFAObjectArray();
    this.validate = new _xfa_object.XFAObjectArray();
    this.value = new _xfa_object.XFAObjectArray();
    this.variables = new _xfa_object.XFAObjectArray();
  }

}

class Radial extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "radial", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["toEdge", "toCenter"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
  }

  [_xfa_object.$toStyle](startColor) {
    startColor = startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
    const endColor = this.color ? this.color[_xfa_object.$toStyle]() : "#000000";
    const colors = this.type === "toEdge" ? `${startColor},${endColor}` : `${endColor},${startColor}`;
    return `radial-gradient(circle to center, ${colors})`;
  }

}

class Reason extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "reason");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Reasons extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "reasons", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.reason = new _xfa_object.XFAObjectArray();
  }

}

class Rectangle extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "rectangle", true);
    this.hand = (0, _utils.getStringOption)(attributes.hand, ["even", "left", "right"]);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.corner = new _xfa_object.XFAObjectArray(4);
    this.edge = new _xfa_object.XFAObjectArray(4);
    this.fill = null;
  }

}

class RefElement extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "ref");
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Script extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "script");
    this.binding = attributes.binding || "";
    this.contentType = attributes.contentType || "";
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.runAt = (0, _utils.getStringOption)(attributes.runAt, ["client", "both", "server"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class SetProperty extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "setProperty");
    this.connection = attributes.connection || "";
    this.ref = attributes.ref || "";
    this.target = attributes.target || "";
  }

}

exports.SetProperty = SetProperty;

class SignData extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "signData", true);
    this.id = attributes.id || "";
    this.operation = (0, _utils.getStringOption)(attributes.operation, ["sign", "clear", "verify"]);
    this.ref = attributes.ref || "";
    this.target = attributes.target || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.filter = null;
    this.manifest = null;
  }

}

class Signature extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "signature", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["PDF1.3", "PDF1.6"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.border = null;
    this.extras = null;
    this.filter = null;
    this.manifest = null;
    this.margin = null;
  }

}

class Signing extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "signing", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.certificate = new _xfa_object.XFAObjectArray();
  }

}

class Solid extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "solid", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
  }

  [_xfa_object.$toStyle](startColor) {
    return startColor ? startColor[_xfa_object.$toStyle]() : "#FFFFFF";
  }

}

class Speak extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "speak");
    this.disable = (0, _utils.getInteger)({
      data: attributes.disable,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.id = attributes.id || "";
    this.priority = (0, _utils.getStringOption)(attributes.priority, ["custom", "caption", "name", "toolTip"]);
    this.rid = attributes.rid || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Stipple extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "stipple", true);
    this.id = attributes.id || "";
    this.rate = (0, _utils.getInteger)({
      data: attributes.rate,
      defaultValue: 50,
      validate: x => x >= 0 && x <= 100
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.color = null;
    this.extras = null;
  }

  [_xfa_object.$toStyle](bgColor) {
    const alpha = this.rate / 100;
    return _util.Util.makeHexColor(Math.round(bgColor.value.r * (1 - alpha) + this.value.r * alpha), Math.round(bgColor.value.g * (1 - alpha) + this.value.g * alpha), Math.round(bgColor.value.b * (1 - alpha) + this.value.b * alpha));
  }

}

class Subform extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "subform", true);
    this.access = (0, _utils.getStringOption)(attributes.access, ["open", "nonInteractive", "protected", "readOnly"]);
    this.allowMacro = (0, _utils.getInteger)({
      data: attributes.allowMacro,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.anchorType = (0, _utils.getStringOption)(attributes.anchorType, ["topLeft", "bottomCenter", "bottomLeft", "bottomRight", "middleCenter", "middleLeft", "middleRight", "topCenter", "topRight"]);
    this.colSpan = (0, _utils.getInteger)({
      data: attributes.colSpan,
      defaultValue: 1,
      validate: n => n >= 1 || n === -1
    });
    this.columnWidths = (attributes.columnWidths || "").trim().split(/\s+/).map(x => x === "-1" ? -1 : (0, _utils.getMeasurement)(x));
    this.h = attributes.h ? (0, _utils.getMeasurement)(attributes.h) : "";
    this.hAlign = (0, _utils.getStringOption)(attributes.hAlign, ["left", "center", "justify", "justifyAll", "radix", "right"]);
    this.id = attributes.id || "";
    this.layout = (0, _utils.getStringOption)(attributes.layout, ["position", "lr-tb", "rl-row", "rl-tb", "row", "table", "tb"]);
    this.locale = attributes.locale || "";
    this.maxH = (0, _utils.getMeasurement)(attributes.maxH, "0pt");
    this.maxW = (0, _utils.getMeasurement)(attributes.maxW, "0pt");
    this.mergeMode = (0, _utils.getStringOption)(attributes.mergeMode, ["consumeData", "matchTemplate"]);
    this.minH = (0, _utils.getMeasurement)(attributes.minH, "0pt");
    this.minW = (0, _utils.getMeasurement)(attributes.minW, "0pt");
    this.name = attributes.name || "";
    this.presence = (0, _utils.getStringOption)(attributes.presence, ["visible", "hidden", "inactive", "invisible"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.restoreState = (0, _utils.getStringOption)(attributes.restoreState, ["manual", "auto"]);
    this.scope = (0, _utils.getStringOption)(attributes.scope, ["name", "none"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.w = attributes.w ? (0, _utils.getMeasurement)(attributes.w) : "";
    this.x = (0, _utils.getMeasurement)(attributes.x, "0pt");
    this.y = (0, _utils.getMeasurement)(attributes.y, "0pt");
    this.assist = null;
    this.bind = null;
    this.bookend = null;
    this.border = null;
    this.break = null;
    this.calculate = null;
    this.desc = null;
    this.extras = null;
    this.keep = null;
    this.margin = null;
    this.occur = null;
    this.overflow = null;
    this.pageSet = null;
    this.para = null;
    this.traversal = null;
    this.validate = null;
    this.variables = null;
    this.area = new _xfa_object.XFAObjectArray();
    this.breakAfter = new _xfa_object.XFAObjectArray();
    this.breakBefore = new _xfa_object.XFAObjectArray();
    this.connect = new _xfa_object.XFAObjectArray();
    this.draw = new _xfa_object.XFAObjectArray();
    this.event = new _xfa_object.XFAObjectArray();
    this.exObject = new _xfa_object.XFAObjectArray();
    this.exclGroup = new _xfa_object.XFAObjectArray();
    this.field = new _xfa_object.XFAObjectArray();
    this.proto = new _xfa_object.XFAObjectArray();
    this.setProperty = new _xfa_object.XFAObjectArray();
    this.subform = new _xfa_object.XFAObjectArray();
    this.subformSet = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$flushHTML]() {
    return (0, _layout.flushHTML)(this);
  }

  [_xfa_object.$addHTML](html, bbox) {
    (0, _layout.addHTML)(this, html, bbox);
  }

  [_xfa_object.$getAvailableSpace]() {
    return (0, _layout.getAvailableSpace)(this);
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (this.name === "helpText") {
      return _utils.HTMLResult.EMPTY;
    }

    if (this[_xfa_object.$extra] && this[_xfa_object.$extra].afterBreakAfter) {
      const ret = this[_xfa_object.$extra].afterBreakAfter;
      delete this[_xfa_object.$extra];
      return ret;
    }

    if (this.presence === "hidden" || this.presence === "inactive") {
      return _utils.HTMLResult.EMPTY;
    }

    if (this.breakBefore.children.length > 1 || this.breakAfter.children.length > 1) {
      (0, _util.warn)("XFA - Several breakBefore or breakAfter in subforms: please file a bug.");
    }

    (0, _html_utils.fixDimensions)(this);
    const children = [];
    const attributes = {
      id: this[_xfa_object.$uid]
    };

    if (!this[_xfa_object.$extra]) {
      this[_xfa_object.$extra] = Object.create(null);
    }

    Object.assign(this[_xfa_object.$extra], {
      children,
      attributes,
      attempt: 0,
      availableSpace,
      width: 0,
      height: 0,
      prevHeight: 0,
      currentWidth: 0
    });

    if (this.breakBefore.children.length >= 1) {
      const breakBefore = this.breakBefore.children[0];

      if (!breakBefore[_xfa_object.$extra]) {
        breakBefore[_xfa_object.$extra] = true;

        getRoot(this)[_xfa_object.$break](breakBefore);

        return _utils.HTMLResult.FAILURE;
      }
    }

    switch (checkDimensions(this, availableSpace)) {
      case NOTHING:
        return _utils.HTMLResult.EMPTY;

      case NOSPACE:
        return _utils.HTMLResult.FAILURE;

      default:
        break;
    }

    const filter = new Set(["area", "draw", "exclGroup", "field", "subform", "subformSet"]);

    if (this.layout.includes("row")) {
      const columnWidths = this[_xfa_object.$getParent]().columnWidths;

      if (Array.isArray(columnWidths) && columnWidths.length > 0) {
        this[_xfa_object.$extra].columnWidths = columnWidths;
        this[_xfa_object.$extra].currentColumn = 0;
      }
    }

    const style = (0, _html_utils.toStyle)(this, "anchorType", "dimensions", "position", "presence", "borderMarginPadding", "hAlign");
    const classNames = ["xfaSubform"];
    const cl = (0, _html_utils.layoutClass)(this);

    if (cl) {
      classNames.push(cl);
    }

    attributes.style = style;
    attributes.class = classNames.join(" ");

    if (this.name) {
      attributes.xfaName = this.name;
    }

    let failure;

    if (this.layout === "lr-tb" || this.layout === "rl-tb") {
      for (; this[_xfa_object.$extra].attempt < MAX_ATTEMPTS_FOR_LRTB_LAYOUT; this[_xfa_object.$extra].attempt++) {
        if (this[_xfa_object.$childrenToHTML]({
          filter,
          include: true
        })) {
          break;
        }
      }

      failure = this[_xfa_object.$extra].attempt === 2;
    } else {
      failure = !this[_xfa_object.$childrenToHTML]({
        filter,
        include: true
      });
    }

    if (failure) {
      return _utils.HTMLResult.FAILURE;
    }

    let marginH = 0;
    let marginV = 0;

    if (this.margin) {
      marginH = this.margin.leftInset + this.margin.rightInset;
      marginV = this.margin.topInset + this.margin.bottomInset;
    }

    if (this.w === "") {
      style.width = (0, _html_utils.measureToString)(this[_xfa_object.$extra].width + marginH);
    }

    if (this.h === "") {
      style.height = (0, _html_utils.measureToString)(this[_xfa_object.$extra].height + marginV);
    }

    let html = {
      name: "div",
      attributes,
      children
    };
    html = (0, _html_utils.addExtraDivForBorder)(html);
    let bbox;

    if (this.w !== "" && this.h !== "") {
      bbox = [this.x, this.y, this.w, this.h];
    } else {
      const width = this.w === "" ? marginH + this[_xfa_object.$extra].width : this.w;
      const height = this.h === "" ? marginV + this[_xfa_object.$extra].height : this.h;
      bbox = [this.x, this.y, width, height];
    }

    if (this.breakAfter.children.length >= 1) {
      const breakAfter = this.breakAfter.children[0];

      getRoot(this)[_xfa_object.$break](breakAfter);

      this[_xfa_object.$extra].afterBreakAfter = _utils.HTMLResult.success(html, bbox);
      return _utils.HTMLResult.FAILURE;
    }

    delete this[_xfa_object.$extra];
    return _utils.HTMLResult.success(html, bbox);
  }

}

class SubformSet extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "subformSet", true);
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.relation = (0, _utils.getStringOption)(attributes.relation, ["ordered", "choice", "unordered"]);
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.bookend = null;
    this.break = null;
    this.desc = null;
    this.extras = null;
    this.occur = null;
    this.overflow = null;
    this.breakAfter = new _xfa_object.XFAObjectArray();
    this.breakBefore = new _xfa_object.XFAObjectArray();
    this.subform = new _xfa_object.XFAObjectArray();
    this.subformSet = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$toHTML]() {
    const children = [];

    if (!this[_xfa_object.$extra]) {
      this[_xfa_object.$extra] = Object.create(null);
    }

    this[_xfa_object.$extra].children = children;

    this[_xfa_object.$childrenToHTML]({
      filter: new Set(["subform", "subformSet"]),
      include: true
    });

    return _utils.HTMLResult.success({
      name: "div",
      children,
      attributes: {
        id: this[_xfa_object.$uid]
      }
    });
  }

}

class SubjectDN extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "subjectDN");
    this.delimiter = attributes.delimiter || ",";
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    this[_xfa_object.$content] = new Map(this[_xfa_object.$content].split(this.delimiter).map(kv => {
      kv = kv.split("=", 2);
      kv[0] = kv[0].trim();
      return kv;
    }));
  }

}

class SubjectDNs extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "subjectDNs", true);
    this.id = attributes.id || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.subjectDN = new _xfa_object.XFAObjectArray();
  }

}

class Submit extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "submit", true);
    this.embedPDF = (0, _utils.getInteger)({
      data: attributes.embedPDF,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.format = (0, _utils.getStringOption)(attributes.format, ["xdp", "formdata", "pdf", "urlencoded", "xfd", "xml"]);
    this.id = attributes.id || "";
    this.target = attributes.target || "";
    this.textEncoding = (0, _utils.getKeyword)({
      data: attributes.textEncoding ? attributes.textEncoding.toLowerCase() : "",
      defaultValue: "",
      validate: k => ["utf-8", "big-five", "fontspecific", "gbk", "gb-18030", "gb-2312", "ksc-5601", "none", "shift-jis", "ucs-2", "utf-16"].includes(k) || k.match(/iso-8859-[0-9]{2}/)
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.xdpContent = attributes.xdpContent || "";
    this.encrypt = null;
    this.encryptData = new _xfa_object.XFAObjectArray();
    this.signData = new _xfa_object.XFAObjectArray();
  }

}

class Template extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "template", true);
    this.baseProfile = (0, _utils.getStringOption)(attributes.baseProfile, ["full", "interactiveForms"]);
    this.extras = null;
    this.subform = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$finalize]() {
    if (this.subform.children.length === 0) {
      (0, _util.warn)("XFA - No subforms in template node.");
    }

    if (this.subform.children.length >= 2) {
      (0, _util.warn)("XFA - Several subforms in template node: please file a bug.");
    }
  }

  [_xfa_object.$break](node) {
    this[_xfa_object.$extra].breakingNode = node;
  }

  [_xfa_object.$searchNode](expr, container) {
    if (expr.startsWith("#")) {
      return [this[_xfa_object.$ids].get(expr.slice(1))];
    }

    return (0, _som.searchNode)(this, container, expr, true, true);
  }

  [_xfa_object.$toHTML]() {
    if (!this.subform.children.length) {
      return _utils.HTMLResult.success({
        name: "div",
        children: []
      });
    }

    this[_xfa_object.$extra] = {
      breakingNode: null,
      pageNumber: 1,
      pagePosition: "first",
      oddOrEven: "odd",
      blankOrNotBlank: "nonBlank"
    };
    const root = this.subform.children[0];
    const pageAreas = root.pageSet.pageArea.children;
    const mainHtml = {
      name: "div",
      children: []
    };
    let pageArea = null;
    let breakBefore = null;
    let breakBeforeTarget = null;

    if (root.breakBefore.children.length >= 1) {
      breakBefore = root.breakBefore.children[0];
      breakBeforeTarget = breakBefore.target;
    } else if (root.subform.children.length >= 1 && root.subform.children[0].breakBefore.children.length >= 1) {
      breakBefore = root.subform.children[0].breakBefore.children[0];
      breakBeforeTarget = breakBefore.target;
    } else if (root.break && root.break.beforeTarget) {
      breakBefore = root.break;
      breakBeforeTarget = breakBefore.beforeTarget;
    } else if (root.subform.children.length >= 1 && root.subform.children[0].break && root.subform.children[0].break.beforeTarget) {
      breakBefore = root.subform.children[0].break;
      breakBeforeTarget = breakBefore.beforeTarget;
    }

    if (breakBefore) {
      const target = this[_xfa_object.$searchNode](breakBeforeTarget, breakBefore[_xfa_object.$getParent]());

      if (target instanceof PageArea) {
        pageArea = target;
        breakBefore[_xfa_object.$extra] = {};
      }
    }

    if (!pageArea) {
      pageArea = pageAreas[0];
    }

    const pageAreaParent = pageArea[_xfa_object.$getParent]();

    pageAreaParent[_xfa_object.$extra] = {
      numberOfUse: 1,
      currentIndex: pageAreaParent.pageArea.children.indexOf(pageArea)
    };
    let targetPageArea;
    let leader = null;
    let trailer = null;

    while (true) {
      targetPageArea = null;

      const page = pageArea[_xfa_object.$toHTML]().html;

      mainHtml.children.push(page);

      if (leader) {
        page.children.push(leader[_xfa_object.$toHTML](page[_xfa_object.$extra].space).html);
        leader = null;
      }

      if (trailer) {
        page.children.push(trailer[_xfa_object.$toHTML](page[_xfa_object.$extra].space).html);
        trailer = null;
      }

      const contentAreas = pageArea.contentArea.children;
      const htmlContentAreas = page.children.filter(node => node.attributes.class === "xfaContentarea");

      for (let i = 0, ii = contentAreas.length; i < ii; i++) {
        const contentArea = this[_xfa_object.$extra].currentContentArea = contentAreas[i];
        const space = {
          width: contentArea.w,
          height: contentArea.h
        };

        if (leader) {
          htmlContentAreas[i].children.push(leader[_xfa_object.$toHTML](space).html);
          leader = null;
        }

        if (trailer) {
          htmlContentAreas[i].children.push(trailer[_xfa_object.$toHTML](space).html);
          trailer = null;
        }

        let html = root[_xfa_object.$toHTML](space);

        if (html.success) {
          if (html.html) {
            htmlContentAreas[i].children.push(html.html);
          }

          return mainHtml;
        }

        let mustBreak = false;

        if (this[_xfa_object.$extra].breakingNode) {
          const node = this[_xfa_object.$extra].breakingNode;
          this[_xfa_object.$extra].breakingNode = null;

          if (node.targetType === "auto") {
            i--;
            continue;
          }

          const startNew = node.startNew === 1;

          if (node.leader) {
            leader = this[_xfa_object.$searchNode](node.leader, node[_xfa_object.$getParent]());
            leader = leader ? leader[0] : null;
          }

          if (node.trailer) {
            trailer = this[_xfa_object.$searchNode](node.trailer, node[_xfa_object.$getParent]());
            trailer = trailer ? trailer[0] : null;
          }

          let target = null;

          if (node.target) {
            target = this[_xfa_object.$searchNode](node.target, node[_xfa_object.$getParent]());
            target = target ? target[0] : target;
          }

          if (node.targetType === "pageArea") {
            if (startNew) {
              mustBreak = true;
            } else if (target === pageArea || !(target instanceof PageArea)) {
              i--;
              continue;
            } else {
              targetPageArea = target;
              mustBreak = true;
            }
          } else if (target === "contentArea" || !(target instanceof ContentArea)) {
            i--;
            continue;
          }
        }

        html = root[_xfa_object.$flushHTML]();

        if (html) {
          htmlContentAreas[i].children.push(html);
        }

        if (mustBreak) {
          break;
        }
      }

      this[_xfa_object.$extra].pageNumber += 1;
      pageArea = targetPageArea || pageArea[_xfa_object.$getNextPage]();
    }
  }

}

exports.Template = Template;

class Text extends _xfa_object.ContentObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "text");
    this.id = attributes.id || "";
    this.maxChars = (0, _utils.getInteger)({
      data: attributes.maxChars,
      defaultValue: 0,
      validate: x => x >= 0
    });
    this.name = attributes.name || "";
    this.rid = attributes.rid || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$onChild](child) {
    if (child[_xfa_object.$namespaceId] === _namespaces.NamespaceIds.xhtml.id) {
      this[_xfa_object.$content] = child;
      return true;
    }

    (0, _util.warn)(`XFA - Invalid content in Text: ${child[_xfa_object.$nodeName]}.`);
    return false;
  }

  [_xfa_object.$toHTML](availableSpace) {
    if (typeof this[_xfa_object.$content] === "string") {
      const html = {
        name: "span",
        attributes: {
          class: "xfaRich",
          style: {}
        },
        value: this[_xfa_object.$content]
      };

      if (this[_xfa_object.$content].includes("\u2029")) {
        html.name = "div";
        html.children = [];

        this[_xfa_object.$content].split("\u2029").map(para => para.split(/[\u2028\n]/).reduce((acc, line) => {
          acc.push({
            name: "span",
            value: line
          }, {
            name: "br"
          });
          return acc;
        }, [])).forEach(lines => {
          html.children.push({
            name: "p",
            children: lines
          });
        });
      } else if (/[\u2028\n]/.test(this[_xfa_object.$content])) {
        html.name = "div";
        html.children = [];

        this[_xfa_object.$content].split(/[\u2028\n]/).forEach(line => {
          html.children.push({
            name: "span",
            value: line
          }, {
            name: "br"
          });
        });
      }

      return _utils.HTMLResult.success(html);
    }

    return this[_xfa_object.$content][_xfa_object.$toHTML](availableSpace);
  }

}

exports.Text = Text;

class TextEdit extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "textEdit", true);
    this.allowRichText = (0, _utils.getInteger)({
      data: attributes.allowRichText,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.hScrollPolicy = (0, _utils.getStringOption)(attributes.hScrollPolicy, ["auto", "off", "on"]);
    this.id = attributes.id || "";
    this.multiLine = (0, _utils.getInteger)({
      data: attributes.multiLine,
      defaultValue: 1,
      validate: x => x === 0
    });
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.vScrollPolicy = (0, _utils.getStringOption)(attributes.vScrollPolicy, ["auto", "off", "on"]);
    this.border = null;
    this.comb = null;
    this.extras = null;
    this.margin = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    const style = (0, _html_utils.toStyle)(this, "border", "font", "margin");
    let html;

    if (this.multiLine === 1) {
      html = {
        name: "textarea",
        attributes: {
          fieldId: this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$uid],
          class: "xfaTextfield",
          style
        }
      };
    } else {
      html = {
        name: "input",
        attributes: {
          type: "text",
          fieldId: this[_xfa_object.$getParent]()[_xfa_object.$getParent]()[_xfa_object.$uid],
          class: "xfaTextfield",
          style
        }
      };
    }

    return _utils.HTMLResult.success({
      name: "label",
      attributes: {
        class: "xfaLabel"
      },
      children: [html]
    });
  }

}

class Time extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "time");
    this.id = attributes.id || "";
    this.name = attributes.name || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

  [_xfa_object.$finalize]() {
    this[_xfa_object.$content] = new Date(this[_xfa_object.$content]);
  }

  [_xfa_object.$toHTML](availableSpace) {
    return _utils.HTMLResult.success(this[_xfa_object.$content].toString());
  }

}

class TimeStamp extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "timeStamp");
    this.id = attributes.id || "";
    this.server = attributes.server || "";
    this.type = (0, _utils.getStringOption)(attributes.type, ["optional", "required"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class ToolTip extends _xfa_object.StringObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "toolTip");
    this.id = attributes.id || "";
    this.rid = attributes.rid || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
  }

}

class Traversal extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "traversal", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.traverse = new _xfa_object.XFAObjectArray();
  }

}

class Traverse extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "traverse", true);
    this.id = attributes.id || "";
    this.operation = (0, _utils.getStringOption)(attributes.operation, ["next", "back", "down", "first", "left", "right", "up"]);
    this.ref = attributes.ref || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.script = null;
  }

  get name() {
    return this.operation;
  }

  [_xfa_object.$isTransparent]() {
    return false;
  }

}

class Ui extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "ui", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.picture = null;
    this.barcode = null;
    this.button = null;
    this.checkButton = null;
    this.choiceList = null;
    this.dateTimeEdit = null;
    this.defaultUi = null;
    this.imageEdit = null;
    this.numericEdit = null;
    this.passwordEdit = null;
    this.signature = null;
    this.textEdit = null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    for (const name of Object.getOwnPropertyNames(this)) {
      if (name === "extras" || name === "picture") {
        continue;
      }

      const obj = this[name];

      if (!(obj instanceof _xfa_object.XFAObject)) {
        continue;
      }

      return obj[_xfa_object.$toHTML](availableSpace);
    }

    return _utils.HTMLResult.EMPTY;
  }

}

class Validate extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "validate", true);
    this.formatTest = (0, _utils.getStringOption)(attributes.formatTest, ["warning", "disabled", "error"]);
    this.id = attributes.id || "";
    this.nullTest = (0, _utils.getStringOption)(attributes.nullTest, ["disabled", "error", "warning"]);
    this.scriptTest = (0, _utils.getStringOption)(attributes.scriptTest, ["error", "disabled", "warning"]);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.extras = null;
    this.message = null;
    this.picture = null;
    this.script = null;
  }

}

class Value extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "value", true);
    this.id = attributes.id || "";
    this.override = (0, _utils.getInteger)({
      data: attributes.override,
      defaultValue: 0,
      validate: x => x === 1
    });
    this.relevant = (0, _utils.getRelevant)(attributes.relevant);
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.arc = null;
    this.boolean = null;
    this.date = null;
    this.dateTime = null;
    this.decimal = null;
    this.exData = null;
    this.float = null;
    this.image = null;
    this.integer = null;
    this.line = null;
    this.rectangle = null;
    this.text = null;
    this.time = null;
  }

  [_xfa_object.$setValue](value) {
    const parent = this[_xfa_object.$getParent]();

    if (parent instanceof Field) {
      if (parent.ui && parent.ui.imageEdit) {
        if (!this.image) {
          this.image = new Image({});
        }

        this.image[_xfa_object.$content] = value[_xfa_object.$content];
        return;
      }
    }

    const valueName = value[_xfa_object.$nodeName];

    if (this[valueName] !== null) {
      this[valueName][_xfa_object.$content] = value[_xfa_object.$content];
      return;
    }

    for (const name of Object.getOwnPropertyNames(this)) {
      const obj = this[name];

      if (obj instanceof _xfa_object.XFAObject) {
        this[name] = null;

        this[_xfa_object.$removeChild](obj);
      }
    }

    this[value[_xfa_object.$nodeName]] = value;

    this[_xfa_object.$appendChild](value);
  }

  [_xfa_object.$text]() {
    if (this.exData) {
      return this.exData[_xfa_object.$content][_xfa_object.$text]().trim();
    }

    for (const name of Object.getOwnPropertyNames(this)) {
      if (name === "image") {
        continue;
      }

      const obj = this[name];

      if (obj instanceof _xfa_object.XFAObject) {
        return (obj[_xfa_object.$content] || "").toString().trim();
      }
    }

    return null;
  }

  [_xfa_object.$toHTML](availableSpace) {
    for (const name of Object.getOwnPropertyNames(this)) {
      const obj = this[name];

      if (!(obj instanceof _xfa_object.XFAObject)) {
        continue;
      }

      return obj[_xfa_object.$toHTML](availableSpace);
    }

    return _utils.HTMLResult.EMPTY;
  }

}

exports.Value = Value;

class Variables extends _xfa_object.XFAObject {
  constructor(attributes) {
    super(TEMPLATE_NS_ID, "variables", true);
    this.id = attributes.id || "";
    this.use = attributes.use || "";
    this.usehref = attributes.usehref || "";
    this.boolean = new _xfa_object.XFAObjectArray();
    this.date = new _xfa_object.XFAObjectArray();
    this.dateTime = new _xfa_object.XFAObjectArray();
    this.decimal = new _xfa_object.XFAObjectArray();
    this.exData = new _xfa_object.XFAObjectArray();
    this.float = new _xfa_object.XFAObjectArray();
    this.image = new _xfa_object.XFAObjectArray();
    this.integer = new _xfa_object.XFAObjectArray();
    this.manifest = new _xfa_object.XFAObjectArray();
    this.script = new _xfa_object.XFAObjectArray();
    this.text = new _xfa_object.XFAObjectArray();
    this.time = new _xfa_object.XFAObjectArray();
  }

  [_xfa_object.$isTransparent]() {
    return true;
  }

}

class TemplateNamespace {
  static [_namespaces.$buildXFAObject](name, attributes) {
    if (TemplateNamespace.hasOwnProperty(name)) {
      const node = TemplateNamespace[name](attributes);

      node[_xfa_object.$setSetAttributes](attributes);

      return node;
    }

    return undefined;
  }

  static appearanceFilter(attrs) {
    return new AppearanceFilter(attrs);
  }

  static arc(attrs) {
    return new Arc(attrs);
  }

  static area(attrs) {
    return new Area(attrs);
  }

  static assist(attrs) {
    return new Assist(attrs);
  }

  static barcode(attrs) {
    return new Barcode(attrs);
  }

  static bind(attrs) {
    return new Bind(attrs);
  }

  static bindItems(attrs) {
    return new BindItems(attrs);
  }

  static bookend(attrs) {
    return new Bookend(attrs);
  }

  static boolean(attrs) {
    return new BooleanElement(attrs);
  }

  static border(attrs) {
    return new Border(attrs);
  }

  static break(attrs) {
    return new Break(attrs);
  }

  static breakAfter(attrs) {
    return new BreakAfter(attrs);
  }

  static breakBefore(attrs) {
    return new BreakBefore(attrs);
  }

  static button(attrs) {
    return new Button(attrs);
  }

  static calculate(attrs) {
    return new Calculate(attrs);
  }

  static caption(attrs) {
    return new Caption(attrs);
  }

  static certificate(attrs) {
    return new Certificate(attrs);
  }

  static certificates(attrs) {
    return new Certificates(attrs);
  }

  static checkButton(attrs) {
    return new CheckButton(attrs);
  }

  static choiceList(attrs) {
    return new ChoiceList(attrs);
  }

  static color(attrs) {
    return new Color(attrs);
  }

  static comb(attrs) {
    return new Comb(attrs);
  }

  static connect(attrs) {
    return new Connect(attrs);
  }

  static contentArea(attrs) {
    return new ContentArea(attrs);
  }

  static corner(attrs) {
    return new Corner(attrs);
  }

  static date(attrs) {
    return new DateElement(attrs);
  }

  static dateTime(attrs) {
    return new DateTime(attrs);
  }

  static dateTimeEdit(attrs) {
    return new DateTimeEdit(attrs);
  }

  static decimal(attrs) {
    return new Decimal(attrs);
  }

  static defaultUi(attrs) {
    return new DefaultUi(attrs);
  }

  static desc(attrs) {
    return new Desc(attrs);
  }

  static digestMethod(attrs) {
    return new DigestMethod(attrs);
  }

  static digestMethods(attrs) {
    return new DigestMethods(attrs);
  }

  static draw(attrs) {
    return new Draw(attrs);
  }

  static edge(attrs) {
    return new Edge(attrs);
  }

  static encoding(attrs) {
    return new Encoding(attrs);
  }

  static encodings(attrs) {
    return new Encodings(attrs);
  }

  static encrypt(attrs) {
    return new Encrypt(attrs);
  }

  static encryptData(attrs) {
    return new EncryptData(attrs);
  }

  static encryption(attrs) {
    return new Encryption(attrs);
  }

  static encryptionMethod(attrs) {
    return new EncryptionMethod(attrs);
  }

  static encryptionMethods(attrs) {
    return new EncryptionMethods(attrs);
  }

  static event(attrs) {
    return new Event(attrs);
  }

  static exData(attrs) {
    return new ExData(attrs);
  }

  static exObject(attrs) {
    return new ExObject(attrs);
  }

  static exclGroup(attrs) {
    return new ExclGroup(attrs);
  }

  static execute(attrs) {
    return new Execute(attrs);
  }

  static extras(attrs) {
    return new Extras(attrs);
  }

  static field(attrs) {
    return new Field(attrs);
  }

  static fill(attrs) {
    return new Fill(attrs);
  }

  static filter(attrs) {
    return new Filter(attrs);
  }

  static float(attrs) {
    return new Float(attrs);
  }

  static font(attrs) {
    return new Font(attrs);
  }

  static format(attrs) {
    return new Format(attrs);
  }

  static handler(attrs) {
    return new Handler(attrs);
  }

  static hyphenation(attrs) {
    return new Hyphenation(attrs);
  }

  static image(attrs) {
    return new Image(attrs);
  }

  static imageEdit(attrs) {
    return new ImageEdit(attrs);
  }

  static integer(attrs) {
    return new Integer(attrs);
  }

  static issuers(attrs) {
    return new Issuers(attrs);
  }

  static items(attrs) {
    return new Items(attrs);
  }

  static keep(attrs) {
    return new Keep(attrs);
  }

  static keyUsage(attrs) {
    return new KeyUsage(attrs);
  }

  static line(attrs) {
    return new Line(attrs);
  }

  static linear(attrs) {
    return new Linear(attrs);
  }

  static lockDocument(attrs) {
    return new LockDocument(attrs);
  }

  static manifest(attrs) {
    return new Manifest(attrs);
  }

  static margin(attrs) {
    return new Margin(attrs);
  }

  static mdp(attrs) {
    return new Mdp(attrs);
  }

  static medium(attrs) {
    return new Medium(attrs);
  }

  static message(attrs) {
    return new Message(attrs);
  }

  static numericEdit(attrs) {
    return new NumericEdit(attrs);
  }

  static occur(attrs) {
    return new Occur(attrs);
  }

  static oid(attrs) {
    return new Oid(attrs);
  }

  static oids(attrs) {
    return new Oids(attrs);
  }

  static overflow(attrs) {
    return new Overflow(attrs);
  }

  static pageArea(attrs) {
    return new PageArea(attrs);
  }

  static pageSet(attrs) {
    return new PageSet(attrs);
  }

  static para(attrs) {
    return new Para(attrs);
  }

  static passwordEdit(attrs) {
    return new PasswordEdit(attrs);
  }

  static pattern(attrs) {
    return new Pattern(attrs);
  }

  static picture(attrs) {
    return new Picture(attrs);
  }

  static proto(attrs) {
    return new Proto(attrs);
  }

  static radial(attrs) {
    return new Radial(attrs);
  }

  static reason(attrs) {
    return new Reason(attrs);
  }

  static reasons(attrs) {
    return new Reasons(attrs);
  }

  static rectangle(attrs) {
    return new Rectangle(attrs);
  }

  static ref(attrs) {
    return new RefElement(attrs);
  }

  static script(attrs) {
    return new Script(attrs);
  }

  static setProperty(attrs) {
    return new SetProperty(attrs);
  }

  static signData(attrs) {
    return new SignData(attrs);
  }

  static signature(attrs) {
    return new Signature(attrs);
  }

  static signing(attrs) {
    return new Signing(attrs);
  }

  static solid(attrs) {
    return new Solid(attrs);
  }

  static speak(attrs) {
    return new Speak(attrs);
  }

  static stipple(attrs) {
    return new Stipple(attrs);
  }

  static subform(attrs) {
    return new Subform(attrs);
  }

  static subformSet(attrs) {
    return new SubformSet(attrs);
  }

  static subjectDN(attrs) {
    return new SubjectDN(attrs);
  }

  static subjectDNs(attrs) {
    return new SubjectDNs(attrs);
  }

  static submit(attrs) {
    return new Submit(attrs);
  }

  static template(attrs) {
    return new Template(attrs);
  }

  static text(attrs) {
    return new Text(attrs);
  }

  static textEdit(attrs) {
    return new TextEdit(attrs);
  }

  static time(attrs) {
    return new Time(attrs);
  }

  static timeStamp(attrs) {
    return new TimeStamp(attrs);
  }

  static toolTip(attrs) {
    return new ToolTip(attrs);
  }

  static traversal(attrs) {
    return new Traversal(attrs);
  }

  static traverse(attrs) {
    return new Traverse(attrs);
  }

  static ui(attrs) {
    return new Ui(attrs);
  }

  static validate(attrs) {
    return new Validate(attrs);
  }

  static value(attrs) {
    return new Value(attrs);
  }

  static variables(attrs) {
    return new Variables(attrs);
  }

}

exports.TemplateNamespace = TemplateNamespace;