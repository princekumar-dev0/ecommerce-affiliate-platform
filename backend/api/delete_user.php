<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include("../config/db.php");

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data["id"])) {
    echo json_encode([
        "success" => false,
        "message" => "User ID is required."
    ]);
    exit;
}

$id = intval($data["id"]);

// Check if user exists
$check = mysqli_query($conn, "SELECT id FROM users WHERE id='$id'");

if (mysqli_num_rows($check) == 0) {
    echo json_encode([
        "success" => false,
        "message" => "User not found."
    ]);
    exit;
}

// Delete user
$sql = "DELETE FROM users WHERE id='$id'";

if (mysqli_query($conn, $sql)) {
    echo json_encode([
        "success" => true,
        "message" => "User deleted successfully."
    ]);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Failed to delete user."
    ]);
}

mysqli_close($conn);

?>