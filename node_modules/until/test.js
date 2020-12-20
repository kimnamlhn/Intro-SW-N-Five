//   Copyright 2012 Patrick Wang <kk1fff@patrickz.net>
//
//   Licensed under the Apache License, Version 2.0 (the "License");
//   you may not use this file except in compliance with the License.
//   You may obtain a copy of the License at
//
//       http://www.apache.org/licenses/LICENSE-2.0
//
//   Unless required by applicable law or agreed to in writing, software
//   distributed under the License is distributed on an "AS IS" BASIS,
//   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//   See the License for the specific language governing permissions and
//   limitations under the License.

var until  = require('./lib/main.js'),
    events = require('events');

function Tester() {
}

Tester.prototype = {
  addTest: function addTest(testFunction) {
    this._testQueue.push(testFunction);
  },

  run: function run() {
    this._runNext();
  },

  is: function is(var1, var2, msg) {
    if (var1 === var2) {
      return this.success(msg);
    }

    if (var1 instanceof Array && var2 instanceof Array) {
      return this.isTheSameArray(var1, var2, msg);
    }

    return this.fail("Expected: " + var1 + " == " + var2 + 
                     (msg ? ": " + msg : ""));
  },

  isTheSameArray: function isTheSameArray(var1, var2, msg) {
    if (!var1 instanceof Array) return this.fail(msg);
    if (!var2 instanceof Array) return this.fail(msg);
    if (var1.length != var2.length) return this.fail(msg);
    for (var i = 0; i < var2.length; i++) {
      if (var1[i] != var2[i]) return this.fail(msg);
    }
    return this.success(msg);
  },

  next: function next() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
    this._runNext();
  },

  success: function success(msg) {
    var m = "";
    if (msg) {
      m = ": " + msg;
    }
    console.log("** Success" + m);
  },

  fail: function fail(msg) {
    var m = "";
    if (msg) {
      m = ": " + msg;
    }
    console.log("** Fail" + m);
  },

  _getRunner: function _getRunner() {
    if (this._testQueue.length == 0) return null;

    var testFunction = this._testQueue.shift();
    var self = this;
    return function() {
      console.log("== Test start");
      self._timer = setTimeout(self._timeOutFunc.bind(self), self._timeOut);
      testFunction(self);
    }
  },

  _runNext: function _runNext() {
    var func = this._getRunner();
    if (func) {
      setTimeout(func, 0);
    } else {
      console.log("Test finished");
    }
  },

  _timeOutFunc: function _timeOutFunc() {
    this.fail("Time out");
    this._runNext();
  },

  _testQueue: [],

  _timeOut: 3000,

  _timer: null
};

var tester = new Tester();

tester.addTest(function test_single_success(tester) {
  var waitings = new until.Waitings();
  var emitter = new events.EventEmitter();
  waitings.add(emitter, 'event1', 'event2');
  waitings.on('ok', function(list) {
    tester.is(list.length, 1);
    tester.is(list[0].emitter, emitter);
    tester.next();
  });
  emitter.emit('event1');
});

tester.addTest(function test_single_fail(tester) {
  var waitings = new until.Waitings();
  var emitter = new events.EventEmitter();
  waitings.add(emitter, 'event1', 'event2');
  waitings.on('error', function(list) {
    tester.next();
  });
  emitter.emit('event2', new Error('testerr'));
});

tester.addTest(function test_multiple_success(tester) {
  var waitings = new until.Waitings();
  var emitter = [new events.EventEmitter(),
                 new events.EventEmitter()];
  waitings.add(emitter[0], 'event1', 'event2');
  waitings.add(emitter[1], 'event3', 'event4');
  waitings.on('ok', function(list) {
    tester.is(list.length, 2);
    tester.next();
  });
  emitter[0].emit('event1');
  emitter[1].emit('event3');
});

tester.addTest(function test_multiple_error_before_success(tester) {
  var waitings = new until.Waitings();
  var emitter = [new events.EventEmitter(),
                 new events.EventEmitter()];
  waitings.add(emitter[0], 'event1', 'event2');
  waitings.add(emitter[1], 'event3', 'event4');
  waitings.on('error', function(err, list) {
    tester.is(list.length, 0);
    tester.next();
  });
  emitter[0].emit('event2');
  emitter[1].emit('event3');
});

tester.addTest(function test_multiple_error_after_success(tester) {
  var waitings = new until.Waitings();
  var emitter = [new events.EventEmitter(),
                 new events.EventEmitter()];
  waitings.add(emitter[0], 'event1', 'event2');
  waitings.add(emitter[1], 'event3', 'event4');
  waitings.on('error', function(err, list) {
    tester.is(list.length, 1);
    tester.next();
  });
  emitter[0].emit('event1');
  emitter[1].emit('event4');
});

tester.run();
