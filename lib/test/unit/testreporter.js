/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2020 Mozilla Foundation
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

var TestReporter = function (browser) {
  function send(action, json, cb) {
    var r = new XMLHttpRequest();
    r.open("POST", action, true);
    r.setRequestHeader("Content-Type", "application/json");

    r.onreadystatechange = function sendTaskResultOnreadystatechange(e) {
      if (r.readyState === 4) {
        if (r.status !== 200) {
          send(action, json, cb);
        } else {
          if (cb) {
            cb();
          }
        }
      }
    };

    json.browser = browser;
    r.send(JSON.stringify(json));
  }

  function sendInfo(message) {
    send("/info", {
      message
    });
  }

  function sendResult(status, description, error) {
    var message = {
      status,
      description
    };

    if (typeof error !== "undefined") {
      message.error = error;
    }

    send("/submit_task_results", message);
  }

  function sendQuitRequest() {
    send(`/tellMeToQuit?browser=${escape(browser)}`, {});
  }

  this.now = function () {
    return new Date().getTime();
  };

  this.jasmineStarted = function (suiteInfo) {
    this.runnerStartTime = this.now();
    const total = suiteInfo.totalSpecsDefined;
    const seed = suiteInfo.order.seed;
    sendInfo(`Started ${total} tests for ${browser} with seed ${seed}.`);
  };

  this.suiteStarted = function (result) {
    if (result.failedExpectations.length > 0) {
      let failedMessages = "";

      for (const item of result.failedExpectations) {
        failedMessages += `${item.message} `;
      }

      sendResult("TEST-UNEXPECTED-FAIL", result.description, failedMessages);
    }
  };

  this.specStarted = function (result) {};

  this.specDone = function (result) {
    if (result.failedExpectations.length === 0) {
      sendResult("TEST-PASSED", result.description);
    } else {
      let failedMessages = "";

      for (const item of result.failedExpectations) {
        failedMessages += `${item.message} `;
      }

      sendResult("TEST-UNEXPECTED-FAIL", result.description, failedMessages);
    }
  };

  this.suiteDone = function (result) {};

  this.jasmineDone = function () {
    setTimeout(sendQuitRequest, 500);
  };
};