asi.Upload = {
  init : function() {
    var t = asi.Upload;
    Event.bind(asi.evt.pictureTaken, function(data) {
      asi.Log('asi.Upload: catched asi.evt.pictureTaken for: ', data.imageUri);
      t.uploadImage(data.imageUri);
    });
  },
  uploadImage : function(imageUri) {
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
    ft.upload(imageUri, "http://192.168.210.100/asiserver/upload_picture.php", onSuccess, onError,
        options);
  }
};

$(document).ready(function() {
  asi.Upload.init();
});