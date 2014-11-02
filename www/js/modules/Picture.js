asi.Picture = {
  init : function() {
    var t = asi.Picture;

    Event.bind(asi.evt.takePicture, 'PictureModule', function() {
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
      console.log("$scope.takePicture() failed, error message: ", message);
    };

    asiLog('navigator.camera.getPicture()');

    navigator.camera.getPicture(onSuccess, onFail, {
      quality : 50,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation : true,
      targetWidth : '1024'
    });
  },
  getPictures : function() {
    
    // Retrieve images
    
    return [ {
      imageUrl : 'www/img/test.jpg',
      caption : 'This is a good image'
    } ];
  },
  ngController : function($scope) {
    var t = asi.Picture;

    $scope.pictures = t.getPictures();

    $scope.takePicture = function() {
      asiLog('$scope.takeAPicture()');
      Event.fire(asi.evt.takePicture);
    };

    $scope.share = function(picture) {
      asiLog('$scope.share: ', picture);

      Event.fire(asi.evt.share, {
        message : picture.caption,
        image : picture.imageUrl
      });
    };
  }
};

$(document).ready(function() {
  asi.Picture.init();
});