<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$id = intval($data["id"]);
$currentPassword = $data["currentPassword"];
$newPassword = $data["newPassword"];

$query = "SELECT password FROM users WHERE id=$id";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result)==0){

    echo json_encode([
        "success"=>false,
        "message"=>"User not found."
    ]);

    exit();
}

$user = mysqli_fetch_assoc($result);

if(!password_verify($currentPassword,$user["password"])){

    echo json_encode([
        "success"=>false,
        "message"=>"Current password is incorrect."
    ]);

    exit();
}

$newHash = password_hash($newPassword,PASSWORD_DEFAULT);

$update = "
UPDATE users
SET password='$newHash'
WHERE id=$id
";

if(mysqli_query($conn,$update)){

    echo json_encode([
        "success"=>true,
        "message"=>"Password changed successfully."
    ]);

}else{

    echo json_encode([
        "success"=>false,
        "message"=>mysqli_error($conn)
    ]);

}

mysqli_close($conn);

?>