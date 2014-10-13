asi.Share = {
  init : function() {
    var social = window.plugins.socialsharing;

    Event.bind('share', function(data) {
      var t = Event;
      t.share(data);
    });
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
      console.log('Calling share but there is nothing to be shared, data: ', data);
    } else {
      social.share(data.message, null, data.image, data.link)
    }
  }
};