asi.Picture = {
  // if the user is scrolling the screen in a mobile device, we will consider the scrolling finished if there is no activity during 1,2 sec
  SCROLL_STOP_TIMEOUT : 600, // ms
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

//     Event.bind(asi.evt.touchStart, 'PictureModule', function() {
//      $scope.isScrolling = true;
//      $scope.$apply();
//     });
//     
//     Event.bind(asi.evt.touchEnd, 'PictureModule', function() {
//      $scope.isScrolling = false;
//      $scope.$apply();
//     });

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
      message : '\nAsi se viaja! Tome esta foto el ' + picture.date + 'hs.\nLink para verla online: ',
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

$(document).ready(function() {
  asi.Picture.init();
});