<?php

include './config.php';
$data = json_decode(file_get_contents("php://input"));
// return post payload in response for debugging
//echo json_encode($data);

function trimTag($item) {
    return trim(htmlspecialchars($item));
}

$user_id = $data->user_id;
$table_name = trimTag($data->table_name);
$table_description = trimTag($data->table_description);
$table_users = $data->table_users;
$table_image = $data->table_image;

if (!isset($table_name, $table_users)) {
    http_response_code(400);
	echo('Annathan taululle nimen ja käyttäjät!');
}

  /*  $image_target_dir = "uploads/";
    $image_target_file = $image_target_dir . basename($_FILES["table_image"]["table_name"]);
    $uploadOk = 1;
    $imageFileType = pathinfo($image_target_file,PATHINFO_EXTENSION);

    if (move_uploaded_file($_FILES["table_image"]["tmp_name"], $image_target_file)) {
        //echo "Kuva ". basename( $_FILES["uploadedimage"]["table_name"]). " has been uploaded.";
    } else {
        echo "Kuvan lataaminen ei onnistunut!";
    }

    $image=basename( $_FILES["table_image"]["table_name"],".jpg"); // used to store the filename in a variable
*/

// check if user already has a table with given name
    $checkquery = "SELECT table_name, created_by FROM tables WHERE table_name = '$table_name' AND created_by = '$user_id'";
    $check = $yhteys->query($checkquery);
    if ($check->num_rows=== 0) {
        $addquery = "INSERT INTO tables (table_name, description, image, created_by) 
        VALUES ('$table_name', '$table_description', '$table_image', '$user_id')";
        $result = $yhteys->query($addquery);
        $confirmtablequery = "SELECT id FROM tables where table_name = '$table_name' AND created_by = '$user_id'";
        $createdtableid = $yhteys->query($confirmtablequery);
        if($result == False) {
            http_response_code(500);
            echo json_encode(
                array(
                    "message" => "Virheviesti!",
                   // "jwt" => $jwt
                   "result" => $result
                ));
            exit;
        }
    } else {
        http_response_code(400);
        echo json_encode(
            array(
                "message" => "Taulu ",$table_name," on jo olemassa, valitsethan uuden nimen taulullesi!"
               // "jwt" => $jwt
            ));
        exit;
    }

    $belongs_to_errors= [];

    
    $tablequery = "SELECT id FROM tables WHERE table_name = '$table_name' AND created_by = '$user_id'";
    $tableresult = $yhteys->query($tablequery);
    $tablerow = $tableresult->fetch_assoc();
    $tablename_tableid = (int) $tablerow['id'];

    $adduserquery = "INSERT INTO belongs_to (user_id, table_id) VALUES ('$user_id', '$tablename_tableid')";
    $adduserresult = $yhteys->query($adduserquery);
    //for loop that goes through the list of users 
    foreach ($table_users as $email) {
    //inside loop, find user_id that matches user email
        try {
            //based on user_id, insert user_id + table_id in belongs_to table
            $userquery = "SELECT id FROM user WHERE email = '$email'";
            $userresult = $yhteys->query($userquery);
            $userrow = $userresult->fetch_assoc();
            $email_userid = (int) $userrow['id'];
            if (!isset($userrow)) {
                throw new Exception('Email not found!');
            }
            //$user_id = (int)$userquery;
            //$table_id = (int)$tablequery;
            $query = "INSERT INTO belongs_to (user_id, table_id) VALUES ('$email_userid', '$tablename_tableid')";
            $result = $yhteys->query($query);
        }
        catch (Exception $e) {
            // append email to belongs_to_errors
            array_push($belongs_to_errors, $email);
        } 
    }

    if (empty($belongs_to_errors)) {
        http_response_code(200);
        //might move response after belongs_to insertion
        echo json_encode(
            array(
                "message" => "Taulu lisätty onnistuneesti, voit nyt muokata taulua!",
               // "jwt" => $jwt
               "result" => $result,
               "tableid" => $tablename_tableid
            ));
    } else {
        // response with failed emails
        http_response_code(200);
        //might move response after belongs_to insertion
        echo json_encode(
            array(
                "message" => "Taulu lisätty onnistuneesti, voit nyt muokata taulua!",
               // "jwt" => $jwt
               "result" => $result, 
               "Kaikkien käyttäjien lisääminen ei onnistunut!" => $belongs_to_errors
            ));
    }

?>