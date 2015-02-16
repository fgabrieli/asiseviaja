asi.AboutUs = {
  ngController : function($scope) {
    var t = asi.AboutUs;

    $scope.isVisible = false;

    function open() {
      $scope.isVisible = true;

      setTimeout(function() {
        $scope.$apply();
      }, 0);
    }

    Event.bind(asi.evt.aboutUs, 'AboutUsModule', open);
    
    $scope.close = function() {
      $scope.isVisible = false;
    }
  }
};
