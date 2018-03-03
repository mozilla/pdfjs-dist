/**
 * @licstart The following is the entire license notice for the
 * Javascript code in this page
 *
 * Copyright 2017 Mozilla Foundation
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
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var compatibilityParams = Object.create(null);
{
  var userAgent = typeof navigator !== 'undefined' && navigator.userAgent || '';
  var isIE = /Trident/.test(userAgent);
  var isIOS = /\b(iPad|iPhone|iPod)(?=;)/.test(userAgent);
  var isIOSChrome = /CriOS/.test(userAgent);
  var isSafari = /Safari\//.test(userAgent) && !/(Chrome\/|Android\s)/.test(userAgent);
  (function checkOnBlobSupport() {
    if (isIE || isIOSChrome) {
      compatibilityParams.disableCreateObjectURL = true;
    }
  })();
  (function checkRangeRequests() {
    if (isSafari || isIOS) {
      compatibilityParams.disableRange = true;
      compatibilityParams.disableStream = true;
    }
  })();
}
var apiCompatibilityParams = Object.freeze(compatibilityParams);
exports.apiCompatibilityParams = apiCompatibilityParams;