asi.Picture = {
  init : function() {

    // Get pictures

    this.getPictures();
  },
  getPictures : function() {
    
    // Get pictures

    Event.fire(asi.evt.getPictures, {
      start : 0,
      end : 10
    });
  },
  ngController : function($scope) {
    var t = asi.Picture;

    Event.bind(asi.evt.gotPictures, 'PictureModule', function(pictures) {
      asiLog('asi.Picture.ngController, gotPictures: ', pictures);

      $scope.pictures = pictures;

      setTimeout(function() {
        $scope.$apply();
      }, 0);
    });

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
