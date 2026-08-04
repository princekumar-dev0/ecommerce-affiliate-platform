<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

$email = $_GET["email"];

$query = "SELECT id,name,email FROM users WHERE email='$email' LIMIT 1";

$result = mysqli_query($conn, $query);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode([
        "error" => "Admin not found."
    ]);
}
?>