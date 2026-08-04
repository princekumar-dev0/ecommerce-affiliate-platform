<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"]) || !isset($data["status"])) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid request."
    ]);
    exit;
}

$id = intval($data["id"]);
$status = mysqli_real_escape_string($conn, $data["status"]);

$sql = "UPDATE orders SET status='$status' WHERE id=$id";

if (mysqli_query($conn, $sql)) {

    echo json_encode([
        "success" => true,
        "message" => "Order status updated successfully."
    ]);

} else {

    echo json_encode([
        "success" => false,
        "message" => "Failed to update order status."
    ]);

}

mysqli_close($conn);

?>