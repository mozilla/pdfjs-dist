/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2019 Mozilla Foundation
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
exports.clearPrimitiveCaches = clearPrimitiveCaches;
exports.isEOF = isEOF;
exports.isCmd = isCmd;
exports.isDict = isDict;
exports.isName = isName;
exports.isRef = isRef;
exports.isRefsEqual = isRefsEqual;
exports.isStream = isStream;
exports.RefSetCache = exports.RefSet = exports.Ref = exports.Name = exports.Dict = exports.Cmd = exports.EOF = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _util = require("../shared/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var EOF = {};
exports.EOF = EOF;

var Name = function NameClosure() {
  var nameCache = Object.create(null);

  function Name(name) {
    this.name = name;
  }

  Name.prototype = {};

  Name.get = function Name_get(name) {
    var nameValue = nameCache[name];
    return nameValue ? nameValue : nameCache[name] = new Name(name);
  };

  Name._clearCache = function () {
    nameCache = Object.create(null);
  };

  return Name;
}();

exports.Name = Name;

var Cmd = function CmdClosure() {
  var cmdCache = Object.create(null);

  function Cmd(cmd) {
    this.cmd = cmd;
  }

  Cmd.prototype = {};

  Cmd.get = function Cmd_get(cmd) {
    var cmdValue = cmdCache[cmd];
    return cmdValue ? cmdValue : cmdCache[cmd] = new Cmd(cmd);
  };

  Cmd._clearCache = function () {
    cmdCache = Object.create(null);
  };

  return Cmd;
}();

exports.Cmd = Cmd;

var Dict = function DictClosure() {
  var nonSerializable = function nonSerializableClosure() {
    return nonSerializable;
  };

  function Dict(xref) {
    this._map = Object.create(null);
    this.xref = xref;
    this.objId = null;
    this.suppressEncryption = false;
    this.__nonSerializable__ = nonSerializable;
  }

  Dict.prototype = {
    assignXref: function Dict_assignXref(newXref) {
      this.xref = newXref;
    },
    get: function get(key1, key2, key3) {
      var value = this._map[key1];

      if (value === undefined && !(key1 in this._map) && key2 !== undefined) {
        value = this._map[key2];

        if (value === undefined && !(key2 in this._map) && key3 !== undefined) {
          value = this._map[key3];
        }
      }

      if (value instanceof Ref && this.xref) {
        return this.xref.fetch(value, this.suppressEncryption);
      }

      return value;
    },
    getAsync: function () {
      var _getAsync = _asyncToGenerator(
      /*#__PURE__*/
      _regenerator["default"].mark(function _callee(key1, key2, key3) {
        var value;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                value = this._map[key1];

                if (value === undefined && !(key1 in this._map) && key2 !== undefined) {
                  value = this._map[key2];

                  if (value === undefined && !(key2 in this._map) && key3 !== undefined) {
                    value = this._map[key3];
                  }
                }

                if (!(value instanceof Ref && this.xref)) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt("return", this.xref.fetchAsync(value, this.suppressEncryption));

              case 4:
                return _context.abrupt("return", value);

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAsync(_x, _x2, _x3) {
        return _getAsync.apply(this, arguments);
      }

      return getAsync;
    }(),
    getArray: function getArray(key1, key2, key3) {
      var value = this.get(key1, key2, key3);

      if (!Array.isArray(value) || !this.xref) {
        return value;
      }

      value = value.slice();

      for (var i = 0, ii = value.length; i < ii; i++) {
        if (!(value[i] instanceof Ref)) {
          continue;
        }

        value[i] = this.xref.fetch(value[i], this.suppressEncryption);
      }

      return value;
    },
    getRaw: function Dict_getRaw(key) {
      return this._map[key];
    },
    getKeys: function Dict_getKeys() {
      return Object.keys(this._map);
    },
    set: function Dict_set(key, value) {
      this._map[key] = value;
    },
    has: function Dict_has(key) {
      return key in this._map;
    },
    forEach: function Dict_forEach(callback) {
      for (var key in this._map) {
        callback(key, this.get(key));
      }
    }
  };
  Dict.empty = new Dict(null);

  Dict.merge = function (xref, dictArray) {
    var mergedDict = new Dict(xref);

    for (var i = 0, ii = dictArray.length; i < ii; i++) {
      var dict = dictArray[i];

      if (!isDict(dict)) {
        continue;
      }

      for (var keyName in dict._map) {
        if (mergedDict._map[keyName] !== undefined) {
          continue;
        }

        mergedDict._map[keyName] = dict._map[keyName];
      }
    }

    return mergedDict;
  };

  return Dict;
}();

exports.Dict = Dict;

var Ref = function RefClosure() {
  var refCache = Object.create(null);

  function Ref(num, gen) {
    this.num = num;
    this.gen = gen;
  }

  Ref.prototype = {
    toString: function Ref_toString() {
      if (this.gen === 0) {
        return "".concat(this.num, "R");
      }

      return "".concat(this.num, "R").concat(this.gen);
    }
  };

  Ref.get = function (num, gen) {
    var key = gen === 0 ? "".concat(num, "R") : "".concat(num, "R").concat(gen);
    var refValue = refCache[key];
    return refValue ? refValue : refCache[key] = new Ref(num, gen);
  };

  Ref._clearCache = function () {
    refCache = Object.create(null);
  };

  return Ref;
}();

exports.Ref = Ref;

var RefSet = function RefSetClosure() {
  function RefSet() {
    this.dict = Object.create(null);
  }

  RefSet.prototype = {
    has: function RefSet_has(ref) {
      return ref.toString() in this.dict;
    },
    put: function RefSet_put(ref) {
      this.dict[ref.toString()] = true;
    },
    remove: function RefSet_remove(ref) {
      delete this.dict[ref.toString()];
    }
  };
  return RefSet;
}();

exports.RefSet = RefSet;

var RefSetCache = function RefSetCacheClosure() {
  function RefSetCache() {
    this.dict = Object.create(null);
  }

  RefSetCache.prototype = {
    get: function RefSetCache_get(ref) {
      return this.dict[ref.toString()];
    },
    has: function RefSetCache_has(ref) {
      return ref.toString() in this.dict;
    },
    put: function RefSetCache_put(ref, obj) {
      this.dict[ref.toString()] = obj;
    },
    putAlias: function RefSetCache_putAlias(ref, aliasRef) {
      this.dict[ref.toString()] = this.get(aliasRef);
    },
    forEach: function RefSetCache_forEach(fn, thisArg) {
      for (var i in this.dict) {
        fn.call(thisArg, this.dict[i]);
      }
    },
    clear: function RefSetCache_clear() {
      this.dict = Object.create(null);
    }
  };
  return RefSetCache;
}();

exports.RefSetCache = RefSetCache;

function isEOF(v) {
  return v === EOF;
}

function isName(v, name) {
  return v instanceof Name && (name === undefined || v.name === name);
}

function isCmd(v, cmd) {
  return v instanceof Cmd && (cmd === undefined || v.cmd === cmd);
}

function isDict(v, type) {
  return v instanceof Dict && (type === undefined || isName(v.get('Type'), type));
}

function isRef(v) {
  return v instanceof Ref;
}

function isRefsEqual(v1, v2) {
  return v1.num === v2.num && v1.gen === v2.gen;
}

function isStream(v) {
  return _typeof(v) === 'object' && v !== null && v.getBytes !== undefined;
}

function clearPrimitiveCaches() {
  Cmd._clearCache();

  Name._clearCache();

  Ref._clearCache();
}