asi.Picture = {
  // if the user is scrolling the screen in a mobile device, we will consider the scrolling finished if there is no activity during 1,2 sec
  SCROLL_STOP_TIMEOUT : 1200, // ms
  init : function() {
   var t = this;
   
   t.getPictures();
    
   // when a file is uploaded refresh the picture list
   Event.bind(asi.evt.fileUploaded, 'PictureModule', function(data) {
    t.getPictures();
   });
  },
  getPictures : function() {
    Event.fire(asi.evt.getPictures, {
      start : 0,
      end : 10
    });
  },
  ngController : function($scope) {
    var t = asi.Picture;

    Event.bind(asi.evt.gotPictures, 'PictureModule', function(pictures) {
      $scope.pictures = pictures;

      setTimeout(function() {
        $scope.$apply();
        $(document).scrollTop(0);
      }, 0);
    });
    
    $scope.isScrolling = false;
    var deviceSrv = asi.Service.DeviceSrv;
    var isMobile = (deviceSrv.getDevice() == 'mobile');
    if (isMobile) {
     bindScrollEvents();
    }
    
    function bindScrollEvents() {
     var timer = false;

     Event.bind(asi.evt.touchStart, 'PictureModule', function() {
      $scope.isScrolling = true;
      $scope.$apply();
     });
     
     Event.bind(asi.evt.touchEnd, 'PictureModule', function() {
      $scope.isScrolling = false;
      $scope.$apply();
     });

     $(window).scroll(function() {
      console.log('touchMove fired');
      $scope.isScrolling = true;
      $scope.$apply();
      
      // clear existing timers
      if (typeof timer == 'number') {
       clearTimeout(timer);
       timer = false;
      }
      
      // there is no way to know when the touchMove event ends so if it wasn't triggered for 1,5secs we will consider it finished.
      timer = setTimeout(function() {
       $scope.isScrolling = false;
       timer = false;
       $scope.$apply();
      }, t.SCROLL_STOP_TIMEOUT);
     });
    }
    
    $scope.takePicture = function() {
      Event.fire(asi.evt.takePicture);
    };

    $scope.share = function(picture) {
     var shareSrv = asi.Service.Share;
     shareSrv.share({
      message : 'Asi se viaja! Tome esta foto el ' + picture.date + 'hs. Link para verla online: ',
      link : picture.url, // XXX: change with url to website
      image : picture.url
     });
    };
    
    Event.bind(asi.evt.pictureTaken, 'PictureModule', function(data) {
      asiLog('PictureModule catched pictureTaken, firing upload event');

      // upload image to server right away
      Event.fire(asi.evt.uploadFile, {
        uri : data.imageUri
      });
    });
    
    $scope.getDevice = function() {
     var deviceSrv = asi.Service.DeviceSrv;
     return deviceSrv.getDevice();
    }
  }
};

/* XXX: asi.PicturePreview is not enabled at the moment, see asi.PicturePreview.config.enabled below */
asi.PicturePreview = {
  config : {
    enabled : false,
    MAX_CAPTION_SIZE : 140
  },
  init : function() {
   if (this.config.enabled) {
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
  },
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

    $scope.maxChars = t.config.MAX_CAPTION_SIZE;
    
    $scope.setCaption = function() {
      asiLog('Setting caption for img=', t.img)

      // update in the view
      t.img.caption = $scope.caption;
      
      // send to server
      var pictureSrv = asi.Service.PictureSrv;
      pictureSrv.setCaption({
        id : t.img.id,
        caption : $scope.caption
      });
      
      $scope.close();
    };
    
    $scope.close = function() {
      $scope.isVisible = false;
    };
    
    Event.bind(asi.evt.showKeyboard, 'PictureModule', function() {
      $scope.isKeyboardOpen = true;
      
      setTimeout(function() { 
        $scope.$apply();
      }, 0);
    });

    Event.bind(asi.evt.hideKeyboard, 'PictureModule', function() {
      $scope.isKeyboardOpen = false;
      
      setTimeout(function() { 
        $scope.$apply();
      }, 0);
    });
  }
};

$(document).ready(function() {
  asi.Picture.init();
  
  asi.PicturePreview.init();
});