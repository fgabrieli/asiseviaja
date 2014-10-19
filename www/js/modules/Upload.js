asi.Upload = {
  SERVER_URL : 'http://192.168.210.100/server/upload_picture.php',
  upload : function(file) {
    var t = asi.Upload;

    var onSuccess = function(fileUrl) {
      console.log('Code = ' + r.responseCode);
      console.log('Response = ' + r.response);
      console.log('Sent = ' + r.bytesSent);
    };

    var onError = function(error) {
      console.log(error);
      // alert('An error has occurred: Code = ' + error.code);
      // console.log('upload error source ' + error.source);
      // console.log('upload error target ' + error.target);
    };

    var options = new FileUploadOptions();
    options.fileKey = 'file';
    options.fileName = fileUrl.substr(fileUrl.lastIndexOf('/') + 1);
    options.mimeType = 'image/jpeg';

    var params = {};
    params.value1 = 'test';
    params.value2 = 'param';

    options.params = params;

    var ft = new FileTransfer();
    ft.upload(fileUrl, encodeURI(t.SERVER_URL), onSuccess, onError, options);
  }
};