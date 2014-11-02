asi.Picture = {
  init : function() {
    // Initialize module
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
      Event.fire(asi.evt.takePicture);
    };

    $scope.share = function(picture) {
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