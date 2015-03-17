asi.Uploading = {
 init : function() {
  Event.bind(asi.evt.uploadFile, 'Uploading', function() {
   $('body').addClass('uploading-picture');
  });

  Event.bind(asi.evt.fileUploaded, 'PictureModule', function(data) {
   $('body').removeClass('uploading-picture');
  });
 }
};

$(document).ready(function() {
 asi.Uploading.init();
});