asi.Picture = {
  // if the user is scrolling the screen in a mobile device, we will consider
  // the scrolling finished if there is no activity during 1,2 sec
  SCROLL_STOP_TIMEOUT : 600, // ms
  PICTURES_UNIT : 3, // ask for 10 pictures to the backend every time we
                          // need more of them
  start : 0,
  end : 0,
  
  // custom event for asi.Picture, if fired it means we are about to reach the bottom of the document
  REACHING_DOC_BOTTOM : 'ReachingDocumentBottom',
  // how near we need to be to the bottom to fire REACHING_DOC_BOTTOM, expressed in % (the bigger the % the closer to the bottom)
  PERCENT_TO_BOTTOM : 0.75,
  
  isWaitingForPic : false,
  
  init : function() {
   var t = this;
   
   t.reloadPictures();
    
   // when a file is uploaded refresh the picture list
   Event.bind(asi.evt.fileUploaded, 'PictureModule', function(data) {
    t.reloadPictures();
   });

   t.bindTouchEvt();
   
   Event.bind(t.REACHING_DOC_BOTTOM, 'PictureModule', function() {
     t.getPictures();
   });
  },
  
  bindTouchEvt : function() {
    var t = asi.Picture;
    
    var startY = 0;
    var endY = 0;
    var isGettingPictures = false;
    
    var body = $('body').get(0);
    
    body.addEventListener('touchstart', function(e) {
      if (!isGettingPictures) {
        var touches = e.changedTouches[0];
        startY = touches.clientY;
      }
    }, false);

    body.addEventListener('touchmove', function(e) {
      if (!isGettingPictures) {
        var touches = e.changedTouches[0];
        endY = touches.clientY;
        
        console.log('startY=', startY, ', endY=', endY);
        
        var isScrollingBottom = (endY < startY);
        if (isScrollingBottom) {
          var pageY = touches.pageY;
          var docHeight = $(document).height();
          
          is90Percent = (pageY / docHeight > t.PERCENT_TO_BOTTOM);
          
          console.log('is90Percent=', is90Percent)

          // we are about to reach the bottom of the document
          if (is90Percent) {
            Event.fire(t.REACHING_DOC_BOTTOM, {});
          }
        }
      }
    }, false);
  },
  
  reloadPictures : function() {
   var t = asi.Picture;
   
   t.start = 0;
   t.end = 0;
   
   t.getPictures();
  },
  
  getPictures : function() {
   var t = asi.Picture;
   
   if (!t.isWaitingForPic) {
     t.isWaitingForPic = true;
     
     Event.fire(asi.evt.getPictures, {
        start : t.start,
        end : t.start + t.PICTURES_UNIT
     });
     
     t.start = t.start + t.PICTURES_UNIT;
   }
  },
  
  ngController : function($scope) {
    var t = asi.Picture;
    
    Event.bind(asi.evt.gotPictures, 'PictureModule', function(pictures) {
      t.isWaitingForPic = false;
      
      var isEmpty = (pictures.length == 0);
      if (!isEmpty) {
        $scope.pictures = $.extend($scope.pictures, pictures);

        setTimeout(function() {
          $scope.$apply();
          $(document).scrollTop(0);
        }, 0);
      } else {
        // no pictures found, go back to previous state
        t.start = t.start - t.PICTURES_UNIT;
      }
    });


    $scope.isScrolling = false;
    var deviceSrv = asi.Service.DeviceSrv;
    var isMobile = (deviceSrv.getDeviceType() == 'mobile');
    if (isMobile) {
     bindScrollEvents();
    }
    
    function bindScrollEvents() {
     var timer = false;

     $(window).scroll(function() {
      $scope.isScrolling = true;
      $scope.$apply();
      
      // clear existing timers
      if (typeof timer == 'number') {
       clearTimeout(timer);
       timer = false;
      }
      
      // there is no way to know when the touchMove event ends so if it wasn't
      // triggered for 1,5secs we will consider it finished.
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
     return deviceSrv.getDeviceType();
    }
  }
};

$(document).ready(function() {
  asi.Picture.init();
});