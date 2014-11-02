/**
 * Camera service.
 */
asi.Service.Camera = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Camera',
    isEnabled : true,
  },
  init : function() {
    var t = asi.Service.Camera;

    Event.bind(asi.evt.takePicture, 'ServiceCamera', function() {
      t.takePicture();
    });
  },
  takePicture : function() {
    asiLog('takePicture');

    var onSuccess = function(imageUri) {
      Event.fire(asi.evt.pictureTaken, {
        imageUri : imageUri
      });
    };

    var onFail = function(message) {
      asiLog('navigator.camera.getPicture() failed with message: ', message);
    };

    asiLog('navigator.camera.getPicture()');

    navigator.camera.getPicture(onSuccess, onFail, {
      quality : 50,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation : true,
      targetWidth : '1024'
    });
  }
});

$(document).ready(function() {
  asi.Service.Camera.register();
});