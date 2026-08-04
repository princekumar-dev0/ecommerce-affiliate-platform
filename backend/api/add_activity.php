<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

$activity = mysqli_real_escape_string($conn, $data["activity"]);

$query = "INSERT INTO activity_logs(activity) VALUES('$activity')";

if (mysqli_query($conn, $query)) {

    echo json_encode([
        "success" => true
    ]);

} else {

    echo json_encode([
        "success" => false
    ]);

}
?>