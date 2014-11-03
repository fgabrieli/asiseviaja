<?php
/**
 * Receive picture from user's device.
 */

require_once '../config.php';

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

    // Connect to the database

    $db = new PDO(
        'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME,
        DB_USER,
        DB_PASSWORD,
        array( PDO::ATTR_PERSISTENT => false)
    );

    // Insert the picture

    $stmt = $db->prepare('INSERT INTO pictures (fileName) VALUES :fileName');
    $stmt->bindParam(':fileName', $fileName, PDO::PARAM_STR);
    $stmt->execute();

  } catch (Exception $e) {

    // XXX: Log exception

  }
}
?>