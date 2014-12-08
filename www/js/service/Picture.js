/**
 * Picture service.
 */
asi.Service.Picture = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Picture',
    isEnabled : true,
    setCaptionUrl : asi.Config.serverUrl + '/asiserver/service/setCaption.php',
    pictureUrl : asi.Config.serverUrl + '/asiserver/service/getPictures.php' // XXX: refactor to picture.php
  },
  init : function() {
    var t = asi.Service.Picture;

    Event.bind(asi.evt.getPictures, 'ServicePicture', t.getPictures);
    
    Event.bind(asi.evt.setPictureCaption, 'ServicePicture', t.setPictureCaption);
  },
  getPictures : function(range) {
    var t = asi.Service.Picture;

    var onSuccess = function(pictureData) {
      Event.fire(asi.evt.gotPictures, pictureData);
    };

    $.ajax({
      url : t.config.pictureUrl,
      type : 'get',
      dataType : 'json',
      data : range,
      success : onSuccess,
      error : function(jqXHR, textStatus, errorThrown) {
        asiLog('asi.Service.Picture: error while retrieving pictures from server, error=', errorThrown);
      }
    });
    $.get(t.config.pictureUrl, range, onSuccess);
  },
  setPictureCaption : function(data) {
    var t = asi.Service.Picture;
    
    $.post(t.config.setCaptionUrl, {
      id : data.id,
      caption : data.caption
    }, function() {
      // On success
    });
  }
});

$(document).ready(function() {
  asi.Service.Picture.register();
});