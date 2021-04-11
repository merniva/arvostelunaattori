<?php

include './config.php';
//include './headers.php';
session_start();

  $data = json_decode(file_get_contents("php://input"));

//$user_id = $data->user_id;
$table_id = $_GET["table_id"];

$gettablequery = "SELECT id, table_name, description 
FROM tables
WHERE id=$table_id";

$gettable = $yhteys->query($gettablequery);
//$tablesarray = $gettables->fetch_assoc();
$tableresult = $gettable->fetch_assoc();


$getdetailsquery = "SELECT table_items.id, table_items.item_name, table_items.description, tables.table_name, item_reviews.rating 
FROM table_items INNER JOIN tables ON tables.id=table_items.table_id 
LEFT JOIN item_reviews 
ON table_items.id=item_reviews.item_id 
WHERE tables.id=$table_id";

$getdetails = $yhteys->query($getdetailsquery);
//$tablesarray = $gettables->fetch_assoc();
$detailresult = [];
while ($row = $getdetails->fetch_assoc()) {
    array_push($detailresult, $row);
}

echo json_encode(
    array(
        "table"=>$tableresult,
        "details"=>$detailresult,
        "message" => "Moi, olen palvelimen ääni"
    ));

if (!$gettable || !$getdetails) {
    http_response_code(500);
    echo "Virheviesti!";
    exit;
}

?>