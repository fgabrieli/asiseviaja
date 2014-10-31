/**
 * Social sharing (facebook, twitter, etc)
 */
asi.Share = {
  socialSharing : false,
  init : function() {

    // Sharing is handled as an event

    Event.bind(asi.evt.share, 'ShareModule', this.share);
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
      asi.Log('Calling share but there is nothing to be shared, data: ', data);
    } else {

      // Share the data using the SocialSharing-PhoneGap-Plugin
      // @see https://github.com/EddyVerbruggen/SocialSharing-PhoneGap-Plugin/blob/master/README.md

      var shareLib = window.plugins.socialsharing;
      shareLib.share(data.message, null, data.image, data.link);
    }
  }
};

$(document).ready(function() {
  asi.Share.init();
});