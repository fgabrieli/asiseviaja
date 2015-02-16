/**
 * Picture service.
 * 
 * Interface: setCaption
 */
asi.Service.PictureSrv = $.extend(true, {}, asi.Service, {
  config : {
    name : 'PictureSrv',
    isEnabled : true,
    setCaptionUrl : asi.Config.serverUrl + '/asiserver/service/setCaption.php',
    pictureUrl : asi.Config.serverUrl + '/asiserver/service/getPictures.php' // XXX: refactor to picture.php
  },
  init : function() {
    var t = asi.Service.PictureSrv;

    Event.bind(asi.evt.getPictures, 'PictureSrv', t.getPictures);
  },
  getPictures : function(range) {
    var t = asi.Service.PictureSrv;

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
        asiLog('asi.Service.PictureSrv: error while retrieving pictures from server, error=', errorThrown);
      }
    });

    $.get(t.config.pictureUrl, range, onSuccess);
  },
  /* disabled for now
  // public
  setCaption : function(data) {
    var t = asi.Service.PictureSrv;
    
    $.ajax({
     url : t.config.setCaptionUrl,
     type : 'post',
     dataType : 'json',
     data : {
      id : data.id,
      caption : data.caption
     },
     success : function(data) {
      console.log('caption set to ', data.caption);
     },
     error : function(jqXHR, textStatus, errorThrown) {
      asiLog('asi.Service.PictureSrv: error while retrieving pictures from server, error=', errorThrown);
     }
    });
  }
  */
});

$(document).ready(function() {
  asi.Service.PictureSrv.register();
});