<?php

include './config.php';

  $data = json_decode(file_get_contents("php://input"));

function trimTag($item) {
    return trim(htmlspecialchars($item));
}


//$user_id = $data->user_id;
$item_name = trimTag($data->item_name);
$item_description = trimTag($data->item_description);
$table_id = $data->table_id;


if (empty($item_name)) {
    http_response_code(400);
	echo('Annathan kohteelle nimen!');
}

//find the table by id
//$table_id = "SELECT id FROM tables WHERE table_name = '$table_name' AND created_by = '$user_id'"; // !!!!


// check if user already has an item with given name
    $checkquery = "SELECT id, item_name FROM table_items WHERE item_name = '$item_name' AND table_id = '$table_id'";
    $check = $yhteys->query($checkquery);
    if ($check->num_rows=== 0) {
        $addquery = "INSERT INTO table_items (item_name, table_id, description) 
        VALUES ('$item_name', '$table_id', '$item_description')";
        $result = $yhteys->query($addquery);
        $confirmitemquery = "SELECT id FROM table_items where item_name = '$item_name' AND table_id = '$table_id'";
        $createditemid = $yhteys->query($confirmitemquery);
        $itemrow = $createditemid->fetch_assoc();
        $rowitemid = (int) $itemrow['id'];
        if($result == False) {
            http_response_code(500);
            echo json_encode(
                array(
                    "message" => "Virheviesti!",
                   // "jwt" => $jwt
                   "result" => $result
                ));
            exit;
        } echo json_encode(
            array(
                "message" => "Kohde lisätty onnistuneesti, voit nyt lisätä arvostelut!",
               "itemid" => $rowitemid
            ));
    } else {
        http_response_code(400);
        echo json_encode(
            array(
                "message" => "Taulusta löytyy jo kohde ", $item_name,"!"
               // "jwt" => $jwt
            ));
    }


?>