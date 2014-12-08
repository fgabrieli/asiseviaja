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
//      asiLog('asi.Picture.ngController, gotPictures: ', pictures);

      $scope.pictures = pictures;

      setTimeout(function() {
        $scope.$apply();
      }, 0);
    });

    $scope.takePicture = function() {
      Event.fire(asi.evt.takePicture);
    };

    $scope.share = function(picture) {
      asiLog('$scope.share, message=', picture.caption, ', imageUrl=', picture.imageUrl);
      Event.fire(asi.evt.share, {
        message : picture.caption,
        image : picture.imageUrl
      });
    };
    
    Event.bind(asi.evt.pictureTaken, 'PictureModule', function(data) {
      asiLog('PictureModule catched pictureTaken, firing upload event');

      // Upload image to server right away
      
      Event.fire(asi.evt.uploadFile, {
        uri : data.imageUri
      });
    });
    
    Event.bind(asi.evt.fileUploaded, 'PictureModule', function(data) {
      var preview = asi.PicturePreview;
      preview.setImage({
        id : data.response.pictureId,
        uri : data.uri
      });
      preview.show();
      
      t.getPictures();
    });
  }
};

asi.PicturePreview = {
  scope : {},
  img : {},
  setImage : function(img) {
    var t = asi.PicturePreview;
    $.extend(t.img, img);
  },
  show : function() {
    var t = asi.PicturePreview;

    t.scope.isVisible = true;
    setTimeout(function() {
      t.scope.$apply();
    }, 0);
  },
  ngController : function($scope) {
    var t = asi.PicturePreview;
    t.scope = $scope;
    
    $scope.img = {};
    t.img = $scope.img;
    t.img.uri = 'http://192.168.200.100/asiserver/upload/picture-1414789913-225037.jpg';

    $scope.isVisible = false;
    $scope.caption = '';
    $scope.isKeyboardOpen = false;
    
    $scope.setCaption = function() {
      asiLog('Setting caption for img=', t.img)
      
      Event.fire(asi.evt.setPictureCaption, {
        id : t.img.id,
        caption : $scope.caption
      });
      
    };
    
    $scope.close = function() {
      $scope.isVisible = false;
    };
    
    $scope.onClickTxt = function() {
      $scope.isKeyboardOpen = true;
    };
    
    $scope.onBlurTxt = function() {
      $scope.isKeyboardOpen = false;
    };
    
    Event.bind(asi.evt.backKeyDown, 'PictureModule', function() {
      asiLog('PictureModule: backKey pressed');
      $scope.isKeyboardOpen = false;
      setTimeout(function() {
        $scope.$apply();
      }, 0);
    });
  }
}

$(document).ready(function() {
  asi.Picture.init();
});
