asi.Config = {
  isDebugEnabled : true,
  serverUrl : 'http://192.168.137.1',
  events : {
    takePicture : 'TakePicture',
    pictureTaken : 'PictureTaken',
    share : 'Share',
    aboutUs : 'AboutUs',
    getPictures : 'GetPictures',
    gotPictures : 'GotPictures',
    setPictureCaption : 'SetPictureCaption',
    uploadFile : 'UploadFile',
    fileUploaded : 'FileUploaded',
    aboutUs : 'AboutUs',
    deviceReady : 'DeviceReady',
    backKeyDown : 'BackKeyDown', // supported for: android
    showKeyboard : 'ShowKeyboard', // supported for: android
    hidekeyboard : 'HideKeyboard' // supported for: android
  },
};

asi.evt = asi.Config.events;


// Device specific events

$(document).ready(function() {

  // Android back button

  document.addEventListener('backbutton', function(e){
    Event.fire(asi.evt.backKeyDown);
  });
  
  // Show keyboard
  
  document.addEventListener('showkeyboard', function(e){
    console.log('showkeyboard');
    Event.fire(asi.evt.showKeyboard);
  });
  
  // Hide keyboard
  
  document.addEventListener('hidekeyboard', function(e){
    console.log('hidekeyboard');
    Event.fire(asi.evt.hideKeyboard);
  });
  
});