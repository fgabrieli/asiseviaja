/**
 * Handle events.
 */
var Event = {
  events : {},
  /**
   * Bind to a new/existing event.
   * 
   * @param {String}
   *            event name (can be a new event or an existing one)
   * @param {Function}
   *            callback
   */
  bind : function(eventName, callback) {
    if (typeof this.events[eventName] == 'undefined') {
      this.events[eventName] = [];
    }

    this.events[eventName].push(callback);
  },
  /**
   * Fire an event.
   * 
   * @param {String}
   *            event name
   * @param {Object}
   *            data to pass to the callback
   */
  fire : function(eventName, data) {
    var callbacks = this.events[eventName];
    if (typeof callbacks == 'undefined') {
      console.log('Error: trying to fire unexistent event: ', eventName);
    }

    for ( var i = 0; i < callbacks.length; i++) {
      callbacks[i](data);
    }
  }
};