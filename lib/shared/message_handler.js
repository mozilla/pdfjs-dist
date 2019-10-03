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
exports.MessageHandler = MessageHandler;

var _util = require("./util");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var StreamKind = {
  UNKNOWN: 0,
  CANCEL: 1,
  CANCEL_COMPLETE: 2,
  CLOSE: 3,
  ENQUEUE: 4,
  ERROR: 5,
  PULL: 6,
  PULL_COMPLETE: 7,
  START_COMPLETE: 8
};

function wrapReason(reason) {
  if (_typeof(reason) !== 'object') {
    return reason;
  }

  switch (reason.name) {
    case 'AbortException':
      return new _util.AbortException(reason.message);

    case 'MissingPDFException':
      return new _util.MissingPDFException(reason.message);

    case 'UnexpectedResponseException':
      return new _util.UnexpectedResponseException(reason.message, reason.status);

    case 'UnknownErrorException':
      return new _util.UnknownErrorException(reason.message, reason.details);

    default:
      return new _util.UnknownErrorException(reason.message, reason.toString());
  }
}

function MessageHandler(sourceName, targetName, comObj) {
  var _this = this;

  this.sourceName = sourceName;
  this.targetName = targetName;
  this.comObj = comObj;
  this.callbackId = 1;
  this.streamId = 1;
  this.postMessageTransfers = true;
  this.streamSinks = Object.create(null);
  this.streamControllers = Object.create(null);
  var callbacksCapabilities = this.callbacksCapabilities = Object.create(null);
  var ah = this.actionHandler = Object.create(null);

  this._onComObjOnMessage = function (event) {
    var data = event.data;

    if (data.targetName !== _this.sourceName) {
      return;
    }

    if (data.stream) {
      _this._processStreamMessage(data);
    } else if (data.isReply) {
      var callbackId = data.callbackId;

      if (data.callbackId in callbacksCapabilities) {
        var callback = callbacksCapabilities[callbackId];
        delete callbacksCapabilities[callbackId];

        if ('reason' in data) {
          callback.reject(wrapReason(data.reason));
        } else {
          callback.resolve(data.data);
        }
      } else {
        throw new Error("Cannot resolve callback ".concat(callbackId));
      }
    } else if (data.action in ah) {
      var action = ah[data.action];

      if (data.callbackId) {
        var _sourceName = _this.sourceName;
        var _targetName = data.sourceName;
        new Promise(function (resolve) {
          resolve(action(data.data));
        }).then(function (result) {
          comObj.postMessage({
            sourceName: _sourceName,
            targetName: _targetName,
            isReply: true,
            callbackId: data.callbackId,
            data: result
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName: _sourceName,
            targetName: _targetName,
            isReply: true,
            callbackId: data.callbackId,
            reason: wrapReason(reason)
          });
        });
      } else if (data.streamId) {
        _this._createStreamSink(data);
      } else {
        action(data.data);
      }
    } else {
      throw new Error("Unknown action from worker: ".concat(data.action));
    }
  };

  comObj.addEventListener('message', this._onComObjOnMessage);
}

MessageHandler.prototype = {
  on: function on(actionName, handler) {
    var ah = this.actionHandler;

    if (ah[actionName]) {
      throw new Error("There is already an actionName called \"".concat(actionName, "\""));
    }

    ah[actionName] = handler;
  },
  send: function send(actionName, data, transfers) {
    this.postMessage({
      sourceName: this.sourceName,
      targetName: this.targetName,
      action: actionName,
      data: data
    }, transfers);
  },
  sendWithPromise: function sendWithPromise(actionName, data, transfers) {
    var callbackId = this.callbackId++;
    var capability = (0, _util.createPromiseCapability)();
    this.callbacksCapabilities[callbackId] = capability;

    try {
      this.postMessage({
        sourceName: this.sourceName,
        targetName: this.targetName,
        action: actionName,
        callbackId: callbackId,
        data: data
      }, transfers);
    } catch (ex) {
      capability.reject(ex);
    }

    return capability.promise;
  },
  sendWithStream: function sendWithStream(actionName, data, queueingStrategy, transfers) {
    var _this2 = this;

    var streamId = this.streamId++;
    var sourceName = this.sourceName;
    var targetName = this.targetName;
    var comObj = this.comObj;
    return new _util.ReadableStream({
      start: function start(controller) {
        var startCapability = (0, _util.createPromiseCapability)();
        _this2.streamControllers[streamId] = {
          controller: controller,
          startCall: startCapability,
          pullCall: null,
          cancelCall: null,
          isClosed: false
        };

        _this2.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          action: actionName,
          streamId: streamId,
          data: data,
          desiredSize: controller.desiredSize
        }, transfers);

        return startCapability.promise;
      },
      pull: function pull(controller) {
        var pullCapability = (0, _util.createPromiseCapability)();
        _this2.streamControllers[streamId].pullCall = pullCapability;
        comObj.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.PULL,
          streamId: streamId,
          desiredSize: controller.desiredSize
        });
        return pullCapability.promise;
      },
      cancel: function cancel(reason) {
        (0, _util.assert)(reason instanceof Error, 'cancel must have a valid reason');
        var cancelCapability = (0, _util.createPromiseCapability)();
        _this2.streamControllers[streamId].cancelCall = cancelCapability;
        _this2.streamControllers[streamId].isClosed = true;
        comObj.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.CANCEL,
          streamId: streamId,
          reason: wrapReason(reason)
        });
        return cancelCapability.promise;
      }
    }, queueingStrategy);
  },
  _createStreamSink: function _createStreamSink(data) {
    var self = this;
    var action = this.actionHandler[data.action];
    var streamId = data.streamId;
    var desiredSize = data.desiredSize;
    var sourceName = this.sourceName;
    var targetName = data.sourceName;
    var capability = (0, _util.createPromiseCapability)();
    var comObj = this.comObj;
    var streamSink = {
      enqueue: function enqueue(chunk) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
        var transfers = arguments.length > 2 ? arguments[2] : undefined;

        if (this.isCancelled) {
          return;
        }

        var lastDesiredSize = this.desiredSize;
        this.desiredSize -= size;

        if (lastDesiredSize > 0 && this.desiredSize <= 0) {
          this.sinkCapability = (0, _util.createPromiseCapability)();
          this.ready = this.sinkCapability.promise;
        }

        self.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.ENQUEUE,
          streamId: streamId,
          chunk: chunk
        }, transfers);
      },
      close: function close() {
        if (this.isCancelled) {
          return;
        }

        this.isCancelled = true;
        comObj.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.CLOSE,
          streamId: streamId
        });
        delete self.streamSinks[streamId];
      },
      error: function error(reason) {
        (0, _util.assert)(reason instanceof Error, 'error must have a valid reason');

        if (this.isCancelled) {
          return;
        }

        this.isCancelled = true;
        comObj.postMessage({
          sourceName: sourceName,
          targetName: targetName,
          stream: StreamKind.ERROR,
          streamId: streamId,
          reason: wrapReason(reason)
        });
      },
      sinkCapability: capability,
      onPull: null,
      onCancel: null,
      isCancelled: false,
      desiredSize: desiredSize,
      ready: null
    };
    streamSink.sinkCapability.resolve();
    streamSink.ready = streamSink.sinkCapability.promise;
    this.streamSinks[streamId] = streamSink;
    new Promise(function (resolve) {
      resolve(action(data.data, streamSink));
    }).then(function () {
      comObj.postMessage({
        sourceName: sourceName,
        targetName: targetName,
        stream: StreamKind.START_COMPLETE,
        streamId: streamId,
        success: true
      });
    }, function (reason) {
      comObj.postMessage({
        sourceName: sourceName,
        targetName: targetName,
        stream: StreamKind.START_COMPLETE,
        streamId: streamId,
        reason: wrapReason(reason)
      });
    });
  },
  _processStreamMessage: function _processStreamMessage(data) {
    var _this3 = this;

    var sourceName = this.sourceName;
    var targetName = data.sourceName;
    var streamId = data.streamId;
    var comObj = this.comObj;

    var deleteStreamController = function deleteStreamController() {
      Promise.all([_this3.streamControllers[streamId].startCall, _this3.streamControllers[streamId].pullCall, _this3.streamControllers[streamId].cancelCall].map(function (capability) {
        return capability && capability.promise["catch"](function () {});
      })).then(function () {
        delete _this3.streamControllers[streamId];
      });
    };

    switch (data.stream) {
      case StreamKind.START_COMPLETE:
        if (data.success) {
          this.streamControllers[streamId].startCall.resolve();
        } else {
          this.streamControllers[streamId].startCall.reject(wrapReason(data.reason));
        }

        break;

      case StreamKind.PULL_COMPLETE:
        if (data.success) {
          this.streamControllers[streamId].pullCall.resolve();
        } else {
          this.streamControllers[streamId].pullCall.reject(wrapReason(data.reason));
        }

        break;

      case StreamKind.PULL:
        if (!this.streamSinks[streamId]) {
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId: streamId,
            success: true
          });
          break;
        }

        if (this.streamSinks[streamId].desiredSize <= 0 && data.desiredSize > 0) {
          this.streamSinks[streamId].sinkCapability.resolve();
        }

        this.streamSinks[streamId].desiredSize = data.desiredSize;
        var onPull = this.streamSinks[data.streamId].onPull;
        new Promise(function (resolve) {
          resolve(onPull && onPull());
        }).then(function () {
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId: streamId,
            success: true
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.PULL_COMPLETE,
            streamId: streamId,
            reason: wrapReason(reason)
          });
        });
        break;

      case StreamKind.ENQUEUE:
        (0, _util.assert)(this.streamControllers[streamId], 'enqueue should have stream controller');

        if (this.streamControllers[streamId].isClosed) {
          break;
        }

        this.streamControllers[streamId].controller.enqueue(data.chunk);
        break;

      case StreamKind.CLOSE:
        (0, _util.assert)(this.streamControllers[streamId], 'close should have stream controller');

        if (this.streamControllers[streamId].isClosed) {
          break;
        }

        this.streamControllers[streamId].isClosed = true;
        this.streamControllers[streamId].controller.close();
        deleteStreamController();
        break;

      case StreamKind.ERROR:
        (0, _util.assert)(this.streamControllers[streamId], 'error should have stream controller');
        this.streamControllers[streamId].controller.error(wrapReason(data.reason));
        deleteStreamController();
        break;

      case StreamKind.CANCEL_COMPLETE:
        if (data.success) {
          this.streamControllers[streamId].cancelCall.resolve();
        } else {
          this.streamControllers[streamId].cancelCall.reject(wrapReason(data.reason));
        }

        deleteStreamController();
        break;

      case StreamKind.CANCEL:
        if (!this.streamSinks[streamId]) {
          break;
        }

        var onCancel = this.streamSinks[data.streamId].onCancel;
        new Promise(function (resolve) {
          resolve(onCancel && onCancel(wrapReason(data.reason)));
        }).then(function () {
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.CANCEL_COMPLETE,
            streamId: streamId,
            success: true
          });
        }, function (reason) {
          comObj.postMessage({
            sourceName: sourceName,
            targetName: targetName,
            stream: StreamKind.CANCEL_COMPLETE,
            streamId: streamId,
            reason: wrapReason(reason)
          });
        });
        this.streamSinks[streamId].sinkCapability.reject(wrapReason(data.reason));
        this.streamSinks[streamId].isCancelled = true;
        delete this.streamSinks[streamId];
        break;

      default:
        throw new Error('Unexpected stream case');
    }
  },
  postMessage: function postMessage(message, transfers) {
    if (transfers && this.postMessageTransfers) {
      this.comObj.postMessage(message, transfers);
    } else {
      this.comObj.postMessage(message);
    }
  },
  destroy: function destroy() {
    this.comObj.removeEventListener('message', this._onComObjOnMessage);
  }
};