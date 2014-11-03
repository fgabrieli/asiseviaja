<?php 
/**
 * Retrieve pictures.
 */

require_once '../config.php';

header('Content-Type: application/json');

$hasBoundaries = isset($_GET['start']) && isset($_GET['end']);
if ($hasBoundaries) {
  $start = intval($_GET['start']);
  $end = intval($_GET['end']);

  try {

    // Connect to the database

    $db = new PDO(
        'mysql:host=' . DB_HOST . ';port=' . DB_PORT . ';dbname=' . DB_NAME,
        DB_USER,
        DB_PASSWORD,
        array( PDO::ATTR_PERSISTENT => false)
    );

    // Fetch pictures

    $stmt = $db->prepare('SELECT fileName, caption FROM pictures LIMIT :start, :end');
    $stmt->bindParam(':start', $start, PDO::PARAM_INT);
    $stmt->bindParam(':end', $end, PDO::PARAM_INT);
    $stmt->execute();
    $pictures = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Create an array with the set of pictures

    for ($i = 0; $i < sizeof($pictures); $i++) {
      $fileName = $pictures[$i]['fileName'];
      $pictures[$i]['url'] = PICTURE_URL . '/' . $fileName;
    }

    // Return a json string

    echo json_encode($pictures);

  } catch (Exception $e) {

    // XXX: Log exception

  }
}
?>