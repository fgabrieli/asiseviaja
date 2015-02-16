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
 getDevice : function() {
  return this.device;
 },
 // private
 detect : function() {
  var t = this;
  
  var screenWidth = screen.width;
  if (screenWidth >= 1024) {
   t.device = t.DEVICE_DESKTOP;
  } else {
   t.device = t.DEVICE_MOBILE;
  }
 }
});

asi.Service.DeviceSrv.register();