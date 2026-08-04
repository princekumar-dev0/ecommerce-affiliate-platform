<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include("../config/db.php");

// Replace 1 with the logged-in admin ID if you later implement sessions/JWT
$id = 1;

$query = "SELECT id, name, email FROM users WHERE id='$id'";

$result = mysqli_query($conn, $query);

if ($row = mysqli_fetch_assoc($result)) {
    echo json_encode($row);
} else {
    echo json_encode([
        "success" => false,
        "message" => "Admin not found."
    ]);
}