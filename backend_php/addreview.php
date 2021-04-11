<?php

include './config.php';

  $data = json_decode(file_get_contents("php://input"));

function trimTag($item) {
    return trim(htmlspecialchars($item));
}

$user_id = $data->user_id;
$table_id = $data->table_id;
$item_id = $data->item_id;
$item_rating = trimTag($data->item_rating);
$item_comment = trimTag($data->item_comment);


if (empty($item_rating)) {
    http_response_code(400);
    echo('Annathan kohteelle arvion!');
    exit;
}

//find the item by id
//$item_id = "SELECT id FROM table_items WHERE item_name = '$item_name' AND table_id = '$table_id'";


// check if user already has a table with given name
    $checkquery = "SELECT rating FROM item_reviews WHERE user_id = '$user_id' AND item_id = '$item_id'";
    $check = $yhteys->query($checkquery);
    if ($check->num_rows=== 0) {
        $addquery = "INSERT INTO item_reviews (user_id, item_id, rating, comment) 
        VALUES ('$user_id', '$item_id', '$item_rating', '$item_comment')";
        $result = $yhteys->query($addquery);
        if($result == False) {
            http_response_code(500);
            echo json_encode(
                array(
                    "message" => "Virheviesti!",
                   // "jwt" => $jwt
                   "result" => $result
                ));
            exit;
        } http_response_code(200);
        echo json_encode(
            array(
                "message" => "Arvostelu lisätty!"
               // "jwt" => $jwt
            ));
     } else {
        $updatequery = "UPDATE item_reviews SET rating = '$item_rating', comment = '$item_comment' WHERE user_id = '$user_id' AND item_id = '$item_id'";
        $result = $yhteys->query($updatequery);
        if($result == False) {
            http_response_code(500);
            echo json_encode(
                array(
                    "message" => "Virheviesti!",
                   // "jwt" => $jwt
                   "result" => $result
                ));
            exit;
        } http_response_code(200);
        echo json_encode(
            array(
                "message" => "Arvostelu päivitetty!"
               // "jwt" => $jwt
            ));
     } 


?>