/**
 * Social sharing (facebook, twitter, etc)
 */
asi.Service.Share = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Share'
  },
  init : function() {
//    var t = asi.Service.Share;
    
    // Sharing is handled as an event
  },
  /*
   * public 
   * 
   * Fire the share widget.
   * 
   * @param object data with message, image, link
   */
  share : function(data) {
   var isValid = ((typeof data.message != 'undefined') && (typeof data.link != 'undefined') && (data.message.length > 0) && (data.link.length > 0));

   if (isValid) {
    var hasImage = (typeof data.image != 'undefined');
    data.image = hasImage ? data.image : '';

    // Share the data using the SocialSharing-PhoneGap-Plugin
    // @see
    // https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/blob/master/README.md

     var shareLib = window.plugins.socialsharing;
     shareLib.share(data.message, null, data.image, data.link);
   }
  }
});

$(document).ready(function() {
  asi.Service.Share.register();
});