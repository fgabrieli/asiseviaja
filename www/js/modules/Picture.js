asi.Picture = {
  init : function() {
    var t = asi.Picture;
    
    Event.bind('takePicture', function() {
      t.takePicture();
    })
  },
  takePicture : function() {
    var onSuccess = function(imageURI) {
      Event.fire(asi.evt.pictureTaken, {
        imageURI : imageURI
      });
    };

    var onFail = function(message) {
      console.log("$scope.takePicture() failed, error message: ", message);
    }

    navigator.camera.getPicture(onSuccess, onFail, {
      quality : 50,
      destinationType : Camera.DestinationType.FILE_URI,
      correctOrientation : true,
      targetWidth : '1024'
    });
  }
  getPictures : function() {
    // Retrieve images
    return [ {
      imageUrl : 'img/test.jpg',
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
      Event.fire(asi.evt.takePicture);
    }
  }
}