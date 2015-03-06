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
  
  if (t.device == 'mobile') {
   t.bindTouchEvents();
  }
 },
 bindTouchEvents : function() {
  $('body').bind('touchstart', function() {
   console.log('touchstart');
   Event.fire(asi.evt.touchStart, {});
  });

  $('body').bind('touchmove', function() {
   console.log('touchmove');
   Event.fire(asi.evt.touchMove, {});
  });

  $('body').bind('touchend', function() {
   console.log('touchend');
   Event.fire(asi.evt.touchEnd, {});
  });

  $('body').bind('touchcancel', function() {
   console.log('touchcancel');
   Event.fire(asi.evt.touchCancel, {});
  });
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