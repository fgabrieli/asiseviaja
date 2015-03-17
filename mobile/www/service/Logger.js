/**
 * Logger service.
 */
asi.Service.Logger = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Logger',
    isEnabled : true
  },
  init : function() {
    window.asiLog = asi.Service.Logger.log;
  },
  log : function(any) {
    if (asi.Config.isDebugEnabled) {
      var finalLog = '[asiseviaja] ';
      for (var i = 0; i < arguments.length; i++) {
        var obj = arguments[i];
        if (typeof obj == 'object' || typeof obj == 'array') {
          finalLog += JSON.stringify(obj);
        } else {
          finalLog += obj;
        }
      }

      console.log(finalLog);
    }
  }
});

asi.Service.Logger.register();