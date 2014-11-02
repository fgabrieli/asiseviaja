/**
 * Service Base class
 */

asi.Service = {
  /**
   * Service specific config.
   */
  config : {

  },

  /**
   * Can be overriden to initialize the service.
   */
  init : function() {

  },

  /**
   * PRIVATE method.
   * 
   * Register service.
   */
  register : function() {

    // Get the service object

    var service = asi.Service[this.config.name];

    // If the service is enabled

    if (service.config.isEnabled) {

      // Execute the init callback

      var initFn = service.init;
      if (typeof initFn != 'undefined') {
        initFn();
      }
    }
  }
};