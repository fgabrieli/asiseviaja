asi.Config = {
  isDebugEnabled : true,
  serverUrl : 'http://192.168.210.100',
  events : {
    takePicture : 'TakePicture',
    pictureTaken : 'PictureTaken',
    share : 'Share',
    aboutUs : 'AboutUs',
    getPictures : 'GetPictures',
    gotPictures : 'GotPictures',
    uploadFile : 'UploadFile',
    fileUploaded : 'FileUploaded'
  },
};

asi.evt = asi.Config.events;