asi.TopMenu = {
  ngController : function($scope) {
    $scope.share = function() {
      Event.fire(asi.evt.share, {
        message : 'Asi se viaja!',
        link : 'http://www.asiseviaja.com.ar'
      });
    };
    
    $scope.aboutUs = function() {
      Event.fire(asi.evt.aboutUs);
    };
  }
}