<?php

include './config.php';
//include './headers.php';

session_start();

  $data = json_decode(file_get_contents("php://input"));
  
$name = $data->name;
$email = $data->email;
$password = $data->password;
$password2 = $data->password2;


if (!isset($name, $password, $email, $password2)) {
    http_response_code(400);
	echo('Täytäthän kaikki lomakkeen tiedot!');
}

if ($stmt = $yhteys->prepare('SELECT id, password FROM user WHERE name = ? OR email = ?')) {
    
	// Bind the parameters and check if the username already exists
	$stmt->bind_param('ss', $name, $email);
	$stmt->execute();
	$stmt->store_result();
	if ($stmt->num_rows > 0) {
	    http_response_code(400);
        /*echo 'Käyttäjänimi tai sähköpostiosoite on jo varattu, valitsethan toisen käyttäjänimen/sähköpostin!';*/
	} else {
		if ($stmt = $yhteys->prepare('INSERT INTO user (name, email, password) VALUES (?, ?, ?)')) {
            $stmt->bind_param('sss', $name, $email, $hash);
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt->execute();
            http_response_code(200);
            echo json_encode(
                array(
                    "message" => "Olet rekisteröitynyt onnistuneesti, nyt voit kirjautua sisään!",
                ));
            /*echo 'Olet rekisteröitynyt onnistuneesti, nyt voit kirjautua sisään!';*/
        } else {
            http_response_code(401);
            /*echo 'Rekisteröityminen ei onnistunut!';*/
        }
	}
	$stmt->close();
} else {
    http_response_code(500);
    /*echo 'Pahoittelut, jotain meni pieleen!';*/
}

?>