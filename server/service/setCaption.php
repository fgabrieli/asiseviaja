<?php
/**
 * Add a comment to a picture.
 */
require_once '../config.php';

if (isset($_POST ['id']) && isset($_POST ['caption'])) {
  try {
    $db = new PDO('mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME, DB_USER, DB_PASSWORD, array (
        PDO::ATTR_PERSISTENT => false 
    ));
    
    $stmt = $db->prepare('UPDATE pictures SET caption = :caption WHERE id = :id');
    $stmt->bindParam(':id', $_POST ['id'], PDO::PARAM_INT);
    $stmt->bindParam(':caption', $_POST ['caption'], PDO::PARAM_STR);
    $stmt->execute();
    
    $response = array (
        'result' => 'success' 
    );
  } catch ( Exception $e ) {
    // XXX: Log exception
    
    $response = array (
        'result' => 'error',
        'message' => $e->getMessage() 
    );
  }
} else {
  // XXX: unifiy how we return errors from services
  $response = array (
      'result' => 'error',
      'message' => 'Error: picture id and Caption must be provided.' 
  );
}

header('Content-Type: application/json');
echo json_encode($response);

?>