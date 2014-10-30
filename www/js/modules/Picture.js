asi.Picture = {
  init : function() {
    var t = asi.Picture;

    Event.bind(asi.evt.takePicture, function() {
      t.takePicture();
    });
  },
  takePicture : function() {
    asi.Log('takePicture');

    var onSuccess = function(imageURI) {
      Event.fire(asi.evt.pictureTaken, {
        imageUri : imageURI
      });
    };

    var onFail = function(message) {
      console.log("$scope.takePicture() failed, error message: ", message);
    };

    asi.Log('navigator.camera.getPicture()');

    navigator.camera.getPicture(onSuccess, onFail, {
      quality : 50,
      destinationType : Camera.DestinationType.FILE_URI,
      sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
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

    /**
     * Take a new picture.
     */
    $scope.takePicture = function() {
      asi.Log('$scope.takeAPicture()');
      Event.fire(asi.evt.takePicture);
    };

    $scope.share = function(picture) {
      asi.Log('$scope.share: ', picture);

      Event.fire(asi.evt.share, {
        message : picture.caption,
        image : picture.imageUrl
      });
    };

    $scope.uploadPicture = function() {
      asi.Upload.uploadImage('www/img/test.jpg');
    };
  }
};

$(document).ready(function() {
  asi.Picture.init();
});