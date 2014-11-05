/**
 * Picture service.
 */
asi.Service.Picture = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Picture',
    isEnabled : true,
    pictureUrl : asi.Config.serverUrl + '/asiserver/service/getPictures.php'
  },
  init : function() {
    var t = asi.Service.Picture;

    Event.bind(asi.evt.getPictures, 'ServicePicture', t.getPictures);
  },
  getPictures : function(range) {
    var t = asi.Service.Picture;

    var onSuccess = function(pictureData) {
      Event.fire(asi.evt.gotPictures, pictureData);
    }

    $.get(t.config.pictureUrl, range, onSuccess);
  },
});

$(document).ready(function() {
  asi.Service.Picture.register();
});