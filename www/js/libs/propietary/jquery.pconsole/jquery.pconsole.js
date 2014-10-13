var pConsole = {
  $el : false,
  init : function() {
    this.$el = $('<div>');
    this.$el.attr('id', 'console');
    this.$el.appendTo('body');
  },
  log : function(source) {
    var output = ''; // Output is always a String

    if (typeof source == 'object' || typeof source == 'array') {
      // If it is a DOM element
      if (typeof source.nodeName != 'undefined') {
        // XXX: print a DOM element as a String with all it's children
      } else {
        output = '<pre>' + JSON.stringify(source, undefined, 4) + '</pre>';
      }
    } else {
      output = source;
    }

    this.$el.prepend('&gt; ' + output + '<br />');
    
    // Also dump in logcat
    console.log(source);
  }
}

$(document).ready(function() {
  pConsole.init();
});