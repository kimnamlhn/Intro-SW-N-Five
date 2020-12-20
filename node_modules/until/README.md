# until

__unitl__ is a very simple helper object that helps on waiting multiple
__EventEmitter__. It is an EventEmitter itselt, and it waits for all the
__EventEmitter__ firing success events, or one of them firing failure event.

The APIs are

    var waitings = new require('until').Waitings();
    waitings.add(EventEmitter      e,
                 Array or String   success events,
                 Array or String   fail events,
                 Array or String   notification events)

An example:

    var waitings = new until.Waitings();
    waitings.add(emitter,         // The emitter object
                 ['ok', 'done'],  // A list of event names that stand for success.
                 ['bad', 'fail'], // A list of event names that stand for failure.
                 ['progress']);   // A list of event names will continuously send.

## Class 'Waitings'

    var waiting = new until.Waitings();

This class is the main class of the APIs. __Waitings__ object is an __EventEmitter__
which provides 'ok', 'error' events. __Waitings__ object listens to many
__EventEmitters__ and fire 'ok' when it realizes all the __EventEmitters__ it listens
to have fired success events, or 'error' when one of the EventEmitters fired
an error event.

We don't know what name the success/error event are, so we expect users to define
the success/error event name when they add the __EventEmitter__ into the
listening-to list of __Waitings__.

### Waitings.add(emitter, success, error)

* _emitter_: __EventEmitter__
* _success_: __String__ or __Array__ of __String__
* _error_: __String__ or __Array__ of __String__

Adding a __EventEmitter__ to the __Waitings__ object. _emitter_ is an
__EventEmitter__ that is to be listened to. _success_ is a list of events that
stand for 'success', when __Waitings__ object heard the event in the success
list, it knows this _emitter_ "finished successfully". So does _error_.

### Event: 'ok'

This will be fired only once, when all of the __EventEmitter__ that the
__Waitings__ is waiting for finished successfully. The handler of this event
is expected to look like

    function handler(list)

The _list_ argument is an array that stores the arguemnts of each event
handler, with following structure:

    {
      "emitter" : // The reference of the emitter that fires this success event
      "event"   : // String: the event name the emitter fired
      "arg"     : // Array: the arguments passed to the event handler
    }

No matter how many times an __EventEmitter__ fires the success events, only
the first event will be stored.

### Event: 'error'

If one of the __EventEmitter__ fires the error event, this event will be fired,
and there will no futher event from this __Waitings__.

The handler is expected to take a argument, which is _error_, the argument that
is got from the __EventEmitter__ which fires the error event.

## Test

A very earily test runner is located at ./test.js, use

    node test.js

to run the test cases.

## License

We release this package with Apache License 2.0. Please see the LICENSE file
in the source.
