<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
// respond to preflights
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']) &&
         $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'] == 'POST' &&
         isset($_SERVER['HTTP_ORIGIN']) &&
         is_approved($_SERVER['HTTP_ORIGIN'])) {
    }
    exit;
  }
  
  $dbserver = getenv("PALVELIN");
  $dbuser =  getenv("KAYTTAJA");
  $dbpassword = getenv("SALASANA");
  $db = "react";
  $yhteys = mysqli_connect($dbserver, $dbuser, $dbpassword, $db);
  if (mysqli_connect_errno()) {
      http_response_code(500);
      exit('Yhteyden muodostaminen epäonnistui: ' . mysqli_connect_error());
  }

?>