<?php
/**
 * Receive picture from user's device.
 */

// Db config

define('DB_HOST', 'localhost');
define('DB_PORT', 3306);
define('DB_NAME', 'asiseviaja');
define('DB_USER', 'asi');
define('DB_PASSWORD', 'asi');

// Directory for pictures

define('UPLOAD_DIRECTORY', 'c:/home/asiseviaja/server/upload/');

if (!empty($_FILES)) {

  // Create a unique name

  $randomNumber = mktime() . '-' . rand(1, 1000000);
  $fileName = 'picture-' . $randomNumber . '.jpg';

  // Move the uploaded picture to the pictures directory

  move_uploaded_file($_FILES["file"]["tmp_name"], UPLOAD_DIRECTORY . $fileName);

  // Add entry to the db

  saveToDb($fileName);
}

function saveToDb($fileName) {
  try {
    $db = new PDO(
        'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME,
        DB_USER,
        DB_PASSWORD,
        array( PDO::ATTR_PERSISTENT => false)
    );

    $stmt = $db->prepare('INSERT INTO pictures (fileName) VALUES (?)');
    $stmt->execute(array($fileName));
  } catch (Exception $e) {
    // XXX: Log exception
  }
}
?>