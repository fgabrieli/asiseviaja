/**
 * Upload service.
 */
asi.Service.Upload = $.extend(true, {}, asi.Service, {
  config : {
    name : 'Upload',
    isEnabled : true,
    uploadScript : asi.Config.serverUrl + '/asiserver/service/upload.php',
  },
  init : function() {
    var t = asi.Service.Upload;
    Event.bind(asi.evt.uploadFile, 'ServiceUpload', function(data) {
      asiLog('ServiceUpload: catched uploadFile, uploading=', data);
      t.uploadFile(data.uri);
    });
  },
  uploadFile : function(uri) {
    var t = asi.Service.Upload;

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = uri.substr(uri.lastIndexOf('/') + 1);
    asiLog('fileName=', options.fileName);
    options.mimeType = "image/jpeg";

    // var params = new Object();
    //
    // params.value1 = "test";
    // params.value2 = "param";
    //
    // options.params = params;

    options.chunkedMode = false;

    function onSuccess(r) {
      asiLog("Code = " + r.responseCode);
      asiLog("Response = " + r.response);
      asiLog("Sent = " + r.bytesSent);
      
      asiLog('uploadFile, onSuccess: response=', JSON.parse(r.response));
      
      Event.fire(asi.evt.fileUploaded, {
        uri : uri,
        options : options,
        response: JSON.parse(r.response)
      });
    }
    ;

    function onError(error) {
      asiLog("An error has occurred: Code = ", error.code);
    }
    ;

    var ft = new FileTransfer();
    ft.upload(uri, t.config.uploadScript, onSuccess, onError, options);
  }
});

$(document).ready(function() {
  asi.Service.Upload.register();
});