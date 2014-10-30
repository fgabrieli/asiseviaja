<?php

// Receive picture from user's device

define('UPLOAD_DIRECTORY', 'c:/home/asiseviaja/server/upload/');

if (!empty($_FILES)) {

  // Create a unique name
  
  $randomNumber = mktime() . '-' . rand(1, 1000000);
  $imageName = 'picture-' . $randomNumber . '.jpg';
  
  // Move the uploaded picture to the pictures directory
  
  move_uploaded_file($_FILES["file"]["tmp_name"], UPLOAD_DIRECTORY . $imageName);
}
?>