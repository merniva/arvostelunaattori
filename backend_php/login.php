<?php

include './config.php';
//include './headers.php';

require __DIR__ . '/vendor/autoload.php';
use \Firebase\JWT\JWT;
session_start();

$data = json_decode(file_get_contents("php://input"));

$name = $data->name;
$password = $data->password;

/*$name = json_decode($_POST['name']);
$password = json_decode($_POST['password']);*/


//echo json_encode(array('name' => $name, 'password' => $password));
 
if ($stmt = $yhteys->prepare('SELECT id, password FROM user WHERE name = ?')) {
	// Bind the parameters and check if the user exists
	$stmt->bind_param('s', $name);
	$stmt->execute();
	$stmt->store_result();
    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $hash);
        $stmt->fetch();
        // Verify the session and create token
        if (password_verify($password, $hash)) {
        
            {
                $secret_key = getenv("SECRET_KEY");
                $serverName = $dbserver;
                $issuedat_claim = time(); // issued at
                $notbefore_claim = $issuedat_claim + 10;  //not before
                $token = array(
                    "iss" => $serverName,
                    "iat" => $issuedat_claim,
                    "nbf" => $notbefore_claim,
                    "data" => array(
                        "id" => $id,
                        "name" => $name,
                ));
         
                http_response_code(200);
                $jwt = JWT::encode($token, $secret_key);
                echo json_encode(
                    array(
                        "message" => "Successful login.",
                        "jwt" => $jwt,
                        "userid" => $id
                    ));
            }

        } else {
            http_response_code(401);
            /*echo 'Virheellinen salasana!';*/
        }
    } else {
        http_response_code(400);
        echo json_encode(array("message" => "Kirjautuminen ei onnistunut.", "password" => $password, "password2" => $password2));
        /*echo 'Virheellinen käyttäjänimi!';*/
    }

	$stmt->close();
}
?>