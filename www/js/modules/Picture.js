asi.Picture = {
  getPictures : function() {
    // Retrieve images
    return [ {
      imageUrl : 'img/1.jpg',
      caption : 'This is a good image'
    }, {
      imageUrl : 'img/2.jpg',
      caption : 'This is a good image'
    }, {
      imageUrl : 'img/3.jpg',
      caption : 'This is a good image'
    }, {
      imageUrl : 'img/4.jpg',
      caption : 'This is a good image'
    }, {
      imageUrl : 'img/5.jpg',
      caption : 'This is a good image'
    } ];
  },
  ngController : function($scope) {
    // $scope.isPictureVisible = true;
    var t = asi.Picture;

    $scope.pictures = t.getPictures();
    
    console.log($scope.pictures);
    
    $scope.launchCamera = function() {
      var onSuccess = function(imageURI) {
        // $scope.picture = imageURI;
        // $scope.isPictureVisible = true;
        // $scope.$apply();
      }

      var onFail = function(message) {
        // alert('Failed because: ' + message);
      }

      navigator.camera.getPicture(onSuccess, onFail, {
        quality : 50,
        destinationType : Camera.DestinationType.FILE_URI,
        correctOrientation : true,
        targetWidth : '1024'
      });
    }
  }
}