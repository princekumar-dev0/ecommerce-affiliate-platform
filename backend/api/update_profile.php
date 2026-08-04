<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"]);
$name = mysqli_real_escape_string($conn, $data["name"]);
$email = mysqli_real_escape_string($conn, $data["email"]);

$check = mysqli_query(
    $conn,
    "SELECT id FROM users WHERE email='$email' AND id!=$id"
);

if (mysqli_num_rows($check) > 0) {

    echo json_encode([
        "success" => false,
        "message" => "Email already exists."
    ]);

    exit();
}

$query = "
UPDATE users
SET
name='$name',
email='$email'
WHERE id=$id
";

if(mysqli_query($conn,$query)){

    echo json_encode([
        "success"=>true,
        "message"=>"Profile updated successfully."
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>mysqli_error($conn)
    ]);

}

mysqli_close($conn);

?>