asi.AboutUsModal = {
  ngController : function($scope) {
    var t = asi.AboutUsModal;

    $scope.isVisible = false;

    Event.bind(asi.evt.aboutUs, t.showModal);
  },
  showModal : function() {
    $scope.isVisible = true;

    if (!$scope.$$phase) {
      $scope.$apply();
    }
  }
};