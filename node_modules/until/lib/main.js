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

var events = require('events');

// Helper function to make arguments form an array.
var buildList = function buildList(arg) {
  if (!arg) return [];
  if (typeof arg === 'string') return [arg];
  if (arg instanceof Array) return arg.slice(0);
  return [];
}

var Waitings = function(successEvents, failEvents) {
  this._defaultSuccessEvents = buildList(successEvents);
  this._defaultFailEvents = buildList(failEvents);
  this._waitingQueue = [];
  this._resultList = [];
  this._dead = false;
}

var wp = Waitings.prototype = new events.EventEmitter(); 

wp.add = function add(emitter, successEvent, failEvent, notifyEvent) {
  this._bindWithEventList(this, this._successHandler,
                          emitter, buildList(successEvent));
  this._bindWithEventList(this, this._failHandler,
                          emitter, buildList(failEvent));
  this._bindWithEventList(this, this._notifyHandler,
                          emitter, buildList(notifyEvent));
  this._waitingQueue.push(emitter);
};

// We are not interested in this emitter anymore.
wp.remove = function remove(emitter) {
  var i = this._waitingQueue.indexOf(emitter);
  if (i >= 0) {
    this._waitingQueue = this._removeFromArray(this._waitingQueue, i);
  }
};

wp._removeFromArray = function _removeFromArray(arr, index) {
  return arr.slice(0, index).concat(arr.slice(index + 1));
};

wp._bindWithEventList = function _bindWithEventList(target, handler, emitter, list) {
  list.forEach(function(v) {
    emitter.on(v, handler.bind(target, emitter, v));
  });
};

//----------------------------------------------------------------------------
// Handling events.
wp._successHandler = function _successHandler(emitter, eventName) {
  if (this._dead) return;
  var i = this._waitingQueue.indexOf(emitter);
  if (i < 0) return;
  this._resultList.push({
    "emitter":   emitter,
    "event":     eventName,
    "arg":       Array.prototype.slice.call(arguments, 2)
  });
  this._waitingQueue = this._removeFromArray(this._waitingQueue, i);
  if (this._waitingQueue.length == 0) {
    this._fireSuccess();
  }
};

wp._failHandler = function _failHandler(emitter, eventName, err) {
  if (this._dead) return;
  if (this._waitingQueue.indexOf(emitter) < 0) return;
  this._waitingQueue.length = 0; // Clean waiting queue.
  this._fireError(err);
};

wp._notifyHandler = function _notifyHandler(emitter, eventName) {
  if (this._dead) return;
  if (this._waitingQueue.indexOf(emitter) < 0) return;
  this._fireNotice(Array.prototype.slice.call(arguments, 2),
                   emitter, eventName);
};

//----------------------------------------------------------------------------
// Firing events
wp._fireSuccess = function _fireSuccess() {
  this._dead = true;
  this.emit('ok', this._resultList);
};

wp._fireError = function _fireError(err) {
  this._dead = true;
  this.emit('error', err, this._resultList);
};

wp._fireNotice = function _fireNotice(args, emitter, name) {
  this.emit('notice', emitter, name, args);
};


exports.Waitings = Waitings;
