<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"];
$name = $data["name"];
$email = $data["email"];

$query = "
UPDATE users
SET
name='$name',
email='$email'
WHERE id='$id'
";

if (mysqli_query($conn, $query)) {

    echo json_encode([
        "success" => true,
        "message" => "Profile updated successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => mysqli_error($conn)
    ]);

}
?>