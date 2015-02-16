asi.TopMenu = {
 init : function() {
 },
 ngController : function($scope) {
  $scope.getDevice = function() {
   var deviceSrv = asi.Service.DeviceSrv;
   return deviceSrv.getDevice();
  }
 }
}