/**
 * Social sharing (facebook, twitter, etc)
 */
asi.Service.Share = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Share',
    isEnabled : true
  },
  socialSharing : false,
  init : function() {

    // Sharing is handled as an event

    Event.bind(asi.evt.share, 'ServiceShare', this.share);
  },
  share : function(data) {
    if (typeof data.message == 'undefined') {
      data.message = '';
    }

    if (typeof data.image == 'undefined') {
      data.image = '';
    }

    if (typeof data.link == 'undefined') {
      data.link = '';
    }

    if (data.message == '' && data.image == '' && data.link == '') {
      asiLog('Calling share but there is nothing to be shared, data: ', data);
    } else {

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