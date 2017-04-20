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

var webUiUtils = require('../../web/ui_utils.js');
var sharedUtil = require('../../shared/util.js');
var binarySearchFirstItem = webUiUtils.binarySearchFirstItem;
var getPDFFileNameFromURL = webUiUtils.getPDFFileNameFromURL;
var EventBus = webUiUtils.EventBus;
var createObjectURL = sharedUtil.createObjectURL;
describe('ui_utils', function () {
  describe('binary search', function () {
    function isTrue(boolean) {
      return boolean;
    }
    function isGreater3(number) {
      return number > 3;
    }
    it('empty array', function () {
      expect(binarySearchFirstItem([], isTrue)).toEqual(0);
    });
    it('single boolean entry', function () {
      expect(binarySearchFirstItem([false], isTrue)).toEqual(1);
      expect(binarySearchFirstItem([true], isTrue)).toEqual(0);
    });
    it('three boolean entries', function () {
      expect(binarySearchFirstItem([true, true, true], isTrue)).toEqual(0);
      expect(binarySearchFirstItem([false, true, true], isTrue)).toEqual(1);
      expect(binarySearchFirstItem([false, false, true], isTrue)).toEqual(2);
      expect(binarySearchFirstItem([false, false, false], isTrue)).toEqual(3);
    });
    it('three numeric entries', function () {
      expect(binarySearchFirstItem([0, 1, 2], isGreater3)).toEqual(3);
      expect(binarySearchFirstItem([2, 3, 4], isGreater3)).toEqual(2);
      expect(binarySearchFirstItem([4, 5, 6], isGreater3)).toEqual(0);
    });
  });
  describe('getPDFFileNameFromURL', function () {
    it('gets PDF filename', function () {
      expect(getPDFFileNameFromURL('/pdfs/file1.pdf')).toEqual('file1.pdf');
      expect(getPDFFileNameFromURL('http://www.example.com/pdfs/file2.pdf')).toEqual('file2.pdf');
    });
    it('gets fallback filename', function () {
      expect(getPDFFileNameFromURL('/pdfs/file1.txt')).toEqual('document.pdf');
      expect(getPDFFileNameFromURL('http://www.example.com/pdfs/file2.txt')).toEqual('document.pdf');
    });
    it('gets custom fallback filename', function () {
      expect(getPDFFileNameFromURL('/pdfs/file1.txt', 'qwerty1.pdf')).toEqual('qwerty1.pdf');
      expect(getPDFFileNameFromURL('http://www.example.com/pdfs/file2.txt', 'qwerty2.pdf')).toEqual('qwerty2.pdf');
      expect(getPDFFileNameFromURL('/pdfs/file3.txt', '')).toEqual('');
    });
    it('gets PDF filename from URL containing leading/trailing whitespace', function () {
      expect(getPDFFileNameFromURL('   /pdfs/file1.pdf   ')).toEqual('file1.pdf');
      expect(getPDFFileNameFromURL('   http://www.example.com/pdfs/file2.pdf   ')).toEqual('file2.pdf');
    });
    it('gets PDF filename from query string', function () {
      expect(getPDFFileNameFromURL('/pdfs/pdfs.html?name=file1.pdf')).toEqual('file1.pdf');
      expect(getPDFFileNameFromURL('http://www.example.com/pdfs/pdf.html?file2.pdf')).toEqual('file2.pdf');
    });
    it('gets PDF filename from hash string', function () {
      expect(getPDFFileNameFromURL('/pdfs/pdfs.html#name=file1.pdf')).toEqual('file1.pdf');
      expect(getPDFFileNameFromURL('http://www.example.com/pdfs/pdf.html#file2.pdf')).toEqual('file2.pdf');
    });
    it('gets correct PDF filename when multiple ones are present', function () {
      expect(getPDFFileNameFromURL('/pdfs/file1.pdf?name=file.pdf')).toEqual('file1.pdf');
      expect(getPDFFileNameFromURL('http://www.example.com/pdfs/file2.pdf#file.pdf')).toEqual('file2.pdf');
    });
    it('gets PDF filename from URI-encoded data', function () {
      var encodedUrl = encodeURIComponent('http://www.example.com/pdfs/file1.pdf');
      expect(getPDFFileNameFromURL(encodedUrl)).toEqual('file1.pdf');
      var encodedUrlWithQuery = encodeURIComponent('http://www.example.com/pdfs/file.txt?file2.pdf');
      expect(getPDFFileNameFromURL(encodedUrlWithQuery)).toEqual('file2.pdf');
    });
    it('gets PDF filename from data mistaken for URI-encoded', function () {
      expect(getPDFFileNameFromURL('/pdfs/%AA.pdf')).toEqual('%AA.pdf');
      expect(getPDFFileNameFromURL('/pdfs/%2F.pdf')).toEqual('%2F.pdf');
    });
    it('gets PDF filename from (some) standard protocols', function () {
      expect(getPDFFileNameFromURL('http://www.example.com/file1.pdf')).toEqual('file1.pdf');
      expect(getPDFFileNameFromURL('https://www.example.com/file2.pdf')).toEqual('file2.pdf');
      expect(getPDFFileNameFromURL('file:///path/to/files/file3.pdf')).toEqual('file3.pdf');
      expect(getPDFFileNameFromURL('ftp://www.example.com/file4.pdf')).toEqual('file4.pdf');
    });
    it('gets PDF filename from query string appended to "blob:" URL', function () {
      var typedArray = new Uint8Array([1, 2, 3, 4, 5]);
      var blobUrl = createObjectURL(typedArray, 'application/pdf');
      expect(blobUrl.indexOf('blob:') === 0).toEqual(true);
      expect(getPDFFileNameFromURL(blobUrl + '?file.pdf')).toEqual('file.pdf');
    });
    it('gets fallback filename from query string appended to "data:" URL', function () {
      var typedArray = new Uint8Array([1, 2, 3, 4, 5]);
      var dataUrl = createObjectURL(typedArray, 'application/pdf', true);
      expect(dataUrl.indexOf('data:') === 0).toEqual(true);
      expect(getPDFFileNameFromURL(dataUrl + '?file1.pdf')).toEqual('document.pdf');
      expect(getPDFFileNameFromURL('     ' + dataUrl + '?file2.pdf')).toEqual('document.pdf');
    });
  });
  describe('EventBus', function () {
    it('dispatch event', function () {
      var eventBus = new EventBus();
      var count = 0;
      eventBus.on('test', function () {
        count++;
      });
      eventBus.dispatch('test');
      expect(count).toEqual(1);
    });
    it('dispatch different event', function () {
      var eventBus = new EventBus();
      var count = 0;
      eventBus.on('test', function () {
        count++;
      });
      eventBus.dispatch('nottest');
      expect(count).toEqual(0);
    });
    it('dispatch event multiple times', function () {
      var eventBus = new EventBus();
      var count = 0;
      eventBus.dispatch('test');
      eventBus.on('test', function () {
        count++;
      });
      eventBus.dispatch('test');
      eventBus.dispatch('test');
      expect(count).toEqual(2);
    });
    it('dispatch event to multiple handlers', function () {
      var eventBus = new EventBus();
      var count = 0;
      eventBus.on('test', function () {
        count++;
      });
      eventBus.on('test', function () {
        count++;
      });
      eventBus.dispatch('test');
      expect(count).toEqual(2);
    });
    it('dispatch to detached', function () {
      var eventBus = new EventBus();
      var count = 0;
      var listener = function listener() {
        count++;
      };
      eventBus.on('test', listener);
      eventBus.dispatch('test');
      eventBus.off('test', listener);
      eventBus.dispatch('test');
      expect(count).toEqual(1);
    });
    it('dispatch to wrong detached', function () {
      var eventBus = new EventBus();
      var count = 0;
      eventBus.on('test', function () {
        count++;
      });
      eventBus.dispatch('test');
      eventBus.off('test', function () {
        count++;
      });
      eventBus.dispatch('test');
      expect(count).toEqual(2);
    });
    it('dispatch to detached during handling', function () {
      var eventBus = new EventBus();
      var count = 0;
      var listener1 = function listener1() {
        eventBus.off('test', listener2);
        count++;
      };
      var listener2 = function listener2() {
        eventBus.off('test', listener1);
        count++;
      };
      eventBus.on('test', listener1);
      eventBus.on('test', listener2);
      eventBus.dispatch('test');
      eventBus.dispatch('test');
      expect(count).toEqual(2);
    });
  });
});