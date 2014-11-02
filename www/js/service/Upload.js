asi.Upload = {
  SERVER_UPLOAD_SCRIPT : 'http://192.168.210.100/asiserver/service/upload.php',
  init : function() {
    var t = asi.Upload;
    Event.bind(asi.evt.pictureTaken, 'UploadModule', function(data) {
      asi.Log('asi.Upload: catched asi.evt.pictureTaken for: ', data.imageUri);
      t.uploadImage(data.imageUri);
    });
  },
  uploadImage : function(imageUri) {
    var t = asi.Upload;
    
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
    asi.Log('fileName=', options.fileName);
    options.mimeType = "image/jpeg";

    // var params = new Object();
    //
    // params.value1 = "test";
    // params.value2 = "param";
    //
    // options.params = params;

    options.chunkedMode = false;

    function onSuccess(r) {
      asi.Log("Code = " + r.responseCode);
      asi.Log("Response = " + r.response);
      asi.Log("Sent = " + r.bytesSent);
    }
    ;

    function onError(error) {
      asi.Log("An error has occurred: Code = ", error.code);
    }
    ;

    var ft = new FileTransfer();
    ft.upload(imageUri, t.SERVER_UPLOAD_SCRIPT, onSuccess, onError, options);
  }
};

$(document).ready(function() {
  asi.Upload.init();
});