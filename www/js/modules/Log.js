asi.Log = function(any) {
  var finalLog = '';
  for ( var i = 0; i < arguments.length; i++) {
    var obj = arguments[i];
    if (typeof obj == 'object' || typeof obj == 'array') {
      finalLog += JSON.stringify(obj);
    } else {
      finalLog += obj;
    }
  }
  
  console.log(finalLog);
};