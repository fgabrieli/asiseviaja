asi.Service.DeviceSrv = $.extend(true, {}, asi.Service, {
 DEVICE_DESKTOP : 'desktop',
 DEVICE_MOBILE : 'mobile',
 config : {
  name : 'DeviceSrv',
 },
 device : 'desktop',
 // private
 init : function() {
  var t = asi.Service.DeviceSrv;
  t.detect();
 },
 // public
 getDeviceType : function() {
  return this.device;
 },
 // private
 detect : function() {
  this.device = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? this.DEVICE_MOBILE : this.DEVICE_DESKTOP;
 }
});

asi.Service.DeviceSrv.register();