<?php
include './config.php';
//include './headers.php';

session_start();

  $data = json_decode(file_get_contents("php://input"));

//$user_id = $data->user_id;
$user_id = $_GET["user_id"];

$gettablesquery = "SELECT tables.id, belongs_to.user_id, tables.table_name, tables.description 
FROM tables INNER JOIN belongs_to ON tables.id=belongs_to.table_id 
WHERE belongs_to.user_id=$user_id";

$gettables = $yhteys->query($gettablesquery);
//$tablesarray = $gettables->fetch_assoc();
$result = [];
while ($row = $gettables->fetch_assoc()) {
    array_push($result, $row);
}
echo json_encode(
    array(
        "tables"=>$result
    ));

if (!$gettables) {
    http_response_code(500);
    echo "Virheviesti!";
    exit;
} 
/*while ($row = mysql_fetch_assoc($gettables)) {
    echo $row["userid"];
    echo $row["fullname"];
    echo $row["userstatus"];
}*/


?>